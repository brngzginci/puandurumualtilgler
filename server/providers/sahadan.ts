/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cheerio from "cheerio";
import {
  getCompetitionConfig,
  getCompetitionGroup,
  getStandingsCacheKey,
} from "../../src/config/competitions.js";
import type { LeagueId, GroupId } from "../../src/config/competitions.js";
import { findTeamByInputName } from "../../src/teams.js";
import type { StandingRow, ProviderStandingsResult } from "../../src/types.js";

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CacheEntry {
  timestamp: number;
  data: ProviderStandingsResult;
}

const sahadanCache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<ProviderStandingsResult>>();

function parseInteger(value: any): number {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error(`Geçersiz sayısal değer: ${value}`);
    }
    return value;
  }
  const str = String(value ?? "");
  const normalized = str.replace(/\u00a0/g, " ").replace(/[^\d-]/g, "");
  const number = Number.parseInt(normalized, 10);

  if (!Number.isFinite(number)) {
    throw new Error(`Geçersiz sayısal değer: ${value}`);
  }

  return number;
}

/**
 * Dereferences Nuxt 3 de-duplicated payload JSON array.
 */
function dereferenceNuxtPayload(arr: any[]): any {
  function rev(idx: any, visited = new Map()): any {
    if (typeof idx !== "number" || idx < 0 || idx >= arr.length) return idx;
    if (visited.has(idx)) return visited.get(idx);

    const val = arr[idx];
    if (val === null || typeof val !== "object") return val;

    if (Array.isArray(val)) {
      if (["ShallowReactive", "Reactive", "Ref", "Set"].includes(val[0])) {
        return rev(val[1], visited);
      }
      const newArr: any[] = [];
      visited.set(idx, newArr);
      for (const item of val) {
        newArr.push(typeof item === "number" ? rev(item, visited) : item);
      }
      return newArr;
    }

    const newObj: Record<string, any> = {};
    visited.set(idx, newObj);
    for (const key of Object.keys(val)) {
      const v = val[key];
      newObj[key] = typeof v === "number" ? rev(v, visited) : v;
    }
    return newObj;
  }

  return rev(1);
}

function getGroupSearchLabels(groupId: GroupId): string[] {
  switch (groupId) {
    case "red":
      return ["kırmızı", "kirmizi", "red"];
    case "white":
      return ["beyaz", "white"];
    case "group-1":
      return ["grup 1", "1. grup", "group 1", "grup-1"];
    case "group-2":
      return ["grup 2", "2. grup", "group 2", "grup-2"];
    case "group-3":
      return ["grup 3", "3. grup", "group 3", "grup-3"];
    case "overall":
    default:
      return ["genel", "overall", "total", ""];
  }
}

/**
 * Searches dereferenced Nuxt 3 payload for raw table rows of target group.
 */
function extractRawRowsFromNuxtPayload(
  rootData: any,
  groupId: GroupId,
  leagueId: LeagueId
): { rows: any[]; method: string } | null {
  if (!rootData) return null;

  const targetLabels = getGroupSearchLabels(groupId);

  // Look for competition keys
  const compKeys = Object.keys(rootData).filter(
    (k) => k.startsWith("competition-main") || k.includes("rankings") || k.includes("standings")
  );

  const candidateTables: { table: any[]; name: string; index: number }[] = [];

  for (const compKey of compKeys) {
    const compObj = rootData[compKey];
    if (!compObj) continue;

    // Check rankings total / stages
    const rankingsObj = compObj.rankings || compObj.tables || compObj.standings;
    if (!rankingsObj) continue;

    // Case A: rankings is an array of stage/group objects
    if (Array.isArray(rankingsObj)) {
      rankingsObj.forEach((stage, idx) => {
        const table = stage.table || stage.rows || stage.rankings;
        if (Array.isArray(table) && table.length > 0) {
          const name = String(
            stage.name || stage.title || stage.stage_name || stage.group_name || `Stage ${idx}`
          );
          candidateTables.push({ table, name, index: idx });
        }
      });
    } else if (typeof rankingsObj === "object") {
      // Case B: rankings has total / groups / stages
      const totalArr = rankingsObj.total || rankingsObj.groups || rankingsObj.stages || rankingsObj.tables;
      if (Array.isArray(totalArr)) {
        totalArr.forEach((stage, idx) => {
          const table = stage.table || stage.rows || (Array.isArray(stage) ? stage : null);
          if (Array.isArray(table) && table.length > 0) {
            const name = String(
              stage.name || stage.title || stage.stage_name || stage.group_name || `Group ${idx}`
            );
            candidateTables.push({ table, name, index: idx });
          }
        });
      }
    }
  }

  if (candidateTables.length === 0) {
    return null;
  }

  // 1. Try finding by matching group label in table name
  for (const cand of candidateTables) {
    const nameLower = cand.name.toLowerCase();
    if (targetLabels.some((lbl) => lbl && nameLower.includes(lbl))) {
      return {
        rows: cand.table,
        method: `Nuxt 3 Script Payload (${cand.name})`
      };
    }
  }

  // 2. If single table and overall, return it
  if (candidateTables.length === 1 && (groupId === "overall" || targetLabels.includes(""))) {
    return {
      rows: candidateTables[0].table,
      method: `Nuxt 3 Script Payload (${candidateTables[0].name})`
    };
  }

  // 3. Fallback by index based on group order if multiple tables exist
  let expectedIndex = 0;
  if (leagueId === "tff-2-lig") {
    expectedIndex = groupId === "red" ? 0 : groupId === "white" ? 1 : 0;
  } else if (leagueId === "tff-3-lig") {
    expectedIndex =
      groupId === "group-1" ? 0 : groupId === "group-2" ? 1 : groupId === "group-3" ? 2 : 0;
  }

  if (candidateTables[expectedIndex]) {
    return {
      rows: candidateTables[expectedIndex].table,
      method: `Nuxt 3 Script Payload (Index ${expectedIndex}: ${candidateTables[expectedIndex].name})`
    };
  }

  return {
    rows: candidateTables[0].table,
    method: `Nuxt 3 Script Payload (Default First Table)`
  };
}

/**
 * Extracts raw team rows from DOM HTML.
 */
function extractRawRowsFromDom(
  html: string,
  groupId: GroupId,
  leagueId: LeagueId
): { rows: any[]; method: string } {
  const $ = cheerio.load(html);
  const targetLabels = getGroupSearchLabels(groupId);

  const foundTables: { rows: any[]; headingText: string; index: number }[] = [];

  $("table").each((tableIdx, tableEl) => {
    const textHeader = $(tableEl).find("thead, tr").first().text();
    if (
      (textHeader.includes("Sıra") || textHeader.includes("P") || textHeader.includes("Takım")) &&
      (textHeader.includes("O") || textHeader.includes("G") || textHeader.includes("B"))
    ) {
      // Look at preceding headings
      const prevHeadings = $(tableEl)
        .parents()
        .add($(tableEl).prevAll("h1, h2, h3, h4, div, span"))
        .text();

      const tableRows: any[] = [];
      $(tableEl)
        .find("tbody tr, tr")
        .each((_, trEl) => {
          const cells = $(trEl)
            .find("td, th")
            .map((_, c) => $(c).text().trim())
            .get();
          if (cells.length >= 8 && !isNaN(parseInt(cells[0]))) {
            tableRows.push({
              rank: parseInteger(cells[0]),
              rawTeamName: cells[1],
              played: parseInteger(cells[2]),
              win: parseInteger(cells[3]),
              draw: parseInteger(cells[4]),
              lost: parseInteger(cells[5]),
              pro: parseInteger(cells[6]),
              against: parseInteger(cells[7]),
              pts: cells.length >= 9 ? parseInteger(cells[cells.length - 1]) : parseInteger(cells[8])
            });
          }
        });

      if (tableRows.length > 0) {
        foundTables.push({
          rows: tableRows,
          headingText: prevHeadings.toLowerCase(),
          index: tableIdx
        });
      }
    }
  });

  if (foundTables.length === 0) {
    return { rows: [], method: "None" };
  }

  // 1. Label match
  for (const t of foundTables) {
    if (targetLabels.some((lbl) => lbl && t.headingText.includes(lbl))) {
      return {
        rows: t.rows,
        method: `DOM HTML Table Parser (Label Match)`
      };
    }
  }

  // 2. Index match
  let targetIndex = 0;
  if (leagueId === "tff-2-lig") {
    targetIndex = groupId === "red" ? 0 : groupId === "white" ? 1 : 0;
  } else if (leagueId === "tff-3-lig") {
    targetIndex =
      groupId === "group-1" ? 0 : groupId === "group-2" ? 1 : groupId === "group-3" ? 2 : 0;
  }

  if (foundTables[targetIndex]) {
    return {
      rows: foundTables[targetIndex].rows,
      method: `DOM HTML Table Parser (Index ${targetIndex})`
    };
  }

  return {
    rows: foundTables[0].rows,
    method: "DOM HTML Table Parser (Fallback)"
  };
}

function validateStandingsList(
  standings: StandingRow[],
  unmatchedTeams: { sourceName: string; rank: number }[],
  leagueId: LeagueId,
  groupId: GroupId
): string[] {
  const warnings: string[] = [];
  const compConfig = getCompetitionConfig(leagueId);
  const groupConfig = getCompetitionGroup(leagueId, groupId);

  if (standings.length === 0) {
    throw new Error(
      `${compConfig.name} ${groupConfig.name} için puan durumu tablosu boş veya okunamadı.`
    );
  }

  if (groupConfig.expectedTeamCount && standings.length !== groupConfig.expectedTeamCount) {
    warnings.push(
      `Beklenen ${groupConfig.expectedTeamCount} takım yerine ${standings.length} takım ayrıştırıldı.`
    );
  }

  const ranks = standings.map((s) => s.position || s.rank);
  const uniqueRanks = new Set(ranks);
  if (uniqueRanks.size !== standings.length) {
    throw new Error("Puan durumunda mükerrer sıra numaraları tespit edildi.");
  }

  const teamIds = standings.map((s) => s.teamId);
  const uniqueTeamIds = new Set(teamIds);
  if (uniqueTeamIds.size !== standings.length) {
    throw new Error("Puan durumunda mükerrer takım kayıtları tespit edildi.");
  }

  for (const row of standings) {
    if (row.played < 0 || row.won < 0 || row.drawn < 0 || row.lost < 0) {
      throw new Error(`"${row.teamName}" takımı için negatif maç istatistiği tespit edildi.`);
    }

    if (row.won + row.drawn + row.lost !== row.played) {
      warnings.push(
        `"${row.teamName}" istatistik uyarısı: G (${row.won}) + B (${row.drawn}) + M (${row.lost}) != O (${row.played})`
      );
    }
  }

  if (unmatchedTeams.length > 0) {
    warnings.push(
      `${unmatchedTeams.length} takım yerel veritabanıyla tam eşleşmedi: ${unmatchedTeams
        .map((u) => u.sourceName)
        .join(", ")}`
    );
  }

  return warnings;
}

async function doFetchSahadanStandings(input: {
  leagueId: LeagueId;
  groupId: GroupId;
  season: string;
}): Promise<ProviderStandingsResult> {
  const compConfig = getCompetitionConfig(input.leagueId);
  const groupConfig = getCompetitionGroup(input.leagueId, input.groupId);

  if (!compConfig) {
    throw new Error(`Geçersiz lig seçimi: ${input.leagueId}`);
  }

  const response = await fetch(compConfig.sourceUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.5",
      "Cache-Control": "no-cache"
    },
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) {
    throw new Error(
      `Sahadan puan durumu sayfasına erişilemedi (${compConfig.name}). HTTP: ${response.status}`
    );
  }

  const html = await response.text();
  if (!html || html.length < 5000) {
    throw new Error("Sahadan sayfasından alınan HTML yanıtı eksik veya geçersiz.");
  }

  const $ = cheerio.load(html);
  let rawRows: any[] = [];
  let parseMethod = "None";

  // Try Nuxt 3 payload first
  $("script").each((_, el) => {
    if (rawRows.length > 0) return;
    const content = $(el).html() || "";
    if (content.includes("competition-main") || content.includes("rankings")) {
      try {
        const parsedArr = JSON.parse(content);
        if (Array.isArray(parsedArr)) {
          const root = dereferenceNuxtPayload(parsedArr);
          const extracted = extractRawRowsFromNuxtPayload(
            root?.data || root,
            input.groupId,
            input.leagueId
          );
          if (extracted && extracted.rows.length > 0) {
            rawRows = extracted.rows;
            parseMethod = extracted.method;
          }
        }
      } catch (err) {
        // Fallback to DOM
      }
    }
  });

  // DOM Fallback
  if (!rawRows || rawRows.length === 0) {
    const domExtracted = extractRawRowsFromDom(html, input.groupId, input.leagueId);
    rawRows = domExtracted.rows;
    parseMethod = domExtracted.method;
  }

  if (!rawRows || rawRows.length === 0) {
    const groupLabel = groupConfig.name || input.groupId;
    throw new Error(
      `${compConfig.name} ${groupLabel} puan durumu sayfa içerisinde bulunamadı.`
    );
  }

  const standings: StandingRow[] = [];
  const unmatchedTeams: { sourceName: string; rank: number }[] = [];

  rawRows.forEach((item, index) => {
    const rawName =
      item.team?.name || item.team?.display_name || item.rawTeamName || item.team_name || "";
    const cleanName = String(rawName).trim();
    const pos = item.rank ? parseInteger(item.rank) : index + 1;

    const matchedTeam = findTeamByInputName(cleanName);
    if (!matchedTeam) {
      if (cleanName && !unmatchedTeams.some((u) => u.sourceName === cleanName)) {
        unmatchedTeams.push({ sourceName: cleanName, rank: pos });
      }
    }

    const played = parseInteger(item.played ?? item.p ?? 0);
    const won = parseInteger(item.win ?? item.won ?? item.g ?? 0);
    const drawn = parseInteger(item.draw ?? item.drawn ?? item.b ?? 0);
    const lost = parseInteger(item.lost ?? item.m ?? 0);
    const goalsFor = parseInteger(
      item.pro ?? item.goalsFor ?? item.goals_for ?? item.ag ?? item.a ?? 0
    );
    const goalsAgainst = parseInteger(
      item.against ?? item.goalsAgainst ?? item.goals_against ?? item.yg ?? item.y ?? 0
    );
    const goalDiff = goalsFor - goalsAgainst;
    const points = parseInteger(item.pts ?? item.points ?? item.p ?? won * 3 + drawn);

    standings.push({
      position: pos,
      rank: pos,
      teamId: matchedTeam ? matchedTeam.id : `unmatched_${pos}_${cleanName.toLowerCase().replace(/\s+/g, "_")}`,
      teamName: cleanName,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      goalDifference: goalDiff,
      points
    });
  });

  const warnings = validateStandingsList(
    standings,
    unmatchedTeams,
    input.leagueId,
    input.groupId
  );

  const result: ProviderStandingsResult = {
    success: true,
    provider: "sahadan",
    competition: {
      leagueId: input.leagueId,
      leagueName: compConfig.name,
      groupId: input.groupId,
      groupName: compConfig.requiresGroup ? groupConfig.name : null,
      season: input.season
    },
    sourceRankingPreserved: true,
    standings,
    data: standings,
    unmatchedTeams,
    parsedTeamCount: standings.length,
    fetchedAt: new Date().toISOString(),
    cached: false,
    warnings
  };

  return result;
}

export async function fetchSahadanStandings(input: {
  leagueId: LeagueId;
  groupId: GroupId;
  season: string;
  refresh?: boolean;
}): Promise<ProviderStandingsResult> {
  const cacheKey = getStandingsCacheKey("sahadan", input.season, input.leagueId, input.groupId);
  const now = Date.now();

  if (!input.refresh) {
    const cachedEntry = sahadanCache.get(cacheKey);
    if (cachedEntry && now - cachedEntry.timestamp < CACHE_TTL_MS) {
      return {
        ...cachedEntry.data,
        cached: true
      };
    }
  }

  const inFlightKey = `${input.leagueId}:${input.groupId}:${input.season}`;
  const existingPromise = inFlightRequests.get(inFlightKey);
  if (existingPromise) {
    return existingPromise;
  }

  const fetchPromise = doFetchSahadanStandings(input)
    .then((result) => {
      sahadanCache.set(cacheKey, {
        timestamp: Date.now(),
        data: result
      });
      inFlightRequests.delete(inFlightKey);
      return result;
    })
    .catch((err) => {
      inFlightRequests.delete(inFlightKey);
      throw err;
    });

  inFlightRequests.set(inFlightKey, fetchPromise);
  return fetchPromise;
}
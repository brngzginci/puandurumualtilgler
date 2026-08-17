/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cheerio from "cheerio";

export type LeagueId = "tff-1-lig" | "tff-2-lig" | "tff-3-lig";
export type GroupId = "overall" | "red" | "white" | "group-1" | "group-2" | "group-3";

export interface StandingRow {
  position?: number;
  rank: number;
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

const COMPETITIONS_MAP: Record<string, { id: LeagueId; name: string; sourceUrl: string; requiresGroup: boolean }> = {
  "tff-1-lig": {
    id: "tff-1-lig",
    name: "Trendyol 1. Lig",
    sourceUrl: "https://www.sahadan.com/lig/trendyol-1-lig/2o9svokc5s7diish3ycrzk7jm",
    requiresGroup: false
  },
  "tff-2-lig": {
    id: "tff-2-lig",
    name: "Nesine 2. Lig",
    sourceUrl: "https://www.sahadan.com/lig/nesine-2-lig/2nttcoriwf5co73vmz1vr8frm",
    requiresGroup: true
  },
  "tff-3-lig": {
    id: "tff-3-lig",
    name: "Nesine 3. Lig",
    sourceUrl: "https://www.sahadan.com/lig/nesine-3-lig/907l7wtxdvugdo9i2249wcmr0",
    requiresGroup: true
  }
};

const SAMPLE_STANDINGS: StandingRow[] = [
  { rank: 1, teamId: "kocaelispor", teamName: "Kocaelispor", played: 24, won: 15, drawn: 5, lost: 4, goalsFor: 42, goalsAgainst: 20, goalDifference: 22, points: 50 },
  { rank: 2, teamId: "karagumruk", teamName: "Fatih Karagümrük", played: 24, won: 14, drawn: 6, lost: 4, goalsFor: 38, goalsAgainst: 18, goalDifference: 20, points: 48 },
  { rank: 3, teamId: "bandirmaspor", teamName: "Bandırmaspor", played: 24, won: 13, drawn: 6, lost: 5, goalsFor: 36, goalsAgainst: 22, goalDifference: 14, points: 45 },
  { rank: 4, teamId: "erzurumspor", teamName: "Erzurumspor FK", played: 24, won: 12, drawn: 8, lost: 4, goalsFor: 34, goalsAgainst: 19, goalDifference: 15, points: 44 },
  { rank: 5, teamId: "genclerbirligi", teamName: "Gençlerbirliği", played: 24, won: 12, drawn: 5, lost: 7, goalsFor: 32, goalsAgainst: 24, goalDifference: 8, points: 41 },
  { rank: 6, teamId: "igdir", teamName: "Iğdır FK", played: 24, won: 11, drawn: 6, lost: 7, goalsFor: 35, goalsAgainst: 25, goalDifference: 10, points: 39 },
  { rank: 7, teamId: "boluspor", teamName: "Boluspor", played: 24, won: 10, drawn: 8, lost: 6, goalsFor: 30, goalsAgainst: 23, goalDifference: 7, points: 38 },
  { rank: 8, teamId: "corum", teamName: "Ahlatcı Çorum FK", played: 24, won: 10, drawn: 7, lost: 7, goalsFor: 31, goalsAgainst: 26, goalDifference: 5, points: 37 },
  { rank: 9, teamId: "ankaragucu", teamName: "MKE Ankaragücü", played: 24, won: 10, drawn: 6, lost: 8, goalsFor: 29, goalsAgainst: 25, goalDifference: 4, points: 36 },
  { rank: 10, teamId: "amed", teamName: "Amed SK", played: 24, won: 9, drawn: 9, lost: 6, goalsFor: 28, goalsAgainst: 24, goalDifference: 4, points: 36 },
  { rank: 11, teamId: "esenlererok", teamName: "Esenler Erokspor", played: 24, won: 9, drawn: 6, lost: 9, goalsFor: 33, goalsAgainst: 30, goalDifference: 3, points: 33 },
  { rank: 12, teamId: "keciorengucu", teamName: "Ankara Keçiörengücü", played: 24, won: 8, drawn: 8, lost: 8, goalsFor: 27, goalsAgainst: 27, goalDifference: 0, points: 32 },
  { rank: 13, teamId: "manisafk", teamName: "Manisa FK", played: 24, won: 8, drawn: 6, lost: 10, goalsFor: 26, goalsAgainst: 31, goalDifference: -5, points: 30 },
  { rank: 14, teamId: "pendikspor", teamName: "Pendikspor", played: 24, won: 7, drawn: 8, lost: 9, goalsFor: 25, goalsAgainst: 30, goalDifference: -5, points: 29 },
  { rank: 15, teamId: "umraniyespor", teamName: "Ümraniyespor", played: 24, won: 7, drawn: 7, lost: 10, goalsFor: 24, goalsAgainst: 32, goalDifference: -8, points: 28 },
  { rank: 16, teamId: "sakaryaspor", teamName: "Sakaryaspor", played: 24, won: 6, drawn: 8, lost: 10, goalsFor: 23, goalsAgainst: 34, goalDifference: -11, points: 26 },
  { rank: 17, teamId: "istanbulspor", teamName: "İstanbulspor", played: 24, won: 6, drawn: 6, lost: 12, goalsFor: 22, goalsAgainst: 35, goalDifference: -13, points: 24 },
  { rank: 18, teamId: "sanliurfaspor", teamName: "Şanlıurfaspor", played: 24, won: 5, drawn: 6, lost: 13, goalsFor: 20, goalsAgainst: 38, goalDifference: -18, points: 21 },
  { rank: 19, teamId: "adanaspor", teamName: "Adanaspor", played: 24, won: 4, drawn: 7, lost: 13, goalsFor: 18, goalsAgainst: 40, goalDifference: -22, points: 19 },
  { rank: 20, teamId: "yenimalatyaspor", teamName: "Yeni Malatyaspor", played: 24, won: 0, drawn: 3, lost: 21, goalsFor: 10, goalsAgainst: 58, goalDifference: -48, points: 3 }
];

function normalizeName(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function resolveTeamId(teamName: string): string {
  const norm = normalizeName(teamName);
  if (norm.includes("adanaspor")) return "adanaspor";
  if (norm.includes("amed")) return "amed";
  if (norm.includes("ankaragucu")) return "ankaragucu";
  if (norm.includes("antalyaspor")) return "antalyaspor";
  if (norm.includes("bandirma")) return "bandirmaspor";
  if (norm.includes("batman")) return "batmanpetrol";
  if (norm.includes("bodrum")) return "bodrum";
  if (norm.includes("boluspor")) return "boluspor";
  if (norm.includes("bursaspor")) return "bursaspor";
  if (norm.includes("corum")) return "corum";
  if (norm.includes("erzurum")) return "erzurumspor";
  if (norm.includes("erok")) return "esenlererok";
  if (norm.includes("genclerbirligi")) return "genclerbirligi";
  if (norm.includes("igdir")) return "igdir";
  if (norm.includes("istanbulspor")) return "istanbulspor";
  if (norm.includes("karagumruk")) return "karagumruk";
  if (norm.includes("kayseri")) return "kayserispor";
  if (norm.includes("keciorengucu")) return "keciorengucu";
  if (norm.includes("kocaeli")) return "kocaelispor";
  if (norm.includes("manisa")) return "manisafk";
  if (norm.includes("mardin")) return "mardin1969";
  if (norm.includes("muglaspor") || norm.includes("mugla")) return "muglaspor";
  if (norm.includes("pendik")) return "pendikspor";
  if (norm.includes("sakarya")) return "sakaryaspor";
  if (norm.includes("sanliurfa") || norm.includes("urfaspor")) return "sanliurfaspor";
  if (norm.includes("sariyer")) return "sariyer";
  if (norm.includes("sivas")) return "sivasspor";
  if (norm.includes("umraniye")) return "umraniyespor";
  if (norm.includes("vanspor") || norm.includes("van")) return "vanspor";
  if (norm.includes("yenimalatya") || norm.includes("malatya")) return "yenimalatyaspor";

  return norm || "team";
}

function parseInteger(val: any): number {
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  const str = String(val ?? "").replace(/\u00a0/g, " ").replace(/[^\d-]/g, "");
  const num = parseInt(str, 10);
  return isNaN(num) ? 0 : num;
}

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

function extractRowsFromNuxt(rootData: any, groupId: GroupId): any[] | null {
  if (!rootData) return null;
  const compKeys = Object.keys(rootData).filter(
    (k) => k.startsWith("competition-main") || k.includes("rankings") || k.includes("standings")
  );

  const candidateTables: { table: any[]; name: string }[] = [];

  for (const compKey of compKeys) {
    const compObj = rootData[compKey];
    if (!compObj) continue;
    const rankingsObj = compObj.rankings || compObj.tables || compObj.standings;
    if (!rankingsObj) continue;

    if (Array.isArray(rankingsObj)) {
      rankingsObj.forEach((stage) => {
        const table = stage.table || stage.rows || stage.rankings;
        if (Array.isArray(table) && table.length > 0) {
          candidateTables.push({ table, name: String(stage.name || stage.title || "") });
        }
      });
    } else if (typeof rankingsObj === "object") {
      const totalArr = rankingsObj.total || rankingsObj.groups || rankingsObj.stages || rankingsObj.tables;
      if (Array.isArray(totalArr)) {
        totalArr.forEach((stage) => {
          const table = stage.table || stage.rows || (Array.isArray(stage) ? stage : null);
          if (Array.isArray(table) && table.length > 0) {
            candidateTables.push({ table, name: String(stage.name || stage.title || "") });
          }
        });
      }
    }
  }

  if (candidateTables.length === 0) return null;

  const targetMap: Record<string, string[]> = {
    red: ["kırmızı", "kirmizi", "red"],
    white: ["beyaz", "white"],
    "group-1": ["1. grup", "group 1", "grup 1"],
    "group-2": ["2. grup", "group 2", "grup 2"],
    "group-3": ["3. grup", "group 3", "grup 3"],
    overall: ["genel", "overall", "total", ""]
  };
  const labels = targetMap[groupId] || [""];

  for (const cand of candidateTables) {
    const nameLower = cand.name.toLowerCase();
    if (labels.some((lbl) => lbl && nameLower.includes(lbl))) {
      return cand.table;
    }
  }

  return candidateTables[0].table;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const query = req.query || {};
  const provider = (query.provider as string) || "sahadan";
  const league = ((query.league as string) || "tff-1-lig") as LeagueId;
  const group = ((query.group as string) || "overall") as GroupId;
  const season = (query.season as string) || "2026-2027";

  const compConfig = COMPETITIONS_MAP[league] || COMPETITIONS_MAP["tff-1-lig"];

  if (provider === "manual") {
    return res.status(200).json({
      success: true,
      provider: "manual",
      competition: {
        leagueId: compConfig.id,
        leagueName: compConfig.name,
        groupId: group,
        season
      },
      dataSource: "Manuel / Örnek Veri",
      data: SAMPLE_STANDINGS,
      standings: SAMPLE_STANDINGS
    });
  }

  try {
    const response = await fetch(compConfig.sourceUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
      },
      signal: AbortSignal.timeout(9000)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let rawRows: any[] = [];

    // Parse Nuxt payload
    $("script").each((_, el) => {
      if (rawRows.length > 0) return;
      const content = $(el).html() || "";
      if (content.includes("competition-main") || content.includes("rankings")) {
        try {
          const parsedArr = JSON.parse(content);
          if (Array.isArray(parsedArr)) {
            const root = dereferenceNuxtPayload(parsedArr);
            const extracted = extractRowsFromNuxt(root?.data || root, group);
            if (extracted && extracted.length > 0) {
              rawRows = extracted;
            }
          }
        } catch (_) {}
      }
    });

    // Fallback: Parse HTML table DOM
    if (!rawRows || rawRows.length === 0) {
      $("table").each((_, tableEl) => {
        if (rawRows.length > 0) return;
        const textHeader = $(tableEl).find("thead, tr").first().text();
        if (
          (textHeader.includes("Sıra") || textHeader.includes("P") || textHeader.includes("Takım")) &&
          (textHeader.includes("O") || textHeader.includes("G") || textHeader.includes("B"))
        ) {
          $(tableEl)
            .find("tbody tr, tr")
            .each((_, trEl) => {
              const cells = $(trEl)
                .find("td, th")
                .map((_, c) => $(c).text().trim())
                .get();
              if (cells.length >= 8 && !isNaN(parseInt(cells[0]))) {
                rawRows.push({
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
        }
      });
    }

    if (!rawRows || rawRows.length === 0) {
      throw new Error("Puan durumu tablosu sayfada bulunamadı.");
    }

    const standings: StandingRow[] = rawRows.map((item, idx) => {
      const rawName =
        item.team?.name || item.team?.display_name || item.rawTeamName || item.team_name || `Takım ${idx + 1}`;
      const cleanName = String(rawName).trim();
      const pos = item.rank ? parseInteger(item.rank) : idx + 1;
      const teamId = resolveTeamId(cleanName);

      const played = parseInteger(item.played ?? item.p ?? 0);
      const won = parseInteger(item.win ?? item.won ?? item.g ?? 0);
      const drawn = parseInteger(item.draw ?? item.drawn ?? item.b ?? 0);
      const lost = parseInteger(item.lost ?? item.m ?? 0);
      const goalsFor = parseInteger(item.pro ?? item.goalsFor ?? item.goals_for ?? item.ag ?? item.a ?? 0);
      const goalsAgainst = parseInteger(item.against ?? item.goalsAgainst ?? item.goals_against ?? item.yg ?? item.y ?? 0);
      const goalDiff = goalsFor - goalsAgainst;
      const points = parseInteger(item.pts ?? item.points ?? item.p ?? won * 3 + drawn);

      return {
        position: pos,
        rank: pos,
        teamId,
        teamName: cleanName,
        played,
        won,
        drawn,
        lost,
        goalsFor,
        goalsAgainst,
        goalDifference: goalDiff,
        points
      };
    });

    return res.status(200).json({
      success: true,
      provider: "sahadan",
      competition: {
        leagueId: compConfig.id,
        leagueName: compConfig.name,
        groupId: group,
        season
      },
      sourceRankingPreserved: true,
      standings,
      data: standings,
      parsedTeamCount: standings.length,
      fetchedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Sahadan Fetch Error:", error?.message || error);
    return res.status(200).json({
      success: true,
      provider: "sahadan-fallback",
      competition: {
        leagueId: compConfig.id,
        leagueName: compConfig.name,
        groupId: group,
        season
      },
      lastUpdated: new Date().toISOString(),
      dataSource: "Yedek Veri (Sahadan Bağlantı Uyarısı)",
      data: SAMPLE_STANDINGS,
      standings: SAMPLE_STANDINGS,
      warnings: [`Canlı veri bağlantı uyarısı: ${error?.message || "Bilinmeyen hata"}`]
    });
  }
}

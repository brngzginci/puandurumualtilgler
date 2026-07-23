/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LeagueId = "tff-1-lig" | "tff-2-lig" | "tff-3-lig";

export type GroupId =
  | "overall"
  | "red"
  | "white"
  | "group-1"
  | "group-2"
  | "group-3";

export type PosterTemplateId =
  | "standings-1-lig"
  | "standings-2-lig"
  | "standings-3-lig";

export interface CompetitionGroup {
  id: GroupId;
  name: string;
  sourceLabel: string;
  shortName: string;
  expectedTeamCount?: number;
}

export interface CompetitionConfig {
  id: LeagueId;
  name: string;
  shortName: string;
  season: string;
  provider: "sahadan" | "manual";
  sourceUrl: string;
  templateId: PosterTemplateId;
  requiresGroup: boolean;
  groups: CompetitionGroup[];
}

export const COMPETITIONS: Record<LeagueId, CompetitionConfig> = {
  "tff-1-lig": {
    id: "tff-1-lig",
    name: "Trendyol 1. Lig",
    shortName: "1. Lig",
    season: "2026-2027",
    provider: "sahadan",
    sourceUrl:
      "https://www.sahadan.com/lig/trendyol-1-lig/2o9svokc5s7diish3ycrzk7jm",
    templateId: "standings-1-lig",
    requiresGroup: false,
    groups: [
      {
        id: "overall",
        name: "Genel",
        sourceLabel: "Genel",
        shortName: ""
      }
    ]
  },

  "tff-2-lig": {
    id: "tff-2-lig",
    name: "Nesine 2. Lig",
    shortName: "2. Lig",
    season: "2026-2027",
    provider: "sahadan",
    sourceUrl:
      "https://www.sahadan.com/lig/nesine-2-lig/2nttcoriwf5co73vmz1vr8frm",
    templateId: "standings-2-lig",
    requiresGroup: true,
    groups: [
      {
        id: "red",
        name: "Kırmızı Grup",
        sourceLabel: "Kırmızı Grup",
        shortName: "KIRMIZI GRUP"
      },
      {
        id: "white",
        name: "Beyaz Grup",
        sourceLabel: "Beyaz Grup",
        shortName: "BEYAZ GRUP"
      }
    ]
  },

  "tff-3-lig": {
    id: "tff-3-lig",
    name: "Nesine 3. Lig",
    shortName: "3. Lig",
    season: "2026-2027",
    provider: "sahadan",
    sourceUrl:
      "https://www.sahadan.com/lig/nesine-3-lig/907l7wtxdvugdo9i2249wcmr0",
    templateId: "standings-3-lig",
    requiresGroup: true,
    groups: [
      {
        id: "group-1",
        name: "1. Grup",
        sourceLabel: "Grup 1",
        shortName: "1. GRUP",
        expectedTeamCount: 18
      },
      {
        id: "group-2",
        name: "2. Grup",
        sourceLabel: "Grup 2",
        shortName: "2. GRUP",
        expectedTeamCount: 18
      },
      {
        id: "group-3",
        name: "3. Grup",
        sourceLabel: "Grup 3",
        shortName: "3. GRUP",
        expectedTeamCount: 18
      }
    ]
  }
};

export function getCompetitionConfig(leagueId: LeagueId): CompetitionConfig {
  return COMPETITIONS[leagueId] || COMPETITIONS["tff-1-lig"];
}

export function getCompetitionGroup(
  leagueId: LeagueId,
  groupId: GroupId
): CompetitionGroup {
  const config = getCompetitionConfig(leagueId);
  const group = config.groups.find((g) => g.id === groupId);
  return group || config.groups[0];
}

export function getWorkspaceKey(
  leagueId: LeagueId,
  groupId: GroupId,
  season: string
): string {
  return ["standings-workspace", season, leagueId, groupId].join(":");
}

export function getStandingsCacheKey(
  provider: string,
  season: string,
  leagueId: LeagueId,
  groupId: GroupId
): string {
  return [provider, season, leagueId, groupId].join(":");
}

/**
 * Normalizes filenames for export
 */
export function buildExportFilename(
  leagueId: LeagueId,
  groupId: GroupId
): string {
  const config = getCompetitionConfig(leagueId);
  const group = getCompetitionGroup(leagueId, groupId);

  let base = config.name;
  if (config.requiresGroup && group && group.id !== "overall") {
    base += ` ${group.name}`;
  }
  base += " Puan Durumu";

  // Slugify for clean filename
  const slug = base
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug}.png`;
}

import { LeagueZoneDefinition } from "../types";

export function getDefaultZoneDefinitions(leagueId: string): LeagueZoneDefinition[] {
  if (leagueId === "tff-1-lig") {
    return [
      { id: "direct-promotion", label: "Süper Lig", color: "#109D13", startPosition: 1, endPosition: 2, displayOrder: 1, isEnabled: true },
      { id: "playoff-final", label: "Play-Off Finali", color: "#138EC7", startPosition: 3, endPosition: 3, displayOrder: 2, isEnabled: true },
      { id: "playoff-quarter", label: "Play-Off", color: "#D7DF00", startPosition: 4, endPosition: 7, displayOrder: 3, isEnabled: true },
      { id: "relegation", label: "Küme Düşme", color: "#D40000", startPosition: 17, endPosition: 20, displayOrder: 4, isEnabled: true }
    ];
  }
  if (leagueId === "tff-2-lig") {
    return [
      { id: "direct-promotion", label: "Doğrudan 1. Lig", color: "#128C08", startPosition: 1, endPosition: 1, displayOrder: 1, isEnabled: true },
      { id: "playoff-final", label: "Play-Off Finali", color: "#078ECC", startPosition: 2, endPosition: 2, displayOrder: 2, isEnabled: true },
      { id: "playoff-quarter", label: "Play-Off Çeyrek Final", color: "#D6E600", startPosition: 3, endPosition: 6, displayOrder: 3, isEnabled: true },
      { id: "relegation", label: "Küme Düşme", color: "#B90000", startPosition: 16, endPosition: 18, displayOrder: 4, isEnabled: true }
    ];
  }
  if (leagueId === "tff-3-lig") {
    return [
      { id: "direct-promotion", label: "Doğrudan 2. Lig", color: "#128C08", startPosition: 1, endPosition: 1, displayOrder: 1, isEnabled: true },
      { id: "playoff-final", label: "Play-Off Finali", color: "#078ECC", startPosition: 2, endPosition: 2, displayOrder: 2, isEnabled: true },
      { id: "playoff-quarter", label: "Play-Off Çeyrek Final", color: "#D6E600", startPosition: 3, endPosition: 6, displayOrder: 3, isEnabled: true },
      { id: "relegation", label: "Küme Düşme", color: "#B90000", startPosition: 14, endPosition: 16, displayOrder: 4, isEnabled: true }
    ];
  }
  return [
    { id: "promotion", label: "Yükselme", color: "#128C08", startPosition: 1, endPosition: 2, displayOrder: 1, isEnabled: true },
    { id: "playoff", label: "Play-Off", color: "#078ECC", startPosition: 3, endPosition: 6, displayOrder: 2, isEnabled: true },
    { id: "relegation", label: "Küme Düşme", color: "#B90000", startPosition: 17, endPosition: 20, displayOrder: 3, isEnabled: true }
  ];
}

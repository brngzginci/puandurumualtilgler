/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LeagueId, GroupId, PosterTemplateId } from "./config/competitions";

export interface Team {
  id: string;
  officialName: string;
  displayName: string;
  shortName: string;
  aliases: string[];
  colors?: string[];
  defaultLogo?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textOnPrimary?: string;
  createdFrom?: "default" | "sahadan" | "manual";
  createdAt?: string;
}

export interface LeagueZoneDefinition {
  id: string;
  label: string;
  color: string;
  startPosition: number;
  endPosition: number;
  displayOrder: number;
  isEnabled: boolean;
}

export interface StandingRow {
  rank: number;
  position?: number;
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

export interface CompetitionSelection {
  leagueId: LeagueId;
  groupId: GroupId;
  season: string;
}

export interface LeagueZoneConfig {
  directPromotionStart?: number;
  directPromotionEnd?: number;
  playoffFinalPosition?: number;
  playoffStart?: number;
  playoffEnd?: number;
  relegationStart?: number;
  relegationEnd?: number;
  promotionZone?: ZoneConfig;
  playoffZone?: ZoneConfig;
  relegationZone?: ZoneConfig;
}

export interface StandingsWorkspace {
  selection: CompetitionSelection;
  standings: StandingRow[];
  currentWeek: number;
  totalWeeks: number | null;
  sourceRankingPreserved: boolean;
  sourceType: "sahadan" | "manual";
  noteText: string;
  zoneConfig: LeagueZoneConfig;
  zoneDefinitions?: LeagueZoneDefinition[];
  updatedAt: string | null;
}

export interface CompetitionBranding {
  leagueLogoPath?: string;
  sponsorLogoPath?: string;
  accentColors?: string[];
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  threads?: string;
  tiktok?: string;
}

export interface LeaguePosterProps {
  competitionName: string;
  competitionShortName: string;
  groupName?: string;
  groupShortName?: string;
  season: string;
  standings: StandingRow[];
  currentWeek: number;
  totalWeeks: number | null;
  zoneConfig: LeagueZoneConfig;
  teamLogos: Record<string, string>;
  noteText: string;
  socialLinks?: SocialLinks;
  config?: DesignConfig;
  matchedTeams?: Record<string, Team | null>;
  isSafeMode?: boolean;
}

export interface ZoneConfig {
  name: string;
  startRank: number;
  endRank: number;
  color: string;
  enabled: boolean;
}

export interface DesignConfig {
  title: string;
  subtitle: string;
  roundInfo: string;
  theme: "dark" | "light" | "custom";
  backgroundColor: string;
  gradientStart: string;
  gradientEnd: string;
  useGradient: boolean;
  gridOverlay: boolean;
  accentColor: string;
  
  // Font sizes & Families
  headerFontFamily: string;
  bodyFontFamily: string;
  
  // Custom theme colors
  textColor: string;
  textMutedColor: string;
  rowBgColorEven: string;
  rowBgColorOdd: string;
  pointsBgColor: string;
  pointsTextColor: string;
  
  // Zones (Promotion, playoff, relegation)
  zones: {
    promotion: ZoneConfig;
    playoff: ZoneConfig;
    relegation: ZoneConfig;
  };

  // Footer metadata
  dataSource: string;
  showDataSource: boolean;
  showLastUpdated: boolean;
  socialHandle: string;
  showSocialHandle: boolean;
  apiLastUpdated?: string;
  activeProvider?: string;
  
  // Reference Poster Specific Configs
  currentWeek?: number;
  totalWeeks?: number;
  showNote?: boolean;
  noteText?: string;
  showSocialStrip?: boolean;
  directPromotionStart?: number;
  directPromotionEnd?: number;
  playoffFinalPosition?: number;
  playoffStart?: number;
  playoffEnd?: number;
  relegationStart?: number;
  relegationEnd?: number;
  zoneDefinitions?: LeagueZoneDefinition[];

  // Logo style
  logoBorderRadius: string; // "rounded-none", "rounded-full", "rounded-md"
}

export interface PosterDesignTokens {
  canvasWidth: number;
  canvasHeight: number;
  headerHeight: number;
  tableHeaderHeight: number;
  rowHeight: number;
  footerHeight: number;
  teamNameFontSize: number;
  statFontSize: number;
  logoSize: number;
  backgroundColor: string;
  panelColor: string;
  lineColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  accentColor: string;
}

export interface SourceTeamMapping {
  provider: "sahadan" | "api-football" | string;
  sourceTeamId?: number | string;
  sourceTeamName: string;
  localTeamId: string;
}

export interface ProviderStandingsResult {
  success: boolean;
  provider: "sahadan" | "manual";
  competition: {
    leagueId: LeagueId;
    leagueName: string;
    groupId: GroupId;
    groupName: string | null;
    season: string;
  };
  standings: StandingRow[];
  data?: StandingRow[];
  sourceRankingPreserved: boolean;
  unmatchedTeams: { sourceName: string; rank: number }[] | string[];
  parsedTeamCount: number;
  fetchedAt: string;
  cached: boolean;
  warnings: string[];
  message?: string;
  code?: string;
}



export type FixtureStatus = 
  | 'played' 
  | 'fixture' 
  | 'live' 
  | 'postponed' 
  | 'cancelled' 
  | 'bye'
  | 'unknown';

export interface TeamInfo {
  id: number;
  uuid?: string;
  name: string;
  logo: string;
}

export interface Fixture {
  id: string;
  uuid?: string;
  week: number;
  date: string;
  time: string;
  status: FixtureStatus;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  homeScore: number | null;
  awayScore: number | null;
  halfTimeHomeScore?: number | null;
  halfTimeAwayScore?: number | null;
  isBye?: boolean;
}

export interface FixturesSuccessResponse {
  success: true;
  season: string;
  league: string;
  leagueId?: string;
  group?: string;
  week: number;
  matches: Fixture[];
  error?: undefined;
}

export type LeagueId = 'trendyol-1-lig' | 'nesine-2-lig' | 'nesine-3-lig';

export interface GroupOption {
  id: string;
  name: string;
  shortName: string;
}

export interface LeagueOption {
  id: LeagueId;
  name: string;
  shortName: string;
  totalWeeks: number;
  matchesPerWeek: number;
  groups?: GroupOption[];
}

export interface FixturesErrorResponse {
  success: false;
  error: string;
}

export type FixturesApiResponse = FixturesSuccessResponse | FixturesErrorResponse;

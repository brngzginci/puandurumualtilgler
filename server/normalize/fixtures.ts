import type { Fixture, FixtureStatus, TeamInfo } from '../../src/types/fixture';
import type { RawMatch, RawTeam } from '../parsers/sahadanFixtures';
import { findAuthenticTeamId } from '../../src/data/turkishLowerLeagueTeams';

export function normalizeStatus(rawStatus?: string): FixtureStatus {
  if (!rawStatus || typeof rawStatus !== 'string') {
    return 'unknown';
  }

  const s = rawStatus.trim().toLowerCase();
  switch (s) {
    case 'played':
    case 'ft':
    case 'finished':
      return 'played';
    case 'fixture':
    case 'ns':
    case 'not_started':
    case 'upcoming':
      return 'fixture';
    case 'playing':
    case 'live':
    case 'in_play':
    case 'ht':
      return 'live';
    case 'postponed':
    case 'pp':
      return 'postponed';
    case 'cancelled':
    case 'canc':
      return 'cancelled';
    default:
      return 'unknown';
  }
}

export function normalizeTeam(rawTeam: RawTeam): TeamInfo {
  let id = Number(rawTeam.id) || 0;
  const name = rawTeam.display_name?.trim() || rawTeam.name?.trim() || 'Bilinmeyen Takım';

  const authenticId = findAuthenticTeamId(name, 0);
  if (authenticId > 0) {
    id = authenticId;
  }

  const logo = `https://file.mackolikfeeds.com/teams/${id}?w=s`;

  return {
    id,
    uuid: rawTeam.uuid,
    name,
    logo,
  };
}

export function parseScore(value: any): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const num = Number(value);
  return isNaN(num) ? null : num;
}

export function normalizeMatch(rawMatch: RawMatch, weekNumber: number): Fixture {
  const status = normalizeStatus(rawMatch.status);

  // Extract date and time
  let dateStr = '';
  if (rawMatch.date_time_utc) {
    // e.g. "2026-08-07 18:30:00" -> extract "2026-08-07"
    dateStr = rawMatch.date_time_utc.split(' ')[0] || rawMatch.date_time_utc;
  }

  const timeStr = rawMatch.match_time || (rawMatch.date_time_utc ? rawMatch.date_time_utc.split(' ')[1]?.slice(0, 5) : '') || '00:00';

  const homeTeam = normalizeTeam(rawMatch.team_A);
  const awayTeam = normalizeTeam(rawMatch.team_B);

  const homeScore = status === 'fixture' ? null : parseScore(rawMatch.fts_A);
  const awayScore = status === 'fixture' ? null : parseScore(rawMatch.fts_B);
  const halfTimeHomeScore = parseScore(rawMatch.hts_A);
  const halfTimeAwayScore = parseScore(rawMatch.hts_B);

  return {
    id: String(rawMatch.id || `${homeTeam.id}-${awayTeam.id}`),
    uuid: rawMatch.uuid,
    week: weekNumber,
    date: dateStr,
    time: timeStr,
    status,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    halfTimeHomeScore,
    halfTimeAwayScore,
  };
}

export function normalizeFixtures(rawMatches: RawMatch[], weekNumber: number): Fixture[] {
  if (!Array.isArray(rawMatches)) {
    return [];
  }

  return rawMatches.map((m) => normalizeMatch(m, weekNumber));
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  StandingRow,
  DesignConfig,
  Team
} from "../../../types";

import LowerLeagueRow from "./LowerLeagueRow";

interface LowerLeagueTableProps {
  standings: StandingRow[];
  config: DesignConfig;
  matchedTeams: Record<string, Team | null>;
  teamLogos?: Record<string, string>;
}

/**
 * Takım adını public/logos klasöründeki
 * dosya adına uygun teamId biçimine dönüştürür.
 *
 * Örnek:
 * "Karşıyaka" -> "karsiyaka"
 * "Bucaspor 1928" -> "bucaspor-1928"
 */
function createTeamId(teamName: string): string {
  return teamName
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const LowerLeagueTable: React.FC<
  LowerLeagueTableProps
> = ({
  standings,
  config,
  matchedTeams,
  teamLogos = {}
}) => {
  const sortedStandings = [...standings].sort(
    (a, b) =>
      (a.position ?? a.rank ?? 0) -
      (b.position ?? b.rank ?? 0)
  );

  const teamCount =
    sortedStandings.length || 18;

  // Available height inside table card is ~720px
  // Calculate optimal row height
  const availableBodyHeight = 650;

  const rawRowHeight =
    (availableBodyHeight - teamCount * 2) /
    teamCount;

  const rowHeight = Math.max(
    28,
    Math.min(44, Math.floor(rawRowHeight))
  );

  return (
    <div className="lower-league-table-card">
      {/* Table Header Bar */}
      <div className="lower-league-table-header">
        <div className="lower-league-col-team">
          <div className="lower-league-rank-header">
            #
          </div>

          <span className="lower-league-team-header-title">
            TAKIM
          </span>
        </div>

        <div className="lower-league-col-stats">
          <div className="lower-league-stat-cell">
            O
          </div>

          <div className="lower-league-stat-cell">
            G
          </div>

          <div className="lower-league-stat-cell">
            B
          </div>

          <div className="lower-league-stat-cell">
            M
          </div>

          <div className="lower-league-stat-cell-lg">
            AG
          </div>

          <div className="lower-league-stat-cell-lg">
            YG
          </div>

          <div className="lower-league-stat-cell-av">
            AV
          </div>

          <div className="lower-league-stat-cell-points">
            P
          </div>
        </div>
      </div>

      {/* Table Body Rows */}
      <div className="lower-league-table-body">
        {sortedStandings.map((row, idx) => {
          const matchedByRowId =
            row.teamId
              ? matchedTeams[row.teamId]
              : null;

          const matched =
            matchedByRowId || null;

          const resolvedTeamId =
            row.teamId ||
            matched?.id ||
            createTeamId(row.teamName);

          const logoUrl =
            teamLogos[resolvedTeamId] ||
            matched?.defaultLogo;

          const resolvedRow: StandingRow = {
            ...row,
            teamId: resolvedTeamId
          };

          return (
            <LowerLeagueRow
              key={resolvedTeamId}
              row={resolvedRow}
              index={idx}
              matchedTeam={matched}
              config={config}
              teamLogoUrl={logoUrl}
              rowHeight={rowHeight}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LowerLeagueTable;
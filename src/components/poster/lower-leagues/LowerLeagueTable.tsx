/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { StandingRow, DesignConfig, Team } from "../../../types";
import LowerLeagueRow from "./LowerLeagueRow";

interface LowerLeagueTableProps {
  standings: StandingRow[];
  config: DesignConfig;
  matchedTeams: Record<string, Team | null>;
  teamLogos?: Record<string, string>;
}

export const LowerLeagueTable: React.FC<LowerLeagueTableProps> = ({
  standings,
  config,
  matchedTeams,
  teamLogos = {}
}) => {
  const sortedStandings = [...standings].sort(
    (a, b) => (a.position ?? a.rank ?? 0) - (b.position ?? b.rank ?? 0)
  );

  const teamCount = sortedStandings.length || 18;

  // Available height inside table card is ~720px
  // Calculate optimal row height
  const availableBodyHeight = 650;
  const rawRowHeight = (availableBodyHeight - (teamCount * 2)) / teamCount;
  const rowHeight = Math.max(28, Math.min(44, Math.floor(rawRowHeight)));

  return (
    <div className="lower-league-table-card">
      {/* Table Header Bar */}
      <div className="lower-league-table-header">
        <div className="lower-league-col-team">
          <div className="lower-league-rank-header">#</div>
          <span className="lower-league-team-header-title">TAKIM</span>
        </div>

        <div className="lower-league-col-stats">
          <div className="lower-league-stat-cell">O</div>
          <div className="lower-league-stat-cell">G</div>
          <div className="lower-league-stat-cell">B</div>
          <div className="lower-league-stat-cell">M</div>
          <div className="lower-league-stat-cell-lg">AG</div>
          <div className="lower-league-stat-cell-lg">YG</div>
          <div className="lower-league-stat-cell-av">AV</div>
          <div className="lower-league-stat-cell-points">P</div>
        </div>
      </div>

      {/* Table Body Rows */}
      <div className="lower-league-table-body">
        {sortedStandings.map((row, idx) => {
          const matched = matchedTeams[row.teamId] || null;
          const logoUrl = teamLogos[row.teamId] || matched?.defaultLogo;

          return (
            <LowerLeagueRow
              key={row.teamId || idx}
              row={row}
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

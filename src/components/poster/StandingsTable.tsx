/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { StandingRow, DesignConfig, Team } from "../../types";
import StandingRowItem from "./StandingRowItem";

interface StandingsTableProps {
  standings: StandingRow[];
  config: DesignConfig;
  matchedTeams: Record<string, Team | null>;
  teamLogos?: Record<string, string>;
  isSafeMode?: boolean;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  config,
  matchedTeams,
  teamLogos,
  isSafeMode = false
}) => {
  // Slice up to maximum possible teams (e.g. 24)
  const displayRows = standings.slice(0, 24);
  const rowCount = Math.max(1, displayRows.length);

  // Dynamically calculate row height, font sizes, badges and logo sizing based on rowCount:
  // Target total rows container height is ~816px so the table perfectly frames the poster canvas
  // 16 teams: ~51.0px per row
  // 17 teams (e.g. 2. Lig Beyaz): ~48.0px per row
  // 18 teams (e.g. 2. Lig Kırmızı & 3. Lig): ~45.3px per row
  // 20 teams (e.g. 1. Lig): ~40.8px per row
  const targetTotalRowsHeight = 816;
  const rowHeight = Number((targetTotalRowsHeight / rowCount).toFixed(1));
  const rankPillHeight = Math.round(rowHeight * 0.82);
  const rankFontSize = Math.min(22, Math.max(16, Math.round(rowHeight * 0.48)));
  const teamFontSize = Math.min(23, Math.max(17, Math.round(rowHeight * 0.49)));
  const statFontSize = Math.min(21, Math.max(15, Math.round(rowHeight * 0.44)));
  const pointsFontSize = Math.min(24, Math.max(18, Math.round(rowHeight * 0.51)));
  const logoDimension = Math.min(42, Math.max(26, Math.round(rowHeight - 6)));

  return (
    <div className="w-full bg-[#001011] border border-[#B4C3C3]/40 rounded-2xl p-2.5 flex flex-col justify-between overflow-hidden shadow-xl shrink-0">
      {/* Table Header Bar (Light Gray Rounded Pill) */}
      <div
        className="w-full h-[48px] bg-[#D0D0D0] text-[#050505] font-extrabold text-[20px] rounded-xl grid items-center mb-1.5 shrink-0 uppercase tracking-wide"
        style={{
          gridTemplateColumns:
            "110px minmax(310px, 1fr) 52px 52px 52px 52px 60px 60px 66px 56px"
        }}
      >
        <div className="pl-4 text-left">SIRA</div>
        <div className="text-left pl-2">TAKIM</div>
        <div className="text-center">O</div>
        <div className="text-center">G</div>
        <div className="text-center">B</div>
        <div className="text-center">M</div>
        <div className="text-center">AG</div>
        <div className="text-center">YG</div>
        <div className="text-center">AV</div>
        <div className="text-center">P</div>
      </div>

      {/* Team Rows */}
      <div
        className="flex flex-col rounded-lg overflow-hidden border border-[#B4C3C3]/15 shrink-0"
        style={{ height: `${rowCount * rowHeight}px` }}
      >
        {displayRows.map((row, idx) => {
          const rank = row.rank || idx + 1;
          const team = matchedTeams[row.teamId] || null;
          const isEven = idx % 2 === 0;

          return (
            <StandingRowItem
              key={row.teamId || idx}
              row={row}
              rank={rank}
              config={config}
              team={team}
              teamLogos={teamLogos}
              isEven={isEven}
              isSafeMode={isSafeMode}
              rowHeight={rowHeight}
              rankPillHeight={rankPillHeight}
              teamFontSize={teamFontSize}
              statFontSize={statFontSize}
              rankFontSize={rankFontSize}
              pointsFontSize={pointsFontSize}
              logoDimension={logoDimension}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StandingsTable;

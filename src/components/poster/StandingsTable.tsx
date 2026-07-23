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
  isSafeMode?: boolean;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  config,
  matchedTeams,
  isSafeMode = false
}) => {
  return (
    <div className="w-full bg-[#001011] border border-[#B4C3C3]/40 rounded-2xl p-2.5 flex flex-col justify-between overflow-hidden shadow-xl">
      {/* Table Header Bar (Light Gray Rounded Pill) */}
      <div
        className="w-full h-[50px] bg-[#D0D0D0] text-[#050505] font-extrabold text-[20px] rounded-xl grid items-center mb-1 shrink-0 uppercase tracking-wide"
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

      {/* 20 Team Rows */}
      <div className="flex flex-col rounded-lg overflow-hidden border border-[#B4C3C3]/15">
        {standings.slice(0, 20).map((row, idx) => {
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
              isEven={isEven}
              isSafeMode={isSafeMode}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StandingsTable;

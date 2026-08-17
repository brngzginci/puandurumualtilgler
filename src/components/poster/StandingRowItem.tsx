/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { StandingRow, DesignConfig, Team } from "../../types";
import { TeamLogo, TeamLogoPlaceholder } from "../DesignCanvas";
import { getRankZoneColor } from "../../design/posterTheme";

interface StandingRowItemProps {
  row: StandingRow;
  rank: number;
  config: DesignConfig;
  team: Team | null;
  isEven: boolean;
  isSafeMode?: boolean;
}

export const StandingRowItem: React.FC<StandingRowItemProps> = ({
  row,
  rank,
  config,
  team,
  isEven,
  isSafeMode = false
}) => {
  const zoneColor = getRankZoneColor(rank, config);
  const rowBg = isEven ? "#002326" : "#001113";

  // Format goal difference with sign
  const formattedAV =
    row.goalDifference > 0
      ? `+${row.goalDifference}`
      : `${row.goalDifference}`;

  return (
    <div
      className="w-full grid items-center text-white h-[42px] transition-colors"
      style={{
        gridTemplateColumns:
          "110px minmax(310px, 1fr) 52px 52px 52px 52px 60px 60px 66px 56px",
        backgroundColor: rowBg
      }}
    >
      {/* 1. SIRA Rank Block */}
      <div className="flex items-center justify-start h-full pl-2">
        <div
          className="w-[68px] h-[34px] rounded-r-xl flex items-center justify-center font-extrabold text-[22px] text-white shadow-sm"
          style={{ backgroundColor: zoneColor }}
        >
          {rank}
        </div>
      </div>

      {/* 2. TAKIM (Logo + Name) */}
      <div className="flex items-center gap-2.5 overflow-hidden pr-2">
        <div className="w-[40px] h-[40px] shrink-0 flex items-center justify-center">
          {isSafeMode ? (
            <TeamLogoPlaceholder shortName={row.teamName} />
          ) : (
            <TeamLogo
              team={team}
              rawTeamName={row.teamName}
              customLogo={team?.logo}
              borderRadius="rounded-md"
            />
          )}
        </div>
        <span
          className="font-bold text-[#F5F5F5] text-[22px] truncate tracking-tight"
          style={{
            fontFamily: config.bodyFontFamily || "'Plus Jakarta Sans Variable', sans-serif"
          }}
        >
          {team?.displayName || row.teamName}
        </span>
      </div>

      {/* 3. O (Played) */}
      <div className="text-center text-[#F5F5F5] font-normal text-[20px] tabular-nums">
        {row.played}
      </div>

      {/* 4. G (Won) */}
      <div className="text-center text-[#F5F5F5] font-normal text-[20px] tabular-nums">
        {row.won}
      </div>

      {/* 5. B (Drawn) */}
      <div className="text-center text-[#F5F5F5] font-normal text-[20px] tabular-nums">
        {row.drawn}
      </div>

      {/* 6. M (Lost) */}
      <div className="text-center text-[#F5F5F5] font-normal text-[20px] tabular-nums">
        {row.lost}
      </div>

      {/* 7. AG (Goals For) */}
      <div className="text-center text-[#F5F5F5] font-normal text-[20px] tabular-nums">
        {row.goalsFor}
      </div>

      {/* 8. YG (Goals Against) */}
      <div className="text-center text-[#F5F5F5] font-normal text-[20px] tabular-nums">
        {row.goalsAgainst}
      </div>

      {/* 9. AV (Goal Difference) */}
      <div className="text-center text-[#F5F5F5] font-semibold text-[20px] tabular-nums">
        {formattedAV}
      </div>

      {/* 10. P (Points) */}
      <div className="text-center text-[#F5F5F5] font-extrabold text-[22px] tabular-nums">
        {row.points}
      </div>
    </div>
  );
};

export default StandingRowItem;

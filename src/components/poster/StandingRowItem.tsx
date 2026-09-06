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
  teamLogos?: Record<string, string>;
  isEven: boolean;
  isSafeMode?: boolean;
  rowHeight?: number;
  rankPillHeight?: number;
  teamFontSize?: number;
  statFontSize?: number;
  rankFontSize?: number;
  pointsFontSize?: number;
  logoDimension?: number;
}

export const StandingRowItem: React.FC<StandingRowItemProps> = ({
  row,
  rank,
  config,
  team,
  teamLogos,
  isEven,
  isSafeMode = false,
  rowHeight = 41,
  rankPillHeight = 34,
  teamFontSize = 21,
  statFontSize = 19,
  rankFontSize,
  pointsFontSize,
  logoDimension: logoDimensionProp
}) => {
  const zoneColor = getRankZoneColor(rank, config);
  const rowBg = isEven ? "#002326" : "#001113";

  // Resolve custom logo from uploaded/mapped logos or team object
  const customLogo =
    (teamLogos &&
      (teamLogos[row.teamId] ||
        (team?.id && teamLogos[team.id]) ||
        (team?.displayName && teamLogos[team.displayName]) ||
        teamLogos[row.teamName])) ||
    team?.logo;

  // Format goal difference with sign
  const formattedAV =
    row.goalDifference > 0
      ? `+${row.goalDifference}`
      : `${row.goalDifference}`;

  const resolvedLogoDimension = logoDimensionProp || Math.min(rowHeight - 6, 42);
  const resolvedRankFontSize = rankFontSize || Math.min(22, Math.max(16, Math.round(rowHeight * 0.48)));
  const resolvedPointsFontSize = pointsFontSize || Math.min(24, Math.max(18, Math.round(rowHeight * 0.50)));

  return (
    <div
      className="w-full grid items-center text-white transition-colors"
      style={{
        height: `${rowHeight}px`,
        gridTemplateColumns:
          "110px minmax(310px, 1fr) 52px 52px 52px 52px 60px 60px 66px 56px",
        backgroundColor: rowBg
      }}
    >
      {/* 1. SIRA Rank Block */}
      <div className="flex items-center justify-start h-full pl-2">
        <div
          className="w-[68px] rounded-r-xl flex items-center justify-center font-extrabold text-white shadow-sm"
          style={{
            height: `${rankPillHeight}px`,
            fontSize: `${resolvedRankFontSize}px`,
            backgroundColor: zoneColor
          }}
        >
          {rank}
        </div>
      </div>

      {/* 2. TAKIM (Logo + Name) */}
      <div className="flex items-center gap-2.5 overflow-hidden pr-2">
        <div
          className="shrink-0 flex items-center justify-center"
          style={{ width: `${resolvedLogoDimension}px`, height: `${resolvedLogoDimension}px` }}
        >
          {isSafeMode ? (
            <TeamLogoPlaceholder shortName={row.teamName} />
          ) : (
            <TeamLogo
              team={team}
              rawTeamName={row.teamName}
              customLogo={customLogo}
              borderRadius="rounded-md"
            />
          )}
        </div>
        <span
          className="font-bold text-[#F5F5F5] truncate tracking-tight"
          style={{
            fontSize: `${teamFontSize}px`,
            fontFamily:
              config.bodyFontFamily ||
              "'Plus Jakarta Sans Variable', sans-serif"
          }}
        >
          {team?.displayName || row.teamName}
        </span>
      </div>

      {/* 3. O (Played) */}
      <div
        className="text-center text-[#F5F5F5] font-normal tabular-nums"
        style={{ fontSize: `${statFontSize}px` }}
      >
        {row.played}
      </div>

      {/* 4. G (Won) */}
      <div
        className="text-center text-[#F5F5F5] font-normal tabular-nums"
        style={{ fontSize: `${statFontSize}px` }}
      >
        {row.won}
      </div>

      {/* 5. B (Drawn) */}
      <div
        className="text-center text-[#F5F5F5] font-normal tabular-nums"
        style={{ fontSize: `${statFontSize}px` }}
      >
        {row.drawn}
      </div>

      {/* 6. M (Lost) */}
      <div
        className="text-center text-[#F5F5F5] font-normal tabular-nums"
        style={{ fontSize: `${statFontSize}px` }}
      >
        {row.lost}
      </div>

      {/* 7. AG (Goals For) */}
      <div
        className="text-center text-[#F5F5F5] font-normal tabular-nums"
        style={{ fontSize: `${statFontSize}px` }}
      >
        {row.goalsFor}
      </div>

      {/* 8. YG (Goals Against) */}
      <div
        className="text-center text-[#F5F5F5] font-normal tabular-nums"
        style={{ fontSize: `${statFontSize}px` }}
      >
        {row.goalsAgainst}
      </div>

      {/* 9. AV (Goal Difference) */}
      <div
        className="text-center text-[#F5F5F5] font-semibold tabular-nums"
        style={{ fontSize: `${statFontSize}px` }}
      >
        {formattedAV}
      </div>

      {/* 10. P (Points) */}
      <div
        className="text-center text-[#F5F5F5] font-extrabold tabular-nums"
        style={{ fontSize: `${resolvedPointsFontSize}px` }}
      >
        {row.points}
      </div>
    </div>
  );
};

export default StandingRowItem;

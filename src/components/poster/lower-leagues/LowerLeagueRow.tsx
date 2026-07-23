/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { StandingRow, DesignConfig, Team, LeagueZoneDefinition } from "../../../types";

interface LowerLeagueRowProps {
  row: StandingRow;
  index: number;
  matchedTeam?: Team | null;
  config: DesignConfig;
  teamLogoUrl?: string;
  rowHeight: number;
}

export const LowerLeagueRow: React.FC<LowerLeagueRowProps> = ({
  row,
  index,
  matchedTeam,
  config,
  teamLogoUrl,
  rowHeight
}) => {
  const isEven = index % 2 === 0;
  const position = row.position ?? row.rank ?? (index + 1);

  // Rank Zone Color Determination based on row.position
  const zones: LeagueZoneDefinition[] = (config as any).zoneDefinitions;
  let rankBg = "transparent";
  let rankTextColor = "#FFFFFF";

  if (zones && Array.isArray(zones) && zones.length > 0) {
    const activeZones = zones.filter((z) => z.isEnabled).sort((a, b) => a.displayOrder - b.displayOrder);
    const matchedZone = activeZones.find((z) => position >= z.startPosition && position <= z.endPosition);

    if (matchedZone) {
      rankBg = matchedZone.color;
      const lower = matchedZone.color.toLowerCase();

      if (
        lower === "#d6e600" ||
        lower === "#ffffff" ||
        lower === "#ffff00" ||
        lower === "yellow"
      ) {
        rankTextColor = "#000000";
      } else {
        rankTextColor = "#FFFFFF";
      }
    }
  } else if (config) {
    if (
      position >= (config.directPromotionStart ?? 1) &&
      position <= (config.directPromotionEnd ?? 1)
    ) {
      rankBg = "#128C08";
    } else if (
      config.playoffFinalPosition &&
      position === config.playoffFinalPosition
    ) {
      rankBg = "#078ECC";
    } else if (
      position >= (config.playoffStart ?? 3) &&
      position <= (config.playoffEnd ?? 6)
    ) {
      rankBg = "#D6E600";
      rankTextColor = "#000000";
    } else if (
      position >= (config.relegationStart ?? 16) &&
      position <= (config.relegationEnd ?? 18)
    ) {
      rankBg = "#B90000";
    }
  }

  const teamDisplayName =
    matchedTeam?.shortName ||
    matchedTeam?.displayName ||
    row.teamName;

  const teamId =
    (row as any).teamId ||
    (matchedTeam as any)?.id ||
    "";

  const shieldPlaceholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.7)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>";

  const logoCandidates = [
    teamId
      ? `/logos/${encodeURIComponent(teamId)}.png`
      : "",
    teamLogoUrl || "",
    matchedTeam?.defaultLogo || "",
    shieldPlaceholder
  ].filter((logo) => logo.length > 0);

  const logoSrc = logoCandidates[0] || shieldPlaceholder;

  return (
    <div
      className={`lower-league-row ${isEven ? "lower-league-row-even" : "lower-league-row-odd"}`}
      style={{ height: `${rowHeight}px` }}
    >
      {/* Team Column (Rank + Logo + Name) */}
      <div className="lower-league-col-team">
        <div
          className="lower-league-rank-cell"
          style={{ backgroundColor: rankBg, color: rankTextColor }}
        >
          {position}
        </div>

        <div className="lower-league-team-logo-container">
          <img
            src={logoSrc}
            alt={teamDisplayName}
            className="lower-league-team-logo"
            data-logo-index="0"
            onError={(e) => {
              const image = e.currentTarget;
              const currentIndex = Number(image.dataset.logoIndex || "0");
              const nextIndex = currentIndex + 1;
              const nextLogo = logoCandidates[nextIndex];

              if (nextLogo) {
                image.dataset.logoIndex = String(nextIndex);
                image.src = nextLogo;
              } else {
                image.onerror = null;
                image.src = shieldPlaceholder;
              }
            }}
          />
        </div>

        <span className="lower-league-team-name">
          {teamDisplayName}
        </span>
      </div>

      {/* Stats Columns: O, G, B, M, AG, YG, AV, P */}
      <div className="lower-league-col-stats">
        <div className="lower-league-stat-cell lower-league-stat-val">
          {row.played ?? row.matchesPlayed ?? 0}
        </div>

        <div className="lower-league-stat-cell lower-league-stat-val">
          {row.won ?? 0}
        </div>

        <div className="lower-league-stat-cell lower-league-stat-val">
          {row.drawn ?? 0}
        </div>

        <div className="lower-league-stat-cell lower-league-stat-val">
          {row.lost ?? 0}
        </div>

        <div className="lower-league-stat-cell-lg lower-league-stat-val">
          {row.goalsFor ?? 0}
        </div>

        <div className="lower-league-stat-cell-lg lower-league-stat-val">
          {row.goalsAgainst ?? 0}
        </div>

        <div className="lower-league-stat-cell-av lower-league-stat-val">
          {(row.goalDifference ?? 0) > 0
            ? `+${row.goalDifference}`
            : row.goalDifference ?? 0}
        </div>

        <div className="lower-league-stat-cell-points lower-league-stat-val-pts">
          {row.points ?? 0}
        </div>
      </div>
    </div>
  );
};

export default LowerLeagueRow;
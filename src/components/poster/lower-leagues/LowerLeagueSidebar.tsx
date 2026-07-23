/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CompetitionConfig, CompetitionGroup } from "../../../config/competitions";

interface LowerLeagueSidebarProps {
  competition: CompetitionConfig;
  group: CompetitionGroup;
  currentWeek: number;
  season?: string;
}

export const LowerLeagueSidebar: React.FC<LowerLeagueSidebarProps> = ({
  competition,
  group,
  currentWeek,
  season = "2026/27"
}) => {
  const is2ndLeague = competition.id === "tff-2-lig";
  const is3rdLeague = competition.id === "tff-3-lig";

  const logoSrc = is2ndLeague || is3rdLeague
    ? "/branding/lig-logo.png"
    : "/branding/altligler-logo.png";

  const numOnly = is2ndLeague ? "2" : is3rdLeague ? "3" : "1";
  const leagueNumText = `${numOnly}.`;

  const displayedWeek = String(currentWeek || 0).padStart(2, "0");
  const seasonText = season ? (season.includes("SEZONU") ? season : `${season} SEZONU`) : "2026/27 SEZONU";

  return (
    <div className="lower-league-sidebar">
      {/* Decorative Watermark & Subtle Pitch Pattern */}
      <div className="lower-league-sidebar-watermark" aria-hidden="true">
        {numOnly}
      </div>
      <div className="lower-league-sidebar-pattern" aria-hidden="true" />

      {/* Top Branding Logo */}
      <div className="lower-league-sidebar-logo-box">
        <img
          src={logoSrc}
          alt={competition.name}
          className="lower-league-sidebar-logo-img"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/branding/altligler-logo.png";
          }}
        />
      </div>

      {/* Vertical League Title Block */}
      <div className="lower-league-sidebar-title-container">
        <div className="lower-league-sidebar-league-num">{leagueNumText}</div>
        <div className="lower-league-sidebar-league-text">LİG</div>

        {competition.requiresGroup && group && (
          <div className="lower-league-sidebar-group-badge">
            {group.name.toUpperCase()}
          </div>
        )}

        {/* Season Info */}
        <div className="lower-league-sidebar-season">
          {seasonText}
        </div>
      </div>

      {/* Week Card */}
      <div className="lower-league-week-card">
        <div className="lower-league-week-title">MAÇ HAFTASI</div>
        <div className="lower-league-week-num">{displayedWeek}</div>
        <div className="lower-league-week-sub">HAFTA</div>
      </div>
    </div>
  );
};

export default LowerLeagueSidebar;


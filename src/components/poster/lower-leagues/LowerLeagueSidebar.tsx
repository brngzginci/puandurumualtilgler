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
  customLeagueLogo?: string;
}

export const LowerLeagueSidebar: React.FC<LowerLeagueSidebarProps> = ({
  competition,
  group,
  currentWeek,
  season = "2026/27",
  customLeagueLogo
}) => {
  const is2ndLeague = competition.id === "tff-2-lig";
  const is3rdLeague = competition.id === "tff-3-lig";

  // Build ordered candidates list for league logo
  const candidates = React.useMemo(() => {
    const list: string[] = [];

    // 1. User uploaded custom logo for this league
    if (customLeagueLogo && customLeagueLogo.trim()) {
      list.push(customLeagueLogo.trim());
    }

    // 2. Specific league logos
    if (is2ndLeague) {
      list.push(
        "/branding/2-lig-logo.png",
        "/branding/2-lig-logo.PNG",
        "/branding/nesine-2-lig.png",
        "/branding/nesine-2-lig.PNG",
        "/branding/2-lig.png",
        "/branding/2-lig.PNG",
        "/branding/tff-2-lig.png",
        "/branding/tff-2-lig.PNG",
        "/branding/2-lig-logo.svg",
        "/branding/2-lig.svg",
        "/branding/altligler-logo.png",
        "/branding/altligler-logo.svg"
      );
    } else if (is3rdLeague) {
      list.push(
        "/branding/3-lig-logo.png",
        "/branding/3-lig-logo.PNG",
        "/branding/nesine-3-lig.png",
        "/branding/nesine-3-lig.PNG",
        "/branding/3-lig.png",
        "/branding/3-lig.PNG",
        "/branding/tff-3-lig.png",
        "/branding/tff-3-lig.PNG",
        "/branding/3-lig-logo.svg",
        "/branding/3-lig.svg",
        "/branding/altligler-logo.png",
        "/branding/altligler-logo.svg"
      );
    } else {
      list.push(
        "/branding/altligler-logo.png",
        "/branding/altligler-logo.svg"
      );
    }

    return list;
  }, [customLeagueLogo, is2ndLeague, is3rdLeague]);

  const [candidateIndex, setCandidateIndex] = React.useState(0);

  React.useEffect(() => {
    setCandidateIndex(0);
  }, [candidates]);

  const logoSrc = candidates[candidateIndex] || "/branding/altligler-logo.png";

  const handleLogoError = () => {
    setCandidateIndex((prev) => {
      if (prev + 1 < candidates.length) {
        return prev + 1;
      }
      return prev;
    });
  };

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
          key={logoSrc}
          src={logoSrc}
          alt={competition.name}
          className="lower-league-sidebar-logo-img"
          onError={handleLogoError}
        />
      </div>

      {/* Vertical League Title Block */}
      <div className="lower-league-sidebar-title-container">
        <div className="lower-league-sidebar-league-num">{leagueNumText}</div>
        <div className="lower-league-sidebar-league-text">LİG</div>

        {competition.requiresGroup && group && (
          <div lang="tr" className="lower-league-sidebar-group-badge">
            {group.name.toLocaleUpperCase("tr-TR")}
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


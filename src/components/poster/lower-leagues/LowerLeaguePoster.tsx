/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { StandingRow, DesignConfig, Team } from "../../../types";
import { CompetitionConfig, CompetitionGroup } from "../../../config/competitions";
import LowerLeagueSidebar from "./LowerLeagueSidebar";
import LowerLeagueHeader from "./LowerLeagueHeader";
import LowerLeagueSocialStrip from "./LowerLeagueSocialStrip";
import LowerLeagueTable from "./LowerLeagueTable";
import LowerLeagueFooter from "./LowerLeagueFooter";
import "./LowerLeaguePoster.css";

interface LowerLeaguePosterProps {
  competition: CompetitionConfig;
  group: CompetitionGroup;
  standings: StandingRow[];
  config: DesignConfig;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  matchedTeams: Record<string, Team | null>;
  teamLogos?: Record<string, string>;
}

export const LowerLeaguePoster: React.FC<LowerLeaguePosterProps> = ({
  competition,
  group,
  standings,
  config,
  canvasRef,
  matchedTeams,
  teamLogos = {}
}) => {
  const sortedStandings = [...standings].sort(
    (a, b) => (a.position ?? a.rank ?? 0) - (b.position ?? b.rank ?? 0)
  );

  return (
    <div
      id="lower-league-poster-canvas"
      ref={canvasRef}
      className="lower-league-poster-root shadow-2xl select-none"
    >
      {/* Left Orange Sidebar */}
      <LowerLeagueSidebar
        competition={competition}
        group={group}
        currentWeek={config.currentWeek || 0}
        season={config.season}
      />

      {/* Right Main Content Area */}
      <div className="lower-league-main">
        {/* Header */}
        <LowerLeagueHeader
          competition={competition}
          group={group}
          season={config.season}
          titleOverride={config.title}
          subtitleOverride={config.subtitle}
        />

        {/* Social Media Strip */}
        <LowerLeagueSocialStrip />

        {/* Standings Table */}
        <LowerLeagueTable
          standings={sortedStandings}
          config={config}
          matchedTeams={matchedTeams}
          teamLogos={teamLogos}
        />

        {/* Footer */}
        <LowerLeagueFooter competition={competition} config={config} />
      </div>
    </div>
  );
};

export default LowerLeaguePoster;

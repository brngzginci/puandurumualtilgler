/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { StandingRow, DesignConfig, Team } from "../../types";
import { CompetitionConfig, CompetitionGroup } from "../../config/competitions";
import PosterHeader from "./PosterHeader";
import StandingsTable from "./StandingsTable";
import LeagueLegend from "./LeagueLegend";
import WeekCard from "./WeekCard";
import PosterNote from "./PosterNote";
import YouTubeStrip from "./YouTubeStrip";
import SocialMediaStrip from "./SocialMediaStrip";
import "./StandingsPoster.css";

export interface StandingsPosterProps {
  standings: StandingRow[];
  config: DesignConfig;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  matchedTeams: Record<string, Team | null>;
  competition?: CompetitionConfig;
  group?: CompetitionGroup;
  teamLogos?: Record<string, string>;
  isSafeMode?: boolean;
}

export const StandingsPoster: React.FC<StandingsPosterProps> = ({
  standings,
  config,
  canvasRef,
  matchedTeams,
  competition,
  group,
  teamLogos,
  isSafeMode = false
}) => {
  // Dynamic calculation for standard total weeks based on team count
  // Formula: if even -> (teams - 1) * 2; if odd -> teams * 2
  const teamCount = standings?.length || 20;
  const dynamicTotalWeeks =
    teamCount % 2 === 0 ? (teamCount - 1) * 2 : teamCount * 2;

  const resolvedTotalWeeks = config.totalWeeks || dynamicTotalWeeks;

  return (
    <div
      id="football-standings-canvas"
      ref={canvasRef}
      className="poster-canvas-root shadow-2xl select-none"
    >
      {/* Subtle Inner Frame Accent */}
      <div className="poster-inner-frame" />

      {/* 1. Header Area */}
      <PosterHeader
        config={config}
        competition={competition}
        group={group}
      />

      {/* 2. Main Standings Table (Supports any team count dynamically: 16, 17, 18, 20 etc.) */}
      <StandingsTable
        standings={standings}
        config={config}
        matchedTeams={matchedTeams}
        teamLogos={teamLogos}
        isSafeMode={isSafeMode}
      />

      {/* 3. Bottom Section (Legend + Week Card + Note & Social Strip) */}
      <div className="w-full h-[215px] shrink-0 flex items-stretch justify-between gap-3.5 pt-1">
        {/* Sol Alt: League Legend */}
        <LeagueLegend
          config={config}
          competition={competition}
          teamCount={teamCount}
        />

        {/* Orta: Week Card */}
        <WeekCard
          currentWeek={config.currentWeek}
          totalWeeks={resolvedTotalWeeks}
        />

        {/* Sağ Alt: Dynamic Note + YouTube Strip + Social Media Strip */}
        <div className="flex-1 h-full bg-[#001011] border border-[#B4C3C3]/30 rounded-2xl p-2.5 flex flex-col justify-between shadow-md">
          <PosterNote
            noteText={config.noteText}
            currentWeek={config.currentWeek}
          />
          <YouTubeStrip />
          <SocialMediaStrip />
        </div>
      </div>
    </div>
  );
};

export default StandingsPoster;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { StandingRow, DesignConfig, Team } from "../../types";
import PosterHeader from "./PosterHeader";
import StandingsTable from "./StandingsTable";
import LeagueLegend from "./LeagueLegend";
import WeekCard from "./WeekCard";
import PosterNote from "./PosterNote";
import SocialMediaStrip from "./SocialMediaStrip";
import "./StandingsPoster.css";

interface StandingsPosterProps {
  standings: StandingRow[];
  config: DesignConfig;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  matchedTeams: Record<string, Team | null>;
  isSafeMode?: boolean;
}

export const StandingsPoster: React.FC<StandingsPosterProps> = ({
  standings,
  config,
  canvasRef,
  matchedTeams,
  isSafeMode = false
}) => {
  return (
    <div
      id="football-standings-canvas"
      ref={canvasRef}
      className="poster-canvas-root shadow-2xl select-none"
    >
      {/* Subtle Inner Frame Accent */}
      <div className="poster-inner-frame" />

      {/* 1. Header Area */}
      <PosterHeader config={config} />

      {/* 2. Main Standings Table (20 Teams) */}
      <StandingsTable
        standings={standings}
        config={config}
        matchedTeams={matchedTeams}
        isSafeMode={isSafeMode}
      />

      {/* 3. Bottom Section (Legend + Week Card + Note & Social Strip) */}
      <div className="w-full h-[215px] shrink-0 flex items-stretch justify-between gap-3.5 pt-1">
        {/* Sol Alt: League Legend */}
        <LeagueLegend config={config} />

        {/* Orta: Week Card */}
        <WeekCard
          currentWeek={config.currentWeek}
          totalWeeks={config.totalWeeks}
        />

        {/* Sağ Alt: Dynamic Note + Social Media Strip */}
        <div className="flex-1 h-full bg-[#001011] border border-[#B4C3C3]/30 rounded-2xl p-3 flex flex-col justify-between shadow-md">
          <PosterNote
            noteText={config.noteText}
            currentWeek={config.currentWeek}
          />
          <SocialMediaStrip />
        </div>
      </div>
    </div>
  );
};

export default StandingsPoster;

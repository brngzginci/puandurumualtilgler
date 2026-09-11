import React, { forwardRef } from 'react';
import type { Fixture } from '../../types/fixture';
import { PosterHeader } from './PosterHeader';
import { MatchGrid } from './MatchGrid';
import { PosterFooter } from './PosterFooter';

interface PosterCanvasProps {
  week: number;
  season?: string;
  leagueId?: string;
  leagueName?: string;
  groupName?: string;
  matches: Fixture[];
}

export const PosterCanvas = forwardRef<HTMLDivElement, PosterCanvasProps>(
  ({ week, season = '2026-2027', leagueId = 'trendyol-1-lig', leagueName = 'TRENDYOL 1. LİG', groupName, matches }, ref) => {
    return (
      <div
        ref={ref}
        id="alt-ligler-poster-canvas"
        style={{ width: '1080px', height: '1350px' }}
        className="relative bg-[#040C12] text-white p-8 flex flex-col justify-between overflow-hidden select-none font-sans border border-cyan-900/50 shadow-2xl"
      >
        {/* Background Graphic Accents & Broadcast Lighting */}
        {/* Top-left Cyan Stadium Floodlight */}
        <div className="absolute -top-36 -left-36 w-[600px] h-[600px] rounded-full bg-[#00AFAF]/22 blur-[140px] pointer-events-none" />
        
        {/* Top-right Orange Spotlight */}
        <div className="absolute -top-36 -right-36 w-[600px] h-[600px] rounded-full bg-[#FF6500]/20 blur-[140px] pointer-events-none" />

        {/* Bottom Center Stadium Glow */}
        <div className="absolute -bottom-44 left-1/2 -translate-x-1/2 w-[800px] h-[550px] rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none" />

        {/* Diagonal Pitch Mesh Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, #00AFAF 0, #00AFAF 2px, transparent 0, transparent 28px), repeating-linear-gradient(45deg, #FF6500 0, #FF6500 1px, transparent 0, transparent 56px)`,
          }}
        />

        {/* Technical Corner Brackets */}
        <div className="absolute inset-3.5 rounded-2xl border border-cyan-500/20 pointer-events-none" />
        <div className="absolute top-3.5 left-3.5 w-14 h-14 border-t-2 border-l-2 border-[#00AFAF] rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-3.5 right-3.5 w-14 h-14 border-t-2 border-r-2 border-[#FF6500] rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-3.5 left-3.5 w-14 h-14 border-b-2 border-l-2 border-[#FF6500] rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-3.5 right-3.5 w-14 h-14 border-b-2 border-r-2 border-[#00AFAF] rounded-br-2xl pointer-events-none" />

        {/* Poster Header (Top ~22-25%) */}
        <div className="flex-none z-10">
          <PosterHeader
            week={week}
            season={season}
            leagueId={leagueId}
            leagueName={leagueName}
            groupName={groupName}
            matches={matches}
          />
        </div>

        {/* Matches Grid (Middle Hero Section ~65-68%) */}
        <div className="flex-1 mt-0 mb-1 sm:mt-0 sm:mb-2 flex flex-col justify-center z-10 min-h-0">
          <MatchGrid matches={matches} />
        </div>

        {/* Poster Footer (Bottom ~10-12%) */}
        <div className="flex-none z-10 mt-auto">
          <PosterFooter />
        </div>
      </div>
    );
  }
);

PosterCanvas.displayName = 'PosterCanvas';




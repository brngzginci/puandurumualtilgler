import React from 'react';
import type { Fixture } from '../../types/fixture';
import altLiglerLogo from '../../../assets/AltLigler.png';
import logo1Lig from '../../../assets/logo1.lig.png';
import logo2Lig from '../../../assets/logo2.lig.png';
import logo3Lig from '../../../assets/logo3.lig.png';

interface PosterHeaderProps {
  week: number;
  season?: string;
  leagueId?: string;
  leagueName?: string;
  groupName?: string;
  matches: Fixture[];
}

export const PosterHeader: React.FC<PosterHeaderProps> = ({
  week,
  season = '2026-2027',
  leagueId = 'trendyol-1-lig',
  leagueName = 'TRENDYOL 1. LİG',
  groupName,
  matches = [],
}) => {
  // Determine if the week is mostly played or upcoming
  const safeMatches = matches || [];
  const playedCount = safeMatches.filter(
    (m) =>
      m?.status === 'played' ||
      (m?.homeScore !== null &&
        m?.awayScore !== null &&
        m?.homeScore !== undefined &&
        m?.awayScore !== undefined &&
        String(m?.homeScore).trim() !== '' &&
        String(m?.awayScore).trim() !== '')
  ).length;
  const isMostlyPlayed = safeMatches.length > 0 && playedCount >= Math.max(1, safeMatches.length / 2);

  const headlineText = isMostlyPlayed ? 'HAFTANIN SONUÇLARI' : 'GELECEK HAFTANIN FİKSTÜRÜ';

  // Determine official logo & alt text based on selected league
  let currentLeagueLogo = logo1Lig;
  let currentLeagueAlt = 'Trendyol 1. Lig Logo';
  const isVerticalLogo = leagueId === 'nesine-2-lig' || leagueId === 'nesine-3-lig';

  if (leagueId === 'nesine-2-lig') {
    currentLeagueLogo = logo2Lig;
    currentLeagueAlt = 'Nesine 2. Lig Logo';
  } else if (leagueId === 'nesine-3-lig') {
    currentLeagueLogo = logo3Lig;
    currentLeagueAlt = 'Nesine 3. Lig Logo';
  }

  // Strictly enforce Turkish dotted 'İ' in NESİNE and LİG
  const toTurkishUpper = (str: string | undefined | null): string => {
    if (!str) return '';
    return str
      .replace(/i/g, 'İ')
      .replace(/ı/g, 'I')
      .toLocaleUpperCase('tr-TR')
      .replace(/\bNESINE\b/g, 'NESİNE')
      .replace(/\bLIG\b/g, 'LİG');
  };

  let officialLeagueTitle = 'TRENDYOL 1. LİG';
  if (leagueId === 'nesine-2-lig') {
    officialLeagueTitle = 'NESİNE 2. LİG';
  } else if (leagueId === 'nesine-3-lig') {
    officialLeagueTitle = 'NESİNE 3. LİG';
  } else if (leagueName) {
    officialLeagueTitle = toTurkishUpper(leagueName);
  }

  const groupFormatted = groupName ? toTurkishUpper(groupName) : '';

  const displaySubtitle = groupFormatted
    ? `${officialLeagueTitle} • ${groupFormatted}`
    : officialLeagueTitle;

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-10 mb-0 pt-1">
      {/* Top Header Row with Official Brand & League Logos */}
      <div className="w-full flex items-center justify-between px-2 mb-2">
        {/* Left: Alt Ligler Official Logo */}
        <div className="flex items-center gap-3">
          <img
            src={altLiglerLogo}
            alt="Alt Ligler Logo"
            className="h-20 w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,175,175,0.45)]"
          />
        </div>

        {/* Right: League Official Logo */}
        <div className="flex items-center gap-2">
          <img
            src={currentLeagueLogo}
            alt={currentLeagueAlt}
            className={`${
              isVerticalLogo ? 'h-28' : 'h-24'
            } w-auto object-contain drop-shadow-[0_4px_20px_rgba(255,101,0,0.4)]`}
          />
        </div>
      </div>

      {/* Main Editorial Headline Block */}
      <div className="flex flex-col items-center text-center w-full mt-1">
        {/* Subtitle - Competition Identity with guaranteed Turkish İ */}
        <span className="text-2xl font-black font-montserrat tracking-[0.25em] text-[#00AFAF] drop-shadow mb-1 whitespace-nowrap">
          {displaySubtitle}
        </span>

        {/* Big Editorial Display Headline */}
        <h1 className="text-6xl sm:text-7xl font-black font-bebas tracking-wider text-white leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] my-1 whitespace-nowrap">
          {headlineText}
        </h1>

        {/* Thin Glowing Accent Line */}
        <div className="w-80 h-[2px] bg-gradient-to-r from-transparent via-[#00AFAF] to-transparent my-1.5 opacity-90" />

        {/* Week & Season Sub-Headline Badge */}
        <div className="flex items-center gap-2.5 text-sm font-mono font-black tracking-[0.25em] text-cyan-200 bg-[#072430]/90 px-4 py-1 rounded-full border border-cyan-500/40 shadow-md whitespace-nowrap">
          <span className="text-[#FF6500] font-black">{week}. HAFTA</span>
          <span className="text-cyan-500/60">•</span>
          <span>{season} SEZONU</span>
        </div>
      </div>
    </div>
  );
};





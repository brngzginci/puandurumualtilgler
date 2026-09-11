import React from 'react';
import { Trophy, Layers, ShieldCheck } from 'lucide-react';
import type { LeagueId } from '../../types/fixture';

export interface LeagueOptionDef {
  id: LeagueId;
  name: string;
  uppercaseName: string;
  badge: string;
  matchCountText: string;
  totalWeeks: number;
  groups?: { id: string; name: string; uppercaseName?: string }[];
}

export const LEAGUES_CONFIG: LeagueOptionDef[] = [
  {
    id: 'trendyol-1-lig',
    name: 'Trendyol 1. Lig',
    uppercaseName: 'TRENDYOL 1. LİG',
    badge: '1. LİG',
    matchCountText: '10 Maç / Hafta',
    totalWeeks: 38,
  },
  {
    id: 'nesine-2-lig',
    name: 'Nesine 2. Lig',
    uppercaseName: 'NESİNE 2. LİG',
    badge: '2. LİG',
    matchCountText: '9 Maç / Hafta',
    totalWeeks: 34,
    groups: [
      { id: 'beyaz', name: 'Beyaz Grup', uppercaseName: 'BEYAZ GRUP' },
      { id: 'kirmizi', name: 'Kırmızı Grup', uppercaseName: 'KIRMIZI GRUP' },
    ],
  },
  {
    id: 'nesine-3-lig',
    name: 'Nesine 3. Lig',
    uppercaseName: 'NESİNE 3. LİG',
    badge: '3. LİG',
    matchCountText: '9 Maç / Hafta',
    totalWeeks: 34,
    groups: [
      { id: 'grup-1', name: '1. Grup', uppercaseName: '1. GRUP' },
      { id: 'grup-2', name: '2. Grup', uppercaseName: '2. GRUP' },
      { id: 'grup-3', name: '3. Grup', uppercaseName: '3. GRUP' },
    ],
  },
];

interface LeagueSelectorProps {
  selectedLeague: LeagueId;
  selectedGroup: string;
  onLeagueChange: (league: LeagueId) => void;
  onGroupChange: (group: string) => void;
  isLoading?: boolean;
}

export const LeagueSelector: React.FC<LeagueSelectorProps> = ({
  selectedLeague,
  selectedGroup,
  onLeagueChange,
  onGroupChange,
  isLoading = false,
}) => {
  const currentLeagueDef = LEAGUES_CONFIG.find((l) => l.id === selectedLeague) || LEAGUES_CONFIG[0];

  return (
    <div className="w-full bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col gap-3">
      {/* Header & Main League Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-zinc-200 font-montserrat flex items-center gap-1.5">
              <span>Lig Seçimi</span>
              <span className="text-[10px] text-zinc-500 font-mono font-normal">
                ({currentLeagueDef.matchCountText})
              </span>
            </h3>
            <p className="text-[11px] text-zinc-400">
              Poster tasarımını ve maç tablosunu seçilen lige göre hazırlar
            </p>
          </div>
        </div>

        {/* League Selector Buttons */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950/80 rounded-xl border border-zinc-800/80 w-full sm:w-auto">
          {LEAGUES_CONFIG.map((league) => {
            const isSelected = league.id === selectedLeague;
            return (
              <button
                key={league.id}
                onClick={() => onLeagueChange(league.id)}
                disabled={isLoading}
                className={`relative px-3 py-2 rounded-lg text-xs font-bold font-montserrat transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 disabled:opacity-50 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 border border-orange-400/50'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <span>{league.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Group Selection Bar (Rendered only when the league has multiple groups) */}
      {currentLeagueDef.groups && currentLeagueDef.groups.length > 0 && (
        <div className="pt-2 border-t border-zinc-800/70 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold font-montserrat mr-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Grup:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {currentLeagueDef.groups.map((group) => {
              const isGroupActive = selectedGroup === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => onGroupChange(group.id)}
                  disabled={isLoading}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border active:scale-95 disabled:opacity-50 ${
                    isGroupActive
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-500/20'
                      : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <ShieldCheck className={`w-3 h-3 ${isGroupActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  <span>{group.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

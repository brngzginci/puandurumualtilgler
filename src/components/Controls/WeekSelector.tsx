import React from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, Calendar, Sparkles } from 'lucide-react';

interface WeekSelectorProps {
  currentWeek: number;
  totalWeeks?: number;
  leagueTitle?: string;
  onWeekChange: (week: number) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  currentWeek,
  totalWeeks = 38,
  leagueTitle = 'Trendyol 1. Lig Maç ve Fikstür Seçimi',
  onWeekChange,
  onRefresh,
  isLoading,
}) => {
  const handlePrev = () => {
    if (currentWeek > 1) {
      onWeekChange(currentWeek - 1);
    }
  };

  const handleNext = () => {
    if (currentWeek < totalWeeks) {
      onWeekChange(currentWeek + 1);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= totalWeeks) {
      onWeekChange(val);
    }
  };

  return (
    <div className="w-full bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FF6500] to-amber-500 flex items-center justify-center text-white font-extrabold shadow-lg shadow-orange-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm uppercase tracking-wider font-black text-cyan-400 font-montserrat">
                Hafta Kontrolü
              </h2>
              <span className="text-[10px] bg-[#09222B] text-cyan-300 px-2.5 py-0.5 rounded-full font-mono border border-cyan-500/30 font-bold">
                2026-2027 Sezonu
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{leagueTitle}</p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <button
            onClick={handlePrev}
            disabled={currentWeek <= 1 || isLoading}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-200 text-xs font-semibold transition-all border border-zinc-700/60 active:scale-95"
            title="Önceki Hafta"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Önceki</span>
          </button>

          {/* Week Dropdown */}
          <div className="relative flex items-center">
            <Calendar className="w-4 h-4 text-amber-400 absolute left-3 pointer-events-none" />
            <select
              value={currentWeek}
              onChange={handleSelectChange}
              disabled={isLoading}
              className="appearance-none bg-zinc-950 text-amber-400 font-extrabold font-montserrat text-sm pl-9 pr-8 py-2 rounded-xl border border-amber-500/30 hover:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer shadow-inner text-center min-w-[140px] transition-all"
            >
              {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w} className="bg-zinc-900 text-zinc-100">
                  {w}. Hafta
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 text-zinc-400 text-xs">▼</div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentWeek >= totalWeeks || isLoading}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-200 text-xs font-semibold transition-all border border-zinc-700/60 active:scale-95"
            title="Sonraki Hafta"
          >
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center justify-center p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-amber-400 transition-all border border-zinc-700/60 active:scale-95 ml-1"
            title="Verileri Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-500' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-950/90 rounded-2xl border border-zinc-800/80 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center animate-pulse">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </div>

        <div>
          <h3 className="text-lg font-extrabold font-montserrat text-zinc-100 uppercase tracking-wider">
            Fikstür Yükleniyor
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Sahadan sunucularından güncel maç verileri çekiliyor...
          </p>
        </div>

        {/* Skeleton Preview Cards */}
        <div className="w-full space-y-2 mt-4 opacity-40">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-full bg-zinc-800/60 rounded-xl animate-pulse flex items-center justify-between px-4 border border-zinc-700/30"
            >
              <div className="h-3 w-20 bg-zinc-700 rounded"></div>
              <div className="h-4 w-12 bg-amber-500/30 rounded font-mono"></div>
              <div className="h-3 w-20 bg-zinc-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

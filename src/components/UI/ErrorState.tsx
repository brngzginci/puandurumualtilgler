import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-950/95 rounded-2xl border border-red-500/20 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg font-extrabold font-montserrat text-zinc-100 uppercase tracking-wider">
            Sahadan Verisi Alınamadı
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            {message || 'Maç sonuçları sunucudan çekilirken bir sorun oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.'}
          </p>
        </div>

        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer mt-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Tekrar Dene</span>
        </button>
      </div>
    </div>
  );
};

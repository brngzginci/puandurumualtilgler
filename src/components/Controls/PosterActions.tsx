import React, { useState } from 'react';
import { Download, CheckCircle2, AlertCircle, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { toPng } from 'html-to-image';

interface PosterActionsProps {
  posterRef: React.RefObject<HTMLDivElement | null>;
  week: number;
  disabled?: boolean;
}

export const PosterActions: React.FC<PosterActionsProps> = ({ posterRef, week, disabled = false }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [resolution, setResolution] = useState<'1080p' | '2k' | '4k'>('2k');

  const handleDownloadPng = async () => {
    if (!posterRef.current || isExporting || disabled) return;

    setIsExporting(true);
    setExportError(null);
    setExportSuccess(false);

    try {
      const node = posterRef.current;

      // 1. Ensure fonts are loaded
      if (document.fonts) {
        await document.fonts.ready;
      }

      // 2. Ensure all images inside poster are completely loaded
      const images = Array.from(node.querySelectorAll('img')) as HTMLImageElement[];
      await Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete && img.naturalWidth > 0) {
                resolve();
              } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }
            })
        )
      );

      // Brief delay for styling layout stabilization
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Choose ratio for target HD resolution
      let ratio = 2; // 2K Ultra HD default (2160x2700 px)
      if (resolution === '1080p') ratio = 1; // 1080x1350 px
      if (resolution === '4k') ratio = 3; // 3240x4050 px

      const exportOptions = {
        width: 1080,
        height: 1350,
        canvasWidth: 1080 * ratio,
        canvasHeight: 1350 * ratio,
        pixelRatio: ratio,
        backgroundColor: '#040C12',
        cacheBust: true,
        style: {
          transform: 'none',
          transformOrigin: 'top left',
          width: '1080px',
          height: '1350px',
        },
      };

      // Warmup pass
      try {
        await toPng(node, exportOptions);
      } catch (e) {
        // Cache warmup silently handled
      }

      // Final high-fidelity pass
      const dataUrl = await toPng(node, exportOptions);

      if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 1000) {
        throw new Error('Görsel üretimi boş kaldı. Lütfen tekrar deneyin.');
      }

      // Download file
      const filename = `alt-ligler-1-lig-hafta-${week}-${resolution.toUpperCase()}.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (err: any) {
      console.error('[PosterActions] Export error:', err);
      setExportError(err?.message || 'PNG oluşturulurken bir sorun oluştu.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#061820]/95 border border-cyan-900/60 rounded-2xl p-4 md:p-5 shadow-2xl backdrop-blur-md w-full">
      {/* Left Info */}
      <div className="flex items-center gap-3.5 w-full md:w-auto">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FF6500]/20 to-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 flex-shrink-0 shadow-inner">
          <ImageIcon className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black font-montserrat text-white uppercase tracking-wider">
              Yüksek Çözünürlüklü Poster Çıktısı
            </h3>
            <span className="bg-[#FF6500] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase font-mono tracking-wider shadow-sm">
              ULTRA HD
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            İnstagram 4:5 formatında kaymasız, kristal netliğinde HD PNG indir.
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
        {/* Quality Selector */}
        <div className="flex items-center gap-1 bg-[#030B0F] border border-cyan-900/80 p-1 rounded-xl text-xs font-mono">
          <button
            type="button"
            onClick={() => setResolution('1080p')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
              resolution === '1080p'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1080p
          </button>
          <button
            type="button"
            onClick={() => setResolution('2k')}
            className={`px-2.5 py-1.5 rounded-lg font-black transition-all flex items-center gap-1 ${
              resolution === '2k'
                ? 'bg-[#FF6500] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            2K HD (Tavsiye)
          </button>
          <button
            type="button"
            onClick={() => setResolution('4k')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
              resolution === '4k'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4K Ultra
          </button>
        </div>

        {/* Feedback badges */}
        {exportSuccess && (
          <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold px-3 py-2 bg-emerald-950/80 border border-emerald-500/40 rounded-xl animate-fade-in shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            HD İndirildi!
          </span>
        )}

        {exportError && (
          <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold px-3 py-2 bg-red-950/80 border border-red-500/40 rounded-xl" title={exportError}>
            <AlertCircle className="w-4 h-4 text-red-400" />
            Hata
          </span>
        )}

        {/* Main Action Download Button */}
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={isExporting || disabled}
          className="flex-1 md:flex-none flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6500] via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 disabled:opacity-50 text-white font-black font-montserrat text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-600/35 active:scale-95 cursor-pointer border border-orange-400/40"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>HD PNG Hazırlanıyor...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{resolution === '2k' ? '2K HD PNG İndir' : resolution === '4k' ? '4K PNG İndir' : '1080p PNG İndir'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

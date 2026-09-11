import React from 'react';
import {
  SiInstagram,
  SiX,
  SiFacebook,
  SiThreads,
  SiTiktok,
} from '@icons-pack/react-simple-icons';

export const PosterFooter: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-3 pb-1 mt-auto border-t border-cyan-500/30 text-slate-300 relative z-10">
      {/* Prominent Media Signature */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Large Brand Signature Title with Orange Slashes */}
        <div className="flex items-center gap-2.5 font-montserrat font-black text-4xl tracking-[0.25em] text-white uppercase leading-none drop-shadow-md whitespace-nowrap">
          <span className="text-[#FF6500] font-mono text-4xl font-extrabold">/</span>
          <span>ALT LİGLER</span>
          <span className="text-[#FF6500] font-mono text-4xl font-extrabold">/</span>
        </div>

        {/* Call to action subtitle */}
        <span className="text-xs font-mono text-[#00AFAF] uppercase tracking-[0.25em] font-extrabold mt-2 whitespace-nowrap">
          BİZİ SOSYAL MEDYADA TAKİP ET
        </span>
      </div>

      {/* Social Handles Bar (5 Platforms) */}
      <div className="w-full flex items-center justify-center gap-5 mt-2 pt-1.5 pb-0.5 border-t border-cyan-500/20 text-xs font-mono font-bold text-slate-200 whitespace-nowrap">
        {/* Instagram */}
        <div className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
          <SiInstagram className="w-4 h-4 text-[#00AFAF] flex-shrink-0" />
          <span>@altligler</span>
        </div>

        <span className="text-cyan-500/30 font-normal">|</span>

        {/* X (Twitter) */}
        <div className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
          <SiX className="w-4 h-4 text-[#00AFAF] flex-shrink-0" />
          <span>@AltLiglerTR</span>
        </div>

        <span className="text-cyan-500/30 font-normal">|</span>

        {/* Facebook */}
        <div className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
          <SiFacebook className="w-4 h-4 text-[#00AFAF] flex-shrink-0" />
          <span>@AltLiglerTR</span>
        </div>

        <span className="text-cyan-500/30 font-normal">|</span>

        {/* Threads */}
        <div className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
          <SiThreads className="w-4 h-4 text-[#00AFAF] flex-shrink-0" />
          <span>@altligler</span>
        </div>

        <span className="text-cyan-500/30 font-normal">|</span>

        {/* TikTok */}
        <div className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
          <SiTiktok className="w-4 h-4 text-[#00AFAF] flex-shrink-0" />
          <span>@altligler</span>
        </div>
      </div>
    </div>
  );
};





/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const YouTubeStrip: React.FC = () => {
  return (
    <div className="w-full h-[44px] bg-gradient-to-r from-[#2B0909] via-[#3D0C0C] to-[#2B0909] border border-[#FF0000]/40 rounded-xl px-3 flex items-center justify-between text-white shadow-md">
      {/* Left: YouTube Icon & Brand */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-5 bg-[#FF0000] rounded-md flex items-center justify-center shrink-0 shadow-sm">
          <svg className="w-3 h-3 fill-white ml-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span
          className="text-[12px] font-black tracking-wider uppercase text-white/90"
          style={{ fontFamily: "'Montserrat Variable', sans-serif" }}
        >
          YOUTUBE
        </span>
      </div>

      {/* Center/Right: Link */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className="text-[13px] font-bold text-[#FFFFFF] tracking-tight whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ fontFamily: "'Plus Jakarta Sans Variable', sans-serif" }}
        >
          youtube.com/@TransferMerkezi
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[#FF0000] text-white text-[10px] font-extrabold uppercase tracking-wide shrink-0">
          KATIL
        </span>
      </div>
    </div>
  );
};

export default YouTubeStrip;

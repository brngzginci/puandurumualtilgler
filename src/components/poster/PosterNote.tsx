/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface PosterNoteProps {
  noteText?: string;
  currentWeek?: number;
}

export const PosterNote: React.FC<PosterNoteProps> = ({
  noteText,
  currentWeek = 0
}) => {
  const formattedWeek =
    currentWeek < 10 ? `0${currentWeek}` : `${currentWeek}`;

  const defaultNote = "BİZİ SOSYAL MEDYADAN TAKİP EDİN";

  let textToRender = noteText && noteText.trim() ? noteText : defaultNote;

  // Replace placeholder if user entered {week}
  textToRender = textToRender.replace("{week}", formattedWeek);

  // Normalize all whitespace/newlines to a single clean line
  textToRender = textToRender.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();

  return (
    <div className="w-full h-[42px] bg-gradient-to-r from-[#001c1e] via-[#001618] to-[#001214] border border-[#B4C3C3]/30 rounded-xl px-3 flex items-center justify-center gap-2 shadow-sm overflow-hidden">
      <span className="w-2 h-2 rounded-full bg-[#F4510B] shrink-0 animate-pulse" />
      <p
        lang="tr"
        className="text-[#F1F5F9] font-bold text-[14.5px] leading-tight tracking-wide uppercase whitespace-nowrap overflow-hidden text-ellipsis text-center"
        style={{
          fontFamily: "'Plus Jakarta Sans Variable', 'Montserrat Variable', sans-serif"
        }}
      >
        {textToRender}
      </p>
      <span className="w-2 h-2 rounded-full bg-[#F4510B] shrink-0 animate-pulse" />
    </div>
  );
};

export default PosterNote;



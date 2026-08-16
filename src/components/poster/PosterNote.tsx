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

  const defaultNote = `+Ligin ${formattedWeek}. haftası itibarıyla güncel puan durumudur.`;

  let textToRender = noteText && noteText.trim() ? noteText : defaultNote;

  // Replace placeholder if user entered {week}
  textToRender = textToRender.replace("{week}", formattedWeek);

  // Normalize all whitespace/newlines to a single clean line
  textToRender = textToRender.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();

  return (
    <div className="w-full bg-gradient-to-r from-[#001c1e] via-[#001618] to-[#001214] border border-[#B4C3C3]/30 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm overflow-hidden">
      <span className="px-2 py-0.5 rounded-md bg-[#F4510B]/20 border border-[#F4510B]/50 text-[#FF7A00] text-[11px] font-extrabold tracking-wider uppercase shrink-0">
        NOT
      </span>
      <p
        lang="tr"
        className="text-[#F1F5F9] font-medium text-[15px] leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis flex-1"
        style={{
          fontFamily: "'Plus Jakarta Sans Variable', 'Montserrat Variable', sans-serif"
        }}
      >
        {textToRender}
      </p>
    </div>
  );
};

export default PosterNote;


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

  const defaultNote = `+Ligin ${formattedWeek}. haftası itibarıyla oynanan maçlar sonucu oluşan puan durumudur.\nEk olarak buraya dipnot eklenebilir.`;

  let textToRender = noteText && noteText.trim() ? noteText : defaultNote;

  // Replace placeholder if user entered {week}
  textToRender = textToRender.replace("{week}", formattedWeek);

  return (
    <div className="w-full flex-1 flex flex-col justify-center px-1">
      <p className="text-[#F5F5F5] font-normal text-[20px] leading-[1.3] whitespace-pre-line tracking-normal">
        {textToRender}
      </p>
    </div>
  );
};

export default PosterNote;

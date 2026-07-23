/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface WeekCardProps {
  currentWeek?: number;
  totalWeeks?: number;
}

export const WeekCard: React.FC<WeekCardProps> = ({
  currentWeek = 0,
  totalWeeks = 38
}) => {
  const formattedWeek =
    currentWeek < 10 ? `0${currentWeek}` : `${currentWeek}`;

  return (
    <div className="w-[190px] h-full flex flex-col items-center justify-center bg-[#001011] border border-[#B4C3C3]/30 rounded-2xl px-2 py-3 text-center shadow-md">
      <span className="text-[#C7CDCD] font-medium text-[20px] tracking-[0.2em] uppercase mb-1">
        HAFTA
      </span>
      <div className="flex items-baseline justify-center font-extrabold text-[#F5F5F5] leading-none">
        <span className="text-[68px] tracking-tight">{formattedWeek}</span>
        <span className="text-[32px] text-[#C7CDCD]/80 font-bold">/{totalWeeks}</span>
      </div>
    </div>
  );
};

export default WeekCard;

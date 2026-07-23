/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DesignConfig } from "../../types";

interface PosterHeaderProps {
  config: DesignConfig;
}

export const PosterHeader: React.FC<PosterHeaderProps> = ({ config }) => {
  const [altLogoFailed, setAltLogoFailed] = useState(false);
  const [ligLogoFailed, setLigLogoFailed] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-2 pt-2 pb-1 h-[190px] shrink-0 box-sizing-border">
      {/* Left: Alt Ligler Brand Logo */}
      <div className="w-[140px] h-[140px] shrink-0 flex items-center justify-center">
        {!altLogoFailed ? (
          <img
            src="/branding/altligler-logo.png"
            alt="Alt Ligler Logo"
            className="w-full h-full object-contain rounded-2xl"
            onError={() => setAltLogoFailed(true)}
          />
        ) : (
          <img
            src="/branding/altligler-logo.svg"
            alt="Alt Ligler Logo"
            className="w-full h-full object-contain rounded-2xl"
          />
        )}
      </div>

      {/* Center: Two-line Title */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <h1
          className="text-[#F5F5F5] font-extrabold uppercase tracking-tight text-center text-[54px] leading-[1.05]"
          style={{
            fontFamily: config.headerFontFamily || "'Montserrat Variable', 'Oswald Variable', sans-serif"
          }}
        >
          {config.title || "TRENDYOL 1. LİG"}
        </h1>
        <h2
          className="text-[#F5F5F5] font-extrabold uppercase tracking-tight text-center text-[54px] leading-[1.05]"
          style={{
            fontFamily: config.headerFontFamily || "'Montserrat Variable', 'Oswald Variable', sans-serif"
          }}
        >
          {config.subtitle || "PUAN DURUMU"}
        </h2>
      </div>

      {/* Right: Trendyol 1. Lig Logo in Light Panel */}
      <div className="w-[135px] h-[135px] shrink-0 flex items-center justify-center bg-white/95 rounded-2xl p-2.5 shadow-md">
        {!ligLogoFailed ? (
          <img
            src="/branding/lig-logo.png"
            alt="1. Lig Logo"
            className="w-full h-full object-contain"
            onError={() => setLigLogoFailed(true)}
          />
        ) : (
          <img
            src="/branding/lig-logo.svg"
            alt="1. Lig Logo"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </header>
  );
};

export default PosterHeader;

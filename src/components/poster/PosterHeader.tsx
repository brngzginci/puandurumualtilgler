/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DesignConfig } from "../../types";
import { CompetitionConfig, CompetitionGroup } from "../../config/competitions";

interface PosterHeaderProps {
  config: DesignConfig;
  competition?: CompetitionConfig;
  group?: CompetitionGroup;
}

export const PosterHeader: React.FC<PosterHeaderProps> = ({
  config,
  competition,
  group
}) => {
  const [altLogoFailed, setAltLogoFailed] = useState(false);
  const [ligLogoFailed, setLigLogoFailed] = useState(false);

  // Determine league logo based on competition
  const defaultLeagueLogo =
    competition?.id === "tff-2-lig"
      ? "/branding/2-lig-logo.png"
      : competition?.id === "tff-3-lig"
      ? "/branding/3-lig-logo.png"
      : "/branding/lig-logo.png";

  const leagueLogoSrc = config.leagueLogo || defaultLeagueLogo;

  const titleText =
    config.title ||
    (competition?.name
      ? competition.name.toLocaleUpperCase("tr-TR")
      : "TRENDYOL 1. LİG");

  const subtitleText =
    config.subtitle ||
    (competition?.requiresGroup && group?.name
      ? `${group.name.toLocaleUpperCase("tr-TR")} PUAN DURUMU`
      : "PUAN DURUMU");

  // Dynamic typography sizing for optimal visual balance
  const titleFontSize =
    titleText.length > 22
      ? "38px"
      : titleText.length > 17
      ? "44px"
      : titleText.length > 13
      ? "48px"
      : "54px";

  const subtitleFontSize =
    subtitleText.length > 26
      ? "34px"
      : subtitleText.length > 20
      ? "39px"
      : subtitleText.length > 15
      ? "45px"
      : "54px";

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
          lang="tr"
          className="text-[#F5F5F5] font-extrabold uppercase tracking-tight text-center leading-[1.05]"
          style={{
            fontSize: titleFontSize,
            fontFamily:
              config.headerFontFamily ||
              "'Montserrat Variable', 'Oswald Variable', sans-serif"
          }}
        >
          {titleText}
        </h1>
        <h2
          lang="tr"
          className="text-[#F5F5F5] font-extrabold uppercase tracking-tight text-center leading-[1.05]"
          style={{
            fontSize: subtitleFontSize,
            fontFamily:
              config.headerFontFamily ||
              "'Montserrat Variable', 'Oswald Variable', sans-serif"
          }}
        >
          {subtitleText}
        </h2>
      </div>

      {/* Right: League Logo in Light Panel */}
      <div className="w-[135px] h-[135px] shrink-0 flex items-center justify-center bg-white/95 rounded-2xl p-2.5 shadow-md">
        {!ligLogoFailed ? (
          <img
            src={leagueLogoSrc}
            alt={competition?.shortName || "Lig Logo"}
            className="w-full h-full object-contain"
            onError={() => setLigLogoFailed(true)}
          />
        ) : (
          <img
            src="/branding/lig-logo.svg"
            alt="Lig Logo"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </header>
  );
};

export default PosterHeader;

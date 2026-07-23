/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CompetitionConfig, CompetitionGroup } from "../../../config/competitions";

interface LowerLeagueHeaderProps {
  competition: CompetitionConfig;
  group: CompetitionGroup;
  season?: string;
  titleOverride?: string;
  subtitleOverride?: string;
}

export const LowerLeagueHeader: React.FC<LowerLeagueHeaderProps> = ({
  competition,
  group,
  season = "2026/27",
  titleOverride,
  subtitleOverride
}) => {
  const defaultTitle = competition.id === "tff-2-lig"
    ? "NESİNE 2. LİG"
    : competition.id === "tff-3-lig"
    ? "NESİNE 3. LİG"
    : competition.name.toUpperCase();

  const displayTitle = titleOverride || defaultTitle;

  const seasonFormatted = season ? (season.includes("SEZONU") ? season : `${season} SEZONU`) : "2026/27 SEZONU";
  
  let groupPart = "";
  if (competition.requiresGroup && group) {
    groupPart = group.name.toUpperCase();
  } else {
    groupPart = "PUAN DURUMU";
  }

  const defaultSubtitle = `${seasonFormatted} • ${groupPart}`;
  const finalSubtitle = subtitleOverride || defaultSubtitle;

  return (
    <div className="lower-league-header-container">
      <h1 className="lower-league-header-title">{displayTitle}</h1>
      <div className="lower-league-header-subtitle">
        {finalSubtitle}
      </div>
    </div>
  );
};

export default LowerLeagueHeader;


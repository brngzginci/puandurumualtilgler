/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  PosterTemplateId,
  CompetitionConfig,
  CompetitionGroup
} from "../../config/competitions";
import { StandingRow, DesignConfig, Team } from "../../types";
import StandingsPoster from "./StandingsPoster";
import LowerLeaguePoster from "./lower-leagues/LowerLeaguePoster";

export interface PosterRendererProps {
  templateId: PosterTemplateId;
  competition: CompetitionConfig;
  group: CompetitionGroup;
  standings: StandingRow[];
  config: DesignConfig;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  matchedTeams: Record<string, Team | null>;
  teamLogos?: Record<string, string>;
  isSafeMode?: boolean;
}

export const PosterRenderer: React.FC<PosterRendererProps> = (props) => {
  switch (props.templateId) {
    case "standings-1-lig":
      return (
        <StandingsPoster
          standings={props.standings}
          config={props.config}
          canvasRef={props.canvasRef}
          matchedTeams={props.matchedTeams}
          isSafeMode={props.isSafeMode}
        />
      );

    case "standings-2-lig":
    case "standings-3-lig":
      return (
        <LowerLeaguePoster
          competition={props.competition}
          group={props.group}
          standings={props.standings}
          config={props.config}
          canvasRef={props.canvasRef}
          matchedTeams={props.matchedTeams}
          teamLogos={props.teamLogos}
        />
      );

    default:
      return (
        <div className="p-8 bg-red-900 text-white rounded-xl">
          Desteklenmeyen Poster Tasarımı: {props.templateId}
        </div>
      );
  }
};

export default PosterRenderer;

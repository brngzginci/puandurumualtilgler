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
  return (
    <StandingsPoster
      competition={props.competition}
      group={props.group}
      standings={props.standings}
      config={props.config}
      canvasRef={props.canvasRef}
      matchedTeams={props.matchedTeams}
      teamLogos={props.teamLogos}
      isSafeMode={props.isSafeMode}
    />
  );
};

export default PosterRenderer;

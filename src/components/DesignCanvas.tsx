/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { StandingRow, DesignConfig, Team } from "../types";
import { CompetitionConfig, CompetitionGroup } from "../config/competitions";
import { getPossibleLogoCandidates } from "../teams";
import PosterRenderer from "./poster/PosterRenderer";

export type LogoStatus = "not-provided" | "loading" | "ready" | "failed";

export interface TeamLogoState {
  source?: string;
  status: LogoStatus;
  error?: string;
}

export function TeamLogoPlaceholder({
  shortName
}: {
  shortName: string;
  borderRadius?: string;
}) {
  return (
    <div
      className="team-logo-placeholder"
      aria-label="Takım logosu yok"
      style={{
        width: "30px",
        height: "30px",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <svg
        width="16"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(243, 247, 251, 0.45)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    </div>
  );
}

export function TeamLogo({
  team,
  customLogo,
  borderRadius,
  rawTeamName
}: {
  team?: Team | null;
  customLogo?: string;
  borderRadius?: string;
  rawTeamName?: string;
}) {
  const candidateUrls = useMemo(() => {
    const combinedTeam = team ? { ...team, logo: customLogo || team.logo } : null;
    return getPossibleLogoCandidates(combinedTeam, rawTeamName || team?.displayName || team?.officialName);
  }, [team, customLogo, rawTeamName]);

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  useEffect(() => {
    setCandidateIndex(0);
    setHasFailedAll(false);
  }, [candidateUrls]);

  const currentSource = candidateUrls[candidateIndex];

  if (hasFailedAll || !currentSource) {
    const fallbackName = team?.shortName || team?.displayName || rawTeamName || "Takım";
    return (
      <TeamLogoPlaceholder shortName={fallbackName} borderRadius={borderRadius} />
    );
  }

  const isRemote =
    currentSource.startsWith("http://") ||
    currentSource.startsWith("https://") ||
    currentSource.startsWith("data:");

  return (
    <img
      key={currentSource}
      src={currentSource}
      alt={`${team?.displayName || rawTeamName || "Takım"} logosu`}
      data-team-id={team?.id || rawTeamName}
      data-export-optional-image="true"
      {...(isRemote && !currentSource.startsWith("data:") ? { crossOrigin: "anonymous" } : {})}
      referrerPolicy="no-referrer"
      style={{
        width: "30px",
        height: "30px",
        maxWidth: "30px",
        maxHeight: "30px",
        objectFit: "contain",
      }}
      onError={() => {
        if (candidateIndex + 1 < candidateUrls.length) {
          setCandidateIndex((prev) => prev + 1);
        } else {
          setHasFailedAll(true);
        }
      }}
    />
  );
}

interface DesignCanvasProps {
  competition: CompetitionConfig;
  group: CompetitionGroup;
  standings: StandingRow[];
  config: DesignConfig;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  matchedTeams: Record<string, Team | null>;
  isSafeMode?: boolean;
}

export default function DesignCanvas({
  competition,
  group,
  standings,
  config,
  canvasRef,
  matchedTeams,
  isSafeMode = false
}: DesignCanvasProps) {
  return (
    <PosterRenderer
      templateId={competition.templateId}
      competition={competition}
      group={group}
      standings={standings}
      config={config}
      canvasRef={canvasRef}
      matchedTeams={matchedTeams}
      isSafeMode={isSafeMode}
    />
  );
}


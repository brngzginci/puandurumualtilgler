/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { StandingRow, DesignConfig, Team } from "../types";
import { CompetitionConfig, CompetitionGroup } from "../config/competitions";
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
  borderRadius
}: {
  team: Team;
  customLogo?: string;
  borderRadius: string;
}) {
  const [logoState, setLogoState] = useState<TeamLogoState>(() => {
    if (customLogo) {
      return { source: customLogo, status: "ready" };
    }
    if (team.defaultLogo) {
      return { source: team.defaultLogo, status: "ready" };
    }
    return { status: "not-provided" };
  });

  useEffect(() => {
    if (customLogo) {
      setLogoState({ source: customLogo, status: "ready" });
    } else if (team.defaultLogo) {
      setLogoState({ source: team.defaultLogo, status: "ready" });
    } else {
      setLogoState({ status: "not-provided" });
    }
  }, [customLogo, team.defaultLogo]);

  if (logoState.status === "failed" || !logoState.source) {
    return (
      <TeamLogoPlaceholder shortName={team.shortName} borderRadius={borderRadius} />
    );
  }

  return (
    <img
      src={logoState.source}
      alt={`${team.displayName} logosu`}
      data-team-id={team.id}
      data-export-optional-image="true"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
      style={{
        width: "30px",
        height: "30px",
        maxWidth: "30px",
        maxHeight: "30px",
        objectFit: "contain",
      }}
      onError={() => {
        setLogoState({ status: "failed", error: "Görsel yüklenemedi" });
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


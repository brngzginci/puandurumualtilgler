/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { DesignConfig, LeagueZoneDefinition } from "../../../types";
import { CompetitionConfig } from "../../../config/competitions";

interface LowerLeagueFooterProps {
  competition?: CompetitionConfig;
  config: DesignConfig;
  showNote?: boolean;
}

export const LowerLeagueFooter: React.FC<LowerLeagueFooterProps> = ({
  competition,
  config,
  showNote = true
}) => {
  const currentWeek = config.currentWeek || 0;
  let defaultNote = "";
  if (currentWeek > 0) {
    defaultNote = `+ Ligin ${currentWeek}. haftası itibarıyla oynanan\nkarşılaşmalar sonucunda oluşan\npuan durumudur.`;
  } else {
    defaultNote = `Sezon başlangıcı öncesi güncel\npuan durumu görünümüdür.`;
  }

  const noteContent = config.noteText && config.noteText.trim() !== "" ? config.noteText : defaultNote;

  // Determine top promotion label based on competition
  let topPromotionLabel = "Doğrudan Yükselme";
  if (competition?.id === "tff-1-lig") {
    topPromotionLabel = "Süper Lig";
  } else if (competition?.id === "tff-2-lig") {
    topPromotionLabel = "1. Lig";
  } else if (competition?.id === "tff-3-lig") {
    topPromotionLabel = "2. Lig";
  }

  const zoneDefs: LeagueZoneDefinition[] = (config as any).zoneDefinitions;
  let legendItems: { label: string; color: string; textColor?: string }[] = [];

  if (zoneDefs && Array.isArray(zoneDefs) && zoneDefs.length > 0) {
    legendItems = zoneDefs
      .filter((z) => z.isEnabled)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((z) => {
        const lower = z.color.toLowerCase();
        const isLight = lower === "#d6e600" || lower === "#ffffff" || lower === "#ffff00" || lower === "yellow";
        return {
          label: z.label,
          color: z.color,
          textColor: isLight ? "#000000" : "#FFFFFF"
        };
      });
  } else {
    legendItems = [
      { label: topPromotionLabel, color: "#128C08", textColor: "#FFFFFF" },
      { label: "Play-Off Çeyrek Final", color: "#078ECC", textColor: "#FFFFFF" },
      { label: "Play-Off Finali", color: "#D6E600", textColor: "#000000" },
      { label: "Küme Düşme", color: "#B90000", textColor: "#FFFFFF" }
    ];
  }

  return (
    <div className="lower-league-footer">
      {/* Left Note Card */}
      {showNote && (
        <div className="lower-league-note-card">
          <div className="lower-league-note-text">{noteContent}</div>
        </div>
      )}

      {/* Right Legend Badge Grid */}
      <div className="lower-league-legend-grid">
        {legendItems.map((item, i) => (
          <div
            key={i}
            className="lower-league-legend-badge truncate whitespace-nowrap overflow-hidden"
            style={{
              backgroundColor: item.color,
              color: item.textColor || (item.color === "#D6E600" ? "#000000" : "#FFFFFF"),
              fontSize: item.label.length > 20 ? "11px" : item.label.length > 15 ? "12px" : "13px"
            }}
            title={item.label}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowerLeagueFooter;

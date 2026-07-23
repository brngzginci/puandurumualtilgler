/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { DesignConfig } from "../../types";
import { POSTER_THEME } from "../../design/posterTheme";

interface LeagueLegendProps {
  config?: DesignConfig;
}

export const LeagueLegend: React.FC<LeagueLegendProps> = ({ config }) => {
  const visibleZones = config?.zoneDefinitions && Array.isArray(config.zoneDefinitions)
    ? config.zoneDefinitions
        .filter((z) => z.isEnabled)
        .sort((a, b) => a.displayOrder - b.displayOrder)
    : [
        { id: "1", label: "Süper Lig", color: POSTER_THEME.green },
        { id: "2", label: "Play-Off Finali", color: POSTER_THEME.blue },
        { id: "3", label: "Play-Off", color: POSTER_THEME.yellow },
        { id: "4", label: "Küme Düşme", color: POSTER_THEME.red }
      ];

  return (
    <div className="w-[280px] h-full flex flex-col justify-center gap-2 px-3 py-2 bg-[#001011] border border-[#B4C3C3]/30 rounded-2xl overflow-hidden">
      {visibleZones.map((zone, i) => (
        <div key={zone.id || i} className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-5 h-5 rounded-full shrink-0 shadow-sm"
            style={{ backgroundColor: zone.color }}
          />
          <span className="text-[#F5F5F5] font-medium text-[16px] leading-tight tracking-wide truncate">
            {zone.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LeagueLegend;

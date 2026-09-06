/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { DesignConfig } from "../../types";
import { CompetitionConfig, getDefaultZoneDefinitions } from "../../config/competitions";

interface LeagueLegendProps {
  config?: DesignConfig;
  competition?: CompetitionConfig;
  teamCount?: number;
}

export const LeagueLegend: React.FC<LeagueLegendProps> = ({ config, competition, teamCount }) => {
  const defaultZones = getDefaultZoneDefinitions(competition?.id || "tff-1-lig", teamCount);

  const visibleZones =
    config?.zoneDefinitions && Array.isArray(config.zoneDefinitions) && config.zoneDefinitions.length > 0
      ? config.zoneDefinitions
          .filter((z) => z.isEnabled)
          .sort((a, b) => a.displayOrder - b.displayOrder)
      : defaultZones.filter((z) => z.isEnabled);

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

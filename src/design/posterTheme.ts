/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DesignConfig } from "../types";

export interface PosterTheme {
  posterBackground: string;
  tableBackground: string;
  rowDark: string;
  rowLight: string;
  headerGray: string;
  headerText: string;
  primaryText: string;
  secondaryText: string;
  borderColor: string;
  orange: string;
  green: string;
  blue: string;
  yellow: string;
  red: string;
}

export const POSTER_THEME: PosterTheme = {
  posterBackground: "#001314",
  tableBackground: "#001011",
  rowDark: "#001113",
  rowLight: "#002326",
  headerGray: "#D0D0D0",
  headerText: "#050505",
  primaryText: "#F5F5F5",
  secondaryText: "#C7CDCD",
  borderColor: "rgba(180, 195, 195, 0.45)",
  orange: "#F4510B",
  green: "#109D13",
  blue: "#138EC7",
  yellow: "#D7DF00",
  red: "#D40000"
};

export function getRankZoneColor(rank: number, config?: DesignConfig): string {
  if (config?.zoneDefinitions && Array.isArray(config.zoneDefinitions) && config.zoneDefinitions.length > 0) {
    const active = config.zoneDefinitions
      .filter((z) => z.isEnabled)
      .sort((a, b) => a.displayOrder - b.displayOrder);
    const matched = active.find((z) => rank >= z.startPosition && rank <= z.endPosition);
    if (matched) {
      return matched.color;
    }
    return "#0E2425";
  }

  const dirStart = config?.directPromotionStart ?? 1;
  const dirEnd = config?.directPromotionEnd ?? 2;
  const finalPos = config?.playoffFinalPosition ?? 3;
  const playStart = config?.playoffStart ?? 4;
  const playEnd = config?.playoffEnd ?? 7;
  const relStart = config?.relegationStart ?? 17;
  const relEnd = config?.relegationEnd ?? 20;

  if (rank >= dirStart && rank <= dirEnd) return POSTER_THEME.green;
  if (rank === finalPos) return POSTER_THEME.blue;
  if (rank >= playStart && rank <= playEnd) return POSTER_THEME.yellow;
  if (rank >= relStart && rank <= relEnd) return POSTER_THEME.red;
  
  return "#0E2425"; // Neutral dark background for non-zone rank blocks
}

export function getRankIndicatorColor(rank: number, config?: DesignConfig): string {
  return getRankZoneColor(rank, config);
}

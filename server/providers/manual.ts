/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAMPLE_STANDINGS } from "../../src/sampleStandings";

/**
 * Manual provider: Returns the internal standings data stored in memory or from the sample data.
 */
export async function fetchManualStandings() {
  // In a real application, this could load from a file, a simple JSON DB, or memory.
  // Here we return the default SAMPLE_STANDINGS.
  return {
    success: true,
    provider: "manual",
    lastUpdated: new Date().toISOString(),
    dataSource: "Manuel Veri Girişi / Örnek Veri",
    data: SAMPLE_STANDINGS,
  };
}

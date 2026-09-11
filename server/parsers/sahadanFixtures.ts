import * as cheerio from 'cheerio';

export interface RawTeam {
  id: number;
  uuid?: string;
  name: string;
  display_name?: string;
}

export interface RawMatch {
  id: number | string;
  uuid?: string;
  date_time_utc?: string;
  match_time?: string;
  status?: string;
  fts_A?: number | string | null;
  fts_B?: number | string | null;
  hts_A?: number | string | null;
  hts_B?: number | string | null;
  team_A: RawTeam;
  team_B: RawTeam;
}

export interface RawGameset {
  name: string;
  matches: RawMatch[];
}

function dereferenceNuxtData(arr: any[], targetIdx: number, visited = new Set<number>()): any {
  if (targetIdx === null || targetIdx === undefined || typeof targetIdx !== "number" || targetIdx < 0 || targetIdx >= arr.length) {
    return targetIdx;
  }

  if (visited.has(targetIdx)) {
    return "[Circular]";
  }

  const val = arr[targetIdx];
  if (val === null || val === undefined || typeof val !== "object") {
    return val;
  }

  visited.add(targetIdx);

  if (Array.isArray(val)) {
    if (val[0] === "ShallowReactive" || val[0] === "Reactive" || val[0] === "Set") {
      return dereferenceNuxtData(arr, val[1], new Set(visited));
    }
    return val.map((item) => (typeof item === "number" ? dereferenceNuxtData(arr, item, new Set(visited)) : item));
  }

  const result: Record<string, any> = {};
  for (const k of Object.keys(val)) {
    const propVal = val[k];
    result[k] = typeof propVal === "number" ? dereferenceNuxtData(arr, propVal, new Set(visited)) : propVal;
  }

  return result;
}

export function parseSahadanGamesets(html: string): RawGameset[] {
  if (!html || typeof html !== "string") {
    throw new Error("[SahadanParser] Invalid HTML input provided");
  }

  const $ = cheerio.load(html);
  const scriptElement = $("#__NUXT_DATA__");

  if (scriptElement.length === 0) {
    console.error("[SahadanParser] __NUXT_DATA__ script tag missing from HTML");
    throw new Error("[SahadanParser] __NUXT_DATA__ script element not found in HTML");
  }

  const jsonContent = scriptElement.html();
  if (!jsonContent || !jsonContent.trim()) {
    console.error("[SahadanParser] __NUXT_DATA__ script element is empty");
    throw new Error("[SahadanParser] __NUXT_DATA__ script content is empty");
  }

  let payloadArray: any[];
  try {
    payloadArray = JSON.parse(jsonContent);
  } catch (err: any) {
    console.error("[SahadanParser] JSON parse error on __NUXT_DATA__:", err.message);
    throw new Error("[SahadanParser] Failed to parse __NUXT_DATA__ JSON payload");
  }

  if (!Array.isArray(payloadArray) || payloadArray.length === 0) {
    throw new Error("[SahadanParser] __NUXT_DATA__ payload is not a non-empty array");
  }

  let resolvedGamesets: RawGameset[] | null = null;

  // Method 1: Check root objects in payload array for property "gamesets"
  for (let i = 0; i < payloadArray.length; i++) {
    const item = payloadArray[i];
    if (item && typeof item === "object" && item.gamesets !== undefined) {
      const gamesetsIdx = item.gamesets;
      const derefResult = typeof gamesetsIdx === "number" 
        ? dereferenceNuxtData(payloadArray, gamesetsIdx) 
        : gamesetsIdx;

      if (Array.isArray(derefResult) && derefResult.length > 0) {
        resolvedGamesets = derefResult;
        break;
      }
    }
  }

  // Method 2: Fallback to dereferencing candidates from the start of the array
  if (!resolvedGamesets) {
    for (let i = 0; i < Math.min(30, payloadArray.length); i++) {
      const derefObj = dereferenceNuxtData(payloadArray, i);
      if (derefObj && typeof derefObj === "object" && Array.isArray(derefObj.gamesets)) {
        resolvedGamesets = derefObj.gamesets;
        break;
      }
    }
  }

  if (!resolvedGamesets || !Array.isArray(resolvedGamesets) || resolvedGamesets.length === 0) {
    console.error("[SahadanParser] Could not extract gamesets from payload");
    throw new Error("[SahadanParser] Valid gamesets data structure not found in payload");
  }

  // Validate each gameset object structure
  const validGamesets: RawGameset[] = [];
  for (const gs of resolvedGamesets) {
    if (gs && typeof gs === "object" && gs.name && Array.isArray(gs.matches)) {
      validGamesets.push({
        name: String(gs.name),
        matches: gs.matches,
      });
    }
  }

  if (validGamesets.length === 0) {
    throw new Error("[SahadanParser] No valid gameset items found in gamesets array");
  }

  return validGamesets;
}

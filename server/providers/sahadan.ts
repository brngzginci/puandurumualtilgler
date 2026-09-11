const SAHADAN_LEAGUE_URL = "https://www.sahadan.com/lig/trendyol-1-lig/2o9svokc5s7diish3ycrzk7jm";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const FETCH_TIMEOUT_MS = 10000;

export async function fetchSahadanLeaguePage(): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(SAHADAN_LEAGUE_URL, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[SahadanProvider] HTTP Error ${response.status}: ${response.statusText}`);
      throw new Error(`Sahadan provider returned HTTP status ${response.status}`);
    }

    const html = await response.text();
    if (!html || html.trim().length === 0) {
      console.error("[SahadanProvider] Received empty HTML response");
      throw new Error("Sahadan provider returned empty content");
    }

    return html;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.error("[SahadanProvider] Upstream request to Sahadan timed out after 10s");
      throw new Error("Upstream request to Sahadan timed out");
    }
    console.error("[SahadanProvider] Fetch failed:", error.message || error);
    throw new Error(error.message || "Failed to fetch page from Sahadan");
  }
}

/**
 * Vercel Function
 * Adres: /api/standings
 */

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);

      const league =
        url.searchParams.get("league") ||
        "tff-1-lig";

      const group =
        url.searchParams.get("group") ||
        "overall";

      const season =
        url.searchParams.get("season") ||
        "2026-2027";

      const refresh =
        url.searchParams.get("refresh") === "true" ||
        url.searchParams.get("refresh") === "1";

      /*
       * Provider'ı üst tarafta import etmiyoruz.
       * Böylece provider yüklenirken hata oluşursa
       * Vercel fonksiyonu tamamen çökmez.
       */
      const providerModule = await import(
        "../server/providers/sahadan"
      );

      const fetchStandings =
        providerModule.fetchSahadanStandings ||
        providerModule.default;

      if (typeof fetchStandings !== "function") {
        return Response.json(
          {
            success: false,
            code: "PROVIDER_EXPORT_NOT_FOUND",
            message:
              "Sahadan veri çekme fonksiyonu bulunamadı.",
            availableExports:
              Object.keys(providerModule)
          },
          {
            status: 500
          }
        );
      }

      const result = await fetchStandings({
        leagueId: league,
        groupId: group,
        season,
        refresh
      });

      return Response.json(result, {
        status: 200,
        headers: {
          "Cache-Control": "no-store"
        }
      });
    } catch (error) {
      console.error(
        "STANDINGS_FUNCTION_ERROR",
        error
      );

      return Response.json(
        {
          success: false,
          code: "STANDINGS_FUNCTION_ERROR",
          errorName:
            error instanceof Error
              ? error.name
              : "UnknownError",
          message:
            error instanceof Error
              ? error.message
              : String(error)
        },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store"
          }
        }
      );
    }
  }
};
export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);

      /*
       * .js uzantısı önemli.
       * Kaynak dosya sahadan.ts olsa da Vercel çalışma anında JS çalıştırır.
       */
      const providerModule = await import(
        "../server/providers/sahadan.js"
      );

      const league =
        url.searchParams.get("league") || "tff-1-lig";

      const group =
        url.searchParams.get("group") || "overall";

      const season =
        url.searchParams.get("season") || "2026-2027";

      const refresh =
        url.searchParams.get("refresh") === "true" ||
        url.searchParams.get("refresh") === "1";

      const result =
        await providerModule.fetchSahadanStandings({
          leagueId: league as any,
          groupId: group as any,
          season,
          refresh,
        });

      return Response.json(result, {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    } catch (error) {
      console.error("STANDINGS_FUNCTION_ERROR", error);

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
              : String(error),
          stack:
            error instanceof Error
              ? error.stack
              : undefined,
        },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }
  },
};
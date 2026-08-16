/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { fetchSahadanStandings } from "../server/providers/sahadan";
import { COMPETITIONS, LeagueId, GroupId } from "../src/config/competitions";
import { SAMPLE_STANDINGS } from "../src/sampleStandings";

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    const provider = (req.query?.provider as string) || "sahadan";
    const refresh = req.query?.refresh === "true";
    const league = ((req.query?.league as string) || "tff-1-lig") as LeagueId;
    const group = ((req.query?.group as string) || "overall") as GroupId;
    const season = (req.query?.season as string) || "2026-2027";

    const compConfig = COMPETITIONS[league];
    if (!compConfig) {
      return res.status(400).json({
        success: false,
        code: "INVALID_COMPETITION_SELECTION",
        message: "Seçilen lig veya grup desteklenmiyor."
      });
    }

    const groupConfig = compConfig.groups.find((g) => g.id === group);
    if (!groupConfig) {
      return res.status(400).json({
        success: false,
        code: "INVALID_COMPETITION_SELECTION",
        message: "Seçilen lig veya grup desteklenmiyor."
      });
    }

    try {
      if (provider === "sahadan") {
        const result = await fetchSahadanStandings({
          leagueId: league,
          groupId: group,
          season,
          refresh
        });
        return res.status(200).json(result);
      } else {
        return res.status(200).json({
          success: true,
          provider: "manual",
          competition: {
            leagueId: league,
            leagueName: compConfig.name,
            groupId: group,
            groupName: compConfig.requiresGroup ? groupConfig.name : null,
            season
          },
          lastUpdated: new Date().toISOString(),
          dataSource: "Manuel Veri Girişi / Örnek Veri",
          data: SAMPLE_STANDINGS,
          standings: SAMPLE_STANDINGS
        });
      }
    } catch (error: any) {
      console.error("Vercel Serverless Standings Error:", error.message || error);
      return res.status(200).json({
        success: true,
        provider: "sahadan-fallback",
        competition: {
          leagueId: league,
          leagueName: compConfig.name,
          groupId: group,
          groupName: compConfig.requiresGroup ? groupConfig.name : null,
          season
        },
        dataSource: "Yedek Veri (Bağlantı Zaman Aşımı)",
        lastUpdated: new Date().toISOString(),
        data: SAMPLE_STANDINGS,
        standings: SAMPLE_STANDINGS,
        warnings: [`Canlı bağlantı hatası: ${error.message || "Bilinmeyen hata"}. Yedek tablo gösteriliyor.`]
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Yalnızca GET metodu desteklenmektedir."
  });
}

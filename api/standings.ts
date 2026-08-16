/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { fetchSahadanStandings } from "../server/providers/sahadan";
import { COMPETITIONS, LeagueId, GroupId } from "../src/config/competitions";
import { SAMPLE_STANDINGS } from "../src/sampleStandings";

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const query = req.query || {};
  const provider = (query.provider as string) || "sahadan";
  const refresh = query.refresh === "true" || query.refresh === true;
  const league = ((query.league as string) || "tff-1-lig") as LeagueId;
  const group = ((query.group as string) || "overall") as GroupId;
  const season = (query.season as string) || "2026-2027";

  const compConfig = COMPETITIONS[league] || COMPETITIONS["tff-1-lig"];
  const groupConfig = compConfig.groups.find((g) => g.id === group) || compConfig.groups[0];

  try {
    if (provider === "sahadan") {
      const result = await fetchSahadanStandings({
        leagueId: compConfig.id as LeagueId,
        groupId: groupConfig.id as GroupId,
        season,
        refresh
      });
      return res.status(200).json(result);
    } else {
      return res.status(200).json({
        success: true,
        provider: "manual",
        competition: {
          leagueId: compConfig.id,
          leagueName: compConfig.name,
          groupId: groupConfig.id,
          groupName: compConfig.requiresGroup ? groupConfig.name : null,
          season
        },
        dataSource: "Manuel Veri Girişi / Örnek Veri",
        data: SAMPLE_STANDINGS,
        standings: SAMPLE_STANDINGS
      });
    }
  } catch (error: any) {
    console.error("Vercel Serverless Standings Catch Error:", error?.message || error);
    return res.status(200).json({
      success: true,
      provider: "sahadan-fallback",
      competition: {
        leagueId: compConfig.id,
        leagueName: compConfig.name,
        groupId: groupConfig.id,
        groupName: compConfig.requiresGroup ? groupConfig.name : null,
        season
      },
      lastUpdated: new Date().toISOString(),
      dataSource: "Yedek Veri (Sahadan Bağlantı Hatası)",
      data: SAMPLE_STANDINGS,
      standings: SAMPLE_STANDINGS,
      warnings: [`Canlı bağlantı hatası: ${error?.message || "Bilinmeyen hata"}. Yedek tablo gösteriliyor.`]
    });
  }
}

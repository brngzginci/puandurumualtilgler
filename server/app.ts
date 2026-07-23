/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import "dotenv/config";
import express from "express";
import path from "path";
import { fetchManualStandings } from "./providers/manual";
import { fetchSahadanStandings } from "./providers/sahadan";
import { SAMPLE_STANDINGS, StandingRow } from "../src/sampleStandings";
import { COMPETITIONS, LeagueId, GroupId } from "../src/config/competitions";

let currentManualStandings: StandingRow[] = [...SAMPLE_STANDINGS];
let lastUpdatedTime = new Date().toISOString();

export const app = express();

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API Routes
app.get("/api/providers", (_req, res) => {
  res.json([
    {
      id: "sahadan",
      name: "Sahadan (Canlı Veri Çekici)",
      active: true,
      desc: "Sahadan.com üzerinden canlı puan durumu (1. Lig, 2. Lig, 3. Lig)."
    },
    {
      id: "manual",
      name: "Manuel / Örnek Veri",
      active: true,
      desc: "Sıralamayı manuel olarak veya JSON yükleyerek düzenleyin."
    }
  ]);
});

app.get("/api/standings", async (req, res) => {
  const provider = (req.query.provider as string) || "sahadan";
  const refresh = req.query.refresh === "true";
  const league = ((req.query.league as string) || "tff-1-lig") as LeagueId;
  const group = ((req.query.group as string) || "overall") as GroupId;
  const season = (req.query.season as string) || "2026-2027";

  // Validate league & group against COMPETITIONS registry
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
      return res.json(result);
    } else {
      // default to manual/in-memory
      return res.json({
        success: true,
        provider: "manual",
        competition: {
          leagueId: league,
          leagueName: compConfig.name,
          groupId: group,
          groupName: compConfig.requiresGroup ? groupConfig.name : null,
          season
        },
        lastUpdated: lastUpdatedTime,
        dataSource: "Manuel Veri Girişi / Örnek Veri",
        data: currentManualStandings,
        standings: currentManualStandings
      });
    }
  } catch (error: any) {
    console.error("Standings provider error:", error.message);

    return res.status(500).json({
      success: false,
      code: "PROVIDER_ERROR",
      message: error.message || "Puan durumu verisi alınırken sunucuda hata oluştu.",
      error: error.message
    });
  }
});

app.post("/api/standings", (req, res) => {
  const { standings } = req.body;

  if (!Array.isArray(standings)) {
    return res.status(400).json({
      success: false,
      message: "Geçersiz veri formatı. 'standings' bir dizi olmalıdır."
    });
  }

  for (const row of standings) {
    if (
      typeof row.rank !== "number" ||
      typeof row.teamName !== "string" ||
      typeof row.played !== "number" ||
      typeof row.won !== "number" ||
      typeof row.drawn !== "number" ||
      typeof row.lost !== "number" ||
      typeof row.points !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Dizi elemanları geçerli bir StandingRow formatında olmalıdır."
      });
    }
  }

  currentManualStandings = [...standings].sort((a, b) => a.rank - b.rank);
  lastUpdatedTime = new Date().toISOString();

  res.json({
    success: true,
    message: "Puan durumu başarıyla güncellendi.",
    lastUpdated: lastUpdatedTime,
    data: currentManualStandings
  });
});

export default app;

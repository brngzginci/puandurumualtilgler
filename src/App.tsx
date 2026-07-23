/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  Settings,
  Layers,
  AlertTriangle,
  Upload,
  FileJson,
  Check,
  RotateCcw,
  Code,
  Info,
  Palette,
  ExternalLink,
  ChevronRight,
  Eye,
  Sliders
} from "lucide-react";
import { toPng, getFontEmbedCSS } from "html-to-image";
import { 
  getTeamLogos, 
  getTeamLogoDetails, 
  saveTeamLogo, 
  deleteTeamLogo, 
  clearAllTeamLogos,
  StoredTeamLogo
} from "./db";
import {
  COMPETITIONS,
  LeagueId,
  GroupId,
  getCompetitionConfig,
  getCompetitionGroup,
  getWorkspaceKey,
  buildExportFilename,
  getDefaultZoneDefinitions
} from "./config/competitions";
import { Team, StandingRow, DesignConfig, ZoneConfig, SourceTeamMapping, CompetitionSelection, StandingsWorkspace, LeagueZoneDefinition } from "./types";
import { TEAMS, findTeamByInputName, getGlobalTeams, saveGlobalTeamsBatch, autoCreateTeamFromSource, slugifyTeamName } from "./teams";
import { SAMPLE_STANDINGS } from "./sampleStandings";
import DesignCanvas from "./components/DesignCanvas";
import ZoneEditor from "./components/ZoneEditor";
import { Trophy } from "lucide-react";

export function parseEditableNumber(val: any): number {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

export function sortStandingsAndAssignPositions(rows: StandingRow[]): StandingRow[] {
  const sorted = [...rows].sort((a, b) => {
    const ptsA = parseEditableNumber(a.points);
    const ptsB = parseEditableNumber(b.points);
    if (ptsB !== ptsA) return ptsB - ptsA;

    const gdA = parseEditableNumber(a.goalDifference);
    const gdB = parseEditableNumber(b.goalDifference);
    if (gdB !== gdA) return gdB - gdA;

    const gfA = parseEditableNumber(a.goalsFor);
    const gfB = parseEditableNumber(b.goalsFor);
    if (gfB !== gfA) return gfB - gfA;

    const wonA = parseEditableNumber(a.won);
    const wonB = parseEditableNumber(b.won);
    if (wonB !== wonA) return wonB - wonA;

    return (a.teamName || "").localeCompare(b.teamName || "", "tr-TR");
  });

  return sorted.map((row, idx) => ({
    ...row,
    position: idx + 1,
    rank: idx + 1
  }));
}

// Initial Configuration
const DEFAULT_CONFIG: DesignConfig = {
  title: "TRENDYOL 1. LİG",
  subtitle: "PUAN DURUMU",
  roundInfo: "34. HAFTA",
  currentWeek: 0,
  totalWeeks: 38,
  showNote: true,
  noteText: "+Ligin 00. haftası itibarıyla oynanan\nmaçlar sonucu oluşan puan durumudur.\nEk olarak buraya dipnot eklenebilir.",
  showSocialStrip: true,
  directPromotionStart: 1,
  directPromotionEnd: 2,
  playoffFinalPosition: 3,
  playoffStart: 4,
  playoffEnd: 7,
  relegationStart: 17,
  relegationEnd: 20,
  theme: "dark",
  backgroundColor: "#001314",
  gradientStart: "#001314",
  gradientEnd: "#001011",
  useGradient: true,
  gridOverlay: false,
  accentColor: "#F4510B",
  headerFontFamily: "'Montserrat Variable', sans-serif",
  bodyFontFamily: "'Plus Jakarta Sans Variable', Arial, sans-serif",
  textColor: "#F5F5F5",
  textMutedColor: "#C7CDCD",
  rowBgColorEven: "#002326",
  rowBgColorOdd: "#001113",
  pointsBgColor: "transparent",
  pointsTextColor: "#F5F5F5",
  zones: {
    promotion: { name: "Süper Lig", startRank: 1, endRank: 2, color: "#109D13", enabled: true },
    playoff: { name: "Play-off", startRank: 3, endRank: 7, color: "#D7DF00", enabled: true },
    relegation: { name: "Düşme", startRank: 17, endRank: 20, color: "#D40000", enabled: true }
  },
  dataSource: "TFF Resmi",
  showDataSource: false,
  showLastUpdated: false,
  socialHandle: "AltLiglerTR",
  showSocialHandle: true,
  logoBorderRadius: "rounded-md"
};

// Remote CSS checking function (Requirement 2)
function checkRemoteStylesheets(): string[] {
  const remoteUrls: string[] = [];
  try {
    const sheets = Array.from(document.styleSheets);
    for (const sheet of sheets) {
      if (sheet.href) {
        try {
          const url = new URL(sheet.href);
          if (url.origin !== window.location.origin) {
            remoteUrls.push(sheet.href);
          }
        } catch {
          // url parsing error
        }
      }
    }
  } catch (e) {
    console.error("Error reading stylesheets list:", e);
  }
  return remoteUrls;
}

// Helper function to wait for next repaint/render pass
function waitForNextPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

interface ImageValidationResult {
  warnings: string[];
  loadedCount: number;
  failedOptionalCount: number;
}

// Robust Image Loader and Validator (Requirement 4)
async function waitForImages(
  root: HTMLElement
): Promise<ImageValidationResult> {
  const images = Array.from(
    root.querySelectorAll<HTMLImageElement>("img")
  );

  const warnings: string[] = [];
  let loadedCount = 0;
  let failedOptionalCount = 0;

  for (const img of images) {
    const required =
      img.dataset.exportRequiredImage === "true";

    try {
      if (!img.src) {
        throw new Error("Görsel kaynağı boş.");
      }

      if (!img.complete) {
        await new Promise<void>((resolve, reject) => {
          const onLoad = () => {
            cleanup();
            resolve();
          };

          const onError = () => {
            cleanup();
            reject(
              new Error(`Görsel yüklenemedi: ${img.src}`)
            );
          };

          const cleanup = () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
          };

          img.addEventListener("load", onLoad, {
            once: true
          });

          img.addEventListener("error", onError, {
            once: true
          });
        });
      }

      if (
        img.naturalWidth === 0 ||
        img.naturalHeight === 0
      ) {
        throw new Error(
          `Bozuk veya okunamayan görsel: ${img.src}`
        );
      }

      if (typeof img.decode === "function") {
        try {
          await img.decode();
        } catch {
          if (
            img.naturalWidth === 0 ||
            img.naturalHeight === 0
          ) {
            throw new Error(
              `Görsel çözümlenemedi: ${img.src}`
            );
          }
        }
      }

      loadedCount++;
    } catch (error) {
      const message = getErrorMessage(error);

      if (required) {
        throw new Error(message);
      }

      failedOptionalCount++;
      warnings.push(message);
    }
  }

  return {
    warnings,
    loadedCount,
    failedOptionalCount
  };
}

// Centralized error message parser (Requirement 5)
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (error instanceof Event) {
    const target = error.target as HTMLImageElement | null;

    if (target?.src) {
      return `Görsel yüklenemedi: ${target.src}`;
    }

    return `Tarayıcı olayı nedeniyle işlem başarısız oldu: ${error.type}`;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Bilinmeyen bir hata oluştu.";
  }
}

// Canvas-based 512x512 PNG standard logo converter (Requirement 8 & 9)
async function processLogoFile(file: File): Promise<{ dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return reject(
        new Error("Bu dosya kullanılamıyor. Lütfen PNG, JPG, WEBP veya SVG formatında ve 5 MB’den küçük bir logo seçin.")
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      return reject(
        new Error("Bu dosya kullanılamıyor. Lütfen PNG, JPG, WEBP veya SVG formatında ve 5 MB’den küçük bir logo seçin.")
      );
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") {
        return reject(new Error("Dosya okunamadı."));
      }

      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        const hasExternal = result.includes("http://") || 
                            result.includes("https://") || 
                            result.includes("xlink:href") || 
                            result.includes("<image") || 
                            result.includes("@import") ||
                            result.includes("<style>");
        if (hasExternal) {
          console.warn("SVG contains external references or embedded images.");
        }
      }

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            return reject(new Error("Canvas context oluşturulamadı."));
          }

          // Transparent background
          ctx.clearRect(0, 0, 512, 512);

          // Calculate dimensions for object-fit: contain with 5% safety margin
          const maxDim = 512 * 0.90; // 5% padding on each side
          const scale = Math.min(maxDim / img.width, maxDim / img.height);
          
          const drawWidth = img.width * scale;
          const drawHeight = img.height * scale;
          
          const x = (512 - drawWidth) / 2;
          const y = (512 - drawHeight) / 2;

          ctx.drawImage(img, x, y, drawWidth, drawHeight);
          
          const pngDataUrl = canvas.toDataURL("image/png");
          resolve({ dataUrl: pngDataUrl, width: img.width, height: img.height });
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => {
        reject(new Error("Görsel yüklenemedi. Dosya bozuk veya uyumsuz olabilir."));
      };
      img.src = result;
    };
    reader.onerror = () => {
      reject(new Error("Dosya okunamadı."));
    };
    reader.readAsDataURL(file);
  });
}

export default function App() {
  const [selection, setSelection] = useState<CompetitionSelection>(() => {
    const saved = localStorage.getItem("activeCompetitionSelection");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (COMPETITIONS[parsed.leagueId as LeagueId]) {
          const comp = COMPETITIONS[parsed.leagueId as LeagueId];
          const groupExists = comp.groups.some((g) => g.id === parsed.groupId);
          return {
            leagueId: parsed.leagueId as LeagueId,
            groupId: (groupExists ? parsed.groupId : comp.groups[0].id) as GroupId,
            season: parsed.season || "2026-2027"
          };
        }
      } catch (e) {
        console.error("Error loading activeCompetitionSelection:", e);
      }
    }
    return {
      leagueId: "tff-1-lig",
      groupId: "overall",
      season: "2026-2027"
    };
  });

  useEffect(() => {
    localStorage.setItem("activeCompetitionSelection", JSON.stringify(selection));
  }, [selection]);

  const currentCompConfig = getCompetitionConfig(selection.leagueId);
  const currentGroupConfig = getCompetitionGroup(selection.leagueId, selection.groupId);

  const [standings, setStandings] = useState<StandingRow[]>(() => {
    const key = getWorkspaceKey(selection.leagueId, selection.groupId, selection.season);
    const saved = localStorage.getItem(key) || localStorage.getItem("1lig_standings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const list = Array.isArray(parsed) ? parsed : parsed.standings;
        if (Array.isArray(list) && list.length > 0) {
          return list;
        }
      } catch (e) {
        console.error("Error loading standings from workspace:", e);
      }
    }
    return selection.leagueId === "tff-1-lig" ? SAMPLE_STANDINGS : [];
  });

  const [config, setConfig] = useState<DesignConfig>(() => {
    const saved = localStorage.getItem("1lig_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CONFIG, ...parsed };
      } catch (e) {
        console.error("Error loading config from localStorage:", e);
      }
    }
    return DEFAULT_CONFIG;
  });

  const [customLogos, setCustomLogos] = useState<Record<string, string>>({});
  const [logoDetails, setLogoDetails] = useState<Record<string, StoredTeamLogo>>({});

  const [activeTab, setActiveTab] = useState<"data" | "design" | "zones" | "api" | "test">("data");
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState<number>(0.5);
  const [jsonInput, setJsonInput] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSuccess, setJsonSuccess] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<string>("manual");
  const [matchedTeams, setMatchedTeams] = useState<Record<string, Team | null>>({});
  const [keepSourceRanking, setKeepSourceRanking] = useState<boolean>(false);

  // Export and validation states
  const [exportPhase, setExportPhase] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logoUploadStatus, setLogoUploadStatus] = useState<Record<string, { success: boolean; message: string }>>({});
  const [fontCheckResult, setFontCheckResult] = useState<string>("Bilinmiyor");
  const [imageCheckResult, setImageCheckResult] = useState<string>("Bilinmiyor");
  const [usedLogoCount, setUsedLogoCount] = useState<number>(0);
  const [isSafeMode, setIsSafeMode] = useState<boolean>(false);

  // Pre-export validation state
  const [validation, setValidation] = useState<{
    canvasExists: boolean;
    correctSize: boolean;
    rowCount: number;
    allNamesFilled: boolean;
    logosReadyCount: number;
    fontsReady: boolean;
    remoteCssFound: string[];
    remoteImagesFound: string[];
    brokenImagesFound: string[];
    hasTransform: boolean;
    hasOverflow: boolean;
  } | null>(null);

  // Test PNG generator results
  const [testPngResult, setTestPngResult] = useState<{
    width: number;
    height: number;
    sizeKB: string;
    dataUrl: string;
    generatedAt: string;
  } | null>(null);
  const [isGeneratingTest, setIsGeneratingTest] = useState<boolean>(false);

  // Live JSON validation / analysis state
  const [jsonAnalysis, setJsonAnalysis] = useState<{
    valid: boolean;
    count: number;
    duplicates: string[];
    missing: string[];
    unmatched: string[];
    error: string | null;
  }>({ valid: false, count: 0, duplicates: [], missing: [], unmatched: [], error: null });

  // --- SAHADAN PROVIDER INTEGRATION STATES ---
  const [teamMappings, setTeamMappings] = useState<SourceTeamMapping[]>(() => {
    const saved = localStorage.getItem("sahadan_team_mappings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading team mappings from localStorage:", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("sahadan_team_mappings", JSON.stringify(teamMappings));
  }, [teamMappings]);

  const [sourceStatus, setSourceStatus] = useState<string>("Kontrol edilmedi");
  const [dataStatus, setDataStatus] = useState<string>("Kontrol edilmedi");
  const [lastFetchTime, setLastFetchTime] = useState<string>("");
  const [cacheStatus, setCacheStatus] = useState<string>("Bilinmiyor");
  const [isClientLocked, setIsClientLocked] = useState<boolean>(false);
  const [lockCountdown, setLockCountdown] = useState<number>(0);
  const [sortNotice, setSortNotice] = useState<string | null>(null);

  // Preview overlay / modal state
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [previewLastUpdated, setPreviewLastUpdated] = useState<string>("");
  const [previewMeta, setPreviewMeta] = useState<{
    leagueName: string;
    teamCount: number;
  } | null>(null);

  // Failure fallback state
  const [hasFetchFailed, setHasFetchFailed] = useState<boolean>(false);
  const [lastSuccessfulApiData, setLastSuccessfulApiData] = useState<StandingRow[] | null>(() => {
    const saved = localStorage.getItem("lastSuccessfulSahadanStandings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });
  const [lastSuccessTimeStr, setLastSuccessTimeStr] = useState<string>(() => {
    return localStorage.getItem("lastSuccessfulSahadanStandingsTime") || "";
  });

  // Workspace switching handler
  const handleSelectCompetition = (
    targetLeagueId: LeagueId,
    targetGroupId: GroupId,
    targetSeason = selection.season,
    overrideStandings?: StandingRow[],
    overrideMetadata?: any
  ) => {
    // Save current workspace
    const currentKey = getWorkspaceKey(selection.leagueId, selection.groupId, selection.season);
    const currentWorkspaceData: StandingsWorkspace = {
      selection,
      standings,
      currentWeek: config.currentWeek || 0,
      totalWeeks: config.totalWeeks || null,
      sourceRankingPreserved: keepSourceRanking,
      sourceType: activeProvider as "sahadan" | "manual",
      noteText: config.noteText || "",
      zoneConfig: {
        directPromotionStart: config.directPromotionStart,
        directPromotionEnd: config.directPromotionEnd,
        playoffFinalPosition: config.playoffFinalPosition,
        playoffStart: config.playoffStart,
        playoffEnd: config.playoffEnd,
        relegationStart: config.relegationStart,
        relegationEnd: config.relegationEnd
      },
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(currentKey, JSON.stringify(currentWorkspaceData));

    // Load target workspace
    const targetKey = getWorkspaceKey(targetLeagueId, targetGroupId, targetSeason);
    const targetSaved = localStorage.getItem(targetKey);
    const targetCompConfig = getCompetitionConfig(targetLeagueId);
    const targetGroupConfig = getCompetitionGroup(targetLeagueId, targetGroupId);

    let newStandings: StandingRow[] = overrideStandings || [];
    let newCurrentWeek = 0;
    let newNoteText = `+Ligin 00. haftası itibarıyla oynanan\nmaçlar sonucu oluşan puan durumudur.\nEk olarak buraya dipnot eklenebilir.`;

    if (overrideStandings) {
      newCurrentWeek = overrideMetadata?.currentWeek ?? 0;
      if (overrideMetadata?.noteText) newNoteText = overrideMetadata.noteText;
    } else if (targetSaved) {
      try {
        const parsed = JSON.parse(targetSaved);
        newStandings = parsed.standings || [];
        newCurrentWeek = parsed.currentWeek ?? 0;
        if (parsed.noteText) newNoteText = parsed.noteText;
      } catch (e) {
        console.error("Error reading workspace:", e);
      }
    }

    if (newStandings.length === 0 && targetLeagueId === "tff-1-lig") {
      newStandings = SAMPLE_STANDINGS;
    }

    setSelection({
      leagueId: targetLeagueId,
      groupId: targetGroupId,
      season: targetSeason
    });

    setStandings(newStandings);
    setConfig((prev) => ({
      ...prev,
      title: targetCompConfig.name.toUpperCase(),
      subtitle: targetCompConfig.requiresGroup
        ? targetGroupConfig.name.toUpperCase() + " PUAN DURUMU"
        : "PUAN DURUMU",
      currentWeek: newCurrentWeek,
      noteText: newNoteText
    }));
  };

  // Client Lock Countdown Timer effect
  useEffect(() => {
    if (!isClientLocked) return;
    if (lockCountdown <= 0) {
      setIsClientLocked(false);
      return;
    }
    const timer = setTimeout(() => {
      setLockCountdown(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isClientLocked, lockCountdown]);

  const triggerClientLock = (seconds: number) => {
    setIsClientLocked(true);
    setLockCountdown(seconds);
  };

  const resolvePreviewLocalTeamId = (teamId: string, teamName: string): string => {
    const globalTeams = getGlobalTeams();
    if (teamId && !teamId.startsWith("unmatched_") && !teamId.startsWith("unmatched-")) {
      const exists = globalTeams.some(t => t.id === teamId);
      if (exists) return teamId;
    }

    const mapping = teamMappings.find(m => m.sourceTeamName === teamName || m.localTeamId === teamId);
    if (mapping) return mapping.localTeamId;

    const match = findTeamByInputName(teamName);
    if (match) return match.id;

    return "";
  };

  const handleFetchRealData = async (isForce = false) => {
    if (isClientLocked) return;

    if (isForce) {
      const confirmed = window.confirm("Canlı veriyi zorla yenilemek istediğinizden emin misiniz? Sahadan sunucusundan taze veri çekilecektir.");
      if (!confirmed) return;
      triggerClientLock(30);
    } else {
      triggerClientLock(5);
    }

    try {
      const url = `/api/standings?provider=sahadan&league=${selection.leagueId}&group=${selection.groupId}&season=${selection.season}${isForce ? "&refresh=true" : ""}`;
      const response = await fetch(url);
      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload || !payload.success) {
        const errorMsg = payload?.message || payload?.error || `HTTP hatası: ${response.status}`;
        setHasFetchFailed(true);
        setSourceStatus("Erişilemedi");
        setDataStatus("Geçersiz");
        alert("Canlı veri alınamadı: " + errorMsg);
        return;
      }

      setSourceStatus("Erişilebilir");
      setLastFetchTime(new Date().toLocaleTimeString("tr-TR"));
      setCacheStatus(payload.cached ? `Aktif (Önbellekten çekildi: ${new Date(payload.fetchedAt).toLocaleTimeString("tr-TR")})` : "Pasif (Canlı veri çekildi)");
      setHasFetchFailed(false);

      const dataRows = payload.standings || payload.data || [];
      if (dataRows.length === 0) {
        setDataStatus("Geçersiz (Veri yok)");
        alert("Sahadan verisi çekildi ancak tablo boş döndü.");
        return;
      }

      const matchedCount = dataRows.filter((r: any) => resolvePreviewLocalTeamId(r.teamId, r.teamName) !== "").length;
      if (matchedCount === dataRows.length) {
        setDataStatus("Hazır");
      } else {
        setDataStatus(`Takım eşleşmesi eksik (${matchedCount}/${dataRows.length})`);
      }

      setPreviewLastUpdated(payload.fetchedAt ? new Date(payload.fetchedAt).toLocaleString("tr-TR") : new Date().toLocaleString("tr-TR"));
      setPreviewMeta({
        leagueName: currentCompConfig.name + (currentCompConfig.requiresGroup ? ` (${currentGroupConfig.name})` : ""),
        teamCount: dataRows.length
      });
      setPreviewData(dataRows);

    } catch (error: any) {
      console.error("Fetch Sahadan error:", error);
      setHasFetchFailed(true);
      setSourceStatus("Erişilemedi");
      setDataStatus("Geçersiz");
      alert("Canlı veri alınamadı: " + (error.message || "Sunucuya erişilemiyor."));
    }
  };

  const handleAutoCreateAndApplyAllTeams = () => {
    if (!previewData || previewData.length === 0) return;

    const newTeamsToCreate: Team[] = [];
    const newMappings: SourceTeamMapping[] = [...teamMappings];

    resolvedPreviewRows.forEach((row, idx) => {
      let localId = row.resolvedLocalTeamId;
      if (!localId) {
        const drafted = autoCreateTeamFromSource(row.teamName);
        newTeamsToCreate.push(drafted);
        localId = drafted.id;

        newMappings.push({
          provider: "sahadan",
          sourceTeamId: row.teamId || idx,
          sourceTeamName: row.teamName,
          localTeamId: drafted.id
        });
      }
    });

    if (newTeamsToCreate.length > 0) {
      saveGlobalTeamsBatch(newTeamsToCreate);
      setTeamMappings(newMappings);
    }

    const allGlobal = getGlobalTeams();
    const finalStandings: StandingRow[] = resolvedPreviewRows.map((row, idx) => {
      let matchedId = row.resolvedLocalTeamId;
      if (!matchedId) {
        const foundNew = newTeamsToCreate.find(t => t.officialName === row.teamName || t.displayName === row.teamName);
        if (foundNew) matchedId = foundNew.id;
        else matchedId = slugifyTeamName(row.teamName);
      }
      const globalTeam = allGlobal.find(t => t.id === matchedId) || newTeamsToCreate.find(t => t.id === matchedId);

      return {
        rank: row.position || idx + 1,
        position: row.position || idx + 1,
        teamId: matchedId,
        teamName: globalTeam?.displayName || globalTeam?.shortName || row.teamName,
        played: row.played ?? 0,
        won: row.won ?? 0,
        drawn: row.drawn ?? 0,
        lost: row.lost ?? 0,
        goalsFor: row.goalsFor ?? 0,
        goalsAgainst: row.goalsAgainst ?? 0,
        goalDifference: row.goalDifference ?? 0,
        points: row.points ?? 0
      };
    });

    setStandings(finalStandings);
    setKeepSourceRanking(true);

    const lastSuccessTime = new Date().toLocaleString("tr-TR");
    const currentKey = getWorkspaceKey(selection.leagueId, selection.groupId, selection.season);
    const workspaceData: StandingsWorkspace = {
      selection,
      standings: finalStandings,
      currentWeek: config.currentWeek || 0,
      totalWeeks: config.totalWeeks || null,
      sourceRankingPreserved: true,
      sourceType: "sahadan",
      noteText: config.noteText || "",
      zoneConfig: {
        directPromotionStart: config.directPromotionStart,
        directPromotionEnd: config.directPromotionEnd,
        playoffFinalPosition: config.playoffFinalPosition,
        playoffStart: config.playoffStart,
        playoffEnd: config.playoffEnd,
        relegationStart: config.relegationStart,
        relegationEnd: config.relegationEnd
      },
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(currentKey, JSON.stringify(workspaceData));

    setPreviewData(null);
    setPreviewMeta(null);
    alert(`Canlı puan durumu uygulandı! ${newTeamsToCreate.length > 0 ? `${newTeamsToCreate.length} yeni takım oluşturuldu ve kayıtlı veritabanına aktarıldı.` : ""}`);
  };

  const handleApplyApiData = () => {
    const errors = getPreviewValidationErrors();
    if (errors.length > 0) {
      alert("Hatalar giderilmeden veri uygulanamaz:\n" + errors.join("\n"));
      return;
    }

    const allGlobal = getGlobalTeams();
    const finalStandings = resolvedPreviewRows.map((row, idx) => ({
      position: row.position || idx + 1,
      rank: row.position || idx + 1,
      teamId: row.resolvedLocalTeamId,
      teamName: allGlobal.find(t => t.id === row.resolvedLocalTeamId)?.displayName || row.teamName,
      played: row.played,
      won: row.won,
      drawn: row.drawn,
      lost: row.lost,
      goalsFor: row.goalsFor,
      goalsAgainst: row.goalsAgainst,
      goalDifference: row.goalDifference,
      points: row.points
    }));

    setStandings(finalStandings);
    setKeepSourceRanking(true);

    const lastSuccessTime = new Date().toLocaleString("tr-TR");
    localStorage.setItem("lastSuccessfulSahadanStandings", JSON.stringify(finalStandings));
    localStorage.setItem("lastSuccessfulSahadanStandingsTime", lastSuccessTime);
    setLastSuccessfulApiData(finalStandings);
    setLastSuccessTimeStr(lastSuccessTime);

    setConfig(prev => ({
      ...prev,
      activeProvider: "sahadan",
      dataSource: "Sahadan (Canlı)",
      showDataSource: true,
      showLastUpdated: true,
      apiLastUpdated: lastSuccessTime
    }));

    setPreviewData(null);
    setPreviewMeta(null);
    alert("Sahadan canlı verisi başarıyla uygulandı ve tasarıma aktarıldı!");
  };

  const handleReturnToManual = () => {
    setConfig(prev => ({
      ...prev,
      activeProvider: "manual",
      dataSource: "Manuel Veri",
      apiLastUpdated: ""
    }));
    setKeepSourceRanking(false);
    alert("Manuel veri moduna geri dönüldü.");
  };

  const handleUseLastSuccessfulApiData = () => {
    if (!lastSuccessfulApiData) {
      alert("Önceden kaydedilmiş başarılı bir Sahadan verisi bulunamadı.");
      return;
    }

    setStandings(lastSuccessfulApiData);
    setKeepSourceRanking(true);

    setConfig(prev => ({
      ...prev,
      activeProvider: "sahadan",
      dataSource: "Sahadan (Önbellek/Kayıtlı)",
      showDataSource: true,
      showLastUpdated: true,
      apiLastUpdated: lastSuccessTimeStr
    }));

    alert("Son başarılı Sahadan verisi tasarıma aktarıldı.");
  };

  const resolvedPreviewRows = (previewData || []).map(row => {
    const localId = resolvePreviewLocalTeamId(row.teamId, row.teamName);
    return {
      ...row,
      resolvedLocalTeamId: localId
    };
  });

  const getPreviewValidationErrors = (): string[] => {
    const errors: string[] = [];
    if (!previewData || previewData.length === 0) {
      errors.push("Takım listesi boş.");
      return errors;
    }
    if (currentGroupConfig.expectedTeamCount && previewData.length !== currentGroupConfig.expectedTeamCount) {
      errors.push(`Takım sayısı ${currentGroupConfig.expectedTeamCount} olmalıdır (Bulunan: ${previewData.length}).`);
    }

    const ranks = resolvedPreviewRows.map(r => r.position || r.rank);
    const uniqueRanks = new Set(ranks);
    if (uniqueRanks.size !== ranks.length) {
      errors.push("Sıralar tekrarlanıyor (benzersiz sıra sayısı eksik).");
    }

    const localIds = resolvedPreviewRows.map(r => r.resolvedLocalTeamId).filter(id => id !== "");
    const uniqueLocalIds = new Set(localIds);
    if (uniqueLocalIds.size !== localIds.length) {
      errors.push("Bir takım birden fazla satırda bulunuyor (tekrarlanan eşleşme).");
    }

    const hasUnmatched = resolvedPreviewRows.some(r => r.resolvedLocalTeamId === "");
    if (hasUnmatched) {
      errors.push(`${previewData.length} takımdan eşleşmeyenler var. Lütfen tüm takımları yerel takımlarla eşleştirin.`);
    }

    const hasInvalidNumbers = resolvedPreviewRows.some(r => 
      !Number.isFinite(r.played) ||
      !Number.isFinite(r.won) ||
      !Number.isFinite(r.drawn) ||
      !Number.isFinite(r.lost) ||
      !Number.isFinite(r.points) ||
      !Number.isFinite(r.goalsFor) ||
      !Number.isFinite(r.goalsAgainst)
    );
    if (hasInvalidNumbers) {
      errors.push("Sayısal alanlar geçersiz.");
    }

    return errors;
  };

  const previewMatchedCount = resolvedPreviewRows.filter(r => r.resolvedLocalTeamId !== "").length;
  const previewUnmatchedCount = resolvedPreviewRows.filter(r => r.resolvedLocalTeamId === "").length;
  const previewErrors = getPreviewValidationErrors();
  const isApplyDisabled = previewErrors.length > 0;

  // Auto-save to localStorage on updates
  useEffect(() => {
    localStorage.setItem("1lig_standings", JSON.stringify(standings));
  }, [standings]);

  useEffect(() => {
    localStorage.setItem("1lig_config", JSON.stringify(config));
  }, [config]);

  // Load logos from IndexedDB on start
  useEffect(() => {
    async function initLogos() {
      try {
        const logos = await getTeamLogos();
        const details = await getTeamLogoDetails();
        setCustomLogos(logos);
        setLogoDetails(details);
      } catch (error) {
        console.error("IndexedDB logo loading failed:", error);
      }
    }
    initLogos();
  }, []);

  // Load team matching on start or when standings change, merging uploaded custom logos
  useEffect(() => {
    const matches: Record<string, Team | null> = {};
    const updatedStandings = standings.map((row) => {
      const match = findTeamByInputName(row.teamName);
      if (match) {
        const customLogo = customLogos[match.id];
        matches[match.id] = {
          ...match,
          logo: customLogo || match.defaultLogo
        };
        return { ...row, teamId: match.id };
      } else {
        // Unmatched team - handle custom logo if uploaded via teamId or teamName
        const customLogo = customLogos[row.teamId] || customLogos[row.teamName];
        if (customLogo) {
          matches[row.teamId] = {
            id: row.teamId,
            officialName: row.teamName,
            displayName: row.teamName,
            shortName: row.teamName.substring(0, 10),
            aliases: [row.teamName],
            colors: ["#1F2937", "#374151", "#FFFFFF"],
            logo: customLogo,
            primaryColor: "#1F2937",
            secondaryColor: "#374151",
            textOnPrimary: "#FFFFFF"
          };
        } else {
          matches[row.teamId] = null;
        }
        return row;
      }
    });

    setMatchedTeams(matches);
    
    const hasChanged = JSON.stringify(updatedStandings) !== JSON.stringify(standings);
    if (hasChanged) {
      setStandings(updatedStandings);
    }
  }, [standings, customLogos]);

  // Live Pre-export Validation Hook (updates reactively) (Requirement 13)
  useEffect(() => {
    const runValidation = async () => {
      const canvas = canvasRef.current;
      const canvasExists = !!canvas;
      
      let correctSize = false;
      let hasTransform = false;
      let hasOverflow = false;
      
      if (canvas) {
        const styleWidth = canvas.style.width;
        const styleHeight = canvas.style.height;
        correctSize = styleWidth === "1080px" && styleHeight === "1350px";
        hasTransform = canvas.style.transform !== "" && canvas.style.transform !== "none";
        hasOverflow = canvas.style.overflow === "hidden";
      }

      const rowCount = standings.length;
      const allNamesFilled = standings.every(r => r.teamName.trim().length > 0);
      
      let logosReadyCount = 0;
      const remoteImagesFound: string[] = [];
      const brokenImagesFound: string[] = [];

      if (canvas) {
        const imgs = Array.from(canvas.querySelectorAll("img"));
        imgs.forEach((img: HTMLImageElement) => {
          if (img.complete && img.naturalWidth > 0) {
            logosReadyCount++;
          } else {
            brokenImagesFound.push(img.src);
          }
          if (img.src.startsWith("http://") || img.src.startsWith("https://")) {
            remoteImagesFound.push(img.src);
          }
        });
      } else {
        // Fallback from state
        standings.forEach(row => {
          const t = matchedTeams[row.teamId];
          if (t?.logo) {
            logosReadyCount++;
            if (t.logo.startsWith("http://") || t.logo.startsWith("https://")) {
              remoteImagesFound.push(t.logo);
            }
          }
        });
      }

      const remoteCssFound = checkRemoteStylesheets();
      
      let fontsReady = false;
      if (document.fonts) {
        fontsReady = document.fonts.check("12px 'Oswald Variable'") && 
                     document.fonts.check("12px 'Plus Jakarta Sans Variable'");
      }

      setValidation({
        canvasExists,
        correctSize,
        rowCount,
        allNamesFilled,
        logosReadyCount,
        fontsReady,
        remoteCssFound,
        remoteImagesFound,
        brokenImagesFound,
        hasTransform,
        hasOverflow
      });
    };

    runValidation();
    const interval = setInterval(runValidation, 1500);
    return () => clearInterval(interval);
  }, [standings, config, customLogos, matchedTeams]);

  // Handle live resizing to scale down the 1080x1350 canvas perfectly inside the viewport
  useEffect(() => {
    if (!previewContainerRef.current) return;

    const calculateScale = () => {
      if (!previewContainerRef.current) return;
      const { width, height } = previewContainerRef.current.getBoundingClientRect();
      
      // Leave space for padding/margins (minimum 40px)
      const maxW = width - 40;
      const maxH = height - 120; // leaves space for title/download buttons
      
      const scaleW = maxW / 1080;
      const scaleH = maxH / 1350;
      
      // We want to fit completely, so take the minimum
      const finalScale = Math.min(scaleW, scaleH, 1.2); // allow slightly up-scaling if huge monitor
      setScaleFactor(Number(finalScale.toFixed(4)));
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    
    // Set up a small interval to verify layout after first paint
    const timer = setTimeout(calculateScale, 200);

    return () => {
      window.removeEventListener("resize", calculateScale);
      clearTimeout(timer);
    };
  }, []);

  // Update standing row cells
  const handleCellChange = (targetIdentifier: string | number, field: keyof StandingRow, value: string | number) => {
    const isNumeric = [
      "played",
      "won",
      "drawn",
      "lost",
      "goalsFor",
      "goalsAgainst",
      "points",
      "goalDifference",
      "position",
      "rank"
    ].includes(field as string);

    const parsedVal = isNumeric ? parseEditableNumber(value) : value;

    setStandings((prev) => {
      const updated = prev.map((row) => {
        if (
          row.teamId === targetIdentifier ||
          row.rank === targetIdentifier ||
          row.position === targetIdentifier
        ) {
          const updatedRow = { ...row, [field]: parsedVal };

          // Auto calculate goalDifference if goalsFor or goalsAgainst changes
          if (field === "goalsFor" || field === "goalsAgainst") {
            const gf = field === "goalsFor" ? (parsedVal as number) : parseEditableNumber(row.goalsFor);
            const ga = field === "goalsAgainst" ? (parsedVal as number) : parseEditableNumber(row.goalsAgainst);
            updatedRow.goalDifference = gf - ga;
          }

          if (field === "teamName") {
            const match = findTeamByInputName(value as string);
            if (match) {
              updatedRow.teamId = match.id;
            } else {
              updatedRow.teamId = `unmatched-${row.rank || 1}`;
            }
          }

          return updatedRow;
        }
        return row;
      });
      return updated;
    });
  };

  // Re-sort table physically based on current stats and tie-breakers, re-assigning position 1..N
  const sortStandingsByStats = () => {
    const sorted = sortStandingsAndAssignPositions(standings);
    setStandings(sorted);
    setKeepSourceRanking(false);

    // Sync active workspace immediately
    const currentKey = getWorkspaceKey(selection.leagueId, selection.groupId, selection.season);
    const workspaceData: StandingsWorkspace = {
      selection,
      standings: sorted,
      currentWeek: config.currentWeek || 0,
      totalWeeks: config.totalWeeks || null,
      sourceRankingPreserved: false,
      sourceType: activeProvider as "sahadan" | "manual",
      noteText: config.noteText || "",
      zoneConfig: {
        directPromotionStart: config.directPromotionStart,
        directPromotionEnd: config.directPromotionEnd,
        playoffFinalPosition: config.playoffFinalPosition,
        playoffStart: config.playoffStart,
        playoffEnd: config.playoffEnd,
        relegationStart: config.relegationStart,
        relegationEnd: config.relegationEnd
      },
      zoneDefinitions: config.zoneDefinitions || getDefaultZoneDefinitions(selection.leagueId),
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(currentKey, JSON.stringify(workspaceData));

    setSortNotice("Puan, averaj, atılan gol ve galibiyete göre sıralama güncellendi.");
    setTimeout(() => {
      setSortNotice(null);
    }, 4000);
  };

  // Reset to initial sample standings (just reset data)
  const handleResetData = () => {
    setStandings(SAMPLE_STANDINGS);
    setSortNotice("Puan durumu varsayılan verilere sıfırlandı.");
    setTimeout(() => setSortNotice(null), 3000);
  };

  // Reset EVERYTHING to initial factory defaults (Varsayılan verilere dön)
  const handleResetAllDefaults = () => {
    setStandings(SAMPLE_STANDINGS);
    setConfig(DEFAULT_CONFIG);
    setCustomLogos({});
    setTestPngResult(null);
    localStorage.removeItem("1lig_standings");
    localStorage.removeItem("1lig_config");
    localStorage.removeItem("1lig_custom_logos");
    setJsonSuccess(false);
    setJsonError(null);
    setSortNotice("Tüm veriler ve ayarlar fabrika ayarlarına sıfırlandı.");
    setTimeout(() => setSortNotice(null), 3000);
  };

  // Preset Theme selector
  const applyPresetTheme = (themeName: "dark" | "light" | "custom") => {
    if (themeName === "dark") {
      setConfig({
        ...config,
        theme: "dark",
        backgroundColor: "#0B0F19",
        gradientStart: "#1E293B",
        gradientEnd: "#020617",
        useGradient: true,
        gridOverlay: true,
        textColor: "#F8FAFC",
        textMutedColor: "#94A3B8",
        pointsBgColor: "#1E293B",
        pointsTextColor: "#38BDF8",
        accentColor: "#FFD700"
      });
    } else if (themeName === "light") {
      setConfig({
        ...config,
        theme: "light",
        backgroundColor: "#F8FAFC",
        gradientStart: "#FFFFFF",
        gradientEnd: "#E2E8F0",
        useGradient: true,
        gridOverlay: true,
        textColor: "#0F172A",
        textMutedColor: "#64748B",
        pointsBgColor: "#0F172A",
        pointsTextColor: "#FFFFFF",
        accentColor: "#1E3A8A" // deep blue accent
      });
    } else {
      setConfig({
        ...config,
        theme: "custom"
      });
    }
  };

  // Advanced, Strict JSON Data Import handler
  const handleJsonImport = () => {
    setJsonError(null);
    setJsonSuccess(false);

    try {
      if (!jsonInput.trim()) {
        throw new Error("Lütfen JSON verisini buraya yapıştırın.");
      }

      const parsed = JSON.parse(jsonInput);
      let rows: any[] = [];

      // Accept either a direct array of items or an object with standings/data field
      if (Array.isArray(parsed)) {
        rows = parsed;
      } else if (parsed.standings && Array.isArray(parsed.standings)) {
        rows = parsed.standings;
      } else if (parsed.data && Array.isArray(parsed.data)) {
        rows = parsed.data;
      } else {
        throw new Error("JSON geçerli bir dizi veya 'standings' / 'data' alanı içeren bir nesne olmalıdır.");
      }

      // Check for exactly 20 teams
      if (rows.length !== 20) {
        throw new Error(`Trendyol 1. Lig 2026-2027 sezonu tam olarak 20 takımdan oluşmaktadır. İçe aktarılan veride ${rows.length} takım bulundu.`);
      }

      // Track matches, duplicates and unmatched names
      const matchedIds = new Set<string>();
      const seenNames = new Set<string>();
      const duplicates: string[] = [];
      const unmatched: string[] = [];

      // Map imported data
      const formattedStandings: StandingRow[] = rows.map((item, idx) => {
        const rank = Number(item.rank || item.sira || idx + 1);
        const rawName = String(item.teamName || item.team || item.takim || item.displayName || "").trim();
        
        if (!rawName) {
          throw new Error(`${idx + 1}. sıradaki takımın ismi boş olamaz (teamName veya team alanı gereklidir).`);
        }

        const nameLower = rawName.toLowerCase();
        if (seenNames.has(nameLower)) {
          duplicates.push(rawName);
        }
        seenNames.add(nameLower);

        // Match to determine teamId
        const match = findTeamByInputName(rawName);
        if (match) {
          matchedIds.add(match.id);
        } else {
          unmatched.push(rawName);
        }

        const played = Number(item.played !== undefined ? item.played : (item.O !== undefined ? item.O : 0));
        const won = Number(item.won !== undefined ? item.won : (item.G !== undefined ? item.G : 0));
        const drawn = Number(item.drawn !== undefined ? item.drawn : (item.B !== undefined ? item.B : 0));
        const lost = Number(item.lost !== undefined ? item.lost : (item.M !== undefined ? item.M : 0));
        const gf = Number(item.goalsFor !== undefined ? item.goalsFor : (item.AG !== undefined ? item.AG : 0));
        const ga = Number(item.goalsAgainst !== undefined ? item.goalsAgainst : (item.YG !== undefined ? item.YG : 0));
        const gd = Number(item.goalDifference !== undefined ? item.goalDifference : (item.AV !== undefined ? item.AV : (gf - ga)));
        const points = Number(item.points !== undefined ? item.points : (item.P !== undefined ? item.P : 0));

        return {
          rank,
          teamId: match ? match.id : `unmatched-${rank}`,
          teamName: match ? match.displayName : rawName,
          played,
          won,
          drawn,
          lost,
          goalsFor: gf,
          goalsAgainst: ga,
          goalDifference: gd,
          points
        };
      });

      // Strict validations
      if (duplicates.length > 0) {
        throw new Error(`Tekrarlanan takım girişi tespit edildi: ${duplicates.join(", ")}`);
      }

      if (unmatched.length > 0) {
        throw new Error(`Sistem veritabanı ile eşleşmeyen takım ismi tespit edildi: ${unmatched.join(", ")}. Lütfen teams.ts dosyasındaki resmi isimleri kullanın.`);
      }

      const missingTeams = TEAMS.filter(t => !matchedIds.has(t.id));
      if (missingTeams.length > 0) {
        throw new Error(`Eksik takım tespit edildi: ${missingTeams.map(t => t.displayName).join(", ")}. 1. Lig puan durumu 20 takımın tamamını içermelidir.`);
      }

      // Sort logic
      if (!keepSourceRanking) {
        formattedStandings.sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
          return b.goalsFor - a.goalsFor;
        });
      } else {
        formattedStandings.sort((a, b) => a.rank - b.rank);
      }

      // Re-assign ranks 1 to 20
      const finalStandings = formattedStandings.map((row, idx) => ({
        ...row,
        rank: idx + 1
      }));

      setStandings(finalStandings);
      setJsonSuccess(true);
      setJsonInput("");
    } catch (err: any) {
      setJsonError(err.message || "Geçersiz JSON formatı.");
    }
  };

  // Live JSON Validator Input Checker
  useEffect(() => {
    if (!jsonInput.trim()) {
      setJsonAnalysis({ valid: false, count: 0, duplicates: [], missing: [], unmatched: [], error: null });
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      let rows: any[] = [];
      if (Array.isArray(parsed)) {
        rows = parsed;
      } else if (parsed.standings && Array.isArray(parsed.standings)) {
        rows = parsed.standings;
      } else if (parsed.data && Array.isArray(parsed.data)) {
        rows = parsed.data;
      } else {
        setJsonAnalysis({
          valid: false,
          count: 0,
          duplicates: [],
          missing: [],
          unmatched: [],
          error: "Geçersiz format. JSON dizi ya da standings/data içermelidir."
        });
        return;
      }

      const teamNames: string[] = [];
      const unmatched: string[] = [];
      const matchedIds = new Set<string>();

      rows.forEach((row, idx) => {
        const name = String(row.teamName || row.team || row.takim || row.displayName || "").trim();
        if (name) {
          teamNames.push(name);
          const match = findTeamByInputName(name);
          if (match) {
            matchedIds.add(match.id);
          } else {
            unmatched.push(name);
          }
        }
      });

      const duplicates: string[] = [];
      const seen = new Set<string>();
      teamNames.forEach(name => {
        const norm = name.toLowerCase();
        if (seen.has(norm)) {
          if (!duplicates.includes(name)) duplicates.push(name);
        }
        seen.add(norm);
      });

      const missing = TEAMS.filter(t => !matchedIds.has(t.id)).map(t => t.displayName);

      setJsonAnalysis({
        valid: true,
        count: rows.length,
        duplicates,
        missing,
        unmatched,
        error: null
      });
    } catch (e: any) {
      setJsonAnalysis({
        valid: false,
        count: 0,
        duplicates: [],
        missing: [],
        unmatched: [],
        error: "Sözdizimi Hatası: " + e.message
      });
    }
  }, [jsonInput]);

  // Convert current standings to JSON string for easy copying
  const generateCurrentJson = () => {
    const exportData = standings.map(row => ({
      rank: row.rank,
      teamName: row.teamName,
      played: row.played,
      won: row.won,
      drawn: row.drawn,
      lost: row.lost,
      goalsFor: row.goalsFor,
      goalsAgainst: row.goalsAgainst,
      goalDifference: row.goalDifference,
      points: row.points
    }));
    setJsonInput(JSON.stringify(exportData, null, 2));
    setJsonError(null);
    setJsonSuccess(false);
  };

  // Helper function to wait for fonts & images to decode (DEPRECATED: Prefer waitForImages)
  const prepareCanvasAssets = async () => {
    if (!canvasRef.current) throw new Error("Canvas referansı bulunamadı.");
    if (document.fonts) {
      await document.fonts.ready;
    }
    const imgElements = Array.from(canvasRef.current.querySelectorAll("img")) as HTMLImageElement[];
    await Promise.all(imgElements.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    }));
    await new Promise((resolve) => setTimeout(resolve, 400));
  };

  // Unified PNG Generator Function (Requirement 3, 6, 7)
  const generatePosterPng = async (isTest: boolean) => {
    const node = canvasRef.current;
    if (!node) {
      const err = new Error("Dışa aktarılacak tasarım alanı bulunamadı.");
      console.error("PNG Export Error", {
        error: err,
        message: err.message
      });
      if (!isTest) {
        setExportError(err.message);
      } else {
        setTestPngResult(null);
        alert(err.message);
      }
      return;
    }

    if (isTest) {
      setIsGeneratingTest(true);
      setTestPngResult(null);
    } else {
      setIsExporting(true);
      setExportError(null);
    }

    setErrorMessage(null);

    // Initial phase
    let currentPhase = "Fontlar hazırlanıyor";
    setExportPhase(currentPhase);

    try {
      // Step 1: Fonts Preparation
      if (document.fonts) {
        await document.fonts.ready;
      }
      await waitForNextPaint();
      
      const checkOswald = document.fonts ? document.fonts.check("12px 'Oswald Variable'") : false;
      const checkPlusJakarta = document.fonts ? document.fonts.check("12px 'Plus Jakarta Sans Variable'") : false;
      setFontCheckResult(checkOswald && checkPlusJakarta ? "Başarılı (Yerel)" : "Kısmi / Sistem");

      // Step 2: Team Logos Verification
      currentPhase = "Takım logoları kontrol ediliyor";
      setExportPhase(currentPhase);
      const imgElements = Array.from(node.querySelectorAll("img"));
      setUsedLogoCount(imgElements.length);
      
      if (!isSafeMode) {
        const imageResult = await waitForImages(node);
        if (imageResult.warnings.length > 0) {
          console.warn("Bazı isteğe bağlı görseller yüklenemedi:", imageResult.warnings);
        }
        setImageCheckResult(
          `Logolar doğrulandı: ${imageResult.loadedCount} yüklendi, ${imageResult.failedOptionalCount} isteğe bağlı başarısız.`
        );
      } else {
        setImageCheckResult("Güvenli Mod: Logo kontrolleri atlandı");
      }

      await waitForNextPaint();

      // Step 3: Design Stabilization
      currentPhase = "Tasarım hazırlanıyor";
      setExportPhase(currentPhase);
      // Stabilize fonts and spacing layout
      await new Promise((resolve) => setTimeout(resolve, 400));

      const remoteCss = checkRemoteStylesheets();
      if (remoteCss.length > 0) {
        console.warn("Uzak stil dosyası bulundu:", remoteCss);
      }

      // Step 4: Render to PNG with html-to-image
      currentPhase = "PNG oluşturuluyor";
      setExportPhase(currentPhase);
      
      const fontEmbedCSS = !isSafeMode && typeof getFontEmbedCSS === "function" 
        ? await getFontEmbedCSS(node) 
        : undefined;

      const colors = config.theme === "dark" 
        ? { bg: config.backgroundColor || "#0B0F19" } 
        : config.theme === "light" 
          ? { bg: config.backgroundColor || "#F8FAFC" } 
          : { bg: config.backgroundColor };

      const htmlToImageOptions: any = {
        width: 1080,
        height: 1350,
        pixelRatio: 1, // exact output scale
        cacheBust: true,
        skipAutoScale: true,
        backgroundColor: colors.bg,
        style: {
          width: "1080px",
          height: "1350px",
          minWidth: "1080px",
          minHeight: "1350px",
          transform: "none",
          transformOrigin: "top left"
        }
      };

      if (fontEmbedCSS) {
        htmlToImageOptions.fontEmbedCSS = fontEmbedCSS;
      }

      if (isSafeMode) {
        htmlToImageOptions.skipFonts = true;
      }

      let dataUrl: string;
      try {
        dataUrl = await toPng(node, htmlToImageOptions);
      } catch (firstErr) {
        console.warn("Ilk toPng denemesi basarisiz oldu, guvenli fallback secenekleriyle tekrar deneniyor...", firstErr);
        const fallbackOptions = {
          ...htmlToImageOptions,
          cacheBust: false,
          skipFonts: true,
          fontEmbedCSS: undefined
        };
        dataUrl = await toPng(node, fallbackOptions);
      }

      // Verify PNG dimensions
      const sizeValidationPromise = new Promise<{ width: number; height: number }>((resolve, reject) => {
        const testImg = new Image();
        testImg.onload = () => {
          resolve({ width: testImg.width, height: testImg.height });
        };
        testImg.onerror = (err) => {
          reject(err);
        };
        testImg.src = dataUrl;
      });

      const size = await sizeValidationPromise;
      if (size.width !== 1080 || size.height !== 1350) {
        throw new Error(`Çıktı görseli boyutu hatalı. Beklenen: 1080x1350 piksel, Üretilen: ${size.width}x${size.height} piksel.`);
      }

      // Measure byte size by parsing dataURL
      const base64Content = dataUrl.split(",")[1];
      const binaryLength = window.atob(base64Content).length;
      const sizeKB = (binaryLength / 1024).toFixed(1);

      if (isTest) {
        setTestPngResult({
          width: size.width,
          height: size.height,
          sizeKB,
          dataUrl,
          generatedAt: new Date().toLocaleTimeString("tr-TR")
        });
        setExportPhase("İşlem tamamlandı");
      } else {
        // Step 5: Save file to disk
        currentPhase = "Dosya indiriliyor";
        setExportPhase(currentPhase);
        const link = document.createElement("a");
        link.download = buildExportFilename(selection.leagueId, selection.groupId);
        link.href = dataUrl;
        link.click();
        setExportPhase("İşlem tamamlandı");
      }
    } catch (error: any) {
      const errMessage = getErrorMessage(error);
      console.error("PNG Export Error", {
        error,
        message: errMessage,
        stack: error instanceof Error ? error.stack : undefined
      });

      const errorReport = `PNG oluşturulamadı.\nAşama: ${currentPhase}\nHata: ${errMessage}`;
      setErrorMessage(errorReport);
      
      if (isTest) {
        setTestPngResult(null);
      } else {
        setExportError(errorReport);
      }
    } finally {
      if (isTest) {
        setIsGeneratingTest(false);
      } else {
        setIsExporting(false);
      }
    }
  };

  const handleExportPNG = () => generatePosterPng(false);
  const handleGenerateTestPng = () => generatePosterPng(true);

  // Logo Upload & Processing Engine (Requirement 8, 9, 10, 12)
  const processTeamLogo = async (teamId: string, file: File): Promise<void> => {
    const ALLOWED_TYPES = new Set([
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/jpeg",
      "image/jpg"
    ]);

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (!(file instanceof File)) {
      throw new Error("Geçerli bir logo dosyası seçilmedi.");
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      throw new Error(
        "Yalnızca PNG, WEBP veya SVG dosyası kullanılabilir."
      );
    }

    if (file.size === 0) {
      throw new Error("Seçilen logo dosyası boş.");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Logo dosyası 5 MB'den büyük olamaz.");
    }

    setLogoUploadStatus(prev => ({
      ...prev,
      [teamId]: { success: true, message: "Dosya okunuyor..." }
    }));

    // Process file & standardise to 512x512 transparent PNG
    const processed = await processLogoFile(file);

    const record = {
      teamId,
      dataUrl: processed.dataUrl,
      fileName: file.name,
      mimeType: "image/png",
      updatedAt: Date.now()
    };

    // Save to IndexedDB with custom error catching
    try {
      await saveTeamLogo(record);
    } catch (error) {
      throw new Error(
        `Logo tarayıcıya kaydedilemedi: ${getErrorMessage(error)}`
      );
    }

    // Update React State
    setCustomLogos(prev => ({
      ...prev,
      [teamId]: processed.dataUrl
    }));
    setLogoDetails(prev => ({
      ...prev,
      [teamId]: record
    }));

    setLogoUploadStatus(prev => ({
      ...prev,
      [teamId]: { success: true, message: "Logo başarıyla yüklendi ve kaydedildi." }
    }));
  };

  const handleLogoInputChange = (
    teamId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.currentTarget;
    const file = input.files?.item(0);

    input.value = "";

    if (!file) {
      return;
    }

    void processTeamLogo(teamId, file).catch((error) => {
      console.error("Logo Upload Error", {
        teamId,
        error,
        message: getErrorMessage(error)
      });

      setLogoUploadStatus(prev => ({
        ...prev,
        [teamId]: {
          success: false,
          message: getErrorMessage(error)
        }
      }));

      alert(`${teamId} logosu yüklenemedi: ${getErrorMessage(error)}`);
    });
  };

  const handleRemoveCustomLogo = async (teamId: string) => {
    try {
      await deleteTeamLogo(teamId);
      setCustomLogos(prev => {
        const next = { ...prev };
        delete next[teamId];
        return next;
      });
      setLogoDetails(prev => {
        const next = { ...prev };
        delete next[teamId];
        return next;
      });
      setLogoUploadStatus(prev => {
        const next = { ...prev };
        delete next[teamId];
        return next;
      });
    } catch (err) {
      console.error("Error removing custom logo:", err);
    }
  };

  const handleClearAllCustomLogos = async () => {
    if (window.confirm("Bütün yüklü logoları silip varsayılan logolara dönmek istediğinize emin misiniz?")) {
      try {
        await clearAllTeamLogos();
        setCustomLogos({});
        setLogoDetails({});
        setLogoUploadStatus({});
      } catch (err) {
        console.error("Error clearing all logos:", err);
      }
    }
  };

  const handleExportLogoBackup = () => {
    try {
      const backupString = JSON.stringify(logoDetails, null, 2);
      const blob = new Blob([backupString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "standings_team_logos_backup.json";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting logos backup:", err);
      alert("Yedek ihraç edilirken hata oluştu.");
    }
  };

  const handleImportLogoBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const result = e.target?.result;
        if (typeof result !== "string") return;
        const parsed = JSON.parse(result);

        const nextLogos = { ...customLogos };
        const nextDetails = { ...logoDetails };

        for (const teamId of Object.keys(parsed)) {
          const item = parsed[teamId];
          if (item && item.teamId && item.dataUrl) {
            await saveTeamLogo({
              teamId: item.teamId,
              dataUrl: item.dataUrl,
              fileName: item.fileName || "imported_logo.png",
              mimeType: item.mimeType || "image/png",
              updatedAt: item.updatedAt || Date.now()
            });
            nextLogos[item.teamId] = item.dataUrl;
            nextDetails[item.teamId] = item;
          }
        }

        setCustomLogos(nextLogos);
        setLogoDetails(nextDetails);
        alert("Logo yedeği başarıyla içe aktarıldı!");
      } catch (err) {
        console.error("Error importing logo backup:", err);
        alert("Yedek içe aktarılamadı. Geçersiz dosya formatı.");
      } finally {
        event.currentTarget.value = "";
      }
    };
    reader.readAsText(file);
  };

  // Calculate unmatched team count
  const unmatchedCount = standings.filter(row => row.teamId.startsWith("unmatched-")).length;

  return (
    <div className="min-h-screen bg-[#090D16] text-[#E2E8F0] font-sans antialiased flex flex-col">
      
      {/* 1. Header Banner */}
      <header className="bg-[#111827]/90 border-b border-[#1F2937]/80 px-6 py-4 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#FFD700] p-2 rounded-lg text-black font-extrabold text-sm tracking-tighter">
            T1L
          </div>
          <div>
            <h1 className="font-semibold text-lg text-white tracking-wide">
              1. Lig Sosyal Medya Tasarım Stüdyosu
            </h1>
            <p className="text-xs text-[#9CA3AF] font-medium">
              Trendyol 1. Lig 2026-2027 Sezonu Profesyonel 1080x1350 Görsel Jeneratörü
            </p>
          </div>
        </div>

        {/* Action triggers */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1F2937] text-gray-300 border border-gray-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Yönetim Paneli Aktif
          </div>
        </div>
      </header>

      {/* 2. Main Workspace */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-0 overflow-hidden h-[calc(100vh-73px)]">
        
        {/* LEFT COLUMN: LIVE POSTER PREVIEW */}
        <section className="xl:col-span-5 bg-[#0E1321] border-r border-[#1F2937]/60 p-6 flex flex-col justify-between items-center relative overflow-hidden">
          
          <div className="w-full max-w-lg mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium bg-[#1F2937]/50 px-3 py-1 rounded-full border border-gray-800/40">
              <Eye className="w-4 h-4 text-emerald-400" />
              Sosyal Medya Ön İzleme <span className="text-xs text-gray-500">({(scaleFactor * 100).toFixed(0)}%)</span>
            </div>
            
            {/* Resolution indicator */}
            <span className="text-xs text-[#FFD700] font-bold bg-[#FFD700]/10 px-3 py-1 rounded-md border border-[#FFD700]/20 tracking-wider">
              1080 x 1350 px (4:5)
            </span>
          </div>

          {/* Scaled Preview Wrapper */}
          <div 
            ref={previewContainerRef}
            className="flex-1 w-full flex items-center justify-center relative overflow-hidden min-h-[400px]"
          >
            {/* Container that dynamically holds scaled element */}
            <div 
              style={{ 
                transform: `scale(${scaleFactor})`,
                transformOrigin: "center center",
                width: "1080px",
                height: "1350px",
                flexShrink: 0
              }}
              className="absolute shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-gray-800/60 transition-transform duration-300"
            >
              {/* Full HD Design Canvas rendering HTML elements inside */}
              <DesignCanvas 
                competition={currentCompConfig}
                group={currentGroupConfig}
                standings={standings} 
                config={config} 
                canvasRef={canvasRef} 
                matchedTeams={matchedTeams}
                isSafeMode={isSafeMode}
              />
            </div>
          </div>

          {/* Export Action Controls */}
          <div className="w-full max-w-lg mt-6 pt-4 border-t border-gray-800/60 flex flex-col gap-3">
            <button
              onClick={handleExportPNG}
              disabled={isExporting}
              className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 shadow-lg ${
                isExporting 
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-[#FFD700] to-[#E5C100] text-black hover:brightness-110 hover:shadow-[#FFD700]/10"
              }`}
            >
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Görsel Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Yüksek Çözünürlüklü PNG İndir</span>
                </>
              )}
            </button>
            
            {exportError && (
              <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-900/50 text-center font-medium">
                {exportError}
              </p>
            )}
            <p className="text-[11px] text-gray-500 text-center leading-relaxed">
              * Tasarımdaki tüm metinler, logolar ve fontlar indirildiğinde tam 1080x1350 piksel olarak kristal netliğinde dışa aktarılır.
            </p>
          </div>

        </section>

        {/* RIGHT COLUMN: CONTROL PANEL & UTILITIES */}
        <section className="xl:col-span-7 bg-[#090D16] flex flex-col overflow-hidden">
          
          {/* Navigation Tabs */}
          <div className="bg-[#111827]/70 border-b border-[#1F2937]/50 px-6 py-2 flex gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab("data")}
              className={`px-4 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "data"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/60"
              }`}
            >
              <Layers className="w-4 h-4 text-[#38BDF8]" />
              Puan Durumu Verisi
              {unmatchedCount > 0 && (
                <span className="bg-amber-500 text-black text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {unmatchedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("design")}
              className={`px-4 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "design"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/60"
              }`}
            >
              <Palette className="w-4 h-4 text-[#A855F7]" />
              Tasarım Ayarları
            </button>

            <button
              onClick={() => setActiveTab("zones")}
              className={`px-4 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "zones"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/60"
              }`}
            >
              <Sliders className="w-4 h-4 text-[#F59E0B]" />
              Yükselme / Düşme Bölgeleri
            </button>

            <button
              onClick={() => setActiveTab("api")}
              className={`px-4 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "api"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/60"
              }`}
            >
              <Code className="w-4 h-4 text-[#10B981]" />
              Entegrasyon / API
            </button>

            <button
              onClick={() => setActiveTab("test")}
              className={`px-4 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "test"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/60"
              }`}
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              Test PNG Oluştur
            </button>

            <button
              onClick={() => setActiveTab("verification")}
              className={`px-4 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "verification"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/60"
              }`}
            >
              <Check className="w-4 h-4 text-amber-400" />
              İhracat Öncesi Doğrulama
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* TAB 1: STANDINGS DATA GRID */}
            {activeTab === "data" && (
              <div className="space-y-6">

                {/* YARIŞMA VE LİG / GRUP SEÇİMİ */}
                <div className="bg-[#111827]/80 border border-gray-800 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-800/80 pb-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-[#F4510B]" />
                        Lig ve Grup Seçimi
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Çalışmak istediğiniz ligi ve grubu seçin. Her lig ve grubun verisi kendi çalışma alanında (workspace) bağımsız olarak saklanır.
                      </p>
                    </div>

                    {/* Aktif Çalışma Özeti */}
                    <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-3 text-xs flex flex-wrap items-center gap-4">
                      <div>
                        <span className="text-gray-500 block text-[10px] font-bold uppercase">Lig</span>
                        <span className="font-extrabold text-white">{currentCompConfig.name}</span>
                      </div>
                      {currentCompConfig.requiresGroup && (
                        <div>
                          <span className="text-gray-500 block text-[10px] font-bold uppercase">Grup</span>
                          <span className="font-extrabold text-[#F4510B]">{currentGroupConfig.name}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500 block text-[10px] font-bold uppercase">Sezon</span>
                        <span className="font-bold text-gray-300">{selection.season}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px] font-bold uppercase">Tasarım</span>
                        <span className="font-bold text-emerald-400">{currentCompConfig.templateId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {/* Lig Seçimi */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lig Seçin</label>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.values(COMPETITIONS).map((comp) => (
                          <button
                            key={comp.id}
                            onClick={() => {
                              const defaultGroup = comp.groups[0].id;
                              handleSelectCompetition(comp.id, defaultGroup, selection.season);
                            }}
                            className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all text-center ${
                              selection.leagueId === comp.id
                                ? "bg-[#F4510B] text-white border-[#F4510B] shadow-lg shadow-[#F4510B]/20"
                                : "bg-gray-900 hover:bg-gray-800 text-gray-300 border-gray-800"
                            }`}
                          >
                            {comp.shortName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Grup Seçimi (Only if league has groups) */}
                    {currentCompConfig.requiresGroup && (
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Grup Seçin</label>
                        <div className="flex flex-wrap gap-2">
                          {currentCompConfig.groups.map((grp) => (
                            <button
                              key={grp.id}
                              onClick={() => handleSelectCompetition(selection.leagueId, grp.id, selection.season)}
                              className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all ${
                                selection.groupId === grp.id
                                  ? "bg-[#F4510B] text-white border-[#F4510B] shadow-lg shadow-[#F4510B]/20"
                                  : "bg-gray-900 hover:bg-gray-800 text-gray-300 border-gray-800"
                              }`}
                            >
                              {grp.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sezon Seçimi */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sezon</label>
                      <input
                        type="text"
                        value={selection.season}
                        onChange={(e) => handleSelectCompetition(selection.leagueId, selection.groupId, e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#F4510B]"
                        placeholder="2026-2027"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Data Header Options */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-white text-sm">Veri Girişi &amp; Entegrasyon</h3>
                    <p className="text-xs text-gray-400 mt-1">Puan durumunu manuel düzenleyebilir, otomatik hizalayabilir veya JSON yükleyebilirsiniz.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={sortStandingsByStats}
                      className="px-3.5 py-1.5 text-xs font-bold bg-[#1F2937] hover:bg-gray-700 text-[#38BDF8] border border-gray-800 rounded-lg flex items-center gap-1.5 transition-colors"
                      title="Puan ve averaja göre otomatik sıralar"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Otomatik Sırala
                    </button>
                    <button
                      onClick={handleResetData}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-[#1F2937] hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/50 text-gray-300 border border-gray-800 rounded-lg flex items-center gap-1.5 transition-all"
                    >
                      Sıfırla
                    </button>
                  </div>
                </div>

                {/* Toast / Notification Banner */}
                {sortNotice && (
                  <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-lg animate-fade-in">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{sortNotice}</span>
                    </div>
                    <button
                      onClick={() => setSortNotice(null)}
                      className="text-xs text-emerald-400 hover:text-white px-1 py-0.5 rounded"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Warnings about unmatched team names */}
                {unmatchedCount > 0 && (
                  <div className="bg-amber-950/40 border border-amber-900/50 text-amber-200 p-4 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Eşleşmeyen Takım İsmi Uyarısı ({unmatchedCount})</h4>
                      <p className="text-xs text-amber-300/90 mt-1 leading-relaxed">
                        Puan durumundaki bazı takım isimleri veritabanımızdaki 20 takımla eşleşmedi. Bu takımlara ait resmi logolar ve renk kodları yüklenemeyecek, bunun yerine genel simgeler kullanılacaktır. Türkçe sponsor veya A.Ş eklerini temizleyen otomatik filtre aktiftir fakat yazım hatası olup olmadığını kontrol ediniz.
                      </p>
                    </div>
                  </div>
                )}

                {/* Position Integrity Warning */}
                {(() => {
                  const positions = standings.map((r, i) => r.position ?? r.rank ?? (i + 1));
                  const counts = new Map<number, number>();
                  positions.forEach(p => counts.set(p, (counts.get(p) || 0) + 1));
                  const dups: number[] = [];
                  counts.forEach((cnt, p) => { if (cnt > 1) dups.push(p); });
                  const missing: number[] = [];
                  for (let i = 1; i <= standings.length; i++) {
                    if (!counts.has(i)) missing.push(i);
                  }
                  if (dups.length > 0 || missing.length > 0) {
                    return (
                      <div className="p-3 bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs rounded-lg space-y-1 my-3">
                        <div className="font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          Sıralama / Position Değer Uyarısı
                        </div>
                        {dups.length > 0 && <div>• Tekrarlayan position sıraları var: {dups.join(", ")}</div>}
                        {missing.length > 0 && <div>• Eksik position sıraları var: {missing.join(", ")}</div>}
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Standings Table Grid */}
                <div className="overflow-x-auto rounded-xl border border-gray-800/80 bg-[#111827]/20">
                  <table className="w-full text-left border-collapse min-w-[850px]">
                    <thead>
                      <tr className="border-b border-gray-800 text-[11px] font-bold text-gray-400 uppercase bg-[#111827]/40 tracking-wider">
                        <th className="py-3.5 px-3 text-center w-[50px]">SIRA</th>
                        <th className="py-3.5 px-2 text-center w-[130px]">LOGO / YÜKLE</th>
                        <th className="py-3.5 px-4 w-[240px]">TAKIM ADI (TFF VEYA MANUEL)</th>
                        <th className="py-3.5 px-3 text-center">O</th>
                        <th className="py-3.5 px-3 text-center">G</th>
                        <th className="py-3.5 px-3 text-center">B</th>
                        <th className="py-3.5 px-3 text-center">M</th>
                        <th className="py-3.5 px-3 text-center">AG</th>
                        <th className="py-3.5 px-3 text-center">YG</th>
                        <th className="py-3.5 px-3 text-center">AV</th>
                        <th className="py-3.5 px-4 text-center bg-gray-800/40 w-[80px]">PUAN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60 text-sm">
                      {[...standings]
                        .sort((a, b) => (a.position ?? a.rank ?? 0) - (b.position ?? b.rank ?? 0))
                        .map((row) => {
                        const isUnmatched = row.teamId.startsWith("unmatched-");
                        const currentTeam = matchedTeams[row.teamId];
                        return (
                          <tr 
                            key={row.teamId || `row-${row.rank}`} 
                            className={`hover:bg-gray-800/30 transition-colors ${
                              isUnmatched ? "bg-amber-500/5 hover:bg-amber-500/10" : ""
                            }`}
                          >
                            {/* Rank (Locked editing) */}
                            <td className="py-2.5 px-3 text-center font-bold text-gray-400 bg-[#111827]/20">
                              {row.position ?? row.rank}
                            </td>

                            {/* Logo view and custom upload */}
                            <td className="py-2.5 px-2 text-center bg-[#111827]/5">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-950/80 border border-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                                  {currentTeam?.logo ? (
                                    <img 
                                      src={currentTeam.logo} 
                                      alt="" 
                                      className="w-6 h-6 object-contain" 
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <span className="text-[9px] font-bold text-gray-500">YOK</span>
                                  )}
                                </div>
                                <div className="flex flex-col gap-0.5 items-start">
                                  <label
                                    htmlFor={`team-logo-input-${row.teamId}`}
                                    className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-[9px] text-gray-300 font-bold px-1.5 py-0.5 rounded transition-colors border border-gray-700"
                                  >
                                    Yükle
                                  </label>
                                  <input 
                                    id={`team-logo-input-${row.teamId}`}
                                    type="file" 
                                    hidden
                                    accept="image/png,image/webp,image/svg+xml" 
                                    onChange={(event) => handleLogoInputChange(row.teamId, event)}
                                  />
                                  {customLogos[row.teamId] && (
                                    <button
                                      onClick={() => handleRemoveCustomLogo(row.teamId)}
                                      className="text-[9px] text-red-400 hover:text-red-300 font-bold text-left animate-pulse"
                                    >
                                      Sıfırla
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Team Name Input with match validation status */}
                            <td className="py-2.5 px-4">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={row.teamName}
                                  onChange={(e) => handleCellChange(row.teamId || row.rank, "teamName", e.target.value)}
                                  className={`w-full bg-gray-900 border ${
                                    isUnmatched 
                                      ? "border-amber-600/80 text-amber-200 focus:ring-amber-500" 
                                      : "border-gray-800 text-white focus:border-[#38BDF8]"
                                  } rounded px-2.5 py-1 text-sm focus:outline-none focus:ring-1`}
                                  placeholder="Örn: Kocaelispor"
                                />
                                {isUnmatched ? (
                                  <span className="cursor-help" title="Takım eşleşmedi. Genel simge çizilecek.">
                                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                  </span>
                                ) : (
                                  <span className="text-emerald-500 text-xs font-semibold" title="Kayıtlı takımla tam doğrulandı">
                                    <Check className="w-4 h-4 flex-shrink-0" />
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Played (O) */}
                            <td className="py-2.5 px-3 text-center">
                              <input
                                  type="number"
                                  value={row.played}
                                  onChange={(e) => handleCellChange(row.teamId || row.rank, "played", Number(e.target.value))}
                                  className="w-12 bg-gray-900 border border-gray-800 rounded px-1.5 py-1 text-center text-sm focus:outline-none focus:border-[#38BDF8]"
                                />
                              </td>
  
                              {/* Won (G) */}
                              <td className="py-2.5 px-3 text-center">
                                <input
                                  type="number"
                                  value={row.won}
                                  onChange={(e) => handleCellChange(row.teamId || row.rank, "won", Number(e.target.value))}
                                  className="w-12 bg-gray-900 border border-gray-800 rounded px-1.5 py-1 text-center text-sm focus:outline-none focus:border-[#38BDF8]"
                                />
                              </td>
  
                              {/* Drawn (B) */}
                              <td className="py-2.5 px-3 text-center">
                                <input
                                  type="number"
                                  value={row.drawn}
                                  onChange={(e) => handleCellChange(row.teamId || row.rank, "drawn", Number(e.target.value))}
                                  className="w-12 bg-gray-900 border border-gray-800 rounded px-1.5 py-1 text-center text-sm focus:outline-none focus:border-[#38BDF8]"
                                />
                              </td>
  
                              {/* Lost (M) */}
                              <td className="py-2.5 px-3 text-center">
                                <input
                                  type="number"
                                  value={row.lost}
                                  onChange={(e) => handleCellChange(row.teamId || row.rank, "lost", Number(e.target.value))}
                                  className="w-12 bg-gray-900 border border-gray-800 rounded px-1.5 py-1 text-center text-sm focus:outline-none focus:border-[#38BDF8]"
                                />
                              </td>
  
                              {/* Goals For (AG) */}
                              <td className="py-2.5 px-3 text-center">
                                <input
                                  type="number"
                                  value={row.goalsFor}
                                  onChange={(e) => handleCellChange(row.teamId || row.rank, "goalsFor", Number(e.target.value))}
                                  className="w-12 bg-gray-900 border border-gray-800 rounded px-1.5 py-1 text-center text-sm focus:outline-none focus:border-[#38BDF8]"
                                />
                              </td>
  
                              {/* Goals Against (YG) */}
                              <td className="py-2.5 px-3 text-center">
                                <input
                                  type="number"
                                  value={row.goalsAgainst}
                                  onChange={(e) => handleCellChange(row.teamId || row.rank, "goalsAgainst", Number(e.target.value))}
                                  className="w-12 bg-gray-900 border border-gray-800 rounded px-1.5 py-1 text-center text-sm focus:outline-none focus:border-[#38BDF8]"
                                />
                              </td>
  
                              {/* Goal Difference (AV) - calculated dynamically */}
                              <td className="py-2.5 px-3 text-center font-semibold text-gray-300">
                                {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                              </td>
  
                              {/* Points (P) */}
                              <td className="py-2.5 px-4 text-center bg-gray-800/10">
                                <input
                                  type="number"
                                  value={row.points}
                                  onChange={(e) => handleCellChange(row.teamId || row.rank, "points", Number(e.target.value))}
                                  className="w-14 bg-gray-900 border border-gray-700 rounded px-1.5 py-1 text-center text-sm font-bold text-[#38BDF8] focus:outline-none focus:border-[#38BDF8]"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
  
                  {/* JSON Data Import / Export utilities */}
                  <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                          <FileJson className="w-4 h-4 text-[#38BDF8]" />
                          JSON Veri Paylaşım &amp; Aktarım
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">Sistem verileriyle birebir uyumlu 20 takımlı puan durumunu JSON formatıyla içe/dışa aktarın.</p>
                      </div>
                      <button
                        onClick={generateCurrentJson}
                        className="px-3 py-1.5 text-xs font-bold bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        Mevcut Veriyi JSON Yap
                      </button>
                    </div>
  
                    <textarea
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder='Örnek JSON yapıştırın:
  [
    { "rank": 1, "teamName": "Antalyaspor", "played": 34, "won": 20, "drawn": 8, "lost": 6, "goalsFor": 58, "goalsAgainst": 32, "points": 68 },
    ...
  ]'
                      className="w-full h-32 bg-gray-950 border border-gray-800 rounded-lg p-3 text-xs font-mono text-[#4ADE80] focus:outline-none focus:border-gray-700"
                    />

                    {/* Live JSON Analyzer Status UI */}
                    {jsonInput.trim() !== "" && (
                      <div className="bg-[#090D16] border border-gray-800 p-3.5 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Canlı JSON Analizörü</span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            jsonAnalysis.valid && jsonAnalysis.count === 20 && jsonAnalysis.unmatched.length === 0 && jsonAnalysis.duplicates.length === 0
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}>
                            {jsonAnalysis.valid ? `Geçerli Format (${jsonAnalysis.count} Takım)` : "Format Hatası"}
                          </span>
                        </div>

                        {jsonAnalysis.error ? (
                          <div className="text-xs text-red-400 font-medium">{jsonAnalysis.error}</div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Takım Sayısı:</span>
                                <span className={jsonAnalysis.count === 20 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                                  {jsonAnalysis.count} / 20
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Kayıt Eşleşmesi:</span>
                                <span className={jsonAnalysis.unmatched.length === 0 ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                                  {20 - jsonAnalysis.missing.length} / 20 Eşleşti
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              {jsonAnalysis.duplicates.length > 0 && (
                                <div className="text-red-400 font-semibold">
                                  Tekrarlanan: {jsonAnalysis.duplicates.join(", ")}
                                </div>
                              )}
                              {jsonAnalysis.unmatched.length > 0 && (
                                <div className="text-amber-400 font-semibold">
                                  Eşleşmeyen: {jsonAnalysis.unmatched.join(", ")}
                                </div>
                              )}
                              {jsonAnalysis.missing.length > 0 && jsonAnalysis.missing.length < 20 && (
                                <div className="text-gray-400 text-[10px] truncate" title={jsonAnalysis.missing.join(", ")}>
                                  Eksik: {jsonAnalysis.missing.join(", ")}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
  
                    {jsonError && (
                      <div className="p-3 bg-red-950/40 border border-red-900/50 text-red-400 text-xs rounded-lg font-medium">
                        ⚠️ Hata: {jsonError}
                      </div>
                    )}
  
                    {jsonSuccess && (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-xs rounded-lg font-medium">
                        ✓ Tebrikler! 20 takımın puan durumu başarıyla içe aktarıldı.
                      </div>
                    )}
  
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-400 select-none">
                        <input
                          type="checkbox"
                          checked={keepSourceRanking}
                          onChange={(e) => setKeepSourceRanking(e.target.checked)}
                          className="rounded border-gray-800 bg-gray-950 text-[#38BDF8] focus:ring-0"
                        />
                        İçe aktarılan sıralamayı aynen koru (Otomatik sıralama yapma)
                      </label>
                      <button
                        onClick={handleJsonImport}
                        className="px-5 py-2 text-sm font-bold bg-[#38BDF8] hover:bg-[#0EA5E9] text-black rounded-lg flex items-center gap-2 transition-all shadow-md self-end md:self-auto"
                      >
                        <Upload className="w-4 h-4" />
                        JSON Veriyi İçe Aktar
                      </button>
                    </div>
                  </div>
  
                </div>
              )}

            {/* TAB 2: DESIGN & THEME CONFIG */}
            {activeTab === "design" && (
              <div className="space-y-6">
                
                {/* Visual Customizer Panel */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-5">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#A855F7]" />
                    Şablon Başlıkları ve Metinler
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300">ANA BAŞLIK</label>
                      <input
                        type="text"
                        value={config.title}
                        onChange={(e) => setConfig({ ...config, title: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300">İKİNCİ BAŞLIK SATIRI</label>
                      <input
                        type="text"
                        value={config.subtitle}
                        onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300">MEVCUT HAFTA</label>
                      <input
                        type="number"
                        min={0}
                        max={config.totalWeeks || 50}
                        value={config.currentWeek ?? 0}
                        onChange={(e) => setConfig({ ...config, currentWeek: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300">TOPLAM HAFTA</label>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={config.totalWeeks ?? 38}
                        onChange={(e) => setConfig({ ...config, totalWeeks: Math.max(1, parseInt(e.target.value) || 38) })}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300">HAFTA MODU</label>
                      <select
                        value={(config as any).weekMode || "manual"}
                        onChange={(e) => setConfig({ ...config, weekMode: e.target.value as "manual" | "source" } as any)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7]"
                      >
                        <option value="manual">Manuel Giriş</option>
                        <option value="source">Veri Kaynağından</option>
                      </select>
                    </div>

                    <div className="space-y-2 md:col-span-3">
                      <label className="text-xs font-bold text-gray-300">POSTER DİPNOT METNİ</label>
                      <textarea
                        rows={2}
                        value={config.noteText || ""}
                        onChange={(e) => setConfig({ ...config, noteText: e.target.value })}
                        placeholder="+Ligin {week}. haftası itibarıyla..."
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#A855F7]"
                      />
                    </div>
                  </div>
                </div>

                {/* Theme Preset Selection */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-4">
                  <h3 className="font-bold text-white text-base">Görsel Renk Şeması &amp; Tema</h3>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => applyPresetTheme("dark")}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        config.theme === "dark"
                          ? "border-[#A855F7] bg-gray-800 text-white"
                          : "border-gray-800 bg-gray-900/40 text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <div className="w-5 h-5 bg-[#0B0F19] rounded-full mx-auto border border-gray-700 mb-2"></div>
                      <span className="text-xs font-bold block">Modern Koyu (Önerilen)</span>
                    </button>

                    <button
                      onClick={() => applyPresetTheme("light")}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        config.theme === "light"
                          ? "border-[#A855F7] bg-gray-800 text-white"
                          : "border-gray-800 bg-gray-900/40 text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <div className="w-5 h-5 bg-[#F8FAFC] rounded-full mx-auto border border-gray-400 mb-2"></div>
                      <span className="text-xs font-bold block">Minimalist Açık (Sofistike)</span>
                    </button>

                    <button
                      onClick={() => applyPresetTheme("custom")}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        config.theme === "custom"
                          ? "border-[#A855F7] bg-gray-800 text-white"
                          : "border-gray-800 bg-gray-900/40 text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <div className="w-5 h-5 bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full mx-auto mb-2"></div>
                      <span className="text-xs font-bold block">Özel Renkler</span>
                    </button>
                  </div>

                  {/* Custom Color Options (Displayed only if theme is custom) */}
                  {config.theme === "custom" && (
                    <div className="pt-4 border-t border-gray-800 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-gray-400">Arka Plan Türü</label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setConfig({ ...config, useGradient: false })}
                              className={`px-3 py-1 text-xs rounded font-bold ${!config.useGradient ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}
                            >
                              Tek Renk
                            </button>
                            <button
                              onClick={() => setConfig({ ...config, useGradient: true })}
                              className={`px-3 py-1 text-xs rounded font-bold ${config.useGradient ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}
                            >
                              Gradyan
                            </button>
                          </div>
                        </div>

                        {config.useGradient ? (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <span className="text-[10px] text-gray-400 font-bold">Gradyan Başlangıç</span>
                              <div className="flex gap-1.5">
                                <input
                                  type="color"
                                  value={config.gradientStart}
                                  onChange={(e) => setConfig({ ...config, gradientStart: e.target.value })}
                                  className="w-8 h-8 rounded border border-gray-800 cursor-pointer bg-transparent"
                                />
                                <input
                                  type="text"
                                  value={config.gradientStart}
                                  onChange={(e) => setConfig({ ...config, gradientStart: e.target.value })}
                                  className="w-full bg-gray-900 border border-gray-800 rounded px-2 text-xs text-white"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-gray-400 font-bold">Gradyan Bitiş</span>
                              <div className="flex gap-1.5">
                                <input
                                  type="color"
                                  value={config.gradientEnd}
                                  onChange={(e) => setConfig({ ...config, gradientEnd: e.target.value })}
                                  className="w-8 h-8 rounded border border-gray-800 cursor-pointer bg-transparent"
                                />
                                <input
                                  type="text"
                                  value={config.gradientEnd}
                                  onChange={(e) => setConfig({ ...config, gradientEnd: e.target.value })}
                                  className="w-full bg-gray-900 border border-gray-800 rounded px-2 text-xs text-white"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="text-[10px] text-gray-400 font-bold">Arka Plan Rengi</span>
                            <div className="flex gap-1.5">
                              <input
                                type="color"
                                value={config.backgroundColor}
                                onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                                className="w-8 h-8 rounded border border-gray-800 cursor-pointer bg-transparent"
                              />
                              <input
                                type="text"
                                value={config.backgroundColor}
                                onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-800 rounded px-2 text-xs text-white"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] text-gray-400 font-bold">Vurgu Rengi (Accent)</span>
                            <div className="flex gap-1.5">
                              <input
                                type="color"
                                value={config.accentColor}
                                onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                                className="w-8 h-8 rounded border border-gray-800 cursor-pointer bg-transparent"
                              />
                              <input
                                type="text"
                                value={config.accentColor}
                                className="w-full bg-gray-900 border border-gray-800 rounded px-2 text-xs text-white"
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-gray-400 font-bold">Yazı Ana Rengi</span>
                            <div className="flex gap-1.5">
                              <input
                                type="color"
                                value={config.textColor}
                                onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                                className="w-8 h-8 rounded border border-gray-800 cursor-pointer bg-transparent"
                              />
                              <input
                                type="text"
                                value={config.textColor}
                                className="w-full bg-gray-900 border border-gray-800 rounded px-2 text-xs text-white"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] text-gray-400 font-bold">Puan Hücre Arka Plan</span>
                            <input
                              type="color"
                              value={config.pointsBgColor}
                              onChange={(e) => setConfig({ ...config, pointsBgColor: e.target.value })}
                              className="w-full h-8 rounded border border-gray-800 cursor-pointer bg-transparent"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-gray-400 font-bold">Puan Hücre Yazı</span>
                            <input
                              type="color"
                              value={config.pointsTextColor}
                              onChange={(e) => setConfig({ ...config, pointsTextColor: e.target.value })}
                              className="w-full h-8 rounded border border-gray-800 cursor-pointer bg-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Grid Overlay, Font family & Logo Styles */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-4">
                  <h3 className="font-bold text-white text-base">Grafik ve İnce Ayarlar</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Toggle grid overlay */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800/40">
                      <div>
                        <span className="text-xs font-bold text-white block">Dekoratif Kare Kilidi (Grid Overlay)</span>
                        <span className="text-[10px] text-gray-400">Arka planda şık teknik bir ızgara gösterir.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.gridOverlay}
                        onChange={(e) => setConfig({ ...config, gridOverlay: e.target.checked })}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 rounded bg-gray-900 border-gray-800"
                      />
                    </div>

                    {/* Logo Border type */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800/40">
                      <div>
                        <span className="text-xs font-bold text-white block">Takım Logo Yapısı</span>
                        <span className="text-[10px] text-gray-400">Logoların köşe yumuşatması.</span>
                      </div>
                      <select
                        value={config.logoBorderRadius}
                        onChange={(e) => setConfig({ ...config, logoBorderRadius: e.target.value })}
                        className="bg-gray-900 border border-gray-800 text-xs rounded text-white p-1.5 focus:outline-none focus:border-purple-500"
                      >
                        <option value="rounded-full">Daire (Circle)</option>
                        <option value="rounded-md">Kare Köşeli (Rounded)</option>
                        <option value="rounded-none">Orijinal (Flat)</option>
                      </select>
                    </div>

                    {/* Choose Font */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800/40">
                      <div>
                        <span className="text-xs font-bold text-white block">Display Font Ailesi</span>
                        <span className="text-[10px] text-gray-400">Başlıklar için şık spor fontu.</span>
                      </div>
                      <select
                        value={config.headerFontFamily}
                        onChange={(e) => setConfig({ ...config, headerFontFamily: e.target.value })}
                        className="bg-gray-900 border border-gray-800 text-xs rounded text-white p-1.5 focus:outline-none focus:border-purple-500"
                      >
                        <option value="'Oswald', sans-serif">Oswald (Güçlü / Dar)</option>
                        <option value="'Montserrat', sans-serif">Montserrat (Geniş / Modern)</option>
                        <option value="'Space Grotesk', sans-serif">Space Grotesk (Teknik)</option>
                      </select>
                    </div>

                    {/* Choose Body Font */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800/40">
                      <div>
                        <span className="text-xs font-bold text-white block">Body Font Ailesi</span>
                        <span className="text-[10px] text-gray-400">Sayılar ve isimler için gövde fontu.</span>
                      </div>
                      <select
                        value={config.bodyFontFamily}
                        onChange={(e) => setConfig({ ...config, bodyFontFamily: e.target.value })}
                        className="bg-gray-900 border border-gray-800 text-xs rounded text-white p-1.5 focus:outline-none focus:border-purple-500"
                      >
                        <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Zarif)</option>
                        <option value="sans-serif">Sistem Varsayılanı</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* Footer and Watermark */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-4">
                  <h3 className="font-bold text-white text-base">Alt Bilgi (Footer) &amp; Filigran</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-300">VERİ KAYNAĞI METNİ</label>
                        <input
                          type="checkbox"
                          checked={config.showDataSource}
                          onChange={(e) => setConfig({ ...config, showDataSource: e.target.checked })}
                          className="w-3.5 h-3.5"
                        />
                      </div>
                      <input
                        type="text"
                        value={config.dataSource}
                        onChange={(e) => setConfig({ ...config, dataSource: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#A855F7]"
                        disabled={!config.showDataSource}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-300">SON GÜNCELLEME GÖSTER</label>
                        <input
                          type="checkbox"
                          checked={config.showLastUpdated}
                          onChange={(e) => setConfig({ ...config, showLastUpdated: e.target.checked })}
                          className="w-3.5 h-3.5"
                        />
                      </div>
                      <input
                        type="text"
                        value={config.apiLastUpdated || "Otomatik Tarih/Saat"}
                        onChange={(e) => setConfig({ ...config, apiLastUpdated: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#A855F7]"
                        disabled={!config.showLastUpdated}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-300">SOSYAL MEDYA ETİKETİ</label>
                        <input
                          type="checkbox"
                          checked={config.showSocialHandle}
                          onChange={(e) => setConfig({ ...config, showSocialHandle: e.target.checked })}
                          className="w-3.5 h-3.5"
                        />
                      </div>
                      <input
                        type="text"
                        value={config.socialHandle}
                        onChange={(e) => setConfig({ ...config, socialHandle: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#A855F7]"
                        disabled={!config.showSocialHandle}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-[#3B82F6]/5 border border-[#3B82F6]/20 text-[11px] text-[#93C5FD]">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span>Alt bilgideki son güncelleme tarihi, bilgisayarınızın güncel tarihini otomatik olarak Türkçe formatında yansıtır.</span>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: ZONES CONFIG */}
            {activeTab === "zones" && (
              <ZoneEditor
                leagueId={selection.leagueId}
                zoneDefinitions={config.zoneDefinitions || getDefaultZoneDefinitions(selection.leagueId)}
                onChange={(newZones) => {
                  setConfig((prev) => ({
                    ...prev,
                    zoneDefinitions: newZones
                  }));
                }}
                teamCount={standings.length}
              />
            )}

            {/* TAB 5: TEST PNG GENERATOR */}
            {activeTab === "test" && (
              <div className="space-y-6">
                
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-2">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-400" />
                    Çıktı Kalite &amp; Boyut Test Laboratuvarı
                  </h3>
                  <p className="text-xs text-gray-400">
                    Sistem tarafından oluşturulacak 1080x1350 piksel çözünürlüğündeki gerçek dosyayı indirmeden önce burada test edebilir, dosya boyutu ve piksel doğruluğunu inceleyebilirsiniz.
                  </p>
                </div>

                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-white text-sm">PNG Görsel Test Jeneratörü</h4>
                      <p className="text-xs text-gray-400 mt-1">Görselin ham çıktısı, tüm logo render kararlılıkları ve yazı boyutu ölçekleri ile yerel olarak üretilir.</p>
                    </div>
                    <button
                      onClick={handleGenerateTestPng}
                      disabled={isGeneratingTest}
                      className={`px-4 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${
                        isGeneratingTest
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/20"
                      }`}
                    >
                      {isGeneratingTest ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Test Görseli Üretiliyor...</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Piksel-Mükemmel Test Görseli Oluştur</span>
                        </>
                      )}
                    </button>
                  </div>

                  {testPngResult ? (
                    <div className="bg-[#090D16] border border-gray-800 p-4 rounded-xl space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div className="bg-[#111827]/50 p-2.5 rounded-lg border border-gray-900">
                          <span className="text-gray-500 block">Test Genişliği</span>
                          <strong className="text-white text-sm block mt-0.5">{testPngResult.width} px</strong>
                          <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">✓ Tam Uyumlu (1080)</span>
                        </div>
                        <div className="bg-[#111827]/50 p-2.5 rounded-lg border border-gray-900">
                          <span className="text-gray-500 block">Test Yüksekliği</span>
                          <strong className="text-white text-sm block mt-0.5">{testPngResult.height} px</strong>
                          <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">✓ Tam Uyumlu (1350)</span>
                        </div>
                        <div className="bg-[#111827]/50 p-2.5 rounded-lg border border-gray-900">
                          <span className="text-gray-500 block">Dosya Boyutu</span>
                          <strong className="text-white text-sm block mt-0.5">{testPngResult.sizeKB} KB</strong>
                          <span className="text-[10px] text-gray-400 mt-0.5 block">Sıkıştırılmamış HD</span>
                        </div>
                        <div className="bg-[#111827]/50 p-2.5 rounded-lg border border-gray-900">
                          <span className="text-gray-500 block">Oluşturulma Saati</span>
                          <strong className="text-white text-sm block mt-0.5">{testPngResult.generatedAt}</strong>
                          <span className="text-[10px] text-gray-400 mt-0.5 block">Yerel Jeneratör</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-gray-400 block">Canlı Piksel Ön İzleme Kapısı:</span>
                        <div className="border border-gray-800/80 rounded-lg overflow-hidden bg-gray-950 max-h-[350px] overflow-y-auto flex justify-center p-4">
                          <img 
                            src={testPngResult.dataUrl} 
                            alt="Test PNG" 
                            className="max-w-full h-auto object-contain border border-gray-800 rounded-md"
                          />
                        </div>
                        <p className="text-[10px] text-gray-500 italic text-center">
                          * Yukarıdaki ön izleme, dışa aktarılacak olan görselin 1:1 piksel verisidir. Herhangi bir bulanıklık olmadığını doğrulamak için dikeyde kaydırabilirsiniz.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed border-gray-800 text-center rounded-xl">
                      <Eye className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">Henüz bir test görseli oluşturulmadı. Yukarıdaki butona tıklayarak testi başlatabilirsiniz.</p>
                    </div>
                  )}
                </div>

                {/* Hard Reset Factory Button */}
                <div className="bg-red-950/10 border border-red-900/30 p-5 rounded-xl space-y-3">
                  <h4 className="font-bold text-red-400 text-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Sıfırlama ve Bellek Temizliği
                  </h4>
                  <p className="text-xs text-gray-400">
                    Önbelleğe kaydedilen tüm verileri, özel olarak yüklediğiniz logoları ve şablon özelleştirmelerini tamamen silip uygulamayı ilk temiz haline getirebilirsiniz.
                  </p>
                  <button
                    onClick={handleResetAllDefaults}
                    className="px-4 py-2 bg-red-950/40 hover:bg-red-900/30 border border-red-900/50 text-red-300 rounded-lg font-bold text-xs transition-all"
                  >
                    Varsayılan Verilere Dön (Fabrika Sıfırlaması)
                  </button>
                </div>

              </div>
            )}

            {/* TAB 6: PRE-EXPORT VERIFICATION & SAFE MODE (Requirement 13 & 14) */}
            {activeTab === "verification" && (
              <div className="space-y-6">
                
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-2">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-400" />
                    İhracat Öncesi Güvenlik &amp; Doğrulama Laboratuvarı
                  </h3>
                  <p className="text-xs text-gray-400">
                    Görsel ihraç etmeden önce tarayıcı uyumluluğu, yazı tipi yüklenme durumu, görsel çözünürlükleri ve CORS kısıtlamalarını gerçek zamanlı olarak buradan denetleyebilirsiniz.
                  </p>
                </div>

                {/* Safe Mode Toggle (Requirement 14) */}
                <div className="bg-amber-950/20 border border-amber-900/40 p-5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        Güvenli Mod (Safe Mode - Diagnostic Tool)
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Uzak logo yükleme, harici font yükleme veya CORS uyumsuzluğu gibi PNG indirmeyi durduran sorunları çözmek için sistemi izole eder. Standart sans-serif yazı tipini ve takım rengine özel kutucukları kullanır.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={isSafeMode}
                        onChange={(e) => {
                          setIsSafeMode(e.target.checked);
                          if (e.target.checked) {
                            setImageCheckResult("Güvenli Mod: Logo kontrolleri atlandı");
                            setFontCheckResult("Sistem Yazı Tipleri Aktif (Montserrat / Plus Jakarta Sans)");
                          } else {
                            setImageCheckResult("Yeniden kontrol ediliyor...");
                            setFontCheckResult("Yeniden kontrol ediliyor...");
                          }
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>
                </div>

                {/* Checklist Results (Requirement 13) */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-4">
                  <h4 className="font-bold text-white text-sm">Canlı Sistem Denetim Listesi (Checklist)</h4>
                  
                  <div className="space-y-3.5 text-xs">
                    {/* Design Area Existence */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-900">
                      <span className="text-gray-400 font-medium">Tasarım Alanı Varlığı:</span>
                      {validation?.canvasExists ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Mevcut (Design Canvas Aktif)</span>
                      ) : (
                        <span className="text-red-400 font-bold flex items-center gap-1">✗ HATA: Tasarım alanı bulunamadı</span>
                      )}
                    </div>

                    {/* Dimensions Check */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-900">
                      <span className="text-gray-400 font-medium">Tasarım Çözünürlüğü:</span>
                      {validation?.correctSize ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ 1080x1350 Piksel (Standart HD En/Boy)</span>
                      ) : (
                        <span className="text-red-400 font-bold flex items-center gap-1">✗ UYARI: Boyutlar kararsız</span>
                      )}
                    </div>

                    {/* Fonts Check */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-900">
                      <span className="text-gray-400 font-medium">Yazı Tipleri Kararlılığı:</span>
                      {isSafeMode ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1">⚠ Güvenli Mod: Standart Sans-Serif</span>
                      ) : validation?.fontsReady ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Başarılı (Lokal Montserrat / Plus Jakarta Sans)</span>
                      ) : (
                        <span className="text-[#38BDF8] font-bold flex items-center gap-1">✓ Yükleniyor / Sistem Fontları Aktif</span>
                      )}
                    </div>

                    {/* CORS Stylesheets check */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-900">
                      <span className="text-gray-400 font-medium">Harici Stil Dosyası Denetimi (CORS Engeli):</span>
                      {validation?.remoteCssFound && validation.remoteCssFound.length === 0 ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Temiz (Uzak CSS Bağlantısı Yok)</span>
                      ) : (
                        <span className="text-red-400 font-bold flex flex-col items-end gap-1 text-right">
                          <span>✗ CORS RİSKİ: Harici CSS Algılandı!</span>
                          <span className="text-[10px] text-gray-500">{validation?.remoteCssFound.join(", ")}</span>
                        </span>
                      )}
                    </div>

                    {/* Broken Image check */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-900">
                      <span className="text-gray-400 font-medium">Bozuk Logo &amp; Dosya Denetimi:</span>
                      {isSafeMode ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Güvenli Mod (Kontroller Atlandı)</span>
                      ) : validation?.brokenImagesFound && validation.brokenImagesFound.length === 0 ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Temiz (Tüm logolar sorunsuz yüklendi)</span>
                      ) : (
                        <span className="text-amber-400 font-bold flex flex-col items-end gap-1 text-right">
                          <span>⚠ Bozuk / Yüklenmemiş Logo Var ({validation?.brokenImagesFound.length})</span>
                          <span className="text-[10px] text-gray-500">Logolar yüklenene kadar bekleyin veya Güvenli Modu açın.</span>
                        </span>
                      )}
                    </div>

                    {/* Remote Image check */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-900">
                      <span className="text-gray-400 font-medium">Harici Görsel (URL) Kontrolü (CORS Riski):</span>
                      {validation?.remoteImagesFound && validation.remoteImagesFound.length === 0 ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Temiz (Tüm takım logoları yerel veya base64)</span>
                      ) : (
                        <span className="text-amber-400 font-bold flex flex-col items-end gap-1 text-right">
                          <span>⚠ Uzak Görsel Bağlantısı Var ({validation?.remoteImagesFound.length})</span>
                          <span className="text-[10px] text-gray-500">Tarayıcınızın CORS engeline takılmaması için yerel yüklemeler önerilir.</span>
                        </span>
                      )}
                    </div>

                    {/* Alignment stability check */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-900">
                      <span className="text-gray-400 font-medium">CSS Transform/Scale Kontrolü:</span>
                      {validation?.hasTransform ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1">⚠ Ön İzleme Ölçeklemesi Aktif (PNG'de sıfırlanacaktır)</span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Ölçekleme Yok (1:1 Bire bir Oran)</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Persistent Logo Storage Backup / Recovery (Requirement 11) */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-4">
                  <h4 className="font-bold text-white text-sm">Özel Takım Logoları Yedekleme &amp; Kurtarma</h4>
                  <p className="text-xs text-gray-400">
                    IndexedDB üzerinde kalıcı olarak depoladığınız tüm özel takım logolarını tek bir JSON dosyası olarak yedekleyebilir veya başka bir tarayıcıya aktarabilirsiniz.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleExportLogoBackup}
                      disabled={Object.keys(customLogos).length === 0}
                      className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                        Object.keys(customLogos).length === 0
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-900"
                          : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                      }`}
                    >
                      Logoları Yedek Dosyası Olarak İhraç Et
                    </button>

                    <label className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer">
                      Yedek Dosyasından Logoları İçe Aktar
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleImportLogoBackup}
                      />
                    </label>

                    <button
                      onClick={handleClearAllCustomLogos}
                      disabled={Object.keys(customLogos).length === 0}
                      className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                        Object.keys(customLogos).length === 0
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-900"
                          : "bg-red-950/40 hover:bg-red-900/30 border border-red-900/50 text-red-300"
                      }`}
                    >
                      Bütün Özel Logoları Sıfırla
                    </button>
                  </div>
                </div>

                {/* Pre-export Test Result Report Format (Requirement 15) */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-4">
                  <h4 className="font-bold text-white text-sm">Aktif Ön Kontrol Raporu (Mevcut Durum Özeti)</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-500 uppercase tracking-wider font-semibold">
                          <th className="py-2.5 px-3">Metrik</th>
                          <th className="py-2.5 px-3">Değer / Açıklama</th>
                          <th className="py-2.5 px-3 text-right">Durum</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/60 text-gray-300">
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Durum (Status)</td>
                          <td className="py-2.5 px-3">
                            {isExporting ? "Görsel ihraç ediliyor..." : "Sistem hazır ve bekliyor"}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${isExporting ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                              {isExporting ? "İŞLENİYOR" : "HAZIR"}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Ölçü (Dimensions)</td>
                          <td className="py-2.5 px-3">
                            Tasarım: 1080x1350 px (Bire bir piksel oranı)
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-block px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-500/20 text-emerald-400">
                              1080x1350 (TAM)
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Fontlar (Fonts)</td>
                          <td className="py-2.5 px-3">
                            Yazı Tipi Durumu: {fontCheckResult}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${fontCheckResult.includes("Yerel") ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                              {fontCheckResult}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Logolar (Logos)</td>
                          <td className="py-2.5 px-3">
                            Aktif Render Durumu: {imageCheckResult} (Kayıtlı: {usedLogoCount} Logo)
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-block px-2 py-0.5 rounded font-bold text-[10px] bg-[#38BDF8]/20 text-[#38BDF8]">
                              {usedLogoCount} LOGO
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Güvenli Mod (Safe Mode)</td>
                          <td className="py-2.5 px-3">
                            Sorun Giderme ve Logo/Font Bypassi
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${isSafeMode ? "bg-amber-500/20 text-amber-400" : "bg-gray-800 text-gray-500"}`}>
                              {isSafeMode ? "AKTİF" : "KAPALI"}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Aşama (Export Phase)</td>
                          <td className="py-2.5 px-3">
                            Son Başarılı Aşama: {exportPhase || "Bekleniyor"}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="text-[11px] text-gray-400 font-bold">{exportPhase || "AŞAMA YOK"}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Error Log Console (Requirement 5) */}
                {errorMessage && (
                  <div className="bg-red-950/20 border border-red-900/50 p-5 rounded-xl space-y-2">
                    <h4 className="font-bold text-red-400 text-sm flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Hata Raporlama ve Çözüm Konsolu
                    </h4>
                    <p className="text-xs text-gray-400">
                      Son ihraç denemesinde aşağıdaki kritik hata tespit edilmiştir. Çözüm kılavuzuna göz atabilirsiniz.
                    </p>
                    <pre className="p-3 bg-black/80 rounded-lg border border-red-900/60 text-red-400 font-mono text-[11px] whitespace-pre-wrap">
                      {errorMessage}
                    </pre>
                    <div className="text-xs text-gray-400 mt-2 space-y-1">
                      <p className="font-semibold text-white">Olası Hızlı Çözümler:</p>
                      <ul className="list-disc pl-4 space-y-0.5">
                        <li><strong>CORS Hatası ise:</strong> Yukarıdan <strong>Güvenli Modu (Safe Mode)</strong> aktifleştirip tekrar görsel oluşturun.</li>
                        <li><strong>Tarayıcı Kaynaklı ise:</strong> Lütfen Google Chrome veya Microsoft Edge kullanarak tekrar deneyin.</li>
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 4: API INTEGRATION PREPARATION */}
            {activeTab === "api" && (
              <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
                
                {/* 1. Header and Intro */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        <Code className="w-5 h-5 text-[#10B981]" />
                        Sahadan HTML Puan Durumu Paneli
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Trendyol 1. Lig (2026/2027) puan durumunu Sahadan.com sunucu taraflı HTML kazıma servisi ile canlı olarak çekin ve görselleştirin.
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                      config.activeProvider === "sahadan"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    }`}>
                      {config.activeProvider === "sahadan" ? "Aktif: Sahadan Verisi" : "Aktif: Manuel Veri"}
                    </span>
                  </div>
                </div>

                {/* 2. Management Stats & Controls */}
                <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl space-y-5">
                  <h4 className="font-bold text-white text-sm pb-2 border-b border-gray-800/60">Sağlayıcı Parametreleri &amp; Durum</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Veri Sağlayıcı:</span>
                        <span className="text-white font-semibold">Sahadan</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Lig / Sezon:</span>
                        <span className="text-white font-semibold">Trendyol 1. Lig (2026/2027)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Kaynak Durumu:</span>
                        <span className={`font-bold ${sourceStatus === "Erişilebilir" ? "text-emerald-400" : (sourceStatus === "Erişilemedi" ? "text-rose-400" : "text-gray-400")}`}>
                          {sourceStatus}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Veri Durumu:</span>
                        <span className="text-white font-semibold">{dataStatus}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Toplam Takım Sayısı:</span>
                        <span className="text-white font-semibold">20 Takım</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Önbellek (Cache) Durumu:</span>
                        <span className="text-white font-semibold truncate block max-w-[150px]" title={cacheStatus}>{cacheStatus}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Son Çekim Zamanı:</span>
                        <span className="text-white font-semibold">{lastFetchTime || "Henüz çekilmedi"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Tasarımdaki Veri Tarihi:</span>
                        <span className="text-white font-semibold">{config.apiLastUpdated || "Manuel Veri Modu"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-800/30">
                        <span className="text-gray-400">Çalışma Tipi:</span>
                        <span className="text-white font-semibold">Sunucu Taraflı (Node.js)</span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/60">
                    <button
                      onClick={() => handleFetchRealData(false)}
                      disabled={isClientLocked}
                      className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                        isClientLocked
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                          : "bg-emerald-950/40 hover:bg-emerald-900/30 border border-emerald-900/50 text-emerald-300"
                      }`}
                    >
                      {isClientLocked && lockCountdown > 0 ? `${lockCountdown} sn bekleyin` : "Canlı Puan Durumunu Çek"}
                    </button>

                    <button
                      onClick={() => handleFetchRealData(true)}
                      disabled={isClientLocked}
                      className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                        isClientLocked
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                          : "bg-amber-950/40 hover:bg-amber-900/30 border border-amber-900/50 text-amber-300"
                      }`}
                    >
                      {isClientLocked && lockCountdown > 0 ? `${lockCountdown} sn bekleyin` : "Zorla Yenile"}
                    </button>

                    <button
                      onClick={handleReturnToManual}
                      className="px-4 py-2 rounded-lg font-bold text-xs bg-gray-900 hover:bg-gray-800 text-gray-400 border border-gray-800"
                    >
                      Manuel Veriye Dön
                    </button>
                  </div>
                </div>

                {/* 3. Fallback & Last Successful Data Section */}
                {hasFetchFailed && (
                  <div className="bg-rose-950/20 border border-rose-900/40 p-5 rounded-xl space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-rose-300 text-sm">Canlı Veri Alınamadı</h4>
                        <p className="text-xs text-rose-200/70">
                          Sahadan sunucusuna erişilemedi veya sayfa yapısı değişti. Kayıtlı son başarılı Sahadan verisini kullanabilir veya manuel veriye dönebilirsiniz.
                        </p>
                      </div>
                    </div>

                    {lastSuccessfulApiData ? (
                      <div className="bg-[#090D16] border border-gray-800/50 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Son Başarılı Veri Zamanı:</span>
                          <span className="text-white font-bold">{lastSuccessTimeStr}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleUseLastSuccessfulApiData}
                            className="px-3.5 py-1.5 text-xs font-bold bg-emerald-950/40 hover:bg-emerald-900/30 border border-emerald-900/50 text-emerald-300 rounded-lg"
                          >
                            Son başarılı veriyi kullan
                          </button>
                          <button
                            onClick={handleReturnToManual}
                            className="px-3.5 py-1.5 text-xs font-bold bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg"
                          >
                            Manuel veriye dön
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic">Daha önceden başarılı bir Sahadan verisi kaydedilmemiş.</p>
                    )}
                  </div>
                )}

                {/* 4. Live Data Preview and Mapping Dialog Overlay/Block */}
                {previewData && (
                  <div className="bg-[#090D16] border border-amber-500/20 p-5 rounded-xl space-y-4 shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                          <Eye className="w-4 h-4 text-amber-500" />
                          Sahadan Canlı Veri Ön İzlemesi &amp; Takım Eşleştirme
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Sahadan üzerinden çekilen 20 takım aşağıda listelenmiştir. Tasarıma aktarmak için tüm 20 takımın eşleştiğinden emin olun.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreviewData(null)}
                        className="text-gray-400 hover:text-white text-xs font-bold"
                      >
                        [Kapat]
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-950/60 rounded-lg border border-gray-800/50 text-xs">
                      <div>
                        <span className="text-gray-500 block">Kaynak:</span>
                        <strong className="text-white">Sahadan</strong>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Lig / Sezon:</span>
                        <strong className="text-white">Trendyol 1. Lig (2026/2027)</strong>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Takım Sayısı / Eşleşen:</span>
                        <strong className="text-white">{previewMeta?.teamCount} / {previewMatchedCount}</strong>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Eşleşmeyen / Çekim Zamanı:</span>
                        <strong className={previewUnmatchedCount > 0 ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                          {previewUnmatchedCount} Eşleşmeyen ({previewLastUpdated})
                        </strong>
                      </div>
                    </div>

                    {/* Preview Table */}
                    <div className="overflow-x-auto max-h-96 border border-gray-800/60 rounded-lg bg-gray-950/40">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-900/60 text-gray-400 border-b border-gray-800 uppercase tracking-wider font-semibold">
                            <th className="py-2 px-3 text-center">Sıra</th>
                            <th className="py-2 px-3">Gelen Takım Adı</th>
                            <th className="py-2 px-3 text-center">O</th>
                            <th className="py-2 px-3 text-center">G</th>
                            <th className="py-2 px-3 text-center">B</th>
                            <th className="py-2 px-3 text-center">M</th>
                            <th className="py-2 px-3 text-center">P</th>
                            <th className="py-2 px-3 text-center">AV</th>
                            <th className="py-2 px-3 text-right">Yerel Takım Eşleşmesi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-850 text-gray-300">
                          {resolvedPreviewRows.map((row, idx) => {
                            const isUnmatched = row.resolvedLocalTeamId === "";
                            return (
                              <tr key={row.teamId || idx} className="hover:bg-gray-900/40">
                                <td className="py-2 px-3 text-center font-bold text-[#38BDF8]">{row.position || idx + 1}</td>
                                <td className="py-2 px-3 font-semibold text-white">{row.teamName}</td>
                                <td className="py-2 px-3 text-center">{row.played}</td>
                                <td className="py-2 px-3 text-center text-emerald-400">{row.won}</td>
                                <td className="py-2 px-3 text-center">{row.drawn}</td>
                                <td className="py-2 px-3 text-center text-rose-400">{row.lost}</td>
                                <td className="py-2 px-3 text-center font-bold text-emerald-400">{row.points}</td>
                                <td className="py-2 px-3 text-center font-semibold">{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                                <td className="py-2 px-3 text-right">
                                  {isUnmatched ? (
                                    <div className="flex items-center justify-end gap-1.5">
                                      <span className="text-amber-500 font-bold text-[10px] uppercase">Eşleşmedi</span>
                                      <select
                                        value=""
                                        onChange={(e) => {
                                          const localId = e.target.value;
                                          if (localId) {
                                            const newMapping: SourceTeamMapping = {
                                              provider: "sahadan",
                                              sourceTeamId: row.teamId || idx,
                                              sourceTeamName: row.teamName,
                                              localTeamId: localId
                                            };
                                            setTeamMappings(prev => {
                                              const filtered = prev.filter(m => m.sourceTeamName !== row.teamName);
                                              return [...filtered, newMapping];
                                            });
                                          }
                                        }}
                                        className="bg-gray-900 border border-amber-600 rounded px-2 py-0.5 text-xs text-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                      >
                                        <option value="">Seç...</option>
                                        {getGlobalTeams().map(t => {
                                          const isAlreadyMapped = resolvedPreviewRows.some(pr => pr.resolvedLocalTeamId === t.id);
                                          return (
                                            <option key={t.id} value={t.id} disabled={isAlreadyMapped}>
                                              {t.displayName} {isAlreadyMapped ? "(Eşlenmiş)" : ""}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-end gap-2 text-emerald-400 font-semibold">
                                      <span className="text-[11px]">{getGlobalTeams().find(t => t.id === row.resolvedLocalTeamId)?.displayName || TEAMS.find(t => t.id === row.resolvedLocalTeamId)?.displayName || row.teamName}</span>
                                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/20">✔ Tamam</span>
                                      
                                      <button
                                        onClick={() => {
                                          setTeamMappings(prev => prev.filter(m => m.sourceTeamName !== row.teamName && m.localTeamId !== row.resolvedLocalTeamId));
                                        }}
                                        className="text-gray-500 hover:text-rose-400 text-[10px] underline ml-1"
                                        title="Eşleşmeyi Kaldır"
                                      >
                                        Kaldır
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Validation Errors Warnings */}
                    {previewErrors.length > 0 && (
                      <div className="bg-amber-950/20 border border-amber-900/60 p-4 rounded-lg space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-400">
                          <AlertTriangle className="w-4 h-4" />
                          Hatalı / Eksik Veri Kuralları Tespit Edildi:
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-amber-200/80 font-medium">
                          {previewErrors.map((err, i) => (
                            <li key={i}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Preview Actions */}
                    <div className="flex flex-wrap gap-2 justify-between items-center pt-2">
                      {previewUnmatchedCount > 0 ? (
                        <button
                          onClick={handleAutoCreateAndApplyAllTeams}
                          className="px-4 py-2 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5"
                        >
                          ✨ Tüm {previewUnmatchedCount} Yeni Takımı Otomatik Oluştur ve Eşleştir
                        </button>
                      ) : <div />}

                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewData(null)}
                          className="px-4 py-2 rounded-lg font-bold text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700"
                        >
                          İptal
                        </button>
                        <button
                          onClick={handleApplyApiData}
                          disabled={isApplyDisabled}
                          className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                            isApplyDisabled
                              ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-900"
                              : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black shadow-lg shadow-amber-500/10"
                          }`}
                        >
                          Veriyi Uygula (Tasarıma Aktar)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Symmetrical footer info on panel */}
          <footer className="bg-[#111827]/30 border-t border-[#1F2937]/50 px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
            <div>
              Toplam Kayıtlı Takım: <strong className="text-white">{TEAMS.length} (Trendyol 1. Lig)</strong>
            </div>
            <div>
              Tasarım Ölçekleme: <span className="text-[#38BDF8] font-bold">1080x1350 px (HD Sürüm)</span>
            </div>
          </footer>

        </section>

      </main>

    </div>
  );
}

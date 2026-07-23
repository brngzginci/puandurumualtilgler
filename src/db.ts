import { openDB, IDBPDatabase } from "idb";

export interface StoredTeamLogo {
  teamId: string;
  dataUrl: string;
  fileName: string;
  mimeType: string;
  updatedAt: number;
}

const DB_NAME = "standings-designer";
const STORE_NAME = "teamLogos";

export async function initDb(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "teamId" });
      }
    },
  });
}

export async function getTeamLogos(): Promise<Record<string, string>> {
  try {
    const db = await initDb();
    const allLogos: StoredTeamLogo[] = await db.getAll(STORE_NAME);
    const logoMap: Record<string, string> = {};
    for (const logo of allLogos) {
      logoMap[logo.teamId] = logo.dataUrl;
    }
    return logoMap;
  } catch (error) {
    console.error("IndexedDB getTeamLogos error:", error);
    return {};
  }
}

export async function getTeamLogoDetails(): Promise<Record<string, StoredTeamLogo>> {
  try {
    const db = await initDb();
    const allLogos: StoredTeamLogo[] = await db.getAll(STORE_NAME);
    const detailsMap: Record<string, StoredTeamLogo> = {};
    for (const logo of allLogos) {
      detailsMap[logo.teamId] = logo;
    }
    return detailsMap;
  } catch (error) {
    console.error("IndexedDB getTeamLogoDetails error:", error);
    return {};
  }
}

export async function saveTeamLogo(logo: StoredTeamLogo): Promise<void> {
  const db = await initDb();
  await db.put(STORE_NAME, logo);
}

export async function deleteTeamLogo(teamId: string): Promise<void> {
  const db = await initDb();
  await db.delete(STORE_NAME, teamId);
}

export async function clearAllTeamLogos(): Promise<void> {
  const db = await initDb();
  await db.clear(STORE_NAME);
}

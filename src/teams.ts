/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Team {
  id: string;
  officialName: string;
  displayName: string;
  shortName: string;
  aliases: string[];
  colors?: string[];
  defaultLogo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textOnPrimary?: string;
  createdFrom?: "default" | "sahadan" | "manual";
  createdAt?: string;
}

export type TeamResolutionStatus =
  | "matched-existing"
  | "matched-alias"
  | "created-new"
  | "needs-review"
  | "duplicate-conflict";

export const TEAMS: Team[] = [
  {
    id: "adanaspor",
    officialName: "Adanaspor",
    displayName: "Adanaspor",
    shortName: "Adanaspor",
    aliases: ["Adanaspor", "Adanaspor A.Ş.", "Adana"],
    colors: ["#FF7A00", "#FFFFFF", "#FFFFFF"],
    defaultLogo: "/logos/adanaspor.svg",
    primaryColor: "#FF7A00",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "amed",
    officialName: "Amed Sportif Faaliyetler",
    displayName: "Amed SK",
    shortName: "Amed SK",
    aliases: ["Amed Sportif Faaliyetler", "Amed SK", "Amed", "Amedspor", "Amed Sportif"],
    colors: ["#009639", "#E30A17", "#FFFFFF"],
    defaultLogo: "/logos/amed.svg",
    primaryColor: "#009639",
    secondaryColor: "#E30A17",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "ankaragucu",
    officialName: "MKE Ankaragücü",
    displayName: "MKE Ankaragücü",
    shortName: "Ankaragücü",
    aliases: ["MKE Ankaragücü", "Ankaragücü", "Ankaragucu", "MKE Ankaragucu"],
    colors: ["#FFCC00", "#002D62", "#FFFFFF"],
    defaultLogo: "/logos/ankaragucu.svg",
    primaryColor: "#FFCC00",
    secondaryColor: "#002D62",
    textOnPrimary: "#002D62"
  },
  {
    id: "antalyaspor",
    officialName: "Antalyaspor",
    displayName: "Antalyaspor",
    shortName: "Antalyaspor",
    aliases: ["Antalyaspor", "Antalya", "Antalyaspor A.Ş."],
    colors: ["#E30A17", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "bandirmaspor",
    officialName: "Bandırmaspor",
    displayName: "Bandırmaspor",
    shortName: "Bandırmaspor",
    aliases: ["Bandırmaspor", "Teksüt Bandırmaspor", "Bandirmaspor", "Teksut Bandirmaspor"],
    colors: ["#800020", "#FFFFFF", "#FFFFFF"],
    defaultLogo: "/logos/bandirmaspor.svg",
    primaryColor: "#800020",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "batmanpetrol",
    officialName: "Batman Petrolspor",
    displayName: "Batman Petrolspor",
    shortName: "Batman Petrol",
    aliases: ["Batman Petrolspor", "Batman Petrol", "Batman Petrol Spor", "Batmanpetrol"],
    colors: ["#E30A17", "#FFCC00", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#FFCC00",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "bodrum",
    officialName: "Bodrum FK",
    displayName: "Bodrum FK",
    shortName: "Bodrum FK",
    aliases: ["Bodrum FK", "Bodrumspor", "Bodrum"],
    colors: ["#009639", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#009639",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "boluspor",
    officialName: "Boluspor",
    displayName: "Boluspor",
    shortName: "Boluspor",
    aliases: ["Boluspor", "Bolu"],
    colors: ["#009639", "#E30A17", "#FFFFFF"],
    defaultLogo: "/logos/boluspor.svg",
    primaryColor: "#009639",
    secondaryColor: "#E30A17",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "bursaspor",
    officialName: "Bursaspor",
    displayName: "Bursaspor",
    shortName: "Bursaspor",
    aliases: ["Bursaspor", "Bursa"],
    colors: ["#009639", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#009639",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "corum",
    officialName: "Ahlatcı Çorum FK",
    displayName: "Çorum FK",
    shortName: "Çorum FK",
    aliases: ["Ahlatcı Çorum FK", "Çorum FK", "Ahlatci Corum FK", "Corum FK", "Çorum", "Corum", "Çorumspor"],
    colors: ["#E30A17", "#000000", "#FFFFFF"],
    defaultLogo: "/logos/corum.svg",
    primaryColor: "#E30A17",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "erzurumspor",
    officialName: "Erzurumspor FK",
    displayName: "Erzurumspor FK",
    shortName: "Erzurumspor",
    aliases: ["Erzurumspor FK", "Erzurumspor", "Erzurum Spor", "Büyükşehir Belediye Erzurumspor", "BB Erzurumspor"],
    colors: ["#002D62", "#FFFFFF", "#FFFFFF"],
    defaultLogo: "/logos/erzurumspor.svg",
    primaryColor: "#002D62",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "esenlererok",
    officialName: "Esenler Erokspor",
    displayName: "Esenler Erokspor",
    shortName: "Esenler Erok",
    aliases: ["Esenler Erokspor", "Erokspor", "Esenler Erok", "Erok"],
    colors: ["#FFCC00", "#0055A5", "#000000"],
    primaryColor: "#FFCC00",
    secondaryColor: "#0055A5",
    textOnPrimary: "#000000"
  },
  {
    id: "genclerbirligi",
    officialName: "Gençlerbirliği",
    displayName: "Gençlerbirliği",
    shortName: "Gençlerbirliği",
    aliases: ["Gençlerbirliği", "Genclerbirligi", "Gençler", "Gencler"],
    colors: ["#E30A17", "#000000", "#FFFFFF"],
    defaultLogo: "/logos/genclerbirligi.svg",
    primaryColor: "#E30A17",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "igdir",
    officialName: "Iğdır FK",
    displayName: "Iğdır FK",
    shortName: "Iğdır FK",
    aliases: ["Iğdır FK", "Iğdır", "Alagöz Holding Iğdır FK", "Alagöz Holding Iğdır", "Igdir FK", "Igdir"],
    colors: ["#009639", "#FFFFFF", "#FFFFFF"],
    defaultLogo: "/logos/igdir.svg",
    primaryColor: "#009639",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "istanbulspor",
    officialName: "İstanbulspor",
    displayName: "İstanbulspor",
    shortName: "İstanbulspor",
    aliases: ["İstanbulspor", "Istanbulspor", "İstanbul", "Uğur Okulları İstanbulspor"],
    colors: ["#FFCC00", "#000000", "#000000"],
    primaryColor: "#FFCC00",
    secondaryColor: "#000000",
    textOnPrimary: "#000000"
  },
  {
    id: "karagumruk",
    officialName: "Fatih Karagümrük",
    displayName: "Fatih Karagümrük",
    shortName: "Karagümrük",
    aliases: ["Fatih Karagümrük", "Fatih Karagümrük A.Ş.", "Karagümrük", "Karagumruk", "Fatih Karagumruk"],
    colors: ["#E30A17", "#000000", "#FFFFFF"],
    defaultLogo: "/logos/karagumruk.svg",
    primaryColor: "#E30A17",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "kayserispor",
    officialName: "Kayserispor",
    displayName: "Kayserispor",
    shortName: "Kayserispor",
    aliases: ["Kayserispor", "Kayseri"],
    colors: ["#FFCC00", "#E30A17", "#000000"],
    primaryColor: "#FFCC00",
    secondaryColor: "#E30A17",
    textOnPrimary: "#000000"
  },
  {
    id: "keciorengucu",
    officialName: "Ankara Keçiörengücü",
    displayName: "Ankara Keçiörengücü",
    shortName: "Keçiörengücü",
    aliases: ["Ankara Keçiörengücü", "Keçiörengücü", "Keciorengucu", "Ankara Keciorengucu"],
    colors: ["#800080", "#FFFFFF", "#FFFFFF"],
    defaultLogo: "/logos/keciorengucu.svg",
    primaryColor: "#800080",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "kocaelispor",
    officialName: "Kocaelispor",
    displayName: "Kocaelispor",
    shortName: "Kocaelispor",
    aliases: ["Kocaelispor", "Kocaeli", "Kocaelispor Kulübü"],
    colors: ["#009639", "#000000", "#FFFFFF"],
    defaultLogo: "/logos/kocaelispor.svg",
    primaryColor: "#009639",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "manisafk",
    officialName: "Manisa FK",
    displayName: "Manisa FK",
    shortName: "Manisa FK",
    aliases: ["Manisa FK", "Manisa Futbol Kulübü", "Manisa"],
    colors: ["#000000", "#FFFFFF", "#FFFFFF"],
    defaultLogo: "/logos/manisafk.svg",
    primaryColor: "#000000",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "mardin1969",
    officialName: "Mardin 1969 Spor",
    displayName: "Mardin 1969 Spor",
    shortName: "Mardin 1969",
    aliases: ["Mardin 1969 Spor", "Mardin 1969", "Mardinspor", "Mardin Spor"],
    colors: ["#E30A17", "#002D62", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#002D62",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "muglaspor",
    officialName: "Muğlaspor",
    displayName: "Muğlaspor",
    shortName: "Muğlaspor",
    aliases: ["Muğlaspor", "Muglaspor", "Muğla"],
    colors: ["#009639", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#009639",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "pendikspor",
    officialName: "Pendikspor",
    displayName: "Pendikspor",
    shortName: "Pendikspor",
    aliases: ["Pendikspor", "Pendik"],
    colors: ["#E30A17", "#FFFFFF", "#FFFFFF"],
    defaultLogo: "/logos/pendikspor.svg",
    primaryColor: "#E30A17",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "sakaryaspor",
    officialName: "Sakaryaspor",
    displayName: "Sakaryaspor",
    shortName: "Sakaryaspor",
    aliases: ["Sakaryaspor", "Sakarya", "Sakaryaspor A.Ş."],
    colors: ["#009639", "#000000", "#FFFFFF"],
    defaultLogo: "/logos/sakaryaspor.svg",
    primaryColor: "#009639",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "sanliurfaspor",
    officialName: "Şanlıurfaspor",
    displayName: "Şanlıurfaspor",
    shortName: "Şanlıurfaspor",
    aliases: ["Şanlıurfaspor", "Sanliurfaspor", "Şanlıurfa", "Sanliurfa", "Urfaspor", "Urfa", "Central Hospital Ümraniyespor"],
    colors: ["#FFCC00", "#009639", "#FFFFFF"],
    defaultLogo: "/logos/sanliurfaspor.svg",
    primaryColor: "#FFCC00",
    secondaryColor: "#009639",
    textOnPrimary: "#000000"
  },
  {
    id: "sariyer",
    officialName: "Sarıyer",
    displayName: "Sarıyer",
    shortName: "Sarıyer",
    aliases: ["Sarıyer", "Sariyer"],
    colors: ["#002D62", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "sivasspor",
    officialName: "Sivasspor",
    displayName: "Sivasspor",
    shortName: "Sivasspor",
    aliases: ["Sivasspor", "Sivas"],
    colors: ["#E30A17", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "umraniyespor",
    officialName: "Ümraniyespor",
    displayName: "Ümraniyespor",
    shortName: "Ümraniyespor",
    aliases: ["Ümraniyespor", "Umraniyespor", "Ümraniye", "Central Hospital Ümraniyespor"],
    colors: ["#E30A17", "#FFFFFF", "#FFFFFF"],
    defaultLogo: "/logos/umraniyespor.svg",
    primaryColor: "#E30A17",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "vanspor",
    officialName: "Vanspor",
    displayName: "Vanspor",
    shortName: "Vanspor",
    aliases: ["Vanspor", "Vanspor FK", "Van"],
    colors: ["#E30A17", "#000000", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "yenimalatyaspor",
    officialName: "Yeni Malatyaspor",
    displayName: "Yeni Malatyaspor",
    shortName: "Yeni Malatya",
    aliases: ["Yeni Malatyaspor", "Malatyaspor", "Yeni Malatya"],
    colors: ["#FFCC00", "#000000", "#FFFFFF"],
    defaultLogo: "/logos/yenimalatyaspor.svg",
    primaryColor: "#FFCC00",
    secondaryColor: "#000000",
    textOnPrimary: "#000000"
  }
];

/**
 * Normalizes a Turkish team name by stripping sponsor prefixes, suffixes (A.Ş., SK, FK, etc.)
 * and converting to lowercase for better matching.
 */
export function normalizeTeamName(name: string): string {
  if (!name) return "";
  let clean = name.trim();

  // Convert to Turkish lowercase
  clean = clean
    .replace(/I/g, "ı")
    .replace(/İ/g, "i")
    .toLowerCase();

  // Remove common sponsors (specific to 1. Lig)
  const sponsors = [
    "teksüt", "teksut",
    "ahlatcı", "ahlatci",
    "alagöz holding", "alagoz holding",
    "alagöz", "alagoz",
    "central hospital",
    "uğur okulları", "ugur okullari",
    "bellona", "corendon", "atakaş", "atakas", "ramsay", "mondihome", "bitexen", "yukatel", "tümosan", "tumosan"
  ];

  for (const sponsor of sponsors) {
    if (clean.startsWith(sponsor + " ")) {
      clean = clean.substring(sponsor.length + 1).trim();
    }
  }

  // Remove common suffixes
  const suffixes = [
    "spor kulübü", "spor kulubu",
    "futbol kulübü", "futbol kulubu",
    "derneği", "dernegi",
    "faaliyetleri",
    "sportif",
    "futbol",
    "büyükşehir belediye", "buyuksehir belediye",
    "belediyesi", "belediye",
    "a.ş.", "a.s.", "as", "aş",
    "s.k.", "sk",
    "f.k.", "fk",
    "spor", "sporu"
  ];

  // Run a few passes to strip nested suffixes like "FK A.Ş." or "Spor Kulübü Derneği"
  for (let i = 0; i < 3; i++) {
    clean = clean.trim();
    for (const suffix of suffixes) {
      if (clean.endsWith(" " + suffix)) {
        clean = clean.substring(0, clean.length - (suffix.length + 1)).trim();
      } else if (clean === suffix) {
        clean = "";
      }
    }
  }

  return clean.trim();
}

/**
 * Converts a Turkish string to a safe unique team ID slug.
 */
export function slugifyTeamName(name: string): string {
  if (!name) return "team-" + Date.now();
  const trMap: Record<string, string> = {
    ç: "c", Ç: "c",
    ğ: "g", Ğ: "g",
    ı: "i", İ: "i",
    ö: "o", Ö: "o",
    ş: "s", Ş: "s",
    ü: "u", Ü: "u"
  };

  let str = name.trim();
  for (const key of Object.keys(trMap)) {
    str = str.replace(new RegExp(key, "g"), trMap[key]);
  }

  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "team-" + Date.now();
}

/**
 * Gets all global teams (built-in 1. Lig TEAMS + saved custom teams in localStorage).
 */
export function getGlobalTeams(): Team[] {
  let customTeams: Team[] = [];
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const saved = localStorage.getItem("global_teams");
      if (saved) {
        customTeams = JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading global_teams from localStorage:", e);
    }
  }

  // Combine built-in TEAMS with custom teams (custom teams can override or supplement)
  const map = new Map<string, Team>();
  for (const t of TEAMS) {
    map.set(t.id, t);
  }
  for (const ct of customTeams) {
    map.set(ct.id, ct);
  }

  return Array.from(map.values());
}

/**
 * Saves a team into the global_teams list in localStorage.
 */
export function saveGlobalTeam(team: Team): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return;
  try {
    const saved = localStorage.getItem("global_teams");
    let customTeams: Team[] = saved ? JSON.parse(saved) : [];
    const index = customTeams.findIndex((t) => t.id === team.id);
    if (index >= 0) {
      customTeams[index] = team;
    } else {
      customTeams.push(team);
    }
    localStorage.setItem("global_teams", JSON.stringify(customTeams));
  } catch (e) {
    console.error("Error saving global_team:", e);
  }
}

/**
 * Saves multiple teams into global_teams in localStorage in one operation.
 */
export function saveGlobalTeamsBatch(teams: Team[]): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return;
  try {
    const saved = localStorage.getItem("global_teams");
    let customTeams: Team[] = saved ? JSON.parse(saved) : [];
    for (const team of teams) {
      const index = customTeams.findIndex((t) => t.id === team.id);
      if (index >= 0) {
        customTeams[index] = team;
      } else {
        customTeams.push(team);
      }
    }
    localStorage.setItem("global_teams", JSON.stringify(customTeams));
  } catch (e) {
    console.error("Error saving global_teams batch:", e);
  }
}

/**
 * Automatically drafts a new local Team object from a source team name.
 */
export function autoCreateTeamFromSource(sourceName: string): Team {
  const clean = sourceName.trim();
  const teamId = slugifyTeamName(clean);

  return {
    id: teamId,
    officialName: clean,
    displayName: clean,
    shortName: clean,
    aliases: [clean, clean.toUpperCase(), normalizeTeamName(clean)],
    createdFrom: "sahadan",
    createdAt: new Date().toISOString()
  };
}

/**
 * Tries to match a team name (raw string) with all teams in the global registry.
 * Returns the matched Team object, or null if no match found.
 */
export function findTeamByInputName(input: string, customList?: Team[]): Team | null {
  if (!input) return null;
  const normalizedInput = normalizeTeamName(input);
  if (!normalizedInput) return null;

  const allTeams = customList || getGlobalTeams();

  // 1. Direct match on ID
  let match = allTeams.find((t) => t.id === normalizedInput || t.id === slugifyTeamName(input));
  if (match) return match;

  // 2. Exact match on normalized shortName, displayName, officialName
  match = allTeams.find(
    (t) =>
      normalizeTeamName(t.shortName) === normalizedInput ||
      normalizeTeamName(t.displayName) === normalizedInput ||
      normalizeTeamName(t.officialName) === normalizedInput
  );
  if (match) return match;

  // 3. Match in aliases
  match = allTeams.find((t) =>
    (t.aliases || []).some((alias) => normalizeTeamName(alias) === normalizedInput)
  );
  if (match) return match;

  // 4. Safe partial match
  match = allTeams.find((t) => {
    const normShort = normalizeTeamName(t.shortName);
    const normDisplay = normalizeTeamName(t.displayName);
    const normOfficial = normalizeTeamName(t.officialName);
    return (
      (normShort && (normShort.includes(normalizedInput) || normalizedInput.includes(normShort))) ||
      (normDisplay && (normDisplay.includes(normalizedInput) || normalizedInput.includes(normDisplay))) ||
      (normOfficial && (normOfficial.includes(normalizedInput) || normalizedInput.includes(normOfficial)))
    );
  });

  return match || null;
}

export interface TeamResolutionResult {
  sourceName: string;
  rank: number;
  matchedTeam: Team;
  status: TeamResolutionStatus;
  isNew: boolean;
  notes?: string;
}

/**
 * Resolves a source team name against saved mappings and global teams.
 * If not matched, auto-drafts a new team with "created-new" status.
 */
export function resolveSourceTeam(
  sourceName: string,
  rank: number,
  savedMappings: Record<string, string> = {}
): TeamResolutionResult {
  const cleanName = sourceName.trim();

  // 1. Check saved manual mapping
  if (savedMappings[cleanName]) {
    const mappedTeamId = savedMappings[cleanName];
    const globalTeams = getGlobalTeams();
    const mappedTeam = globalTeams.find((t) => t.id === mappedTeamId);
    if (mappedTeam) {
      return {
        sourceName: cleanName,
        rank,
        matchedTeam: mappedTeam,
        status: "matched-existing",
        isNew: false
      };
    }
  }

  // 2. Search global registry
  const matched = findTeamByInputName(cleanName);
  if (matched) {
    const isAlias =
      normalizeTeamName(matched.shortName) !== normalizeTeamName(cleanName) &&
      normalizeTeamName(matched.officialName) !== normalizeTeamName(cleanName);

    return {
      sourceName: cleanName,
      rank,
      matchedTeam: matched,
      status: isAlias ? "matched-alias" : "matched-existing",
      isNew: false
    };
  }

  // 3. Auto-draft new team
  const newTeam = autoCreateTeamFromSource(cleanName);
  return {
    sourceName: cleanName,
    rank,
    matchedTeam: newTeam,
    status: "created-new",
    isNew: true,
    notes: "Yeni yerel takım oluşturulacak"
  };
}

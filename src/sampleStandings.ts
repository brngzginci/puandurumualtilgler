/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StandingRow {
  rank: number;
  teamId: string; // matches id in Team
  teamName: string; // raw input name
  played: number; // O
  won: number; // G
  drawn: number; // B
  lost: number; // M
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number; // AV
  points: number; // P
}

export const SAMPLE_STANDINGS: StandingRow[] = [
  { rank: 1, teamId: "kocaelispor", teamName: "Kocaelispor", played: 24, won: 15, drawn: 5, lost: 4, goalsFor: 42, goalsAgainst: 20, goalDifference: 22, points: 50 },
  { rank: 2, teamId: "karagumruk", teamName: "Fatih Karagümrük", played: 24, won: 14, drawn: 6, lost: 4, goalsFor: 38, goalsAgainst: 18, goalDifference: 20, points: 48 },
  { rank: 3, teamId: "bandirmaspor", teamName: "Bandırmaspor", played: 24, won: 13, drawn: 6, lost: 5, goalsFor: 36, goalsAgainst: 22, goalDifference: 14, points: 45 },
  { rank: 4, teamId: "erzurumspor", teamName: "Erzurumspor FK", played: 24, won: 12, drawn: 8, lost: 4, goalsFor: 34, goalsAgainst: 19, goalDifference: 15, points: 44 },
  { rank: 5, teamId: "genclerbirligi", teamName: "Gençlerbirliği", played: 24, won: 12, drawn: 5, lost: 7, goalsFor: 32, goalsAgainst: 24, goalDifference: 8, points: 41 },
  { rank: 6, teamId: "igdir", teamName: "Iğdır FK", played: 24, won: 11, drawn: 6, lost: 7, goalsFor: 35, goalsAgainst: 25, goalDifference: 10, points: 39 },
  { rank: 7, teamId: "boluspor", teamName: "Boluspor", played: 24, won: 10, drawn: 8, lost: 6, goalsFor: 30, goalsAgainst: 23, goalDifference: 7, points: 38 },
  { rank: 8, teamId: "corum", teamName: "Ahlatcı Çorum FK", played: 24, won: 10, drawn: 7, lost: 7, goalsFor: 31, goalsAgainst: 26, goalDifference: 5, points: 37 },
  { rank: 9, teamId: "ankaragucu", teamName: "MKE Ankaragücü", played: 24, won: 10, drawn: 6, lost: 8, goalsFor: 29, goalsAgainst: 25, goalDifference: 4, points: 36 },
  { rank: 10, teamId: "amed", teamName: "Amed SK", played: 24, won: 9, drawn: 9, lost: 6, goalsFor: 28, goalsAgainst: 24, goalDifference: 4, points: 36 },
  { rank: 11, teamId: "esenlererok", teamName: "Esenler Erokspor", played: 24, won: 9, drawn: 6, lost: 9, goalsFor: 33, goalsAgainst: 30, goalDifference: 3, points: 33 },
  { rank: 12, teamId: "keciorengucu", teamName: "Ankara Keçiörengücü", played: 24, won: 8, drawn: 8, lost: 8, goalsFor: 27, goalsAgainst: 27, goalDifference: 0, points: 32 },
  { rank: 13, teamId: "manisafk", teamName: "Manisa FK", played: 24, won: 8, drawn: 6, lost: 10, goalsFor: 26, goalsAgainst: 31, goalDifference: -5, points: 30 },
  { rank: 14, teamId: "pendikspor", teamName: "Pendikspor", played: 24, won: 7, drawn: 8, lost: 9, goalsFor: 25, goalsAgainst: 30, goalDifference: -5, points: 29 },
  { rank: 15, teamId: "umraniyespor", teamName: "Ümraniyespor", played: 24, won: 7, drawn: 7, lost: 10, goalsFor: 24, goalsAgainst: 32, goalDifference: -8, points: 28 },
  { rank: 16, teamId: "sakaryaspor", teamName: "Sakaryaspor", played: 24, won: 6, drawn: 8, lost: 10, goalsFor: 23, goalsAgainst: 34, goalDifference: -11, points: 26 },
  { rank: 17, teamId: "istanbulspor", teamName: "İstanbulspor", played: 24, won: 6, drawn: 6, lost: 12, goalsFor: 22, goalsAgainst: 35, goalDifference: -13, points: 24 },
  { rank: 18, teamId: "sanliurfaspor", teamName: "Şanlıurfaspor", played: 24, won: 5, drawn: 6, lost: 13, goalsFor: 20, goalsAgainst: 38, goalDifference: -18, points: 21 },
  { rank: 19, teamId: "adanaspor", teamName: "Adanaspor", played: 24, won: 4, drawn: 7, lost: 13, goalsFor: 18, goalsAgainst: 40, goalDifference: -22, points: 19 },
  { rank: 20, teamId: "yenimalatyaspor", teamName: "Yeni Malatyaspor", played: 24, won: 0, drawn: 3, lost: 21, goalsFor: 10, goalsAgainst: 58, goalDifference: -48, points: 3 }
];

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
  { rank: 1, teamId: "antalyaspor", teamName: "Antalyaspor", played: 38, won: 24, drawn: 8, lost: 6, goalsFor: 65, goalsAgainst: 32, goalDifference: 33, points: 80 },
  { rank: 2, teamId: "bandirmaspor", teamName: "Bandırmaspor", played: 38, won: 22, drawn: 9, lost: 7, goalsFor: 60, goalsAgainst: 35, goalDifference: 25, points: 75 },
  { rank: 3, teamId: "batmanpetrol", teamName: "Batman Petrolspor", played: 38, won: 20, drawn: 10, lost: 8, goalsFor: 58, goalsAgainst: 38, goalDifference: 20, points: 70 },
  { rank: 4, teamId: "bodrum", teamName: "Bodrum FK", played: 38, won: 19, drawn: 9, lost: 10, goalsFor: 55, goalsAgainst: 39, goalDifference: 16, points: 66 },
  { rank: 5, teamId: "boluspor", teamName: "Boluspor", played: 38, won: 18, drawn: 10, lost: 10, goalsFor: 52, goalsAgainst: 40, goalDifference: 12, points: 64 },
  { rank: 6, teamId: "bursaspor", teamName: "Bursaspor", played: 38, won: 17, drawn: 11, lost: 10, goalsFor: 50, goalsAgainst: 42, goalDifference: 8, points: 62 },
  { rank: 7, teamId: "esenlererok", teamName: "Esenler Erokspor", played: 38, won: 16, drawn: 11, lost: 11, goalsFor: 48, goalsAgainst: 43, goalDifference: 5, points: 59 },
  { rank: 8, teamId: "karagumruk", teamName: "Fatih Karagümrük", played: 38, won: 15, drawn: 12, lost: 11, goalsFor: 46, goalsAgainst: 44, goalDifference: 2, points: 57 },
  { rank: 9, teamId: "igdir", teamName: "Iğdır FK", played: 38, won: 14, drawn: 13, lost: 11, goalsFor: 44, goalsAgainst: 42, goalDifference: 2, points: 55 },
  { rank: 10, teamId: "istanbulspor", teamName: "İstanbulspor", played: 38, won: 13, drawn: 14, lost: 11, goalsFor: 42, goalsAgainst: 41, goalDifference: 1, points: 53 },
  { rank: 11, teamId: "keciorengucu", teamName: "Ankara Keçiörengücü", played: 38, won: 12, drawn: 13, lost: 13, goalsFor: 40, goalsAgainst: 42, goalDifference: -2, points: 49 },
  { rank: 12, teamId: "kayserispor", teamName: "Kayserispor", played: 38, won: 11, drawn: 14, lost: 13, goalsFor: 38, goalsAgainst: 44, goalDifference: -6, points: 47 },
  { rank: 13, teamId: "manisafk", teamName: "Manisa FK", played: 38, won: 10, drawn: 15, lost: 13, goalsFor: 36, goalsAgainst: 43, goalDifference: -7, points: 45 },
  { rank: 14, teamId: "mardin1969", teamName: "Mardin 1969 Spor", played: 38, won: 9, drawn: 16, lost: 13, goalsFor: 34, goalsAgainst: 42, goalDifference: -8, points: 43 },
  { rank: 15, teamId: "muglaspor", teamName: "Muğlaspor", played: 38, won: 9, drawn: 14, lost: 15, goalsFor: 35, goalsAgainst: 46, goalDifference: -11, points: 41 },
  { rank: 16, teamId: "pendikspor", teamName: "Pendikspor", played: 38, won: 8, drawn: 15, lost: 15, goalsFor: 33, goalsAgainst: 45, goalDifference: -12, points: 39 },
  { rank: 17, teamId: "sariyer", teamName: "Sarıyer", played: 38, won: 7, drawn: 14, lost: 17, goalsFor: 30, goalsAgainst: 48, goalDifference: -18, points: 35 },
  { rank: 18, teamId: "sivasspor", teamName: "Sivasspor", played: 38, won: 6, drawn: 15, lost: 17, goalsFor: 28, goalsAgainst: 50, goalDifference: -22, points: 33 },
  { rank: 19, teamId: "umraniyespor", teamName: "Ümraniyespor", played: 38, won: 5, drawn: 14, lost: 19, goalsFor: 26, goalsAgainst: 52, goalDifference: -26, points: 29 },
  { rank: 20, teamId: "vanspor", teamName: "Vanspor", played: 38, won: 4, drawn: 12, lost: 22, goalsFor: 22, goalsAgainst: 64, goalDifference: -42, points: 24 }
];

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

export const SAMPLE_2LIG_BEYAZ: StandingRow[] = [
  { rank: 1, teamId: "aksaray-bld-68", teamName: "68 Aksaray Bld", played: 22, won: 15, drawn: 5, lost: 2, goalsFor: 44, goalsAgainst: 16, goalDifference: 28, points: 50 },
  { rank: 2, teamId: "aliaga-fk", teamName: "Aliağa FK", played: 22, won: 14, drawn: 5, lost: 3, goalsFor: 40, goalsAgainst: 17, goalDifference: 23, points: 47 },
  { rank: 3, teamId: "ankaraspor", teamName: "Ankaraspor", played: 22, won: 13, drawn: 6, lost: 3, goalsFor: 37, goalsAgainst: 18, goalDifference: 19, points: 45 },
  { rank: 4, teamId: "arnavutkoy-bld", teamName: "Arnavutköy Bld", played: 22, won: 12, drawn: 6, lost: 4, goalsFor: 35, goalsAgainst: 20, goalDifference: 15, points: 42 },
  { rank: 5, teamId: "corluspor-1947", teamName: "Çorluspor 1947", played: 22, won: 11, drawn: 7, lost: 4, goalsFor: 34, goalsAgainst: 22, goalDifference: 12, points: 40 },
  { rank: 6, teamId: "erbaaspor", teamName: "Erbaaspor", played: 22, won: 11, drawn: 5, lost: 6, goalsFor: 33, goalsAgainst: 24, goalDifference: 9, points: 38 },
  { rank: 7, teamId: "kastamonuspor", teamName: "Kastamonuspor", played: 22, won: 10, drawn: 6, lost: 6, goalsFor: 31, goalsAgainst: 23, goalDifference: 8, points: 36 },
  { rank: 8, teamId: "gebzespor", teamName: "Gebzespor", played: 22, won: 9, drawn: 7, lost: 6, goalsFor: 29, goalsAgainst: 25, goalDifference: 4, points: 34 },
  { rank: 9, teamId: "isparta-32-spor", teamName: "Isparta 32 Spor", played: 22, won: 8, drawn: 8, lost: 6, goalsFor: 28, goalsAgainst: 26, goalDifference: 2, points: 32 },
  { rank: 10, teamId: "inegol-kafkas", teamName: "İnegöl Kafkasspor", played: 22, won: 8, drawn: 6, lost: 8, goalsFor: 27, goalsAgainst: 28, goalDifference: -1, points: 30 },
  { rank: 11, teamId: "sanliurfaspor", teamName: "Şanlıurfaspor", played: 22, won: 7, drawn: 7, lost: 8, goalsFor: 25, goalsAgainst: 28, goalDifference: -3, points: 28 },
  { rank: 12, teamId: "menemen-fk", teamName: "Menemen FK", played: 22, won: 6, drawn: 8, lost: 8, goalsFor: 24, goalsAgainst: 29, goalDifference: -5, points: 26 },
  { rank: 13, teamId: "mus-spor", teamName: "Muşspor", played: 22, won: 6, drawn: 6, lost: 10, goalsFor: 22, goalsAgainst: 32, goalDifference: -10, points: 24 },
  { rank: 14, teamId: "sebat-spor", teamName: "Sebatspor", played: 22, won: 5, drawn: 7, lost: 10, goalsFor: 20, goalsAgainst: 33, goalDifference: -13, points: 22 },
  { rank: 15, teamId: "elazigspor", teamName: "Elazığspor", played: 22, won: 4, drawn: 6, lost: 12, goalsFor: 18, goalsAgainst: 36, goalDifference: -18, points: 18 },
  { rank: 16, teamId: "somaspor", teamName: "Somaspor", played: 22, won: 4, drawn: 4, lost: 14, goalsFor: 16, goalsAgainst: 39, goalDifference: -23, points: 16 },
  { rank: 17, teamId: "hatayspor", teamName: "Hatayspor", played: 22, won: 3, drawn: 5, lost: 14, goalsFor: 15, goalsAgainst: 42, goalDifference: -27, points: 14 },
  { rank: 18, teamId: "adanademirspor", teamName: "Adana Demirspor", played: 22, won: 2, drawn: 4, lost: 16, goalsFor: 12, goalsAgainst: 48, goalDifference: -36, points: 10 }
];

export const SAMPLE_2LIG_KIRMIZI: StandingRow[] = [
  { rank: 1, teamId: "bingolspor12", teamName: "12 Bingölspor", played: 22, won: 15, drawn: 5, lost: 2, goalsFor: 45, goalsAgainst: 15, goalDifference: 30, points: 50 },
  { rank: 2, teamId: "trabzon1461", teamName: "1461 Trabzon FK", played: 22, won: 14, drawn: 5, lost: 3, goalsFor: 41, goalsAgainst: 18, goalDifference: 23, points: 47 },
  { rank: 3, teamId: "orduspor52", teamName: "52 Orduspor FK", played: 22, won: 13, drawn: 6, lost: 3, goalsFor: 38, goalsAgainst: 19, goalDifference: 19, points: 45 },
  { rank: 4, teamId: "adana01fk", teamName: "Adana 01 FK", played: 22, won: 12, drawn: 6, lost: 4, goalsFor: 36, goalsAgainst: 21, goalDifference: 15, points: 42 },
  { rank: 5, teamId: "erzincanspor", teamName: "Erzincanspor", played: 22, won: 11, drawn: 7, lost: 4, goalsFor: 34, goalsAgainst: 22, goalDifference: 12, points: 40 },
  { rank: 6, teamId: "ankarademir", teamName: "Ankara Demirspor", played: 22, won: 11, drawn: 5, lost: 6, goalsFor: 32, goalsAgainst: 24, goalDifference: 8, points: 38 },
  { rank: 7, teamId: "beyogluyencarsi", teamName: "Beyoğlu Yeni Çarşı", played: 22, won: 10, drawn: 6, lost: 6, goalsFor: 30, goalsAgainst: 23, goalDifference: 7, points: 36 },
  { rank: 8, teamId: "fethiyespor", teamName: "Fethiyespor", played: 22, won: 9, drawn: 7, lost: 6, goalsFor: 28, goalsAgainst: 25, goalDifference: 3, points: 34 },
  { rank: 9, teamId: "iskenderunspor", teamName: "İskenderunspor", played: 22, won: 8, drawn: 7, lost: 7, goalsFor: 27, goalsAgainst: 26, goalDifference: 1, points: 31 },
  { rank: 10, teamId: "kmarasisktiklal", teamName: "Kahramanmaraş İstiklalspor", played: 22, won: 8, drawn: 5, lost: 9, goalsFor: 26, goalsAgainst: 28, goalDifference: -2, points: 29 },
  { rank: 11, teamId: "karacabeybld", teamName: "Karacabey Belediyespor", played: 22, won: 7, drawn: 6, lost: 9, goalsFor: 25, goalsAgainst: 29, goalDifference: -4, points: 27 },
  { rank: 12, teamId: "kirklarelispor", teamName: "Kırklarelispor", played: 22, won: 6, drawn: 7, lost: 9, goalsFor: 23, goalsAgainst: 30, goalDifference: -7, points: 25 },
  { rank: 13, teamId: "kutahyaspor", teamName: "Kütahyaspor", played: 22, won: 5, drawn: 7, lost: 10, goalsFor: 21, goalsAgainst: 32, goalDifference: -11, points: 22 },
  { rank: 14, teamId: "ankaragucu", teamName: "Ankaragücü", played: 22, won: 4, drawn: 7, lost: 11, goalsFor: 19, goalsAgainst: 34, goalDifference: -15, points: 19 },
  { rank: 15, teamId: "sakaryaspor", teamName: "Sakaryaspor", played: 22, won: 3, drawn: 7, lost: 12, goalsFor: 17, goalsAgainst: 37, goalDifference: -20, points: 16 },
  { rank: 16, teamId: "serikspor", teamName: "Serikspor", played: 22, won: 3, drawn: 5, lost: 14, goalsFor: 15, goalsAgainst: 41, goalDifference: -26, points: 14 },
  { rank: 17, teamId: "inegolspor", teamName: "İnegölspor", played: 22, won: 2, drawn: 4, lost: 16, goalsFor: 13, goalsAgainst: 47, goalDifference: -34, points: 10 }
];

export const SAMPLE_3LIG_1: StandingRow[] = [
  { rank: 1, teamId: "amasyaspor-fk", teamName: "Amasyaspor", played: 20, won: 15, drawn: 4, lost: 1, goalsFor: 42, goalsAgainst: 12, goalDifference: 30, points: 49 },
  { rank: 2, teamId: "beykoz-as", teamName: "Beykoz Anadoluspor", played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 37, goalsAgainst: 16, goalDifference: 21, points: 43 },
  { rank: 3, teamId: "beykoz-ishaklispor", teamName: "Beykoz İshaklıspor", played: 20, won: 12, drawn: 5, lost: 3, goalsFor: 33, goalsAgainst: 17, goalDifference: 16, points: 41 },
  { rank: 4, teamId: "bulvarspor", teamName: "Bulvarspor", played: 20, won: 11, drawn: 5, lost: 4, goalsFor: 31, goalsAgainst: 18, goalDifference: 13, points: 38 },
  { rank: 5, teamId: "duzcespor", teamName: "Düzcespor", played: 20, won: 10, drawn: 6, lost: 4, goalsFor: 29, goalsAgainst: 19, goalDifference: 10, points: 36 },
  { rank: 6, teamId: "fatsa-bld", teamName: "Fatsa Bld", played: 20, won: 9, drawn: 6, lost: 5, goalsFor: 28, goalsAgainst: 22, goalDifference: 6, points: 33 },
  { rank: 7, teamId: "galata", teamName: "Galataspor", played: 20, won: 9, drawn: 4, lost: 7, goalsFor: 27, goalsAgainst: 24, goalDifference: 3, points: 31 },
  { rank: 8, teamId: "golcukspor", teamName: "Gölcükspor", played: 20, won: 8, drawn: 5, lost: 7, goalsFor: 26, goalsAgainst: 25, goalDifference: 1, points: 29 },
  { rank: 9, teamId: "inkilap-fsk", teamName: "İnkılap FK", played: 20, won: 7, drawn: 6, lost: 7, goalsFor: 24, goalsAgainst: 25, goalDifference: -1, points: 27 },
  { rank: 10, teamId: "karabuk-iy", teamName: "Karabük İdmanyurdu", played: 20, won: 6, drawn: 7, lost: 7, goalsFor: 23, goalsAgainst: 26, goalDifference: -3, points: 25 },
  { rank: 11, teamId: "kdz-eregli-bld", teamName: "Kdz.Ereğli", played: 20, won: 6, drawn: 5, lost: 9, goalsFor: 21, goalsAgainst: 27, goalDifference: -6, points: 23 },
  { rank: 12, teamId: "kc-sinopspor", teamName: "Küçükçekmece Sinopspor", played: 20, won: 5, drawn: 7, lost: 8, goalsFor: 20, goalsAgainst: 28, goalDifference: -8, points: 22 },
  { rank: 13, teamId: "orduspor-1967", teamName: "Orduspor 1967", played: 20, won: 5, drawn: 5, lost: 10, goalsFor: 18, goalsAgainst: 30, goalDifference: -12, points: 20 },
  { rank: 14, teamId: "pazarspor", teamName: "Pazarspor", played: 20, won: 4, drawn: 6, lost: 10, goalsFor: 17, goalsAgainst: 31, goalDifference: -14, points: 18 },
  { rank: 15, teamId: "silivrispor", teamName: "Silivrispor", played: 20, won: 4, drawn: 5, lost: 11, goalsFor: 16, goalsAgainst: 32, goalDifference: -16, points: 17 },
  { rank: 16, teamId: "tokat-bld", teamName: "Tokat Bld", played: 20, won: 3, drawn: 6, lost: 11, goalsFor: 15, goalsAgainst: 34, goalDifference: -19, points: 15 },
  { rank: 17, teamId: "yalova-fk", teamName: "Yalova FK", played: 20, won: 2, drawn: 5, lost: 13, goalsFor: 13, goalsAgainst: 38, goalDifference: -25, points: 11 },
  { rank: 18, teamId: "zonguldakspor-fk", teamName: "Zonguldakspor", played: 20, won: 2, drawn: 3, lost: 15, goalsFor: 11, goalsAgainst: 42, goalDifference: -31, points: 9 }
];

export const SAMPLE_3LIG_2: StandingRow[] = [
  { rank: 1, teamId: "bursa-yildirim", teamName: "Bursa Yıldırımspor", played: 20, won: 14, drawn: 5, lost: 1, goalsFor: 41, goalsAgainst: 13, goalDifference: 28, points: 47 },
  { rank: 2, teamId: "aksehirspor-1922", teamName: "1922 Akşehirspor", played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 36, goalsAgainst: 15, goalDifference: 21, points: 43 },
  { rank: 3, teamId: "alanya-1221-fsk", teamName: "Alanya 1221", played: 20, won: 12, drawn: 5, lost: 3, goalsFor: 34, goalsAgainst: 17, goalDifference: 17, points: 41 },
  { rank: 4, teamId: "altay", teamName: "Altay", played: 20, won: 11, drawn: 5, lost: 4, goalsFor: 32, goalsAgainst: 19, goalDifference: 13, points: 38 },
  { rank: 5, teamId: "ayvalikgucu-bld", teamName: "Ayvalıkgücü Belediyespor", played: 20, won: 10, drawn: 6, lost: 4, goalsFor: 30, goalsAgainst: 20, goalDifference: 10, points: 36 },
  { rank: 6, teamId: "balikesirspor", teamName: "Balıkesirspor", played: 20, won: 9, drawn: 6, lost: 5, goalsFor: 28, goalsAgainst: 22, goalDifference: 6, points: 33 },
  { rank: 7, teamId: "bigaspor", teamName: "Bigaspor", played: 20, won: 9, drawn: 4, lost: 7, goalsFor: 27, goalsAgainst: 24, goalDifference: 3, points: 31 },
  { rank: 8, teamId: "bucaspor-1928", teamName: "Bucaspor 1928", played: 20, won: 8, drawn: 5, lost: 7, goalsFor: 26, goalsAgainst: 25, goalDifference: 1, points: 29 },
  { rank: 9, teamId: "denizli-iy", teamName: "Denizli İdmanyurdu", played: 20, won: 7, drawn: 6, lost: 7, goalsFor: 24, goalsAgainst: 25, goalDifference: -1, points: 27 },
  { rank: 10, teamId: "eskisehir-anadolu-sf", teamName: "Eskişehir Anadoluspor", played: 20, won: 6, drawn: 7, lost: 7, goalsFor: 23, goalsAgainst: 26, goalDifference: -3, points: 25 },
  { rank: 11, teamId: "eskisehirspor", teamName: "Eskişehirspor", played: 20, won: 6, drawn: 5, lost: 9, goalsFor: 22, goalsAgainst: 28, goalDifference: -6, points: 23 },
  { rank: 12, teamId: "etimesgut-spor", teamName: "Etimesgutspor", played: 20, won: 5, drawn: 7, lost: 8, goalsFor: 20, goalsAgainst: 28, goalDifference: -8, points: 22 },
  { rank: 13, teamId: "gaziemir-gsk", teamName: "Gaziemir GSK", played: 20, won: 5, drawn: 5, lost: 10, goalsFor: 19, goalsAgainst: 31, goalDifference: -12, points: 20 },
  { rank: 14, teamId: "gemlik-sumerbey", teamName: "Gemlik Sümerbey FK", played: 20, won: 4, drawn: 6, lost: 10, goalsFor: 18, goalsAgainst: 32, goalDifference: -14, points: 18 },
  { rank: 15, teamId: "karsiyaka", teamName: "Karşıyaka", played: 20, won: 4, drawn: 5, lost: 11, goalsFor: 17, goalsAgainst: 33, goalDifference: -16, points: 17 },
  { rank: 16, teamId: "kepezspor-as", teamName: "Kepezspor", played: 20, won: 3, drawn: 6, lost: 11, goalsFor: 15, goalsAgainst: 35, goalDifference: -20, points: 15 },
  { rank: 17, teamId: "usakspor-as", teamName: "Uşakspor", played: 20, won: 2, drawn: 5, lost: 13, goalsFor: 13, goalsAgainst: 39, goalDifference: -26, points: 11 },
  { rank: 18, teamId: "soke-1970-spor", teamName: "Söke 1970 Spor", played: 20, won: 1, drawn: 4, lost: 15, goalsFor: 10, goalsAgainst: 43, goalDifference: -33, points: 7 }
];

export const SAMPLE_3LIG_3: StandingRow[] = [
  { rank: 1, teamId: "adanaspor", teamName: "Adanaspor", played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 43, goalsAgainst: 14, goalDifference: 29, points: 48 },
  { rank: 2, teamId: "agri-1970", teamName: "Ağrı 1970 Spor", played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 37, goalsAgainst: 16, goalDifference: 21, points: 43 },
  { rank: 3, teamId: "bitlis-spor-1916", teamName: "Bitlisspor 1916", played: 20, won: 12, drawn: 5, lost: 3, goalsFor: 34, goalsAgainst: 18, goalDifference: 16, points: 41 },
  { rank: 4, teamId: "diyarbekirspor", teamName: "Diyarbekirspor", played: 20, won: 11, drawn: 6, lost: 3, goalsFor: 32, goalsAgainst: 17, goalDifference: 15, points: 39 },
  { rank: 5, teamId: "erciyes-38-fsk", teamName: "Erciyes 38 FSK", played: 20, won: 10, drawn: 6, lost: 4, goalsFor: 30, goalsAgainst: 20, goalDifference: 10, points: 36 },
  { rank: 6, teamId: "mazidagi-fosfat", teamName: "Mazıdağı Fosfatspor", played: 20, won: 9, drawn: 6, lost: 5, goalsFor: 28, goalsAgainst: 22, goalDifference: 6, points: 33 },
  { rank: 7, teamId: "karakopru-bld", teamName: "Karaköprü Belediyespor", played: 20, won: 9, drawn: 4, lost: 7, goalsFor: 27, goalsAgainst: 24, goalDifference: 3, points: 31 },
  { rank: 8, teamId: "karaman-fk", teamName: "Karaman FK", played: 20, won: 8, drawn: 5, lost: 7, goalsFor: 26, goalsAgainst: 25, goalDifference: 1, points: 29 },
  { rank: 9, teamId: "kirikkale-fk", teamName: "Kırıkkale FK", played: 20, won: 7, drawn: 6, lost: 7, goalsFor: 24, goalsAgainst: 25, goalDifference: -1, points: 27 },
  { rank: 10, teamId: "kirsehir-fsk", teamName: "Kırşehir FSK", played: 20, won: 6, drawn: 7, lost: 7, goalsFor: 23, goalsAgainst: 26, goalDifference: -3, points: 25 },
  { rank: 11, teamId: "yesilyurtspor", teamName: "Malatya Yeşilyurtspor", played: 20, won: 6, drawn: 5, lost: 9, goalsFor: 22, goalsAgainst: 28, goalDifference: -6, points: 23 },
  { rank: 12, teamId: "nigde-bld", teamName: "Niğde Bld", played: 20, won: 5, drawn: 7, lost: 8, goalsFor: 20, goalsAgainst: 28, goalDifference: -8, points: 22 },
  { rank: 13, teamId: "osmaniyespor-fk", teamName: "Osmaniyespor", played: 20, won: 5, drawn: 5, lost: 10, goalsFor: 19, goalsAgainst: 31, goalDifference: -12, points: 20 },
  { rank: 14, teamId: "silifkespor-1964", teamName: "1964 Silifkespor", played: 20, won: 4, drawn: 6, lost: 10, goalsFor: 18, goalsAgainst: 32, goalDifference: -14, points: 18 },
  { rank: 15, teamId: "adana-adaletgucu", teamName: "Adana Adaletgücüspor", played: 20, won: 4, drawn: 5, lost: 11, goalsFor: 17, goalsAgainst: 33, goalDifference: -16, points: 17 },
  { rank: 16, teamId: "yenimalatyaspor", teamName: "Yeni Malatyaspor", played: 20, won: 3, drawn: 6, lost: 11, goalsFor: 15, goalsAgainst: 35, goalDifference: -20, points: 15 },
  { rank: 17, teamId: "yeni-mersin-iy", teamName: "Yeni Mersin İdmanyurdu", played: 20, won: 2, drawn: 5, lost: 13, goalsFor: 13, goalsAgainst: 39, goalDifference: -26, points: 11 },
  { rank: 18, teamId: "yozgat-bl-bozok", teamName: "Yozgat Belediyesi Bozokspor", played: 20, won: 1, drawn: 4, lost: 15, goalsFor: 10, goalsAgainst: 43, goalDifference: -33, points: 7 }
];

export function getSampleStandings(leagueId: string, groupId?: string): StandingRow[] {
  if (leagueId === "tff-2-lig") {
    if (groupId === "white") return SAMPLE_2LIG_BEYAZ;
    return SAMPLE_2LIG_KIRMIZI;
  }
  if (leagueId === "tff-3-lig") {
    if (groupId === "group-2") return SAMPLE_3LIG_2;
    if (groupId === "group-3") return SAMPLE_3LIG_3;
    return SAMPLE_3LIG_1;
  }
  return SAMPLE_STANDINGS;
}

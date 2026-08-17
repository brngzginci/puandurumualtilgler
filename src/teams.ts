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
  logo?: string;
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
    defaultLogo: "/logos/esenlererok.svg",
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
    defaultLogo: "/logos/istanbulspor.svg",
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
    aliases: ["Şanlıurfaspor", "Sanliurfaspor", "Şanlıurfa", "Sanliurfa", "Urfaspor", "Urfa", "Şanlıurfa Spor"],
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
    aliases: ["Sarıyer", "Sariyer", "Sarıyer SK", "Sariyer SK", "Sarıyer Spor"],
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
    aliases: ["Sivasspor", "Sivas", "Net Global Sivasspor", "EMS Yapı Sivasspor"],
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
    officialName: "Vanspor FK",
    displayName: "Vanspor FK",
    shortName: "Vanspor",
    aliases: ["Vanspor FK", "Vanspor", "Van Spor", "Van Spor FK", "Van", "Artı Değer Vanspor FK", "Bitexen Vanspor FK"],
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
    aliases: ["Yeni Malatyaspor", "Malatyaspor", "Yeni Malatya", "Malatya"],
    colors: ["#FFCC00", "#000000", "#FFFFFF"],
    defaultLogo: "/logos/yenimalatyaspor.svg",
    primaryColor: "#FFCC00",
    secondaryColor: "#000000",
    textOnPrimary: "#000000"
  },
  // --- Additional Turkish Teams (2. Lig, 3. Lig & Süper Lig) ---
  {
    id: "galatasaray",
    officialName: "Galatasaray A.Ş.",
    displayName: "Galatasaray",
    shortName: "Galatasaray",
    aliases: ["Galatasaray", "GS", "Galatasaray SK"],
    colors: ["#A90432", "#FDB913", "#FFFFFF"],
    primaryColor: "#A90432",
    secondaryColor: "#FDB913",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "fenerbahce",
    officialName: "Fenerbahçe A.Ş.",
    displayName: "Fenerbahçe",
    shortName: "Fenerbahçe",
    aliases: ["Fenerbahçe", "Fenerbahce", "FB", "Fenerbahçe SK"],
    colors: ["#002D62", "#FFED00", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#FFED00",
    textOnPrimary: "#FFED00"
  },
  {
    id: "besiktas",
    officialName: "Beşiktaş A.Ş.",
    displayName: "Beşiktaş",
    shortName: "Beşiktaş",
    aliases: ["Beşiktaş", "Besiktas", "BJK", "Beşiktaş JK"],
    colors: ["#000000", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#000000",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "trabzonspor",
    officialName: "Trabzonspor A.Ş.",
    displayName: "Trabzonspor",
    shortName: "Trabzonspor",
    aliases: ["Trabzonspor", "TS", "Trabzon"],
    colors: ["#800020", "#00A3E0", "#FFFFFF"],
    primaryColor: "#800020",
    secondaryColor: "#00A3E0",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "basaksehir",
    officialName: "Rams Başakşehir FK",
    displayName: "Başakşehir FK",
    shortName: "Başakşehir",
    aliases: ["Başakşehir", "Basaksehir", "Rams Başakşehir", "İstanbul Başakşehir"],
    colors: ["#002D62", "#FF671F", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#FF671F",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "samsunspor",
    officialName: "Samsunspor",
    displayName: "Samsunspor",
    shortName: "Samsunspor",
    aliases: ["Samsunspor", "Samsun"],
    colors: ["#E30A17", "#FFFFFF", "#000000"],
    primaryColor: "#E30A17",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "eyupspor",
    officialName: "İkas Eyüpspor",
    displayName: "Eyüpspor",
    shortName: "Eyüpspor",
    aliases: ["Eyüpspor", "Eyupspor", "İkas Eyüpspor", "Eyüp"],
    colors: ["#800080", "#FFCC00", "#FFFFFF"],
    primaryColor: "#800080",
    secondaryColor: "#FFCC00",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "goztepe",
    officialName: "Göztepe A.Ş.",
    displayName: "Göztepe",
    shortName: "Göztepe",
    aliases: ["Göztepe", "Goztepe", "Göztepe SK"],
    colors: ["#FFED00", "#E30A17", "#000000"],
    primaryColor: "#FFED00",
    secondaryColor: "#E30A17",
    textOnPrimary: "#000000"
  },
  {
    id: "kasimpasa",
    officialName: "Kasımpaşa A.Ş.",
    displayName: "Kasımpaşa",
    shortName: "Kasımpaşa",
    aliases: ["Kasımpaşa", "Kasimpasa", "Kasımpaşa SK"],
    colors: ["#002D62", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "rizespor",
    officialName: "Çaykur Rizespor",
    displayName: "Çaykur Rizespor",
    shortName: "Rizespor",
    aliases: ["Çaykur Rizespor", "Rizespor", "Çaykur Rize", "Rize"],
    colors: ["#009639", "#002D62", "#FFFFFF"],
    primaryColor: "#009639",
    secondaryColor: "#002D62",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "gaziantepfk",
    officialName: "Gaziantep FK",
    displayName: "Gaziantep FK",
    shortName: "Gaziantep",
    aliases: ["Gaziantep FK", "Gaziantep", "Gaziantep Futbol Kulübü"],
    colors: ["#E30A17", "#000000", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "konyaspor",
    officialName: "Tümosan Konyaspor",
    displayName: "Konyaspor",
    shortName: "Konyaspor",
    aliases: ["Konyaspor", "Tümosan Konyaspor", "Konya"],
    colors: ["#009639", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#009639",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "alanyaspor",
    officialName: "Corendon Alanyaspor",
    displayName: "Alanyaspor",
    shortName: "Alanyaspor",
    aliases: ["Alanyaspor", "Corendon Alanyaspor", "Alanya"],
    colors: ["#FF671F", "#009639", "#FFFFFF"],
    primaryColor: "#FF671F",
    secondaryColor: "#009639",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "hatayspor",
    officialName: "Atakaş Hatayspor",
    displayName: "Hatayspor",
    shortName: "Hatayspor",
    aliases: ["Hatayspor", "Atakaş Hatayspor", "Hatay"],
    colors: ["#800020", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#800020",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "adanademirspor",
    officialName: "Adana Demirspor",
    displayName: "Adana Demirspor",
    shortName: "Adana Demir",
    aliases: ["Adana Demirspor", "Adana Demir", "Demirspor"],
    colors: ["#002D62", "#00A3E0", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#00A3E0",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "trabzon1461",
    officialName: "1461 Trabzon FK",
    displayName: "1461 Trabzon FK",
    shortName: "1461 Trabzon",
    aliases: ["1461 Trabzon FK", "1461 Trabzon", "1461 Trabzon FK."],
    colors: ["#800020", "#00A3E0", "#FFFFFF"],
    primaryColor: "#800020",
    secondaryColor: "#00A3E0",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "inegolspor",
    officialName: "İnegölspor",
    displayName: "İnegölspor",
    shortName: "İnegölspor",
    aliases: ["İnegölspor", "Inegolspor", "İnegöl", "Inegol"],
    colors: ["#800020", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#800020",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "iskenderunspor",
    officialName: "İskenderunspor A.Ş.",
    displayName: "İskenderunspor",
    shortName: "İskenderun",
    aliases: ["İskenderunspor A.Ş.", "İskenderunspor", "Iskenderunspor", "İskenderun", "Iskenderun"],
    colors: ["#FF671F", "#002D62", "#FFFFFF"],
    primaryColor: "#FF671F",
    secondaryColor: "#002D62",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "kastamonuspor",
    officialName: "GMG Kastamonuspor",
    displayName: "Kastamonuspor",
    shortName: "Kastamonu",
    aliases: ["GMG Kastamonuspor", "Kastamonuspor", "Kastamonu Spor", "Kastamonu"],
    colors: ["#E30A17", "#000000", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "erzincanspor",
    officialName: "24Erzincanspor",
    displayName: "Erzincanspor",
    shortName: "Erzincan Spor",
    aliases: ["24Erzincanspor", "Erzincan Spor", "Erzincanspor", "Anagold 24Erzincanspor", "Erzincan"],
    colors: ["#E30A17", "#000000", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#000000",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "kmarasisktiklal",
    officialName: "Kahramanmaraş İstiklal Spor",
    displayName: "K.Maraş İstiklal",
    shortName: "İstiklal Spor",
    aliases: ["Kahramanmaraş İstiklal Spor", "K.Maraş İstiklal", "Kahramanmaraş İstiklal", "Kahramanmaras Istiklal", "K.Maras Istiklal"],
    colors: ["#E30A17", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#E30A17",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "beyogluyencarsi",
    officialName: "Beyoğlu Yeni Çarşı FK",
    displayName: "Beyoğlu Y.Çarşı",
    shortName: "Beyoğlu Y.Çarşı",
    aliases: ["Beyoğlu Yeni Çarşı FK", "Beyoğlu Yeni Çarşı", "Beyoğlu Y.Çarşı", "Beyoglu Yeni Carsi", "Beyoglu Y.Carsi"],
    colors: ["#002D62", "#E30A17", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#E30A17",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "karacabeybld",
    officialName: "Karacabey Belediyespor A.Ş.",
    displayName: "Karacabey Bld",
    shortName: "Karacabey",
    aliases: ["Karacabey Bld", "Karacabey Belediyespor", "Karacabey Belediye", "Karacabey"],
    colors: ["#002D62", "#FFCC00", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#FFCC00",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "fethiyespor",
    officialName: "Fethiyespor",
    displayName: "Fethiyespor",
    shortName: "Fethiyespor",
    aliases: ["Fethiyespor", "Fethiye"],
    colors: ["#002D62", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "kirklarelispor",
    officialName: "Kırklarelispor",
    displayName: "Kırklarelispor",
    shortName: "Kırklareli",
    aliases: ["Kırklarelispor", "Kirklarelispor", "Kırklareli", "Kirklareli"],
    colors: ["#009639", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#009639",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "kutahyaspor",
    officialName: "Belediye Kütahyaspor",
    displayName: "Kütahyaspor",
    shortName: "Kütahya",
    aliases: ["Belediye Kütahyaspor", "Kütahyaspor", "Kutahyaspor", "Kütahya", "Kutahya"],
    colors: ["#002D62", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "serikspor",
    officialName: "Serik Belediyespor",
    displayName: "Serik Spor",
    shortName: "Serik",
    aliases: ["Serik Belediyespor", "Serik Spor", "Serikspor", "Serik"],
    colors: ["#009639", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#009639",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "orduspor52",
    officialName: "52 Orduspor FK",
    displayName: "52 Orduspor FK",
    shortName: "52 Orduspor",
    aliases: ["52 Orduspor FK", "52 Orduspor", "Orduspor FK", "52 Ordu"],
    colors: ["#800080", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#800080",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "adana01fk",
    officialName: "Adana 01 FK",
    displayName: "Adana 01 FK",
    shortName: "Adana 01",
    aliases: ["Adana 01 FK", "Adana 01", "Adana 1954 FK", "Adana 1954"],
    colors: ["#FFCC00", "#000000", "#FFFFFF"],
    primaryColor: "#FFCC00",
    secondaryColor: "#000000",
    textOnPrimary: "#000000"
  },
  {
    id: "ankarademir",
    officialName: "Ankara Demirspor",
    displayName: "Ankara Demir",
    shortName: "Ankara Demir",
    aliases: ["Ankara Demir", "Ankara Demirspor", "Demirspor"],
    colors: ["#002D62", "#00A3E0", "#FFFFFF"],
    primaryColor: "#002D62",
    secondaryColor: "#00A3E0",
    textOnPrimary: "#FFFFFF"
  },
  {
    id: "bingolspor12",
    officialName: "12 Bingölspor",
    displayName: "12 Bingölspor",
    shortName: "12 Bingöl",
    aliases: ["12 Bingölspor", "12 Bingöl", "Bingölspor", "Bingolspor"],
    colors: ["#009639", "#FFFFFF", "#FFFFFF"],
    primaryColor: "#009639",
    secondaryColor: "#FFFFFF",
    textOnPrimary: "#FFFFFF"
  }
];

/**
 * Transliterates Turkish characters into ASCII equivalents (e.g. "Şanlıurfa" -> "Sanliurfa", "Çorum" -> "Corum").
 */
export function transliterateTurkish(text: string): string {
  if (!text) return "";
  const map: Record<string, string> = {
    "ç": "c", "Ç": "C",
    "ğ": "g", "Ğ": "G",
    "ı": "i", "I": "I",
    "İ": "I", "i": "i",
    "ö": "o", "Ö": "O",
    "ş": "s", "Ş": "S",
    "ü": "u", "Ü": "U"
  };
  return text.split("").map((c) => map[c] || c).join("");
}

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

  // Expand common Turkish abbreviations
  if (clean.startsWith("f. ")) {
    clean = "fatih " + clean.substring(3);
  }
  if (clean.includes("k.maraş") || clean.includes("k.maras")) {
    clean = clean.replace(/k\.mara[sş]/g, "kahramanmaraş");
  }
  if (clean.includes("y.çarşı") || clean.includes("y.carsi")) {
    clean = clean.replace(/y\.çarşı|y\.carsi/g, "yeni çarşı");
  }
  if (clean.endsWith(" bld.") || clean.endsWith(" bld")) {
    clean = clean.replace(/\s+bld\.?$/g, " belediyespor");
  }

  // Remove common sponsors
  const sponsors = [
    "teksüt", "teksut",
    "ahlatcı", "ahlatci",
    "alagöz holding", "alagoz holding",
    "alagöz", "alagoz",
    "central hospital",
    "uğur okulları", "ugur okullari",
    "artı değer", "arti deger",
    "gmg", "ikas", "net global", "ems yapı", "ems yapi",
    "bellona", "corendon", "atakaş", "atakas", "ramsay", "rams", "mondihome", "bitexen", "yukatel", "tümosan", "tumosan", "mke"
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
    "futbol şubesi",
    "derneği", "dernegi",
    "faaliyetleri",
    "sportif",
    "futbol",
    "büyükşehir belediye spor", "buyuksehir belediye spor",
    "büyükşehir belediyespor", "buyuksehir belediyespor",
    "büyükşehir belediye", "buyuksehir belediye",
    "belediyespor", "belediye spor",
    "belediyesi", "belediye",
    "a.ş.", "a.s.", "as", "aş",
    "s.k.", "sk",
    "f.k.", "fk",
    "spor", "sporu"
  ];

  // Run passes to strip nested suffixes
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
 * Gets all global teams (built-in TEAMS + saved custom teams in localStorage).
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
    aliases: [clean, clean.toUpperCase(), normalizeTeamName(clean), transliterateTurkish(clean)],
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
  const rawClean = input.trim();
  const normalizedInput = normalizeTeamName(rawClean);
  const inputSlug = slugifyTeamName(rawClean);
  const translitInput = transliterateTurkish(rawClean).toLowerCase();

  const allTeams = customList || getGlobalTeams();

  // 1. Direct match on ID
  let match = allTeams.find((t) => t.id === normalizedInput || t.id === inputSlug);
  if (match) return match;

  // 2. Exact match on raw names
  match = allTeams.find(
    (t) =>
      t.displayName.toLowerCase() === rawClean.toLowerCase() ||
      t.officialName.toLowerCase() === rawClean.toLowerCase() ||
      t.shortName.toLowerCase() === rawClean.toLowerCase() ||
      (t.aliases || []).some((a) => a.toLowerCase() === rawClean.toLowerCase())
  );
  if (match) return match;

  // 3. Exact match on normalized shortName, displayName, officialName, or aliases
  if (normalizedInput) {
    match = allTeams.find(
      (t) =>
        normalizeTeamName(t.shortName) === normalizedInput ||
        normalizeTeamName(t.displayName) === normalizedInput ||
        normalizeTeamName(t.officialName) === normalizedInput ||
        (t.aliases || []).some((alias) => normalizeTeamName(alias) === normalizedInput)
    );
    if (match) return match;
  }

  // 4. Transliterated match
  match = allTeams.find((t) => {
    const tTrans = transliterateTurkish(t.displayName).toLowerCase();
    const tOfficial = transliterateTurkish(t.officialName).toLowerCase();
    const tShort = transliterateTurkish(t.shortName).toLowerCase();
    return tTrans === translitInput || tOfficial === translitInput || tShort === translitInput;
  });
  if (match) return match;

  // 5. Word boundary / token match for composite names (e.g. "fatih karagumruk" vs "karagumruk")
  if (normalizedInput.length >= 4) {
    match = allTeams.find((t) => {
      const normShort = normalizeTeamName(t.shortName);
      const normDisplay = normalizeTeamName(t.displayName);
      return (
        (normShort.length >= 4 && (normShort === normalizedInput || normShort.startsWith(normalizedInput) || normalizedInput.startsWith(normShort))) ||
        (normDisplay.length >= 4 && (normDisplay === normalizedInput || normDisplay.startsWith(normalizedInput) || normalizedInput.startsWith(normDisplay)))
      );
    });
  }

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

/**
 * Generates an exhaustive list of candidate logo file URLs for a team.
 * Prioritizes standard Turkish team names (.png) first so local files load instantly.
 */
export function getPossibleLogoCandidates(
  team?: Team | null | string,
  rawName?: string
): string[] {
  const candidates: string[] = [];

  const addCandidate = (path: string) => {
    if (!path) return;
    const trimmed = path.trim();
    if (trimmed && !candidates.includes(trimmed)) {
      candidates.push(trimmed);
    }
  };

  let teamObj: Team | null = null;
  let inputName = (rawName || "").trim();

  if (typeof team === "string") {
    inputName = inputName || team.trim();
    teamObj = findTeamByInputName(team);
  } else if (team && typeof team === "object") {
    teamObj = team;
  }

  // 1. Priority 0: Explicit user uploaded custom logo or data URL
  if (teamObj?.logo) {
    addCandidate(teamObj.logo);
  }

  // 2. Collect all primary base names associated with this team
  const primaryNames = new Set<string>();

  if (inputName) primaryNames.add(inputName);
  if (teamObj) {
    if (teamObj.displayName) primaryNames.add(teamObj.displayName);
    if (teamObj.shortName) primaryNames.add(teamObj.shortName);
    if (teamObj.officialName) primaryNames.add(teamObj.officialName);
    if (Array.isArray(teamObj.aliases)) {
      teamObj.aliases.forEach((a) => {
        if (a && typeof a === "string") primaryNames.add(a.trim());
      });
    }
  }

  // 3. Expand abbreviation variants and clean names
  const allNames = new Set<string>(primaryNames);

  for (const n of Array.from(primaryNames)) {
    if (!n) continue;
    const trimmed = n.trim();

    // Abbreviation expansions
    if (trimmed.startsWith("F. ")) {
      allNames.add(trimmed.replace(/^F\.\s+/i, "Fatih "));
      allNames.add(trimmed.replace(/^F\.\s+/i, ""));
    }
    if (trimmed.includes("K.Maraş") || trimmed.includes("K.Maras")) {
      allNames.add(trimmed.replace(/K\.Mara[sş]/gi, "Kahramanmaraş"));
    }
    if (trimmed.includes("Y.Çarşı") || trimmed.includes("Y.Carsi")) {
      allNames.add(trimmed.replace(/Y\.Çarşı|Y\.Carsi/gi, "Yeni Çarşı"));
    }
    if (trimmed.includes("Bld.") || trimmed.includes("Bld")) {
      allNames.add(trimmed.replace(/\s+Bld\.?$/gi, " Belediyespor"));
      allNames.add(trimmed.replace(/\s+Bld\.?$/gi, " Belediye"));
      allNames.add(trimmed.replace(/\s+Bld\.?$/gi, ""));
    }
    if (trimmed.startsWith("GMG ")) {
      allNames.add(trimmed.replace(/^GMG\s+/i, ""));
    }
    if (trimmed.startsWith("MKE ")) {
      allNames.add(trimmed.replace(/^MKE\s+/i, ""));
    }
    if (/^Ahlatc[ıi]\s+/i.test(trimmed)) {
      allNames.add(trimmed.replace(/^Ahlatc[ıi]\s+/i, ""));
    }
    if (/^Alag[oö]z(\s+Holding)?\s+/i.test(trimmed)) {
      allNames.add(trimmed.replace(/^Alag[oö]z(\s+Holding)?\s+/i, ""));
    }
    if (/^Teks[uü]t\s+/i.test(trimmed)) {
      allNames.add(trimmed.replace(/^Teks[uü]t\s+/i, ""));
    }
    if (/^U[gğ]ur\s+Okullar[ıi]\s+/i.test(trimmed)) {
      allNames.add(trimmed.replace(/^U[gğ]ur\s+Okullar[ıi]\s+/i, ""));
    }
    if (/^Central\s+Hospital\s+/i.test(trimmed)) {
      allNames.add(trimmed.replace(/^Central\s+Hospital\s+/i, ""));
    }
    if (/^Art[ıi]\s+De[gğ]er\s+/i.test(trimmed)) {
      allNames.add(trimmed.replace(/^Art[ıi]\s+De[gğ]er\s+/i, ""));
    }

    // Common stripped suffixes
    const strippedSuffix = trimmed
      .replace(/\s+(FK|SK|A\.Ş\.|A\.S\.|AŞ|AS|Futbol Kulübü|Futbol Kulubu|Spor Kulübü|Spor Kulubu|Sporu|Spor|Faaliyetleri)$/i, "")
      .trim();
    if (strippedSuffix && strippedSuffix !== trimmed) {
      allNames.add(strippedSuffix);
    }
  }

  // 4. Generate all textual casing and transliterated variants
  const allVariants = new Set<string>();

  for (const name of Array.from(allNames)) {
    if (!name) continue;
    const clean = name.trim();
    if (!clean) continue;

    allVariants.add(clean); // Exact Turkish casing (e.g. "Kayserispor", "Fatih Karagümrük", "Çorum FK")
    allVariants.add(clean.toUpperCase()); // Upper (e.g. "KAYSERİSPOR")
    allVariants.add(clean.toLowerCase()); // Lower (e.g. "kayserispor")

    // Transliterated ASCII (e.g. "Corum FK", "Sanliurfaspor", "Igdir FK", "Istanbulspor", "Umraniyespor")
    const translit = transliterateTurkish(clean);
    if (translit) {
      allVariants.add(translit);
      allVariants.add(translit.toUpperCase());
      allVariants.add(translit.toLowerCase());
    }

    // Slug versions (e.g. "manisafk", "manisa-fk", "erzurumspor", "fatih-karagumruk")
    const slug = slugifyTeamName(clean);
    if (slug) {
      allVariants.add(slug);
      allVariants.add(slug.replace(/-/g, ""));
    }
  }

  if (teamObj?.id) {
    allVariants.add(teamObj.id);
  }

  const variantList = Array.from(allVariants).filter(Boolean);

  // Priority 1: /logos/{Name}.png & .PNG (User's standard saved Turkish filenames)
  for (const v of variantList) {
    addCandidate(`/logos/${v}.png`);
    addCandidate(`/logos/${v}.PNG`);
    if (v.includes(" ") || /[çğışöüÇĞİŞÖÜ]/.test(v)) {
      addCandidate(`/logos/${encodeURIComponent(v)}.png`);
      addCandidate(`/logos/${encodeURIComponent(v)}.PNG`);
    }
  }

  // Priority 2: /logos/{Name}.svg & .SVG
  for (const v of variantList) {
    addCandidate(`/logos/${v}.svg`);
    addCandidate(`/logos/${v}.SVG`);
    if (v.includes(" ") || /[çğışöüÇĞİŞÖÜ]/.test(v)) {
      addCandidate(`/logos/${encodeURIComponent(v)}.svg`);
    }
  }

  // Priority 3: Configured default logo if any
  if (teamObj?.defaultLogo) {
    if (teamObj.defaultLogo.endsWith(".svg")) {
      addCandidate(teamObj.defaultLogo.replace(/\.svg$/, ".png"));
      addCandidate(teamObj.defaultLogo);
    } else {
      addCandidate(teamObj.defaultLogo);
    }
  }

  // Priority 4: Root paths (in case saved directly in /public/)
  for (const v of variantList) {
    addCandidate(`/${v}.png`);
    addCandidate(`/${v}.PNG`);
    addCandidate(`/${v}.svg`);
  }

  // Priority 5: WebP and JPG formats
  for (const v of variantList) {
    addCandidate(`/logos/${v}.webp`);
    addCandidate(`/logos/${v}.jpg`);
    addCandidate(`/logos/${v}.jpeg`);
  }

  return candidates;
}


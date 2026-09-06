/**
 * Canonical Team Name Overrides and Alias Mappings
 * Ensures that incoming raw names from sources (Sahadan, TFF, CSV, manual)
 * are permanently replaced with the user-specified canonical names.
 */

export interface GroupRoster {
  leagueId: string;
  groupId: string;
  teamNames: string[];
}

export const LEAGUE_2_BEYAZ: string[] = [
  "68 Aksaray Bld",
  "Aliağa FK",
  "Ankaraspor",
  "Arnavutköy Bld",
  "Çorluspor 1947",
  "Erbaaspor",
  "Kastamonuspor",
  "Gebzespor",
  "Isparta 32 Spor",
  "İnegöl Kafkasspor",
  "Şanlıurfaspor",
  "Menemen FK",
  "Muşspor",
  "Sebatspor",
  "Elazığspor",
  "Somaspor",
  "Hatayspor",
  "Adana Demirspor"
];

export const LEAGUE_2_KIRMIZI: string[] = [
  "12 Bingölspor",
  "1461 Trabzon FK",
  "52 Orduspor FK",
  "Adana 01 FK",
  "Erzincanspor",
  "Ankara Demirspor",
  "Beyoğlu Yeni Çarşı",
  "Fethiyespor",
  "İskenderunspor",
  "Kahramanmaraş İstiklalspor",
  "Karacabey Belediyespor",
  "Kırklarelispor",
  "Kütahyaspor",
  "Ankaragücü",
  "Sakaryaspor",
  "Serikspor",
  "İnegölspor"
];

export const LEAGUE_3_GROUP_1: string[] = [
  "Amasyaspor",
  "Beykoz Anadoluspor",
  "Beykoz İshaklıspor",
  "Bulvarspor",
  "Düzcespor",
  "Fatsa Bld",
  "Galataspor",
  "Gölcükspor",
  "İnkılap FK",
  "Karabük İdmanyurdu",
  "Kdz.Ereğli",
  "Küçükçekmece Sinopspor",
  "Orduspor 1967",
  "Pazarspor",
  "Silivrispor",
  "Tokat Bld",
  "Yalova FK",
  "Zonguldakspor"
];

export const LEAGUE_3_GROUP_2: string[] = [
  "Bursa Yıldırımspor",
  "1922 Akşehirspor",
  "Alanya 1221",
  "Altay",
  "Ayvalıkgücü Belediyespor",
  "Balıkesirspor",
  "Bigaspor",
  "Bucaspor 1928",
  "Denizli İdmanyurdu",
  "Eskişehir Anadoluspor",
  "Eskişehirspor",
  "Etimesgutspor",
  "Gaziemir GSK",
  "Gemlik Sümerbey FK",
  "Karşıyaka",
  "Kepezspor",
  "Uşakspor",
  "Söke 1970 Spor"
];

export const LEAGUE_3_GROUP_3: string[] = [
  "Adanaspor",
  "Ağrı 1970 Spor",
  "Bitlisspor 1916",
  "Diyarbekirspor",
  "Erciyes 38 FSK",
  "Mazıdağı Fosfatspor",
  "Karaköprü Belediyespor",
  "Karaman FK",
  "Kırıkkale FK",
  "Kırşehir FSK",
  "Malatya Yeşilyurtspor",
  "Niğde Bld",
  "Osmaniyespor",
  "1964 Silifkespor",
  "Adana Adaletgücüspor",
  "Yeni Malatyaspor",
  "Yeni Mersin İdmanyurdu",
  "Yozgat Belediyesi Bozokspor"
];

/**
 * Normalizes a team name for fuzzy matching (lowercase, stripped punctuation, Turkish transliteration).
 */
export function normalizeKey(text: string): string {
  if (!text) return "";
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİiI]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * Direct lookup dictionary for raw/incoming names to user canonical display names.
 */
export const CANONICAL_TEAM_OVERRIDES: Record<string, string> = {
  // === 2. LİG BEYAZ GRUP ===
  "68 aksaray bld": "68 Aksaray Bld",
  "68 aksaray bld.": "68 Aksaray Bld",
  "68 aksaray belediyespor": "68 Aksaray Bld",
  "motolux 68 aksaray bld": "68 Aksaray Bld",
  "motolux 68 aksarayspor": "68 Aksaray Bld",
  "68 aksarayspor": "68 Aksaray Bld",
  "68 aksaray": "68 Aksaray Bld",
  "aksaray bld": "68 Aksaray Bld",
  "aksarayspor": "68 Aksaray Bld",

  "aliaga fk": "Aliağa FK",
  "aliaga futbol kulubu": "Aliağa FK",
  "aliagaspor": "Aliağa FK",
  "aliaga": "Aliağa FK",

  "ankaraspor": "Ankaraspor",
  "sincan belediyesi ankaraspor": "Ankaraspor",
  "sincan bld ankaraspor": "Ankaraspor",
  "ankara spor": "Ankaraspor",

  "arnavutkoy bld": "Arnavutköy Bld",
  "arnavutkoy bld.": "Arnavutköy Bld",
  "arnavutkoy belediyespor": "Arnavutköy Bld",
  "kuzey marmara a.s. arnavutkoy bld.": "Arnavutköy Bld",
  "kuzey marmara a.s. arnavutkoy bld": "Arnavutköy Bld",
  "kuzey marmara arnavutkoy bld": "Arnavutköy Bld",
  "arnavutkoy": "Arnavutköy Bld",

  "corluspor 1947": "Çorluspor 1947",
  "corluspor": "Çorluspor 1947",
  "corlu 1947": "Çorluspor 1947",
  "corlu spor": "Çorluspor 1947",

  "erbaaspor": "Erbaaspor",
  "merkur jet erbaaspor": "Erbaaspor",
  "erbaa spor": "Erbaaspor",
  "erbaa": "Erbaaspor",

  "kastamonuspor": "Kastamonuspor",
  "gmg kastamonuspor": "Kastamonuspor",
  "kastamonu spor": "Kastamonuspor",
  "kastamonu": "Kastamonuspor",

  "gebzespor": "Gebzespor",
  "g.gebzespor": "Gebzespor",
  "gebze spor": "Gebzespor",
  "gebze": "Gebzespor",

  "isparta 32 spor": "Isparta 32 Spor",
  "isparta 32": "Isparta 32 Spor",
  "ispartaspor": "Isparta 32 Spor",
  "isparta spor": "Isparta 32 Spor",

  "inegol kafkasspor": "İnegöl Kafkasspor",
  "inegol kafkas": "İnegöl Kafkasspor",
  "inegol kafkas spor": "İnegöl Kafkasspor",
  "kafkas genclikspor": "İnegöl Kafkasspor",
  "kafkasspor": "İnegöl Kafkasspor",

  "sanliurfaspor": "Şanlıurfaspor",
  "sanliurfa spor": "Şanlıurfaspor",
  "urfaspor": "Şanlıurfaspor",
  "sanliurfa": "Şanlıurfaspor",

  "menemen fk": "Menemen FK",
  "menemenspor": "Menemen FK",
  "menemen futbol kulubu": "Menemen FK",
  "menemen": "Menemen FK",

  "musspor": "Muşspor",
  "mus spor": "Muşspor",
  "mus 1984 musspor": "Muşspor",
  "mus 1984": "Muşspor",

  "sebatspor": "Sebatspor",
  "sebat spor": "Sebatspor",
  "sebat genclikspor": "Sebatspor",
  "akcaabat sebatspor": "Sebatspor",
  "sebat genclik": "Sebatspor",
  "sebat": "Sebatspor",

  "elazigspor": "Elazığspor",
  "cimentas elazigspor": "Elazığspor",
  "elazig spor": "Elazığspor",
  "elazig": "Elazığspor",

  "somaspor": "Somaspor",
  "soma spor": "Somaspor",
  "soma": "Somaspor",

  "hatayspor": "Hatayspor",
  "atakas hatayspor": "Hatayspor",
  "hatay spor": "Hatayspor",
  "hatay": "Hatayspor",

  "adana demirspor": "Adana Demirspor",
  "adana demir": "Adana Demirspor",
  "adanademirspor": "Adana Demirspor",

  // === 2. LİG KIRMIZI GRUP ===
  "12 bingolspor": "12 Bingölspor",
  "12 bingol": "12 Bingölspor",
  "bingolspor": "12 Bingölspor",
  "12 bingol spor": "12 Bingölspor",

  "1461 trabzon fk": "1461 Trabzon FK",
  "1461 trabzon": "1461 Trabzon FK",
  "trabzon 1461": "1461 Trabzon FK",

  "52 orduspor fk": "52 Orduspor FK",
  "52 orduspor": "52 Orduspor FK",
  "52 ordu fk": "52 Orduspor FK",
  "52 ordu": "52 Orduspor FK",

  "adana 01 fk": "Adana 01 FK",
  "adana 01": "Adana 01 FK",
  "bulut yesil insaat adana 01 fk": "Adana 01 FK",
  "bulut yesil adana 01 fk": "Adana 01 FK",
  "adana 01 fsk": "Adana 01 FK",

  "erzincanspor": "Erzincanspor",
  "24erzincanspor": "Erzincanspor",
  "24 erzincanspor": "Erzincanspor",
  "erzincan spor": "Erzincanspor",
  "erzincan": "Erzincanspor",

  "ankara demirspor": "Ankara Demirspor",
  "ankara demir": "Ankara Demirspor",
  "ankara demir spor": "Ankara Demirspor",

  "beyoglu yeni carsi": "Beyoğlu Yeni Çarşı",
  "beyoglu yeni carsi fk": "Beyoğlu Yeni Çarşı",
  "beyoglu y.carsi": "Beyoğlu Yeni Çarşı",
  "beyoglu yeni carsi spor": "Beyoğlu Yeni Çarşı",
  "beyoglu yc": "Beyoğlu Yeni Çarşı",

  "fethiyespor": "Fethiyespor",
  "fethiye spor": "Fethiyespor",
  "fethiye": "Fethiyespor",

  "iskenderunspor": "İskenderunspor",
  "iskenderunspor a.s.": "İskenderunspor",
  "iskenderun spor": "İskenderunspor",
  "iskenderun": "İskenderunspor",

  "kahramanmaras istiklalspor": "Kahramanmaraş İstiklalspor",
  "k.maras istiklal": "Kahramanmaraş İstiklalspor",
  "kahramanmaras istiklal": "Kahramanmaraş İstiklalspor",
  "kahramanmaras istiklal spor": "Kahramanmaraş İstiklalspor",
  "k.maras istiklalspor": "Kahramanmaraş İstiklalspor",
  "istiklalspor": "Kahramanmaraş İstiklalspor",
  "istiklal spor": "Kahramanmaraş İstiklalspor",
  "kmarasisktiklal": "Kahramanmaraş İstiklalspor",

  "karacabey belediyespor": "Karacabey Belediyespor",
  "karacabey bld": "Karacabey Belediyespor",
  "karacabey bld.": "Karacabey Belediyespor",
  "karacabey belediye spor": "Karacabey Belediyespor",
  "karacabey": "Karacabey Belediyespor",

  "kirklarelispor": "Kırklarelispor",
  "kirklareli spor": "Kırklarelispor",
  "kirklareli": "Kırklarelispor",

  "kutahyaspor": "Kütahyaspor",
  "belediye kutahyaspor": "Kütahyaspor",
  "kutahya spor": "Kütahyaspor",
  "kutahya": "Kütahyaspor",

  "ankaragucu": "Ankaragücü",
  "ankragucu": "Ankaragücü",
  "mke ankaragucu": "Ankaragücü",
  "mke ankara gucu": "Ankaragücü",
  "ankara gucu": "Ankaragücü",

  "sakaryaspor": "Sakaryaspor",
  "sakarya spor": "Sakaryaspor",
  "sakarya": "Sakaryaspor",

  "serikspor": "Serikspor",
  "serik spor": "Serikspor",
  "serik belediyespor": "Serikspor",
  "serik bld": "Serikspor",
  "serik": "Serikspor",

  "inegolspor": "İnegölspor",
  "inegol spor": "İnegölspor",
  "inegol": "İnegölspor",

  // === 3. LİG 1. GRUP ===
  "amasyaspor": "Amasyaspor",
  "amasyaspor fk": "Amasyaspor",
  "amasyaspor futbol kulubu": "Amasyaspor",
  "amasya": "Amasyaspor",

  "beykoz anadoluspor": "Beykoz Anadoluspor",
  "beykoz anadolu spor": "Beykoz Anadoluspor",
  "beykoz anadolu spor a.s.": "Beykoz Anadoluspor",
  "beykoz a.s.": "Beykoz Anadoluspor",
  "beykoz as": "Beykoz Anadoluspor",
  "beykoz": "Beykoz Anadoluspor",

  "beykoz ishaklispor": "Beykoz İshaklıspor",
  "beykoz ishakli spor": "Beykoz İshaklıspor",
  "beykoz ishakli": "Beykoz İshaklıspor",
  "beykoz ishakli spor faaliyetleri a.s.": "Beykoz İshaklıspor",
  "ishaklispor": "Beykoz İshaklıspor",

  "bulvarspor": "Bulvarspor",
  "kartal bulvarspor": "Bulvarspor",
  "bulvar": "Bulvarspor",

  "duzcespor": "Düzcespor",
  "duzce cam duzcespor": "Düzcespor",
  "duzce cam duzce spor": "Düzcespor",

  "fatsa bld": "Fatsa Bld",
  "fatsa bld.": "Fatsa Bld",
  "fatsa belediyespor": "Fatsa Bld",
  "fatsa belediye spor": "Fatsa Bld",
  "fatsaspor": "Fatsa Bld",

  "galataspor": "Galataspor",
  "galata": "Galataspor",
  "galata spor": "Galataspor",

  "golcukspor": "Gölcükspor",
  "golcuk spor": "Gölcükspor",

  "inkilap fk": "İnkılap FK",
  "inkilap fsk": "İnkılap FK",
  "inkilap futbol spor kulubu": "İnkılap FK",
  "inkilap": "İnkılap FK",

  "karabuk idmanyurdu": "Karabük İdmanyurdu",
  "karabuk idman yurdu": "Karabük İdmanyurdu",
  "karabuk i.y.": "Karabük İdmanyurdu",
  "karabuk iy": "Karabük İdmanyurdu",
  "karabuk idmanyurdu spor": "Karabük İdmanyurdu",

  "kdz.eregli": "Kdz.Ereğli",
  "kdz. eregli": "Kdz.Ereğli",
  "kdz eregli": "Kdz.Ereğli",
  "kdz.eregli bld": "Kdz.Ereğli",
  "kdz. eregli bld": "Kdz.Ereğli",
  "kdz. eregli belediyespor": "Kdz.Ereğli",
  "karadeniz eregli belediye spor": "Kdz.Ereğli",

  "kucukcekmece sinopspor": "Küçükçekmece Sinopspor",
  "kucukcekmece sinop spor": "Küçükçekmece Sinopspor",
  "kucukcekmece sinop spor kulubu": "Küçükçekmece Sinopspor",
  "k.cekmece sinopspor": "Küçükçekmece Sinopspor",
  "k.c sinopspor": "Küçükçekmece Sinopspor",
  "kc sinopspor": "Küçükçekmece Sinopspor",
  "kucukcekmece sinop": "Küçükçekmece Sinopspor",

  "orduspor 1967": "Orduspor 1967",
  "orduspor 1967 a.s.": "Orduspor 1967",
  "orduspor 1967 as": "Orduspor 1967",

  "pazarspor": "Pazarspor",
  "pazar spor": "Pazarspor",

  "silivrispor": "Silivrispor",
  "silivri spor": "Silivrispor",

  "tokat bld": "Tokat Bld",
  "tokat bld.": "Tokat Bld",
  "tokat belediye plevne spor": "Tokat Bld",
  "tokat belediyespor": "Tokat Bld",
  "tokat plevne": "Tokat Bld",

  "yalova fk": "Yalova FK",
  "yalova fk 77": "Yalova FK",
  "yalova fk 77 spor kulubu": "Yalova FK",
  "yalovaspor": "Yalova FK",

  "zonguldakspor": "Zonguldakspor",
  "zonguldakspor fk": "Zonguldakspor",
  "zonguldak komurspor": "Zonguldakspor",
  "zonguldak komurspor a.s.": "Zonguldakspor",
  "zonguldak komur": "Zonguldakspor",

  // === 3. LİG 2. GRUP ===
  "bursa yildirimspor": "Bursa Yıldırımspor",
  "bursa yildirim spor": "Bursa Yıldırımspor",
  "bursa yildirim": "Bursa Yıldırımspor",
  "bursa yildirim spor kulubu": "Bursa Yıldırımspor",

  "1922 aksehirspor": "1922 Akşehirspor",
  "1922 aksehir spor": "1922 Akşehirspor",
  "1922 konyaspor": "1922 Akşehirspor",
  "aksehirspor": "1922 Akşehirspor",

  "alanya 1221": "Alanya 1221",
  "alanya 1221 fsk": "Alanya 1221",
  "alanya 1221 futbol spor kulubu": "Alanya 1221",
  "alanya kestel": "Alanya 1221",
  "alanya kestelspor": "Alanya 1221",

  "altay": "Altay",
  "altay sk": "Altay",

  "ayvalikgucu belediyespor": "Ayvalıkgücü Belediyespor",
  "ayvalikgucu belediye spor": "Ayvalıkgücü Belediyespor",
  "ayvalikgucu bld": "Ayvalıkgücü Belediyespor",
  "ayvalikgucu": "Ayvalıkgücü Belediyespor",

  "balikesirspor": "Balıkesirspor",
  "balikesir spor": "Balıkesirspor",
  "balikesir": "Balıkesirspor",

  "bigaspor": "Bigaspor",
  "biga spor": "Bigaspor",

  "bucaspor 1928": "Bucaspor 1928",
  "bucaspor": "Bucaspor 1928",
  "buca spor 1928": "Bucaspor 1928",
  "buca 1928": "Bucaspor 1928",

  "denizli idmanyurdu": "Denizli İdmanyurdu",
  "denizli idman yurdu": "Denizli İdmanyurdu",
  "denizli idmanyurdu gunebakan": "Denizli İdmanyurdu",
  "denizli iy": "Denizli İdmanyurdu",

  "eskisehir anadoluspor": "Eskişehir Anadoluspor",
  "eskisehir anadolu sf": "Eskişehir Anadoluspor",
  "eskisehir anadolu universitesi": "Eskişehir Anadoluspor",
  "anadolu universitesi": "Eskişehir Anadoluspor",
  "eskisehir anadolu": "Eskişehir Anadoluspor",

  "eskisehirspor": "Eskişehirspor",
  "eskisehir spor": "Eskişehirspor",
  "eses": "Eskişehirspor",

  "etimesgutspor": "Etimesgutspor",
  "etimesgut bld": "Etimesgutspor",
  "etimesgut belediyespor": "Etimesgutspor",
  "etimesgut spor": "Etimesgutspor",
  "etimesgut": "Etimesgutspor",

  "gaziemir gsk": "Gaziemir GSK",
  "gaziemir genclik": "Gaziemir GSK",
  "gaziemir genclik ve spor": "Gaziemir GSK",
  "gaziemir spor": "Gaziemir GSK",
  "gaziemir": "Gaziemir GSK",

  "gemlik sumerbey fk": "Gemlik Sümerbey FK",
  "gemlik sumerbey": "Gemlik Sümerbey FK",
  "gemlik spor": "Gemlik Sümerbey FK",
  "gemlik fk": "Gemlik Sümerbey FK",

  "karsiyaka": "Karşıyaka",
  "karsiyaka sk": "Karşıyaka",
  "ksk": "Karşıyaka",

  "kepezspor": "Kepezspor",
  "kepezspor futbol a.s.": "Kepezspor",
  "kepez spor": "Kepezspor",
  "kepez belediyespor": "Kepezspor",

  "usakspor": "Uşakspor",
  "usakspor a.s.": "Uşakspor",
  "usak spor": "Uşakspor",
  "usak": "Uşakspor",

  "soke 1970 spor": "Söke 1970 Spor",
  "soke 1970": "Söke 1970 Spor",
  "sokespor": "Söke 1970 Spor",
  "soke spor": "Söke 1970 Spor",

  // === 3. LİG 3. GRUP ===
  "adanaspor": "Adanaspor",
  "adanaspor a.s.": "Adanaspor",
  "adana spor": "Adanaspor",

  "agri 1970 spor": "Ağrı 1970 Spor",
  "agri 1970": "Ağrı 1970 Spor",
  "agri 1970 sk": "Ağrı 1970 Spor",
  "agrispor": "Ağrı 1970 Spor",
  "agri spor": "Ağrı 1970 Spor",

  "bitlisspor 1916": "Bitlisspor 1916",
  "bitlisspor": "Bitlisspor 1916",
  "bitlis 1916": "Bitlisspor 1916",
  "bitlis ozguzeldere": "Bitlisspor 1916",
  "bitlis ozguzelderespor": "Bitlisspor 1916",

  "diyarbekirspor": "Diyarbekirspor",
  "diyarbekir spor a.s.": "Diyarbekirspor",
  "diyarbekir": "Diyarbekirspor",
  "diyarbekir spor": "Diyarbekirspor",

  "erciyes 38 fsk": "Erciyes 38 FSK",
  "erciyes 38": "Erciyes 38 FSK",
  "erciyes 38 futbol spor kulubu": "Erciyes 38 FSK",
  "kayseri erciyes 38": "Erciyes 38 FSK",
  "talasgucu bld": "Erciyes 38 FSK",

  "mazidagi fosfatspor": "Mazıdağı Fosfatspor",
  "eti gubre mazidagi fosfatspor": "Mazıdağı Fosfatspor",
  "eti gubre mazidagi fosfat": "Mazıdağı Fosfatspor",
  "mazidagi fosfat": "Mazıdağı Fosfatspor",
  "mazidagi": "Mazıdağı Fosfatspor",

  "karakopru belediyespor": "Karaköprü Belediyespor",
  "karakopru bld": "Karaköprü Belediyespor",
  "karakopru belediye spor": "Karaköprü Belediyespor",
  "karakopru": "Karaköprü Belediyespor",

  "karaman fk": "Karaman FK",
  "karaman futbol kulubu": "Karaman FK",
  "karamanspor": "Karaman FK",
  "karaman": "Karaman FK",

  "kirikkale fk": "Kırıkkale FK",
  "kirikkale fsk": "Kırıkkale FK",
  "kirikkale anadolu fk": "Kırıkkale FK",
  "kirikkalegucu": "Kırıkkale FK",
  "kirikkale": "Kırıkkale FK",

  "kirsehir fsk": "Kırşehir FSK",
  "kirsehir futbol spor kulubu": "Kırşehir FSK",
  "kirsehir f.s.k.": "Kırşehir FSK",
  "kirsehir bld": "Kırşehir FSK",
  "kirsehir": "Kırşehir FSK",

  "malatya yesilyurtspor": "Malatya Yeşilyurtspor",
  "yesilyurtspor": "Malatya Yeşilyurtspor",
  "malatya yesilyurt": "Malatya Yeşilyurtspor",
  "yesilyurt bld": "Malatya Yeşilyurtspor",
  "yesilyurt belediyespor": "Malatya Yeşilyurtspor",

  "nigde bld": "Niğde Bld",
  "nigde bld.": "Niğde Bld",
  "nigde belediyespor": "Niğde Bld",
  "nigde belediye spor": "Niğde Bld",
  "nigdespor": "Niğde Bld",

  "osmaniyespor": "Osmaniyespor",
  "osmaniyespor fk": "Osmaniyespor",
  "osmaniye fk": "Osmaniyespor",
  "osmaniye spor": "Osmaniyespor",

  "1964 silifkespor": "1964 Silifkespor",
  "silifke bld": "1964 Silifkespor",
  "silifke belediyespor": "1964 Silifkespor",
  "silifkespor": "1964 Silifkespor",
  "silifke spor": "1964 Silifkespor",
  "1964 silifke spor": "1964 Silifkespor",

  "adana adaletgucuspor": "Adana Adaletgücüspor",
  "adana adalet": "Adana Adaletgücüspor",
  "adana 1954 fk": "Adana Adaletgücüspor",
  "adaletgucuspor": "Adana Adaletgücüspor",
  "adana adalet gucu": "Adana Adaletgücüspor",

  "yeni malatyaspor": "Yeni Malatyaspor",
  "yeni malatya spor": "Yeni Malatyaspor",
  "yeni malatya": "Yeni Malatyaspor",

  "yeni mersin idmanyurdu": "Yeni Mersin İdmanyurdu",
  "yeni mersin idman yurdu": "Yeni Mersin İdmanyurdu",
  "turkish oil yeni mersin iy": "Yeni Mersin İdmanyurdu",
  "yeni mersin i.y.": "Yeni Mersin İdmanyurdu",
  "yeni mersin iy": "Yeni Mersin İdmanyurdu",
  "mersin idmanyurdu": "Yeni Mersin İdmanyurdu",

  "yozgat belediyesi bozokspor": "Yozgat Belediyesi Bozokspor",
  "yozgat belediye bozokspor": "Yozgat Belediyesi Bozokspor",
  "yozgat bl bozok": "Yozgat Belediyesi Bozokspor",
  "yozgat bozokspor": "Yozgat Belediyesi Bozokspor",
  "bozokspor": "Yozgat Belediyesi Bozokspor"
};

// Build a secondary map indexed by normalized keys for rapid, foolproof matching
const NORMALIZED_LOOKUP: Map<string, string> = new Map();
Object.entries(CANONICAL_TEAM_OVERRIDES).forEach(([k, v]) => {
  NORMALIZED_LOOKUP.set(normalizeKey(k), v);
});

// Also register the exact canonical names themselves
[
  ...LEAGUE_2_BEYAZ,
  ...LEAGUE_2_KIRMIZI,
  ...LEAGUE_3_GROUP_1,
  ...LEAGUE_3_GROUP_2,
  ...LEAGUE_3_GROUP_3
].forEach((canonical) => {
  NORMALIZED_LOOKUP.set(normalizeKey(canonical), canonical);
});

/**
 * Returns the permanent canonical name for any given input string if defined.
 * If not matched, returns the trimmed raw input.
 */
export function getCanonicalTeamName(rawName: string): string {
  if (!rawName) return "";
  const trimmed = rawName.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct lowercase lookup
  if (CANONICAL_TEAM_OVERRIDES[lower]) {
    return CANONICAL_TEAM_OVERRIDES[lower];
  }

  // 2. Normalized alphanumeric key lookup
  const norm = normalizeKey(trimmed);
  if (NORMALIZED_LOOKUP.has(norm)) {
    return NORMALIZED_LOOKUP.get(norm)!;
  }

  // 3. Substring / partial word boundary match
  for (const [key, canonical] of Object.entries(CANONICAL_TEAM_OVERRIDES)) {
    const normKey = normalizeKey(key);
    if (normKey.length >= 5 && (norm.includes(normKey) || normKey.includes(norm))) {
      return canonical;
    }
  }

  return trimmed;
}

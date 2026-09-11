/**
 * Türkiye Futbol Ligleri (Trendyol 1. Lig, Nesine 2. Lig, Nesine 3. Lig)
 * Doğrulanmış Kulüp IDleri, Özel Logolar ve Mackolik CDN Logo Veritabanı
 */

export interface TeamLogoEntry {
  id: number;
  name: string;
  shortName?: string;
  logo: string;
}

const mackolikLogo = (id: number) => `https://file.mackolikfeeds.com/teams/${id}?w=s`;

export const TURKISH_TEAMS_DATABASE: Record<string, TeamLogoEntry> = {
  // === Nesine 2. Lig - Beyaz Grup ===
  "68 aksaray bld": { id: 11998, name: "68 Aksaray Bld", logo: "/teams/aksarayspor.png" },
  "68 aksaray": { id: 11998, name: "68 Aksaray Bld", logo: "/teams/aksarayspor.png" },
  "aksarayspor": { id: 11998, name: "Aksarayspor", logo: "/teams/aksarayspor.png" },
  "68 aksaray belediyespor": { id: 11998, name: "68 Aksaray Bld", logo: "/teams/aksarayspor.png" },
  "68 aksaray belediye spor": { id: 11998, name: "68 Aksaray Bld", logo: "/teams/aksarayspor.png" },
  "aliaga fk": { id: 39461, name: "Aliağa FK", logo: mackolikLogo(39461) },
  "aliaga futbol": { id: 39461, name: "Aliağa FK", logo: mackolikLogo(39461) },
  "aliaga futbol a s": { id: 39461, name: "Aliağa FK", logo: mackolikLogo(39461) },
  "aliaga": { id: 39461, name: "Aliağa FK", logo: mackolikLogo(39461) },
  "ankaraspor": { id: 2232, name: "Ankaraspor", logo: "/teams/ankaraspor.png" },
  "sincan belediyesi ankaraspor": { id: 2232, name: "Ankaraspor", logo: "/teams/ankaraspor.png" },
  "sincan bld ankaraspor": { id: 2232, name: "Ankaraspor", logo: "/teams/ankaraspor.png" },
  "arnavutkoy bld": { id: 41558, name: "Arnavutköy Bld", logo: "/teams/arnavutkoy-bld.png" },
  "arnavutkoy belediyespor": { id: 41558, name: "Arnavutköy Bld", logo: "/teams/arnavutkoy-bld.png" },
  "arnavutkoy": { id: 41558, name: "Arnavutköy Bld", logo: "/teams/arnavutkoy-bld.png" },
  "arkent arnavutkoy": { id: 41558, name: "Arnavutköy Bld", logo: "/teams/arnavutkoy-bld.png" },
  "arkent arnavutkoy belediyesi futbol sk": { id: 41558, name: "Arnavutköy Bld", logo: "/teams/arnavutkoy-bld.png" },
  "corluspor 1947": { id: 39511, name: "Çorluspor 1947", logo: mackolikLogo(39511) },
  "corlu spor 1947": { id: 39511, name: "Çorluspor 1947", logo: mackolikLogo(39511) },
  "erbaaspor": { id: 36654, name: "Erbaaspor", logo: mackolikLogo(36654) },
  "erbaa spor": { id: 36654, name: "Erbaaspor", logo: mackolikLogo(36654) },
  "efor cay erbaaspor": { id: 36654, name: "Erbaaspor", logo: mackolikLogo(36654) },
  "kastamonuspor": { id: 12009, name: "Kastamonuspor", logo: mackolikLogo(12009) },
  "gmg kastamonuspor": { id: 12009, name: "Kastamonuspor", logo: mackolikLogo(12009) },
  "gebzespor": { id: 40074, name: "Gebzespor", logo: "/teams/gebzespor.png" },
  "guzide gebze": { id: 40074, name: "Gebzespor", logo: "/teams/gebzespor.png" },
  "guzide gebzespor": { id: 40074, name: "Gebzespor", logo: "/teams/gebzespor.png" },
  "guzide gebze spor kulubu": { id: 40074, name: "Gebzespor", logo: "/teams/gebzespor.png" },
  "gebze": { id: 40074, name: "Gebzespor", logo: "/teams/gebzespor.png" },
  "isparta 32 spor": { id: 39439, name: "Isparta 32 Spor", logo: mackolikLogo(39439) },
  "isparta 32": { id: 39439, name: "Isparta 32 Spor", logo: mackolikLogo(39439) },
  "isbas isparta 32 spor kulubu": { id: 39439, name: "Isparta 32 Spor", logo: mackolikLogo(39439) },
  "inegol kafkasspor": { id: 53200, name: "İnegöl Kafkasspor", logo: mackolikLogo(53200) },
  "inegol kafkas": { id: 53200, name: "İnegöl Kafkasspor", logo: mackolikLogo(53200) },
  "inegol kafkas sk": { id: 53200, name: "İnegöl Kafkasspor", logo: mackolikLogo(53200) },
  "inegol kafkas spor kulubu": { id: 53200, name: "İnegöl Kafkasspor", logo: mackolikLogo(53200) },
  "sanliurfaspor": { id: 9166, name: "Şanlıurfaspor", logo: mackolikLogo(9166) },
  "kizilkaya tarim sanliurfaspor": { id: 9166, name: "Şanlıurfaspor", logo: mackolikLogo(9166) },
  "menemen fk": { id: 11992, name: "Menemen FK", logo: mackolikLogo(11992) },
  "menemen futbol kulubu": { id: 11992, name: "Menemen FK", logo: mackolikLogo(11992) },
  "menemenspor": { id: 11992, name: "Menemen FK", logo: mackolikLogo(11992) },
  "musspor": { id: 44752, name: "Muşspor", logo: mackolikLogo(44752) },
  "mus spor": { id: 44752, name: "Muşspor", logo: mackolikLogo(44752) },
  "mus spor kulubu": { id: 44752, name: "Muşspor", logo: mackolikLogo(44752) },
  "sebatspor": { id: 54017, name: "Sebatspor", logo: mackolikLogo(54017) },
  "sebat": { id: 54017, name: "Sebatspor", logo: mackolikLogo(54017) },
  "sebat genclikspor": { id: 54017, name: "Sebatspor", logo: mackolikLogo(54017) },
  "sebat spor kulubu": { id: 54017, name: "Sebatspor", logo: mackolikLogo(54017) },
  "elazigspor": { id: 2228, name: "Elazığspor", logo: mackolikLogo(2228) },
  "cimentas elazigspor": { id: 2228, name: "Elazığspor", logo: mackolikLogo(2228) },
  "seza cimento elazigspor": { id: 2228, name: "Elazığspor", logo: mackolikLogo(2228) },
  "somaspor": { id: 39474, name: "Somaspor", logo: "/teams/somaspor.png" },
  "hatayspor": { id: 2883, name: "Hatayspor", logo: mackolikLogo(2883) },
  "adana demirspor": { id: 2348, name: "Adana Demirspor", logo: "/teams/adana-demirspor.png" },
  "adana demirspor a s": { id: 2348, name: "Adana Demirspor", logo: "/teams/adana-demirspor.png" },
  "adana demir": { id: 2348, name: "Adana Demirspor", logo: "/teams/adana-demirspor.png" },

  // === Nesine 2. Lig - Kırmızı Grup ===
  "12 bingolspor": { id: 31043, name: "12 Bingölspor", logo: mackolikLogo(31043) },
  "12 bingol spor": { id: 31043, name: "12 Bingölspor", logo: mackolikLogo(31043) },
  "12 bingol": { id: 31043, name: "12 Bingölspor", logo: mackolikLogo(31043) },
  "1461 trabzon fk": { id: 24813, name: "1461 Trabzon FK", logo: "/teams/1461-trabzon.png" },
  "1461 trabzon": { id: 24813, name: "1461 Trabzon FK", logo: "/teams/1461-trabzon.png" },
  "kct 1461 trabzon fk": { id: 24813, name: "1461 Trabzon FK", logo: "/teams/1461-trabzon.png" },
  "1461 trabzon futbol kulubu": { id: 24813, name: "1461 Trabzon FK", logo: "/teams/1461-trabzon.png" },
  "52 orduspor fk": { id: 39791, name: "52 Orduspor FK", logo: mackolikLogo(39791) },
  "52 orduspor": { id: 39791, name: "52 Orduspor FK", logo: mackolikLogo(39791) },
  "adana 01 fk": { id: 56993, name: "Adana 01 FK", logo: mackolikLogo(56993) },
  "adana 01": { id: 56993, name: "Adana 01 FK", logo: mackolikLogo(56993) },
  "adana 01 fk sk": { id: 56993, name: "Adana 01 FK", logo: mackolikLogo(56993) },
  "adana 01 futbol kulubu sk": { id: 56993, name: "Adana 01 FK", logo: mackolikLogo(56993) },
  "erzincanspor": { id: 9160, name: "Erzincanspor", logo: "/teams/erzincanspor.png" },
  "24 erzincanspor": { id: 9160, name: "Erzincanspor", logo: "/teams/erzincanspor.png" },
  "24erzincanspor": { id: 9160, name: "Erzincanspor", logo: "/teams/erzincanspor.png" },
  "erzincan": { id: 9160, name: "Erzincanspor", logo: "/teams/erzincanspor.png" },
  "erzincan futbol yatirimlari a s": { id: 9160, name: "Erzincanspor", logo: "/teams/erzincanspor.png" },
  "ankara demirspor": { id: 2245, name: "Ankara Demirspor", logo: mackolikLogo(2245) },
  "ankara demir": { id: 2245, name: "Ankara Demirspor", logo: mackolikLogo(2245) },
  "beyoglu yeni carsi": { id: 29063, name: "Beyoğlu Yeni Çarşı", logo: mackolikLogo(29063) },
  "beyoglu y carsi": { id: 29063, name: "Beyoğlu Yeni Çarşı", logo: mackolikLogo(29063) },
  "beyoglu yeni carsi spor faaliyetleri a s": { id: 29063, name: "Beyoğlu Yeni Çarşı", logo: mackolikLogo(29063) },
  "fethiyespor": { id: 9146, name: "Fethiyespor", logo: mackolikLogo(9146) },
  "iskenderunspor": { id: 29069, name: "İskenderunspor", logo: mackolikLogo(29069) },
  "iskenderunspor a s": { id: 29069, name: "İskenderunspor", logo: mackolikLogo(29069) },
  "kahramanmaras istiklalspor": { id: 60677, name: "Kahramanmaraş İstiklalspor", logo: mackolikLogo(60677) },
  "kahramanmaras istiklal": { id: 60677, name: "Kahramanmaraş İstiklalspor", logo: mackolikLogo(60677) },
  "akedas kahramanmaras istiklal spor": { id: 60677, name: "Kahramanmaraş İstiklalspor", logo: mackolikLogo(60677) },
  "karacabey belediyespor": { id: 11994, name: "Karacabey Belediyespor", logo: "/teams/karacabey-bld.png" },
  "karacabey belediye spor": { id: 11994, name: "Karacabey Belediyespor", logo: "/teams/karacabey-bld.png" },
  "karacabey belediye spor a s": { id: 11994, name: "Karacabey Belediyespor", logo: "/teams/karacabey-bld.png" },
  "karacabey": { id: 11994, name: "Karacabey Belediyespor", logo: "/teams/karacabey-bld.png" },
  "kirklarelispor": { id: 16471, name: "Kırklarelispor", logo: mackolikLogo(16471) },
  "kutahyaspor": { id: 22775, name: "Kütahyaspor", logo: "/teams/kutahyaspor.png" },
  "belediye kutahyaspor": { id: 22775, name: "Kütahyaspor", logo: "/teams/kutahyaspor.png" },
  "kutahyaspor futbol spor kulubu": { id: 22775, name: "Kütahyaspor", logo: "/teams/kutahyaspor.png" },
  "kutahya": { id: 22775, name: "Kütahyaspor", logo: "/teams/kutahyaspor.png" },
  "mke ankaragucu": { id: 2218, name: "Ankaragücü", logo: mackolikLogo(2218) },
  "ankaragucu": { id: 2218, name: "Ankaragücü", logo: mackolikLogo(2218) },
  "ankragucu": { id: 2218, name: "Ankaragücü", logo: mackolikLogo(2218) },
  "sakaryaspor": { id: 2230, name: "Sakaryaspor", logo: mackolikLogo(2230) },
  "sakaryaspor a s": { id: 2230, name: "Sakaryaspor", logo: mackolikLogo(2230) },
  "serikspor": { id: 25508, name: "Serikspor", logo: "/teams/serikspor.png" },
  "serik belediyespor": { id: 25508, name: "Serikspor", logo: "/teams/serikspor.png" },
  "serik spor futbol a s": { id: 25508, name: "Serikspor", logo: "/teams/serikspor.png" },
  "serik bld": { id: 25508, name: "Serikspor", logo: "/teams/serikspor.png" },
  "serik": { id: 25508, name: "Serikspor", logo: "/teams/serikspor.png" },
  "inegolspor": { id: 6039, name: "İnegölspor", logo: mackolikLogo(6039) },
  "sultan su inegolspor": { id: 6039, name: "İnegölspor", logo: mackolikLogo(6039) },

  // === Nesine 3. Lig - 1. Grup ===
  "amasyaspor": { id: 22789, name: "Amasyaspor", logo: mackolikLogo(22789) },
  "amasyaspor fk": { id: 22789, name: "Amasyaspor", logo: mackolikLogo(22789) },
  "beykoz anadoluspor": { id: 24815, name: "Beykoz Anadoluspor", logo: mackolikLogo(24815) },
  "beykoz anadolu spor": { id: 24815, name: "Beykoz Anadoluspor", logo: mackolikLogo(24815) },
  "beykoz anadolu spor a s": { id: 24815, name: "Beykoz Anadoluspor", logo: mackolikLogo(24815) },
  "beykoz ishaklispor": { id: 25330, name: "Beykoz İshaklıspor", logo: "/teams/beykoz-ishaklispor.png" },
  "beykoz ishakli spor": { id: 25330, name: "Beykoz İshaklıspor", logo: "/teams/beykoz-ishaklispor.png" },
  "beykoz ishakli spor faaliyetleri a s": { id: 25330, name: "Beykoz İshaklıspor", logo: "/teams/beykoz-ishaklispor.png" },
  "bulvarspor": { id: 53205, name: "Bulvarspor", logo: "/teams/bulvarspor.png" },
  "kartal bulvar kartalimen spor a s": { id: 53205, name: "Bulvarspor", logo: "/teams/bulvarspor.png" },
  "kartal bulvarspor": { id: 53205, name: "Bulvarspor", logo: "/teams/bulvarspor.png" },
  "kartal bulvar": { id: 53205, name: "Bulvarspor", logo: "/teams/bulvarspor.png" },
  "duzcespor": { id: 12000, name: "Düzcespor", logo: mackolikLogo(12000) },
  "duzce cam duzcespor": { id: 12000, name: "Düzcespor", logo: mackolikLogo(12000) },
  "fatsa belediyespor": { id: 39242, name: "Fatsa Belediyespor", logo: mackolikLogo(39242) },
  "fatsa bld": { id: 39242, name: "Fatsa Belediyespor", logo: mackolikLogo(39242) },
  "galataspor": { id: 40860, name: "Galataspor", logo: mackolikLogo(40860) },
  "galata spor": { id: 40860, name: "Galataspor", logo: mackolikLogo(40860) },
  "galata spor kulubu": { id: 40860, name: "Galataspor", logo: mackolikLogo(40860) },
  "galata": { id: 40860, name: "Galataspor", logo: mackolikLogo(40860) },
  "golcukspor": { id: 11869, name: "Gölcükspor", logo: mackolikLogo(11869) },
  "inkilap fk": { id: 63806, name: "İnkılap FK", logo: "/teams/inkilap-fk.png" },
  "inkilap fsk": { id: 63806, name: "İnkılap FK", logo: "/teams/inkilap-fk.png" },
  "inkilap futbol spor kulubu": { id: 63806, name: "İnkılap FK", logo: "/teams/inkilap-fk.png" },
  "inkilapspor": { id: 63806, name: "İnkılap FK", logo: "/teams/inkilap-fk.png" },
  "karabuk idmanyurdu": { id: 60509, name: "Karabük İdmanyurdu", logo: mackolikLogo(60509) },
  "karabuk idman yurdu": { id: 60509, name: "Karabük İdmanyurdu", logo: mackolikLogo(60509) },
  "karabuk idmanyurdu spor": { id: 60509, name: "Karabük İdmanyurdu", logo: mackolikLogo(60509) },
  "kdz eregli": { id: 39502, name: "Kdz.Ereğli", logo: mackolikLogo(39502) },
  "kdz eregli bld": { id: 39502, name: "Kdz.Ereğli", logo: mackolikLogo(39502) },
  "kdz eregli 1980": { id: 39502, name: "Kdz.Ereğli", logo: mackolikLogo(39502) },
  "kdz eregli 1980 spor kulubu": { id: 39502, name: "Kdz.Ereğli", logo: mackolikLogo(39502) },
  "kucukcekmece sinopspor": { id: 53194, name: "Küçükçekmece Sinopspor", logo: mackolikLogo(53194) },
  "kucukcekmece sinop spor": { id: 53194, name: "Küçükçekmece Sinopspor", logo: mackolikLogo(53194) },
  "kucukcekmece sinop spor a s": { id: 53194, name: "Küçükçekmece Sinopspor", logo: mackolikLogo(53194) },
  "orduspor 1967": { id: 54016, name: "Orduspor 1967", logo: mackolikLogo(54016) },
  "orduspor 1967 a s": { id: 54016, name: "Orduspor 1967", logo: mackolikLogo(54016) },
  "pazarspor": { id: 6044, name: "Pazarspor", logo: mackolikLogo(6044) },
  "silivrispor": { id: 21771, name: "Silivrispor", logo: mackolikLogo(21771) },
  "tokat bld": { id: 60517, name: "Tokat Bld", logo: "/teams/tokat-belediye.png" },
  "tokat belediye spor kulubu": { id: 60517, name: "Tokat Bld", logo: "/teams/tokat-belediye.png" },
  "tokat belediye plevne": { id: 60517, name: "Tokat Bld", logo: "/teams/tokat-belediye.png" },
  "tokat belediye plevnespor": { id: 60517, name: "Tokat Bld", logo: "/teams/tokat-belediye.png" },
  "tokat belediyespor": { id: 60517, name: "Tokat Bld", logo: "/teams/tokat-belediye.png" },
  "yalova fk": { id: 63802, name: "Yalova FK", logo: mackolikLogo(63802) },
  "yalova fk 77": { id: 63802, name: "Yalova FK", logo: mackolikLogo(63802) },
  "yalova fk 77 spor kulubu": { id: 63802, name: "Yalova FK", logo: mackolikLogo(63802) },
  "zonguldakspor": { id: 24823, name: "Zonguldakspor", logo: "/teams/zonguldakspor.png" },
  "zonguldak komurspor": { id: 24823, name: "Zonguldakspor", logo: "/teams/zonguldakspor.png" },
  "zonguldak spor fk": { id: 24823, name: "Zonguldakspor", logo: "/teams/zonguldakspor.png" },
  "zonguldak spor futbol kulubu a s": { id: 24823, name: "Zonguldakspor", logo: "/teams/zonguldakspor.png" },

  // === Nesine 3. Lig - 2. Grup ===
  "bursa yildirimspor": { id: 45024, name: "Bursa Yıldırımspor", logo: mackolikLogo(45024) },
  "bursa yildirim sk": { id: 45024, name: "Bursa Yıldırımspor", logo: mackolikLogo(45024) },
  "bursa yildirim": { id: 45024, name: "Bursa Yıldırımspor", logo: mackolikLogo(45024) },
  "bursa yildirim spor kulubu": { id: 45024, name: "Bursa Yıldırımspor", logo: mackolikLogo(45024) },
  "1922 aksehirspor": { id: 39446, name: "1922 Akşehirspor", logo: mackolikLogo(39446) },
  "1922 aksehir": { id: 39446, name: "1922 Akşehirspor", logo: mackolikLogo(39446) },
  "1922 aksehir spor kulubu": { id: 39446, name: "1922 Akşehirspor", logo: mackolikLogo(39446) },
  "alanya 1221": { id: 48749, name: "Alanya 1221", logo: mackolikLogo(48749) },
  "alanya 1221 fk": { id: 48749, name: "Alanya 1221", logo: mackolikLogo(48749) },
  "alanya 1221 futbol spor kulubu": { id: 48749, name: "Alanya 1221", logo: mackolikLogo(48749) },
  "altay": { id: 2239, name: "Altay", logo: mackolikLogo(2239) },
  "ayvalikgucu belediyespor": { id: 24814, name: "Ayvalıkgücü Belediyespor", logo: mackolikLogo(24814) },
  "ayvalikgucu bld": { id: 24814, name: "Ayvalıkgücü Belediyespor", logo: mackolikLogo(24814) },
  "ayvalikgucu": { id: 24814, name: "Ayvalıkgücü Belediyespor", logo: mackolikLogo(24814) },
  "balikesirspor": { id: 11985, name: "Balıkesirspor", logo: mackolikLogo(11985) },
  "bigaspor": { id: 40312, name: "Bigaspor", logo: mackolikLogo(40312) },
  "bucaspor 1928": { id: 29059, name: "Bucaspor 1928", logo: mackolikLogo(29059) },
  "denizli idmanyurdu": { id: 2215, name: "Denizli İdmanyurdu", logo: "/teams/denizli-idmanyurdu.png" },
  "denizli idmanyurdu 1959": { id: 2215, name: "Denizli İdmanyurdu", logo: "/teams/denizli-idmanyurdu.png" },
  "denizli idmanyurdu 1959 spor kulubu": { id: 2215, name: "Denizli İdmanyurdu", logo: "/teams/denizli-idmanyurdu.png" },
  "denizli idman yurdu": { id: 2215, name: "Denizli İdmanyurdu", logo: "/teams/denizli-idmanyurdu.png" },
  "denizli idman yurdu 1959": { id: 2215, name: "Denizli İdmanyurdu", logo: "/teams/denizli-idmanyurdu.png" },
  "denizli idman yurdu 1959 sk": { id: 2215, name: "Denizli İdmanyurdu", logo: "/teams/denizli-idmanyurdu.png" },
  "eskisehir anadoluspor": { id: 40069, name: "Eskişehir Anadoluspor", logo: mackolikLogo(40069) },
  "eskisehir anadolu": { id: 40069, name: "Eskişehir Anadoluspor", logo: mackolikLogo(40069) },
  "eskisehir anadolu spor faaliyetleri a s": { id: 40069, name: "Eskişehir Anadoluspor", logo: mackolikLogo(40069) },
  "eskisehirspor": { id: 2347, name: "Eskişehirspor", logo: mackolikLogo(2347) },
  "eskisehirspor kulubu": { id: 2347, name: "Eskişehirspor", logo: mackolikLogo(2347) },
  "etimesgutspor": { id: 29067, name: "Etimesgutspor", logo: mackolikLogo(29067) },
  "etimesgut belediyespor": { id: 29067, name: "Etimesgutspor", logo: mackolikLogo(29067) },
  "etimesgut bld": { id: 29067, name: "Etimesgutspor", logo: mackolikLogo(29067) },
  "etimesgut spor kulubu": { id: 29067, name: "Etimesgutspor", logo: mackolikLogo(29067) },
  "gaziemir gsk": { id: 57043, name: "Gaziemir GSK", logo: mackolikLogo(57043) },
  "gaziemir gog spor": { id: 57043, name: "Gaziemir GSK", logo: mackolikLogo(57043) },
  "gaziemir g o g spor yat a s": { id: 57043, name: "Gaziemir GSK", logo: mackolikLogo(57043) },
  "gemlik sumerbey fk": { id: 53209, name: "Gemlik Sümerbey FK", logo: "/teams/gemlik-sumerbey.png" },
  "gemlik sumerbey": { id: 53209, name: "Gemlik Sümerbey FK", logo: "/teams/gemlik-sumerbey.png" },
  "gemlik sumerbey futbol spor a s": { id: 53209, name: "Gemlik Sümerbey FK", logo: "/teams/gemlik-sumerbey.png" },
  "gemlik sumer bey": { id: 53209, name: "Gemlik Sümerbey FK", logo: "/teams/gemlik-sumerbey.png" },
  "gemlik sumer bey fk": { id: 53209, name: "Gemlik Sümerbey FK", logo: "/teams/gemlik-sumerbey.png" },
  "gemlik sumerbey fsk": { id: 53209, name: "Gemlik Sümerbey FK", logo: "/teams/gemlik-sumerbey.png" },
  "karsiyaka": { id: 2241, name: "Karşıyaka", logo: mackolikLogo(2241) },
  "kepezspor": { id: 16480, name: "Kepezspor", logo: mackolikLogo(16480) },
  "kepez spor": { id: 16480, name: "Kepezspor", logo: mackolikLogo(16480) },
  "kepez spor futbol a s": { id: 16480, name: "Kepezspor", logo: mackolikLogo(16480) },
  "usakspor": { id: 25496, name: "Uşakspor", logo: mackolikLogo(25496) },
  "usak spor a s": { id: 25496, name: "Uşakspor", logo: mackolikLogo(25496) },
  "soke 1970 spor": { id: 53223, name: "Söke 1970 Spor", logo: mackolikLogo(53223) },
  "soke 1970": { id: 53223, name: "Söke 1970 Spor", logo: mackolikLogo(53223) },
  "soke 1970 spor kulubu": { id: 53223, name: "Söke 1970 Spor", logo: mackolikLogo(53223) },

  // === Nesine 3. Lig - 3. Grup ===
  "adanaspor": { id: 2229, name: "Adanaspor", logo: mackolikLogo(2229) },
  "adanaspor a s": { id: 2229, name: "Adanaspor", logo: mackolikLogo(2229) },
  "agri 1970 spor": { id: 44789, name: "Ağrı 1970 Spor", logo: mackolikLogo(44789) },
  "agri 1970": { id: 44789, name: "Ağrı 1970 Spor", logo: mackolikLogo(44789) },
  "agri 1970 spor kulubu": { id: 44789, name: "Ağrı 1970 Spor", logo: mackolikLogo(44789) },
  "bitlisspor 1916": { id: 44783, name: "Bitlisspor 1916", logo: mackolikLogo(44783) },
  "bitlis 1916": { id: 44783, name: "Bitlisspor 1916", logo: mackolikLogo(44783) },
  "bitlis 1916 futbol spor kulubu": { id: 44783, name: "Bitlisspor 1916", logo: mackolikLogo(44783) },
  "diyarbekirspor": { id: 25505, name: "Diyarbekirspor", logo: mackolikLogo(25505) },
  "diyarbekir spor": { id: 25505, name: "Diyarbekirspor", logo: mackolikLogo(25505) },
  "diyarbekir spor a s": { id: 25505, name: "Diyarbekirspor", logo: mackolikLogo(25505) },
  "erciyes 38 fsk": { id: 39389, name: "Erciyes 38 FSK", logo: mackolikLogo(39389) },
  "acikalin erciyes 38 futbol spor kulubu": { id: 39389, name: "Erciyes 38 FSK", logo: mackolikLogo(39389) },
  "mazidagi fosfatspor": { id: 54023, name: "Mazıdağı Fosfatspor", logo: mackolikLogo(54023) },
  "mazidagi fosfat spor": { id: 54023, name: "Mazıdağı Fosfatspor", logo: mackolikLogo(54023) },
  "eti gubre mazidagi fosfat spor": { id: 54023, name: "Mazıdağı Fosfatspor", logo: mackolikLogo(54023) },
  "karakopru belediyespor": { id: 39096, name: "Karaköprü Belediyespor", logo: mackolikLogo(39096) },
  "karakopru bld": { id: 39096, name: "Karaköprü Belediyespor", logo: mackolikLogo(39096) },
  "halil bayram insaat karakopru belediyespor": { id: 39096, name: "Karaköprü Belediyespor", logo: mackolikLogo(39096) },
  "karaman fk": { id: 39493, name: "Karaman FK", logo: mackolikLogo(39493) },
  "karaman futbol kulubu": { id: 39493, name: "Karaman FK", logo: mackolikLogo(39493) },
  "kirikkale fk": { id: 34701, name: "Kırıkkale FK", logo: mackolikLogo(34701) },
  "kirikkale fk spor kulubu": { id: 34701, name: "Kırıkkale FK", logo: mackolikLogo(34701) },
  "kirsehir fsk": { id: 29068, name: "Kırşehir FSK", logo: "/teams/kirsehir-fsk.png" },
  "kirsehir fk": { id: 29068, name: "Kırşehir FSK", logo: "/teams/kirsehir-fsk.png" },
  "ejderoglu kirsehir futbol spor kulubu": { id: 29068, name: "Kırşehir FSK", logo: "/teams/kirsehir-fsk.png" },
  "kirsehir futbol spor kulubu": { id: 29068, name: "Kırşehir FSK", logo: "/teams/kirsehir-fsk.png" },
  "kirsehir belediyespor": { id: 29068, name: "Kırşehir FSK", logo: "/teams/kirsehir-fsk.png" },
  "kirsehirspor": { id: 29068, name: "Kırşehir FSK", logo: "/teams/kirsehir-fsk.png" },
  "kirsehir": { id: 29068, name: "Kırşehir FSK", logo: "/teams/kirsehir-fsk.png" },
  "malatya yesilyurtspor": { id: 39098, name: "Malatya Yeşilyurtspor", logo: "/teams/malatya-yesilyurtspor.png" },
  "malatya yesilyurt sk": { id: 39098, name: "Malatya Yeşilyurtspor", logo: "/teams/malatya-yesilyurtspor.png" },
  "yesilyurtspor": { id: 39098, name: "Malatya Yeşilyurtspor", logo: "/teams/malatya-yesilyurtspor.png" },
  "malatya yesilyurt spor kulubu": { id: 39098, name: "Malatya Yeşilyurtspor", logo: "/teams/malatya-yesilyurtspor.png" },
  "malatya yesilyurt belediyespor": { id: 39098, name: "Malatya Yeşilyurtspor", logo: "/teams/malatya-yesilyurtspor.png" },
  "yesilyurt belediyespor": { id: 39098, name: "Malatya Yeşilyurtspor", logo: "/teams/malatya-yesilyurtspor.png" },
  "malatya yesilyurt spor": { id: 39098, name: "Malatya Yeşilyurtspor", logo: "/teams/malatya-yesilyurtspor.png" },
  "nigde bld": { id: 25499, name: "Niğde Bld", logo: "/teams/nigde-belediyespor.png" },
  "nigde belediyespor": { id: 25499, name: "Niğde Bld", logo: "/teams/nigde-belediyespor.png" },
  "nigde belediyesi spor": { id: 25499, name: "Niğde Bld", logo: "/teams/nigde-belediyespor.png" },
  "nigde belediye": { id: 25499, name: "Niğde Bld", logo: "/teams/nigde-belediyespor.png" },
  "nigde": { id: 25499, name: "Niğde Bld", logo: "/teams/nigde-belediyespor.png" },
  "osmaniyespor": { id: 25501, name: "Osmaniyespor", logo: mackolikLogo(25501) },
  "osmaniyespor fk": { id: 25501, name: "Osmaniyespor", logo: mackolikLogo(25501) },
  "ayos osmaniyespor futbol kulubu": { id: 25501, name: "Osmaniyespor", logo: mackolikLogo(25501) },
  "1964 silifkespor": { id: 53227, name: "Silifke Belediyespor", logo: "/teams/silifkespor.png" },
  "silifke belediyespor": { id: 53227, name: "Silifke Belediyespor", logo: "/teams/silifkespor.png" },
  "1964 silifke spor kulubu": { id: 53227, name: "Silifke Belediyespor", logo: "/teams/silifkespor.png" },
  "silifkespor": { id: 53227, name: "Silifke Belediyespor", logo: "/teams/silifkespor.png" },
  "silifke spor": { id: 53227, name: "Silifke Belediyespor", logo: "/teams/silifkespor.png" },
  "silifke": { id: 53227, name: "Silifke Belediyespor", logo: "/teams/silifkespor.png" },
  "adana adaletgucu": { id: 66811, name: "Adana Adaletgücü", logo: mackolikLogo(66811) },
  "adana adaletgucuspor": { id: 66811, name: "Adana Adaletgücü", logo: mackolikLogo(66811) },
  "adana adaletgucu spor sportif faaliyetler a s": { id: 66811, name: "Adana Adaletgücü", logo: mackolikLogo(66811) },
  "yaz sigorta adaletgucu": { id: 66811, name: "Adana Adaletgücü", logo: mackolikLogo(66811) },
  "yeni malatyaspor": { id: 11710, name: "Yeni Malatyaspor", logo: mackolikLogo(11710) },
  "yeni mersin idmanyurdu": { id: 2244, name: "Yeni Mersin İdmanyurdu", logo: "/teams/yeni-mersin-iy.png" },
  "mersin idmanyurdu": { id: 2244, name: "Yeni Mersin İdmanyurdu", logo: "/teams/yeni-mersin-iy.png" },
  "yeni mersin idmanyurdu futbol a s": { id: 2244, name: "Yeni Mersin İdmanyurdu", logo: "/teams/yeni-mersin-iy.png" },
  "yozgat bld bozokspor": { id: 44778, name: "Yozgat Bld Bozokspor", logo: "/teams/yozgat-bozokspor.png" },
  "yozgat belediyesi bozokspor": { id: 44778, name: "Yozgat Bld Bozokspor", logo: "/teams/yozgat-bozokspor.png" },
  "yozgat bozokspor": { id: 44778, name: "Yozgat Bld Bozokspor", logo: "/teams/yozgat-bozokspor.png" },
  "yozgat belediyesi bozok spor": { id: 44778, name: "Yozgat Bld Bozokspor", logo: "/teams/yozgat-bozokspor.png" },
  "yozgat bozok": { id: 44778, name: "Yozgat Bld Bozokspor", logo: "/teams/yozgat-bozokspor.png" },
  "yozgat": { id: 44778, name: "Yozgat Bld Bozokspor", logo: "/teams/yozgat-bozokspor.png" },

  // === Diğer Ligler ve Takımlar ===
  "altinordu": { id: 11704, name: "Altınordu", logo: mackolikLogo(11704) },
  "antalyaspor": { id: 2236, name: "Antalyaspor", logo: mackolikLogo(2236) },
  "bandirmaspor": { id: 11986, name: "Bandırmaspor", logo: mackolikLogo(11986) },
  "batman petrolspor": { id: 2887, name: "Batman Petrolspor", logo: mackolikLogo(2887) },
  "bodrum fk": { id: 34119, name: "Bodrum FK", logo: mackolikLogo(34119) },
  "boluspor": { id: 8604, name: "Boluspor", logo: mackolikLogo(8604) },
  "bursaspor": { id: 2227, name: "Bursaspor", logo: mackolikLogo(2227) },
  "esenler erokspor": { id: 39486, name: "Esenler Erokspor", logo: mackolikLogo(39486) },
  "f karagumruk": { id: 3014, name: "F. Karagümrük", logo: mackolikLogo(3014) },
  "igdir fk": { id: 54027, name: "Iğdır FK", logo: mackolikLogo(54027) },
  "kayserispor": { id: 2235, name: "Kayserispor", logo: mackolikLogo(2235) },
  "keciorengucu": { id: 7284, name: "Keçiörengücü", logo: mackolikLogo(7284) },
  "manisa fk": { id: 34120, name: "Manisa FK", logo: mackolikLogo(34120) },
  "mardin 1969 spor": { id: 44751, name: "Mardin 1969 Spor", logo: mackolikLogo(44751) },
  "muglaspor": { id: 14051, name: "Muğlaspor", logo: mackolikLogo(14051) },
  "pendikspor": { id: 9153, name: "Pendikspor", logo: mackolikLogo(9153) },
  "sariyer": { id: 2344, name: "Sarıyer", logo: mackolikLogo(2344) },
  "sivasspor": { id: 2238, name: "Sivasspor", logo: mackolikLogo(2238) },
  "vanspor fk": { id: 2346, name: "Vanspor FK", logo: mackolikLogo(2346) },
  "umraniyespor": { id: 19664, name: "Ümraniyespor", logo: mackolikLogo(19664) },
  "istanbulspor": { id: 2226, name: "İstanbulspor", logo: mackolikLogo(2226) },
};

export function normalizeTeamKey(name: string): string {
  if (!name) return "";
  return name
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/ı/g, "i")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Remove corporate suffixes, legal acronyms, sponsor words
 */
export function cleanTeamKey(name: string): string {
  const norm = normalizeTeamKey(name);
  return norm
    .replace(/\b(a s|as|sk|fk|fsk|bld|belediye|belediyesi|futbol|spor|kulubu|kulub|yatirimlari|faaliyetleri|tarim|insaat|cimento|holding|sanayi|ticaret|grup)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findAuthenticTeamLogo(teamName: string, existingId?: number, existingLogo?: string): string {
  const norm = normalizeTeamKey(teamName);

  // 1. Doğrulanmış yerel resmi kulüp logoları (kullanıcı istekleri ve güncel amblemler)
  if (norm.includes("soma") || existingId === 39474) {
    return "/teams/somaspor.png";
  }
  if (norm.includes("ankaraspor") || norm.includes("sincan bld") || existingId === 2232) {
    return "/teams/ankaraspor.png";
  }
  if (norm.includes("gebze") || existingId === 40074) {
    return "/teams/gebzespor.png";
  }
  if (norm.includes("adana demir") || existingId === 2348) {
    return "/teams/adana-demirspor.png";
  }
  if (norm.includes("aksaray") || existingId === 11998) {
    return "/teams/aksarayspor.png";
  }
  if (norm.includes("arnavutkoy") || existingId === 41558) {
    return "/teams/arnavutkoy-bld.png";
  }
  if (norm.includes("erzincan") || existingId === 9160) {
    return "/teams/erzincanspor.png";
  }
  if (norm.includes("serik") || existingId === 25508) {
    return "/teams/serikspor.png";
  }
  if (norm.includes("karacabey") || existingId === 11994) {
    return "/teams/karacabey-bld.png";
  }
  if (norm.includes("kutahya") || existingId === 22775) {
    return "/teams/kutahyaspor.png";
  }
  if (norm.includes("1461 trabzon") || existingId === 24813) {
    return "/teams/1461-trabzon.png";
  }
  if (norm.includes("tokat") || existingId === 60517) {
    return "/teams/tokat-belediye.png";
  }
  if (norm.includes("inkilap") || existingId === 63806) {
    return "/teams/inkilap-fk.png";
  }
  if (norm.includes("zonguldak") || existingId === 24823) {
    return "/teams/zonguldakspor.png";
  }
  if (norm.includes("bulvar") || existingId === 53205) {
    return "/teams/bulvarspor.png";
  }
  if (norm.includes("gemlik") || norm.includes("sumerbey") || existingId === 53209) {
    return "/teams/gemlik-sumerbey.png";
  }
  if (norm.includes("denizli idman") || (norm.includes("denizli") && norm.includes("yurdu")) || existingId === 2215) {
    return "/teams/denizli-idmanyurdu.png";
  }
  if (norm.includes("nigde") || existingId === 25499) {
    return "/teams/nigde-belediyespor.png";
  }
  if (norm.includes("bozok") || norm.includes("yozgat") || existingId === 44778) {
    return "/teams/yozgat-bozokspor.png";
  }
  if (norm.includes("silifke") || existingId === 53227) {
    return "/teams/silifkespor.png";
  }
  if (norm.includes("yesilyurt") || existingId === 39098) {
    return "/teams/malatya-yesilyurtspor.png";
  }
  if (norm.includes("kirsehir") || existingId === 29068) {
    return "/teams/kirsehir-fsk.png";
  }
  if (norm.includes("ishakli") || existingId === 25330) {
    return "/teams/beykoz-ishaklispor.png";
  }
  if (norm.includes("mersin") || existingId === 2244) {
    return "/teams/yeni-mersin-iy.png";
  }

  // 2. Resolve team id
  const resolvedId = findAuthenticTeamId(teamName, existingId || 0);
  if (resolvedId > 0) {
    if (resolvedId === 39474) return "/teams/somaspor.png";
    if (resolvedId === 2232) return "/teams/ankaraspor.png";
    if (resolvedId === 40074) return "/teams/gebzespor.png";
    if (resolvedId === 2348) return "/teams/adana-demirspor.png";
    if (resolvedId === 11998) return "/teams/aksarayspor.png";
    if (resolvedId === 41558) return "/teams/arnavutkoy-bld.png";
    if (resolvedId === 9160) return "/teams/erzincanspor.png";
    if (resolvedId === 25508) return "/teams/serikspor.png";
    if (resolvedId === 11994) return "/teams/karacabey-bld.png";
    if (resolvedId === 22775) return "/teams/kutahyaspor.png";
    if (resolvedId === 24813) return "/teams/1461-trabzon.png";
    if (resolvedId === 60517) return "/teams/tokat-belediye.png";
    if (resolvedId === 63806) return "/teams/inkilap-fk.png";
    if (resolvedId === 24823) return "/teams/zonguldakspor.png";
    if (resolvedId === 53205) return "/teams/bulvarspor.png";
    if (resolvedId === 53209) return "/teams/gemlik-sumerbey.png";
    if (resolvedId === 2215) return "/teams/denizli-idmanyurdu.png";
    if (resolvedId === 25499) return "/teams/nigde-belediyespor.png";
    if (resolvedId === 44778) return "/teams/yozgat-bozokspor.png";
    if (resolvedId === 53227) return "/teams/silifkespor.png";
    if (resolvedId === 39098) return "/teams/malatya-yesilyurtspor.png";
    if (resolvedId === 29068) return "/teams/kirsehir-fsk.png";
    if (resolvedId === 25330) return "/teams/beykoz-ishaklispor.png";
    if (resolvedId === 2244) return "/teams/yeni-mersin-iy.png";

    const match = Object.values(TURKISH_TEAMS_DATABASE).find((e) => e.id === resolvedId);
    if (match && match.logo) return match.logo;
    return mackolikLogo(resolvedId);
  }

  if (existingLogo && existingLogo.trim().length > 0 && !existingLogo.includes("teams/0")) {
    return existingLogo;
  }
  return "";
}

export function findAuthenticTeamId(teamName: string, fallbackId: number = 0): number {
  if (!teamName) return fallbackId;
  const key = normalizeTeamKey(teamName);

  // Exact key match
  if (TURKISH_TEAMS_DATABASE[key]) {
    return TURKISH_TEAMS_DATABASE[key].id;
  }

  // Substring matching by longest key first
  const entries = Object.entries(TURKISH_TEAMS_DATABASE).sort((a, b) => b[0].length - a[0].length);
  for (const [dictKey, entry] of entries) {
    if (key === dictKey || key.includes(dictKey) || dictKey.includes(key)) {
      return entry.id;
    }
  }

  // Cleaned token matching (removes sponsor/corporate tokens)
  const cleaned = cleanTeamKey(teamName);
  if (cleaned.length >= 3) {
    for (const [dictKey, entry] of entries) {
      const dictClean = cleanTeamKey(dictKey);
      if (dictClean.length >= 3 && (cleaned === dictClean || cleaned.includes(dictClean) || dictClean.includes(cleaned))) {
        return entry.id;
      }
    }
  }

  return fallbackId;
}

/**
 * Returns the clean, standardized, user-specified display name for a team
 */
export function getAuthenticTeamName(teamName: string, teamId?: number): string {
  const norm = normalizeTeamKey(teamName);
  if (norm.includes("erzincan") || teamId === 9160) return "Erzincanspor";
  if (norm.includes("serik") || teamId === 25508) return "Serikspor";
  if (norm.includes("ishakli") || teamId === 25330) return "Beykoz İshaklıspor";
  if (norm.includes("mersin") || teamId === 2244) return "Yeni Mersin İdmanyurdu";
  if (norm.includes("yesilyurt") || teamId === 39098) return "Malatya Yeşilyurtspor";
  if (norm.includes("soma") || teamId === 39474) return "Somaspor";
  if (norm.includes("ankaraspor") || norm.includes("sincan bld") || teamId === 2232) return "Ankaraspor";
  if (norm.includes("gebze") || teamId === 40074) return "Gebzespor";
  if (norm.includes("kutahya") || teamId === 22775) return "Kütahyaspor";
  if (norm.includes("karacabey") || teamId === 11994) return "Karacabey Belediyespor";

  const resolvedId = findAuthenticTeamId(teamName, teamId || 0);
  if (resolvedId > 0) {
    const entry = Object.values(TURKISH_TEAMS_DATABASE).find((e) => e.id === resolvedId);
    if (entry && entry.name) {
      return entry.name;
    }
  }

  // Fallback: title-case the raw name if no database match
  return teamName
    .split(" ")
    .map((w) => (w.length > 1 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

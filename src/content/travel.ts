/**
 * Özel Keşif ve Seyahat Stüdyosu (Bespoke Expedition Travel)
 * Rotalar, Keşif Seferleri ve Saha Rehberliği Veritabanı
 *
 * Toplam: Tam 36 adet özel keşif ve yüksek dağ / vahşi doğa rotası.
 * Destekleyici İçerik: Keşif Liderleri & Rehberler, Kapsamlı Sefer Hazırlık Rehberi,
 * Dört Mevsim Sefer Takvimi ve İz Bırakma (Leave No Trace) Protokolü.
 */

import type { TravelJourney as CatalogTravelJourney, ExpeditionGuide as BaseExpeditionGuide } from './types';

export type JourneyCategory =
  | 'anadolu_ve_mezopotamya'
  | 'orta_asya_ve_kafkaslar'
  | 'arktik_ve_kutup_havzasi'
  | 'coller_ve_volkanik_vadiler'
  | 'himalayalar_ve_alp_masifleri'
  | 'okyanus_fiyortlari_ve_yagmur_ormanlari';

export type JourneyDifficulty = 'Kolay-Orta' | 'Orta' | 'Orta-Zor' | 'Zorlu' | 'Ekstrem';

export interface ExpeditionJourney {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  country: string;
  category: JourneyCategory;
  duration: {
    days: number;
    nights: number;
    text: string;
  };
  groupSize: {
    min: number;
    max: number;
    text: string;
  };
  difficulty: JourneyDifficulty;
  altitudeProfile: string;
  bestSeasons: string[];
  pricePerPerson: number;
  currency: string;
  displayPrice: string;
  overview: string;
  itinerarySummary: Array<{
    day: number | string;
    title: string;
    description: string;
  }>;
  included: string[];
  excluded: string[];
  gearRequirements: string[];
  imageUrl: string;
  alt: string;
  tags: string[];
}

export interface ExpeditionGuide {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  credentials: string[];
  bio: string;
  expeditionsLed: number;
  imageUrl: string;
  alt: string;
}

export interface PreparationSection {
  title: string;
  description: string;
  items: Array<{ heading: string; detail: string }>;
}

export interface SeasonalWindow {
  season: 'Bahar' | 'Yaz' | 'Güz' | 'Kış';
  months: string;
  focus: string;
  climateContext: string;
  featuredJourneys: string[];
}

export const JOURNEY_CATEGORIES: Array<{ key: JourneyCategory; label: string; description: string }> = [
  {
    key: 'anadolu_ve_mezopotamya',
    label: 'Anadolu & Yukarı Mezopotamya',
    description: 'Kaçkar zirvelerinden Toros göç yollarına, Tur Abdin manastırlarından Nemrut kraterine kadim hafıza rotaları.'
  },
  {
    key: 'orta_asya_ve_kafkaslar',
    label: 'Kafkaslar & Orta Asya Bozkırları',
    description: 'Svaneti taş kuleleri, Tiyenşan göçer yaylaları, Pamir Karayolu ve Moğolistan Altaylarında kartal avcıları izi.'
  },
  {
    key: 'arktik_ve_kutup_havzasi',
    label: 'Arktik & Kutup Havzası',
    description: 'Svalbard fiyortları, Doğu Grönland buz dağları, İzlanda kanyonları ve Kamçatka volkanlarında kutup seyrüseferi.'
  },
  {
    key: 'coller_ve_volkanik_vadiler',
    label: 'Çöller & Volkanik Havzalar',
    description: 'Atacama Altiplano lagünleri, Rubülhali kumulları, Namibya İskelet Sahili ve Danakil çöküntüsünde mineral coğrafyalar.'
  },
  {
    key: 'himalayalar_ve_alp_masifleri',
    label: 'Himalayalar & Alp Masifleri',
    description: 'Zanskar donmuş nehir yürüyüşü, Mustang Gizli Krallığı, Butan Druk Yolu ve Chamonix-Zermatt Haute Route geçişleri.'
  },
  {
    key: 'okyanus_fiyortlari_ve_yagmur_ormanlari',
    label: 'Okyanus Fiyortları & Yağmur Ormanları',
    description: 'Patagonya granit kuleleri, Kumano Kodo kutsal sedir patikaları, Madagaskar biyosferleri ve Azor krater gölleri.'
  }
];

export const EXPEDITION_JOURNEYS: ExpeditionJourney[] = [
  // --- 1. ANADOLU VE MEZOPOTAMYA (7 Rota) ---
  {
    id: 'exp-01',
    slug: 'kackar-buzul-golleri-ve-yayla-patikalari',
    title: 'Kaçkar Masifi, Buzul Gölleri ve Kadim Yayla Patikaları',
    subtitle: 'Çamlıhemşin vadilerinden Dilberdüzü ana kampına ve Kaçkar zirve sırtına yüksek Alpin geçiş',
    region: 'Doğu Karadeniz',
    country: 'Türkiye',
    category: 'anadolu_ve_mezopotamya',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta-Zor',
    altitudeProfile: '1.200 m (Pokut) - 3.937 m (Kaçkar Dağı Zirvesi)',
    bestSeasons: ['Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 2850,
    currency: 'EUR',
    displayPrice: '€2.850 / kişi başı',
    overview: 'Kaçkarların sis denizleriyle çevrili granit doruklarında, asırlık ahşap konak mimarisini buzul gölleriyle buluşturan dağcılık seferi. Fırtına Vadisi\'nin gür ormanlarından başlayarak Tatos gölleri, Denizgölü ve Naletleme Geçidi üzerinden güney yamaçlarına aşan, yayla etnografyası ve alpin botanik odaklı bir geçiş.',
    itinerarySummary: [
      { day: 1, title: 'Fırtına Vadisi & Çamlıhemşin', description: 'Trabzon\'dan vadi tabanına transfer, tarihi kemer köprüler ve asırlık kestane konaklarında hazırlık brifingi.' },
      { day: 2, title: 'Pokut ve Hazindak Yayla Sırtı', description: 'Bulut denizi üzerinde sedir ve ladin sınırında 6 saatlik yürüyüş; ahşap yayla mimarisi tahlili.' },
      { day: 3, title: 'Kavrun Vadisi & Mezovit Buzul Çanağı', description: 'Yukarı Kavrun\'dan granit kaya blokları arasına tırmanış; Mezovit buzul dili ve göl kenarı kampı.' },
      { day: 4, title: 'Naletleme Geçidi (3.220 m)', description: 'Rize yamaçlarından Artvin Yusufeli tarafına sert buzul döküntüleri (morain) üzerinden geçiş; Karadeniz Gölü kampı.' },
      { day: 5, title: 'Dilberdüzü Ana Kampı (2.900 m)', description: 'Güney rotası ana kampına intikal, yüksek irtifa aklimatizasyon yürüyüşü ve teknik krampon kontrolleri.' },
      { day: 6, title: 'Kaçkar Zirve Tırmanışı (3.937 m) & Denizgölü', description: 'Şafak öncesi 04:00 çıkışı, buzullu sırt hattından Türkiye\'nin en görkemli zirvesine ulaşım ve 360 derece Kafkas manzarası.' },
      { day: 7, title: 'Barhal Vadisi ve Gürcü Katedrali', description: 'Alpin çayırlardan Barhal\'a iniş; 10. yüzyıl taş kabartmalı Gürcü manastır mimarisi incelemesi.' },
      { day: 8, title: 'Artvin & Trabzon Dönüşü', description: 'Çoruh kanyonu üzerinden Trabzon\'a transfer ve sefer kapanış yemeği.' }
    ],
    included: ['IFMGA lisanslı baş dağ rehberi ve yerel botanik uzmanı', 'Tüm yayla konaklamaları ve dağ çadır kampları', 'Katır lojistiği (ana bagaj taşıma)', 'Tüm dağ beslenmesi ve şef yapımı yüksek irtifa kumanyaları', 'Kişisel uydu takip ve Garmin inReach acil güvencesi'],
    excluded: ['Trabzon gidiş-dönüş uçak biletleri', 'Kişisel teknik dağcılık giyimi (krampon galerimizce tahsis edilir)', 'Kişisel seyahat iptal sigortası'],
    gearRequirements: ['B2 tipi rijit dağcılık botu', 'Gore-Tex Pro 3 katmanlı fırtına ceketi', '-10°C konfor dereceli kaz tüyü uyku tulumu', 'Teleskopik baton takımı'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kaçkar Dağları buzul gölü ve sisli dağ sırtları yürüyüşçüler',
    tags: ['Yüksek İrtifa', 'Buzul Gölleri', 'Doğu Karadeniz', 'Zirve Seferi', 'Yayla Kültürü']
  },
  {
    id: 'exp-02',
    slug: 'toros-sedir-ormanlari-ve-yoruk-goc-yolu',
    title: 'Toros Sedir Ormanları, Karstik Mağaralar ve Yörük Göç Yolu',
    subtitle: 'Antalya Akseki taş evlerinden Barcın Yaylası\'na ve Geyik Dağları karstik platosuna',
    region: 'Batı & Orta Toroslar',
    country: 'Türkiye',
    category: 'anadolu_ve_mezopotamya',
    duration: { days: 7, nights: 6, text: '7 Gün / 6 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '750 m (Ormana) - 2.877 m (Geyik Dağı Geçidi)',
    bestSeasons: ['Mayıs', 'Haziran', 'Eylül', 'Ekim'],
    pricePerPerson: 2400,
    currency: 'EUR',
    displayPrice: '€2.400 / kişi başı',
    overview: 'Bin yıllık Toros sedir (Cedrus libani) anıt ormanlarının gölgesinde, Sarıkeçili Yörüklerinin son konar-göçer patikalarını takip eden etnografik dağ yürüyüşü. Düğmeli ev mimarisinin beşiği Ormana\'dan başlayarak Altınbeşik yer altı gölü kanyonu ve 2.500 metredeki karstik dolin tarlalarına uzanan derin bir Anadolu anlatısı.',
    itinerarySummary: [
      { day: 1, title: 'Ormana Köyü & Düğmeli Evler', description: 'Antalya havalimanından Akseki dağ yollarına intikal; harçsız ahşap karkas düğmeli evlerin mimari restorasyon atölyesi.' },
      { day: 2, title: 'Altınbeşik Mağarası & Manavgat Kanyonu', description: 'Dünyanın en büyük yeraltı göllerinden birinde bot keşfi; kanyon dik yarlarında yabani dağ keçisi gözlemi.' },
      { day: 3, title: 'Eynif Ovası & Tol Kervansarayı', description: 'Selçuklu kervan yollarında yabani yılkı atları sürülerinin izini sürme; kardelen soğanı endemik habitatı.' },
      { day: 4, title: 'Asırlık Sedir Anıt Ağaçları Tabiatı', description: 'Çığlıkara sedir rezervine tırmanış; 1.000 yaşını aşmış Koca Sedir altında orman ekolojisi dersi.' },
      { day: 5, title: 'Barcın Yaylası ve Yörük Kıl Çadırları', description: 'Konar-göçer Yörük aileleriyle buluşma; keçi sütü tulum peyniri yapımı ve göç destanları dinletisi.' },
      { day: 6, title: 'Geyik Dağları Karstik Dolin Geçişi', description: 'Kireçtaşı kanyon yarıkları ve buzul çağı karstik çukurluklarında 7 saatlik yüksek plato yürüyüşü.' },
      { day: 7, title: 'Alanya Sırtlarından Akdeniz\'e İniş', description: 'Dim Çayı kanyon vadisi üzerinden sahile iniş, Akdeniz narenciye bahçelerinde veda yemeği.' }
    ],
    included: ['Yörük kültürü uzmanı antropolog rehber', 'Geleneksel restore konak ve lüks kıl çadır kampları', '4x4 arazi destek araçları', 'Tüm yöresel gastronomik tadımlar ve dağ azıkları', 'Milli park özel araştırma izinleri'],
    excluded: ['Şehirlerarası ulaşım', 'Kişisel trekking ekipmanları', 'Bahşişler ve şahsi harcamalar'],
    gearRequirements: ['Bilek destekli sert tabanlı yürüyüş botu', 'UV korumalı geniş kenarlı şapka ve buhar geçirgen ceket', '25-30 litre günlük sırt çantası'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Toros Dağları sedir ağaçları ve kireçtaşı kanyon vadisi',
    tags: ['Etnografya', 'Toroslar', 'Yörük Kültürü', 'Sedir Ormanları', 'Karstik Jeoloji']
  },
  {
    id: 'exp-03',
    slug: 'kapadokya-vadi-kiliseleri-ve-yerbasyon-jeolojisi',
    title: 'Kapadokya Saklı Vadileri, Erken Bizans Kiliseleri ve Jeoloji',
    subtitle: 'Kızılçukur ve Zelve tüflerinden Gomeda kanyonuna ve Soğanlı vadi manastırlarına',
    region: 'İç Anadolu',
    country: 'Türkiye',
    category: 'anadolu_ve_mezopotamya',
    duration: { days: 5, nights: 4, text: '5 Gün / 4 Gece' },
    groupSize: { min: 4, max: 10, text: '4 - 10 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '950 m (Avanos) - 1.450 m (Uçhisar Kalesi)',
    bestSeasons: ['Nisan', 'Mayıs', 'Eylül', 'Ekim', 'Kasım'],
    pricePerPerson: 1950,
    currency: 'EUR',
    displayPrice: '€1.950 / kişi başı',
    overview: 'Erciyes ve Hasan Dağı volkanlarının kül katmanlarının milyonlarca yılda oyulmasıyla oluşan masalsı coğrafyada, kitle turizminin çok uzağında kalan derin kanyon yürüyüşü. İkonoklazm öncesi 6-9. yüzyıl kaya freskleri, yeraltı havalandırma bacaları ve güvercinlik mimarisini jeolojik katmanlarla okuyan uzman kılavuzluğunda bir rota.',
    itinerarySummary: [
      { day: 1, title: 'Göreme & Kızılçukur Gün Batımı Yarığı', description: 'Kayseri/Nevşehir karşılaması; demir oksit kırmızısı tüf sırtlarında gün batımı yürüyüşü ve volkanolojiye giriş.' },
      { day: 2, title: 'Güllüdere ve Haçlı Kilise Freskleri', description: 'Görünmeyen kaya kovuklarına gizlenmiş 9. yüzyıl erken Bizans fresklerinin sanat tarihçisiyle tahlili.' },
      { day: 3, title: 'Gomeda Kanyonu ve Üzengi Vadisi', description: 'Kavak ağaçları ve kükürtlü yeraltı suları boyunca 14 km kanyon yürüyüşü; devasa kaya güvercinlikleri.' },
      { day: 4, title: 'Soğanlı Vadisi & Tahtalı Kilise', description: 'Geleneksel bez bebek köyleri, kule tipi peribacaları ve turist kalabalığından tamamen yalıtılmış manastır kompleksi.' },
      { day: 5, title: 'Derinkuyu Derin Katmanları & Veda', description: '8 katlı yeraltı şehrinin mühendislik ve hava tünelleri keşfi; yöresel şarap mahzeninde kapanış tadımı.' }
    ],
    included: ['Bizans sanatı ve jeomorfoloji uzmanı rehber', 'Uçhisar\'da butik lüks kaya süit konaklaması', 'Özel müze ve kilitli şapel açılış izinleri', 'Yerel organik bağ boğazı ikramları ve gurme akşam yemekleri', 'Tüm saha içi VIP araç transferleri'],
    excluded: ['Balon uçuşu (talep üzerine opsiyonel rüzgar durumuna göre)', 'Havalimanı uçak biletleri'],
    gearRequirements: ['İyi tutunan tozluklu trekking ayakkabısı', 'Kafa feneri (kaya içi incelemeleri için 300+ lümen)', 'Nefes alabilir yürüyüş pantolonu'],
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kapadokya peri bacaları ve volkanik tüf vadileri gün doğumu',
    tags: ['Jeoloji', 'Kapadokya', 'Bizans Sanatı', 'Freskler', 'Kanyon Yürüyüşü']
  },
  {
    id: 'exp-04',
    slug: 'van-golu-urartu-kaleleri-ve-nemrut-krateri',
    title: 'Van Gölü Havzası, Urartu Kartal Kaleleri ve Nemrut Krateri',
    subtitle: 'Çavuştepe çivi yazılarından Akdamar rölöflerine ve Süphan eteği volkanik kraterine',
    region: 'Doğu Anadolu',
    country: 'Türkiye',
    category: 'anadolu_ve_mezopotamya',
    duration: { days: 6, nights: 5, text: '6 Gün / 5 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '1.640 m (Van Gölü seviyesi) - 2.948 m (Nemrut Krater Sırtı)',
    bestSeasons: ['Haziran', 'Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 2350,
    currency: 'EUR',
    displayPrice: '€2.350 / kişi başı',
    overview: 'Dünyanın en büyük sodalı gölü çevresinde, 3.000 yıl önce taşları metal gibi işleyen Urartu krallarının izinde bir sefer. Dünyanın ikinci büyük krater gölü Nemrut Dağı kalderasında kamp kurup buhar bacalarını gözlemlerken, Akdamar Adası\'nın Tevrat ve İncil sahnelerini betimleyen eşsiz taş kabartmalarını inceleyen yüksek tarih rotası.',
    itinerarySummary: [
      { day: 1, title: 'Tuşpa Kalesi & Van Müzesi', description: 'Urartu Krallığı\'nın başkenti Tuşpa kaya mezarları, Kral Menua yazıtları ve dünyanın en zengin Urartu bronz koleksiyonu.' },
      { day: 2, title: 'Çavuştepe Kalesi ve Çivi Yazısı Dili', description: 'Sardurihinili kenti saray kalıntıları; dünyada Urartuca çivi yazısını okuyabilen son ustalardan anlatılar.' },
      { day: 3, title: 'Akdamar Adası Kutsal Haç Kilisesi', description: 'Göl üzerinde özel tekneyle geçiş; 10. yüzyıl Gagik kabartmaları, Jonah ve Balina frizleri tahlili.' },
      { day: 4, title: 'Nemrut Krater Gölü Kalderası (2.250 m)', description: 'Sönmüş devasa volkanın krater ağzına tırmanış; Ilıgöl sıcak su kaynakları ve soğuk derin krater gölünde kamp.' },
      { day: 5, title: 'Ahlat Selçuklu Meydan Mezarlığı', description: 'Ortaçağ İslam dünyasının en abidevi taş oymacılığı; 3 metrelik ejder ve hayat ağacı motifli şahideler.' },
      { day: 6, title: 'Süphan Dağı Etekleri ve Dönüş', description: 'Aygır Gölü çevresinde son doğa yürüyüşü ve Van feribotu manzarasıyla seyahatin noktalanması.' }
    ],
    included: ['Urartu arkeoloğu eşliğinde saha anlatımları', 'Özel tekne kiralama ve ada geçişleri', 'Kaldera içi lüks glamping kamp altyapısı', 'Van kahvaltısı ve yöresel inci kefali tadımları'],
    excluded: ['Van uçuşları', 'Şahsi içecekler ve bahşişler'],
    gearRequirements: ['Rüzgar geçirmez hafif polar', 'Yürüyüş batonu', 'Göl kenarı kampı için termal içlik takımı'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Van Gölü Akdamar Adası manastırı ve karlı Süphan Dağı manzarası',
    tags: ['Arkeoloji', 'Urartu', 'Nemrut Kalderası', 'Van Gölü', 'Selçuklu Sanatı']
  },
  {
    id: 'exp-05',
    slug: 'likya-kayalik-kestirmeleri-ve-antik-patikalar',
    title: 'Likya Kıyı Sırtları, Antik Zeytinlikler ve Fırtına Patikaları',
    subtitle: 'Kabak Koyu\'ndan Gelidonya Feneri\'ne, kaya lahitlerinden turkuaz Akdeniz boğazlarına',
    region: 'Akdeniz Sahil Kuşağı',
    country: 'Türkiye',
    category: 'anadolu_ve_mezopotamya',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 10, text: '4 - 10 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '0 m (Deniz seviyesi) - 900 m (Tahtalı etekleri)',
    bestSeasons: ['Mart', 'Nisan', 'Mayıs', 'Ekim', 'Kasım'],
    pricePerPerson: 2200,
    currency: 'EUR',
    displayPrice: '€2.200 / kişi başı',
    overview: 'Dünyanın en iyi 10 uzun mesafe yürüyüş rotası arasında sayılan Likya Yolu\'nun en vahşi, denizden sarp kayalıklarla yükselen etapları. Çam pürleri, kekik kokuları ve bin yıllık zeytin ağaçları arasında antik Patara meclis binası, Aperlai batık kenti ve Gelidonya Feneri\'nin yalnız kayalıklarına uzanan Akdeniz şiiri.',
    itinerarySummary: [
      { day: 1, title: 'Fethiye & Kayaköy Hayalet Şehir', description: 'Terk edilmiş 19. yüzyıl Rum taş evleri arasından Ölüdeniz Lagünü sırtlarına açılan panoramik giriş yürüyüşü.' },
      { day: 2, title: 'Babadağ Etekleri & Kabak Kanyonu', description: 'Yüksek kızılçam ormanları ve kireçtaşı uçurumlar boyunca Akdeniz mavisine tepeden bakan iniş.' },
      { day: 3, title: 'Yediburunlar & Sancaklı Koyu', description: 'Kıyı şeridinin en sarp ve dalgalı yedi burnu boyunca dalgakıran kireç sırtlarında 16 km yürüyüş.' },
      { day: 4, title: 'Patara Kumulları ve Demokrasi Meclisi', description: 'Likya Birliği\'nin parlamento binası, antik deniz feneri ve 18 km uzunluğundaki korunmuş kumul hattı.' },
      { day: 5, title: 'Aperlai Batık Kenti ve Kano Geçişi', description: 'Depremlerle sular altında kalmış antik mor boya (murex) üretim atölyeleri üzerinde deniz kanosu ve şnorkel.' },
      { day: 6, title: 'Kekova, Simena Kalesi ve Likya Lahitleri', description: 'Denizin içinden yükselen taş lahitler, sarnıçlar ve keçi yollarından Simena Kalesi zirvesine tırmanış.' },
      { day: 7, title: 'Gelidonya Feneri ve Beş Adalar', description: 'Korsan Koyu\'ndan çam ormanları içinden yükselerek Türkiye\'nin en fotojenik deniz fenerinde gün batımı kampı.' },
      { day: 8, title: 'Adrasan & Antalya\'ya Dönüş', description: 'Kıyı kasabasında taze deniz ürünleri öğle yemeği ve Antalya havalimanına transfer.' }
    ],
    included: ['Likya epigrafisi ve flora uzmanı rehber', 'Geleneksel taş ev ve butik eko-pansiyon konaklamaları', 'Bavul ve ana yük taşıma transferleri', 'Batık kent kano ekipmanları ve tekne lojistiği'],
    excluded: ['Antalya/Dalaman uçak biletleri', 'Kişisel harcamalar'],
    gearRequirements: ['Kayalık patikaya uygun vibram taban ayakkabı', 'Deniz patikleri ve şnorkel takımı', 'Güneş koruyucu teknik kıyafetler'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Gelidonya Feneri ve turkuaz Likya Akdeniz kıyı patikası',
    tags: ['Likya Yolu', 'Akdeniz', 'Kaya Mezarları', 'Antik Kentler', 'Kıyı Patikası']
  },
  {
    id: 'exp-06',
    slug: 'frig-daglik-vadileri-ve-kaya-anitlari',
    title: 'Frig Dağlık Vadileri ve Oyma Kaya Anıtları',
    subtitle: 'Midas Anıtı (Yazılıkaya), Emre Gölü tüfleri ve peri bacaları arasında Frigya Krallığı izi',
    region: 'Eskişehir & Afyon Platosu',
    country: 'Türkiye',
    category: 'anadolu_ve_mezopotamya',
    duration: { days: 4, nights: 3, text: '4 Gün / 3 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Kolay-Orta',
    altitudeProfile: '1.050 m (Yazılıkaya) - 1.350 m (Türkmen Dağı Sırtları)',
    bestSeasons: ['Nisan', 'Mayıs', 'Eylül', 'Ekim'],
    pricePerPerson: 1650,
    currency: 'EUR',
    displayPrice: '€1.650 / kişi başı',
    overview: 'Kral Midas ve Ana Tanrıça Kybele\'nin gizemli krallığı Frigya\'nın kalbinde, devasa monolitik kaya cephelerine oyulmuş geometrik tapınaklar arasında bir keşif yürüyüşü. Antik at arabası tekerleklerinin tüf kayalarında bıraktığı derin izler (kral yolları), kaya kaleleri ve bozkır sessizliği.',
    itinerarySummary: [
      { day: 1, title: 'Yazılıkaya Midas Şehri', description: '17 metre yüksekliğindeki anıtsal Frig fasadı, arkaik yazıtlar ve akropol kaya sarnıçları incelemesi.' },
      { day: 2, title: 'Kümbet Vadisi ve Aslanlı Mabet', description: 'Tüf kayalara oyulmuş anıt mezarlar, kabartma aslan figürleri ve çam korulukları boyunca 14 km trekking.' },
      { day: 3, title: 'Emre Gölü ve Sıcak Hava Balonu Seyri', description: 'Göl üzerindeki tüf bacaları arasında kano kürek çekişi; Frig vadisi üzerinde sakin gün doğumu uçuşu.' },
      { day: 4, title: 'Ayazini Kaya Köyü ve Dönüş', description: 'Roma ve Bizans döneminde de kullanılan çok katlı kiliseler, kaya mezarları ve Afyonkarahisar transferi.' }
    ],
    included: ['Klasik arkeoloji ve Frig dili uzmanı rehber', 'Yöresel taş konak konaklamaları', 'Tüm müze ve örenyeri girişleri', 'Geleneksel çömlek tandır ziyafetleri'],
    excluded: ['Ulaşım ve şahsi harcamalar'],
    gearRequirements: ['Konforlu yürüyüş botu', 'Rüzgarlık', 'Güneş gözlüğü ve şapka'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Frig Vadisi Yazılıkaya Midas Anıtı kaya cephesi ve anıtsal yazıtlar',
    tags: ['Frig Vadisi', 'Midas', 'Kaya Anıtları', 'Bozkır', 'Arkaik Miras']
  },
  {
    id: 'exp-07',
    slug: 'tur-abdin-dicle-kanyonu-ve-mezopotamya-esigi',
    title: 'Tur Abdin Taş Manastırları, Dicle Kanyonu ve Mezopotamya Eşiği',
    subtitle: 'Deyrulzafaran ve Mor Gabriel\'den Hasankeyf kanyonlarına Süryani dili ve mimarisi',
    region: 'Güneydoğu Anadolu',
    country: 'Türkiye',
    category: 'anadolu_ve_mezopotamya',
    duration: { days: 6, nights: 5, text: '6 Gün / 5 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '550 m (Dicle Vadisi) - 1.180 m (Midyat Yaylası)',
    bestSeasons: ['Mart', 'Nisan', 'Mayıs', 'Ekim', 'Kasım'],
    pricePerPerson: 2250,
    currency: 'EUR',
    displayPrice: '€2.250 / kişi başı',
    overview: 'Mezopotamya ovasına tepeden bakan kireçtaşı kalkanı üzerinde, İsa\'nın konuştuğu Aramice dilinin yankılandığı Tur Abdin (Kulların Dağı) manastırları. Mardin\'in sarı taş mimarisinden Midyat\'ın telkâri sokaklarına, Dicle Nehri\'nin bin yıllık kanyon geçitlerinden Mor Evgin\'in uçurum terasına uzanan kadim bir vaha.',
    itinerarySummary: [
      { day: 1, title: 'Mardin Taş Evleri & Kasımiye Medresesi', description: 'Mezopotamya ovasına gün batımı seyri; Artuklu taçkapı oymacılığı ve su havzası felsefesi.' },
      { day: 2, title: 'Deyrulzafaran Manastırı & Dara Antik Kenti', description: 'Güneş Tapınağı üzerine kurulu Süryani Patrikliği merkezi; Dara kaya sarnıçları ve nekropolü.' },
      { day: 3, title: 'Mor Gabriel Manastırı (MS 397)', description: 'Dünyanın ayakta kalan en eski Hristiyan manastırlarından birinde keşişlerle buluşma ve el yazması kütüphanesi.' },
      { day: 4, title: 'Midyat Köyleri ve Mor Yakup İnzivası', description: 'Kafro ve Anhel köylerinde Süryani taş ustalığı, asma bağları ve yerel şarap degüstasyonu.' },
      { day: 5, title: 'Mor Evgin Uçurum Manastırı ve Bagok Dağı', description: 'Sarp dağ yamacına kartal yuvası gibi oyulmuş manastıra 3 saatlik dik patika yürüyüşü.' },
      { day: 6, title: 'Hasankeyf & Dicle Nehri Kanyonu', description: 'Tekneyle kanyon mağaraları ve vadi kaleleri keşfi; Batman üzerinden dönüş.' }
    ],
    included: ['Süryani kültürü ve Ortadoğu tarihçisi rehber', 'Mardin ve Midyat\'ta tarihi taş konak konaklamaları', 'Özel manastır kütüphanesi giriş izinleri', 'Geleneksel Süryani gastronomi deneyimleri'],
    excluded: ['Uçak biletleri', 'Kişisel hediyelikler ve telkari alımları'],
    gearRequirements: ['Taş zeminlere uygun kauçuk tabanlı ayakkabı', 'Omuz ve dizleri örten saygılı giyim', 'Hafif rüzgarlık'],
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    alt: 'Mardin taş evleri ve uçsuz bucaksız Mezopotamya ovası manzarası',
    tags: ['Tur Abdin', 'Süryani Mirası', 'Mardin', 'Dicle Nehri', 'Mezopotamya']
  },

  // --- 2. ORTA ASYA VE KAFKASLAR (6 Rota) ---
  {
    id: 'exp-08',
    slug: 'svaneti-savunma-kuleleri-ve-kafkas-buzullari',
    title: 'Svaneti Savunma Kuleleri ve Kafkas Buzul Sırtları',
    subtitle: 'Mestia ve Avrupa\'nın en yüksek yerleşimi Uşguli\'den Şhara Buzulu\'na Alpin yürüyüş',
    region: 'Kafkas Dağları',
    country: 'Gürcistan',
    category: 'orta_asya_ve_kafkaslar',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta-Zor',
    altitudeProfile: '1.400 m (Mestia) - 3.200 m (Çalaadi Geçidi)',
    bestSeasons: ['Haziran', 'Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 2650,
    currency: 'EUR',
    displayPrice: '€2.650 / kişi başı',
    overview: 'Ortaçağdan kalma 200\'ü aşkın taş kulesiyle UNESCO korumasındaki Svaneti, Büyük Kafkas Dağları\'nın en dramatik vadisidir. 5.193 metrelik Şhara masifinin devasa buzul duvarları dibinde, Svan halkının antik çok sesli dağ şarkıları eşliğinde dağ geçitlerini aşan masif bir sefer.',
    itinerarySummary: [
      { day: 1, title: 'Tiflis\'ten Kutaisi & Enguri Kanyonu', description: 'Kafkas eteklerine tırmanış; dünyanın en yüksek kemer barajı Enguri üzerinden Mestia\'ya varış.' },
      { day: 2, title: 'Mestia Kuleleri ve Çalaadi Buzulu', description: 'Taş savunma kulelerinin çatısına tırmanış; huş ormanları içinden akan Çalaadi buzul diline yürüyüş.' },
      { day: 3, title: 'Zhabeshi & Adishi Dağ Köyü', description: 'Gürgen ve çam ormanları aşılarak sadece patikayla ulaşılan Adishi köyüne 16 km geçiş.' },
      { day: 4, title: 'Adishi Buzulu ve Atla Nehir Geçişi', description: 'Buzul suyunun coştuğu nehir yatağını Svan atlarıyla geçiş; Çhkunderi Geçidi\'nden (2.720 m)Tetnuldi manzarası.' },
      { day: 5, title: 'İprali & Tarihi Freskli Kiliseler', description: '12. yüzyıl Kraliçe Tamar dönemi ikonalarıyla süslü taş şapeller ve Khalde Vadisi.' },
      { day: 6, title: 'Uşguli Köyü (2.200 m)', description: 'Avrupa\'nın sürekli yaşanılan en yüksek köyü; onlarca kule arasında yürüyüş ve Şhara ana kampı.' },
      { day: 7, title: 'Şhara Buzulu (5.193 m Masifi)', description: 'Gürcistan\'ın en yüksek doruğunun buzul döküntüleri boyunca 6 saatlik görkemli dağcılık rotası.' },
      { day: 8, title: 'Kutaisi / Tiflis\'e Dönüş', description: 'Gürcü şarapları ve Haçapuri eşliğinde veda kutlaması.' }
    ],
    included: ['IFMGA lisanslı Kafkas dağ rehberi', 'Geleneksel Svan aile konukevleri konaklaması', 'Atlı nehir geçiş lojistiği', 'Tüm Gürcü dağ yemekleri ve sofra ziyafetleri'],
    excluded: ['Tiflis/Kutaisi uçak biletleri', 'Kişisel seyahat sigortası'],
    gearRequirements: ['Gore-Tex su geçirmez dağ botu', 'Nehir geçişi için yedek sandalet/ayakkabı', 'Teleskopik baton'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Svaneti Uşguli taş savunma kuleleri ve arkada karlı Kafkas Dağları',
    tags: ['Kafkaslar', 'Svaneti', 'Şhara', 'UNESCO', 'Dağ Kuleleri']
  },
  {
    id: 'exp-09',
    slug: 'tanri-daglari-issik-gol-ve-gocer-otlaklari',
    title: 'Tanrı Dağları (Tiyenşan), Issık Göl ve Göçebe Yaylaları',
    subtitle: 'Ala-Arça kanyonundan Song-Köl yüksek dağ gölüne Kırgız boz-üy çadırları seferi',
    region: 'Tiyenşan Masifi',
    country: 'Kırgızistan',
    category: 'orta_asya_ve_kafkaslar',
    duration: { days: 10, nights: 9, text: '10 Gün / 9 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '800 m (Bişkek) - 3.400 m (33 Papağanlar Geçidi)',
    bestSeasons: ['Haziran', 'Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 2950,
    currency: 'EUR',
    displayPrice: '€2.950 / kişi başı',
    overview: 'Orta Asya\'nın göbeğinde, karlı gökdelen zirveleriyle Tanrı Dağları\'nın kucağında atlı göçebe kültürünün yaşayan dünyası. 3.016 metre yükseklikteki turkuaz ayna Song-Köl Gölü kıyısında keçe çadırlarda (boz-üy) konaklayarak kımız kültürü, Manas destanı ozanları ve Tiyenşan ladin ormanlarında yürüyüş.',
    itinerarySummary: [
      { day: 1, title: 'Bişkek & Ala-Arça Ulusal Parkı', description: 'Tiyenşan dağ kanyonuna giriş; dik buzul vadisinde aklimatizasyon yürüyüşü.' },
      { day: 2, title: 'Çon-Kemin Vadisi & Kırgız Atları', description: 'Geleneksel Kırgız köyünde atçılık kültürü ve orman içi yayla patikaları.' },
      { day: 3, title: 'Issık Göl Kıyı Şeridi & Çolpon-Ata', description: 'Dünyanın en büyük dağ göllerinden birinde antik petroglifler (kaya çizimleri) incelemesi.' },
      { day: 4, title: 'Karakol Vadisi ve Dungan Ahşap Camii', description: 'Çivisiz ahşap Pagoda mimarisi Dungan Camii ve Prjevalski müzesi ziyareti.' },
      { day: 5, title: 'Ceti-Ögüz (Yedi Öküz) Kırmızı Kayaları', description: 'Kızıl kumtaşı kanyonları boyunca Kırgız yaylalarına tırmanış; kartal avcısı eğitmenleriyle buluşma.' },
      { day: 6, title: 'Barskoon Kanyonu & Şelaleler', description: 'Yuri Gagarin\'in dinlendiği ünlü vadi; 3.800 metredeki altın madeni yaylası geçitleri.' },
      { day: 7, title: 'Song-Köl Dağ Gölü (3.016 m)', description: '33 Papağanlar kıvrımlı geçidinden masmavi göl platosuna varış; boz-üy keçe çadırlarına yerleşme.' },
      { day: 8, title: 'Göçebe Hayatı & Atlı Çobanlar', description: 'Yılkı atları sürüleri arasında yürüyüş, kımız tadımı ve Manas destanı dinletisi.' },
      { day: 9, title: 'Koçkor Keçe Atölyesi & Burana Kulesi', description: 'İpek Yolu Karahanlı başkenti Balasagun minaresi Burana Kulesi kalıntıları.' },
      { day: 10, title: 'Bişkek ve Uçuş', description: 'Oş Pazarı baharat ve kurut alışverişi ardından havalimanı transferi.' }
    ],
    included: ['Kırgızistan uzmanı Türkçe ve Kırgızca bilen rehber', 'Yayla boz-üy (keçe çadır) ve butik otel konaklamaları', '4x4 arazi minibüsü ve bagaj desteği', 'Geleneksel Kırgız at sırtı deneyimi ve kartal avı gösterisi'],
    excluded: ['Bişkek gidiş-dönüş uçuşları', 'Kişisel harcamalar'],
    gearRequirements: ['Sıcak tutan polar ve rüzgarlık (geceleri 0°C altına inebilir)', 'Konforlu yürüyüş ayakkabısı', 'Güneş koruyucu krem'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kırgızistan Song Köl gölü kıyısında beyaz yurt çadırları ve atlar',
    tags: ['Tiyenşan', 'Kırgızistan', 'Song-Köl', 'Boz-üy', 'Göçebe Kültürü']
  },
  {
    id: 'exp-10',
    slug: 'pamir-karayolu-ve-vahan-koridoru',
    title: 'Pamir Karayolu (M41) ve Vahan Koridoru Çatı Geçitleri',
    subtitle: 'Dünyanın Çatısı Pamir Yaylası, Ak-Baytal Geçidi (4.655 m) ve Afganistan sınırı',
    region: 'Pamir Dağları',
    country: 'Tacikistan',
    category: 'orta_asya_ve_kafkaslar',
    duration: { days: 12, nights: 11, text: '12 Gün / 11 Gece' },
    groupSize: { min: 4, max: 6, text: '4 - 6 Kişi' },
    difficulty: 'Zorlu',
    altitudeProfile: '700 m (Duşanbe) - 4.655 m (Ak-Baytal Zirve Geçidi)',
    bestSeasons: ['Temmuz', 'Ağustos'],
    pricePerPerson: 3850,
    currency: 'EUR',
    displayPrice: '€3.850 / kişi başı',
    overview: 'Dünyanın en yüksek ikinci uluslararası karayolu olan Pamir Highway boyunca, oksijenin seyreldiği ay yüzeyini andıran platolar ve Hindukuş dağlarına bakan Vahan Koridoru. Pyanj Nehri boyunca Afganistan köylerini bir taş atımı mesafeden izleyerek asırlık Zerdüşt ateş tapınakları ve İpek Yolu kalelerine tırmanış.',
    itinerarySummary: [
      { day: 1, title: 'Duşanbe & Hissar Kalesi', description: 'Tacikistan başkentinde brifing, Pamir özel sınır izinlerinin (GBAO) kontrolü.' },
      { day: 2, title: 'Kala-i Humb & Pyanj Nehri', description: 'Pamir Dağları\'nın dik kanyonlarına giriş; nehrin karşı kıyısındaki Afgan köyleri boyunca sürüş.' },
      { day: 3, title: 'Horoğ (Dağlık Badahşan)', description: 'Dünyanın en yüksek botanik bahçelerinden biri ve İsmaili kültür merkezi ziyareti.' },
      { day: 4, title: 'İşkaşim & Vahan Koridoru Başlangıcı', description: 'Tarihi Afgan-Tacik sınır pazarı bölgesi ve Hindukuş karlı masiflerinin ufukta belirişi.' },
      { day: 5, title: 'Yamchun Kalesi & Bibi Fatma Sıcak Suları', description: 'M.Ö. 3. yüzyıldan kalma devasa taş kale surları ve kayadan fışkıran şifalı kaplıca.' },
      { day: 6, title: 'Langar & Antik Petroglifler', description: 'Pyanj ve Vahan nehirlerinin birleştiği kanyonda 6.000 yıllık dağ keçisi kaya resimlerine tırmanış.' },
      { day: 7, title: 'Harguş Geçidi (4.344 m) & Bulunkul', description: 'Issız ay manzaralı yüksek Pamir yaylasına geçiş; Tacikistan\'ın en soğuk yerleşimi Bulunkul\'da kamp.' },
      { day: 8, title: 'Murğab (3.600 m Yüksek Çöl)', description: 'Kırgız ve Pamiri topluluklarının yaşadığı konteyner çarşısı ve rüzgarlı yüksek dağ platosu.' },
      { day: 9, title: 'Ak-Baytal Geçidi (4.655 m)', description: 'Karayolunun en yüksek noktası; Lenin Zirvesi (7.134 m) manzarası eşliğinde Karakul krater gölüne varış.' },
      { day: 10, title: 'Karakul Meteor Gölü', description: 'Masmavi tuzlu krater gölü çevresinde 3.900 metrede yürüyüş; Marco Polo yaban koyunları gözetlemesi.' },
      { day: 11, title: 'Kızıl-Art Geçidi & Oş\'a İniş', description: 'Kırgızistan sınırını aşarak Fergana Vadisi\'nin tarihi şehri Oş\'a iniş.' },
      { day: 12, title: 'Süleyman Dağı & Dönüş', description: 'UNESCO tescilli kutsal Süleyman Dağı mağaraları ardından seferin tamamlanması.' }
    ],
    included: ['Özel GBAO Pamir sınır izinleri', '4x4 Toyota Land Cruiser araçlar ve yakıt', 'Pamir ve Vahan aile pansiyonları konaklaması', 'Yüksek irtifa ilkyardım ve oksijen tüpü desteği'],
    excluded: ['Uluslararası uçuşlar', 'Tacikistan e-vizesi', 'Kişisel harcamalar'],
    gearRequirements: ['-15°C uyku tulumu', 'Rüzgar geçirmez polar ve hardshell katmanları', 'Yüksek UV filtreli buzul gözlüğü (Kategori 4)'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pamir Karayolu M41 yüksek dağ geçidi ve karlı Hindukuş zirveleri',
    tags: ['Pamir Highway', 'Dünyanın Çatısı', 'Vahan Koridoru', 'Tacikistan', 'Yüksek İrtifa']
  },
  {
    id: 'exp-11',
    slug: 'altay-daglari-ve-kazak-kartal-avcilari',
    title: 'Moğolistan Altayları ve Kazak Kartal Avcıları Kış Göçü',
    subtitle: 'Bayan-Ölgii karlı tundralarından kartal yuvalarına ve göçebe Kazak kışlaklarına',
    region: 'Batı Moğolistan Altayları',
    country: 'Moğolistan',
    category: 'orta_asya_ve_kafkaslar',
    duration: { days: 9, nights: 8, text: '9 Gün / 8 Gece' },
    groupSize: { min: 4, max: 6, text: '4 - 6 Kişi' },
    difficulty: 'Zorlu',
    altitudeProfile: '1.700 m (Ölgii) - 3.200 m (Altay Tavan Bogd etekleri)',
    bestSeasons: ['Şubat', 'Mart', 'Ekim'],
    pricePerPerson: 3600,
    currency: 'EUR',
    displayPrice: '€3.600 / kişi başı',
    overview: 'Altay Dağları\'nın dondurucu rüzgarlarında, 4.000 yıllık kadim geleneği sürdüren Kazak "Bürkütçü" (Kartal Avcısı) ustalarının yanında bir kış seferi. At sırtında dev altın kartallarla tilki ve tavşan izi sürme, karlı Altay vadilerinde keçe yurt çadırlarında ateş başında süren destan geceleri.',
    itinerarySummary: [
      { day: 1, title: 'Ulanbator\'dan Ölgii\'ye İç Hat Uçuşu', description: 'Moğolistan\'ın en batı ucuna uçuş; Kazak yerel rehberlerle tanışma ve termal kış donanımı kontrolü.' },
      { day: 2, title: 'Sagsai Vadisi & Bürkütçü Ailesi', description: 'Karasakal bir kartal avcısının kışlağına varış; kartalın eğitilme felsefesi ve tüneme ritüelleri.' },
      { day: 3, title: 'Karlı Tepelerde Kartal Avı Yürüyüşü', description: 'Atlarla 2.800 metredeki rüzgarlı kayalıklara çıkış; kartalın karlı vadide hedefe dalışını belgeleme.' },
      { day: 4, title: 'Tolbo Gölü ve Donmuş Mavi Buzlar', description: 'Buz tutmuş devasa göl üzerinde yürüyüş; buz altı balıkçılığı ve geleneksel dombra dinletisi.' },
      { day: 5, title: 'Altay Tavan Bogd Milli Parkı Etekleri', description: 'Moğolistan, Rusya ve Çin sınırının kesiştiği devasa buzulların eteğindeki Tuva göçebeleriyle buluşma.' },
      { day: 6, title: 'Petroglif Vadisi & Kadim Taş Babalar', description: 'Türk ve İskit döneminden kalma karlı balballar ve dağ keçisi kaya oymaları incelemesi.' },
      { day: 7, title: 'Geleneksel Kış Göçü Deneyimi', description: 'Yak ve deve kervanlarının kışlaklar arasındaki ağır göç yürüyüşüne eşlik etme.' },
      { day: 8, title: 'Ölgii Şehri & Kazak Nakış Atölyeleri', description: 'Geleneksel el dokuması keçe ve sırma nakış kooperatifleri ziyareti; veda ziyafeti.' },
      { day: 9, title: 'Ulanbator Dönüşü', description: 'İç hat uçuşuyla başkente intikal ve uluslararası bağlantı.' }
    ],
    included: ['Kartal avcısı ailelerle doğrudan temas ve kılavuzluk', 'Geleneksel ahşap ve keçe yurt konaklaması', 'Kürk ve keçe destekli yerel kış ekipmanları', 'Özel Rus UAZ minibüsleri ile çetin kış lojistiği'],
    excluded: ['Ulanbator uluslararası uçuşları', 'Şahsi harcamalar ve bahşişler'],
    gearRequirements: ['-25°C dayanımlı kutup parkası ve pantolonu', 'Kürk astarlı kışlık bot', 'Termal merino yün içlik katmanları (en az 260 gsm)'],
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
    alt: 'Moğolistan Altay Dağları karlarında at sırtında dev kartal tutan Kazak avcı',
    tags: ['Altay Dağları', 'Moğolistan', 'Kartal Avcıları', 'Bürkütçü', 'Kış Seferi']
  },
  {
    id: 'exp-12',
    slug: 'fann-daglari-masmavi-goller-ve-zarafsan',
    title: 'Fann Dağları Yedi Göller ve Zarafşan Vadisi Geçişi',
    subtitle: 'Tacikistan\'ın turkuaz göller zinciri, Çimtarga Geçidi (4.750 m) ve İskenderköl',
    region: 'Fann Dağları',
    country: 'Tacikistan',
    category: 'orta_asya_ve_kafkaslar',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Zorlu',
    altitudeProfile: '1.800 m (Penjikent) - 4.750 m (Çimtarga Geçidi)',
    bestSeasons: ['Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 2550,
    currency: 'EUR',
    displayPrice: '€2.550 / kişi başı',
    overview: 'Orta Asya\'nın en büyüleyici Alpin göllerine ev sahipliği yapan Fann Dağları, dikey kireçtaşı kuleleri ve gök mavisi sularıyla yürüyüşçülerin efsanesidir. Büyük İskender\'in atının battığına inanılan efsanevi İskenderköl\'den başlayarak Yedi Göller vadisi ve 5.000 metrelik zirveler arasına sokulan derin bir dağ maratonu.',
    itinerarySummary: [
      { day: 1, title: 'Semerkant\'tan Penjikent Sınır Geçişi', description: 'Özbekistan\'dan antik Soğd kenti Penjikent\'e geçiş; kalıntıların ve fresklerin incelenmesi.' },
      { day: 2, title: 'Marguzor Yedi Göller Vadisi', description: 'Her biri minerallerine göre farklı renkte parlayan yedi göl basamağında tırmanış.' },
      { day: 3, title: 'Kulikalon Gölleri Platosu', description: 'Ardıç ormanları arasından geçerek devasa kaya amfitiyatrosundaki Kulikalon kampına varış.' },
      { day: 4, title: 'Alauddin Geçidi (3.860 m)', description: 'Kristal berraklığındaki Alauddin Gölü\'ne nefes kesici bir panoramik iniş ve çadır kampı.' },
      { day: 5, title: 'Mutnoye Gölü (3.500 m Buzul Çanağı)', description: 'Çimtarga ve Enerjiya doruklarının dev buzul duvarları altındaki moren gölüne intikal.' },
      { day: 6, title: 'Çimtarga Geçidi (4.750 m)', description: 'Fann Dağları\'nın en yüksek geçişi; kramponla taş ve buzul geçişi; 360 derece Pamir-Alay manzarası.' },
      { day: 7, title: 'Büyük İskenderköl (İskender Gölü)', description: 'Fann Fani Kanyonu üzerinden efsanevi dağ gölüne iniş; Fann Şelalesi seyri.' },
      { day: 8, title: 'Duşanbe / Semerkant Dönüşü', description: 'Anzob tüneli üzerinden Duşanbe\'ye intikal ve seferin sonu.' }
    ],
    included: ['IFMGA lisanslı yerel dağ rehberi ve kamp ekibi', 'Eşek ve katır yük taşıma servisi', 'Yüksek kaliteli dağ çadırları ve yemekleri', 'Sınır geçiş ve milli park izinleri'],
    excluded: ['Semerkant/Duşanbe uçuşları', 'Kişisel uyku tulumu ve dağ giyimi'],
    gearRequirements: ['Sert tabanlı trekking botu', '-10°C uyku tulumu', 'Teleskopik baton takımı', 'Kişisel su arıtma filtresi'],
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fann Dağları masmavi Kulikalon buzul gölü ve ardıç ağaçları',
    tags: ['Fann Dağları', 'Tacikistan', 'İskenderköl', 'Yedi Göller', 'Trekking']
  },
  {
    id: 'exp-13',
    slug: 'harezm-col-kaleleri-ve-aral-havzasi',
    title: 'Kızılkum Çöl Kaleleri, Harezm Vahaları ve Çekilen Aral Havzası',
    subtitle: 'Hiva\'nın killi surlarından Moynak gemi mezarlığına ve Üstyurt kanyonlarına',
    region: 'Karakalpakistan & Harezm',
    country: 'Özbekistan',
    category: 'orta_asya_ve_kafkaslar',
    duration: { days: 7, nights: 6, text: '7 Gün / 6 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi altı (-50 m) - 250 m (Üstyurt Platosu)',
    bestSeasons: ['Nisan', 'Mayıs', 'Eylül', 'Ekim'],
    pricePerPerson: 2200,
    currency: 'EUR',
    displayPrice: '€2.200 / kişi başı',
    overview: 'Kızılkum Çölü\'nün kumulları altına gömülü 2.000 yıllık Toprak-Kala ve Ayaz-Kala gibi kerpiç saray kalıntılarından başlayarak, insan eliyle kurutulan Aral Gölü\'nün kumdaki paslı gemi mezarlığına uzanan jeopolitik ve ekolojik keşif seferi. Üstyurt Platosu\'nun tebeşir beyazı dik kanyonlarında çöl kampı.',
    itinerarySummary: [
      { day: 1, title: 'Hiva İçan-Kala Açık Hava Müzesi', description: 'Güneşte kurutulmuş tuğla surlar, Cuma Camii\'nin 218 oyma ahşap sütunu ve İpek Yolu tarihi.' },
      { day: 2, title: 'Ellik-Kala (Elli Kale) Çöl Seferi', description: 'Ayaz-Kala ve Toprak-Kala kerpiç kalıntılarına tırmanış; kumlara gömülü Zerdüşt tapınakları.' },
      { day: 3, title: 'Nukus & Savitski Avangard Müzesi', description: 'Sovyetler döneminde Sibirya\'ya sürgün edilen yasaklı Rus avangard sanatının dünyadaki ikinci büyük koleksiyonu.' },
      { day: 4, title: 'Moynak Paslı Gemi Mezarlığı', description: 'Eski bir balıkçı limanının bugün çölün 150 km içinde kalmış trajik gemi iskeletleri arasında yürüyüş.' },
      { day: 5, title: 'Üstyurt Platosu ve Kalan Aral Denizi Kıyısı', description: 'Kireçtaşı beyaz kanyon duvarları boyunca 4x4 sürüş; Aral\'ın geriye kalan tuzlu sularında çadır kampı.' },
      { day: 6, title: 'Kubla-Üstyurt ve Tuz Düzlükleri', description: 'Uçsuz bucaksız çöl serapları, yabani Sayga antilopları habitatı ve Urgenç\'e dönüş.' },
      { day: 7, title: 'Urgenç & Taşkent Bağlantısı', description: 'Harezm ekmeği atölyesi ve dönüş uçuşu.' }
    ],
    included: ['Çöl koşullarına hazır 4x4 araçlar ve sürücüler', 'Üstyurt Platosu kamp lojistiği ve çöl aşçısı', 'Savitski Müzesi uzman küratör anlatımı', 'Hiva otel ve çöl çadır konaklamaları'],
    excluded: ['Taşkent ve iç hat uçuşları', 'Kişisel harcamalar'],
    gearRequirements: ['Toz ve rüzgar fırtınası için çöl şalı (shemagh)', 'Güneş koruyucu giysiler', 'Kafa feneri ve ıslak mendil/hijyen kiti'],
    imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Aral Gölü Moynak çölünde paslanmış terkedilmiş gemi iskeletleri',
    tags: ['Aral Gölü', 'Harezm', 'Kızılkum Çölü', 'Üstyurt', 'Özbekistan']
  },

  // --- 3. KUZEY KUTBU VE ARKTIK DENİZ ROTALARI (6 Rota) ---
  {
    id: 'exp-14',
    slug: 'svalbard-arktik-buzul-fiyortlari-ve-morslar',
    title: 'Svalbard Takımadaları, Buzul Fiyortları ve Arktik Vahşi Yaşam',
    subtitle: '78° Kuzey enleminde Longyearbyen\'den Isfjorden ve buzul cephelerine keşif gemisiyle',
    region: 'Arktik Okyanusu',
    country: 'Norveç / Svalbard',
    category: 'arktik_ve_kutup_havzasi',
    duration: { days: 9, nights: 8, text: '9 Gün / 8 Gece' },
    groupSize: { min: 6, max: 12, text: '6 - 12 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi - 600 m (Plateau Dağı Tundrası)',
    bestSeasons: ['Haziran', 'Temmuz', 'Ağustos'],
    pricePerPerson: 5900,
    currency: 'EUR',
    displayPrice: '€5.900 / kişi başı',
    overview: 'Kuzey Kutbu\'na yalnızca 1.000 kilometre mesafede, kutup ayılarının insanlardan daha kalabalık olduğu buzlar diyarı. Güçlendirilmiş buzul keşif gemimiz ve zodyak botlarla dev fiyort duvarlarına yaklaşırken mors kolonileri, beluga balinaları ve tundrada otlayan minyatür Svalbard ren geyiklerini gözlemleyen abidevi bir sefer.',
    itinerarySummary: [
      { day: 1, title: 'Longyearbyen (Dünyanın En Kuzey Kasabası)', description: 'Oslo\'dan uçuş; Arktik Müzesi ziyareti ve kutup ayısı güvenlik protokolü brifingi.' },
      { day: 2, title: 'Gemiye Biniş & Isfjorden Seyrüseferi', description: 'Buz sınıfı ekspedisyon gemimize biniş; fiyort sularında fulmar kuşları eşliğinde seyrüsefer.' },
      { day: 3, title: 'Nordenskiöld Buzulu & Terk Edilmiş Pyramiden', description: 'Devasa mavi buzul duvarına yanaşma; eski Sovyet kömür madeni kasabasında zaman yolculuğu.' },
      { day: 4, title: 'Kral Fiyordu (Kongsfjorden) & Ny-Ålesund', description: 'Amundsen ve Nobile\'nin Kuzey Kutbu zeplin seferlerine çıktığı tarihi kutup araştırma üssü.' },
      { day: 5, title: 'Mors Kolonisi & Poolepynten Sahili', description: 'Zodyak botlarla kıyıya çıkış; dev fildişleriyle kumda güneşlenen mors sürülerini güvenli mesafeden izleme.' },
      { day: 6, title: 'Bellsund Tundrası ve Arktik Tilki', description: 'Yosun tundrasında 4 saatlik yürüyüş; yaz kürkündeki beyaz arktik tilkileri ve bitki örtüsü.' },
      { day: 7, title: 'Barentsburg ve Kıyı Buzulları', description: 'Aktif Rus maden yerleşimi ve buzul şelaleleri altında kano/zodyak manevraları.' },
      { day: 8, title: 'Longyearbyen Dönüşü & Küresel Tohum Deposu', description: 'Kıyamet tohum deposunun dış yapısı ziyareti ve kutup akşam yemeği.' },
      { day: 9, title: 'Oslo Bağlantılı Dönüş', description: 'Arktik sertifikalarının takdimi ve dönüş uçuşu.' }
    ],
    included: ['Buz sınıfı butik sefer gemisinde tam pansiyon konaklama', 'Tüm zodyak bot turları ve kıyı çıkarma yürüyüşleri', 'Kutup biyoloğu ve tüfekli kutup ayısı güvenlik muhafızları', 'Özel su geçirmez polar ve kauçuk Muck Boot bot tahsisi'],
    excluded: ['Oslo - Longyearbyen uçuşları', 'Kişisel harcamalar ve bar tüketimleri'],
    gearRequirements: ['Termal rüzgar geçirmez içlikler', 'Kutup eldivenleri ve yün bere', 'Su geçirmez kuru çanta (dry bag)'],
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Svalbard Spitsbergen fiyordunda yüzen masmavi aysbergler ve arktik dağlar',
    tags: ['Svalbard', 'Kuzey Kutbu', 'Buzul Fiyortları', 'Morslar', 'Kutup Seferi']
  },
  {
    id: 'exp-15',
    slug: 'dogu-gronland-sermilik-ve-inuit-patikalari',
    title: 'Doğu Grönland Sermilik Fiyordu ve Aysberg Seyrüseferi',
    subtitle: 'Tasiilaq dağlarından Sermilik aysberg otoyoluna ve terkedilmiş Inuit kışlaklarına',
    region: 'Ammassalik Havzası',
    country: 'Grönland',
    category: 'arktik_ve_kutup_havzasi',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta-Zor',
    altitudeProfile: 'Deniz seviyesi - 800 m (Çiçekler Vadisi Sırtı)',
    bestSeasons: ['Temmuz', 'Ağustos'],
    pricePerPerson: 4800,
    currency: 'EUR',
    displayPrice: '€4.800 / kişi başı',
    overview: 'Dünyanın en izole coğrafyalarından Doğu Grönland\'da, Grönland buzul örtüsünden (Inlandsis) kopan apartman büyüklüğündeki devasa turkuaz aysberglerin aktığı Sermilik Fiyordu. Ammassalik Inuit avcılarının fok derisi dikişleri, köpek kızağı patikaları ve granitten yükselen fiyort vadilerinde vahşi kamp.',
    itinerarySummary: [
      { day: 1, title: 'İzlanda Kulusuk\'tan Tasiilaq Helikopter Geçişi', description: 'Buzlu okyanus üzerinden helikopterle renkli ahşap evlerin serpiştiği Tasiilaq kasabasına varış.' },
      { day: 2, title: 'Çiçekler Vadisi (Valley of Flowers)', description: 'Arktik çiçeklerin yeşerdiği vadiden geçerek göller ve buzullara bakan sırtlarda 5 saatlik yürüyüş.' },
      { day: 3, title: 'Sermilik Fiyordu Bot Geçişi', description: 'Aysberg labirentleri arasından özel açık botlarla Sermilik kıyısına geçiş ve buzul kampı.' },
      { day: 4, title: 'Inlandsis Buz Örtüsü Seyri', description: 'Kutup örtüsünün sonsuz beyazlığına bakan granit sırtta yürüyüş; buzulların kırılma sesleri (calving).' },
      { day: 5, title: 'İkkatteq Terk Edilmiş Inuit Köyü', description: '1960\'larda boşaltılmış çim ev kalıntıları, balina kemikleri ve sessiz kıyı yürüyüşü.' },
      { day: 6, title: 'Tiniteqilaaq Balıkçı Kasabası', description: 'Yalnızca 100 kişinin yaşadığı fiyort burnunda Inuit avcılarıyla buluşma ve fok derisi atölyesi.' },
      { day: 7, title: 'Aysbergler Arasında Deniz Kanosu', description: 'Sakin koylarda dev buz heykelleri arasında profesyonel kuru giysili kano deneyimi.' },
      { day: 8, title: 'Kulusuk & Reykjavik Dönüşü', description: 'Kulusuk adasına botla dönüş ve İzlanda\'ya uçuş.' }
    ],
    included: ['Tasiilaq helikopter ve özel deniz botu lojistiği', 'Yerel Inuit rehber ve kutup güvenlik lideri', 'Tüm çadır kampı ve konukevi konaklamaları', 'Deniz kanosu özel kuru giysileri'],
    excluded: ['Reykjavik - Kulusuk uçuşları', 'Kişisel seyahat sigortası'],
    gearRequirements: ['Gore-Tex rüzgar ve yağmur geçirmez katmanlar', '-10°C kaz tüyü uyku tulumu', 'Şişme mat (yüksek R-değerli)'],
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Doğu Grönland fiyordunda yüzen devasa turkuaz aysbergler ve karlı zirveler',
    tags: ['Grönland', 'Aysbergler', 'Inuit Kültürü', 'Sermilik', 'Arktik Kamp']
  },
  {
    id: 'exp-16',
    slug: 'izlanda-dogu-fiyortlari-ve-bazalt-kanyonlar',
    title: 'İzlanda Doğu Fiyortları, Stuðlagil Bazalt Kanyonu ve Lav Ovaları',
    subtitle: 'Seyðisfjörður renkli vadilerinden Hengifoss bazalt şelalesine ve ıssız fiyort patikalarına',
    region: 'Doğu İzlanda (Austurland)',
    country: 'İzlanda',
    category: 'arktik_ve_kutup_havzasi',
    duration: { days: 7, nights: 6, text: '7 Gün / 6 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi - 950 m (Dyrfjöll Geçidi)',
    bestSeasons: ['Haziran', 'Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 3200,
    currency: 'EUR',
    displayPrice: '€3.200 / kişi başı',
    overview: 'Turist kalabalıklarının uzağında, İzlanda\'nın en yaşlı jeolojik katmanlarını barındıran Doğu Fiyortları. Simetrik altıgen bazalt sütunlarıyla meşhur turkuaz suların aktığı Stuðlagil Kanyonu, kırmızı kil şeritli Hengifoss Şelalesi ve sislerin içinden yükselen Dyrfjöll kapı kayalıklarında yürüyüş.',
    itinerarySummary: [
      { day: 1, title: 'Egilsstaðir & Lagarfljót Gölü', description: 'Reykjavik\'ten doğuya iç hat uçuşu; efsanevi su canavarı gölü Lagarfljót eteklerinde buluşma.' },
      { day: 2, title: 'Stuðlagil Kanyonu Bazalt Sütunları', description: 'Dünyanın en görkemli bazalt kolonları arasında nehir boyu 10 km yürüyüş ve jeolojik inceleme.' },
      { day: 3, title: 'Hengifoss ve Litlanesfoss Şelaleleri', description: 'Volkanik kül ve bazalt tabakalarının kırmızı şeritler oluşturduğu 128 metrelik şelaleye tırmanış.' },
      { day: 4, title: 'Borgarfjörður Eystri & Puffin Kolonisi', description: 'Kuzey Atlantik deniz papağanlarının (Puffin) yuvalama kayalıklarında kuş gözlemi ve elf tepeleri.' },
      { day: 5, title: 'Dyrfjöll (Kapı Dağı) Alpin Geçişi', description: 'Devasa bir yarığın böldüğü volkanik masif boyunca 7 saatlik sisli dağ yürüyüşü.' },
      { day: 6, title: 'Seyðisfjörður Sanat Kasabası ve Jeotermal Havuzlar', description: 'Fiyordun tabanında yer alan ahşap Norveç evleri, mavi kilise ve açık hava jeotermal banyo.' },
      { day: 7, title: 'Egilsstaðir & Reykjavik Dönüşü', description: 'Doğu fiyortları kapanış öğle yemeği ve başkente uçuş.' }
    ],
    included: ['İzlanda jeolojisi uzmanı dağ rehberi', 'Tüm iç hat uçuşları (Reykjavik-Egilsstaðir)', 'Butik fiyort otelleri ve çiftlik evleri konaklaması', 'Özel 4x4 minibüs ile tüm transferler'],
    excluded: ['İzlanda uluslararası uçuşları', 'Öğle yemekleri ve kişisel harcamalar'],
    gearRequirements: ['Tam su geçirmez fırtına pantolonu ve ceketi', 'Bilek korumalı dağ botu', 'Termal şapka ve eldivenler'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'İzlanda Studlagil kanyonu altıgen bazalt sütunları ve turkuaz buzul nehri',
    tags: ['İzlanda', 'Bazalt Sütunları', 'Puffin', 'Doğu Fiyortları', 'Şelaleler']
  },
  {
    id: 'exp-17',
    slug: 'norvec-lofoten-adasi-ve-gece-gunesi-sirtlari',
    title: 'Lofoten Adaları Sırt Geçişi ve Gece Güneşi Yürüyüşleri',
    subtitle: 'Reinebringen granit sırtından Kvalvika saklı plajına ve balıkçı Rorbu kulübelerine',
    region: 'Nordland / Arktik Daire',
    country: 'Norveç',
    category: 'arktik_ve_kutup_havzasi',
    duration: { days: 7, nights: 6, text: '7 Gün / 6 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi - 650 m (Ryten ve Reinebringen zirveleri)',
    bestSeasons: ['Haziran', 'Temmuz', 'Ağustos'],
    pricePerPerson: 2950,
    currency: 'EUR',
    displayPrice: '€2.950 / kişi başı',
    overview: 'Kuzey Kutup Çizgisi\'nin üzerinde, denizin içinden duvar gibi dimdik yükselen granit kuleler. Güneşin 24 saat batmadığı gece güneşi (Midnight Sun) döneminde, gece yarısı altın sarısı ışıklar altında Reinebringen sırtına tırmanıp okyanusa bakan fiyortları izleyen masalsı bir İskandinav rotası.',
    itinerarySummary: [
      { day: 1, title: 'Bodø\'den Moskenes Feribotu', description: 'Vestfjorden fiyordu aşılarak Lofoten duvarının (Lofotveggen) ufukta belirişi; Å kasabasına varış.' },
      { day: 2, title: 'Reinebringen Sırtı Gece Yarısı Yürüyüşü', description: '1.560 taş basamakla dik zirveye tırmanış; gece 23:30\'da batan ve doğmayan güneşin altın ışıkları.' },
      { day: 3, title: 'Kvalvika Plajı ve Ryten Zirvesi', description: 'Yalnızca yürüyerek ulaşılan turkuaz Arktik plajı; dev uçurum kenarından okyanus manzarası.' },
      { day: 4, title: 'Nusfjord UNESCO Balıkçı Köyü', description: 'Kurutulmuş morina balığı (skrei) ahşap iskeleleri ve 19. yüzyıl otantik kırmızı Rorbu kulübeleri.' },
      { day: 5, title: 'Henningsvær Futbol Sahası ve Sanat Galerileri', description: 'Kayalık adacıklar üzerine kurulu Venedik benzeri balıkçı yerleşimi; deniz kanosu keşfi.' },
      { day: 6, title: 'Festvågtind Zirvesi ve Fiyort Boğazları', description: 'Kıvrımlı köprüler ve zümrüt sığlıklara bakan kayalık zirvede son yüksek yürüyüş.' },
      { day: 7, title: 'Svolvær ve Dönüş', description: 'Lofoten Krallığı veda öğle yemeği ve havalimanı transferi.' }
    ],
    included: ['Lofoten uzmanı dağ rehberi', 'Geleneksel restore deniz kıyısı Rorbu kulübe konaklamaları', 'Tüm ada içi özel minibüs transferleri', 'Yerel Arktik morina balığı ve deniz mahsulleri tadımları'],
    excluded: ['Bodø/Svolvær uçuşları', 'Kişisel harcamalar'],
    gearRequirements: ['İyi tutunan su geçirmez dağ ayakkabısı', 'Rüzgar geçirmez nefes alabilir ceket', 'Göz bandı (gece güneşi uyku konforu için)'],
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Lofoten Adaları Reine fiyordu kırmızı kulübeleri ve sarp granit dağlar',
    tags: ['Lofoten', 'Norveç', 'Gece Güneşi', 'Reinebringen', 'Rorbu']
  },
  {
    id: 'exp-18',
    slug: 'faroe-adalari-kuzey-atlantik-ucurumlari',
    title: 'Faroe Adaları Sisli Uçurum Patikaları ve Deniz Bacaları',
    subtitle: 'Sørvágsvatn okyanus üstü gölünden Kalsoy Kallur Feneri ve Drangarnir kayalıklarına',
    region: 'Kuzey Atlantik',
    country: 'Faroe Adaları (Danimarka)',
    category: 'arktik_ve_kutup_havzasi',
    duration: { days: 6, nights: 5, text: '6 Gün / 5 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi - 500 m (Kallur Feneri Sırtı)',
    bestSeasons: ['Mayıs', 'Haziran', 'Temmuz', 'Ağustos'],
    pricePerPerson: 2850,
    currency: 'EUR',
    displayPrice: '€2.850 / kişi başı',
    overview: 'Kuzey Atlantik\'in azgın dalgaları ortasında 18 volkanik bazalt adası. Çatısı çim kaplı masalsı evler, binlerce koyun ve okyanusun tam üzerinde asılı duran optik illüzyonlu Sørvágsvatn Gölü. Sislerin aniden dağılıp devasa deniz kemerlerini ortaya çıkardığı dramatik bir ada ekspedisyonu.',
    itinerarySummary: [
      { day: 1, title: 'Vágar Havalimanı & Gásadalur Múlafossur Şelalesi', description: 'Okyanusa doğrudan dökülen ünlü şelale ve izole tünel öncesi yürüyüş patikası.' },
      { day: 2, title: 'Sørvágsvatn (Okyanusun Üstündeki Göl)', description: 'Trælanípa (Köle Kayalığı) uçurumundan göl ile okyanusun dikey katmanlaşmasını izleme.' },
      { day: 3, title: 'Drangarnir Deniz Kemeri Tekne ve Yürüyüşü', description: 'Azgın okyanus akıntılarından yükselen delikli kaya kemerine özel tekneyle yanaşma ve yürüyüş.' },
      { day: 4, title: 'Kalsoy Adası ve Kallur Deniz Feneri', description: 'Feribotla kuzey adasına geçiş; James Bond anıt mezarı ve bıçak sırtı uçurumda fener yürüyüşü.' },
      { day: 5, title: 'Gjógv Doğal Limanı ve Saksun Lagünü', description: 'Kuzey Eysturoy\'da 200 metrelik deniz yarığı kanyonu ve gelgitle boşalan siyah kum lagünü.' },
      { day: 6, title: 'Tórshavn Tinganes ve Dönüş', description: 'Dünyanın en eski parlamento mevkilerinden çim çatılı tarihi hükümet binaları ziyareti ve dönüş.' }
    ],
    included: ['Faroe Adaları yerel rehberi', 'Ada içi feribot ve denizaltı tünel geçişleri', 'Başkent Tórshavn butik tasarım oteli konaklaması', 'Kallur ve Trælanípa arazi geçiş izinleri'],
    excluded: ['Kopenhag bağlantılı Faroe uçuşları', 'Kişisel yemek ve harcamalar'],
    gearRequirements: ['Sürekli rüzgar ve yağmura dayanıklı Gore-Tex katmanlar', 'Kaymaz ıslak çim tabanlı botlar', 'Rüzgarlık kılıflı sırt çantası'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Faroe Adaları Gásadalur Múlafossur şelalesi ve yeşil uçurumlar okyanus',
    tags: ['Faroe Adaları', 'Kuzey Atlantik', 'Uçurumlar', 'Kallur Feneri', 'Doğa']
  },
  {
    id: 'exp-19',
    slug: 'kamcatka-ates-cemberi-ve-pasifik-volkanlari',
    title: 'Kamçatka Pasifik Kıyısı, Tolbaçik Lav Tarlaları ve Krater Seferi',
    subtitle: 'Pasifik Ateş Çemberi\'nin kalbinde Mutnovski, Gorely ve dev boz ayılar',
    region: 'Kamçatka Yarımadası',
    country: 'Rusya / Uzak Doğu',
    category: 'arktik_ve_kutup_havzasi',
    duration: { days: 11, nights: 10, text: '11 Gün / 10 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Ekstrem',
    altitudeProfile: 'Deniz seviyesi - 2.322 m (Mutnovski Krater Kenarı)',
    bestSeasons: ['Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 4900,
    currency: 'EUR',
    displayPrice: '€4.900 / kişi başı',
    overview: 'Dünyanın en yoğun aktif volkan kümelenmesine sahip Kamçatka Yarımadası. Yerin altından kükürt gazlarının fışkırdığı kaynayan asit gölleri, 1975 ve 2012 püskürmeleriyle oluşan ay manzaralı Tolbaçik lav tarlaları ve Pasifik somonlarını avlayan dev Kamçatka boz ayıları arasında gerçek bir vahşi doğa seferi.',
    itinerarySummary: [
      { day: 1, title: 'Petropavlovsk-Kamçatski & Avaça Koyu', description: 'Moskova üzerinden Pasifik kıyısına varış; karlı Koryakski volkanları manzarasıyla brifing.' },
      { day: 2, title: 'Mutnovski Volkanı Krater Yarığı', description: 'Dev bir buzul yarığından aktif krater içine yürüyüş; kaynayan çamur kazanları ve kükürt kuleleri.' },
      { day: 3, title: 'Gorely Krateri ve Turkuaz Asit Gölü', description: 'Lav tüpleri üzerinden 1.829 m krater zirvesine tırmanış; asit gölü kıyısında volkanik tahlil.' },
      { day: 4, title: 'KamAZ 6x6 Ağır Arazi Aracı ile Kuzey Seferi', description: 'Asfaltsız lav külleri ve tayga ormanları aşılarak Tolbaçik lav çölüne intikal.' },
      { day: 5, title: 'Ölü Orman (Dead Forest) ve Kül Tepeleri', description: 'Volkanik kül yağmuruyla kuruyan huş ormanı iskeletleri ve yeni oluşmuş cüruf konileri.' },
      { day: 6, title: 'Sıcak Lav Mağaraları Keşfi', description: 'İçinde halen yer altı sıcaklığının hissedildiği lav tünelleri ve bazalt lav akıntıları.' },
      { day: 7, title: 'Kuril Gölü Boz Ayı Gözlemi (Helikopter Seferi)', description: 'Dünyanın en büyük boz ayı populasyonunun somon avladığı göl kıyısında korucular eşliğinde gözlem.' },
      { day: 8, title: 'Gayzerler Vadisi & Uzon Kalderası', description: 'Kamçatka\'nın jeotermal harikası gayzerler üzerinde helikopter uçuşu ve termal havuzlar.' },
      { day: 9, title: 'Halaqtirski Siyah Volkanik Plajı', description: 'Pasifik Okyanusu\'nun siyah manyetit kumlarında yürüyüş ve dalga seyri.' },
      { day: 10, title: 'Malki Doğal Kaplıcaları ve Dinlenme', description: 'Yabani huş ormanları içindeki açık hava termal nehir kaynaklarında yorgunluk atma.' },
      { day: 11, title: 'Kral Yengeci Tadımı ve Dönüş', description: 'Kamçatka dev deniz yengeci veda ziyafeti ve havalimanı transferi.' }
    ],
    included: ['KamAZ 6x6 ağır arazi araçları ve özel yakıt ikmali', 'Tüfekli boz ayı korucusu ve volkanoloji rehberi', 'Tüm krater kampı ve ahşap kulübe konaklamaları', 'Kuril Gölü ve Gayzerler Vadisi helikopter izinleri'],
    excluded: ['Moskova - Petropavlovsk uçuşları', 'Kişisel kaza sigortası'],
    gearRequirements: ['Kükürt gazı filtreli koruyucu maske', 'Sert volkanik cüruf botu', '-15°C dağ uyku tulumu'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kamçatka aktif volkanı Mutnovski kraterinden tüten kükürt dumanları ve karlar',
    tags: ['Kamçatka', 'Volkanlar', 'Ateş Çemberi', 'Boz Ayılar', 'Vahşi Doğa']
  },

  // --- 4. ÇÖL, KANYON VE VOLKANİK HAVZALAR (6 Rota) ---
  {
    id: 'exp-20',
    slug: 'atacama-altiplano-lagunleri-ve-tuz-vadisi',
    title: 'Atacama Yüksek Çölü, Altiplano Lagünleri ve Tatio Gayzerleri',
    subtitle: 'Dünyanın en kurak çölünden 4.300 metredeki pembe flamingo lagünlerine',
    region: 'Antofagasta / Altiplano',
    country: 'Şili',
    category: 'coller_ve_volkanik_vadiler',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '2.400 m (San Pedro) - 4.320 m (El Tatio Gayzerleri)',
    bestSeasons: ['Mart', 'Nisan', 'Ekim', 'Kasım'],
    pricePerPerson: 3450,
    currency: 'EUR',
    displayPrice: '€3.450 / kişi başı',
    overview: 'Yüzlerce yıl tek damla yağmur düşmeyen vadileriyle NASA\'nın Mars araçlarını test ettiği Atacama Çölü. Ay Vadisi\'nin (Valle de la Luna) tuz heykellerinden Licancabur Volkanı eteklerindeki kırmızı sığ lagünlere, şafak vakti eksi 10 derecede kaynayan Tatio gayzerlerinden dünyanın en berrak gökyüzü astronomi gözlemine uzanan bir mineral senfonisi.',
    itinerarySummary: [
      { day: 1, title: 'Calama\'dan San Pedro de Atacama Vahası', description: 'Kerpiç mimarili çöl kasabasına yerleşme ve yüksek irtifa aklimatizasyon brifingi.' },
      { day: 2, title: 'Valle de la Luna (Ay Vadisi) & Gün Batımı', description: 'Rüzgarın oyduğu kumul ve tuz kanyonlarında yürüyüş; gün batımında kızıla boyanan And Dağları.' },
      { day: 3, title: 'Salar de Atacama & Chaxa Lagünü', description: 'Uçsuz bucaksız tuz kabukları arasında beslenen James, And ve Şili flamingo kolonilerini izleme.' },
      { day: 4, title: 'Miscanti ve Miñiques Altiplano Gölleri (4.200 m)', description: 'Lacivert volkanik göller kıyısında yürüyüş; yabani vikunya (vicuña) sürüleri.' },
      { day: 5, title: 'Kırmızı Taşlar (Piedras Rojas) ve Salar de Talar', description: 'Demir kırmızısı kaya oluşumları ve zümrüt rengi tuzlu sığlıklar arasında 4 saatlik keşif.' },
      { day: 6, title: 'El Tatio Gayzerleri (4.320 m)', description: 'Şafakta 05:00 çıkışı; donmuş havada topraktan fışkıran buhar sütunları ve termal havuzda banyo.' },
      { day: 7, title: 'Catarpe Kanyonu ve Karanlık Gökyüzü Astronomisi', description: 'Şeytan Boğazı kanyonunda yürüyüş; gece profesyonel teleskoplarla Samanyolu ve Magellan Bulutları gözlemi.' },
      { day: 8, title: 'Calama ve Santiago Bağlantısı', description: 'Çöl müzesi ziyareti ve havalimanı transferi.' }
    ],
    included: ['Atacama astrofizik ve çöl ekolojisi rehberi', 'San Pedro\'da sürdürülebilir lüks kerpiç loca konaklaması', 'Özel astronomi seansı ve teleskop ekipmanı', '4x4 arazi aracı ve oksijen tüpü güvencesi'],
    excluded: ['Santiago - Calama iç hat uçuşları', 'Milli park giriş ücretleri'],
    gearRequirements: ['Gündüz sıcağı ve gece ayazı için çok katmanlı giyim', 'Kategori 3 UV korumalı güneş gözlüğü', 'Dudak ve burun nemlendirici balzam'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Atacama Çölü Altiplano lagünü pembe flamingolar ve karlı volkan zirveleri',
    tags: ['Atacama', 'Şili', 'Altiplano', 'Gayzerler', 'Astronomi']
  },
  {
    id: 'exp-21',
    slug: 'rubulhali-bos-col-ve-hajar-kanyonlari',
    title: 'Umman Rubülhali (Boş Çöl) Kumulları ve Hajar Kanyonları',
    subtitle: 'Wahiba kum denizinden Jebel Shams kanyonuna ve Bedevi vahalarına kervan rotası',
    region: 'Ad Dakhiliyah & Sharqiyah',
    country: 'Umman Sultanlığı',
    category: 'coller_ve_volkanik_vadiler',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi (Maskat) - 3.009 m (Jebel Shams)',
    bestSeasons: ['Kasım', 'Aralık', 'Ocak', 'Şubat'],
    pricePerPerson: 2950,
    currency: 'EUR',
    displayPrice: '€2.950 / kişi başı',
    overview: 'Arap Yarımadası\'nın en efsanevi coğrafyası: Wilfred Thesiger\'in geçtiği uçsuz bucaksız Rubülhali kum denizinin etekleri. Wahiba Sands\'in 100 metrelik kızıl kumullarından "Arabistan\'ın Büyük Kanyonu" Jebel Shams\'ın 1.000 metrelik uçurum sırtına, zümrüt rengi vadi havuzlarında (Wadi Shab) yüzmeyle tamamlanan mistik bir Doğu seferi.',
    itinerarySummary: [
      { day: 1, title: 'Maskat Sultan Kabus Camii ve Eski Çarşı', description: 'Görkemli mermer cami, Mutrah çarşısında buhur ve mür kokuları arasında sefer açılışı.' },
      { day: 2, title: 'Wadi Shab Zümrüt Kanyonu', description: 'Palmiye ağaçları arasından kanyon içi yürüyüş; gizli mağara şelalesine yüzerek ulaşım.' },
      { day: 3, title: 'Wahiba Sands (Şarkiye Kumulları)', description: '4x4 araçlarla hava basıncı indirilerek kum denizine giriş; 100 metrelik kule kumullarda gün batımı.' },
      { day: 4, title: 'Bedevi Kampı ve Develi Çöl Yürüyüşü', description: 'Bedevi rehberler eşliğinde yalınayak kum dalgaları üzerinde sabah yürüyüşü ve kakuleli kahve.' },
      { day: 5, title: 'Nizwa Kalesi ve Cuma Keçi Pazarı', description: '17. yüzyıl yuvarlak kalesi, gümüş hançer (hancer) ustaları ve tarihi pazar.' },
      { day: 6, title: 'Jebel Shams Kanyonu (Balkon Patikası)', description: '1.000 metrelik dikey uçurum kenarındaki antik terk edilmiş Sap Bani Khamis köyüne yürüyüş.' },
      { day: 7, title: 'Misfat al Abriyeen Terras Köyü ve Falaj Kanalları', description: 'Kerpiç evler, muz bahçeleri ve UNESCO korumasındaki bin yıllık yerçekimli su kanalları.' },
      { day: 8, title: 'Maskat Dönüşü ve Uçuş', description: 'Umman Körfezi kıyısından başkente dönüş ve seyahatin noktalanması.' }
    ],
    included: ['Ummanlı Bedevi ve kanyon dağ rehberleri', 'Lüks çöl çadır kampı ve dağ loca konaklamaları', '4x4 arazi araçları ve özel çöl şoförleri', 'Tüm kanyon ve vadi giriş izinleri'],
    excluded: ['Maskat uluslararası uçak biletleri', 'Kişisel harcamalar'],
    gearRequirements: ['Kanyon yürüyüşü için ıslanabilir kanyon ayakkabısı', 'Güneş koruyucu keten gömlek ve şapka', 'Akşam çöl ayazı için hafif mont'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Umman Wahiba Sands kızıl çöl kumulları ve gün batımı deve kervanı',
    tags: ['Umman', 'Wahiba Sands', 'Jebel Shams', 'Wadi Shab', 'Bedevi']
  },
  {
    id: 'exp-22',
    slug: 'namib-kumullari-ve-iskelet-sahili-kesfi',
    title: 'Namib Kırmızı Kumulları, Sossusvlei ve Sisli İskelet Sahili',
    subtitle: 'Deadvlei kurumuş akasyalarından Swakopmund gemi enkazlarına ve çöl filleri vadisine',
    region: 'Namib-Naukluft & Damaraland',
    country: 'Namibya',
    category: 'coller_ve_volkanik_vadiler',
    duration: { days: 10, nights: 9, text: '10 Gün / 9 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi - 1.200 m (Naukluft Platosu)',
    bestSeasons: ['Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 4200,
    currency: 'EUR',
    displayPrice: '€4.200 / kişi başı',
    overview: 'Dünyanın en eski çölü kabul edilen 55 milyon yıllık Namib. Sossusvlei\'nin 300 metrelik dev kiremit kırmızısı kumulları ardında 900 yıldır çürümeden ayakta duran Deadvlei akasya iskeletleri. Atlantik fırtınalarının gemileri karaya vurduğu tekinsiz İskelet Sahili ve susuzluğa uyum sağlamış Damaraland çöl filleri.',
    itinerarySummary: [
      { day: 1, title: 'Windhoek\'ten Namib Çölü Kenarına Sürüş', description: 'Khomas yaylasından Namib-Naukluft Parkı sınırındaki kırmızı tepeciklere iniş.' },
      { day: 2, title: 'Dune 45 ve Big Daddy Kumulu Tırmanışı', description: 'Gündoğumunda dünyanın en yüksek kumullarından birine tırmanış; sırt hattında çıplak ayak yürüyüş.' },
      { day: 3, title: 'Deadvlei Beyaz Kil Çanağı', description: 'Beyaz kil tabanı üzerinde 900 yıllık simsiyah kurumuş deve dikeni ağaçlarının görsel dramı.' },
      { day: 4, title: 'Sesriem Kanyonu ve Kuiseb Kuru Nehri', description: 'Su erozyonuyla yarılmış dar konglomera kanyonunda yürüyüş ve jeolojik katmanlar.' },
      { day: 5, title: 'Walvis Bay Flamingo Lagünü ve Swakopmund', description: 'Atlantik Okyanusu kıyısında binlerce flamingo ve pelikan sürüsü; Alman sömürge mimarisi.' },
      { day: 6, title: 'İskelet Sahili (Skeleton Coast) ve Gemi Enkazları', description: 'Soğuk Benguela akıntısının sisleriyle kaplı sahilde kumlara saplanmış gemi gövdeleri ve kürklü fok kolonisi.' },
      { day: 7, title: 'Damaraland & Çöl Filleri Takibi', description: 'Kuru nehir yataklarında yeraltı sularını bularak hayatta kalan vahşi çöl filleri sürüsünü izleme.' },
      { day: 8, title: 'Twyfelfontein UNESCO Kaya Oymaları', description: 'San (Buşman) avcı toplayıcılarının 6.000 yıl önce kırmızı kumtaşına kazıdığı şamanik hayvan resimleri.' },
      { day: 9, title: 'Spitzkoppe Granit İğneleri', description: '"Namibya\'nın Matterhorn\'u" olarak bilinen devasa granit kaya kemeri altında son çöl kampı.' },
      { day: 10, title: 'Windhoek Dönüşü ve Uçuş', description: 'Okahandja ahşap oyma pazarı üzerinden başkente intikal ve dönüş.' }
    ],
    included: ['Namibya vahşi yaşam ve çöl uzmanı rehber', 'Özel safari modifiyeli açık tavanlı 4x4 araç', 'Tüm vahşi doğa locaları ve glamping kamp konaklamaları', 'Milli park ve UNESCO koruma alanları girişleri'],
    excluded: ['Windhoek uluslararası uçuşları', 'Kişisel harcamalar'],
    gearRequirements: ['İnce çöl kumu için toz geçirmez kamera kılıfı', 'Geniş kenarlı safari şapkası', 'Polar mont (çölde gece sıcaklıkları hızla düşer)'],
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
    alt: 'Namibya Deadvlei beyaz kil çanağında kurumuş kara ağaçlar ve dev kırmızı kumullar',
    tags: ['Namibya', 'Sossusvlei', 'Deadvlei', 'İskelet Sahili', 'Çöl Filleri']
  },
  {
    id: 'exp-23',
    slug: 'vadi-rum-kizil-kumtaslari-ve-dana-biyosferi',
    title: 'Vadi Rum Kızıl Kumtaşı Kanyonları ve Dana Biyosfer Rezervi',
    subtitle: 'Lawrence\'ın izinde Jebel Rum kaya köprülerinden Petra arka patikalarına',
    region: 'Güney Çöl Havzası',
    country: 'Ürdün',
    category: 'coller_ve_volkanik_vadiler',
    duration: { days: 7, nights: 6, text: '7 Gün / 6 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi altı (-400 m Ölü Deniz) - 1.734 m (Jebel Umm ad Dami)',
    bestSeasons: ['Mart', 'Nisan', 'Ekim', 'Kasım'],
    pricePerPerson: 2450,
    currency: 'EUR',
    displayPrice: '€2.450 / kişi başı',
    overview: 'Arabistanlı Lawrence\'ın "Engin, yankılı ve tanrısal" diye nitelediği Vadi Rum\'un monolitik kumtaşı kuleleri. Bedevi rehberlerin izinde Um Fruth kaya köprüsüne tırmanış, Dana Biyosferi\'nin dağdan çöle inen dört farklı iklim kuşağında yürüyüş ve Petra\'nın meşhur Manastır (Ad Deir) yapısına turist kalabalıklarına girmeden arka dağ patikalarından yaklaşım.',
    itinerarySummary: [
      { day: 1, title: 'Amman\'dan Dana Biyosfer Rezervi\'ne Sürüş', description: 'Kral Yolu üzerinden 15. yüzyıl taş köyü Dana\'ya intikal ve kanyon gün batımı.' },
      { day: 2, title: 'Wadi Dana Kanyon Yürüyüşü (14 km)', description: 'Meşe ormanlarından akasya çölüne 1.000 metrelik iniş; Feynan eko-locasında mum ışığı gecesi.' },
      { day: 3, title: 'Petra\'ya Arka Dağ Patikasından Giriş', description: 'Küçük Petra\'dan (Siq al-Barid) kanyon basamaklarını aşarak doğrudan Manastır\'a (Ad Deir) çıkış.' },
      { day: 4, title: 'Nebati Krallığı Petra Başkenti', description: 'Görkemli Hazine (Al-Khazneh), Kraliyet Mezarları ve kaya su kanalları arkeoloji incelemesi.' },
      { day: 5, title: 'Vadi Rum Kızıl Çölüne İntikal', description: 'Bedevi pikaplarıyla kızıl kuma giriş; Burrah Kanyonu ve Khazali yarığındaki antik Thamudik yazıtlar.' },
      { day: 6, title: 'Jebel Umm ad Dami (Ürdün\'ün En Yüksek Zirvesi)', description: '1.854 metredeki zirveye 4 saatlik tırmanış; Suudi Arabistan sınırına uzanan 360 derece çöl ufku.' },
      { day: 7, title: 'Ölü Deniz (Lut Gölü) & Amman Dönüşü', description: 'Dünyanın en alçak noktasında tuzlu suda batmadan yüzme ve havalimanı transferi.' }
    ],
    included: ['Nebati arkeolojisi ve Bedevi dağ rehberleri', 'Feynan Eko-Locası ve Vadi Rum lüks Bedevi çadırı konaklamaları', 'Petra arka kapı özel yürüyüş izinleri', 'Ölü Deniz spa ve dinlenme erişimi'],
    excluded: ['Amman uçuşları', 'Ürdün vizesi (Jordan Pass ile muafiyet sağlanabilir)'],
    gearRequirements: ['Kayalık kumtaşına uygun tabanlı ayakkabı', 'Hafif nefes alabilir uzun yürüyüş pantolonu', 'Kafa feneri ve güneş gözlüğü'],
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ürdün Vadi Rum kızıl kumtaşı kanyonları ve bedevi deve yürüyüşü',
    tags: ['Vadi Rum', 'Petra', 'Ürdün', 'Nebatiler', 'Kızıl Çöl']
  },
  {
    id: 'exp-24',
    slug: 'danakil-cokuntusu-ve-erta-ale-lav-golu',
    title: 'Danakil Çöküntüsü, Asit Havuzları ve Erta Ale Yaşayan Lav Gölü',
    subtitle: 'Dünyanın en sıcak cehennemi Dallol kükürt havzalarından bazalt kraterine',
    region: 'Afar Üçgeni',
    country: 'Etiyopya',
    category: 'coller_ve_volkanik_vadiler',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 6, text: '4 - 6 Kişi' },
    difficulty: 'Ekstrem',
    altitudeProfile: 'Deniz seviyesi altı (-125 m Dallol) - 613 m (Erta Ale Krater Sırtı)',
    bestSeasons: ['Kasım', 'Aralık', 'Ocak', 'Şubat'],
    pricePerPerson: 3950,
    currency: 'EUR',
    displayPrice: '€3.950 / kişi başı',
    overview: 'Yerkabuğunun üç tektonik plakasının birbirinden ayrıldığı ve dünyanın en sıcak ortalama sıcaklığına sahip Danakil Çöküntüsü. Deniz seviyesinin 125 metre altında sarı, nefti ve turkuaz asit gayzerlerinin kaynadığı Dallol mantar bacaları, gece zifiri karanlıkta kızıl lav dalgalarının çalkalandığı Erta Ale yanardağı ve tuz kervanları.',
    itinerarySummary: [
      { day: 1, title: 'Addis Ababa\'dan Semera\'ya Uçuş', description: 'Afar Bölgesi başkentine varış; silahlı korucular ve 4x4 konvoyunun hazırlanması.' },
      { day: 2, title: 'Afdera Tuz Gölü ve Termal Sular', description: 'Göl kenarındaki geleneksel tuz çıkarma havzaları ve açık hava çadır kampı.' },
      { day: 3, title: 'Erta Ale Volkanı Etekleri (Dodom Kampı)', description: 'Katılaşmış bazalt lav dalgaları üzerinden sürüş; gün batımında krater tırmanışına hazırlık.' },
      { day: 4, title: 'Erta Ale Krater Ağzında Gece (Yaşayan Lav Gölü)', description: 'Gece 03:00\'te krater kenarına yürüyüş; gözler önünde fokurdayan erimiş lav gölünün hipnotik dansı.' },
      { day: 5, title: 'Ahmed Ela Afar Köyü', description: 'Tuz madenciliğiyle yaşayan Afar kabilelerinin çalı kulübeleri ve deve kervanları buluşma noktası.' },
      { day: 6, title: 'Dallol Asit Havuzları ve Kükürt Gayzerleri (-125 m)', description: 'Başka bir gezegeni andıran sarı-yeşil sodyum klorür bacaları ve hidrotermal teraslar.' },
      { day: 7, title: 'Assale Tuz Gölü ve Geleneksel Tuz Kesiciler', description: 'Uçsuz bucaksız beyaz tuz ovasında baltalarla tuz kalıpları kesen işçiler ve Tigray\'a dönüş.' },
      { day: 8, title: 'Mekele & Addis Ababa Uçuşu', description: 'Tigray başkentinden Addis Ababa\'ya iç hat uçuşu ve seferin tamamlanması.' }
    ],
    included: ['Özel Afar bölge izinleri ve yerel polis eskortu', 'Yüksek donanımlı 4x4 araç filosu ve mekanik destek ekibi', 'Çöl aşçısı, bol içme suyu ve mobil kamp donanımı', 'Volkanoloji ve jeoloji anlatımları'],
    excluded: ['Addis Ababa uluslararası biletleri', 'Kişisel ekstrem spor ve tahliye sigortası'],
    gearRequirements: ['Asit buharına dayanıklı kapalı yürüyüş botu', 'Solunum koruyucu toz ve kükürt gazı maskesi', 'Elektrolit tozları ve yüksek faktörlü güneş koruyucu'],
    imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Etiyopya Danakil Çöküntüsü Dallol asit havuzları parlak sarı kükürt bacaları',
    tags: ['Danakil', 'Erta Ale', 'Lav Gölü', 'Etiyopya', 'Ekstrem Keşif']
  },
  {
    id: 'exp-25',
    slug: 'izlanda-ic-yaylalari-ve-askja-krater-golu',
    title: 'İzlanda İç Yaylası (Highlands), Sprengisandur ve Askja Kalderası',
    subtitle: 'İnsan ayağının değmediği kara volkanik çöl Sprengisandur\'dan Víti jeotermal kraterine',
    region: 'İzlanda Highlands (Merkez Platosu)',
    country: 'İzlanda',
    category: 'coller_ve_volkanik_vadiler',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 6, text: '4 - 6 Kişi' },
    difficulty: 'Zorlu',
    altitudeProfile: 'Deniz seviyesi - 1.100 m (Dyngjufjöll Dağları)',
    bestSeasons: ['Temmuz', 'Ağustos'],
    pricePerPerson: 3850,
    currency: 'EUR',
    displayPrice: '€3.850 / kişi başı',
    overview: 'Yalnızca yılın 6-8 haftası nehir debilerinin izin verdiği dönemde girilebilen İzlanda\'nın ıssız iç yaylaları (Hálendið). Apollo astronotlarının Ay yürüyüşü provası yaptığı devasa Askja Kalderası\'nda süt mavisi sıcak Víti krater gölünde yüzüş ve yüzlerce kilometrelik buzul nehirlerini aşan 4x4 seferi.',
    itinerarySummary: [
      { day: 1, title: 'Akureyri\'den Mývatn Volkanik Alanına', description: 'Kuzeyin başkentinden sahte kraterler ve lav labirentleri Dimmuborgir\'e intikal.' },
      { day: 2, title: 'F-Yolları ve Highlands Girişi', description: 'Nehir geçişleri yaparak ıssız siyah lav ovalarına giriş; Herðubreiðarlindir vahası kampı.' },
      { day: 3, title: 'Herðubreið (Dağların Kraliçesi) Etekleri', description: 'Masa dağı şeklindeki volkanın etrafında 15 km buzul döküntüsü yürüyüşü.' },
      { day: 4, title: 'Askja Kalderası ve Víti Jeotermal Krateri', description: '50 kilometrekarelik dev kalderanın içinden geçerek 25°C sıcaklıktaki sülfürlü Víti kraterine iniş ve yüzme.' },
      { day: 5, title: 'Holuhraun Yeni Lav Tarlaları', description: '2014 püskürmesiyle oluşan İzlanda\'nın en genç bazalt lav arazisinde jeolog eşliğinde yürüyüş.' },
      { day: 6, title: 'Kverkfjöll Buz Mağaraları ve Vatnajökull Sınırı', description: 'Avrupa\'nın en büyük buzulunun magma ile buluştuğu jeotermal buz mağaraları incelemesi.' },
      { day: 7, title: 'Sprengisandur Çöl Geçişi', description: 'İki buzul arasından güneye inen 200 km\'lik ıssız çöl parkuru ve nehir geçişleri.' },
      { day: 8, title: 'Reykjavik Varışı ve Kapanış', description: 'Başkente varış, İzlanda kuzu eti ziyafeti ve seferin sonu.' }
    ],
    included: ['Modifiye 38 inç lastikli Super-Jeep araçlar', 'İzlanda Highlands uzmanı rehber ve nehir geçiş lideri', 'Yayla dağ kulübesi ve çadır konaklamaları', 'Uydu telefonu ve acil durum radyo kiti'],
    excluded: ['Uluslararası uçuşlar', 'Kişisel uyku tulumu'],
    gearRequirements: ['Nehir geçişi için neopren çorap ve ayakkabı', 'En az 20.000 mm su sütunu fırtına kıyafetleri', '-5°C konfor uyku tulumu'],
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    alt: 'İzlanda Askja kalderası Viti jeotermal krater gölü ve siyah lav çölü',
    tags: ['İzlanda', 'Askja', 'Highlands', 'Süper Jeep', 'Lav Çölü']
  },

  // --- 5. YÜKSEK DAĞLAR VE HİMALAYA MASİFLERİ (6 Rota) ---
  {
    id: 'exp-26',
    slug: 'zanskar-chadar-donmus-nehir-ve-manastirlar',
    title: 'Zanskar Chadar Donmuş Nehir Seferi ve Kar Manastırları',
    subtitle: 'Zanskar Kanyonu\'nda -30 derecede donmuş nehir buzunda (Chadar) kış yürüyüşü',
    region: 'Ladakh / Trans-Himalaya',
    country: 'Hindistan',
    category: 'himalayalar_ve_alp_masifleri',
    duration: { days: 9, nights: 8, text: '9 Gün / 8 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Ekstrem',
    altitudeProfile: '3.300 m (Leh) - 3.850 m (Padum)',
    bestSeasons: ['Ocak', 'Şubat'],
    pricePerPerson: 3800,
    currency: 'EUR',
    displayPrice: '€3.800 / kişi başı',
    overview: 'Himalayalar kışın tüm geçitleri kapattığında, Zanskar halkının dış dünyayla tek bağlantısı donan Zanskar Nehri\'nin üzerindeki buz örtüsüdür (Chadar - Buz Çarşafı). Eksi 30 derecede akan suyun üzerinde oluşan turkuaz cam gibi buz tabakaları üzerinde kızaklarla yürüyüş ve karlar altındaki bin yıllık Karsha Manastırı.',
    itinerarySummary: [
      { day: 1, title: 'Yeni Delhi\'den Leh\'e Uçuş (3.500 m)', description: 'Himalaya zirvelerinin üzerinden uçuş; Leh vadisinde ilk iki gün zorunlu katı aklimatizasyon.' },
      { day: 2, title: 'Leh Sarayı ve Thiksey Manastırı', description: 'Buda heykelleri, dönen dua çarkları ve kış soğuğuna bedensel uyum yürüyüşü.' },
      { day: 3, title: 'Chilling Köyü ve Chadar\'a İlk Adım', description: 'Nehir yatağına iniş; kramponsuz özel penguen yürüyüşü tekniğiyle buz üstünde 4 saatlik ilk intikal.' },
      { day: 4, title: 'Tibat Cave & Donmuş Şelaleler Kanyonu', description: 'Yüzlerce metre dikey kanyon duvarları arasında dev buz sarkıtları ve mağara çadır kampı.' },
      { day: 5, title: 'Naerak Kanyonu ve Devasa Donmuş Mavi Şelale', description: 'Chadar\'ın simgesi olan 60 metrelik masmavi donmuş buz şelalesine ulaşım; çay molası.' },
      { day: 6, title: 'Buz Dinamikleri ve Zanskar Vadisi Geçişi', description: 'Değişen hava akımlarıyla kırılan ve yeniden donan buz tabakalarında rehber kılavuzluğunda rota bulma.' },
      { day: 7, title: 'Dönüş İntikali ve Sıcak Çorba Kampları', description: 'Zanskar yerel taşıyıcılarının (porters) kamp ateşi şarkıları ve geleneksel Tsampa yemeği.' },
      { day: 8, title: 'Chilling\'den Leh\'e Araç Transferi', description: 'Sıcak otel odası, şömine başı dinlenme ve kutlama yemeği.' },
      { day: 9, title: 'Leh & Delhi Bağlantısı', description: 'Himalaya kış sertifikası takdimi ve dönüş uçuşu.' }
    ],
    included: ['Zanskar yerli Chadar buzul rehberleri ve kızak ekibi', 'Aşırı soğuğa dayanıklı çadırlar ve -30°C dağ uyku tulumu', 'Leh\'te ısıtmalı butik otel konaklamaları', 'Acil tahliye ve oksijen tüpü altyapısı'],
    excluded: ['Delhi - Leh uçak biletleri', 'Kişisel ekstrem dağcılık sigortası'],
    gearRequirements: ['Gömülü kürk astarlı Sorel tipi kış kutup botu', 'Rüzgar geçirmez polar ve çift katmanlı kaz tüyü ceket', 'Buz üstü tutunma çivileri (microspikes)'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Zanskar Chadar donmuş nehir yürüyüşü turkuaz buzlar ve dikey Himalaya kanyonu',
    tags: ['Zanskar', 'Chadar', 'Himalayalar', 'Donmuş Nehir', 'Kış Ekspedisyonu']
  },
  {
    id: 'exp-27',
    slug: 'mustang-gizli-kralligi-ve-lo-manthang',
    title: 'Yukarı Mustang Gizli Krallığı ve Lo Manthang',
    subtitle: 'Annapurna ve Dhaulagiri arasından rüzgarlı Tibet platosuna ve kadim mağara kentlerine',
    region: 'Yukarı Mustang',
    country: 'Nepal',
    category: 'himalayalar_ve_alp_masifleri',
    duration: { days: 12, nights: 11, text: '12 Gün / 11 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta-Zor',
    altitudeProfile: '2.720 m (Jomsom) - 4.230 m (Marang La Geçidi)',
    bestSeasons: ['Mayıs', 'Haziran', 'Eylül', 'Ekim'],
    pricePerPerson: 4400,
    currency: 'EUR',
    displayPrice: '€4.400 / kişi başı',
    overview: '1992 yılına kadar yabancılara tamamen kapalı kalan, Tibet kültürünün Çin Kültür Devrimi\'nden zarar görmeden korunduğu son krallık: Yukarı Mustang (Lo Krallığı). Kali Gandaki Kanyonu\'nun derin vadilerinden başlayarak surlarla çevrili Lo Manthang başkentine ve kayalara oyulmuş 3.000 yıllık gökyüzü mağaralarına uzanan bir zaman yolculuğu.',
    itinerarySummary: [
      { day: 1, title: 'Katmandu\'dan Pokhara ve Jomsom Uçuşu', description: 'Dünyanın en derin kanyonu Kali Gandaki üzerinden nefes kesen dağ uçuşuyla Jomsom\'a varış.' },
      { day: 2, title: 'Kagbeni (Özel İzin Sınır Kapısı)', description: 'Tibet Budizmi\'nin kırmızı killi sokakları; Yukarı Mustang özel koruma bölgesine giriş kontrolü.' },
      { day: 3, title: 'Chele & Tangbe Köyleri', description: 'Kırmızı, beyaz ve siyah boyalı Budist Chorten\'ler; kanyon köprülerinden tırmanış.' },
      { day: 4, title: 'Syanboche ve Yamda La Geçidi (3.850 m)', description: 'Himalaya sedir ormanlarının bitip Tibet kuru bozkırının başladığı vadi geçişi.' },
      { day: 5, title: 'Ghami & Tsarang Sarayı', description: 'Mustang\'ın en uzun mani duvarı (dua taşları) ve 14. yüzyıl Tsarang kale sarayı incelemesi.' },
      { day: 6, title: 'Lo Manthang Sur Kenti (3.840 m)', description: 'Mustang Krallığı\'nın surlarla çevrili efsanevi başkentine varış; Kraliyet Sarayı ve Jampa Gompa.' },
      { day: 7, title: 'Chhoser Gökyüzü Mağaraları (Sky Caves)', description: 'Dikey kumtaşı uçurumlarına oyulmuş 5 katlı antik insan yapımı mağara tapınaklarına tırmanış.' },
      { day: 8, title: 'Lo Gekar (Ghar Gompa - MS 8. Yüzyıl)', description: 'Tibet\'in Samye Manastırı\'ndan bile eski kabul edilen Guru Rinpoche tapınağı.' },
      { day: 9, title: 'Dhi Köyü ve Yara Kaya Oluşumları', description: 'Kumtaşı bacaları ve nehir vadisi boyunca iniş yürüyüşü.' },
      { day: 10, title: 'Tangge Yaylası ve Rüzgar Sırtları', description: 'Mustang\'ın en izole köyünde geleneksel ev konaklaması.' },
      { day: 11, title: 'Chhusang & Jomsom\'a Dönüş', description: 'Trekking parkurunun tamamlanması ve elma bahçeleriyle ünlü Jomsom\'da kutlama.' },
      { day: 12, title: 'Pokhara & Katmandu Dönüşü', description: 'Dağ uçuşuyla başkente intikal ve kapanış yemeği.' }
    ],
    included: ['Özel Yukarı Mustang Giriş İzni ($500 devlet harcı dahil)', 'ACAP lisanslı Mustang yerli Şerpa rehberi', 'Geleneksel Tibet çayevi (teahouse) konaklamaları', 'Katmandu-Pokhara-Jomsom tüm iç hat uçuşları'],
    excluded: ['Katmandu uluslararası biletleri', 'Nepal vizesi', 'Kişisel harcamalar'],
    gearRequirements: ['Yüksek irtifa toz fırtınasına dayanıklı rüzgarlık', 'UV400 polarize güneş gözlüğü', '-10°C uyku tulumu'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Nepal Yukarı Mustang Lo Manthang sur kenti ve kurak Tibet vadisi dağlar',
    tags: ['Mustang', 'Nepal', 'Lo Manthang', 'Tibet Budizmi', 'Himalayalar']
  },
  {
    id: 'exp-28',
    slug: 'ladakh-yuksek-gecitleri-ve-nubra-vadisi',
    title: 'Ladakh Yüksek Geçitleri, Hemis Manastırı ve Nubra Vadisi',
    subtitle: 'Khardung La (5.359 m) üzerinden İpek Yolu çift hörgüçlü kervanlarına ve Pangong Gölü\'ne',
    region: 'Ladakh / Küçük Tibet',
    country: 'Hindistan',
    category: 'himalayalar_ve_alp_masifleri',
    duration: { days: 9, nights: 8, text: '9 Gün / 8 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '3.100 m (Nubra) - 5.359 m (Khardung La Geçidi)',
    bestSeasons: ['Haziran', 'Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 2750,
    currency: 'EUR',
    displayPrice: '€2.750 / kişi başı',
    overview: '"Ay Ülkesi" Ladakh\'ın en görkemli köşeleri. Dünyanın motorlu araçla geçilebilen en yüksek geçitlerinden Khardung La\'yı aşarak Şayok ve Nubra nehirlerinin kestiği vadiye iniş; Hunder kumullarında İpek Yolu\'nun çift hörgüçlü Baktriya develeriyle yürüyüş ve Tibet sınırına uzanan 134 km uzunluğundaki masmavi Pangong Tso Gölü.',
    itinerarySummary: [
      { day: 1, title: 'Leh\'e Varış ve İndus Vadisi', description: 'Aklimatizasyon günü; İndus Nehri kıyısında yürüyüş ve Shanti Stupa gün batımı.' },
      { day: 2, title: 'Hemis ve Thiksey Manastır Ritüelleri', description: 'Sabah şafak duası, borazan sesleri, keşişlerin çay seremonisi ve 15 metrelik Maitreya heykeli.' },
      { day: 3, title: 'Khardung La Geçidi (5.359 m) Zirvesi', description: 'Karakurum Dağları\'nın karlı zirvelerine bakan efsanevi geçitten Nubra Vadisi\'ne iniş.' },
      { day: 4, title: 'Hunder Kumulları & Diskit Manastırı', description: '3.000 metre yükseklikteki beyaz kumullarda Baktriya devesi yürüyüşü ve dev Buda heykeli.' },
      { day: 5, title: 'Turtuk Köyü (Balti Müslüman Kültürü)', description: 'Hindistan-Pakistan kontrol hattında yer alan kayısı bahçeleriyle meşhur Balti etnik köyü ziyareti.' },
      { day: 6, title: 'Şayok Vadisi Üzerinden Pangong Tso Gölü', description: 'Gün boyu renk değiştiren (maviden turkuaza ve zümrüte) devasa yüksek irtifa gölüne varış.' },
      { day: 7, title: 'Pangong Gölü Şafağı ve Chang La (5.360 m)', description: 'Göl üzerinde gün doğumu seyri ardından Himalaya geçitlerini aşarak Leh\'e dönüş.' },
      { day: 8, title: 'Alchi Manastırı 11. Yüzyıl Keşmir Ahşap Oymacılığı', description: 'Tibet fresklerinin en eski ve en zarif örneklerini barındıran nehir kenarı manastırı.' },
      { day: 9, title: 'Leh & Delhi Uçuşu', description: 'Tibet pazarında kaşmir ve tuz alışverişi sonrası seferin sonu.' }
    ],
    included: ['Tüm Ladakh özel sınır hat izinleri (Inner Line Permits)', 'Leh ve Nubra vadisinde lüks eko-resort ve göl kıyısı glamping çadırları', 'Özel 4x4 araçlar ve yüksek irtifa ilk yardım seti', 'Tüm manastır girişleri ve yerel rehberlik'],
    excluded: ['Delhi - Leh iç hat uçuşları', 'Kişisel bahşişler'],
    gearRequirements: ['Geniş spektrumlu dudak ve yüz güneş koruması', 'Rüzgar geçirmez polar ve bere', 'Konforlu yürüyüş ayakkabısı'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ladakh Pangong Tso masmavi tuz gölü ve etrafındaki çorak Himalaya dağları',
    tags: ['Ladakh', 'Nubra Vadisi', 'Khardung La', 'Pangong Gölü', 'Manastırlar']
  },
  {
    id: 'exp-29',
    slug: 'bhutan-druk-yolu-ve-kaplan-yuvasi',
    title: 'Butan Druk Yolu Dağ Geçişi ve Paro Taktsang Manastırı',
    subtitle: 'Gökgürültüsü Ejderhası Ülkesi\'nde orman gülleri arasından 4.200 metre geçitlerine',
    region: 'Paro & Thimphu Havzası',
    country: 'Butan Krallığı',
    category: 'himalayalar_ve_alp_masifleri',
    duration: { days: 8, nights: 7, text: '8 Gün / 7 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta-Zor',
    altitudeProfile: '2.200 m (Paro) - 4.210 m (Simkota La Geçidi)',
    bestSeasons: ['Mart', 'Nisan', 'Ekim', 'Kasım'],
    pricePerPerson: 4600,
    currency: 'EUR',
    displayPrice: '€4.600 / kişi başı',
    overview: 'Gayri Safi Milli Mutluluk felsefesiyle yönetilen masalsı Butan Krallığı\'nın en kadim yürüyüş rotası Druk Path. Paro ile başkent Thimphu arasındaki el değmemiş orman gülü (rhododendron) ormanları, alpin göller ve uçurumun 900 metre yukarısına kartal yuvası gibi tüneyen kaplan yuvası manastırı Paro Taktsang.',
    itinerarySummary: [
      { day: 1, title: 'Paro\'ya İniş & Rinpung Dzong', description: 'Himalayaların arasından süzülerek dünyanın en teknik havalimanına iniş; kale manastır ziyareti.' },
      { day: 2, title: 'Ta Dzong\'dan Jele Dzong Kampına Tırmanış (3.480 m)', description: 'Çam ve meşe ormanları içinden sırt hattına çıkış; Paro Vadisi panoraması.' },
      { day: 3, title: 'Jangchulakha Sırtı ve Yak Otlakları', description: 'Orman gülleri patikaları boyunca yürüyüş; göçebe yak çobanlarıyla karşılaşma.' },
      { day: 4, title: 'Jimilang Tso Gölü (3.870 m)', description: 'Kristal berraklığında dev alabalıkların yüzdüğü kutsal göl kıyısında kamp.' },
      { day: 5, title: 'Simkota Tso ve Phume La Geçidi (4.210 m)', description: 'Dünyanın tırmanılmamış en yüksek dağı Gangkhar Puensum (7.570 m) manzarası.' },
      { day: 6, title: 'Phajoding Manastırı Üzerinden Thimphu\'ya İniş', description: 'Keşişlerin meditasyon yaptığı manastırdan başkent Thimphu\'ya iniş ve otele yerleşme.' },
      { day: 7, title: 'Paro Taktsang (Kaplan Yuvası Manastırı)', description: 'Uçurum duvarına oyulmuş 3.120 metredeki manastıra 5 saatlik tarihi zikzak patika tırmanışı.' },
      { day: 8, title: 'Paro\'dan Dönüş', description: 'Geleneksel sıcak taş banyosu (Dotsho) deneyimi ardından havalimanı transferi.' }
    ],
    included: ['Butan Krallığı Günlük Sürdürülebilir Kalkınma Harcı (SDF - $100/gün dahil)', 'Butan Kültür ve Dağ Bakanlığı lisanslı yerel baş rehber', 'Kamp ekibi, katır yük taşıma servisi ve şef aşçı', 'Tüm Butan vize prosedürleri ve Dzong girişleri'],
    excluded: ['Drukair / Bhutan Airlines uluslararası uçuşları', 'Kişisel harcamalar'],
    gearRequirements: ['İyi tutunan su geçirmez dağ ayakkabısı', 'Rüzgar ve yağmurluk', '-10°C uyku tulumu'],
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    alt: 'Butan Paro Taktsang Kaplan Yuvası manastırı dikey uçurum kayalıklarında',
    tags: ['Butan', 'Kaplan Yuvası', 'Druk Yolu', 'Himalayalar', 'Dzong']
  },
  {
    id: 'exp-30',
    slug: 'kazbek-masifi-ve-gergeti-yaylalari',
    title: 'Kazbek Masifi Zirve Tırmanışı ve Gergeti Buzulu',
    subtitle: 'Stepantsminda Gergeti Teslis Kilisesi\'nden 5.054 metre Kazbek buzul doruğuna',
    region: 'Büyük Kafkaslar',
    country: 'Gürcistan',
    category: 'himalayalar_ve_alp_masifleri',
    duration: { days: 6, nights: 5, text: '6 Gün / 5 Gece' },
    groupSize: { min: 4, max: 6, text: '4 - 6 Kişi' },
    difficulty: 'Zorlu',
    altitudeProfile: '1.740 m (Stepantsminda) - 5.054 m (Kazbek Dağı Zirvesi)',
    bestSeasons: ['Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 2250,
    currency: 'EUR',
    displayPrice: '€2.250 / kişi başı',
    overview: 'Yunan mitolojisinde Prometheus\'un ateşi insanlara verdiği için zincirlendiği efsanevi dağ: Kazbek (Mkinvartsveri). Kafkasların simgesi Gergeti Kilisesi\'nin arkasından başlayarak buzul dilini aşan, eski meteoroloji istasyonu Bethlemi Kulübesi\'nde (3.650 m) aklimatizasyonun ardından 5.054 metrelik buzul zirvesine uzanan teknik dağcılık seferi.',
    itinerarySummary: [
      { day: 1, title: 'Tiflis\'ten Gürcü Askeri Yolu Üzerinden Stepantsminda', description: 'Ananuri Kalesi ve Jvari Geçidi üzerinden Kazbek eteklerine varış; ekipman kontrolü.' },
      { day: 2, title: 'Gergeti Teslis Kilisesi & Sabertse Geçidi', description: '14. yüzyıl kilisesinin ardından alpin çayırlardan Gergeti Buzulu kenarına tırmanış.' },
      { day: 3, title: 'Gergeti Buzulu Geçişi ve Bethlemi Kulübesi (3.650 m)', description: 'Buzul çatlakları (crevasse) arasında kramponla yürüyüş; eski meteoroloji kampına varış.' },
      { day: 4, title: 'Aklimatizasyon ve Buzul Eğitimi (4.100 m)', description: 'Kazbek platosuna doğru yükseliş; kazma-kramponla düşüş durdurma ve ip birliği pratikleri.' },
      { day: 5, title: 'Kazbek Zirve Hücumu (5.054 m)', description: 'Gece 02:00 şafak çıkışı; eyer geçidi ve dik buzul sırtını aşarak doruğa varış; Kafkas masifi panoraması.' },
      { day: 6, title: 'Stepantsminda & Tiflis Dönüşü', description: 'Ana kampa ve vadiye iniş; geleneksel Gürcü Khinkali ziyafeti ve Tiflis\'e intikal.' }
    ],
    included: ['IFMGA / GMGA lisanslı baş dağ rehberi (1 rehber / 3 dağcı oranı)', 'Tüm dağ çadırları ve buzul güvenlik ipleri', 'Bethlemi Kulübesi ve vadi otel konaklaması', 'Katır lojistiği (3.650 m kampa kadar ana çanta taşınması)'],
    excluded: ['Tiflis uçuşları', 'Kişisel teknik dağcılık kıyafetleri (krampon ve kazma kiralanabilir)'],
    gearRequirements: ['B3 tipi krampon uyumlu dağcılık botu', 'Teknik kazma ve 12 dişli dağcılık kramponu', 'Tırmanış kaskı ve emniyet kemeri'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Gürcistan Gergeti Teslis Kilisesi ve arkasında karlı görkemli Kazbek Dağı zirvesi',
    tags: ['Kazbek', 'Kafkaslar', 'Zirve Tırmanışı', 'Dağcılık', 'Gürcistan']
  },
  {
    id: 'exp-31',
    slug: 'alpler-haute-route-chamonix-zermatt',
    title: 'Klasik Alpler Haute Route: Chamonix\'den Zermatt\'a Masif Geçişi',
    subtitle: 'Mont Blanc eteklerinden Matterhorn silüetine dünyanın en prestijli buzul rotası',
    region: 'Batı Alpler',
    country: 'Fransa & İsviçre',
    category: 'himalayalar_ve_alp_masifleri',
    duration: { days: 11, nights: 10, text: '11 Gün / 10 Gece' },
    groupSize: { min: 4, max: 6, text: '4 - 6 Kişi' },
    difficulty: 'Zorlu',
    altitudeProfile: '1.035 m (Chamonix) - 3.295 m (Col de Prafleuri Geçidi)',
    bestSeasons: ['Temmuz', 'Ağustos', 'Eylül'],
    pricePerPerson: 4200,
    currency: 'EUR',
    displayPrice: '€4.200 / kişi başı',
    overview: '19. yüzyıl Viktorya dönemi İngiliz Alpinistlerinin keşfettiği "Yüksek Rota" (Haute Route). Chamonix vadisinden başlayıp Valais kantonunun devasa buzul masiflerini aşarak Matterhorn\'un ikonik piramidinin altında Zermatt\'ta sonlanan, dünya dağcılık tarihinin tartışmasız en zarif klasik Alpin geçişi.',
    itinerarySummary: [
      { day: 1, title: 'Chamonix & Mont Blanc Vadisi', description: 'Fransız Alpleri\'nin başkentinde rota brifingi ve harita tahlili.' },
      { day: 2, title: 'Argentière\'den Trient Dağ Sığınağına (İsviçre Sınırı)', description: 'Col de Balme geçidinden İsviçre sınırını yaya aşma; Trient buzulu manzaralı dağ kulübesi.' },
      { day: 3, title: 'Fenêtre d\'Arpette (2.665 m) Geçişi', description: 'Büyük granit kayalık bloklar arasından Champex-Lac masalsı dağ gölüne iniş.' },
      { day: 4, title: 'Verbier Sırtları ve Mont Fort Sığınağı', description: 'Val de Bagnes vadisine tepeden bakan patikalarda 6 saatlik yüksek yürüyüş.' },
      { day: 5, title: 'Col de Louvie ve Çöl Gölleri (Grand Désert)', description: 'Buzul erime gölleri ve moren sırtlarından Prafleuri sığınağına intikal.' },
      { day: 6, title: 'Dixence Baraj Gölü ve Dix Dağ Sığınağı', description: 'Avrupa\'nın en yüksek yerçekimli baraj gölü kıyısında yürüyüş; Mont Blanc de Cheilon manzarası.' },
      { day: 7, title: 'Cheilon Buzulu ve Pas de Chèvres Merdivenleri', description: 'Dikey kaya duvarına monte çelik merdivenlerle Arolla vadisine nefes kesen geçiş.' },
      { day: 8, title: 'La Sage & Val d\'Hérens Geleneksel Ahşap Köyleri', description: 'Çiçekli balkonları ve kara Hérens inekleriyle ünlü İsviçre vadisinde kültür molası.' },
      { day: 9, title: 'Col du Torrent (2.919 m) & Moiry Buzulu', description: 'Turkuaz renkli Moiry buzul gölüne iniş ve Cabane de Moiry sığınağında konaklama.' },
      { day: 10, title: 'Zinal Vadisi ve Augstbordpass (2.894 m)', description: 'Mattertal vadisine geçiş; Zermatt zirvelerinin ufukta ilk kez belirişi.' },
      { day: 11, title: 'Zermatt ve Matterhorn\'a Giriş', description: 'Matterhorn\'un devasa granit piramidi altında şehre giriş ve kutlama fondü ziyafeti.' }
    ],
    included: ['UIAGM / IFMGA lisanslı İsviçre/Fransa dağ rehberi', 'Geleneksel Alpin kulübe (Refuge / Cabane) konaklamaları ve yarım pansiyon yemekler', 'Belirli vadilerde bagaj transfer lojistiği', 'Gerekli teleferik ve geçiş biletleri'],
    excluded: ['Cenevre uçuşları ve havaalanı tren transferi', 'Kişisel içecekler ve duş jetonları'],
    gearRequirements: ['Rijit tabanlı Alpin trekking botu', 'Hafif uyku tulumu astarı (silk liner)', 'Teleskopik baton takımı'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'İsviçre Zermatt Alpler Matterhorn zirvesi ve yüksek Alpin buzul vadisi',
    tags: ['Haute Route', 'Alpler', 'Chamonix', 'Zermatt', 'Matterhorn']
  },

  // --- 6. OKYANUS, YAĞMUR ORMANI VE ADALAR DÜNYASI (5 Rota) ---
  {
    id: 'exp-32',
    slug: 'patagonya-sili-fiyortlari-ve-fitz-roy',
    title: 'Patagonya Granit Kuleleri, Buzul Gölleri ve Fitz Roy Sırtları',
    subtitle: 'Torres del Paine W-Trek\'ten Los Glaciares Perito Moreno ve Cerro Torre\'ye',
    region: 'Güney Patagonya',
    country: 'Şili & Arjantin',
    category: 'okyanus_fiyortlari_ve_yagmur_ormanlari',
    duration: { days: 12, nights: 11, text: '12 Gün / 11 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Zorlu',
    altitudeProfile: 'Deniz seviyesi - 1.200 m (Mirador Las Torres)',
    bestSeasons: ['Kasım', 'Aralık', 'Ocak', 'Şubat', 'Mart'],
    pricePerPerson: 4950,
    currency: 'EUR',
    displayPrice: '€4.950 / kişi başı',
    overview: 'Dünyanın ucunda, rüzgarın şekillendirdiği vahşi Patagonya coğrafyası. Şili tarafında Torres del Paine\'nin dikey granit kuleleri ve Grey Buzulu; Arjantin sınırını aşarak El Chaltén\'de dağcıların kutsal mabedi Fitz Roy ve Cerro Torre iğnelerinin buzlu göllerine uzanan anıtsal bir yürüyüş maratonu.',
    itinerarySummary: [
      { day: 1, title: 'Punta Arenas\'tan Puerto Natales\'e', description: 'Macellan Boğazı kıyısından Patagonya fiyort kasabasına varış ve W rotası brifingi.' },
      { day: 2, title: 'Mirador Las Torres Tırmanışı', description: 'Granit kulelerin dibindeki turkuaz buzul gölüne 8 saatlik dik ve rüzgarlı tırmanış.' },
      { day: 3, title: 'Nordenskjöld Gölü ve Cuernos Sırtı', description: 'Boynuzları andıran iki renkli Cuernos masifi eteklerinde 13 km göl boyu yürüyüş.' },
      { day: 4, title: 'Fransız Vadisi (Valle del Francés)', description: 'Sürekli buzul çığlarının gümbürdediği asma buzul vadisine tırmanış; 360 derece amfitiyatro.' },
      { day: 5, title: 'Grey Buzulu ve Pehoe Gölü Katamaranı', description: 'Güney Patagonya Buz Örtüsü\'nden inen dev buz duvarı kenarında yürüyüş ve tekneyle çıkış.' },
      { day: 6, title: 'Arjantin Sınır Geçişi ve El Calafate', description: 'Sonsuz bozkırlar boyunca pampa sürüşü; guanako ve nandu devekuşu sürüleri.' },
      { day: 7, title: 'Perito Moreno Buzulu Buz Yürüyüşü', description: 'Buzulun devasa ön cephesinde kramponlarla yürüyüş; buz çatlakları ve mavi mağaralar.' },
      { day: 8, title: 'El Chaltén (Arjantin\'in Trekking Başkenti)', description: 'Viedma Gölü kıyısından Fitz Roy masifinin eteklerindeki bohem dağ kasabasına varış.' },
      { day: 9, title: 'Laguna de los Tres & Fitz Roy (3.405 m)', description: 'Patagonya\'nın en ikonik granit zirvesinin dibindeki üç renkli buzul gölüne 9 saatlik yürüyüş.' },
      { day: 10, title: 'Laguna Torre & Cerro Torre İğnesi', description: 'Dünyanın en zorlu granit iğnesi Cerro Torre dibindeki buzdağları yüzen göle keşif.' },
      { day: 11, title: 'El Calafate\'ye Dönüş ve Kuzu Asado Ziyafeti', description: 'Geleneksel Patagonya açık ateş kuzu çevirme (cordero al palo) akşamı.' },
      { day: 12, title: 'Buenos Aires Bağlantılı Uçuş', description: 'Uçsuz bucaksız pampalara veda ve dönüş transferi.' }
    ],
    included: ['Patagonya lisanslı dağ rehberleri', 'Torres del Paine dağ sığınakları ve El Chaltén butik otel konaklamaları', 'Perito Moreno kramponlu mini-trekking turu', 'Tüm sınır geçiş lojistiği ve milli park giriş ücretleri'],
    excluded: ['Buenos Aires / Santiago - Patagonya iç hat uçuşları', 'Kişisel seyahat sigortası'],
    gearRequirements: ['Patagonya rüzgarına (100+ km/s) dayanıklı teknik hardshell', 'Yürüyüş tozlukları (gaiters)', 'Bileği saran sağlam dağcılık botu'],
    imageUrl: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=1200&q=80',
    alt: 'Patagonya Torres del Paine granit kuleleri ve turkuaz buzul gölü',
    tags: ['Patagonya', 'Fitz Roy', 'Torres del Paine', 'Perito Moreno', 'W-Trek']
  },
  {
    id: 'exp-33',
    slug: 'madagaskar-andasibe-yagmur-ormani-ve-baobab',
    title: 'Madagaskar Yağmur Ormanları, Lemur Habitatı ve Baobab Caddesi',
    subtitle: 'Andasibe sisli ormanlarından Tsingy de Bemaraha kireç labirentlerine',
    region: 'Doğu Yağmur Ormanı & Menabe',
    country: 'Madagaskar',
    category: 'okyanus_fiyortlari_ve_yagmur_ormanlari',
    duration: { days: 10, nights: 9, text: '10 Gün / 9 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: 'Deniz seviyesi - 1.200 m (Andasibe Platosu)',
    bestSeasons: ['Eylül', 'Ekim', 'Kasım'],
    pricePerPerson: 3600,
    currency: 'EUR',
    displayPrice: '€3.600 / kişi başı',
    overview: 'Dünyadan 88 milyon yıl önce ayrılarak kendi evrimsel mucizesini yaratan 8. Kıta Madagaskar. Dünyanın en büyük lemuru Indri\'nin çığlıklarıyla yankılanan Andasibe yağmur ormanları, UNESCO tescilli bıçak gibi keskin Tsingy kireçtaşı kanyonları ve 800 yıllık anıtsal Baobab Caddesi\'nde gün batımı yürüyüşü.',
    itinerarySummary: [
      { day: 1, title: 'Antananarivo (Tana) Karşılaması', description: 'Madagaskar başkentinde brifing ve endemik biyoçeşitlilik semineri.' },
      { day: 2, title: 'Andasibe-Mantadia Milli Parkı', description: 'Sisli dağ yağmur ormanına intikal; bukalemunlar ve dev orkide çeşitleri.' },
      { day: 3, title: 'Indri Lemurlarının Şafak Çığlıkları', description: 'İnsan çığlığına benzeyen sesleriyle ormanı dolduran dev Indri lemurlarını yerel iz sürücülerle arama.' },
      { day: 4, title: 'Gece Yürüyüşü ve Fare Lemuru', description: 'Dünyanın en küçük primatı olan fare lemuru ve yaprak kuyruklu kertenkeleleri fenerle gözlem.' },
      { day: 5, title: 'Morondava ve Mozambik Kanalı Kıyısı', description: 'Batı kıyısına iç hat uçuşu; kuru yaprak döken ormanlar kuşağına geçiş.' },
      { day: 6, title: 'Baobab Caddesi (Allée des Baobabs) Gün Batımı', description: '30 metre yüksekliğindeki 800 yıllık "Büyükanne Baobab" ağaçları altında yürüyüş.' },
      { day: 7, title: 'Kirindy Ormanı ve Fosa Avcısı', description: 'Madagaskar\'ın tek yırtıcı memelisi olan Fosa ve zıplayan dev sıçanların habitatında keşif.' },
      { day: 8, title: 'Tsiribihina Nehir Deltası ve Mangrovlar', description: 'Geleneksel ahşap pirogue kanolarıyla mangrov ekosisteminde kuş gözlemi.' },
      { day: 9, title: 'Aşık Baobablar ve Morondava Balıkçıları', description: 'Birbirine sarılmış efsanevi çift baobab ağacı ve Vezo balıkçı kabilesiyle buluşma.' },
      { day: 10, title: 'Tana Dönüşü ve Uçuş', description: 'Başkente dönüş uçuşu, vanilya ve el sanatları pazarı ardından seferin sonu.' }
    ],
    included: ['Madagaskar primatoloji ve yağmur ormanı yerel rehberleri', 'Milli park iz sürücüleri (spotters)', 'Özel eko-loca ve bungalov konaklamaları', 'Ada içi tüm iç hat uçuşları'],
    excluded: ['Uluslararası uçak biletleri', 'Madagaskar vizesi', 'Kişisel harcamalar'],
    gearRequirements: ['Nemli yağmur ormanına uygun hafif uzun kollu giysiler', 'Kafa feneri (kırmızı ışık modlu)', 'Doğal içerikli böcek kovucu sprey'],
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
    alt: 'Madagaskar Baobab Caddesi dev ağaçlar gün batımı ve kızıl toprak yol',
    tags: ['Madagaskar', 'Baobab', 'Lemurlar', 'Yağmur Ormanı', 'Endemik Doğa']
  },
  {
    id: 'exp-34',
    slug: 'kumano-kodo-antik-haci-yolu-ve-sedir-ormanlari',
    title: 'Japonya Kumano Kodo Antik Hacı Patikaları ve Kutsal Sedir Ormanları',
    subtitle: 'Nakahechi rotasından Nachi Şelalesi tapınağına ve geleneksel Ryokan onsenlerine',
    region: 'Kii Yarımadası / Kansai',
    country: 'Japonya',
    category: 'okyanus_fiyortlari_ve_yagmur_ormanlari',
    duration: { days: 7, nights: 6, text: '7 Gün / 6 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Orta',
    altitudeProfile: '100 m (Kii-Tanabe) - 850 m (Waraji-toge Geçidi)',
    bestSeasons: ['Nisan', 'Mayıs', 'Ekim', 'Kasım'],
    pricePerPerson: 3400,
    currency: 'EUR',
    displayPrice: '€3.400 / kişi başı',
    overview: 'Santiago de Compostela ile birlikte dünyada UNESCO Dünya Mirası ilan edilmiş iki hac rotasından biri olan Kumano Kodo. 1.000 yılı aşkın süredir imparatorların, samurayların ve rahiplerin yürüdüğü dev Japon sedirleri (Sugi) ve yosun kaplı taş basamaklar. Günün yorgunluğunu termal dağ kaplıcalarında (onsen) ve çok servisli Kaiseki akşam yemeklerinde atan manevi bir doğa yürüyüşü.',
    itinerarySummary: [
      { day: 1, title: 'Kyoto/Osaka\'dan Kii-Tanabe Kapısı', description: 'Pasifik kıyısı treniyle hac başlangıç noktasına varış; arınma ritüeli ve hac defteri (tsushin) alımı.' },
      { day: 2, title: 'Takijiri-oji\'den Takahara Köyü\'ne (Sisler Köyü)', description: 'Kutsal ormana giriş; köklerin ördüğü dik patikalardan vadi manzaralı geleneksel handa konaklama.' },
      { day: 3, title: 'Takahara\'dan Tsugizakura Dev Sedirlerine', description: '800 yıllık koruma altındaki dev anıt sedir ağaçları ve dağ pınarları boyunca 13 km yürüyüş.' },
      { day: 4, title: 'Kumano Hongu Taisha (Büyük Mabet)', description: 'Hac yolunun kalbi olan Şinto tapınağı; dünyanın en büyük torii kapısı Oyunohara ziyareti.' },
      { day: 5, title: 'Yunomine Onsen (1.800 Yıllık Şifalı Kaynak)', description: 'UNESCO tescilli Tsuboyu taş küvetinde termal banyo; kaplıca suyunda haşlanan onsen yumurtası.' },
      { day: 6, title: 'Daimon-zaka ve Nachi Şelalesi (133 m)', description: 'Asırlık taş basamaklardan inerek Japonya\'nın en yüksek tek parça şelalesi ve Seiganto-ji pagodası.' },
      { day: 7, title: 'Katsuura Balıkçı Limanı & Kyoto Dönüşü', description: 'Taze Pasifik ton balığı müzayedesi seyri ve Shinkansen hızlı treniyle Kyoto\'ya intikal.' }
    ],
    included: ['Kumano Kodo sertifikalı Şinto/Budizm uzmanı dağ rehberi', 'Geleneksel Ryokan ve Minshuku konaklamaları', 'Tüm geleneksel çok kaplı Kaiseki akşam yemekleri ve onsen girişleri', 'Tüm etaplar arası ana bagaj taşıma lojistiği'],
    excluded: ['Japonya uluslararası uçak biletleri', 'Kişisel harcamalar'],
    gearRequirements: ['İyi kavrayan ıslak taş uyumlu yürüyüş ayakkabısı', 'Bambu veya kompozit yürüyüş batonu', 'Ryokan konaklaması için kolay çıkarılabilir ayakkabı'],
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Japonya Kumano Kodo Nachi şelalesi kırmızı üç katlı pagoda ve sedir ağaçları',
    tags: ['Kumano Kodo', 'Japonya', 'Hac Yolu', 'Onsen', 'Şintoizm']
  },
  {
    id: 'exp-35',
    slug: 'azor-adalari-krater-golleri-ve-okyanus-sirtlari',
    title: 'Azor Adaları São Miguel Krater Gölleri ve Balina Koridoru',
    subtitle: 'Sete Cidades ikiz göllerinden Furnas fumerollerine ve Atlantik balina safarisine',
    region: 'São Miguel Adası',
    country: 'Portekiz / Azorlar',
    category: 'okyanus_fiyortlari_ve_yagmur_ormanlari',
    duration: { days: 6, nights: 5, text: '6 Gün / 5 Gece' },
    groupSize: { min: 4, max: 8, text: '4 - 8 Kişi' },
    difficulty: 'Kolay-Orta',
    altitudeProfile: 'Deniz seviyesi - 900 m (Pico da Vara)',
    bestSeasons: ['Nisan', 'Mayıs', 'Haziran', 'Eylül', 'Ekim'],
    pricePerPerson: 2150,
    currency: 'EUR',
    displayPrice: '€2.150 / kişi başı',
    overview: 'Atlantik Okyanusu\'nun tam kalbinde, Lizbon ile New York arasında dokuz zümrüt volkanik ada. Biri mavi biri yeşil parlayan efsanevi Sete Cidades ikiz krater gölleri sırtında yürüyüş, yerin altındaki jeotermal ısıyla pişen "Cozido das Furnas" yemeği ve sperm balinaları ile yunusların göç yolunda deniz biyoloğu eşliğinde okyanus sefiri.',
    itinerarySummary: [
      { day: 1, title: 'Ponta Delgada & Siyah Bazalt Sahili', description: 'Azorlar özerk başkentine varış; volkanik taş mimarisi ve ananas seraları ziyareti.' },
      { day: 2, title: 'Sete Cidades İkiz Krater Gölleri Sırtı', description: 'Ortancalarla çevrili kaldera kenarında 12 km yürüyüş; Vista do Rei seyir noktası.' },
      { day: 3, title: 'Lagoa do Fogo (Ateş Gölü) Vahşi Krateri', description: 'Ada merkezindeki en el değmemiş koruma alanı krater gölüne dik patikayla iniş ve endemik flora.' },
      { day: 4, title: 'Furnas Vadisi ve Jeotermal Mutfak', description: 'Kaynayan çamur kazanları ve yerin altına gömülerek pişen Cozido yemeği; Terra Nostra botanik termal havuzu.' },
      { day: 5, title: 'Atlantik Sperm Balinası ve Yunus Safarisi', description: 'Deniz biyoloğu eşliğinde zodyak botlarla açık okyanusa çıkış; hidrofon ile balina seslerini dinleme.' },
      { day: 6, title: 'Gorreana Avrupa\'nın Tek Çay Plantasyonu ve Dönüş', description: '1883\'ten beri çalışan tarihi çay bahçelerinde yürüyüş ve dönüş transferi.' }
    ],
    included: ['Azorlar biyoloğu ve yürüyüş rehberi', 'Tasarım termal otel ve okyanus manzaralı loca konaklaması', 'Zodyak balina gözlem turu ve hidrolik ekipmanlar', 'Tüm ada içi özel transferler'],
    excluded: ['Lizbon - Ponta Delgada uçuşları', 'Kişisel harcamalar'],
    gearRequirements: ['Hafif rüzgarlık ve su geçirmez ceket', 'Termal havuzlar için mayo/şort', 'Trekking ayakkabısı'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Azor Adaları Sete Cidades yeşil ve mavi ikiz krater gölleri ortancalar',
    tags: ['Azor Adaları', 'Atlantik', 'Balina Gözlemi', 'Krater Gölleri', 'Jeotermal']
  },
  {
    id: 'exp-36',
    slug: 'spitsbergen-kutup-gecesi-ve-aurora-kizak-seferi',
    title: 'Spitsbergen Kutup Gecesi, Kuzey Işıkları ve Köpek Kızağı Seferi',
    subtitle: 'Longyearbyen donmuş vadilerinden buzul mağaralarına ve Aurora Borealis avına',
    region: 'Spitsbergen / Svalbard',
    country: 'Norveç',
    category: 'okyanus_fiyortlari_ve_yagmur_ormanlari',
    duration: { days: 6, nights: 5, text: '6 Gün / 5 Gece' },
    groupSize: { min: 4, max: 6, text: '4 - 6 Kişi' },
    difficulty: 'Zorlu',
    altitudeProfile: 'Deniz seviyesi - 450 m (Longyear Buzulu)',
    bestSeasons: ['Kasım', 'Aralık', 'Ocak', 'Şubat'],
    pricePerPerson: 3950,
    currency: 'EUR',
    displayPrice: '€3.950 / kişi başı',
    overview: 'Güneşin aylarca ufkun üzerine çıkmadığı ve 24 saat zifiri karanlığın hüküm sürdüğü kutup gecesi (Polar Night). Şafak vakti olmayan bu masalsı sessizlikte, Alaska husky köpeklerinin çektiği kızaklarla donmuş kanyonları aşış, buzulun içine oyulmuş mavi kristal mağaralara iniş ve başınızın üzerinde dans eden yeşil Kuzey Işıkları (Aurora Borealis).',
    itinerarySummary: [
      { day: 1, title: 'Karanlığa İniş: Longyearbyen Kutup Gecesi', description: 'Gündüz saatinde bile yıldızların parladığı arktik kasabaya varış; termal tulum ve bot donatımı.' },
      { day: 2, title: 'Köpek Kızağı Eğitimi ve Bolterdalen Seferi', description: 'Kendi köpek takımını yönetmeyi öğrenme; donmuş nehir yatağı boyunca sessiz kızak sürüşü.' },
      { day: 3, title: 'Longyear Buzulu İçi Mavi Buz Mağarası', description: 'Kafa fenerleriyle buzulun kalbine iniş; bin yıllık sıkışmış kar kristalleri arasında yürüyüş.' },
      { day: 4, title: 'Kar Motosikletiyle (Snowmobile) Tempelfjorden', description: 'Donmuş deniz buzu üzerinde 70 km sürüş; karlı dağların altında Kuzey Işıkları nöbeti.' },
      { day: 5, title: 'Kutup Trapper Kulübesinde Akşam Yemeği', description: 'Tarihi kürk avcılarının ahşap kulübesinde şömine başında ren geyiği yahnisi ve kutup öyküleri.' },
      { day: 6, title: 'Oslo Bağlantılı Dönüş', description: 'Kutup Gecesi hayatta kalma beratı ve Norveç anakarasına uçuş.' }
    ],
    included: ['Tüm arktik profesyonel tulum, bot, eldiven ve kask donanımı', 'Köpek kızağı ve snowmobile kiralama ve yakıt masrafları', 'Kutup ayısı silahlı koruma lisanslı rehber', 'Kutup oteli ve geleneksel avcı kulübesi konaklaması'],
    excluded: ['Oslo - Longyearbyen uçak biletleri', 'Kişisel seyahat sigortası'],
    gearRequirements: ['Merino yün termal içlik takımı (en az 2 kat)', 'Kar maskesi (balaklava)', 'Kamera pilleri için cep ısıtıcı kimyasal pedler'],
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Svalbard kar örtüsü üzerinde yeşil Kuzey Işıkları Aurora ve köpek kızağı',
    tags: ['Kutup Gecesi', 'Aurora Borealis', 'Köpek Kızağı', 'Svalbard', 'Buzul Mağarası']
  }
];

export const EXPEDITION_GUIDES: ExpeditionGuide[] = [
  {
    id: 'guide-01',
    slug: 'orhan-taner-dagci-jeomorfolog',
    name: 'Prof. Dr. Orhan Taner',
    title: 'Baş Dağ Rehberi & Jeomorfolog',
    specialty: 'Yüksek İrtifa Jeomorfolojisi & Buzul Tırmanışları',
    experienceYears: 24,
    credentials: ['IFMGA / UIAGM Lisanslı Dağ Rehberi', 'TMMOB Jeoloji Mühendisleri Odası Üyesi', 'TDF Yüksek İrtifa Antrenörü'],
    bio: 'Kaçkarlar, Pamir Masifi ve Himalayalarda 40\'ı aşkın ekspedisyon yönetti. Doğu Anadolu ve Kafkas jeolojisi üzerine üç akademik monografisi bulunmaktadır.',
    expeditionsLed: 88,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    alt: 'Prof. Dr. Orhan Taner baş dağ rehberi ve jeomorfolog portresi'
  },
  {
    id: 'guide-02',
    slug: 'elena-lindqvist-kutup-biyologu',
    name: 'Elena Lindqvist',
    title: 'Kutup Keşif Lideri & Deniz Biyoloğu',
    specialty: 'Arktik Fauna & Glasiyoloji',
    experienceYears: 16,
    credentials: ['Svalbard Guide Association (SGA) Master Sertifikası', 'Kutup Ayısı Güvenlik Ateşli Silah Lisansı', 'RYA Yachtmaster Ocean'],
    bio: 'Tromsø Üniversitesi Arktik Biyoloji mezunu olan Lindqvist, son 14 yılını Svalbard, Grönland ve Franz Josef Toprakları\'nda deniz buzu gözlemleri ve zodyak liderliği yaparak geçirdi.',
    expeditionsLed: 64,
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
    alt: 'Elena Lindqvist kutup keşif lideri ve deniz biyoloğu portresi'
  },
  {
    id: 'guide-03',
    slug: 'tsering-norbu-serpa-lideri',
    name: 'Tsering Norbu Şerpa',
    title: 'Himalaya & Trans-Himalaya Lojistik Direktörü',
    specialty: '8.000m İrtifa Güvenliği & Nepal / Tibet Rotaları',
    experienceYears: 20,
    credentials: ['Nepal Mountaineering Association (NMA) Baş Eğitmeni', 'Himalaya Arama Kurtarma Birliği Koordinatörü', 'Chadar Buzul Ustası'],
    bio: 'Everest, K2 ve Annapurna masiflerinde defalarca teknik liderlik yapmış olan Tsering, Yukarı Mustang ve Zanskar Chadar rotalarının en saygın yerli uzmanlarındandır.',
    expeditionsLed: 112,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    alt: 'Tsering Norbu Şerpa Himalaya baş rehberi portresi'
  },
  {
    id: 'guide-04',
    slug: 'selim-cihangir-arkeolog-epigrafist',
    name: 'Doç. Dr. Selim Cihangir',
    title: 'Tarihsel Rotalar & Antik Epigrafi Uzmanı',
    specialty: 'Klasik Çağ Levant & Anadolu Kervan Yolları',
    experienceYears: 18,
    credentials: ['Türk Eskiçağ Bilimleri Enstitüsü Üyesi', 'Likya ve Frig Yolu Bilim Kurulu Danışmanı'],
    bio: 'Likya yazıtları ve Frig kaya cepheleri üzerine saha araştırmaları yürüten Cihangir, keşif seyahatlerinde kadim coğrafyanın taş kitabesini edebi bir dille katılımcılara açar.',
    expeditionsLed: 52,
    imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=800&q=80',
    alt: 'Doç. Dr. Selim Cihangir arkeolog ve epigrafist portresi'
  },
  {
    id: 'guide-05',
    slug: 'fatima-al-harthy-col-rehberi',
    name: 'Fatima Al-Harthy',
    title: 'Çöl Coğrafyaları & Bedevi Etnografı',
    specialty: 'Rubülhali Kumul Seyrüseferi & Vadi Jeolojisi',
    experienceYears: 14,
    credentials: ['Oman Ministry of Heritage and Tourism Lisansı', 'İleri Seviye Çöl Sürüş ve Kumda Kurtarma Sertifikası'],
    bio: 'Umman ve Ürdün çöllerinde yıldız navigasyonu ve kabile gelenekleri üzerine çalışan Al-Harthy, Vadi Rum ve Wahiba Sands seferlerinde katılımcılara çölün sessizliğini öğretir.',
    expeditionsLed: 46,
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    alt: 'Fatima Al-Harthy çöl coğrafyaları ve etnografi rehberi portresi'
  },
  {
    id: 'guide-06',
    slug: 'cemal-korkut-dag-rehberi',
    name: 'Cemal Korkut',
    title: 'Alpinist & Vahşi Doğa İlkyardım Eğitmeni',
    specialty: 'Toroslar Yörük Patikaları & Likya Kaya Rotaları',
    experienceYears: 19,
    credentials: ['Wilderness First Responder (WFR) Eğitmeni', 'Türkiye Dağcılık Federasyonu Kıdemli Antrenörü'],
    bio: 'Toros dağ zincirinde ayak basmadık geçit bırakmayan Cemal Korkut, geleneksel Sarıkeçili göç rotalarını haritalandırmış kıdemli bir dağ adamıdır.',
    expeditionsLed: 95,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    alt: 'Cemal Korkut kıdemli dağ rehberi portresi'
  }
];

export const PREPARATION_GUIDE: PreparationSection[] = [
  {
    title: 'Aklimatizasyon ve Yüksek İrtifa Fizyolojisi',
    description: '3.000 metrenin üzerindeki tüm yüksek dağ seferlerimizde uygulanan tıbbi ve operasyonel güvenlik standartları.',
    items: [
      {
        heading: 'Kademeli Yükselme Kuralı',
        detail: '3.000 metreden sonra uyuma irtifası günde ortalama 300-500 metreden fazla artırılmaz. "Yükseğe tırman, alçakta uyu" (Climb high, sleep low) prensibiyle her gün zirve yürüyüşü sonrası daha alçak kamplarda dinlenilir.'
      },
      {
        heading: 'Medikal Takip & Oksijen Saturasyonu',
        detail: 'Her sabah ve akşam katılımcıların SpO2 (kandaki oksijen) ve nabız değerleri nabız oksimetresi ile ölçülüp kayıt altına alınır. 70\'in altına düşen stabil olmayan değerlerde iniş protokolü devreye girer.'
      },
      {
        heading: 'Hidrasyon & Beslenme',
        detail: 'Yüksek irtifada solunumla kaybedilen su miktarı iki katına çıkar. Katılımcıların günde en az 4-5 litre sıvı (elektrolit destekli su, zencefil ve bitki çayları) tüketmesi zorunludur.'
      }
    ]
  },
  {
    title: 'Katmanlama ve Ekipman Standartları',
    description: 'Değişken vahşi doğa koşullarında vücut ısısını ve kuru kalmayı sağlayan modern giyim sistemi.',
    items: [
      {
        heading: 'Baz Katman (Base Layer)',
        detail: 'Doğrudan tene temas eden en az 200 gsm merino yün içlikler. Sentetik pamuklu kumaşlar teri hapsettiği ve hipotermiye yol açtığı için kesinlikle yasaktır.'
      },
      {
        heading: 'Yalıtım Katmanı (Mid Layer)',
        detail: 'Polar ceketler veya 800+ fill power hidrofobik kaz tüyü hafif yelek/ceketler. Dinlenme molalarında ve kamp akşamlarında vücut çekirdek ısısını muhafaza eder.'
      },
      {
        heading: 'Dış Kabuk Katmanı (Outer Shell)',
        detail: 'Minimum 28.000 mm su sütunu direncine sahip, bantlı dikişli 3 katman Gore-Tex Pro fırtına ceketi ve pantolonu. Şiddetli rüzgarı keserek buhar geçirgenliğini korur.'
      },
      {
        heading: 'Ayakkabı & Çorap Uyumu',
        detail: 'Taşlık ve buzlu patikalarda ayağı burkulmalardan koruyan B2/B3 sertlikte vibram tabanlı botlar ile dikişsiz merino yürüyüş çorapları kullanılmalıdır.'
      }
    ]
  },
  {
    title: 'İz Bırakma (Leave No Trace) ve Doğa Etiği',
    description: 'Ayak izinden başka bir şey bırakmama, fotoğraftan başka bir şey almama ilkesine bağlılığımız.',
    items: [
      {
        heading: 'Sıfır Katı Atık İlkesi',
        detail: 'Tüm seferlerimizde üretilen ambalaj ve plastik atıklar kamp ekibince ayrıştırılarak şehirlere geri taşınır. Biyolojik çözünür sabun ve diş macunları zorunludur.'
      },
      {
        heading: 'Yaban Hayatına Saygı ve Mesafe',
        detail: 'Kutup ayıları, morslar, lamalar ve boz ayılar asla rahatsız edilmez, beslenmez ve teleobjektiflerle asgari 50-100 metre mesafeden izlenir.'
      },
      {
        heading: 'Kültürel ve Arkeolojik Dokunulmazlık',
        detail: 'Kaya resimleri, antik yazıtlar ve tapınak taşlarına asla dokunulmaz, tebeşir veya boya sürülmez; yerel kutsal mekanlarda giyim kurallarına tam riayet edilir.'
      }
    ]
  },
  {
    title: 'Acil Durum ve Uydu İletişim Protokolü',
    description: 'Hücresel şebekenin olmadığı izole vadilerdeki güvence mekanizmalarımız.',
    items: [
      {
        heading: 'Garmin inReach & Iridium Uydu İletişimi',
        detail: 'Her keşif grubumuz, 24 saat merkez ofisimize ve küresel arama kurtarma merkezlerine konum ileten aktif çift yönlü uydu cihazı taşır.'
      },
      {
        heading: 'Yüksek İrtifa Helikopter Tahliye Sigortası',
        detail: 'Tüm katılımcılarımız için 6.000 metreye kadar helikopterle nokta tahliyeyi ve uluslararası repatriyasyonu kapsayan özel dağcılık sigortası zorunludur.'
      }
    ]
  }
];

export const SEASONAL_PROGRAMMING: SeasonalWindow[] = [
  {
    season: 'Bahar',
    months: 'Mart - Mayıs',
    focus: 'Akdeniz Antik Patikaları, Kanyonlar ve Çiçeklenen Platolar',
    climateContext: 'Akdeniz ve Mezopotamya\'da ılıman sıcaklıklar (18-24°C), vahşi orkide ve kardelen çiçeklenmesi; yürüyüş için yılın en konforlu dönemi.',
    featuredJourneys: [
      'likya-kayalik-kestirmeleri-ve-antik-patikalar',
      'tur-abdin-dicle-kanyonu-ve-mezopotamya-esigi',
      'frig-daglik-vadileri-ve-kaya-anitlari',
      'vadi-rum-kizil-kumtaslari-ve-dana-biyosferi',
      'kumano-kodo-antik-haci-yolu-ve-sedir-ormanlari'
    ]
  },
  {
    season: 'Yaz',
    months: 'Haziran - Ağustos',
    focus: 'Kafkas Buzulları, Kaçkar Zirveleri, Arktik Fiyortlar ve Tiyenşan Yaylaları',
    climateContext: 'Yüksek dağ geçitlerinde karların erimesi, 24 saat gündüz yaşanan gece güneşi enlemleri ve yüksek alpin buzul tırmanış penceresi.',
    featuredJourneys: [
      'kackar-buzul-golleri-ve-yayla-patikalari',
      'svaneti-savunma-kuleleri-ve-kafkas-buzullari',
      'svalbard-arktik-buzul-fiyortlari-ve-morslar',
      'norvec-lofoten-adasi-ve-gece-gunesi-sirtlari',
      'alpler-haute-route-chamonix-zermatt',
      'tanri-daglari-issik-gol-ve-gocer-otlaklari',
      'fann-daglari-masmavi-goller-ve-zarafsan'
    ]
  },
  {
    season: 'Güz',
    months: 'Eylül - Kasım',
    focus: 'Himalaya Geçitleri, Çöl Havzaları, Kapadokya ve Patagonya Baharı',
    climateContext: 'Himalayalarda muson sonrası en berrak gökyüzü; çöllerde kavurucu sıcakların kırılması ve Patagonya\'da doğanın uyanışı.',
    featuredJourneys: [
      'mustang-gizli-kralligi-ve-lo-manthang',
      'bhutan-druk-yolu-ve-kaplan-yuvasi',
      'atacama-altiplano-lagunleri-ve-tuz-vadisi',
      'rubulhali-bos-col-ve-hajar-kanyonlari',
      'patagonya-sili-fiyortlari-ve-fitz-roy',
      'kapadokya-vadi-kiliseleri-ve-yerbasyon-jeolojisi',
      'madagaskar-andasibe-yagmur-ormani-ve-baobab'
    ]
  },
  {
    season: 'Kış',
    months: 'Aralık - Şubat',
    focus: 'Kuzey Işıkları, Donmuş Nehirler, Kutup Gecesi ve Danakil Cehennemi',
    climateContext: 'Aşırı soğukların buzulları dondurmasıyla açılan kış patikaları ve çöl çöküntülerinde tahammül edilebilir kış sıcaklıkları.',
    featuredJourneys: [
      'zanskar-chadar-donmus-nehir-ve-manastirlar',
      'spitsbergen-kutup-gecesi-ve-aurora-kizak-seferi',
      'altay-daglari-ve-kazak-kartal-avcilari',
      'danakil-cokuntusu-ve-erta-ale-lav-golu',
      'harezm-col-kaleleri-ve-aral-havzasi'
    ]
  }
];

export const travelJourneyCatalogItems: CatalogTravelJourney[] = EXPEDITION_JOURNEYS.map((item) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  category: item.category,
  price: { amount: item.pricePerPerson, currency: 'EUR', qualifier: 'kişi başı' },
  description: item.overview,
  attributes: {
    subtitle: item.subtitle,
    region: item.region,
    country: item.country,
    durationText: item.duration.text,
    groupSizeText: item.groupSize.text,
    difficulty: item.difficulty,
    altitudeProfile: item.altitudeProfile,
    displayPrice: item.displayPrice,
    tags: item.tags
  },
  tags: item.tags,
  image: {
    url: item.imageUrl,
    alt: item.alt
  },
  isAvailable: true,
  isFeatured: true,
  durationDays: item.duration.days,
  difficultyLevel: (item.difficulty === 'Kolay-Orta'
    ? 'Sakin'
    : item.difficulty === 'Orta'
    ? 'Dengeli'
    : item.difficulty === 'Orta-Zor'
    ? 'Keşifçi'
    : 'Zorlu') as CatalogTravelJourney['difficultyLevel'],
  maxGroupSize: item.groupSize.max,
  departureSeason: item.bestSeasons,
  destinations: [item.region, item.country],
  includedServices: item.included,
  routeHighlights: item.itinerarySummary.map((s) => s.title),
  recommendedGear: item.gearRequirements,
  altitudeMaxM: parseInt(item.altitudeProfile.replace(/\D+/g, '')) || 3000
}));


/**
 * Butik Doğa Oteli ve İnziva (Boutique Landscape Hotel & Retreat)
 * Odalar, Villalar, Doğa Deneyimleri ve İnziva Veritabanı
 *
 * Toplam: 18 Oda/Villa + 20 Doğa ve Zanaat Deneyimi = 38 Envanter Öğesi.
 * Destekleyici İçerik: Spa & Termal Şifa Tesisleri, Konum ve Ulaşım Rehberi,
 * Dört Mevsim İnziva Programı ve Mimari / Ekoloji Felsefesi.
 */

import type { HotelRoom as CatalogHotelRoom, HotelExperience as CatalogHotelExperience } from './types';

export type AccommodationType = 'suit' | 'villa' | 'pavilion' | 'oda';

export type ExperienceCategory =
  | 'doga_ve_yuruyus'
  | 'gastronomi_ve_hasat'
  | 'zihin_ve_beden'
  | 'zanaat_ve_atolye'
  | 'gece_ve_astronomi';

export interface HotelRoom {
  id: string;
  slug: string;
  title: string;
  type: AccommodationType;
  tagline: string;
  areaSqm: number;
  capacity: {
    adults: number;
    children?: number;
    text: string;
  };
  bedConfiguration: string;
  pricePerNight: number;
  currency: 'EUR' | 'TRY' | 'USD';
  displayPrice: string;
  view: string;
  features: string[];
  description: string;
  spatialDetails: string;
  amenities: string[];
  imageUrl: string;
  alt: string;
}

export interface HotelExperience {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ExperienceCategory;
  duration: string;
  groupLimit: string;
  seasonality: string[];
  price?: number;
  currency?: 'EUR' | 'TRY' | 'USD';
  displayPrice: string;
  schedule: string;
  host: string;
  description: string;
  highlights: string[];
  included: string[];
  imageUrl: string;
  alt: string;
}

export interface SpaFacility {
  id: string;
  slug: string;
  name: string;
  type: string;
  temperature: string;
  description: string;
  rituals: string[];
  mineralProperties: string;
  imageUrl: string;
  alt: string;
}

export interface LocationAccess {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
    display: string;
  };
  helipad: {
    available: boolean;
    coordinates: string;
    flightTimes: { fromIstanbul: string; fromIzmir: string; fromBodrum: string };
  };
  transfers: Array<{ origin: string; distanceKm: number; durationMin: number; vehicleType: string }>;
  climateNotes: string;
  roadAdvisory: string;
}

export interface HotelSeasonalPlan {
  season: 'Bahar' | 'Yaz' | 'Güz' | 'Kış';
  period: string;
  theme: string;
  culinaryFocus: string;
  natureRhythm: string;
  curatedExperiences: string[];
}

export const HOTEL_ROOMS: HotelRoom[] = [
  {
    id: 'room-01',
    slug: 'tas-avlu-suiti',
    title: 'Taş Avlu Süiti',
    type: 'suit',
    tagline: 'Kaz Dağları kesme granit taş işçiliği ve gölgeli defne avlusu',
    areaSqm: 68,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Masif Meşe Yatak',
    pricePerNight: 520,
    currency: 'EUR',
    displayPrice: '€520 / gece',
    view: 'Geleneksel taş avlu, nar ve zeytin ağaçları',
    features: ['Açık şömine', 'Özel avlu bahçesi', 'Bağımsız serbest küvet', 'Yerden ısıtma'],
    description: 'Bölgenin yerel granit taşlarıyla harçsız örülmüş kalın duvarları, yazın serin kışın sıcacık bir sığınak yaratır. Özel defneli avlusunda sabah kahvenizi kuş sesleri eşliğinde yudumlarken, masif ahşap tavan kirişleri ve doğal kireç badanalı yüzeyler zihni sakinleştirir.',
    spatialDetails: 'Geniş yatak odası, döküm odun şöminesi, mermer banyoda bağımsız derin taş küvet ve 25 m² özel gölgeli avlu terası.',
    amenities: ['Doğal keten nevresimler', 'Özel lavanta banyo tuzları', 'Odun şöminesi servisi', 'El yapımı çömlek kahve takımı', 'Bang & Olufsen ses sistemi'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    alt: 'Taş Avlu Süiti masif ahşap yatak ve rustik taş duvar mimarisi'
  },
  {
    id: 'room-02',
    slug: 'zeytinlik-tas-evi',
    title: 'Asırlık Zeytinlik Taş Evi',
    type: 'villa',
    tagline: '300 yıllık anıt zeytin ağaçları arasında tamamen müstakil taş yaşam alanı',
    areaSqm: 110,
    capacity: { adults: 4, children: 1, text: '4 Yetişkin + 1 Çocuk' },
    bedConfiguration: '2 King Size Yatak (İki Bağımsız Yatak Odası)',
    pricePerNight: 890,
    currency: 'EUR',
    displayPrice: '€890 / gece',
    view: 'Panoramik zeytin koruluğu ve vadi gün batımı',
    features: ['Özel taş veranda', 'Geniş şömineli salon', 'Açık mutfak adası', 'Açık hava taş duşu'],
    description: 'Eski bir zeytinyağı işliğinin aslına sadık kalınarak restore edilmesiyle doğan bu ev, asırlık ağaçların gümüşi yapraklarıyla çevrilidir. Geniş taş verandası akşam saatlerinde vadi rüzgarını alırken, içerideki kestane doğramalar ve el dokuması kilimler dingin bir dağ evi sıcaklığı sunar.',
    spatialDetails: 'İki ebeveyn banyolu bağımsız yatak odası, yüksek ahşap beşik tavanlı salon, açık şömine ve 40 m² panoramik veranda.',
    amenities: ['Özel şef açık mutfak hizmeti', 'Organik zeytinyağı ikram kiti', 'Şömine odun stoku', 'Bose surround ses sistemi', 'Dyson saç bakım seti'],
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Asırlık Zeytinlik Taş Evi terası zeytin ağaçları ve akşam gün batımı'
  },
  {
    id: 'room-03',
    slug: 'sedir-agac-teras-suiti',
    title: 'Sedir Ağaç Teras Süiti',
    type: 'suit',
    tagline: 'Lübnan sedirlerinin taç hizasında, orman kokusunu içeri alan asma teras',
    areaSqm: 75,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Sedir Ağacı Karyola',
    pricePerNight: 580,
    currency: 'EUR',
    displayPrice: '€580 / gece',
    view: 'Sedir ormanı tepeleri ve gökyüzü açıklığı',
    features: ['Ağaç hizasında asma teras', 'Gömme sedir küveti', 'Şömine', 'Aromaterapi menüsü'],
    description: 'Sedir ağaçlarının reçineli kokusunu odanın her köşesine taşıyan bu süit, doğal eğimli arazide yükseltilmiş ahşap platform üzerinde kuruludur. Tavandan tabana cam cephesi sayesinde kendinizi ormanın gölgesinde asılı hisseder, terastaki sedir küvetinde dağ pınarı suyuyla tazelenirsiniz.',
    spatialDetails: 'Açık plan yatak ve oturma alanı, Japon esintili gömme sedir ıslak hacim ve 20 m² konsol orman terası.',
    amenities: ['Uçucu sedir yağı difüzörü', 'Doğal yün battaniyeler', 'Özel bitki çayı barı', 'Yıldız gözlem dürbünü', 'Piknik sırt çantası'],
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sedir Ağaç Teras Süiti büyük pencereler ve sedir ormanı manzarası'
  },
  {
    id: 'room-04',
    slug: 'masif-mese-vadi-kosku',
    title: 'Masif Meşe Vadi Köşkü',
    type: 'pavilion',
    tagline: 'Kanyon tabanına hakim kayalık burun üzerinde minimalist masif ahşap köşk',
    areaSqm: 95,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Platform Yatak',
    pricePerNight: 740,
    currency: 'EUR',
    displayPrice: '€740 / gece',
    view: 'Derin kanyon boğazı ve akan nehir sesi',
    features: ['360 derece cam köşk mimarisi', 'Özel şömine', 'Geniş dinlenme balkonu', 'Özel kütüphane'],
    description: 'Kanyonun kıvrım yaptığı sarp burunda, yerel meşe kütükleri ve antrasit çelik konstrüksiyonun birleşimiyle inşa edilmiştir. Nehir suyunun çağıltısı gece boyu doğal bir beyaz gürültü sunar. Duvarları kaplayan felsefe ve doğa tarihi kütüphanesi yalnız kalmak isteyenler için mükemmeldir.',
    spatialDetails: 'Geniş cam cepheli salon, yükseltilmiş yatak podyumu, mermer banyo ve kanyona uzanan 30 m² konsol ahşap güverte.',
    amenities: ['Küratörlü edebiyat kütüphanesi', 'Döküm kuzine şömine', 'Gözleme dürbünü', 'Doğal kaynak suyu sebili', 'Marshall Bluetooth amfi'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Masif Meşe Vadi Köşkü kanyon manzarası ve modern rustik salon tasarımı'
  },
  {
    id: 'room-05',
    slug: 'terasta-somineli-kaya-suiti',
    title: 'Şömineli Kaya Kanyon Süiti',
    type: 'suit',
    tagline: 'Doğal kaya formasyonunun içine oyulmuş teras ve açık hava taş şöminesi',
    areaSqm: 82,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Masif Karyola',
    pricePerNight: 640,
    currency: 'EUR',
    displayPrice: '€640 / gece',
    view: 'Karstik kaya duvarları ve çam vadisi',
    features: ['Teras açık hava şöminesi', 'Doğal kaya iç banyosu', 'Gömme şezlong nişi', 'Isıtmalı taş zemin'],
    description: 'Yamaçtaki doğal kireçtaşı yarığının içine saygıyla yerleştirilen bu süit, arka duvarında bin yıllık ham kaya dokusunu çıplak bırakır. Terasındaki açık hava taş şöminesi, serin dağ akşamlarında yıldızların altında ateş başında vakit geçirmeyi unutulmaz bir ritüele dönüştürür.',
    spatialDetails: 'Kaya dokulu iç salon, yatak nişi, doğrudan kayadan sızan mikro şelaleli duş alanı ve 25 m² açık teras.',
    amenities: ['Şömine közleme tepsisi ve kestane servisi', 'Doğal keçi tiftiği şallar', 'Yerden ısıtmalı traverten', 'Bose kablosuz ses sistemi'],
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    alt: 'Şömineli Kaya Kanyon Süiti açık taş şömine ve dağ manzaralı teras'
  },
  {
    id: 'room-06',
    slug: 'lavanta-bahceli-tas-villa',
    title: 'Lavanta Bahçeli Müstakil Villa',
    type: 'villa',
    tagline: 'Mor lavanta tarlaları ve kekik kokuları ortasında iki katlı taş inziva',
    areaSqm: 135,
    capacity: { adults: 4, children: 2, text: '4 Yetişkin + 2 Çocuk' },
    bedConfiguration: '1 King Size Yatak + 2 Tek Kişilik Masif Yatak',
    pricePerNight: 1100,
    currency: 'EUR',
    displayPrice: '€1.100 / gece',
    view: 'Lavanta tarlası, meyve bahçeleri ve dağ sırtı',
    features: ['Özel lavanta bahçesi', 'İki bağımsız kat', 'Açık ateş çukuru', 'Geleneksel ekmek fırını'],
    description: 'Yaz başından itibaren mor dalgalarla kaplanan lavanta tarlalarının yanı başında yer alan villa, ailecek veya dost gruplarıyla inzivaya çekilmek için tasarlandı. Kendi bahçesinde açık ateş çukuru ve taş ekşi maya ekmek fırını barındırır.',
    spatialDetails: 'Alt katta şömineli geniş salon, mutfak ve yemek alanı; üst katta ahşap tavanlı iki süit yatak odası ve 50 m² özel çim bahçe.',
    amenities: ['Özel bahçe ateş çukuru odunu', 'Taş fırın pişirme seti', 'Taze lavanta hasat kiti', 'Tam donanımlı şef mutfağı'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    alt: 'Lavanta Bahçeli Taş Villa önünde mor lavantalar ve taş cephe'
  },
  {
    id: 'room-07',
    slug: 'dag-sirti-panoramik-rezidans',
    title: 'Dağ Sırtı Panoramik Rezidans',
    type: 'villa',
    tagline: 'Tesisin en yüksek kotunda, Edremit Körfezi\'nden zirvelere uzanan sonsuz ufuk',
    areaSqm: 160,
    capacity: { adults: 4, text: '4 Yetişkin' },
    bedConfiguration: '2 adet Master King Size Yatak Odası',
    pricePerNight: 1450,
    currency: 'EUR',
    displayPrice: '€1.450 / gece',
    view: '360 derece vadi, dağ sırtları ve uzakta deniz ışıltısı',
    features: ['Sonsuzluk jakuzisi', 'Geniş cam cepheler', 'Özel sauna odası', 'Özel vale ve şef tahsisi'],
    description: 'Sırt hattının doruk noktasında yer alan rezidans, günün her saatinde ışığın değişimini sinematik bir genişlikte içeri alır. Özel sedir ağacı saunası ve kanyona bakan sıcak su sonsuzluk jakuzisi, inzivayı en üst düzey mahremiyetle taçlandırır.',
    spatialDetails: 'İki master süit, şömineli salon, şarap kavı, panaromik jakuzili 60 m² teras ve cam duvarlı özel sauna.',
    amenities: ['Özel sauna ve buz kovası ritüeli', 'Kişisel uşak (butler) servisi', 'Kav seçkisi tadımı', 'Helikopter pisti öncelikli transferi'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dağ Sırtı Rezidans panoramik teras ve sonsuzluk havuz jakuzi manzarası'
  },
  {
    id: 'room-08',
    slug: 'pinarli-avlu-bahce-odasi',
    title: 'Pınarlı Bahçe Odası',
    type: 'oda',
    tagline: 'Dağdan gelen kaynak suyunun mermer yalağa aktığı serin avlu odası',
    areaSqm: 48,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Yatak',
    pricePerNight: 390,
    currency: 'EUR',
    displayPrice: '€390 / gece',
    view: 'İncir ağaçları, su yalağı ve taş avlu',
    features: ['Akan pınar suyu yalağı', 'Kireç badanalı taş duvarlar', 'Mermer banyo', 'Doğal gölge'],
    description: 'Yüz yıllık bir incir ağacının gölgesinde, sürekli şırıldayan doğal dağ pınarı sesinin huzur verdiği sakin bir oda. Basit, arınmış ve fazlalıklardan arındırılmış iç mekan kurgusu, yoğun tempodan kaçanlar için kusursuz bir dinlenme alanı oluşturur.',
    spatialDetails: 'Tek hacimli aydınlık oda, mermer lavabolu duş alanı ve incir ağacı altındaki taş oturma nişi.',
    amenities: ['Doğal keten bornozlar', 'Kaynak suyu ikramı', 'Bitkisel el yapımı zeytinyağı sabunları', 'Sessizlik garantili konum'],
    imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pınarlı Bahçe Odası beyaz kireç taş oda ve doğal ışık'
  },
  {
    id: 'room-09',
    slug: 'yuksek-tavanli-manastir-odasi',
    title: 'Yüksek Tavanlı Manastır Odası',
    type: 'oda',
    tagline: '4.5 metre tavan yüksekliği, tonozlu taş tavan ve manastır dinginliği',
    areaSqm: 56,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Masif Meşe Yatak',
    pricePerNight: 440,
    currency: 'EUR',
    displayPrice: '€440 / gece',
    view: 'Manastır bahçesi ve asma çardağı',
    features: ['Tonozlu taş tavan', 'Derin pencere nişleri', 'Akustik yankısız mimari', 'Kütüphane köşesi'],
    description: 'Eski manastır hücresi oranlarına sadık kalarak inşa edilen bu oda, 4.5 metrelik tavan yüksekliğiyle olağanüstü bir ferahlık ve nefes alanı sunar. Derin taş pencere nişlerinde kitap okumak veya sessizce dışarıdaki asmaları izlemek için idealdir.',
    spatialDetails: 'Yüksek tonozlu oda alanı, keten perdeler, meşe yazı masası ve ferah mermer banyo.',
    amenities: ['Geniş meşe çalışma masası', 'Mürekkep ve divit seti', 'Klasik müzik koleksiyonu', 'Doğal balmumu mumlar'],
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Yüksek Tavanlı Manastır Odası taş tonoz tavan ve masif meşe yatak'
  },
  {
    id: 'room-10',
    slug: 'cam-kokulu-loft-suit',
    title: 'Çam Kokulu Ahşap Loft Süit',
    type: 'suit',
    tagline: 'İki katlı ahşap karkas yapı, asma kat yatak odası ve şömineli alt salon',
    areaSqm: 88,
    capacity: { adults: 3, text: '3 Yetişkin' },
    bedConfiguration: '1 King Size Yatak (Asma Kat) + 1 Gündüz Yatağı',
    pricePerNight: 610,
    currency: 'EUR',
    displayPrice: '€610 / gece',
    view: 'Karaçam ormanı ve gün doğumu tepeleri',
    features: ['Asma kat yatak alanı', 'Döküm soba şömine', 'Geniş ahşap balkon', 'Özel giyinme odası'],
    description: 'Geleneksel yayla mimarisinin çağdaş bir yorumu olan loft süit, tamamen doğal çam ve kestane kerestesiyle inşa edilmiştir. Alt kattaki döküm sobada yanan odunların çıtırtısı asma kattaki yatağa kadar yükselir.',
    spatialDetails: 'Alt katta şömineli oturma alanı ve balkon; ahşap merdivenle ulaşılan asma katta yatak odası ve çatı pencereleri.',
    amenities: ['Döküm şömine sobası', 'Kestane ağacı balkon mobilyaları', 'Organik yün uyku yastıkları', 'El yapımı çay takımı'],
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Çam Kokulu Loft Süit asma kat ahşap tavan ve döküm soba'
  },
  {
    id: 'room-11',
    slug: 'bag-evi-panoramik-suit',
    title: 'Bağ Evi Teraslı Taş Süit',
    type: 'suit',
    tagline: 'Otelimizin organik bağ parsellerine bakan geniş taş teraslı süit',
    areaSqm: 72,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Yatak',
    pricePerNight: 550,
    currency: 'EUR',
    displayPrice: '€550 / gece',
    view: 'Teraslı bağlar, selvi ağaçları ve akşam göğü',
    features: ['Geniş bağ manzaralı teras', 'Şömine', 'Özel şarap dolabı', 'Taş küvet'],
    description: 'Yamaç boyunca kademelenen organik bağların tam ortasında yer alan bu süit, özellikle sonbaharda bağ bozumu döneminde renk cümbüşünün merkezindedir. Terasında yer alan özel şarap tadım köşesi vadi gün batımını kutlamak için eşsizdir.',
    spatialDetails: 'Geniş yatak odası, şarap tadım masası, şömine ve asma pergolalı 30 m² taş teras.',
    amenities: ['Isı ayarlı şarap mahzeni dolabı', 'Zeytin ağacından peynir tahtası servisi', 'Kristal degüstasyon kadehleri', 'Şömine servisi'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bağ Evi Teraslı Taş Süit bağ manzarası ve gün batımı terası'
  },
  {
    id: 'room-12',
    slug: 'isitmali-havuzlu-vadi-villasi',
    title: 'Isıtmalı Kaynak Havuzlu Vadi Villası',
    type: 'villa',
    tagline: 'Doğal jeotermal kaynak suyuyla beslenen özel açık havuzlu lüks taş villa',
    areaSqm: 145,
    capacity: { adults: 4, text: '4 Yetişkin' },
    bedConfiguration: '2 King Size Yatak Odası',
    pricePerNight: 1350,
    currency: 'EUR',
    displayPrice: '€1.350 / gece',
    view: 'Vadi kanyonu ve orman açıklığı',
    features: ['Özel ısıtmalı kaynak havuzu (32°C)', 'Açık hava duşu', 'Açık şömine', 'Özel bahçe alanı'],
    description: 'Yılın 365 günü 32 derece sabit sıcaklıkta tutulan ve klor yerine mineral tuzlarıyla filtrelenen özel taş havuzuyla tesisin en ayrıcalıklı villalarından biridir. Karlı kış günlerinde bile havuzun buharları arasında kanyon manzarasını izleyebilirsiniz.',
    spatialDetails: 'İki bağımsız süit yatak odası, yüksek tavanlı salon, açık mutfak, 70 m² tik ağacı güverte ve 28 m² özel ısıtmalı havuz.',
    amenities: ['32°C özel termal havuz servisi', 'Havuz başı bornoz ve şal ısıtıcıları', 'Şömineli oturma grubu', 'Bose outdoor hoparlörler'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Isıtmalı Havuzlu Vadi Villası taş havuz ve kanyon orman doğası'
  },
  {
    id: 'room-13',
    slug: 'yildiz-gozlem-cam-kubbe-evi',
    title: 'Cam Tavanlı Yıldız Gözlem Pavyonu',
    type: 'pavilion',
    tagline: 'Yatağınızın üzerinden açılan panoramik cam kubbe ile gece gökyüzü inzivası',
    areaSqm: 65,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet Özel Tasarım Yuvarlak King Platform Yatak',
    pricePerNight: 690,
    currency: 'EUR',
    displayPrice: '€690 / gece',
    view: 'Samanyolu, açık gökyüzü ve orman silüeti',
    features: ['Elektrikli açılır cam tavan perdesi', 'Profesyonel teleskop', 'Döküm şömine soba', 'Özel ahşap teras'],
    description: 'Sıfır ışık kirliliğine sahip vadimizde gökyüzü meraklıları için tasarlandı. Yatağınızda uzanırken Samanyolu kuşağını ve takımyıldızlarını kristal netliğinde izleyebilir, odadaki profesyonel reflektör teleskopla gezegenleri inceleyebilirsiniz.',
    spatialDetails: 'Dairesel formlu açık plan yaşam alanı, cam tavan kubbesi, şömineli oturma köşesi ve güverte terası.',
    amenities: ['Celestron motorlu takip teleskobu', 'Gök atlası ve gece kırmızı feneri', 'Sıcak kış punch servisi', 'Yün gökyüzü battaniyesi'],
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Yıldız Gözlem Cam Kubbe Evi cam tavan ve gece yıldızlar manzarası'
  },
  {
    id: 'room-14',
    slug: 'eski-degirmen-dere-suiti',
    title: 'Tarihi Değirmen Dere Kenarı Süiti',
    type: 'suit',
    tagline: 'Eski su değirmeninin taş çarkı ve akan dağ deresiyle iç içe tarihi süit',
    areaSqm: 78,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Yatak',
    pricePerNight: 590,
    currency: 'EUR',
    displayPrice: '€590 / gece',
    view: 'Akan dere yatağı, çınar ağaçları ve ahşap değirmen bendi',
    features: ['Dere üstü ahşap balkon', 'Tarihi taş değirmen çarkı detayı', 'Şömine', 'Doğal su sesi'],
    description: 'Otel arazisindeki 150 yıllık un değirmeninin özgün taş duvarları ve değirmen arkı korunarak dönüştürülmüştür. Odanın altından geçen su kanalı ve balkonun hemen altındaki çınar gölgeli nehir yatağı eşsiz bir sükunet sunar.',
    spatialDetails: 'Otantik taş salon, ahşap yatak nişi, su kanalı manzaralı banyo ve dere üstüne sarkan 18 m² ahşap platform.',
    amenities: ['Nehir kenarı şezlongları', 'Doğal dere soğutuculu içecek sepeti', 'Şömine servisi', 'Doğal sabunlar'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Tarihi Değirmen Dere Kenarı Süiti nehir ve tarihi taş duvarlar'
  },
  {
    id: 'room-15',
    slug: 'vadiye-bakan-balkonlu-doga-odasi',
    title: 'Vadi Teraslı Kestane Doğa Odası',
    type: 'oda',
    tagline: 'Masif kestane ağacı doğramalar ve vadiye açılan ferah balkon',
    areaSqm: 52,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 King Size Yatak veya 2 Tek Kişilik Yatak',
    pricePerNight: 410,
    currency: 'EUR',
    displayPrice: '€410 / gece',
    view: 'Geniş kanyon vadisi ve karşı dağ yamaçları',
    features: ['Geniş kestane balkon', 'Doğal kireç sıvalar', 'Açık gardırop', 'Geniş duş alanı'],
    description: 'Yalın İskandinav ve sıcak Anadolu kırsal tasarımının dengeli bir bileşimi. Balkonunda oturup vadiden yükselen çam ve adaçayı kokularını solumak, günün ilk ışıklarını izlemek için mükemmel bir vaha.',
    spatialDetails: 'Aydınlık yatak alanı, kestane çalışma masası, traverten banyo ve 12 m² manzaralı balkon.',
    amenities: ['Doğal keten bornoz ve terlikler', 'Kestane ağacı balkon koltukları', 'Espresso makinesi ve yerel çaylar'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    alt: 'Vadi Teraslı Kestane Doğa Odası balkon manzarası ve vadi'
  },
  {
    id: 'room-16',
    slug: 'sakli-kanyon-ciftlik-evi',
    title: 'Saklı Kanyon Çiftlik Rezidansı',
    type: 'villa',
    tagline: 'Tesisin en izole vadisinde, kendi bostanı ve kümesi olan bağımsız çiftlik evi',
    areaSqm: 175,
    capacity: { adults: 6, children: 2, text: '6 Yetişkin + 2 Çocuk' },
    bedConfiguration: '3 Bağımsız Süit Yatak Odası (King Yataklar)',
    pricePerNight: 1650,
    currency: 'EUR',
    displayPrice: '€1.650 / gece',
    view: 'Özel vadi çanağı, meyve ağaçları ve otlak',
    features: ['Özel organik bostan', 'Geniş mutfak ve yemek salonu', 'Çift şömine', 'Açık veranda ve taş fırın'],
    description: 'Doğayla tam bir uyum içinde kendi kendine yetebilen bir yaşam hayali kuranlar için. Konuklar sabah kendi bostanlarından taze domates ve biberlerini toplayabilir, taş fırında kendi ekmeklerini pişirebilir veya şefimizden özel yemek servisi alabilirler.',
    spatialDetails: 'Üç ebeveyn banyolu süit yatak odası, 8 kişilik şömineli yemek salonu, kilerli açık şef mutfağı ve 80 m² taş veranda.',
    amenities: ['Günlük bostan sepeti servisi', 'Özel aşçı kiralama opsiyonu', 'Çift şömine odun desteği', 'Geniş aile kütüphanesi'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Saklı Kanyon Çiftlik Rezidansı taş mimari ve etrafındaki organik bostan'
  },
  {
    id: 'room-17',
    slug: 'golet-kiyisi-ahsap-inziva-kosku',
    title: 'Gölet Kıyısı Masif İnziva Köşkü',
    type: 'pavilion',
    tagline: 'Doğal nilüferli göletin hemen üzerinde, suyla hemzemin ahşap iskeleli köşk',
    areaSqm: 70,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet King Size Masif Karyola',
    pricePerNight: 620,
    currency: 'EUR',
    displayPrice: '€620 / gece',
    view: 'Nilüferli doğal dağ göleti ve yansıyan ağaçlar',
    features: ['Su üstü ahşap iskele', 'Şömine', 'Gözlem kanosu', 'Açık hava küveti'],
    description: 'Otel bahçesindeki doğal nilüfer göletinin tam kıyısında yükselen bu masif ahşap köşk, sabahları sisin su üzerinden kalkışını izlemek için eşsizdir. İskelesine bağlı ahşap kano ile gölette kısa bir tur atabilir, terastaki taş küvette dinlenebilirsiniz.',
    spatialDetails: 'Açık plan yatak ve şömine alanı, su manzaralı serbest taş küvet ve göletin içine uzanan 22 m² ahşap iskele.',
    amenities: ['Özel gölet kanosu', 'Göl kenarı sabah kahvaltı servisi', 'Şömine servisi', 'Dürbün ve gölet faunası rehberi'],
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Gölet Kıyısı Masif İnziva Köşkü su üstü ahşap iskele ve nilüferler'
  },
  {
    id: 'room-18',
    slug: 'kartal-yuvasi-kaya-kartali-villasi',
    title: 'Kartal Yuvası Uçurum Villası',
    type: 'villa',
    tagline: 'Sarp kayalık çıkıntının üzerine asılmış, çelik ve cam konsol mimari harikası',
    areaSqm: 120,
    capacity: { adults: 2, text: '2 Yetişkin' },
    bedConfiguration: '1 adet Ultra King Asılı Tasarım Yatak',
    pricePerNight: 1250,
    currency: 'EUR',
    displayPrice: '€1.250 / gece',
    view: 'Uçurum boşluğu, kanyon derinliği ve gökyüzü',
    features: ['Cam tabanlı konsol zemin', 'Açık teras jakuzisi', 'Şömine', 'Tam mahremiyet'],
    description: 'Cesur mimari tasarımıyla kanyonun 150 metre yukarısındaki kayalık çıkıntıya konsol olarak uzanır. Cam taban bölümünden aşağıdaki kanyon tabanını izleyebilir, açık terastaki sedir jakuzide kartalların uçuş hizasında olmanın heyecanını yaşayabilirsiniz.',
    spatialDetails: 'Cam duvarlı master yatak odası, şömineli konsol salon, açık teras jakuzisi ve özel giriş köprüsü.',
    amenities: ['Konsol teras sedir jakuzisi', 'Şampanya ve gurme karşılama tepsisi', 'Kişisel hizmet düğmesi', 'Bang & Olufsen ses sistemi'],
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kartal Yuvası Uçurum Villası kanyon kayalıklarında asılı mimari tasarım'
  }
];

export const HOTEL_EXPERIENCES: HotelExperience[] = [
  {
    id: 'exp-01',
    slug: 'yabani-ot-ve-mantar-toplayiciligi',
    title: 'Kaz Dağları Florasında Yabani Ot ve Mantar Toplayıcılığı',
    category: 'doga_ve_yuruyus',
    duration: '3.5 Saat',
    groupLimit: 'En fazla 6 kişi',
    seasonality: ['İlkbahar', 'Sonbahar'],
    price: 85,
    currency: 'EUR',
    displayPrice: '€85 / kişi',
    schedule: 'Salı ve Cumartesi 09:30',
    host: 'Mustafa Bey (Yerel Etnobotanikçi & Köy Rehberi)',
    description: 'Kaz Dağları\'nın bin bir pınarlı zengin florasında şevketi bostan, radika, kazayağı, yabani kuşkonmaz ve kuzugöbeği mantarlarının izini sürüyoruz. Toplanan şifalı otlar mutfakta şefimizle birlikte öğle menüsüne dönüştürülür.',
    highlights: ['Endemik bitki teşhis atölyesi', 'Geleneksel hasat sepeti ve çakı kullanımı', 'Toplanan otlarla açık mutfak tadımı'],
    included: ['Hasat sepeti ve ekipman', 'Botanik rehberlik', 'Öğle tadım menüsü ve yöresel şarap eşleşmesi'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ormanda yabani ot ve mantar toplayan rehber ve sepet'
  },
  {
    id: 'exp-02',
    slug: 'gun-batimi-cam-bali-aricilik',
    title: 'Gün Batımında Çam Balı ve Arıcılık Atölyesi',
    category: 'gastronomi_ve_hasat',
    duration: '2 Saat',
    groupLimit: 'En fazla 4 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar'],
    price: 70,
    currency: 'EUR',
    displayPrice: '€70 / kişi',
    schedule: 'Çarşamba ve Pazar 17:00',
    host: 'Ali Usta (Üçüncü Kuşak Dağ Arıcısı)',
    description: 'Koruyucu tulumlarımızı giyerek otelimizin çam ormanı eteğindeki kovanlarına yaklaşıyoruz. Basra böceğinin çam salgısından arıların ürettiği ham çam balının petekten süzülüşünü izliyor, taze polen ve propolis tadımı yapıyoruz.',
    highlights: ['Kovan içi arı hiyerarşisi gözlemi', 'Petekten doğrudan ham bal kaşıklama', 'Özel kavanozda kendi balını mühürleme'],
    included: ['Tam koruyucu profesyonel arıcı tulumu', 'Bal ve polen degüstasyonu', 'Kişiye özel 500 gr ham bal hediyesi'],
    imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Arılıkta kovan çerçevesinden taze süzülen altın sarısı çam balı'
  },
  {
    id: 'exp-03',
    slug: 'gece-teleskobuyla-samanyolu-gozlemi',
    title: 'Sıfır Işık Kirliliğinde Samanyolu ve Derin Uzay Gözlemi',
    category: 'gece_ve_astronomi',
    duration: '2.5 Saat',
    groupLimit: 'En fazla 8 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
    displayPrice: 'Otel Konuklarına Ücretsiz',
    schedule: 'Haftanın her gecesi (Hava açıkken) 22:00',
    host: 'Dr. Cahit Arda (Amatör Astronom & Fizikçi)',
    description: 'Vadimizin sıfır yapay ışık avantajıyla, 14 inçlik motorlu Dobson teleskobu başında evrenin derinliklerine bakıyoruz. Satürn\'ün halkaları, Jüpiter\'in uyduları, Andromeda Galaksisi ve mevsime göre meteor yağmurları rehber eşliğinde anlatılır.',
    highlights: ['Bortle Sınıfı 2 karanlık gökyüzü kalitesi', 'Gezegen ve nebula gözlemleri', 'Yeşil lazerle takımyıldız mitolojisi anlatımı'],
    included: ['Teleskop ekipmanı', 'Sıcak dağ salebi ve konyak ikramı', 'Yıldız haritası broşürü'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Karanlık gece gökyüzünde parıldayan Samanyolu ve teleskop silüeti'
  },
  {
    id: 'exp-04',
    slug: 'nehir-boyu-sessiz-orman-banyosu',
    title: 'Nehir Boyu Sessiz Yürüyüş ve Shinrin-yoku Orman Banyosu',
    category: 'zihin_ve_beden',
    duration: '2.5 Saat',
    groupLimit: 'En fazla 6 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
    displayPrice: 'Otel Konuklarına Ücretsiz',
    schedule: 'Pazartesi, Perşembe ve Cumartesi 08:30',
    host: 'Defne Yılmaz (Farkındalık ve Meditasyon Kolaylaştırıcısı)',
    description: 'Japonların \'Shinrin-yoku\' (Orman Banyosu) felsefesini çınar ve çam ormanlarında uyguluyoruz. Telefonların kapalı olduğu bu sessiz yürüyüşte, ağaçların salgıladığı fitonsit maddelerini soluyarak kortizol seviyemizi düşürüyor ve beş duyumuzu doğaya açıyoruz.',
    highlights: ['Rehberli nefes egzersizleri', 'Yalınayak toprak ve yosun teması', 'Nehir kenarında sessiz çay seremonisi'],
    included: ['Minder ve yün battaniye', 'Dağ kekiği infüzyonu', 'Farkındalık günlüğü'],
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Güneş ışınlarının süzüldüğü yemyeşil sisli ormanda yürüyen kişi'
  },
  {
    id: 'exp-05',
    slug: 'yerel-toprak-boyalarla-fresk-atolyesi',
    title: 'Doğal Mineral ve Toprak Pigmentleriyle Resim Atölyesi',
    category: 'zanaat_ve_atolye',
    duration: '3 Saat',
    groupLimit: 'En fazla 6 kişi',
    seasonality: ['İlkbahar', 'Sonbahar', 'Kış'],
    price: 95,
    currency: 'EUR',
    displayPrice: '€95 / kişi',
    schedule: 'Cuma 14:30',
    host: 'Selin Doğan (Ressam & Restoratör)',
    description: 'Kaz Dağları\'nın kireçtaşı, demir oksit kırmızısı ve kömür katmanlarından bizzat ezilerek hazırlanan mineral pigmentlerle geleneksel kireç sıvalı levhalara fresk tekniğinde resim yapma deneyimi.',
    highlights: ['Doğal kayaçların havanda ezilmesi ve pigment hazırlanışı', 'Yumurta akı ve kireç bağlayıcıları kullanımı', 'Kendi yaptığınız fresk taşını yanınızda götürme imkanı'],
    included: ['Tüm mineral boyalar ve taş levha', 'Ahşap koruma çerçevesi', 'Sanatçı atölyesi ikramları'],
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Taş palet üzerinde doğal toprak pigmentleri ve fırçalar'
  },
  {
    id: 'exp-06',
    slug: 'asirlik-zeytinlikte-tas-baski-hasat',
    title: 'Asırlık Ağaçlarda Soğuk Taş Baskı Zeytin Hasadı',
    category: 'gastronomi_ve_hasat',
    duration: '4 Saat',
    groupLimit: 'En fazla 8 kişi',
    seasonality: ['Sonbahar'],
    price: 110,
    currency: 'EUR',
    displayPrice: '€110 / kişi',
    schedule: 'Ekim - Aralık ayları boyunca her Cumartesi 10:00',
    host: 'Otel Baş Bahçıvanı & Zeytinyağı Tadım Uzmanı',
    description: 'Geleneksel yaygılar serilerek tırmıklarla elle toplanan zeytinlerin, tarihi taş değirmende ezilerek preslenmesi ve ilk "erken hasat soğuk sıkım" yağın sıcak köy ekmeği üzerine dökülerek tadımı.',
    highlights: ['Asırlık zeytin ağaçlarına zarar vermeden hasat kültürü', 'Granit taş değirmenin çalışma prensibi', 'Serbest asitlik ve polifenol derecelendirmesi'],
    included: ['Hasat önlüğü ve eldiven', 'Sıcak ekmek ve taze yağ tadımı ziyafeti', 'Kendi sıktığınız 1 litrelik ilk zeytinyağı şişesi'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    alt: 'Zeytin hasadı sırasında dalından dökülen yeşil zeytinler ve taş değirmen'
  },
  {
    id: 'exp-07',
    slug: 'vadi-somineli-akustik-oda-dinletileri',
    title: 'Taş Salonda Çellolu Akustik Oda Müziği Geceleri',
    category: 'zihin_ve_beden',
    duration: '1.5 Saat',
    groupLimit: 'En fazla 20 kişi',
    seasonality: ['Sonbahar', 'Kış', 'İlkbahar'],
    displayPrice: 'Otel Konuklarına Ücretsiz',
    schedule: 'Cuma ve Cumartesi 21:00',
    host: 'İstanbul Devlet Senfoni Orkestrası Solistleri',
    description: 'Doğal akustiğe sahip yüksek taş tonozlu şömine salonunda, sadece mum ışığı ve çıtırdayan odun ateşi eşliğinde Bach çello süitleri ve dingin oda müziği dinletisi.',
    highlights: ['Mikrofonsuz saf akustik ses deneyimi', 'Bach, Erik Satie ve Arvo Pärt repertuvarı', 'Şömine başında sıcak şarap ve kestane ikramı'],
    included: ['Konser katılımı', 'Özel sıcak baharatlı şarap veya bitki çayı'],
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Şömine ışığında çello çalan müzisyen ve loş taş salon'
  },
  {
    id: 'exp-08',
    slug: 'yabani-maya-ve-ekmek-pisirme-atolyesi',
    title: 'Taş Fırında Yabani Ekşi Maya ve Siyez Ekmeği Atölyesi',
    category: 'gastronomi_ve_hasat',
    duration: '3 Saat',
    groupLimit: 'En fazla 6 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
    price: 80,
    currency: 'EUR',
    displayPrice: '€80 / kişi',
    schedule: 'Perşembe 11:00',
    host: 'Şef Emre Kaya (Ekmek Ulaştırmacısı & Fırıncı)',
    description: '10 yıllık canlı ekşi mayamız ve Kastamonu atalık siyez unuyla hamur yoğurma, fermantasyon katlama teknikleri ve meşe odunu yanan taş fırında ekmek pişirmenin incelikleri.',
    highlights: ['Atalık tohumların gluten yapısı ve sindirim sağlığı', 'Hamur katlama ve sepet mayalama teknikleri', 'Fırından yeni çıkmış çıtır sıcak somun tadımı'],
    included: ['Önlük ve fırın küreği kullanımı', 'Canlı ekşi maya kavanozu', 'Pişirdiğiniz iki somun ekmek'],
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    alt: 'Taş fırından yeni çıkmış çıtır kabuklu ekşi mayalı siyez ekmeği'
  },
  {
    id: 'exp-09',
    slug: 'antik-patikada-botanik-illustrasyon',
    title: 'Endemik İda Bitkileriyle Botanik İllüstrasyon Çizimi',
    category: 'zanaat_ve_atolye',
    duration: '3 Saat',
    groupLimit: 'En fazla 5 kişi',
    seasonality: ['İlkbahar', 'Yaz'],
    price: 90,
    currency: 'EUR',
    displayPrice: '€90 / kişi',
    schedule: 'Cumartesi 10:00',
    host: 'Gülçin Alkan (Botanik Ressamı)',
    description: 'Kaz Dağı göknarı (Abies nordmanniana equi-trojani) ve sarı İda çiğdemi gibi endemik türlerin doğada canlı incelenmesi ve suluboya tekniğiyle botanik resim ilkelerine göre kağıda aktarılması.',
    highlights: ['Büyüteçle morfolojik detay incelemesi', 'Doğru renk karıştırma ve damar gölgelendirmesi', 'Arşivsel pamuklu kağıt üzerine kalıcı çizim'],
    included: ['Winsor & Newton suluboya seti', 'Arches pamuklu suluboya kağıdı', 'Bitki inceleme büyüteci'],
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Doğada suluboya ile çizilmiş ince botanik bitki illüstrasyonu ve fırçalar'
  },
  {
    id: 'exp-10',
    slug: 'termal-pinar-basinda-ses-canagi-terapisi',
    title: 'Termal Kaynak Suları Başında Tibet Ses Çanağı Terapisi',
    category: 'zihin_ve_beden',
    duration: '1 Saat',
    groupLimit: 'En fazla 4 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
    price: 75,
    currency: 'EUR',
    displayPrice: '€75 / kişi',
    schedule: 'Salı ve Cuma 18:00',
    host: 'Bora Aksoy (Ses Terapisti & Kinesiyolog)',
    description: 'Yerin derinliklerinden çıkan sıcak kükürtlü termal suyun kıyısında, el yapımı 7 metal alaşımlı Tibet çanaklarının yaydığı titreşimlerle bedenin su moleküllerini ve sinir sistemini dengeleme seansı.',
    highlights: ['Hücresel düzeyde derin titreşim gevşemesi', 'Termal buharlar ve negatif iyon etkisi', 'Zihinsel dalgaların alfa ve teta frekansına inişi'],
    included: ['Yün mat ve ipek göz yastığı', 'Termal mineralli kaynak suyu ikramı'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    alt: 'Termal su kenarında pirinç Tibet ses çanakları ve tütsü dumanı'
  },
  {
    id: 'exp-11',
    slug: 'vadi-bogazinda-sabah-pranayama-ve-yoga',
    title: 'Şafak Vaktinde Kanyon Terasında Vinyasa ve Pranayama',
    category: 'zihin_ve_beden',
    duration: '1 Saat 15 Dakika',
    groupLimit: 'En fazla 10 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar'],
    displayPrice: 'Otel Konuklarına Ücretsiz',
    schedule: 'Haftanın her günü 07:30',
    host: 'Ece Güven (E-RYT 500 İleri Seviye Yoga Eğitmeni)',
    description: 'Kanyonun serin sabah rüzgarı vadiye dolarken, ahşap terasta güneş selamlama serileri ve akciğer kapasitesini artıran derin pranayama nefes teknikleri ile güne arınmış bir başlangıç.',
    highlights: ['Güneşin dağların ardından doğuşuna eşlik eden akış', 'Omurga esnekliği ve lenfatik drenaj hareketleri', 'Doğal kanyon sesleriyle meditasyon'],
    included: ['Manduka eko-matlar', 'Mantar yoga blokları ve kemerler', 'Zencefilli limonlu ılık arınma suyu'],
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kanyon manzaralı ahşap terasta sabah güneşi altında yoga yapan kadın'
  },
  {
    id: 'exp-12',
    slug: 'bostan-hasadi-ve-acik-ates-gastronomisi',
    title: 'Permakültür Bostanı Hasadı ve Açık Ateş Şef Masası',
    category: 'gastronomi_ve_hasat',
    duration: '4 Saat',
    groupLimit: 'En fazla 8 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar'],
    price: 140,
    currency: 'EUR',
    displayPrice: '€140 / kişi',
    schedule: 'Çarşamba ve Pazar 16:30',
    host: 'Şef Arda Menderes (Yönetici Şef & Permakültür Tasarımcısı)',
    description: 'Permakültür bostanımızdan akşam menüsü için pancar, enginar, adaçayı ve taze baklaları bizzat toplayıp, meşe kömürü yanan açık ateş ocağında döküm tavalarda şefle birlikte pişirip paylaştığımız ziyafet.',
    highlights: ['Kompost döngüsü ve kimyasalsız tarım ilkeleri', 'Açık ateşte döküm tencere ve ızgara pişirme teknikleri', '5 aşamalı bostan tadım menüsü ve bağ şarapları'],
    included: ['Hasat sepeti ve bıçağı', 'Tüm yemekler ve eşleşmeli organik şaraplar', 'Tarif kartları'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Açık ateşte döküm tavada pişirilen renkli taze bostan sebzeleri ve şef'
  },
  {
    id: 'exp-13',
    slug: 'geleneksel-kil-ve-comlek-tornasi',
    title: 'Dağ Kiliyle Geleneksel Çömlek ve Seramik Tornası',
    category: 'zanaat_ve_atolye',
    duration: '2.5 Saat',
    groupLimit: 'En fazla 4 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
    price: 85,
    currency: 'EUR',
    displayPrice: '€85 / kişi',
    schedule: 'Pazartesi ve Cuma 14:00',
    host: 'Kadir Usta (Çömlek Ustası)',
    description: 'Kanyon nehir yatağından elenen doğal kırmızı kili ayakla dönen geleneksel torna tezgahında şekillendirme sanatı. Çamurla temasın meditatif huzuru ve kendi çay çanağınızı yaratma deneyimi.',
    highlights: ['Kilin yoğrulması ve merkezleme teknikleri', 'Geleneksel torna kullanımı', 'Fırınlama ve sırlama süreçleri anlatımı'],
    included: ['Tüm kil malzemeleri ve torna kullanımı', 'Fırınlanmış ve sırlanmış eserin adresinize kargolanması'],
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    alt: 'Çömlek tornasında ıslak kırmızı kile şekil veren zanaatkar eller'
  },
  {
    id: 'exp-14',
    slug: 'karanlik-kanyon-mesaleli-gece-yuruyusu',
    title: 'Kanyon Boğazında Meşaleli Gece Yürüyüşü ve Gece Faunası',
    category: 'gece_ve_astronomi',
    duration: '2 Saat',
    groupLimit: 'En fazla 8 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar'],
    price: 60,
    currency: 'EUR',
    displayPrice: '€60 / kişi',
    schedule: 'Perşembe ve Pazar 21:30',
    host: 'Cemal Korkut (Vahşi Doğa Rehberi)',
    description: 'Doğal reçineli meşalelerin titrek ışığında kanyon tabanında gece yürüyüşü. Geceleri uyanan dağ kurbağaları, puhu kuşları, porsuklar ve ateş böceklerinin sesleriyle dolu masalsı bir karanlık keşfi.',
    highlights: ['Doğal reçineli balmumu meşaleleri', 'Yarasaların ultrasonik ses dedektörüyle dinlenmesi', 'Karanlıkta duyusal keskinleşme deneyimi'],
    included: ['El yapımı güvenli meşale', 'Gece dürbünü ve ses dedektörleri', 'Yürüyüş sonrası sıcak adaçayı'],
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    alt: 'Karanlık kanyon patikasında meşale aleviyle aydınlanan yürüyüşçüler'
  },
  {
    id: 'exp-15',
    slug: 'anadolu-endemik-uzumleri-sarap-degustasyonu',
    title: 'Yerel Asma Çeşitleri ve Doğal Şarap Tadım Ustalığı',
    category: 'gastronomi_ve_hasat',
    duration: '2 Saat',
    groupLimit: 'En fazla 10 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
    price: 95,
    currency: 'EUR',
    displayPrice: '€95 / kişi',
    schedule: 'Cumartesi 17:30',
    host: 'Selin Hanım (Sommelier & Doğal Şarap Üreticisi)',
    description: 'Vasilaki, Çavuş, Karasakız ve Kalecik Karası gibi yerli Anadolu asmalarının amforalarda kükürtsüz mayalanmasıyla üretilen 6 farklı doğal (nitelikli) şarabın, yerel peynirler eşliğinde derinlemesine analizi.',
    highlights: ['Doğal bağcılıkta biyodinamik takvim', 'Kil amforada fermantasyonun mineral etkisi', 'Kör tadım ve koku kiti çalışması'],
    included: ['6 kadeh nadir doğal şarap tadımı', 'Yerel keçi ve koyun tulum peynirleri tabağı', 'Tadım notları defteri'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Taş mahzende şarap kadehleri arkasında meşe fıçılar ve peynir tabağı'
  },
  {
    id: 'exp-16',
    slug: 'yaban-hayati-iz-suruculugu-ve-kus-gozlemi',
    title: 'Yaban Hayatı İz Sürücülüğü ve Sabah Kuş Gözlem Seansı',
    category: 'doga_ve_yuruyus',
    duration: '3 Saat',
    groupLimit: 'En fazla 6 kişi',
    seasonality: ['İlkbahar', 'Sonbahar'],
    price: 65,
    currency: 'EUR',
    displayPrice: '€65 / kişi',
    schedule: 'Salı ve Cumartesi 06:30',
    host: 'Ornitolog Dr. Sinan Yurtkuran',
    description: 'Şafak vakti sisler henüz kalkmamışken, kızıl geyiklerin, yaban domuzlarının ve çakalların nemli toprakta bıraktığı ayak izlerini takip ediyor; kara leylek, yılan kartalı ve kaya sıvacısı kuşlarını yüksek büyütmeli teleskopla gözetliyoruz.',
    highlights: ['Toprakta iz okuma (tracking) alfabesi', 'Profesyonel Swarovski spotter dürbünleri', 'Kaz Dağları orman habitat koruma ilkeleri'],
    included: ['Optik teleskop ve el dürbünleri', 'Kuş türleri kontrol listesi', 'Saha termos kahvaltısı'],
    imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sabah sisinde orman gözetleme noktasında tripodlu kuş gözlem teleskobu'
  },
  {
    id: 'exp-17',
    slug: 'zirvede-gun-dogumu-ve-ida-cayi-seremonisi',
    title: 'Sarıkız Tepesinde Gün Doğumu ve Yabani Dağ Çayı Seremonisi',
    subtitle: '1.726 metre doruk noktasında Ege denizine bakan mitolojik şafak yürüyüşü',
    category: 'doga_ve_yuruyus',
    duration: '4.5 Saat',
    groupLimit: 'En fazla 6 kişi',
    seasonality: ['Yaz', 'Sonbahar'],
    price: 110,
    currency: 'EUR',
    displayPrice: '€110 / kişi',
    schedule: 'Pazartesi ve Cuma 04:30',
    host: 'Dağ Mihmandarı & Yerel Efsaneler Anlatıcısı',
    description: 'Mitolojide Tanrı Zeus\'un Truva Savaşı\'nı izlediği söylenen Sarıkız Zirvesi\'ne 4x4 araç desteği ve son etap yürüyüşüyle çıkış. Güneş Ege Denizi ve Midilli Adası üzerinden yükselirken, zirvede toplanan taze dağ çayı yapraklarıyla közde demlenen çay seremonisi.',
    highlights: ['Bulutların üzerinde gün doğumu ışığı', 'Sarıkız Efsanesi ve mitolojik coğrafya anlatımı', 'Közde bakır semaverde yabani dağ çayı'],
    included: ['4x4 zirve transferi', 'Rüzgar geçirmez panço', 'Geleneksel kuru meyve ve fındıklı zirve azığı'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sarıkız tepesi zirvesinde sisler üzerinde doğan parlak turuncu güneş'
  },
  {
    id: 'exp-18',
    slug: 'ucucu-yag-distilasyonu-ve-aromaloji',
    title: 'Bakır İmbikte Kekik ve Lavanta Uçucu Yağ Distilasyonu',
    category: 'zanaat_ve_atolye',
    duration: '2.5 Saat',
    groupLimit: 'En fazla 6 kişi',
    seasonality: ['Yaz', 'Sonbahar'],
    price: 85,
    currency: 'EUR',
    displayPrice: '€85 / kişi',
    schedule: 'Salı ve Perşembe 15:00',
    host: 'Kimyager & Tıbbi Aromatik Bitkiler Uzmanı',
    description: 'Geleneksel tombak bakır imbikte su buharı distilasyonu yöntemiyle dağ kekiği ve lavanta çiçeklerinden saf uçucu yağ ve hidrosol (bitki suyu) çıkarma atölyesi. Çıkan saf yağın kimyasal profili ve aromaterapideki kullanım ilkeleri incelenir.',
    highlights: ['Geleneksel bakır imbik çalışma prensibi', 'Bitki hidrosolü ve uçucu yağ ayrışması seyri', 'Kendi hazırladığınız aromaterapi spreyini şişeleme'],
    included: ['Tüm imbik distilasyon donanımı', 'Özel damlalıklı kobalt mavi cam şişe hediyesi'],
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80',
    alt: 'Geleneksel bakır imbik ve damlayan aromatik lavanta uçucu yağı'
  },
  {
    id: 'exp-19',
    slug: 'dogal-yun-ve-kokboya-dokuma-atolyesi',
    title: 'Geleneksel El Tezgahında Kök Boya ve Yün Dokuma',
    category: 'zanaat_ve_atolye',
    duration: '3 Saat',
    groupLimit: 'En fazla 4 kişi',
    seasonality: ['İlkbahar', 'Sonbahar', 'Kış'],
    price: 90,
    currency: 'EUR',
    displayPrice: '€90 / kişi',
    schedule: 'Çarşamba 14:00',
    host: 'Emine Teyze (Tahtakuşlar Köyü Dokuma Ustası)',
    description: 'Meşe palamudu, ceviz kabuğu ve cehri köküyle kaynatılarak renklendirilmiş saf koyun yünleriyle ahşap dokuma tezgahında geleneksel Yörük kilim motiflerini dokuma pratiği. El emeğinin ritmik meditasyonu.',
    highlights: ['Kök boya kazanlarının hazırlanışı', 'Geleneksel koçboynuzu ve su yolu motiflerinin sembolizmi', 'Kendi dokuduğunuz mini kilim parçasını tamamlama'],
    included: ['Ahşap masa tezgahı', 'Doğal boyalı yün iplikler', 'Bitki çayı ikramı'],
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ahşap el tezgahında kök boyalı renkli yün iplerle dokuma yapan usta'
  },
  {
    id: 'exp-20',
    slug: 'nehir-taslarinda-yalinayak-topraklanma',
    title: 'Dağ Pınarı Çakıllarında Yalınayak Topraklanma Yürüyüşü',
    category: 'zihin_ve_beden',
    duration: '1.5 Saat',
    groupLimit: 'En fazla 8 kişi',
    seasonality: ['İlkbahar', 'Yaz', 'Sonbahar'],
    displayPrice: 'Otel Konuklarına Ücretsiz',
    schedule: 'Pazar 09:00',
    host: 'Fizyoterapist & Doğal Sağlık Rehberi',
    description: 'Ayakkabıları çıkararak farklı boyutlardaki nehir çakılları, yumuşak dağ kumu ve ıslak yosunlar üzerinde çıplak ayakla yürüme ritüeli. Refleksoloji noktalarını uyarırken vücuttaki serbest radikalleri toprağa aktaran canlandırıcı bir temas.',
    highlights: ['Taban refleksoloji noktalarının doğal uyarımı', 'Nehrin soğuk mineral sularında dolaşım canlandırma', 'Topraklanma (Earthing) bilimsel temelleri anlatımı'],
    included: ['Doğal keten ayak havlusu', 'Yürüyüş sonrası nane ve okaliptüslü ayak masaj yağı'],
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    alt: 'Berrak dere kenarında yuvarlak çakıl taşları üzerinde çıplak ayaklar'
  }
];

export const SPA_FACILITIES: SpaFacility[] = [
  {
    id: 'spa-01',
    slug: 'termal-kaynak-magara-havuzu',
    name: 'Yeraltı Termal Kaya Havuzu',
    type: 'Termal Hidroterapi',
    temperature: '38°C Sabit Kaynak Sıcaklığı',
    description: 'Yerin 240 metre altından volkanik çatlaklar boyunca mineral zenginliğiyle yüzeye ulaşan doğal termal kaynak suyu. Karstik kaya mağarası atmosferinde loş ışıklar altında kasları ve eklemleri derinlemesine gevşetir.',
    rituals: ['20 dakika termal banyo', 'Soğuk dağ pınarı şoku', 'Dinlenme salonunda kekik infüzyonu'],
    mineralProperties: 'Yüksek kükürt, sodyum bikarbonat ve magnezyum içeriğiyle cilt yenilenmesi ve romatizmal arınma sağlar.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    alt: 'Doğal kaya mağarası içinde sıcak buharlı termal havuz'
  },
  {
    id: 'spa-02',
    slug: 'marmara-mermeri-klasik-hamam',
    name: 'Geleneksel Mermer Hamam ve Göbek Taşı',
    type: 'Geleneksel Türk Hamamı',
    temperature: '42°C & %80 Nem',
    description: 'Tek parça beyaz Marmara mermerinden yontulmuş sıcak göbek taşı ve sedef kakmalı kurnalar. Zeytinyağlı defne sabunu köpüğü ve ipek kese ritüeliyle cildin ölü tabakasını arındırır.',
    rituals: ['Tuz ve dağ kekiğiyle vücut peelingi', 'Köpük masajı', 'Soğuk maden suyu durulanması'],
    mineralProperties: 'Nemli ısı gözenekleri açar, toksinlerin ciltten atılmasını hızlandırır.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kubbesinden ışık hüzmeleri süzülen klasik beyaz mermer hamam göbek taşı'
  },
  {
    id: 'spa-03',
    slug: 'orman-kokulu-sedir-saunasi',
    name: 'Panoramik Orman Sedir Saunası',
    type: 'Kuru Fin Saunası',
    temperature: '85°C & %15 Nem',
    description: 'Isıtıldığında doğal reçine kokusu yayan masif Lübnan sediri ağacı kaplı sauna. Vadinin yeşilliğine bakan tam boy cam cephesiyle zihni dinlendirirken yoğun terleme sağlar.',
    rituals: ['Aufguss esansiyel okaliptüs buz topu seremonisi', 'Kar veya buz havuzu dalışı'],
    mineralProperties: 'Fitonsit buharları üst solunum yollarını açar ve kardiyovasküler dayanıklılığı artırır.',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    alt: 'Orman manzaralı cam cepheli masif sedir ağacı sauna'
  },
  {
    id: 'spa-04',
    slug: 'dag-pinari-soguk-dalma-havuzu',
    name: 'Buzlu Dağ Pınarı Şok Havuzu',
    type: 'Kriyo-Hidroterapi',
    temperature: '9°C Doğal Akış Sıcaklığı',
    description: 'Doğrudan dağ kar sularıyla beslenen ve sürekli taşarak devridaim eden doğal taş dalma havuzu. Sıcak sauna veya hamam seanslarının ardından bağışıklık sistemini tetikleyen şok etkisi sunar.',
    rituals: ['Vim Hof nefes tekniği eşliğinde 2 dakikalık soğuk batış', 'Kan dolaşımı uyarımı'],
    mineralProperties: 'Düşük sıcaklık dopamin salınımını tetikler ve kas inflamasyonunu hızla azaltır.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Taş duvarlar arasında akan berrak buz gibi dağ pınarı havuzu'
  }
];

export const LOCATION_ACCESS_GUIDE: LocationAccess = {
  address: 'Avenox Manzara İnzivası, Doyuran Vadisi Mevkii No: 14, Kaz Dağları / Çanakkale - Balıkesir Sınırı',
  coordinates: {
    lat: 39.6842,
    lng: 26.8519,
    display: '39°41\'03.1"N 26°51\'06.8"E'
  },
  helipad: {
    available: true,
    coordinates: '39.6850 N / 26.8525 E (ICAO tescilli özel iniş alanı)',
    flightTimes: {
      fromIstanbul: '45 Dakika (Atatürk / Sabiha Gökçen kalkışlı)',
      fromIzmir: '35 Dakika (Adnan Menderes kalkışlı)',
      fromBodrum: '50 Dakika (Milas-Bodrum kalkışlı)'
    }
  },
  transfers: [
    {
      origin: 'Balıkesir Koca Seyit Havalimanı (EDO - Edremit)',
      distanceKm: 38,
      durationMin: 40,
      vehicleType: 'Özel Range Rover veya Mercedes V-Class VIP transfer'
    },
    {
      origin: 'Çanakkale Havalimanı (CKZ)',
      distanceKm: 92,
      durationMin: 75,
      vehicleType: 'Özel VIP Arazi Aracı'
    },
    {
      origin: 'İzmir Adnan Menderes Havalimanı (ADB)',
      distanceKm: 215,
      durationMin: 140,
      vehicleType: 'VIP Otoyol ve Dağ Transferi'
    },
    {
      origin: 'İstanbul Havalimanı (1915 Çanakkale Köprüsü üzerinden)',
      distanceKm: 340,
      durationMin: 210,
      vehicleType: 'Uzun Yol Konforlu Şoförlü Sedan / SUV'
    }
  ],
  climateNotes: 'İnziva alanımız 680 metre kotunda yer alıp vadi tabanı mikroiklimine sahiptir. Alpleri andıran yüksek oksijen oranı ve kuzeyden gelen çam rüzgarları sayesinde yazın bile bunaltıcı nem yaşanmaz (gündüz ortalama 28°C, gece 18°C). Kış aylarında düzenli kar yağışı görülür.',
  roadAdvisory: 'Son 4 kilometrelik orman içi vadi yolu stabilize doğal taş döşemelidir. Tüm binek araçlar için uygundur; kış aylarında 4x4 veya kış donanımlı araçlarımız misafirlerimizi vadi girişinden ücretsiz karşılar.'
};

export const SEASONAL_RETREAT_PROGRAM: HotelSeasonalPlan[] = [
  {
    season: 'Bahar',
    period: 'Mart - Mayıs',
    theme: 'Uyanış, Botanik Arınma ve Taze Filizler',
    culinaryFocus: 'Kaz Dağları yabani otları, taze enginar, yabani kuşkonmaz, oğlak eti tandırı ve taze keçi peynirleri.',
    natureRhythm: 'Karların erimesiyle nehir debilerinin zirveye ulaşması, dağ menekşeleri ve kardelenlerin çiçeklenmesi.',
    curatedExperiences: [
      'yabani-ot-ve-mantar-toplayiciligi',
      'nehir-boyu-sessiz-orman-banyosu',
      'antik-patikada-botanik-illustrasyon',
      'nehir-taslarinda-yalinayak-topraklanma'
    ]
  },
  {
    season: 'Yaz',
    period: 'Haziran - Ağustos',
    theme: 'Yıldız Geceleri, Vadi Serinliği ve Açık Ateş',
    culinaryFocus: 'Bostan domatesleri, odun ateşinde kalkan balığı, körpe kabak çiçeği dolması, fesleğenli soğuk çorbalar ve bağ şarapları.',
    natureRhythm: 'Geceleri Samanyolu kuşağının en net görüldüğü dönem; gündüz kanyon havuzlarında yüzme ve gölge arayışı.',
    curatedExperiences: [
      'gece-teleskobuyla-samanyolu-gozlemi',
      'bostan-hasadi-ve-acik-ates-gastronomisi',
      'karanlik-kanyon-mesaleli-gece-yuruyusu',
      'zirvede-gun-dogumu-ve-ida-cayi-seremonisi'
    ]
  },
  {
    season: 'Güz',
    period: 'Eylül - Kasım',
    theme: 'Bağ Bozumu, Erken Hasat Zeytinyağı ve Kestane',
    culinaryFocus: 'Taş değirmen ilk sızma zeytinyağı, porçini mantarları, av hayvanları yahnisi, karlı nar ve olgun incir.',
    natureRhythm: 'Ladin ve kayın ormanlarının kızıla ve altına dönüşmesi; sabah vadisine çöken masalsı sis tabakası.',
    curatedExperiences: [
      'asirlik-zeytinlikte-tas-baski-hasat',
      'anadolu-endemik-uzumleri-sarap-degustasyonu',
      'gun-batimi-cam-bali-aricilik',
      'ucucu-yag-distilasyonu-ve-aromaloji'
    ]
  },
  {
    season: 'Kış',
    period: 'Aralık - Şubat',
    theme: 'Şömine Ateşi, Kar Sessizliği ve Termal Şifa',
    culinaryFocus: 'Ekşi mayalı siyez ekmekleri, güveçte kuru fasulye, ayva tatlısı, fırınlanmış kök sebzeler ve sıcak baharatlı şarap.',
    natureRhythm: 'Kar tanelerinin çam dallarını ağırlaştırması; termal havuzlardan yükselen buharlar ve mutlak sessizlik.',
    curatedExperiences: [
      'vadi-somineli-akustik-oda-dinletileri',
      'yabani-maya-ve-ekmek-pisirme-atolyesi',
      'termal-pinar-basinda-ses-canagi-terapisi',
      'dogal-yun-ve-kokboya-dokuma-atolyesi'
    ]
  }
];

export const RETREAT_PHILOSOPHY = {
  architecture: 'Tüm binalarımız arazideki hiçbir anıt ağaç kesilmeden, topografyanın doğal eğrisine oturacak şekilde konumlandırılmıştır. Yerel taş ocaklarından çıkarılan granit, geri dönüştürülmüş kestane ve meşe kerestesi ile nefes alan hidrolik kireç harcı kullanılmıştır.',
  sustainability: [
    'Enerjimizin %100\'ü tesis içi jeotermal döngü ve çatı güneş panellerinden sağlanır.',
    'Gri sularımız biyolojik sazlık filtreleme havuzlarından geçirilerek bağ ve bahçe sulamasında kullanılır.',
    'Tek kullanımlık hiçbir plastik ambalaja yer verilmez; tüm banyo ürünleri doldurulabilir seramik kaplardadır.',
    'Mutfak atıklarımız kompost sahasında organik gübreye dönüştürülerek permakültür bostanımıza geri döner.'
  ],
  silencePolicy: 'İnziva alanımızda motorlu araç trafiği yasaktır. Ortak alanlarda yüksek sesli müzik çalınmaz; doğanın kendi akustik ses peyzajının (rüzgar, nehir, kuşlar) başrolde olması esastır.'
};

export const hotelRoomCatalogItems: CatalogHotelRoom[] = HOTEL_ROOMS.map((item) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  category: item.type,
  price: { amount: item.pricePerNight, currency: item.currency, period: 'gecelik' },
  description: item.description,
  attributes: {
    tagline: item.tagline,
    areaSqm: item.areaSqm,
    capacityText: item.capacity.text,
    bedConfiguration: item.bedConfiguration,
    displayPrice: item.displayPrice,
    view: item.view,
    spatialDetails: item.spatialDetails,
    features: item.features
  },
  tags: item.features,
  image: {
    url: item.imageUrl,
    alt: item.alt
  },
  isAvailable: true,
  isFeatured: item.areaSqm >= 100,
  roomType: (item.type === 'suit'
    ? 'Süit'
    : item.type === 'villa'
    ? 'Villa'
    : item.type === 'pavilion'
    ? 'Pavilyon'
    : 'Taş Ev') as CatalogHotelRoom['roomType'],
  maxGuests: item.capacity.adults,
  view: item.view,
  bedType: item.bedConfiguration,
  sizeM2: item.areaSqm,
  amenities: item.amenities,
  hasFireplace: item.features.some((f) => f.toLowerCase().includes('şömine')),
  hasPrivateThermalBath: item.features.some(
    (f) => f.toLowerCase().includes('termal') || f.toLowerCase().includes('havuz') || f.toLowerCase().includes('küvet')
  )
}));

export const hotelExperienceCatalogItems: CatalogHotelExperience[] = HOTEL_EXPERIENCES.map((item) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  duration: item.duration,
  season: item.seasonality.join(', '),
  description: item.description,
  guideOrLead: item.host,
  image: {
    url: item.imageUrl,
    alt: item.alt
  }
}));

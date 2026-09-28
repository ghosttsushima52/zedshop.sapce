/**
 * Avenox Vitrini - Bağımsız Parfüm Atölyesi (Independent Perfume Atelier)
 * Kapsamlı Ürün Kataloğu, Filtre Metadatası ve Destekleyici Editoryal İçerik
 * Toplam: Tam 48 Bağımsız Parfüm Ürünü
 */

import type { PerfumeItem } from './types';

export type PerfumeConcentration =
  | 'Extrait de Parfum'
  | 'Eau de Parfum'
  | 'Eau de Toilette'
  | 'Cologne Intense'
  | 'Saf Attar Yağı';

export type PerfumeSeason =
  | 'İlkbahar'
  | 'Yaz'
  | 'Sonbahar'
  | 'Kış'
  | 'Dört Mevsim'
  | 'Serin Akşamlar';

export type PerfumeGender = 'Unisex' | 'Maskülen Ağırlıklı' | 'Feminen Ağırlıklı';

export type PerfumeCategory =
  | 'Odunsu & Reçineli'
  | 'Çiçeksi & Pudralı'
  | 'Narenciye & Su'
  | 'Oryantal & Baharatlı'
  | 'Aromatik & Fougère'
  | 'Deri, Duman & Gurme';

export interface PerfumeNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface PerfumeProduct {
  id: string;
  slug: string;
  name: string;
  collection: string;
  tagline: string;
  category: PerfumeCategory;
  price: number; // TRY cinsinden
  volumeMl: number;
  concentration: PerfumeConcentration;
  season: PerfumeSeason;
  gender: PerfumeGender;
  sillage: 'Geniş / Çarpıcı' | 'Orta / Çevresel' | 'Tene Yakın / İntim' | 'Yüksek / İz Bırakan';
  longevity: '6-8 Saat' | '8-10 Saat' | '10-12 Saat' | '12+ Saat';
  notes: PerfumeNotes;
  description: string;
  character: string;
  distillationMethod: string;
  perfumer: string;
  harvestYear: string;
  tags: string[];
  image: string;
  imageAlt: string;
  inStock: boolean;
  featured: boolean;
}

export interface PerfumeFilterMetadata {
  categories: PerfumeCategory[];
  concentrations: PerfumeConcentration[];
  seasons: PerfumeSeason[];
  genders: PerfumeGender[];
  bottleSizes: number[];
  priceRanges: { label: string; min: number; max: number }[];
  notableNotes: string[];
}

export interface PerfumeStorySection {
  title: string;
  subtitle: string;
  paragraphs: string[];
  values: { title: string; description: string }[];
}

export interface PerfumeService {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  includes: string[];
}

export interface PerfumeStore {
  id: string;
  name: string;
  district: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  features: string[];
}

export const perfumes: PerfumeProduct[] = [
  // 1. Isparta Gülü & Kadife Amber
  {
    id: 'prf-01',
    slug: 'isparta-saf-gulu-maserasyonu',
    name: 'Isparta Gülü & Kadife Amber',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Mayıs şafağında toplanan taze Damask gülünün reçineli derinliği',
    category: 'Çiçeksi & Pudralı',
    price: 4850,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'İlkbahar',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Isparta Damask Gülü Yaprakları', 'Pembe Karabiber', 'Sabah Çiği Akoru'],
      heart: ['Türk Gülü Absolüsü', 'Fransız Sardunyası', 'Pudralı İris Kökü'],
      base: ['Gri Kehribar (Ambergris)', 'Organik Meşe Yosunu', 'Beyaz Misk'],
    },
    description:
      'Senir havzasında sabah saat 05.00 ile 07.30 arasında, güneş henüz taç yapraklarındaki uçucu eterik yağları buharlaştırmadan elle derlenen Damask güllerinden distile edilmiştir. İlk açılışta nemli taç yapraklarının ferahlığı hissedilirken, kalpte yoğun bir gül absolüsü ve kadifemsi iris kökü pudrası hakimiyet kurar. Dip notalarda 180 gün cam damacanalarda dinlendirilmiş deniz amberi ve kuru sedir talaşı, kokuyu klasik tatlı gül parfümlerinden ayırarak mineral ve topraksı bir derinliğe taşır.',
    character: 'Aristokratik, buğulu, tensel ve nostaljik.',
    distillationMethod: 'Bakır imbikte çift fraksiyonel su buharı distilasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Senir Hasadı',
    tags: ['ısparta gülü', 'damask', 'extrait', 'iris', 'amber', 'niş parfüm'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Isparta gülü ve amber notaları barındıran koyu kehribar cam şişe parfüm',
    inStock: true,
    featured: true,
  },

  // 2. Toros Ardıcı & Sedir Ormanı
  {
    id: 'prf-02',
    slug: 'toros-ardici-ve-sedir',
    name: 'Toros Ardıcı & Sedir Ormanı',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Yüksek irtifa dağ havası, çıtırdayan ardıç meyvesi ve kadim sedir kabuğu',
    category: 'Odunsu & Reçineli',
    price: 3950,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Maskülen Ağırlıklı',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Toros Ardıç Meyvesi', 'Soğuk Sıkım Bergamot', 'Ezilmiş Çam İğnesi'],
      heart: ['Lübnan Sediri', 'Buhur Reçinesi', 'Karasal Servi'],
      base: ['Atlas Sediri Ağacı', 'Koyu Paçuli', 'Kuru Meşe Kabuğu'],
    },
    description:
      'Toros Dağları’nın 1600 metre rakımındaki ardıç ormanlarının kuru, keskin ve dingin atmosferini yansıtır. Ezilmiş ardıç tohumlarının reçineli tazeliği, açılışta bergamotun serinliğiyle buluşur. Gövdede kuru sedir odununun dumanı ve tütsü buhuru birleşerek adeta antik tapınak ahşaplarını andıran meditatif bir hava oluşturur. Sentetik fiksatifler içermez; kalıcılığını doğal sedir özütü ve paçuli bazından alır.',
    character: 'Duru, monolitik, koruyucu ve odaklanmış.',
    distillationMethod: 'Ahşap yonga buhar ekstraksiyonu ve süperkritik CO2',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Güz Kesimi',
    tags: ['ardıç', 'sedir', 'toroslar', 'odunsu', 'tütsü', 'balzamik'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Doğal ahşap zemin üzerinde minimalist silindir formlu odunsu parfüm flakonu',
    inStock: true,
    featured: true,
  },

  // 3. Köyceğiz Sığla Reçinesi & Dumanlı Mür
  {
    id: 'prf-03',
    slug: 'koycegiz-sigla-ve-amber',
    name: 'Köyceğiz Sığla Reçinesi & Dumanlı Mür',
    collection: 'Kadim Reçineler Arşivi',
    tagline: 'Endemik Liquidambar orientalis ağacının bin yıllık buhur geleneği',
    category: 'Odunsu & Reçineli',
    price: 5400,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Taze Çekilmiş Karabiber', 'Acı Portakal Kabuğu', 'Kakule'],
      heart: ['Doğal Köyceğiz Sığla Yağı (Storax)', 'Kızıl Mür Reçinesi', 'Karanfil Tomurcuğu'],
      base: ['Huş Ağacı Katranı', 'Benzoin Siam', 'Madagaskar Vanilya Çubuğu'],
    },
    description:
      'Muğla Köyceğiz havzasına özgü endemik Anadolu sığla ağaçlarının kabuklarından geleneksel yöntemlerle sıyrılan sığla yağı (storax), antik çağlardan bu yana tütsü ve şifa iksiri olarak kullanılmıştır. Bu formülasyonda sığlanın tatlı-balzamik, hafif deri andıran kokusu, Yemen mürrü ve huş ağacı katranıyla bir araya getirilmiştir. Kuru tende saatler geçtikçe baharatlı vanilya ve sıcak reçine katmanlarına ayrılarak büyüleyici bir iz bırakır.',
    character: 'Gizemli, ritüelistik, yoğun ve sarıp sarmalayan.',
    distillationMethod: 'Geleneksel kaynatma ve etil alkol saflaştırması',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2023 Rezerv Koleksiyonu',
    tags: ['sığla yağı', 'liquidambar', 'storax', 'mür', 'reçine', 'extrait'],
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Koyu renkli cam şişede zengin reçine bazlı lüks niş parfüm',
    inStock: true,
    featured: false,
  },

  // 4. Çeşme Mandalinası & Güneş Nerolisi
  {
    id: 'prf-04',
    slug: 'cesme-mandalinasi-ve-neroli',
    name: 'Çeşme Mandalinası & Güneş Nerolisi',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Tuzlu meltem altında yeşil mandalina yaprakları ve taze portakal çiçeği',
    category: 'Narenciye & Su',
    price: 2950,
    volumeMl: 150,
    concentration: 'Eau de Toilette',
    season: 'Yaz',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '6-8 Saat',
    notes: {
      top: ['Çeşme Yeşil Mandalinası', 'Tuzlu Deniz Suyu Akoru', 'Limon Çiçeği'],
      heart: ['Tunus Nerolisi', 'Portakal Ağacı Yaprağı (Petitgrain)', 'Beyaz Biber'],
      base: ['Güneşte Kurumuş Ağaç Dalı', 'Berrak Misk', 'Kaya Kehribarı'],
    },
    description:
      'İzmir Çeşme’nin taş sokaklarındaki mandalina bahçelerinden esen serin öğleden sonra rüzgârı. İlk saniyelerde kabuğu yeni çatlamış taze yeşil mandalinanın canlı asiditesi buruna çarpar. Kısa sürede deniz tuzu partikülleri ve acımtırak portakal çiçeği (neroli) devreye girerek kokuyu çocuksu meyvemsilikten kurtarır, rafine bir Akdeniz tazeliğine dönüştürür. Sıcak yaz günlerinde tene serinlik ve canlılık aşılar.',
    character: 'Aydınlık, dinamik, canlandırıcı ve tuzlu.',
    distillationMethod: 'Soğuk pres kabuk sıkımı ve neroli hidrodistilasyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2025 Erken Hasat',
    tags: ['çeşme mandalinası', 'neroli', 'akdeniz', 'yaz kokusu', 'ferah'],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Narenciye ve taze floral tonları yansıtan açık renkli parfüm şişesi',
    inStock: true,
    featured: true,
  },

  // 5. Boğaziçi Sisi & Deniz Tuzu
  {
    id: 'prf-05',
    slug: 'bogazici-sabah-sisi',
    name: 'Boğaziçi Sisi & Deniz Tuzu',
    collection: 'Levanten Boğaziçi Arşivi',
    tagline: 'Kandilli sırtlarında sabah çiyinin nemli yosun ve erguvanla buluşması',
    category: 'Narenciye & Su',
    price: 3600,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'İlkbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Ozonik Deniz Sisi', 'Kireç Kabuğu', 'Islak Çakıl Taşı'],
      heart: ['Yabani Erguvan Tomurcuğu', 'Kıyı Defnesi', 'Mavi Adaçayı'],
      base: ['Kıyıya Vuran Kütük (Driftwood)', 'Gri Yosun', 'Sedir Özütü'],
    },
    description:
      'Nisan ayında Boğaz’ı örten gri sis bulutunun deniz akıntılarıyla birleştiği anın koku günlüğü. Tuzlu deniz iyotu ve serin kireçtaşı notalarıyla başlayan kompozisyon, kıyı yalılarının bahçelerindeki pembe erguvanların hafif tatlılığı ve yabani defne yapraklarıyla zenginleşir. Tende saatler boyu sürüklenen kütüklerin ıslak odunsu kokusunu ve temiz bir tuzluluk hissini muhafaza eder.',
    character: 'Melankolik, şiirsel, serin ve derinlikli.',
    distillationMethod: 'Headspace buhar analizi ve Fraksiyonel maserasyon',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 İlkbahar',
    tags: ['boğaziçi', 'deniz tuzu', 'ozonik', 'erguvan', 'istanbul'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mermer yüzeyde duran şeffaf deniz esintisi temalı cam parfüm flakonu',
    inStock: true,
    featured: false,
  },

  // 6. Kapadokya Tüfü & Safran Akoru
  {
    id: 'prf-06',
    slug: 'kapadokya-kuru-toprak-ve-safran',
    name: 'Kapadokya Tüfü & Safran Akoru',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Volkanik kül toprağı, kuru kekik rüzgârı ve kızıl safran tülü',
    category: 'Oryantal & Baharatlı',
    price: 5200,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Kızıl Safran Telleri', 'Ezilmiş Dağ Kekiği', 'Kurutulmuş Kakule'],
      heart: ['Volkanik Tüf Taşı Akoru', 'Kavrulmuş Arpa', 'İris Kökü'],
      base: ['Kuru Kehribar Reçinesi', 'Ham Süet Deri', 'Güve Otu (Vetiver)'],
    },
    description:
      'Peri bacalarının güneşte kavrulmuş mineral dokusu ve İç Anadolu steplerinin kuru rüzgârı. Safranbolu safranının metalik-derimsi açılışı, volkanik tüf taşının mineral kuru toz hissiyle dengelenmiştir. Kalpte kavrulmuş tahıl ve pudralı süsen kökü, bazda ise tütün yaprağı ve ham süet akoru kokuyu sıcak, kuru ve tenle kusursuz kaynaşan bir ikinci deri haline getirir.',
    character: 'Topraksı, mineral, asil ve monokrom.',
    distillationMethod: 'Kuru CO2 ekstraksiyonu ve alkol maserasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Sonbahar',
    tags: ['safran', 'kapadokya', 'mineral', 'tüf', 'süet', 'toprak'],
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Doğal taş kaide üzerinde sergilenen toprak ve safran içerikli niş parfüm',
    inStock: true,
    featured: true,
  },

  // 7. Pera Pasajı: Deri & Puro Tütünü
  {
    id: 'prf-07',
    slug: 'pera-kadife-deri-ve-tutun',
    name: 'Pera Pasajı: Deri & Puro Tütünü',
    collection: 'Levanten Boğaziçi Arşivi',
    tagline: 'Eski ahşap zeminler, sararmış kitaplar, kaliteli puro yaprağı ve kadife koltuklar',
    category: 'Deri, Duman & Gurme',
    price: 4600,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Kış',
    gender: 'Maskülen Ağırlıklı',
    sillage: 'Geniş / Çarpıcı',
    longevity: '12+ Saat',
    notes: {
      top: ['Aromatik Rom Akoru', 'Kurutulmuş Mürdüm Eriği', 'Bergamot'],
      heart: ['Virginia Tütün Yaprağı', 'Eskitilmiş Süet Deri', 'Tarçın Kabuğu'],
      base: ['Kavrulmuş Tonka Fasulyesi', 'Bourbon Vanilyası', 'Koyu Meşe Talaşı'],
    },
    description:
      '19. yüzyıl sonu Pera’sının tiyatro pasajları, mermer merdivenleri ve tütün içilen kulüplerine bir saygı duruşu. Rom fıçısı ve olgun erik ile açılan gövde, kısa sürede tütün yaprağının balımsı-kuru dokusuna ve kaliteli koyu deriye teslim olur. Tende saatler ilerledikçe tonka fasulyesinin bademsi sıcaklığı ve meşe fıçısı odunsuluğu etrafa sıcak ve otoriter bir aura yayar.',
    character: 'Sofistike, nostaljik, dolgun ve karizmatik.',
    distillationMethod: 'Tütün absolüsü solvent ekstraksiyonu ve meşe maserasyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2023 Rezerv',
    tags: ['tütün', 'deri', 'pera', 'tonka', 'rom', 'kış kokusu'],
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Karanlık vintage ortamda duran deri ve tütün notalı amber parfüm',
    inStock: true,
    featured: false,
  },

  // 8. Rize Siyah Çayı & Ham İncir
  {
    id: 'prf-08',
    slug: 'rize-siyah-cay-ve-incir',
    name: 'Rize Siyah Çayı & Ham İncir',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Fırtına Vadisi’nde mayalanan siyah çay yaprakları ve yeşil incir sütü',
    category: 'Aromatik & Fougère',
    price: 3750,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'Dört Mevsim',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Yeşil İncir Yaprağı', 'Buzlu Kakule', 'Taze Zencefil'],
      heart: ['Fermante Rize Siyah Çay Absolüsü', 'Mate Yaprağı', 'Ceviz Kabuğu'],
      base: ['İncir Ağacı Sütü', 'Sedir Ağacı', 'Kaşmiran (Cashmeran)'],
    },
    description:
      'Karadeniz’in sisli çay bahçelerinden toplanıp meşe teknelerde fermente edilen siyah çay yapraklarının yoğun tanenli kokusu, Ege’nin taze kırılmış yeşil incir yaprağıyla harmanlandı. Açılıştaki gevrek yeşillik ve hafif baharat, ortada demli siyah çayın aromatik sıcaklığına evrilir. Alt katmanda incir ağacının sütlü odunsu karakteri kokuyu yumuşatarak gün boyu süren zarif bir denge kurar.',
    character: 'Yeşil, entelektüel, sakinleştirici ve çağdaş.',
    distillationMethod: 'Siyah çay yaprağı CO2 distilasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 İkinci Sürgün',
    tags: ['siyah çay', 'rize', 'incir', 'yeşil yaprak', 'fougere', 'unisex'],
    image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Botanikal yapraklar arasında cam damlalıklı zarif parfüm şişesi',
    inStock: true,
    featured: true,
  },

  // 9. Antakya Defnesi & Zeytin Çiçeği
  {
    id: 'prf-09',
    slug: 'antakya-defne-ve-yaban-mersini',
    name: 'Antakya Defnesi & Zeytin Çiçeği',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Asi Nehri kıyısında geleneksel defne sabunu ve zeytin çiçeği saflığı',
    category: 'Aromatik & Fougère',
    price: 3200,
    volumeMl: 150,
    concentration: 'Cologne Intense',
    season: 'İlkbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '6-8 Saat',
    notes: {
      top: ['Antakya Defne Yaprağı', 'Yeşil Misket Limonu', 'Mercanköşk'],
      heart: ['Zeytin Ağacı Çiçeği', 'Yabani Biberiye', 'Kurutulmuş Adaçayı'],
      base: ['Kültürel Sabun Akoru', 'Kaya Yosunu', 'Çam Balzamı'],
    },
    description:
      'Geleneksel Antakya defne yağının aromatik, hafif acı ve temizleyici kokusu. Taze ezilmiş koyu yeşil defne yaprakları ve bergamotla canlanan burun, zeytin ağaçlarının narin beyaz çiçekleriyle yumuşar. Tabanındaki temiz taş sabun ve Akdeniz çamı esansı, cilde banyo sonrası arınmışlık, canlılık ve ferah bir doğallık bırakır.',
    character: 'Arındırıcı, berrak, geleneksel ve temiz.',
    distillationMethod: 'Defne meyvesi ve yaprağı distilasyonu',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Hasadı',
    tags: ['defne', 'zeytin çiçeği', 'antakya', 'sabun akoru', 'ferah'],
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Doğal yeşil botanik zemin üzerinde duran koyu renkli kolonya şişesi',
    inStock: true,
    featured: false,
  },

  // 10. Kaş Kayalıkları: Kekik & Yabani Lavanta
  {
    id: 'prf-10',
    slug: 'kas-lavanta-ve-kayalik-kekigi',
    name: 'Kaş Kayalıkları: Kekik & Yabani Lavanta',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Güneşin kavurduğu kalker taşlarında yabani kekik ve Akdeniz lavantini',
    category: 'Aromatik & Fougère',
    price: 3400,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Yaz',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Dağ Kekiği (Thymus capitatus)', 'Kireç Kabuğu', 'Lavandin'],
      heart: ['Yabani Lavanta Çiçeği', 'Mersin Yaprağı', 'Biberiye'],
      base: ['Kuru Meşe Yosunu', 'Saman Akoru', 'Beyaz Sedir'],
    },
    description:
      'Likya Yolu’nda, denizin yüz metre üzerindeki sarp kayalıklarda açan yabani lavanta ve kekik çalılarının rüzgârla savrulan kokusu. Baharatlı, kuru ve aromatik bir patlamayla başlayan koku, güneşte kurumuş saman ve meşe yosunuyla dengelenerek Akdeniz doğasının katıksız bir yansımasına dönüşür.',
    character: 'Açık hava, serbest, aromatik ve güneşli.',
    distillationMethod: 'Vakumlu su buharı distilasyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Yaz',
    tags: ['kekik', 'lavanta', 'kaş', 'likya', 'aromatik', 'fougère'],
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Güneş ışığı alan taş pervazda amber renkli doğal aromatik parfüm',
    inStock: true,
    featured: false,
  },

  // 11. Urla Bağları & Eski Meşe
  {
    id: 'prf-11',
    slug: 'urla-baglari-ve-mese-ficisi',
    name: 'Urla Bağları & Eski Meşe',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Bağ bozumu gecesi, mayalanan koyu üzüm kabuğu ve vanilyalı meşe fıçısı',
    category: 'Odunsu & Reçineli',
    price: 4100,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '10-12 Saat',
    notes: {
      top: ['Ezilmiş Kırmızı Üzüm Kabuğu', 'Frenk Üzümü Tomurcuğu', 'Kırmızı Biber'],
      heart: ['Meşe Fıçısı Ağacı', 'Kurutulmuş Defne', 'Karanfil'],
      base: ['Paçuli Reçinesi', 'Bourbon Vanilya Podu', 'Koyu Sandal Ağacı'],
    },
    description:
      'Urla Yarımadası’ndaki bağ bozumu ritüelinden ilham alındı. Kırmızı üzüm posasının tanenli ve mayhoş açılışı, Fransız meşe fıçılarının vanilyalı, hafif isli aromasıyla kucaklaşır. Kuru karanfil ve paçuli bazıyla desteklenen bu kompozisyon, ten üzerinde zengin, kadifemsi ve baş döndürücü bir sonbahar hikayesi anlatır.',
    character: 'Gövdeli, tanenli, davetkâr ve sıcak.',
    distillationMethod: 'Meşe yonga maserasyonu ve meyve distilasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2023 Bağ Bozumu',
    tags: ['urla', 'üzüm kabuğu', 'meşe', 'bağ', 'sonbahar'],
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Rustik ahşap fıçı yanında konumlanmış zarif koyu amber parfüm',
    inStock: true,
    featured: false,
  },

  // 12. Ayvalık Rüzgârı: İyot & Güneşlenmiş Çam
  {
    id: 'prf-12',
    slug: 'ayvalik-olgun-zeytin-ve-iyot',
    name: 'Ayvalık Rüzgârı: İyot & Güneşlenmiş Çam',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Şeytan Sofrası yamaçlarından Cunda’ya inen fıstık çamı ve serin poyraz',
    category: 'Narenciye & Su',
    price: 2800,
    volumeMl: 100,
    concentration: 'Eau de Toilette',
    season: 'Yaz',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '6-8 Saat',
    notes: {
      top: ['Poyraz Rüzgârı İyotu', 'Yeşil Zeytin Yaprağı', 'Mandalina'],
      heart: ['Fıstık Çamı Reçinesi', 'Mastik Sakızı', 'Mersin Dalı'],
      base: ['Tuzlu Kıyı Odunları', 'Mineral Ambergris', 'Beyaz Misk'],
    },
    description:
      'Cunda ve Ayvalık kıyılarında sıcak yaz öğleden sonraları esen serin poyrazın kokusal portresi. Denizden yükselen tuz ve iyot zerrecikleri, güneşte ısınan fıstık çamlarının balzamik reçinesiyle kaynaşır. İçindeki mastik sakızı (damla sakızı) ve zeytin yaprağı notaları, kokuya Ege’ye has pürüzsüz ve mineral bir omurga kazandırır.',
    character: 'Ferahlatıcı, tuzlu, açık ufuklu ve doğal.',
    distillationMethod: 'Kıyı çamı hidro-damıtımı ve deniz molekül akoru',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Yaz',
    tags: ['ayvalık', 'çam', 'iyot', 'cunda', 'deniz', 'ege'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Açık deniz tonlarında cam şişe ve minimalist ahşap kapaklı parfüm',
    inStock: true,
    featured: false,
  },

  // 13. Mardin Gecesi: Sarı Amber & Mürdüm
  {
    id: 'prf-13',
    slug: 'mardin-gumus-ve-sari-amber',
    name: 'Mardin Gecesi: Sarı Amber & Mürdüm',
    collection: 'Kadim Reçineler Arşivi',
    tagline: 'Sarı kalker taşından teraslarda baharatlı mürdüm eriği ve altın amber',
    category: 'Oryantal & Baharatlı',
    price: 5600,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Kurutulmuş Mürdüm Eriği', 'Kişniş Tohumu', 'İran Safranı'],
      heart: ['Altın Amber Reçinesi', 'Tütsülenmiş İsparta Gülü', 'Kaya Laden'],
      base: ['Kamboçya Ud Ağacı', 'Koyu Sandal Ağacı', 'Benzoin Siam'],
    },
    description:
      'Mezopotamya ovasına bakan Mardin taş konaklarının gece sessizliği. Koyu, tatlı mürdüm eriği ve sıcak kişniş tohumuyla başlayan koku, kalbinde amber reçinesi ve dumanlı gül yapraklarıyla devasa bir derinliğe ulaşır. Tabanındaki doğal ud ve reçineler, kokuya kadim ve mistik bir ağırlık kazandırır.',
    character: 'Büyüleyici, derin, görkemli ve sıcak.',
    distillationMethod: 'Doğal reçine tentürü ve buhar distilasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2023 Rezerv',
    tags: ['mardin', 'amber', 'mürdüm', 'ud', 'oryantal', 'gece kokusu'],
    image: 'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Altın varak detaylı lüks koyu kristal parfüm şişesi',
    inStock: true,
    featured: true,
  },

  // 14. Bodrum Akşamı: Zakkum & Kıyı Çamı
  {
    id: 'prf-14',
    slug: 'bodrum-beyaz-zakkum-ve-deniz-feneri',
    name: 'Bodrum Akşamı: Zakkum & Kıyı Çamı',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Kireç boyalı taş duvarlarda beyaz çiçekler ve akşam batan güneşin sıcaklığı',
    category: 'Çiçeksi & Pudralı',
    price: 3500,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'Yaz',
    gender: 'Feminen Ağırlıklı',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Bodrum Mandalinası', 'Deniz Meltemi', 'Pembe Karabiber'],
      heart: ['Beyaz Zakkum Akoru', 'Gece Yasemini', 'Monoi Çiçeği'],
      base: ['Güneşlenmiş Ahşap', 'Ilık Ten Miski', 'Sarı Sedir'],
    },
    description:
      'Beyaz kireç duvarların gündüz emdiği sıcağı geceye fısıldadığı Bodrum akşamları. Narenciye ve hafif tuzlu rüzgâr açılışından sonra açığa çıkan beyaz zakkum ve yasemin kalbi, yaz bronzluğunun sıcaklığını anımsatan misk ve güneşlenmiş tahta notalarıyla kucaklaşır.',
    character: 'Büyüleyici, tensel, ışıltılı ve rahat.',
    distillationMethod: 'Çiçek absolüsü ekstraksiyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Yaz',
    tags: ['bodrum', 'zakkum', 'yasemin', 'yaz akşamı', 'çiçeksi'],
    image: 'https://images.unsplash.com/photo-1616949755519-752eb91b5c85?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Güneş tonlarında ışıltılı cam parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 15. Galata Kütüphanesi: Karanfil & Parşömen
  {
    id: 'prf-15',
    slug: 'galata-karanfil-ve-eski-kutuphane',
    name: 'Galata Kütüphanesi: Karanfil & Parşömen',
    collection: 'Levanten Boğaziçi Arşivi',
    tagline: 'Tozlu ciltli kitaplar, kurutulmuş karanfil taneleri ve ceviz çalışma masaları',
    category: 'Odunsu & Reçineli',
    price: 4300,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Karanfil Tomurcukları', 'Muskat Cevizi', 'Acı Portakal Kabuğu'],
      heart: ['Eski Parşömen Kağıdı Akoru', 'Kuru İris Kökü', 'Sedir Talaşı'],
      base: ['Deri Kitap Cildi', 'Meşe Kütüğü', 'Virginia Tütünü'],
    },
    description:
      'Galata Kulesi’nin gölgesindeki asırlık bir araştırma kütüphanesinin sessizliği. Kuru karanfil ve sıcak baharatlarla başlayan yolculuk, asırlık kitap sayfalarının vanilin andıran kuru selüloz kokusuna ve deri ciltlere bağlanır. Entelektüel bir sükûnet ve zamansızlık hissi uyandırır.',
    character: 'Münzevi, bilge, edebi ve sıcacık.',
    distillationMethod: 'Baharat CO2 ekstraksiyonu ve odun maserasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Kış',
    tags: ['karanfil', 'parşömen', 'galata', 'deri', 'kitap', 'odunsu'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Deri ciltli kitaplar üzerinde duran klasik damlalıklı esans şişesi',
    inStock: true,
    featured: false,
  },

  // 16. Karadeniz Ladini & Islak Karaçam
  {
    id: 'prf-16',
    slug: 'trabzon-yayla-sisi-ve-ladin',
    name: 'Karadeniz Ladini & Islak Karaçam',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Trabzon Maçka sisinde ıslak zemin yosunları ve dimdik yükselen ladin ağaçları',
    category: 'Odunsu & Reçineli',
    price: 3850,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Maskülen Ağırlıklı',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Doğu Ladini Kozalağı', 'Soğuk Ozon', 'Yabani Nane'],
      heart: ['Islak Karaçam Kabuğu', 'Funda Çalılığı', 'Orman Eğreltisi'],
      base: ['Çam Balzamı (Balsam Fir)', 'Huş Katranı', 'Topraksı Vetiver'],
    },
    description:
      'Sümela Vadisi’nin sarp yamaçlarını kaplayan ladin ve köknar ormanlarının yağmur sonrası kokusu. Ozonik serinlik ve ladin reçinesinin keskin tazeliğiyle açılır; ardından ıslak toprak, yeşil orman eğreltisi ve reçineli balzamik çam ağacıyla derinleşir. Şehir hayatının gürültüsünden kaçıp vahşi doğaya sığınmak isteyenler için tasarlandı.',
    character: 'Vahşi, serin, yeşil ve derin nefes aldıran.',
    distillationMethod: 'Ladin ibresi buhar distilasyonu',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Sonbahar',
    tags: ['ladin', 'karaçam', 'karadeniz', 'yayla', 'yağmur', 'vetiver'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Nemli orman yosunları üzerinde duran koyu yeşil cam parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 17. Nemrut Güneşi: Dumanlı Ud & Laden
  {
    id: 'prf-17',
    slug: 'nemrut-gun-dogumu-ve-tutsulu-oud',
    name: 'Nemrut Güneşi: Dumanlı Ud & Laden',
    collection: 'Kadim Reçineler Arşivi',
    tagline: 'Devasa kral heykellerinin üzerinde doğan güneşin yakıcı dumanı ve ud ağacı',
    category: 'Oryantal & Baharatlı',
    price: 6200,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Baharatlı Kakule', 'Kara Kimyon Tohumu', 'Kırmızı Portakal'],
      heart: ['Doğal Assam Ud Ağacı', 'Anadolu Ladeni (Labdanum)', 'Kızıl Safran'],
      base: ['Koyu Süvari Derisi', 'Tütsülenmiş Huş', 'Kuru Kehribar'],
    },
    description:
      'Kommagene Krallığı’nın 2150 metredeki kutsal teraslarında şafak vakti. Baharatlı kimyon ve kakule ateşiyle açılan kompozisyon, hakiki Assam udu ve Anadolu dağlarında yetişen laden reçinesinin zengin, reçineli dumanına teslim olur. Ağır, vakur ve antik bir güç yayan başyapıt.',
    character: 'Kudretli, anıtsal, dumanlı ve ebedi.',
    distillationMethod: 'Doğal agarwood hidro-damıtımı ve reçine füzyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2023 Özel Rezerv',
    tags: ['nemrut', 'ud', 'laden', 'labdanum', 'tütsü', 'extrait'],
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mat siyah lüks parfüm şişesi ve duman temalı arka plan',
    inStock: true,
    featured: true,
  },

  // 18. Alaçatı Damla Sakızı & Körfez Limonu
  {
    id: 'prf-18',
    slug: 'alacati-sakiz-agaci-ve-limon',
    name: 'Alaçatı Damla Sakızı & Körfez Limonu',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Çeşme yarımadasının sakız ağaçlarından süzülen reçine damlaları ve limon kabuğu',
    category: 'Narenciye & Su',
    price: 3100,
    volumeMl: 100,
    concentration: 'Eau de Toilette',
    season: 'İlkbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '6-8 Saat',
    notes: {
      top: ['Damla Sakızı Reçinesi (Mastic)', 'Taze Sıkılmış Körfez Limonu', 'Buzlu Nane'],
      heart: ['Sardunya Yaprağı', 'Dağ Adaçayı', 'Yeşil Ham İncir'],
      base: ['Sedir Talaşı', 'Beyaz Kristal Misk', 'Kireçtaşı Akoru'],
    },
    description:
      'Alaçatı’nın rüzgârlı yel değirmenleri ve taş avluları arasında, damla sakızı ağaçlarının gövdesinden sızan taze reçinenin mineral ferahlığı. Limonun canlı ekşiliği, sakızın hafif çamsı, temizleyici aromasıyla birleşir. Tabanındaki kireçtaşı ve sedir, kokuya kalıcı ve kuru bir zarafet sunar.',
    character: 'Pürüzsüz, kristalize, ferah ve otantik.',
    distillationMethod: 'Sakız reçinesi alkol tentürü ve narenciye presi',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 İlkbahar',
    tags: ['damla sakızı', 'mastic', 'alaçatı', 'limon', 'ege', 'ferah'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Beyaz mermer üzerinde berrak cam damla sakızı temalı parfüm',
    inStock: true,
    featured: false,
  },

  // 19. Sultaniye Asması & İpeksi Manolya
  {
    id: 'prf-19',
    slug: 'sultaniye-beyaz-uzum-ve-manolya',
    name: 'Sultaniye Asması & İpeksi Manolya',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Manisa ovalarında sabah güneşiyle açan beyaz manolya ve nektarlı beyaz üzüm',
    category: 'Çiçeksi & Pudralı',
    price: 3900,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'İlkbahar',
    gender: 'Feminen Ağırlıklı',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Yeşil Sultaniye Üzümü', 'Sulu Beyaz Armut', 'İtalyan Bergamotu'],
      heart: ['Beyaz Manolya Taç Yaprakları', 'İpek Şakayık', 'Vadi Zambağı'],
      base: ['Kremamsı Sandal Ağacı', 'Pirinç Pudrası', 'Duru Kaşmir Miski'],
    },
    description:
      'Ege’nin bereketli topraklarında asma yapraklarının gölgesinde açan iri, nemli manolya çiçekleri. Açılışta taze koparılmış çekirdeksiz sultaniye üzümünün sulu tatlılığı ve armut nektarı duyulur. Ardından manolyanın kremsi ve ipeksi çiçek dokusu, pirinç pudrası ve sandal ağacıyla yumuşak bir koza gibi tene sarılır.',
    character: 'Zarif, ışıltılı, romantik ve ipeksi.',
    distillationMethod: 'Çiçek enflörajı ve meyve fraksiyonasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 İlkbahar',
    tags: ['manolya', 'üzüm', 'şakayık', 'pudralı', 'çiçeksi', 'zarif'],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Açık pembe tonlu çiçeksi lüks parfüm flakonu',
    inStock: true,
    featured: false,
  },

  // 20. Küre Dağları: Orman Meyvesi & Balzam
  {
    id: 'prf-20',
    slug: 'kure-daglari-balzam-ve-orman-meyvesi',
    name: 'Küre Dağları: Orman Meyvesi & Balzam',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Kastamonu kanyonlarında yaban mersini çalıları, ıslak kütükler ve köknar balzamı',
    category: 'Odunsu & Reçineli',
    price: 4150,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Yaban Mersini Ekstresi', 'Ardıç Tohumu', 'Pembe Biber'],
      heart: ['Köknar Balzamı', 'Mor Funda Çiçeği', 'Dağ Kekiği'],
      base: ['Islak Meşe Kütüğü', 'Reçineli Paçuli', 'Koyu Amber'],
    },
    description:
      'Küre Dağları Milli Parkı’nın balta girmemiş kanyon diplerindeki nemli biyom. Mayhoş yaban mersini meyvelerinin asidik çekiciliği, iğne yapraklı köknarların yapışkan balzamik reçinesiyle sarmalanmıştır. Derinleştikçe meşe ağaçlarının çürümüş kabukları ve koyu paçuli ile birleşerek büyüleyici, hafif gotik bir orman atmosferi sunar.',
    character: 'Gizemli, meyvemsi-odunsu, derin ve organik.',
    distillationMethod: 'Doğal meyve ekstraktı ve çam reçinesi damıtımı',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Güz',
    tags: ['küre dağları', 'yaban mersini', 'köknar', 'balzam', 'kanyon'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Koyu bordo gölgeli cam flakon parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 21. Diyarbakır Karadutu & Baharatlı Vanilya
  {
    id: 'prf-21',
    slug: 'diyarbakir-karadut-ve-karanfil',
    name: 'Diyarbakır Karadutu & Baharatlı Vanilya',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Hevsel Bahçeleri’nin olgun karadutları, karanfil taneleri ve koyu vanilya',
    category: 'Deri, Duman & Gurme',
    price: 4250,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Ezilmiş Hevsel Karadutu', 'Nar Ekşisi Akoru', 'Taze Zencefil'],
      heart: ['Karanfil Tomurcuğu', 'Seylan Tarçını', 'Kırmızı Gül Yaprağı'],
      base: ['Madagaskar Siyah Vanilyası', 'Koyu Paçuli', 'Karamelize Esmer Şeker'],
    },
    description:
      'Dicle kıyısındaki Hevsel Bahçeleri’nde güneşte olgunlaşmış koyu mor karadutların parmakları boyayan zengin suyu. Meyvenin derin mayhoş tatlılığı, karanfil ve tarçın baharatlarıyla zenginleştirilmiştir. Dipte Madagaskar vanilyasının dumanlı podları ve karamelize şeker akoru, parfüme karşı konulmaz bir gurme lüksü kazandırır.',
    character: 'Zengin, gurme, kadife dokulu ve sıcak.',
    distillationMethod: 'Vakumlu meyve ekstraksiyonu ve baharat maserasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Yaz Sonu',
    tags: ['karadut', 'vanilya', 'hevsel', 'karanfil', 'gurme', 'meyvemsi'],
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mürdüm ve koyu mor tonlarında lüks gurme parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 22. Safranbolu Safranı & Gül Lokumu
  {
    id: 'prf-22',
    slug: 'safranbolu-safran-cicegi-ve-lokum',
    name: 'Safranbolu Safranı & Gül Lokumu',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Tarihi konakların mutfağında pudra şekeri serpilmiş gül lokumu ve has safran',
    category: 'Deri, Duman & Gurme',
    price: 4700,
    volumeMl: 50,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '10-12 Saat',
    notes: {
      top: ['Kızıl Safran Tepeciği', 'Kavrulmuş Badem Ezmesi', 'Pembe Karabiber'],
      heart: ['Gül Suyu Lokumu Akoru', 'Yeşil Antep Fıstığı Tozu', 'Süsen Kökü'],
      base: ['Pudralı Vanilya', 'Yumuşak Beyaz Süet', 'Sedir Ağacı'],
    },
    description:
      'Safranbolu’nun dar Arnavut kaldırımlı sokaklarındaki tarihi lokum atölyelerinden yükselen nostaljik koku. Dünyanın en kaliteli safranının baharatlı, asil acılığı ile nişastalı pudra şekerine bulanmış taze gül lokumunun yumuşacık tatlılığı dengelenmiştir. Asla bayıcı olmayan, zarif bir gurme deneyimi.',
    character: 'Tatlı-baharatlı, pudralı, nostaljik ve samimi.',
    distillationMethod: 'Safran tentürü ve gül suyu fraksiyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Hasadı',
    tags: ['safran', 'lokum', 'safranbolu', 'pudra', 'gül suyu', 'gurme'],
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Pudralı pembe tonlarda şık cam tasarım niş parfüm',
    inStock: true,
    featured: false,
  },

  // 23. Finike Portakal Bahçesi: Çiçek & Ham Bal
  {
    id: 'prf-23',
    slug: 'finike-portakal-cicegi-ve-bal',
    name: 'Finike Portakal Bahçesi: Çiçek & Ham Bal',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Bahar aylarında Finike ovasını kaplayan bembeyaz portakal çiçekleri ve narenciye balı',
    category: 'Çiçeksi & Pudralı',
    price: 3650,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'İlkbahar',
    gender: 'Feminen Ağırlıklı',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Acı Portakal Yaprağı', 'Turunç Çiçeği Hidrosolü', 'Yeşil Mandalina'],
      heart: ['Portakal Çiçeği Absolüsü', 'Tunus Nerolisi', 'Beyaz Yasemin'],
      base: ['Toros Kır Balı Akoru', 'Sandal Ağacı', 'Kristalize Beyaz Misk'],
    },
    description:
      'Nisan ayında Finike ovasında yürürken genzi dolduran yoğun portakal çiçeği bulutu. Beyaz çiçeklerin baş döndürücü nektarı, arı kovanlarından süzülen taze kır balının altın rengi tatlılığıyla desteklenir. Yeşil yaprakların kırılgan tazeliği, kokunun aşırı tatlılaşmasını engelleyerek kusursuz bir bahar zarafeti sunar.',
    character: 'Neşeli, güneşli, ballı-çiçeksi ve tazeleyici.',
    distillationMethod: 'Çiçek absolüsü hidro-damıtımı',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Bahar',
    tags: ['portakal çiçeği', 'finike', 'bal', 'neroli', 'bahar kokusu'],
    image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Güneş ışığıyla parıldayan altın rengi narenciye ve bal içerikli parfüm',
    inStock: true,
    featured: false,
  },

  // 24. Bursa İpeği: Beyaz İris & Keşmir
  {
    id: 'prf-24',
    slug: 'bursa-ipek-yolu-ve-iris-pudrasi',
    name: 'Bursa İpeği: Beyaz İris & Keşmir',
    collection: 'Levanten Boğaziçi Arşivi',
    tagline: 'Koza Han avlusunda işlenen ham ipek liflerinin pürüzsüz dokunuşu ve asil iris kökü',
    category: 'Çiçeksi & Pudralı',
    price: 5100,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'Dört Mevsim',
    gender: 'Feminen Ağırlıklı',
    sillage: 'Tene Yakın / İntim',
    longevity: '12+ Saat',
    notes: {
      top: ['Ambrette Tohumu', 'Beyaz Şeftali Kabuğu', 'İtalyan Bergamotu'],
      heart: ['Floransa İris Kökü (Orris Butter)', 'Menekşe Yaprağı', 'Heliotrop'],
      base: ['Kaşmiran', 'Sütlü Sandal Ağacı', 'Pirinç Nişastası Akoru'],
    },
    description:
      'Tarihi İpek Yolu’nun son durağı Bursa Koza Han’daki ipeğin ten üzerindeki pürüzsüz kayışı. Üç yıl toprak altında kurutulduktan sonra elde edilen değerli iris kökü yağı (orris butter), pudralı ve aristokratik bir zarafet sunar. Keşmiran ve pirinç nişastası akorlarıyla birleşerek tende saatler boyu ipek bir kumaş gibi hissedilen lüks bir imza yaratır.',
    character: 'Aristokratik, ipeksi, pudralı ve son derece zarif.',
    distillationMethod: 'İris kökü süperkritik ekstraksiyonu',
    perfumer: 'Selim Doğan',
    harvestYear: '2023 Rezerv',
    tags: ['iris', 'orris butter', 'bursa', 'ipek', 'kaşmiran', 'extrait'],
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'İpek kumaş kıvrımları üzerinde duran lüks beyaz cam parfüm flakonu',
    inStock: true,
    featured: true,
  },

  // 25. Gökçeada Rüzgârı: Yaban Kekiği & Mineral
  {
    id: 'prf-25',
    slug: 'gokceada-yabani-kekik-ve-ruzgar',
    name: 'Gökçeada Rüzgârı: Yaban Kekiği & Mineral',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Tuz Gölü kıyılarında rüzgârla eğrilmiş yabani zeytinler ve kaya kekiği',
    category: 'Aromatik & Fougère',
    price: 2900,
    volumeMl: 100,
    concentration: 'Eau de Toilette',
    season: 'Yaz',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '6-8 Saat',
    notes: {
      top: ['Tuzlu Deniz Rüzgârı', 'Yaban Kekiği', 'Acı Pembe Greyfurt'],
      heart: ['Yabani Adaçayı', 'Kaya Yosunu', 'Karasal Mersin Yaprağı'],
      base: ['Mineral Kireçtaşı', 'Çakıl Taşı Akoru', 'Kuru Güve Otu (Vetiver)'],
    },
    description:
      'Kuzey Ege’nin rüzgârlı adası Gökçeada’nın yalın ve dokunulmamış doğası. Ege poyrazının getirdiği tuzlu mineral hava, ada kayalıklarında güneşe meydan okuyan kekik çalılarının keskin kokusuna karışır. Sade, modern ve hiçbir yapay süse ihtiyaç duymayan ferahlatıcı bir koku.',
    character: 'Yalın, rüzgârlı, mineral ve özgür.',
    distillationMethod: 'Doğal adaçayı ve kekik buhar ekstraksiyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Yaz',
    tags: ['gökçeada', 'kekik', 'mineral', 'tuzlu', 'adaçayı', 'ege'],
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mineral çakıl taşları üzerinde ferah ada temalı parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 26. Pamukkale Traverteni: Soğuk Kireçtaşı & Beyaz Lotus
  {
    id: 'prf-26',
    slug: 'pamukkale-kirec-ve-lotus',
    name: 'Pamukkale Traverteni: Soğuk Kireçtaşı & Beyaz Lotus',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Termal havuzların kalsiyumlu beyaz terasları ve su üzerinde açan berrak nilüfer',
    category: 'Narenciye & Su',
    price: 3450,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'İlkbahar',
    gender: 'Unisex',
    sillage: 'Tene Yakın / İntim',
    longevity: '8-10 Saat',
    notes: {
      top: ['Kireç Çiçeği', 'Soğuk Kaynak Suyu Akoru', 'Beyaz Çay Filizi'],
      heart: ['Beyaz Nilüfer (Lotus)', 'Bambu Sapı', 'Frezya'],
      base: ['Kalsiyum Mineral Akoru', 'Berrak Kristal Misk', 'Açık Renk Sedir'],
    },
    description:
      'Pamukkale travertenlerinin kar beyazı kalsiyum havuzlarında dinlenen duru termal sular. Soğuk mineral kaynak suyu hissiyle açılan koku, suyun üzerinde salınan beyaz lotus ve taze bambu saplarının yeşilliğiyle bütünleşir. Tende huzur veren, duru ve meditatif bir ferahlık bırakır.',
    character: 'Zen, saydam, mineral ve huzurlu.',
    distillationMethod: 'Vakumlu buhar ekstraksiyonu ve mineral akor sentezi',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Bahar',
    tags: ['pamukkale', 'lotus', 'mineral', 'kalsiyum', 'duru su', 'zen'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Beyaz mermer kaide üzerinde berrak minimalist su temalı parfüm',
    inStock: true,
    featured: false,
  },

  // 27. Konya Neyhanesi: Kuru Kamış & Ambergris
  {
    id: 'prf-27',
    slug: 'konya-mevlevi-neyi-ve-kamis',
    name: 'Konya Neyhanesi: Kuru Kamış & Ambergris',
    collection: 'Kadim Reçineler Arşivi',
    tagline: 'Antik kamışlıklardan kesilip fırınlanan ney gövdesi ve asırlık buhur',
    category: 'Odunsu & Reçineli',
    price: 5800,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Kurutulmuş Sarı Kamış', 'Safran Tozu', 'Muskat'],
      heart: ['Tütsülenmiş Ak Buhur', 'Laden Reçinesi', 'Sedir Talaşı'],
      base: ['Doğal Gri Kehribar (Ambergris)', 'Koyu Paçuli', 'Hint Sandal Ağacı'],
    },
    description:
      'Asi Nehri kamışlıklarından derlenip Konya’da neyzenlerin elinde nefesle can bulan kamışların kokusu. Fırınlanmış kuru kamış lifleri ve safran tozuyla açılan bu mistik kompozisyon, tütsü buhuru ve doğal ambergris ile birleşerek zamanı durduran tefekkür dolu bir atmosfer yaratır.',
    character: 'Mistik, tefekkür dolu, kuru odunsu ve derin.',
    distillationMethod: 'Kamış tentürü ve geleneksel reçine maserasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2023 Rezerv',
    tags: ['ney', 'kamış', 'ambergris', 'tütsü', 'konya', 'meditatif'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Antik ahşap detaylarla sarılmış koyu kehribar neyhane parfümü',
    inStock: true,
    featured: false,
  },

  // 28. Gaziantep Menengiç: Kavrulmuş Kahve & Fıstık
  {
    id: 'prf-28',
    slug: 'gaziantep-fistik-ve-kakule-kahvesi',
    name: 'Gaziantep Menengiç: Kavrulmuş Kahve & Fıstık',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Tarihi Tahmis Kahvesi’nde kavrulan yabani fıstık tohumları ve kakuleli köz kahvesi',
    category: 'Deri, Duman & Gurme',
    price: 4400,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Yeşil Kakule Tohumu', 'Taze Kavrulmuş Menengiç', 'Acı Portakal'],
      heart: ['Türk Kahvesi Özütü', 'Tuzsuz Antep Fıstığı Ezmesi', 'Karanfil'],
      base: ['Meşe Ağacı Dumanı', 'Tonka Fasulyesi', 'Deri Sedir'],
    },
    description:
      'Gaziantep Tahmis Kahvesi’nin 400 yıllık taş kemerleri altında közde demlenen kakuleli menengiç kahvesinin buğusu. Kavruk yeşil fıstık taneleri ve koyu kahve çekirdeği absolüsü, odun dumanı ve tonka fasulyesiyle harmanlanarak unutulmaz, gurme bir derinlik oluşturur.',
    character: 'Kavruk, aromatik, sıcak ve kucaklayıcı.',
    distillationMethod: 'Kahve çekirdeği ve fıstık CO2 süperkritik ekstraksiyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Kış',
    tags: ['menengiç', 'kahve', 'antep fıstığı', 'kakule', 'gurme', 'tahmis'],
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Kahve tonlarında zengin mat cam gurme parfüm şişesi',
    inStock: true,
    featured: true,
  },

  // 29. Kars Platosu: Kristal Kar & Sibirya Ardıcı
  {
    id: 'prf-29',
    slug: 'kars-buzulu-ve-sibirya-ardici',
    name: 'Kars Platosu: Kristal Kar & Sibirya Ardıcı',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Ani Harabeleri üzerinde esen dondurucu rüzgâr, kristal kar ve çamurlaşmamış toprak',
    category: 'Aromatik & Fougère',
    price: 3900,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Kış',
    gender: 'Maskülen Ağırlıklı',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Dondurucu Kar Aldehitleri', 'Buzlu Nane Yaprağı', 'Ardıç Meyvesi'],
      heart: ['Huş Ağacı Kabuğu', 'Dağ Kekiği', 'Soğuk Biberiye'],
      base: ['Dondurulmuş Meşe Yosunu', 'Beyaz Sedir', 'Soğuk Toprak Akoru'],
    },
    description:
      'Kış aylarında eksi yirmi dereceye inen Kars yaylalarının tertemiz, jilet gibi keskin havası. Aldehitik buz kristalleri ve dondurucu nane ile başlayan kompozisyon, soğuk ardıç ağacı gövdesi ve beyaz sedirle kristalize bir berraklık kazanır. Tene soğuk ama son derece güçlü bir canlılık katar.',
    character: 'Kutup soğukluğu, keskin, monolitik ve diri.',
    distillationMethod: 'Kriyojenik distilasyon ve aldehit sentezi',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Kış',
    tags: ['kars', 'buz', 'ardıç', 'kar', 'aldehit', 'soğuk ferah'],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Buz mavisi ışıltılı minimalist kış parfüm flakonu',
    inStock: true,
    featured: false,
  },

  // 30. Salda Kumsalı: Magnezyum Kumu & Turkuaz Su
  {
    id: 'prf-30',
    slug: 'salda-beyaz-magnezyum-ve-turkuaz',
    name: 'Salda Kumsalı: Magnezyum Kumu & Turkuaz Su',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Beyaz hidromanyezit kumsallarında güneşin ısıttığı berrak tatlı göl suyu',
    category: 'Narenciye & Su',
    price: 3100,
    volumeMl: 150,
    concentration: 'Eau de Toilette',
    season: 'Yaz',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '6-8 Saat',
    notes: {
      top: ['Beyaz Greyfurt', 'Tatlı Su Akoru', 'Bergamot Kabuğu'],
      heart: ['Su Zambağı', 'Beyaz Nektarin', 'Sazlık Yaprağı'],
      base: ['Magnezyum Mineral Kumu Akoru', 'Açık Renk Sedir', 'Hafif Beyaz Misk'],
    },
    description:
      'Türkiye’nin Maldivleri olarak anılan Salda Gölü’nün beyaz magnezyum kumsalları ve turkuaz suları. Deniz kokularındaki tuzlu iyotun aksine, bu parfüm tatlı su gölünün duruluğunu, kireçli beyaz kumsalın mineral ferahlığını ve kıyı sazlıklarının yeşil tazeliğini sunar.',
    character: 'Işıltılı, saydam, dinlendirici ve pürüzsüz.',
    distillationMethod: 'Su buharı fraksiyonu ve mineral akor ekstraksiyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2025 Yaz',
    tags: ['salda', 'turkuaz', 'magnezyum', 'tatlı su', 'yaz', 'ferah'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Açık turkuaz su damlası formlu zarif parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 31. Moda Burnu & Sahaf: Eski Cilt Derisi & Kahve
  {
    id: 'prf-31',
    slug: 'kadikoy-sahaf-pasaji-eski-cilt',
    name: 'Moda Burnu & Sahaf: Eski Cilt Derisi & Kahve',
    collection: 'Levanten Boğaziçi Arşivi',
    tagline: 'Moda sahilindeki ahşap çay bahçesi, eski plaklar ve tozlu sahaf rafları',
    category: 'Deri, Duman & Gurme',
    price: 4100,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Tozlu Kitap Sayfası Akoru', 'İtalyan Bergamotu', 'Acı Badem'],
      heart: ['Yumuşak Süet Deri', 'Kavrulmuş Espresso Çekirdeği', 'Kurutulmuş Tütün'],
      base: ['Meşe Ağacı Talaşı', 'Dumanlı Bourbon Vanilya', 'Kök Vetiver'],
    },
    description:
      'Kadıköy Moda sokaklarında bir sonbahar ikindisi. Sahafların sararmış yaprakları, ıhlamur ağaçlarının dökülen yaprakları ve yakındaki kahveciden yükselen taze çekilmiş espresso kokusu. Tende sakinleştirici, entelektüel ve sıcak bir sığınak hissi yaratır.',
    character: 'Bohem, düşünceli, rahat ve zamansız.',
    distillationMethod: 'Kahve ve tütün tentürü',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Güz',
    tags: ['moda', 'kadıköy', 'sahaf', 'kahve', 'süet deri', 'kitap'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Kahverengi tonlu editoryal parfüm şişesi ve ahşap zemin',
    inStock: true,
    featured: false,
  },

  // 32. Amasya Misket Elması & Tarçın Ağacı
  {
    id: 'prf-32',
    slug: 'amasya-misket-elmasi-ve-tarcin',
    name: 'Amasya Misket Elması & Tarçın Ağacı',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Yeşilırmak boyundaki elma bahçelerinde sulu misket elması ve kuru tarçın çubuğu',
    category: 'Deri, Duman & Gurme',
    price: 3600,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Gevrek Amasya Misket Elması', 'Armut Kabuğu', 'Limon Çiçeği'],
      heart: ['Seylan Tarçını Kabuğu', 'Karanfil Taneleri', 'Gül Yaprağı'],
      base: ['Meşe Ağacı', 'Akçaağaç Reçinesi', 'Kuru Sedir'],
    },
    description:
      'Isırıldığında su saçan taze Amasya misket elmasının mayhoş ve berrak aroması. Tarçın ve karanfilin sıcak baharat katmanlarıyla fırınlanmış bir tatlıya dönüşmeden, meyvenin diri canlılığı korunmuştur. Odunsu meşe tabanı kokuya kalıcı ve dengeli bir omurga verir.',
    character: 'Çıtır, meyvemsi, baharatlı ve neşeli.',
    distillationMethod: 'Meyve headspace ekstraksiyonu ve tarçın distilasyonu',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Hasadı',
    tags: ['amasya elması', 'tarçın', 'meyvemsi', 'sonbahar', 'odunsu'],
    image: 'https://images.unsplash.com/photo-1616949755519-752eb91b5c85?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Sıcak kehribar ve yeşil tonların buluştuğu şık parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 33. Datça Yarımadası: Badem Çiçeği & Balmumu
  {
    id: 'prf-33',
    slug: 'datca-badem-cicegi-ve-balmumu',
    name: 'Datça Yarımadası: Badem Çiçeği & Balmumu',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Şubat ayında Datça köylerinde kardan önce açan badem çiçekleri ve doğal petek mumu',
    category: 'Çiçeksi & Pudralı',
    price: 3800,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'İlkbahar',
    gender: 'Feminen Ağırlıklı',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Acı Badem Çekirdeği Esansı', 'Bergamot Kabuğu', 'Yeşil Bahar Yaprağı'],
      heart: ['Badem Ağacı Çiçeği', 'Portakal Çiçeği', 'Heliotrop'],
      base: ['Doğal Balmumu Absolüsü', 'Balzamik Sandal Ağacı', 'Pudralı Misk'],
    },
    description:
      'Kışın ortasında Ege’ye baharı getiren Datça badem çiçeklerinin narin kokusu. Çiçeklerin bademsi ve hafif pudralı zarafeti, arı kovanlarından toplanan saf balmumunun tatlı reçineli sıcaklığıyla sarılır. Ten üzerinde güneşte ısınmış taze bir çiçek dalı gibi duyumsanır.',
    character: 'Şefkatli, pudralı-bademsi, aydınlık ve zarif.',
    distillationMethod: 'Badem çiçeği maserasyonu ve balmumu absolüsü',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2025 Şubat Çiçeklenmesi',
    tags: ['datça', 'badem çiçeği', 'balmumu', 'heliotrop', 'çiçeksi', 'ege'],
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Açık bej ve fildişi tonlarda pudralı badem çiçeği parfümü',
    inStock: true,
    featured: false,
  },

  // 34. Dicle Kıyısı: Kuru Hurma & Kızıl Reçine
  {
    id: 'prf-34',
    slug: 'hasankeyf-dicle-kumu-ve-kuru-hurma',
    name: 'Dicle Kıyısı: Kuru Hurma & Kızıl Reçine',
    collection: 'Kadim Reçineler Arşivi',
    tagline: 'Güneşte kurumuş tatlı hurmalar, nehir kumu ve bin yıllık tütsü kalıntıları',
    category: 'Oryantal & Baharatlı',
    price: 5300,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Olgun Hurma Özütü', 'Taze Çekilmiş Kakule', 'Portakal Kabuğu'],
      heart: ['Tütsülenmiş Mür Reçinesi', 'Kızıl Amber', 'Seylan Tarçını'],
      base: ['Kamboçya Udu', 'Paçuli Kökü', 'Kuru Laden Sakızı'],
    },
    description:
      'Güneydoğu Anadolu’nun kadim nehir vadilerindeki kervan yollarından ilham alan yoğun bir oryantal. Hurmanın karamelize meyvemsi ağırlığı, mür ve laden reçinesinin kadim dumanıyla birleşir. Tabanındaki ud ve paçuli, kokuyu sıcak bir çöl gecesi pelerinine dönüştürür.',
    character: 'Egzotik, derin, sarıp sarmalayan ve zengin.',
    distillationMethod: 'Doğal reçine tentürü ve meyve ekstraktı',
    perfumer: 'Selim Doğan',
    harvestYear: '2023 Rezerv',
    tags: ['hurma', 'mür', 'dicle', 'oryantal', 'reçine', 'extrait'],
    image: 'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Koyu kehribar kristal şişede zengin oryantal reçine esansı',
    inStock: true,
    featured: false,
  },

  // 35. İda Dağı: Sarıçam Reçinesi & Adaçayı
  {
    id: 'prf-35',
    slug: 'kazdaglari-saricami-ve-altin-oluk',
    name: 'İda Dağı: Sarıçam Reçinesi & Adaçayı',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Kazdağları’nın oksijen zengini yamaçlarında sarıçam balzamı ve dağ adaçayı',
    category: 'Odunsu & Reçineli',
    price: 4200,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Dört Mevsim',
    gender: 'Unisex',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Kazdağı Sarıçam İğnesi', 'Dağ Nanesi', 'Bergamot'],
      heart: ['Yabani Adaçayı Çiçeği', 'Sığla Reçinesi', 'Kaya Kekiği'],
      base: ['Asırlık Meşe Ağacı', 'Kuru Kehribar', 'Orman Vetiveri'],
    },
    description:
      'Homeros’un İlyada’sında bin pınarlı olarak betimlenen Kazdağları’nın yüksek oksijenli orman atmosferi. Sarıçam iğnelerinin reçineli yeşilliği ve dağ adaçayının aromatik gücü, sığla reçinesi ve meşe odunuyla dengelenerek ciğerleri açan asil bir ferahlık sunar.',
    character: 'Oksijenli, canlandırıcı, reçineli ve heybetli.',
    distillationMethod: 'Çam ibresi ve adaçayı su buharı distilasyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Yaz',
    tags: ['kazdağları', 'sarıçam', 'adaçayı', 'oksijen', 'ida', 'odunsu'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Orman yeşili cam şişede çam ve adaçayı notalı taze parfüm',
    inStock: true,
    featured: true,
  },

  // 36. Pergamon Parşömeni & Kuru İncir Ağacı
  {
    id: 'prf-36',
    slug: 'bergama-parsomenci-ve-kuru-incir',
    name: 'Pergamon Parşömeni & Kuru İncir Ağacı',
    collection: 'Levanten Boğaziçi Arşivi',
    tagline: 'Bergama akropolünde icat edilen parşömenin mineral dokusu ve güneşlenmiş incir odunu',
    category: 'Odunsu & Reçineli',
    price: 4350,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Güneşte Kurumuş İncir', 'Kişniş Tohumu', 'Mandalina Kabuğu'],
      heart: ['İşlenmiş Parşömen Derisi Akoru', 'Servi Ağacı', 'Akdeniz Defnesi'],
      base: ['Kuru Vetiver Kökü', 'Sedir Ağacı', 'Siam Benzoini'],
    },
    description:
      'Parşömen kağıdının doğduğu Bergama tepelerinde kuru rüzgâr. Kurutulmuş incirin hafif karamelli meyvemsiliği, tabaklanmış parşömenin kuru mineral hissiyle ve servi ağacıyla birleşir. Ne çok tatlı ne de çok sert; kusursuz dengelenmiş bir antik çağ hikayesi.',
    character: 'Kuru, bilge, hafif tatlımsı ve asil.',
    distillationMethod: 'İncir yaprağı ve kuru odun ekstraksiyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Sonbahar',
    tags: ['pergamon', 'parşömen', 'incir', 'servi', 'bergama', 'odunsu'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Antik taş dokusu üzerinde sergilenen parşömen ve incir esansı',
    inStock: true,
    featured: false,
  },

  // 37. Edirne Sarayı: Misk-i Amber & Gülsuyu
  {
    id: 'prf-37',
    slug: 'edirne-saray-miski-ve-gul-suyu',
    name: 'Edirne Sarayı: Misk-i Amber & Gülsuyu',
    collection: 'Kadim Reçineler Arşivi',
    tagline: 'Meriç Nehri kıyısındaki saray bahçelerinde geleneksel imbik gülsuyu ve asil saray miski',
    category: 'Oryantal & Baharatlı',
    price: 6800,
    volumeMl: 30,
    concentration: 'Saf Attar Yağı',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Tene Yakın / İntim',
    longevity: '12+ Saat',
    notes: {
      top: ['Geleneksel İmbik Gülsuyu', 'Taze Zencefil', 'Kakule'],
      heart: ['Doğal Misk Akoru', 'Kızıl Safran Lifleri', 'Karanfil'],
      base: ['Hint Sandal Ağacı Yağı', 'Doğal Ambergris', 'Doğu Udu'],
    },
    description:
      'Osmanlı saray parfümerisinin başyapıtı olan Misk-i Amber formülünün modern atölye yorumu. Alkol içermez; saf sandal ağacı yağı taşıyıcısında gülsuyu distilasyonu, safran ve kadim ambergris masere edilmiştir. Tene bir damla sürüldüğünde vücut ısısıyla bütünleşerek günlerce süren asil ve tene yakın bir koku aurası oluşturur.',
    character: 'Hükümdarane, tensel, samimi ve asil.',
    distillationMethod: 'Geleneksel sandal ağacı bazlı attar damıtımı (Deg & Bhapka)',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2023 Özel Rezerv',
    tags: ['attar', 'edirne', 'gülsuyu', 'misk', 'ambergris', 'saf yağ'],
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Geleneksel oryantal altın motifli kristal attar şişesi',
    inStock: true,
    featured: true,
  },

  // 38. Şirince Tepeleri: Karadut & Karanfil Baharatı
  {
    id: 'prf-38',
    slug: 'sirince-karadut-sarabi-ve-karanfil',
    name: 'Şirince Tepeleri: Karadut & Karanfil Baharatı',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Tarihi Rum taş evlerinin bahçesinde mayalanan koyu karadut meyvesi ve sıcak karanfil',
    category: 'Oryantal & Baharatlı',
    price: 3700,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Mayhoş Şirince Karadutu', 'İtalyan Bergamotu', 'Pembe Biber'],
      heart: ['Karanfil Taneleri', 'Kırmızı Şarap Tortusu Akoru', 'Seylan Tarçını'],
      base: ['Meşe Fıçısı Ağacı', 'Koyu Paçuli', 'Tonka Fasulyesi'],
    },
    description:
      'Selçuk Şirince köyünün dik yamaçlarındaki bağ evlerinde mayalanan yabani meyvelerin baş döndürücü aroması. Karadutun mor meyvemsi asiditesi, karanfil ve tarçın taneleriyle kaynatılmış bir kış içkisini anımsatır. Meşe fıçısı notaları kokuya olgun ve sofistike bir ağırlık kazandırır.',
    character: 'Mayhoş, sarhoş edici, sıcak ve samimi.',
    distillationMethod: 'Meyve mayalanması headspace ve baharat damıtımı',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Sonbahar',
    tags: ['şirince', 'karadut', 'karanfil', 'şarap akoru', 'meyvemsi'],
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Kırmızı bordo yansımalı zarif cam parfüm flakonu',
    inStock: true,
    featured: false,
  },

  // 39. Tarsus Avluları: Gece Yasemini & Turunç
  {
    id: 'prf-39',
    slug: 'tarsus-beyaz-yasemin-ve-serbet',
    name: 'Tarsus Avluları: Gece Yasemini & Turunç',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Tarihi Tarsus evlerinin iç avlusunda gece açan yasemin sarmaşıkları ve acı turunç',
    category: 'Çiçeksi & Pudralı',
    price: 4900,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'Yaz',
    gender: 'Feminen Ağırlıklı',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Acı Turunç Kabuğu', 'Taze Yeşil Yaprak', 'Mandalina Çiçeği'],
      heart: ['Gece Açan Akdeniz Yasemini', 'Sümbülteber (Tuberose)', 'Neroli'],
      base: ['Kremamsı Sandal Ağacı', 'Beyaz Kehribar', 'İpeksi Ten Miski'],
    },
    description:
      'Çukurova’nın sıcak yaz gecelerinde, Tarsus’un yüksek taş duvarlı avlularında açan yaseminlerin baştan çıkarıcı kokusu. Güneş battıktan sonra yoğunlaşan yasemin ve sümbülteber absolüleri, acı turunç kabuğunun tazeliğiyle dengelenir. Tende baştan çıkarıcı, yoğun ve unutulmaz bir çiçek tülü oluşturur.',
    character: 'Narkotik, büyüleyici, tensel ve büyüleyici.',
    distillationMethod: 'Gece hasadı çiçek çözücü ekstraksiyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Yaz',
    tags: ['yasemin', 'tarsus', 'sümbülteber', 'turunç', 'gece kokusu', 'extrait'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Beyaz çiçekler yanında duran zarif lüks kristal şişe',
    inStock: true,
    featured: false,
  },

  // 40. Göreme Şafağı: Ozonik Rüzgâr & Kuru Saman
  {
    id: 'prf-40',
    slug: 'cappadocia-sicak-hava-balonu-ve-ozon',
    name: 'Göreme Şafağı: Ozonik Rüzgâr & Kuru Saman',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Şafak vakti yükselen balonlardan esen serin plato havası ve altın sarısı kuru otlar',
    category: 'Aromatik & Fougère',
    price: 3950,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'İlkbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Şafak Ozonu', 'Yeşil Bergamot', 'Acı Portakal'],
      heart: ['Kuru Dağ Samanı', 'Yabani Lavanta Çiçeği', 'Sarı Papatya'],
      base: ['Kök Vetiver', 'Açık Renk Yumuşak Deri', 'Kuru Meşe Yosunu'],
    },
    description:
      'Kapadokya vadilerinde sabah saat 05.30’da havalanan sıcak hava balonundan duyulan koku. Soğuk sabah ozonunun ciğerleri yakan saflığı, vadilerde güneşte kuruyan altın rengi saman balyaları ve yaban kekiğiyle harmanlanır. Modern fougère anlayışının en rafine Anadolu yorumu.',
    character: 'Havadar, ferahlatıcı, altın sarısı ve özgür.',
    distillationMethod: 'Kuru ot CO2 damıtımı ve ozonik fraksiyon',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Bahar',
    tags: ['göreme', 'ozon', 'saman', 'lavanta', 'kapadokya', 'fougère'],
    image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Şafak ışıklarında serin vadi temalı cam parfüm flakonu',
    inStock: true,
    featured: false,
  },

  // 41. Seyhan Kıyısı: Çiçek Açan Narenciye Koruları
  {
    id: 'prf-41',
    slug: 'adana-portakal-cicegi-karnavali',
    name: 'Seyhan Kıyısı: Çiçek Açan Narenciye Koruları',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: 'Adana nisan ayında sokaklara taşan yüz binlerce narenciye ağacının taç yaprakları',
    category: 'Çiçeksi & Pudralı',
    price: 3600,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'İlkbahar',
    gender: 'Unisex',
    sillage: 'Geniş / Çarpıcı',
    longevity: '8-10 Saat',
    notes: {
      top: ['Narenciye Çiçeği Nektarı', 'Yeşil Mandalina', 'Turunç Yaprağı (Petitgrain)'],
      heart: ['Portakal Çiçeği Absolüsü', 'Akasya Çiçeği', 'Hanımeli'],
      base: ['Açık Renk Sedir', 'Temiz Beyaz Misk', 'Kaya Amberi'],
    },
    description:
      'Seyhan Nehri boyunca uzanan narenciye bahçelerinin ilkbaharda tek bir gecede patlayan çiçeklerinin sarhoş edici rüzgârı. Portakal çiçeğinin ballı, taze ve yeşil yüzü; akasya ve hanımeliyle zenginleştirilerek baharın müjdecisi olan devasa bir tazelik dalgasına dönüştürülmüştür.',
    character: 'Coşkulu, beyaz çiçekli, taze ve aydınlık.',
    distillationMethod: 'Çiçek buhar distilasyonu',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Nisan',
    tags: ['adana', 'portakal çiçeği', 'narenciye', 'bahar', 'çiçeksi'],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Beyaz narenciye çiçekleri arasında duran taze bahar parfümü',
    inStock: true,
    featured: false,
  },

  // 42. Kızılçam Ormanı: Çam Balı & Ak Buhur
  {
    id: 'prf-42',
    slug: 'marmaris-cam-bali-ve-buhur',
    name: 'Kızılçam Ormanı: Çam Balı & Ak Buhur',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Marmaris koylarında denize inen kızılçamların bal damlaları ve antik buhur reçinesi',
    category: 'Odunsu & Reçineli',
    price: 4450,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Geniş / Çarpıcı',
    longevity: '10-12 Saat',
    notes: {
      top: ['Ham Kızılçam Balı Akoru', 'Taze Karabiber', 'Yaban Kekiği'],
      heart: ['Muğla Kızılçam Reçinesi', 'Tütsü Buhuru (Olibanum)', 'Servi'],
      base: ['Atlas Sediri', 'Koyu Laden Reçinesi', 'Paçuli'],
    },
    description:
      'Gökova ve Marmaris koylarında kızılçam ağaçlarının gövdesinde oluşan çam balının reçineli, koyu tatlılığı. Antik buhur reçinesi ve karabiberle harmanlanan bal akoru, odunsu derinliğiyle kışın soğuğunda içinizi ısıtacak sıcak bir kor gibi tene yerleşir.',
    character: 'Reçineli-ballı, dumanlı, sıcak ve güven verici.',
    distillationMethod: 'Kızılçam reçine tentürü ve buhur distilasyonu',
    perfumer: 'Selim Doğan',
    harvestYear: '2024 Güz',
    tags: ['çam balı', 'kızılçam', 'marmaris', 'buhur', 'reçineli', 'odunsu'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Reçine tonlarında derin kehribar cam parfüm flakonu',
    inStock: true,
    featured: false,
  },

  // 43. Efes Mermeri: Güneş Isıtmış Taş & Servi
  {
    id: 'prf-43',
    slug: 'efes-mermer-tozu-ve-akdeniz-selvisi',
    name: 'Efes Mermeri: Güneş Isıtmış Taş & Servi',
    collection: 'Levanten Boğaziçi Arşivi',
    tagline: 'Celsus Kütüphanesi’nin güneşte ısınan beyaz mermerleri ve göğe uzanan servi ağaçları',
    category: 'Aromatik & Fougère',
    price: 4100,
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    season: 'Dört Mevsim',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Kuru Bergamot', 'Pembe Karabiber', 'Mineral Mermer Tozu Akoru'],
      heart: ['Akdeniz Servisi İbreleri', 'Kuru Defne Yaprağı', 'Yabani Biberiye'],
      base: ['Kuru Güve Otu (Vetiver)', 'Eski Meşe Ağacı', 'Berrak Mineral Amber'],
    },
    description:
      'Efes antik kentinde yaz ortası öğle güneşi altında parıldayan mermer sütunların yaydığı kuru mineral sıcaklık. Göğe ok gibi yükselen koyu yeşil servi ağaçlarının reçineli kokusu, Akdeniz defnesi ve kuru vetiver ile birleşerek zamana meydan okuyan klasik bir anıt yaratır.',
    character: 'Anıtsal, mineral, disiplinli ve zamansız.',
    distillationMethod: 'Servi distilasyonu ve mineral koku ekstraksiyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Yaz',
    tags: ['efes', 'mermer', 'servi', 'mineral', 'antik', 'fougère'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Klasik mermer kaidede duran minimalist mimari parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 44. İstiklal Yağmuru: Islak Taş & Kestane Kebap
  {
    id: 'prf-44',
    slug: 'beyoglu-nostalji-tramvayi-ve-yagmur',
    name: 'İstiklal Yağmuru: Islak Taş & Kestane Kebap',
    collection: 'Levanten Boğaziçi Arşivi',
    tagline: 'Beyoğlu’nda kasım yağmuru sonrası ıslak granit taşlar, dumanlı kestane ve süet palto',
    category: 'Deri, Duman & Gurme',
    price: 3850,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'Sonbahar',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Petrichor (Yağmur Sonrası Toprak)', 'Soğuk Bergamot', 'Ozonsu Sis'],
      heart: ['Közlenmiş Kestane Dumanı', 'Karanfil', 'Odun Ateşi Külü'],
      base: ['Islanmış Süet Deri', 'Koyu Sedir Ağacı', 'Karasal Meşe Yosunu'],
    },
    description:
      'Kasım ayında İstiklal Caddesi’ne yağan ilk sağanağın ardından sokaklara yayılan koku. Granit taşların ıslak buğusu (petrichor), köşe başındaki seyyar kestanecilerden yükselen köz dumanı ve yağmur damlalarıyla ıslanmış süet paltonun sıcaklığı. İstanbul nostaljisinin en dokunaklı şiiri.',
    character: 'Nostaljik, sinematik, yağmurlu ve sıcak.',
    distillationMethod: 'Petrichor akor analizi ve köz odun ekstraktı',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Sonbahar',
    tags: ['istiklal', 'kestane', 'yağmur', 'petrichor', 'beyoğlu', 'süet'],
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Yağmur damlalarıyla süslenmiş pencere önünde buğulu parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 45. Gümüşlük Alacakaranlığı: Bodrum Mandalinası & İncir Sütü
  {
    id: 'prf-45',
    slug: 'gumusluk-gun-batimi-ve-bodrum-mandalinasi',
    name: 'Gümüşlük Alacakaranlığı: Bodrum Mandalinası & İncir Sütü',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Kıyıdaki tahta iskelelerde gün batımı, ezilmiş mandalina yaprağı ve sütlü incir dalı',
    category: 'Narenciye & Su',
    price: 3300,
    volumeMl: 150,
    concentration: 'Eau de Toilette',
    season: 'Yaz',
    gender: 'Unisex',
    sillage: 'Orta / Çevresel',
    longevity: '6-8 Saat',
    notes: {
      top: ['Coğrafi İşaretli Bodrum Mandalinası', 'Taze Fesleğen', 'Pembe Greyfurt'],
      heart: ['Ham İncir Sütü', 'Su Zambağı', 'Portakal Çiçeği'],
      base: ['Deniz Tuzuyla Aşınmış Tahta', 'Beyaz Misk', 'Kuru Sedir'],
    },
    description:
      'Gümüşlük’ün su içindeki masalarında gün batarken burnunuza gelen esinti. Meşhur çekirdekli Bodrum mandalinasının o benzersiz tatlı-ekşi aroması, incir ağacından sızan taze süt ve tuzlu iskele tahtalarıyla buluşur. Yazın hafifliğini ve dinginliğini teninize işler.',
    character: 'Huzurlu, meyvemsi-tuzlu, taze ve tasasız.',
    distillationMethod: 'Mandalina kabuk soğuk sıkımı ve incir yaprağı maserasyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2025 Yaz',
    tags: ['gümüşlük', 'bodrum mandalinası', 'incir sütü', 'deniz', 'yaz'],
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Ege mavisi ve güneş sarısı detaylara sahip cam parfüm şişesi',
    inStock: true,
    featured: false,
  },

  // 46. Süphan Zirvesi: Ters Lale & Buzul Ozonu
  {
    id: 'prf-46',
    slug: 'van-ters-lalesi-ve-dag-havasi',
    name: 'Süphan Zirvesi: Ters Lale & Buzul Ozonu',
    collection: 'Anadolu Florası & Kadim Kökler',
    tagline: '4000 metre irtifada karlar arasından fışkıran endemik ters laleler ve kristal hava',
    category: 'Çiçeksi & Pudralı',
    price: 5200,
    volumeMl: 50,
    concentration: 'Extrait de Parfum',
    season: 'İlkbahar',
    gender: 'Unisex',
    sillage: 'Yüksek / İz Bırakan',
    longevity: '12+ Saat',
    notes: {
      top: ['Buzul Karları Akoru', 'Yabani Dağ Nanesi', 'Limon Kabuğu'],
      heart: ['Endemik Ters Lale Akoru', 'Yaban Nergisi', 'Pudralı Süsen'],
      base: ['Soğuk Güve Otu (Vetiver)', 'Beyaz Sedir Ağacı', 'Duru Kristal Misk'],
    },
    description:
      'Doğu Anadolu’nun karlı dağlarında sadece birkaç hafta boyunca boynunu büken efsanevi ters lalelerin (Fritillaria imperialis) yabani çiçeksi kokusu. Buzul ozonu ve soğuk nane açılışından sonra çiçeklerin topraksı ve asil taç yaprakları açığa çıkar; dipteki beyaz sedir ve vetiver ile buz gibi bir ihtişam kazanır.',
    character: 'Nadir, cesur, soğuk-çiçeksi ve aristokratik.',
    distillationMethod: 'Headspace çiçek koku yakalama ve kriyojenik özütleme',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2024 Bahar',
    tags: ['ters lale', 'süphan', 'buzul', 'nadir', 'çiçeksi', 'extrait'],
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Kristal berraklığında extrait de parfum flakonu',
    inStock: true,
    featured: false,
  },

  // 47. Kalkan Koyu: Kum Zambakları & Gece Rüzgârı
  {
    id: 'prf-47',
    slug: 'kalkan-kaya-villasi-ve-bugu-zambagi',
    name: 'Kalkan Koyu: Kum Zambakları & Gece Rüzgârı',
    collection: 'Ege & Akdeniz Rüzgârı',
    tagline: 'Patara kumullarında gece açan beyaz kum zambakları ve denizin fosforlu köpüğü',
    category: 'Çiçeksi & Pudralı',
    price: 3950,
    volumeMl: 75,
    concentration: 'Eau de Parfum',
    season: 'Yaz',
    gender: 'Feminen Ağırlıklı',
    sillage: 'Orta / Çevresel',
    longevity: '8-10 Saat',
    notes: {
      top: ['Kum Zambağı Nektarı', 'Deniz Köpüğü Akoru', 'Yeşil Bergamot'],
      heart: ['Madagaskar Ylang Ylang', 'Gece Sümbülteberi', 'Portakal Çiçeği'],
      base: ['Ilık Güneş Kumu Akoru', 'Kremsi Sandal Ağacı', 'Şeffaf Amber'],
    },
    description:
      'Patara kumsalının rüzgârla dalgalanan kum tepelerinde açan koruma altındaki beyaz kum zambaklarının ay ışığı altındaki rayihası. Deniz köpüğünün tuzlu tazeliğiyle başlayan koku, sümbülteber ve ylang ylang ile kremsi bir sıcaklığa evrilir. Tende yaz gecesi rüyası gibi süzülür.',
    character: 'Işıltılı, tensel, beyaz çiçekli ve büyüleyici.',
    distillationMethod: 'Nadir çiçek solvent ekstraksiyonu',
    perfumer: 'Kerem Alkan',
    harvestYear: '2024 Yaz',
    tags: ['kum zambağı', 'kalkan', 'patara', 'deniz köpüğü', 'çiçeksi'],
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Beyaz kumlar ve deniz kabukları yanında duran zarif kadınsı parfüm',
    inStock: true,
    featured: false,
  },

  // 48. Harran Kerpici: Kuru Çöl Otu & Çiğ Amber
  {
    id: 'prf-48',
    slug: 'harran-koni-evleri-ve-cig-amber',
    name: 'Harran Kerpici: Kuru Çöl Otu & Çiğ Amber',
    collection: 'Kadim Reçineler Arşivi',
    tagline: 'Kubbeli konik kerpiç evlerde güneşte pişen saman, kuru toprak ve saf ambergris',
    category: 'Oryantal & Baharatlı',
    price: 7200,
    volumeMl: 30,
    concentration: 'Saf Attar Yağı',
    season: 'Kış',
    gender: 'Unisex',
    sillage: 'Tene Yakın / İntim',
    longevity: '12+ Saat',
    notes: {
      top: ['Güneşte Pişmiş Saman', 'Kişniş Tohumu', 'Karabiber'],
      heart: ['Doğal Çam Reçinesi', 'Çiğ Ambergris Damlaları', 'Kızıl Labdanum'],
      base: ['Kuru Toprak Akoru', 'Eski Hint Ud Yağı', 'Sandal Ağacı'],
    },
    description:
      'Dünyanın en eski yerleşimlerinden Harran’ın konik kubbeli kerpiç evlerinin kuru, serin iç mekan kokusu. Güneş altında pişmiş kil ve saman liflerinin topraksı kokusu, bin yıllık attar ustalığıyla işlenmiş doğal ambergris ve saf sandal ağacı yağıyla buluştu. Alkol içermeyen, tene mühürlenen eşsiz bir koku mücevheri.',
    character: 'Kadim, topraksı, monolitik ve benzersiz.',
    distillationMethod: 'Toprak kil ekstraksiyonu ve saf sandal bazlı attar damıtımı',
    perfumer: 'Aylin Korkmaz',
    harvestYear: '2023 Özel Rezerv',
    tags: ['harran', 'kerpiç', 'attar', 'ambergris', 'saf yağ', 'kadim toprak'],
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'El yapımı seramik ve altın detaylı nadide saf attar yağı flakonu',
    inStock: true,
    featured: true,
  },
];

export const perfumeFilters: PerfumeFilterMetadata = {
  categories: [
    'Odunsu & Reçineli',
    'Çiçeksi & Pudralı',
    'Narenciye & Su',
    'Oryantal & Baharatlı',
    'Aromatik & Fougère',
    'Deri, Duman & Gurme',
  ],
  concentrations: [
    'Extrait de Parfum',
    'Eau de Parfum',
    'Eau de Toilette',
    'Cologne Intense',
    'Saf Attar Yağı',
  ],
  seasons: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış', 'Dört Mevsim', 'Serin Akşamlar'],
  genders: ['Unisex', 'Maskülen Ağırlıklı', 'Feminen Ağırlıklı'],
  bottleSizes: [30, 50, 75, 100, 150],
  priceRanges: [
    { label: '2.500 ₺ - 3.500 ₺', min: 2500, max: 3500 },
    { label: '3.500 ₺ - 4.500 ₺', min: 3500, max: 4500 },
    { label: '4.500 ₺ - 5.500 ₺', min: 4500, max: 5500 },
    { label: '5.500 ₺ ve Üzeri (Nadir & Attar)', min: 5500, max: 10000 },
  ],
  notableNotes: [
    'Isparta Damask Gülü',
    'Toros Ardıcı',
    'Köyceğiz Sığla Yağı',
    'Çeşme Mandalinası',
    'Safran',
    'Rize Siyah Çayı',
    'Damla Sakızı',
    'Doğal Ambergris',
    'Virginia Tütünü',
    'Süet Deri',
    'Karadut',
    'Floransa İris Kökü',
  ],
};

export const atelierStory: PerfumeStorySection = {
  title: 'Toprağın Hafızası, İmbikten Süzülen Zaman',
  subtitle: 'Anadolu’nun kadim koku mirasını bağımsız ve modern zanaatkarlıkla buluşturuyoruz.',
  paragraphs: [
    'Avenox Bağımsız Parfüm Atölyesi, seri üretimin tekdüzeleştirdiği koku dünyasına karşı sessiz fakat köklü bir itiraz olarak kuruldu. Bizim için bir parfüm, pazarlama panolarında tasarlanan sentetik bir formül değil; toprağın, mevsimin, sabah çiğinin ve sabırla beklenen maserasyonun canlı tanığıdır.',
    'Isparta’nın şafak vakti toplanan Damask güllerinden Köyceğiz’in endemik sığla ormanlarına, Çeşme’nin tuzlu mandalina bahçelerinden Toros Dağları’nın 1600 metredeki ardıçlarına uzanan bir coğrafi arşiv oluşturduk. Yerel çiftçiler ve küçük üreticilerle doğrudan çalışarak, sentetik koruyuculardan ve yapay fiksatiflerden arındırılmış hammadde zincirimizi inşa ettik.',
    'Her koku partisi, atölyemizin bakır imbiklerinde küçük ölçekli (small-batch) olarak damıtılır. Alkol ve esans karışımları en az 120 gün boyunca ışık almayan cam damacanalarda dinlendirilerek koku moleküllerinin birbirine kusursuzca kenetlenmesi sağlanır. Şişelerimizdeki her damla, bir zaman ve mekân kesitidir.',
  ],
  values: [
    {
      title: 'Zanaatkar Küçük Parti Üretimi',
      description: 'Yılda en fazla 500 adet numaralandırılmış şişe üretilir; her parti hasat mevsiminin iklimsel izini taşır.',
    },
    {
      title: 'Doğal & Etik Hammadde',
      description: 'Isparta, Muğla, İzmir ve Doğu Karadeniz’deki yerel kadın kooperatifleri ve bağımsız hasatçılarla adil ticaret.',
    },
    {
      title: 'Sabırlı Maserasyon',
      description: 'Hiçbir hızlandırıcı kimyasal kullanılmaz; en az 4 ila 6 aylık soğuk cam maserasyonu zorunludur.',
    },
    {
      title: 'Şeffaf Olfaktör Piramit',
      description: 'Koku piramidimizdeki her nota hakiki ekstraktlar, absolüler ve tentürlerle inşa edilir.',
    },
  ],
};

export const perfumeServices: PerfumeService[] = [
  {
    id: 'srv-01',
    title: 'Kişiye Özel Koku Konsültasyonu & Tasarımı',
    duration: '120 Dakika',
    price: 14500,
    description:
      'Baş parfümörümüz eşliğinde ten kimyanız, koku anılarınız ve yaşam tarzınız analiz edilerek sadece size ait 1 adet 100 ml Extrait de Parfum formüle edilir.',
    includes: [
      'Olfaktör hafıza ve koku ailesi analizi',
      'Atölye hammadde organından 3 farklı modifikasyon denemesi',
      'Seçilen nihai formülün 100 ml kişiselleştirilmiş kristal şişede teslimi',
      'Formülün atölye arşivimizde adınıza ömür boyu saklanması',
    ],
  },
  {
    id: 'srv-02',
    title: 'Keşif Seti Deneyimi & Atölye Tadımı',
    duration: '60 Dakika',
    price: 2400,
    description:
      '6 farklı koleksiyon temasından seçilen 10 adet 2 ml numune ile koku aileleri arasında rehberli bir duyu yolculuğu.',
    includes: [
      '10x 2 ml el dolumu cam sprey keşif seti',
      'Parfümör eşliğinde koku piramidi ve nota eğitimi',
      'Deneyim bedelinin tam boy parfüm alımında kredilendirilmesi',
    ],
  },
  {
    id: 'srv-03',
    title: 'Geleneksel Attar Yağı & Sandal Maserasyonu Seansı',
    duration: '90 Dakika',
    price: 8800,
    description:
      'Alkolsüz, saf sandal ağacı yağı taşıyıcısında kişisel attar yağı karışımı hazırlama ritüeli.',
    includes: [
      'Geleneksel Deg & Bhapka imbik yöntemlerinin incelenmesi',
      '30 ml el yapımı seramik flakonda saf attar yağı teslimi',
      'Nadir reçine ve ambergris tentürleri kullanımı',
    ],
  },
];

export const perfumeStores: PerfumeStore[] = [
  {
    id: 'str-01',
    name: 'Avenox Nişantaşı Laboratuvar & Koku Evi',
    district: 'Nişantaşı, Şişli',
    city: 'İstanbul',
    address: 'Abdi İpekçi Caddesi, Reasürans Pasajı Yanı No: 42/A',
    phone: '+90 (212) 241 88 90',
    hours: 'Pazartesi - Cumartesi: 10:30 - 19:30 | Pazar: 12:00 - 18:00',
    features: ['Tam Koku Organı', 'Kişiye Özel Konsültasyon Odası', 'Dinlendirme Mahzeni', 'Refill / Dolum İstasyonu'],
  },
  {
    id: 'str-02',
    name: 'Avenox Beyoğlu Tarihi Atölye',
    district: 'Galata, Beyoğlu',
    city: 'İstanbul',
    address: 'Serdar-ı Ekrem Sokak, No: 18/B',
    phone: '+90 (212) 292 45 12',
    hours: 'Salı - Pazar: 11:00 - 20:00 (Pazartesi Kapalı)',
    features: ['Bakır İmbik Gösterim Alanı', 'Arşiv Koleksiyonu', 'Keşif Seti Masası'],
  },
  {
    id: 'str-03',
    name: 'Avenox Alaçatı Taş Mahzen',
    district: 'Alaçatı, Çeşme',
    city: 'İzmir',
    address: 'Hacımemiş Mahallesi, 2012. Sokak No: 7',
    phone: '+90 (232) 716 33 20',
    hours: 'Mevsimsel: Mayıs - Ekim her gün 14:00 - 23:00',
    features: ['Ege & Narenciye Koleksiyonu', 'Açık Hava Koku Bahçesi', 'Yazlık Özel Şişeleme'],
  },
];

export function getPerfumeBySlug(slug: string): PerfumeProduct | undefined {
  return perfumes.find((item) => item.slug === slug);
}

export function getPerfumesByCategory(category: PerfumeCategory): PerfumeProduct[] {
  return perfumes.filter((item) => item.category === category);
}

/**
 * types.ts içindeki genel PerfumeItem arayüzüne uyumlu katalog öğeleri
 */
export const perfumeItems: PerfumeItem[] = perfumes.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.name,
  category: p.category,
  price: {
    amount: p.price,
    currency: 'TRY',
    qualifier: 'kdv dahil',
  },
  description: p.description,
  attributes: {
    collection: p.collection,
    tagline: p.tagline,
    volumeMl: p.volumeMl,
    concentration: p.concentration,
    gender: p.gender,
    longevity: p.longevity,
    character: p.character,
    distillationMethod: p.distillationMethod,
    perfumer: p.perfumer,
    harvestYear: p.harvestYear,
    topNotes: p.notes.top,
    heartNotes: p.notes.heart,
    baseNotes: p.notes.base,
  },
  tags: p.tags,
  image: {
    url: p.image,
    alt: p.imageAlt,
  },
  isAvailable: p.inStock,
  isFeatured: p.featured,
  concentration: (p.concentration === 'Saf Attar Yağı'
    ? 'Attar'
    : p.concentration === 'Cologne Intense'
    ? 'Eau de Toilette'
    : p.concentration) as PerfumeItem['concentration'],
  volumeMl: p.volumeMl,
  olfactiveFamily: p.category,
  topNotes: p.notes.top,
  heartNotes: p.notes.heart,
  baseNotes: p.notes.base,
  season: [p.season],
  sillage: (p.sillage.includes('İntim')
    ? 'Samimi'
    : p.sillage.includes('Orta')
    ? 'Orta'
    : p.sillage.includes('Çarpıcı')
    ? 'Güçlü'
    : 'Kalıcı İz') as PerfumeItem['sillage'],
  releaseYear: 2024,
}));


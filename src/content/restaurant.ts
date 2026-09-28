/**
 * Çağdaş Anadolu Kıyı Restoranı İçerik Kataloğu ve Sayfa Verileri
 * Avenox Multisite Showcase - Sektör: Gastronomi & Kıyı Restorancılığı
 *
 * Ege ve Batı Anadolu kıyı florası, mikro-mevsimsel bostan hasatları,
 * zanaatkar balıkçı kooperatifleri ve odun ateşi teknikleri etrafında kurgulanmış
 * tam 64 adet özgün menü öğesi ve zengin editoryal sayfa içerikleri.
 */

import type { MenuItem, ImageMedia, PricePoint } from './types';

export interface RestaurantMenuItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  price: number;
  formattedPrice: string;
  description: string;
  attributes: {
    preparation: string;
    dietary: string[];
    origin: string;
    pairing: string;
    servingSize: string;
    temperature: string;
    spiceLevel?: 'Yok' | 'Hafif' | 'Orta';
  };
  tags: string[];
  image: string;
  alt: string;
  isChefSpecial?: boolean;
  isSeasonal?: boolean;
}

export interface RestaurantCategory {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  icon?: string;
}

export interface RestaurantFilterOptions {
  categories: { id: string; name: string }[];
  dietary: string[];
  cookingTechniques: string[];
  origins: string[];
  priceRanges: { label: string; min: number; max: number }[];
}

export interface ChefProfile {
  name: string;
  role: string;
  bio: string;
  quote: string;
  image: string;
  alt: string;
  philosophyPoints: {
    title: string;
    description: string;
  }[];
  accolades: string[];
}

export interface RestaurantStory {
  title: string;
  leadParagraph: string;
  sections: {
    heading: string;
    body: string;
  }[];
  terroirPartners: {
    name: string;
    region: string;
    product: string;
    note: string;
  }[];
  manifesto: string[];
}

export interface ReservationDetails {
  title: string;
  lead: string;
  seatingAreas: {
    id: string;
    name: string;
    description: string;
    capacity: string;
    recommendedFor: string;
  }[];
  sittings: {
    session: string;
    hours: string;
    description: string;
  }[];
  policies: {
    title: string;
    detail: string;
  }[];
}

export interface TastingMenuCourse {
  courseNumber: number;
  courseName: string;
  dishName: string;
  description: string;
  winePairing: string;
}

export interface TastingMenu {
  id: string;
  name: string;
  tagline: string;
  price: number;
  formattedPrice: string;
  winePairingPrice?: number;
  formattedWinePairingPrice?: string;
  coursesCount: number;
  description: string;
  courses: TastingMenuCourse[];
}

export interface RestaurantMetadata {
  brandName: string;
  concept: string;
  tagline: string;
  locationName: string;
  address: {
    street: string;
    district: string;
    city: string;
    country: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
    reservationEmail: string;
  };
  hours: {
    days: string;
    lunch: string;
    dinner: string;
    closed: string;
  };
  features: string[];
}

// ---------------------------------------------------------------------------
// 64 ADET ÖZGÜN MENÜ ÖĞESİ
// ---------------------------------------------------------------------------

export const restaurantMenuItems: RestaurantMenuItem[] = [
  // -------------------------------------------------------------------------
  // Kategori 1: Soğuk Mezeler & Bostan Zeytinyağlıları (10 öğe)
  // -------------------------------------------------------------------------
  {
    id: 'rst-01',
    slug: 'urla-sakiz-enginari-kalbi',
    name: 'Urla Sakız Enginarı Kalbi',
    title: 'Taş Baskı Zeytinyağlı Urla Sakız Enginarı Kalbi',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 420,
    formattedPrice: '420 ₺',
    description: 'Yağcılar Köyü sakız enginarı kalpleri, taze iç bakla püresi, taze nane ve soğuk sıkım Erkence zeytinyağında 3 saat ağır ateşte demlenmiş portakal kabuğu rayihası.',
    attributes: {
      preparation: 'Taş değirmen zeytinyağında düşük ısı konfi',
      dietary: ['Glütensiz', 'Vejetaryen', 'Vegan'],
      origin: 'Urla Yağcılar Köyü',
      pairing: 'Urla Bağları Bornova Misketi 2023',
      servingSize: '160 g - Paylaşımlık',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['enginar', 'zeytinyağlı', 'urla', 'bostan', 'vegan'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    alt: 'Taze zeytinyağlı enginar kalbi, taze bakla ve dereotu filizleri ile servis tabağında',
    isChefSpecial: true,
    isSeasonal: true,
  },
  {
    id: 'rst-02',
    slug: 'deniz-borulcesi-badem-tarator',
    name: 'Deniz Börülcesi & Datça Badem Taratoru',
    title: 'Kıyı Deniz Börülcesi ve Taş Havanda Datça Badem Taratoru',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 380,
    formattedPrice: '380 ₺',
    description: 'Çeşmealtı dalyanlarından gün doğumunda toplanan diri deniz börülceleri, koruk suyu vinegret, taş havanda dövülmüş Datça akbadem taratoru ve nar ekşisi taneleri.',
    attributes: {
      preparation: 'Buzlu şoklama ve taş havanda ezme',
      dietary: ['Glütensiz', 'Vejetaryen', 'Vegan'],
      origin: 'Çeşmealtı Dalyanları & Datça',
      pairing: 'Kuzey Ege Çavuş Üzümü Beyazı',
      servingSize: '150 g - Paylaşımlık',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['deniz-börülcesi', 'datça-bademi', 'tarator', 'koruk-ekşisi'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Yeşil deniz börülcesi, dövülmüş beyaz Datça bademi sosu ve yabani nar taneleri',
    isSeasonal: true,
  },
  {
    id: 'rst-03',
    slug: 'sevket-i-bostan-levrek-marine',
    name: 'Şevketi Bostan & Levrek Marine',
    title: 'Turunçta Pişmiş Levrek Marine & Taze Şevketi Bostan',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 540,
    formattedPrice: '540 ₺',
    description: 'Karaburun oltayla tutulmuş vahşi levrek ince şeritleri, Bodrum turunç suyu ve sumakta 4 saat dinlendirilmiş şevketi bostan sapları, çıtır kapari karpuzu.',
    attributes: {
      preparation: 'Narenciye asidinde soğuk marine',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Karaburun Kıyıları & Tire Pazarı',
      pairing: 'Çeşme Narince Sek Beyaz',
      servingSize: '170 g',
      temperature: 'Soğuk',
      spiceLevel: 'Hafif',
    },
    tags: ['şevketi-bostan', 'levrek', 'marine', 'karaburun', 'çiğ-deniz'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Turunç marine levrek dilimleri, çıtır şevketi bostan ve sumak yağı gezdirmesi',
    isChefSpecial: true,
  },
  {
    id: 'rst-04',
    slug: 'mese-komurunde-koz-patlican-karahayit-loru',
    name: 'Köz Patlıcan & Karahayıt Keçi Loru',
    title: 'Meşe Kömüründe Köz Patlıcan & Taze Karahayıt Keçi Loru',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 390,
    formattedPrice: '390 ₺',
    description: 'Urla bostan patlıcanları meşe odunu közünde kabuğuyla fümelenmiş; taze dağ kekiği infüzyonu, Karahayıt günlük keçi sütü loru ve çıtır ceviz yağı ile.',
    attributes: {
      preparation: 'Açık meşe közünde tütsüleme',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Karahayıt Köy Mandırası & Urla Bostanları',
      pairing: 'Karasakız Roze 2023',
      servingSize: '180 g',
      temperature: 'Ilık',
      spiceLevel: 'Yok',
    },
    tags: ['köz-patlıcan', 'keçi-loru', 'füme', 'meşe-ateşi'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    alt: 'Tütsülenmiş köz patlıcan ezmesi, taze beyaz keçi loru öbeği ve ceviz parçaları',
  },
  {
    id: 'rst-05',
    slug: 'cunda-kirma-yesil-zeytin-ezmesi',
    name: 'Cunda Kırma Yeşil Zeytin Ezmesi',
    title: 'Taş Kırma Ayvalık Zeytini, Zahter & Taze Ceviz Ezmesi',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 340,
    formattedPrice: '340 ₺',
    description: 'Çizik Ayvalık yeşil zeytinleri, taze ceviz içi, yabani dağ zahteri, sarmısak konfi, güneşte kurutulmuş domates ve ekşi mayalı bazlama çıtırı eşliğinde.',
    attributes: {
      preparation: 'Kaba taş havanda dövme',
      dietary: ['Vejetaryen', 'Vegan'],
      origin: 'Cunda Adası & Kazdağı Etekleri',
      pairing: 'Ayvalık Erken Hasat Soğuk Çay İnfüzyonu',
      servingSize: '140 g',
      temperature: 'Soğuk',
      spiceLevel: 'Hafif',
    },
    tags: ['cunda', 'zeytin', 'zahter', 'kahvaltılık-meze'],
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1200&q=80',
    alt: 'Taş kırma yeşil zeytin ezmesi, taze zahter yaprakları ve sızma zeytinyağı göleti',
  },
  {
    id: 'rst-06',
    slug: 'bodrum-bakla-favali-ahtapot-karpaccio',
    name: 'Bakla Favası & Ahtapot Karpaccio',
    title: 'Bodrum Sakız Baklası Favası & İnce Ahtapot Karpaccio',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 580,
    formattedPrice: '580 ₺',
    description: 'Taş değirmende çekilmiş kurutulmuş Bodrum baklasından ipeksi fava, dereotu yağı, hafif marine edilmiş tül inceliğinde ahtapot dilimleri ve kapari çiçeği turşusu.',
    attributes: {
      preparation: 'Ağır ateşte bakla haşlama ve dondurarak tül dilimleme',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Bodrum Yarımadası & Gümüşlük Kıyısı',
      pairing: 'Emir & Narince Kupajı 2022',
      servingSize: '160 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['fava', 'ahtapot', 'karpaccio', 'bodrum', 'deniz-mahsulü'],
    image: 'https://images.unsplash.com/photo-1568600891621-50f697b9a1c7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Altın sarısı bakla favası zemininde incecik ahtapot dilimleri ve kapari çiçekleri',
    isChefSpecial: true,
  },
  {
    id: 'rst-07',
    slug: 'yabani-ege-otlari-bergama-tulumu',
    name: 'Yabani Ege Otları & Bergama Tulumu',
    title: 'Taze Radika, Turp Otu & 14 Aylık Bergama Göbek Tulumu',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 410,
    formattedPrice: '410 ₺',
    description: 'Sabah erken toplanan radika, turp otu, cibez ve ısırgan filizleri; nar taneleri, fırınlanmış çam fıstığı, 14 aylık Bergama gömme tulumu ve koruk sosu vinegreti.',
    attributes: {
      preparation: 'Hafif diri buharda demleme',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Bergama Yaylaları & Urla Florası',
      pairing: 'Kalecik Karası Roze',
      servingSize: '190 g',
      temperature: 'Ilık',
      spiceLevel: 'Yok',
    },
    tags: ['ege-otları', 'radika', 'bergama-tulumu', 'salata'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Canlı yeşil Ege otları, rendelenmiş olgun Bergama tulumu ve nar taneleri',
  },
  {
    id: 'rst-08',
    slug: 'kaya-korugu-tahinli-humus',
    name: 'Kaya Koruğu & Taş Değirmen Humus',
    title: 'Urla Kıyı Kaya Koruğu & Antakya Tahinli Sıcak Humus',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 460,
    formattedPrice: '460 ₺',
    description: 'Urla falezlerinden toplanmış ekşi deniz kaya koruğu turşusu, yerli koçbaşı nohut, taş değirmen susam tahini, çıtır Kastamonu pastırması kırıntıları ve tereyağı köpüğü.',
    attributes: {
      preparation: 'Pürüzsüz sıcak çekim',
      dietary: ['Glütensiz'],
      origin: 'Urla Falezleri & Antakya',
      pairing: 'Öküzgözü Hafif Gövdeli Kırmızı',
      servingSize: '200 g',
      temperature: 'Ilık',
      spiceLevel: 'Hafif',
    },
    tags: ['kaya-koruğu', 'humus', 'tahin', 'pastırma', 'urla'],
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kremamsı sıcak humus, üzerinde deniz kaya koruğu turşusu ve kızgın tereyağı',
  },
  {
    id: 'rst-09',
    slug: 'damla-sakizli-kabak-cicegi-dolmasi',
    name: 'Damla Sakızlı Kabak Çiçeği Dolması',
    title: 'Şafak Vakti Urla Kabak Çiçeği Dolması & Sakız Aroması',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 480,
    formattedPrice: '480 ₺',
    description: 'Şafak vaktinde kapanmadan toplanan taze sarı kabak çiçekleri; Çeşme damla sakızı, çam fıstığı, kuş üzümü ve taze naneli pirinç harcı, süzme manda yoğurdu yatağında.',
    attributes: {
      preparation: 'Geleneksel tencerede düşük ısıda buğulama',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Urla Bostanları & Çeşme Sakız Ağaçları',
      pairing: 'Urla Sauvignon Blanc 2023',
      servingSize: '4 Adet (170 g)',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['kabak-çiçeği', 'damla-sakızı', 'zeytinyağlı-dolma', 'klasik'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    alt: 'Zarif sarı kabak çiçeği dolmaları, taze nane yaprakları ve süzme yoğurt damlaları',
    isChefSpecial: true,
    isSeasonal: true,
  },
  {
    id: 'rst-10',
    slug: 'fermente-domates-kirkagac-kavunu-ezine',
    name: 'Fermente Domates & Kırkağaç Kavun Carpaccio',
    title: 'Kırkağaç Kavunu, Fermente Domates Suyu & Olgun Keçi Ezine',
    category: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    price: 440,
    formattedPrice: '440 ₺',
    description: 'Kırkağaç petek kavunu ince dilimleri, 72 saat fermente edilmiş pembe domates consommé jeli, 12 aylık Ezine keçi peyniri köpüğü, fesleğen tohumu ve isot yağı.',
    attributes: {
      preparation: 'Lakto-fermantasyon ve soğuk infüzyon',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Manisa Kırkağaç & Çanakkale Ezine',
      pairing: 'Boğazkere & Şiraz Pembe Kupaj',
      servingSize: '150 g',
      temperature: 'Soğuk',
      spiceLevel: 'Hafif',
    },
    tags: ['kavun-peynir', 'fermantasyon', 'ezine', 'yaz-lezzeti'],
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=80',
    alt: 'İnce dilimlenmiş kavun yaprakları, domates jölesi ve beyaz Ezine peyniri köpüğü',
    isSeasonal: true,
  },

  // -------------------------------------------------------------------------
  // Kategori 2: Çiğ Kıyı & Deniz Mahsulleri (8 öğe)
  // -------------------------------------------------------------------------
  {
    id: 'rst-11',
    slug: 'sinarit-crudo-bodrum-mandalinasi',
    name: 'Sinarit Crudo & Bodrum Mandalinası',
    title: 'Çeşme Sinariti Crudo, Bodrum Mandalina Sosu & Fesleğen',
    category: 'Çiğ Kıyı & Deniz Mahsulleri',
    price: 680,
    formattedPrice: '680 ₺',
    description: 'Çeşme Boğazı oltayla avlanmış taze sinarit balığı dilimleri, coğrafi işaretli Bodrum mandalina suyu emülsiyonu, ince acı kıl biber halkaları ve deniz tuzu pulları.',
    attributes: {
      preparation: 'Bıçakla çiğ dilimleme ve anlık asitleştirme',
      dietary: ['Glütensiz', 'Deniz Ürünü', 'Süt Ürünsüz'],
      origin: 'Çeşme Boğazı & Bodrum Ortakent',
      pairing: 'Bornova Misketi Sek Rezerv',
      servingSize: '130 g',
      temperature: 'Soğuk',
      spiceLevel: 'Hafif',
    },
    tags: ['sinarit', 'crudo', 'mandalina', 'çiğ-balık', 'çeşme'],
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pembe sinarit dilimleri, mandalina vinegret parıltısı ve mikro fesleğen filizleri',
    isChefSpecial: true,
  },
  {
    id: 'rst-12',
    slug: 'akya-tartar-urla-avokadosu',
    name: 'Akya Balığı Tartarı & Urla Avokadosu',
    title: 'Kaba Kıyım Akya Tartar, Yerli Avokado & Tütsülü Zeytinyağı',
    category: 'Çiğ Kıyı & Deniz Mahsulleri',
    price: 640,
    formattedPrice: '640 ₺',
    description: 'Urla açıklarından gelen akya filetosu kaba kıyımı, misket limonu, frenk soğanı, Urla zeytinlikleri arasında yetişen kremamsı avokado püresi ve çıtır keten tohumu krakeri.',
    attributes: {
      preparation: 'Bıçak kıyımı çiğ servis',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Urla İskele Balıkçı Barınağı',
      pairing: 'Hasandede & Emir Beyaz Kupaj',
      servingSize: '140 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['akya', 'tartar', 'avokado', 'urla', 'sağlıklı'],
    image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Silindirik formda akya tartarı, zümrüt yeşili avokado katmanı ve keten tohumu çıtırı',
  },
  {
    id: 'rst-13',
    slug: 'kirmizi-karides-ceviche-koruk-suyu',
    name: 'Kırmızı Karides Ceviche & Koruk Suyu',
    title: 'İzmir Körfezi Çiğ Kırmızı Karidesi & Urla Koruk Suyu Ceviche',
    category: 'Çiğ Kıyı & Deniz Mahsulleri',
    price: 720,
    formattedPrice: '720 ₺',
    description: 'Kabuğu soyulmuş tatlı İzmir kırmızı karidesleri, olgunlaşmamış koruk üzümü suyu asidinde 8 dakika dinlendirilmiş, deniz fasulyesi, taze kişniş ve pembe biber taneleri.',
    attributes: {
      preparation: 'Hızlı soğuk asitle pişirme (ceviche)',
      dietary: ['Glütensiz', 'Kabuklu Deniz Ürünü'],
      origin: 'İzmir Körfezi & Urla Bağları',
      pairing: 'Çalkarası Doğal Roze',
      servingSize: '150 g',
      temperature: 'Soğuk',
      spiceLevel: 'Hafif',
    },
    tags: ['kırmızı-karides', 'ceviche', 'koruk-suyu', 'deniz-mahsulü'],
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cam kasede koruk suyunda parıldayan kırmızı karidesler, ince kişniş ve pembe karabiber',
    isChefSpecial: true,
  },
  {
    id: 'rst-14',
    slug: 'dulger-sashimi-dag-adacayi',
    name: 'Dülger Balığı Sashimi & Dağ Adaçayı',
    title: 'Taş Balığı Dülger Sashimi, Adaçayı Fümesi & Garum Damlası',
    category: 'Çiğ Kıyı & Deniz Mahsulleri',
    price: 690,
    formattedPrice: '690 ₺',
    description: 'Sert dokulu yerli dülger balığı ince dilimleri, taze dağ adaçayı dumanıyla soğuk tütsülenmiş zeytinyağı, kendi mutfağımızda fermente edilmiş hamsi garumu ve çıtır nori tozu.',
    attributes: {
      preparation: 'Soğuk adaçayı dumanı ve garum terbiye',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Foça Balıkçı Kooperatifi & Yamanlar Dağı',
      pairing: 'Narince Fıçı Fermente Beyaz',
      servingSize: '120 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['dülger', 'sashimi', 'adaçayı', 'fermente-garum', 'foça'],
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80',
    alt: 'Siyah taş tabakta şeffaf dülger balığı dilimleri ve adaçayı yaprakları',
  },
  {
    id: 'rst-15',
    slug: 'tranca-carpaccio-yabani-nar',
    name: 'Trança Carpaccio & Yabani Nar Glazesı',
    title: 'Derin Su Trançası Carpaccio, Nar Pekmezi & Kavrulmuş Fındık',
    category: 'Çiğ Kıyı & Deniz Mahsulleri',
    price: 710,
    formattedPrice: '710 ₺',
    description: 'Ege derin su trançası filetosu, taş değirmen Ayvalık erken hasat zeytinyağı, güneşte kıvam almış yabani nar ekşisi damlaları, kavrulmuş Giresun fındık kırıkları ve frenk soğanı.',
    attributes: {
      preparation: 'Tül inceliğinde carpaccio kesim',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Sığacık Açıkları & Kazdağı',
      pairing: 'Karasakız Roze Köpüklü Şarap',
      servingSize: '130 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['trança', 'carpaccio', 'nar-ekşisi', 'sığacık'],
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
    alt: 'Geniş seramik tabakta parlak trança carpaccio, yakut kırmızısı nar glazesı',
  },
  {
    id: 'rst-16',
    slug: 'ayvalik-deniz-taraklari-taze-incir',
    name: 'Ayvalık Deniz Tarakları & Taze İncir',
    title: 'Çiğ Ayvalık Deniz Tarakları, Bardacık İnciri & 8 Yıllık Balsamik',
    category: 'Çiğ Kıyı & Deniz Mahsulleri',
    price: 760,
    formattedPrice: '760 ₺',
    description: 'Kabuğundan taze çıkarılmış Ayvalık deniz tarağı ince madalyonları, taze dilimlenmiş tatlı Urla bardacık inciri, 8 yıllık zeytin balsamiki sirkesi ve deniz tuzu kıtırı.',
    attributes: {
      preparation: 'Çiğ marine ve meyve asidi eşleşmesi',
      dietary: ['Glütensiz', 'Kabuklu Deniz Ürünü'],
      origin: 'Ayvalık Kıyı Şeridi & Urla Bostanları',
      pairing: 'Şampanya Metodu Emir Doğal Köpüklü',
      servingSize: '140 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['deniz-tarağı', 'bardacık-inciri', 'balsamik', 'ayvalık'],
    image: 'https://images.unsplash.com/photo-1505253758473-96b46deae2cd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Deniz kabuğu içinde deniz tarağı madalyonları ve taze mor incir dilimleri',
    isChefSpecial: true,
    isSeasonal: true,
  },
  {
    id: 'rst-17',
    slug: 'sonbahar-luferi-tartari-arapsaci',
    name: 'Sonbahar Lüferi Tartarı & Arapsaçı',
    title: 'Kuzey Ege Göç Lüferi Tartarı, Yabani Arapsaçı & Kapari',
    category: 'Çiğ Kıyı & Deniz Mahsulleri',
    price: 740,
    formattedPrice: '740 ₺',
    description: 'Sonbaharda Boğaz’dan Ege’ye inen yağlı lüfer filetosu, rezene aromalı yabani arapsaçı otu, sızma zeytinyağı, kurutulmuş Datça siyah zeytin tozu ve limon kabuğu rendesi.',
    attributes: {
      preparation: 'El ile ince zar doğrama',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Çanakkale Boğazı & Babakale',
      pairing: 'Boğazkere Hafif Meşe Beyaz Kupaj',
      servingSize: '140 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['lüfer', 'tartar', 'arapsaçı', 'kuzey-ege', 'mevsimlik'],
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Şık porselen kasede kıyılmış yağlı lüfer tartarı, koyu yeşil arapsaçı yağı',
    isSeasonal: true,
  },
  {
    id: 'rst-18',
    slug: 'canli-ayvalik-istiridyesi-koruk-mignonette',
    name: 'Ayvalık İstiridyesi & Koruk Mignonette',
    title: 'Taze Açılmış Ayvalık Kıyı İstiridyesi (4 Adet) & Koruk Mignonette',
    category: 'Çiğ Kıyı & Deniz Mahsulleri',
    price: 820,
    formattedPrice: '820 ₺',
    description: 'Ayvalık Maden Adası açıklarından taze toplanmış derin kabuk istiridyeler, buz yatağında canlı açılır; arpacık soğanlı koruk mignonette sirkesi ve acı biber jölesi ile servis edilir.',
    attributes: {
      preparation: 'Anlık buz üzerinde kabuk açma',
      dietary: ['Glütensiz', 'Kabuklu Deniz Ürünü'],
      origin: 'Ayvalık Maden Adası',
      pairing: 'Geleneksel Metot Brut Roze',
      servingSize: '4 Adet',
      temperature: 'Buzlu Soğuk',
      spiceLevel: 'Hafif',
    },
    tags: ['istiridye', 'mignonette', 'koruk', 'ayvalık', 'canlı-deniz'],
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80',
    alt: 'Buz yatağında servis edilen 4 adet açık istiridye, limon dilimi ve kırmızı mignonette sosu',
    isChefSpecial: true,
  },

  // -------------------------------------------------------------------------
  // Kategori 3: Sıcak Başlangıçlar & Ara Sıcaklar (10 öğe)
  // -------------------------------------------------------------------------
  {
    id: 'rst-19',
    slug: 'mese-atesinde-isli-ahtapot-kolu',
    name: 'Meşe Ateşinde İsli Ahtapot Kolu',
    title: 'Ağır Ateşte Haşlanmış & Meşe Kömüründe İsli Ahtapot Kolu',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 890,
    formattedPrice: '890 ₺',
    description: 'Mantar tıpa ve kaya tuzuyla 2 saat kendi suyunda demlenmiş Ege ahtapot kolu, meşe kömüründe harlı mühürleme, tütsülenmiş sarı patates kreması ve tütsü tatlı pul biber yağı.',
    attributes: {
      preparation: 'Kendi suyunda ağır haşlama & odun kömürü ızgara',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Datça Knidos Açıkları & Ödemiş Patatesi',
      pairing: 'Kalecik Karası Orta Gövdeli Kırmızı',
      servingSize: '210 g',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['ahtapot', 'odun-ateşi', 'isli', 'patates-püresi', 'imza-lezzet'],
    image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=1200&q=80',
    alt: 'Karamelize ızgara ahtapot kolu, hardal sarısı patates kreması ve kırmızı biber yağı damlaları',
    isChefSpecial: true,
  },
  {
    id: 'rst-20',
    slug: 'ege-usulu-kalamar-dolmasi-otlar',
    name: 'Ege Usulü Kalamar Dolması',
    title: 'Otlu ve Karidesli İç Pilav Dolgulu Taze Yerli Kalamar',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 780,
    formattedPrice: '780 ₺',
    description: 'Bütün temizlenmiş yerli kalamar tüpü, Ege çimçim karidesi, çam fıstığı, kuş üzümü ve taze arapsaçı ile harmanlanmış pirinç harcı; beyaz şarap ve tereyağı emülsiyonunda hafif fırınlanmış.',
    attributes: {
      preparation: 'Dolma sarma ve fırında tereyağlı buğulama',
      dietary: ['Deniz Ürünü'],
      origin: 'Foça Kıyıları & Bergama Fıstığı',
      pairing: 'Sauvignon Gris & Narince Kupaj',
      servingSize: '220 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['kalamar-dolma', 'çam-fıstığı', 'foça', 'zeytinyağlı-ara-sıcak'],
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dilimlenmiş sıcak kalamar dolması, altın sarısı beyaz şarap tereyağı sosu içinde',
  },
  {
    id: 'rst-21',
    slug: 'tereyagli-sarimsakli-kaya-levrek-yanaklari',
    name: 'Tereyağlı Kaya Levrek Yanakları',
    title: 'Bakır Tavada Köpürtülmüş Tereyağlı Levrek Yanakları & Adaçayı',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 720,
    formattedPrice: '720 ₺',
    description: 'İki adet iri kaya levreğinin lokum kıvamındaki yanak etleri, yayık köy tereyağında sarımsak konfi, taze adaçayı yaprakları ve pul biber çıtırı ile tavada hızlıca çevrilir.',
    attributes: {
      preparation: 'Bakır tavada harlı tereyağında sote',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Karaburun Oltacıları & Halis Yayla Tereyağı',
      pairing: 'Chardonnay Fıçı Fermente',
      servingSize: '160 g',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['levrek-yanağı', 'tereyağlı', 'adaçayı', 'bakır-tava'],
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kızgın bakır tavada köpüren tereyağında kızarmış balık yanakları ve taze adaçayı',
    isChefSpecial: true,
  },
  {
    id: 'rst-22',
    slug: 'komurde-taze-kalamar-izgara-remoulade',
    name: 'Kömürde Taze Kalamar Izgara',
    title: 'Harlı Odun Ateşinde Bütün Kalamar & Yeşil Zeytinli Remoulade',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 740,
    formattedPrice: '740 ₺',
    description: 'Urla meşe kömüründe sadece 90 saniye mühürlenmiş körpe yerli kalamar, çizilmiş gövde, maydanozlu yeşil Ayvalık kırma zeytin remoulade sosu ve közlenmiş limon.',
    attributes: {
      preparation: 'Kısa süreli yüksek ısı ızgara',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Çeşmealtı Açıkları',
      pairing: 'Emir & Narince Beyaz Sek',
      servingSize: '190 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['ızgara-kalamar', 'odun-kömürü', 'remoulade', 'çeşmealtı'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    alt: 'Izgara izleri belirgin bütün kalamar, yeşil zeytinli sos ve ızgara yarım limon',
  },
  {
    id: 'rst-23',
    slug: 'guvecte-tereyagli-urla-kirmizi-karidesi',
    name: 'Güveçte Tereyağlı Urla Karidesi',
    title: 'Toprak Güveçte Cızırdayan Kırmızı Karides, Acı Biber & Defne',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 840,
    formattedPrice: '840 ₺',
    description: 'Menemen çömleğinde kızgın tereyağında 2 dakika pişirilen tatlı kırmızı karidesler, ezilmiş taze sarımsak dişleri, güneşte kurutulmuş acı Urla biberi pulları ve taze defne.',
    attributes: {
      preparation: 'Kızgın toprak güveçte cızırdatma',
      dietary: ['Glütensiz', 'Kabuklu Deniz Ürünü'],
      origin: 'İzmir Körfezi & Urla Bostanları',
      pairing: 'Öküzgözü Roze Sek',
      servingSize: '180 g',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Orta',
    },
    tags: ['karides-güveç', 'acı-biber', 'tereyağlı', 'urla-karidesi'],
    image: 'https://images.unsplash.com/photo-1584947897591-b3b4bcfe3c70?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cızırdayan toprak güveçte kızarmış kırmızı karidesler, sarımsaklı tereyağı köpüğü',
  },
  {
    id: 'rst-24',
    slug: 'zanaatkar-midye-dolma-modern-yorum',
    name: "Zanaatkar Midye 'Dolma' Yorumu",
    title: 'Açık Kabukta İri İzmir Midyesi, Çıtır Pirinç & Yenibahar Köpüğü',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 490,
    formattedPrice: '490 ₺',
    description: 'Kabuksuz iri İzmir midyeleri tereyağında hafifçe sotelenir; tarçın ve karamelize soğanlı aromatik pirinç çıtırı, taze yenibahar infüzyonlu limon köpüğü ve frenk maydanozu ile sunulur.',
    attributes: {
      preparation: 'Dekompoze sokak lezzeti yeniden yorumu',
      dietary: ['Kabuklu Deniz Ürünü'],
      origin: 'İzmir Körfez Açıkları',
      pairing: 'Bornova Misketi Doğal Şarap',
      servingSize: '150 g (5 porsiyonluk lokma)',
      temperature: 'Ilık',
      spiceLevel: 'Hafif',
    },
    tags: ['midye-dolma', 'modern-yorum', 'izmir', 'yenibahar'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern porselen tabakta sıralanmış midyeler, altın rengi çıtır pirinç tabakası ve limon köpüğü',
    isChefSpecial: true,
  },
  {
    id: 'rst-25',
    slug: 'citir-sakiz-enginari-tulum-dip',
    name: 'Çıtır Sakız Enginarı & Otlu Tulum Dip',
    title: 'Çıtır Yapraklı Urla Sakız Enginarı & Tire Çamur Peyniri Dip',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 460,
    formattedPrice: '460 ₺',
    description: 'Taze enginar çanakları ve taze yaprakları incecik dilimlenip hafif mısır unuyla çıtır kızartılır; yanında Tire çamur peyniri ve Bergama tulumuyla çırpılmış zahterli ılık dip sos.',
    attributes: {
      preparation: 'Hafif çıtır tava kızartması',
      dietary: ['Vejetaryen'],
      origin: 'Urla Bostanı & Tire Mandıraları',
      pairing: 'Çeşme Beyaz Kupaj 2023',
      servingSize: '180 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['çıtır-enginar', 'tire-peyniri', 'zahter', 'atıştırmalık'],
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
    alt: 'Çıtır altın sarısı enginar dilimleri, seramik soslukta otlu tulum dip sosu',
    isSeasonal: true,
  },
  {
    id: 'rst-26',
    slug: 'asma-yapragi-sardalya-izgara',
    name: 'Asma Yaprağında Sardalya Izgara',
    title: 'Urla Bağ Yaprağına Sarılı Sardalya Balığı & Köz Domates',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 520,
    formattedPrice: '520 ₺',
    description: 'Kılçığı ayıklanmış taze yağlı Karaburun sardalyaları, Urla bağlarından toplanmış taze asma yapraklarına sarılarak ızgarada közlenir; köz soğan ve sumaklı taze domates ezmesi ile.',
    attributes: {
      preparation: 'Taze yaprakta kömür ızgara',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Karaburun & Urla Bağ Yolu',
      pairing: 'Kuzey Ege Karasakız Roze',
      servingSize: '5 Adet Sarma (200 g)',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['sardalya', 'asma-yaprağı', 'urla-bağları', 'közde-balık'],
    image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Yeşil asma yapraklarına sarılı çıtır ızgara sardalyalar ve közlenmiş çeri domatesler',
    isSeasonal: true,
  },
  {
    id: 'rst-27',
    slug: 'tas-firinda-uykuluklu-kuzu-kokorec',
    name: 'Taş Fırında Uykuluklu Kuzu Kokoreç',
    title: 'Süt Kuzusu Kokoreç & Uykuluk Dilimleri, Sumaklı Odun Ekmeği',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 680,
    formattedPrice: '680 ₺',
    description: 'Kıvırcık süt kuzusu kokoreci ve taze uykuluk, taş fırında güveçte domates konfi, taze kekik ve acı biberle çıtırlaştırılır; el açması ince lavaş üzerinde et jus sosuyla sunulur.',
    attributes: {
      preparation: 'Taş fırında ağır kızartma ve tava karamelizasyonu',
      dietary: ['Glütensiz Seçenek Mevcut'],
      origin: 'Balıkesir Kıvırcık Kuzusu',
      pairing: 'Karasakız & Boğazkere Meşe Kırmızı',
      servingSize: '190 g',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Orta',
    },
    tags: ['kokoreç', 'uykuluk', 'sakatat', 'taş-fırın', 'anadolu-klasiği'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Karamelize uykuluk ve ince dilim kokoreç, taze kekik ve közlenmiş acı biber eşliğinde',
    isChefSpecial: true,
  },
  {
    id: 'rst-28',
    slug: 'akdeniz-kum-midyesi-sarap-soslu',
    name: 'Kum Midyesi & Misket Şarabı Sosu',
    title: 'Tava Akivades Kum Midyeleri, Bornova Misketi & Sarmısak',
    category: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    price: 620,
    formattedPrice: '620 ₺',
    description: 'Çeşmealtı kumluklarından çıkarılan canlı kum midyeleri (akivades), sarımsak, taze maydanoz sapları, sek Bornova Misketi şarabı ve soğuk tereyağı ile çektirilmiş nefis sosunda.',
    attributes: {
      preparation: 'Hızlı harlı tencere buğulaması',
      dietary: ['Glütensiz', 'Kabuklu Deniz Ürünü'],
      origin: 'Çeşmealtı Kumsalları',
      pairing: 'Bornova Misketi Sek Beyaz',
      servingSize: '300 g (Kabuklu)',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['kum-midyesi', 'akivades', 'misket-şarabı', 'deniz-kabuklusu'],
    image: 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?auto=format&fit=crop&w=1200&q=80',
    alt: 'Geniş emaye kapta beyaz şarap ve maydanozlu tereyağı sosunda açılmış kum midyeleri',
  },

  // -------------------------------------------------------------------------
  // Kategori 4: Kıyı Taş Fırını & Zanaatkar Hamurlar (8 öğe)
  // -------------------------------------------------------------------------
  {
    id: 'rst-29',
    slug: 'karidesli-otlu-kosem-pide',
    name: 'Karidesli & Yabani Otlu Çıtır Pide',
    title: 'Taş Fırından 48 Saat Fermente Karidesli & Otlu Çıtır Pide',
    category: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    price: 590,
    formattedPrice: '590 ₺',
    description: 'Karakılçık unundan 48 saat soğuk fermente ekşi mayalı hamur, ısırgan ve yabani pırasa sotesi, diri Ege çimçim karidesleri, Bergama tulumu ve kenarına sürülen sarımsaklı zeytinyağı.',
    attributes: {
      preparation: '450°C odun ateşinde taş tabanlı fırın',
      dietary: ['Kabuklu Deniz Ürünü'],
      origin: 'Karakılçık Buğdayı (Seferihisar) & İzmir Karidesi',
      pairing: 'Narince Meşesiz Beyaz',
      servingSize: '1 Adet Uzun Pide (320 g)',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['pide', 'karides', 'karakılçık', 'ekşi-maya', 'taş-fırın'],
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
    alt: 'Odun fırınından yeni çıkmış kabarık kenarlı karidesli ve yeşil otlu ince çıtır pide',
    isChefSpecial: true,
  },
  {
    id: 'rst-30',
    slug: 'kiyi-lahmacunu-kuzu-eti-enginar',
    name: 'Kıyı Lahmacunu: Kuzu Eti & Enginar',
    title: 'Çıtır Kıyı Lahmacunu: Zırh Kuzu Döşü & Taze Enginar Kırıntısı',
    category: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    price: 420,
    formattedPrice: '420 ₺',
    description: 'Kağıt inceliğinde çıtır hamur, zırhta çekilmiş Balıkesir süt kuzusu döş eti, incecik kıyılmış Urla sakız enginarı, sumaklı maydanoz yaprakları ve taze nar ekşisi gezdirmesi ile.',
    attributes: {
      preparation: 'Zırh kıyması harcıyla hızlı taş fırın pişirimi',
      dietary: [],
      origin: 'Balıkesir Kuzu & Urla Enginarı',
      pairing: 'Karasakız Hafif Gövdeli Kırmızı',
      servingSize: '2 Adet Çıtır Lahmacun',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Orta',
    },
    tags: ['lahmacun', 'kuzu-eti', 'enginar', 'taş-fırın', 'çıtır'],
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    alt: 'İncecik çıtır pişmiş iki adet kıyı lahmacunu, sumaklı taze maydanoz ve limon yanında',
  },
  {
    id: 'rst-31',
    slug: 'el-acmasi-murekkepli-eriste-deniz-mahsulleri',
    name: 'Mürekkepli Erişte & Deniz Mahsulleri',
    title: 'Sübye Mürekkebiyle Yoğrulmuş El Açması Erişte & Kıyı Mahsulleri',
    category: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    price: 760,
    formattedPrice: '760 ₺',
    description: 'Sübye mürekkebiyle koyu siyah renkte yoğrulan el açması taze erişte, körfez kalamarı, çimçim karides, kum midyesi, sarımsaklı karides bisque sosu ve taze fesleğen yaprakları.',
    attributes: {
      preparation: 'Taze el yapımı makarna ve bisque çektirme',
      dietary: ['Deniz Ürünü', 'Kabuklu Deniz Ürünü'],
      origin: 'Karaburun Sübyesi & Köy Yumurtası',
      pairing: 'Urla Chardonnay Rezerv',
      servingSize: '280 g',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['erişte', 'sübye-mürekkebi', 'deniz-mahsulü', 'makarna', 'zanaatkar'],
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=80',
    alt: 'Siyah mürekkepli taze makarna, üzerinde pembe karidesler ve kabuklu kum midyeleri',
    isChefSpecial: true,
  },
  {
    id: 'rst-32',
    slug: 'kozlenmis-otlu-keci-lorlu-tepsi-citiri',
    name: 'Közlenmiş Otlu & Keçi Lorlu Tepsi Çıtırı',
    title: 'Elde Açılmış İnce Baklava Yufkasında Yabani Otlar & Ilık Keçi Loru',
    category: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    price: 380,
    formattedPrice: '380 ₺',
    description: 'Elde tül gibi açılmış çıtır yufka katları arasına radika, ısırgan ve pırasa kavurması, taze Karahayıt keçi sütü loru, çörekotu tohumları ve taş değirmen zeytinyağı gezdirmesi.',
    attributes: {
      preparation: 'Taş fırında nar gibi kızartma',
      dietary: ['Vejetaryen'],
      origin: 'Karahayıt Mandırası & Tire Otları',
      pairing: 'Narince & Emir Sek Beyaz',
      servingSize: '200 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['börek', 'otlu-çıtır', 'keçi-loru', 'geleneksel-hamur'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    alt: 'Altın renginde kızarmış kat kat çıtır yufka böreği, içinde erimiş keçi loru ve otlar',
  },
  {
    id: 'rst-33',
    slug: 'ahtapotlu-domatesli-arpa-sehriye-risotto',
    name: 'Ahtapotlu & Domatesli Arpa Şehriye',
    title: 'Odun Ateşinde Ağır Pişmiş Ahtapotlu Domatesli Arpa Şehriye',
    category: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    price: 790,
    formattedPrice: '790 ₺',
    description: 'Geleneksel arpa şehriyenin ahtapot kemik suyu ve fırınlanmış çeri domatesle risotto tekniğinde ağır ağır çektirilmesi; ızgara ahtapot lokmaları ve 14 aylık Bergama tulumu rendesi ile.',
    attributes: {
      preparation: 'Kısık ateşte çektirme (risotto usulü şehriye)',
      dietary: ['Deniz Ürünü'],
      origin: 'Urla Bağ Domatesleri & Ege Ahtapotu',
      pairing: 'Öküzgözü & Boğazkere Orta Gövde Kırmızı',
      servingSize: '290 g',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['arpa-şehriye', 'ahtapot', 'risotto-usulü', 'bergama-tulumu'],
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
    alt: 'Koyu kırmızı domatesli arpa şehriye yatağında kızarmış meşe ızgara ahtapot parçaları',
    isChefSpecial: true,
  },
  {
    id: 'rst-34',
    slug: 'firinlanmis-kuzu-gerdanli-ege-mantisi',
    name: 'Fırınlanmış Kuzu Gerdanlı Ege Mantısı',
    title: '10 Saat Fırınlanmış Kuzu Gerdan Dolgulu Mantı & Manda Yoğurdu',
    category: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    price: 640,
    formattedPrice: '640 ₺',
    description: 'Kemikli kuzu gerdanının taş fırında 10 saat pişirilip tiftiklenmesiyle hazırlanan el açması üçgen mantılar; fırında çıtırlaştırılır, süzme manda yoğurdu ve biberiyeli köz biber yağı ile servis edilir.',
    attributes: {
      preparation: 'Taş fırında ağır konfi gerdan & elde büküm mantı',
      dietary: [],
      origin: 'Ödemiş Kuzusu & Manda Çiftliği',
      pairing: 'Boğazkere & Şiraz Güçlü Kırmızı',
      servingSize: '240 g',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['mantı', 'kuzu-gerdan', 'manda-yoğurdu', 'köz-biber'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fırında hafif kızarmış üçgen mantılar, kadifemsi manda yoğurdu ve köz kırmızı biber yağı',
  },
  {
    id: 'rst-35',
    slug: 'koy-usulu-zeytinli-incirli-sicak-focaccia',
    name: 'Zeytinli & Taze İncirli Köy Focaccia',
    title: 'Taş Fırından Çıkan Yabani Kekikli Zeytinli & İncirli Sıcak Ekmek',
    category: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    price: 290,
    formattedPrice: '290 ₺',
    description: 'Ekşi mayalı kalın gözenekli zanaatkar hamuru, hamur üzerinde çökertilmiş çizik yeşil zeytinler, taze incir dilimleri, iri deniz tuzu pulları ve çırpılmış deniz tuzlu koyun tereyağı tabağı ile.',
    attributes: {
      preparation: 'Odun fırınında taş tabanda yüksek nemli pişirim',
      dietary: ['Vejetaryen'],
      origin: 'Karakılçık Unu & Ayvalık Zeytini',
      pairing: 'Erkence Erken Hasat Tadım Yağı',
      servingSize: '250 g - Paylaşımlık Ekmek',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['ekmek', 'focaccia', 'zeytinli', 'incirli', 'ekşi-maya'],
    image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fırından yeni çıkmış zeytinli ve taze incirli altın kabuklu kabarık focaccia ekmeği',
    isSeasonal: true,
  },
  {
    id: 'rst-36',
    slug: 'koz-patlican-ve-tulum-peynirli-dolama',
    name: 'Köz Patlıcanlı Çıtır Yufka Dolaması',
    title: 'Köz Patlıcan & İzmir Tulum Peynirli Çıtır Yufka Sarması',
    category: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    price: 410,
    formattedPrice: '410 ₺',
    description: 'İnce ev yufkasına sarılı közlenmiş bostan patlıcanı, olgun İzmir teneke tulumu ve taze fesleğen içi; fırında çıtırlaştırılıp fesleğenli domates marmelatı eşliğinde sunulur.',
    attributes: {
      preparation: 'Rulo sarma ve fırın kızartması',
      dietary: ['Vejetaryen'],
      origin: 'Urla Bostanı & Tire Süt Mandırası',
      pairing: 'Bornova Misketi Ferah Beyaz',
      servingSize: '3 Adet Rulo (210 g)',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['patlıcanlı-börek', 'tulum-peyniri', 'çıtır-dolama', 'fesleğen'],
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80',
    alt: 'Altın rengi çıtır yufka ruloları, yanında kırmızı domates marmelatı kasesi',
  },

  // -------------------------------------------------------------------------
  // Kategori 5: Odun Ateşi & Izgara Balıklar (10 öğe)
  // -------------------------------------------------------------------------
  {
    id: 'rst-37',
    slug: 'odun-atesinde-izgara-urla-sinariti',
    name: 'Odun Ateşinde Izgara Urla Sinariti',
    title: 'Zeytin Odunu Ateşinde Izgara Sinarit Takozu & Kaya Koruğu',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 1650,
    formattedPrice: '1.650 ₺',
    description: 'Zeytin odunu korunda deri tarafı çıtır mühürlenmiş kalın sinarit balığı takozu, haşlanmış kaya koruğu, tereyağlı limon vinegreti ve fırınlanmış bebek patates eşliğinde.',
    attributes: {
      preparation: 'Zeytin odunu ızgarasında kemikli mühürleme',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Urla Yarımadası Balıkçı Kooperatifi',
      pairing: 'Urla Chardonnay & Narince Rezerv',
      servingSize: '320 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['sinarit', 'ızgara-balık', 'odun-ateşi', 'urla', 'kaya-koruğu'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Izgara izleri üzerinde parlayan kalın etli sinarit takozu, limon ve yeşilliklerle',
    isChefSpecial: true,
  },
  {
    id: 'rst-38',
    slug: 'kaya-dulgeri-tava-enginar-pure',
    name: 'Kaya Dülgeri & Kadifemsi Enginar Püresi',
    title: 'Ağır Tavada Mühürlenmiş Dülger Filetosu & Sakız Enginar Püresi',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 1580,
    formattedPrice: '1.580 ₺',
    description: 'Derin taş balığı dülgerin derisiz kalın filetosu, kadifemsi sakız enginarı püresi yatağında; kapari karpuzu, limon kabuğu yağı ve hafif sotelenmiş çıtır deniz börülcesi.',
    attributes: {
      preparation: 'Döküm tavada çıtır tereyağlı mühürleme',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Karaburun Fener Kıyıları',
      pairing: 'Emir & Narince Fıçı Beyaz',
      servingSize: '280 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['dülger', 'enginar-püresi', 'deniz-börülcesi', 'karaburun'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Beyaz dülger filetosu, pürüzsüz enginar püresi ve zeytinyağlı yeşil ot salsa gezdirmesi',
    isChefSpecial: true,
  },
  {
    id: 'rst-39',
    slug: 'tuzda-firinlanmis-vahsi-ege-levregi',
    name: 'Tuzda Fırınlanmış Vahşi Ege Levreği (2 Kişilik)',
    title: 'Ayvalık Deniz Tuzu Kabuğunda Fırınlanmış Vahşi Kaya Levreği',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 2400,
    formattedPrice: '2.400 ₺',
    description: 'Ayvalık deniz tuzu ve yumurta akı kabuğunda taze defne ve dağ kekiğiyle fırınlanmış 1.2 kg bütün vahşi levrek; masada alevle kırılarak temizlenir, ılık zeytinyağı-limon sosuyla sunulur.',
    attributes: {
      preparation: 'Deniz tuzu zırhında fırında nemli buğulama',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Çeşme Boğazı Oltacıları & Ayvalık Tuzlası',
      pairing: 'Urla Sauvignon Blanc Fıçı Seçkisi',
      servingSize: '2 Kişilik Paylaşımlık (1.2 kg Balık)',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['tuzda-balık', 'levrek', 'paylaşımlık', 'masada-servis', 'klasik'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kırılmış deniz tuzu kabuğundan çıkan buharı tüten sulu levrek filetosu',
    isChefSpecial: true,
  },
  {
    id: 'rst-40',
    slug: 'kozde-lahoz-sis-defne-yapragi',
    name: 'Közde Lahoz Şiş & Defne Yaprağı',
    title: 'Meşe Kömüründe Defne Yapraklı Lahoz Şiş & Safranlı Balık Jus',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 1750,
    formattedPrice: '1.750 ₺',
    description: 'Küp doğranmış taze lahoz etleri, Urla dağ defnesi yaprakları ve arpacık soğanlarla şişe dizilerek harlı kömürde pişirilir; safranlı balık jus sosu ve sotelenmiş yabani pırasa üzerinde.',
    attributes: {
      preparation: 'Aroma verici defne yaprağıyla kömür şiş',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Sığacık Derin Suları & Urla Defnesi',
      pairing: 'Kalecik Karası Açık Renkli Kırmızı',
      servingSize: '290 g',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['lahoz', 'şiş-balık', 'defne', 'safran', 'sığacık'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    alt: 'Şişte kömür ateşiyle kızarmış lahoz parçaları, aralarında yanık defne yaprakları',
  },
  {
    id: 'rst-41',
    slug: 'izgara-akya-takoz-karamelize-rezene',
    name: 'Izgara Akya Balığı & Rezene Buğulaması',
    title: 'Kömürde Akya Takozu, Portakallı Rezene & Adaçayı Yağı',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 1350,
    formattedPrice: '1.350 ₺',
    description: 'Sert etli taze akya balığından kalın takoz, kömür ızgarasında pişirilir; portakal suyuyla ağır ağır karamelize edilmiş rezene kökü, taze adaçayı cipsleri ve çiğ zeytinyağı sosu.',
    attributes: {
      preparation: 'Harlı odun ızgara ve narenciyeli rezene buğulama',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Urla İskele Açıkları',
      pairing: 'Bornova Misketi Sek Rezerv',
      servingSize: '300 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['akya', 'ızgara', 'rezene', 'portakal', 'adaçayı'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Altın renkli ızgara akya balığı takozu, yanında parlak portakallı rezene dilimleri',
  },
  {
    id: 'rst-42',
    slug: 'kuzey-ege-kalkani-tarhunlu-tereyagi',
    name: 'Kuzey Ege Kalkanı & Tarhunlu Sos',
    title: 'Taş Fırında Fırınlanmış Kalkan Parçası & Tarhunlu Köy Tereyağı',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 1950,
    formattedPrice: '1.950 ₺',
    description: 'Saros Körfezi kalın etli düğmeli kalkanı, taş fırında kemiğiyle fırınlanır; taze tarhun otlu sıcak tereyağı emülsiyonu, fırınlanmış taze arpacık soğanlar ve çıtır pırasa samanı.',
    attributes: {
      preparation: 'Taş fırında yüksek ısıda kemikli pişirme',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Saros Körfezi',
      pairing: 'Chardonnay Fıçı Fermente Rezerv',
      servingSize: '350 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['kalkan', 'kuzey-ege', 'tarhun', 'tereyağlı', 'saros'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fırında altın rengi kabuk bağlamış kalkan balığı eti, tarhunlu sarı tereyağı sosu içinde',
    isChefSpecial: true,
    isSeasonal: true,
  },
  {
    id: 'rst-43',
    slug: 'bugulama-kaya-levregi-safran-domates',
    name: 'Safranlı & Domatesli Levrek Buğulama',
    title: 'Toprak Güveçte Safranlı, Arpacık Soğanlı Levrek Buğulama',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 1480,
    formattedPrice: '1.480 ₺',
    description: 'Toprak güveçte taze bostan domatesi suyu, Safranbolu safranı, arpacık soğan, taze sarımsak ve Urla adaçayı suyuyla kısık ateşte ağır ağır buğulanmış sulu kaya levreği filetosu.',
    attributes: {
      preparation: 'Toprak kapta kapalı buğulama',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Çeşmealtı Dalyanı & Safranbolu Safranı',
      pairing: 'Narince & Chardonnay Kupajı',
      servingSize: '310 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['levrek-buğulama', 'safran', 'domatesli', 'güveç'],
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Güveç içinde aromatik safranlı sarı-kırmızı soslu buğulama levrek ve taze otlar',
  },
  {
    id: 'rst-44',
    slug: 'fener-baligi-kavurma-dag-mantarlari',
    name: 'Fener Balığı & Dağ Mantarları Kavurma',
    title: 'Döküm Tavada Lokum Fener Balığı, Kuzu Göbeği & Yayık Tereyağı',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 1420,
    formattedPrice: '1.420 ₺',
    description: 'Iskandil derinliklerinden gelen fener balığı lokumları, Yamanlar Dağı kuzu göbeği ve çam mantarları, taze sarımsak, arpacık soğan ve köy tereyağında bakır tavada hızlıca kavrulur.',
    attributes: {
      preparation: 'Hızlı harlı tava kavurma',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Foça Açıkları & Yamanlar Dağı Ormanı',
      pairing: 'Karasakız Kırmızı 2022',
      servingSize: '290 g',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['fener-balığı', 'kuzu-göbeği', 'mantar', 'tava-kavurma'],
    image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=1200&q=80',
    alt: 'Döküm tavada kahverengi dağ mantarlarıyla birlikte pişmiş fener balığı lokumları',
    isChefSpecial: true,
  },
  {
    id: 'rst-45',
    slug: 'mercan-izgara-koruk-emulsiyon',
    name: 'Izgara Kırmızı Mercan & Koruk Sosu',
    title: 'Odun Ateşinde Bütün Kırmızı Mercan & Koruk Zeytinyağı Emülsiyonu',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 1520,
    formattedPrice: '1.520 ₺',
    description: 'Ege’nin tatlı etli kırmızı mercan balığı bütün olarak zeytin odunu ızgarasında pişirilir; koruk suyu, taş baskı zeytinyağı ve taze yabani kekikle çırpılmış ılık emülsiyon eşliğinde.',
    attributes: {
      preparation: 'Bütün balık harlı kömür ızgarası',
      dietary: ['Glütensiz', 'Deniz Ürünü'],
      origin: 'Çeşme Oltacıları & Urla Bağ Koruğu',
      pairing: 'Sauvignon Blanc & Misket Kupaj',
      servingSize: 'Yaklaşık 450 g Bütün Balık',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['mercan', 'ızgara-balık', 'koruk-suyu', 'çeşme', 'bütün-balık'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bütün ızgara edilmiş parlak kırmızı mercan balığı, zeytinyağlı taze sos gezdirmesi ile',
  },
  {
    id: 'rst-46',
    slug: 'ege-istakozu-zanaatkar-linguine',
    name: 'Ege Istakozu & Zanaatkar Linguine (2 Kişilik)',
    title: 'Canlı Ege Istakozu, Istakoz Bisque & Taze El Yapımı Linguine',
    category: 'Odun Ateşi & Izgara Balıklar',
    price: 2850,
    formattedPrice: '2.850 ₺',
    description: 'Sığacık açıklarından canlı Ege ıstakozu odun fırınında tereyağıyla hafifçe mühürlenir; kabuklarından 8 saat kaynatılmış yoğun konyaklı bisque sosunda taze el açması linguine ile sunulur.',
    attributes: {
      preparation: 'Kabuk stoğu bisque çektirme & fırın mühürleme',
      dietary: ['Kabuklu Deniz Ürünü'],
      origin: 'Sığacık Derin Resifleri',
      pairing: 'Fıçı Fermente Rezerv Chardonnay',
      servingSize: '2 Kişilik Ziyafet Tabağı',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['ıstakoz', 'linguine', 'bisque', 'sığacık', 'özel-ziyafet'],
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Geniş bakır tavada ortada ikiye bölünmüş kırmızı Ege ıstakozu ve bisque soslu linguine',
    isChefSpecial: true,
  },

  // -------------------------------------------------------------------------
  // Kategori 6: Geleneksel Güveçler & Anadolu Kıyı Etleri (6 öğe)
  // -------------------------------------------------------------------------
  {
    id: 'rst-47',
    slug: 'agir-ateste-kuzu-incik-enginar-sosu',
    name: 'Ağır Ateşte Kuzu İncik & Enginar Sosu',
    title: 'Taş Fırında 8 Saat Pişmiş Kuzu İncik, Sakız Enginarı & Kemik Sosu',
    category: 'Geleneksel Güveçler & Anadolu Kıyı Etleri',
    price: 1150,
    formattedPrice: '1.150 ₺',
    description: 'Süt kuzusu inciği zeytinyağı, arpacık soğan ve taze defne ile taş fırında 8 saat ağır ağır konfi edilir; pürüzsüz enginar kalbi püresi ve kuzu kemik iliği sosu (jus) ile.',
    attributes: {
      preparation: '8 saat taş fırın düşük ısı konfi',
      dietary: ['Glütensiz'],
      origin: 'Balıkesir Yaylaları & Urla Enginarı',
      pairing: 'Boğazkere & Öküzgözü Güçlü Kırmızı',
      servingSize: '360 g',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['kuzu-incik', 'konfi', 'enginar', 'taş-fırın', 'kemik-iliğinden-jus'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kemikten ayrılan yumuşacık kuzu inciği, parlak kahverengi sos ve beyaz enginar püresi',
    isChefSpecial: true,
  },
  {
    id: 'rst-48',
    slug: 'odun-firininda-dana-yanak-kestane-pure',
    name: 'Odun Fırınında Dana Yanak & Kestane Püresi',
    title: 'Ödemiş Dana Yanağı, Kırmızı Şarap Sosu & Kadifemsi Kestane Püresi',
    category: 'Geleneksel Güveçler & Anadolu Kıyı Etleri',
    price: 1220,
    formattedPrice: '1.220 ₺',
    description: 'Ödemiş yerli dana yanağı, kök sebzeler ve yerel kırmızı şarapla 10 saat döküm kapta demlenir; Ödemiş dağ kestanesinden tereyağlı ipeksi püre ve karamelize arpacık soğanlar.',
    attributes: {
      preparation: '10 saat kapalı dökümde braising',
      dietary: ['Glütensiz'],
      origin: 'İzmir Ödemiş & Bozdağ Kestanesi',
      pairing: 'Karasakız & Boğazkere Yıllanmış Rezerv',
      servingSize: '340 g',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['dana-yanak', 'kestane-püresi', 'ödemiş', 'odun-fırını'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ağır ateşte karamelize olmuş dana yanağı, pürüzsüz kestane püresi üzerinde',
    isChefSpecial: true,
  },
  {
    id: 'rst-49',
    slug: 'urla-oglak-tandir-isli-firik-pilavi',
    name: 'Urla Oğlak Tandır & İsli Firik Pilavı',
    title: 'Urla Yarımadası Bahar Oğlak Tandırı & İsli Firik Pilavı',
    category: 'Geleneksel Güveçler & Anadolu Kıyı Etleri',
    price: 1180,
    formattedPrice: '1.180 ₺',
    description: 'Yarımada makiliklerinde otlayan süt oğlağı, taş kuyu tandırında kendi buharında lime lime pişirilir; isli firik buğdayı pilavı, köz sarımsak ve taze kekikli oğlak suyu eşliğinde.',
    attributes: {
      preparation: 'Taş kuyu tandırında kapalı odun pişirimi',
      dietary: [],
      origin: 'Karaburun & Urla Dağ Köyleri',
      pairing: 'Öküzgözü Fıçı Rezerv',
      servingSize: '320 g',
      temperature: 'Sıcak',
      spiceLevel: 'Hafif',
    },
    tags: ['oğlak-tandır', 'firik-pilavı', 'urla', 'bahar-lezzeti'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Altın sarısı nar gibi kızarmış oğlak tandır eti, yeşilimsi firik pilavı yatağında',
    isSeasonal: true,
  },
  {
    id: 'rst-50',
    slug: 'izgara-dana-bonfile-ilikli-kemik-sosu',
    name: 'Izgara Dana Bonfile & İlikli Kemik Sosu',
    title: 'Meşe Kömüründe Dana Bonfile, Fırınlanmış İlikli Kemik & Trüflü Püre',
    category: 'Geleneksel Güveçler & Anadolu Kıyı Etleri',
    price: 1380,
    formattedPrice: '1.380 ₺',
    description: '28 gün kuru dinlendirilmiş yerli dana bonfile meşe kömüründe mühürlenir; boyuna kesilip fırınlanmış ilikli dana kemiği, karamelize şalot ve trüf kokulu patates püresi.',
    attributes: {
      preparation: 'Kuru dinlendirme ve kömür ızgara',
      dietary: ['Glütensiz'],
      origin: 'Tire Yaylaları',
      pairing: 'Cabernet Franc & Boğazkere Güçlü Kupaj',
      servingSize: '240 g Et + İlikli Kemik',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['bonfile', 'ilikli-kemik', 'meşe-ızgara', 'trüflü-püre'],
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kömürde mühürlenmiş et dilimleri, fırınlanmış kemik iliği ve taze kekik dalları',
  },
  {
    id: 'rst-51',
    slug: 'toprak-guvecte-kuzu-etli-sevket-i-bostan',
    name: 'Toprak Güveçte Kuzu Etli Şevketi Bostan',
    title: 'Geleneksel Terbiyeli Kuzu Etli Şevketi Bostan Güveci',
    category: 'Geleneksel Güveçler & Anadolu Kıyı Etleri',
    price: 980,
    formattedPrice: '980 ₺',
    description: 'Ege’nin en kadim kış otu şevketi bostan kökleri, lokum gibi kuzu döş kuşbaşı etleri, taş baskı zeytinyağı, yumurta sarısı ve taze limonla yapılan geleneksel terbiye sosunda.',
    attributes: {
      preparation: 'Kısık ateşte güveç buğulama ve yumurtalı limon terbiyesi',
      dietary: ['Glütensiz'],
      origin: 'Urla Doğal Florası & Tire Kuzusu',
      pairing: 'Kalecik Karası Gövdeli Kırmızı',
      servingSize: '300 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['şevketi-bostan', 'kuzu-eti', 'ege-klasiği', 'terbiyeli-güveç'],
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Toprak güveçte parlak sarı terbiyeli kuzu etli şevketi bostan yemeği ve taze dereotu',
    isSeasonal: true,
  },
  {
    id: 'rst-52',
    slug: 'ege-ordek-konfi-kuru-incir-soslu',
    name: 'Ege Ördek Konfi & Kuru İncir Sosu',
    title: 'Kendi Yağında Ağır Pişmiş Ördek Budu & Tire Kuru İncir Glazesı',
    category: 'Geleneksel Güveçler & Anadolu Kıyı Etleri',
    price: 1080,
    formattedPrice: '1.080 ₺',
    description: 'Kendi ördek yağında 6 saat baharatlarla konfi edilen çıtır derili ördek budu; Tire güneşte kurutulmuş incirleri ve tarçınlı kırmızı şarap indirgemesi, kereviz püresi üzerinde.',
    attributes: {
      preparation: '6 saat düşük ısıda ördek yağında konfi',
      dietary: ['Glütensiz'],
      origin: 'Ege Çiftlik Ördeği & Tire Dağ İnciri',
      pairing: 'Boğazkere & Öküzgözü Yıllanmış Kırmızı',
      servingSize: '290 g',
      temperature: 'Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['ördek-konfi', 'kuru-incir', 'tire', 'şarap-sosu'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    alt: 'Altın çıtır derili ördek budu, koyu renkli incir sosu ve beyaz kereviz püresi',
    isChefSpecial: true,
  },

  // -------------------------------------------------------------------------
  // Kategori 7: Mevsimlik Bostan & Yan Lezzetler (6 öğe)
  // -------------------------------------------------------------------------
  {
    id: 'rst-53',
    slug: 'firinlanmis-urla-bebek-patatesleri-kekik',
    name: 'Fırınlanmış Urla Bebek Patatesleri',
    title: 'Çifte Fırınlanmış Kabuklu Bebek Patates & Taze Dağ Kekiği',
    category: 'Mevsimlik Bostan & Yan Lezzetler',
    price: 280,
    formattedPrice: '280 ₺',
    description: 'Ödemiş sarı bebek patatesleri önce buharda yumuşatılır, ardından taş fırında taze dağ kekiği, sarımsak dişleri, iri deniz tuzu ve soğuk sıkım zeytinyağı ile çıtırlaştırılır.',
    attributes: {
      preparation: 'Çifte fırınlama ve taze kekik harmanlama',
      dietary: ['Glütensiz', 'Vejetaryen', 'Vegan'],
      origin: 'Ödemiş & Karaburun Dağları',
      pairing: 'Karasakız Roze',
      servingSize: '220 g',
      temperature: 'Çok Sıcak',
      spiceLevel: 'Yok',
    },
    tags: ['patates', 'dağ-kekiği', 'fırınlanmış', 'garnitür', 'vegan'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Döküm tavada çıtır kızarmış kabuklu bebek patatesler ve yeşil taze kekik yaprakları',
  },
  {
    id: 'rst-54',
    slug: 'sarimsakli-limonlu-cibez-kavurmasi',
    name: 'Sarımsaklı & Limonlu Cibez Kavurması',
    title: 'Hızlı Tavada Sotelenmiş Körpe Cibez Otu, Sarımsak & Limon',
    category: 'Mevsimlik Bostan & Yan Lezzetler',
    price: 310,
    formattedPrice: '310 ₺',
    description: 'Kış lahana ve brokoli filizi olan taze cibez otları, kızgın zeytinyağında ince dilim sarımsakla 2 dakika canlılığını kaybetmeden sotelenir; taze sıkılmış limon suyu ve pul biber.',
    attributes: {
      preparation: 'Hızlı wok usulü zeytinyağında sote',
      dietary: ['Glütensiz', 'Vejetaryen', 'Vegan'],
      origin: 'Urla Köy Pazarı',
      pairing: 'Bornova Misketi Sek Beyaz',
      servingSize: '170 g',
      temperature: 'Ilık',
      spiceLevel: 'Hafif',
    },
    tags: ['cibez', 'ege-otu', 'sarımsaklı', 'tava-sote', 'vegan'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    alt: 'Canlı yeşil cibez yaprakları, kızarmış sarımsak dilimleri ve parıldayan zeytinyağı',
    isSeasonal: true,
  },
  {
    id: 'rst-55',
    slug: 'koz-koy-biberleri-karahayit-loru',
    name: 'Meşe Közü Köy Biberleri & Taze Lor',
    title: 'Közlenmiş Renkli Kapya Biberleri, Koruk Sirkesi & Taze Lor Peyniri',
    category: 'Mevsimlik Bostan & Yan Lezzetler',
    price: 290,
    formattedPrice: '290 ₺',
    description: 'Meşe odunu közünde kabuğu yakılıp soyulan kırmızı ve sarı köy kapya biberleri; koruk sirkesi, sızma zeytinyağı marine sosu, taze keçi loru öbeği ve taze fesleğen yaprakları ile.',
    attributes: {
      preparation: 'Doğrudan köz üzerinde pişirme ve sirke marine',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Urla Bostanları & Karahayıt Mandırası',
      pairing: 'Kalecik Karası Roze',
      servingSize: '190 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['köz-biber', 'keçi-loru', 'fesleğen', 'koruk-sirkesi'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Şerit halinde közlenmiş parlak kırmızı biberler ve üzerinde taze beyaz lor peyniri',
  },
  {
    id: 'rst-56',
    slug: 'haslama-yabani-radika-eksi-koruk',
    name: 'Haşlama Yabani Radika & Ekşi Koruk',
    title: 'Urla Dağlarından Yabani Radika Otu, Taş Değirmen Yağ & Koruk',
    category: 'Mevsimlik Bostan & Yan Lezzetler',
    price: 300,
    formattedPrice: '300 ₺',
    description: 'Urla yamaçlarından toplanmış diri yabani radika yaprakları buharda canlı yeşil renkte pişirilir; taş değirmen soğuk sıkım zeytinyağı, ezilmiş sarımsak ve Urla koruk suyu ile harmanlanır.',
    attributes: {
      preparation: 'Hafif buharda şok haşlama',
      dietary: ['Glütensiz', 'Vejetaryen', 'Vegan'],
      origin: 'Urla Dağları',
      pairing: 'Çeşme Narince Sek Beyaz',
      servingSize: '180 g',
      temperature: 'Ilık',
      spiceLevel: 'Yok',
    },
    tags: ['radika', 'yabani-ot', 'koruk', 'şifa', 'vegan'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Zümrüt yeşili haşlanmış radika yaprakları, sarımsaklı parlak zeytinyağı sosu ile',
    isSeasonal: true,
  },
  {
    id: 'rst-57',
    slug: 'eski-cesit-bostan-domatesleri-sogan',
    name: 'Eski Çeşit Bostan Domatesleri Salata',
    title: 'Geleneksel Pembe & Sarı Bostan Domatesleri, Kırmızı Soğan & Fesleğen',
    category: 'Mevsimlik Bostan & Yan Lezzetler',
    price: 340,
    formattedPrice: '340 ₺',
    description: 'Tohumu korunmuş pembe domates, sarı armut domates ve siyah domates dilimleri; koruk suyunda ovulmuş tatlı kırmızı soğan halkaları, taze mor fesleğen ve tuzlu lor peyniri kırıntıları.',
    attributes: {
      preparation: 'Çiğ kesim ve anlık marine',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Urla Yerel Tohum Bostanı',
      pairing: 'Çalkarası Pembe Şarap',
      servingSize: '240 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['bostan-domatesi', 'pembe-domates', 'fesleğen', 'ata-tohum'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    alt: 'Farklı renklerde kalın dilimlenmiş sulu bostan domatesleri, mor fesleğen ve kırmızı soğan',
    isSeasonal: true,
  },
  {
    id: 'rst-58',
    slug: 'kozde-sakiz-enginari-canagi-aioli',
    name: 'Közde Sakız Enginarı Çanağı & Sarımsak Aioli',
    title: 'Kömürde Tütsülenmiş Sakız Enginarı Çanağı & Limonlu Zeytinyağı Aiolisi',
    category: 'Mevsimlik Bostan & Yan Lezzetler',
    price: 320,
    formattedPrice: '320 ₺',
    description: 'Bütün sakız enginarı közde dış yaprakları yanana dek tütsülenir; soyulan enginar çanağı odun ateşinde 1 dakika daha çevrilir, yanında taze sarımsaklı ve limon kabuklu zeytinyağı aiolisi.',
    attributes: {
      preparation: 'Közde tütsüleme ve fırçalama',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Urla Yağcılar Köyü',
      pairing: 'Sauvignon Blanc 2023',
      servingSize: '160 g',
      temperature: 'Ilık',
      spiceLevel: 'Hafif',
    },
    tags: ['köz-enginar', 'aioli', 'sarımsak', 'tütsülenmiş-çanak'],
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
    alt: 'Odun közünden çıkmış dumanı tüten enginar çanağı ve seramik kasede sarımsaklı beyaz aioli',
  },

  // -------------------------------------------------------------------------
  // Kategori 8: Zanaatkar Tatlılar & Yerel Peynir Tabağı (6 öğe)
  // -------------------------------------------------------------------------
  {
    id: 'rst-59',
    slug: 'cesme-damla-sakizli-firin-sutlac',
    name: 'Damla Sakızlı Taş Fırın Sütlacı',
    title: 'Çeşme Damla Sakızlı Keçi Sütü Sütlacı & Kavrulmuş Badem Kıtırı',
    category: 'Zanaatkar Tatlılar & Yerel Peynir Tabağı',
    price: 320,
    formattedPrice: '320 ₺',
    description: 'Günlük taze keçi ve manda sütü, yerel kırık pirinç, gerçek Çeşme damla sakızı rayihası; taş fırında üzeri koyu karamel kabuk bağlayana dek pişirilir, yanında kavrulmuş Datça bademleri.',
    attributes: {
      preparation: 'Taş fırında üstten harlı fırınlama',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Çeşme Sakız Koruluğu & Urla Mandırası',
      pairing: 'Geç Hasat Bornova Misketi Tatlı Şarap',
      servingSize: '180 g',
      temperature: 'Ilık veya Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['sütlaç', 'damla-sakızı', 'keçi-sütü', 'taş-fırın', 'tatlı'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    alt: 'Toprak güveçte üzeri koyu yanık karamel kabuklu damla sakızlı fırın sütlaç',
    isChefSpecial: true,
  },
  {
    id: 'rst-60',
    slug: 'aydin-kara-incir-tatlisi-manda-kaymagi',
    name: 'Kara İncir Tatlısı & Manda Kaymağı',
    title: 'Aydın Dağ İnciri Tatlısı, Karanfil Şerbeti & Günlük Manda Kaymağı',
    category: 'Zanaatkar Tatlılar & Yerel Peynir Tabağı',
    price: 350,
    formattedPrice: '350 ₺',
    description: 'Güneşte kurutulmuş Aydın ballı kara incirleri karanfil, tarçın çubuğu ve ceviz içiyle doldurularak ağır ateşte demlenir; günlük taze Tire manda kaymağı ve taze nane filizleriyle sunulur.',
    attributes: {
      preparation: 'Kısık ateşte baharatlı şerbette demleme',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Aydın Germencik & Tire Manda Çiftliği',
      pairing: 'Rezerv Öküzgözü Tatlı Likör Şarap',
      servingSize: '190 g',
      temperature: 'Ilık',
      spiceLevel: 'Yok',
    },
    tags: ['incir-tatlısı', 'manda-kaymağı', 'aydın', 'karanfil'],
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80',
    alt: 'Şerbeti parıldayan doldurulmuş kuru incir tatlısı, üzerinde kalın beyaz manda kaymağı',
  },
  {
    id: 'rst-61',
    slug: 'erkence-zeytinyagli-bitter-cikolatali-mousse',
    name: 'Zeytinyağlı Bitter Çikolatalı Mousse',
    title: '%70 Bitter Çikolata Mousse, Erkence Zeytinyağı & Deniz Tuzu',
    category: 'Zanaatkar Tatlılar & Yerel Peynir Tabağı',
    price: 380,
    formattedPrice: '380 ₺',
    description: '%70 kakao oranlı bitter çikolatadan hazırlanan ipeksi mousse, fıstık yeşili taze Erkence zeytinyağı damlaları, Maldon pul deniz tuzu kristalleri ve çıtır fındıklı ince tuil ile servis edilir.',
    attributes: {
      preparation: 'Soğuk havalandırma mousse & tuz/yağ dengesi',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Urla Erkence Hasadı & Zanaatkar Çikolata',
      pairing: 'Boğazkere Fortifiye Şarap',
      servingSize: '140 g',
      temperature: 'Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['çikolata-mousse', 'zeytinyağı', 'deniz-tuzu', 'modern-tatlı'],
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80',
    alt: 'Koyu renkli parlak çikolata mousse quenelle, parıldayan yeşil zeytinyağı ve tuz kristalleri',
    isChefSpecial: true,
  },
  {
    id: 'rst-62',
    slug: 'lor-tatlisi-bodrum-mandalina-serbeti',
    name: 'Fırınlanmış Taze Lor Tatlısı & Mandalina',
    title: 'Ayvalık Taze Keçi Loru Tatlısı & Bodrum Mandalinası Şerbeti',
    category: 'Zanaatkar Tatlılar & Yerel Peynir Tabağı',
    price: 310,
    formattedPrice: '310 ₺',
    description: 'Ayvalık taze tatlı keçi loru ve irmikle fırınlanan hafif kabarmış lor keki, coğrafi işaretli Bodrum mandalinası kabuğu ve taze sıkılmış suyundan hazırlanan hafif şerbet ile ıslatılır.',
    attributes: {
      preparation: 'Fırında hafif pişirim ve soğuk narenciye şerbetleme',
      dietary: ['Vejetaryen'],
      origin: 'Ayvalık Mandırası & Bodrum Ortakent',
      pairing: 'Bodrum Mandalina Likörü İnfüzyonu',
      servingSize: '160 g',
      temperature: 'Ilık',
      spiceLevel: 'Yok',
    },
    tags: ['lor-tatlısı', 'bodrum-mandalinası', 'narenciye-şerbet', 'hafif-tatlı'],
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80',
    alt: 'Altın renkli yumuşak lor tatlısı keki, üzerinde taze mandalina kabuğu şeritleri',
    isSeasonal: true,
  },
  {
    id: 'rst-63',
    slug: 'zanaatkar-ege-peynirleri-tabagi',
    name: 'Zanaatkar Ege Peynirleri Seçkisi',
    title: 'Gömme Bergama Tulumu, Karahayıt Keçi, İsli Sepet & Olgun Ezine',
    category: 'Zanaatkar Tatlılar & Yerel Peynir Tabağı',
    price: 540,
    formattedPrice: '540 ₺',
    description: 'Toprak altında 14 ay dinlendirilmiş Bergama tulumu, taze Karahayıt keçi peyniri, meşe odununda hafif islenmiş Cunda sepet peyniri ve 18 aylık Ezine koyun peyniri; dağ inciri reçeli ve çıtır ekşi maya kıtırları ile.',
    attributes: {
      preparation: 'Oda sıcaklığında zanaatkar olgunlaştırma',
      dietary: ['Glütensiz', 'Vejetaryen'],
      origin: 'Bergama, Çanakkale, Cunda & Tire',
      pairing: 'Yıllanmış Kırmızı Şarap veya Rezerv Sek Beyaz',
      servingSize: '220 g - Paylaşımlık Seçki',
      temperature: 'Oda Sıcaklığı',
      spiceLevel: 'Yok',
    },
    tags: ['peynir-tabağı', 'bergama-tulumu', 'ezine', 'isli-sepet', 'şarap-eşlikçisi'],
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=1200&q=80',
    alt: 'Zeytin ağacı tahtasında dilimlenmiş zanaatkar Ege peynirleri, ceviz ve incir reçeli',
    isChefSpecial: true,
  },
  {
    id: 'rst-64',
    slug: 'tire-karadutu-urla-lavantali-sorbe',
    name: 'Tire Karadutu & Urla Lavantalı Sorbe',
    title: 'Doğal Tire Dağ Karadutu Meyvesi & Taze Urla Lavantalı Buz Sorbe',
    category: 'Zanaatkar Tatlılar & Yerel Peynir Tabağı',
    price: 290,
    formattedPrice: '290 ₺',
    description: 'Doğal şekerini koruyan yabani Tire karadutu püresi, taze demlenmiş Urla lavanta çiçeği suyu ve birkaç damla koruk ekşisiyle dondurulmuş ferahlatıcı el yapımı sorbe; çıtır bademli tuil ile.',
    attributes: {
      preparation: 'Geleneksel buz sorbe makinesinde pürüzsüz çekim',
      dietary: ['Glütensiz', 'Vejetaryen', 'Vegan', 'Süt Ürünsüz'],
      origin: 'Tire Dağ Köyleri & Urla Lavanta Tarlaları',
      pairing: 'Misket Köpüklü Şarap',
      servingSize: '2 Top (130 g)',
      temperature: 'Buz Gibi Soğuk',
      spiceLevel: 'Yok',
    },
    tags: ['sorbe', 'karadut', 'lavanta', 'vegan', 'ferahlatıcı'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cam kasede koyu mor renkli karadut sorbe topları, üzerinde mor lavanta çiçeği taneleri',
    isSeasonal: true,
  },
];

// ---------------------------------------------------------------------------
// TYPES.TS İLE TAM UYUMLU KATALOG ÖĞELERİ
// ---------------------------------------------------------------------------

export const catalogItems: MenuItem[] = restaurantMenuItems.map((item) => {
  let course: MenuItem['course'] = 'Başlangıç';
  if (
    item.category === 'Odun Ateşi & Izgara Balıklar' ||
    item.category === 'Geleneksel Güveçler & Anadolu Kıyı Etleri'
  ) {
    course = 'Ana Yemek';
  } else if (
    item.category === 'Sıcak Başlangıçlar & Ara Sıcaklar' ||
    item.category === 'Kıyı Taş Fırını & Zanaatkar Hamurlar'
  ) {
    course = 'Ara Sıcak';
  } else if (item.category === 'Zanaatkar Tatlılar & Yerel Peynir Tabağı') {
    course = 'Tatlı';
  }

  const dietaryBadges: MenuItem['dietaryBadges'] = [];
  if (item.attributes.dietary.includes('Vejetaryen')) dietaryBadges.push('Vejetaryen');
  if (item.attributes.dietary.includes('Glütensiz')) dietaryBadges.push('Glütensiz');
  if (
    item.attributes.dietary.includes('Deniz Ürünü') ||
    item.attributes.dietary.includes('Kabuklu Deniz Ürünü')
  ) {
    dietaryBadges.push('Deniz Mahsulü');
  }
  dietaryBadges.push('Yerel Üretim');

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: item.category,
    price: {
      amount: item.price,
      currency: 'TRY',
      qualifier: 'kdv dahil',
    },
    description: item.description,
    attributes: {
      hazirlanis: item.attributes.preparation,
      mensei: item.attributes.origin,
      sarapEslesmesi: item.attributes.pairing,
      porsiyon: item.attributes.servingSize,
      sicaklik: item.attributes.temperature,
      aciSeviyesi: item.attributes.spiceLevel || 'Yok',
      diyet: item.attributes.dietary,
    },
    tags: item.tags,
    image: {
      url: item.image,
      alt: item.alt,
    },
    isAvailable: true,
    isFeatured: item.isChefSpecial ?? false,
    course,
    origin: item.attributes.origin,
    allergens: item.attributes.dietary.filter(
      (d) => d.includes('Deniz Ürünü') || d.includes('Glüten') || d.includes('Kabuklu')
    ),
    pairingRecommendation: item.attributes.pairing,
    preparationStyle: item.attributes.preparation,
    dietaryBadges,
  };
});

// ---------------------------------------------------------------------------
// KATEGORİ TANIMLARI (8 Kategori, Toplam 64 Öğe)
// ---------------------------------------------------------------------------

export const restaurantCategories: RestaurantCategory[] = [
  {
    id: 'soguk-mezeler',
    name: 'Soğuk Mezeler & Bostan Zeytinyağlıları',
    description: 'Urla sakız enginarı, yabani Ege otları, taş baskı soğuk sıkım zeytinyağları ve günlük taze mandıra loruyla hazırlanan kadim Ege başlangıçları.',
    itemCount: 10,
    icon: 'Salad',
  },
  {
    id: 'cig-kiyi',
    name: 'Çiğ Kıyı & Deniz Mahsulleri',
    description: 'Çeşme ve Foça oltacı balıkçılarından günübirlik gelen sinarit, dülger, akya ve kırmızı karideslerin narenciye ve adaçayı asitlerinde çiğ yorumları.',
    itemCount: 8,
    icon: 'Fish',
  },
  {
    id: 'sicak-baslangiclar',
    name: 'Sıcak Başlangıçlar & Ara Sıcaklar',
    description: 'Meşe kömüründe tütsülenmiş ahtapot kolu, çıtır kalamar tavaları, tereyağlı balık yanakları ve güveçte kızdırılan deniz kabukluları.',
    itemCount: 10,
    icon: 'Flame',
  },
  {
    id: 'tas-firin-hamurlar',
    name: 'Kıyı Taş Fırını & Zanaatkar Hamurlar',
    description: 'Karakılçık buğdayı ekşi mayasıyla 48 saat fermente edilen çıtır pideler, sübye mürekkepli taze erişteler ve kuzu gerdanlı ev mantıları.',
    itemCount: 8,
    icon: 'Wheat',
  },
  {
    id: 'odun-atesi-baliklar',
    name: 'Odun Ateşi & Izgara Balıklar',
    description: 'Zeytin ve meşe odununda harlı közle mühürlenen vahşi levrek, lahoz, kalkan ve fener balığı takozları; koruk suyu ve taş değirmen emülsiyonlarıyla.',
    itemCount: 10,
    icon: 'Waves',
  },
  {
    id: 'anadolu-kiyi-etleri',
    name: 'Geleneksel Güveçler & Anadolu Kıyı Etleri',
    description: 'Taş fırında 8 ila 10 saat ağır ateşte pişen kıvırcık kuzu incikleri, Ödemiş dana yanağı güveçleri ve yayla oğlak tandırları.',
    itemCount: 6,
    icon: 'UtensilsCrossed',
  },
  {
    id: 'mevsimlik-bostan',
    name: 'Mevsimlik Bostan & Yan Lezzetler',
    description: 'Restoranımızın Yağcılar bostanından günlük toplanan taze cibez, yabani radika, közlenmiş renkli köy biberleri ve çifte fırın bebek patatesler.',
    itemCount: 6,
    icon: 'Leaf',
  },
  {
    id: 'zanaatkar-tatlilar',
    name: 'Zanaatkar Tatlılar & Yerel Peynir Tabağı',
    description: 'Çeşme damla sakızlı fırın sütlaç, Aydın kara inciri tatlısı, zeytinyağlı bitter mousse ve Bergama gömme tulumlu zanaatkar peynir seçkisi.',
    itemCount: 6,
    icon: 'CakeSlice',
  },
];

// ---------------------------------------------------------------------------
// FİLTRELEME METAVERİLERİ
// ---------------------------------------------------------------------------

export const restaurantFilterOptions: RestaurantFilterOptions = {
  categories: restaurantCategories.map((c) => ({ id: c.id, name: c.name })),
  dietary: [
    'Glütensiz',
    'Vejetaryen',
    'Vegan',
    'Deniz Ürünü',
    'Kabuklu Deniz Ürünü',
    'Süt Ürünsüz',
  ],
  cookingTechniques: [
    'Zeytin Odunu Ateşi & Izgara',
    'Taş Fırın & 48 Saat Fermente Hamur',
    'Ağır Ateşte Düşük Isı Konfi & Güveç',
    'Çiğ Marine & Narenciye Asidinde Pişirim',
    'Taş Değirmende Ezme & Dövme',
    'Soğuk Tütsüleme & Meşe Dumanı',
  ],
  origins: [
    'Urla Yağcılar Köyü & Bostanları',
    'Karaburun Balıkçı Kooperatifi',
    'Çeşme Boğazı & Alaçatı Kıyıları',
    'Foça Açıkları & Babakale',
    'Ayvalık & Cunda Kıyıları',
    'Bodrum Yarımadası & Gümüşlük',
    'Tire & Bergama Mandıraları',
  ],
  priceRanges: [
    { label: '300 ₺ - 500 ₺ (Başlangıç ve Bostan)', min: 300, max: 500 },
    { label: '500 ₺ - 900 ₺ (Ara Sıcak ve Zanaatkar Hamur)', min: 500, max: 900 },
    { label: '900 ₺ - 1.500 ₺ (Güveç ve Kıyı Etleri)', min: 900, max: 1500 },
    { label: '1.500 ₺ ve Üzeri (İmza Deniz Balıkları & Ziyafet)', min: 1500, max: 3000 },
  ],
};

// ---------------------------------------------------------------------------
// RESTORAN KİMLİĞİ VE İLETİŞİM BİLGİLERİ (sites.ts ile uyumlu)
// ---------------------------------------------------------------------------

export const restaurantMetadata: RestaurantMetadata = {
  brandName: 'Mola Kıyı Restoranı',
  tagline: 'Kuzey Ege Taş İskelelerinde Çağdaş Anadolu Kıyı Gastronomisi',
  concept: 'Çağdaş Anadolu Kıyı Mutfağı & Mikro-Mevsimsel Gastronomi',
  locationName: 'Mithatpaşa Mahallesi, Cunda İskelesi, Ayvalık & Urla Şubesi',
  address: {
    street: '15 Eylül Caddesi No: 42, Cunda / Karantina Koyu Mevkii No: 18',
    district: 'Ayvalık & Urla İskele',
    city: 'Balıkesir & İzmir',
    country: 'Türkiye',
    postalCode: '10405',
  },
  contact: {
    phone: '+90 (266) 327 19 82',
    email: 'bilgi@molakiyi.com',
    reservationEmail: 'rezervasyon@molakiyi.com',
  },
  hours: {
    days: 'Salı - Pazar (Pazartesi Günleri Dinlenme ve Bostan Bakımı)',
    lunch: '12:30 - 15:30 (Öğle Servisi & Kıyı Atıştırmalıkları)',
    dinner: '18:30 - 23:45 (Akşam Servisi & İki Oturumlu Tadım Menüsü)',
    closed: 'Pazartesi günleri kapalıdır.',
  },
  features: [
    'Sıfır Kilometre Zanaatkar Balıkçı Ağı',
    'Kendi Permakültür Bostanı (Yağcılar & Kozak Yaylası)',
    'Taş Kemerli Şarap Mahzeni (650+ Yerli ve Akdeniz Etiketi)',
    'Açık Mutfak & 12 Kişilik Mermer Şef Masası',
    'Ege Günbatımı Terası & Rüzgar Korunaklı Masalar',
    'Asırlık Zeytin Ağaçlı Sessiz İç Avlu',
  ],
};

// ---------------------------------------------------------------------------
// ŞEF PROFİLİ VE MUTFAK FELSEFESİ
// ---------------------------------------------------------------------------

export const chefProfile: ChefProfile = {
  name: 'Şef Kaya Eren & Şef Nil Deniz Dağhan',
  role: 'Mutfak Direktörleri & Kurucu Ortaklar',
  bio: 'Urla doğumlu Şef Kaya Eren, Akdeniz kıyılarında ve Bask bölgesindeki Michelin yıldızlı mutfaklarda geçirdiği on iki yıllık deneyimin ardından memleketine dönerek Anadolu kıyı mirasını çağdaş tekniklerle buluşturdu. Mutfak ortağı Şef Nil Deniz Dağhan ise gıda antropolojisi ve Ege yabani florası üzerine yürüttüğü saha araştırmalarını restoranın mevsimsel menü ritmine taşıyor. İkili, Urla Yağcılar Köyü’ndeki 18 dönümlük aile zeytinliğinde kurdukları permakültür bostanında tohumdan tabağa uzanan döngüsel bir mutfak modelini yönetiyor.',
  quote: 'Ege mutfağı süslü tekniklerin değil; taze dalından koparılmış bir enginarın, birkaç saat önce denizden çıkmış dülger balığının ve taş baskı soğuk sıkım bir damla zeytinyağının samimiyetidir. Biz tabağa yeni bir şey eklemiyoruz; doğanın zaten kusursuz yarattığı tadın üzerindeki fazlalıkları temizliyoruz.',
  image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80',
  alt: 'Şef Kaya Eren ve Şef Nil Deniz, açık mutfakta odun ateşi tezgahı önünde tabak tamamlarken',
  philosophyPoints: [
    {
      title: '1. Sıfır Kilometre Tedarik & Zanaatkar Dayanışması',
      description: 'Balıklarımızı toptancılardan değil; Karaburun, Urla ve Foça’daki tekne sahibi küçük zanaatkar balıkçılardan doğrudan karşılıyoruz. Ağ balığı yerine sadece olta ve paraketa avcılığını destekliyoruz.',
    },
    {
      title: '2. Mikro-Mevsimsellik & Bostan Ritmi',
      description: 'Menümüz yılda 4 kez değil; haftalık olarak bostanın bize sunduğu hasada göre değişir. Sakız enginarının ilk çanağı çıktığında farklı, kartlaşmaya başladığında yapraklarıyla farklı teknikler uygularız.',
    },
    {
      title: '3. Ateş, Taş ve Fermantasyon',
      description: 'Mutfakta doğalgaz veya elektrikli fritöz kullanmıyoruz. Isı kaynağımız yöresel kurutulmuş meşe ve zeytin budama odunlarıdır. Soslarımızın derinliği ise kendi kurduğumuz balık garumları ve narenciye fermantasyonlarından gelir.',
    },
  ],
  accolades: [
    'Gault & Millau Türkiye 2024 - Yılın Kıyı Restoranı & 3 Toque Ödülü',
    'Michelin Rehberi Türkiye Seçkisi - Sommelier & Yeşil Yıldız Vizyon Ödülü',
    'İzmir Gastronomi Derneği - Geleneksel Tohum ve Yerel Üretici Koruma Beratı',
    'World’s 50 Best Discovery List - Doğu Akdeniz Bölge Seçkisi 2024',
  ],
};

// ---------------------------------------------------------------------------
// HİKAYEMİZ & TERROIR ORTAKLARIMIZ
// ---------------------------------------------------------------------------

export const restaurantStory: RestaurantStory = {
  title: 'Toprak, Taş ve Tuzlu Su: Urla ve Cunda Kıyısında Bir Mutfak Manifestosu',
  leadParagraph: 'Mola Kıyı Restoranı, Karantina ve Cunda kıyılarındaki eski bir taş tuz deposunun aslına sadık kalınarak restore edilmesiyle kuruldu. Duvarlarımızdaki 140 yıllık andezit ve sarımsak taşları, Ege’nin tuzu ve rüzgarıyla yoğrulmuş bin yıllık bir kıyı medeniyetinin sessiz tanıklarıdır.',
  sections: [
    {
      heading: 'Kadim İonia’dan Bugüne Kıyı Gastronomisi',
      body: 'Urla Yarımadası ve Cunda Boğazı, antik Klazomenai kentinden bu yana dünyanın en eski zeytinyağı işliklerine ev sahipliği yapmaktadır. Biz bu topraklarda sadece bir restoran işletmiyoruz; zeytin ağacının gölgesinde şekillenmiş, deniz tuzunun şifasıyla kurutulmuş ve yabani otların bilgeliğiyle zenginleşmiş bir yaşam biçimini bugünün mutfak teknolojisiyle geleceğe aktarıyoruz.',
    },
    {
      heading: 'Yağcılar Bostanı: Kendi Döngümüzü Yaratmak',
      body: 'Restorana yalnızca 14 kilometre uzaklıkta bulunan Yağcılar Köyü’ndeki bostanımızda hiçbir kimyasal gübre veya tarım ilacı kullanmıyoruz. Restoran mutfağımızdan çıkan organik atıklar kompost haline getirilerek tekrar toprağımıza dönüyor. Sabah saat 06:00’da toplanan kabak çiçekleri, radikalar ve sakız enginarları saat 12:30’da öğle servisindeki masalarınıza ulaşıyor.',
    },
    {
      heading: 'Sıfır Atık Deniz Etiği',
      body: 'Restoranımıza gelen her balığın sadece filetosunu değil; kafasını çorba ve glace için, kemiklerini derin aromalı balık sosları için, derisini çıtır cipsler için ve karaciğerini zanaatkar mezelerimiz için değerlendiriyoruz. Denize olan saygımız, onun bize sunduğu her bir canlıyı ziyan etmeden onurlandırmayı gerektirir.',
    },
  ],
  terroirPartners: [
    {
      name: 'Hüseyin Kaptan (Tekne: Kısmet 35)',
      region: 'Karaburun Fener Kıyıları & Cunda Boğazı',
      product: 'Oltayla Avlanmış Vahşi Sinarit, Trança ve Levrek',
      note: '40 yıldır sadece paraketa ve olta yöntemiyle derin su balıkçılığı yapıyor; asla trol balığı kullanmıyoruz.',
    },
    {
      name: 'Salih & Meryem Çetin Aile İşliği',
      region: 'Urla Yağcılar Köyü & Ayvalık',
      product: 'Erkence ve Ayvalık Çeşidi Soğuk Sıkım Zeytinyağı',
      note: 'Taş değirmende 24°C altında sıkılan, asiditesi 0.2’yi geçmeyen polifenol zengini zeytinyağımız.',
    },
    {
      name: 'Karahayıt Mandırası (İsmail Usta)',
      region: 'Karahayıt Yaylası, Tire',
      product: 'Günlük Taze Keçi Loru ve 14 Aylık Çamur Peyniri',
      note: 'Yalnızca makiliklerde serbest otlayan yerli keçi sürülerinin bahar sütüyle mayalanır.',
    },
    {
      name: 'Emine Teyze ve Kadın Kooperatifi',
      region: 'Özbek Köyü, Urla & Kozak Yaylası',
      product: 'Yabani Kuşkonmaz, Şevketi Bostan, Radika ve Deniz Börülcesi',
      note: 'Sabah erken saatlerde köy sırtlarından ve tuzlu kıyı bataklıklarından elle toplanır.',
    },
  ],
  manifesto: [
    'Mevsimi olmayan hiçbir deniz canlısı veya bostan ürünü bu mutfağın kapısından içeri giremez.',
    'Kültür veya çiftlik balığı kullanılmaz; yalnızca sürdürülebilir yöntemlerle avlanmış yerli kıyı balıkları sunulur.',
    'Zeytinyağı tabağın kenar süsü değil; her yemeğin ana karakteri ve ruhudur.',
    'Her tabak, Ege’nin coğrafi hafızasına ve onu var eden köylüsüne, balıkçısına teşekkür eder.',
  ],
};

// ---------------------------------------------------------------------------
// REZERVASYON DETAYLARI VE POLİTİKALAR
// ---------------------------------------------------------------------------

export const reservationDetails: ReservationDetails = {
  title: 'Mola Masalarında Yeriniz',
  lead: 'Taş iskelenin akşam esintisinde, açık mutfağımızın odun ateşi sıcaklığında veya asırlık zeytin ağaçlarının gölgesinde unutulmaz bir kıyı ziyafeti için rezervasyon gereklidir.',
  seatingAreas: [
    {
      id: 'teras-karantina',
      name: 'Taş İskele & Günbatımı Terası',
      description: 'Körfez ve açık deniz manzarasına hakim, günbatımı saatlerinde gökyüzünün kızıla bürünüşünü izleyebileceğiniz rüzgar korumalı açık hava masaları.',
      capacity: '36 Kişi (Maksimum 6 kişilik masalar)',
      recommendedFor: 'Romantik akşam yemekleri ve günbatımı tadım seansları.',
    },
    {
      id: 'sef-masasi',
      name: 'Şef Masası & Açık Ateş Barı',
      description: 'Açık mutfağın ve zeytin odunu fırınının tam karşısında, Şef Kaya Eren ve ekibinin hazırlıklarını birebir izleyebileceğiniz 12 kişilik yüksek mermer tezgah.',
      capacity: '12 Kişi (Bireysel veya çift kişilik oturumlar)',
      recommendedFor: 'Tadım menüsü ve şef eşleşmeli gastronomi meraklıları.',
    },
    {
      id: 'avlu-zeytinlik',
      name: 'Zeytinlik İçi Sessiz Avlu',
      description: '140 yıllık taş duvarlarla çevrili, asırlık zeytin ve turunç ağaçlarının gölgesinde, çakıl taşlı zeminiyle samimi ve dingin Ege bahçesi ortamı.',
      capacity: '44 Kişi (Geniş aile ve dost masaları için uygun)',
      recommendedFor: 'Keyifli, uzun meze sohbetleri ve grup yemekleri.',
    },
    {
      id: 'tas-salon',
      name: 'Tarihi Kemerli Taş İç Salon',
      description: 'Kış ve bahar aylarında yanan açık şöminesi, yüksek tavanı ve akustiğiyle korunan tarihi tuz deposu atmosferi; iklimlendirilmiş konfor.',
      capacity: '40 Kişi',
      recommendedFor: 'Her mevsim konforlu ziyafetler ve özel davetler.',
    },
  ],
  sittings: [
    {
      session: 'Öğle Servisi (Gündüz & Bostan)',
      hours: '12:30 - 15:30',
      description: 'Alakart meze seçkileri, kıyı taş fırını çıtırları ve hafif ızgara balıkların servis edildiği sakin öğle seansı.',
    },
    {
      session: 'Akşam 1. Oturum (Günbatımı Oturumu)',
      hours: '18:30 - 21:00',
      description: 'Günbatımının renkleri eşliğinde başlayan, 7 aşamalı Bostan & Dalga tadım menüsü veya alakart akşam servisi.',
    },
    {
      session: 'Akşam 2. Oturum (Yıldızlı Gece Oturumu)',
      hours: '21:15 - 23:45',
      description: 'Gece denizinin dinginliği ve açık mutfak ateşinin eşliğinde uzun soluklu 9 aşamalı Derin Ege tadımı veya gece menüsü.',
    },
  ],
  policies: [
    {
      title: 'İptal ve Değişiklik Bildirimi',
      detail: 'Mevsimlik taze tedarik zincirimiz gereği, rezervasyon iptallerinin en geç 24 saat öncesinden bildirilmesini rica ederiz. 6 kişi üzeri grup rezervasyonlarında kredi kartı ön provizyonu uygulanır.',
    },
    {
      title: 'Diyet Kısıtlamaları & Alerjiler',
      detail: 'Tüm alerjen ve diyet tercihlerinizi (glütensiz, kabuklu deniz ürünü alerjisi, vejetaryen vb.) rezervasyon sırasında belirtmeniz halinde şeflerimiz menüyü memnuniyetle kişiselleştirir.',
    },
    {
      title: 'Çocuk Misafirler',
      detail: 'Restoranımız sakin gastronomi atmosferini korumak adına 10 yaş altı çocuk misafirlerimizi öğle servisinde ağırlamaktan memnuniyet duyar; akşam 2. oturumda yetişkin ortamı tercih edilmektedir.',
    },
    {
      title: 'Giyim Kodu (Dress Code)',
      detail: 'Smart Casual / Şık Rahat. Kıyı beldesi olmasına rağmen plaj kıyafeti, terlik ve kolsuz tişört ile akşam servisine kabul sağlanamamaktadır.',
    },
    {
      title: 'Mantar Ücreti (Kendi Şarabını Getir)',
      detail: 'Özel mahzeninizden getirmek istediğiniz şaraplar için şişe başı 650 ₺ mantar açma ve sommelier servis ücreti uygulanır (Maksimum 2 şişe).',
    },
  ],
};

// ---------------------------------------------------------------------------
// TADIM MENÜLERİ (2 Özel Deneyim)
// ---------------------------------------------------------------------------

export const tastingMenus: TastingMenu[] = [
  {
    id: 'bostan-ve-dalga',
    name: 'Bostan & Dalga: 7 Aşamalı Mevsim Tadımı',
    tagline: 'Urla toprağının bereketi ile Karaburun kıyılarının taze dalgaları arasında bir akşam yolculuğu.',
    price: 3400,
    formattedPrice: '3.400 ₺',
    winePairingPrice: 1950,
    formattedWinePairingPrice: '1.950 ₺',
    coursesCount: 7,
    description: 'Şef Kaya Eren’in Yağcılar bostanından günlük topladığı sebzeler ve yerel balıkçıların sabah oltasıyla kurgulanan dengeli, taze ve çağdaş bir Ege gastronomisi özeti.',
    courses: [
      {
        courseNumber: 1,
        courseName: 'Karşılama & Amuse-Bouche',
        dishName: 'Fermente Domates Suyu, Fesleğen & Çıtır Kabak Çiçeği',
        description: 'Buzlu pembe domates consommé shotu ve çıtır kızarmış lor dolgulu minik kabak çiçeği lokması.',
        winePairing: 'Yaşasın Doğal Köpüklü Kalecik Karası Brut 2022',
      },
      {
        courseNumber: 2,
        courseName: 'Çiğ Kıyı Başlangıcı',
        dishName: 'Sinarit Crudo & Bodrum Mandalinası Emülsiyonu',
        description: 'Çeşme Boğazı oltayla tutulmuş sinarit dilimleri, mandalina vinegret ve tuz pulları.',
        winePairing: 'Urla Bornova Misketi Sek 2023',
      },
      {
        courseNumber: 3,
        courseName: 'Bostan Zeytinyağlısı',
        dishName: 'Urla Sakız Enginarı Kalbi & Taze Bakla Püresi',
        description: 'Erkence zeytinyağında demlenmiş enginar çanağı, dereotu yağı ve çıtır bakla kabukları.',
        winePairing: 'Çeşme Narince 2023',
      },
      {
        courseNumber: 4,
        courseName: 'Hamur & Deniz',
        dishName: 'Mürekkepli Taze Erişte & Körfez Karidesi Bisque',
        description: 'Sübye mürekkebiyle yoğrulmuş el yapımı makarna, yoğun karides kabuğu sosu ve taze adaçayı.',
        winePairing: 'Urla Sauvignon Blanc Fıçı Seçkisi 2022',
      },
      {
        courseNumber: 5,
        courseName: 'Odun Ateşinden Ana Tabak',
        dishName: 'Zeytin Kömüründe Kaya Dülgeri & Deniz Börülcesi',
        description: 'Çıtır mühürlenmiş dülger filetosu, kadifemsi enginar püresi ve koruk suyu vinegret.',
        winePairing: 'Chardonnay & Narince Rezerv 2021',
      },
      {
        courseNumber: 6,
        courseName: 'Damak Temizleyici',
        dishName: 'Tire Karadutu & Urla Lavantalı Kar Sorbesi',
        description: 'Yabani karadut püresi ve taze lavanta çiçeği infüzyonlu ferahlatıcı buz dokunuşu.',
        winePairing: 'Karasakız Roze Köpüklü',
      },
      {
        courseNumber: 7,
        courseName: 'Tatlı Bitiş',
        dishName: 'Çeşme Damla Sakızlı Taş Fırın Sütlacı & Badem Tuil',
        description: 'Taş fırında üstten nar gibi kızartılmış koyun sütü sütlacı ve Datça çıtır bademleri.',
        winePairing: 'Urla Geç Hasat Bornova Misketi 2021',
      },
    ],
  },
  {
    id: 'derin-ege-mirasi',
    name: 'Derin Ege Mirası: 9 Aşamalı Şef İmzası',
    tagline: 'Antik Klazomenai işliklerinden 140 yıllık tuz deposuna uzanan en radikal kıyı ziyafeti.',
    price: 4600,
    formattedPrice: '4.600 ₺',
    winePairingPrice: 2800,
    formattedWinePairingPrice: '2.800 ₺',
    coursesCount: 9,
    description: 'Sadece 12 kişilik Şef Masası ve özel rezervasyonlar için hazırlanan; kurutulmuş garumlar, meşe dumanı, derin su trançaları ve sakatat eşleşmeleriyle zenginleşen radikal bir tadım.',
    courses: [
      {
        courseNumber: 1,
        courseName: 'Açılış Ritüeli',
        dishName: 'Zeytinyağı Tadımı & Taş Fırından Sıcak Focaccia',
        description: 'Erkence, Ayvalık ve Memecik çeşitlerinden 3 farklı tek hasat zeytinyağı ve taze ekmek.',
        winePairing: 'Şampanya Metodu Brut Nature Yerli Köpüklü',
      },
      {
        courseNumber: 2,
        courseName: 'Kabuklu Deniz Mahsulü',
        dishName: 'Canlı Ayvalık İstiridyesi & Koruk Mignonette',
        description: 'Maden Adası açıklarından canlı açılan istiridye, arpacık soğan ve dağ kekiği damlası.',
        winePairing: 'Emir Kapadokya Doğal Köpüklü',
      },
      {
        courseNumber: 3,
        courseName: 'Derin Su Çiğ Tabağı',
        dishName: 'Trança Balığı Carpaccio, Yabani Nar & Fındık',
        description: 'Derin su trançası tül dilimleri, 8 yıllık zeytin balsamiki ve çıtır kavrulmuş fındık.',
        winePairing: 'Hasandede & Emir Fıçı Beyaz 2022',
      },
      {
        courseNumber: 4,
        courseName: 'Meşe Ateşi & Duman',
        dishName: 'İsli Ahtapot Kolu & Tütsü Patates Kreması',
        description: 'Meşe kömüründe karamelize ahtapot, füme sarı patates püresi ve acı biber çıtırı.',
        winePairing: 'Karasakız Bozcaada Yaşlı Bağlar 2021',
      },
      {
        courseNumber: 5,
        courseName: 'Anadolu Sakatat Dokunuşu',
        dishName: 'Taş Fırında Uykuluk & Kuzu Kokoreç Lokması',
        description: 'Kıvırcık kuzu uykuluğu, köz domates konfi ve sumaklı taze lavaş parçası üzerinde.',
        winePairing: 'Kalecik Karası Ankara Bağları Rezerv',
      },
      {
        courseNumber: 6,
        courseName: 'Büyük Deniz Balığı',
        dishName: 'Odun Fırınında Kuzey Ege Kalkanı & Tarhunlu Tereyağı',
        description: 'Saros kalkanı kalın dilimi, tarhun otlu sıcak tereyağı ve fırınlanmış taze arpacık soğan.',
        winePairing: 'Chardonnay Meşe Fıçıda Dinlendirilmiş 2020',
      },
      {
        courseNumber: 7,
        courseName: 'Zanaatkar Peynir Eşleşmesi',
        dishName: '14 Aylık Bergama Göbek Tulumu & Dağ İnciri Ezmesi',
        description: 'Kaya mahzeninde olgunlaştırılmış gömme tulum, taze kekikli incir marmelatı ve ceviz.',
        winePairing: 'Öküzgözü & Boğazkere Elazığ Rezerv 2019',
      },
      {
        courseNumber: 8,
        courseName: 'Buzlu Geçiş',
        dishName: 'Bodrum Mandalinası Granita & Çeşme Damla Sakızı Jeli',
        description: 'Kaba kristal mandalina granitası, şeffaf sakız jeli ve taze nane tozu.',
        winePairing: 'Misket Likör Şarabı',
      },
      {
        courseNumber: 9,
        courseName: 'Final Tatlısı',
        dishName: 'Erkence Zeytinyağlı Bitter Mousse & Deniz Tuzu',
        description: '%70 bitter Valrhona çikolata, meyvemsi zeytinyağı göleti ve Maldon deniz tuzu kristalleri.',
        winePairing: 'Porto Stili Boğazkere Tatlı Şarap',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// YARDIMCI SORGULAMA FONKSİYONLARI
// ---------------------------------------------------------------------------

export function getMenuItemBySlug(slug: string): RestaurantMenuItem | undefined {
  return restaurantMenuItems.find((item) => item.slug === slug);
}

export function getMenuItemsByCategory(category: string): RestaurantMenuItem[] {
  return restaurantMenuItems.filter((item) => item.category === category);
}

export function getChefSpecialMenuItems(): RestaurantMenuItem[] {
  return restaurantMenuItems.filter((item) => item.isChefSpecial);
}

export function getSeasonalMenuItems(): RestaurantMenuItem[] {
  return restaurantMenuItems.filter((item) => item.isSeasonal);
}

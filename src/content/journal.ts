/**
 * Avenox Çoklu Site Vitrini - Yörünge Araştırma Dergisi İçerik Verisi
 * 
 * Bu dosya 9 yazar, 6 kategori, 6 cilt arşivi sayısı, tam 16 hakemli makale
 * ve 12 teknik/akademik forum konusunu içerir.
 * Dil: Yüksek nitelikli, teknik ve editoryal Türkçe.
 */

import {
  JournalAuthor,
  JournalCategory,
  ArchiveIssue,
  JournalArticle,
  ForumThread,
} from './types';

// ============================================================================
// 1. DERGİ YAZARLARI VE DANIŞMA KURULU (9 YAZAR)
// ============================================================================

export const authors: JournalAuthor[] = [
  {
    id: 'haluk-demiriz',
    slug: 'haluk-demiriz',
    name: 'Prof. Dr. Haluk Demiriz',
    role: 'Kıdemli Araştırmacı & Bölüm Başkanı',
    academicTitle: 'Prof. Dr.',
    affiliation: 'İTÜ Uçak ve Uzay Bilimleri Fakültesi, Yörünge Mekaniği Laboratuvarı',
    bio: 'Alçak Dünya yörüngesindeki takımyıldızların atmosferik sürtünme modellemesi, küçük uydu itki sistemleri ve yörünge ömrü tahminleri üzerine 25 yıldır araştırmalarını sürdürmektedir. ESA ve TÜBİTAK ortaklı üç uydu projesinde baş araştırmacı olarak görev yapmıştır.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      alt: 'Prof. Dr. Haluk Demiriz portresi',
    },
    specialties: ['Yörünge Mekaniği', 'Atmosferik Sürtünme', 'Küp Uydu Mimarileri', 'Uzay Trafik Yönetimi'],
    orcid: '0000-0002-4891-1029',
    email: 'hdemiriz@itu.edu.tr',
    articleCount: 14,
    publishedWorks: [
      'Alçak İrtifa Uydu Yörüngelerinde Güneş Fırtınası Kaynaklı Bozulmalar (2024)',
      'Akışkan Yakıtlı Mikro-İtki Sistemlerinin Titreşim Kararlılığı (2022)',
    ],
  },
  {
    id: 'selin-vardar',
    slug: 'selin-vardar',
    name: 'Doç. Dr. Selin Vardar',
    role: 'Oşinografi Grubu Yürütücüsü',
    academicTitle: 'Doç. Dr.',
    affiliation: 'ODTÜ Deniz Bilimleri Enstitüsü, Kıyı ve Açık Deniz Dinamikleri',
    bio: 'Karadeniz anoksik alt tabakasının dikey salınımları, boğazlar alt-üst akıntı hidrolojisi ve Akdeniz termoklin katmanının mevsimsel kaymaları üzerine odaklanmaktadır. R/V Bilim-2 araştırma gemisiyle yürütülen Karadeniz derin seferlerinin koordinatörüdür.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      alt: 'Doç. Dr. Selin Vardar portresi',
    },
    specialties: ['Fiziksel Oşinografi', 'Anoksik Su Havzaları', 'Termoklin Tabakalanması', 'Akıntı Dinamiği'],
    orcid: '0000-0001-9214-7731',
    email: 'svardar@ims.metu.edu.tr',
    articleCount: 11,
    publishedWorks: [
      'Karadeniz Kemoklin Sınırında Kükürt-Oksijen Çatışması (2025)',
      'İstanbul Boğazı Çift Katmanlı Rejiminde Enerji Kayıpları (2023)',
    ],
  },
  {
    id: 'kerem-tanaydin',
    slug: 'kerem-tanaydin',
    name: 'Dr. Kerem Tanaydın',
    role: 'Başuzman Araştırmacı',
    academicTitle: 'Dr.',
    affiliation: 'TÜBİTAK MAM Malzeme Enstitüsü, İleri Kompozitler ve Aerojeller',
    bio: 'Kriyojenik sıcaklıklarda aşırı düşük ısıl iletkenliğe sahip grafen aerojeller ve havacılık sınıfı karbon elyaf takviyeli polimerlerin yorulma mukavemeti üzerine çalışmaktadır. Sıvı hidrojen tankı izolasyonunda patentli bir mikro-hücre üretim metoduna sahiptir.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      alt: 'Dr. Kerem Tanaydın portresi',
    },
    specialties: ['Kriyojenik İzolasyon', 'Grafen Aerojeller', 'Nanogözenekli Malzemeler', 'Isıl İletkenlik Ölçümü'],
    orcid: '0000-0003-1189-4402',
    email: 'kerem.tanaydin@tubitak.gov.tr',
    articleCount: 9,
    publishedWorks: [
      'Sıvı Hidrojen Depolamada Süper-Yalıtkan Silika-Karbon Kompozitler (2025)',
      'Aerojellerde Fonon Saçılması ve Isı Taşınımı Sınırları (2023)',
    ],
  },
  {
    id: 'neslihan-aksoy',
    slug: 'neslihan-aksoy',
    name: 'Doç. Dr. Neslihan Aksoy',
    role: 'Öğretim Üyesi & Laboratuvar Direktörü',
    academicTitle: 'Doç. Dr.',
    affiliation: 'Boğaziçi Üniversitesi Moleküler Biyoloji ve Genetik Bölümü',
    bio: 'Aşırı tuzlu havzalarda yaşayan halofilik arkelerin enzim mekanizmaları ve radyasyona dirençli mikrobiyal suşların DNA onarım yolakları üzerine uzmanlaşmıştır. Tuz Gölü ve Acıgöl sedimentlerinden izole edilen enzimlerin endüstriyel biyokatalizör potansiyelini araştırmaktadır.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      alt: 'Doç. Dr. Neslihan Aksoy portresi',
    },
    specialties: ['Ekstremofil Biyolojisi', 'Halofilik Enzimler', 'DNA Çift Zincir Onarımı', 'Metagenomik'],
    orcid: '0000-0002-6045-3120',
    email: 'neslihan.aksoy@boun.edu.tr',
    articleCount: 16,
    publishedWorks: [
      'Yüksek Ozmotik Basınç Altında Katalitik Kararlılığını Koruyan Arkebakteri Proteazları (2024)',
      'Tuz Gölü Sedimentinde Metagenomik Çeşitlilik Haritası (2022)',
    ],
  },
  {
    id: 'yaman-sarpel',
    slug: 'yaman-sarpel',
    name: 'Dr. Yaman Sarpel',
    role: 'Hesaplamalı Sinirbilim Kıdemli Araştırmacısı',
    academicTitle: 'Dr.',
    affiliation: 'Bilkent Üniversitesi UNAM, Nöromorfik Bilişim ve Donanım Grubu',
    bio: 'Biyolojik nöronların asenkron ateşleme mekanizmalarını taklit eden olay tabanlı (event-based) entegre devre tasarımları ve az parametreli sinirsel ses sentezleyicileri üzerine çalışmaktadır. Düşük güç tüketimli gömülü kenar işlemcilerinde 4 patent sahibidir.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      alt: 'Dr. Yaman Sarpel portresi',
    },
    specialties: ['Nöromorfik Donanım', 'Spiking Sinir Ağları', 'Olay Tabanlı Sensörler', 'Asenkron Mantık Devreleri'],
    orcid: '0000-0002-8812-9904',
    email: 'ysarpel@bilkent.edu.tr',
    articleCount: 8,
    publishedWorks: [
      'Sub-Mikrowatt Olay Tabanlı Görsel İşlemcilerde Gecikme Minimizasyonu (2025)',
      'Memristif Çapraz Bağlantılarda Sinaptik Ağırlık Güncelleme Sapmaları (2023)',
    ],
  },
  {
    id: 'elif-karadag',
    slug: 'elif-karadag',
    name: 'Y. Mimar Elif Karadağ',
    role: 'Hesaplamalı Tasarım ve Morfoloji Araştırmacısı',
    academicTitle: 'Y. Mimar',
    affiliation: 'İTÜ Mimarlık Fakültesi, Hesaplamalı Tasarım ve Malzeme Mirası Grubu',
    bio: 'Geleneksel kagir yapı malzemelerinin mikroiklim performansları, gözenekli tuğlaların evaporatif soğutma verimleri ve tarihi kent dokularında rüzgar koridorlarının hesaplamalı akışkanlar dinamiği (CFD) ile simülasyonunu yönetmektedir.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      alt: 'Y. Mimar Elif Karadağ portresi',
    },
    specialties: ['Kentsel Mikroiklim', 'Gözenekli Pişmiş Toprak', 'Hesaplamalı Akışkan Dinamiği', 'Mimari Morfoloji'],
    orcid: '0000-0001-7503-2940',
    email: 'karadageli@itu.edu.tr',
    articleCount: 7,
    publishedWorks: [
      'Tarihi Yarımada Sokak Dokusunda Isı Adası Sönümlenmesi (2024)',
      'Geleneksel Kireç Harçlarında Higroskopik Nem Denge Eğrileri (2022)',
    ],
  },
  {
    id: 'canan-erbilgic',
    slug: 'canan-erbilgic',
    name: 'Dr. Canan Erbilgiç',
    role: 'Biyomühendislik Araştırmacısı',
    academicTitle: 'Dr.',
    affiliation: 'Sabancı Üniversitesi Mühendislik Fakültesi, Biyosensör ve Biyomalzeme Laboratuvarı',
    bio: 'Deniz sedimentlerindeki mikroplastik polimerleri enzimatik olarak parçalayan mikrobiyal katalizörlerin optimizasyonu ve nöral doku iskeleleri için biyouyumlu iletken hidrojellerin sentezi üzerine çalışmaktadır.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
      alt: 'Dr. Canan Erbilgiç portresi',
    },
    specialties: ['Enzimatik Biyodegradasyon', 'İletken Hidrojeller', 'Polimer Parçalanma Kinetiği', 'Biyouyumlu İskeleler'],
    orcid: '0000-0003-4921-6650',
    email: 'canan.erbilgic@sabanciuniv.edu',
    articleCount: 12,
    publishedWorks: [
      'Marmara Denizi Çökellerinde PETaz Enzimi Aktivite Profillemesi (2025)',
      'İpek Fibroini Takviyeli İletken Polianilin Hidrojeller (2024)',
    ],
  },
  {
    id: 'metehan-ozgorus',
    slug: 'metehan-ozgorus',
    name: 'Prof. Dr. Metehan Özgörüş',
    role: 'Gözlemevi Direktörü & Astrofizikçi',
    academicTitle: 'Prof. Dr.',
    affiliation: 'Erzurum Doğu Anadolu Gözlemevi (DAG), Astronomi ve Astrofizik Enstitüsü',
    bio: '3.170 metre rakımlı Karakaya Tepesi’nde kurulu DAG 4 metrelik optik/kızılötesi teleskobunda atmosferik optik türbülansın adaptif ayna yüzeyleriyle gerçek zamanlı düzeltilmesi ve yıldızlararası toz soğurması konularını yönetmektedir.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Prof. Dr. Metehan Özgörüş portresi',
    },
    specialties: ['Adaptif Optik', 'Kızılötesi Astronomi', 'Atmosferik Görme Kalitesi (Seeing)', 'Yıldızlararası Toz'],
    orcid: '0000-0001-5509-3211',
    email: 'mozgorus@atauni.edu.tr',
    articleCount: 19,
    publishedWorks: [
      'DAG 4-Metre Teleskobunda Shack-Hartmann Dalgacephesi Analizi (2025)',
      'Doğu Anadolu Platosunda Kızılötesi Gökyüzü Saydamlığı (2023)',
    ],
  },
  {
    id: 'ayse-bozkurt',
    slug: 'ayse-bozkurt',
    name: 'Dr. Ayşe Perver Bozkurt',
    role: 'Jeotermal Hidroloji Araştırma Grubu Lideri',
    academicTitle: 'Dr.',
    affiliation: 'Hacettepe Üniversitesi Jeoloji Mühendisliği, Hidrojeoloji Anabilim Dalı',
    bio: 'Batı Anadolu tektonik havzalarında derin dolaşımlı jeotermal akışkanların izotopik jeokimyası, karbon tutma amaçlı derin formasyon enjeksiyonları ve kalsit kabuklaşma kinetiği üzerine araştırmalar yürütmektedir.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80',
      alt: 'Dr. Ayşe Perver Bozkurt portresi',
    },
    specialties: ['Derin Jeotermal Hidroloji', 'İzotop Jeokimyası', 'Rezervuar Kabuklaşması', 'Karbon Enjeksiyonu'],
    orcid: '0000-0002-3110-8452',
    email: 'abozkurt@hacettepe.edu.tr',
    articleCount: 10,
    publishedWorks: [
      'Büyük Menderes Grabeni Derin Akışkanlarında O-18 ve Döteryum Sapmaları (2024)',
      'Yüksek Entalpili Kuyularda Polifosfat İnhibitörlerinin Termal Stabilitesi (2023)',
    ],
  },
];

// ============================================================================
// 2. DERGİ KATEGORİLERİ (6 KATEGORİ)
// ============================================================================

export const categories: JournalCategory[] = [
  {
    id: 'yorunge-uzay',
    slug: 'yorunge-ve-uzay',
    name: 'Yörünge Mekaniği ve Uzay Sistemleri',
    description: 'Uydu takımyıldızları, atmosferik sürüklenme, optik haberleşme ve yörünge trafik kontrol algoritmaları.',
    colorCode: '#6366f1',
    orderIndex: 1,
  },
  {
    id: 'okyanus-klima',
    slug: 'okyanus-ve-klima',
    name: 'Oşinografi ve Karasal İklim Sistemleri',
    description: 'Basen hidrolojisi, termoklin tabakalanması, kıyı akıntıları ve derin deniz anoksik dengeleri.',
    colorCode: '#0284c7',
    orderIndex: 2,
  },
  {
    id: 'malzeme-nano',
    slug: 'malzeme-ve-nano',
    name: 'Kriyojenik ve Fonksiyonel Malzemeler',
    description: 'Aerojeller, katı elektrolitler, kuantum noktalı fotodedektörler ve süperiletken arayüzler.',
    colorCode: '#0d9488',
    orderIndex: 3,
  },
  {
    id: 'biyoloji-genetik',
    slug: 'biyoloji-ve-genetik',
    name: 'Ekstremofil Biyolojisi ve Biyosensörler',
    description: 'Halofilik arkeler, mikrobiyal enzimler, metagenomik taramalar ve biyo-bozunur katalizörler.',
    colorCode: '#16a34a',
    orderIndex: 4,
  },
  {
    id: 'noromorfik-bilisim',
    slug: 'noromorfik-bilisim',
    name: 'Nöromorfik Bilişim ve Donanım Mimarisi',
    description: 'Olay tabanlı asenkron sensörler, spiking sinir ağları ve düşük güçlü kenar işlemciler.',
    colorCode: '#9333ea',
    orderIndex: 5,
  },
  {
    id: 'topografya-mimari',
    slug: 'topografya-ve-mimari',
    name: 'Topografya, Kentsel Morfoloji ve Jeoloji',
    description: 'Kentsel mikroiklim, jeotermal hidroloji, gözenekli yapı elemanları ve sismik zemin etkileşimi.',
    colorCode: '#b45309',
    orderIndex: 6,
  },
];

// ============================================================================
// 3. DERGİ CİLT ARŞİVİ (6 SAYI)
// ============================================================================

export const archiveIssues: ArchiveIssue[] = [
  {
    id: 'issue-14-3',
    volume: 14,
    issue: 3,
    title: 'Derin Uzay Optiği ve Ekstrem Koşul Biyolojisi',
    period: 'Güz 2026',
    year: 2026,
    publishDate: '2026-09-15',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
      alt: 'Yörünge Dergisi Cilt 14 Sayı 3 Kapak Görseli: Teleskop aynaları ve derin uzay optik desenleri',
    },
    editorialNote:
      'Bu sayımızda, Erzurum DAG teleskobunun adaptif optik devreye alma verilerini ve Tuz Gölü ekstremofillerinin zorlu çevrelerdeki moleküler adaptasyon stratejilerini yan yana getiriyoruz.',
    themeFocus: 'Uç Sınırlarda Gözlem ve Dayanım',
    doi: '10.5582/yorunge.2026.14.3',
    articleCount: 6,
    pageCount: 184,
    downloadFileSize: '18.4 MB',
  },
  {
    id: 'issue-14-2',
    volume: 14,
    issue: 2,
    title: 'Karasal İklim Eşikleri ve Kıyı Dinamikleri',
    period: 'Yaz 2026',
    year: 2026,
    publishDate: '2026-06-20',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Yörünge Dergisi Cilt 14 Sayı 2 Kapak Görseli: Karadeniz ve Akdeniz kıyı akıntı çizgileri',
    },
    editorialNote:
      'Karadeniz anoksik katmanının yükselişi ve Boğaziçi çift katmanlı akıntısının türbin yerleşimi simülasyonları, kıyı kuşağındaki kırılgan dengeleri matematiksel bir netlikle sergiliyor.',
    themeFocus: 'Kıyı Oşinografisi ve Akışkan Dinamiği',
    doi: '10.5582/yorunge.2026.14.2',
    articleCount: 5,
    pageCount: 156,
    downloadFileSize: '14.2 MB',
  },
  {
    id: 'issue-14-1',
    volume: 14,
    issue: 1,
    title: 'Hesaplamalı Donanımlar ve Optik Sensörler',
    period: 'Bahar 2026',
    year: 2026,
    publishDate: '2026-03-10',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      alt: 'Yörünge Dergisi Cilt 14 Sayı 1 Kapak Görseli: Silikon fotonik ve nöromorfik devre şeması',
    },
    editorialNote:
      'Geleneksel von Neumann mimarisinin güç darboğazını aşmayı hedefleyen olay tabanlı asenkron devreler ve kuantum noktalı algılayıcılar bu sayının omurgasını teşkil ediyor.',
    themeFocus: 'Nöromorfik ve Kuantum Algılama',
    doi: '10.5582/yorunge.2026.14.1',
    articleCount: 5,
    pageCount: 162,
    downloadFileSize: '16.0 MB',
  },
  {
    id: 'issue-13-4',
    volume: 13,
    issue: 4,
    title: 'Kriyojenik Enerji Depolama ve İleri Kompozitler',
    period: 'Kış 2025',
    year: 2025,
    publishDate: '2025-12-18',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Yörünge Dergisi Cilt 13 Sayı 4 Kapak Görseli: Kriyojenik buharlaşma ve aerojel gözenek yapısı',
    },
    editorialNote:
      'Hidrojen ekonomisinin en zorlu basamağı olan sıvı hidrojen depolama tanklarında grafen aerojellerin ısıl izolasyon performansları ve mekanik yorulma deneyleri inceleniyor.',
    themeFocus: 'Kriyojenik Malzeme Mühendisliği',
    doi: '10.5582/yorunge.2025.13.4',
    articleCount: 5,
    pageCount: 148,
    downloadFileSize: '13.8 MB',
  },
  {
    id: 'issue-13-3',
    volume: 13,
    issue: 3,
    title: 'Tarihsel Topografya ve Malzeme Mirası',
    period: 'Güz 2025',
    year: 2025,
    publishDate: '2025-09-22',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Yörünge Dergisi Cilt 13 Sayı 3 Kapak Görseli: Kagir kemer strüktürü ve taş doku analizi',
    },
    editorialNote:
      'Tarihi Yarımada’nın gözenekli tuğlalarından Kapadokya volkanik tüflerine kadar yerel taş ve pişmiş toprak elemanların termal sönümleme karakteristikleri ele alınıyor.',
    themeFocus: 'Malzeme Mirası ve Kentsel Mikroiklim',
    doi: '10.5582/yorunge.2025.13.3',
    articleCount: 6,
    pageCount: 172,
    downloadFileSize: '15.5 MB',
  },
  {
    id: 'issue-13-2',
    volume: 13,
    issue: 2,
    title: 'Jeotermal Havzalar ve Sismik İzleme',
    period: 'Yaz 2025',
    year: 2025,
    publishDate: '2025-06-14',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Yörünge Dergisi Cilt 13 Sayı 2 Kapak Görseli: Jeotermal buhar sahası ve fay kırıkları',
    },
    editorialNote:
      'Menderes Grabeni’ndeki yüksek sıcaklıklı akışkanların izotop kimyası ve derin kuyularda mineral kabuklaşmasını önleyen yeni nesil organik inhibitör denemeleri.',
    themeFocus: 'Tektonik Hidroloji ve Derin Jeotermal',
    doi: '10.5582/yorunge.2025.13.2',
    articleCount: 5,
    pageCount: 140,
    downloadFileSize: '12.9 MB',
  },
];

// ============================================================================
// 4. HAKEMLİ DERGİ MAKALELERİ (16 AYRINTILI MAKALE)
// ============================================================================

export const articles: JournalArticle[] = [
  // 1
  {
    id: 'art-01',
    slug: 'dag-adaptif-optik-gozlem',
    title: 'Erzurum DAG Teleskobunda Termal Türbülans Düzeltmesi ve Çözünürlük Sınırları',
    subtitle: 'Karakaya Tepesi 3.170 m İrtifada Atmosferik Dalga Cephesi Bozulmalarının Gerçek Zamanlı Telafisi',
    abstract:
      'Doğu Anadolu Gözlemevi (DAG) 4 metrelik primer ayna yüzeyinde, atmosferik mikro-termal dalgalanmaların neden olduğu optik faz bozulmaları Shack-Hartmann dalgacephesi sensörü ve 468 aktüatörlü deforme edilebilir ikincil ayna kombinasyonu ile incelenmiştir. 2025 kış döneminde elde edilen 120 saatlik sürekli kızılötesi (J, H, K bantları) test verileri, seeing değerinin 0.85 ark-saniyeden Strehl oranı %62 seviyesine kadar iyileştirilebildiğini kanıtlamaktadır.',
    categoryId: 'yorunge-uzay',
    categoryName: 'Yörünge Mekaniği ve Uzay Sistemleri',
    authorIds: ['metehan-ozgorus'],
    publishDate: '2026-08-14',
    readTimeMinutes: 18,
    doi: '10.5582/yorunge.2026.14.3.01',
    volume: 14,
    issue: 3,
    featured: true,
    tags: ['Adaptif Optik', 'Teleskop Aynaları', 'Atmosferik Türbülans', 'Kızılötesi Astronomi', 'DAG Gözlemevi'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
      alt: 'Gözlemevi kubbesi altında optik ayna yüzeyinin gece kalibrasyonu',
      caption: 'DAG 4 metrelik ayna hücresinde dalga cephesi düzeltme aktüatörlerinin 1 kHz frekanslı testi.',
      photographer: 'Erzurum DAG Arşivi',
    },
    sections: [
      {
        heading: 'Giriş ve Karakaya Tepesi Atmosferik Koşulları',
        paragraphs: [
          'Yüksek çözünürlüklü astronomik gözlemlerin temel kısıtı, atmosferik sınır tabakasındaki dikey sıcaklık gradyanlarının yol açtığı kırılma indisi düzensizlikleridir. Erzurum Karakaya Tepesi (3.170 m), düşük su buharı sütunu ve laminar rüzgar profili nedeniyle Doğu Akdeniz ve Avrasya kuşağındaki en elverişli gözlem noktalarından biri olarak seçilmiştir.',
          'Bununla birlikte, kış aylarında kar örtüsüyle kaplı plato zemininden kaynaklanan yerel radyatif soğuma, kubbe açıklığı çevresinde 3 ila 8 metre aralığında yoğun bir mikro-termal katman oluşturmaktadır. Bu çalışma, söz konusu katmanın dalgacephesi üzerindeki yüksek frekanslı sapmalarını ölçmek ve kompanse etmek için geliştirilen kontrol algoritmalarını ele almaktadır.',
        ],
        callout: {
          type: 'methodology',
          text: 'Dalga cephesi verileri 1.000 Hz hızında örneklenmiş; aktüatör gecikmesi 1.2 milisaniyenin altında tutularak Greenwood frekansı (fG = 85 Hz) aşılmıştır.',
          source: 'DAG Optik Laboratuvarı Test Protokolü v4.1',
        },
      },
      {
        heading: 'Deforme Edilebilir Ayna ve Kontrol Döngüsü',
        paragraphs: [
          'Primer aynadan odak düzlemine iletilen ışık demeti, piezoelektrik tahrikli 468 aktüatörlü ince cam membran üzerine düşürülmektedir. Shack-Hartmann sensöründen elde edilen 32x32 alt-açıklık gradyan matrisi, GPU tabanlı bir matris-vektör çarpım motoruna aktarılmakta ve Zernike polinom katsayıları gerçek zamanlı olarak hesaplanmaktadır.',
          'Özellikle odak dışılık (defocus), astigmatizma ve koma gibi düşük mertebeli aberasyonların yanı sıra, atmosferik kaynama (boiling) kaynaklı yüksek frekanslı faz bozukluklarının giderilmesinde oransal-türevsel-integral (PID) filtrelerine eklenen Kalman durum kestirimi belirleyici olmuştur.',
        ],
      },
      {
        heading: 'Gözlemsel Sonuçlar ve Tartışma',
        paragraphs: [
          'H-bandında (1.65 µm) elde edilen noktasal yayılma fonksiyonu (PSF), adaptif optik kapalıyken 0.88 ark-saniye yarı tepe genişliğine (FWHM) sahipken, sistem devreye alındığında 0.082 ark-saniyeye inmiştir. Bu değer, 4 metrelik açıklığın teorik kırınım sınırına oldukça yakındır.',
        ],
        callout: {
          type: 'data',
          text: 'Strehl oranı K-bandında %62.4’e ulaşırken, J-bandında (1.25 µm) atmosferik saçılmanın artması nedeniyle %38.1 mertebesinde gerçekleşmiştir.',
        },
      },
    ],
    keyFindings: [
      'Karakaya Tepesi mikro-termal sınır tabakası kubbe açıklığının 4.5 metre üzerinde sönümlenmektedir.',
      'Kalman öngörülü kontrol döngüsü rüzgar yönlü sapmalarda aktüatör hata payını %34 azaltmıştır.',
      'Teleskop, 2 µm dalga boyunda kırınım sınırında difraksiyon halkalarını net bir biçimde ayrıştırmıştır.',
    ],
    citations: [
      { id: 'c1', citationText: 'Özgörüş, M. et al. (2025). Optical seeing measurements at Mount Karakaya. MNRAS 528, 1420-1435.', doi: '10.1093/mnras/stad3891' },
      { id: 'c2', citationText: 'Roddier, F. (1999). Adaptive Optics in Astronomy. Cambridge University Press.' },
    ],
    metrics: { downloads: 1420, views: 5890, citations: 14 },
  },

  // 2
  {
    id: 'art-02',
    slug: 'karadeniz-anoksik-sinir-dinamikleri',
    title: 'Karadeniz Baseninde Sülfür-Oksijen Termoklin Sınırının Dikey Salınımları',
    subtitle: '2024-2026 R/V Bilim-2 CTD ve Kimyasal Sensör Verilerinin Analizi',
    abstract:
      'Dünyanın en büyük meromiktik su kütlesi olan Karadeniz’de, yüzeydeki oksijenli üst su tabakası ile hidrojen sülfür (H2S) yüklü derin anoksik katman arasındaki ara yüzey (kemoklin/piknoklin) derinliği son otuz yılda belirgin bir sığlaşma eğilimi göstermektedir. Bu makale, batı baseninde 120 CTD istasyonundan toplanan çözünmüş oksijen, redoks potansiyeli ve yoğunluk verilerini modelleyerek, alt sınırın 135 metreden 98 metreye kadar yükseldiği kritik çekirdek alanları haritalandırmaktadır.',
    categoryId: 'okyanus-klima',
    categoryName: 'Oşinografi ve Karasal İklim Sistemleri',
    authorIds: ['selin-vardar'],
    publishDate: '2026-07-28',
    readTimeMinutes: 16,
    doi: '10.5582/yorunge.2026.14.2.02',
    volume: 14,
    issue: 2,
    featured: true,
    tags: ['Karadeniz', 'Anoksik Havza', 'Kemoklin', 'Hidrojen Sülfür', 'CTD Ölçümleri', 'Oşinografi'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      alt: 'Açık denizde araştırma gemisinden indirilen dikey CTD su örnekleme karuseli',
      caption: 'Karadeniz batı baseninde 200 metre derinliğe indirilen CTD ve elektrokimyasal mikrosensör kiti.',
      photographer: 'R/V Bilim-2 Araştırma Seferi',
    },
    sections: [
      {
        heading: 'Kemoklin Dinamiği ve Yoğunluk Tabakalanması',
        paragraphs: [
          'Karadeniz’in hidrolojik dengesi, Tuna, Dinyester ve Dinyeper nehirlerinden gelen tatlı su girdisi ile Akdeniz kökenli tuzlu dip suyunun Boğaz yoluyla alt akıntı olarak girişi arasındaki hassas gradyana dayanır. Bu iki su kütlesi arasında yer alan kalıcı piknoklin (yoğunluk sıçrama katmanı), dikey su karışımını neredeyse tamamen engeller.',
          'Oksik katman ile anoksik katman arasında yer alan ve "Suboksik Bölge" (SOL) olarak adlandırılan tabakada, çözünmüş oksijen derişimi 10 µM altına düşerken hidrojen sülfür henüz saptanamayan seviyededir. Ancak 2024 ve 2026 kış soğuma rejimlerinin yetersiz kalması, bu ara bölgenin dikey kalınlığını daraltmıştır.',
        ],
      },
      {
        heading: 'Saha Bulguları ve Kimyasal Profil',
        paragraphs: [
          'Alınan su numunelerinde amperometrik mikrosensörlerle yapılan yerinde (in-situ) ölçümler, serbest H2S gazının batı çanağında yer yer 95 metre derinlikteki izopiknal yüzeylerde (st = 16.20 kg/m³) belirdiğini ortaya koymuştur.',
          'Bu durum, pelajik balık stoklarının dikey yaşam koridorunu ciddi biçimde daraltmakta ve kış konveksiyonunun dip sularına oksijen taşıma kapasitesinin zayıfladığını kanıtlamaktadır.',
        ],
        callout: {
          type: 'data',
          text: 'Batı Karadeniz siklonik girdabının merkezinde piknoklin tepe noktası geçmiş 20 yılın ortalamasına kıyasla 22 metre yukarı ötelenmiştir.',
        },
      },
    ],
    keyFindings: [
      'Anoksik su tabakası batı ana girdap merkezinde 98 metre derinliğe kadar tırmanmıştır.',
      'Suboksik katman kalınlığı ortalama 35 metreden 18 metreye gerilemiştir.',
      'Nehir kaynaklı azot yükü, ara yüzeydeki kemoototrof bakteri topluluklarının sülfür oksidasyon hızını baskılamaktadır.',
    ],
    citations: [
      { id: 'c1', citationText: 'Vardar, S. et al. (2025). Shoaling of the chemocline in the western Black Sea. Deep Sea Research Part I, 194, 103980.', doi: '10.1016/j.dsr.2025.103980' },
      { id: 'c2', citationText: 'Murray, J. W. et al. (1989). Unexpected changes in Black Sea chemistry. Nature, 338, 411-413.' },
    ],
    metrics: { downloads: 1850, views: 6420, citations: 21 },
  },

  // 3
  {
    id: 'art-03',
    slug: 'kriyojenik-karbon-aerojel-izolasyon',
    title: 'Kriyojenik Sıvı Hidrojen Tanklarında Düşük Yoğunluklu Grafen Aerojel Katmanlarının Isıl Geçirgenlik Analizi',
    subtitle: '20 Kelvin Çalışma Sıcaklığında Radyatif ve Fononik Isı İletiminin Sönümlenmesi',
    abstract:
      'Sıvı hidrojenin (LH2) 20.28 Kelvin kaynama noktasında güvenle depolanması, havacılık ve uzay araçlarında en kritik kütlesel darboğazı teşkil etmektedir. Bu çalışmada, kimyasal buhar çöktürme yöntemiyle sentezlenen ve yoğunluğu 8.2 mg/cm³ olan ultralight grafen aerojellerin yüksek vakum (10⁻⁵ mbar) altındaki görünür ısıl iletkenlik (k_app) katsayısı deneysel olarak ölçülmüştür. Sonuçlar, çok katmanlı alüminize yansıtıcı folyolarla desteklenen aerojel katmanının kaynama kaybını (boil-off rate) günde %0.12 seviyesine düşürdüğünü göstermektedir.',
    categoryId: 'malzeme-nano',
    categoryName: 'Kriyojenik ve Fonksiyonel Malzemeler',
    authorIds: ['kerem-tanaydin'],
    publishDate: '2026-06-12',
    readTimeMinutes: 15,
    doi: '10.5582/yorunge.2026.14.2.03',
    volume: 14,
    issue: 2,
    featured: false,
    tags: ['Sıvı Hidrojen', 'Grafen Aerojel', 'Kriyojenik Tank', 'Isıl İletkenlik', 'Vakum İzolasyonu'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
      alt: 'Kriyojenik vakum test odasında parlayan metalik test hücresi ve buharlaşma sensörleri',
      caption: 'TÜBİTAK MAM Kriyojenik Laboratuvarı sıvı helyum soğutmalı test hücresi.',
      photographer: 'TÜBİTAK MAM',
    },
    sections: [
      {
        heading: 'Problem: Fonon İletimi ve Radyatif Isı Transferi',
        paragraphs: [
          'Hidrojen atomunun düşük molekül ağırlığı ve sıvı halde son derece düşük buharlaşma entalpisi (446 kJ/kg), depolama tanklarının dış cidarından gelen en ufak bir ısı sızıntısında dahi hızlı faz değişimine neden olur. Klasik çok katmanlı yalıtım (MLI) sistemleri vakum altında radyasyonu engellemede başarılı olsa da, yapısal destek noktalarındaki katı fonon iletimini durduramaz.',
          'Grafen levhaların üç boyutlu gözenekli bir ağ kurarak birbirine bağlandığı aerojel iskeleler, temas dirençlerini maksimize ederek katı içi fonon saçılmasını olağanüstü biçimde artırır.',
        ],
      },
      {
        heading: 'Deneysel Düzeneğin Kurulumu ve Ölçümler',
        paragraphs: [
          'İç cidarı 20 K sıvı hidrojen simülatörüyle soğutulan, dış cidarı ise 300 K oda sıcaklığında tutulan çift cidarlı paslanmaz çelik kriyostat içerisine 15 mm kalınlığında grafen-silika melez aerojel plakaları yerleştirilmiştir. Vakum basıncı turbomoleküler pompa sistemiyle 5x10⁻⁶ mbar seviyesinde sabitlenmiştir.',
        ],
        callout: {
          type: 'note',
          text: 'Görünür ısıl iletkenlik katsayısı k_app = 0.48 mW/(m·K) olarak hesaplanmış, bu değer ticari aerojellerden 2.8 kat daha üstün bir yalıtım sağlamıştır.',
        },
      },
    ],
    keyFindings: [
      'Grafen aerojeller kriyojenik titreşim yükleri altında yapısal parçalanma göstermemiştir.',
      'Kaynama kaybı (boil-off rate) 24 saatlik döngüde %0.12 seviyesinde tutulmuştur.',
      'Sistem, kompozit LH2 tank ağırlığını geleneksel yalıtımlara oranla %28 hafifletmektedir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Tanaydın, K. (2025). Ultralight aerogel architectures for liquid hydrogen boil-off mitigation. Cryogenics, 138, 103722.', doi: '10.1016/j.cryogenics.2025.103722' },
    ],
    metrics: { downloads: 980, views: 3410, citations: 8 },
  },

  // 4
  {
    id: 'art-04',
    slug: 'tuz-golu-halofil-enzim-saflastirma',
    title: 'Tuz Gölü Havzası Halofilik Bakteri Suşlarından Termostabil Polimeraz İzolasyonu',
    subtitle: 'Doygun NaCl ve MgCl2 Ortamında Katalitik Aktivitesini Sürdüren Enzimatik Mekanizmalar',
    abstract:
      'Aşırı tuzlu ortamlarda (halofilik koşullar) evrimleşmiş mikroorganizmalar, hücresel proteinlerinin çökelmesini önlemek amacıyla yüksek oranda asidik amino asit kalıntıları içeren benzersiz yüzey şarj dağılımlarına sahiptir. Bu araştırmada, Tuz Gölü’nün güney kıyılarından toplanan tuz kabuklarından izole edilen Halorubrum sp. suşundan elde edilen yeni bir DNA polimeraz enziminin biyokimyasal kinetiği karakterize edilmiştir. Enzim, 4 M NaCl ve 85°C sıcaklıkta dahi %74 polimerizasyon verimini korumaktadır.',
    categoryId: 'biyoloji-genetik',
    categoryName: 'Ekstremofil Biyolojisi ve Biyosensörler',
    authorIds: ['neslihan-aksoy'],
    publishDate: '2026-05-18',
    readTimeMinutes: 14,
    doi: '10.5582/yorunge.2026.14.1.04',
    volume: 14,
    issue: 1,
    featured: false,
    tags: ['Tuz Gölü', 'Halofilik Arke', 'Termostabil Polimeraz', 'Enzim Kinetiği', 'Ekstremofil'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
      alt: 'Tuz kristalleri üzerinde mikroskobik laboratuvar damlalığı ve biyokimyasal reaktif tüpleri',
      caption: 'Tuz Gölü örneklerinden saflaştırılan enzimlerin elektroforetik jel analizi.',
      photographer: 'Boğaziçi MBG Laboratuvarı',
    },
    sections: [
      {
        heading: 'Halofilik Adaptasyonun Yapısal Temelleri',
        paragraphs: [
          'Proteinler standart tuz konsantrasyonlarında katlanmış yapılarını korurken, yüksek iyonik şiddet su moleküllerinin hidrasyon kabuğundan sıyrılmasına ve proteinin kümelenerek çökmesine (salting-out) yol açar. Halofilik arkeler ise sitoplazmalarında 3-5 M potasyum klorür biriktirir ve bu ortamda çalışabilen özel enzimler geliştirmiştir.',
          'İzole edilen polimerazın kristal yapı modellemesi, molekül yüzeyinde glutamat ve aspartat kalıntılarının olağandışı bir sıklıkta kümelendiğini ve bu kalıntıların hidratlanmış tuz iyonlarını bağlayarak kararlı bir su kalkanı oluşturduğunu göstermektedir.',
        ],
      },
      {
        heading: 'Saha Numuneleri ve Saflaştırma Metodolojisi',
        paragraphs: [
          'Tuz kabuğu örnekleri liyofilize edilmiş, heksan ekstraksiyonu sonrası hücresel lizat elde edilmiştir. Polimeraz enzimi nikel afinite kromatografisi ve ardından jel filtrasyonuyla %96 saflık derecesinde izole edilmiştir.',
        ],
        callout: {
          type: 'methodology',
          text: 'Enzimatik aktivite, radyoaktif etiketli dNTP inkorporasyonu ve gerçek zamanlı floresan PCR amplifikasyonu ile doğrulanmıştır.',
        },
      },
    ],
    keyFindings: [
      'Enzim 4.5 M NaCl varlığında 90 dakika boyunca denatüre olmadan çalışabilmektedir.',
      'Geleneksel Taq polimerazın inhibe olduğu yüksek tuzlu adli tıp ve çevre numunelerinde tam amplifikasyon sağlamıştır.',
      'Yüzey negatif yük yoğunluğu standart polimerazlara kıyasla %41 daha yüksektir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Aksoy, N. et al. (2025). Structural basis of extreme halotolerance in archael polymerases. Extremophiles, 29, 44-59.', doi: '10.1007/s00792-025-01312-x' },
    ],
    metrics: { downloads: 1120, views: 4200, citations: 11 },
  },

  // 5
  {
    id: 'art-05',
    slug: 'noromorfik-spiking-dizinler',
    title: 'Olay Tabanlı Asenkron Görüntü İşleme Sensörleri İçin Düşük Güçlü Nöromorfik Devre Düzenleri',
    subtitle: 'Milisaniye Altı Tepki Süreli Dinamik Vizyon Sensörlerinde (DVS) Seyrek Veri Akış Modeli',
    abstract:
      'Geleneksel kare (frame) tabanlı kameralar saniyede sabit sayıda görüntü yakalayarak büyük miktarda gereksiz veri üretirken, olay tabanlı dinamik vizyon sensörleri (DVS) yalnızca sahnedeki piksel düzeyindeki logaritmik parlaklık değişimlerini zaman damgasıyla asenkron iletmektedir. Bu makale, 65 nm CMOS prosesinde üretilen ve piksel başına yalnızca 4.2 pikojul enerji tüketen 128x128 spiking nöral işlemci mimarisini sunmaktadır.',
    categoryId: 'noromorfik-bilisim',
    categoryName: 'Nöromorfik Bilişim ve Donanım Mimarisi',
    authorIds: ['yaman-sarpel'],
    publishDate: '2026-04-05',
    readTimeMinutes: 17,
    doi: '10.5582/yorunge.2026.14.1.05',
    volume: 14,
    issue: 1,
    featured: true,
    tags: ['Nöromorfik', 'Spiking Sinir Ağları', 'DVS', 'Asenkron Devreler', 'Düşük Güç', 'CMOS'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      alt: 'Entegre devre pulu (wafer) üzerinde mikroskobik nöromorfik transistör yolları',
      caption: 'Bilkent UNAM temiz odasında karakterize edilen asenkron spiking devre çekirdeği.',
      photographer: 'UNAM Mikrofabrikasyon Grubu',
    },
    sections: [
      {
        heading: 'Geleneksel Saat Darbesi (Clock) Darboğazı',
        paragraphs: [
          'Von Neumann mimarilerinde küresel saat işareti, çip üzerindeki tüm mantık kapılarını veri olup olmadığına bakılmaksızın aynı anda tetikler. Bu durum dinamik güç tüketiminin %40’ından fazlasını oluşturur. Olay tabanlı asenkron mimaride ise saat sinyali bulunmaz; iletişim piksel tabanlı istek-onay (handshake) protokolüyle yürütülür.',
          'Biyolojik retinadaki fotoreseptör hücrelerinin çalışma ilkesine dayanan bu yapı, hızlı hareket eden insansız hava araçlarının engel algılamasında ve otonom kenar cihazlarda güç tasarrufunu dramatik şekilde artırır.',
        ],
      },
      {
        heading: 'Mimari ve Donanım Sonuçları',
        paragraphs: [
          'Geliştirilen entegre devrede, her piksel hücresi bir logaritmik fotodiyot, bir fark yükselteci ve iki adet karşılaştırıcı (ON ve OFF olayları için) barındırmaktadır. Üretilen olay paketleri 4-fazlı demet adresleme (AER) veriyolu üzerinden 25 nanosaniye gecikmeyle çekirdeğe iletilir.',
        ],
        callout: {
          type: 'data',
          text: 'Yüksek kontrastlı dönen bir pervanenin kenar takibinde çip toplamda yalnızca 380 mikrovat güç harcamış ve 10 kHz eşdeğer kare hızına ulaşmıştır.',
        },
      },
    ],
    keyFindings: [
      'Piksel başına olay gecikmesi 1.8 mikrosaniyenin altındadır.',
      'Klasik CMOS görüntü sensörlerine oranla dinamik güç tüketimi %89 oranında azaltılmıştır.',
      'Sistem 120 dB dinamik aralık sergileyerek doğrudan güneş ışığı altında körleşmeyi engellemiştir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Sarpel, Y. (2025). Asynchronous event-driven neural vision architectures. IEEE Transactions on Biomedical Circuits and Systems, 19, 210-224.', doi: '10.1109/TBCAS.2025.3341902' },
    ],
    metrics: { downloads: 1670, views: 5120, citations: 17 },
  },

  // 6
  {
    id: 'art-06',
    slug: 'bogazici-akinti-enerjisi-simulasyon',
    title: 'İstanbul Boğazı Alt ve Üst Akıntı Katmanlarında Hidrokinetik Türbin Yerleşimi',
    subtitle: 'Kandilli ve Anadolu Hisarı Boğaz Boğazında 3B Hesaplamalı Akışkan Dinamiği (CFD) Analizi',
    abstract:
      'İstanbul Boğazı, Karadeniz’den Marmara’ya doğru akan hafif ve az tuzlu üst akıntı ile Marmara’dan Karadeniz’e yönelen yoğun dip akıntısının oluşturduğu çift katmanlı benzersiz bir hidrokinetik koridordur. Bu çalışmada, Kandilli-Anadolu Hisarı daralmasında 65 metre su derinliğinde kurulan yüksek çözünürlüklü 3B Navier-Stokes modeli ile deniz dibi türbin çiftliklerinin optimum aralıkları ve kavitasyon riskleri simüle edilmiştir. Alt akıntının 2.4 m/s sabit akış hızı, yılda 140 GWh kesintisiz temiz elektrik potansiyeli sunmaktadır.',
    categoryId: 'okyanus-klima',
    categoryName: 'Oşinografi ve Karasal İklim Sistemleri',
    authorIds: ['haluk-demiriz', 'selin-vardar'],
    publishDate: '2026-03-24',
    readTimeMinutes: 19,
    doi: '10.5582/yorunge.2026.14.1.06',
    volume: 14,
    issue: 1,
    featured: false,
    tags: ['İstanbul Boğazı', 'Hidrokinetik Enerji', 'CFD Simülasyonu', 'Akıntı Türbini', 'Çift Katmanlı Akış'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Hızlı akan derin boğaz suları ve kıyı topografyası hava fotoğrafı',
      caption: 'Kandilli burnu açıklarında akıntı hızı vektör alanı simülasyonu katmanları.',
      photographer: 'İTÜ Deniz Bilimleri & CFD Grubu',
    },
    sections: [
      {
        heading: 'Çift Katmanlı Boğaz Rejimi ve Batimetri',
        paragraphs: [
          'İstanbul Boğazı’nın morfolojisi, daralma bölgelerinde (özellikle Kandilli-Aşiyan ekseni) akış hızlarını şiddetlendirir. Üst su katmanı mevsimsel rüzgarlara ve Karadeniz su bütçesine bağlı olarak dalgalanırken, 35 metrenin altındaki Akdeniz suyu yıl boyu son derece kararlı bir termohalin hız profili sergiler.',
          'Geleneksel rüzgar türbinlerinin aksine, suyun havadan 830 kat daha yoğun olması nedeniyle akıntı hızının küpüyle orantılı olan güç yoğunluğu, küçük rotor çaplarıyla dahi devasa tork üretilmesine olanak tanır.',
        ],
      },
      {
        heading: 'Türbin Kanat Geometrisi ve Kavitasyon Tahmini',
        paragraphs: [
          'Simülasyonlarda NACA 63-418 hidromorfik kanat profilleri kullanılmıştır. 40 metre derinliğe yerleştirilen yatay eksenli türbinlerde, kanat ucu hız oranı (TSR) 4.5 seviyesindeyken kanat sırtında statik basıncın buharlaşma basıncının altına inmediği ve kavitasyon erozyonunun önlendiği belirlenmiştir.',
        ],
        callout: {
          type: 'methodology',
          text: 'Saha akıntı profili, R/V Bilim-2 gemisine monte 300 kHz Acoustic Doppler Current Profiler (ADCP) ile 48 saatlik gel-git çevriminde doğrulanmıştır.',
        },
      },
    ],
    keyFindings: [
      'Kandilli-Anadolu Hisarı dip akıntısı yılda 8.100 saat boyunca 2.0 m/s üzerinde hız sağlamaktadır.',
      'Geliştirilen türbin dizilimi Boğaz deniz trafiğinin seyir emniyetini etkilemeyecek şekilde tabandan azami 12 metre yükseklikte kalmaktadır.',
      'Girdap etkileşimi nedeniyle türbinler arası boyuna mesafe en az 7 rotor çapı (7D) olmalıdır.',
    ],
    citations: [
      { id: 'c1', citationText: 'Vardar, S. & Demiriz, H. (2025). Hydrokinetic potential of the Bosphorus lower layer. Renewable Energy, 221, 119782.', doi: '10.1016/j.renene.2025.119782' },
    ],
    metrics: { downloads: 2100, views: 7800, citations: 29 },
  },

  // 7
  {
    id: 'art-07',
    slug: 'tarihi-yarimada-mikroiklim-tugla',
    title: 'Tarihi Yarımada\'da Gözenekli Pişmiş Toprak Elemanların Kentsel Isı Adası Etkisini Sönümleme Katsayısı',
    subtitle: 'Geleneksel Kagir Dokularda Evaporatif Soğutma ve Yüzey Sıcaklığı Gecikmesi',
    abstract:
      'Giderek artan kentsel ısı adası (UHI) etkisi, modern beton ve asfalt yüzeylerin güneş enerjisini depolaması ve gece saatlerinde çevreye yaymasıyla mikroiklim dengesini bozmaktadır. Bu araştırma, İstanbul Tarihi Yarımada’da yer alan geleneksel Horasan harçlı gözenekli tuğla duvarların ve terakota cephe elemanlarının nem tutma ve evaporatif buharlaşma kapasitelerini incelemektedir. Yerinde termal kamera ve bağıl nem ölçümleri, pişmiş toprak elemanların yüzey sıcaklığını betonarme yüzeylere kıyasla 8.4°C daha serin tuttuğunu belgelemektedir.',
    categoryId: 'topografya-mimari',
    categoryName: 'Topografya, Kentsel Morfoloji ve Jeoloji',
    authorIds: ['elif-karadag'],
    publishDate: '2026-02-11',
    readTimeMinutes: 13,
    doi: '10.5582/yorunge.2026.14.1.07',
    volume: 14,
    issue: 1,
    featured: false,
    tags: ['Kentsel Isı Adası', 'Tarihi Yarımada', 'Pişmiş Toprak', 'Evaporatif Soğutma', 'Termal Gecikme'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Tarihi tuğla kemer ve taş duvar yüzeyinde ışık-gölge dokusu',
      caption: 'Süleymaniye çevresinde 16. yüzyıl kagir duvarların termal kamera kayıt analizi.',
      photographer: 'İTÜ Mimarlık Tarihi Grubu',
    },
    sections: [
      {
        heading: 'Geleneksel Kagir Malzemenin Gözenek Geometrisi',
        paragraphs: [
          'Pişmiş kil bazlı tarihi tuğlalar, 0.1 ila 10 mikrometre çap aralığında açık gözenekli bir iç yapıya sahiptir. Gece boyunca atmosferik neme doygun hale gelen bu gözenekler, gündüz güneş radyasyonunun başlamasıyla birlikte suyu kılcal yollarla dış yüzeye ileterek buharlaşma sağlar.',
          'Bu faz değişimi, çevredeki kuru havanın gizli buharlaşma ısısını tüketerek yüzey sıcaklığının tepe noktaya ulaşmasını geciktirir (termal kütle etkisi).',
        ],
      },
      {
        heading: 'Saha Deneyleri ve Sonuçlar',
        paragraphs: [
          'Ağustos ayı boyunca eş zamanlı olarak alınan yüzey pirometre ölçümlerinde, standart brüt beton yüzeyler 48.6°C’ye ulaşırken, açık havaya maruz gözenekli tuğla cepheler 40.2°C sınırında kalmıştır. Gece yarısı radyasyon salımı ise %32 daha az ısı yaymaktadır.',
        ],
        callout: {
          type: 'data',
          text: 'Gözenekli tuğla yüzeyler gün boyunca metrekare başına 420 Watt saatlik evaporatif soğutma gücü üretmiştir.',
        },
      },
    ],
    keyFindings: [
      'Geleneksel pişmiş toprak yapı elemanları kentsel mikroiklimi 2-3°C sönümleyebilmektedir.',
      'Horasan harcının kireç oranı arttıkça malzemenin nem desorpsiyon hızı dengelenmektedir.',
      'Modern cephe tasarımlarında gözenekli klinker tuğla kullanımı klima enerji sarfiyatını %18 azaltabilir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Karadağ, E. (2024). Thermal inertia and evaporative cooling in Ottoman brick masonry. Energy and Buildings, 310, 114120.', doi: '10.1016/j.enbuild.2024.114120' },
    ],
    metrics: { downloads: 840, views: 2950, citations: 6 },
  },

  // 8
  {
    id: 'art-08',
    slug: 'enzimatik-mikroplastik-parcalama',
    title: 'Marmara Denizi Çökellerinden İzole Edilen Mikrobiyal Biyokatalizörlerle PET Bozunma Kinetiği',
    subtitle: 'Düşük Sıcaklıkta Polietilen Tereftalat (PET) Ester Bağlarını Kesen Yeni Nesil Enzim Kokteyli',
    abstract:
      'Denizel ekosistemlerde biriken mikroplastik partiküller, besin zincirinin en alt basamaklarına kadar sızarak kalıcı bir çevresel kriz yaratmaktadır. Bu çalışmada, Marmara Denizi’nin Çınarcık Çukurluğu’ndan 1.200 metre derinlik sedimentinden izole edilen soğuk-seven (psikrotolerant) bir Pseudomonas suşundan saflaştırılan modifiye PETaz enzimi incelenmiştir. Enzim kokteyli, 22°C oda sıcaklığında 72 saat içerisinde amorf PET filmlerinin ağırlığını %43 oranında azaltarak tereftalik asit (TPA) ve etilen glikole dönüştürmüştür.',
    categoryId: 'biyoloji-genetik',
    categoryName: 'Ekstremofil Biyolojisi ve Biyosensörler',
    authorIds: ['canan-erbilgic'],
    publishDate: '2026-01-19',
    readTimeMinutes: 15,
    doi: '10.5582/yorunge.2026.13.4.08',
    volume: 13,
    issue: 4,
    featured: false,
    tags: ['Mikroplastik', 'Marmara Denizi', 'Enzimatik Bozunma', 'PETaz', 'Biyoremediasyon'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      alt: 'Laboratuvar petrisinde mikroplastik parçacıkların enzimatik erime aşaması mikroskopi görüntüsü',
      caption: 'Taramalı elektron mikroskobu (SEM) altında enzim maruziyeti sonrası PET yüzeyinde oluşan mikro-çatlaklar.',
      photographer: 'Sabancı Biyomühendislik Grubu',
    },
    sections: [
      {
        heading: 'Denizel Sedimentte Mikroorganizma İzolasyonu',
        paragraphs: [
          'Marmara Denizi çökelleri, yoğun kentsel ve endüstriyel atık baskısı altında mikroorganizmaların polimerik karbon kaynaklarını kullanmaya zorlandığı yoğun bir seçilim baskısı alanıdır. 2024 sonbaharında R/V Tübitak Marmara gemisiyle toplanan sediment karotlarında, tek karbon kaynağı olarak mikronize PET tozu eklenmiş besiyerlerinde kolonileşen suşlar taranmıştır.',
          'Elde edilen mikrobiyal izolat, esteraz ve kutinaz enzim ailesine ait iki farklı hidrolitik gen kümesini yüksek oranda eksprese etmektedir.',
        ],
      },
      {
        heading: 'Kinetik Parametreler ve Kromatografik Kanıtlar',
        paragraphs: [
          'Bozunma ürünleri Yüksek Performanslı Sıvı Kromatografisi (HPLC) ile takip edilmiş; TPA ve MHET monomerlerinin serbest kalma hızları Michaelis-Menten kinetiğiyle hesaplanmıştır (Km = 4.2 µM).',
        ],
        callout: {
          type: 'note',
          text: 'Ticari bakteriyel kutinazların aksine bu enzim kokteyli yüksek sıcaklık gerektirmemekte, 15-25°C aralığında optimal aktivite sergilemektedir.',
        },
      },
    ],
    keyFindings: [
      'Enzim kokteyli amorf mikroplastikleri 72 saatte %43 kütle kaybına uğratmıştır.',
      'Tuzlu su (35 PSU) varlığında katalitik etkinliğini kaybetmemektedir.',
      'Deniz atık su arıtma tesislerinin deşarj hatlarında biyoremediasyon filtresi olarak kullanılabilir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Erbilgiç, C. (2025). Cold-active esterases degrading microplastics in deep marine sediments. Environmental Science & Technology, 59, 1102-1115.', doi: '10.1021/acs.est.4c08912' },
    ],
    metrics: { downloads: 1350, views: 4900, citations: 15 },
  },

  // 9
  {
    id: 'art-09',
    slug: 'alcak-yorunge-atmosferik-suruklenme',
    title: '500 km İrtifadaki Küp Uydu Takımyıldızlarında Güneş Döngüsü 25 Kaynaklı Yoğunluk Değişimleri',
    subtitle: 'Termosferik Isınmanın Balistik Katsayı ve Yörünge Ömrüne Sayısal Etkileri',
    abstract:
      'Güneş aktivitesinin 11 yıllık periyodu (Güneş Döngüsü 25), 2024-2026 yıllarında beklenen tepe noktasına ulaşarak aşırı ultraviyole (EUV) akısını ve termosfer sıcaklığını belirgin biçimde artırmıştır. Termosferin ısınarak yukarı genleşmesi, 450-550 km irtifada görev yapan küçük uydu ve küp uydu (CubeSat) takımyıldızlarının maruz kaldığı atmosferik yoğunluğu üç kata kadar yükseltmiştir. Bu makale, İTÜ Yörünge Laboratuvarı tarafından takip edilen 18 aktif uydunun iki hatlı yörünge elemanı (TLE) verilerini analiz ederek, yörünge çökme hızlarını ve çarpışma önleme manevra gereksinimlerini ortaya koymaktadır.',
    categoryId: 'yorunge-uzay',
    categoryName: 'Yörünge Mekaniği ve Uzay Sistemleri',
    authorIds: ['haluk-demiriz'],
    publishDate: '2025-12-05',
    readTimeMinutes: 16,
    doi: '10.5582/yorunge.2025.13.4.09',
    volume: 13,
    issue: 4,
    featured: false,
    tags: ['Küp Uydu', 'Güneş Döngüsü 25', 'Atmosferik Yoğunluk', 'Termosfer', 'Yörünge Çökmesi'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      alt: 'Dünya ufku üzerinden güneş doğuşu ve yörüngede dönen uydu silueti',
      caption: 'Termosferik sürtünme modelleme simülasyonu ve yörünge çökme projeksiyonları.',
      photographer: 'İTÜ Yörünge Mekaniği Grubu',
    },
    sections: [
      {
        heading: 'Güneş Aktivitesi ve Termosfer Genleşmesi',
        paragraphs: [
          'Güneş lekelerinden kaynaklanan F10.7 radyo akısı 200 sfu (solar flux unit) eşiğini aştığında, üst atmosferdeki serbest oksijen ve azot molekülleri kinetik enerji kazanarak genleşir. 500 km irtifadaki nötr atmosfer yoğunluğu sakin dönemlerde 1.2x10⁻¹² kg/m³ civarındayken, jeomanyetik fırtınalarda 3.8x10⁻¹² kg/m³ mertebesine sıçrayabilmektedir.',
          'İtki sistemi bulunmayan veya son derece kısıtlı soğuk gaz itkisine sahip 3U ve 6U küp uydular için bu durum, 5 yıllık tasarım ömrünün 18 aya kadar gerilemesi riskini doğurmaktadır.',
        ],
      },
      {
        heading: 'Sayısal Model ve Balistik Katsayı Sapmaları',
        paragraphs: [
          'Analizlerde Jacchia-Bowman 2008 ve NRLMSISE-00 atmosfer modelleri karşılaştırılmıştır. Uydu yüzey açılarının dönme hareketiyle birleştiği değişken aerodinamik sürtünme katsayısı (Cd), Monte Carlo yörünge simülatörüne entegre edilmiştir.',
        ],
        callout: {
          type: 'data',
          text: 'Ekim 2024 G4 sınıfı jeomanyetik fırtınası sırasında incelenen küp uyduların yarı-büyük ekseninde tek bir günde 420 metrelik irtifa kaybı kaydedilmiştir.',
        },
      },
    ],
    keyFindings: [
      'Güneş Döngüsü 25 tepe noktası, alçak irtifa uydularında sürtünme kuvvetini ortalama %180 artırmıştır.',
      'Aktif itkisi olmayan takımyıldızlarında yörünge içi dağılma ve düğüm noktası kayması hızlanmıştır.',
      'Uzay enkazlarıyla çarpışma olasılığı hesaplamalarında statik atmosfer modellerinin terk edilmesi gerekmektedir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Demiriz, H. (2025). Solar cycle 25 thermospheric drag perturbations on CubeSat constellations. Journal of Guidance, Control, and Dynamics, 48, 890-904.', doi: '10.2514/1.G007812' },
    ],
    metrics: { downloads: 1540, views: 4890, citations: 16 },
  },

  // 10
  {
    id: 'art-10',
    slug: 'derin-jeotermal-rezervuar-izotop',
    title: 'Menderes Grabeni Derin Jeotermal Sahalarında Karbon Dioksit Enjeksiyonu Sonrası İzotop Denge Modelleri',
    subtitle: 'Yüksek Entalpili Kuyularda Kalsit Çökelmesi ve Karbon Tutma Dinamikleri',
    abstract:
      'Batı Anadolu jeotermal sahaları, dünyanın en yüksek çözünmüş CO2 derişimine sahip hidrotermal akışkanlarını barındırmaktadır. Üretim sırasında basınç düşüşüyle gaz fazına geçen karbondioksit, hem sera gazı emisyonuna yol açmakta hem de kalsit (CaCO3) kabuklaşmasını tetikleyerek üretim kolonlarını tıkamaktadır. Bu çalışma, reenjeksiyon kuyularından rezervuara geri basılan süperkritik CO2-su karışımının 220°C sıcaklık ve 180 bar basınçtaki izotopik dengesini (δ¹³C ve δ¹⁸O) ve mineral tutma kapasitesini modellemektedir.',
    categoryId: 'topografya-mimari',
    categoryName: 'Topografya, Kentsel Morfoloji ve Jeoloji',
    authorIds: ['ayse-bozkurt'],
    publishDate: '2025-10-30',
    readTimeMinutes: 17,
    doi: '10.5582/yorunge.2025.13.3.10',
    volume: 13,
    issue: 3,
    featured: false,
    tags: ['Jeotermal', 'Menderes Grabeni', 'Karbon Enjeksiyonu', 'Kalsit Kabuklaşması', 'İzotop Jeokimyası'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Jeotermal enerji üretim santralinde buhar separatörleri ve reenjeksiyon boru hatları',
      caption: 'Aydın Germencik sahasında derin rezervuar akışkan örnekleme ve izotop analiz ünitesi.',
      photographer: 'Hacettepe Hidrojeoloji Grubu',
    },
    sections: [
      {
        heading: 'Rezervuar Jeolojisi ve Karbonat Dengesi',
        paragraphs: [
          'Menderes Masifi metamorfik taban mermerleri, derin jeotermal sirkülasyonun ana rezervuar kayacıdır. Magmatik kökenli yüksek sıcaklık ve tektonik kırık ağları, derin CO2 akısıyla birleştiğinde kalsit-dolomit çözünme dengesini dinamik tutar.',
          'Kuyu başında basıncın 25 barın altına inmesiyle çözünmüş HCO3⁻ iyonları hızla CO2 gazına dönüşür; pH aniden yükselerek kalsit çökelmesine sebep olur. Bu durum, kuyuların birkaç ay içinde debisini yarı yarıya kaybetmesiyle sonuçlanır.',
        ],
      },
      {
        heading: 'Süperkritik Karbon Enjeksiyonu ve Mineralleşme',
        paragraphs: [
          'Ayrıştırılan CO2 gazının reenjeksiyon suyuyla yüksek basınç altında karıştırılarak 2.800 metre derinlikteki rezervuar zonuna geri verilmesi, akışkanın asitlik dengesini koruyarak yüzey emisyonunu sıfırlamaktadır.',
        ],
        callout: {
          type: 'methodology',
          text: 'Rezervuar içi mineralleşme hızı, derin kuyu akışkanından alınan δ¹³C izotop sapmaları ve kalsit doygunluk indeksi (SI) ile izlenmiştir.',
        },
      },
    ],
    keyFindings: [
      'Geri basılan karbondioksitin %68’i rezervuar içindeki silikat mineralleriyle reaksiyona girerek kalıcı karbonat formuna dönüşmüştür.',
      'Reenjeksiyon basıncının 160 bar üzerinde tutulması kuyu dibi kalsit tıkanmalarını %92 oranında engellemiştir.',
      'Sistem, jeotermal enerji santrallerini net-sıfır karbonlu baz yük santrallerine dönüştürmektedir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Bozkurt, A. P. (2024). Carbon mineralization kinetics in deep geothermal reservoirs of western Anatolia. Geothermics, 119, 102940.', doi: '10.1016/j.geothermics.2024.102940' },
    ],
    metrics: { downloads: 1290, views: 4100, citations: 13 },
  },

  // 11
  {
    id: 'art-11',
    slug: 'kuantum-noktali-fotodedektor',
    title: 'Kızılötesi Atmosferik Pencereler İçin Koloidal Kuantum Noktalı Fotodedektör Dizilimi',
    subtitle: '3-5 µm Orta Dalga Kızılötesinde (MWIR) Oda Sıcaklığı Çalışma Hassasiyeti',
    abstract:
      'Geleneksel orta dalga kızılötesi (MWIR) dedektörleri, termal gürültüyü bastırmak için 77 Kelvin kriyojenik Stirling soğutucularına bağımlıdır. Bu durum gece görüş ve uzaktan algılama sistemlerinde ağır, pahalı ve bakım gerektiren modüllere yol açar. Bu çalışmada, civa tellürid (HgTe) koloidal kuantum noktaları kullanılarak sentezlenen ve termoelektrik (Peltier) soğutmayla 230 Kelvin sıcaklıkta çalışabilen yeni bir fotodiyot mimarisi geliştirilmiştir. Cihaz, 3.8 µm dalga boyunda 2.4x10¹⁰ Jones özgül algılama kabiliyeti (D*) sergilemektedir.',
    categoryId: 'malzeme-nano',
    categoryName: 'Kriyojenik ve Fonksiyonel Malzemeler',
    authorIds: ['kerem-tanaydin'],
    publishDate: '2025-09-08',
    readTimeMinutes: 14,
    doi: '10.5582/yorunge.2025.13.3.11',
    volume: 13,
    issue: 3,
    featured: false,
    tags: ['Kuantum Noktası', 'Fotodedektör', 'Kızılötesi Algılama', 'MWIR', 'Koloidal Nanomalzemeler'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
      alt: 'Laboratuvarda optik masa üzerinde lazer ve kuantum noktalı spektrometre sensörü',
      caption: 'TÜBİTAK MAM Nanoteknoloji Laboratuvarı fotodedektör spektral tepki ölçüm hücresi.',
      photographer: 'TÜBİTAK MAM',
    },
    sections: [
      {
        heading: 'Kuantum Sınırlandırma ve Bant Aralığı Ayarı',
        paragraphs: [
          'Koloidal nanokristaller, parçacık boyutu Bohr uyarılma yarıçapından küçük olduğunda kuantum sınırlandırma etkisi gösterir. HgTe kristitlerinin çapı 4.2 nm’den 6.8 nm’ye büyütüldüğünde soğurma kenarı 2.5 µm’den 5.0 µm’ye kadar hassas biçimde ayarlanabilmektedir.',
          'Bu esneklik, atmosferik su buharı ve CO2 soğurma bantlarının dışındaki 3-5 µm optik iletim penceresine tam uyum sağlamayı mümkün kılar.',
        ],
      },
      {
        heading: 'Taşıyıcı Ömrü ve Gürültü Karakterizasyonu',
        paragraphs: [
          'Kuantum noktaları arasındaki yük transferi, kısa zincirli inorganik ligandlar (etanditiyol ve bromür) kullanılarak artırılmıştır. Karanlık akım yoğunluğu 230 K’de 1.4x10⁻⁴ A/cm² seviyesinde tutulmuştur.',
        ],
        callout: {
          type: 'data',
          text: 'Dedektörün tepki süresi 32 nanosaniye olarak ölçülmüş; bu değer yüksek hızlı kızılötesi lazer haberleşmesi için uygun bulunmuştur.',
        },
      },
    ],
    keyFindings: [
      'Ağır ve pahalı sıvı azot veya Stirling soğutucularına olan bağımlılık ortadan kaldırılmıştır.',
      'Sensör üretim maliyeti geleneksel InSb veya MCT dedektörlere oranla %75 daha düşüktür.',
      'Dron tabanlı termal görüntüleme ve gaz kaçağı izleme kameralarında doğrudan uygulanabilir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Tanaydın, K. (2024). Colloidal quantum dot photodetectors operating in MWIR atmospheric window. ACS Photonics, 11, 3140-3152.', doi: '10.1021/acsphotonics.4c00918' },
    ],
    metrics: { downloads: 1080, views: 3650, citations: 10 },
  },

  // 12
  {
    id: 'art-12',
    slug: 'radyasyon-direncli-bakteri-dna',
    title: 'İyonlaştırıcı Radyasyon Stresi Altındaki Deinococcus İzolatlarında DNA Çift Zincir Kırığı Onarım Mekanizmaları',
    subtitle: '15 kGy Gama Işıması Sonrası Parçalanmış Genomun Yeniden Bütünleştirilmesi',
    abstract:
      'İyonlaştırıcı radyasyon, suyun radyolizi sonucu hidroksil radikalleri üreterek hücresel DNA omurgasında yüzlerce çift zincir kırığına (DSB) neden olur. Çoğu canlı hücrede birkaç kırık dahi ölümcülken, Deinococcus türleri binlerce kırığı dakikalar içerisinde hatasız birleştirebilmektedir. Bu makale, Anadolu kurak topraklarından izole edilen Deinococcus anatolica suşunda RecA bağımlı homolog rekombinasyon ve genişletilmiş sentez bağımlı iplik tavlama (ESDSA) yolaklarının transkripsiyonel kinetiğini aydınlatmaktadır.',
    categoryId: 'biyoloji-genetik',
    categoryName: 'Ekstremofil Biyolojisi ve Biyosensörler',
    authorIds: ['neslihan-aksoy'],
    publishDate: '2025-08-16',
    readTimeMinutes: 15,
    doi: '10.5582/yorunge.2025.13.2.12',
    volume: 13,
    issue: 2,
    featured: false,
    tags: ['Radyasyon Direnci', 'DNA Onarımı', 'Deinococcus', 'Gama Işıması', 'Antioksidan Savunma'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
      alt: 'Floresan mikroskobu altında parlayan bakteri kromatin yumakları ve DNA onarım odakları',
      caption: 'Gama ışınlaması sonrası hücre içi RecA protein filamentlerinin floresan etiketli izlenmesi.',
      photographer: 'Boğaziçi Radyobiyoloji Laboratuvarı',
    },
    sections: [
      {
        heading: 'Genom Parçalanması ve ESDSA Süreci',
        paragraphs: [
          '15 kGy dozunda gama radyasyonu, bakteri hücresi başına yaklaşık 1.500 DNA çift zincir kırığı oluşturur. Deinococcus bu durumda genomik parçacıkları örtüşen bölgelerinden bularak iplik uzatması yapar ve ardından çapraz krossing-over mekanizmasıyla dairesel kromozomu yeniden inşa eder.',
          'Hücrenin bu olağanüstü başarısının ardında yalnızca DNA onarım enzimleri değil, aynı zamanda proteinlerini serbest radikal hasarından koruyan yüksek mangan/demir iyon oranı yer alır.',
        ],
      },
      {
        heading: 'Transkripsiyonel Kinetik ve Protein Koruma',
        paragraphs: [
          'Western blot ve RNA-Seq analizleri, ışınlamanın hemen ardından antioksidan enzim genlerinin 8 kat, RecA ve DdrA proteinlerinin ise 14 kat arttığını ortaya koymuştur.',
        ],
        callout: {
          type: 'methodology',
          text: 'Işınlama deneyleri TAEK Sarayköy Nükleer Araştırma Merkezi Co-60 gama kaynağında kontrollü doz hızında gerçekleştirilmiştir.',
        },
      },
    ],
    keyFindings: [
      'Deinococcus anatolica suşu 15 kGy radyasyon dozunda %88 canlılık oranını korumuştur.',
      'Parçalanmış kromozom 4 saat içerisinde mutasyonsuz olarak tam boyuta ulaşmıştır.',
      'Mangan kompleksi bazlı küçük moleküller uzay radyasyonundan koruyucu terapötik modeller için temel teşkil edebilir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Aksoy, N. (2024). Genomic reassembly kinetics in radioresistant extremophiles. Nucleic Acids Research, 52, 7780-7794.', doi: '10.1093/nar/gkae412' },
    ],
    metrics: { downloads: 1410, views: 4320, citations: 18 },
  },

  // 13
  {
    id: 'art-13',
    slug: 'anadolu-diyalekt-ses-sentezi',
    title: 'Az Kaynaklı Anadolu Ağızları İçin Parametrik ve Dalga Formu Tabanlı Nöral Ses Sentezleyicisi',
    subtitle: 'Gırtlaksı ve Damaksı Ünsüz Varyasyonlarının Çoklu Hoparlörlü Difüzyon Modeliyle Korunması',
    abstract:
      'Geleneksel metin-okuma (TTS) modelleri, standart İstanbul Türkçesi ses fonolojisine göre eğitildiklerinden, Anadolu ağızlarındaki zengin damaksı art damak seslerini, sağır nün (ñ) varyasyonlarını ve tonlama vurgularını kaybetmektedir. Bu makale, Ege, Karadeniz ve Doğu Anadolu kırsalında derlenen 180 saatlik ses kayıtları üzerinde eğitilmiş, dalga formu difüzyon mimarisine dayanan parametrik bir konuşma sentezleyicisi sunmaktadır. Model, yalnızca 3 dakikalık örneklemle yeni konuşmacıların fonetik ve diyalekt karakterini %94 benzerlikle klonlayabilmektedir.',
    categoryId: 'noromorfik-bilisim',
    categoryName: 'Nöromorfik Bilişim ve Donanım Mimarisi',
    authorIds: ['yaman-sarpel'],
    publishDate: '2025-07-04',
    readTimeMinutes: 15,
    doi: '10.5582/yorunge.2025.13.2.13',
    volume: 13,
    issue: 2,
    featured: false,
    tags: ['Ses Sentezi', 'Anadolu Ağızları', 'Difüzyon Modeli', 'Doğal Dil İşleme', 'Fonetik Koruma'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      alt: 'Ses spektrogramı dalga formları ve nöral ağ katman grafiği',
      caption: 'Konuşma difüzyon modelinin fonem bazlı dikkat matrisi ve mel-spektrogram dönüşümü.',
      photographer: 'Bilkent UNAM Ses Laboratuvarı',
    },
    sections: [
      {
        heading: 'Fonetik Miras ve Dijital Temsil Darboğazı',
        paragraphs: [
          'Yapay zeka ses asistanlarının yaygınlaşması, bölgesel ağızların ve nesiller arası ses tonlamalarının standart bir homojenliğe itilmesine neden olmaktadır. Özellikle Karadeniz ve Doğu Anadolu ağızlarında yer alan nefesli ötümsüz ünsüzler ve vurgu kaymaları, standart dil modellerinin telaffuz edemediği karakteristik zenginliklerdir.',
          'Geliştirilen mimari, mel-spektrogram tahmini yapan bir dönüştürücü (transformer) gövdesi ile doğrudan zaman alanında ses üreten difüzyon dalgaformu sentezleyicisini birleştirir.',
        ],
      },
      {
        heading: 'Değerlendirme ve Dinleme Testleri',
        paragraphs: [
          'Yerel konuşmacılardan oluşan 40 kişilik bir dinleme jürisiyle yapılan ortalama görüş skoru (MOS) testlerinde model 4.42/5.00 puan almıştır.',
        ],
        callout: {
          type: 'data',
          text: 'Model parametre büyüklüğü 28 milyon ağırlıkta tutularak akıllı telefon ve gömülü çiplerde gerçek zamanlı çalışması sağlanmıştır.',
        },
      },
    ],
    keyFindings: [
      'Kaybolma tehlikesi altındaki 14 farklı Anadolu ağzı fonetik olarak dijital arşivlenmiştir.',
      'Sistem 3 dakikalık referans ses kaydıyla hedef ağzın perde aralığını ve vurgu ritmini yakalamaktadır.',
      'Açık erişimli ağırlıklar dilbilimsel ve kültürel miras araştırmalarına açılmıştır.',
    ],
    citations: [
      { id: 'c1', citationText: 'Sarpel, Y. (2024). Preserving regional phonetic heritage via zero-shot neural diffusion. Speech Communication, 156, 103019.', doi: '10.1016/j.specom.2024.103019' },
    ],
    metrics: { downloads: 1190, views: 3870, citations: 9 },
  },

  // 14
  {
    id: 'art-14',
    slug: 'kapadokya-tuf-kayac-nem-difuzyonu',
    title: 'Kapadokya Volkanik Tüflerinde Mevsimsel Donma-Çözülme Döngülerinin Mikro-Çatlak Yayılımına Etkisi',
    subtitle: 'Göreme ve Uçhisar Kaya Mimarilerinde Bozulma Kinetiğinin Akustik Emisyonla Takibi',
    abstract:
      'Kapadokya bölgesinin simgesi olan oyma kaya yerleşimleri, Miyosen döneminde çökelmiş piroklastik tüf formasyonlarının oyulmasıyla meydana getirilmiştir. Bu kayaçlar yüksek gözeneklilik ve düşük mekanik dayanımları sebebiyle donma-çözülme gerilmelerine ve kapiler su emilimine karşı son derece duyarlıdır. Bu araştırmada, Uçhisar mevkiinde kaya yüzeylerine yerleştirilen piezoelektrik akustik emisyon (AE) sensörleriyle kış mevsimi boyunca suyun buz fazına geçişinde oluşan mikro-çatlak yayılım enerjisi sürekli olarak kaydedilmiştir. Sonuçlar, kritik çatlak yayılımının sıcaklığın -2°C ile -6°C aralığına indiği saatlerde yoğunlaştığını ortaya koymaktadır.',
    categoryId: 'topografya-mimari',
    categoryName: 'Topografya, Kentsel Morfoloji ve Jeoloji',
    authorIds: ['elif-karadag', 'ayse-bozkurt'],
    publishDate: '2025-05-22',
    readTimeMinutes: 16,
    doi: '10.5582/yorunge.2025.13.2.14',
    volume: 13,
    issue: 2,
    featured: false,
    tags: ['Kapadokya', 'Volkanik Tüf', 'Donma-Çözülme', 'Akustik Emisyon', 'Kaya Mekaniği', 'Kültür Mirası'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      alt: 'Kapadokya vadi yamaçlarında oyma kaya pencereleri ve tüf katmanları dokusu',
      caption: 'Uçhisar kalesi eteklerinde volkanik tüf yüzeyinde akustik emisyon sensör yerleşimi.',
      photographer: 'İTÜ & Hacettepe Ortak Saha Seferi',
    },
    sections: [
      {
        heading: 'Piroklastik Kayaçların Gözenek Hacmi ve Su Davranışı',
        paragraphs: [
          'Kapadokya tüfleri %35 ila %48 arasında değişen olağanüstü yüksek bir gözeneklilik oranına sahiptir. Kılcal emilim katsayısı yüksek olan bu yapay olmayan süngerimsi doku, yağmur ve kar sularını bünyesine hızla çekmekte, ancak suyun buharlaşarak tahliyesi yavaş gerçekleşmektedir.',
          'Kış gecelerinde yüzeyde donan suyun genleşmesi (%9 hacim artışı), kılcal gözenek çeperlerinde çekme gerilmeleri yaratarak pul pul dökülmelere (spalling) ve derin çatlaklara yol açar.',
        ],
      },
      {
        heading: 'Akustik Emisyon Ölçümleri ve Restorasyon Çıkarımları',
        paragraphs: [
          'Kayaç içerisine 10 cm aralıklarla açılan mikro-sondajlara yerleştirilen 150 kHz rezonanslı AE sensörleri, çatlak oluşum anındaki elastik dalgaları milisaniye hassasiyetinde yakalamıştır. Donma cephesinin kaya içine doğru ilerleyiş hızı saatte 8 mm olarak belirlenmiştir.',
        ],
        callout: {
          type: 'data',
          text: 'En şiddetli mikro-çatlak patlamaları ani donma anında değil, sabah saatlerindeki hızlı güneş ışığıyla gerçekleşen termal şoklu çözülme evresinde kaydedilmiştir.',
        },
      },
    ],
    keyFindings: [
      'Termal genleşme farkları çözülme evresinde donma evresine kıyasla %54 daha fazla elastik enerji boşalmasına yol açmaktadır.',
      'Yüzey hidrofobik koruyucularının gözenekleri tamamen kapatmaması, buhar difüzyonuna izin vermesi zorunludur.',
      'Geliştirilen akustik emisyon izleme ağı UNESCO alanlarında anlık yapısal çökme erken uyarısı sağlayabilir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Karadağ, E. & Bozkurt, A. P. (2024). Acoustic emission monitoring of freeze-thaw damage in volcanic tuffs of Cappadocia. Rock Mechanics and Rock Engineering, 57, 4510-4528.', doi: '10.1007/s00603-024-03822-1' },
    ],
    metrics: { downloads: 1310, views: 3990, citations: 12 },
  },

  // 15
  {
    id: 'art-15',
    slug: 'lityum-hava-pil-katot-kararlilik',
    title: 'Katı Elektrolitli Lityum-Hava Hücrelerinde Karbonat Oluşumunu Engelleyen Nanogözenekli Rutenyum Oksit Katotlar',
    subtitle: '1.000 Wh/kg Teorik Enerji Yoğunluğuna Sahip Bataryalarda Tersinir Li2O2 Reaksiyonu',
    abstract:
      'Lityum-hava (Li-O2) bataryaları, benzininkine yakın teorik özgül enerjileri nedeniyle elektrikli havacılık ve uzun menzilli taşımacılıkta nihai hedef olarak görülmektedir. Ancak, deşarj sırasında oluşan lityum peroksitin (Li2O2) şarj esnasında ayrıştırılamaması ve ortamdaki CO2 ile reaksiyona girerek yalıtkan lityum karbonat (Li2CO3) tabakası oluşturması döngü ömrünü onlarca çevrimle sınırlandırmaktadır. Bu çalışmada, nanogözenekli rutenyum oksit (RuO2) katalizörüyle modifiye edilmiş seramik katı elektrolitli Li-O2 hücreleri geliştirilmiş ve 400 tam döngü boyunca kapasite kaybı %6 sınırında tutulmuştur.',
    categoryId: 'malzeme-nano',
    categoryName: 'Kriyojenik ve Fonksiyonel Malzemeler',
    authorIds: ['kerem-tanaydin'],
    publishDate: '2025-04-10',
    readTimeMinutes: 16,
    doi: '10.5582/yorunge.2025.13.1.15',
    volume: 13,
    issue: 1,
    featured: false,
    tags: ['Lityum Hava Bataryası', 'RuO2 Katalizör', 'Katı Elektrolit', 'Enerji Yoğunluğu', 'Elektrokimya'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
      alt: 'Temiz oda eldivenli kutusunda (glovebox) lityum hücre montajı ve elektrokimyasal potansiyostat',
      caption: 'TÜBİTAK MAM Elektrokimyasal Enerji Laboratuvarı batarya döngü test istasyonu.',
      photographer: 'TÜBİTAK MAM',
    },
    sections: [
      {
        heading: 'Hava Katodundaki Parazitik Reaksiyonlar',
        paragraphs: [
          'Lityum-hava bataryasında pozitif elektrot olarak ortamın oksijeni kullanılır. Ancak ortam havasındaki nem ve karbondioksit, katotta katı lityum hidroksit ve lityum karbonat kabukları oluşturur. 4.2 Volt üzeri şarj potansiyelleri elektroliti ve karbon iskeleyi oksitleyerek bataryanın iflasına yol açar.',
          'Geliştirilen mimaride, karbon iskele tamamen terk edilmiş; bunun yerine iletken ve yüksek katalitik aktiviteye sahip nanogözenekli RuO2 ağı inşa edilmiştir.',
        ],
      },
      {
        heading: 'Elektrokimyasal Kararlılık ve Raman Doğrulaması',
        paragraphs: [
          'In-situ Raman spektroskopisi ölçümleri, deşarj ürünü olan Li2O2 kristallerinin 3.4 Volt gibi düşük bir aşırı gerilimde (overpotential) tamamen lityum ve oksijene ayrıştığını, hiçbir karbonat yan ürünü oluşmadığını kanıtlamıştır.',
        ],
        callout: {
          type: 'note',
          text: 'Hücre 800 mAh/g kesme kapasitesinde çalıştırılmış ve 400 çevrim boyunca aşırı gerilim artışı 0.2 V ile sınırlı kalmıştır.',
        },
      },
    ],
    keyFindings: [
      'Karbonsuz RuO2 katot mimarisi şarj aşırı gerilimini 4.3 V’tan 3.4 V’a indirmiştir.',
      'Katı seramik elektrolit lityum dendritlerinin oluşumunu tamamen bloke etmiştir.',
      'Enerji verimliliği %64’ten %82’ye yükseltilerek uygulanabilir seviyeye ulaşılmıştır.',
    ],
    citations: [
      { id: 'c1', citationText: 'Tanaydın, K. (2024). Carbon-free RuO2 cathodes enabling long-life solid-state Li-air batteries. Nature Communications, 15, 4120.', doi: '10.1038/s41467-024-48912-3' },
    ],
    metrics: { downloads: 1890, views: 6100, citations: 27 },
  },

  // 16
  {
    id: 'art-16',
    slug: 'biyouyumlu-hidrojel-noron-iskele',
    title: 'Hasarlı Kortikal Dokuların Onarımı İçin İpek Fibroini Destekli İletken Polimer Hidrojeller',
    subtitle: 'Nöronal Akson Uzantılarını Yönlendiren 3B Biyo-Baskılı İletken Ağlar',
    abstract:
      'Travmatik beyin hasarları ve omurilik yaralanmalarında akson iletim hatlarının kopması, merkezi sinir sisteminin sınırlı rejenerasyon kapasitesi nedeniyle kalıcı felçlere yol açmaktadır. Bu çalışmada, Bursa ipekböceği kozalarından saflaştırılan biyouyumlu ipek fibroini ile iletken polimer poli(3,4-etilendioksitiyofen) (PEDOT:PSS) harmanlanarak 3 boyutlu biyo-yazıcı ile nöral doku iskeleleri üretilmiştir. Primer kortikal nöron kültürlerinde iskelenin elektriksel iletkenliği (12 S/m), aksiyon potansiyeli yayılımını ve aksonal dallanmayı %72 oranında hızlandırmıştır.',
    categoryId: 'biyoloji-genetik',
    categoryName: 'Ekstremofil Biyolojisi ve Biyosensörler',
    authorIds: ['canan-erbilgic', 'yaman-sarpel'],
    publishDate: '2025-02-14',
    readTimeMinutes: 18,
    doi: '10.5582/yorunge.2025.13.1.16',
    volume: 13,
    issue: 1,
    featured: true,
    tags: ['Doku Mühendisliği', 'İletken Hidrojel', 'İpek Fibroini', 'Nöral Rejenerasyon', 'PEDOT:PSS'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      alt: 'Biyouyumlu hidrojel iskele üzerinde büyüyen floresan parıltılı nöron hücre ağları',
      caption: 'Konfokal lazer tarama mikroskobunda ipek fibroini iskelede nörit uzantılarının yönelimi.',
      photographer: 'Sabancı Üniversitesi Biyomalzeme Grubu',
    },
    sections: [
      {
        heading: 'Nöral Arayüzlerde Biyo-Mekanik Uyum Sorunu',
        paragraphs: [
          'Geleneksel metalik elektrotlar veya rijit silikon sondalar, beynin son derece yumuşak (Young modülü E ~ 1-5 kPa) elastik yapısıyla mekanik uyuşmazlık gösterir. Mikro-hareketler glial skar oluşumunu tetikleyerek sinyal iletimini birkaç haftada keser.',
          'İpek fibroini hidrojelleri ise beynin yumuşaklığına tam uyum sağlarken, yapıya katılan iletken PEDOT polimerleri nöronların elektriksel sinyallerini hücresel düzeyde köprülemeye olanak tanır.',
        ],
      },
      {
        heading: 'İn-Vitro ve İn-Vivo Nöral Büyüme Sonuçları',
        paragraphs: [
          'Fare kortikal nöronlarıyla yapılan 21 günlük kültür testlerinde, elektriksel stimülasyon uygulanan iletken iskelelerde sinaptogenez belirteci sinaptofizin ekspresyonunun 3 kat arttığı gözlenmiştir.',
        ],
        callout: {
          type: 'methodology',
          text: 'İskelelerin mekanik viskoelastisitesi reometre testleriyle optimize edilmiş, doku içi inflamatuar sitokin tepkisi ELISA ile izlenmiştir.',
        },
      },
    ],
    keyFindings: [
      'İskele, kortikal nöronların aksonal uzantılarını belirlenen doğrultuda yönlendirmiştir.',
      'Enflamatuar mikroglia aktivasyonu kontrol gruplarına göre %60 daha düşük kalmıştır.',
      'Beyin-bilgisayar arayüzlerinde uzun ömürlü biyouyumlu elektrot kaplaması olarak kullanım potansiyeline sahiptir.',
    ],
    citations: [
      { id: 'c1', citationText: 'Erbilgiç, C. & Sarpel, Y. (2024). Conductive silk fibroin hydrogels for functional axonal regeneration. Biomaterials, 305, 122480.', doi: '10.1016/j.biomaterials.2024.122480' },
    ],
    metrics: { downloads: 1720, views: 5600, citations: 23 },
  },
];

// ============================================================================
// 5. TEKNİK VE AKADEMİK FORUM KONULARI (12 TARTIŞMA BAŞLIĞI)
// ============================================================================

export const forumThreads: ForumThread[] = [
  // 1
  {
    id: 'th-01',
    slug: 'dag-teleskop-spektrometre-kalibrasyon',
    title: 'DAG 4-metre aynasında düşük irtifa atmosferik dispersiyon düzeltmesi tecrübeleri',
    categoryId: 'yorunge-uzay',
    categoryName: 'Yörünge Mekaniği ve Uzay Sistemleri',
    author: {
      id: 'metehan-ozgorus',
      name: 'Prof. Dr. Metehan Özgörüş',
      role: 'Moderatör & DAG Direktörü',
      affiliation: 'Erzurum Doğu Anadolu Gözlemevi',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-09-02T14:20:00Z',
    pinned: true,
    solved: true,
    tags: ['Adaptif Optik', 'Dispersiyon Düzeltmesi', 'DAG', 'Spektrometre'],
    viewCount: 1420,
    replyCount: 3,
    likeCount: 48,
    initialPost: {
      content:
        'Teleskobun zenith açısı 50 derecenin üzerine çıktığında mavi ve kırmızı dalga boyları arasındaki diferansiyel atmosferik kırılma (DAR) 1.4 ark-saniyeye ulaşıyor. Spektrometre giriş yarığında ışık kaybını engellemek için prizmatik atmosferik dispersiyon düzelticinin (ADC) dönüş açısını gerçek zamanlı hava basıncına göre dinamik ayarlıyoruz. Ancak kış aylarında prizma dönüş motorunda 40 ms civarında bir mekanik histerezis saptadık. Benzer kurulumlarda bu histerezisi yazılımsal ön-gerilim (pre-tensioning) ile çözen oldu mu?',
      codeSnippet: `// ADC Prizma Açı Kestirimi Fonksiyonu
function calculateADCPrismAngle(zenithRad, pressureHPa, tempK, lambdaMicron) {
  const n = 1 + (77.6e-6 * pressureHPa / tempK) * (1 + 0.0053 * Math.pow(lambdaMicron, -2));
  const dispersion = (n - 1) * Math.tan(zenithRad);
  return Math.acos(Math.min(1.0, dispersion / MAX_PRISM_DISPERSION));
}`,
    },
    replies: [
      {
        id: 'rep-01-1',
        author: {
          name: 'Prof. Dr. Haluk Demiriz',
          role: 'Araştırmacı',
          affiliation: 'İTÜ Uçak ve Uzay Bilimleri',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-09-02T16:45:00Z',
        content:
          'Hocam benzer histerezis sorununu TUG RTT150 teleskobunun odak mekanizmasında enkoder kompanzasyonu ile çözmüştük. Prizma dönüşünü her zaman aynı yönden (örneğin saat yönünde) hedefe yaklaştıracak tek yönlü yaklaşım algoritması (anti-backlash positioning) sürücü yazılımına eklenirse histerezis etkisi sıfırlanabilir.',
        likeCount: 19,
        isAcceptedAnswer: true,
      },
      {
        id: 'rep-01-2',
        author: {
          name: 'Dr. Yaman Sarpel',
          role: 'Araştırmacı',
          affiliation: 'Bilkent UNAM',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-09-03T09:12:00Z',
        content:
          'Step motor sürücüsüne akım profillemesi ekleyip düşük sıcaklıkta yağ vizkozitesinin artışını telafi eden mikro-adımlama darbe genişliği (pulse width) uygulanabilir. -20 derecede gres viskozitesi tork ihtiyacını %60 artırıyor.',
        likeCount: 12,
      },
      {
        id: 'rep-01-3',
        author: {
          name: 'Prof. Dr. Metehan Özgörüş',
          role: 'Moderatör & DAG Direktörü',
          affiliation: 'Erzurum Doğu Anadolu Gözlemevi',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-09-03T18:30:00Z',
        content:
          'Haluk Hocam, tek yönlü yaklaşım mantığını bu geceki gözlem scriptine entegre ettik. Dispersiyon yarığı üzerindeki kayma 0.05 ark-saniye seviyesine geriledi. Çözüm olarak işaretliyorum, teşekkürler.',
        likeCount: 15,
      },
    ],
  },

  // 2
  {
    id: 'th-02',
    slug: 'karadeniz-ctd-veri-seti-paylasimi',
    title: 'TÜBİTAK Marmara Araştırma Gemisi 2025 Sonbahar CTD Ham Veri Seti erişim protokolü',
    categoryId: 'okyanus-klima',
    categoryName: 'Oşinografi ve Karasal İklim Sistemleri',
    author: {
      id: 'selin-vardar',
      name: 'Doç. Dr. Selin Vardar',
      role: 'Oşinografi Grubu Yürütücüsü',
      affiliation: 'ODTÜ Deniz Bilimleri Enstitüsü',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-08-20T11:05:00Z',
    pinned: false,
    solved: true,
    tags: ['Karadeniz', 'CTD Verisi', 'Açık Veri', 'NetCDF', 'ODTÜ'],
    viewCount: 980,
    replyCount: 2,
    likeCount: 34,
    initialPost: {
      content:
        'Ekim 2025 seferinde batı baseni boyunca toplanan 120 istasyonluk Seabird 911plus CTD ham verilerini ve çözünmüş oksijen kalibrasyon katsayılarını Yörünge Dergisi açık veri havuzuna NetCDF formatında yükledik. İstasyonlar arası 0-200 metre derinlik kesitlerini görselleştirmek için örnek Python scriptini aşağıda paylaşıyorum.',
      codeSnippet: `import xarray as xr
import matplotlib.pyplot as plt

# Karadeniz CTD NetCDF Veri Seti Yükleme
ds = xr.open_dataset('blacksea_ctd_2025_autumn.nc')
sigma_theta = ds['potential_density']
oxygen = ds['dissolved_oxygen']

fig, ax = plt.subplots(figsize=(10, 5))
cs = ax.contourf(ds.station, ds.depth, oxygen, levels=20, cmap='viridis')
plt.gca().invert_yaxis()
plt.colorbar(cs, label='O2 Derisimi [uM]')
plt.title('Bati Karadeniz Dikey Oksijen Profili - Ekim 2025')
plt.show()`,
    },
    replies: [
      {
        id: 'rep-02-1',
        author: {
          name: 'Dr. Canan Erbilgiç',
          role: 'Araştırmacı',
          affiliation: 'Sabancı Üniversitesi Biyomühendislik',
          avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-08-21T14:10:00Z',
        content:
          'Selin Hocam veriler için çok teşekkürler. Sediment karot örnekleme noktalarımızla örtüşen istasyonlarda taban üstü 5 metreye ait bulanıklık (turbidity) sensör kanalı da mevcut mu?',
        likeCount: 8,
      },
      {
        id: 'rep-02-2',
        author: {
          name: 'Doç. Dr. Selin Vardar',
          role: 'Oşinografi Grubu Yürütücüsü',
          affiliation: 'ODTÜ Deniz Bilimleri Enstitüsü',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-08-21T16:00:00Z',
        content:
          'Evet Canan Hocam, Seapoint Turbidity Meter verisi "turbidity_FTU" değişkeni altında mevcuttur. Dip akıntısının yarattığı bentik sınır tabakası süspansiyonunu net bir şekilde görebilirsiniz.',
        likeCount: 11,
        isAcceptedAnswer: true,
      },
    ],
  },

  // 3
  {
    id: 'th-03',
    slug: 'aerojel-vakum-presleme-hatasi',
    title: 'Kriyostat izolasyon testlerinde 0.05 bar altı delaminasyon problemi yaşayan var mı?',
    categoryId: 'malzeme-nano',
    categoryName: 'Kriyojenik ve Fonksiyonel Malzemeler',
    author: {
      id: 'kerem-tanaydin',
      name: 'Dr. Kerem Tanaydın',
      role: 'Başuzman Araştırmacı',
      affiliation: 'TÜBİTAK MAM Malzeme Enstitüsü',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-08-11T10:15:00Z',
    pinned: false,
    solved: false,
    tags: ['Aerojel', 'Delaminasyon', 'Kriyostat', 'Kompozit', 'Vakum'],
    viewCount: 760,
    replyCount: 2,
    likeCount: 21,
    initialPost: {
      content:
        'Karbon fiber tank cidarının dışına epoksi bazlı yapıştırıcı ile lamine ettiğimiz grafen aerojel blokları, kriyostat vakum seviyesi 10⁻³ mbar değerine indiğinde arayüzeyden kabarma yaparak ayrılıyor. Aerojelin açık gözenekli yapısındaki hapsolmuş havanın tahliye hızının yetersiz kalması sonucu iç basınç gradyanı oluştuğunu düşünüyoruz. Gözenek perfüzyonunu bozmadan gaz tahliyesini hızlandıracak bir delik düzeni önerisi olan var mı?',
    },
    replies: [
      {
        id: 'rep-03-1',
        author: {
          name: 'Y. Mimar Elif Karadağ',
          role: 'Araştırmacı',
          affiliation: 'İTÜ Mimarlık Fakültesi',
          avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-08-11T13:40:00Z',
        content:
          'Gözenekli seramiklerde benzer gaz kilitlenmesi durumlarında lazerle 80 mikronluk konik kılcal mikro-kanallar açıyoruz. Kılcal kanallar akışkan geçirgenliğini sağlarken termal köprüleme alanını ihmal edilebilir (%0.02) düzeyde tutuyor.',
        likeCount: 14,
      },
      {
        id: 'rep-03-2',
        author: {
          name: 'Dr. Kerem Tanaydın',
          role: 'Başuzman Araştırmacı',
          affiliation: 'TÜBİTAK MAM Malzeme Enstitüsü',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-08-12T08:50:00Z',
        content:
          'Elif Hanım, pikosaniye lazerle 100 mikronluk aralıklarla mikro delme denemesi planladık. Sonuçları buradan paylaşacağım.',
        likeCount: 7,
      },
    ],
  },

  // 4
  {
    id: 'th-04',
    slug: 'crispr-cas12-tuz-toleransi',
    title: 'Halofilik arkelerde Cas12a enzimi yüksek Mg2+ derişiminde kesim etkinliğini kaybediyor',
    categoryId: 'biyoloji-genetik',
    categoryName: 'Ekstremofil Biyolojisi ve Biyosensörler',
    author: {
      id: 'neslihan-aksoy',
      name: 'Doç. Dr. Neslihan Aksoy',
      role: 'Laboratuvar Direktörü',
      affiliation: 'Boğaziçi Üniversitesi Moleküler Biyoloji ve Genetik',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-07-15T15:30:00Z',
    pinned: false,
    solved: true,
    tags: ['CRISPR', 'Cas12a', 'Halofilik', 'Magnezyum', 'Tuz Toleransı'],
    viewCount: 1100,
    replyCount: 2,
    likeCount: 42,
    initialPost: {
      content:
        'Tuz Gölü Halorubrum suşlarında hedefli genom düzenlemesi yapmak amacıyla FnCas12a enzimi kullanıyoruz. Ancak sitoplazma içi magnezyum seviyesi 150 mM üzerine çıktığında Cas12a hedef dışı (off-target) kesimleri artırıyor ve hedef DNA’ya tutunamıyor. Magnezyum yerine manganez (Mn2+) ko-faktörü ikamesi deneyen oldu mu?',
    },
    replies: [
      {
        id: 'rep-04-1',
        author: {
          name: 'Dr. Canan Erbilgiç',
          role: 'Araştırmacı',
          affiliation: 'Sabancı Üniversitesi Biyomühendislik',
          avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-07-16T10:15:00Z',
        content:
          'Hocam Mn2+ ko-faktörü katalitik hızı artırsa da nükleazın özgüllüğünü (fidelity) zayıflatabiliyor. Bunun yerine Cas12a katalitik cebindeki iki lizin kalıntısını glutamata çeviren engineered AsCas12a-Ultra varyantını denemenizi öneririm. Yüksek iyonik şiddette negatif yük kalkanı oluşturuyor.',
        likeCount: 24,
        isAcceptedAnswer: true,
      },
      {
        id: 'rep-04-2',
        author: {
          name: 'Doç. Dr. Neslihan Aksoy',
          role: 'Laboratuvar Direktörü',
          affiliation: 'Boğaziçi Üniversitesi Moleküler Biyoloji ve Genetik',
          avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-07-17T11:20:00Z',
        content:
          'Canan Hocam, bahsettiğiniz varyantın plazmitini temin edip denedik; 200 mM Mg2+ altında dahi hedef kesim verimi %82’ye çıktı. Harika bir yönlendirme oldu.',
        likeCount: 18,
      },
    ],
  },

  // 5
  {
    id: 'th-05',
    slug: 'spiking-nn-fpga-kaynak-tuketimi',
    title: 'Xilinx UltraScale+ üzerinde 50k nöronluk spiking dizini gecikme süreleri',
    categoryId: 'noromorfik-bilisim',
    categoryName: 'Nöromorfik Bilişim ve Donanım Mimarisi',
    author: {
      id: 'yaman-sarpel',
      name: 'Dr. Yaman Sarpel',
      role: 'Kıdemli Araştırmacı',
      affiliation: 'Bilkent UNAM',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-06-30T17:00:00Z',
    pinned: false,
    solved: false,
    tags: ['FPGA', 'Spiking Nöron', 'UltraScale', 'DSP Blokları', 'Gecikme'],
    viewCount: 890,
    replyCount: 2,
    likeCount: 29,
    initialPost: {
      content:
        'ZCU102 geliştirme kartında Leaky Integrate-and-Fire (LIF) nöron modellerini sentezliyoruz. 50.000 nöron ve ortalama 100 sinaps/nöron ölçeğinde Block RAM tüketimi %78’e ulaştı. Sinaptik ağırlık güncellemelerini 8-bit sabit noktalı aritmetik yerine 4-bit logaritmik temsile indirgersek doğruluk kaybı olmadan DSP bloklarından tasarruf mümkün olur mu?',
    },
    replies: [
      {
        id: 'rep-05-1',
        author: {
          name: 'Prof. Dr. Haluk Demiriz',
          role: 'Araştırmacı',
          affiliation: 'İTÜ Uçak ve Uzay Bilimleri',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-07-01T09:30:00Z',
        content:
          'Uydu yönelim kontrolünde kullandığımız spiking filtrelerinde 4-bit logaritmik kodlama ağırlık matrisini Lookup Table (LUT) içine taşımamızı sağladı. Çarpma işlemlerini bit kaydırma (shift) işlemine dönüştürdüğü için DSP kullanımı %65 azaldı.',
        likeCount: 16,
      },
      {
        id: 'rep-05-2',
        author: {
          name: 'Dr. Yaman Sarpel',
          role: 'Kıdemli Araştırmacı',
          affiliation: 'Bilkent UNAM',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-07-01T12:00:00Z',
        content:
          'Shift-add mantığı gerçekten mantıklı, Vivado sentezinde deneyeceğim. Teşekkürler Haluk Hocam.',
        likeCount: 9,
      },
    ],
  },

  // 6
  {
    id: 'th-06',
    slug: 'akinti-turbini-kavitasyon-olcumleri',
    title: 'Boğaz akıntısında 3.2 m/s hızda kanat ucu kavitasyonu için hidrofon yerleşimi',
    categoryId: 'okyanus-klima',
    categoryName: 'Oşinografi ve Karasal İklim Sistemleri',
    author: {
      id: 'haluk-demiriz',
      name: 'Prof. Dr. Haluk Demiriz',
      role: 'Bölüm Başkanı',
      affiliation: 'İTÜ Uçak ve Uzay Bilimleri',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-06-10T14:40:00Z',
    pinned: false,
    solved: true,
    tags: ['Kavitasyon', 'Hidrofon', 'Akıntı Türbini', 'Akustik İzleme', 'Boğaziçi'],
    viewCount: 1250,
    replyCount: 3,
    likeCount: 37,
    initialPost: {
      content:
        'Kandilli açıklarında 45 metre derinlikteki türbin platformunda kanat ucu girdap kavitasyonunun başlangıcını (inception) akustik olarak izlemek istiyoruz. Gemilerin makine gürültüsü ve çevre gürültüsünü filtrelemek için hidrofonları gondol üzerine mi yoksa dip tabanına ankrajlanmış bir dikey dizilim üzerine mi yerleştirmek daha yüksek sinyal/gürültü (SNR) oranı verir?',
    },
    replies: [
      {
        id: 'rep-06-1',
        author: {
          name: 'Doç. Dr. Selin Vardar',
          role: 'Oşinografi Grubu Yürütücüsü',
          affiliation: 'ODTÜ Deniz Bilimleri Enstitüsü',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-06-10T16:20:00Z',
        content:
          'Gondol gövdesi mekanik şanzıman ve yatak titreşimlerini doğrudan hidrofona ileteceği için yanıltıcı harmonikler üretir. Taban ankrajlı, türbin ekseninin 2 rotor çapı arkasında ve kanat diski hizasında konumlandırılmış 4 elemanlı dikey dizi yüksek frekanslı kavitasyon patlamalarını (40-100 kHz) çok daha temiz ayrıştırır.',
        likeCount: 22,
        isAcceptedAnswer: true,
      },
      {
        id: 'rep-06-2',
        author: {
          name: 'Prof. Dr. Metehan Özgörüş',
          role: 'Araştırmacı',
          affiliation: 'Erzurum Doğu Anadolu Gözlemevi',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-06-11T09:00:00Z',
        content:
          'Gemi trafiğinden kaynaklanan düşük frekanslı dip gürültüsü (< 2 kHz) için 20 kHz yüksek geçiren Butterworth filtre uygulanmasını da öneririm.',
        likeCount: 13,
      },
      {
        id: 'rep-06-3',
        author: {
          name: 'Prof. Dr. Haluk Demiriz',
          role: 'Bölüm Başkanı',
          affiliation: 'İTÜ Uçak ve Uzay Bilimleri',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-06-11T15:30:00Z',
        content:
          'Selin Hocamın önerdiği 4 elemanlı dip dizilimi kurgusunu benimsedik. Destek için teşekkürler.',
        likeCount: 11,
      },
    ],
  },

  // 7
  {
    id: 'th-07',
    slug: 'tarihi-harc-xrf-analizi',
    title: '16. yüzyıl Edirne tuğla harçlarında puzolanik kireç oranının spektrometrik tayini',
    categoryId: 'topografya-mimari',
    categoryName: 'Topografya, Kentsel Morfoloji ve Jeoloji',
    author: {
      id: 'elif-karadag',
      name: 'Y. Mimar Elif Karadağ',
      role: 'Araştırmacı',
      affiliation: 'İTÜ Mimarlık Fakültesi',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-05-19T13:10:00Z',
    pinned: false,
    solved: false,
    tags: ['Horasan Harcı', 'XRF Analizi', 'Puzolanik Reaktivite', 'Edirne Yapıları'],
    viewCount: 640,
    replyCount: 2,
    likeCount: 19,
    initialPost: {
      content:
        'Selimiye ve Üç Şerefeli cami külliyelerinden dökülen tarihi harç numunelerinde X-ışını floresans (XRF) analizlerinde kalsiyum oksit (CaO) ile silisyum dioksit (SiO2) oranları 1.8 ile 2.4 arasında çıkıyor. Ancak pişmiş tuğla kırıklarının puzolanik bağlayıcılık katsayısını serbest kireçten ayrıştırmada XRF tek başına yetersiz kalıyor. Termogravimetrik analiz (TGA) desteği verebilecek laboratuvar var mı?',
    },
    replies: [
      {
        id: 'rep-07-1',
        author: {
          name: 'Dr. Ayşe Perver Bozkurt',
          role: 'Araştırmacı',
          affiliation: 'Hacettepe Üniversitesi Jeoloji Mühendisliği',
          avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-05-19T17:25:00Z',
        content:
          'Elif Hanım, Hacettepe Mineraloji Laboratuvarımızda Netzsch STA 449 TGA-DSC cihazımız mevcut. 105-400°C arasındaki hidrate kalsiyum silikat (C-S-H) su kaybı ile 600-800°C arasındaki kalsit kalsinasyonunu net olarak ayırabiliriz. 15 numuneye kadar gönderebilirsiniz.',
        likeCount: 16,
      },
      {
        id: 'rep-07-2',
        author: {
          name: 'Y. Mimar Elif Karadağ',
          role: 'Araştırmacı',
          affiliation: 'İTÜ Mimarlık Fakültesi',
          avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-05-20T09:10:00Z',
        content:
          'Ayşe Hocam çok teşekkür ederim, numuneleri asitsiz kilitli tüplerde kargoluyorum.',
        likeCount: 8,
      },
    ],
  },

  // 8
  {
    id: 'th-08',
    slug: 'enzim-immobilizasyon-zeolit',
    title: 'Sentetik gözenekli zeolitlerde lakkaz enzim tutunma verimi ve pH kararlılığı',
    categoryId: 'biyoloji-genetik',
    categoryName: 'Ekstremofil Biyolojisi ve Biyosensörler',
    author: {
      id: 'canan-erbilgic',
      name: 'Dr. Canan Erbilgiç',
      role: 'Araştırmacı',
      affiliation: 'Sabancı Üniversitesi Biyomühendislik',
      avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-04-22T11:45:00Z',
    pinned: false,
    solved: true,
    tags: ['Lakkaz', 'Zeolit', 'İmmobilizasyon', 'Atık Su', 'pH Stabilitesi'],
    viewCount: 820,
    replyCount: 2,
    likeCount: 27,
    initialPost: {
      content:
        'Tekstil boyarmaddelerinin atık sudan giderimi için mantar kaynaklı lakkaz enzimini 4A tipi mikrogözenekli zeolit yüzeyine kovalent bağlıyoruz (glutaraldehit köprülemesi ile). Ancak pH 4.5 altında enzim desorpsiyonu hızlanıyor. Yüzey yük modifikasyonu için amino-propiltrietoksisilan (APTES) ön uygulaması yapanların deneyimleri nasıldır?',
    },
    replies: [
      {
        id: 'rep-08-1',
        author: {
          name: 'Dr. Kerem Tanaydın',
          role: 'Başuzman Araştırmacı',
          affiliation: 'TÜBİTAK MAM Malzeme Enstitüsü',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-04-22T15:20:00Z',
        content:
          'APTES silanlaması öncesi zeolit yüzeyini 1 M piranha solüsyonu ile hidroksillemek bağ yoğunluğunu 4 kat artırıyor. Bu işlem pH 3.0’a kadar kovalent bağ kopmalarını engeller.',
        likeCount: 17,
        isAcceptedAnswer: true,
      },
      {
        id: 'rep-08-2',
        author: {
          name: 'Dr. Canan Erbilgiç',
          role: 'Araştırmacı',
          affiliation: 'Sabancı Üniversitesi Biyomühendislik',
          avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-04-23T10:00:00Z',
        content:
          'Kerem Bey, piranha aktivasyonu sonrası APTES kaplama denemesinde enzim aktivite kaybı %3 seviyesine indi, çok başarılı bir protokol.',
        likeCount: 12,
      },
    ],
  },

  // 9
  {
    id: 'th-09',
    slug: 'kup-uydu-uhf-yer-istasyonu',
    title: '437 MHz frekansında Doppler kayması kompanzasyonu için açık kaynak Gnuradio blokları',
    categoryId: 'yorunge-uzay',
    categoryName: 'Yörünge Mekaniği ve Uzay Sistemleri',
    author: {
      id: 'haluk-demiriz',
      name: 'Prof. Dr. Haluk Demiriz',
      role: 'Bölüm Başkanı',
      affiliation: 'İTÜ Uçak ve Uzay Bilimleri',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-03-14T09:00:00Z',
    pinned: false,
    solved: false,
    tags: ['Yer İstasyonu', 'Doppler Kayması', 'GNU Radio', 'Küp Uydu', 'UHF'],
    viewCount: 1040,
    replyCount: 2,
    likeCount: 31,
    initialPost: {
      content:
        'İTÜ Ayazağa yer istasyonunda alçak yörünge geçişlerinde (LEO) ±10 kHz mertebesine varan Doppler frekans kaymasını TLE yörünge verisiyle anlık senkronize eden Gnuradio OOT bloğumuzu GitHub depomuza ekledik. SDR alıcılarında paket kaybı yaşayan ekiplerin test ederek geri bildirim vermesini rica ediyoruz.',
    },
    replies: [
      {
        id: 'rep-09-1',
        author: {
          name: 'Dr. Yaman Sarpel',
          role: 'Araştırmacı',
          affiliation: 'Bilkent UNAM',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-03-14T14:30:00Z',
        content:
          'Hocam RTL-SDR ve HackRF üzerinde denedik. Gpredict soket bağlantısıyla entegre edildiğinde 9.600 baud GFSK paket yakalama oranı %98’e ulaştı. Yalnızca geçişin tam zenith tepe noktasında dF/dt oranı maksimuma çıktığında PLL kilidinde ufak bir titreme oluyor.',
        likeCount: 14,
      },
      {
        id: 'rep-09-2',
        author: {
          name: 'Prof. Dr. Haluk Demiriz',
          role: 'Bölüm Başkanı',
          affiliation: 'İTÜ Uçak ve Uzay Bilimleri',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-03-15T11:00:00Z',
        content:
          'Yaman Bey, zenith geçişinde PLL bant genişliğini anlık genişleten adaptif döngü filtresi ekleyip depoyu güncelledik.',
        likeCount: 10,
      },
    ],
  },

  // 10
  {
    id: 'th-10',
    slug: 'menderes-jeotermal-kalsit-kabuklasma',
    title: '220°C kuyu dibi sıcaklığında polifosfat bazlı inhibitörlerin kalsit çökelmesini önleme performansı',
    categoryId: 'topografya-mimari',
    categoryName: 'Topografya, Kentsel Morfoloji ve Jeoloji',
    author: {
      id: 'ayse-bozkurt',
      name: 'Dr. Ayşe Perver Bozkurt',
      role: 'Araştırmacı',
      affiliation: 'Hacettepe Üniversitesi Jeoloji Mühendisliği',
      avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-02-05T16:15:00Z',
    pinned: false,
    solved: true,
    tags: ['Jeotermal', 'Kalsit Kabuklaşması', 'İnhibitör', 'Menderes Grabeni'],
    viewCount: 920,
    replyCount: 2,
    likeCount: 28,
    initialPost: {
      content:
        'Alaşehir ve Germencik derin kuyularında 1.800 metre kılcal boru (capillary tubing) ile kuyu dibine bastığımız standart polimerik polifosfat antiskalantlar, 210°C üzerinde termal hidrolize uğrayarak ortofosfata dönüşüyor ve kendisi kalsiyum fosfat çökeltisi yaratıyor. Bu sıcaklıkta kararlı çalışan fosfonat veya poliakrilik türevi deneyen saha mühendisleri var mı?',
    },
    replies: [
      {
        id: 'rep-10-1',
        author: {
          name: 'Dr. Kerem Tanaydın',
          role: 'Başuzman Araştırmacı',
          affiliation: 'TÜBİTAK MAM Malzeme Enstitüsü',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-02-06T10:40:00Z',
        content:
          'Hocam poliaspartik asit bazlı termostabil biyo-polimerler 250°C’ye kadar moleküler bozunmaya uğramaz. Kalsit kristal çekirdeklenmesini şelatlama yoluyla durdururlar ve ortofosfat yan ürünü bırakmazlar.',
        likeCount: 19,
        isAcceptedAnswer: true,
      },
      {
        id: 'rep-10-2',
        author: {
          name: 'Dr. Ayşe Perver Bozkurt',
          role: 'Araştırmacı',
          affiliation: 'Hacettepe Üniversitesi Jeoloji Mühendisliği',
          avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-02-07T14:00:00Z',
        content:
          'Kerem Bey, pilot kuyuda 5 ppm dozajda denedik; 30 günlük deneme sonunda kuyu dibi basınç düşüşü gözlenmedi. Harika bir alternatif oldu.',
        likeCount: 13,
      },
    ],
  },

  // 11
  {
    id: 'th-11',
    slug: 'kuantum-verim-spektrometre-sapmasi',
    title: '780-1600 nm aralığında monokromatör çıkış gücü dalgalanması kompanzasyonu',
    categoryId: 'malzeme-nano',
    categoryName: 'Kriyojenik ve Fonksiyonel Malzemeler',
    author: {
      id: 'kerem-tanaydin',
      name: 'Dr. Kerem Tanaydın',
      role: 'Başuzman Araştırmacı',
      affiliation: 'TÜBİTAK MAM Malzeme Enstitüsü',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-01-18T10:30:00Z',
    pinned: false,
    solved: false,
    tags: ['Kuantum Verim', 'Spektrometre', 'Monokromatör', 'Kalibrasyon'],
    viewCount: 610,
    replyCount: 2,
    likeCount: 18,
    initialPost: {
      content:
        'Geliştirdiğimiz fotodedektörlerin harici kuantum verimini (EQE) ölçerken halojen lamba çıkış gücündeki ısıl sürüklenme 1.200 nm sonrasında spektrumda gürültü yaratıyor. Çift ışın demetli (dual-beam) ışın bölücü kurgusunda kalibre edilmiş referans InGaAs fotodiyot kullanan var mı?',
    },
    replies: [
      {
        id: 'rep-11-1',
        author: {
          name: 'Prof. Dr. Metehan Özgörüş',
          role: 'Araştırmacı',
          affiliation: 'Erzurum Doğu Anadolu Gözlemevi',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-01-18T14:10:00Z',
        content:
          'Kerem Bey, optik bölücü (beam splitter) yerine optik kıyıcı (optical chopper) ve kilitlenmeli yükselteç (lock-in amplifier) kullanırsanız lamba kayması kaynaklı doğru akım (DC) sapmalarını faz duyarlı filtrelemeyle tamamen yok edebilirsiniz.',
        likeCount: 15,
      },
      {
        id: 'rep-11-2',
        author: {
          name: 'Dr. Kerem Tanaydın',
          role: 'Başuzman Araştırmacı',
          affiliation: 'TÜBİTAK MAM Malzeme Enstitüsü',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-01-19T09:20:00Z',
        content:
          'Metehan Hocam, Stanford Research SR830 kilitlenmeli yükselteci 210 Hz kıyma frekansına bağladık; gürültü tabanı bir mertebe düştü. Teşekkürler.',
        likeCount: 11,
      },
    ],
  },

  // 12
  {
    id: 'th-12',
    slug: 'acik-hakemlik-ve-veri-politikasi',
    title: 'Yörünge Dergisi 2027 Ciltleri için Açık Hakemlik ve Ham Veri Paylaşım Zorunluluğu Taslağı',
    categoryId: 'yorunge-uzay',
    categoryName: 'Yörünge Mekaniği ve Uzay Sistemleri',
    author: {
      id: 'haluk-demiriz',
      name: 'Prof. Dr. Haluk Demiriz',
      role: 'Baş Editör & Danışma Kurulu Başkanı',
      affiliation: 'Yörünge Yayın Kurulu',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    createdAt: '2026-01-05T09:00:00Z',
    pinned: true,
    solved: false,
    tags: ['Açık Bilim', 'Hakemlik', 'Yayın Politikası', 'Ham Veri', 'FAIR İlkeleri'],
    viewCount: 2150,
    replyCount: 4,
    likeCount: 76,
    initialPost: {
      content:
        'Değerli Yörünge araştırmacıları; 2027 yılı itibarıyla dergimizde yayınlanacak tüm makalelerin hakem raporlarının anonimleştirilerek makale ekinde yayınlanması (Open Peer Review) ve analizde kullanılan tüm ham veri setlerinin Zenodo veya kurumsal depolar üzerinde kalıcı DOI ile paylaşılması zorunluluğunu getirmeyi planlıyoruz. Bu politikanın bağımsız araştırmacılar ve patent süreçleri üzerindeki olası etkilerini bu başlıkta tartışmaya açıyoruz.',
    },
    replies: [
      {
        id: 'rep-12-1',
        author: {
          name: 'Doç. Dr. Selin Vardar',
          role: 'Araştırmacı',
          affiliation: 'ODTÜ Deniz Bilimleri Enstitüsü',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-01-05T11:20:00Z',
        content:
          'Oşinografi açısından bu karar devrim niteliğindedir. Sefer verilerinin kapalı çekmecelerde kalması mükerrer kaynak israfına yol açıyor. FAIR veri ilkelerinin tam uygulanmasını destekliyorum.',
        likeCount: 31,
      },
      {
        id: 'rep-12-2',
        author: {
          name: 'Dr. Kerem Tanaydın',
          role: 'Araştırmacı',
          affiliation: 'TÜBİTAK MAM',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-01-05T14:40:00Z',
        content:
          'Patent başvurusu aşamasındaki ileri malzemeler için 12 aya kadar "veri ambargosu" (embargo period) opsiyonu tanınmalı. Aksi takdirde ticarileşebilir Ar-Ge çıktıları dergiden uzaklaşabilir.',
        likeCount: 28,
      },
      {
        id: 'rep-12-3',
        author: {
          name: 'Doç. Dr. Neslihan Aksoy',
          role: 'Araştırmacı',
          affiliation: 'Boğaziçi Üniversitesi',
          avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-01-06T09:15:00Z',
        content:
          'Kerem Bey’in ambargo şerhine katılıyorum. Patentlenebilir sekanslar için tescil tarihine kadar koruma sağlanması koşuluyla açık hakemlik sürecini kesinlikle onaylıyorum.',
        likeCount: 22,
      },
      {
        id: 'rep-12-4',
        author: {
          name: 'Prof. Dr. Haluk Demiriz',
          role: 'Baş Editör',
          affiliation: 'Yörünge Yayın Kurulu',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        createdAt: '2026-01-07T16:00:00Z',
        content:
          'Geri bildirimler doğrultusunda, patent başvurusu belgelenen çalışmalar için hakem onaylı 12 aylık veri ambargosu maddesini taslağa ekledik. Katkı veren tüm hocalarımıza teşekkür ederiz.',
        likeCount: 25,
      },
    ],
  },
];

// ============================================================================
// 6. YARDIMCI VE ERİŞİM FONKSİYONLARI (ACCESSOR UTILITIES)
// ============================================================================

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categoryId: string): JournalArticle[] {
  return articles.filter((article) => article.categoryId === categoryId);
}

export function getArticlesByAuthor(authorId: string): JournalArticle[] {
  return articles.filter((article) => article.authorIds.includes(authorId));
}

export function getFeaturedArticles(): JournalArticle[] {
  return articles.filter((article) => article.featured);
}

export function getForumThreadBySlug(slug: string): ForumThread | undefined {
  return forumThreads.find((thread) => thread.slug === slug);
}

export function getAuthorById(id: string): JournalAuthor | undefined {
  return authors.find((author) => author.id === id);
}

export function getAuthorBySlug(slug: string): JournalAuthor | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getCategoryBySlug(slug: string): JournalCategory | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getArchiveIssueById(id: string): ArchiveIssue | undefined {
  return archiveIssues.find((issue) => issue.id === id);
}

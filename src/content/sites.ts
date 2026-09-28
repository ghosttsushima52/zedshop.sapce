/**
 * Avenox Çoklu Site Vitrini - 12 Sektör Demo Sitesi Tanımları
 * 
 * Her site için özgün Türkçe marka kimliği, editoryal açıklamalar, en az 4 sayfa rotası,
 * navigasyon yapısı, katalog davranış ayarları ve iletişim bilgileri içerir.
 */

import { SiteDefinition, SectorId, VisualSystemId } from './types';

export const sites: SiteDefinition[] = [
  // --------------------------------------------------------------------------
  // 1. YÖRÜNGE ARAŞTIRMA DERGİSİ
  // --------------------------------------------------------------------------
  {
    id: 'orbital-journal',
    slug: 'journal',
    brandName: 'Yörünge Araştırma Dergisi',
    tagline: 'Disiplinlerarası Bilim, Derin Teknoloji ve Eleştirel Teori',
    description:
      'Gökbilimden derin deniz termoklin sistemlerine, nöromorfik donanımlardan kentsel morfolojiye uzanan açık erişimli, hakemli araştırma dergisi ve bilimsel tartışma platformu.',
    sectorId: 'editorial',
    sectorLabel: 'Bilim & Düşünce',
    defaultSystemId: 'violet-signal',
    accentColorHint: '#6366f1',
    badgeText: 'Hakemli Cilt 14',
    disclaimerText: 'Demo site',
    routes: {
      home: '/journal',
      catalog: '/journal/makaleler',
      itemDetailPrefix: '/journal/makaleler/',
      contact: '/journal/iletisim',
      forum: '/journal/forum',
      archive: '/journal/arsiv',
      authors: '/journal/yazarlar',
    },
    navigation: {
      navItems: [
        { label: 'Genel Bakış', href: '/journal', description: 'Derginin yayın odağı ve kuramsal çerçevesi' },
        { label: 'Makaleler', href: '/journal/makaleler', description: 'Son kabul edilen hakemli araştırmalar ve veri setleri' },
        { label: 'Yazarlar', href: '/journal/yazarlar', description: 'Danışma kurulu üyeleri ve bağımsız araştırmacılar' },
        { label: 'Araştırma Forumu', href: '/journal/forum', description: 'Metodoloji tartışmaları ve açık hakem diyalogları' },
        { label: 'Cilt Arşivi', href: '/journal/arsiv', description: 'Önceki ciltler, özel tematik sayılar ve DOI dizinleri' },
      ],
      actions: [
        { label: 'Makale Gönder', href: '/journal/iletisim', variant: 'primary' },
        { label: 'Açık Veri Havuzu', href: '/journal/makaleler', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Yayıncılık',
          links: [
            { label: 'Hakem Değerlendirme Esasları', href: '/journal/makaleler' },
            { label: 'Açık Erişim ve Veri Paylaşım Politikası', href: '/journal/makaleler' },
            { label: 'Etik Kurul Yönergeleri', href: '/journal/arsiv' },
            { label: 'Yayın Dizinleme (Indexation)', href: '/journal/arsiv' },
          ],
        },
        {
          title: 'Topluluk & Forum',
          links: [
            { label: 'Saha Çalışması Duyuruları', href: '/journal/forum' },
            { label: 'Açık Kaynak Donanım Tartışmaları', href: '/journal/forum' },
            { label: 'Genç Araştırmacı Bursları', href: '/journal/yazarlar' },
            { label: 'Yıllık Çalıştay Programı', href: '/journal/arsiv' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/journal',
        title: 'Yörünge Araştırma Dergisi — Bilim ve Eleştirel Teori',
        navTitle: 'Genel Bakış',
        description: 'Disiplinlerarası bilim, uzay sistemleri, oşinografi ve hesaplamalı kuram üzerine araştırmalar.',
        layoutType: 'editorial',
      },
      {
        slug: 'makaleler',
        path: '/journal/makaleler',
        title: 'Hakemli Araştırma Makaleleri',
        navTitle: 'Makaleler',
        description: 'Tüm disiplinlerden tam metin erişimli, atıf dizinli ve doğrulanmış araştırma makaleleri.',
        layoutType: 'catalog',
      },
      {
        slug: 'yazarlar',
        path: '/journal/yazarlar',
        title: 'Araştırmacılar ve Danışma Kurulu',
        navTitle: 'Yazarlar',
        description: 'Üniversite ve enstitülerden dergimize katkı sunan bağımsız bilim insanları.',
        layoutType: 'standard',
      },
      {
        slug: 'forum',
        path: '/journal/forum',
        title: 'Üye Araştırma Forumu ve Açık Diyalog',
        navTitle: 'Forum',
        description: 'Deney kalibrasyonu, kod paylaşımı ve metodolojik eleştiri tartışma kanalları.',
        layoutType: 'standard',
      },
      {
        slug: 'arsiv',
        path: '/journal/arsiv',
        title: 'Cilt Arşivi ve Tematik Sayılar',
        navTitle: 'Arşiv',
        description: '2023-2026 yılları arasındaki yayınlanmış tüm ciltler, özel dosya konuları ve PDF nüshaları.',
        layoutType: 'archive',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Makale',
      entityNamePlural: 'Makaleler',
      itemCountTarget: 16,
      filterKeys: ['kategori', 'yazar', 'yil', 'etiket'],
      searchPlaceholder: 'Makale başlığı, yazar adı, DOI veya kavram ile arayın...',
      sortOptions: [
        { label: 'Tarihe Göre (En Yeni)', value: 'date-desc' },
        { label: 'Atıf Sayısına Göre', value: 'citations-desc' },
        { label: 'Okuma Süresine Göre', value: 'read-time' },
      ],
      defaultSort: 'date-desc',
    },
    contactInfo: {
      address: 'Kandilli Rasathanesi Yolu No: 18, Üsküdar',
      district: 'Kandilli',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (216) 422 18 90',
      email: 'editor@yorungedergi.org',
      workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
    },
    socialLinks: [
      { platform: 'ArXiv', url: 'https://arxiv.org', label: 'ArXiv Koleksiyonu' },
      { platform: 'ORCID', url: 'https://orcid.org', label: 'Kurumsal ORCID' },
      { platform: 'GitHub', url: 'https://github.com', label: 'Veri ve Kod Depoları' },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. ÇAĞDAŞ ANADOLU KIYI RESTORANI
  // --------------------------------------------------------------------------
  {
    id: 'aegean-coastal-restaurant',
    slug: 'restaurant',
    brandName: 'Mola Kıyı Restoranı',
    tagline: 'Kuzey Ege Taş İskelelerinde Çağdaş Anadolu Kıyı Gastronomisi',
    description:
      'Ayvalık ve Kaz Dağları eteklerindeki yerel üretici bağlarından toplanan yabani otlar, günlük kıyı balıkçılığı ve meşe odununda dinlendirilmiş deniz mahsulleri mutfağı.',
    sectorId: 'hospitality',
    sectorLabel: 'Gastronomi & Mutfak',
    defaultSystemId: 'original-print',
    accentColorHint: '#c2410c',
    badgeText: 'Mevsim Menüsü',
    disclaimerText: 'Demo site',
    routes: {
      home: '/restaurant',
      catalog: '/restaurant/menu',
      itemDetailPrefix: '/restaurant/menu/',
      contact: '/restaurant/rezervasyon',
      story: '/restaurant/sefin-hikayesi',
    },
    navigation: {
      navItems: [
        { label: 'Karşılama', href: '/restaurant', description: 'Kıyı masaları ve mutfak yaklaşımı' },
        { label: 'Mevsim Menüsü', href: '/restaurant/menu', description: 'Tadım menüsü, soğuk mezeler ve odun ateşi' },
        { label: 'Şefin Hikayesi', href: '/restaurant/sefin-hikayesi', description: 'Yerel balıkçılar, bostanlar ve zeytinyağı mirası' },
        { label: 'Rezervasyon', href: '/restaurant/rezervasyon', description: 'Masa ayırtma ve özel tadım odası talepleri' },
      ],
      actions: [
        { label: 'Masa Ayırt', href: '/restaurant/rezervasyon', variant: 'primary' },
        { label: 'Menüyü İncele', href: '/restaurant/menu', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Sofra & Saatler',
          links: [
            { label: 'Öğle Servisi: 12:30 - 15:30', href: '/restaurant/rezervasyon' },
            { label: 'Akşam Tadımı: 19:00 - 23:30', href: '/restaurant/rezervasyon' },
            { label: 'Pazartesi Günleri Dinlenme', href: '/restaurant' },
          ],
        },
        {
          title: 'Yerel Üretici Ağı',
          links: [
            { label: 'Kozak Yaylası Çam Fıstıkları', href: '/restaurant/sefin-hikayesi' },
            { label: 'Cunda Kıyı Kooperatifi', href: '/restaurant/sefin-hikayesi' },
            { label: 'Kuzey Ege Erken Hasat Haslığı', href: '/restaurant/sefin-hikayesi' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/restaurant',
        title: 'Mola Kıyı Restoranı — Taş İskele ve Odun Ateşi',
        navTitle: 'Karşılama',
        description: 'Denizin tuzunu ve Kaz Dağları florasını tabaklara taşıyan yalın kıyı mutfağı.',
        layoutType: 'standard',
      },
      {
        slug: 'menu',
        path: '/restaurant/menu',
        title: 'Tadım ve Alakart Menü (64 Farklı Lezzet)',
        navTitle: 'Menü',
        description: 'Günlük kıyı avları, fermente otlar, soğuk sıkım yağlar ve mevsim tatlıları.',
        layoutType: 'catalog',
      },
      {
        slug: 'sefin-hikayesi',
        path: '/restaurant/sefin-hikayesi',
        title: 'Toprak, Deniz ve Şefin Mutfak Belleği',
        navTitle: 'Şefin Hikayesi',
        description: 'Geleneksel kurutma yöntemleri, yerel bostan ortaklıkları ve mutfak felsefemiz.',
        layoutType: 'editorial',
      },
      {
        slug: 'rezervasyon',
        path: '/restaurant/rezervasyon',
        title: 'Masa ve Özel Davet Rezervasyonu',
        navTitle: 'Rezervasyon',
        description: 'Açık teras, taş kemer altı veya şef masası için rezervasyon kaydı.',
        layoutType: 'form',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Menü Öğesi',
      entityNamePlural: 'Menü Lezzetleri',
      itemCountTarget: 64,
      filterKeys: ['kurs', 'diyet', 'pisirme_teknigi'],
      searchPlaceholder: 'Akya balığı, cibez otu, isli yoğurt veya safran ile arayın...',
      sortOptions: [
        { label: 'Servis Sırasına Göre', value: 'course-order' },
        { label: 'Fiyata Göre (Artan)', value: 'price-asc' },
        { label: 'Fiyata Göre (Azalan)', value: 'price-desc' },
      ],
      defaultSort: 'course-order',
    },
    contactInfo: {
      address: 'Mithatpaşa Mahallesi, 15 Eylül Caddesi No: 42, Cunda',
      district: 'Ayvalık',
      city: 'Balıkesir',
      country: 'Türkiye',
      phone: '+90 (266) 327 19 82',
      email: 'rezervasyon@molakiyi.com',
      workingHours: 'Salı - Pazar: 12:30 - 23:30',
    },
  },

  // --------------------------------------------------------------------------
  // 3. MİMARİ ODAKLI EMLAK PAZARYERİ
  // --------------------------------------------------------------------------
  {
    id: 'arkhe-architecture-realestate',
    slug: 'real-estate',
    brandName: 'Arkhe Taşınmaz & Mimarlık',
    tagline: 'Tipolojik Özgünlük, Brütalist Miras ve Çağdaş Akdeniz Konutları',
    description:
      'Mimar imzalı çağdaş villalar, 19. yüzyıl kagir taş konakları ve betonarme modernist apartman dairelerinden oluşan seçkin bir taşınmaz portföyü ve koruma danışmanlığı.',
    sectorId: 'real-estate',
    sectorLabel: 'Mimari & Taşınmaz',
    defaultSystemId: 'premium-pro',
    accentColorHint: '#0f172a',
    badgeText: '72 Mimari Portföy',
    disclaimerText: 'Demo site',
    routes: {
      home: '/real-estate',
      catalog: '/real-estate/vitrin',
      itemDetailPrefix: '/real-estate/mulk/',
      contact: '/real-estate/iletisim',
      search: '/real-estate/arama',
      guide: '/real-estate/rehber',
    },
    navigation: {
      navItems: [
        { label: 'Koleksiyon', href: '/real-estate', description: 'Öne çıkan mimari yaşam alanları' },
        { label: 'Portföy Vitrini', href: '/real-estate/vitrin', description: '72 onaylı mülkün detaylı listelemesi' },
        { label: 'Tipoloji Arama', href: '/real-estate/arama', description: 'Mimar, malzeme ve coğrafi konuma göre arama' },
        { label: 'Değerleme Rehberi', href: '/real-estate/rehber', description: 'Tarihi yapı restorasyonu ve mimari değer analizi' },
      ],
      actions: [
        { label: 'Portföy Görüşmesi', href: '/real-estate/iletisim', variant: 'primary' },
        { label: 'Arama Yap', href: '/real-estate/arama', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Mimari Tipolojiler',
          links: [
            { label: 'Ege Taş Yapıları', href: '/real-estate/arama' },
            { label: 'Modernist Kent Daireleri', href: '/real-estate/arama' },
            { label: 'Brütalist Kıyı Villaları', href: '/real-estate/arama' },
            { label: 'Ahşap Konak ve Köşkler', href: '/real-estate/arama' },
          ],
        },
        {
          title: 'Danışmanlık Hizmetleri',
          links: [
            { label: 'Tescilli Eser Röleve Desteği', href: '/real-estate/rehber' },
            { label: 'Strüktürel Sağlamlık Raporu', href: '/real-estate/rehber' },
            { label: 'Sessiz Portföy Yönetimi', href: '/real-estate/iletisim' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/real-estate',
        title: 'Arkhe Taşınmaz — Mekanın ve Yapının Kalıcı Değeri',
        navTitle: 'Koleksiyon',
        description: 'Standart emlak anlayışının ötesinde, mimari özgünlüğe sahip yaşam alanları.',
        layoutType: 'standard',
      },
      {
        slug: 'vitrin',
        path: '/real-estate/vitrin',
        title: 'Tam Taşınmaz Vitrini (72 Mülk)',
        navTitle: 'Portföy',
        description: 'Bodrum taş kulelerinden Kadıköy modernist bloklarına uzanan mimari seçki.',
        layoutType: 'catalog',
      },
      {
        slug: 'arama',
        path: '/real-estate/arama',
        title: 'Detaylı Mimari ve Coğrafi Arama',
        navTitle: 'Arama',
        description: 'Metrekare, tavan yüksekliği, özgün malzeme ve yapım yılına dayalı filtreleme.',
        layoutType: 'standard',
      },
      {
        slug: 'rehber',
        path: '/real-estate/rehber',
        title: 'Mimari Koruma ve Satın Alma Rehberi',
        navTitle: 'Rehber',
        description: 'Eski eser edinimi, hukuki izin süreçleri ve mimari restorasyon rehberi.',
        layoutType: 'editorial',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Mülk',
      entityNamePlural: 'Taşınmazlar',
      itemCountTarget: 72,
      filterKeys: ['sehir', 'mimari_tarz', 'oda_sayisi', 'fiyat_araligi'],
      searchPlaceholder: 'Bölge, mimar, taş tonoz veya geniş teras ile arayın...',
      sortOptions: [
        { label: 'Fiyata Göre (Azalan)', value: 'price-desc' },
        { label: 'Fiyata Göre (Artan)', value: 'price-asc' },
        { label: 'Alana Göre (Büyükten Küçüğe)', value: 'area-desc' },
        { label: 'Yapım Yılına Göre', value: 'year-desc' },
      ],
      defaultSort: 'price-desc',
    },
    contactInfo: {
      address: 'Abdi İpekçi Caddesi, Mim Kemal Öke Sok. No: 14/2, Nişantaşı',
      district: 'Şişli',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (212) 234 88 40',
      email: 'bilgi@arkhetasinmaz.com',
      workingHours: 'Hafta içi: 09:30 - 19:00, Cumartesi randevulu',
    },
  },

  // --------------------------------------------------------------------------
  // 4. BUTİK DOĞA OTELİ VE İNZİVA
  // --------------------------------------------------------------------------
  {
    id: 'vadi-landscape-retreat',
    slug: 'hotel',
    brandName: 'Kaf Dağı İnziva & Vadi Oteli',
    tagline: 'Fırtına Vadisi\'nde Kestane Ağacı Mimarisi, Sessizlik ve Termal Denge',
    description:
      'Kaçkar Dağları’nın sis katmanları arasında yer alan, geleneksel taş kemerli ve kestane kütüklerinden inşa edilmiş 36 odalı bağımsız inziva sığınağı.',
    sectorId: 'hospitality',
    sectorLabel: 'Doğa & İnziva',
    defaultSystemId: 'resend',
    accentColorHint: '#15803d',
    badgeText: 'Mevsimlik İnziva',
    disclaimerText: 'Demo site',
    routes: {
      home: '/hotel',
      catalog: '/hotel/odalar',
      itemDetailPrefix: '/hotel/oda/',
      contact: '/hotel/ulasim',
      experiences: '/hotel/deneyimler',
      spa: '/hotel/spa',
    },
    navigation: {
      navItems: [
        { label: 'Vadi Ruhu', href: '/hotel', description: 'Kaçkarların yamaçlarında sessizlik ve sadelik' },
        { label: 'Odalar & Villalar', href: '/hotel/odalar', description: 'Şömineli taş köşkler ve sedir ağacı süitler' },
        { label: 'Deneyimler', href: '/hotel/deneyimler', description: 'Buzul gölü tırmanışları ve yabani bitki toplama' },
        { label: 'Termal Spa & Havuz', href: '/hotel/spa', description: 'Doğal kaynak suları ve sedir buhar banyosu' },
        { label: 'Ulaşım & İklim', href: '/hotel/ulasim', description: 'Havalimanı transferleri ve 4 mevsim hazırlık rehberi' },
      ],
      actions: [
        { label: 'Konaklama Planla', href: '/hotel/odalar', variant: 'primary' },
        { label: 'Vadi Rehberi', href: '/hotel/ulasim', variant: 'ghost' },
      ],
      footerSections: [
        {
          title: 'Mevsim Takvimi',
          links: [
            { label: 'Bahar: Orman Gülleri & Çözülen Sular', href: '/hotel/deneyimler' },
            { label: 'Yaz: Yüksek Yayla Rotaları', href: '/hotel/deneyimler' },
            { label: 'Güz: Kestane Hasadı & Sarı Sis', href: '/hotel/deneyimler' },
            { label: 'Kış: Kar Altında Termal Kaplıca', href: '/hotel/spa' },
          ],
        },
        {
          title: 'Çevre Politikası',
          links: [
            { label: 'Sıfır Tek Kullanımlık Plastik', href: '/hotel' },
            { label: 'Mikro Hidroelektrik Enerji', href: '/hotel' },
            { label: 'Yerel Yayla Bostanı Desteği', href: '/hotel' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/hotel',
        title: 'Kaf Dağı İnziva — Bulut Denizi Üzerinde Sığınak',
        navTitle: 'Vadi Ruhu',
        description: 'Fırtına Deresi’nin çağıltısı ve Kaçkar zirvelerinin dinginliğinde dinlenme alanı.',
        layoutType: 'standard',
      },
      {
        slug: 'odalar',
        path: '/hotel/odalar',
        title: 'Bağımsız Taş Evler ve Sedir Süitler (36 Seçenek)',
        navTitle: 'Odalar',
        description: 'Her biri vadi manzaralı, kuzineli veya şömineli müstakil konaklama birimleri.',
        layoutType: 'catalog',
      },
      {
        slug: 'deneyimler',
        path: '/hotel/deneyimler',
        title: 'Rehberli Yayla ve Dağ Deneyimleri',
        navTitle: 'Deneyimler',
        description: 'Flora keşifleri, geleneksel arıcılık atölyeleri ve buzul gölü yürüyüşleri.',
        layoutType: 'standard',
      },
      {
        slug: 'spa',
        path: '/hotel/spa',
        title: 'Termal Banyo ve Orman Esenliği',
        navTitle: 'Termal Spa',
        description: 'Doğal kükürtlü dağ kaynak suları, taş banyolar ve ardıç tütsüsü masajları.',
        layoutType: 'standard',
      },
      {
        slug: 'ulasim',
        path: '/hotel/ulasim',
        title: 'Konum, Ulaşım ve Mevsimlik Hazırlık',
        navTitle: 'Ulaşım',
        description: 'Rize-Artvin Havalimanı transferleri, 4x4 araç gereksinimleri ve hava durumu.',
        layoutType: 'standard',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Oda ve Villa',
      entityNamePlural: 'Konaklama Seçenekleri',
      itemCountTarget: 36,
      filterKeys: ['yapi_tipi', 'kapasite', 'somine', 'manzara'],
      searchPlaceholder: 'Sedir köşk, şömineli taş ev veya termal küvetli süit arayın...',
      sortOptions: [
        { label: 'Gecelik Fiyata Göre (Artan)', value: 'price-asc' },
        { label: 'Gecelik Fiyata Göre (Azalan)', value: 'price-desc' },
        { label: 'Alan Büyüklüğüne Göre', value: 'size-desc' },
      ],
      defaultSort: 'price-desc',
    },
    contactInfo: {
      address: 'Fırtına Vadisi 18. km, Çamlıhemşin Yolu Üzeri',
      district: 'Çamlıhemşin',
      city: 'Rize',
      country: 'Türkiye',
      phone: '+90 (464) 656 22 10',
      email: 'inziva@kafdagi.com.tr',
      workingHours: 'Resepsiyon: 24 Saat Açık',
    },
  },

  // --------------------------------------------------------------------------
  // 5. BAĞIMSIZ PARFÜM ATÖLYESİ
  // --------------------------------------------------------------------------
  {
    id: 'misk-perfume-atelier',
    slug: 'perfume',
    brandName: 'Misk & Buhur Parfüm Atölyesi',
    tagline: 'Botanik Damıtım, Toprak Reçineleri ve Bağımsız Koku Formülleri',
    description:
      'Geleneksel buhurdan damıtımı, Isparta gülü tarlaları, Muğla sığla ağacı reçinesi ve yabani laden bitkisini modern koku kimyasıyla birleştiren bağımsız niş parfüm evi.',
    sectorId: 'retail',
    sectorLabel: 'Niş Parfüm & Koku',
    defaultSystemId: 'violet-signal',
    accentColorHint: '#701a75',
    badgeText: '48 Özgün Formül',
    disclaimerText: 'Demo site',
    routes: {
      home: '/perfume',
      catalog: '/perfume/koleksiyon',
      itemDetailPrefix: '/perfume/koku/',
      contact: '/perfume/magazalar',
      philosophy: '/perfume/felsefe',
      notes: '/perfume/notalar',
    },
    navigation: {
      navItems: [
        { label: 'Atölye', href: '/perfume', description: 'Koku mimarimiz ve ham madde anlayışımız' },
        { label: 'Koleksiyon', href: '/perfume/koleksiyon', description: '48 bağımsız extrait ve saf attar formülü' },
        { label: 'Damıtım Felsefesi', href: '/perfume/felsefe', description: 'Bakır imbikler, maserasyon ve meşe fıçılar' },
        { label: 'Nota Ansiklopedisi', href: '/perfume/notalar', description: 'Sığla, iris, safran ve sedir ağacı piramitleri' },
        { label: 'Tadım Randevusu', href: '/perfume/magazalar', description: 'Karaköy ve Moda koku odalarımız' },
      ],
      actions: [
        { label: 'Tadım Randevusu Al', href: '/perfume/magazalar', variant: 'primary' },
        { label: 'Koleksiyonu Gör', href: '/perfume/koleksiyon', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Koku Aileleri',
          links: [
            { label: 'Deri & Reçine', href: '/perfume/koleksiyon' },
            { label: 'Topraksı Şipre & Vetiver', href: '/perfume/koleksiyon' },
            { label: 'Tütsü & Kuru Ağaçlar', href: '/perfume/koleksiyon' },
            { label: 'Ozonik Akdeniz Turunçgilleri', href: '/perfume/koleksiyon' },
          ],
        },
        {
          title: 'Etik İlke',
          links: [
            { label: 'Doğal Sığla Ağacı Koruma Fonu', href: '/perfume/felsefe' },
            { label: 'Sıfır Sentetik Fitalat', href: '/perfume/felsefe' },
            { label: 'Elle Numaralandırılmış Şişeler', href: '/perfume/koleksiyon' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/perfume',
        title: 'Misk & Buhur — Zamanın ve Hafızanın Kokusal İzleri',
        navTitle: 'Atölye',
        description: 'Endüstriyel koku algısının ötesinde, coğrafyanın derin botanik katmanları.',
        layoutType: 'standard',
      },
      {
        slug: 'koleksiyon',
        path: '/perfume/koleksiyon',
        title: 'Parfüm ve Attar Koleksiyonu (48 Formül)',
        navTitle: 'Koleksiyon',
        description: 'Yüksek konsantrasyonlu Extrait de Parfum ve maserat serisi koku portföyü.',
        layoutType: 'catalog',
      },
      {
        slug: 'felsefe',
        path: '/perfume/felsefe',
        title: 'Damıtım ve Maserasyon Felsefesi',
        navTitle: 'Felsefe',
        description: 'Yavaş olgunlaştırma, yabani hasat ilkeleri ve koku laboratuvarımız.',
        layoutType: 'editorial',
      },
      {
        slug: 'notalar',
        path: '/perfume/notalar',
        title: 'Hammadde ve Nota Ansiklopedisi',
        navTitle: 'Notalar',
        description: 'Akdeniz laden reçinesinden İtalyan bergamotuna tüm akor bileşenleri.',
        layoutType: 'standard',
      },
      {
        slug: 'magazalar',
        path: '/perfume/magazalar',
        title: 'Karaköy ve Moda Koku Odaları',
        navTitle: 'Atölyeler',
        description: 'Birebir koku profili analizi ve özel formülasyon tadım randevuları.',
        layoutType: 'standard',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Parfüm',
      entityNamePlural: 'Koku Formülleri',
      itemCountTarget: 48,
      filterKeys: ['koku_ailesi', 'konsantrasyon', 'mevsim', 'hacim'],
      searchPlaceholder: 'Sığla ağacı, iris kökü, vetiver veya tütsü notası arayın...',
      sortOptions: [
        { label: 'Koleksiyon Sırasına Göre', value: 'curated' },
        { label: 'Fiyata Göre (Artan)', value: 'price-asc' },
        { label: 'Fiyata Göre (Azalan)', value: 'price-desc' },
      ],
      defaultSort: 'curated',
    },
    contactInfo: {
      address: 'Kemankeş Karamustafa Paşa Mah., Mumhane Cad. No: 28, Karaköy',
      district: 'Beyoğlu',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (212) 249 11 34',
      email: 'atolye@miskbuhur.com',
      workingHours: 'Salı - Pazar: 11:00 - 19:30',
    },
  },

  // --------------------------------------------------------------------------
  // 6. GİTAR MAĞAZASI VE LUTHIER ATÖLYESİ
  // --------------------------------------------------------------------------
  {
    id: 'perde-luthier-guitars',
    slug: 'guitar',
    brandName: 'Perde Luthier & Enstrüman Evi',
    tagline: 'Rezonans Ağaçları, Elle Sarılmış Manyetikler ve Atölye Gitarları',
    description:
      'Özenle dinlendirilmiş ladin kapaklar, fırınlanmış akçaağaç saplar, usta luthier tezgahlarından çıkan klasik, akustik, bas ve özel sarım elektro gitarlar.',
    sectorId: 'retail',
    sectorLabel: 'Müzik & Enstrüman',
    defaultSystemId: 'raycast',
    accentColorHint: '#ea580c',
    badgeText: '64 Seçkin Enstrüman',
    disclaimerText: 'Demo site',
    routes: {
      home: '/guitar',
      catalog: '/guitar/modeller',
      itemDetailPrefix: '/guitar/model/',
      contact: '/guitar/hakkimizda',
      acoustic: '/guitar/akustik',
      electric: '/guitar/elektro',
      workshop: '/guitar/atolye',
    },
    navigation: {
      navItems: [
        { label: 'Enstrüman Evi', href: '/guitar', description: 'Rezonans felsefesi ve atölye standartlarımız' },
        { label: 'Akustik & Klasik', href: '/guitar/akustik', description: 'Torrefied ladin, sedir kapaklar ve ispanyol birleşimleri' },
        { label: 'Elektro & Bas', href: '/guitar/elektro', description: 'Alnico manyetikler, dişbudak gövdeler ve yarı boşluklu modeller' },
        { label: 'Özel Sipariş Luthier', href: '/guitar/atolye', description: 'Kişiye özel sap profili, radius ve ağaç seçimi' },
        { label: 'Bakım & Hakkımızda', href: '/guitar/hakkimizda', description: 'Tesviye, entonasyon ayarı ve atölye tarihçemiz' },
      ],
      actions: [
        { label: 'Deneme Odası Randevusu', href: '/guitar/atolye', variant: 'primary' },
        { label: 'Gitar Kataloğu', href: '/guitar/modeller', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Gitar Kategorileri',
          links: [
            { label: 'Dreadnought & OM Akustikler', href: '/guitar/akustik' },
            { label: 'Konser Seviyesi Klasik Gitarlar', href: '/guitar/akustik' },
            { label: 'Tekli Manyetik Katı Gövdeler', href: '/guitar/elektro' },
            { label: 'Kısa Skala Bas Gitarlar', href: '/guitar/elektro' },
          ],
        },
        {
          title: 'Atölye Garantisi',
          links: [
            { label: 'Ömür Boyu Sap & Eşik Garantisi', href: '/guitar/hakkimizda' },
            { label: 'İlk Yıl Ücretsiz Bakım & Tel Değişimi', href: '/guitar/hakkimizda' },
            { label: 'İklim Kontrollü Akustik Oda', href: '/guitar/atolye' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/guitar',
        title: 'Perde Luthier — Ağacın Tınısı ve Titreşim Dengesi',
        navTitle: 'Enstrüman Evi',
        description: 'Titreşim aktarımı mükemmelleştirilmiş akustik ve elektro enstrümanlar.',
        layoutType: 'standard',
      },
      {
        slug: 'modeller',
        path: '/guitar/modeller',
        title: 'Tüm Gitar ve Bas Kataloğu (64 Model)',
        navTitle: 'Modeller',
        description: 'Akustik, elektro, klasik ve yarı boşluklu kasa gitarların eksiksiz dökümü.',
        layoutType: 'catalog',
      },
      {
        slug: 'akustik',
        path: '/guitar/akustik',
        title: 'Akustik ve Klasik Gitar Seçkisi',
        navTitle: 'Akustik',
        description: 'Katı ladin ve sedir gövdeli, sıcak tınlamalı sahne ve kayıt gitarları.',
        layoutType: 'catalog',
      },
      {
        slug: 'elektro',
        path: '/guitar/elektro',
        title: 'Elektro ve Bas Gitarlar',
        navTitle: 'Elektro & Bas',
        description: 'Elle sarılmış manyetikler ve nitro selüloz cila ile nefes alan gövdeler.',
        layoutType: 'catalog',
      },
      {
        slug: 'atolye',
        path: '/guitar/atolye',
        title: 'Luthier Tezgahı ve Özel Yapım',
        navTitle: 'Atölye',
        description: 'Özel sipariş süreci, ağaç bankası seçimi ve mikrofonlama testleri.',
        layoutType: 'editorial',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Gitar',
      entityNamePlural: 'Gitarlar',
      itemCountTarget: 64,
      filterKeys: ['kasa_tipi', 'govde_agaci', 'el_yonu', 'durum'],
      searchPlaceholder: 'Ladin kapak, gül ağacı klavye, P-90 veya 24 perde arayın...',
      sortOptions: [
        { label: 'Fiyata Göre (Artan)', value: 'price-asc' },
        { label: 'Fiyata Göre (Azalan)', value: 'price-desc' },
        { label: 'Skala Uzunluğuna Göre', value: 'scale-desc' },
      ],
      defaultSort: 'price-desc',
    },
    contactInfo: {
      address: 'Şahkulu Sokak No: 7, Tünel',
      district: 'Beyoğlu',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (212) 292 45 70',
      email: 'luthier@perdegitar.com',
      workingHours: 'Pazartesi - Cumartesi: 10:30 - 19:30',
    },
  },

  // --------------------------------------------------------------------------
  // 7. HUKUK BÜROSU VE KURUMSAL DANIŞMANLIK
  // --------------------------------------------------------------------------
  {
    id: 'baran-advisory-law',
    slug: 'law',
    brandName: 'Baran & Ortakları Hukuk Bürosu',
    tagline: 'Karmaşık Ticari Davalar, Sınır Ötesi Satın Almalar ve Teknoloji Uyuşmazlıkları',
    description:
      'Uluslararası tahkim, şirket birleşmeleri, enerji yatırımları, yapay zeka regülasyonları ve rekabet hukukunda uzmanlaşmış bağımsız kurumsal hukuk bürosu.',
    sectorId: 'corporate',
    sectorLabel: 'Hukuk & Kurumsal Danışmanlık',
    defaultSystemId: 'resend',
    accentColorHint: '#1e3a8a',
    badgeText: 'Kurumsal Hukuk',
    disclaimerText: 'Demo site',
    routes: {
      home: '/law',
      catalog: '/law/uzmanliklar',
      itemDetailPrefix: '/law/uzmanlik/',
      contact: '/law/iletisim',
      team: '/law/ekip',
      publications: '/law/yayinlar',
    },
    navigation: {
      navItems: [
        { label: 'Büro Profili', href: '/law', description: 'Kurumsal mirasımız ve dava yürütme felsefemiz' },
        { label: 'Uzmanlık Alanları', href: '/law/uzmanliklar', description: 'M&A, tahkim, vergi ve regülasyon hizmetleri' },
        { label: 'Ortaklar & Ekip', href: '/law/ekip', description: 'Kıdemli ortaklar ve sektörel danışman kadrosu' },
        { label: 'Hukuki İncelemeler', href: '/law/yayinlar', description: 'İçtihat bültenleri ve kanun analizi raporları' },
        { label: 'İletişim & Danışma', href: '/law/iletisim', description: 'Ofis lokasyonlarımız ve ilk değerlendirme talebi' },
      ],
      actions: [
        { label: 'Hukuki Danışma Al', href: '/law/iletisim', variant: 'primary' },
        { label: 'Yayınları Oku', href: '/law/yayinlar', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Faaliyet Alanları',
          links: [
            { label: 'Birleşme ve Devralmalar (M&A)', href: '/law/uzmanliklar' },
            { label: 'Uluslararası Ticari Tahkim', href: '/law/uzmanliklar' },
            { label: 'Sermaye Piyasaları ve Fon Yönetimi', href: '/law/uzmanliklar' },
            { label: 'Kişisel Veriler ve Siber Güvenlik', href: '/law/uzmanliklar' },
          ],
        },
        {
          title: 'Etik & Mevzuat',
          links: [
            { label: 'Türkiye Barolar Birliği Meslek Kuralları', href: '/law' },
            { label: 'Müvekkil Gizliliği İlkeleri', href: '/law' },
            { label: 'Çıkar Çatışması Değerlendirme Süreci', href: '/law' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/law',
        title: 'Baran & Ortakları — Hukuki Güvence ve Stratejik Öngörü',
        navTitle: 'Büro Profili',
        description: 'Büyük ölçekli ticari süreçlerde riskleri minimize eden analitik hukuk yaklaşımı.',
        layoutType: 'standard',
      },
      {
        slug: 'uzmanliklar',
        path: '/law/uzmanliklar',
        title: 'Uzmanlık ve Faaliyet Alanları (10 Temel Disiplin)',
        navTitle: 'Uzmanlıklar',
        description: 'Sektörel derinlik, regülasyon uyumu ve uyuşmazlık çözümü disiplinleri.',
        layoutType: 'catalog',
      },
      {
        slug: 'ekip',
        path: '/law/ekip',
        title: 'Yönetici Ortaklar ve Kıdemli Avukatlar (9 İsim)',
        navTitle: 'Ekip',
        description: 'Uluslararası tecrübeye sahip dava avukatları ve regülasyon uzmanları.',
        layoutType: 'standard',
      },
      {
        slug: 'yayinlar',
        path: '/law/yayinlar',
        title: 'Hukuki Mütalaalar ve İçtihat Bültenleri (12 Yayın)',
        navTitle: 'Yayınlar',
        description: 'Yargıtay ve Danıştay kararları ışığında mevzuat analizleri ve rehberler.',
        layoutType: 'standard',
      },
      {
        slug: 'iletisim',
        path: '/law/iletisim',
        title: 'Hukuki Görüşme ve Temsil Talebi',
        navTitle: 'İletişim',
        description: 'Levent ofisimizde gizlilik sözleşmeli ön görüşme planlaması.',
        layoutType: 'form',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Uzmanlık Alanı',
      entityNamePlural: 'Uzmanlık Alanları',
      itemCountTarget: 10,
      filterKeys: ['sektor', 'hukuk_dali'],
      searchPlaceholder: 'Tahkim, konkordato, veri koruma veya pay sahipliği arayın...',
      sortOptions: [
        { label: 'Varsayılan Sıralama', value: 'default' },
        { label: 'Başlığa Göre', value: 'title-asc' },
      ],
      defaultSort: 'default',
    },
    contactInfo: {
      address: 'Büyükdere Caddesi, Kanyon Ofis Bloğu Kat: 19, Levent',
      district: 'Beşiktaş',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (212) 355 40 00',
      email: 'iletisim@baranhukuk.av.tr',
      workingHours: 'Pazartesi - Cuma: 08:30 - 18:30',
    },
  },

  // --------------------------------------------------------------------------
  // 8. B2B SAAS ÜRÜNÜ (BULUT OPERASYON PLATFORMU)
  // --------------------------------------------------------------------------
  {
    id: 'vektor-cloud-saas',
    slug: 'saas',
    brandName: 'Vektör Operasyon Platformu',
    tagline: 'Dağıtık Altyapı, Gerçek Zamanlı Telemetri ve Dayanıklı Kuyruk Orkestrasyonu',
    description:
      'Mikroservis sistemleri için sub-milisaniye olay dağıtımı, hata toleranslı iş kuyrukları, otomatik ölçeklenen telemetri ve çoklu bulut trafik yönlendiricisi.',
    sectorId: 'corporate',
    sectorLabel: 'Bulut Altyapı & B2B SaaS',
    defaultSystemId: 'linear',
    accentColorHint: '#3b82f6',
    badgeText: 'v3.4 Stabil Sürüm',
    disclaimerText: 'Demo site',
    routes: {
      home: '/saas',
      catalog: '/saas/ozellikler',
      itemDetailPrefix: '/saas/modul/',
      contact: '/saas/fiyatlandirma',
      solutions: '/saas/cozumler',
      changelog: '/saas/guncellemeler',
    },
    navigation: {
      navItems: [
        { label: 'Platform', href: '/saas', description: 'Mimari katmanlar ve dayanıklılık garantisi' },
        { label: 'Çekirdek Modüller', href: '/saas/ozellikler', description: 'Kuyruk yöneticisi, telemetri toplayıcı ve kural motoru' },
        { label: 'Çözümler', href: '/saas/cozumler', description: 'Fintech, e-ticaret ve IoT altyapı senaryoları' },
        { label: 'Fiyatlandırma', href: '/saas/fiyatlandirma', description: 'Kullanım hacmine dayalı, şeffaf katmanlar' },
        { label: 'Sürüm Günlüğü', href: '/saas/guncellemeler', description: 'Haftalık changelog, performans yamaları ve API değişimleri' },
      ],
      actions: [
        { label: 'Ücretsiz Deneyin', href: '/saas/fiyatlandirma', variant: 'primary' },
        { label: 'Geliştirici Dokümantasyonu', href: '/saas/guncellemeler', variant: 'ghost' },
      ],
      footerSections: [
        {
          title: 'Çözüm Mimarisi',
          links: [
            { label: 'Kubernetes Operatörü', href: '/saas/ozellikler' },
            { label: 'gRPC & WebSocket Protokolleri', href: '/saas/ozellikler' },
            { label: 'SOC2 & ISO 27001 Uyumu', href: '/saas/fiyatlandirma' },
            { label: '%99.999 SLA Güvencesi', href: '/saas/fiyatlandirma' },
          ],
        },
        {
          title: 'Geliştirici Kaynakları',
          links: [
            { label: 'Go ve TypeScript SDK', href: '/saas/guncellemeler' },
            { label: 'Açık Kaynak CLI Aracı', href: '/saas/guncellemeler' },
            { label: 'Sistem Durumu (Status Page)', href: '/saas' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/saas',
        title: 'Vektör Platform — Dayanıklı Dağıtık Sistem Omurgası',
        navTitle: 'Platform',
        description: 'Milyonlarca olayı veri kaybı olmadan işleyen yüksek hacimli mesajlaşma platformu.',
        layoutType: 'standard',
      },
      {
        slug: 'ozellikler',
        path: '/saas/ozellikler',
        title: 'Çekirdek Modüller ve Altyapı Bileşenleri',
        navTitle: 'Özellikler',
        description: 'Olay yönlendirici, gecikmesiz filtreleme ve dinamik yük dengeleme.',
        layoutType: 'catalog',
      },
      {
        slug: 'cozumler',
        path: '/saas/cozumler',
        title: 'Sektörel Mimari Senaryolar (8 Vaka)',
        navTitle: 'Çözümler',
        description: 'Fintech ödeme mutabakatı, telemetri ingest ve devasa katalog senkronizasyonu.',
        layoutType: 'standard',
      },
      {
        slug: 'fiyatlandirma',
        path: '/saas/fiyatlandirma',
        title: 'Ölçeklenebilir ve Şeffaf Fiyatlandırma (4 Katman)',
        navTitle: 'Fiyatlandırma',
        description: 'Geliştirici paketinden sınırsız kurumsal kümelere kadar net maliyet modelleri.',
        layoutType: 'standard',
      },
      {
        slug: 'guncellemeler',
        path: '/saas/guncellemeler',
        title: 'Sürüm Günlüğü ve Değişiklik Kayıtları (16 Sürüm)',
        navTitle: 'Changelog',
        description: 'Platform performans iyileştirmeleri, çekirdek güncellemeleri ve hata düzeltmeleri.',
        layoutType: 'standard',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Modül',
      entityNamePlural: 'Modüller',
      itemCountTarget: 12,
      filterKeys: ['katman', 'protokol'],
      searchPlaceholder: 'Kafka köprüsü, dead-letter queue veya telemetri arayın...',
      sortOptions: [
        { label: 'Çekirdek Önceliğine Göre', value: 'priority' },
        { label: 'İsme Göre', value: 'title-asc' },
      ],
      defaultSort: 'priority',
    },
    contactInfo: {
      address: 'Maslak Mah., AOS 55. Sokak No: 2, 42 Maslak Ofis',
      district: 'Sarıyer',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (212) 390 12 00',
      email: 'destek@vektorops.io',
      workingHours: '7/24 Kesintisiz Telemetri ve Operasyon Desteği',
    },
  },

  // --------------------------------------------------------------------------
  // 9. ÖZEL DİŞ KLİNİĞİ
  // --------------------------------------------------------------------------
  {
    id: 'dent-smyrna-clinic',
    slug: 'dental',
    brandName: 'Dent Smyrna Ağız ve Diş Sağlığı',
    tagline: 'Biyouyumlu İmplantoloji, Mikroskobik Endodonti ve Sayısal Gülüş Tasarımı',
    description:
      'Dijital cerrahi kılavuzlar, 3 boyutlu dental tomografi ve biyolojik doku koruma felsefesiyle çalışan Alsancak merkezli ileri ağız ve diş cerrahisi kliniği.',
    sectorId: 'corporate',
    sectorLabel: 'Özel Sağlık & Diş Hekimliği',
    defaultSystemId: 'raycast',
    accentColorHint: '#0284c7',
    badgeText: '14 Uzman Tedavi',
    disclaimerText: 'Demo site',
    routes: {
      home: '/dental',
      catalog: '/dental/tedaviler',
      itemDetailPrefix: '/dental/tedavi/',
      contact: '/dental/hasta-rehberi',
      team: '/dental/hekimler',
      technology: '/dental/teknoloji',
    },
    navigation: {
      navItems: [
        { label: 'Klinik', href: '/dental', description: 'Minimal invaziv diş hekimliği yaklaşımımız' },
        { label: 'Tedavi Alanları', href: '/dental/tedaviler', description: 'İmplant, şeffaf plak ve mikroskobik kanal tedavisi' },
        { label: 'Hekim Kadrosu', href: '/dental/hekimler', description: 'Ağız-çene cerrahları, protez ve ortodonti uzmanları' },
        { label: 'Klinik Teknoloji', href: '/dental/teknoloji', description: 'CBCT tomografi ve ağız içi optik tarayıcılar' },
        { label: 'Hasta Rehberi', href: '/dental/hasta-rehberi', description: 'Tedavi süreçleri, anestezi ve bakım kılavuzları' },
      ],
      actions: [
        { label: 'Muayene Randevusu', href: '/dental/hasta-rehberi', variant: 'primary' },
        { label: 'Tedavileri İncele', href: '/dental/tedaviler', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Tedavi Branşları',
          links: [
            { label: '3B Kılavuzlu İmplant Cerrahisi', href: '/dental/tedaviler' },
            { label: 'Mikro-Endodonti (Kanal Tedavisi)', href: '/dental/tedaviler' },
            { label: 'Zirkonyum ve Lamine Kaplama', href: '/dental/tedaviler' },
            { label: 'Görünmeyen Şeffaf Plak Tedavisi', href: '/dental/tedaviler' },
          ],
        },
        {
          title: 'Hasta Güvenliği',
          links: [
            { label: 'B Sınıfı Otoklav Sterilizasyon', href: '/dental/teknoloji' },
            { label: 'Düşük Dozlu Dijital Radyoloji', href: '/dental/teknoloji' },
            { label: 'Alerji ve Biyouyumluluk Testleri', href: '/dental/hasta-rehberi' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/dental',
        title: 'Dent Smyrna — Hassas Cerrahi ve Koruyucu Gülüş Mimarisi',
        navTitle: 'Klinik',
        description: 'Ağrısız işlem protokolleri, sayısal planlama ve biyouyumlu restorasyonlar.',
        layoutType: 'standard',
      },
      {
        slug: 'tedaviler',
        path: '/dental/tedaviler',
        title: 'Klinik Tedavi Protokolleri (14 Tedavi)',
        navTitle: 'Tedaviler',
        description: 'Ağız-diş-çene cerrahisinden estetik restorasyonlara tüm medikal protokoller.',
        layoutType: 'catalog',
      },
      {
        slug: 'hekimler',
        path: '/dental/hekimler',
        title: 'Uzman Hekim ve Cerrah Kadromuz (7 İsim)',
        navTitle: 'Hekimler',
        description: 'Akademik geçmişe ve uluslararası cerrahi sertifikalara sahip uzman hekimler.',
        layoutType: 'standard',
      },
      {
        slug: 'teknoloji',
        path: '/dental/teknoloji',
        title: 'Görüntüleme ve Dijital Laboratuvar Altyapısı',
        navTitle: 'Teknoloji',
        description: '3B tomografi, frezeleme cihazları ve cerrahi mikroskop sistemleri.',
        layoutType: 'standard',
      },
      {
        slug: 'hasta-rehberi',
        path: '/dental/hasta-rehberi',
        title: 'Hasta Bilgilendirme ve Randevu Rehberi',
        navTitle: 'Hasta Rehberi',
        description: 'İlk muayene prosedürü, ameliyat sonrası bakım önerileri ve randevu formu.',
        layoutType: 'form',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Tedavi',
      entityNamePlural: 'Tedaviler',
      itemCountTarget: 14,
      filterKeys: ['brans', 'anestezi_tipi'],
      searchPlaceholder: 'İmplant, diş beyazlatma, gömülü diş veya şeffaf plak arayın...',
      sortOptions: [
        { label: 'Standart Sıralama', value: 'default' },
        { label: 'Süreye Göre (Kısadan Uzuna)', value: 'duration-asc' },
      ],
      defaultSort: 'default',
    },
    contactInfo: {
      address: 'Kıbrıs Şehitleri Caddesi No: 142/A, Alsancak',
      district: 'Konak',
      city: 'İzmir',
      country: 'Türkiye',
      phone: '+90 (232) 464 77 00',
      email: 'randevu@dentsmyrna.com',
      workingHours: 'Pazartesi - Cumartesi: 09:00 - 19:30',
    },
  },

  // --------------------------------------------------------------------------
  // 10. FİTNESS KULÜBÜ VE KOÇLUK STÜDYOSU
  // --------------------------------------------------------------------------
  {
    id: 'kuvvet-movement-studio',
    slug: 'fitness',
    brandName: 'Kuvvet Beden Mekaniği Stüdyosu',
    tagline: 'Hareket Açıklığı, Fonksiyonel Güç ve Nöromüsküler Kondisyon',
    description:
      'Geleneksel ağırlık salonlarının ötesinde; eklem hareket açıklığı (mobility), olimpik halter, kettlebell balistiği ve toparlanma protokollerini bir araya getiren koçluk stüdyosu.',
    sectorId: 'wellness',
    sectorLabel: 'Spor & Beden Mekaniği',
    defaultSystemId: 'linear',
    accentColorHint: '#dc2626',
    badgeText: '16 Program',
    disclaimerText: 'Demo site',
    routes: {
      home: '/fitness',
      catalog: '/fitness/programlar',
      itemDetailPrefix: '/fitness/program/',
      contact: '/fitness/takvim',
      coaches: '/fitness/koclar',
      facilities: '/fitness/tesisler',
    },
    navigation: {
      navItems: [
        { label: 'Stüdyo Felsefesi', href: '/fitness', description: 'Biyomekanik temelli antrenman mantığımız' },
        { label: 'Programlar', href: '/fitness/programlar', description: 'Kuvvet, mobilite ve dayanıklılık blokları' },
        { label: 'Koç Kadrosu', href: '/fitness/koclar', description: 'Performans fizyologları ve hareket uzmanları' },
        { label: 'Tesis & Toparlanma', href: '/fitness/tesisler', description: 'Kaldırma platformları, sauna ve soğuk su banyoları' },
        { label: 'Haftalık Seans Takvimi', href: '/fitness/takvim', description: 'Küçük grup dersleri ve üyelik planları' },
      ],
      actions: [
        { label: 'Deneme Seansı Al', href: '/fitness/takvim', variant: 'primary' },
        { label: 'Programları Gör', href: '/fitness/programlar', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Hareket Disiplinleri',
          links: [
            { label: 'Omurga ve Kalça Mobilitesi', href: '/fitness/programlar' },
            { label: 'Temel Halter Kaldırışları', href: '/fitness/programlar' },
            { label: 'Kardiyorespiratuar Dayanıklılık', href: '/fitness/programlar' },
            { label: 'Sakatlık Sonrası Re-kondisyon', href: '/fitness/programlar' },
          ],
        },
        {
          title: 'Stüdyo Kuralları',
          links: [
            { label: 'Azami 8 Kişilik Grup Seansları', href: '/fitness/takvim' },
            { label: 'Kişiye Özel Hareket Taraması (FMS)', href: '/fitness/koclar' },
            { label: 'Isınma ve Soğuma Disiplini', href: '/fitness/tesisler' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/fitness',
        title: 'Kuvvet Stüdyo — Güç, Denge ve Dayanıklı Eklemler',
        navTitle: 'Felsefe',
        description: 'Vücudun anatomik potansiyelini kontrollü yüklenmelerle açığa çıkaran çalışma ortamı.',
        layoutType: 'standard',
      },
      {
        slug: 'programlar',
        path: '/fitness/programlar',
        title: 'Dönemsel Antrenman Programları (16 Blok)',
        navTitle: 'Programlar',
        description: '12 haftalık hipertrofi, patlayıcı güç ve postüral mobilite döngüleri.',
        layoutType: 'catalog',
      },
      {
        slug: 'koclar',
        path: '/fitness/koclar',
        title: 'Uzman Hareket Koçlarımız (10 Eğitmen)',
        navTitle: 'Koçlar',
        description: 'CSCS sertifikalı kondisyonerler ve fonksiyonel anatomi koçları.',
        layoutType: 'standard',
      },
      {
        slug: 'tesisler',
        path: '/fitness/tesisler',
        title: 'Tesis Donanımı ve Yenilenme Alanları',
        navTitle: 'Tesisler',
        description: 'Eleiko barları, plyo kutuları, kızılötesi sauna ve kontrast banyoları.',
        layoutType: 'standard',
      },
      {
        slug: 'takvim',
        path: '/fitness/takvim',
        title: 'Haftalık Ders Takvimi ve Üyelik Modelleri',
        navTitle: 'Takvim & Üyelik',
        description: 'Sabah, öğle ve akşam saat dilimlerinde koç eşliğindeki seans rezervasyonları.',
        layoutType: 'standard',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Program',
      entityNamePlural: 'Programlar',
      itemCountTarget: 16,
      filterKeys: ['hedef', 'yogunluk', 'seviye'],
      searchPlaceholder: 'Mobilite, koparma, dayanıklılık veya omurga sağlığı arayın...',
      sortOptions: [
        { label: 'Yoğunluk Seviyesine Göre', value: 'intensity-desc' },
        { label: 'Haftalık Süreye Göre', value: 'duration-desc' },
      ],
      defaultSort: 'intensity-desc',
    },
    contactInfo: {
      address: 'Acıbadem Caddesi, Çeçen Sokak No: 12, Koşuyolu',
      district: 'Kadıköy',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (216) 340 55 12',
      email: 'hareket@kuvvetstudyo.com',
      workingHours: 'Hafta içi: 06:30 - 22:00, Hafta sonu: 08:30 - 20:00',
    },
  },

  // --------------------------------------------------------------------------
  // 11. NADİR KİTAP VE BASKI GALERİSİ
  // --------------------------------------------------------------------------
  {
    id: 'nadirat-books-gallery',
    slug: 'books',
    brandName: 'Nadirat Kitap & Matbua Galerisi',
    tagline: 'Osmanlı Matbuatı, Haritacılık, İlk Baskılar ve Kâğıt Restorasyonu',
    description:
      'İbrahim Müteferrika baskılarından 19. yüzyıl Akdeniz deniz haritalarına, el yazması cönklerden imzalı ilk edebi baskılara uzanan müze kalitesinde nadir eser galerisi.',
    sectorId: 'retail',
    sectorLabel: 'Nadir Kitap & Koleksiyon',
    defaultSystemId: 'original-print',
    accentColorHint: '#b45309',
    badgeText: '54 Nadir Nüsha',
    disclaimerText: 'Demo site',
    routes: {
      home: '/books',
      catalog: '/books/koleksiyon',
      itemDetailPrefix: '/books/eser/',
      contact: '/books/satinalma',
      restoration: '/books/restorasyon',
      exhibitions: '/books/sergiler',
    },
    navigation: {
      navItems: [
        { label: 'Galeri & Miras', href: '/books', description: 'Yazılı kültür ve kağıt koruma geleneğimiz' },
        { label: 'Nadir Koleksiyon', href: '/books/koleksiyon', description: '54 kayıtlı harita, matbu kitap ve gravür' },
        { label: 'Konservasyon Atölyesi', href: '/books/restorasyon', description: 'Asitsiz kağıt temizliği, ebru tamiri ve deri ciltçilik' },
        { label: 'Sergi & Müzayede', href: '/books/sergiler', description: 'Mevsimlik tematik sergi ve özel satış takvimi' },
        { label: 'Eser Satın Alma & Alım', href: '/books/satinalma', description: 'Ekspertiz talebi ve koleksiyon devir danışmanlığı' },
      ],
      actions: [
        { label: 'Ekspertiz Randevusu', href: '/books/satinalma', variant: 'primary' },
        { label: 'Koleksiyonu İncele', href: '/books/koleksiyon', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Koleksiyon Alanları',
          links: [
            { label: '18. Yüzyıl Osmanlı Matbuatı', href: '/books/koleksiyon' },
            { label: 'Doğu Akdeniz Portolan Haritaları', href: '/books/koleksiyon' },
            { label: 'Erken Cumhuriyet Edebi İlk Baskılar', href: '/books/koleksiyon' },
            { label: 'Litografi ve Bakır Gravürler', href: '/books/koleksiyon' },
          ],
        },
        {
          title: 'Koruma Standartları',
          links: [
            { label: 'Sıcaklık ve Nem Kontrollü Kasa', href: '/books/restorasyon' },
            { label: 'Reversible (Geri Dönüşümlü) Restorasyon', href: '/books/restorasyon' },
            { label: 'Uluslararası ILAB & CINOA İlkeleri', href: '/books' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/books',
        title: 'Nadirat Galeri — Kâğıdın, Mürekkebin ve Zamanın Belleği',
        navTitle: 'Galeri',
        description: 'Tarihi sayfaların dokusunu koruyan ve araştırmacılarla buluşturan koleksiyon evi.',
        layoutType: 'standard',
      },
      {
        slug: 'koleksiyon',
        path: '/books/koleksiyon',
        title: 'Nadir Kitap, Harita ve Baskı Koleksiyonu (54 Eser)',
        navTitle: 'Koleksiyon',
        description: 'Provenansı doğrulanmış, kondisyon raporlu nadir eser dökümü.',
        layoutType: 'catalog',
      },
      {
        slug: 'restorasyon',
        path: '/books/restorasyon',
        title: 'Kâğıt Konservasyonu ve Klasik Cilt Atölyesi',
        navTitle: 'Restorasyon',
        description: 'Mantar temizliği, Japon kağıdıyla yırtık tamiri ve keçi derisi klasik cilt.',
        layoutType: 'editorial',
      },
      {
        slug: 'sergiler',
        path: '/books/sergiler',
        title: 'Tematik Sergiler ve Kitap Odası Takvimi',
        navTitle: 'Sergiler',
        description: 'Dönem haritaları ve matbaa tarihi üzerine küratöryel sergiler.',
        layoutType: 'standard',
      },
      {
        slug: 'satinalma',
        path: '/books/satinalma',
        title: 'Koleksiyon Alımı, Ekspertiz ve İletişim',
        navTitle: 'Alım & Ekspertiz',
        description: 'Özel kütüphane alımları, vasiyet bağışları ve kondisyon değerlendirmeleri.',
        layoutType: 'form',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Nadir Eser',
      entityNamePlural: 'Nadir Eserler',
      itemCountTarget: 54,
      filterKeys: ['donem', 'dil', 'cilt_tipi', 'kategori'],
      searchPlaceholder: 'Müteferrika, Piri Reis, taş baskı, şemse cilt veya gravür arayın...',
      sortOptions: [
        { label: 'Basım Yılına Göre (Eskiden Yeniye)', value: 'year-asc' },
        { label: 'Katalog Sırasına Göre', value: 'catalog-asc' },
        { label: 'Fiyata Göre (Azalan)', value: 'price-desc' },
      ],
      defaultSort: 'year-asc',
    },
    contactInfo: {
      address: 'Sahaflar Çarşısı Girişi No: 4, Beyazıt',
      district: 'Fatih',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (212) 512 88 19',
      email: 'galeri@nadiratkitap.com',
      workingHours: 'Pazartesi - Cumartesi: 10:00 - 18:30',
    },
  },

  // --------------------------------------------------------------------------
  // 12. ÖZEL KEŞİF VE SEYAHAT STÜDYOSU
  // --------------------------------------------------------------------------
  {
    id: 'pusula-expedition-travel',
    slug: 'travel',
    brandName: 'Pusula Keşif & Rota Stüdyosu',
    tagline: 'Kutup Hatları, İpek Yolu Karavanları ve Yüksek İrtifa Seferleri',
    description:
      'Turistik kalabalıklardan uzak; Pamir ve Tien Shan geçitleri, İzlanda buzul gölleri, Kapadokya kanyon yürüyüşleri ve Kuzey kutup rotalarını yöneten butik keşif stüdyosu.',
    sectorId: 'hospitality',
    sectorLabel: 'Özel Keşif & Coğrafya',
    defaultSystemId: 'premium-pro',
    accentColorHint: '#0d9488',
    badgeText: '36 Keşif Rotası',
    disclaimerText: 'Demo site',
    routes: {
      home: '/travel',
      catalog: '/travel/rotalar',
      itemDetailPrefix: '/travel/rota/',
      contact: '/travel/hazirlik',
      guides: '/travel/rehberler',
      logbook: '/travel/gunlukler',
    },
    navigation: {
      navItems: [
        { label: 'Keşif Ruhu', href: '/travel', description: 'Coğrafyayı adımlarla anlama ilkemiz' },
        { label: 'Keşif Rotaları', href: '/travel/rotalar', description: '36 özel coğrafi sefer ve geçit yürüyüşü' },
        { label: 'Sefer Liderleri', href: '/travel/rehberler', description: 'Dağcılar, jeomorfologlar ve yerel rehberler' },
        { label: 'İrtifa & Hazırlık', href: '/travel/hazirlik', description: 'Fiziksel kondisyon, donanım kontrol listesi ve lojistik' },
        { label: 'Saha Günlükleri', href: '/travel/gunlukler', description: 'Keşif ekiplerimizin son rota notları ve fotoğrafları' },
      ],
      actions: [
        { label: 'Sefere Başvur', href: '/travel/hazirlik', variant: 'primary' },
        { label: 'Rotaları İncele', href: '/travel/rotalar', variant: 'outline' },
      ],
      footerSections: [
        {
          title: 'Coğrafi Havzalar',
          links: [
            { label: 'Orta Asya İpek Yolu ve Pamir', href: '/travel/rotalar' },
            { label: 'Kuzey Buz Denizi ve Fiyortlar', href: '/travel/rotalar' },
            { label: 'Doğu Karadeniz Sırt Hatları', href: '/travel/rotalar' },
            { label: 'Atlas Dağları ve Çöl Vahaları', href: '/travel/rotalar' },
          ],
        },
        {
          title: 'Saha Güvenliği',
          links: [
            { label: 'Uydu Haberleşme ve Acil Tahliye', href: '/travel/hazirlik' },
            { label: 'Vahşi Yaşam ve Çevreye Saygı Protokolü', href: '/travel' },
            { label: 'Azami 8 Kişilik Keşif Ekipleri', href: '/travel/rotalar' },
          ],
        },
      ],
    },
    pages: [
      {
        slug: 'index',
        path: '/travel',
        title: 'Pusula Keşif — Coğrafyanın Sessiz ve Yalın Yüzü',
        navTitle: 'Keşif Ruhu',
        description: 'Alışılmış seyahatlerin ötesinde, gerçek harita sınırlarında yürüyüşler.',
        layoutType: 'standard',
      },
      {
        slug: 'rotalar',
        path: '/travel/rotalar',
        title: 'Tüm Sefer ve Keşif Rotaları (36 Rota)',
        navTitle: 'Rotalar',
        description: 'Zorluk derecesi, irtifa profili ve kamp lojistiği detaylandırılmış rotalar.',
        layoutType: 'catalog',
      },
      {
        slug: 'rehberler',
        path: '/travel/rehberler',
        title: 'Sefer Liderleri ve Saha Kaşifleri',
        navTitle: 'Rehberler',
        description: 'Yüksek irtifa dağcıları, coğrafyacılar ve bölge uzmanı yol göstericiler.',
        layoutType: 'standard',
      },
      {
        slug: 'hazirlik',
        path: '/travel/hazirlik',
        title: 'İklim, Donanım ve Sefer Başvuru Rehberi',
        navTitle: 'Hazırlık',
        description: 'Gerekli çanta ağırlığı, bot seçimi, vize prosedürleri ve başvuru formu.',
        layoutType: 'form',
      },
      {
        slug: 'gunlukler',
        path: '/travel/gunlukler',
        title: 'Saha Günlükleri ve Topografya Notları',
        navTitle: 'Günlükler',
        description: 'Son seferlerden meteorolojik ölçümler, kamp anları ve harita krokileri.',
        layoutType: 'editorial',
      },
    ],
    catalogConfig: {
      enabled: true,
      entityName: 'Keşif Rotası',
      entityNamePlural: 'Keşif Rotaları',
      itemCountTarget: 36,
      filterKeys: ['zorluk', 'bolge', 'mevsim'],
      searchPlaceholder: 'Pamir, buzul geçişi, kanyon, Kaçkar veya yayla arayın...',
      sortOptions: [
        { label: 'Süreye Göre (Gün)', value: 'duration-desc' },
        { label: 'Azami İrtifaya Göre', value: 'altitude-desc' },
        { label: 'Zorluk Derecesine Göre', value: 'difficulty-asc' },
      ],
      defaultSort: 'duration-desc',
    },
    contactInfo: {
      address: 'Kalyoncu Kulluğu Caddesi No: 33, Cihangir',
      district: 'Beyoğlu',
      city: 'İstanbul',
      country: 'Türkiye',
      phone: '+90 (212) 251 60 74',
      email: 'sefer@pusulakesif.com',
      workingHours: 'Hafta içi: 10:00 - 18:30 (Randevu ile kabul)',
    },
  },
];

// ============================================================================
// YARDIMCI VE ERİŞİM FONKSİYONLARI (UTILITY ACCESSORS)
// ============================================================================

export function getSiteById(id: string): SiteDefinition | undefined {
  return sites.find((site) => site.id === id);
}

export function getSiteBySlug(slug: string): SiteDefinition | undefined {
  return sites.find((site) => site.slug === slug);
}

export function getSitesBySector(sectorId: SectorId): SiteDefinition[] {
  return sites.filter((site) => site.sectorId === sectorId);
}

export function getAllSectors(): SectorId[] {
  return Array.from(new Set(sites.map((site) => site.sectorId)));
}

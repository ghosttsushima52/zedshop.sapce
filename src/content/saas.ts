/**
 * Avenox Çoklu Site Vitrini - B2B SaaS Operasyon Platformu İçerik Modülü
 * Marka: VektörOps - Kurumsal Operasyon ve Saha Orkestrasyon Platformu
 * Lokasyon / Altyapı: İstanbul & Frankfurt Veri Merkezleri (Hibrit Bulut & On-Premise)
 */

export interface SaasProductModule {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  architectureDetails: string;
  capabilities: string[];
  metricsImpact: { value: string; label: string };
  technicalSpecs: {
    latency: string;
    protocol: string;
    scalability: string;
    compliance: string;
  };
  screenshotUrl: string;
  screenshotAlt: string;
  icon: string;
}

export interface SaasUseCase {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  operationalOutcome: string;
  keyWorkflows: string[];
  benchmarkStats: Array<{ metric: string; improvement: string }>;
  quote: { text: string; authorRole: string; companyType: string };
  featuredImageUrl: string;
  featuredImageAlt: string;
}

export interface SaasPricingTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  monthlyPriceTRY: number | null;
  annualMonthlyPriceTRY: number | null;
  isCustomQuote: boolean;
  targetScale: string;
  userLimit: string;
  featureHighlights: string[];
  slaGuarantee: string;
  supportLevel: string;
  ctaText: string;
  isPopular?: boolean;
}

export interface SaasChangelogEntry {
  version: string;
  releaseDate: string;
  title: string;
  summary: string;
  categories: Array<'Özellik' | 'İyileştirme' | 'Performans' | 'Güvenlik' | 'API' | 'Kritik Düzeltme'>;
  highlights: string[];
  breakingChanges?: string[];
  slug: string;
}

export interface SaasDocItem {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  badge?: string;
}

export interface SaasDocSection {
  sectionTitle: string;
  sectionSlug: string;
  description: string;
  items: SaasDocItem[];
}

export interface SaasPlatformContent {
  brand: {
    name: string;
    legalEntity: string;
    tagline: string;
    heroHeadline: string;
    heroSubheadline: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
    stats: Array<{ label: string; value: string; description: string }>;
    securityCertifications: string[];
  };
  navigation: Array<{ label: string; href: string }>;
  modules: SaasProductModule[];
  useCases: SaasUseCase[];            // Exact 8 items
  pricingTiers: SaasPricingTier[];     // Exact 4 items
  changelog: SaasChangelogEntry[];     // Exact 16 items
  docsNavigation: SaasDocSection[];
}

export const saasPlatformData: SaasPlatformContent = {
  brand: {
    name: 'VektörOps',
    legalEntity: 'Vektör Kurumsal Bilişim ve Operasyon Teknolojileri A.Ş.',
    tagline: 'Saha ekipleri için görev, rota ve kayıt yönetimi',
    heroHeadline: 'Saha işlerini tek akışta takip edin',
    heroSubheadline:
      'Görev atamaları, rota değişiklikleri ve ekip notları aynı çalışma alanında görünür. Her modülün hangi kararı kolaylaştırdığını ürün sayfalarında inceleyin.',
    primaryCta: { text: '30 Günlük Pilot Talep Edin', href: '/saas/pilot' },
    secondaryCta: { text: 'Teknik Dokümantasyonu İnceleyin', href: '/saas/docs' },
    stats: [
      { label: 'Ürün Modülü', value: '6', description: 'Görev, rota ve ekip yönetimi araçları' },
      { label: 'Kullanım Senaryosu', value: '8', description: 'Sektöre göre örnek iş akışları' },
      { label: 'Sürüm Notu', value: '16', description: 'Ürün değişikliklerinin kaydı' },
      { label: 'Plan', value: '4', description: 'Ekip ölçeğine göre seçenekler' }
    ],
    securityCertifications: ['Rol tabanlı erişim', 'Şifreli veri aktarımı', 'İşlem günlüğü', 'Entegrasyon yetkileri']
  },

  navigation: [
    { label: 'Platform & Modüller', href: '/saas' },
    { label: 'Kullanım Senaryoları', href: '/saas/senaryolar' },
    { label: 'Fiyatlandırma', href: '/saas/fiyatlandirma' },
    { label: 'Sürüm Notları (Changelog)', href: '/saas/changelog' },
    { label: 'Geliştirici Dokümanları', href: '/saas/docs' }
  ],

  // Product Modules (Ürün Modülleri)
  modules: [
    {
      slug: 'vektor-dispatch',
      name: 'Vektör Dispatch & Rota Orkestrasyonu',
      tagline: 'Kapasite, trafik ve dinamik zaman pencerelerini hesaplayan poligon tabanlı rota optimizasyonu',
      shortDescription:
        'Sipariş hacmi, araç hacimsel kapasitesi (m³), soğuk zincir gereksinimleri ve anlık trafik sıkışıklığını eşzamanlı değerlendirerek saniyeler içinde optimum teslimat rotaları çizer.',
      architectureDetails:
        'VRP (Vehicle Routing Problem) algoritmalarını Rust tabanlı dağıtık matris hesaplama servisi üzerinde çalıştırır. Her araç için dinamik ETD (Tahmini Varış Süresi) güncellemelerini milisaniyeler içinde kurye ve müşteri panellerine yayınlar.',
      capabilities: [
        'Çok duraklı karmaşık teslimat noktaları için kümeleme ve rota çizimi',
        'Zaman penceresi (Time-Window) kısıtlarına duyarlı dinamik görev ataması',
        'Acil siparişlerde seyir halindeki araca ters yönsüz ilave durak ekleme',
        'Coğrafi çit (Geofence) giriş-çıkış tetikleyicileri ile müşteri bilgilendirme'
      ],
      metricsImpact: { value: '%28', label: 'Ortalama filo yakıt tüketiminde azalma' },
      technicalSpecs: {
        latency: '40 ms rota optimizasyon süresi',
        protocol: 'gRPC & WebSocket yayını',
        scalability: 'Aynı anda 50.000 aktif araç simülasyonu',
        compliance: 'Harita verisi yerel mevzuat ve KVKK uyumlu'
      },
      screenshotUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      screenshotAlt: 'Vektör Dispatch harita tabanlı filo yönetim ve optimizasyon paneli ekran görüntüsü',
      icon: 'Navigation'
    },
    {
      slug: 'vektor-telemetry',
      name: 'Vektör Telemetri & Canlı Envanter',
      tagline: 'Depo ve nakliye hattındaki her bir paletin sıcaklık, nem ve konum bilgisini anlık işleyin',
      shortDescription:
        'Bluetooth LE, hücresel IoT probları ve RFID okuyuculardan gelen ham telemetri akışlarını filtreler; soğuk zincir bozulmalarında veya sarsıntı eşik aşımlarında otomatik alarm üretir.',
      architectureDetails:
        'Apache Kafka ve zaman serisi veritabanı (TimescaleDB) mimarisi üzerinde inşa edilmiştir. Saniyede 200.000 telemetri paketini parse ederek sensör anomalilerini filtreler ve dijital ikiz modeline işler.',
      capabilities: [
        'Parti ve lot seviyesinde anlık sıcaklık ve bağıl nem tolerans takibi',
        'Depo içi forklift ve hareketli ekipman konumlandırması (UWB / BLE)',
        'Eşik aşımlarında anında sürücüye sesli ikaz ve merkez ofise alarm',
        'Kritik ilaç ve gıda taşımacılığı için denetlenebilir dijital sıcaklık karnesi'
      ],
      metricsImpact: { value: '%99.4', label: 'Soğuk zincir fire oranlarında engelleme başarısı' },
      technicalSpecs: {
        latency: '< 65 ms uçtan uca bildirim',
        protocol: 'MQTT, CoAP & REST Webhook',
        scalability: '1.000.000 bağlı IoT sensör kapasitesi',
        compliance: 'FDA 21 CFR Part 11 & İyi Dağıtım Uygulamaları (GDP)'
      },
      screenshotUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      screenshotAlt: 'Vektör Telemetri sensör akışı ve ortam koşulları analitik grafikleri ekranı',
      icon: 'Cpu'
    },
    {
      slug: 'vektor-workforce',
      name: 'Vektör Workforce & Saha Yönetimi',
      tagline: 'Vardiya atamaları, form doldurma, dijital imza ve offline çalışan mobil iş gücü uygulaması',
      shortDescription:
        'Saha teknisyenleri ve sürücüler için internet bağlantısı kesildiğinde dahi yerel SQLite üzerinde veri saklayan, bağlantı kurulduğunda iki yönlü senkronize olan dayanıklı mobil çözüm.',
      architectureDetails:
        'React Native tabanlı mobil istemciler, CRDT (Conflict-free Replicated Data Types) algoritmalarıyla çevrimdışı form kayıtlarını sunucu veritabanıyla çakışmasız olarak eşitler.',
      capabilities: [
        'Dinamik kontrol listeleri (Checklist), barkod tarama ve fotoğraf delili',
        'Müşteri kapısında cam üzerine imza ve e-fatura/irsaliye teslim kanıtı (PoD)',
        'Saha teknisyeni yetkinlik matrisi ve sertifika geçerlilik denetimi',
        'Çevrimdışı (Offline) çalışma ve arka plan konum optimizasyonlu pil tasarrufu'
      ],
      metricsImpact: { value: '%35', label: 'Saha teknisyeni günlük görev tamamlama artışı' },
      technicalSpecs: {
        latency: 'Yerel cihaz üzerinde 0 ms tepki süresi',
        protocol: 'Şifreli WebSocket & SQLite Sync',
        scalability: 'Sınırsız mobil cihaz kaydı',
        compliance: 'Biyometrik imza ve KVKK loglama'
      },
      screenshotUrl: 'https://images.unsplash.com/photo-1507208773393-40d9fc6be0b2?auto=format&fit=crop&w=1200&q=80',
      screenshotAlt: 'Vektör Workforce mobil saha uygulaması ve teknisyen görev arayüzü',
      icon: 'Smartphone'
    },
    {
      slug: 'vektor-sla-engine',
      name: 'Vektör SLA Engine & Olay Müdahalesi',
      tagline: 'Sözleşmesel teslimat ve onarım taahhütlerini milisaniye bazında takip eden eskalasyon motoru',
      shortDescription:
        'Gecikme riski taşıyan sipariş veya servis taleplerini önceden kestirir; otomatik olarak acil durum aksiyonları, alternatif araç atamaları ve yönetici uyarı bildirimleri üretir.',
      architectureDetails:
        'Kural motorumuz (Rules Engine), her müşterinin kurumsal sözleşme koşullarını (örn. 2 saat içinde arıza tespiti, 4 saatte parça değişimi) durmaksızın sorgulayan sonlu durum makinesi (FSM) ile işletir.',
      capabilities: [
        'Müşteri ve hizmet tipine göre dinamik SLA sayaçları ve geri sayım',
        'Tolerans aşılmadan 30 dakika önce otomatik eskalasyon seviyesi tetikleme',
        'Çağrı merkezi, WhatsApp Business API ve SMS üzerinden çift yönlü teyit',
        'Haftalık ve aylık kök neden (Root-Cause) hata analiz raporları'
      ],
      metricsImpact: { value: '%94', label: 'Zamanında müdahale (First-Time-Fix) oranı' },
      technicalSpecs: {
        latency: 'Anlık durum değişimi < 20 ms',
        protocol: 'Webhooks, Opsgenie, PagerDuty entegrasyonu',
        scalability: 'Milyonlarca eşzamanlı SLA sayacı',
        compliance: 'Sözleşmesel denetim izi (Audit Trail)'
      },
      screenshotUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      screenshotAlt: 'Vektör SLA Engine gerçek zamanlı olay izleme ve eskalasyon matrisi paneli',
      icon: 'AlertTriangle'
    },
    {
      slug: 'vektor-integrations',
      name: 'Vektör Entegrasyon Köprüsü & ERP Konnektörleri',
      tagline: 'SAP, Oracle, Netsis ve Logo sistemleriyle iki yönlü, çakışmasız kurumsal veri hattı',
      shortDescription:
        'Mevcut ERP, WMS veya muhasebe sistemlerinizi değiştirmeden; sipariş, stok, fatura ve müşteri carilerini saniyeler içinde VektörOps iş akışlarıyla çift yönlü senkronize edin.',
      architectureDetails:
        'Kuyruk tabanlı kuyruk yönetimi (RabbitMQ), idempotency anahtarları ve otomatik yeniden deneme (exponential backoff) mekanizmalarıyla ağ kesintilerinde dahi veri kaybını önler.',
      capabilities: [
        'SAP ECC ve S/4HANA için RFC/BAPI ve OData yerel konnektörleri',
        'Logo Tiger / Netsis için çift yönlü nesne ve cari hesap eşitleme',
        'Özel dahili sistemler için OpenAPI 3.1 uyumlu REST ve GraphQL API katmanı',
        'Veri dönüşümü ve şema eşleme için no-code görsel mapping editörü'
      ],
      metricsImpact: { value: '%100', label: 'Çift taraflı veri mutabakatı ve sıfır mükerrer kayıt' },
      technicalSpecs: {
        latency: 'ERP aktarım döngüsü < 300 ms',
        protocol: 'REST, OData, SAP RFC, GraphQL',
        scalability: 'Günde 25 milyon API çağrısı',
        compliance: 'e-İrsaliye ve Gelir İdaresi Başkanlığı standartları'
      },
      screenshotUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
      screenshotAlt: 'Vektör Entegrasyon Köprüsü şema eşleme ve ERP veri akış diyagramı',
      icon: 'Layers'
    },
    {
      slug: 'vektor-decision-hub',
      name: 'Vektör Karar Motoru & Operasyonel Analitik',
      tagline: 'Darboğaz ısı haritaları, maliyet kırılımları ve makine öğrenimi tabanlı talep simülasyonu',
      shortDescription:
        'Sahanın tüm geçmiş hareketlerini analiz ederek hangi bölgelerde rota gecikmesi yaşandığını, hangi teknisyenlerin daha verimli çalıştığını ve gelecek haftanın kaynak ihtiyacını modeller.',
      architectureDetails:
        'ClickHouse sütun bazlı analitik veritabanı üzerinde çalışan OLAP sorguları, petabaytlarca geçmiş operasyon verisini saniyeler içinde interaktif tablolara ve haritalara dönüştürür.',
      capabilities: [
        'Bölge ve sürücü bazlı operasyonel maliyet (Cost-per-Drop) hesaplaması',
        'Yol koşulları ve park sürelerine dayalı darboğaz tespit ısı haritaları',
        'Mevsimsel ve haftalık talep dalgalanmalarına göre filo kapasite simülasyonu',
        'Yönetim kurulu seviyesinde otomatik oluşturulan PDF/Excel operasyon bültenleri'
      ],
      metricsImpact: { value: '%18.2', label: 'Toplam operasyonel birim maliyetinde düşüş' },
      technicalSpecs: {
        latency: 'Karmaşık analitik sorgularda < 1.2 sn',
        protocol: 'SQL, JDBC, Superset & BI Entegrasyonu',
        scalability: '500+ TB tarihsel log analizi',
        compliance: 'Anonimleştirilmiş KPI veri havuzu'
      },
      screenshotUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      screenshotAlt: 'Vektör Karar Motoru analitik raporlama ve KPI kontrol paneli',
      icon: 'PieChart'
    }
  ],

  // 8 Use Cases (Kullanım Senaryoları)
  useCases: [
    {
      slug: 'soguk-zincir-ve-gida-lojistigi',
      title: 'Soğuk Zincir ve Bozulabilir Gıda Dağıtımı',
      industry: 'Taze Gıda, Süt Ürünleri ve İlaç Lojistiği',
      challenge:
        'Sıcaklık hassasiyeti yüksek ürünlerin nakliyesinde kapı açılma süreleri, soğutucu arızaları ve trafik gecikmeleri nedeniyle yıllık %4 ila %7 arasında ürün bozulması ve telafi maliyeti yaşanması.',
      solution:
        'Vektör Telemetri IoT sensörleri ile her bir kamyon kasasındaki sıcaklık anlık izlenir. Eşik değer aşıldığında rota optimizasyon motoru en yakın soğuk depoya veya öncelikli müşteriye otomatik yönlendirme yapar.',
      operationalOutcome:
        'Soğuk zincir kırılma vakalarında %82 azalma sağlandı; ürün iade oranları binde 2 seviyesine çekildi ve dijital sıcaklık logları ile tam yasal güvence kazanıldı.',
      keyWorkflows: [
        'Sevkiyat öncesi kamyon kasası soğutma teyit protokolü',
        'Kapı açılma süresine duyarlı mikro sıcaklık dalgalanması alarmı',
        'Müşteri teslimatında dijital parti/lot sıcaklık sertifikası basımı'
      ],
      benchmarkStats: [
        { metric: 'Ürün Bozulma Oranı', improvement: '%78 Azalma' },
        { metric: 'Sıcaklık Sapma Alarm Yanıtı', improvement: '< 3 Dakika' }
      ],
      quote: {
        text: 'VektörOps sayesinde Ege ve Akdeniz hattındaki 140 araçlık soğutmalı filomuzda yaz aylarında yaşanan fire kayıplarını neredeyse sıfıra indirdik.',
        authorRole: 'Lojistik Operasyon Direktörü',
        companyType: 'Ulusal Süt ve Şarküteri Üreticisi'
      },
      featuredImageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      featuredImageAlt: 'Soğuk hava depolama tesisinde teknolojik envanter denetimi'
    },
    {
      slug: 'omnichannel-magaza-siparis-karsilama',
      title: 'Çok Kanallı Perakende ve Mağazadan Teslimat (Ship-from-Store)',
      industry: 'Giyim, Tüketici Elektroniği ve Perakende Zincirleri',
      challenge:
        'Merkezi depo yerine 80 farklı şehir içi mağazadan aynı gün teslimat yaparken stok mutabakatı eksikliği, hatalı ürün toplama ve kurye bekleme sürelerinin operasyonu kilitlemesi.',
      solution:
        'VektörOps Mağazadan Teslimat modülü, müşterinin konumuna en yakın ve stokunda ilgili ürün bulunan mağazayı saniyeler içinde belirler. Mağaza personeline el terminali üzerinden adım adım toplama görevi açar ve şehir içi kurye ile buluşturur.',
      operationalOutcome:
        'Siparişin mağazada hazırlanma süresi 18 dakikaya indirildi; aynı gün teslimat başarı oranı %96.4 seviyesine çıkarıldı ve merkezi depo kargo yükü %40 hafifletildi.',
      keyWorkflows: [
        'Kasa arkası stok doğrulama ve hızlı barkod eşleme',
        'Kurye varış zamanına göre senkronize paketleme çağrısı',
        'Mağazalar arası dengeli stok transfer öneri motoru'
      ],
      benchmarkStats: [
        { metric: 'Ortalama Teslimat Süresi', improvement: '3.2 Saate Düştü' },
        { metric: 'Mağaza İçi Toplama Hızı', improvement: '%45 Hızlandı' }
      ],
      quote: {
        text: 'Büyük şehirlerde müşterilerimize 4 saatte teslimat sözü verebiliyoruz çünkü VektörOps hangi mağazamızda ürün olduğunu ve hangi kuryenin hazır olduğunu tam olarak biliyor.',
        authorRole: 'Tedarik Zinciri ve E-Ticaret GMY',
        companyType: 'Hazır Giyim Perakende Zinciri'
      },
      featuredImageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      featuredImageAlt: 'Modern perakende mağazasında dijital sipariş karşılama ve envanter hazırlığı'
    },
    {
      slug: 'endustriyel-tesis-ve-kestirimci-bakim',
      title: 'Endüstriyel Üretim Tesisleri ve Kestirimci Bakım Servisi',
      industry: 'Ağır Sanayi, Makine İmalatı ve Tesis Bakım Firmaları',
      challenge:
        'Üretim bantlarındaki beklenmedik motor ve kompresör arızalarında doğru yedek parçaya ve teknik sertifikaya sahip saha mühendisinin gecikmeli yönlendirilmesi sonucu saatlik yüz binlerce liralık duruş kayıpları.',
      solution:
        'SCADA ve titreşim sensörlerinden gelen arıza sinyalleri VektörOps SLA motoruna düşer. Sistem, arızalı makine tipine uygun sertifikaya sahip en yakın teknisyeni ve servis aracındaki yedek parça envanterini eşleştirerek otomatik görev emri oluşturur.',
      operationalOutcome:
        'Plansız duruş sürelerinde %42 azalma kaydedildi. Teknisyenin ilk ziyarette arızayı çözme oranı (First-Time Fix) %89’a yükseldi.',
      keyWorkflows: [
        'SCADA alarm eşiğinde otomatik acil bakım iş emri oluşturma',
        'Araç içi yedek parça stok kontrolü ve eksik parça uyarısı',
        'Patlayıcı ortam (ATEX) güvenlik kontrol formu zorunlu onayı'
      ],
      benchmarkStats: [
        { metric: 'Arızaya Müdahale Süresi', improvement: '%54 Kısaldı' },
        { metric: 'İlk Seferde Çözüm Oranı', improvement: '%89 Seviyesinde' }
      ],
      quote: {
        text: 'Sanayi tesislerinde dakikalar dahi milyon liralık kayıp demektir. VektörOps ile doğru teknisyeni doğru yedek parçayla en geç 40 dakikada hatta ulaştırıyoruz.',
        authorRole: 'Teknik Hizmetler Direktörü',
        companyType: 'Endüstriyel Tesis Yönetim Grubu'
      },
      featuredImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      featuredImageAlt: 'Endüstriyel üretim hattında tablet ile makine bakım kontrolü yapan mühendis'
    },
    {
      slug: 'medikal-cihaz-ve-saglik-saha-hizmetleri',
      title: 'Medikal Teknoloji ve Kritik Sağlık Saha Müdahaleleri',
      industry: 'Hastaneler, Biyomedikal Cihaz Distribütörleri ve Laboratuvarlar',
      challenge:
        'MR, BT ve solunum cihazları gibi hayati öneme sahip ekipmanların periyodik kalibrasyonlarının gecikmesi ve acil arızalarda Sağlık Bakanlığı regülasyonlarına uygun denetim izinin tutulamaması.',
      solution:
        'VektörOps, biyomedikal cihazların kalibrasyon takvimlerini otomatik takip eder. Müdahale formları kriptografik zaman damgasıyla imzalanır ve Sağlık Bakanlığı ÇKYS standartlarında arşivlenir.',
      operationalOutcome:
        'Sözleşmeli hastanelerin kritik arıza SLA uyumu %99.8’e ulaştı. Kalibrasyon raporlama süreci tamamen kağıtsız hale getirilerek yasal denetimlerde sıfır bulgu elde edildi.',
      keyWorkflows: [
        'Hastane acil servis çağrılarında 15 dakika içinde teknisyen sevk teyidi',
        'Biyomedikal kalibrasyon ölçüm cihazı seri no eşleştirmesi',
        'Kriptografik dijital form imzası ve anında hastane yönetimine iletim'
      ],
      benchmarkStats: [
        { metric: 'Yasal Uyum ve Denetim Başarısı', improvement: '%100 Uyum' },
        { metric: 'Raporlama ve Arşivleme Süresi', improvement: 'Anlık Dijital' }
      ],
      quote: {
        text: 'Ameliyathane veya yoğun bakım cihazlarında hata lüksümüz yok. VektörOps bize hem milisaniye seviyesinde takip hem de denetimlerde kusursuz yasal raporlama sağlıyor.',
        authorRole: 'Biyomedikal Operasyon Müdürü',
        companyType: 'Çok Şubeli Özel Sağlık Grubu'
      },
      featuredImageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      featuredImageAlt: 'Hastanede biyomedikal teşhis cihazı kalibrasyonu gerçekleştiren teknisyen'
    },
    {
      slug: 'telekom-ve-fiber-altyapi-saha-kurulumu',
      title: 'Telekomünikasyon Altyapı ve Fiber Şebeke Dağıtımı',
      industry: 'İnternet Servis Sağlayıcıları ve Telekom Operatörleri',
      challenge:
        'Günde binlerce ev ve iş yerine fiber internet aktivasyonu yapılırken taşeron ekiplerin randevu saatlerine uymaması, bina içi kablolama eksikleri ve mükerrer saha ziyaretleri.',
      solution:
        'Abone randevu saatleri Vektör Dispatch tarafından bina bazlı kümelenir. Teknisyen aktivasyon testini mobil uygulama üzerinden yapmadan iş emrini kapatamaz; optik güç (dBm) değerleri otomatik doğrulanır.',
      operationalOutcome:
        'Günde tamamlanan hane kurulum sayısı ekip başına 4.2’den 6.8’e yükseldi. Müşteri evinde bulunamama oranı dinamik SMS teyitleri sayesinde %21’den %4’e geriledi.',
      keyWorkflows: [
        'Bina içi dağıtım kutusu (OFDK) port kapasitesiyle entegre randevu planlama',
        'Mobil uygulama üzerinden optik sinyal seviyesi ölçüm kaydı',
        'Müşteri memnuniyet anketinin kapıda anlık puanlanması'
      ],
      benchmarkStats: [
        { metric: 'Ekip Başına Günlük Kurulum', improvement: '%62 Artış' },
        { metric: 'Müşteri Randevu Sapması', improvement: '< 8 Dakika' }
      ],
      quote: {
        text: 'Geniş bant fiber açılışlarında taşeron ve kadrolu 600 saha çalışanımızı tek ekrandan yönetiyor, müşteri memnuniyeti NPS skorumuzu 22 puan artırmayı başardık.',
        authorRole: 'Saha Operasyonları Genel Koordinatörü',
        companyType: 'Ulusal Geniş Bant Telekom Şirketi'
      },
      featuredImageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      featuredImageAlt: 'Fiber optik şebeke bağlantı kutusunda füzyon ek cihazı ile çalışan telekom teknisyeni'
    },
    {
      slug: 'b2b-toptan-ve-hizli-tuketim-dagitimi',
      title: 'B2B Toptan Ticaret ve FMCG Bölgesel Dağıtım Ağı',
      industry: 'Bakkal, Market ve Restoran Tedarikçileri',
      challenge:
        'Geleneksel kanalda bakkal ve kafelere yapılan günlük rut ziyaretlerinde sipariş toplama, faturalama ve tahsilat adımlarının birbirinden kopuk olması nedeniyle nakit akışı gecikmeleri.',
      solution:
        'VektörOps saha mobil uygulamasında sipariş, e-irsaliye kesimi ve POS/nakit tahsilat tek akışta birleştirildi. Rut planlaması mağazanın en sakin olduğu saatlere göre otomatik optimize edildi.',
      operationalOutcome:
        'Sevkiyat aracının günlük ziyaret kapasitesi %32 arttı. Tahsilat kaçakları sıfırlandı ve akşam kasa mutabakat süresi 2 saatten 10 dakikaya indi.',
      keyWorkflows: [
        'Geçmiş satış verilerine dayalı önerilen sipariş sepeti sunumu',
        'Mobil bluetooth yazıcıdan anında resmi e-irsaliye basımı',
        'ERP cari hesabına anlık işlenen tahsilat makbuzu'
      ],
      benchmarkStats: [
        { metric: 'Günlük Mağaza Ziyaret Adedi', improvement: '+%32 Artış' },
        { metric: 'Akşam Kasa Mutabakat Süresi', improvement: '10 Dakikaya İndi' }
      ],
      quote: {
        text: 'Plasiyerlerimiz artık sipariş almak için beklemek zorunda kalmıyor. Rota hazır, stok net ve tahsilat anında merkez ERP sistemine yansıyor.',
        authorRole: 'Ticari Operasyonlar Direktörü',
        companyType: 'Bölgesel İçecek ve Gıda Distribütörü'
      },
      featuredImageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
      featuredImageAlt: 'Toptan gıda dağıtım merkezinde lojistik palet yükleme ve kontrol süreci'
    },
    {
      slug: 'yenilenebilir-enerji-santral-yonetimi',
      title: 'Güneş ve Rüzgar Santralleri Uzaktan Saha Denetimi',
      industry: 'Güneş Enerjisi (GES), Rüzgar Enerjisi (RES) ve Şebeke Yatırımları',
      challenge:
        'Geniş coğrafyaya yayılmış yüzlerce dönümlük santrallerde invertör arızaları veya panel kirlenmelerinin geç fark edilmesi sebebiyle üretilmeyen her kilovatsaatin doğrudan gelir kaybı yaratması.',
      solution:
        'İnvertör telemetri verileri SCADA üzerinden VektörOps Karar Motoruna akar. Verim düşüklüğü yaşayan dizi paneller drone termal kameraları ve saha ekipleriyle otomatik olarak eşleştirilir.',
      operationalOutcome:
        'Arıza tespit ve müdahale süresi 48 saatten 4 saate düşürüldü. Yıllık santral emre amadelik (availability) oranı %99.6’ya çıkartılarak yatırım geri dönüş süresi kısaltıldı.',
      keyWorkflows: [
        'Güneş ışınımına göre beklenen üretim ile gerçek üretimin anlık kıyası',
        'Termal sıcak nokta (Hotspot) arıza koordinatına göre teknisyen görevlendirme',
        'Yüksek gerilim güvenlik prosedürleri mobil onay adımı'
      ],
      benchmarkStats: [
        { metric: 'Santral Emre Amadelik Oranı', improvement: '%99.6 Seviyesinde' },
        { metric: 'Yıllık Üretim Kazancı', improvement: '+%4.8 İlave MWh' }
      ],
      quote: {
        text: 'İç Anadolu’daki 12 farklı GES santralimizin operasyonel bakımını tek merkezden yönetebiliyoruz. Hangi paneli temizlememiz veya hangi sigortayı değiştirmemiz gerektiğini sistem bize söylüyor.',
        authorRole: 'Varlık Yönetimi ve O&M Direktörü',
        companyType: 'Yenilenebilir Enerji Yatırım Fonu'
      },
      featuredImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      featuredImageAlt: 'Güneş paneli santralinde el terminali ile elektriksel denetim yapan saha mühendisi'
    },
    {
      slug: 'kentsel-son-mil-mikro-lojistik',
      title: 'Kentsel Son Mil (Last-Mile) ve Hızlı Kurye Filoları',
      industry: 'Ekspres Kargo, E-Ticaret Paket Dağıtımı ve Kurye Ağları',
      challenge:
        'Yoğun metropol trafiğinde dar sokaklar, otopark sorunları ve teslimat saatlerindeki dalgalanmalar nedeniyle kuryelerin günde 80 paketi aşamaması ve müşteri şikayetlerinin tırmanması.',
      solution:
        'VektörOps poligon tabanlı mikro bölge algoritması, kuryeleri sadece yürüyüş veya motosiklet yarıçapındaki binalarla eşleştirir. Dinamik adres düzeltme algoritması yanlış yazılmış adresleri %94 doğrulukla düzeltir.',
      operationalOutcome:
        'Kurye başına günlük teslim edilen paket sayısı 75’ten 120’ye çıktı. Teslim edilemeyen paket oranı %8.5’tan %1.2’ye geriledi.',
      keyWorkflows: [
        'Zil çalmadan önce müşteriye 5 dakikalık canlı harita takip linki gönderimi',
        'Apartman giriş kodu ve güvenlik talimatlarının kurye ekranında belirmesi',
        'Temassız teslimat için kapı önü fotoğraflı teslim kanıtı yükleme'
      ],
      benchmarkStats: [
        { metric: 'Kurye Başına Teslimat Kapasitesi', improvement: '%60 Artış' },
        { metric: 'Başarısız Teslimat Oranı', improvement: '%1.2’ye Geriledi' }
      ],
      quote: {
        text: 'İstanbul genelinde 400 kurye ile çalışıyoruz. VektörOps’a geçtikten sonra aynı kurye filosuyla iki kat daha fazla koli teslim etmeye başladık.',
        authorRole: 'Operasyon Genel Müdürü',
        companyType: 'Yeni Nesil Şehir İçi Kargo Dağıtım Ağı'
      },
      featuredImageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
      featuredImageAlt: 'Kentsel dağıtım merkezinde paket barkod taraması yapan kurye ve elektrikli teslimat araçları'
    }
  ],

  // 4 Pricing Tiers (Fiyatlandırma Seviyeleri)
  pricingTiers: [
    {
      id: 'starter',
      name: 'Başlangıç / Pilot',
      tagline: 'Operasyonel süreçlerini dijitalleştirmek isteyen gelişen ekipler için temel orkestrasyon paketi.',
      monthlyPriceTRY: 18500,
      annualMonthlyPriceTRY: 14800,
      isCustomQuote: false,
      targetScale: '15 Saha Kullanıcısı ve 1 Yönetici Paneli',
      userLimit: '15 aktif saha kullanıcısına kadar',
      featureHighlights: [
        'Vektör Dispatch temel rota optimizasyonu (Günlük 300 durak)',
        'Mobil uygulama (iOS & Android) çevrimdışı çalışma desteği',
        'Temel teslimat kanıtı (Fotoğraf & dijital imza)',
        'REST API erişimi (Dakikada 120 istek kotası)',
        'E-posta üzerinden 8x5 teknik destek (4 saat yanıt süresi)'
      ],
      slaGuarantee: '%99.5 Çalışma Süresi (Uptime)',
      supportLevel: 'E-posta & Destek Masası (Hafta içi 09:00 - 18:00)',
      ctaText: '14 Günlük Ücretsiz Deneyin'
    },
    {
      id: 'growth',
      name: 'Büyüme (Growth)',
      badge: 'En Çok Tercih Edilen',
      isPopular: true,
      tagline: 'Bölgesel filolar ve çoklu depo operasyonu yöneten orta ve büyük ölçekli şirketler için.',
      monthlyPriceTRY: 46000,
      annualMonthlyPriceTRY: 36800,
      isCustomQuote: false,
      targetScale: '60 Saha Kullanıcısı ve 5 Yönetici Paneli',
      userLimit: '60 aktif saha kullanıcısına kadar',
      featureHighlights: [
        'Vektör Dispatch gelişmiş rota optimizasyonu (Zaman pencereleri & hacim hesabı)',
        'Vektör Telemetri IoT sensör entegrasyonu (Sıcaklık ve nem takibi)',
        'Vektör SLA Engine (Otomatik eskalasyon kuralları ve SMS bildirimleri)',
        'Logo Tiger / Netsis hazır çift yönlü veri konnektörü',
        'Gelişmiş analitik paneller ve Excel/PDF otomatik dışa aktarım',
        'Öncelikli destek hattı (1 saat kritik olay yanıt süresi)'
      ],
      slaGuarantee: '%99.9 Çalışma Süresi (Uptime)',
      supportLevel: 'Telefon ve Canlı Sohbet (Haftanın 6 günü 08:00 - 20:00)',
      ctaText: 'Büyüme Paketini Başlatın'
    },
    {
      id: 'enterprise',
      name: 'Kurumsal (Enterprise)',
      badge: 'Yüksek Hacimli Filolar İçin',
      tagline: 'Kritik teslimat taahhütleri olan, kurumsal ERP entegrasyonu ve katı SLA arayan kuruluşlar için.',
      monthlyPriceTRY: 115000,
      annualMonthlyPriceTRY: 92000,
      isCustomQuote: false,
      targetScale: '250 Saha Kullanıcısı ve Sınırsız Yönetici Paneli',
      userLimit: '250 aktif kullanıcı (Ek kullanıcı başına esnek birim fiyat)',
      featureHighlights: [
        'Tüm VektörOps modüllerine sınırsız tam erişim',
        'SAP S/4HANA & Oracle NetSuite yerel RFC/BAPI doğrudan entegrasyonu',
        'Dinamik coğrafi çit (Geofence) ve anlık milisaniyelik WebSocket akışı',
        'Özel atanmış Müşteri Başarı Mühendisi (Dedike CSM)',
        'Yıllık 4 defa yerinde operasyonel verimlilik denetimi ve eğitim',
        'KVKK ve ISO 27001 uyumlu şifrelenmiş özel veri tabanı alanı'
      ],
      slaGuarantee: '%99.95 Finansal Taahhütlü Uptime SLA',
      supportLevel: '7/24 Kesintisiz Telefon Desteği & Dedike Slack/Teams Kanalı (15 dk yanıt süresi)',
      ctaText: 'Kurumsal Demo Talep Edin'
    },
    {
      id: 'dedicated-cluster',
      name: 'İzole Küme / Özel Bulut',
      badge: 'On-Premise / Hibrit',
      tagline: 'Kendi özel veri merkezinizde (On-Premise) veya izole AWS/Azure VPC üzerinde tam kontrol.',
      monthlyPriceTRY: null,
      annualMonthlyPriceTRY: null,
      isCustomQuote: true,
      targetScale: 'Sınırsız Kullanıcı ve Özel Donanım Mimarisi',
      userLimit: 'Sınırsız kullanıcı, araç ve bağlı IoT düğümü',
      featureHighlights: [
        'Müşteriye ait özel Kubernetes kümesinde (EKS/AKS/OpenShift) izole kurulum',
        'BDDK ve yasal regülasyonlar için Türkiye içi veri merkezlerinde barındırma garantisi',
        'Kaynak kod seviyesinde güvenlik taraması ve yıllık penetrasyon testi raporları',
        'Özelleştirilmiş makine öğrenimi algoritmaları ve tescilli rota modelleri',
        'Özel felaket kurtarma (Disaster Recovery) ve çift merkezli aktif-aktif yedeklilik',
        'Mühendislik ekibimizle ortak sprint planlaması ve özel özellik geliştirme'
      ],
      slaGuarantee: '%99.99 Görev Kritik Sistem Garantisi',
      supportLevel: '7/24 VIP Mühendislik Seviyesi Müdahale (L3 Desteği doğrudan çekirdek ekipten)',
      ctaText: 'Çözüm Mimarlarımızla Görüşün'
    }
  ],

  // 16 Changelog Entries (Sürüm Güncellemeleri)
  changelog: [
    {
      slug: 'surum-2-8-0',
      version: 'v2.8.0',
      releaseDate: '2026-09-15',
      title: 'Poligon Tabanlı Akıllı Rota Bölme ve Dinamik Trafik Entegrasyonu',
      summary:
        'Büyükşehirlerdeki değişken trafik sıkışıklığını tahmin eden yeni makine öğrenimi tabanlı hız modeli ve çoklu poligon bölge yönetim motoru devreye alındı.',
      categories: ['Özellik', 'Performans', 'API'],
      highlights: [
        'VRP algoritması Rust v1.82 tabanlı yeni matris motoruna taşınarak 1.000 duraklı rota hesaplama süresi 240 ms’den 38 ms’ye indirildi.',
        'İstanbul, Ankara ve İzmir için belediye trafik sensörleri ve canlı telemetri hız profilleri harita katmanına eklendi.',
        'Yeni `/api/v2/dispatch/split-polygon` uç noktası ile tek bir ana bölge gün ortasında otomatik olarak alt kurye alanlarına bölünebiliyor.',
        'Mobil uygulamada kuryelere rota üzerindeki yol çalışması ve kaza ikazları sesli bildirimle iletilmeye başlandı.'
      ],
      breakingChanges: [
        'Eski `/api/v1/routing/calculate` uç noktası bu sürüm itibarıyla kullanımdan kaldırılmıştır; lütfen `/api/v2/dispatch/optimize` uç noktasına geçiş yapınız.'
      ]
    },
    {
      slug: 'surum-2-7-2',
      version: 'v2.7.2',
      releaseDate: '2026-08-28',
      title: 'Kafka Olay Kuyruğu Tüketim İyileştirmesi ve Bellek Optimizasyonu',
      summary:
        'Yüksek yoğunluklu telemetri akışlarında Kafka partition tüketiminde bellek sızıntısını gideren kararlılık güncellemesi.',
      categories: ['İyileştirme', 'Performans'],
      highlights: [
        'Zaman serisi telemetri işlemcisinde Go garbage collection baskısı %45 oranında azaltıldı.',
        'Sıcaklık ve konum verisi işleyen mikroservis düğümlerinde CPU kullanımı tepe saatlerde %30 daha kararlı hale getirildi.',
        'Geciken telemetri paketleri için otomatik Dead Letter Queue (DLQ) izleme paneli geliştirildi.'
      ]
    },
    {
      slug: 'surum-2-7-0',
      version: 'v2.7.0',
      releaseDate: '2026-08-05',
      title: 'Gelişmiş SLA Eskalasyon Matrisi ve WhatsApp Business Bildirimleri',
      summary:
        'Müşterilere teslimat veya teknik servis durumunu bildiren çift yönlü WhatsApp botu ve çok kademeli SLA kuralları eklendi.',
      categories: ['Özellik', 'İyileştirme'],
      highlights: [
        'Meta Cloud API üzerinden resmi WhatsApp Business şablon mesajları entegrasyonu tamamlandı.',
        'Müşteriler WhatsApp üzerinden "Geldik, kapıdayız" mesajına "Güvenliğe bırakın" veya "10 dk sonra evdeyim" yanıtı vererek iş akışını anında güncelleyebiliyor.',
        'Yönetici panelinde SLA tolerans eşikleri artık departman ve müşteri sözleşme tipine göre hiyerarşik olarak tanımlanabiliyor.'
      ]
    },
    {
      slug: 'surum-2-6-4',
      version: 'v2.6.4',
      releaseDate: '2026-07-14',
      title: 'Saha Mobil İstemcisinde SQLite Şifreleme ve Biyometrik Giriş',
      summary:
        'KVKK ve kurumsal bilgi güvenliği standartları doğrultusunda mobil saha uygulamasında yerel veri güvenliği artırıldı.',
      categories: ['Güvenlik', 'İyileştirme'],
      highlights: [
        'Mobil cihazlardaki yerel SQLite veritabanı SQLCipher ile AES-256 seviyesinde şifrelendi.',
        'Cihaz kaybolma veya çalınma durumlarında merkezden uzaktan veri silme (Remote Wipe) komutu etkinleştirildi.',
        'Teknisyen oturum açma süreçlerine Face ID ve parmak izi biyometrik kimlik doğrulaması eklendi.'
      ]
    },
    {
      slug: 'surum-2-6-0',
      version: 'v2.6.0',
      releaseDate: '2026-06-22',
      title: 'SAP S/4HANA Doğrudan OData V4 Konnektörü ve İrsaliye Eşitleme',
      summary:
        'Kurumsal SAP sistemleriyle ara yazılım (middleware) gerekmeksizin çift yönlü konuşabilen resmi OData v4 konnektörü yayınlandı.',
      categories: ['Özellik', 'API'],
      highlights: [
        'SAP S/4HANA Satış Dağıtım (SD) ve Bakım Onarım (PM) modülleri için tam uyumlu iş emri senkronizasyonu sağlandı.',
        'Saha teslimatı tamamlandığı anda Gelir İdaresi Başkanlığı (GİB) formatında e-irsaliye otomatik tetiklenip SAP cari hesabına işleniyor.',
        'Entegrasyon hata logları için görsel geri sarma (Retry & Replay) arayüzü hizmete girdi.'
      ]
    },
    {
      slug: 'surum-2-5-1',
      version: 'v2.5.1',
      releaseDate: '2026-06-02',
      title: 'Harita Görünümünde WebGL Katman Hızlandırması',
      summary:
        '10.000’den fazla aktif aracın aynı anda görüntülendiği operasyon merkezlerinde tarayıcı kasılmalarını önleyen grafik iyileştirmesi.',
      categories: ['Performans', 'İyileştirme'],
      highlights: [
        'Web harita arayüzü Mapbox GL JS v3 motoruna güncellendi ve GPU tabanlı kümeleme devreye alındı.',
        'Operatör ekranlarında saniyede 60 FPS akıcı yakınlaştırma (zoom) ve kaydırma (pan) performansı sağlandı.',
        'Filtreleme paneline "Yalnızca SLA riski taşıyan araçları göster" hızlı butonu eklendi.'
      ]
    },
    {
      slug: 'surum-2-5-0',
      version: 'v2.5.0',
      releaseDate: '2026-05-12',
      title: 'Çoklu Depo Çapraz Sevkiyat (Cross-Docking) Modülü',
      summary:
        'Ürünlerin ana depoya girmeden aktarma merkezlerinde araçtan araca nakledilmesini sağlayan çapraz sevkiyat orkestrasyonu.',
      categories: ['Özellik'],
      highlights: [
        'Büyük kamyonlardan şehir içi dağıtım araçlarına aktarım için rampa ve kapı rezervasyon takvimi geliştirildi.',
        'Palet seviyesinde barkod tarama ile yanlış araca yükleme yapılması durumunda operatör terminaline sesli kırmızı uyarı verildi.',
        'Çapraz sevkiyat bekleyen ürünlerin bekleme süresi 45 dakikanın üzerine çıktığında otomatik ambar sorumlusu uyarısı tanımlandı.'
      ]
    },
    {
      slug: 'surum-2-4-2',
      version: 'v2.4.2',
      releaseDate: '2026-04-20',
      title: 'Düşük Hızlı Ağlarda Çevrimdışı Senkronizasyon İyileştirmesi',
      summary:
        'Kırsal bölgelerde veya bodrum katlardaki 2G/EDGE bağlantılarında mobil form paketlerinin güvenli aktarımı sağlandı.',
      categories: ['İyileştirme', 'Kritik Düzeltme'],
      highlights: [
        'Fotoğraflı teslim kanıtları için istemci tarafında akıllı sıkıştırma (WebP) devralındı; veri boyutu %70 küçültüldü.',
        'Kesintili bağlantılarda bayt seviyesinde devam edebilen (Chunked resumable upload) dosya yükleme protokolü entegre edildi.'
      ]
    },
    {
      slug: 'surum-2-4-0',
      version: 'v2.4.0',
      releaseDate: '2026-03-30',
      title: 'Vektör Karar Motoru: Maliyet-Kırılımı ve Kar Marjı Simülatörü',
      summary:
        'Geçmiş teslimat verilerine dayanarak müşteri bazında servis maliyetini (Cost-to-Serve) hesaplayan analitik modül.',
      categories: ['Özellik', 'Performans'],
      highlights: [
        'Her bir sipariş veya servis ziyareti için yakıt, amortisman, sürücü mesaisi ve bekleme süresi maliyetleri tek tek ayrıştırıldı.',
        'Karsız kalan teslimat rotaları ve aşırı bekleme süresi yaratan müşteri noktaları kırmızı bayrakla işaretlenmeye başlandı.',
        'ClickHouse veri ambarı sorguları paralelleştirilerek 1 yıllık veri raporlama süresi 2.1 saniyeye indirildi.'
      ]
    },
    {
      slug: 'surum-2-3-1',
      version: 'v2.3.1',
      releaseDate: '2026-03-08',
      title: 'Webhook İmzalama ve HMAC-SHA256 Güvenlik Güçlendirmesi',
      summary:
        'Platformdan üçüncü taraf sistemlere giden olay bildirimlerinde veri bütünlüğünü garanti eden kriptografik imzalama standardı.',
      categories: ['Güvenlik', 'API'],
      highlights: [
        'Tüm giden webhook bildirimlerine `X-Vektor-Signature` başlığı altında HMAC-SHA256 imzası eklendi.',
        'Geliştiriciler için webhook doğrulama kod örnekleri (Node.js, Python, Go, C#) dokümantasyona eklendi.',
        'Hatalı yanıt dönen uç noktalar için katlanarak artan yeniden deneme (exponential backoff) mekanizması devreye alındı.'
      ]
    },
    {
      slug: 'surum-2-3-0',
      version: 'v2.3.0',
      releaseDate: '2026-02-14',
      title: 'Bluetooth Düşük Enerji (BLE) Probları ile Kablosuz Sıcaklık İzleme',
      summary:
        'Kablo çekilmesine gerek kalmadan palet ve araç kasalarına yerleştirilen BLE 5.0 sensörlerinden telemetri toplama kabiliyeti.',
      categories: ['Özellik', 'İyileştirme'],
      highlights: [
        'Mobil uygulama üzerinden çevredeki BLE sıcaklık ve nem problarını otomatik tarama ve partiye bağlama özelliği getirildi.',
        'Prob pil seviyesi %15’in altına düştüğünde filo bakım paneline otomatik sensör değişim uyarısı eklendi.',
        'Sensör kalibrasyon geçerlilik tarihlerini takip eden denetim ekranı açıldı.'
      ]
    },
    {
      slug: 'surum-2-2-0',
      version: 'v2.2.0',
      releaseDate: '2026-01-20',
      title: 'Toplu Görev İçe Aktarma Sihirbazı ve Excel Şema Doğrulayıcı',
      summary:
        'Binlerce duraklık günlük sevkiyat listelerini sürükle-bırak yöntemiyle sisteme yüklerken hatalı adresleri anında tespit eden sihirbaz.',
      categories: ['İyileştirme', 'Özellik'],
      highlights: [
        'Excel ve CSV dosyalarında telefon, posta kodu ve adres alanlarını otomatik eşleyen yapay zeka destekli alan tanıma motoru eklendi.',
        'Hatalı veya eksik yazılmış cadde/sokak isimleri harita veri tabanından sorgulanarak yükleme anında operatöre düzeltme önerisi sunuluyor.',
        '10.000 satırlık Excel listesinin işlenme süresi 4 saniyeye indirildi.'
      ]
    },
    {
      slug: 'surum-2-1-2',
      version: 'v2.1.2',
      releaseDate: '2025-12-18',
      title: 'Kullanıcı Rolleri ve Detaylı Yetkilendirme (RBAC) Güncellemesi',
      summary:
        'Bölge yöneticisi, depo sorumlusu, filo koordinatörü ve kurye rolleri için en küçük hak tanımına izin veren yetki matrisi.',
      categories: ['Güvenlik'],
      highlights: [
        'Rol Tabanlı Erişim Kontrolü (RBAC) modülü ile her kullanıcıya sadece kendi yetki bölgesindeki veriyi görme kısıtı getirildi.',
        'Müşteri kişisel verilerinin (ad, soyad, telefon) çağrı merkezi personeli haricindeki operatörlere maskeli gösterimi zorunlu kılındı.',
        'Kritik operasyonel değişiklikler için Yönetici Denetim İzi (Audit Log) kayıtları genişletildi.'
      ]
    },
    {
      slug: 'surum-2-1-0',
      version: 'v2.1.0',
      releaseDate: '2025-11-25',
      title: 'Müşteri Kapıda Cam Üzerine İmza ve Dinamik PDF Belge Oluşturucu',
      summary:
        'Teslimat anında müşteriden alınan dijital imzanın doğrudan resmi sevk irsaliyesi PDF’ine eklenmesi ve e-posta ile gönderilmesi.',
      categories: ['Özellik'],
      highlights: [
        'Mobil ekranda vektörel imza yakalama bileşeni geliştirilerek gecikme hissi sıfıra indirildi.',
        'Teslimat tamamlandığında şirket logosu, teslim saat damgası ve imzanın yer aldığı PDF belgesi arka planda 400 ms içinde üretilip müşteriye postalanıyor.',
        'İmzalanan belgeler yasal saklama süreleri boyunca şifreli nesne depolama (Object Storage) havuzunda arşivleniyor.'
      ]
    },
    {
      slug: 'surum-2-0-0',
      version: 'v2.0.0',
      releaseDate: '2025-10-30',
      title: 'VektörOps 2.0: Yeni Nesil Mikroservis Mimarisi ve Tam API Yenilenmesi',
      summary:
        'Monolitik çekirdeğin yerini alan yüksek ölçeklenebilir Kubernetes mikroservis mimarisi ve OpenAPI 3.1 uyumlu API katmanı.',
      categories: ['Özellik', 'Performans', 'API'],
      highlights: [
        'Sistem çekirdeği gRPC haberleşmeli 14 bağımsız mikroservise bölündü.',
        'Veritabanı katmanı PostgreSQL 16 ve TimescaleDB hibrit kümesine yükseltildi.',
        'Tüm REST API uç noktaları OpenAPI 3.1 standardında belgelendirildi ve etkileşimli Swagger dokümantasyonu yayına alındı.',
        'Yeni web yönetim konsolu modern, ultra hızlı arayüz bileşenleriyle baştan kodlandı.'
      ],
      breakingChanges: [
        'VektörOps v1.x REST API sözleşmeleri tamamen yürürlükten kalkmıştır; v2 uç noktalarına geçiş için geçiş rehberini inceleyiniz.'
      ]
    },
    {
      slug: 'surum-1-9-0',
      version: 'v1.9.0',
      releaseDate: '2025-09-12',
      title: 'Araç Kapasite ve Hacimsel Doluluk (3D Bin-Packing) Hesaplayıcı',
      summary:
        'Kamyon ve van tipi araçların iç hacmine koli boyutlarını (en, boy, yükseklik ve ağırlık) 3 boyutlu yerleştiren ilk optimizasyon sürümü.',
      categories: ['Özellik', 'İyileştirme'],
      highlights: [
        '3 Boyutlu Kutu Yerleştirme (3D Bin-Packing) algoritması ile araç içi boşluk kalması engellendi.',
        'Ağır kolilerin alta, hafif kolilerin üste yerleştirilmesini sağlayan istifleme kuralları tanımlandı.',
        'Depo yükleme personeline kamyona hangi sırayla koli yükleyeceğini gösteren görsel yükleme planı sunuldu.'
      ]
    }
  ],

  // Docs Navigation (Geliştirici Dokümanları Gezintisi)
  docsNavigation: [
    {
      sectionTitle: 'Hızlı Başlangıç',
      sectionSlug: 'hizli-baslangic',
      description: 'VektörOps mimarisine ilk adımlar, API anahtarı üretimi ve ortam yapılandırması.',
      items: [
        {
          slug: 'platform-mimarisi-ve-temel-kavramlar',
          title: 'Platform Mimarisi ve Çekirdek Varlıklar',
          description: 'İş emirleri, düğümler, araçlar ve telemetri veri modelinin genel görünümü.',
          readTime: '6 dk'
        },
        {
          slug: 'api-anahtari-ve-ortam-kurulumu',
          title: 'API Anahtarları ve Yetkilendirme',
          description: 'Bearer token üretimi, rol atamaları ve test (sandbox) ortamı erişimi.',
          readTime: '4 dk',
          badge: 'Gerekli'
        },
        {
          slug: 'ilk-is-emrini-olusturma',
          title: 'İlk İş Emrini Oluşturma (10 Dakikada Entegrasyon)',
          description: 'cURL, Node.js ve Python kod örnekleriyle örnek teslimat emri açma.',
          readTime: '8 dk'
        }
      ]
    },
    {
      sectionTitle: 'Rota ve Sevkiyat API',
      sectionSlug: 'rota-ve-sevkiyat-api',
      description: 'VRP motoru parametreleri, zaman pencereleri ve dinamik durak yönetimi.',
      items: [
        {
          slug: 'vrp-optimizasyon-parametreleri',
          title: 'VRP Optimizasyon Parametreleri Kılavuzu',
          description: 'Hacim, ağırlık, çalışma saati ve trafik kısıtlarının JSON formatında tanımlanması.',
          readTime: '12 dk'
        },
        {
          slug: 'seyir-halinde-dinamik-rota-guncelleme',
          title: 'Seyir Halinde Dinamik Rota Değişikliği',
          description: 'Yoldaki araca ters yönsüz yeni durak ekleme ve ETD hesaplama protokolü.',
          readTime: '9 dk'
        },
        {
          slug: 'poligon-geofence-tetikleyicileri',
          title: 'Poligon ve Dairesel Geofence Yönetimi',
          description: 'Coğrafi sınırlara giriş ve çıkış anında tetiklenen WebSocket olayları.',
          readTime: '7 dk'
        }
      ]
    },
    {
      sectionTitle: 'IoT Telemetri ve Sensörler',
      sectionSlug: 'iot-telemetri',
      description: 'MQTT uç noktaları, BLE sensör protokolleri ve anomali filtreleme kuralları.',
      items: [
        {
          slug: 'mqtt-telemetri-baglantisi',
          title: 'MQTT Broker Bağlantısı ve Veri Formatı',
          description: 'IoT cihazlarından sıcaklık, nem, şok ve konum verisi gönderme standartları.',
          readTime: '10 dk'
        },
        {
          slug: 'esik-degerler-ve-anomali-tanimlama',
          title: 'Eşik Değerler ve Otomatik Alarm Kuralları',
          description: 'Soğuk zincir tolerans aşımında tetiklenen kurumsal eskalasyon zincirleri.',
          readTime: '6 dk'
        }
      ]
    },
    {
      sectionTitle: 'Webhooks ve Olay Odaklı Mimari',
      sectionSlug: 'webhooks',
      description: 'Durum değişimlerini anlık dinleyen güvenli webhook hattı kurulumu.',
      items: [
        {
          slug: 'webhook-yapilandirma-ve-hmac-dogrulama',
          title: 'Webhook Yapılandırması ve HMAC Doğrulama',
          description: 'Gelen paketlerin VektörOps tarafından imzalandığını teyit eden güvenlik adımları.',
          readTime: '8 dk',
          badge: 'Güvenlik'
        },
        {
          slug: 'olay-katalogu-ve-payload-semalari',
          title: 'Tam Olay Kataloğu ve JSON Şemaları',
          description: '`order.dispatched`, `sla.breached`, `sensor.critical` olay tanımları.',
          readTime: '11 dk'
        }
      ]
    },
    {
      sectionTitle: 'Kurumsal ERP Konnektörleri',
      sectionSlug: 'erp-entegrasyonlari',
      description: 'SAP, Oracle NetSuite, Logo Tiger ve Netsis sistemleriyle veri senkronizasyonu.',
      items: [
        {
          slug: 'sap-s4hana-rfc-konfigurasyonu',
          title: 'SAP S/4HANA RFC & OData Entegrasyon Kılavuzu',
          description: 'BAPI çağrıları ile iş emri oluşturma ve e-irsaliye geri besleme mimarisi.',
          readTime: '15 dk'
        },
        {
          slug: 'logo-tiger-netsis-sql-bridge',
          title: 'Logo Tiger ve Netsis Çift Yönlü Köprü Kurulumu',
          description: 'Yerel veritabanı sürücüleri ile güvenli veri pompası yapılandırması.',
          readTime: '10 dk'
        }
      ]
    }
  ]
};

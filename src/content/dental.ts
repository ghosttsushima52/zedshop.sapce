/**
 * Avenox Çoklu Site Vitrini - Özel Diş Kliniği İçerik Modülü
 * Marka: VadiDent Ağız ve Çene Cerrahisi Polikliniği
 * Lokasyon: Vadi İstanbul Bulvarı, Ayazağa / Sarıyer, İstanbul
 */

export interface DentalTreatment {
  slug: string;
  name: string;
  category: 'Cerrahi & İmplantoloji' | 'Estetik Diş Hekimliği' | 'Ortodonti' | 'Endodonti & Restoratif' | 'Periodontoloji' | 'Pedodonti';
  shortDescription: string;
  fullOverview: string;
  indications: string[];
  clinicalProcess: Array<{ step: string; title: string; detail: string }>;
  expectedSessions: string;
  durationPerSession: string;
  anesthesiaType: string;
  recoveryTimeline: string;
  maintenanceTips: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface DentalClinician {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  diplomaRegistrationNo: string;
  education: Array<{ degree: string; university: string; graduationYear: number }>;
  expertiseAreas: string[];
  memberships: string[];
  languages: string[];
  biography: string;
  avatarUrl: string;
  avatarAlt: string;
}

export interface DentalTechnologyItem {
  slug: string;
  name: string;
  category: 'Görüntüleme & Radyoloji' | 'Optik & Büyütme' | 'Dijital Ölçü & CAD/CAM' | 'Lazer & Cerrahi' | 'Sterilizasyon';
  manufacturer: string;
  model: string;
  clinicalAdvantage: string;
  patientBenefit: string;
  safetyStandard: string;
  imageUrl: string;
  imageAlt: string;
}

export interface DentalPatientGuideArticle {
  slug: string;
  title: string;
  category: 'Cerrahi Sonrası Bakım' | 'Ortodonti Rehberi' | 'Koruyucu Hijyen' | 'Klinik Protokolleri' | 'Sigorta & Finans';
  summary: string;
  readTime: string;
  contentParagraphs: string[];
  criticalRules: string[];
  faq: Array<{ question: string; answer: string }>;
}

export interface DentalClinicContent {
  brand: {
    name: string;
    registeredTitle: string;
    tagline: string;
    heroHeadline: string;
    heroSubheadline: string;
    licenseInfo: string;
    workingHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    contact: {
      phone: string;
      emergencyPhone: string;
      whatsapp: string;
      email: string;
      address: string;
      district: string;
      city: string;
    };
    keyStats: Array<{ value: string; label: string; detail: string }>;
  };
  navigation: Array<{ label: string; href: string }>;
  treatments: DentalTreatment[];               // Exact 14 items
  clinicians: DentalClinician[];               // Exact 7 items
  technologies: DentalTechnologyItem[];
  patientGuides: DentalPatientGuideArticle[];
  sterilizationProtocols: Array<{
    phase: string;
    title: string;
    standard: string;
    procedure: string;
  }>;
}

export const dentalClinicData: DentalClinicContent = {
  brand: {
    name: 'VadiDent',
    registeredTitle: 'VadiDent Ağız ve Diş Sağlığı Hizmetleri Ticaret Ltd. Şti.',
    tagline: 'Muayene, tedavi planı ve anlaşılır hasta rehberi',
    heroHeadline: 'Diş sağlığınız için açık bir tedavi planı',
    heroSubheadline:
      'Muayene bulgularını, olası tedavi yollarını ve bakım sürecini hastayla birlikte değerlendiriyoruz.',
    licenseInfo: 'Örnek klinik profili',
    workingHours: {
      weekdays: '09:00 - 19:30',
      saturday: '09:30 - 18:00',
      sunday: 'Pazar günleri acil durum nöbetçi hekim konsültasyonu'
    },
    contact: {
      phone: '+90 (212) 345 88 00',
      emergencyPhone: '+90 (532) 111 88 00',
      whatsapp: '+90 (532) 111 88 00',
      email: 'randevu@vadident.com',
      address: 'Ayazağa Mahallesi, Cendere Caddesi, Vadi İstanbul Bulvar Etabı 2A Blok Kat: 3',
      district: 'Sarıyer',
      city: 'İstanbul'
    },
    keyStats: [
      { value: '14 Tedavi', label: 'Tedavi Rehberi', detail: 'İşlem ve iyileşme süreçleri' },
      { value: 'Dijital', label: 'Planlama', detail: 'Görüntüleme ve kayıt akışı' },
      { value: '7 Hekim', label: 'Ekip Profili', detail: 'Branş ve çalışma alanları' },
      { value: 'Hasta Rehberi', label: 'Bilgilendirme', detail: 'Randevu öncesi ve sonrası notlar' }
    ]
  },

  navigation: [
    { label: 'Kliniğimiz & Felsefemiz', href: '/dental' },
    { label: 'Tedaviler', href: '/dental/tedaviler' },
    { label: 'Hekim Kadromuz', href: '/dental/hekimler' },
    { label: 'Teknoloji & Laboratuvar', href: '/dental/teknoloji' },
    { label: 'Hasta Rehberi', href: '/dental/hasta-rehberi' }
  ],

  // 14 Treatments (Tedaviler)
  treatments: [
    {
      slug: 'all-on-4-ve-all-on-6-implant',
      name: 'All-on-4 ve All-on-6 Sabit İmplant Tedavisi',
      category: 'Cerrahi & İmplantoloji',
      shortDescription:
        'Tam dişsiz çenelerde kemik erimesi olan bölgelere açılı yerleştirilen 4 veya 6 titanyum implant üzerine tek günde geçici sabit diş montajı.',
      fullOverview:
        'İleri derecede kemik kaybı bulunan tam dişsiz hastalarda ileri kemik tozu (greft) işlemlerine duyulan ihtiyacı azaltan bir cerrahi protokoldür. Arka bölgelere 30-45 derece açıyla yerleştirilen implantlar, anatomik boşluklardan (sinüs tabanı ve alt çene siniri) kaçınarak mevcut kemikten maksimum destek alır. Cerrahi ile aynı gün hastaya vidalı geçici sabit protez takılarak çiğneme fonksiyonu ve estetik korunur.',
      indications: [
        'Tüm dişlerini kaybetmiş veya mevcut dişleri ileri periodontal harabiyet nedeniyle çekim endikasyonlu hastalar',
        'Hareketli (damaklı) protez kullanamayan, bulantı refleksi yaşayan bireyler',
        'Arka çene bölgelerinde kemik yetersizliği nedeniyle standart implant yapılamayan olgular'
      ],
      clinicalProcess: [
        { step: '01', title: '3D Tomografi & Sanal Planlama', detail: 'Kemik yoğunluğu ve implant açıları cerrahi yazılımda 3 boyutlu simüle edilir.' },
        { step: '02', title: 'Cerrahi Operasyon & Geçici Protez', detail: 'İmplantlar yerleştirilir ve aynı gün laboratuvarımızda hazırlanan sabit geçici dişler vidalanır.' },
        { step: '03', title: 'Kemik Kaynaması (Osteointegrasyon)', detail: 'Yaklaşık 3 aylık doku iyileşmesi beklenir.' },
        { step: '04', title: 'Daimi Zirkonyum/Hibrit Protez', detail: 'Titanyum altyapılı daimi seramik protez ağza adapte edilir.' }
      ],
      expectedSessions: 'Cerrahi ve geçici diş montajı tek seansta tamamlanır; 3 ay sonra 3 seanslık daimi protez aşaması uygulanır.',
      durationPerSession: 'Cerrahi seans çene başına ortalama 120 - 150 dakika sürer.',
      anesthesiaType: 'Lokal anestezi altında (Talep eden hastalarda sedasyon/genel anestezi eşliğinde).',
      recoveryTimeline: 'İlk 3-5 gün hafif ödem görülebilir; hasta operasyon akşamından itibaren yumuşak gıdalarla beslenebilir.',
      maintenanceTips: [
        'Protez altı özel diş ipi (Superfloss) ve ağız duşu (Waterpik) ile günlük temizlik yapılmalıdır.',
        'Her 6 ayda bir hekim kontrolü ve radyografik implant çevresi kemik seviyesi takibi zorunludur.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Dijital ekranda All-on-4 implant cerrahisi 3 boyutlu planlama görüntüsü'
    },
    {
      slug: 'bilgisayarli-kilavuzlu-cerrahi-guide-implant',
      name: 'Bilgisayarlı Kılavuzlu (Guided) Cerrahi İmplant',
      category: 'Cerrahi & İmplantoloji',
      shortDescription:
        'Kesi ve dikiş gerektirmeyen, 3D tomografi ve dijital tarama verisiyle üretilen cerrahi şablon üzerinden mikrometrik implant uygulaması.',
      fullOverview:
        'Guided cerrahi; hastanın intraoral 3D tarama verileri ile konik ışınlı bilgisayarlı tomografisinin (CBCT) üst üste çakıştırılmasıyla başlar. İmplantın milimetrenin onda biri hassasiyetindeki pozisyonu, kemik içindeki damar ve sinir yolları korunarak belirlenir. 3D yazıcıda üretilen özel cerrahi kılavuz (guide) ağıza oturtulur ve diş eti kesilmeden, dikişsiz biçimde implant yuvası hazırlanır.',
      indications: [
        'Cerrahi sonrası şişlik, kanama ve ağrı istemeyen konfor odaklı hastalar',
        'Kan sulandırıcı ilaç kullanan veya diyabeti kontrol altında olan cerrahi riski hassas bireyler',
        'Komşu diş köklerinin birbirine çok yakın olduğu dar anatomik boşluklar'
      ],
      clinicalProcess: [
        { step: '01', title: 'Dijital İkiz Modellemesi', detail: '3Shape tarayıcı ve CBCT tomografisi bilgisayarda birleştirilir.' },
        { step: '02', title: 'Biyouyumlu Kılavuz Baskısı', detail: 'Tıbbi reçine ile 3D yazıcıda steril cerrahi şablon üretilir.' },
        { step: '03', title: 'Dikişsiz Yerleşim', detail: 'Şablon yuvalarından kılavuzlu frezlerle girilerek implant kemiğe vidalanır.' }
      ],
      expectedSessions: 'Planlama için 1 seans, cerrahi uygulama için 1 seans.',
      durationPerSession: 'İmplant başına cerrahi süre yaklaşık 15 - 20 dakikadır.',
      anesthesiaType: 'Minimal lokal anestezi.',
      recoveryTimeline: 'Kesi ve dikiş olmadığından iyileşme süreci hemen ertesi gün normal hayata dönüş sağlar.',
      maintenanceTips: [
        'Operasyon sonrası ilk 24 saat ılık tuzlu su ile hafif çalkalama tavsiye edilir.',
        'Standart diş fırçalama prosedürüne ertesi gün yumuşak fırçayla devam edilir.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Diş hekimliği ameliyathanesinde cerrahi kılavuz ve implant ekipmanları'
    },
    {
      slug: 'seffaf-plak-ile-telsiz-ortodonti',
      name: 'Şeffaf Plak Tedavisi (Telsiz Ortodonti)',
      category: 'Ortodonti',
      shortDescription:
        'Metal braket ve tel kullanılmadan, kişiye özel bilgisayar simülasyonuyla üretilen şeffaf düzeltici plaklarla diş çapraşıklıklarının giderilmesi.',
      fullOverview:
        'Telsiz ortodonti, hafiften ileri dereceye kadar çapraşıklık, aralıklı diş (diastema) ve kapanış bozukluklarını estetik biçimde düzelten modern bir yaklaşımdır. Ağız içi 3D tarayıcı ile alınan dijital kayıtlar üzerinde dişlerin haftalık hareket adımları sanal olarak modellenir. Hasta, her biri yaklaşık 7-10 gün takılan bir seri şeffaf plağı kullanarak dişlerini hedeflenen ideal hizaya kavuşturur.',
      indications: [
        'Dişlerinde çapraşıklık, dönüklük veya aralık bulunan ergen ve yetişkin hastalar',
        'Sosyal veya mesleki yaşamı nedeniyle metal tel görüntüsü istemeyen bireyler',
        'Daha önce tel tedavisi görmüş ancak nüks (relaps) yaşamış hastalar'
      ],
      clinicalProcess: [
        { step: '01', title: '3D İntraoral Tarama', detail: '3Shape TRIOS tarayıcı ile ağzın 1 dakikada mikron düzeyinde ölçüsü alınır.' },
        { step: '02', title: 'ClinCheck Tedavi Simülasyonu', detail: 'Tedavinin bitiş hali ve plak sayısı hastaya dijital ekranda onaylatılır.' },
        { step: '03', title: 'Plak Teslimi ve Ataşman Uygulaması', detail: 'Dişler üzerine küçük kompozit butonlar yerleştirilerek plak serisi verilir.' },
        { step: '04', title: 'Periyodik 6-8 Haftalık Kontroller', detail: 'Diş hareketlerinin simülasyona uyumu klinikte takip edilir.' }
      ],
      expectedSessions: 'Tedavi süresine göre ortalama 6 - 8 haftada bir kontrol seansı.',
      durationPerSession: 'Kontrol seansları ortalama 20 - 30 dakikadır.',
      anesthesiaType: 'Anestezi gerektirmez (Tamamen ağrısız ve non-invaziv işlem).',
      recoveryTimeline: 'Plakların ilk takıldığı günlerde hafif bir baskı hissi normaldir, 48 saatte alışılır.',
      maintenanceTips: [
        'Plaklar yemek yeme ve diş fırçalama haricinde günde en az 20-22 saat kesintisiz takılmalıdır.',
        'Sıcak içecekler tüketilirken plak çıkarılmalı, plak temizliği ılık su ve özel temizleme tabletleriyle yapılmalıdır.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Kişiye özel üretilmiş şeffaf ortodonti düzeltici plak kutusu'
    },
    {
      slug: 'dijital-gulus-tasarimi-ve-estetik-analiz',
      name: 'Dijital Gülüş Tasarımı ve Estetik Simülasyon',
      category: 'Estetik Diş Hekimliği',
      shortDescription:
        'Yüz hatları, dudak kavsi, ten rengi ve fonetik dinamiklerle uyumlu gülüşün bilgisayar destekli mock-up ile önceden test edilmesi.',
      fullOverview:
        'Gülüş tasarımı, kişiye özel estetik oranların (altın oran) yüz anatomisiyle buluşturulmasıdır. Yüksek çözünürlüklü stüdyo fotoğraf ve video kayıtları alınarak dudak dinamikleri, gülme hattı ve diş eti görünürlüğü analiz edilir. Tedaviye başlamadan önce hastanın ağzına geçici reçinelerle uygulanan mock-up (prova) sayesinde hasta, dişlerine hiçbir işlem yapılmadan nihai sonucu deneyimler.',
      indications: [
        'Gülüşünden estetik olarak memnun olmayan, diş boyutları veya rengi uyumsuz bireyler',
        'Gummy smile (gülerken diş etlerinin aşırı görünmesi) sorunu yaşayanlar',
        'Aşınmış, kırılmış veya düzensiz dizilmiş ön dişlere sahip hastalar'
      ],
      clinicalProcess: [
        { step: '01', title: 'Fotoğraf Stüdyosu & Video Analizi', detail: 'Dinamik mimikler ve konuşma anındaki diş görünümü kayıt altına alınır.' },
        { step: '02', title: '2D & 3D Dijital Tasarım', detail: 'Yüz oranlarına göre diş formları ve gingival seviyeler tasarlanır.' },
        { step: '03', title: 'Mock-Up Ağız İçi Provası', detail: 'Tasarım hastanın ağzına taşınır; ayna karşısında form ve renk değerlendirilir.' },
        { step: '04', title: 'Klinik Tedaviye Geçiş', detail: 'Onaylanan tasarıma göre lamina, zirkonyum veya bonding tedavisi başlatılır.' }
      ],
      expectedSessions: 'Analiz ve mock-up provası 2 seansta tamamlanır.',
      durationPerSession: 'İlk seans fotoğraf ve tarama 45 dk; mock-up provası 40 dk.',
      anesthesiaType: 'Anestezi gerektirmez.',
      recoveryTimeline: 'Provada herhangi bir aşındırma yapılmadığı için iyileşme süreci yoktur.',
      maintenanceTips: [
        'Mock-up provasında çekilen video ve fotoğraflar hasta tarafından incelenerek hekime geri bildirim verilir.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Dijital gülüş tasarımı estetik fotoğraf stüdyosu kayıt aşaması'
    },
    {
      slug: 'porselen-lamina-laminate-veneer',
      name: 'Porselen Lamina (Laminate Veneer)',
      category: 'Estetik Diş Hekimliği',
      shortDescription:
        'Dişin yalnızca ön yüzeyinden 0.3 - 0.7 mm minimal aşındırma ile uygulanan, doğal diş minesi ışık geçirgenliğine sahip lüks seramik yapraklar.',
      fullOverview:
        'Laminate veneerler (yaprak porselen), diş dokusunu azami ölçüde koruyan konservatif bir estetik çözümdür. Feldspatik porselen veya lityum disilikat (e.max) bloklardan mikron düzeyinde frezelenen incecik seramikler, özel rezonans ve adezyon teknikleriyle diş minesiyle kimyasal olarak kaynaştırılır. Çay, kahve veya sigara gibi etkenlerle lekelenmez ve doğal diş minesinin floresansını birebir yansıtır.',
      indications: [
        'Kalıcı renk bozukluğu (tetrasiklin lekeleri, florozis) bulunan ön dişler',
        'Aralıklı (diastemalı) ön diş dizilimi',
        'Kırık, çatlak veya hafif çapraşık ön dişlerin düzeltilmesi'
      ],
      clinicalProcess: [
        { step: '01', title: 'Minimal Preparasyon & Dijital Ölçü', detail: 'Mine düzeyinde mikro aşındırma yapılır ve 3D optik tarama alınır.' },
        { step: '02', title: 'Geçici Lamina Uygulaması', detail: 'Hasta hazırlık sürecinde estetik geçici laminalarla korunur.' },
        { step: '03', title: 'Laboratuvar Üretimi (CAD/CAM)', detail: 'Biyouyumlu porselen yapraklar mikron hassasiyetle fırınlanır.' },
        { step: '04', title: 'Adezyon & Simantasyon', detail: 'Işıkla sertleşen özel rezin simanlarla kalıcı yapıştırma gerçekleştirilir.' }
      ],
      expectedSessions: 'Genellikle 3 seansta (yaklaşık 7-10 günlük bir süreçte) tamamlanır.',
      durationPerSession: 'Preparasyon seansı 90 dk; simantasyon seansı 60-90 dk.',
      anesthesiaType: 'Konfor için lokal anestezi uygulanır.',
      recoveryTimeline: 'Yapıştırma sonrasında ilk 2-3 gün dişlerde hafif sıcak-soğuk hassasiyeti normaldir.',
      maintenanceTips: [
        'Çok sert kabuklu kuruyemişleri ön dişlerle kırmaktan kaçınılmalıdır.',
        'Gece diş sıkma alışkanlığı olan hastaların koruyucu gece plağı takması şarttır.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Diş hekimliği laboratuvarında hazırlanan lüks porselen lamina yaprakları'
    },
    {
      slug: 'zirkonyum-destekli-seramik-kuronlar',
      name: 'Zirkonyum Destekli Seramik Kuron ve Köprüler',
      category: 'Estetik Diş Hekimliği',
      shortDescription:
        'Metal altyapı içermeyen, yüksek çiğneme direncine ve biyouyumlu diş eti kenarına sahip zirkonyum oksit restorasyonlar.',
      fullOverview:
        'Geleneksel metal destekli porselenlerin diş eti sınırında oluşturduğu gri yansımayı ortadan kaldıran modern protez standardıdır. Zirkonyum bloklar, çiğneme kuvvetlerine karşı 1200 MPa’ya varan kırılma direnci sunarken, ışık geçirgenliği sayesinde doğal diş estetiği sağlar. Diş etiyle tam biyouyum göstererek alerjik reaksiyon ve diş eti morarması riskini sıfırlar.',
      indications: [
        'Kanal tedavisi görmüş, aşırı madde kaybı olan arka veya ön dişler',
        'Eski, uyumsuz ve diş eti çekilmesine yol açmış metal destekli kaplamaların yenilenmesi',
        'Kısa diş eksikliklerinde dayanıklı estetik köprü restorasyonları'
      ],
      clinicalProcess: [
        { step: '01', title: 'Diş Hazırlığı ve İntraoral Tarama', detail: 'Eski dolgular temizlenir, kuron formu verilir ve 3D taranır.' },
        { step: '02', title: 'CAD/CAM Tasarım & Sinterleme', detail: 'Monolitik veya porselen tabakalı zirkonyum fırınlanır.' },
        { step: '03', title: 'Uyum & Oklüzyon Kontrolü', detail: 'Çiğneme temasları ve komşu diş ilişkisi milimetrik test edilir.' },
        { step: '04', title: 'Kalıcı Simantasyon', detail: 'Biyouyumlu cam iyonomer veya rezin simanla dişe sabitlenir.' }
      ],
      expectedSessions: '2 veya 3 seans (5-7 günlük laboratuvar süresi).',
      durationPerSession: 'Seans başına 45 - 60 dakika.',
      anesthesiaType: 'Lokal anestezi altında.',
      recoveryTimeline: 'Uygulama sonrası derhal normal fonksiyon ve çiğnemeye başlanabilir.',
      maintenanceTips: [
        'Günde iki kez florürlü macunla fırçalama ve köprü altı temizliği için gövde altı ipleri kullanılmalıdır.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'CAD/CAM frezeleme teknolojisi ile işlenmiş estetik zirkonyum kuron'
    },
    {
      slug: 'mikroskopik-kok-kanal-tedavisi',
      name: 'Mikroskop Destekli Kök Kanal Tedavisi (Endodonti)',
      category: 'Endodonti & Restoratif',
      shortDescription:
        'Dental operasyon mikroskobu altında 25 kata kadar büyütmeyle anatomik kanal varyasyonlarının ve kırık aletlerin tedavisi.',
      fullOverview:
        'Derin çürük veya travma nedeniyle enfekte olmuş diş pulpasının mikroskobik vizyon altında temizlenip sterilize edilmesidir. Çıplak gözle görülmesi imkansız olan ilave mikro kanallar, kalsifiye kanallar ve mikro çatlaklar Carl Zeiss cerrahi mikroskobu altında netleşir. Kök kanalları nikel-titanyum döner eğelerle şekillendirilir, ultrasonik irrigasyonla bakterilerden arındırılır ve biyouyumlu güta-perka ile sızdırmaz şekilde doldurulur.',
      indications: [
        'Şiddetli spontan gece ağrısı veya çiğnemede hassasiyet yaratan akut pulpitis vakaları',
        'Daha önce yapılmış ancak enfeksiyonu tekrarlamış başarısız kanal tedavilerinin yenilenmesi (Retreatment)',
        'Kök ucunda apikal lezyon veya kist oluşmuş dişlerin çekimden kurtarılması'
      ],
      clinicalProcess: [
        { step: '01', title: 'İzolasyon (Rubber Dam)', detail: 'Diş, ağız florasından ve tükürükten tamamen izole edilir.' },
        { step: '02', title: 'Mikroskopik Kanal Girişi', detail: '25x büyütme altında tüm kanal ağızları tespit edilir.' },
        { step: '03', title: '3D Ultrasonik Dezenfeksiyon', detail: 'Özel solüsyonlarla kanal içi kavitasyon yaratılarak sterilize edilir.' },
        { step: '04', title: 'Sıcak Güta-Perka Obturasyonu', detail: 'Kanallar üç boyutlu termal dolgu tekniğiyle kapatılır.' }
      ],
      expectedSessions: 'Enfeksiyonun durumuna göre genellikle tek seansta; apikal lezyonlu vakalarda 2 seansta tamamlanır.',
      durationPerSession: 'Seans başına 60 - 90 dakika.',
      anesthesiaType: 'Ağrısız dijital lokal anestezi.',
      recoveryTimeline: 'Tedavi sonrası 2-3 gün çiğnemede hafif hassasiyet normaldir; ağrı kesiciyle kontrol edilir.',
      maintenanceTips: [
        'Kanal tedavisi görmüş dişlerde madde kaybı fazla olduğundan kırılmayı önlemek için inlay/onlay veya kuron yapılması önerilir.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Carl Zeiss dental operasyon mikroskobu altında kök kanal tedavisi uygulaması'
    },
    {
      slug: 'lazer-destekli-periodontal-tedavi',
      name: 'Lazer Destekli Periodontal Diş Eti Tedavisi',
      category: 'Periodontoloji',
      shortDescription:
        'Diş eti ceplerindeki iltihaplı dokuların Er:YAG ve diyot lazer ile cerrahisiz sterilizasyonu ve diş eti çekilmesi tedavileri.',
      fullOverview:
        'Periodontitis (diş eti iltihabı ve kemik erimesi), dişleri çevreleyen destek dokuların bakteriyel yıkımıdır. Kliniğimizde uygulanan lazer destekli periodontoloji protokolü, cerrahi neşter ve dikiş kullanmadan diş eti cebinin derinliklerindeki anaerobik bakterileri yok eder. Lazer enerjisi, diş taşı temizliği sonrasında granülasyon dokularını seçici olarak buharlaştırırken sağlıklı bağ dokusu ataşmanının yeniden oluşmasını uyarır.',
      indications: [
        'Fırçalamada veya kendiliğinden kanayan, şiş ve morarmış diş etleri',
        'Derinliği 4 mm’yi aşan periodontal cepler ve kemik kaybı başlangıcı',
        'Diş eti çekilmeleri ve kronik ağız kokusu (halitozis) şikayetleri'
      ],
      clinicalProcess: [
        { step: '01', title: 'Periodontal Haritalama', detail: 'Tüm dişlerin cep derinlikleri ve kanama indeksleri kaydedilir.' },
        { step: '02', title: 'Ultrasonik Subgingival Küretaj', detail: 'Diş kök yüzeyindeki sert eklentiler ve biyofilm arındırılır.' },
        { step: '03', title: 'Lazer Destekli Sterilizasyon', detail: 'Er:YAG lazer probu cep içine girerek bakteri yükünü elimine eder.' },
        { step: '04', title: 'Biyostimülasyon & İyileşme', detail: 'Düşük doz lazerle hücresel doku rejenerasyonu tetiklenir.' }
      ],
      expectedSessions: 'Çene sayısına ve cep derinliğine göre 2 - 4 seans.',
      durationPerSession: 'Seans başına 45 - 60 dakika.',
      anesthesiaType: 'Yüzeysel jel anestezi veya minimal lokal anestezi.',
      recoveryTimeline: 'İşlemden hemen sonra günlük hayata dönülür; kanama ve sızı oluşmaz.',
      maintenanceTips: [
        'Günde 1 kez arayüz fırçası ve klorheksidinsiz bitkisel ağız gargarası kullanımı tavsiye edilir.',
        'İlk 1 yıl 3 ayda bir periodontal idame kontrolleri aksatılmamalıdır.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Diş eti tedavilerinde kullanılan modern biyolojik lazer ünitesi'
    },
    {
      slug: 'gomulu-yirmi-yas-disi-cerrahisi',
      name: 'Gömülü 20 Yaş Dişi ve Çene Kisti Cerrahisi',
      category: 'Cerrahi & İmplantoloji',
      shortDescription:
        'Alt çene sinirine yakın, kemik veya diş eti altında yatay gömülü kalmış üçüncü azı dişlerinin 3D tomografi eşliğinde atravmatik çekimi.',
      fullOverview:
        'Çene kemiğinde yer darlığı nedeniyle çıkamayan yirmi yaş dişleri komşu dişin kökünü eritebilir, kist oluşturabilir veya tekrarlayan enfeksiyonlara (perikoronitis) neden olabilir. Kliniğimizde, 3D CBCT tomografi ile diş kökünün n. alveolaris inferior siniriyle olan üç boyutlu ilişkisi incelenir. Piezo cerrahi (ultrasonik kemik kesici) cihazı sayesinde yumuşak dokular ve sinir lifleri korunarak atravmatik kemik penceresi açılır ve diş parçalanarak güvenle çıkarılır.',
      indications: [
        'Tekrarlayan diş eti iltihabı, trismus (çene açmada kısıtlılık) ve yüzde şişlik',
        'Ortodontik tedavi öncesinde diş diziliminin korunması amacıyla planlanan çekimler',
        'Radyografide komşu dişte çürük veya kök rezorpsiyonu başlatan yatay gömülü dişler'
      ],
      clinicalProcess: [
        { step: '01', title: '3D Sinir Mesafesi Tespiti', detail: 'Tomografi ile sinir kanalı ve kök anatomisi mikron düzeyinde ölçülür.' },
        { step: '02', title: 'Piezoelektrik Cerrahi', detail: 'Ultrasonik titreşimlerle kemik kaldırılır; sinir dokusu korunur.' },
        { step: '03', title: 'Atravmatik Ekstraksiyon', detail: 'Diş minimal travma ile parçalar halinde çıkarılır.' },
        { step: '04', title: 'Dikiş & L-PRF Membran', detail: 'İyileşmeyi hızlandırmak için hastanın kendi kanından hazırlanan PRF fibrin yerleştirilir.' }
      ],
      expectedSessions: 'Cerrahi çekim tek seansta tamamlanır; 7 gün sonra dikiş kontrolü yapılır.',
      durationPerSession: 'Dişin anatomik derinliğine göre 25 - 45 dakika.',
      anesthesiaType: 'Lokal anestezi (İsteğe bağlı konforlu sedasyon eşliğinde).',
      recoveryTimeline: 'İlk 48 saat şişlik zirve yapar, 3. günden itibaren hızla geriler; 5-7 günde doku kapanır.',
      maintenanceTips: [
        'İlk 24 saat kesinlikle tükürme, çalkalama ve pipet kullanımı yapılmamalıdır.',
        'İlk 48 saat dışarıdan 15 dk aralıklarla buz kompresi uygulanmalıdır.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Ağız ve çene cerrahisi operasyon odası ve piezo cerrahi cihazı'
    },
    {
      slug: 'kemik-ogmentasyonu-ve-sinus-lifting',
      name: 'Kemik Ogmentasyonu (Greftleme) ve Sinüs Lifting',
      category: 'Cerrahi & İmplantoloji',
      shortDescription:
        'Yetersiz kemik yüksekliği ve kalınlığı bulunan çenelerde implant yapabilmek için biyouyumlu kemik tozu ve sinüs tabanı yükseltme operasyonları.',
      fullOverview:
        'Üst çene arka bölgede diş çekimi sonrası sarkan maksiller sinüs boşluğu veya uzun süreli dişsizlik sonucu eriyen çene kemiği, implant yerleşimini imkansız kılabilir. Açık veya kapalı sinüs lifting teknikleriyle sinüs membranı (Schneider membranı) delinmeden yukarı kaldırılır ve altına biyouyumlu otolog/sentetik kemik grefti yerleştirilir. Bu sayede implant için gerekli sağlam kemik hacmi yeniden inşa edilir.',
      indications: [
        'Üst çenede sinüs sarkması nedeniyle 4 mm’den az kemik yüksekliği kalan hastalar',
        'Travma veya kist operasyonu sonrası çene kemiğinde derin hacim kaybı olan olgular',
        'İmplant çevresinde kemik duvarının yetersiz olduğu durumlar'
      ],
      clinicalProcess: [
        { step: '01', title: 'Maksiller Sinüs Morfoloji Analizi', detail: '3D tomografi ile sinir anatomisi ve sinüs patolojileri incelenir.' },
        { step: '02', title: 'Ultrasonik Pencere Açılması', detail: 'Piezo cerrahi ucuyla kemik penceresi nazikçe açılır.' },
        { step: '03', title: 'Membran Elevasyonu & Greftleme', detail: 'Sinüs zarı kaldırılır, biyouyumlu kemik grefti ve kolajen membran doldurulur.' },
        { step: '04', title: 'Kemikleşme Takibi', detail: 'Yeni kemik oluşumu için 4 - 6 ay osteogenez beklenir.' }
      ],
      expectedSessions: 'Cerrahi işlem 1 seans; 6 ay sonra implant aşamasına geçilir.',
      durationPerSession: 'Tek taraflı sinüs lifting yaklaşık 60 - 75 dakika sürer.',
      anesthesiaType: 'Lokal anestezi veya intravenöz sedasyon.',
      recoveryTimeline: 'İlk 1 hafta burun sümkürmekten ve basınç yaratmaktan kaçınılmalıdır.',
      maintenanceTips: [
        'Operasyon sonrası hekim tarafından reçete edilen burun açıcı damlalar ve antibiyotik aksatılmamalıdır.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1579684385136-1e6467364b63?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Kemik ogmentasyonu ve cerrahi greftleme materyalleri kiti'
    },
    {
      slug: 'estetik-kompozit-bonding-ve-diastema-onarimi',
      name: 'Biyouyumlu Kompozit Bonding ve Diastema Onarımı',
      category: 'Endodonti & Restoratif',
      shortDescription:
        'Diş dokusundan hiçbir aşındırma yapmadan, nano-hibrit estetik kompozit reçinelerle tek seansta kırık ve aralık onarımı.',
      fullOverview:
        'Bonding yöntemi, diş minesine zarar vermeden gülüşü dönüştüren en koruyucu mikro-estetik uygulamadır. Ön dişler arasındaki boşluklar (diastema), küçük çapraşıklıklar veya travma sonucu kırılmış diş kenarları; dişe tabaka tabaka uygulanan nano-seramik dolduruculu kompozitlerle anatomik olarak yeniden şekillendirilir. Çok kademeli polisaj diskleriyle doğal diş minesinin parlaklığı elde edilir.',
      indications: [
        'Ön kesici dişler arasındaki ayrıklıkların kapatılması',
        'Kaza veya sert cisim ısırma sonucu kırılmış diş uçlarının rekonstrüksiyonu',
        'Diş boylarının minimal düzeyde uzatılması ve simetrinin sağlanması'
      ],
      clinicalProcess: [
        { step: '01', title: 'Renk Tabakalandırma Seçimi', detail: 'Mine ve dentin opaklıklarına göre çok tonlu kompozit rengi belirlenir.' },
        { step: '02', title: 'Asitleme & Adeziv Bağlama', detail: 'Mine yüzeyine mikro-pürüzlendirme yapılarak bağlayıcı ajan sürülür.' },
        { step: '03', title: 'Anatomik Heykeltıraşlık', detail: 'Kompozit reçine el aletleriyle tabakalar halinde dişe işlenir ve polimerize edilir.' },
        { step: '04', title: 'Yüksek Parlatmalı Polisaj', detail: 'Spiral elmas disklerle ayna parlaklığında yüzey bitimi yapılır.' }
      ],
      expectedSessions: 'Genellikle tek seansta (aynı gün) tamamlanır.',
      durationPerSession: 'Diş başına yaklaşık 30 - 45 dakika.',
      anesthesiaType: 'Diş aşındırılmadığı için çoğunlukla anesteziye dahi ihtiyaç duyulmaz.',
      recoveryTimeline: 'İşlem bittiği andan itibaren yemek yenebilir ve konuşulabilir.',
      maintenanceTips: [
        'İlk 48 saat çay, kahve, vişne suyu ve tütün gibi renklendiricilerden uzak durulmalıdır.',
        'Yılda 1 kez hekim kontrolünde bonding polisaj yenilemesi parlaklığı korur.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Estetik kompozit bonding uygulaması için kullanılan nano-hibrit restoratif materyal'
    },
    {
      slug: 'ofis-tipi-soguk-isik-dis-beyazlatma',
      name: 'Ofis Tipi Güvenli Soğuk Işık Diş Beyazlatma (Bleaching)',
      category: 'Estetik Diş Hekimliği',
      shortDescription:
        'Diş minesine zarar vermeyen, diş etleri özel bariyerle korunan profesyonel LED/Lazer aktivasyonlu 3-4 ton beyazlatma.',
      fullOverview:
        'Klinik ortamında diş hekimi gözetiminde uygulanan güvenli ve kalıcı beyazlatma sistemidir. Diş etleri ışıkla sertleşen koruyucu bir baraj ile tamamen örtülür. Diş minesi yüzeyine uygulanan medikal hidrojen peroksit jeli, soğuk mavi LED ışık kaynağıyla aktive edilir. Mine prizmaları arasına nüfuz eden oksijen radikalleri, yıllar içinde birikmiş çay, kahve ve sigara pigmentlerini parçalayarak dişin doğal beyazlığını açığa çıkarır.',
      indications: [
        'Yaşa, beslenme alışkanlıklarına veya genetiğe bağlı sararmış dişler',
        'Önemli bir etkinlik, düğün veya mezuniyet öncesi hızlı estetik sonuç arayanlar',
        'Ev tipi beyazlatma plaklarıyla zaman kaybetmek istemeyen hastalar'
      ],
      clinicalProcess: [
        { step: '01', title: 'Diş Taşı Temizliği & Polisaj', detail: 'Beyazlatma jelinin minye tam teması için diş yüzeyi temizlenir.' },
        { step: '02', title: 'Diş Eti İzolasyonu', detail: 'Yumuşak dokular likit barajla titizlikle kapatılır.' },
        { step: '03', title: '15’er Dakikalık 3 Jel Döngüsü', detail: 'Jel sürülür ve soğuk LED ışık altında aktifleşmesi sağlanır.' },
        { step: '04', title: 'Hassasiyet Giderici Bakım', detail: 'Mineyi remineralize eden kalsiyum fosfat içerikli jel uygulanır.' }
      ],
      expectedSessions: 'Tek seansta tamamlanır.',
      durationPerSession: 'Toplam klinik süresi yaklaşık 60 dakikadır.',
      anesthesiaType: 'Anestezi gerektirmez.',
      recoveryTimeline: 'İşlem sonrası ilk 24 saat hafif sızlama hissi görülebilir; remineralizasyonla geçer.',
      maintenanceTips: [
        'İşlemi takip eden 72 saat boyunca kesinlikle renklendirici (kırmızı şarap, kahve, salça, köri) tüketilmemelidir ("Beyaz Diyet").'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Klinik ortamında profesyonel LED soğuk ışık diş beyazlatma cihazı'
    },
    {
      slug: 'cene-eklemi-tme-ve-bruksizm-tedavisi',
      name: 'Çene Eklemi (TME) ve Diş Sıkma (Bruksizm) Tedavisi',
      category: 'Cerrahi & İmplantoloji',
      shortDescription:
        'Gece diş sıkma, çene ekleminden ses gelmesi ve sabah baş ağrılarına karşı Michigan tipi sert gece plağı ve masseter botulinum protokolü.',
      fullOverview:
        'Temporomandibuler eklem (TME) rahatsızlıkları ve bruksizm; diş aşınmalarına, eklem kıkırdağında disk kaymasına ve kronik yüz-boyun ağrılarına yol açar. Tedavide; çiğneme kaslarındaki aşırı spazmı gevşetmek için masseter ve temporal kaslara hekim kontrolünde nörotoksin enjeksiyonu uygulanır ve hastanın alt/üst çene kapanışını nötrleyen bilgisayar tasarımlı sert stabilizasyon splinti (gece plağı) teslim edilir.',
      indications: [
        'Sabahları uyanıldığında çene ekleminde, şakaklarda ve boyunda şiddetli ağrı',
        'Ağız açıp kapatırken çene ekleminden klik, tıkırtı veya sürtünme sesi gelmesi',
        'Dişlerin kesici kenarlarında aşınma, çatlaklar ve diş boylarında kısalma'
      ],
      clinicalProcess: [
        { step: '01', title: 'Eklem Palpasyonu ve Çiğneme Analizi', detail: 'Kas hassasiyetleri ve eklem hareket açıklığı ölçülür.' },
        { step: '02', title: 'İntraoral Tarama & Splint Tasarımı', detail: 'Diş sıkmayı engelleyen oklüzal koruyucu sert plak üretilir.' },
        { step: '03', title: 'Kas İçi Rahatlatma Uygulaması', detail: 'Masseter kasının hipertrofik bölgelerine mikro-enjeksiyon yapılır.' },
        { step: '04', title: '1. ve 3. Ay Takip Seansları', detail: 'Eklem sesleri ve gece plağının oklüzyon aşınmaları kontrol edilir.' }
      ],
      expectedSessions: 'Muayene ve plak teslimi için 2 seans; 6 ayda bir kontrol.',
      durationPerSession: 'İlk muayene 45 dk; plak teslimi 30 dk.',
      anesthesiaType: 'Anestezi gerektirmez.',
      recoveryTimeline: 'Kas içi enjeksiyonun etkisi 7-14 günde oturur; çene kaslarında belirgin gevşeme hissedilir.',
      maintenanceTips: [
        'Gece plağı her gece düzenli takılmalı, sert kabuklu gıdaları tek tarafla çiğneme alışkanlığı bırakılmalıdır.',
        'Gündüz stres anında dişlerin temas etmediğinden emin olunmalıdır ("Dudaklar kapalı, dişler ayrı").'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Çene eklemi oklüzyon kontrolü ve sert stabilizasyon gece plağı'
    },
    {
      slug: 'pedodonti-ve-koruyucu-cocuk-dis-hekimligi',
      name: 'Pedodonti ve Koruyucu Çocuk Diş Hekimliği',
      category: 'Pedodonti',
      shortDescription:
        '0-13 yaş grubu çocuklarda dental fobi oluşturmadan fissür örtücü, flor verniği, süt dişi kanal tedavisi ve yer tutucu uygulamaları.',
      fullOverview:
        'Süt dişleri sadece çiğneme için değil, altından gelecek daimi dişlere rehberlik etmek için hayati öneme sahiptir. Çocuk diş hekimliği (pedodonti) uzmanlarımız; çocukların kliniğe güvenle adım atmasını sağlayan davranış yönlendirme teknikleri uygular. Azı dişlerinin derin oluklarına uygulanan fissür örtücüler ve diş minesini asitlere karşı zırh gibi koruyan flor vernikleriyle çürük oluşumu başlamadan engellenir.',
      indications: [
        'İlk süt dişinin sürmesinden itibaren 6 ayda bir rutin koruyucu kontroller',
        'Biberon çürüğü veya travma sonucu kırılan süt dişlerinin tedavisi',
        'Erken kaybedilen süt dişlerinin ardından komşu dişlerin boşluğa devrilmesini önlemek'
      ],
      clinicalProcess: [
        { step: '01', title: 'Tanışma ve Oyun Odası Alışması', detail: 'Çocuğa aletler eğlenceli dille tanıtılır, güven bağı kurulur.' },
        { step: '02', title: 'Diş Çürük Risk Skoru Belirleme', detail: 'Beslenme ve ağız florası analiziyle risk haritası çıkarılır.' },
        { step: '03', title: 'Fissür Örtücü & Flor Uygulaması', detail: 'Çürüğe yatkın derin girintiler akıcı kompozit koruyucu ile kapatılır.' },
        { step: '04', title: 'Gerekiyorsa Sabit Yer Tutucu', detail: 'Erken çekilen süt dişinin yeri daimi diş gelene dek korunur.' }
      ],
      expectedSessions: 'Koruyucu seans tek randevuda; çoklu tedavilerde kısa süreli seanslar planlanır.',
      durationPerSession: 'Çocuğun dikkat süresini aşmayacak şekilde seanslar 20 - 30 dakika ile sınırlandırılır.',
      anesthesiaType: 'Gerekirse meyve aromalı uyuşturucu spreyler ve ağrısız bilgisayarlı anestezi.',
      recoveryTimeline: 'İşlem sonrası çocuk hemen normal oyun ve beslenme düzenine dönebilir.',
      maintenanceTips: [
        'Ebeveyn kontrolünde günde 2 kez yaşa uygun florürlü diş macunu ile fırçalama yapılmalıdır.',
        'Şekerli ve yapışkan atıştırmalıkların ardından mutlaka su içirilmelidir.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Çocuk diş hekimliği kliniğinde güven verici muayene ortamı'
    }
  ],

  // 7 Clinicians (Hekimler)
  clinicians: [
    {
      slug: 'doc-dr-selen-akinci',
      name: 'Doç. Dr. Selen Akıncı',
      title: 'Kurucu Hekim & Çene Cerrahisi Uzmanı',
      specialty: 'Ağız, Diş ve Çene Cerrahisi',
      diplomaRegistrationNo: '34-D-18940',
      education: [
        { degree: 'Diş Hekimliği Lisansı', university: 'İstanbul Üniversitesi Diş Hekimliği Fakültesi (Çapa)', graduationYear: 2004 },
        { degree: 'Doktora & Uzmanlık (Ağız ve Çene Cerrahisi)', university: 'Hacettepe Üniversitesi', graduationYear: 2010 },
        { degree: 'Doçentlik Unvanı', university: 'Üniversitelerarası Kurul (ÜAK)', graduationYear: 2018 }
      ],
      expertiseAreas: [
        'İleri İmplantoloji (All-on-4 / All-on-6)',
        'Bilgisayar Kılavuzlu (Guided) Cerrahi',
        'Sinüs Lifting ve Çene Kemiği Rekonstrüksiyonu',
        'Gömülü 20 Yaş ve Çene Kisti Cerrahisi'
      ],
      memberships: [
        'Türk Dişhekimleri Birliği (TDB)',
        'Türk Oral ve Maksillofasiyal Cerrahi Derneği (TAOMS)',
        'International Team for Implantology (ITI)',
        'European Association for Osseointegration (EAO)'
      ],
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
      biography:
        'Doç. Dr. Selen Akıncı, yirmi yılı aşkın klinik ve cerrahi birikimiyle çene kemiği ogmentasyonları, sinüs cerrahileri ve kılavuzlu implant sistemlerinde Türkiye’nin saygın cerrahları arasında yer almaktadır. Uluslararası indeksli dergilerde (SCI/SCI-E) yayımlanmış 28 bilimsel makalesi bulunmaktadır. Kliniğimizde cerrahi departman başkanlığını yürütmektedir.',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813576-92c23507cf27?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Doç. Dr. Selen Akıncı, Ağız ve Çene Cerrahisi Uzmanı portresi'
    },
    {
      slug: 'uzm-dt-baris-teoman',
      name: 'Uzm. Dt. Barış Teoman',
      title: 'Protetik Diş Tedavisi Uzmanı',
      specialty: 'Protez & Gülüş Estetiği',
      diplomaRegistrationNo: '34-D-21440',
      education: [
        { degree: 'Diş Hekimliği Lisansı', university: 'Marmara Üniversitesi Diş Hekimliği Fakültesi (İngilizce)', graduationYear: 2008 },
        { degree: 'Uzmanlık Eğitimi (Protetik Diş Tedavisi)', university: 'Ege Üniversitesi', graduationYear: 2013 }
      ],
      expertiseAreas: [
        'Porselen Lamina (Laminate Veneer)',
        'Zirkonyum ve Monolitik e.max Restorasyonlar',
        'Dijital Gülüş Tasarımı ve CAD/CAM Laboratuvar İş Akışı',
        'İmplant Üstü Sabit Hibrit Protezler'
      ],
      memberships: [
        'Türk Protetik Diş Tedavisi ve İmplantoloji Derneği (TPİD)',
        'European Prosthodontic Association (EPA)',
        'Estetik Diş Hekimliği Akademisi Derneği (EDAD)'
      ],
      languages: ['Türkçe', 'İngilizce'],
      biography:
        'Uzm. Dt. Barış Teoman, diş dokusuna saygılı minimal invaziv preparasyon teknikleri ve doğal estetiğin yeniden inşası konularında uzmanlaşmıştır. Dijital fotoğraf analizi ve 3D intraoral tarayıcıların protez üretimindeki entegrasyonu üzerine çalışmaktadır. Kliniğimizin estetik tasarım ve protez laboratuvar koordinasyonunu idare eder.',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Uzm. Dt. Barış Teoman, Protetik Diş Tedavisi Uzmanı portresi'
    },
    {
      slug: 'dr-dt-melisa-cakir',
      name: 'Dr. Dt. Melisa Çakır',
      title: 'Ortodonti Uzmanı',
      specialty: 'Ortodonti ve Yüz Ortopedisi',
      diplomaRegistrationNo: '34-D-26118',
      education: [
        { degree: 'Diş Hekimliği Lisansı', university: 'Ankara Üniversitesi Diş Hekimliği Fakültesi', graduationYear: 2012 },
        { degree: 'Doktora (Ortodonti Anabilim Dalı)', university: 'Yeditepe Üniversitesi', graduationYear: 2017 }
      ],
      expertiseAreas: [
        'Şeffaf Plak Tedavileri (Telsiz Ortodonti)',
        'Yetişkin ve Ergen Ortodontisi',
        'Ortognatik Cerrahi Hazırlık Ortodontisi',
        'Çene Darlığı ve İskeletsel Gelişim Yönlendirmesi'
      ],
      memberships: [
        'Türk Ortodonti Derneği (TOD)',
        'European Orthodontic Society (EOS)',
        'American Association of Orthodontists (AAO)'
      ],
      languages: ['Türkçe', 'İngilizce', 'İtalyanca'],
      biography:
        'Dr. Dt. Melisa Çakır, şeffaf plak sistemleri (Clear Aligner) alanında elmas (Diamond) seviyesinde vaka tecrübesine sahiptir. Dijital simülasyonların biyomekanik doğruluğu ve diş hareketi sırasında kök-kemik sınırlarının korunması konularında yoğunlaşmıştır. Çocuklarda erken dönem yüz ortopedisi tedavilerini de yürütmektedir.',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Dr. Dt. Melisa Çakır, Ortodonti Uzmanı portresi'
    },
    {
      slug: 'uzm-dt-kerem-canbulat',
      name: 'Uzm. Dt. Kerem Canbulat',
      title: 'Endodonti Uzmanı',
      specialty: 'Mikroskopik Kanal Tedavisi',
      diplomaRegistrationNo: '34-D-28770',
      education: [
        { degree: 'Diş Hekimliği Lisansı', university: 'Hacettepe Üniversitesi Diş Hekimliği Fakültesi', graduationYear: 2014 },
        { degree: 'Uzmanlık Eğitimi (Endodonti)', university: 'İstanbul Üniversitesi', graduationYear: 2018 }
      ],
      expertiseAreas: [
        'Dental Operasyon Mikroskobu Altında Kanal Tedavisi',
        'Kanal İçi Kırık Alet Çıkarılması ve Perforasyon Onarımları',
        'Tekrarlayan Enfeksiyonlu Dişlerde Retreatment',
        'Rejeneratif Endodontik Tedaviler'
      ],
      memberships: [
        'Türk Endodonti Derneği (TED)',
        'European Society of Endodontology (ESE)'
      ],
      languages: ['Türkçe', 'İngilizce'],
      biography:
        'Uzm. Dt. Kerem Canbulat, "kendi doğal dişini ömür boyu koruma" felsefesiyle mikro-endodonti alanında çalışmaktadır. İleri apikal cerrahiler ve karmaşık anatomili kök kanallarının 25x optik büyütme altında temizlenmesi konusunda yüksek başarı oranlarına sahiptir.',
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Uzm. Dt. Kerem Canbulat, Endodonti Uzmanı portresi'
    },
    {
      slug: 'uzm-dt-hande-yurdakul',
      name: 'Uzm. Dt. Hande Yurdakul',
      title: 'Periodontoloji Uzmanı',
      specialty: 'Diş Eti Hastalıkları ve Cerrahisi',
      diplomaRegistrationNo: '34-D-30120',
      education: [
        { degree: 'Diş Hekimliği Lisansı', university: 'Gazi Üniversitesi Diş Hekimliği Fakültesi', graduationYear: 2015 },
        { degree: 'Uzmanlık Eğitimi (Periodontoloji)', university: 'Marmara Üniversitesi', graduationYear: 2019 }
      ],
      expertiseAreas: [
        'Lazer Destekli Periodontal Tedaviler',
        'Diş Eti Çekilmesi ve Bağ Dokusu Greftleri',
        'Gummy Smile Düzeltme (Gingivektomi & Pembe Estetik)',
        'Peri-implantitis (İmplant Çevresi İltihap) Cerrahisi'
      ],
      memberships: [
        'Türk Periodontoloji Derneği (TPD)',
        'European Federation of Periodontology (EFP)'
      ],
      languages: ['Türkçe', 'İngilizce'],
      biography:
        'Uzm. Dt. Hande Yurdakul, diş eti sağlığının tüm protetik ve estetik tedavilerin sağlam temeli olduğuna inanmaktadır. Sert ve yumuşak doku lazerleri eşliğinde kansız ve dikişsiz diş eti şekillendirmeleri gerçekleştirmekte, biyolojik genişlik ve pembe estetik uyumunu sağlamaktadır.',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813576-92c23507cf27?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Uzm. Dt. Hande Yurdakul, Periodontoloji Uzmanı portresi'
    },
    {
      slug: 'dt-eren-savasci',
      name: 'Dt. Eren Savaşçı',
      title: 'Restoratif ve Estetik Diş Hekimi',
      specialty: 'Restoratif Diş Tedavisi & Biyomimikri',
      diplomaRegistrationNo: '34-D-32890',
      education: [
        { degree: 'Diş Hekimliği Lisansı', university: 'İstanbul Üniversitesi Diş Hekimliği Fakültesi (Çapa)', graduationYear: 2017 }
      ],
      expertiseAreas: [
        'Biyouyumlu Kompozit Bonding & Diastema Kapatma',
        'Inlay / Onlay Porselen Dolgular',
        'Ofis Tipi ve Kombine Diş Beyazlatma Protokolleri',
        'Çürük Önleyici Koruyucu Restorasyonlar'
      ],
      memberships: [
        'Estetik Diş Hekimliği Akademisi Derneği (EDAD)',
        'Restoratif Dişhekimliği Derneği (RDD)'
      ],
      languages: ['Türkçe', 'İngilizce'],
      biography:
        'Dt. Eren Savaşçı, biyomimetik diş hekimliği prensiplerini benimseyerek dişi gereksiz kesimlerden koruyan kompozit tabakalama ve mikromekanik yapıştırma yöntemlerinde çalışmaktadır. Estetik bonding vakalarında renk ve morfoloji uyumunu sanatsal bir titizlikle kurgulamaktadır.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Dt. Eren Savaşçı, Restoratif ve Estetik Diş Hekimi portresi'
    },
    {
      slug: 'dr-dt-duygu-peksen',
      name: 'Dr. Dt. Duygu Pekşen',
      title: 'Pedodonti Uzmanı',
      specialty: 'Çocuk Diş Hekimliği',
      diplomaRegistrationNo: '34-D-27510',
      education: [
        { degree: 'Diş Hekimliği Lisansı', university: 'Ege Üniversitesi Diş Hekimliği Fakültesi', graduationYear: 2013 },
        { degree: 'Doktora (Pedodonti Anabilim Dalı)', university: 'Hacettepe Üniversitesi', graduationYear: 2018 }
      ],
      expertiseAreas: [
        'Erken Çocukluk Çürükleri ve Biberon Çürüğü Tedavisi',
        'Fissür Örtücü ve Topikal Flor Uygulamaları',
        'Çocuklarda Dental Travma Yönetimi',
        'Yer Tutucular ve Alışkanlık Kırıcı Apareyler'
      ],
      memberships: [
        'Türk Pedodonti Derneği (TPD)',
        'International Association of Paediatric Dentistry (IAPD)'
      ],
      languages: ['Türkçe', 'İngilizce'],
      biography:
        'Dr. Dt. Duygu Pekşen, çocukların diş hekimi korkusunu yenmelerini sağlayan sıcak ve şefkatli yaklaşımıyla tanınır. Çocukların diş sağlığını oyunlaştırılmış seanslarla korumakta, ebeveynlere koruyucu ağız alışkanlıkları ve beslenme rehberliği sunmaktadır.',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Dr. Dt. Duygu Pekşen, Pedodonti Uzmanı portresi'
    }
  ],

  // Technology Content (Klinik Teknolojisi)
  technologies: [
    {
      slug: 'planmeca-promax-3d-cbct',
      name: 'Planmeca ProMax 3D Dental Tomografi (CBCT)',
      category: 'Görüntüleme & Radyoloji',
      manufacturer: 'Planmeca Oy',
      model: 'ProMax 3D Classic Ultra Low Dose',
      clinicalAdvantage:
        'Alt çene siniri, maksiller sinüs ve kemik trabekülasyonunu 75 mikrometre voksel çözünürlüğünde 3 boyutlu haritalandırır.',
      patientBenefit:
        'Ultra Düşük Doz (ULD) protokolü sayesinde standart panoramik röntgenden farksız minimal radyasyonla maksimum teşhis güvenliği.',
      safetyStandard: 'EURATOM Radyasyon Güvenliği ve T.C. Nükleer Düzenleme Kurumu (NDK) Lisanslı',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Kliniğimizin radyoloji odasında yer alan Planmeca 3D dijital diş tomografisi cihazı'
    },
    {
      slug: 'carl-zeiss-opmi-proergo-mikroskop',
      name: 'Carl Zeiss OPMI PROergo Dental Operasyon Mikroskobu',
      category: 'Optik & Büyütme',
      manufacturer: 'Carl Zeiss Meditec AG',
      model: 'OPMI PROergo Cerrahi Optik Platformu',
      clinicalAdvantage:
        '25 kata kadar optik büyütme ve koaksiyel gölgesiz xenon aydınlatma ile kanal içi mikro anatomiyi gözler önüne serer.',
      patientBenefit:
        'Hatalı veya eksik kanal kalma ihtimalini ortadan kaldırarak dişi çekimden kurtarır; cerrahi kesileri milimetrik tutar.',
      safetyStandard: 'Alman Tıbbi Cihaz Standardı (DIN EN ISO 13485)',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Kök kanal tedavisi ve mikro cerrahide kullanılan Carl Zeiss dental operasyon mikroskobu'
    },
    {
      slug: '3shape-trios-5-intraoral-tarayici',
      name: '3Shape TRIOS 5 Kablosuz 3D Dijital Tarayıcı',
      category: 'Dijital Ölçü & CAD/CAM',
      manufacturer: '3Shape A/S',
      model: 'TRIOS 5 Wireless',
      clinicalAdvantage:
        'Geleneksel macunlu kaşık ölçülerinin yarattığı boyutsal çekme hatalarını sıfırlayarak 12 saniyede tam çene dijital kopyalama sağlar.',
      patientBenefit:
        'Bulantı refleksi yaşayan hastalar için son derece konforlu; ağızda macun tadı bırakmadan anında dijital ekranda görsel izleme.',
      safetyStandard: 'FDA 510(k) Onaylı ve CE Medikal Sınıf IIa',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Dijital ölçü alan kablosuz ergonomik 3Shape TRIOS 5 ağız içi tarayıcı'
    },
    {
      slug: 'biolase-waterlase-iplus-lazer',
      name: 'Biolase Waterlase iPlus Diş ve Doku Lazeri',
      category: 'Lazer & Cerrahi',
      manufacturer: 'Biolase Inc.',
      model: 'Waterlase iPlus 2.0 (Er,Cr:YSGG)',
      clinicalAdvantage:
        'Su moleküllerini lazer enerjisiyle kinetik güce dönüştürerek kemik ve yumuşak dokuda termal nekroz yaratmadan mikron düzeyinde işlem yapar.',
      patientBenefit:
        'Diş eti operasyonlarında dikişsiz, neştersiz, kansız ve ağrısız cerrahi; anestezi ihtiyacını %80 oranında azaltır.',
      safetyStandard: 'ANSI Z136.3 Sağlık Kuruluşlarında Lazer Güvenliği Standardı',
      imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Diş eti ve sert doku cerrahisinde kullanılan Biolase su lazeri konsolu'
    },
    {
      slug: 'dentsply-sirona-cerec-primemill',
      name: 'Dentsply Sirona CEREC Primemill CAD/CAM Ünitesi',
      category: 'Dijital Ölçü & CAD/CAM',
      manufacturer: 'Dentsply Sirona',
      model: 'CEREC Primemill Yüksek Hızlı Freze',
      clinicalAdvantage:
        'Klinik içi dijital laboratuvarımızda zirkonyum ve cam seramik blokları 7 dakikada mikron düzeyinde frezeleyerek aynı gün porselen teslimi sağlar.',
      patientBenefit:
        'Haftalarca geçici kaplamayla bekleme zorunluluğunu ortadan kaldırır; tek seansta daimi estetik kuron montajı imkanı verir.',
      safetyStandard: 'ISO 9001 & ISO 13485 Sertifikalı Hassas Frezeleme Mimarisi',
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Klinik içi dijital seramik frezeleme yapan CEREC Primemill robotik ünitesi'
    },
    {
      slug: 'melag-vacuklav-40-b-plus-sterilizasyon',
      name: 'Melag Vacuklav 40 B+ Sınıf B Medikal Otoklav Sistemi',
      category: 'Sterilizasyon',
      manufacturer: 'MELAG Medizintechnik',
      model: 'Vacuklav 40 B+ Evolution',
      clinicalAdvantage:
        'Kesikli fraksiyonel ön vakum teknolojisiyle cerrahi aletlerin en ince lümenli kanallarına kadar doymuş su buharı ulaştırarak mutlak sterilite sağlar.',
      patientBenefit:
        'Çapraz enfeksiyon riskini mutlak sıfıra indirir; her hasta için kullanılan alet seti barkodlu ve tarih damgalı steril poşetlerde açılır.',
      safetyStandard: 'EN 13060 Avrupa Hastane Sterilizasyon Standardı Uyumlu',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Melag medikal Sınıf B fraksiyonel ön vakumlu otoklav sterilizasyon ünitesi'
    }
  ],

  // Patient Guide Content (Hasta Rehberi)
  patientGuides: [
    {
      slug: 'ilk-randevu-ve-kapsamli-muayene-sureci',
      title: 'İlk Randevu ve Kapsamlı Muayene Protokolü',
      category: 'Klinik Protokolleri',
      summary:
        'Kliniğimize ilk kez başvuran hastalarımızın anamnez değerlendirmesi, 3D dijital radyografik incelemesi ve tedavi planlama adımları.',
      readTime: '4 dk',
      contentParagraphs: [
        'VadiDent’e ilk gelişinizde sizi karşılayan hasta danışmanımızla birlikte genel sağlık durumunuz, kronik hastalıklarınız, kullandığınız ilaçlar ve geçmiş alerji öykülerinizi içeren detaylı medikal anamnez formunuz doldurulur.',
        'Ardından panoramik veya gerekli görüldüğünde 3 boyutlu CBCT düşük doz tomografiniz alınır. Hekimimiz; sadece şikayetçi olduğunuz dişi değil, tüm çene kemiğini, diş etlerini ve çiğneme kaslarını bütüncül olarak inceler.',
        'Teşhis sonrasında tedavi alternatifleri, seans sayıları, süreler ve şeffaf maliyet tablosu bilgisayar ekranında size yazılı olarak sunulur; onayınız olmaksızın hiçbir müdahaleye başlanmaz.'
      ],
      criticalRules: [
        'Kullandığınız düzenli ilaçların (özellikle kan sulandırıcı veya osteoporoz ilaçları) listesini yanınızda bulundurunuz.',
        'Varsa son 6 ay içinde çektirdiğiniz güncel diş filmlerini randevu öncesinde bizimle paylaşabilirsiniz.'
      ],
      faq: [
        { question: 'İlk muayenede aynı gün tedaviye başlanabilir mi?', answer: 'Acil ağrı veya kırık vakalarında aynı gün müdahale edilir; kapsamlı estetik ve cerrahi tedavilerde ise detaylı planlama doğrultusunda randevu verilir.' },
        { question: 'İlk muayene ne kadar sürer?', answer: 'Radyolojik görüntüleme ve konsültasyon dahil ortalama 40 - 50 dakika ayrılmaktadır.' }
      ]
    },
    {
      slug: 'cerrahi-ve-implant-sonrasi-iyilesme-rehberi',
      title: 'İmplant ve Çene Cerrahisi Sonrası İlk 48 Saat Bakım Kılavuzu',
      category: 'Cerrahi Sonrası Bakım',
      summary:
        'İmplant, gömülü diş çekimi ve sinüs lifting sonrasında kanama kontrolü, ödem yönetimi, beslenme ve ağrı kontrolü kuralları.',
      readTime: '6 dk',
      contentParagraphs: [
        'Cerrahi müdahale sonrasında operasyon bölgesine yerleştirilen steril tamponu 30-45 dakika boyunca kuvvetlice ısırınız ve ardından atınız. İlk 24 saat boyunca tükürmek, pipet kullanmak veya ağzı kuvvetle çalkalamak pıhtı oluşumunu bozar ve kanamayı yeniden başlatabilir.',
        'Ödemi (şişliği) en aza indirmek için operasyon bölgesine dışarıdan, yanağınıza ilk 24-48 saat boyunca 15 dakika aralıklarla buz kompresi uygulayınız. Yastığınızın baş seviyesini hafifçe yüksek tutarak yatmanız ödemin dağılmasına yardımcı olur.',
        'İlk 3 gün boyunca çok sıcak, asitli, sert ve taneli gıdalardan kaçınınız. Ilık veya soğuk çorbalar, püreler, yoğurt ve smoothieler gibi yumuşak gıdalarla besleniniz.'
      ],
      criticalRules: [
        'İlk 48 saat kesinlikle sigara ve alkol tüketmeyiniz; sigara dumanı implantın kemikle kaynaşmasını doğrudan engeller.',
        'Doktorunuz tarafından reçete edilen antibiyotik ve ağrı kesicileri saatine uygun şekilde aksatmadan kullanınız.'
      ],
      faq: [
        { question: 'Hafif sızıntı şeklinde kan gelmesi normal mi?', answer: 'Tükürükle karışan hafif pembe renkli sızıntı ilk 24 saat tamamen normaldir; panik yapmayınız.' },
        { question: 'Dikişler ne zaman alınır?', answer: 'Eğer eriyen dikiş kullanılmadıysa, operasyondan 7 ila 10 gün sonra klinikte ağrısız biçimde alınır.' }
      ]
    },
    {
      slug: 'seffaf-plak-kullanim-ve-temizlik-kurallari',
      title: 'Telsiz Ortodonti: Şeffaf Plakların Bakımı ve Kullanım Talimatı',
      category: 'Ortodonti Rehberi',
      summary:
        'Günde 20-22 saat kullanım disiplini, plak temizleme yöntemleri, yemek yeme kuralları ve plak değişim takvimi.',
      readTime: '5 dk',
      contentParagraphs: [
        'Şeffaf plak tedavisinin başarısı doğrudan sizin kullanım disiplininize bağlıdır. Plaklar yalnızca ana öğünlerde ve diş fırçalarken çıkarılmalı, günde toplam 20-22 saat mutlaka ağızda kalmalıdır. Sürenin aksatılması diş hareketini geciktirir.',
        'Plaklar ağızdayken yalnızca oda sıcaklığında su içilebilir. Çay, kahve veya sıcak içecekler plağın polimer yapısını deforme ederek şeffaflığını bozar; şekerli içecekler ise plak altında kalarak mine çürüklerine zemin hazırlar.',
        'Plaklarınızı sabah ve akşam diş fırçanız ve ılık suyla hafifçe fırçalayınız. Diş macunlarının içindeki aşındırıcı partiküller plağı matlaştırabileceğinden haftada iki kez özel temizleme kristalleri veya efervesan tabletler kullanınız.'
      ],
      criticalRules: [
        'Yemek yerken plaklar mutlaka çıkarılmalı ve kutusuna konulmalıdır; peçeteye sarılan plakların çöpe gitme riski yüksektir.',
        'Yeni bir plağa geçildiğinde hissedilen hafif sıkılık hissi 24-48 saatte geçer; bu durum dişin hareket ettiğinin kanıtıdır.'
      ],
      faq: [
        { question: 'Plaklarımdan birini kaybedersem ne yapmalıyım?', answer: 'Derhal hekiminizi arayınız; durumunuza göre bir önceki plağa dönmeniz veya bir sonraki plağa erken geçmeniz önerilecektir.' },
        { question: 'Konuşmamı bozar mı?', answer: 'İlk 2-3 gün hafif bir pelteklik yaşanabilir; dil plaklara adapte olduğunda konuşma tamamen normale döner.' }
      ]
    },
    {
      slug: 'implant-omru-ve-agiz-hijyeni-standartlari',
      title: 'İmplantların Ömrünü Uzatan Ağız Hijyeni Standartları',
      category: 'Koruyucu Hijyen',
      summary:
        'Titanyum implant çevresindeki kemik ve diş etinin sağlıklı kalması için arayüz fırçası, ağız duşu ve 6 aylık periyodik kontroller.',
      readTime: '5 dk',
      contentParagraphs: [
        'Titanyum implantlar çürümez; ancak implantı çevreleyen diş eti ve kemik dokusu kötü ağız hijyeni nedeniyle iltihaplanabilir (Peri-implantitis). İmplantın ömür boyu ağızda kalabilmesi için implant çevresi hijyeni doğal dişlerden dahi daha titiz yapılmalıdır.',
        'Klasik diş fırçaları implantların ve köprü gövdelerinin altındaki dar alanlara ulaşamaz. Bu bölgelerin temizliğinde implant boynuna zarar vermeyen plastik kaplı arayüz fırçaları ve kalınlaştırılmış süngerimsi diş ipleri (Superfloss) kullanılmalıdır.',
        'Basınçlı su püskürten ağız duşları (Waterpik), diş eti cebindeki bakteri plağını mekanik olarak uzaklaştırmada en etkili yardımcıdır.'
      ],
      criticalRules: [
        'Günde en az bir kez implant aralarına özel arayüz fırçası veya ağız duşu uygulamak şarttır.',
        'Her 6 ayda bir kliniğimizde implant çevresi kemik seviyesini gösteren kontrol filmleri çektirilmelidir.'
      ],
      faq: [
        { question: 'İmplant ömür boyu dayanır mı?', answer: 'İyi kemik yoğunluğu, doğru cerrahi yerleşim ve kusursuz ağız hijyeniyle implantlar ömür boyu hizmet edebilir.' },
        { question: 'İmplant sallanırsa ne yapılmalıdır?', answer: 'Genellikle sallanan implantın kendisi değil, üzerindeki vidalı protezin gevşemesidir; çiğnemeyi durdurup hemen hekime başvurulmalıdır.' }
      ]
    },
    {
      slug: 'ozel-saglik-sigortalari-ve-finansman-kolayliklari',
      title: 'Özel Sağlık Sigortaları, Vergi İndirimi ve Anlaşmalı Kurumlar',
      category: 'Sigorta & Finans',
      summary:
        'Tamamlayıcı ve özel sağlık sigortası anlaşmaları, kurumsal indirim protokolleri ve tedavi giderlerinin belgelendirilmesi.',
      readTime: '4 dk',
      contentParagraphs: [
        'Kliniğimiz, Türkiye’de faaliyet gösteren önde gelen özel sağlık sigorta şirketleri ve yabancı expat sigortaları ile anlaşmalıdır. Poliçenizin diş tedavi teminatı (yıllık diş paketi, acil durumlar, travmatik kırıklar) kapsamında doğrudan faturalandırma yapılabilmektedir.',
        'Özel sağlık sigortanızın bulunmadığı hallerde, yapılan tüm medikal harcamalar Sağlık Bakanlığı onaylı e-Serbest Meslek Makbuzu (e-SMM) ile belgelendirilir; bu makbuzlar gelir vergisi beyannamenizde eğitim ve sağlık harcaması indirimi olarak kullanılabilmektedir.',
        'Kapsamlı implant ve ortodonti tedavilerinde anlaşmalı bankalar aracılığıyla faizsiz taksitlendirme ve kişiselleştirilmiş ödeme planları sunulmaktadır.'
      ],
      criticalRules: [
        'Randevunuza gelirken sigorta kartınızı veya dijital poliçe numaranızı hasta danışmanımıza ibraz ediniz.',
        'Yurtdışı sigorta kurumları için İngilizce medikal rapor ve epikriz formu hekimlerimizce ücretsiz tanzim edilmektedir.'
      ],
      faq: [
        { question: 'SGK anlaşmanız bulunuyor mu?', answer: 'Kliniğimiz özel poliklinik statüsünde olup SGK ile doğrudan anlaşması yoktur; ancak özel sağlık sigortaları geçerlidir.' },
        { question: 'Ödemelerde kredi kartına taksit imkanı var mı?', answer: 'Anlaşmalı tüm banka kartlarına yasal taksit sınırları çerçevesinde vade farksız taksit uygulanmaktadır.' }
      ]
    }
  ],

  sterilizationProtocols: [
    {
      phase: 'Faz 1',
      title: 'Ultrasonik Ön Temizlik ve Dezenfeksiyon',
      standard: 'EN ISO 15883 Uyumlu Termal Dezenfektör',
      procedure:
        'Kullanılan tüm cerrahi aletler manuel temasa gerek kalmadan medikal enzimatik solüsyonlu ultrasonik banyoda mikro partiküllerden arındırılır ve 93°C termal dezenfeksiyondan geçirilir.'
    },
    {
      phase: 'Faz 2',
      title: 'Hassas Bakım ve Otomatik Poşetleme',
      standard: 'DIN 58953 Tıbbi Paketleme Güvencesi',
      procedure:
        'Döner aletler (anguldruva ve cerrahi mikromotorlar) özel yağlama cihazında iç mekanik temizliğe tabi tutulur, her alet kimyasal indikatörlü medikal poşetlere vakumla kapatılır.'
    },
    {
      phase: 'Faz 3',
      title: 'Sınıf B Fraksiyonel Otoklav Sterilizasyonu',
      standard: 'EN 13060 Sınıf B Tıbbi Standart',
      procedure:
        'Melag Vacuklav cihazında 134°C sıcaklık ve 2.1 bar doymuş buhar basıncı altında 3 döngülü fraksiyonel ön vakumla tüm virüs, bakteri ve sporlar %100 elimine edilir.'
    },
    {
      phase: 'Faz 4',
      title: 'Dijital Takip ve Barkodlu Hasta Eşleşmesi',
      standard: 'Elektronik Sterilizasyon Denetim İzi',
      procedure:
        'Her otoklav döngüsünün basınç-sıcaklık grafiği elektronik olarak arşivlenir; poşet üzerindeki barkod hastanın dijital dosyasında açılarak aletin sterilite zinciri doğrulanır.'
    }
  ]
};

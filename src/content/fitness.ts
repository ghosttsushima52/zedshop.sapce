/**
 * Avenox Çoklu Site Vitrini - Fitness Kulübü ve Koçluk Stüdyosu İçerik Modülü
 * Marka: KOR Atletik Performans & Kondisyon Kulübü
 * Lokasyon: Etiler / Beşiktaş, İstanbul & Maslak Atletik Kampüsü
 */

export interface FitnessProgram {
  slug: string;
  title: string;
  category: 'Kuvvet & Kondisyon' | 'Hareket & Mobilite' | 'Boks & Çeviklik' | 'Toparlanma & Nefes' | 'Özel Popülasyonlar';
  level: 'Tüm Seviyeler' | 'Orta - İleri' | 'İleri Düzey' | 'Giriş / Temel';
  intensityRating: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  durationMinutes: number;
  classCapacity: number;
  overview: string;
  trainingMethodology: string;
  targetAdaptations: string[];
  equipmentUsed: string[];
  suitableFor: string[];
  contraindications: string[];
  leadCoachSlug: string;
  imageUrl: string;
  imageAlt: string;
}

export interface FitnessCoach {
  slug: string;
  name: string;
  role: string;
  specialization: string;
  academicBackground: string;
  certifications: string[];
  athleticBackground: string;
  coachingPhilosophy: string;
  experienceYears: number;
  programSlugs: string[];
  avatarUrl: string;
  avatarAlt: string;
}

export interface FitnessFacility {
  slug: string;
  name: string;
  areaSquareMeters: number;
  description: string;
  highlightedGear: string[];
  environmentDetails: string;
  imageUrl: string;
  imageAlt: string;
}

export interface FitnessScheduleItem {
  id: string;
  dayOfWeek: 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma' | 'Cumartesi' | 'Pazar';
  startTime: string;
  endTime: string;
  programSlug: string;
  coachSlug: string;
  facilitySlug: string;
  intensity: 'Orta' | 'Yüksek' | 'Maksimal' | 'Düşük / Toparlanma';
  spotsAvailable: number;
}

export interface FitnessMembershipTier {
  id: string;
  name: string;
  badge?: string;
  billingFrequency: 'Aylık' | 'Yıllık' | 'Paket / Seans';
  priceTRY: number | null;
  annualMonthlyPriceTRY: number | null;
  commitmentTerm: string;
  targetAudience: string;
  inclusions: string[];
  perks: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface FitnessClubContent {
  brand: {
    name: string;
    registeredName: string;
    tagline: string;
    heroHeadline: string;
    heroSubheadline: string;
    locations: Array<{
      district: string;
      name: string;
      address: string;
      phone: string;
      email: string;
    }>;
    operatingHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    stats: Array<{ value: string; label: string; detail: string }>;
  };
  navigation: Array<{ label: string; href: string }>;
  programs: FitnessProgram[];               // Exact 16 items
  coaches: FitnessCoach[];                   // Exact 10 items
  facilities: FitnessFacility[];
  weeklySchedule: FitnessScheduleItem[];
  memberships: FitnessMembershipTier[];
  coachingPillars: Array<{
    title: string;
    concept: string;
    application: string;
  }>;
}

export const fitnessClubData: FitnessClubContent = {
  brand: {
    name: 'KOR Atletik',
    registeredName: 'KOR Atletik Performans ve Beden Eğitimi Hizmetleri A.Ş.',
    tagline: 'Kuvvet, hareket ve toparlanma için planlı antrenman',
    heroHeadline: 'Antrenmanınızın bir planı olsun',
    heroSubheadline:
      'Kuvvet ve hareket çalışmalarını seviyenize göre düzenleyin. Programları, koçları ve haftalık ders saatlerini bir arada görün.',
    locations: [
      {
        district: 'Etiler / Beşiktaş',
        name: 'KOR Etiler Ana Kampüs',
        address: 'Nisbetiye Caddesi, Yan Yol Sk. No: 14/B, Etiler',
        phone: '+90 (212) 287 40 40',
        email: 'etiler@koratletik.com'
      },
      {
        district: 'Maslak / Sarıyer',
        name: 'KOR Maslak Performans Laboratuvarı',
        address: 'Büyükdere Caddesi, No: 245, USO Center Zemin Kat',
        phone: '+90 (212) 346 50 50',
        email: 'maslak@koratletik.com'
      }
    ],
    operatingHours: {
      weekdays: '06:30 - 22:00',
      saturday: '08:00 - 20:00',
      sunday: '09:00 - 18:00'
    },
    stats: [
      { value: '16 Program', label: 'Spesifik Eğitim Modülü', detail: 'Kuvvetten toparlanmaya uzanan periyodize dersler' },
      { value: '10 Sertifikalı Koç', label: 'Eğitmen Kadrosu', detail: 'CSCS, EXOS, Polestar ve BESYO mezunu uzmanlar' },
      { value: 'Maks. 10 Kişi', label: 'Grup Dersi Kotası', detail: 'Her üyeye bireysel geri bildirim sağlayan yarı-özel seanslar' },
      { value: '4°C Soğuk Küvet', label: 'Recovery Laboratuvarı', detail: 'Entegre sauna ve kontrast hidroterapi imkanı' }
    ]
  },

  navigation: [
    { label: 'Kulüp & Felsefe', href: '/fitness' },
    { label: 'Eğitim Programları', href: '/fitness/programlar' },
    { label: 'Koçlarımız', href: '/fitness/egitmenler' },
    { label: 'Tesis & Ekipman', href: '/fitness/tesisler' },
    { label: 'Ders Takvimi', href: '/fitness/takvim' },
    { label: 'Üyelikler', href: '/fitness/uyelik' }
  ],

  // 16 Programs (Programlar)
  programs: [
    {
      slug: 'kor-strength-foundation',
      title: 'KOR Strength Foundation (Mekanik Kuvvet)',
      category: 'Kuvvet & Kondisyon',
      level: 'Tüm Seviyeler',
      intensityRating: 4,
      durationMinutes: 60,
      classCapacity: 8,
      overview:
        'Squat, deadlift, bench press ve overhead press hareket kalıplarının biyomekanik doğruluğunu inşa eden, 4 haftalık lineer periyodizasyon döngülerine dayalı saf kuvvet antrenmanı.',
      trainingMethodology:
        'RPE (Algılanan Efor Oranı) ve RIR (Yedekte Kalan Tekrar) prensipleriyle çalışılır. Her üyenin omurga stabilitesi ve bar hareket yolu kamera geri bildirimiyle denetlenir.',
      targetAdaptations: ['Merkezi Sinir Sistemi (CNS) Adaptasyonu', 'Maksimal Kuvvet Kapasitesi', 'Tendon ve Eklem Sağlığı'],
      equipmentUsed: ['Eleiko IPF Standart Bar ve Diskler', 'Rogue Monster Squat Kafesleri', 'Mikro Ağırlık Plakaları'],
      suitableFor: ['Kuvvet altyapısını sakatlanmadan geliştirmek isteyenler', 'Temel bileşik egzersizlerde form düzeltmek isteyenler'],
      contraindications: ['Akut bel fıtığı alevlenme dönemi', 'Kontrolsüz hipertansiyon'],
      leadCoachSlug: 'arda-tasdelen',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Eleiko halter barı ile nizami squat antrenmanı yapan sporcu'
    },
    {
      slug: 'metabolic-conditioning-metcon',
      title: 'MetCon (Hibrit Metabolik Kondisyon)',
      category: 'Kuvvet & Kondisyon',
      level: 'Orta - İleri',
      intensityRating: 5,
      durationMinutes: 50,
      classCapacity: 10,
      overview:
        'Kardiyovasküler dayanıklılık, glikolitik laktat eşiği ve fonksiyonel vücut ağırlığı hareketlerini bir araya getiren yüksek yoğunluklu interval seansı.',
      trainingMethodology:
        'EMOM (Every Minute on the Minute) ve AMRAP blokları kullanılarak kalp atım hızının %80-92 aralığında tutulması hedeflenir. Antrenman boyunca Polar nabız göğüs bantlarıyla telemetri takibi yapılır.',
      targetAdaptations: ['Aerobik & Anaerobik Güç', 'Laktat Tamponlama Kapasitesi', 'Yüksek Kalori Tüketimi (EPOC)'],
      equipmentUsed: ['Concept2 RowErg & SkiErg', 'Kettlebell', 'Plyo Box', 'Sağlık Topları (Slam Ball)'],
      suitableFor: ['Kısa sürede yüksek kondisyon artışı hedefleyenler', 'Kardiyo dayanıklılığını test etmek isteyenler'],
      contraindications: ['Kardiyak aritmi öyküsü', 'İleri derece eklem kireçlenmesi'],
      leadCoachSlug: 'arda-tasdelen',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Concept2 kürek ergometresinde yüksek yoğunluklu metabolik kondisyon çalışması'
    },
    {
      slug: 'olimpik-halter-ve-patlayici-guc',
      title: 'Olimpik Halter & Patlayıcı Güç (Weightlifting)',
      category: 'Kuvvet & Kondisyon',
      level: 'Orta - İleri',
      intensityRating: 4,
      durationMinutes: 75,
      classCapacity: 6,
      overview:
        'Koparma (Snatch) ile silkme (Clean & Jerk) hareketlerinin teknik parçalama, hızlanma fazı ve bar altına girme aşamalarını öğreten uzmanlık atölyesi.',
      trainingMethodology:
        'Olimpik podyum üzerinde ayak pozisyonu, kalça patlaması ve omuz kilitlenmesi aşamalı drillerle öğretilir. Yüksek kare hızlı video analizleri ile bar ekseni sapmaları anlık gösterilir.',
      targetAdaptations: ['Patlayıcı Güç Üretim Oranı (RFD)', 'Triple Extension (Kalça-Diz-Ayak Bileği İtisi)', 'Dinamik Denge'],
      equipmentUsed: ['Eleiko IWF Antrenman Barları', 'Yumuşak Düşürme Blokları (Drop Pads)', 'Tebeşir İstasyonu'],
      suitableFor: ['Halter tekniğini sıfırdan veya ilerleterek öğrenmek isteyenler', 'Saha sporlarında sıçrama ve hızlanmasını artırmak isteyen sporcular'],
      contraindications: ['İleri derece omuz sıkışması (Impingement)', 'Bilek kırığı rehabilitasyon dönemi'],
      leadCoachSlug: 'gorkem-yilmazer',
      imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Olimpik podyum üzerinde koparma tekniği çalışan halter sporcusu'
    },
    {
      slug: 'fonksiyonel-hipertrofi-ve-kas-dayanikligi',
      title: 'Fonksiyonel Hipertrofi & Kas Dayanıklılığı',
      category: 'Kuvvet & Kondisyon',
      level: 'Tüm Seviyeler',
      intensityRating: 3,
      durationMinutes: 60,
      classCapacity: 10,
      overview:
        'Eklemleri aşırı yıpratmadan, kontrollü tempo (TUT - Time Under Tension) ve mekanik gerilim ile yağsız kas kütlesi inşa etmeyi amaçlayan akıllı direnç programı.',
      trainingMethodology:
        '3-0-1-0 tempo protokolleri, dambıl/kablo kombinasyonları ve agonist-antagonist süpersetler ile kas lifleri hedeflenir. Egzersiz açıları üyenin anatomik kol/bacak kaldıraç boyuna göre ayarlanır.',
      targetAdaptations: ['Miyofibriler ve Sarkoplazmik Hipertrofi', 'Postür Koruyucu Kas Tonusu', 'Glikojen Depolama Kapasitesi'],
      equipmentUsed: ['Rogue Dambıl Seti (2 - 50 kg)', 'Ayarlanabilir Fonksiyonel Kablo Kuleleri', 'Eğimli Sehpalar'],
      suitableFor: ['Estetik kas gelişimi isterken hareket açıklığını kaybetmek istemeyenler', 'Klasik vücut geliştirmeden sıkılanlar'],
      contraindications: ['Akut kas yırtılması veya tendinit'],
      leadCoachSlug: 'sinan-berk',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Dambıllar ile kontrollü tempo hipertrofi antrenmanı yapan sporcu'
    },
    {
      slug: 'atletik-kosu-ve-vo2max-kondisyonu',
      title: 'Atletik Koşu Biyomekaniği & VO2max İnterval',
      category: 'Kuvvet & Kondisyon',
      level: 'Tüm Seviyeler',
      intensityRating: 4,
      durationMinutes: 50,
      classCapacity: 8,
      overview:
        'Motor içermeyen kavisli koşu bantlarında (Woodway Curve) kadans, yer temas süresi ve gövde açısını düzelten; kardiyovasküler kapasiteyi yukarı taşıyan interval koşu sınıfı.',
      trainingMethodology:
        'Kendi vücut kinetiğinizle dönen zemin sayesinde doğal ön-ayak basışı teşvik edilir. 400m ve 800m eşdeğeri laktat eşiği intervalleri ve toparlanma periyotları uygulanır.',
      targetAdaptations: ['Maksimal Oksijen Tüketimi (VO2max)', 'Koşu Ekonomisi & Adım Frekansı', 'Diz ve Ayak Bileği Dayanıklılığı'],
      equipmentUsed: ['Woodway Curve Motorsuz Koşu Bantları', 'Çeviklik Merdivenleri', 'Optik Zamanlama Kapıları'],
      suitableFor: ['Yarı maraton veya maraton koşanlar', 'Koşu formunu düzelterek sakatlanma riskini azaltmak isteyenler'],
      contraindications: ['Aşil tendinopatisi alevlenme evresi', 'Stres kırığı şüphesi'],
      leadCoachSlug: 'defne-karahan',
      imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Kavisli koşu bandı üzerinde yüksek kadans interval antrenmanı'
    },
    {
      slug: 'postural-duzeltici-mobilite-ve-fms',
      title: 'Postüral Düzeltici Egzersiz & FMS Mobilite',
      category: 'Hareket & Mobilite',
      level: 'Giriş / Temel',
      intensityRating: 2,
      durationMinutes: 55,
      classCapacity: 10,
      overview:
        'Masa başı çalışma ve hareketsiz yaşamın neden olduğu boyun düzleşmesi, anterior pelvik tilt ve omuz kısıtlılıklarını çözen nöromüsküler yeniden eğitim dersi.',
      trainingMethodology:
        'FMS (Functional Movement Screen) test bataryasına dayanan protokoller; miyofasiyal gevşetme (foam roller), PNF germe ve aktif eklem kapsülü açma (CARS & PAILS/RAILS) tekniklerini birleştirir.',
      targetAdaptations: ['Torasik Omurga Hareket Açıklığı', 'Kalça Eklemi İç/Dış Rotasyonu', 'Kronik Bel-Boyun Gerginliğinde Rahatlama'],
      equipmentUsed: ['Köpük Rulolar (Foam Roller)', 'Direnç Bantları', 'Ahşap Mobilite Çubukları', 'Tetik Nokta Topları'],
      suitableFor: ['Sırt, boyun ve bel tutulması yaşayan kurumsal çalışanlar', 'Ağır antrenman öncesi eklem hareket açıklığını artırmak isteyenler'],
      contraindications: ['Akut omurga kırığı veya instabilitesi'],
      leadCoachSlug: 'cansu-bilgin',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Mat üzerinde omurga ve kalça açma mobilite egzersizleri uygulayan grup'
    },
    {
      slug: 'klinik-reformer-ve-omurga-stabilitesi',
      title: 'Klinik Reformer Pilates & Core Stabilitesi',
      category: 'Hareket & Mobilite',
      level: 'Tüm Seviyeler',
      intensityRating: 3,
      durationMinutes: 55,
      classCapacity: 6,
      overview:
        'Yay dirençli Balanced Body Reformer yatakları üzerinde derin core kaslarını (transversus abdominis, multifidus) aktive eden ve postürü dikleştiren hassas hizalama dersi.',
      trainingMethodology:
        'Klasik pilates hareketleri çağdaş biyomekanik prensiplerle modifiye edilmiştir. Omurga segmentasyonu, skapular stabilizasyon ve pelvik nötr konum her harekette korunur.',
      targetAdaptations: ['Lumbopelvik Stabilite', 'Esneklik & Doku Uzaması', 'Nefes-Hareket Koordinasyonu'],
      equipmentUsed: ['Balanced Body Allegro 2 Reformer Cihazları', 'Pilates Çemberi', 'Spine Corrector'],
      suitableFor: ['Omurga sağlığını korumak ve fıtık riskini azaltmak isteyenler', 'Zarif, güçlü ve kontrollü kas yapısı hedefleyenler'],
      contraindications: ['Hekim onaylı mutlak yatak istirahati gerektiren durumlar'],
      leadCoachSlug: 'cansu-bilgin',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Reformer pilates stüdyosunda yay direnciyle omurga uzatma pozu'
    },
    {
      slug: 'kettlebell-ve-rotasyonel-guc-atolyesi',
      title: 'Kettlebell Ustalığı & Rotasyonel Kuvvet',
      category: 'Kuvvet & Kondisyon',
      level: 'Orta - İleri',
      intensityRating: 4,
      durationMinutes: 50,
      classCapacity: 8,
      overview:
        'Hardstyle kettlebell swing, Turkish get-up, clean ve snatch teknikleriyle vücudun arka zincirini (glute, hamstring) ve rotasyonel çekirdek gücünü çelikleştiren ders.',
      trainingMethodology:
        'Pavel Tsatsouline StrongFirst metodolojisine sadık kalınarak kalça menteşesi (hip hinge) patlaması ve ani gerilim-rahatlama döngüleri çalıştırılır.',
      targetAdaptations: ['Arka Kinetik Zincir Patlayıcılığı', 'Omuz Stabilizasyonu & Kavrama Kuvveti', 'Rotasyonel Gövde Sertliği'],
      equipmentUsed: ['Yarışma Tipi Kalibre Kettlebell (8 - 36 kg)', 'Tırmanma Tebeşiri'],
      suitableFor: ['Belini koruyarak kalça ve bacak kuvvetini artırmak isteyenler', 'Dövüş sporcuları ve tenisçiler'],
      contraindications: ['Akut karpal tünel sendromu', 'Yeni geçirilmiş fıtık ameliyatı'],
      leadCoachSlug: 'gorkem-yilmazer',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Kettlebell swing patlayıcı kalça hareketi çalışan eğitmen'
    },
    {
      slug: 'atletik-boks-ve-ceviklik-kondisyonu',
      title: 'Atletik Boks Kondisyonu & Çeviklik',
      category: 'Boks & Çeviklik',
      level: 'Tüm Seviyeler',
      intensityRating: 5,
      durationMinutes: 60,
      classCapacity: 10,
      overview:
        'Kafa darbesi almadan, profesyonel boks ayak hareketleri, lapa kombinasyonları, kum torbası intervalleri ve reaksiyon drilleriyle tüm vücudu ateşleyen kondisyon seansı.',
      trainingMethodology:
        '3’er dakikalık rauntlar halinde düzenlenir. Raunt aralarında 60 saniyelik aktif toparlanma ve core kuvveti uygulanır. El-göz koordinasyonu ve kalça rotasyonu öğretilir.',
      targetAdaptations: ['Anaerobik Dayanıklılık', 'Refleks & Reaksiyon Sürati', 'Stres Atımı & Zihinsel Odak'],
      equipmentUsed: ['Fairtex Ağır Kum Torbaları', 'Deri Boks Lapaları', 'Hızlı Atlama İpleri', 'Boks Bandajları'],
      suitableFor: ['Eğlenceli ve yüksek tempolu kardiyo arayanlar', 'Boks temel mekaniğini öğrenmek isteyenler'],
      contraindications: ['Kontrolsüz glokom (göz içi basınç)', 'Bilek eklemi instabilitesi'],
      leadCoachSlug: 'bora-cetin',
      imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Boks torbasında seri kombinasyonlar ve çevik ayak hareketleri çalışan boksör'
    },
    {
      slug: 'calisthenics-ve-vucut-agirligi-ustaligi',
      title: 'Calisthenics & Jimnastik Kuvvet Ustalığı',
      category: 'Kuvvet & Kondisyon',
      level: 'Orta - İleri',
      intensityRating: 4,
      durationMinutes: 60,
      classCapacity: 8,
      overview:
        'Barfiks, dip, amuda kalkma (handstand), muscle-up ve jimnastik halkaları üzerinde vücut ağırlığını yerçekimine karşı kusursuz yönetmeyi öğreten akrobatik kuvvet sınıfı.',
      trainingMethodology:
        'Progresif yükleme, vücut ağırlığının kaldıraç kolunu değiştirerek (örn. tuck front lever’dan full lever’a) sağlanır. Düz kol kuvveti ve skapular depresyon vurgulanır.',
      targetAdaptations: ['Göreceli Vücut Kuvveti (Kuvvet/Kilo Oranı)', 'Omuz ve Bilek Hipermobilitesinde Stabilite', 'Vestibüler Denge'],
      equipmentUsed: ['Ahşap Jimnastik Halkaları', 'Paralel Barlar (Parallettes)', 'Tırmanma Halatı', 'Barfiks İstasyonları'],
      suitableFor: ['Kendi bedenini kontrol etmek isteyenler', 'Barfiks sayısını artırmak ve amutta durmak isteyenler'],
      contraindications: ['Omuz labrum yırtığı', 'Akut dirsek medial epikondiliti (Golfçü dirseği)'],
      leadCoachSlug: 'sinan-berk',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Jimnastik halkalarında dip ve statik tutuş sergileyen atlet'
    },
    {
      slug: 'kontrollu-solunum-ve-soguk-maruziyeti',
      title: 'Nefes Protokolü, Soğuk Maruziyeti & HRV Reset',
      category: 'Toparlanma & Nefes',
      level: 'Tüm Seviyeler',
      intensityRating: 2,
      durationMinutes: 45,
      classCapacity: 8,
      overview:
        'Wim Hof benzeri kontrollü hipokapnik solunum, 4°C sabit buzlu su küvetine kontrollü daldırma ve Fin saunası ile otonom sinir sistemini resetleyen bilimsel toparlanma protokolü.',
      trainingMethodology:
        'Diyaframatik solunumla vagus siniri uyarılır. Ardından soğuk şok tepkisi zihinsel sakinlikle kontrol edilerek 2-3 dakika buz banyosunda kalınır ve kontrast sauna seansıyla tamamlanır.',
      targetAdaptations: ['Kalp Atım Hızı Değişkenliği (HRV) Artışı', 'Sistemik İnflamasyonun Baskılanması', 'Dopamin ve Noradrenalin Dengesi'],
      equipmentUsed: ['Chiller Soğutmalı Buz Havuzu (4°C)', 'Sedir Ağacı Fin Saunası', 'Zemin Meditasyon Minderleri'],
      suitableFor: ['Yoğun antrenman yapan veya kronik iş stresi yaşayanlar', 'Uyku kalitesini ve bağışıklığını yükseltmek isteyenler'],
      contraindications: ['Raynaud sendromu', 'Hamilelik', 'Kalp pili kullanımı'],
      leadCoachSlug: 'melih-danisman',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Soğuk su havuzu ve sauna toparlanma alanı meditasyon seansı'
    },
    {
      slug: 'kadin-atletler-icin-dongusel-kuvvet',
      title: 'Kadınlara Özel Döngüsel Faz Kuvvet Antrenmanı',
      category: 'Özel Popülasyonlar',
      level: 'Tüm Seviyeler',
      intensityRating: 3,
      durationMinutes: 55,
      classCapacity: 8,
      overview:
        'Kadın fizyolojisi ve menstrüel döngü fazlarına (foliküler vs luteal) göre optimize edilen; pelvik taban kuvveti, kalça stabilizasyonu ve kemik yoğunluğunu artıran bilinçli antrenman.',
      trainingMethodology:
        'Östrojen ve progesteron dalgalanmalarına göre ağırlık yoğunluğu ve toparlanma süreleri programlanır. Q açısı biyomekaniğine uygun diz ve kalça koruma egzersizleri seçilir.',
      targetAdaptations: ['Kemik Mineral Yoğunluğunun Korunması', 'Pelvik Taban Bütünlüğü', 'Hormonal Dalgalanmalarda Enerji Yönetimi'],
      equipmentUsed: ['Trap Bar', 'Kalça İtiş (Hip Thrust) Sehpası', 'Direnç Mini Bantları', 'Hafif Dambıllar'],
      suitableFor: ['Kadın biyolojisine saygılı antrenman yapmak isteyenler', 'Doğum sonrası core toparlanması hedefleyen kadınlar'],
      contraindications: ['Pelvik organ sarkması akut dönemi (hekim konsültasyonu gerekir)'],
      leadCoachSlug: 'zeynep-erdem',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Trap bar ile güvenli kalça ve bacak kuvveti çalışan kadın sporcu'
    },
    {
      slug: 'saglikli-yas-alma-ve-kemik-yogunlugu',
      title: '50+ Yaşlanma Karşıtı Kuvvet & Kemik Yoğunluğu',
      category: 'Özel Popülasyonlar',
      level: 'Giriş / Temel',
      intensityRating: 2,
      durationMinutes: 50,
      classCapacity: 8,
      overview:
        'Sarkopeni (yaşa bağlı kas kaybı) ve osteopeni riskine karşı kontrollü kemik yüklemesi, denge egzersizleri ve düşme önleme protokollerini içeren sağlıklı yaş alma programı.',
      trainingMethodology:
        'Eksenel kemik yüklemesi sağlayan güvenli makineler, denge minderleri ve hafif serbest ağırlıklarla çalışılır. Ani eklem baskısı yaratmayan akıcı hareketler tercih edilir.',
      targetAdaptations: ['Osteoblastik Kemik Mineral Aktivasyonu', 'Propriosepsiyon & Denge', 'Günlük Yaşam Bağımsızlığı'],
      equipmentUsed: ['Kablo Makineleri', 'BOSU Denge Topu', 'Köpük Basamaklar', 'Hafif Kettlebell Setleri'],
      suitableFor: ['50 yaş ve üzeri bireyler', 'Diz ve kalça eklemlerini kuvvetlendirerek protez riskini azaltmak isteyenler'],
      contraindications: ['İleri derece osteoporoz kompresyon kırığı riski (önce DEXA taraması istenir)'],
      leadCoachSlug: 'caner-bozkurt',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      imageAlt: '50 yaş üzeri master sporcu için güvenli denge ve direnç çalışması'
    },
    {
      slug: 'bransa-ozel-atletik-gelisim-ve-sicrama',
      title: 'Spor Branşına Özel Atletik Gelişim & Sıçrama',
      category: 'Kuvvet & Kondisyon',
      level: 'İleri Düzey',
      intensityRating: 5,
      durationMinutes: 75,
      classCapacity: 6,
      overview:
        'Basketbol, futbol, voleybol ve tenis oyuncularının sahada daha yükseğe sıçraması, yön değiştirmesi (CoD) ve temas anında sağlam kalması için tasarlanmış elit atletik kamp.',
      trainingMethodology:
        'Vald ForceDecks kuvvet platformu ile sıçrama asimetrileri ölçülür. Pliometrik şok antrenmanı, elastik enerji depolama ve eksantrik frenleme kapasitesi geliştirilir.',
      targetAdaptations: ['Dikey ve Yatay Sıçrama Yüksekliği', 'Yön Değiştirme (Change of Direction) Hızı', 'Ön Çapraz Bağ (ÖÇB) Yaralanma Önleme'],
      equipmentUsed: ['Vald ForceDecks Kuvvet Plakaları', 'Just Jump Mat', 'Pliometrik Ahşap Kutular', 'Ağır Kızaklar (Sled)'],
      suitableFor: ['Müsabık kulüp sporcuları', 'Amatör liglerde oynayan ve sahada fark yaratmak isteyen basketbolcu ve futbolcular'],
      contraindications: ['Patellar tendinit akut alevlenmesi'],
      leadCoachSlug: 'arda-tasdelen',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Pliometrik kutu üzerinde patlayıcı sıçrama çalışması yapan genç atlet'
    },
    {
      slug: 'sakatlik-sonrasi-sahaya-donus-rehab',
      title: 'Sakatlık Sonrası Spora Dönüş (Return to Play)',
      category: 'Hareket & Mobilite',
      level: 'Giriş / Temel',
      intensityRating: 2,
      durationMinutes: 55,
      classCapacity: 4,
      overview:
        'Ön çapraz bağ cerrahisi, menisküs ameliyatı veya omuz luksasyonu sonrası fizyoterapi sürecini tamamlamış bireylerin yeniden güvenle spora başlamasını sağlayan köprü programı.',
      trainingMethodology:
        'İzokinetik kuvvet dengesi, eksantrik tendon yüklemesi ve kademeli nöromüsküler yeniden eğitim uygulanır. Karar anı simülasyonlarıyla zihinsel sakatlanma korkusu (kinezyofobi) kırılır.',
      targetAdaptations: ['Sağ-Sol Bacak Kuvvet Simetrisi (LSI > %90)', 'Dinamik Eklem Koruması', 'Kinezyofobi (Hareket Korkusu) Tasfiyesi'],
      equipmentUsed: ['Direnç Bantları', 'Denge Platformları', 'Kızak İtme Şeridi', 'Düşük Etkili Kardiyo Cihazları'],
      suitableFor: ['Ameliyat veya tedavi sonrası salona dönmekten çekinen sporcular', 'Kronik ayak bileği burkulması yaşayanlar'],
      contraindications: ['Ortopedi hekiminden egzersiz onay raporu bulunmayan hastalar'],
      leadCoachSlug: 'caner-bozkurt',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Sakatlık sonrası diz stabilitesi ve kademeli kuvvet yükleme egzersizi'
    },
    {
      slug: 'kurumsal-performans-ve-stres-direnci',
      title: 'Kurumsal Performans & Yönetici Dayanıklılık Kampı',
      category: 'Kuvvet & Kondisyon',
      level: 'Tüm Seviyeler',
      intensityRating: 3,
      durationMinutes: 45,
      classCapacity: 12,
      overview:
        'Şirket üst düzey yöneticileri ve ekipleri için öğle arası veya iş çıkışı zamanına sıkıştırılmış; bilişsel odaklanmayı artıran, sırt ağrılarını gideren dinamik takım seansı.',
      trainingMethodology:
        'İstasyon çalışması (Circuit Training) kurgusunda uygulanır. Ekipler birbirini motive ederken kalp ritmini hızlandıran fonksiyonel hareketlerle zihinsel tükenmişlik nötralize edilir.',
      targetAdaptations: ['Bilişsel Odak ve Endorfin Salınımı', 'Takım İçi Bağlılık ve Moral', 'Kortizol (Stres Hormonu) Regülasyonu'],
      equipmentUsed: ['Hafif Sağlık Topları', 'TRX Süspansiyon Askıları', 'Kettlebell', 'Atlama İpleri'],
      suitableFor: ['Şirket departmanları ve start-up ekipleri', 'Günün stresini ekip arkadaşlarıyla spor yaparak atmak isteyenler'],
      contraindications: ['Ciddi bel fıtığı'],
      leadCoachSlug: 'selin-akdur',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Kurumsal şirket çalışanları için stüdyoda fonksiyonel istasyon antrenmanı'
    }
  ],

  // 10 Coaches (Eğitmenler / Koçlar)
  coaches: [
    {
      slug: 'arda-tasdelen',
      name: 'Arda Taşdelen',
      role: 'Baş Antrenör & Performans Direktörü',
      specialization: 'Maksimal Kuvvet, Bileşik Egzersiz Biyomekaniği ve Atletik Periyodizasyon',
      academicBackground: 'Marmara Üniversitesi Beden Eğitimi ve Spor Yüksekokulu (BESYO) - Antrenörlük Eğitimi',
      certifications: [
        'NSCA - Certified Strength and Conditioning Specialist (CSCS)',
        'EXOS - Performance Specialist (XPS)',
        'USA Weightlifting (USAW) Level 1',
        'FMS Level 2 Certified'
      ],
      athleticBackground: 'Eski Gençler Türkiye 100m ve 200m Sprint Finalisti; 14 yıllık kuvvet koçluğu tecrübesi.',
      coachingPhilosophy:
        'Kuvvet sadece kaldırılan ağırlığın kilogramı değildir; eklemlerin güvenle ürettiği tork ve sinir sisteminin etkinliğidir. Önce mükemmel mekanik, sonra kademeli yükleme.',
      experienceYears: 14,
      programSlugs: ['kor-strength-foundation', 'metabolic-conditioning-metcon', 'bransa-ozel-atletik-gelisim-ve-sicrama'],
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Arda Taşdelen, Baş Antrenör portresi'
    },
    {
      slug: 'cansu-bilgin',
      name: 'Cansu Bilgin',
      role: 'Baş Pilates ve Postüral Düzeltme Eğitmeni',
      specialization: 'Klinik Pilates, Omurga Patolojileri ve Skolyoz Egzersiz Modifikasyonları',
      academicBackground: 'İstanbul Üniversitesi Fizik Tedavi ve Rehabilitasyon Bölümü (B.Sc)',
      certifications: [
        'Polestar Pilates Comprehensive Studio Diploma',
        'Balanced Body Master Instructor',
        'Schroth 3 Boyutlu Skolyoz Terapi Egzersizleri Sertifikası',
        'PMA-CPT (Pilates Method Alliance)'
      ],
      athleticBackground: '10 yıl profesyonel klasik bale geçmişi; son 9 yıldır klinik pilates ve hareket terapisi uzmanı.',
      coachingPhilosophy:
        'Omurganız ne kadar esnek ve sağlamsa, biyolojik olarak o kadar gençsinizdir. Bedene zorla form dayatmak yerine, bedenin doğal hizalanmasını uyandırıyoruz.',
      experienceYears: 9,
      programSlugs: ['postural-duzeltici-mobilite-ve-fms', 'klinik-reformer-ve-omurga-stabilitesi'],
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Cansu Bilgin, Baş Pilates Eğitmeni portresi'
    },
    {
      slug: 'gorkem-yilmazer',
      name: 'Görkem Yılmazer',
      role: 'Halter ve Kuvvet Kondisyon Koçu',
      specialization: 'Olimpik Halter (Koparma & Silkme), Hip Hinge Biyomekaniği ve Kettlebell',
      academicBackground: 'Gazi Üniversitesi Beden Eğitimi ve Spor Yüksekokulu',
      certifications: [
        'USA Weightlifting (USAW) Level 2 Advanced Coach',
        'StrongFirst SFG II Kettlebell Instructor',
        'Eleiko Certified Strength Coach'
      ],
      athleticBackground: 'Türkiye Halter Federasyonu 85 kg kategorisi eski milli sporcusu (2012-2016).',
      coachingPhilosophy:
        'Halter kaba güç değil, milisaniyelik bir fizik ve denge sanatıdır. Barın merkez kaç kuvvetine teslim olmak yerine barı kontrol etmeyi öğretiyoruz.',
      experienceYears: 11,
      programSlugs: ['olimpik-halter-ve-patlayici-guc', 'kettlebell-ve-rotasyonel-guc-atolyesi'],
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Görkem Yılmazer, Halter Koçu portresi'
    },
    {
      slug: 'defne-karahan',
      name: 'Defne Karahan',
      role: 'Dayanıklılık ve Koşu Biyomekaniği Koçu',
      specialization: 'VO2max Gelişimi, Kavisli Koşu Bandı Analizi ve Laktat Eşiği Yönetimi',
      academicBackground: 'Ege Üniversitesi Spor Bilimleri Fakültesi - Hareket ve Antrenman Bilimleri',
      certifications: [
        'UESCA Certified Running Coach',
        'Stryd Running Power Coach',
        'TrainingPeaks Level 2 Certified Coach'
      ],
      athleticBackground: 'İstanbul ve Berlin Maratonları finisherı (Kişisel En İyi: 2:48:12).',
      coachingPhilosophy:
        'Koşmak insanın en temel içgüdüsüdür; ancak yanlış teknikle yapılan her adım eklemlere binen yıkıcı yüktür. Doğru kadans ve zemin temasıyla koşuyu zahmetsiz hale getiriyoruz.',
      experienceYears: 8,
      programSlugs: ['atletik-kosu-ve-vo2max-kondisyonu', 'metabolic-conditioning-metcon'],
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Defne Karahan, Koşu Biyomekaniği Koçu portresi'
    },
    {
      slug: 'sinan-berk',
      name: 'Sinan Berk',
      role: 'Fonksiyonel Jimnastik ve Calisthenics Koçu',
      specialization: 'Vücut Ağırlığı Kuvveti, Jimnastik Halkaları, Amut ve Skapular Kontrol',
      academicBackground: 'Hacettepe Üniversitesi Spor Bilimleri Fakültesi',
      certifications: [
        'GymnasticBodies Athlete & Coach Certification',
        'World Street Workout & Calisthenics Federation (WSWCF) Level 2',
        'MovNat Level 2 Certified Trainer'
      ],
      athleticBackground: '8 yıl artistik jimnastik altyapısı; Türkiye sokak antrenmanı (Calisthenics) şampiyonası hakemi.',
      coachingPhilosophy:
        'Kendi vücut ağırlığınızı boşlukta kontrol edemiyorsanız, harici dambılları kaldırmanın anlamı eksik kalır. Bedenin her bir eklemini tek parça gibi çalıştırmayı öğretiyoruz.',
      experienceYears: 10,
      programSlugs: ['calisthenics-ve-vucut-agirligi-ustaligi', 'fonksiyonel-hipertrofi-ve-kas-dayanikligi'],
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Sinan Berk, Calisthenics Koçu portresi'
    },
    {
      slug: 'zeynep-erdem',
      name: 'Zeynep Erdem',
      role: 'Kadın Sağlığı ve Pre/Postnatal Egzersiz Uzmanı',
      specialization: 'Döngüsel Kadın Antrenmanı, Diastasis Recti Onarımı ve Pelvik Taban Egzersizleri',
      academicBackground: 'Boğaziçi Üniversitesi Moleküler Biyoloji ve Genetik Lisansı & Haliç Üniversitesi Spor Yönetimi',
      certifications: [
        'NASM - Corrective Exercise Specialist (CES)',
        'Girls Gone Strong (GGS) Pre & Postnatal Coach',
        'CPPS (Certified Physical Preparation Specialist)'
      ],
      athleticBackground: 'Eski lisanslı voleybolcu; son 7 yıldır kadın atletik sağlığı ve döngüsel antrenman danışmanı.',
      coachingPhilosophy:
        'Kadın bedeni erkek modellerinin minyatür kopyası değildir. Hormonal döngünüzle savaşmak yerine onun biyolojik ritmini avantaja çeviren akıllı antrenman yapmalısınız.',
      experienceYears: 7,
      programSlugs: ['kadin-atletler-icin-dongusel-kuvvet', 'postural-duzeltici-mobilite-ve-fms'],
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Zeynep Erdem, Kadın Sağlığı Egzersiz Uzmanı portresi'
    },
    {
      slug: 'bora-cetin',
      name: 'Bora Çetin',
      role: 'Dövüş Sanatları ve Çeviklik Kondisyoneri',
      specialization: 'Klasik Boks Ayak Hareketleri, Lapa Eğitimi, Reaksiyon Hızı ve Çeviklik',
      academicBackground: 'Celal Bayar Üniversitesi Beden Eğitimi ve Spor Yüksekokulu',
      certifications: [
        'Türkiye Boks Federasyonu 2. Kademe Antrenör',
        'ACE (American Council on Exercise) CPT',
        'Brazilian Jiu-Jitsu Mavi Kemer (Checkmat BJJ)'
      ],
      athleticBackground: 'Türkiye Ferdi Boks Şampiyonası 69 kg Gümüş Madalya Sahibi (2015); profesyonel boks kondisyoneri.',
      coachingPhilosophy:
        'Boks sadece yumruk atmak değildir; rakibin boşluğunu okumak, ayak parmak ucundan güç üretmek ve en şiddetli anda bile nefes alabilmektir.',
      experienceYears: 12,
      programSlugs: ['atletik-boks-ve-ceviklik-kondisyonu', 'metabolic-conditioning-metcon'],
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Bora Çetin, Boks ve Çeviklik Koçu portresi'
    },
    {
      slug: 'melih-danisman',
      name: 'Melih Danışman',
      role: 'Toparlanma, Nefes ve Soğuk Maruziyeti Koçu',
      specialization: 'Otonom Sinir Sistemi Regülasyonu, Soğuk Su Adaptasyonu ve HRV Analizi',
      academicBackground: 'Koç Üniversitesi Psikoloji Lisansı & Spor Nörobiyolojisi Araştırmaları',
      certifications: [
        'XPT (Extreme Performance Training) Certified Coach',
        'Oxygen Advantage Advanced Breathing Instructor',
        'Wim Hof Method Fundamentals Eğitmeni'
      ],
      athleticBackground: 'Açık deniz soğuk su yüzücüsü; Boğaziçi Kıtalararası Yüzme Yarışı 5 kez katılımcısı.',
      coachingPhilosophy:
        'Gelişim antrenman anında değil, antrenmandan sonraki toparlanma (recovery) penceresinde gerçekleşir. Doğru nefes ve soğuk stres adaptasyonu sinir sisteminizin sigortasıdır.',
      experienceYears: 6,
      programSlugs: ['kontrollu-solunum-ve-soguk-maruziyeti'],
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Melih Danışman, Toparlanma ve Nefes Koçu portresi'
    },
    {
      slug: 'selin-akdur',
      name: 'Selin Akdur',
      role: 'Sporcu Beslenmesi ve Metabolik Performans Danışmanı',
      specialization: 'Glikojen Yenilenmesi, Dayanıklılık Sporlarında Enerji Protokolleri ve Vücut Kompozisyonu',
      academicBackground: 'Hacettepe Üniversitesi Beslenme ve Diyetetik Bölümü (B.Sc)',
      certifications: [
        'International Society of Sports Nutrition (ISSN) - CISSN',
        'IOC (Uluslararası Olimpiyat Komitesi) Sporcu Beslenmesi Diploması',
        'T.C. Diyetisyenler Derneği Üyesi'
      ],
      athleticBackground: 'Triatlon sporcusu; ulusal düzeyde olimpik triatletlerin beslenme protokollerini yönetmektedir.',
      coachingPhilosophy:
        'Yetersiz veya hatalı yakıtla çalışan bir spor motoru eninde sonunda arıza verir. Beslenme kısıtlama değil, performansınızı ateşleyen hücresel destektir.',
      experienceYears: 9,
      programSlugs: ['kurumsal-performans-ve-stres-direnci', 'metabolic-conditioning-metcon'],
      avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Selin Akdur, Sporcu Beslenmesi Danışmanı portresi'
    },
    {
      slug: 'caner-bozkurt',
      name: 'Caner Bozkurt',
      role: 'Genç ve Master Atlet Gelişim Koçu',
      specialization: 'FMS Hareket Taraması, Sakatlık Sonrası Kademeli Yükleme ve Denge',
      academicBackground: 'Marmara Üniversitesi Spor Bilimleri Fakültesi',
      certifications: [
        'Functional Movement Systems (FMS) Pro Level 2',
        'ACSM - Certified Exercise Physiologist (EP-C)',
        'EXOS Return to Performance Specialist'
      ],
      athleticBackground: 'Profesyonel altyapı kulüplerinde 10 yıl atletik gelişim ve rehabilitasyon sorumlusu.',
      coachingPhilosophy:
        'Sakatlık bir son değil, vücudunuzun biyomekanik açıklarını kapatmanız için bir fırsattır. Temel hareket kalitesini sabırla inşa ettiğimizde yaş veya sakatlık engel olmaktan çıkar.',
      experienceYears: 13,
      programSlugs: ['saglikli-yas-alma-ve-kemik-yogunlugu', 'sakatlik-sonrasi-sahaya-donus-rehab'],
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      avatarAlt: 'Caner Bozkurt, Master Atlet ve Rehabilitasyon Koçu portresi'
    }
  ],

  // Facilities (Tesisler & Ekipman Altyapısı)
  facilities: [
    {
      slug: 'eleiko-halter-ve-kuvvet-platformlari',
      name: 'Eleiko Halter Podyumu ve Serbest Ağırlık Alanı',
      areaSquareMeters: 280,
      description:
        'IWF onaylı 4 adet bağımsız ahşap halter podyumu, Eleiko antrenman barları ve kalibre poliüretan diskler ile donatılmış saf kuvvet mabedi.',
      highlightedGear: [
        '4x Eleiko IWF Ağırlık Düşürme Podyumu',
        'Rogue Monster Serisi 8 İstasyonlu Squat Kafesi',
        'Eleiko IPF ve IWF Standart Erkek (20kg) ve Kadın (15kg) Barları',
        '0.5 kg’dan 50 kg’a kadar çift kademeli üretan dambıl kulesi'
      ],
      environmentDetails: 'Ses ve titreşimi emen 40 mm geri dönüşümlü ağır kauçuk zemin, tebeşir istasyonu ve yüksek tavan havalandırması.',
      imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Eleiko halter barları ve podyumlarının yer aldığı serbest ağırlık antrenman salonu'
    },
    {
      slug: 'kardiyo-ve-metabolik-kondisyon-laboratuvari',
      name: 'Kardiyo & Kondisyon Laboratuvarı (Curve & Erg)',
      areaSquareMeters: 190,
      description:
        'Motor içermeyen kavisli koşu bantları ve hava dirençli Concept2 istasyonlarının yer aldığı, yüksek yoğunluklu interval seanslarına özel salon.',
      highlightedGear: [
        '8x Woodway Curve Motorsuz Kavisli Koşu Bandı',
        '6x Concept2 RowErg Kürek Çekme Cihazı',
        '4x Concept2 SkiErg Kayak Simülatörü',
        '4x Concept2 BikeErg Bisiklet İstasyonu'
      ],
      environmentDetails: 'Polar Team Pro canlı telemetri projeksiyonu, yüksek debili taze hava iklimlendirmesi ve şok emici tartam koşu şeridi.',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Kavisli koşu bantları ve kürek ergometrelerinin bulunduğu kardiyo kondisyon alanı'
    },
    {
      slug: 'balanced-body-reformer-ve-mobilite-studyo',
      name: 'Reformer Pilates & Biyomekanik Stüdyosu',
      areaSquareMeters: 140,
      description:
        'Omurga rehabilitasyonu, core kuvveti ve mobilite çalışmalarına tahsis edilmiş, gün ışığı alan sessiz ve akustik izole stüdyo.',
      highlightedGear: [
        '6x Balanced Body Allegro 2 Reformer & Tower Ünitesi',
        'Spine Corrector ve Ahşap Pilates Merdiveni',
        'TheraBand ve TriggerPoint profesyonel mobilite ekipmanları'
      ],
      environmentDetails: 'Masif meşe parke zemin, sıcak mat tonlar, tavandan sarkıtılan doğal aydınlatma ve HEPA filtreli hava temizleme.',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Balanced Body Allegro 2 makinelerinin sıralandığı aydınlık reformer stüdyosu'
    },
    {
      slug: 'recovery-lab-ve-soguk-su-kuveti',
      name: 'Recovery Lab (Soğuk Daldırma & Fin Saunası)',
      areaSquareMeters: 110,
      description:
        'Antrenman sonrası kas toparlanmasını, laktat atımını ve otonom sinir sistemi resetini hızlandıran entegre hidroterapi ünitesi.',
      highlightedGear: [
        '2x The Cold Plunge Ticari Soğuk Su Küveti (4°C sabit dijital soğutma ve ozon sterilizasyonu)',
        'Geleneksel Fin Sedir Ağacı Kuru Saunası (85°C)',
        'Normatec 3 Bacak ve Kalça Dinamik Hava Kompresyon Botları'
      ],
      environmentDetails: 'Loş dinlendirici ışıklandırma, aromaterapik sedir kokusu, dinlenme şezlongları ve sıcak-soğuk kontrast duşlar.',
      imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Soğuk su havuzu ve Fin saunasının yer aldığı KOR toparlanma odası'
    },
    {
      slug: 'biyomekanik-analiz-ve-kuvvet-platformu-odasi',
      name: 'Vald Biyomekanik Test & Performans Odası',
      areaSquareMeters: 65,
      description:
        'Üyelerimizin kulübe kabulünde ve her ay periyodik olarak uygulanan kuvvet asimetrisi ve vücut kompozisyonu ölçüm laboratuvarı.',
      highlightedGear: [
        'Vald ForceDecks Çift Kuvvet Plakası (Sıçrama ve RFD asimetri analizi)',
        'InBody 770 Tıbbi Vücut Sıvısı ve Kas Kütlesi Analizörü',
        'Vald DynaMo El Dinamometresi ve Açı Ölçer'
      ],
      environmentDetails: 'Klinik temizlik standartlarında, bilgisayarlı raporlama ekranı ve bireysel gizlilik korumalı danışma odası.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Kuvvet platformu ve vücut analiz cihazlarının bulunduğu test odası'
    }
  ],

  // Weekly Schedule (Haftalık Program)
  weeklySchedule: [
    {
      id: 'sch-pzt-0700',
      dayOfWeek: 'Pazartesi',
      startTime: '07:00',
      endTime: '08:00',
      programSlug: 'kor-strength-foundation',
      coachSlug: 'arda-tasdelen',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Yüksek',
      spotsAvailable: 2
    },
    {
      id: 'sch-pzt-0830',
      dayOfWeek: 'Pazartesi',
      startTime: '08:30',
      endTime: '09:25',
      programSlug: 'klinik-reformer-ve-omurga-stabilitesi',
      coachSlug: 'cansu-bilgin',
      facilitySlug: 'balanced-body-reformer-ve-mobilite-studyo',
      intensity: 'Orta',
      spotsAvailable: 1
    },
    {
      id: 'sch-pzt-1215',
      dayOfWeek: 'Pazartesi',
      startTime: '12:15',
      endTime: '13:05',
      programSlug: 'metabolic-conditioning-metcon',
      coachSlug: 'arda-tasdelen',
      facilitySlug: 'kardiyo-ve-metabolik-kondisyon-laboratuvari',
      intensity: 'Maksimal',
      spotsAvailable: 4
    },
    {
      id: 'sch-pzt-1845',
      dayOfWeek: 'Pazartesi',
      startTime: '18:45',
      endTime: '19:45',
      programSlug: 'kor-strength-foundation',
      coachSlug: 'gorkem-yilmazer',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Yüksek',
      spotsAvailable: 0
    },
    {
      id: 'sch-sal-0730',
      dayOfWeek: 'Salı',
      startTime: '07:30',
      endTime: '08:20',
      programSlug: 'atletik-kosu-ve-vo2max-kondisyonu',
      coachSlug: 'defne-karahan',
      facilitySlug: 'kardiyo-ve-metabolik-kondisyon-laboratuvari',
      intensity: 'Yüksek',
      spotsAvailable: 3
    },
    {
      id: 'sch-sal-0900',
      dayOfWeek: 'Salı',
      startTime: '09:00',
      endTime: '09:55',
      programSlug: 'kadin-atletler-icin-dongusel-kuvvet',
      coachSlug: 'zeynep-erdem',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Orta',
      spotsAvailable: 2
    },
    {
      id: 'sch-sal-1830',
      dayOfWeek: 'Salı',
      startTime: '18:30',
      endTime: '19:30',
      programSlug: 'atletik-boks-ve-ceviklik-kondisyonu',
      coachSlug: 'bora-cetin',
      facilitySlug: 'kardiyo-ve-metabolik-kondisyon-laboratuvari',
      intensity: 'Maksimal',
      spotsAvailable: 1
    },
    {
      id: 'sch-sal-2000',
      dayOfWeek: 'Salı',
      startTime: '20:00',
      endTime: '20:45',
      programSlug: 'kontrollu-solunum-ve-soguk-maruziyeti',
      coachSlug: 'melih-danisman',
      facilitySlug: 'recovery-lab-ve-soguk-su-kuveti',
      intensity: 'Düşük / Toparlanma',
      spotsAvailable: 3
    },
    {
      id: 'sch-car-0700',
      dayOfWeek: 'Çarşamba',
      startTime: '07:00',
      endTime: '08:15',
      programSlug: 'olimpik-halter-ve-patlayici-guc',
      coachSlug: 'gorkem-yilmazer',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Yüksek',
      spotsAvailable: 2
    },
    {
      id: 'sch-car-1215',
      dayOfWeek: 'Çarşamba',
      startTime: '12:15',
      endTime: '13:00',
      programSlug: 'kurumsal-performans-ve-stres-direnci',
      coachSlug: 'selin-akdur',
      facilitySlug: 'kardiyo-ve-metabolik-kondisyon-laboratuvari',
      intensity: 'Orta',
      spotsAvailable: 5
    },
    {
      id: 'sch-car-1845',
      dayOfWeek: 'Çarşamba',
      startTime: '18:45',
      endTime: '19:45',
      programSlug: 'calisthenics-ve-vucut-agirligi-ustaligi',
      coachSlug: 'sinan-berk',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Yüksek',
      spotsAvailable: 2
    },
    {
      id: 'sch-per-0730',
      dayOfWeek: 'Perşembe',
      startTime: '07:30',
      endTime: '08:25',
      programSlug: 'postural-duzeltici-mobilite-ve-fms',
      coachSlug: 'cansu-bilgin',
      facilitySlug: 'balanced-body-reformer-ve-mobilite-studyo',
      intensity: 'Düşük / Toparlanma',
      spotsAvailable: 4
    },
    {
      id: 'sch-per-1000',
      dayOfWeek: 'Perşembe',
      startTime: '10:00',
      endTime: '10:50',
      programSlug: 'saglikli-yas-alma-ve-kemik-yogunlugu',
      coachSlug: 'caner-bozkurt',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Orta',
      spotsAvailable: 3
    },
    {
      id: 'sch-per-1900',
      dayOfWeek: 'Perşembe',
      startTime: '19:00',
      endTime: '19:50',
      programSlug: 'kettlebell-ve-rotasyonel-guc-atolyesi',
      coachSlug: 'gorkem-yilmazer',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Yüksek',
      spotsAvailable: 1
    },
    {
      id: 'sch-cum-0700',
      dayOfWeek: 'Cuma',
      startTime: '07:00',
      endTime: '08:00',
      programSlug: 'kor-strength-foundation',
      coachSlug: 'arda-tasdelen',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Yüksek',
      spotsAvailable: 1
    },
    {
      id: 'sch-cum-1215',
      dayOfWeek: 'Cuma',
      startTime: '12:15',
      endTime: '13:05',
      programSlug: 'metabolic-conditioning-metcon',
      coachSlug: 'arda-tasdelen',
      facilitySlug: 'kardiyo-ve-metabolik-kondisyon-laboratuvari',
      intensity: 'Maksimal',
      spotsAvailable: 2
    },
    {
      id: 'sch-cum-1800',
      dayOfWeek: 'Cuma',
      startTime: '18:00',
      endTime: '18:45',
      programSlug: 'kontrollu-solunum-ve-soguk-maruziyeti',
      coachSlug: 'melih-danisman',
      facilitySlug: 'recovery-lab-ve-soguk-su-kuveti',
      intensity: 'Düşük / Toparlanma',
      spotsAvailable: 4
    },
    {
      id: 'sch-cmt-0930',
      dayOfWeek: 'Cumartesi',
      startTime: '09:30',
      endTime: '10:45',
      programSlug: 'bransa-ozel-atletik-gelisim-ve-sicrama',
      coachSlug: 'arda-tasdelen',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Maksimal',
      spotsAvailable: 2
    },
    {
      id: 'sch-cmt-1115',
      dayOfWeek: 'Cumartesi',
      startTime: '11:15',
      endTime: '12:15',
      programSlug: 'atletik-boks-ve-ceviklik-kondisyonu',
      coachSlug: 'bora-cetin',
      facilitySlug: 'kardiyo-ve-metabolik-kondisyon-laboratuvari',
      intensity: 'Yüksek',
      spotsAvailable: 3
    },
    {
      id: 'sch-paz-1030',
      dayOfWeek: 'Pazar',
      startTime: '10:30',
      endTime: '11:25',
      programSlug: 'sakatlik-sonrasi-sahaya-donus-rehab',
      coachSlug: 'caner-bozkurt',
      facilitySlug: 'eleiko-halter-ve-kuvvet-platformlari',
      intensity: 'Düşük / Toparlanma',
      spotsAvailable: 2
    },
    {
      id: 'sch-paz-1200',
      dayOfWeek: 'Pazar',
      startTime: '12:00',
      endTime: '12:45',
      programSlug: 'kontrollu-solunum-ve-soguk-maruziyeti',
      coachSlug: 'melih-danisman',
      facilitySlug: 'recovery-lab-ve-soguk-su-kuveti',
      intensity: 'Düşük / Toparlanma',
      spotsAvailable: 5
    }
  ],

  // Memberships (Üyelikler & Paketler)
  memberships: [
    {
      id: 'kor-drop-in-pass',
      name: 'KOR 10’lu Seans Kartı',
      billingFrequency: 'Paket / Seans',
      priceTRY: 9500,
      annualMonthlyPriceTRY: null,
      commitmentTerm: '90 gün geçerlilik süresi',
      targetAudience: 'Seyahat edenler veya esnek çalışma saatleri nedeniyle düzenli gelemeyen bağımsız sporcular.',
      inclusions: [
        'Tüm 16 grup programına randevulu katılım hakkı',
        'Mobil uygulama üzerinden 48 saat öncesine kadar kolay rezervasyon',
        'Seans günü duş, havlu ve soyunma dolabı kullanımı'
      ],
      perks: [
        'Kullanılmayan seansları arkadaşınıza devretme esnekliği',
        'Organik hidrasyon barında %10 indirim'
      ],
      ctaText: '10’lu Seans Kartı Satın Al'
    },
    {
      id: 'kor-unlimited-club',
      name: 'KOR Sınırsız Kulüp Üyeliği',
      badge: 'En Popüler Atletik Tercih',
      isPopular: true,
      billingFrequency: 'Aylık',
      priceTRY: 12800,
      annualMonthlyPriceTRY: 10200,
      commitmentTerm: '12 aylık taahhütte indirimli aylık ödeme',
      targetAudience: 'Haftada 3 veya daha fazla antrenman yapan, toparlanma alanını düzenli kullanan adanmış üyeler.',
      inclusions: [
        'Sınırsız sayıda grup programı ve açık podyum (Open Gym) serbest kullanımı',
        'Recovery Lab (Soğuk Daldırma Küveti & Fin Saunası) sınırsız erişimi',
        'Aylık InBody 770 tıbbi vücut kompozisyonu takibi',
        'Etiler ve Maslak kulüplerinin her ikisine de çift merkezli giriş hakkı'
      ],
      perks: [
        'Ayda 2 adet misafir getirme davetiyesi',
        'Yılda 30 gün ücretsiz üyelik dondurma hakkı',
        'Kulüp içi atölye ve seminerlere öncelikli kayıt'
      ],
      ctaText: 'Sınırsız Kulübe Katılın'
    },
    {
      id: 'kor-performance-pro',
      name: 'KOR Performans Pro (Bireysel Koçluk)',
      badge: 'Birebir Koçluk & VIP',
      billingFrequency: 'Aylık',
      priceTRY: 29500,
      annualMonthlyPriceTRY: 24800,
      commitmentTerm: '3 aylık minimum adaptasyon döngüsü',
      targetAudience: 'Spesifik bir yarışmaya hazırlanan, sakatlık sonrası dönen veya birebir koç desteği arayan sporcular.',
      inclusions: [
        'Haftalık 2 seans (Ayda 8 seans) birebir Özel Koçluk (1-on-1 PT)',
        'Vald ForceDecks kuvvet platformu ile 3 boyutlu sıçrama ve asimetri testi',
        'Selin Akdur ile aylık kişisel sporcu beslenmesi ve makro planlaması',
        'KOR Sınırsız Kulüp ve Recovery Lab tüm imkanlarına tam erişim',
        'Kişiye özel atanmış kalıcı VIP soyunma dolabı ve taze antrenman giysisi servisi'
      ],
      perks: [
        'Doğrudan koçunuzla WhatsApp üzerinden 7/24 antrenman ve form danışması',
        'Normatec kompresyon botları sınırsız rezervasyonsuz kullanım',
        'Ücretsiz sporcu sakatlanma kaza sigortası kapsamı'
      ],
      ctaText: 'Pro Koçluk Görüşmesi Ayarlayın'
    },
    {
      id: 'kor-corporate-athlete',
      name: 'KOR Kurumsal Takım & Yönetici Sağlığı',
      badge: 'Şirket Ekipleri İçin',
      billingFrequency: 'Aylık',
      priceTRY: null,
      annualMonthlyPriceTRY: null,
      commitmentTerm: 'Kurumsal sözleşme (Min. 10 çalışan)',
      targetAudience: 'Çalışan sağlığını, zindeliğini ve takım içi moralini artırmak isteyen ilerici şirketler.',
      inclusions: [
        'Şirkete özel kapalı saatte haftalık fonksiyonel takım dersleri',
        'Ofiste ergonomi, postür ve masa başı mikro-hareket seminerleri',
        'Tüm çalışanlar için indirimli bireysel kulüp üyeliği protokolü',
        'Üç aylık şirket bazında kardiyo ve kuvvet gelişim raporlaması'
      ],
      perks: [
        'Şirket logolu sporcu tişörtü ve su matarası hediye kiti',
        'Yıllık şirket spor festivali ve yarışma organizasyonu desteği'
      ],
      ctaText: 'Kurumsal Teklif Alın'
    }
  ],

  coachingPillars: [
    {
      title: '01. Biyomekanik Tarama Olmadan Yükleme Yoktur',
      concept: 'Kusurlu hareket kalıbının üzerine ağırlık koymak sakatlığa davetiyedir.',
      application:
        'Kulübümüze katılan her üye FMS (Functional Movement Screen) testinden geçer. Kalça, ayak bileği ve omuz hareket kısıtlılıkları çözülmeden ağır yükleme yapılmaz.'
    },
    {
      title: '02. Bilimsel Periyodizasyon ve Ölçülebilirlik',
      concept: 'Rastgele yapılan antrenmanlar ancak rastgele sonuçlar doğurur.',
      application:
        'Antrenmanlarımız 4 ila 6 haftalık bloklar halinde periyodize edilir. Hacim, yoğunluk ve toparlanma haftaları (deload) önceden planlanarak sürveyans altında tutulur.'
    },
    {
      title: '03. Toparlanma (Recovery), Antrenmanın Yarısıdır',
      concept: 'Vücudunuz salonda değil, dinlenme ve derin uyku sırasında büyür ve güçlenir.',
      application:
        'Kulübümüzde toparlanma lüks değil, temel antrenman disiplinidir. Soğuk küvet, sauna, nefes seansları ve beslenme danışmanlığı ile sinir sistemi hızla yenilenir.'
    }
  ]
};

/**
 * Avenox Çoklu Site Vitrini - Kurumsal Hukuk ve Danışmanlık İçerik Modülü
 * Marka: Demirbağ & Ortakları Hukuk Bürosu (Demirbağ Partners Corporate Advisory)
 * Lokasyon: Levent, Beşiktaş / İstanbul & İrtibat Ofisi: Çankaya / Ankara
 */

export interface LawPracticeArea {
  slug: string;
  title: string;
  summary: string;
  detailedOverview: string;
  scopeOfWork: string[];
  sectorsServed: string[];
  leadPartnerSlug: string;
  representativeMatters: string[];
  regulatoryFramework: string[];
  icon: string;
}

export interface LawTeamMember {
  slug: string;
  name: string;
  title: string;
  seniority: 'Yönetici Ortak' | 'Kıdemli Ortak' | 'Ortak Avukat' | 'Kıdemli Danışman' | 'Kıdemli Avukat' | 'Avukat' | 'Regülasyon Danışmanı';
  barAssociation: string;
  barNumber: string;
  admittedYear: number;
  languages: string[];
  practiceSlugs: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: number;
  }>;
  biography: string;
  directEmail: string;
  phoneExtension: string;
  imageUrl: string;
  imageAlt: string;
  academicMemberships: string[];
}

export interface LawPublication {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  category: 'Birleşme & Devralmalar' | 'Sermaye Piyasaları' | 'Rekabet Hukuku' | 'Veri Koruma & Yapay Zeka' | 'Vergi & Uyuşmazlık' | 'Enerji & İklim Mevzuatı';
  readTimeMinutes: number;
  authorSlug: string;
  tags: string[];
  legalCitations: string[];
  downloadableBriefUrl?: string;
}

export interface LawOfficeLocation {
  city: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  telephone: string;
  facsimile: string;
  email: string;
  workingHours: string;
  coordinates: { lat: number; lng: number };
}

export interface LawFirmContent {
  brand: {
    name: string;
    registeredName: string;
    tagline: string;
    heroHeadline: string;
    heroSubheadline: string;
    foundingYear: number;
    headquarters: string;
    regulatoryDisclaimer: string;
    stats: Array<{ label: string; value: string; detail: string }>;
  };
  navigation: Array<{ label: string; href: string }>;
  practiceAreas: LawPracticeArea[]; // Exact 10 items
  teamMembers: LawTeamMember[];     // Exact 9 items
  publications: LawPublication[];   // Exact 12 items
  offices: LawOfficeLocation[];
  consultationSteps: Array<{
    stepNumber: string;
    title: string;
    description: string;
    safeguard: string;
  }>;
}

export const lawFirmData: LawFirmContent = {
  brand: {
    name: 'Demirbağ & Ortakları Hukuk Bürosu',
    registeredName: 'Demirbağ & Ortakları Avukatlık Ortaklığı',
    tagline: 'Şirketler hukuku, finansman ve uyuşmazlık çözümü',
    heroHeadline: 'Karmaşık dosyalar için açık hukuki değerlendirme',
    heroSubheadline:
      'Sözleşme yapısından işlemin kapanışına kadar riskleri, seçenekleri ve karar noktalarını anlaşılır biçimde ortaya koyuyoruz.',
    foundingYear: 2008,
    headquarters: 'Levent, İstanbul',
    regulatoryDisclaimer:
      'Bu sitede yer alan makale, analiz ve bilgilendirmeler Türkiye Barolar Birliği Meslek Kuralları ve Reklam Yasağı Yönetmeliği uyarınca yalnızca bilgi amaçlı hazırlanmış olup, hukuki mütalaa veya avukat-müvekkil ilişkisi tesisi niteliği taşımamaktadır.',
    stats: [
      { label: 'Çalışma Alanı', value: '10 Alan', detail: 'Şirketler hukuku, finansman ve uyuşmazlıklar' },
      { label: 'Ekip', value: '9 Hukukçu', detail: 'Farklı çalışma alanlarından ekip profilleri' },
      { label: 'Yayın', value: '12 Yazı', detail: 'Mevzuat ve uygulama notları' },
      { label: 'Diller', value: '4 Dil', detail: 'Türkçe, İngilizce, Almanca, Fransızca' }
    ]
  },

  navigation: [
    { label: 'Genel Bakış', href: '/law' },
    { label: 'Uzmanlık Alanları', href: '/law/uzmanlik-alanlari' },
    { label: 'Ekibimiz', href: '/law/ekip' },
    { label: 'Yayınlar & Hukuki Bülten', href: '/law/yayinlar' },
    { label: 'İletişim & Ofisler', href: '/law/iletisim' }
  ],

  // 10 Practice Areas (Uzmanlık Alanları)
  practiceAreas: [
    {
      slug: 'birlesme-ve-devralmalar',
      title: 'Birleşme ve Devralmalar (M&A)',
      summary:
        'Sınır ötesi hisse devirleri, ortak girişimler (joint venture) ve stratejik şirket satın alımlarında hukuki incelemeden kapanışa kadar uçtan uca danışmanlık.',
      detailedOverview:
        'Türk Ticaret Kanunu, Rekabet Mevzuatı ve ilgili sektörel regülasyonlar çerçevesinde alıcı veya satıcı tarafı temsil ediyoruz. Hukuki risk analizi (vendor and buy-side due diligence), hisse devir sözleşmeleri (SPA), hissedarlar sözleşmeleri (SHA), kapanış öncesi koşul yönetimi ve kapanış sonrası entegrasyon protokollerinde kurumsal sermayeyi koruyan sözleşmesel mimariler kurguluyoruz.',
      scopeOfWork: [
        'Hisse Alım ve Satım Sözleşmeleri (SPA) ve Hissedarlar Sözleşmeleri (SHA) hazırlığı',
        'Kapsamlı Hukuki İnceleme (Due Diligence) ve Kırmızı Bayrak (Red-Flag) risk raporlaması',
        'Rekabet Kurumu devralma bildirimleri ve izin süreçleri',
        'Emanet (Escrow) mekanizmaları ve fiyat uyarlama (Working Capital / Earn-out) müzakereleri',
        'Şirket bölünmeleri, nev’i değişiklikleri ve grup içi yeniden yapılandırmalar'
      ],
      sectorsServed: ['Teknoloji & SaaS', 'İmalat Sanayii', 'Perakende & E-Ticaret', 'Lojistik & Altyapı'],
      leadPartnerSlug: 'dr-melis-demirbag',
      representativeMatters: [
        'Bölgesel lojistik şirketinin 120 milyon USD değerindeki çoğunluk pay devri sürecinin satıcı taraf hukuki temsili',
        'Avrupa merkezli endüstriyel ambalaj grubunun Türkiye iştirak ediniminde tam kapsamlı due diligence ve SPA müzakeresi',
        'B2B yazılım ölçekleme şirketine yapılan Seri B yatırım turunda pay sahipliği sözleşmesi yapılandırması'
      ],
      regulatoryFramework: [
        '6102 sayılı Türk Ticaret Kanunu',
        '4054 sayılı Rekabetin Korunması Hakkında Kanun',
        '2010/4 sayılı Rekabet Kurulu Tebliği'
      ],
      icon: 'Briefcase'
    },
    {
      slug: 'sermaye-piyasalari-ve-halka-arz',
      title: 'Sermaye Piyasaları ve Halka Arz (IPO)',
      summary:
        'Borsa İstanbul halka arzları, borçlanma aracı ihraçları ve Sermaye Piyasası Kurulu (SPK) uyum süreçlerinde regülatif danışmanlık.',
      detailedOverview:
        'Şirketlerin halka arz öncesi kurumsal hazırlık denetimlerinden izahname onay süreçlerine, tahvil ve sukuk ihraçlarından kamuyu aydınlatma (KAP) yükümlülüklerine kadar tüm aşamalarda ihraççıları ve aracı kurumları temsil ediyoruz. İç yönergeler, bağımsız yönetim kurulu yapılanmaları ve içeriden öğrenenler listesi uyum sistemlerini oluşturuyoruz.',
      scopeOfWork: [
        'Halka arz (IPO) öncesi kurumsal yönetim mimarisi ve esas sözleşme tadilleri',
        'İzahname ve ihraç belgesi hazırlık süreçleri, SPK ve Borsa İstanbul müzakereleri',
        'Nitelikli yatırımcıya borçlanma aracı ve kira sertifikası (sukuk) ihraç protokolleri',
        'Özel Durumlar Tebliği (II-15.1) uyarınca kamuyu aydınlatma ve kurumsal sekretarya',
        'Geri alım programları ve pay piyasası manipülasyonu önleyici iç denetim mekanizmaları'
      ],
      sectorsServed: ['Girişim Sermayesi', 'Finansal Kuruluşlar', 'Holdingler', 'Gayrimenkul Yatırım Ortaklıkları (GYO)'],
      leadPartnerSlug: 'dr-melis-demirbag',
      representativeMatters: [
        'Bilişim teknolojileri şirketinin Borsa İstanbul Yıldız Pazar halka arz sürecinde ihraççı hukuk danışmanlığı',
        'Özel sektör sanayi kuruluşunun 400 milyon TL tutarındaki nitelikli yatırımcıya tahvil ihracı hukuki dokümantasyonu',
        'Halka açık enerji holdinginde kurumsal yönetim ilkelerine uyum raporlaması ve genel kurul süreç idaresi'
      ],
      regulatoryFramework: [
        '6362 sayılı Sermaye Piyasası Kanunu',
        'SPK İzahname ve İhraç Belgesi Tebliği (II-5.1)',
        'SPK Kurumsal Yönetim Tebliği (II-17.1)'
      ],
      icon: 'TrendingUp'
    },
    {
      slug: 'bankacilik-ve-proje-finansmani',
      title: 'Bankacılık, Finans ve Yeniden Yapılandırma',
      summary:
        'Büyük ölçekli altyapı finansmanları, sendikasyon kredileri, teminat paketleri ve finansal yeniden yapılandırma (FYY) protokolleri.',
      detailedOverview:
        'Yerli ve yabancı finansman sağlayıcılar ile borçlu şirketler arasında denge kurarak kredi sözleşmeleri, proje finansmanı dokümantasyonu ve teminat havuzları kurguluyoruz. Finansal darboğazdaki şirketler için Çerçeve Anlaşmaları kapsamında banka konsorsiyumlarıyla borç yapılandırma ve nakit akış koruma müzakerelerini yürütüyoruz.',
      scopeOfWork: [
        'LMA (Loan Market Association) standardında ikili ve sendikasyon kredi sözleşmeleri',
        'Ticari işletme rehni, hisse rehni, gelir temliki ve ipotek paketleri tesisi',
        'Yenilenebilir enerji ve gayrimenkul altyapı projeleri sınırlı rücu (limited-recourse) finansman modelleri',
        'Finansal Yeniden Yapılandırma Çerçeve Anlaşması müzakereleri ve refinansman',
        'Uluslararası kalkınma bankaları (EBRD, IFC) kredi paketleri hukuki uyumu'
      ],
      sectorsServed: ['Enerji Üretimi', 'Altyapı & İnşaat', 'Ağır Sanayi', 'Sağlık Kampüsleri'],
      leadPartnerSlug: 'av-harun-celebi',
      representativeMatters: [
        '140 MW kapasiteli hibrit güneş-rüzgar santrali projesinin 85 milyon Avro tutarlı konsorsiyum finansmanı teminat yönetimi',
        'Otomotiv yan sanayi grubunun 6 bankayla akdettiği Finansal Yeniden Yapılandırma Sözleşmesi idaresi',
        'Uluslararası finans kuruluşundan sağlanan yeşil dönüşüm kredisi hukuki durum raporu ve kapanış belgelendirmesi'
      ],
      regulatoryFramework: [
        '5411 sayılı Bankacılık Kanunu',
        '6750 sayılı Ticari İşlemlerde Taşınır Rehni Kanunu',
        'Bankalar Birliği Finansal Yeniden Yapılandırma Yönetmeliği'
      ],
      icon: 'ShieldCheck'
    },
    {
      slug: 'uluslararasi-ticaret-ve-tahkim',
      title: 'Uluslararası Ticaret ve Tahkim',
      summary:
        'Sınır ötesi ticari ihtilaflarda ISTAC, ICC, LCIA ve VIAC nezdinde kurumsal tahkim ve alternatif uyuşmazlık çözümü.',
      detailedOverview:
        'Farklı yargı yetkisi alanlarını kapsayan sözleşme ihlalleri, hissedar uyuşmazlıkları ve inşaat gecikme tazminatlarında müvekkillerimizi uluslararası tahkim heyetleri önünde temsil ediyoruz. Tahkim şartı yazımından hakem seçimine, delil toplama sürecinden New York Konvansiyonu kapsamında yabancı hakem kararlarının tenfizine kadar kesintisiz takip sunuyoruz.',
      scopeOfWork: [
        'ISTAC (İstanbul Tahkim Merkezi) ve ICC Tahkim Kuralları uyarınca dava takibi',
        'FIDIC tabanlı mühendislik ve inşaat sözleşmesi uyuşmazlıkları ve DAB süreçleri',
        'CISG (Milletlerarası Mal Satımına İlişkin BM Antlaşması) kaynaklı ticari uyuşmazlıklar',
        'Yabancı hakem ve mahkeme kararlarının Türkiye’de tanıma ve tenfizi davaları',
        'Uyuşmazlık öncesi stratejik ihtarname, sulh ve arabuluculuk yönetimi'
      ],
      sectorsServed: ['Uluslararası Deniz Taşımacılığı', 'Emtia Ticareti', 'Savunma Sanayi', 'Büyük Ölçekli Mühendislik'],
      leadPartnerSlug: 'av-harun-celebi',
      representativeMatters: [
        'Doğu Avrupa ve Türkiye ortaklı enerji boru hattı sözleşmesinde ICC Cenevre nezdindeki 45 milyon USD tutarlı tahkim temsili',
        'ISTAC nezdinde görülen çok taraflı dağıtım sözleşmesi feshi davasında tam kabul kararı temini',
        'İsviçre mahkeme kararının 5718 sayılı MÖHUK kapsamında Türkiye’de tenfizi ve icra kabiliyetinin tesisi'
      ],
      regulatoryFramework: [
        '4686 sayılı Milletlerarası Tahkim Kanunu',
        '1958 New York Konvansiyonu',
        '5718 sayılı Milletlerarası Özel Hukuk ve Usul Hukuku Hakkında Kanun (MÖHUK)'
      ],
      icon: 'Scale'
    },
    {
      slug: 'teknoloji-ve-veri-koruma',
      title: 'Teknoloji, Yapay Zeka ve Veri Koruma (KVKK / GDPR)',
      summary:
        'Büyük dil modelleri, sınır ötesi veri transferi taahhütnameleri, SaaS lisansları ve algoritmik hesap verebilirlik danışmanlığı.',
      detailedOverview:
        'Dijital platformlar, fintech girişimleri ve çok uluslu şirketler için 6698 sayılı KVKK ve Avrupa Birliği GDPR standartlarında veri uyum programları kuruyoruz. Yapay zeka sistemlerinin fikri hakları, eğitim verisi kullanım meşruiyeti, veri işleyen-veri sorumlusu sözleşmeleri ve Kişisel Verileri Koruma Kurulu nezdindeki idari soruşturmalarda teknik ve hukuki savunma geliştiriyoruz.',
      scopeOfWork: [
        'KVKK ve GDPR çok katmanlı uyum programları, VERBİS sicil kayıtları ve veri envanteri mimarisi',
        'Yapay zeka modellerinin veri işleme ve fikri mülkiyet risk denetimleri (AI Governance)',
        'Sınır ötesi veri aktarımı standart sözleşme ve bağlayıcı şirket kuralları (BCR) onayları',
        'SaaS, PaaS, API entegrasyon ve yazılım geliştirme sözleşmeleri (SLA & IP transferi)',
        'Veri ihlali (Data Breach) kriz yönetimi, Kurul bildirimi ve müteakip idari dava süreçleri'
      ],
      sectorsServed: ['FinTech & Dijital Bankacılık', 'B2B SaaS', 'Telekomünikasyon', 'Sağlık Bilişimi'],
      leadPartnerSlug: 'av-zeynep-derya-pekcan',
      representativeMatters: [
        'Küresel e-ticaret platformunun Türkiye açık rıza ve sınır ötesi veri aktarım mekanizmasının yeni Kurul kararlarına uyarlanması',
        'Fintech ödeme kuruluşunun açık bankacılık veri akışlarının TCMB ve KVKK düzenlemeleriyle uyumlaştırılması',
        'Yapay zeka tabanlı tıbbi teşhis yazılımının algoritma eğitimi verisi meşru menfaat değerlendirme raporlaması'
      ],
      regulatoryFramework: [
        '6698 sayılı Kişisel Verilerin Korunması Kanunu',
        'AB Genel Veri Koruma Tüzüğü (GDPR - 2016/679)',
        '6493 sayılı Ödeme Hizmetleri ve Elektronik Para Kanunu'
      ],
      icon: 'Cpu'
    },
    {
      slug: 'enerji-madencilik-ve-altyapi',
      title: 'Enerji, Altyapı ve Madencilik Hukuku',
      summary:
        'Yenilenebilir enerji lisanslama, EPDK düzenlemeleri, maden ruhsat hukuku ve karbon sınır dengeleme (CBAM) danışmanlığı.',
      detailedOverview:
        'Güneş, rüzgar, biyokütle ve jeotermal enerji santrallerinin proje geliştirme, ÇED süreçleri, orman ve kamulaştırma izinleri ile şebeke bağlantı anlaşmalarında yatırımcıları temsil ediyoruz. Maden ruhsat devirleri, rödovans sözleşmeleri ve Avrupa Yeşil Mutabakatı kapsamındaki Sınırda Karbon Düzenleme Mekanizması (SKDM) yasal uyum süreçlerinde stratejik rehberlik sağlıyoruz.',
      scopeOfWork: [
        'EPDK önlisans, üretim lisansı, çağrı mektubu ve kapasite tahsis süreçleri',
        'Arazi tahsisi, acele kamulaştırma, orman izinleri ve üst hakkı sözleşmeleri',
        'YEKDEM (Yenilenebilir Enerji Destekleme Mekanizması) mevzuatı ve ikili elektrik alım sözleşmeleri (PPA)',
        'Maden arama/işletme ruhsatları, rödovans sözleşmeleri ve MAPEG denetim süreçleri',
        'Avrupa Yeşil Mutabakatı ve Karbon Piyasası regülatif uyum analizleri'
      ],
      sectorsServed: ['Güneş & Rüzgar Enerjisi Yatırımcıları', 'Maden İşletmeciliği', 'Elektrik Dağıtım Şirketleri'],
      leadPartnerSlug: 'av-murat-sinan-ersoy',
      representativeMatters: [
        'Ege Bölgesi’nde planlanan 75 MWe kapasiteli rüzgar santralinin tüm ÇED, orman izni ve PPA sözleşmelerinin yönetimi',
        'Sanayi tesisine kurulacak 18 MWp öz tüketim çatı GES projesinin anahtar teslim EPC sözleşmesi müzakereleri',
        'Metalik maden işletme ruhsatının devri ve rödovans rejiminin MAPEG mevzuatına uyumlu kılınması'
      ],
      regulatoryFramework: [
        '6446 sayılı Elektrik Piyasası Kanunu',
        '3213 sayılı Maden Kanunu',
        '5346 sayılı Yenilenebilir Enerji Kaynaklarının Elektrik Üretimi Kanunu'
      ],
      icon: 'Zap'
    },
    {
      slug: 'rekabet-hukuku-ve-sorusturmalar',
      title: 'Rekabet Hukuku ve Regülasyon',
      summary:
        'Rekabet Kurumu önaraştırma ve soruşturma süreçlerinde savunma, hakim durum denetimleri ve dikey dağıtım uyumu.',
      detailedOverview:
        '4054 sayılı Kanun kapsamında kartel iddiaları, yeniden satış fiyatı tespiti (RPM) ve hakim durumun kötüye kullanılması soruşturmalarında şirketleri temsil ediyoruz. Yerinde incelemelerde şafak baskını (dawn-raid) prosedür yönetimi, taahhüt ve uzlaşma mekanizmalarının işletilmesi ile şirket içi rekabet uyum programlarının tasarlanmasında yetkiniz.',
      scopeOfWork: [
        'Rekabet Kurumu soruşturma yazılı savunmaları ve sözlü savunma toplantıları temsili',
        'Şafak baskını (Dawn-Raid) operasyon protokolleri ve veri tarama denetimleri',
        'Dikey anlaşmalar, münhasırlık şartları ve seçici dağıtım ağı hukuki kurgusu',
        'Rekabet Kurumu birleşme/devralma bildirim formlarının hazırlanması ve takibi',
        'Grup içi rekabet hukuku denetimi (Mock-Dawn Raid) ve çalışan farkındalık eğitimleri'
      ],
      sectorsServed: ['Hızlı Tüketim Ürünleri (FMCG)', 'Otomotiv Distribütörlüğü', 'Dijital Pazar Yerleri', 'İlaç Sanayi'],
      leadPartnerSlug: 'av-banu-selimoglu',
      representativeMatters: [
        'Ulusal gıda perakendecisinin Rekabet Kurumu nezdindeki kartel soruşturmasında lehe uzlaşma kararı temini',
        'Global otomotiv markasının Türkiye yetkili satıcılık ağı sözleşmelerinin Dikey Tebliğ kapsamına uyarlanması',
        'Online rezervasyon platformunun hakim durum incelemesinde Kurum’a sunulan taahhüt paketinin kabulü'
      ],
      regulatoryFramework: [
        '4054 sayılı Rekabetin Korunması Hakkında Kanun',
        '2002/2 sayılı Dikey Anlaşmalara İlişkin Grup Muafiyeti Tebliği',
        'Rekabet İhlallerinde Taahhüt ve Uzlaşma Yönetmelikleri'
      ],
      icon: 'AlertCircle'
    },
    {
      slug: 'vergi-hukuku-ve-vergi-davalari',
      title: 'Vergi Hukuku ve Vergi Davaları',
      summary:
        'Transfer fiyatlandırması denetimleri, çifte vergilendirmeyi önleme anlaşmaları ve Vergi Mahkemesi davaları.',
      detailedOverview:
        'Vergi Müfettişliği incelemelerinde, tarhiyat öncesi ve sonrası uzlaşma komisyonlarında ve Vergi Mahkemeleri nezdindeki iptal davalarında şirketleri savunuyoruz. Çok uluslu gruplar için transfer fiyatlandırması belgelendirmeleri, örtülü sermaye riskleri, yurt dışı kar payı dağıtımı ve KDV iade ihtilaflarında teknik vergi hukuku çözümleri sunuyoruz.',
      scopeOfWork: [
        'Vergi inceleme raporları ve vergi/ceza ihbarnamelerine karşı dava dilekçeleri hazırlığı',
        'Merkezi ve Bölgesel Uzlaşma Komisyonlarında temsil ve strateji tayini',
        'Transfer fiyatlandırması raporlaması, emsallere uygunluk ilkesi ve APA (Peşin Fiyatlandırma) başvuruları',
        'Çifte Vergilendirmeyi Önleme Anlaşmaları (ÇVÖA) kapsamında stopaj ve mukimlik ihtilafları',
        'Şirket birleşme ve bölünmelerinde vergisel istisna ve devir bilançosu denetimi'
      ],
      sectorsServed: ['Çok Uluslu Holdingler', 'İthalat & İhracatçı Birlikleri', 'Telekomünikasyon', 'Finansal Kuruluşlar'],
      leadPartnerSlug: 'dr-tolga-karamanoglu',
      representativeMatters: [
        'Yabancı sermayeli imalat grubunun 180 milyon TL tutarındaki transfer fiyatlandırması tarhiyatının Danıştay nezdinde iptali',
        'Teknoloji iştirakinin gayri maddi hak ödemelerindeki stopaj ihtilafında ÇVÖA hükümleri uyarınca lehe sonuç temini',
        'Büyük ölçekli gayrimenkul satışında KDV istisnası uyuşmazlığının uzlaşma komisyonunda sulh yoluyla çözümlenmesi'
      ],
      regulatoryFramework: [
        '213 sayılı Vergi Usul Kanunu (VUK)',
        '5520 sayılı Kurumlar Vergisi Kanunu',
        'OECD Transfer Fiyatlandırması Rehberi ve İlgili ÇVÖA Metinleri'
      ],
      icon: 'FileText'
    },
    {
      slug: 'fikri-mulkiyet-ve-patent-hukuku',
      title: 'Fikri Mülkiyet ve Sınai Haklar',
      summary:
        'Patent, ticari sır, tescilli marka portföy idaresi, haksız rekabet davaları ve tasarım tecavüzü önleme süreçleri.',
      detailedOverview:
        'Türk Patent ve Marka Kurumu (TÜRKPATENT) ve WIPO nezdinde tescil, itiraz ve hükümsüzlük süreçlerini idare ediyoruz. Yazılım kaynak kodlarının korunması, çalışan buluşları bedel tespiti davaları, taklit ürün baskınları ve gümrük el koyma tedbirlerinde fikri sermayenin piyasa değerini emniyete alıyoruz.',
      scopeOfWork: [
        'Marka, patent ve endüstriyel tasarım hükümsüzlük ve tecavüz davaları',
        'Fikri Mülkiyet Ceza Mahkemeleri nezdinde arama-el koyma kararları icrası',
        'Çalışan buluşları tescili ve hakkaniyete uygun bedel müzakereleri',
        'Gizlilik (NDA), ticari sır koruma ve know-how transfer sözleşmeleri kurgusu',
        'Teknoloji transfer ofisleri (TTO) ve üniversite-sanayi işbirliği lisanslama sözleşmeleri'
      ],
      sectorsServed: ['Biyoteknoloji & İlaç', 'Moda & Lüks Tüketim', 'Savunma ve Havacılık', 'Yazılım & Medya'],
      leadPartnerSlug: 'av-zeynep-derya-pekcan',
      representativeMatters: [
        'Yerli medikal cihaz üreticisinin tescilli patentine yönelik haksız hükümsüzlük davasının reddedilmesi',
        'Lüks giyim markasının Türkiye pazarındaki yaygın taklit ürünlerine karşı 12 ilde eş zamanlı gümrük ve piyasa toplatma kararları',
        'Bilişim şirketinin eski üst düzey çalışanına karşı açılan ticari sır ihlali ve haksız rekabet davasında tedbir temini'
      ],
      regulatoryFramework: [
        '6769 sayılı Sınai Mülkiyet Kanunu (SMK)',
        '5846 sayılı Fikir ve Sanat Eserleri Kanunu (FSEK)',
        'Paris Sözleşmesi ve TRIPS Anlaşması'
      ],
      icon: 'Bookmark'
    },
    {
      slug: 'kurumsal-yonetim-ve-is-hukuku',
      title: 'Kurumsal Yönetim ve Beyaz Yaka İş Hukuku',
      summary:
        'Üst düzey yönetici (C-Level) sözleşmeleri, toplu işten çıkarmalar, hisse opsiyon planları ve kurumsal etik soruşturmaları.',
      detailedOverview:
        'İş Kanunu ve Türk Ticaret Kanunu kesişiminde yer alan üst düzey yönetici sorumlulukları, rekabet etmeme taahhütleri ve pay edinim planlarını (ESOP) tasarlıyoruz. Şirket içi suiistimal, taciz veya rüşvet iddialarında bağımsız iç denetim ve soruşturma süreçlerini yöneterek kurumsal itibarı ve yönetim kurulu üyelerinin şahsi sorumluluğunu koruyoruz.',
      scopeOfWork: [
        'C-Suite yönetici istihdam paketleri, performans bonusları ve golden parachute protokolleri',
        'Hisse Opsiyonu (ESOP) ve Hayalet Hisse (Phantom Share) teşvik mekanizmaları',
        'Rekabet etmeme (Non-compete) ve gizlilik taahhütlerinin coğrafi ve süre sınırlarıyla kurgulanması',
        'Şirket içi ihbar (Whistleblowing) sistemleri kurulumu ve bağımsız iç denetim tahkikatı',
        'Toplu işçi çıkışı süreçleri, ikale sözleşmeleri müzakereleri ve arabuluculuk temsili'
      ],
      sectorsServed: ['Finans & Varlık Yönetimi', 'Uluslararası Danışmanlık', 'Havacılık', 'Grup Şirketleri'],
      leadPartnerSlug: 'av-ceyda-yalcin',
      representativeMatters: [
        'Bölge ofisi Türkiye’de bulunan çok uluslu şirketin 45 ülkeyi kapsayan yönetici ESOP planının yerel mevzuata uyumu',
        'Holding bünyesinde gerçekleştirilen kurumsal iç denetim neticesinde mali usulsüzlüklerin tespit ve tasfiyesi',
        'Üretim tesisinde 150 çalışanı kapsayan yeniden yapılanma ve gönüllü ayrılma paketinin ihtilafsız ifası'
      ],
      regulatoryFramework: [
        '4857 sayılı İş Kanunu',
        '6098 sayılı Türk Borçlar Kanunu (Genel Hizmet Sözleşmeleri)',
        '6356 sayılı Sendikalar ve Toplu İş Sözleşmesi Kanunu'
      ],
      icon: 'Users'
    }
  ],

  // 9 Team Members (Ekip)
  teamMembers: [
    {
      slug: 'dr-melis-demirbag',
      name: 'Dr. Melis Demirbağ',
      title: 'Yönetici Ortak (Managing Partner)',
      seniority: 'Yönetici Ortak',
      barAssociation: 'İstanbul Barosu',
      barNumber: '28419',
      admittedYear: 2003,
      languages: ['Türkçe', 'İngilizce', 'Fransızca'],
      practiceSlugs: ['birlesme-ve-devralmalar', 'sermaye-piyasalari-ve-halka-arz'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'Galatasaray Üniversitesi Hukuk Fakültesi', year: 2002 },
        { degree: 'LL.M. Kurumsal Hukuk', institution: 'Université Paris 1 Panthéon-Sorbonne', year: 2004 },
        { degree: 'Doktora (Ticaret Hukuku)', institution: 'İstanbul Üniversitesi', year: 2011 }
      ],
      biography:
        'Dr. Melis Demirbağ, yirmi yılı aşkın mesleki tecrübesiyle sınır ötesi birleşme ve devralmalar, stratejik ortaklıklar ve sermaye piyasası ihraçlarında Türkiye’nin önde gelen kurumsal gruplarına ve uluslararası fonlara liderlik etmektedir. Birçok halka arz konsorsiyumunda ihraççı başhukuk müşaviri olarak görev yapmış, şirketler hukuku üzerine yayımlanmış iki monografisi bulunmaktadır.',
      directEmail: 'm.demirbag@demirbag-law.com',
      phoneExtension: '1101',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Dr. Melis Demirbağ, Yönetici Ortak portresi',
      academicMemberships: ['Galatasaraylılar Derneği', 'IBA (International Bar Association) M&A Komitesi', 'TÜSİAD Hukuk Çalışma Grubu']
    },
    {
      slug: 'av-harun-celebi',
      name: 'Av. Harun Çelebi',
      title: 'Kıdemli Ortak (Senior Partner)',
      seniority: 'Kıdemli Ortak',
      barAssociation: 'İstanbul Barosu',
      barNumber: '24180',
      admittedYear: 1999,
      languages: ['Türkçe', 'İngilizce'],
      practiceSlugs: ['uluslararasi-ticaret-ve-tahkim', 'bankacilik-ve-proje-finansmani'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'Ankara Üniversitesi Hukuk Fakültesi', year: 1998 },
        { degree: 'LL.M. Uluslararası Ticaret ve Tahkim', institution: 'King’s College London', year: 2001 }
      ],
      biography:
        'Uluslararası ticaret uyuşmazlıkları, sınır ötesi inşaat sözleşmeleri ve sendikasyon finansmanı alanlarında 25 yılı aşkın deneyime sahiptir. ICC, ISTAC ve LCIA nezdinde görülen çok sayıda tahkim davasında hakem ve vekil olarak yer almıştır. Enerji ve altyapı sektöründeki FIDIC sözleşmeleri uyuşmazlıklarında stratejik danışmanlık vermektedir.',
      directEmail: 'h.celebi@demirbag-law.com',
      phoneExtension: '1102',
      imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Av. Harun Çelebi, Kıdemli Ortak portresi',
      academicMemberships: ['Chartered Institute of Arbitrators (MCIArb)', 'ISTAC Hakemler Listesi', 'London Court of International Arbitration (LCIA) Kullanıcı Konseyi']
    },
    {
      slug: 'av-banu-selimoglu',
      name: 'Av. Banu Selimoğlu',
      title: 'Ortak Avukat (Partner)',
      seniority: 'Ortak Avukat',
      barAssociation: 'Ankara Barosu & İstanbul Barosu',
      barNumber: '31872',
      admittedYear: 2007,
      languages: ['Türkçe', 'İngilizce'],
      practiceSlugs: ['rekabet-hukuku-ve-sorusturmalar'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'Bilkent Üniversitesi Hukuk Fakültesi', year: 2006 },
        { degree: 'LL.M. Rekabet Hukuku', institution: 'College of Europe (Bruges)', year: 2008 }
      ],
      biography:
        'Kariyerinin ilk yıllarında Rekabet Kurumu bünyesinde uzman olarak görev yapan Banu Selimoğlu, büromuzun Rekabet ve Regülasyon Departmanını yönetmektedir. Çok taraflı kartel soruşturmaları, dağıtım ağı muafiyetleri ve dijital pazarlarda hakim durum incelemelerinde savunma makamını üstlenmektedir.',
      directEmail: 'b.selimoglu@demirbag-law.com',
      phoneExtension: '1103',
      imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Av. Banu Selimoğlu, Rekabet Hukuku Ortak Avukatı portresi',
      academicMemberships: ['Rekabet Hukukçuları Derneği Yönetim Kurulu', 'Bilkent Hukuk Mezunları Derneği']
    },
    {
      slug: 'dr-tolga-karamanoglu',
      name: 'Dr. Tolga Karamanoğlu',
      title: 'Kıdemli Danışman (Senior Counsel - Vergi & Mali Hukuk)',
      seniority: 'Kıdemli Danışman',
      barAssociation: 'İstanbul Barosu',
      barNumber: '29550',
      admittedYear: 2004,
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
      practiceSlugs: ['vergi-hukuku-ve-vergi-davalari'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'İstanbul Üniversitesi Hukuk Fakültesi', year: 2003 },
        { degree: 'Yüksek Lisans (Mali Hukuk)', institution: 'Marmara Üniversitesi', year: 2006 },
        { degree: 'Doktora (Vergi Hukuku)', institution: 'Heidelberg Üniversitesi (Almanya)', year: 2012 }
      ],
      biography:
        'Dr. Tolga Karamanoğlu, uluslararası vergi planlaması, çifte vergilendirmeyi önleme anlaşmaları ve transfer fiyatlandırması uyuşmazlıklarında derin akademik ve pratik birikime sahiptir. Büyük mükellefler nezdindeki vergi denetimlerinde ve Danıştay aşamasındaki davalarda kurumsal müvekkillere stratejik temsil sunar.',
      directEmail: 't.karamanoglu@demirbag-law.com',
      phoneExtension: '1104',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Dr. Tolga Karamanoğlu, Vergi Kıdemli Danışmanı portresi',
      academicMemberships: ['IFA (International Fiscal Association) Türkiye Şubesi', 'Alman-Türk Hukukçular Derneği']
    },
    {
      slug: 'av-zeynep-derya-pekcan',
      name: 'Av. Zeynep Derya Pekcan',
      title: 'Ortak Avukat (Partner)',
      seniority: 'Ortak Avukat',
      barAssociation: 'İstanbul Barosu',
      barNumber: '38941',
      admittedYear: 2011,
      languages: ['Türkçe', 'İngilizce'],
      practiceSlugs: ['teknoloji-ve-veri-koruma', 'fikri-mulkiyet-ve-patent-hukuku'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'Koç Üniversitesi Hukuk Fakültesi', year: 2010 },
        { degree: 'LL.M. Bilişim ve Fikri Mülkiyet Hukuku', institution: 'Queen Mary University of London', year: 2013 }
      ],
      biography:
        'Av. Zeynep Derya Pekcan, yapay zeka sistemlerinin hukuki rejimi, SaaS lisanslamaları, sınır ötesi veri transferi ve patent ihlalleri davalarında teknoloji şirketlerine ve fonlara danışmanlık vermektedir. Kişisel Verileri Koruma Kurulu nezdindeki çok sayıda idari süreçte müvekkillerini başarıyla temsil etmiştir.',
      directEmail: 'z.pekcan@demirbag-law.com',
      phoneExtension: '1105',
      imageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Av. Zeynep Derya Pekcan, Teknoloji ve Fikri Mülkiyet Ortağı portresi',
      academicMemberships: ['IAPP (International Association of Privacy Professionals) CIPP/E Sertifikalı', 'AIPPI Türkiye']
    },
    {
      slug: 'av-murat-sinan-ersoy',
      name: 'Av. Murat Sinan Ersoy',
      title: 'Kıdemli Avukat (Senior Associate)',
      seniority: 'Kıdemli Avukat',
      barAssociation: 'İstanbul Barosu',
      barNumber: '44520',
      admittedYear: 2014,
      languages: ['Türkçe', 'İngilizce'],
      practiceSlugs: ['enerji-madencilik-ve-altyapi', 'bankacilik-ve-proje-finansmani'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'İstanbul Üniversitesi Hukuk Fakültesi', year: 2013 },
        { degree: 'Yüksek Lisans (Enerji Hukuku)', institution: 'Hacettepe Üniversitesi', year: 2016 }
      ],
      biography:
        'Güneş ve rüzgar enerjisi santrali yatırımlarında arazi tahsisleri, EPDK lisans süreçleri ve EPC sözleşmeleri konularında 10 yıllık odaklı tecrübeye sahiptir. Maden sahalarının hukuki durum tespitleri ve rödovans sözleşmelerinin hazırlanmasında proje liderliği yürütmektedir.',
      directEmail: 'm.ersoy@demirbag-law.com',
      phoneExtension: '1106',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Av. Murat Sinan Ersoy, Kıdemli Avukat portresi',
      academicMemberships: ['Enerji Hukuku Araştırma Enstitüsü', 'GÜNDER Mevzuat Komisyonu']
    },
    {
      slug: 'av-ceyda-yalcin',
      name: 'Av. Ceyda Yalçın',
      title: 'Kıdemli Avukat (Senior Associate)',
      seniority: 'Kıdemli Avukat',
      barAssociation: 'İstanbul Barosu',
      barNumber: '49210',
      admittedYear: 2016,
      languages: ['Türkçe', 'İngilizce'],
      practiceSlugs: ['kurumsal-yonetim-ve-is-hukuku'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'TOBB ETÜ Hukuk Fakültesi', year: 2015 },
        { degree: 'LL.M. Özel Hukuk', institution: 'İstanbul Bilgi Üniversitesi', year: 2018 }
      ],
      biography:
        'Üst düzey yönetici sözleşmeleri, şirket içi etik soruşturmaları, işyeri devirleri ve toplu iş hukuku müzakerelerinde uzmanlaşmıştır. Halka açık şirketlerde kurumsal yönetim ilkelerinin uygulanması ve yönetim kurulu kararlarının iptali davalarında aktif rol almaktadır.',
      directEmail: 'c.yalcin@demirbag-law.com',
      phoneExtension: '1107',
      imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Av. Ceyda Yalçın, Kıdemli Avukat portresi',
      academicMemberships: ['Çalışma ve Sosyal Güvenlik Hukuku Türk Milli Komitesi', 'KAGİDER Genç Liderler']
    },
    {
      slug: 'av-kerem-alp-guler',
      name: 'Av. Kerem Alp Güler',
      title: 'Avukat (Associate)',
      seniority: 'Avukat',
      barAssociation: 'İstanbul Barosu',
      barNumber: '58402',
      admittedYear: 2020,
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
      practiceSlugs: ['birlesme-ve-devralmalar', 'sermaye-piyasalari-ve-halka-arz'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'Galatasaray Üniversitesi Hukuk Fakültesi', year: 2019 }
      ],
      biography:
        'Hukuki inceleme (due diligence) süreçlerinin saha koordinasyonu, hisse devir kapanış şartlarının takibi ve ticaret sicil tescil işlemlerini yürütmektedir. Girişim sermayesi fonlarının erken aşama yatırımlarında pay sahipliği sözleşmeleri üzerinde çalışmaktadır.',
      directEmail: 'k.guler@demirbag-law.com',
      phoneExtension: '1108',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Av. Kerem Alp Güler, Avukat portresi',
      academicMemberships: ['Galatasaray Hukuk Mezunları', 'Genç ISTAC']
    },
    {
      slug: 'av-elif-naz-alptekin',
      name: 'Av. Elif Naz Alptekin',
      title: 'Regülasyon Danışmanı (Regulatory Counsel)',
      seniority: 'Regülasyon Danışmanı',
      barAssociation: 'Ankara Barosu',
      barNumber: '42188',
      admittedYear: 2015,
      languages: ['Türkçe', 'İngilizce'],
      practiceSlugs: ['bankacilik-ve-proje-finansmani', 'sermaye-piyasalari-ve-halka-arz', 'teknoloji-ve-veri-koruma'],
      education: [
        { degree: 'Hukuk Lisansı', institution: 'Ankara Üniversitesi Hukuk Fakültesi', year: 2014 },
        { degree: 'Yüksek Lisans (Finansal Regülasyon)', institution: 'Georgetown University Law Center', year: 2018 }
      ],
      biography:
        'Fintech kuruluşları, açık bankacılık sağlayıcıları ve ödeme kuruluşlarının BDDK, TCMB ve MASAK mevzuatına uyum programlarını kurgulamaktadır. Kripto varlık hizmet sağlayıcıları yasal çerçevesi ve kara para aklamayı önleme (AML) politikaları konularında stratejik danışmanlık vermektedir.',
      directEmail: 'e.alptekin@demirbag-law.com',
      phoneExtension: '1109',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Av. Elif Naz Alptekin, Regülasyon Danışmanı portresi',
      academicMemberships: ['Fintech İstanbul Hukuk Kurulu', 'ACAMS (Certified Anti-Money Laundering Specialist)']
    }
  ],

  // 12 Publications (Yayınlar / Makaleler)
  publications: [
    {
      slug: 'ttk-kapsaminda-hissedarlar-sozlesmesinde-on-alim-ve-birlikte-satma-haklari',
      title: 'Türk Ticaret Kanunu Kapsamında Hissedarlar Sözleşmesinde Ön Alım, Birlikte Satma ve Sürükleme Haklarının Hukuki Niteliği',
      excerpt:
        'Hissedarlar Sözleşmesi (SHA) hükümlerinin şirket esas sözleşmesine yansıtılamadığı hallerde borçlar hukuku nisbiliği ile şirketler hukuku ayni etkisi arasındaki uyuşmazlıklar ve cezai şart mekanizmaları.',
      content: [
        'Türk Ticaret Kanunu’nun 480. maddesinde düzenlenen tek borç ilkesi uyarınca, pay sahiplerine esas sözleşmeyle pay bedeli dışında ilave bir edim yüklenememektedir.',
        'Bu sınırlama nedeniyle uygulamada sıklıkla başvurulan ön alım (right of pre-emption), birlikte satma (tag-along) ve sürükleme (drag-along) hakları borçlar hukuku karakterli Hissedarlar Sözleşmelerinde (SHA) kararlaştırılmaktadır.',
        'Çalışmamızda, SHA hükümlerine aykırı pay devirlerinin ayni geçerliliği, devralan üçüncü kişinin iyiniyet savunması ve bu ihlallere karşı kurgulanabilecek cezai şart ile rehne dayalı teminat modelleri Yargıtay 11. Hukuk Dairesi kararları ışığında incelenmektedir.'
      ],
      publishedAt: '2026-08-14',
      category: 'Birleşme & Devralmalar',
      readTimeMinutes: 12,
      authorSlug: 'dr-melis-demirbag',
      tags: ['Türk Ticaret Kanunu', 'M&A', 'Hissedarlar Sözleşmesi', 'Pay Devri', 'Tag-Along'],
      legalCitations: ['6102 sayılı TTK m. 480', 'TTK m. 493', 'Yargıtay 11. HD. 2021/3421 E.'],
      downloadableBriefUrl: '/downloads/briefs/sha-haklari-ve-ttk-analizi.pdf'
    },
    {
      slug: 'istac-ve-icc-tahkiminde-delil-ikamesi-ve-iba-kurallarinin-etkisi',
      title: 'Uluslararası Ticari Tahkimde Delil İkamesi: IBA Kurallarının ISTAC ve ICC Yargılamalarına Pratik Uygulanışı',
      excerpt:
        'Uluslararası Barolar Birliği (IBA) Delil Kurallarının Türk usul hukuku ilkeleriyle karşılaştırılması, belge ibraz talepleri ve tanık beyanlarının çapraz sorgu dinamikleri.',
      content: [
        'Ticari uyuşmazlıkların çözümünde tahkim kurumlarının tercih edilmesindeki en temel unsurlardan biri delil değerlendirmesindeki esneklik ve öngörülebilirliktir.',
        'IBA Delil Kuralları (IBA Rules on the Taking of Evidence in International Arbitration), kıta Avrupası ve Anglo-Sakson usul gelenekleri arasında köprü işlevi görmektedir.',
        'Makalede, ISTAC ve ICC yargılamalarında "Redfern Schedule" mekanizması ile istenebilecek belgelerin sınırları, ticari sır itirazları ve avukat-müvekkil gizlilik ayrıcalığı (legal privilege) Türk hukuku kamu düzeni ölçütleriyle analiz edilmektedir.'
      ],
      publishedAt: '2026-07-28',
      category: 'Uyuşmazlık & Tahkim' as any,
      readTimeMinutes: 15,
      authorSlug: 'av-harun-celebi',
      tags: ['ISTAC', 'ICC', 'Tahkim', 'IBA Rules', 'Delil İkamesi'],
      legalCitations: ['4686 sayılı MTK m. 12', 'IBA Rules 2020 Art. 3', 'ISTAC Tahkim Kuralları m. 27'],
      downloadableBriefUrl: '/downloads/briefs/tahkimde-delil-ve-iba-kurallari.pdf'
    },
    {
      slug: 'dijital-pazarlarda-veri-ustunlugu-ve-rekabet-hukuku-yaklasimi',
      title: 'Dijital Ekosistemlerde Veri Üstünlüğünün Rekabet Hukuku Boyutu: Rekabet Kurulu’nun Güncel Emsal Kararları',
      excerpt:
        'Pazar yerleri ve arama motorlarının kendi yan hizmetlerini öne çıkarma (self-preferencing) uygulamalarının 4054 sayılı Kanun’un 6. maddesi kapsamında değerlendirilmesi.',
      content: [
        'Veri odaklı iş modelleri, geleneksel pazar tanımlarını ve pazar gücü analizlerini dönüştürmüştür.',
        'Rekabet Kurulu’nun son dönem kararlarında, platformların sahip olduğu çok taraflı veri havuzunun giriş engeli teşkil edip etmediği hususu temel inceleme kriteri haline gelmiştir.',
        'Bu bültende, algoritmik ayrımcılık iddiaları, münhasır sözleşme yapıları ve Avrupa Birliği Dijital Pazarlar Yasası (DMA) paralelinde Türk Rekabet Hukukunda öngörülen regülatif adımlar değerlendirilmektedir.'
      ],
      publishedAt: '2026-06-19',
      category: 'Rekabet Hukuku',
      readTimeMinutes: 10,
      authorSlug: 'av-banu-selimoglu',
      tags: ['Rekabet Kurumu', 'Dijital Pazarlar', 'Hakim Durum', 'Self-Preferencing', 'Algoritma'],
      legalCitations: ['4054 sayılı Kanun m. 6', 'Rekabet Kurulu 21-51/712-354 sayılı Kararı'],
      downloadableBriefUrl: '/downloads/briefs/dijital-pazarlarda-rekabet.pdf'
    },
    {
      slug: 'yapay-zeka-egitim-verisinde-fikri-mulkiyet-ve-telif-hakki-sinirlari',
      title: 'Üretken Yapay Zeka Modellerinin Eğitiminde Kullanılan İçeriklerin Fikir ve Sanat Eserleri Kanunu Açısından Durumu',
      excerpt:
        'Metin ve veri madenciliği (TDM) istisnasının Türk Telif Hukuku mevzuatındaki karşılığı, telif korumalı eserlerin yapay zeka eğitiminde izinsiz kullanımı ve lisanslama modelleri.',
      content: [
        'Büyük dil modellerinin ve görsel üretim sistemlerinin trilyonlarca parametre içeren veri kümeleriyle eğitilmesi, fikri mülkiyet hukukunda yeni bir dönemi başlatmıştır.',
        '5846 sayılı FSEK kapsamında eser sahiplerinin çoğaltma ve işleme haklarının sınırları, AB Telif Hakları Direktifi (2019/790) m. 4’te yer alan TDM istisnası ile mukayeseli olarak tartışılmaktadır.',
        'Kurumsal şirketlerin yapay zeka çıktılarında fikri mülkiyet tecavüzü riskini bertaraf etmek adına tedarik sözleşmelerine eklemesi gereken teknik taahhütler ve tazminat klozetleri sunulmaktadır.'
      ],
      publishedAt: '2026-05-30',
      category: 'Veri Koruma & Yapay Zeka',
      readTimeMinutes: 14,
      authorSlug: 'av-zeynep-derya-pekcan',
      tags: ['Yapay Zeka', 'FSEK', 'Fikri Mülkiyet', 'Telif', 'Veri Madenciliği'],
      legalCitations: ['5846 sayılı FSEK m. 21-22', 'EU Copyright Directive 2019/790 Art. 4'],
      downloadableBriefUrl: '/downloads/briefs/ai-telif-hukuku-raporu.pdf'
    },
    {
      slug: 'cok-uluslu-sirketlerde-transfer-fiyatlandirmasi-ve-emsallere-uygunluk',
      title: 'Çok Uluslu Şirketlerde Gayri Maddi Hak Transfer Fiyatlandırması ve OECD DEMPE Analizinin Vergi Yargısındaki İzdüşümü',
      excerpt:
        'Grup içi lisans, yönetim gideri ve teknik destek ödemelerinin Vergi Usul Kanunu ve Kurumlar Vergisi Kanunu m. 13 çerçevesinde eleştirilmesi karşısında savunma stratejileri.',
      content: [
        'Vergi İncelemelerinde gayri maddi hakların geliştirilmesi, iyileştirilmesi, korunması ve ticarileştirilmesi (DEMPE) fonksiyonları en kritik tarhiyat gerekçesini oluşturmaktadır.',
        'Hazine ve Maliye Bakanlığı Vergi Denetim Kurulu’nun emsal bedel araştırmalarında benimsediği yöntemler ile mükellefin ekonomik analiz raporları arasındaki çelişkiler ele alınmaktadır.',
        'Danıştay Vergi Dava Daireleri Kurulu’nun güncel kararları ışığında, örtülü kazanç dağıtımı iddialarına karşı hazırlanması zorunlu belge standartları incelenmektedir.'
      ],
      publishedAt: '2026-05-11',
      category: 'Vergi & Uyuşmazlık',
      readTimeMinutes: 16,
      authorSlug: 'dr-tolga-karamanoglu',
      tags: ['Transfer Fiyatlandırması', 'Vergi Denetimi', 'OECD DEMPE', 'Kurumlar Vergisi', 'Danıştay'],
      legalCitations: ['5520 sayılı KVK m. 13', '1 Seri No.lu KVK Genel Tebliği', 'Danıştay VDDK 2022/814 E.'],
      downloadableBriefUrl: '/downloads/briefs/transfer-fiyatlandirmasi-savunma.pdf'
    },
    {
      slug: 'avrupa-birligi-skdm-mevzuati-ve-turk-ihracatcisina-hukuki-etkileri',
      title: 'Avrupa Birliği Sınırda Karbon Düzenleme Mekanizması (SKDM) ve Türk İhracatçısının Tedarik Sözleşmelerine Entegrasyonu',
      excerpt:
        'Demir-çelik, alüminyum ve çimento sektörlerinde gömülü emisyon raporlama zorunluluğu, sera gazı hesaplama metodolojileri ve ihracat sözleşmelerine eklenecek iklim taahhütleri.',
      content: [
        'AB 2023/956 sayılı Tüzük uyarınca hayata geçirilen SKDM (CBAM), Türkiye’nin Gümrük Birliği kapsamındaki ihracatçı sanayi kuruluşlarını doğrudan etkilemektedir.',
        'Geçiş döneminde veri doğrulama ve raporlama eksikliklerinin doğurabileceği cezai yaptırımlar ile 2026 sonrası mali yükümlülüklerin ticari sözleşmelere yansıtılması gerekmektedir.',
        'Makalede, alt tedarikçilerden karbon izleme verisi temin etme yükümlülüğünün sözleşmesel cezai şart ve fesih haklarıyla donatılmasına yönelik hukuki şablonlar sunulmaktadır.'
      ],
      publishedAt: '2026-04-22',
      category: 'Enerji & İklim Mevzuatı',
      readTimeMinutes: 11,
      authorSlug: 'av-murat-sinan-ersoy',
      tags: ['SKDM', 'Yeşil Mutabakat', 'İhracat Hukuku', 'Karbon Emisyonu', 'EPC'],
      legalCitations: ['AB 2023/956 sayılı Tüzük', 'İklim Kanunu Taslağı', 'Gümrük Birliği Kararı 1/95'],
      downloadableBriefUrl: '/downloads/briefs/skdm-ihracat-sozlesmeleri.pdf'
    },
    {
      slug: 'halka-acik-ortakliklarda-icsel-bilgiler-ve-piyasa-bozucu-eylemler',
      title: 'Halka Açık Ortaklıklarda İçsel Bilgilerin Kamuya Açıklanmasının Ertelenmesi ve Piyasa Bozucu Eylemler Tebliği Değerlendirmesi',
      excerpt:
        'SPK Özel Durumlar Tebliği m. 6 uyarınca yönetim kurulu erteleme kararlarının hukuki geçerlilik şartları ve yöneticilerin cezai sorumluluk sınırları.',
      content: [
        'Birleşme müzakereleri veya finansman görüşmeleri gibi kritik kurumsal süreçlerde şirket menfaatlerinin korunması için içsel bilginin kamuya açıklanmasının ertelenmesi mümkündür.',
        'Ancak erteleme kararının gizlilik tedbirleri sağlanamadan ifşa olması veya piyasada olağandışı fiyat/miktar hareketliliği oluşması durumunda derhal açıklama yapma yükümlülüğü doğmaktadır.',
        'SPK’nın V-104.1 sayılı Tebliği kapsamında içeriden öğrenenlerin ticareti (insider trading) suçlamalarına karşı yönetim kurullarınca alınması gereken usuli önlemler ele alınmaktadır.'
      ],
      publishedAt: '2026-03-18',
      category: 'Sermaye Piyasaları',
      readTimeMinutes: 13,
      authorSlug: 'dr-melis-demirbag',
      tags: ['SPK', 'İçsel Bilgi', 'Özel Durumlar', 'Borsa İstanbul', 'Kamuyu Aydınlatma'],
      legalCitations: ['6362 sayılı SPKn m. 106-107', 'Özel Durumlar Tebliği (II-15.1) m. 6'],
      downloadableBriefUrl: '/downloads/briefs/spk-icsel-bilgi-erteleme.pdf'
    },
    {
      slug: 'fintech-sektorunde-acik-bankacilik-ve-kisisel-veri-guvenligi',
      title: 'Fintech ve Ödeme Sistemlerinde Açık Bankacılık Hizmetlerinin Hukuki Altyapısı ve TCMB Uyum Süreçleri',
      excerpt:
        'Ödeme Emri Başlatma (ÖEBHS) ve Hesap Bilgisi Sağlama (HBHS) hizmetlerinde API güvenliği, müşteri açık rızası ve BKM Geçit mimarisinde tarafların sorumlulukları.',
      content: [
        '6493 sayılı Kanun ve ilgili ikincil mevzuat, bankalar ile üçüncü taraf lisanslı ödeme hizmeti sağlayıcıları (AISP/PISP) arasındaki veri paylaşımını zorunlu kılmıştır.',
        'Müşteri finansal verilerinin paylaşımında güçlü kimlik doğrulama (SCA) gerekliliği ile KVKK m. 8-9 sınır ötesi aktarım kurallarının harmonizasyonu zorunludur.',
        'Platform katılımcılarının sistem arızalarından, yetkisiz işlemlerden ve siber ihlallerden doğan müteselsil sorumluluk paylaşımları sözleşmesel düzlemde açıklığa kavuşturulmaktadır.'
      ],
      publishedAt: '2026-02-27',
      category: 'Veri Koruma & Yapay Zeka',
      readTimeMinutes: 12,
      authorSlug: 'av-elif-naz-alptekin',
      tags: ['Fintech', 'Açık Bankacılık', 'TCMB', '6493 sayılı Kanun', 'API Güvenliği'],
      legalCitations: ['6493 sayılı Kanun m. 12', 'Ödeme Hizmetleri Yönetmeliği m. 44', 'KVKK m. 12'],
      downloadableBriefUrl: '/downloads/briefs/fintech-acik-bankacilik-raporu.pdf'
    },
    {
      slug: 'ust-duzey-yoneticilerin-rekabet-etmeme-taahhutlerinin-sinirlari',
      title: 'İş Kanunu ve Borçlar Kanunu Işığında C-Level Yöneticilerin Rekabet Etmeme Borcu ve Coğrafi Sınırlandırma Kriterleri',
      excerpt:
        'Türk Borçlar Kanunu m. 444-447 hükümleri uyarınca rekabet yasağı taahhütlerinin geçerlilik şartları, karşı edim (gardırop tazminatı) zorunluluğu ve Yargıtay’ın ölçülülük denetimi.',
      content: [
        'Şirketlerin stratejik bilgilerine erişimi bulunan genel müdür, CFO veya CTO pozisyonundaki çalışanlarla akdedilen rekabet etmeme taahhütleri sıklıkla yargı önüne taşınmaktadır.',
        'Yargıtay içtihatlarında, çalışanın ekonomik geleceğini hakkaniyete aykırı biçimde tehlikeye sokan, süre (en fazla iki yıl), yer ve konu bakımından sınırsız kılınan taahhütler batıl sayılmaktadır.',
        'Anglo-Sakson hukukundaki garden leave (ücretli bekleme) uygulamalarının Türk hukuku bağlamında uygulanabilirliği ve geçerli bir cezai şartın tenkisi kriterleri değerlendirilmektedir.'
      ],
      publishedAt: '2026-01-30',
      category: 'Birleşme & Devralmalar',
      readTimeMinutes: 9,
      authorSlug: 'av-ceyda-yalcin',
      tags: ['İş Hukuku', 'Rekabet Yasağı', 'Yönetici Sözleşmeleri', 'TBK m. 444', 'C-Level'],
      legalCitations: ['6098 sayılı TBK m. 444-447', 'Yargıtay 9. HD. 2020/6114 E.'],
      downloadableBriefUrl: '/downloads/briefs/yonetici-rekabet-etmeme-analizi.pdf'
    },
    {
      slug: 'yenilenebilir-enerji-projelerinde-cagri-mektubu-ve-kapasite-tahsisi',
      title: 'Lisanssız Elektrik Üretiminde Madde 5/1-h Kapsamında Çağrı Mektubu İptalleri ve İdari Yargı Yolları',
      excerpt:
        'EPDK Elektrik Piyasasında Lisanssız Elektrik Üretim Yönetmeliği uyarınca bağlantı kapasitesi tahsisinde yarışma usulleri ve idarenin takdir yetkisinin Danıştay denetimi.',
      content: [
        'Sanayi tesislerinin enerji maliyetlerini optimize etmek amacıyla kurduğu öz tüketim tesislerinde en kritik eşik şebeke işletmecisinden (TEİAŞ/EDAŞ) çağrı mektubu teminidir.',
        'Trafo merkezi kapasite yetersizliği veya öncelik sırasının hatalı belirlenmesi sebebiyle tesis edilen ret işlemlerine karşı yürütmenin durdurulması ve iptal davası mekanizmaları açıklanmaktadır.',
        'Ayrıca bağlantı anlaşması imzalanmasından sonra süre uzatım taleplerinin mücbir sebep ve kamusal gecikmeler yönünden hukuki dayanakları incelenmektedir.'
      ],
      publishedAt: '2025-12-14',
      category: 'Enerji & İklim Mevzuatı',
      readTimeMinutes: 13,
      authorSlug: 'av-murat-sinan-ersoy',
      tags: ['Enerji', 'EPDK', 'Lisanssız Elektrik', 'Çağrı Mektubu', 'İdari Dava'],
      legalCitations: ['6446 sayılı Kanun m. 14', 'Lisanssız Elektrik Üretim Yönetmeliği m. 7', 'Danıştay 13. Dairesi 2022/1940 E.'],
      downloadableBriefUrl: '/downloads/briefs/enerji-cagri-mektubu-davalari.pdf'
    },
    {
      slug: 'anonim-sirketlerde-genel-kurul-kararlarinin-butlanı-ve-iptali',
      title: 'Anonim Ortaklıklarda Genel Kurul Kararlarının İptali ve Butlanı Davalarında Usul ve Temsil Stratejileri',
      excerpt:
        'TTK m. 445 ve devamı uyarınca muhalefet şerhinin usulüne uygun düşülmesi, dürüstlük kuralına aykırılık ve pay sahibinin bilgi alma hakkının kısıtlanması halleri.',
      content: [
        'Hissedarlar arasındaki ihtilaflarda genel kurul kararlarının iptali davası en etkili yargısal denetim aracıdır.',
        'Dava açma ehliyeti için toplantıda hazır bulunup karara olumsuz oy vererek muhalefetini tutanağa geçirtme şartı katı usuli kurallara bağlanmıştır.',
        'Sermaye artırımı, kar payı dağıtılmaması veya yönetim kurulunun ibrası kararlarında azınlık pay sahiplerinin haklarının korunması amacıyla ihtiyati tedbir taleplerinin kurgulanması tartışılmaktadır.'
      ],
      publishedAt: '2025-11-20',
      category: 'Birleşme & Devralmalar',
      readTimeMinutes: 14,
      authorSlug: 'av-kerem-alp-guler',
      tags: ['Anonim Şirket', 'Genel Kurul', 'TTK m. 445', 'İptal Davası', 'Azınlık Hakları'],
      legalCitations: ['6102 sayılı TTK m. 445-451', 'Yargıtay 11. HD. 2019/5280 E.'],
      downloadableBriefUrl: '/downloads/briefs/genel-kurul-iptal-davalari.pdf'
    },
    {
      slug: 'vergi-usul-kanunu-kapsaminda-kripto-varliklarin-muhasebelemesi-ve-degerlemesi',
      title: 'Türk Vergi Mevzuatında Kripto Varlıkların Hukuki Niteliği, Değerleme İlkeleri ve Kurumsal Beyan Esasları',
      excerpt:
        'SPK düzenlemesi sonrasında kripto varlık hizmet sağlayıcılarının mali yükümlülükleri, bilançoda gayri maddi hak veya menkul kıymet olarak kaydı ve KDV istisnası durumu.',
      content: [
        'Sermaye Piyasası Kanunu’nda yapılan 2024 yılı değişiklikleriyle kripto varlıklar ilk kez yasal bir tanıma kavuşmuş, platformlar SPK lisanslamasına tabi kılınmıştır.',
        'Ancak Vergi Usul Kanunu ve Gelir Vergisi Kanunu yönünden varlığın emtia, menkul kıymet veya gayri maddi hak olarak nitelendirilmesine dair Maliye idaresinin yaklaşımı analiz edilmektedir.',
        'Kurumsal şirketlerin hazine yönetiminde kripto varlık bulundurması halinde dönem sonu değerleme farklarının kurum kazancına etkisi ve stopaj rejimi etraflıca incelenmektedir.'
      ],
      publishedAt: '2025-10-18',
      category: 'Vergi & Uyuşmazlık',
      readTimeMinutes: 12,
      authorSlug: 'dr-tolga-karamanoglu',
      tags: ['Kripto Varlık', 'Vergi Hukuku', 'SPK', 'VUK Değerleme', 'Kurumlar Vergisi'],
      legalCitations: ['7518 sayılı Kanun (SPK Değişiklikleri)', '213 sayılı VUK m. 279', 'GVK m. Geçici 67'],
      downloadableBriefUrl: '/downloads/briefs/kripto-vergi-ve-degerleme.pdf'
    }
  ],

  offices: [
    {
      city: 'İstanbul',
      name: 'Merkez Ofis - Levent',
      addressLine1: 'Büyükdere Caddesi, No: 185',
      addressLine2: 'Maya Akar Center Kat: 24, Levent / Beşiktaş',
      postalCode: '34394',
      telephone: '+90 (212) 385 44 00',
      facsimile: '+90 (212) 385 44 01',
      email: 'istanbul@demirbag-law.com',
      workingHours: 'Hafta içi 08:30 - 18:30',
      coordinates: { lat: 41.0772, lng: 29.0125 }
    },
    {
      city: 'Ankara',
      name: 'Regülasyon ve İdari İşler İrtibat Ofisi',
      addressLine1: 'Turan Güneş Bulvarı, No: 106',
      addressLine2: 'Güneş Kule Kat: 12, Çankaya',
      postalCode: '06550',
      telephone: '+90 (312) 440 22 50',
      facsimile: '+90 (312) 440 22 51',
      email: 'ankara@demirbag-law.com',
      workingHours: 'Hafta içi 09:00 - 18:00',
      coordinates: { lat: 39.8654, lng: 32.8421 }
    }
  ],

  consultationSteps: [
    {
      stepNumber: '01',
      title: 'Çıkar Çatışması (Conflict of Interest) Taraması',
      description:
        'Tarafımıza iletilen kurumsal kimlik ve muhatap taraf bilgileri bağımsız iç veritabanımızda taranarak mevcut müvekkillerimizle herhangi bir menfaat çatışması bulunmadığı tespit edilir.',
      safeguard: 'Baro Meslek Kuralları m. 35 ve uluslararası bağımsızlık standartları'
    },
    {
      stepNumber: '02',
      title: 'Ön Değerlendirme ve Gizlilik Sözleşmesi (NDA)',
      description:
        'Uyuşmazlık veya planlanan ticari işlemle ilgili hassas ticari verilerin paylaşılmasından önce karşılıklı bağlayıcı iki taraflı gizlilik protokolü tanzim edilir.',
      safeguard: 'Yazılı NDA taahhüdü ve avukatlık meslek sırrı koruması'
    },
    {
      stepNumber: '03',
      title: 'Kapsam Tanımı ve Ücretlendirme Modeli',
      description:
        'Hukuki hizmetin kapsamı; işleme dayalı sabit ücret (fixed-fee), kademeli başarı primi (success fee) veya saatlik danışmanlık kotası şeklinde şeffaf bir angajman mektubuyla belirlenir.',
      safeguard: 'Şeffaf angajman mektubu ve aylık detaylı zaman dökümü (timesheet)'
    },
    {
      stepNumber: '04',
      title: 'Çalışma Ekibinin Atanması ve Yürütme',
      description:
        'Süreç için bir sorumlu ortak (partner) ve ilgili sektörel uzmanlığa sahip kıdemli avukatlardan oluşan özel çalışma grubu atanarak müvekkille doğrudan iletişim kanalı kurulur.',
      safeguard: 'Haftalık düzenli durum raporlaması ve doğrudan ortak avukat erişimi'
    }
  ]
};

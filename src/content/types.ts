/**
 * Avenox Çoklu Site Vitrini - İçerik Modeli Tip Tanımları
 * 
 * Bu dosya 12 sektör sitesi, editoryal yayınlar, zengin sayfa bölümleri,
 * katalog öğeleri, navigasyon, fiyatlandırma, filtreler ve takvim modellerini içerir.
 */

// ============================================================================
// 1. GÖRSEL SİSTEMLER VE SEKTÖR TAXONOMİSİ
// ============================================================================

export type VisualSystemId =
  | 'violet-signal'  // 1. Kozmik gece, derinlik, lüks, yarım ton dokular
  | 'raycast'        // 2. Teknik kesinlik, komut paleti ritmi, net cam efektleri
  | 'resend'         // 3. Teknik editoryal, bol beyaz boşluk, kesin hatlar
  | 'linear'         // 4. Ürün zarafeti, disiplinli grid, sessiz gradyanlar
  | 'original-print' // 5. Sıcak modernist, asimetrik editoryal, mürekkep & fildişi
  | 'premium-pro';   // 6. Galeri sınıfı, zamansız tipografi, müze benzeri sadelik

export type SectorId =
  | 'editorial'    // Dergi, Araştırma
  | 'hospitality'  // Restoran, Doğa Oteli, Keşif Seyahati
  | 'real-estate'  // Mimari Emlak & Taşınmaz
  | 'retail'       // Parfüm, Gitar, Nadir Kitap
  | 'corporate'    // Hukuk, B2B SaaS, Diş Kliniği
  | 'wellness';    // Fitness & Beden Atölyesi

// ============================================================================
// 2. MEDYA VE GÖRSEL TİPLERİ
// ============================================================================

export interface ImageMedia {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  photographer?: string;
  width?: number;
  height?: number;
}

// ============================================================================
// 3. NAVİGASYON VE ALT BİLGİ YAPISI
// ============================================================================

export interface NavAction {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
  isExternal?: boolean;
  children?: NavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SiteNavigation {
  navItems: NavItem[];
  secondaryItems?: NavItem[];
  actions?: NavAction[];
  footerSections: FooterSection[];
}

// ============================================================================
// 4. FİYATLANDIRMA VE PARA BİRİMİ
// ============================================================================

export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';

export interface PricePoint {
  amount: number;
  currency: Currency;
  period?: 'aylık' | 'yıllık' | 'gecelik' | 'seferlik' | 'saatlik' | 'seanslık';
  qualifier?: 'başlayan fiyatlarla' | 'kişi başı' | 'kdv dahil' | 'sabit' | 'özel teklif';
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: PricePoint;
  popular?: boolean;
  features: string[];
  actionText: string;
  actionHref: string;
  limitations?: string[];
  footnote?: string;
}

// ============================================================================
// 5. ZENGİN SAYFA BÖLÜMLERİ (RICH PAGE SECTIONS)
// ============================================================================

export interface HeroSection {
  type: 'hero';
  headline: string;
  kicker?: string;
  lede: string;
  primaryAction?: NavAction;
  secondaryAction?: NavAction;
  media?: ImageMedia;
  stats?: Array<{ label: string; value: string; unit?: string }>;
}

export interface TextEditorialSection {
  type: 'editorial';
  title: string;
  subtitle?: string;
  paragraphs: string[];
  pullQuote?: {
    text: string;
    author?: string;
    role?: string;
  };
}

export interface FeatureGridSection {
  type: 'feature-grid';
  title: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  items: Array<{
    title: string;
    description: string;
    tag?: string;
    icon?: string;
    metric?: string;
  }>;
}

export interface CatalogPreviewSection {
  type: 'catalog-preview';
  title: string;
  subtitle?: string;
  categoryFilter?: string;
  limit?: number;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export interface StatsSection {
  type: 'stats';
  title?: string;
  kicker?: string;
  metrics: Array<{
    label: string;
    value: string;
    detail?: string;
  }>;
}

export interface QuoteSection {
  type: 'quote';
  quote: string;
  author: string;
  role: string;
  affiliation?: string;
  avatarUrl?: string;
}

export interface TimelineSection {
  type: 'timeline';
  title: string;
  subtitle?: string;
  steps: Array<{
    stepNumber: string;
    title: string;
    description: string;
    date?: string;
  }>;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSection {
  type: 'faq';
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

export interface GallerySection {
  type: 'gallery';
  title?: string;
  subtitle?: string;
  images: ImageMedia[];
}

export interface CTASection {
  type: 'cta';
  title: string;
  description: string;
  primaryAction: NavAction;
  secondaryAction?: NavAction;
  badge?: string;
}

export type PageSection =
  | HeroSection
  | TextEditorialSection
  | FeatureGridSection
  | CatalogPreviewSection
  | StatsSection
  | QuoteSection
  | TimelineSection
  | FAQSection
  | GallerySection
  | CTASection;

// ============================================================================
// 6. SİTE SAYFASI VE SİTE TANIMI (SITE DEFINITION)
// ============================================================================

export interface SitePage {
  slug: string;
  path: string;
  title: string;
  navTitle?: string;
  description: string;
  layoutType?: 'standard' | 'catalog' | 'detail' | 'editorial' | 'split' | 'archive' | 'form';
  sections?: PageSection[];
}

export interface CatalogConfiguration {
  enabled: boolean;
  entityName: string;
  entityNamePlural: string;
  itemCountTarget: number;
  filterKeys: string[];
  searchPlaceholder: string;
  sortOptions: Array<{ label: string; value: string }>;
  defaultSort?: string;
}

export interface ContactInfo {
  address: string;
  district: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  workingHours?: string;
  coordinates?: { lat: number; lng: number };
  mapNote?: string;
}

export interface SiteDefinition {
  id: string;
  slug: string;
  brandName: string;
  tagline: string;
  description: string;
  sectorId: SectorId;
  sectorLabel: string;
  defaultSystemId: VisualSystemId;
  accentColorHint?: string;
  routes: {
    home: string;
    catalog?: string;
    itemDetailPrefix?: string;
    contact?: string;
    [key: string]: string | undefined;
  };
  navigation: SiteNavigation;
  pages: SitePage[]; // En az 4 sayfa
  catalogConfig?: CatalogConfiguration;
  contactInfo: ContactInfo;
  socialLinks?: Array<{ platform: string; url: string; label: string }>;
  badgeText?: string;
  disclaimerText?: string; // "Demo site"
}

// ============================================================================
// 7. FİLTRELER VE ARAMA
// ============================================================================

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterDefinition {
  key: string;
  label: string;
  type: 'select' | 'checkbox' | 'range' | 'radio' | 'tag';
  options: FilterOption[];
  defaultValue?: string | string[];
}

// ============================================================================
// 8. KİŞİLER VE ROLLER (PEOPLE & AUTHORS)
// ============================================================================

export interface Person {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: ImageMedia;
  email?: string;
  socials?: Array<{ platform: string; url: string }>;
}

export interface JournalAuthor extends Person {
  academicTitle?: string;
  affiliation: string;
  specialties: string[];
  orcid?: string;
  articleCount?: number;
  publishedWorks?: string[];
}

export interface TeamMember extends Person {
  department: string;
  admissionYear?: number;
  specializationAreas: string[];
  barNumber?: string;
}

export interface Clinician extends Person {
  title: string;
  diplomaNumber?: string;
  education: string[];
  clinicalInterests: string[];
  languagesSpoken: string[];
}

export interface Coach extends Person {
  certifications: string[];
  focusDisciplines: string[];
  weeklyClassCount: number;
}

export interface ExpeditionGuide extends Person {
  regions: string[];
  spokenLanguages: string[];
  expeditionExperienceYears: number;
  certifications: string[];
}

// ============================================================================
// 9. DERS VE ETKİNLİK TAKVİMİ (SCHEDULES)
// ============================================================================

export type DayOfWeek = 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma' | 'Cumartesi' | 'Pazar';

export interface ScheduleItem {
  id: string;
  title: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  instructorOrLead?: string;
  locationOrRoom?: string;
  capacity?: number;
  intensityLevel?: 'Hafif' | 'Orta' | 'Yüksek' | 'İleri';
  discipline?: string;
}

export interface WeeklySchedule {
  title: string;
  timezone: string;
  items: ScheduleItem[];
}

// ============================================================================
// 10. KATALOG TEMEL TİPİ VE SEKTÖR ÖZEL MODELLERİ
// ============================================================================

export interface CatalogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  price?: PricePoint;
  description: string;
  attributes: Record<string, string | number | boolean | string[]>;
  tags: string[];
  image: ImageMedia;
  isAvailable?: boolean;
  isFeatured?: boolean;
}

// Restoran Menü Öğesi (64 öğe için)
export interface MenuItem extends CatalogItem {
  course: 'Başlangıç' | 'Ana Yemek' | 'Ara Sıcak' | 'Tadım Menüsü' | 'Tatlı' | 'Kadeh Seçkisi';
  origin?: string;
  allergens?: string[];
  pairingRecommendation?: string;
  preparationStyle?: string;
  dietaryBadges?: Array<'Vejetaryen' | 'Glütensiz' | 'Deniz Mahsulü' | 'Yerel Üretim'>;
}

// Emlak & Taşınmaz İlanı (72 mülk için)
export interface PropertyListing extends CatalogItem {
  location: {
    neighborhood: string;
    district: string;
    city: string;
    country?: string;
  };
  architecturalStyle: string;
  grossAreaM2: number;
  netAreaM2: number;
  roomCount: string;
  yearBuilt: number;
  heatingType: string;
  floor: string;
  buildingFloors: number;
  landscapeOrientation: string;
  features: string[];
}

// Bağımsız Parfüm (48 koku için)
export interface PerfumeItem extends CatalogItem {
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Eau de Toilette' | 'Attar';
  volumeMl: number;
  olfactiveFamily: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  season: string[];
  sillage: 'Samimi' | 'Orta' | 'Güçlü' | 'Kalıcı İz';
  releaseYear: number;
}

// Gitar Modeli (64 model için)
export interface GuitarItem extends CatalogItem {
  maker: string;
  guitarType: 'Akustik' | 'Klasik' | 'Elektro' | 'Bas' | 'Semi-Hollow' | 'Özel Luthier Yapımı';
  bodyWood: string;
  topWood?: string;
  neckWood: string;
  fretboardWood: string;
  pickupConfiguration?: string;
  handedness: 'Sağ' | 'Sol';
  scaleLengthMm: number;
  caseIncluded: boolean;
  condition: 'Sıfır' | 'Kondisyon Mükemmel' | 'Vintage Atölye Bakımlı';
}

// Nadir Kitap & Baskı (54 katalog öğesi için)
export interface RareBookItem extends CatalogItem {
  authorOrArtist: string;
  publicationYear: number;
  publisherOrPress: string;
  language: string;
  bindingType: string;
  conditionGrade: 'A+' | 'A' | 'B+' | 'B';
  provenance?: string;
  firstEdition: boolean;
  signedByAuthor: boolean;
  pageCount: number;
  dimensionsCm: string;
  preservationNotes?: string;
}

// Özel Keşif Rotaları (36 rota için)
export interface TravelJourney extends CatalogItem {
  durationDays: number;
  difficultyLevel: 'Sakin' | 'Dengeli' | 'Keşifçi' | 'Zorlu';
  maxGroupSize: number;
  departureSeason: string[];
  destinations: string[];
  includedServices: string[];
  routeHighlights: string[];
  recommendedGear: string[];
  altitudeMaxM?: number;
}

// Butik Otel Oda & Deneyimleri
export interface HotelRoom extends CatalogItem {
  roomType: 'Süit' | 'Taş Ev' | 'Villa' | 'Pavilyon';
  maxGuests: number;
  view: string;
  bedType: string;
  sizeM2: number;
  amenities: string[];
  hasFireplace: boolean;
  hasPrivateThermalBath: boolean;
}

export interface HotelExperience {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  duration: string;
  season: string;
  description: string;
  guideOrLead: string;
  image: ImageMedia;
}

// ============================================================================
// 11. KURUMSAL HİZMETLER VE B2B SAAS
// ============================================================================

export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  shortSummary: string;
  fullDescription: string;
  keyCapabilities: string[];
  representativeMatters: string[];
  leadPartnerId: string;
}

export interface LegalPublication {
  id: string;
  slug: string;
  title: string;
  date: string;
  authors: string[];
  summary: string;
  category: string;
  topics: string[];
  downloadUrl?: string;
}

export interface SaaSFeatureModule {
  id: string;
  slug: string;
  title: string;
  badge?: string;
  summary: string;
  capabilities: string[];
  metricsImpact?: string;
  architectureDetails?: string;
}

export interface SaaSUseCase {
  id: string;
  slug: string;
  title: string;
  targetPersona: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export interface SaaSChangelogEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  type: 'major' | 'feature' | 'improvement' | 'fix';
  summary: string;
  highlights: string[];
}

export interface DentalTreatment {
  id: string;
  slug: string;
  title: string;
  category: string;
  durationMinutes: number;
  recoveryTime: string;
  procedureSummary: string;
  candidacy: string[];
  technologiesUsed: string[];
  aftercareGuidelines: string[];
}

export interface FitnessProgram {
  id: string;
  slug: string;
  title: string;
  intensity: 'Temel' | 'Orta' | 'Yüksek' | 'Atletik';
  durationWeeks: number;
  sessionDurationMinutes: number;
  goals: string[];
  prerequisites: string;
  weeklyFrequency: number;
}

// ============================================================================
// 12. DERGİ VE ARAŞTIRMA (JOURNAL & FORUM)
// ============================================================================

export interface JournalCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  colorCode: string;
  orderIndex: number;
}

export interface ArchiveIssue {
  id: string;
  volume: number;
  issue: number;
  title: string;
  period: string;
  year: number;
  publishDate: string;
  coverImage: ImageMedia;
  editorialNote: string;
  themeFocus: string;
  doi: string;
  articleCount: number;
  pageCount: number;
  downloadFileSize: string;
}

export interface ArticleCitation {
  id: string;
  citationText: string;
  doi?: string;
}

export interface ArticleCallout {
  type: 'note' | 'citation' | 'methodology' | 'data';
  text: string;
  source?: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  callout?: ArticleCallout;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  abstract: string;
  categoryId: string;
  categoryName: string;
  authorIds: string[];
  publishDate: string;
  readTimeMinutes: number;
  doi: string;
  volume: number;
  issue: number;
  featured: boolean;
  tags: string[];
  coverImage: ImageMedia;
  sections: ArticleSection[];
  keyFindings?: string[];
  citations?: ArticleCitation[];
  metrics: {
    downloads: number;
    views: number;
    citations: number;
  };
}

export interface ForumReply {
  id: string;
  author: {
    name: string;
    role: string;
    affiliation: string;
    avatarUrl: string;
  };
  createdAt: string;
  content: string;
  likeCount: number;
  isAcceptedAnswer?: boolean;
}

export interface ForumThread {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  categoryName: string;
  author: {
    id: string;
    name: string;
    role: string;
    affiliation: string;
    avatarUrl: string;
  };
  createdAt: string;
  pinned?: boolean;
  solved?: boolean;
  tags: string[];
  viewCount: number;
  replyCount: number;
  likeCount: number;
  initialPost: {
    content: string;
    codeSnippet?: string;
    attachments?: string[];
  };
  replies: ForumReply[];
}

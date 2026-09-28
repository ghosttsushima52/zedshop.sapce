import { articles, forumThreads } from '../content/journal';
import { restaurantMenuItems } from '../content/restaurant';
import { propertyListings } from '../content/realEstate';
import { HOTEL_EXPERIENCES, HOTEL_ROOMS } from '../content/hotel';
import { perfumes } from '../content/perfume';
import { guitars } from '../content/guitars';
import { lawFirmData } from '../content/law';
import { saasPlatformData } from '../content/saas';
import { dentalClinicData } from '../content/dental';
import { fitnessClubData } from '../content/fitness';
import { RARE_BOOKS_CATALOG } from '../content/rareBooks';
import { EXPEDITION_JOURNEYS } from '../content/travel';

export type ShowcaseSiteId = 'orbital-journal' | 'restaurant' | 'real-estate' | 'hotel' | 'perfume' | 'guitar' | 'law' | 'saas' | 'dental' | 'fitness' | 'rare-books' | 'travel';

export interface ShowcaseSite {
  id: ShowcaseSiteId;
  order: number;
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  pages: Array<{ slug: string; label: string }>;
  details: string[];
  inventoryLabel?: string;
}

export const SHOWCASE_SITES: ShowcaseSite[] = [
  { id: 'orbital-journal', order: 1, name: 'Yörünge Araştırma Dergisi', category: 'Bilim · Makale · Forum', description: 'Hakemli araştırma, disiplinler arası arşiv ve teknik topluluk tartışmaları.', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Dünya yörüngesinde çalışan astronot', pages: [{ slug: 'home', label: 'Genel bakış' }, { slug: 'articles', label: 'Makaleler' }, { slug: 'authors', label: 'Yazarlar' }, { slug: 'forum', label: 'Forum' }, { slug: 'archive', label: 'Arşiv' }], details: [...articles.map((item) => item.slug), ...forumThreads.map((item) => item.slug)], inventoryLabel: `${articles.length} makale · ${forumThreads.length} tartışma` },
  { id: 'restaurant', order: 2, name: 'Mola Kıyı Restoranı', category: 'Restoran · Menü · Rezervasyon', description: 'Ege kıyısının ürün takvimini açık ateş ve çağdaş Anadolu teknikleriyle okuyan menü.', image: restaurantMenuItems[0].image, imageAlt: restaurantMenuItems[0].alt, pages: [{ slug: 'index', label: 'Karşılama' }, { slug: 'menu', label: '64 ürünlük menü' }, { slug: 'sefin-hikayesi', label: 'Şefin hikâyesi' }, { slug: 'rezervasyon', label: 'Rezervasyon' }], details: restaurantMenuItems.map((item) => item.slug), inventoryLabel: `${restaurantMenuItems.length} menü öğesi` },
  { id: 'real-estate', order: 3, name: 'Arkhe Taşınmaz & Mimarlık', category: 'Emlak · Mimari seçki', description: 'Türkiye ve Akdeniz kentlerinden mimari niteliği belgelenmiş yaşam alanları.', image: propertyListings[0].image, imageAlt: propertyListings[0].alt, pages: [{ slug: 'index', label: 'Vitrin' }, { slug: 'vitrin', label: 'İlanlar' }, { slug: 'arama', label: 'Arama' }, { slug: 'rehber', label: 'Bölge rehberi' }], details: propertyListings.map((item) => item.slug), inventoryLabel: `${propertyListings.length} mülk` },
  { id: 'hotel', order: 4, name: 'Kaf Dağı İnziva', category: 'Butik otel · Doğa', description: 'Kazdağları vadisinde taş, termal su ve sessizlik etrafında kurgulanan inziva.', image: HOTEL_ROOMS[0].imageUrl, imageAlt: HOTEL_ROOMS[0].alt, pages: [{ slug: 'index', label: 'Vadi' }, { slug: 'odalar', label: 'Odalar' }, { slug: 'deneyimler', label: 'Deneyimler' }, { slug: 'spa', label: 'Spa' }, { slug: 'ulasim', label: 'Ulaşım' }], details: [...HOTEL_ROOMS.map((item) => item.slug), ...HOTEL_EXPERIENCES.map((item) => item.slug)], inventoryLabel: `${HOTEL_ROOMS.length + HOTEL_EXPERIENCES.length} oda ve deneyim` },
  { id: 'perfume', order: 5, name: 'Misk & Buhur', category: 'Niş parfüm · Atölye', description: 'Anadolu botanikleri ve çağdaş parfümeri arasında 48 kokuluk bağımsız koleksiyon.', image: perfumes[0].image, imageAlt: perfumes[0].imageAlt, pages: [{ slug: 'index', label: 'Atölye' }, { slug: 'koleksiyon', label: 'Koleksiyon' }, { slug: 'felsefe', label: 'Felsefe' }, { slug: 'magazalar', label: 'Mağazalar' }], details: perfumes.map((item) => item.slug), inventoryLabel: `${perfumes.length} parfüm` },
  { id: 'guitar', order: 6, name: 'Perde Luthier', category: 'Gitar · Enstrüman · Atölye', description: 'Modern üretimden koleksiyonluk gövdelere, teknik föyü ve dinleme odasıyla gitar mağazası.', image: guitars[0].image, imageAlt: guitars[0].imageAlt, pages: [{ slug: 'index', label: 'Vitrin' }, { slug: 'katalog', label: 'Katalog' }, { slug: 'atolye', label: 'Atölye' }, { slug: 'odalar', label: 'Dinleme odaları' }, { slug: 'hikaye', label: 'Hikâye' }], details: guitars.map((item) => item.slug), inventoryLabel: `${guitars.length} gitar` },
  { id: 'law', order: 7, name: 'Demirbağ & Ortakları', category: 'Hukuk · Kurumsal danışmanlık', description: 'Sınır ötesi işlemler, finansman ve regülasyon için ölçülü kurumsal hukuk yüzü.', image: lawFirmData.teamMembers[0].imageUrl, imageAlt: lawFirmData.teamMembers[0].imageAlt, pages: [{ slug: 'index', label: 'Bakış' }, { slug: 'practices', label: 'Uzmanlıklar' }, { slug: 'team', label: 'Ekip' }, { slug: 'publications', label: 'Yayınlar' }, { slug: 'contact', label: 'İletişim' }], details: [...lawFirmData.practiceAreas.map((item) => item.slug), ...lawFirmData.publications.map((item) => item.slug)], inventoryLabel: `${lawFirmData.practiceAreas.length} uzmanlık · ${lawFirmData.publications.length} yayın` },
  { id: 'saas', order: 8, name: 'VektörOps', category: 'B2B SaaS · Operasyon', description: 'Saha ekipleri, telemetri ve rota kararlarını tek operasyon çekirdeğinde birleştiren ürün.', image: saasPlatformData.modules[0].screenshotUrl, imageAlt: saasPlatformData.modules[0].screenshotAlt, pages: [{ slug: 'index', label: 'Ürün' }, { slug: 'product', label: 'Modüller' }, { slug: 'solutions', label: 'Çözümler' }, { slug: 'pricing', label: 'Fiyat' }, { slug: 'changelog', label: 'Güncellemeler' }, { slug: 'docs', label: 'Dokümanlar' }], details: [...saasPlatformData.modules.map((item) => item.slug), ...saasPlatformData.useCases.map((item) => item.slug)], inventoryLabel: `${saasPlatformData.modules.length} modül · ${saasPlatformData.changelog.length} sürüm` },
  { id: 'dental', order: 9, name: 'VadiDent', category: 'Özel klinik · Diş hekimliği', description: 'Kanıta dayalı klinik protokolleri anlaşılır hasta rehberiyle birleştiren dijital yüz.', image: dentalClinicData.treatments[0].imageUrl, imageAlt: dentalClinicData.treatments[0].imageAlt, pages: [{ slug: 'index', label: 'Klinik' }, { slug: 'treatments', label: 'Tedaviler' }, { slug: 'clinicians', label: 'Hekimler' }, { slug: 'technology', label: 'Teknoloji' }, { slug: 'patient-guide', label: 'Hasta rehberi' }], details: dentalClinicData.treatments.map((item) => item.slug), inventoryLabel: `${dentalClinicData.treatments.length} tedavi · ${dentalClinicData.clinicians.length} hekim` },
  { id: 'fitness', order: 10, name: 'KOR Atletik', category: 'Fitness · Koçluk', description: 'Biyomekanik ölçüm, planlı kuvvet gelişimi ve toparlanmayı aynı üyelik deneyiminde buluşturan kulüp.', image: fitnessClubData.programs[0].imageUrl, imageAlt: fitnessClubData.programs[0].imageAlt, pages: [{ slug: 'index', label: 'Kulüp' }, { slug: 'programs', label: 'Programlar' }, { slug: 'coaches', label: 'Koçlar' }, { slug: 'facilities', label: 'Tesisler' }, { slug: 'memberships', label: 'Üyelik' }, { slug: 'schedule', label: 'Takvim' }], details: fitnessClubData.programs.map((item) => item.slug), inventoryLabel: `${fitnessClubData.programs.length} program · ${fitnessClubData.coaches.length} koç` },
  { id: 'rare-books', order: 11, name: 'Nadirat Kitap & Matbua', category: 'Nadir eser · Galeri', description: 'Erken baskı, harita, el yazması ve imzalı ilk baskıları provenansıyla sunan galeri.', image: RARE_BOOKS_CATALOG[0].imageUrl, imageAlt: RARE_BOOKS_CATALOG[0].alt, pages: [{ slug: 'home', label: 'Galeri' }, { slug: 'collection', label: 'Koleksiyon' }, { slug: 'exhibitions', label: 'Sergiler' }, { slug: 'acquisition', label: 'Edinim' }], details: RARE_BOOKS_CATALOG.map((item) => item.slug), inventoryLabel: `${RARE_BOOKS_CATALOG.length} nadir eser` },
  { id: 'travel', order: 12, name: 'Pusula Keşif', category: 'Ekspedisyon · Seyahat', description: 'Coğrafya, saha uzmanlığı ve küçük grup lojistiği etrafında tasarlanmış uzak rota stüdyosu.', image: EXPEDITION_JOURNEYS[0].imageUrl, imageAlt: EXPEDITION_JOURNEYS[0].alt, pages: [{ slug: 'index', label: 'Stüdyo' }, { slug: 'rotalar', label: 'Rotalar' }, { slug: 'rehberler', label: 'Rehberler' }, { slug: 'hazirlik', label: 'Hazırlık' }, { slug: 'mevsimler', label: 'Mevsimler' }], details: EXPEDITION_JOURNEYS.map((item) => item.slug), inventoryLabel: `${EXPEDITION_JOURNEYS.length} ekspedisyon` },
];

export const getShowcaseSite = (id: string) => SHOWCASE_SITES.find((site) => site.id === id);

export function getAllStaticSiteParams() {
  return SHOWCASE_SITES.flatMap((site) => [
    ...site.pages.map((page) => ({ site: site.id, segments: [page.slug] })),
    ...site.details.map((slug) => ({ site: site.id, segments: ['detail', slug] })),
  ]);
}

import { articles, forumThreads } from '@/content/journal';
import { RARE_BOOKS_CATALOG } from '@/content/rareBooks';

export type EditorialSiteId = 'orbital-journal' | 'rare-books';

export interface SiteRouteConfig {
  siteId: EditorialSiteId;
  name: string;
  tagline: string;
  canonicalPages: string[];
  validPageSlugs: string[];
  detailSlugs: string[];
}

export function getSitePageRoute(siteId: string, pageSlug: string): string {
  const normalizedSlug = pageSlug === 'index' ? 'home' : pageSlug;
  return `/sites/${siteId}/${normalizedSlug}/`;
}

export function getSiteDetailRoute(siteId: string, itemSlug: string): string {
  return `/sites/${siteId}/detail/${itemSlug}/`;
}

export const orbitalJournalConfig: SiteRouteConfig = {
  siteId: 'orbital-journal',
  name: 'Yörünge Araştırma Dergisi',
  tagline: 'Disiplinlerarası Bilim, Derin Teknoloji ve Eleştirel Teori',
  canonicalPages: ['home', 'articles', 'authors', 'forum', 'archive'],
  validPageSlugs: [
    'home',
    'articles',
    'authors',
    'forum',
    'archive',
    'index',
    'makaleler',
    'yazarlar',
    'arsiv',
  ],
  detailSlugs: [
    ...articles.map((item) => item.slug),
    ...forumThreads.map((thread) => thread.slug),
  ],
};

export const rareBooksConfig: SiteRouteConfig = {
  siteId: 'rare-books',
  name: 'Nadirat Kitap & Matbua Galerisi',
  tagline: 'Osmanlı Matbuatı, Haritacılık, İlk Baskılar ve Kâğıt Restorasyonu',
  canonicalPages: ['home', 'collection', 'exhibitions', 'acquisition'],
  validPageSlugs: [
    'home',
    'collection',
    'exhibitions',
    'acquisition',
    'index',
    'koleksiyon',
    'sergiler',
    'satinalma',
  ],
  detailSlugs: RARE_BOOKS_CATALOG.map((item) => item.slug),
};

export const editorialRouteManifest: Record<
  EditorialSiteId,
  {
    siteId: EditorialSiteId;
    name: string;
    pages: string[];
    details: string[];
    canonicalPages: string[];
  }
> = {
  'orbital-journal': {
    siteId: 'orbital-journal',
    name: orbitalJournalConfig.name,
    pages: orbitalJournalConfig.validPageSlugs,
    details: orbitalJournalConfig.detailSlugs,
    canonicalPages: orbitalJournalConfig.canonicalPages,
  },
  'rare-books': {
    siteId: 'rare-books',
    name: rareBooksConfig.name,
    pages: rareBooksConfig.validPageSlugs,
    details: rareBooksConfig.detailSlugs,
    canonicalPages: rareBooksConfig.canonicalPages,
  },
};

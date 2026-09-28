'use client';

import { articles, forumThreads } from '../../content/journal';
import { RARE_BOOKS_CATALOG } from '../../content/rareBooks';
import { OrbitalJournalRenderer } from './orbital-journal/OrbitalJournalRenderer';
import { RareBooksRenderer } from './rare-books/RareBooksRenderer';

export type EditorialSiteId = 'orbital-journal' | 'rare-books';

export function EditorialSiteRenderer({ siteId, pageSlug, itemSlug }: { siteId: EditorialSiteId; pageSlug: string; itemSlug?: string }) {
  return siteId === 'orbital-journal' ? <OrbitalJournalRenderer pageSlug={pageSlug} itemSlug={itemSlug} /> : <RareBooksRenderer pageSlug={pageSlug} itemSlug={itemSlug} />;
}

export const editorialRouteManifest = {
  'orbital-journal': { pages: ['home', 'articles', 'authors', 'forum', 'archive'], details: [...articles.map((item) => item.slug), ...forumThreads.map((item) => item.slug)] },
  'rare-books': { pages: ['home', 'collection', 'exhibitions', 'acquisition'], details: RARE_BOOKS_CATALOG.map((item) => item.slug) },
} as const;

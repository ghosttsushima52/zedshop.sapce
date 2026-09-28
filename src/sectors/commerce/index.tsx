'use client';

import { propertyListings } from '../../content/realEstate';
import { perfumes } from '../../content/perfume';
import { guitars } from '../../content/guitars';
import { RealEstateRenderer } from './real-estate/RealEstateRenderer';
import { PerfumeRenderer } from './perfume/PerfumeRenderer';
import { GuitarRenderer } from './guitar/GuitarRenderer';

export type CommerceSiteId = 'real-estate' | 'perfume' | 'guitar';

export function CommerceSiteRenderer({ siteId, pageSlug, itemSlug }: { siteId: CommerceSiteId; pageSlug: string; itemSlug?: string }) {
  if (siteId === 'real-estate') return <RealEstateRenderer pageSlug={pageSlug} itemSlug={itemSlug} />;
  if (siteId === 'perfume') return <PerfumeRenderer pageSlug={pageSlug} itemSlug={itemSlug} />;
  return <GuitarRenderer pageSlug={pageSlug} itemSlug={itemSlug} />;
}

export const commerceRouteManifest = {
  'real-estate': { pages: ['index', 'vitrin', 'arama', 'rehber'], details: propertyListings.map((item) => item.slug) },
  perfume: { pages: ['index', 'koleksiyon', 'felsefe', 'magazalar'], details: perfumes.map((item) => item.slug) },
  guitar: { pages: ['index', 'katalog', 'atolye', 'odalar', 'hikaye'], details: guitars.map((item) => item.slug) },
} as const;

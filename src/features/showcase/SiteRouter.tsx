'use client';

import { EditorialSiteRenderer } from '../../sectors/editorial';
import { HospitalitySiteRenderer } from '../../sectors/hospitality';
import { CommerceSiteRenderer } from '../../sectors/commerce';
import { ServicesSiteRenderer } from '../../sectors/services';
import type { ShowcaseSiteId } from '../../lib/showcase';

export function SiteRouter({ siteId, segments }: { siteId: ShowcaseSiteId; segments: string[] }) {
  const isDetail = segments[0] === 'detail';
  const pageSlug = isDetail ? 'detail' : (segments[0] ?? 'index');
  const itemSlug = isDetail ? segments[1] : undefined;
  if (siteId === 'orbital-journal' || siteId === 'rare-books') return <EditorialSiteRenderer siteId={siteId} pageSlug={pageSlug} itemSlug={itemSlug} />;
  if (siteId === 'restaurant' || siteId === 'hotel' || siteId === 'travel') return <HospitalitySiteRenderer siteId={siteId} pageSlug={pageSlug} itemSlug={itemSlug} />;
  if (siteId === 'real-estate' || siteId === 'perfume' || siteId === 'guitar') return <CommerceSiteRenderer siteId={siteId} pageSlug={pageSlug} itemSlug={itemSlug} />;
  return <ServicesSiteRenderer siteId={siteId} pageSlug={pageSlug} itemSlug={itemSlug} />;
}


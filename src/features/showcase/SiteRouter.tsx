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

  let content: React.ReactNode;
  if (siteId === 'orbital-journal' || siteId === 'rare-books') {
    content = <EditorialSiteRenderer siteId={siteId} pageSlug={pageSlug} itemSlug={itemSlug} />;
  } else if (siteId === 'restaurant' || siteId === 'hotel' || siteId === 'travel') {
    content = <HospitalitySiteRenderer siteId={siteId} pageSlug={pageSlug} itemSlug={itemSlug} />;
  } else if (siteId === 'real-estate' || siteId === 'perfume' || siteId === 'guitar') {
    content = <CommerceSiteRenderer siteId={siteId} pageSlug={pageSlug} itemSlug={itemSlug} />;
  } else {
    content = <ServicesSiteRenderer siteId={siteId} pageSlug={pageSlug} itemSlug={itemSlug} />;
  }

  return (
    <div data-active-site={siteId} className="site-canvas">
      {content}
    </div>
  );
}


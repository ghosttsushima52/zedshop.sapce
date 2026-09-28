import { notFound } from 'next/navigation';
import { SiteRouter } from '@/features/showcase/SiteRouter';
import { getAllStaticSiteParams, getShowcaseSite, type ShowcaseSiteId } from '@/lib/showcase';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStaticSiteParams();
}

export default async function DemoSitePage({ params }: { params: Promise<{ site: string; segments: string[] }> }) {
  const { site, segments } = await params;
  const definition = getShowcaseSite(site);
  if (!definition) notFound();
  const valid = segments[0] === 'detail' ? definition.details.includes(segments[1]) : definition.pages.some((page) => page.slug === segments[0]);
  if (!valid) notFound();
  return <SiteRouter siteId={site as ShowcaseSiteId} segments={segments} />;
}


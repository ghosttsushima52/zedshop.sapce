import { DemoDisclosure } from './DemoDisclosure';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import type { NavItem } from './SiteHeader';

interface SiteShellProps {
  children: React.ReactNode;
  /** Brand name displayed in header and footer */
  brand?: string;
  /** Backward-compatible aliases used by sector renderers */
  title?: string;
  description?: string;
  theme?: string;
  /** Footer tagline */
  tagline?: string;
  /** Primary navigation items */
  nav?: NavItem[];
  /** Footer links */
  footerLinks?: Array<{ label: string; href: string }>;
}

/**
 * SiteShell — wraps every page with the DemoDisclosure, SiteHeader, main content and SiteFooter.
 * The DemoDisclosure is always present as required by the project spec.
 */
export function SiteShell({
  children,
  brand,
  title,
  description,
  theme,
  tagline,
  nav,
  footerLinks,
}: SiteShellProps) {
  const resolvedBrand = brand ?? title ?? 'Avenox Demo';
  const resolvedTagline = tagline ?? description;
  return (
    <div className="site-shell" data-site-theme={theme}>
      {/* Always-present demo disclosure */}
      <DemoDisclosure />

      <SiteHeader logo={resolvedBrand} nav={nav} />

      <main className="site-shell__main" id="main-content" tabIndex={-1}>
        {children}
      </main>

      <SiteFooter brand={resolvedBrand} tagline={resolvedTagline} links={footerLinks} />
    </div>
  );
}

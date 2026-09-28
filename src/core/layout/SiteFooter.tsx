interface SiteFooterProps {
  brand: string;
  tagline?: string;
  links?: Array<{ label: string; href: string }>;
}

export function SiteFooter({ brand, tagline, links = [] }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <div>
          <div className="site-footer__brand">{brand}</div>
          {tagline && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', marginBlockEnd: 'var(--sp-3)' }}>
              {tagline}
            </p>
          )}
          <div className="site-footer__copy">
            &copy; {year} {brand}. Tüm haklar saklıdır.
          </div>
          {brand !== 'Avenox Vitrin' && <a className="site-footer__showcase-link" href="/">Tüm demolar</a>}
        </div>

        {links.length > 0 && (
          <nav aria-label="Alt bilgi gezinmesi">
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--sp-4)',
                justifyContent: 'flex-end',
              }}
            >
              {links.map((l) => (
                <li key={`${l.href}-${l.label}`}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-fg-faint)',
                      transition: 'color var(--dur-fast) var(--ease-out)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--c-fg-muted)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--c-fg-faint)';
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  );
}

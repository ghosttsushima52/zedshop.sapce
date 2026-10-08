'use client';

import { useState, useId } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

interface SiteHeaderProps {
  logo: string;
  nav?: NavItem[];
}

export function SiteHeader({ logo, nav = [] }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navId = useId();

  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        {/* Logo / Brand */}
        <span className="site-header__logo">{logo}</span>

        {/* Desktop nav */}
        <nav
          id={navId}
          className="site-header__nav"
          aria-label="Ana gezinme"
          data-open={mobileOpen ? 'true' : undefined}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-header__nav-link"
              aria-current={item.current ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions: ThemeSwitcher + mobile toggle */}
        <div className="site-header__actions">
          <ThemeSwitcher />

          <button
            className="mobile-nav-toggle"
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
            aria-controls={navId}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

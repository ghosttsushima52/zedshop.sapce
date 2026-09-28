'use client';

import { useState, useId } from 'react';
import { Menu, X } from 'lucide-react';
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
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Sayfa haritası"
      className={`editorial-breadcrumbs ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: 'var(--text-xs)',
        color: 'var(--c-fg-faint)',
        paddingBlock: 'var(--sp-4)',
        letterSpacing: 'var(--tracking-wide)',
      }}
    >
      <a
        href={items[0]?.href || '#'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'inherit',
          transition: 'color var(--dur-fast) var(--ease-out)',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-fg)')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'inherit')}
      >
        <Home size={13} aria-hidden="true" />
        <span>{items[0]?.label || 'Başlangıç'}</span>
      </a>

      {items.slice(1).map((item, index) => {
        const isLast = index === items.length - 2;
        return (
          <React.Fragment key={item.label + index}>
            <ChevronRight size={12} aria-hidden="true" style={{ opacity: 0.5, flexShrink: 0 }} />
            {item.href && !isLast ? (
              <a
                href={item.href}
                style={{
                  color: 'inherit',
                  transition: 'color var(--dur-fast) var(--ease-out)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-fg)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'inherit')}
              >
                {item.label}
              </a>
            ) : (
              <span
                style={{
                  color: 'var(--c-fg-muted)',
                  fontWeight: 500,
                  maxWidth: '360px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                aria-current={isLast ? 'page' : undefined}
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

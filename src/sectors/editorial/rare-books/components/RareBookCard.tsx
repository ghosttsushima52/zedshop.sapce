import React from 'react';
import type { RareBookItem } from '@/content/rareBooks';
import { RARE_BOOK_CATEGORIES } from '@/content/rareBooks';
import { getSiteDetailRoute } from '../../shared/routes';
import { BookOpen, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface RareBookCardProps {
  item: RareBookItem;
  className?: string;
}

export function RareBookCard({ item, className = '' }: RareBookCardProps) {
  const detailUrl = getSiteDetailRoute('rare-books', item.slug);
  const categoryMeta = RARE_BOOK_CATEGORIES.find((c) => c.key === item.category);

  const availabilityLabels: Record<string, { label: string; color: string; bg: string }> = {
    satista: { label: 'Satışta', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    rezerve: { label: 'Rezerve Edildi', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    ozel_muzayede: { label: 'Özel Müzayede', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
    koleksiyonda: { label: 'Galeri Koleksiyonu', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
  };

  const status = availabilityLabels[item.availability] || availabilityLabels.satista;

  return (
    <article
      className={`rare-book-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--card-radius)',
        overflow: 'hidden',
        transition:
          'border-color var(--dur-mid) var(--ease-out), box-shadow var(--dur-mid) var(--ease-out), transform var(--dur-mid) var(--ease-out)',
      }}
    >
      <div>
        {/* Cover Image Frame */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            background: 'var(--c-bg-subtle)',
            borderBottom: '1px solid var(--c-border)',
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform var(--dur-slow) var(--ease-out)',
            }}
            loading="lazy"
          />

          {/* Status Badge */}
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 'var(--radius-pill)',
              color: status.color,
              background: 'var(--c-bg-raised)',
              border: `1px solid ${status.color}`,
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
            }}
          >
            {status.label}
          </span>

          {/* Year & Period Badge */}
          <span
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#ffffff',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            {item.year} • {item.period.split('/')[0]?.trim()}
          </span>
        </div>

        {/* Content Body */}
        <div style={{ padding: 'var(--sp-5)' }}>
          {/* Category */}
          <div
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-accent)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
              marginBottom: 'var(--sp-2)',
            }}
          >
            {categoryMeta?.label || item.category}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              lineHeight: 'var(--leading-snug)',
              color: 'var(--c-fg)',
              letterSpacing: 'var(--tracking-tight)',
              marginBottom: 'var(--sp-1)',
            }}
          >
            <a
              href={detailUrl}
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {item.title}
            </a>
          </h3>

          {/* Original Title if exists */}
          {item.originalTitle && item.originalTitle !== item.title && (
            <p
              style={{
                fontSize: 'var(--text-xs)',
                fontStyle: 'italic',
                color: 'var(--c-fg-faint)',
                marginBottom: 'var(--sp-2)',
                lineHeight: 1.3,
              }}
            >
              {item.originalTitle}
            </p>
          )}

          {/* Author / Cartographer */}
          <p
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-fg-muted)',
              marginBottom: 'var(--sp-3)',
            }}
          >
            {item.author}
          </p>

          {/* Binding snippet */}
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--c-fg-faint)',
              lineHeight: 1.4,
              marginBottom: 'var(--sp-3)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            <strong>Cilt:</strong> {item.binding}
          </p>

          {/* Description Excerpt */}
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--c-fg-muted)',
              lineHeight: 'var(--leading-relaxed)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: 'var(--sp-4)',
            }}
          >
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Price & Details Link */}
      <div
        style={{
          padding: 'var(--sp-3) var(--sp-5) var(--sp-4)',
          borderTop: '1px solid var(--c-border)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              color: 'var(--c-fg-faint)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            Katalog Değeri
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-md)',
              fontWeight: 800,
              color: 'var(--c-fg)',
            }}
          >
            {item.displayPrice}
          </span>
        </div>

        <a
          href={detailUrl}
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            color: 'var(--c-accent)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            textDecoration: 'none',
          }}
        >
          <span>Eseri İncele</span>
          <ArrowRight size={13} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

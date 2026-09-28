import React from 'react';
import type { JournalArticle } from '@/content/types';
import { authors as allAuthors } from '@/content/journal';
import { getSiteDetailRoute } from '../../shared/routes';
import { Clock, Quote, Download, ArrowUpRight, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: JournalArticle;
  variant?: 'grid' | 'row' | 'featured';
  className?: string;
}

export function ArticleCard({
  article,
  variant = 'grid',
  className = '',
}: ArticleCardProps) {
  const detailUrl = getSiteDetailRoute('orbital-journal', article.slug);
  const articleAuthors = allAuthors.filter((a) =>
    article.authorIds.includes(a.id)
  );

  const formattedDate = new Date(article.publishDate).toLocaleDateString(
    'tr-TR',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  if (variant === 'row') {
    return (
      <article
        className={`journal-article-row ${className}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 'var(--sp-4)',
          alignItems: 'baseline',
          paddingBlock: 'var(--sp-5)',
          borderBottom: '1px solid var(--c-border)',
          transition: 'background var(--dur-fast) var(--ease-out)',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sp-3)',
              fontSize: 'var(--text-xs)',
              color: 'var(--c-fg-faint)',
              marginBlockEnd: 'var(--sp-1)',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            <span
              style={{
                color: 'var(--c-accent)',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {article.categoryName}
            </span>
            <span>•</span>
            <span>
              Cilt {article.volume}, Sayı {article.issue}
            </span>
            <span>•</span>
            <time dateTime={article.publishDate}>{formattedDate}</time>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-md)',
              fontWeight: 600,
              lineHeight: 'var(--leading-snug)',
              color: 'var(--c-fg)',
              marginBlockEnd: 'var(--sp-1)',
            }}
          >
            <a
              href={detailUrl}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>{article.title}</span>
              <ArrowUpRight
                size={14}
                style={{ opacity: 0.6, flexShrink: 0 }}
                aria-hidden="true"
              />
            </a>
          </h3>

          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--c-fg-muted)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {articleAuthors.map((a) => a.name).join(', ')} —{' '}
            {articleAuthors[0]?.affiliation}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-4)',
            fontSize: 'var(--text-xs)',
            color: 'var(--c-fg-faint)',
            flexShrink: 0,
          }}
        >
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            title="Atıf sayısı"
          >
            <Quote size={12} aria-hidden="true" />
            <span>{article.metrics.citations}</span>
          </span>
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            title="Okuma süresi"
          >
            <Clock size={12} aria-hidden="true" />
            <span>{article.readTimeMinutes} dk</span>
          </span>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article
        className={`journal-featured-article ${className}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'var(--sp-8)',
          background: 'var(--c-bg-raised)',
          border: '1px solid var(--c-border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(var(--sp-6), 4vw, var(--sp-10))',
          marginBlockEnd: 'var(--sp-12)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--sp-2)',
                marginBlockEnd: 'var(--sp-4)',
                fontSize: 'var(--text-xs)',
              }}
            >
              <span
                style={{
                  background: 'var(--c-accent)',
                  color: 'var(--c-accent-fg)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 600,
                  letterSpacing: 'var(--tracking-wide)',
                  textTransform: 'uppercase',
                }}
              >
                Baş Makale
              </span>
              <span
                style={{
                  color: 'var(--c-accent)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {article.categoryName}
              </span>
              <span style={{ color: 'var(--c-fg-faint)' }}>•</span>
              <span style={{ color: 'var(--c-fg-faint)' }}>
                Cilt {article.volume}, Sayı {article.issue} ({formattedDate})
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(var(--text-xl), 3vw, var(--text-2xl))',
                fontWeight: 700,
                lineHeight: 'var(--leading-snug)',
                color: 'var(--c-fg)',
                letterSpacing: 'var(--tracking-tight)',
                marginBlockEnd: 'var(--sp-3)',
              }}
            >
              <a href={detailUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
                {article.title}
              </a>
            </h2>

            {article.subtitle && (
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--c-fg-muted)',
                  lineHeight: 'var(--leading-normal)',
                  marginBlockEnd: 'var(--sp-4)',
                }}
              >
                {article.subtitle}
              </p>
            )}

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--c-fg-muted)',
                lineHeight: 'var(--leading-relaxed)',
                marginBlockEnd: 'var(--sp-6)',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.abstract}
            </p>
          </div>

          <div>
            <div
              style={{
                paddingTop: 'var(--sp-4)',
                borderTop: '1px solid var(--c-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--sp-4)',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--c-fg)',
                  }}
                >
                  {articleAuthors.map((a) => a.name).join(', ')}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-fg-faint)',
                  }}
                >
                  {articleAuthors[0]?.affiliation}
                </span>
              </div>

              <a
                href={detailUrl}
                className="btn btn--primary"
                style={{ textDecoration: 'none' }}
              >
                <BookOpen size={14} aria-hidden="true" />
                <span>Araştırmayı İncele</span>
              </a>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              aspectRatio: '16/10',
              border: '1px solid var(--c-border)',
            }}
          >
            <img
              src={article.coverImage.url}
              alt={article.coverImage.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
          </div>
          {article.coverImage.caption && (
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--c-fg-faint)',
                fontStyle: 'italic',
                marginTop: 'var(--sp-2)',
              }}
            >
              {article.coverImage.caption}
            </p>
          )}
        </div>
      </article>
    );
  }

  // Standard Grid Card
  return (
    <article
      className={`journal-article-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--card-radius)',
        padding: 'var(--sp-6)',
        transition:
          'border-color var(--dur-mid) var(--ease-out), box-shadow var(--dur-mid) var(--ease-out), transform var(--dur-mid) var(--ease-out)',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--sp-2)',
            fontSize: 'var(--text-xs)',
            marginBlockEnd: 'var(--sp-3)',
          }}
        >
          <span
            style={{
              color: 'var(--c-accent)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
            }}
          >
            {article.categoryName}
          </span>
          <span style={{ color: 'var(--c-fg-faint)' }}>
            Cilt {article.volume}/{article.issue}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-md)',
            fontWeight: 700,
            lineHeight: 'var(--leading-snug)',
            color: 'var(--c-fg)',
            letterSpacing: 'var(--tracking-tight)',
            marginBlockEnd: 'var(--sp-2)',
          }}
        >
          <a
            href={detailUrl}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            {article.title}
          </a>
        </h3>

        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--c-fg-faint)',
            marginBlockEnd: 'var(--sp-3)',
            fontWeight: 500,
          }}
        >
          {articleAuthors.map((a) => a.name).join(', ')}
        </p>

        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--c-fg-muted)',
            lineHeight: 'var(--leading-relaxed)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBlockEnd: 'var(--sp-4)',
          }}
        >
          {article.abstract}
        </p>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--c-border)',
          paddingTop: 'var(--sp-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 'var(--text-xs)',
          color: 'var(--c-fg-faint)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={12} aria-hidden="true" />
          <span>{article.readTimeMinutes} dk</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            title="Atıf sayısı"
          >
            <Quote size={12} aria-hidden="true" />
            <span>{article.metrics.citations}</span>
          </span>
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            title="İndirme"
          >
            <Download size={12} aria-hidden="true" />
            <span>{article.metrics.downloads}</span>
          </span>
        </div>
      </div>
    </article>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { archiveIssues, articles } from '@/content/journal';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { getSitePageRoute, getSiteDetailRoute } from '../../shared/routes';
import { Button } from '@/core/ui/primitives';
import {
  Download,
  FileText,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export function JournalArchive() {
  const [selectedYear, setSelectedYear] = useState<'all' | '2026' | '2025'>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredIssues = useMemo(() => {
    if (selectedYear === 'all') return archiveIssues;
    return archiveIssues.filter((issue) => String(issue.year) === selectedYear);
  }, [selectedYear]);

  const handleDownload = (issueId: string) => {
    setDownloadingId(issueId);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp-6)' }}>
      <Breadcrumbs
        items={[
          { label: 'Genel Bakış', href: getSitePageRoute('orbital-journal', 'home') },
          { label: 'Cilt Arşivi ve Tematik Sayılar' },
        ]}
      />

      <header style={{ marginBlockEnd: 'var(--sp-8)' }}>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--c-accent)',
            letterSpacing: 'var(--tracking-caps)',
            textTransform: 'uppercase',
          }}
        >
          Kalıcı DOI ve Nüsha Arşivi
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(var(--text-xl), 3vw, var(--text-2xl))',
            fontWeight: 800,
            color: 'var(--c-fg)',
            letterSpacing: 'var(--tracking-tight)',
            marginBlock: '0.25rem 0.5rem',
          }}
        >
          Cilt Arşivi ve Özel Tematik Sayılar
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--c-fg-muted)',
            maxWidth: '65ch',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          2025 ve 2026 yıllarında yayınlanmış tüm hakemli ciltler, özel dosya konuları,
          tam sayfa PDF nüshaları ve kalıcı DOI kayıtları.
        </p>
      </header>

      {/* Year Filter Buttons */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--sp-2)',
          marginBlockEnd: 'var(--sp-8)',
          borderBottom: '1px solid var(--c-border)',
          paddingBottom: 'var(--sp-4)',
        }}
        role="group"
        aria-label="Yıl filtreleri"
      >
        <button
          type="button"
          className={`filter-chip${selectedYear === 'all' ? ' filter-chip--active' : ''}`}
          aria-pressed={selectedYear === 'all'}
          onClick={() => setSelectedYear('all')}
        >
          Tüm Yıllar ({archiveIssues.length} Sayı)
        </button>
        <button
          type="button"
          className={`filter-chip${selectedYear === '2026' ? ' filter-chip--active' : ''}`}
          aria-pressed={selectedYear === '2026'}
          onClick={() => setSelectedYear('2026')}
        >
          2026 Ciltleri (Cilt 14)
        </button>
        <button
          type="button"
          className={`filter-chip${selectedYear === '2025' ? ' filter-chip--active' : ''}`}
          aria-pressed={selectedYear === '2025'}
          onClick={() => setSelectedYear('2025')}
        >
          2025 Ciltleri (Cilt 13)
        </button>
      </div>

      {/* Issues Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
        {filteredIssues.map((issue) => {
          const issueArticles = articles.filter(
            (a) => a.volume === issue.volume && a.issue === issue.issue
          );
          const isDownloading = downloadingId === issue.id;

          return (
            <article
              key={issue.id}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'var(--sp-6)',
              }}
            >
              {/* Cover & Basic Info */}
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '16/10', height: '100%', minHeight: '220px' }}>
                  <img
                    src={issue.coverImage.url}
                    alt={issue.coverImage.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Details & Contents Table */}
              <div
                style={{
                  padding: 'var(--sp-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'var(--sp-4)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: 'var(--sp-3)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-accent)',
                      fontWeight: 600,
                      letterSpacing: 'var(--tracking-wide)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--sp-2)',
                    }}
                  >
                    <span>Cilt {issue.volume}, Sayı {issue.issue}</span>
                    <span style={{ color: 'var(--c-fg-faint)' }}>•</span>
                    <span style={{ color: 'var(--c-fg-muted)' }}>{issue.period}</span>
                    <span style={{ color: 'var(--c-fg-faint)' }}>•</span>
                    <span style={{ color: 'var(--c-fg-faint)' }}>DOI: {issue.doi}</span>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 700,
                      color: 'var(--c-fg)',
                      lineHeight: 'var(--leading-snug)',
                      marginBottom: 'var(--sp-2)',
                    }}
                  >
                    {issue.title}
                  </h2>

                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-accent)',
                      fontWeight: 600,
                      marginBottom: 'var(--sp-3)',
                    }}
                  >
                    Tematik Odak: {issue.themeFocus}
                  </p>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--c-fg-muted)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--sp-4)',
                    }}
                  >
                    {issue.editorialNote}
                  </p>

                  {/* Articles included in this issue */}
                  {issueArticles.length > 0 && (
                    <div style={{ marginTop: 'var(--sp-4)' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--c-fg-faint)',
                          textTransform: 'uppercase',
                          letterSpacing: 'var(--tracking-wide)',
                          marginBottom: 'var(--sp-2)',
                        }}
                      >
                        Bu Sayıdaki Makaleler ({issueArticles.length})
                      </span>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--sp-1)',
                        }}
                      >
                        {issueArticles.map((art) => (
                          <li key={art.id} style={{ fontSize: 'var(--text-xs)' }}>
                            <a
                              href={getSiteDetailRoute('orbital-journal', art.slug)}
                              style={{
                                color: 'var(--c-fg)',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'baseline',
                                gap: '0.35rem',
                              }}
                            >
                              <span style={{ color: 'var(--c-accent)' }}>›</span>
                              <span style={{ textDecoration: 'underline' }}>{art.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer specs & Download action */}
                <div
                  style={{
                    paddingTop: 'var(--sp-4)',
                    borderTop: '1px solid var(--c-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 'var(--sp-3)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-fg-faint)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--sp-4)' }}>
                    <span>{issue.pageCount} Sayfa</span>
                    <span>•</span>
                    <span>{issue.articleCount} Hakemli Makale</span>
                    <span>•</span>
                    <span>{issue.downloadFileSize}</span>
                  </div>

                  <Button
                    variant={isDownloading ? 'ghost' : 'outline'}
                    onClick={() => handleDownload(issue.id)}
                    style={{ fontSize: 'var(--text-xs)', gap: '0.4rem' }}
                  >
                    {isDownloading ? (
                      <>
                        <CheckCircle size={13} style={{ color: '#10b981' }} />
                        <span>Nüsha İndirildi (Simüle)</span>
                      </>
                    ) : (
                      <>
                        <Download size={13} aria-hidden="true" />
                        <span>Tam Sayı PDF ({issue.downloadFileSize})</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

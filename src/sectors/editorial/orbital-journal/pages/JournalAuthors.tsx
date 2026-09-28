'use client';

import React, { useState, useMemo } from 'react';
import { authors as allAuthors, articles } from '@/content/journal';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { EditorialEmptyState } from '../../shared/components/EditorialEmptyState';
import { getSitePageRoute } from '../../shared/routes';
import {
  Search,
  ExternalLink,
  Mail,
  BookOpen,
  Award,
  GraduationCap,
} from 'lucide-react';

export function JournalAuthors() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return allAuthors;
    const q = searchQuery.toLowerCase().trim();
    return allAuthors.filter(
      (author) =>
        author.name.toLowerCase().includes(q) ||
        author.affiliation.toLowerCase().includes(q) ||
        author.specialties.some((s) => s.toLowerCase().includes(q)) ||
        author.role.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp-6)' }}>
      <Breadcrumbs
        items={[
          { label: 'Genel Bakış', href: getSitePageRoute('orbital-journal', 'home') },
          { label: 'Araştırmacılar ve Danışma Kurulu' },
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
          Bilimsel Kadro & Danışma Heyeti
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
          Araştırmacılar ve Danışma Kurulu
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--c-fg-muted)',
            maxWidth: '65ch',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Yörünge Araştırma Dergisi’ne katkı sunan bağımsız bilim insanları, laboratuvar
          direktörleri ve hakem değerlendirme süreçlerini yürüten kıdemli akademisyenler.
        </p>
      </header>

      {/* Search Input */}
      <div
        style={{
          marginBlockEnd: 'var(--sp-8)',
          maxWidth: '480px',
          position: 'relative',
        }}
      >
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--c-fg-faint)',
          }}
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="İsim, enstitü veya uzmanlık alanı ile arayın..."
          aria-label="Araştırmacılarda ara"
          style={{
            width: '100%',
            padding: '0.55rem 0.75rem 0.55rem 2.25rem',
            fontSize: 'var(--text-sm)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--c-border-strong)',
            background: 'var(--c-bg-raised)',
            color: 'var(--c-fg)',
            outline: 'none',
          }}
        />
      </div>

      {filteredAuthors.length === 0 ? (
        <EditorialEmptyState
          title="Aramanızla eşleşen araştırmacı bulunamadı"
          description="Lütfen aradığınız akademisyen adı veya üniversite terimini kontrol edin."
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          {filteredAuthors.map((author) => {
            const authorArticles = articles.filter((a) =>
              a.authorIds.includes(author.id)
            );

            return (
              <article
                key={author.id}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 'var(--card-radius)',
                  padding: 'var(--sp-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'var(--sp-4)',
                }}
              >
                <div>
                  {/* Avatar & Header */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--sp-4)',
                      alignItems: 'flex-start',
                      marginBlockEnd: 'var(--sp-4)',
                    }}
                  >
                    <img
                      src={author.avatar.url}
                      alt={author.avatar.alt}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--c-border-strong)',
                        flexShrink: 0,
                      }}
                      loading="lazy"
                    />
                    <div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-base)',
                          fontWeight: 700,
                          color: 'var(--c-fg)',
                          margin: 0,
                          lineHeight: 'var(--leading-snug)',
                        }}
                      >
                        {author.name}
                      </h2>
                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--c-accent)',
                          fontWeight: 600,
                          marginBlock: '2px',
                        }}
                      >
                        {author.role}
                      </p>
                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--c-fg-muted)',
                          lineHeight: 1.4,
                        }}
                      >
                        {author.affiliation}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-fg-muted)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBlockEnd: 'var(--sp-4)',
                    }}
                  >
                    {author.bio}
                  </p>

                  {/* Specialties */}
                  <div style={{ marginBlockEnd: 'var(--sp-4)' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--c-fg-faint)',
                        letterSpacing: 'var(--tracking-wide)',
                        textTransform: 'uppercase',
                        marginBlockEnd: 'var(--sp-2)',
                      }}
                    >
                      Uzmanlık Alanları
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {author.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          style={{
                            fontSize: 'var(--text-xs)',
                            background: 'var(--c-bg-subtle)',
                            border: '1px solid var(--c-border)',
                            color: 'var(--c-fg-muted)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Published Works */}
                  {author.publishedWorks && author.publishedWorks.length > 0 && (
                    <div style={{ marginBlockEnd: 'var(--sp-4)' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--c-fg-faint)',
                          letterSpacing: 'var(--tracking-wide)',
                          textTransform: 'uppercase',
                          marginBlockEnd: 'var(--sp-1)',
                        }}
                      >
                        Önemli Yayınları
                      </span>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          fontSize: 'var(--text-xs)',
                          color: 'var(--c-fg-muted)',
                        }}
                      >
                        {author.publishedWorks.map((work) => (
                          <li
                            key={work}
                            style={{
                              paddingBlock: '2px',
                              lineHeight: 'var(--leading-snug)',
                            }}
                          >
                            • {work}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer / Meta info */}
                <div
                  style={{
                    paddingTop: 'var(--sp-3)',
                    borderTop: '1px solid var(--c-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 'var(--sp-2)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  {author.orcid ? (
                    <span
                      style={{
                        color: 'var(--c-fg-faint)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                      title="ORCID Kimliği"
                    >
                      <GraduationCap size={12} aria-hidden="true" />
                      <span>ORCID: {author.orcid}</span>
                    </span>
                  ) : (
                    <span />
                  )}

                  <a
                    href={`${getSitePageRoute('orbital-journal', 'articles')}?arastirmaci=${author.slug}`}
                    style={{
                      color: 'var(--c-accent)',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <span>Dergideki Makaleleri ({authorArticles.length})</span>
                    <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

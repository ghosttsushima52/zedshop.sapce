'use client';

import React, { useState } from 'react';
import type { JournalArticle } from '@/content/types';
import {
  authors as allAuthors,
  articles as allArticles,
  categories,
} from '@/content/journal';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { CitationModal } from '../components/CitationModal';
import { ArticleCard } from '../components/ArticleCard';
import { getSitePageRoute } from '../../shared/routes';
import { Button } from '@/core/ui/primitives';
import {
  Clock,
  Quote,
  Download,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  ExternalLink,
  Layers,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface ArticleDetailProps {
  article: JournalArticle;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const [citationModalOpen, setCitationModalOpen] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const articleAuthors = allAuthors.filter((a) =>
    article.authorIds.includes(a.id)
  );

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.categoryId === article.categoryId)
    .slice(0, 3);

  const formattedDate = new Date(article.publishDate).toLocaleDateString(
    'tr-TR',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const handleCopyDoi = () => {
    navigator.clipboard.writeText(`https://doi.org/${article.doi}`);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.abstract,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp-6) var(--sp-16)' }}>
      <Breadcrumbs
        items={[
          { label: 'Genel Bakış', href: getSitePageRoute('orbital-journal', 'home') },
          { label: 'Makaleler', href: getSitePageRoute('orbital-journal', 'articles') },
          { label: article.title },
        ]}
      />

      <article style={{ maxWidth: '880px', marginInline: 'auto' }}>
        {/* Publication Meta Header */}
        <header style={{ marginBlockEnd: 'var(--sp-8)' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--sp-2)',
              fontSize: 'var(--text-xs)',
              marginBlockEnd: 'var(--sp-4)',
            }}
          >
            <span
              style={{
                color: 'var(--c-accent)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wide)',
                background: 'rgba(99, 102, 241, 0.1)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              {article.categoryName}
            </span>
            <span style={{ color: 'var(--c-fg-faint)' }}>•</span>
            <span style={{ color: 'var(--c-fg-muted)' }}>
              Cilt {article.volume}, Sayı {article.issue}
            </span>
            <span style={{ color: 'var(--c-fg-faint)' }}>•</span>
            <time dateTime={article.publishDate} style={{ color: 'var(--c-fg-muted)' }}>
              {formattedDate}
            </time>
            <span style={{ color: 'var(--c-fg-faint)' }}>•</span>
            <span style={{ color: 'var(--c-fg-faint)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} aria-hidden="true" />
              <span>{article.readTimeMinutes} dk okuma süresi</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(var(--text-xl), 3.5vw, var(--text-3xl))',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--c-fg)',
              letterSpacing: 'var(--tracking-tight)',
              marginBlockEnd: 'var(--sp-3)',
            }}
          >
            {article.title}
          </h1>

          {article.subtitle && (
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--c-fg-muted)',
                lineHeight: 'var(--leading-snug)',
                marginBlockEnd: 'var(--sp-6)',
              }}
            >
              {article.subtitle}
            </p>
          )}

          {/* Authors Strip */}
          <div
            style={{
              paddingBlock: 'var(--sp-4)',
              borderTop: '1px solid var(--c-border)',
              borderBottom: '1px solid var(--c-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-3)',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-6)' }}>
              {articleAuthors.map((author) => (
                <div key={author.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                  <img
                    src={author.avatar.url}
                    alt={author.avatar.alt}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid var(--c-border)',
                    }}
                    loading="lazy"
                  />
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 700,
                        color: 'var(--c-fg)',
                      }}
                    >
                      {author.name}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--c-fg-muted)',
                      }}
                    >
                      {author.affiliation}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* DOI & Quick actions bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--sp-3)',
                paddingTop: 'var(--sp-3)',
                borderTop: '1px dashed var(--c-border)',
                fontSize: 'var(--text-xs)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--c-fg-faint)', fontWeight: 600 }}>DOI:</span>
                <code
                  style={{
                    background: 'var(--c-bg-subtle)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--c-fg)',
                  }}
                >
                  https://doi.org/{article.doi}
                </code>
                <button
                  type="button"
                  onClick={handleCopyDoi}
                  title="DOI Bağlantısını Kopyala"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--c-accent)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontWeight: 600,
                  }}
                >
                  {copiedDoi ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedDoi ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <Button
                  variant="outline"
                  onClick={() => setCitationModalOpen(true)}
                  style={{ fontSize: 'var(--text-xs)', padding: '4px 10px', gap: '0.35rem' }}
                >
                  <Quote size={12} aria-hidden="true" />
                  <span>Atıf Yap</span>
                </Button>

                <Button
                  variant={downloadSuccess ? 'ghost' : 'outline'}
                  onClick={handleDownloadPdf}
                  style={{ fontSize: 'var(--text-xs)', padding: '4px 10px', gap: '0.35rem' }}
                >
                  {downloadSuccess ? (
                    <>
                      <CheckCircle2 size={12} style={{ color: '#10b981' }} />
                      <span>İndirildi (Simüle)</span>
                    </>
                  ) : (
                    <>
                      <Download size={12} aria-hidden="true" />
                      <span>PDF İndir</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleShare}
                  style={{ fontSize: 'var(--text-xs)', padding: '4px 10px', gap: '0.35rem' }}
                >
                  {shareSuccess ? <Check size={12} /> : <Share2 size={12} aria-hidden="true" />}
                  <span>{shareSuccess ? 'Kopyalandı' : 'Paylaş'}</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Lead Cover Image */}
        <div style={{ marginBlockEnd: 'var(--sp-8)' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              aspectRatio: '16/9',
              border: '1px solid var(--c-border)',
            }}
          >
            <img
              src={article.coverImage.url}
              alt={article.coverImage.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {article.coverImage.caption && (
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--c-fg-faint)',
                fontStyle: 'italic',
                marginTop: 'var(--sp-2)',
                lineHeight: 1.4,
              }}
            >
              {article.coverImage.caption}
              {article.coverImage.photographer && ` (Fotoğraf: ${article.coverImage.photographer})`}
            </p>
          )}
        </div>

        {/* Abstract Box */}
        <section
          aria-label="Özet ve Metodolojik Kapsam"
          style={{
            background: 'var(--c-bg-subtle)',
            border: '1px solid var(--c-border-strong)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--sp-6)',
            marginBlockEnd: 'var(--sp-8)',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--c-accent)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
              marginBottom: 'var(--sp-2)',
            }}
          >
            Özet (Abstract)
          </span>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--c-fg)',
              lineHeight: 'var(--leading-relaxed)',
              margin: 0,
            }}
          >
            {article.abstract}
          </p>
        </section>

        {/* Key Findings Box */}
        {article.keyFindings && article.keyFindings.length > 0 && (
          <section
            aria-label="Önemli bulgular"
            style={{
              background: 'var(--c-bg-raised)',
              border: '1px solid var(--c-border)',
              borderLeft: '4px solid var(--c-accent)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              padding: 'var(--sp-6)',
              marginBlockEnd: 'var(--sp-10)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--c-fg)',
                marginBottom: 'var(--sp-3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <CheckCircle2 size={18} style={{ color: 'var(--c-accent)' }} />
              <span>Öne Çıkan Bulgular ve Kuramsal Çıkarımlar</span>
            </h2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-2)',
                fontSize: 'var(--text-sm)',
                color: 'var(--c-fg-muted)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              {article.keyFindings.map((finding, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--c-accent)', fontWeight: 700 }}>•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Full Article Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
          {article.sections.map((section, idx) => (
            <section key={idx} aria-label={section.heading || `Bölüm ${idx + 1}`}>
              {section.heading && (
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 700,
                    color: 'var(--c-fg)',
                    letterSpacing: 'var(--tracking-tight)',
                    marginBlockEnd: 'var(--sp-4)',
                    paddingBottom: 'var(--sp-2)',
                    borderBottom: '1px solid var(--c-border)',
                  }}
                >
                  {section.heading}
                </h2>
              )}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--sp-4)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--c-fg-muted)',
                }}
              >
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Callout box if present */}
              {section.callout && (
                <aside
                  aria-label={section.callout.type}
                  style={{
                    marginTop: 'var(--sp-6)',
                    padding: 'var(--sp-5)',
                    background:
                      section.callout.type === 'methodology'
                        ? 'rgba(99, 102, 241, 0.08)'
                        : section.callout.type === 'data'
                        ? 'rgba(6, 214, 240, 0.08)'
                        : 'var(--c-bg-subtle)',
                    borderLeft: `4px solid ${
                      section.callout.type === 'methodology'
                        ? 'var(--c-accent)'
                        : section.callout.type === 'data'
                        ? '#06d6f0'
                        : 'var(--c-border-strong)'
                    }`,
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--c-fg)',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--tracking-wide)',
                      color: 'var(--c-accent)',
                      marginBottom: 'var(--sp-1)',
                    }}
                  >
                    {section.callout.type === 'methodology'
                      ? 'Deneysel Metodoloji Notu'
                      : section.callout.type === 'data'
                      ? 'Ölçüm ve Veri Notu'
                      : 'Teknik Açıklama'}
                  </span>
                  <p style={{ margin: 0, lineHeight: 'var(--leading-normal)' }}>
                    {section.callout.text}
                  </p>
                  {section.callout.source && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--c-fg-faint)',
                        fontStyle: 'italic',
                        marginTop: 'var(--sp-2)',
                      }}
                    >
                      Kaynak: {section.callout.source}
                    </span>
                  )}
                </aside>
              )}
            </section>
          ))}
        </div>

        {/* Citations / References Section */}
        {article.citations && article.citations.length > 0 && (
          <section
            aria-label="Kaynakça"
            style={{
              marginTop: 'var(--sp-12)',
              paddingTop: 'var(--sp-6)',
              borderTop: '2px solid var(--c-border-strong)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                color: 'var(--c-fg)',
                marginBottom: 'var(--sp-4)',
              }}
            >
              Kaynakça ve Referanslar
            </h2>
            <ol
              style={{
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-2)',
                fontSize: 'var(--text-xs)',
                color: 'var(--c-fg-muted)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              {article.citations.map((c) => (
                <li key={c.id}>
                  <span>{c.citationText}</span>
                  {c.doi && (
                    <a
                      href={`https://doi.org/${c.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginLeft: '0.5rem',
                        color: 'var(--c-accent)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.2rem',
                      }}
                    >
                      <span>[DOI]</span>
                      <ExternalLink size={10} aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Tags */}
        <div
          style={{
            marginTop: 'var(--sp-8)',
            paddingTop: 'var(--sp-4)',
            borderTop: '1px solid var(--c-border)',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--sp-2)',
          }}
        >
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', fontWeight: 600 }}>
            Anahtar Kelimeler:
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 'var(--text-xs)',
                background: 'var(--c-bg-subtle)',
                border: '1px solid var(--c-border)',
                color: 'var(--c-fg-muted)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Articles in the same discipline */}
        {relatedArticles.length > 0 && (
          <section
            aria-label="İlgili araştırmalar"
            style={{
              marginTop: 'var(--sp-16)',
              paddingTop: 'var(--sp-8)',
              borderTop: '2px solid var(--c-border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--c-fg)',
                marginBottom: 'var(--sp-6)',
              }}
            >
              Aynı Disiplindeki Diğer Araştırmalar
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: 'var(--sp-4)',
              }}
            >
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} variant="grid" />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Citation Export Modal */}
      <CitationModal
        article={article}
        isOpen={citationModalOpen}
        onClose={() => setCitationModalOpen(false)}
      />
    </div>
  );
}

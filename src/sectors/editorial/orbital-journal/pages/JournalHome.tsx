import React from 'react';
import {
  articles,
  authors,
  categories,
  archiveIssues,
  forumThreads,
  getFeaturedArticles,
} from '@/content/journal';
import { getSitePageRoute, getSiteDetailRoute } from '../../shared/routes';
import { ArticleCard } from '../components/ArticleCard';
import { ForumThreadCard } from '../components/ForumThreadCard';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Users,
  Compass,
  MessageSquare,
  Library,
  Sparkles,
} from 'lucide-react';

export function JournalHome() {
  const featuredArticles = getFeaturedArticles();
  const primaryFeatured = featuredArticles[0] || articles[0];
  const secondaryArticles = articles.filter(
    (a) => a.id !== primaryFeatured.id
  ).slice(0, 4);
  const recentThreads = forumThreads.slice(0, 3);
  const boardSpotlight = authors.slice(0, 4);
  const latestIssues = archiveIssues.slice(0, 3);

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp-8)' }}>
      {/* 1. Academic Journal Masthead */}
      <section
        aria-label="Dergi künyesi ve başlık"
        style={{
          borderBottom: '2px solid var(--c-border-strong)',
          paddingBottom: 'var(--sp-6)',
          marginBlockEnd: 'var(--sp-10)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--sp-4)',
            fontSize: 'var(--text-xs)',
            color: 'var(--c-fg-faint)',
            letterSpacing: 'var(--tracking-caps)',
            textTransform: 'uppercase',
            fontWeight: 600,
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: 'var(--sp-3)',
            marginBlockEnd: 'var(--sp-6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
            <span>ISSN 2822-4914</span>
            <span>•</span>
            <span>Cilt 14, Sayı 3 (Güz 2026)</span>
            <span>•</span>
            <span style={{ color: 'var(--c-accent)' }}>Açık Erişim Hakemli Dergi</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span>TÜBİTAK ULAKBİM & DOAJ Dizinli</span>
          </div>
        </div>

        <div style={{ maxWidth: '880px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-3xl))',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--c-fg)',
              marginBlockEnd: 'var(--sp-3)',
            }}
          >
            Yörünge Araştırma Dergisi
          </h1>
          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--c-fg-muted)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Disiplinlerarası bilim, derin teknoloji, oşinografi, nöromorfik bilişim ve
            eleştirel kuram alanlarında doğrulanabilir ve hakemli araştırmalar.
          </p>
        </div>

        {/* Editorial Statement Strip */}
        <div
          style={{
            marginTop: 'var(--sp-6)',
            padding: 'var(--sp-4) var(--sp-6)',
            background: 'var(--c-bg-subtle)',
            borderLeft: '3px solid var(--c-accent)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontSize: 'var(--text-sm)',
            color: 'var(--c-fg)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--sp-4)',
          }}
        >
          <div>
            <strong style={{ color: 'var(--c-accent)', marginRight: '0.5rem' }}>
              Editöryal Odak:
            </strong>
            <span>
              &ldquo;Uç Sınırlarda Gözlem ve Dayanım: Erzurum DAG teleskobunun adaptif
              optik verilerinden Karadeniz anoksik kemoklin sınırlarına uzanan derin
              ölçümler.&rdquo;
            </span>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', whiteSpace: 'nowrap' }}>
            Yayın Kurulu Başkanı: Prof. Dr. Haluk Demiriz
          </span>
        </div>
      </section>

      {/* 2. Lead Article Presentation */}
      <section aria-label="Öne çıkan baş makale">
        <ArticleCard article={primaryFeatured} variant="featured" />
      </section>

      {/* 3. Research Disciplines Taxonomy */}
      <section
        aria-label="Araştırma disiplinleri"
        style={{ marginBlockEnd: 'var(--sp-16)' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: 'var(--sp-3)',
            marginBlockEnd: 'var(--sp-6)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--c-accent)',
                letterSpacing: 'var(--tracking-caps)',
                textTransform: 'uppercase',
              }}
            >
              Taxonomi
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--c-fg)',
              }}
            >
              Yayın Alanları ve Disiplinler
            </h2>
          </div>
          <a
            href={getSitePageRoute('orbital-journal', 'articles')}
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>Tüm Dizini Tara</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'var(--sp-4)',
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                padding: 'var(--sp-5)',
                background: 'var(--c-bg-raised)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--dur-fast) var(--ease-out)',
              }}
            >
              <div>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: category.colorCode,
                    marginBottom: 'var(--sp-3)',
                  }}
                  aria-hidden="true"
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    color: 'var(--c-fg)',
                    marginBottom: 'var(--sp-2)',
                    lineHeight: 'var(--leading-snug)',
                  }}
                >
                  {category.name}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-fg-muted)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {category.description}
                </p>
              </div>

              <div style={{ marginTop: 'var(--sp-4)' }}>
                <a
                  href={`${getSitePageRoute('orbital-journal', 'articles')}?kategori=${category.slug}`}
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-fg-faint)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontWeight: 500,
                  }}
                >
                  <span>Kategori Makaleleri</span>
                  <ArrowRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Latest Accepted Research Papers */}
      <section
        aria-label="Son kabul edilen hakemli araştırmalar"
        style={{ marginBlockEnd: 'var(--sp-16)' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: 'var(--sp-3)',
            marginBlockEnd: 'var(--sp-6)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--c-accent)',
                letterSpacing: 'var(--tracking-caps)',
                textTransform: 'uppercase',
              }}
            >
              Hakemli Yayınlar
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--c-fg)',
              }}
            >
              Son Araştırma Makaleleri
            </h2>
          </div>

          <a
            href={getSitePageRoute('orbital-journal', 'articles')}
            className="btn btn--outline"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            <span>Tüm Makaleler (16)</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          {secondaryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="grid" />
          ))}
        </div>
      </section>

      {/* 5. Forum & Open Science Peer Review Strip */}
      <section
        aria-label="Açık hakemlik ve forum tartışmaları"
        style={{
          marginBlockEnd: 'var(--sp-16)',
          background: 'var(--c-bg-subtle)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(var(--sp-6), 3vw, var(--sp-8))',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: 'var(--sp-3)',
            marginBlockEnd: 'var(--sp-6)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={16} style={{ color: 'var(--c-accent)' }} />
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--c-accent)',
                  letterSpacing: 'var(--tracking-caps)',
                  textTransform: 'uppercase',
                }}
              >
                Açık Hakemlik & Metodoloji
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--c-fg)',
                marginTop: '0.25rem',
              }}
            >
              Araştırmacı Diyaloğu ve Teknik Forum
            </h2>
          </div>

          <a
            href={getSitePageRoute('orbital-journal', 'forum')}
            className="btn btn--ghost"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            <span>Forum Başlıkları (12)</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {recentThreads.map((thread) => (
            <ForumThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      </section>

      {/* 6. Editorial Board & Authors Preview */}
      <section
        aria-label="Yayın ve Danışma Kurulu"
        style={{ marginBlockEnd: 'var(--sp-16)' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: 'var(--sp-3)',
            marginBlockEnd: 'var(--sp-6)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--c-accent)',
                letterSpacing: 'var(--tracking-caps)',
                textTransform: 'uppercase',
              }}
            >
              Kurul
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--c-fg)',
              }}
            >
              Araştırmacılar ve Danışma Kurulu
            </h2>
          </div>

          <a
            href={getSitePageRoute('orbital-journal', 'authors')}
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>Tüm Kurulu Gör (9 Araştırmacı)</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'var(--sp-4)',
          }}
        >
          {boardSpotlight.map((author) => (
            <div
              key={author.id}
              style={{
                padding: 'var(--sp-5)',
                background: 'var(--c-bg-raised)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                gap: 'var(--sp-4)',
                alignItems: 'flex-start',
              }}
            >
              <img
                src={author.avatar.url}
                alt={author.avatar.alt}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '1px solid var(--c-border)',
                }}
                loading="lazy"
              />
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    color: 'var(--c-fg)',
                    margin: 0,
                    lineHeight: 'var(--leading-snug)',
                  }}
                >
                  {author.name}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-accent)',
                    fontWeight: 500,
                    marginBlock: '2px',
                  }}
                >
                  {author.role}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-fg-muted)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {author.affiliation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Archive Snapshot */}
      <section aria-label="Dergi cilt arşivi">
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: 'var(--sp-3)',
            marginBlockEnd: 'var(--sp-6)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--c-accent)',
                letterSpacing: 'var(--tracking-caps)',
                textTransform: 'uppercase',
              }}
            >
              Arşiv
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--c-fg)',
              }}
            >
              Cilt ve Tematik Sayı Arşivi
            </h2>
          </div>

          <a
            href={getSitePageRoute('orbital-journal', 'archive')}
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>Tüm Arşiv (6 Sayı)</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          {latestIssues.map((issue) => (
            <div
              key={issue.id}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                <img
                  src={issue.coverImage.url}
                  alt={issue.coverImage.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: 'var(--sp-5)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-fg-faint)',
                      marginBottom: 'var(--sp-2)',
                    }}
                  >
                    <span>Cilt {issue.volume}, Sayı {issue.issue}</span>
                    <span>{issue.period}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 700,
                      color: 'var(--c-fg)',
                      lineHeight: 'var(--leading-snug)',
                      marginBottom: 'var(--sp-2)',
                    }}
                  >
                    {issue.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-fg-muted)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--sp-4)',
                    }}
                  >
                    {issue.editorialNote}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: 'var(--sp-3)',
                    borderTop: '1px solid var(--c-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-fg-faint)',
                  }}
                >
                  <span>{issue.articleCount} Makale • {issue.pageCount} Sayfa</span>
                  <a
                    href={getSitePageRoute('orbital-journal', 'archive')}
                    style={{ color: 'var(--c-accent)', fontWeight: 600 }}
                  >
                    Detaylar →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

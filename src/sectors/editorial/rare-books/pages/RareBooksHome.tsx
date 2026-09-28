import React from 'react';
import {
  RARE_BOOKS_CATALOG,
  RARE_BOOK_CATEGORIES,
  RARE_BOOKS_EXHIBITIONS,
  RARE_BOOKS_ACQUISITION_GUIDE,
} from '@/content/rareBooks';
import { RareBookCard } from '../components/RareBookCard';
import { getSitePageRoute, getSiteDetailRoute } from '../../shared/routes';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Compass,
  Scroll,
  Calendar,
  Layers,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export function RareBooksHome() {
  // Masterpieces for spotlight
  const cihannuma = RARE_BOOKS_CATALOG.find((b) => b.slug === 'katip-celebi-kitab-i-cihannuma-1732') || RARE_BOOKS_CATALOG[1];
  const melling = RARE_BOOKS_CATALOG.find((b) => b.slug === 'antoine-ignace-melling-voyage-pittoresque-1819') || RARE_BOOKS_CATALOG[9];
  const activeExhibition = RARE_BOOKS_EXHIBITIONS[0];
  const recentCurations = RARE_BOOKS_CATALOG.slice(0, 6);

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp-8)' }}>
      {/* 1. Gallery Entrance & Masthead */}
      <section
        aria-label="Galeri tanıtımı ve kuratöryel manifesto"
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
            <span>Kuruluş 1984</span>
            <span>•</span>
            <span>Sahaflar Çarşısı Girişi No: 4, Beyazıt / İstanbul</span>
            <span>•</span>
            <span style={{ color: 'var(--c-accent)' }}>ILAB & CINOA Akredite Galeri</span>
          </div>

          <div>
            <span>54 Tescilli Nadir Eser</span>
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
            Nadirat Kitap & Matbua Galerisi
          </h1>
          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--c-fg-muted)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Osmanlı matbuatı, İbrahim Müteferrika ilk baskıları, 16-19. yüzyıl Doğu Akdeniz
            bakır gravür haritaları, tezhipli el yazmaları ve kağıt restorasyonu koleksiyonu.
          </p>
        </div>

        {/* Curatorial Principle Strip */}
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
              Galeri İlkesi:
            </strong>
            <span>
              &ldquo;Kağıdın, mürekkebin ve cilt dokusunun beş asırlık hafızasını tersinir
              (reversible) konservasyon standartları ve şeffaf provenans zinciriyle muhafaza ediyoruz.&rdquo;
            </span>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', whiteSpace: 'nowrap' }}>
            Baş Küratör: Arşiv Mimarı Selim Cihangir
          </span>
        </div>
      </section>

      {/* 2. Masterpiece Spotlight Duo */}
      <section
        aria-label="Öne çıkan nadide başyapıtlar"
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
              Küratör Seçkisi
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--c-fg)',
              }}
            >
              Müze Sınıfı İki Anıt Eser
            </h2>
          </div>

          <a
            href={getSitePageRoute('rare-books', 'collection')}
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>54 Eserlik Kataloğu Gör</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          {cihannuma && <RareBookCard item={cihannuma} />}
          {melling && <RareBookCard item={melling} />}
        </div>
      </section>

      {/* 3. Seven Collecting Categories */}
      <section
        aria-label="Koleksiyon uzmanlık alanları"
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
              Katalog Taksimatı
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--c-fg)',
              }}
            >
              Yedi Tematik Koleksiyon Alanı
            </h2>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'var(--sp-4)',
          }}
        >
          {RARE_BOOK_CATEGORIES.map((cat) => {
            const count = RARE_BOOKS_CATALOG.filter((b) => b.category === cat.key).length;
            return (
              <div
                key={cat.key}
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--sp-2)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        color: 'var(--c-accent)',
                      }}
                    >
                      {count} Nadir Eser
                    </span>
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
                    {cat.label}
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-fg-muted)',
                      lineHeight: 'var(--leading-normal)',
                    }}
                  >
                    {cat.description}
                  </p>
                </div>

                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <a
                    href={`${getSitePageRoute('rare-books', 'collection')}?kategori=${cat.key}`}
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-fg-faint)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Koleksiyonu İncele</span>
                    <ArrowRight size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Active Exhibition Feature */}
      {activeExhibition && (
        <section
          aria-label="Aktif sergi tanıtımı"
          style={{
            marginBlockEnd: 'var(--sp-16)',
            background: 'var(--c-bg-subtle)',
            border: '1px solid var(--c-border-strong)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          }}
        >
          <div style={{ aspectRatio: '16/10', minHeight: '260px' }}>
            <img
              src={activeExhibition.imageUrl}
              alt={activeExhibition.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>

          <div
            style={{
              padding: 'clamp(var(--sp-6), 4vw, var(--sp-8))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-2)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: '#10b981',
                  letterSpacing: 'var(--tracking-wide)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--sp-2)',
                }}
              >
                <span>Halen Açık Olan Sergi</span>
                <span>•</span>
                <span style={{ color: 'var(--c-fg-faint)' }}>
                  {activeExhibition.dates.start} — {activeExhibition.dates.end}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--c-fg)',
                  lineHeight: 'var(--leading-snug)',
                  marginBottom: 'var(--sp-2)',
                }}
              >
                {activeExhibition.title}
              </h2>

              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--c-fg-muted)',
                  marginBottom: 'var(--sp-3)',
                }}
              >
                {activeExhibition.subtitle}
              </p>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--c-fg-faint)',
                  marginBottom: 'var(--sp-4)',
                }}
              >
                Küratör: {activeExhibition.curator} • Konum: {activeExhibition.location}
              </p>

              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--c-fg-muted)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--sp-6)',
                }}
              >
                {activeExhibition.summary}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
              <a
                href={getSitePageRoute('rare-books', 'exhibitions')}
                className="btn btn--primary"
                style={{ textDecoration: 'none', fontSize: 'var(--text-xs)' }}
              >
                <span>Sergi Eserlerini İncele</span>
                <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 5. Conservation Atelier & Provenance Commitment */}
      <section
        aria-label="Konservasyon ve Ekspertiz Prensipleri"
        style={{ marginBlockEnd: 'var(--sp-12)' }}
      >
        <div
          style={{
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: 'var(--sp-3)',
            marginBlockEnd: 'var(--sp-6)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-accent)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
            }}
          >
            Bilimsel Koruma
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              color: 'var(--c-fg)',
            }}
          >
            Konservasyon Laboratuvarı ve Provenans Güvencesi
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          <div
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--sp-6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--sp-3)' }}>
              <ShieldCheck size={20} style={{ color: 'var(--c-accent)' }} />
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-fg)', margin: 0 }}>
                ILAB & CINOA Provenans Protokolü
              </h3>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: 'var(--text-xs)',
                color: 'var(--c-fg-muted)',
                lineHeight: 'var(--leading-relaxed)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-2)',
              }}
            >
              {RARE_BOOKS_ACQUISITION_GUIDE.provenanceProtocol.map((p, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--c-accent)', fontWeight: 700 }}>•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--sp-6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--sp-3)' }}>
              <Layers size={20} style={{ color: 'var(--c-accent)' }} />
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-fg)', margin: 0 }}>
                Tersinir (Reversible) Konservasyon
              </h3>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: 'var(--text-xs)',
                color: 'var(--c-fg-muted)',
                lineHeight: 'var(--leading-relaxed)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-2)',
              }}
            >
              {RARE_BOOKS_ACQUISITION_GUIDE.conservationStandards.map((c, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--c-accent)', fontWeight: 700 }}>•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

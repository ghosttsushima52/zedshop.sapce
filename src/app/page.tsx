'use client';

import { useState, useMemo } from 'react';
import { SiteShell } from '@/core/layout';
import { SHOWCASE_SITES } from '@/lib/showcase';
import { VISUAL_SYSTEMS, PALETTES } from '@/core/theme/tokens';

const CATEGORIES = [
  { id: 'all', label: 'Tüm Sektörler (12)' },
  { id: 'commerce', label: 'Ticaret & Zanaat', match: ['real-estate', 'perfume', 'guitar'] },
  { id: 'editorial', label: 'Editoryal & Akademi', match: ['orbital-journal', 'rare-books'] },
  { id: 'hospitality', label: 'Ağırlama & İnziva', match: ['restaurant', 'hotel', 'travel'] },
  { id: 'services', label: 'Kurumsal & Sağlık', match: ['law', 'saas', 'dental', 'fitness'] },
] as const;

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSites = useMemo(() => {
    if (activeCategory === 'all') return SHOWCASE_SITES;
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    if (!cat || !('match' in cat)) return SHOWCASE_SITES;
    return SHOWCASE_SITES.filter((s) => (cat.match as readonly string[]).includes(s.id));
  }, [activeCategory]);

  return (
    <SiteShell brand="Avenox Vitrin" tagline="Sektöre göre tasarlanan çok sayfalı özgün web deneyimleri">
      <section className="showcase-intro">
        <div className="container">
          <p className="section-heading__eyebrow">
            12 sektör · 12 görsel sistem · 12 renk paleti
          </p>
          <h1>Avenox Vitrin</h1>
          <p>
            Şablonik AI görünümünden arındırılmış; restorandan emlağa, akademik araştırmadan lüks atölyelere kadar her sektörün kendi tipografik kimliği ve zanaatıyla inşa edilmiş çok sayfalı site seçkisi.
          </p>
          <div className="showcase-intro__meta">
            <span>
              <strong>{SHOWCASE_SITES.reduce((total, site) => total + site.pages.length, 0)}</strong> ana sayfa
            </span>
            <span>
              <strong>{SHOWCASE_SITES.reduce((total, site) => total + site.details.length, 0)}</strong> detay kaydı
            </span>
            <span>
              <strong>{VISUAL_SYSTEMS.length}</strong> görsel sistem
            </span>
            <span>
              <strong>{PALETTES.length}</strong> renk harmonisi
            </span>
          </div>
        </div>
      </section>

      <section className="container showcase-filter-section" style={{ paddingBlockStart: 'var(--sp-8)' }}>
        <div className="showcase-filter-tabs" role="tablist" aria-label="Sektör kategorileri" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
                className={`showcase-filter-chip ${isActive ? 'showcase-filter-chip--active' : ''}`}
                style={{
                  padding: 'var(--sp-2) var(--sp-4)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  border: '1px solid var(--c-border-strong)',
                  background: isActive ? 'var(--c-accent)' : 'var(--c-bg-raised)',
                  color: isActive ? 'var(--c-accent-fg)' : 'var(--c-fg)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="container" style={{ paddingBlockStart: 'var(--sp-8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--sp-4)', marginBlockEnd: 'var(--sp-8)' }}>
          {/* Volta Motor Feature Card */}
          <a 
            href="/sites/volta" 
            style={{ 
              display: 'block',
              textDecoration: 'none',
              padding: 'var(--sp-6)', 
              borderRadius: 'var(--radius-lg)', 
              border: '1px solid rgba(220, 38, 38, 0.3)', 
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.04) 0%, var(--c-bg-raised) 100%)',
              transition: 'transform var(--dur-fast), border-color var(--dur-fast)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: 'var(--sp-3)' }}>
              <span style={{ 
                background: '#dc2626', 
                color: '#fff', 
                fontSize: '11px', 
                fontWeight: 800, 
                padding: '3px 8px', 
                borderRadius: '6px',
                letterSpacing: '0.05em' 
              }}>
                VOLTA MOTOR RESMİ
              </span>
              <span style={{ fontSize: '11px', color: 'var(--c-fg-muted)', fontFamily: 'var(--font-mono)' }}>%100 ELEKTRİKLİ</span>
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--c-fg)', marginBlockEnd: 'var(--sp-2)' }}>
              Volta Motor & Elektrikli Mobilite
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', marginBlockEnd: 'var(--sp-4)', lineHeight: 1.5 }}>
              Popüler VSM ve VB2 PRO modelleri, %100 elektrikli sıfır emisyon filosu ve canlı admin onaylı IBAN havale sistemi.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)', fontWeight: 600, color: '#dc2626' }}>
              <span>Model ve Kampanyaları İncele →</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </a>

          {/* LegendGame Feature Card */}
          <a 
            href="/sites/legendgame" 
            style={{ 
              display: 'block',
              textDecoration: 'none',
              padding: 'var(--sp-6)', 
              borderRadius: 'var(--radius-lg)', 
              border: '1px solid rgba(6, 182, 212, 0.3)', 
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, var(--c-bg-raised) 100%)',
              transition: 'transform var(--dur-fast), border-color var(--dur-fast)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: 'var(--sp-3)' }}>
              <span style={{ 
                background: '#06b6d4', 
                color: '#080c15', 
                fontSize: '11px', 
                fontWeight: 900, 
                padding: '3px 8px', 
                borderRadius: '6px',
                letterSpacing: '0.05em' 
              }}>
                LEGENDGAME GAMING
              </span>
              <span style={{ fontSize: '11px', color: 'var(--c-fg-muted)', fontFamily: 'var(--font-mono)' }}>İTEMSATIŞ MODELİ</span>
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--c-fg)', marginBlockEnd: 'var(--sp-2)' }}>
              LegendGame Pazar Yeri & E-Pin
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', marginBlockEnd: 'var(--sp-4)', lineHeight: 1.5 }}>
              Valorant, CS2, LoL, Steam hesapları, escrow havuzu, geri sayımlı dinamik IBAN ödeme ve dekont yükleme altyapısı.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)', fontWeight: 600, color: '#06b6d4' }}>
              <span>İlanları ve Pazar Yerini Aç →</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      <main className="container showcase-grid" aria-label="Demo site seçimi">
        {filteredSites.map((site) => (
          <a
            className="showcase-card"
            href={`/sites/${site.id}/${site.pages[0].slug}/`}
            key={site.id}
          >
            <div className="showcase-card__media">
              <img
                src={site.image}
                alt={site.imageAlt}
                loading={site.order <= 4 ? 'eager' : 'lazy'}
              />
              <span>{String(site.order).padStart(2, '0')}</span>
            </div>
            <div className="showcase-card__body">
              <p className="section-heading__eyebrow">{site.category}</p>
              <h2>{site.name}</h2>
              <p>{site.description}</p>
              <footer>
                <span>
                  {site.pages.length} sayfa · {site.inventoryLabel}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </footer>
            </div>
          </a>
        ))}
      </main>
    </SiteShell>
  );
}

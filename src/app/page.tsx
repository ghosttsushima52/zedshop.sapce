'use client';

import { useState, useMemo } from 'react';
import { ArrowUpRight, Layers3, Sparkles, SlidersHorizontal } from 'lucide-react';
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
              <Layers3 size={16} /> {SHOWCASE_SITES.reduce((total, site) => total + site.pages.length, 0)} ana sayfa
            </span>
            <span>
              <Sparkles size={16} /> {SHOWCASE_SITES.reduce((total, site) => total + site.details.length, 0)} detay kaydı
            </span>
            <span>
              <SlidersHorizontal size={16} /> {VISUAL_SYSTEMS.length} görsel sistem
            </span>
            <span>
              {PALETTES.length} renk harmonisi
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
                <ArrowUpRight size={18} />
              </footer>
            </div>
          </a>
        ))}
      </main>
    </SiteShell>
  );
}

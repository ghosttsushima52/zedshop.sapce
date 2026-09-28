'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Droplets,
  Wind,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Calendar,
  Leaf,
  FlaskConical,
  Star,
} from 'lucide-react';
import { SiteShell } from '../../../core/layout';
import { SectionHeading, Button, StatStrip, FilterBar } from '../../../core/ui';
import {
  perfumes,
  perfumeFilters,
  atelierStory,
  perfumeServices,
  perfumeStores,
  getPerfumeBySlug,
  type PerfumeProduct,
  type PerfumeCategory,
  type PerfumeConcentration,
} from '../../../content/perfume';
import { sites } from '../../../content/sites';
import './perfume.css';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SITE = sites.find((s) => s.slug === 'perfume')!;
const NAV = SITE.navigation.navItems.map((n) => ({ label: n.label, href: n.href }));

function slugToDetailHref(slug: string) {
  return `/sites/perfume/detail/${slug}/`;
}
function pageHref(slug: string) {
  return `/sites/perfume/${slug}/`;
}

const CONCENTRATION_SHORTHAND: Record<string, string> = {
  'Extrait de Parfum': 'Extrait',
  'Eau de Parfum': 'EdP',
  'Eau de Toilette': 'EdT',
  'Cologne Intense': 'Cologne Intense',
  'Saf Attar Yağı': 'Attar',
};

function formatPrice(price: number) {
  return price.toLocaleString('tr-TR') + ' ₺';
}

// ---------------------------------------------------------------------------
// Perfume Card — olfactive-first hierarchy
// ---------------------------------------------------------------------------

function PerfumeCard({ perfume }: { perfume: PerfumeProduct }) {
  const concentration = CONCENTRATION_SHORTHAND[perfume.concentration] ?? perfume.concentration;

  return (
    <a
      href={slugToDetailHref(perfume.slug)}
      className="prf-card"
      aria-label={`${perfume.name} — ${concentration}, ${perfume.volumeMl} ml — ${formatPrice(perfume.price)}`}
    >
      <div className="prf-card__image-wrap">
        <img
          src={perfume.image}
          alt={perfume.imageAlt}
          loading="lazy"
          decoding="async"
          className="prf-card__image"
        />
        {perfume.featured && (
          <span className="prf-card__badge">
            <Star size={10} aria-hidden="true" /> Öne Çıkan
          </span>
        )}
        {!perfume.inStock && (
          <span className="prf-card__out-of-stock">Stok Yok</span>
        )}
      </div>

      <div className="prf-card__body">
        {/* Collection — brand storytelling context */}
        <div className="prf-card__collection">{perfume.collection}</div>

        <h3 className="prf-card__name">{perfume.name}</h3>
        <p className="prf-card__tagline">{perfume.tagline}</p>

        {/* Olfactive family — key differentiator for perfume */}
        <div className="prf-card__family">
          <Droplets size={11} aria-hidden="true" />
          <span>{perfume.category}</span>
        </div>

        {/* Notes preview */}
        <div className="prf-card__notes">
          <span className="prf-card__notes-label">Üst</span>
          <span className="prf-card__notes-value">{perfume.notes.top.slice(0, 2).join(', ')}</span>
        </div>
        <div className="prf-card__notes">
          <span className="prf-card__notes-label">Kalp</span>
          <span className="prf-card__notes-value">{perfume.notes.heart.slice(0, 2).join(', ')}</span>
        </div>

        {/* Attributes strip */}
        <div className="prf-card__attrs">
          <span title="Konsantrasyon" className="prf-card__attr prf-card__attr--concentration">
            {concentration}
          </span>
          <span title="Hacim" className="prf-card__attr">
            {perfume.volumeMl} ml
          </span>
          <span title="Mevsim" className="prf-card__attr">
            {perfume.season}
          </span>
          <span title="Kalıcılık" className="prf-card__attr">
            <Clock size={10} aria-hidden="true" /> {perfume.longevity}
          </span>
        </div>

        <div className="prf-card__footer">
          <span className="prf-card__price">{formatPrice(perfume.price)}</span>
          <span className="prf-card__gender">{perfume.gender}</span>
        </div>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page: Home (Atölye)
// ---------------------------------------------------------------------------

function PerfumeHome() {
  const featured = perfumes.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="prf-home">
      {/* Hero */}
      <section className="prf-hero">
        <div className="prf-hero__inner">
          <p className="prf-hero__eyebrow">Bağımsız Parfüm Atölyesi</p>
          <h1 className="prf-hero__title">{atelierStory.title}</h1>
          <p className="prf-hero__subtitle">{atelierStory.subtitle}</p>
          <div className="prf-hero__actions">
            <Button href={pageHref('koleksiyon')} variant="primary">Koleksiyonu Keşfet</Button>
            <Button href={pageHref('magazalar')} variant="outline">Tadım Randevusu Al</Button>
          </div>
        </div>
      </section>

      {/* Manifesto / Story */}
      <section className="prf-manifesto section-wrap">
        <div className="prf-manifesto__grid">
          <div className="prf-manifesto__text">
            {atelierStory.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="prf-manifesto__values">
            {atelierStory.values.map((v) => (
              <div key={v.title} className="prf-value-item">
                <Leaf size={18} className="prf-value-item__icon" aria-hidden="true" />
                <div>
                  <strong>{v.title}</strong>
                  <p>{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="prf-stats-section section-wrap">
        <StatStrip
          stats={[
            { value: '48', label: 'Özgün Formül' },
            { value: '3', label: 'Koku Odası' },
            { value: '120+', label: 'Gün Maserasyon' },
            { value: '500', label: 'Yıllık Üretim (Şişe)' },
          ]}
        />
      </section>

      {/* Featured perfumes */}
      <section className="prf-featured section-wrap">
        <SectionHeading
          eyebrow="Öne Çıkan Formüller"
          title="Atölyenin Seçkisi"
        />
        <div className="prf-featured__grid">
          {featured.map((p) => <PerfumeCard key={p.id} perfume={p} />)}
        </div>
        <div className="prf-featured__cta">
          <Button href={pageHref('koleksiyon')} variant="outline">Tüm 48 Formülü İncele</Button>
        </div>
      </section>

      {/* Services teaser */}
      <section className="prf-services-teaser section-wrap">
        <SectionHeading
          eyebrow="Atölye Deneyimleri"
          title="Kişisel Koku Konsültasyonları"
        />
        <div className="prf-services-teaser__grid">
          {perfumeServices.map((svc) => (
            <div key={svc.id} className="prf-service-teaser-card">
              <FlaskConical size={20} className="prf-service-teaser-card__icon" aria-hidden="true" />
              <h3>{svc.title}</h3>
              <div className="prf-service-teaser-card__meta">
                <span><Clock size={12} aria-hidden="true" /> {svc.duration}</span>
                <span>{formatPrice(svc.price)}</span>
              </div>
              <p>{svc.description}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--sp-4)' }}>
          <Button href={pageHref('magazalar')} variant="outline">Randevu İçin Mağazalarımız</Button>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page: Collection (Koleksiyon)
// ---------------------------------------------------------------------------

type PrfSortKey = 'curated' | 'price-asc' | 'price-desc' | 'longevity';

function PerfumeCollection() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeConcentration, setActiveConcentration] = useState('');
  const [activeSeason, setActiveSeason] = useState('');
  const [activeGender, setActiveGender] = useState('');
  const [sortKey, setSortKey] = useState<PrfSortKey>('curated');

  const LONGEVITY_ORDER = ['6-8 Saat', '8-10 Saat', '10-12 Saat', '12+ Saat'];

  const filtered = useMemo(() => {
    let items = [...perfumes];

    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          [...p.notes.top, ...p.notes.heart, ...p.notes.base].some((n) =>
            n.toLowerCase().includes(q)
          ) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    if (activeCategory) items = items.filter((p) => p.category === activeCategory);
    if (activeConcentration) items = items.filter((p) => p.concentration === activeConcentration);
    if (activeSeason) items = items.filter((p) => p.season === activeSeason);
    if (activeGender) items = items.filter((p) => p.gender === activeGender);

    items.sort((a, b) => {
      if (sortKey === 'price-asc') return a.price - b.price;
      if (sortKey === 'price-desc') return b.price - a.price;
      if (sortKey === 'longevity') {
        return LONGEVITY_ORDER.indexOf(b.longevity) - LONGEVITY_ORDER.indexOf(a.longevity);
      }
      // curated: featured first, then order
      const aF = a.featured ? 0 : 1;
      const bF = b.featured ? 0 : 1;
      return aF - bF;
    });

    return items;
  }, [query, activeCategory, activeConcentration, activeSeason, activeGender, sortKey]);

  const hasFilters = query || activeCategory || activeConcentration || activeSeason || activeGender;

  const clearFilters = useCallback(() => {
    setQuery('');
    setActiveCategory('');
    setActiveConcentration('');
    setActiveSeason('');
    setActiveGender('');
    setSortKey('curated');
  }, []);

  // Category chips
  const categoryChips = [
    { id: '', label: 'Tümü' },
    ...perfumeFilters.categories.map((c) => ({ id: c, label: c })),
  ];

  return (
    <div className="prf-collection">
      {/* Filter bar — sticky, min-height reserved to prevent layout shift */}
      <div className="prf-filter-bar">
        <div className="prf-filter-bar__inner">
          {/* Search */}
          <div className="prf-search-wrap">
            <Search size={15} aria-hidden="true" className="prf-search-icon" />
            <input
              type="search"
              className="prf-search-input"
              placeholder="Nota, koleksiyon, parfümör veya mevsim arayın…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Parfüm arama"
            />
            {query && (
              <button className="prf-search-clear" onClick={() => setQuery('')} aria-label="Temizle">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Concentration */}
          <div className="prf-filter-select-wrap">
            <select
              className="prf-filter-select"
              value={activeConcentration}
              onChange={(e) => setActiveConcentration(e.target.value)}
              aria-label="Konsantrasyon"
            >
              <option value="">Konsantrasyon</option>
              {perfumeFilters.concentrations.map((c) => (
                <option key={c} value={c}>{CONCENTRATION_SHORTHAND[c] ?? c}</option>
              ))}
            </select>
            <ChevronDown size={12} aria-hidden="true" />
          </div>

          {/* Season */}
          <div className="prf-filter-select-wrap">
            <select
              className="prf-filter-select"
              value={activeSeason}
              onChange={(e) => setActiveSeason(e.target.value)}
              aria-label="Mevsim"
            >
              <option value="">Mevsim</option>
              {perfumeFilters.seasons.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={12} aria-hidden="true" />
          </div>

          {/* Gender */}
          <div className="prf-filter-select-wrap">
            <select
              className="prf-filter-select"
              value={activeGender}
              onChange={(e) => setActiveGender(e.target.value)}
              aria-label="Cinsiyet yönelimi"
            >
              <option value="">Yönelim</option>
              {perfumeFilters.genders.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <ChevronDown size={12} aria-hidden="true" />
          </div>

          {/* Sort */}
          <div className="prf-filter-select-wrap">
            <select
              className="prf-filter-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as PrfSortKey)}
              aria-label="Sıralama"
            >
              <option value="curated">Küratör Sırası</option>
              <option value="price-asc">Fiyat ↑</option>
              <option value="price-desc">Fiyat ↓</option>
              <option value="longevity">Kalıcılık ↓</option>
            </select>
            <ChevronDown size={12} aria-hidden="true" />
          </div>

          {hasFilters && (
            <button className="prf-clear-btn" onClick={clearFilters}>
              <X size={13} /> Sıfırla
            </button>
          )}
        </div>

        {/* Category chips — olfactive family quick filter */}
        <div className="prf-category-chips" role="group" aria-label="Koku ailesi">
          {categoryChips.map((chip) => (
            <button
              key={chip.id}
              className={`prf-chip${chip.id === activeCategory ? ' prf-chip--active' : ''}`}
              aria-pressed={chip.id === activeCategory}
              onClick={() => setActiveCategory(chip.id === activeCategory ? '' : chip.id)}
              type="button"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div className="prf-result-count" aria-live="polite" aria-atomic="true">
          <span>{filtered.length}</span> formül gösteriliyor
        </div>
      </div>

      {/* Grid */}
      <div className="prf-collection__grid">
        {filtered.length > 0 ? (
          filtered.map((p) => <PerfumeCard key={p.id} perfume={p} />)
        ) : (
          <div className="prf-empty-state">
            <Droplets size={32} aria-hidden="true" />
            <p>Bu kriterlere uyan parfüm bulunamadı.</p>
            <Button variant="ghost" onClick={clearFilters}>Filtreleri Sıfırla</Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page: Atelier / Philosophy (Felsefe)
// ---------------------------------------------------------------------------

function PerfumeAtelier() {
  return (
    <div className="prf-atelier section-wrap">
      <SectionHeading
        eyebrow="Damıtım ve Felsefe"
        title="Toprağın Hafızası, İmbikten Süzülen Zaman"
        body="Endüstriyel üretim anlayışından bağımsız, sabır ve coğrafyanın yazdığı koku senfonileri."
      />

      {/* Story paragraphs */}
      <div className="prf-atelier__story">
        {atelierStory.paragraphs.map((p, i) => (
          <p key={i} className="prf-atelier__para">{p}</p>
        ))}
      </div>

      {/* Values grid */}
      <div className="prf-atelier__values">
        {atelierStory.values.map((v) => (
          <div key={v.title} className="prf-atelier__value-card">
            <Leaf size={24} aria-hidden="true" className="prf-atelier__value-icon" />
            <h3>{v.title}</h3>
            <p>{v.description}</p>
          </div>
        ))}
      </div>

      {/* Process — olfactive pyramid education */}
      <div className="prf-atelier__process">
        <h2>Koku Piramidini Okumak</h2>
        <p className="prf-atelier__process-intro">
          Her parfüm üç katmanlı bir piramit üzerine inşa edilir. Zaman içinde koku karakterini
          nasıl değiştirdiğini anlamak, doğru formülü seçmenin anahtarıdır.
        </p>
        <div className="prf-pyramid">
          <div className="prf-pyramid__tier prf-pyramid__tier--top">
            <span className="prf-pyramid__tier-label">Üst Notalar</span>
            <p>İlk 15–30 dakika algılanır. Açılış karakterini belirler; narenciye, yeşil, baharatlı.</p>
          </div>
          <div className="prf-pyramid__tier prf-pyramid__tier--heart">
            <span className="prf-pyramid__tier-label">Kalp Notalar</span>
            <p>30 dk – 4 saat. Parfümün gerçek kimliği burada yatar; çiçeksel, odunsu, oryantal.</p>
          </div>
          <div className="prf-pyramid__tier prf-pyramid__tier--base">
            <span className="prf-pyramid__tier-label">Dip Notalar</span>
            <p>4 saatten günün sonuna. En kalıcı katman; reçine, amber, misk, vetiver.</p>
          </div>
        </div>
      </div>

      {/* Distillation methods */}
      <div className="prf-atelier__methods">
        <h2>Hammadde Ekstraksiyonu</h2>
        <div className="prf-methods-grid">
          {[
            {
              icon: <FlaskConical size={20} aria-hidden="true" />,
              title: 'Su Buharı Distilasyonu',
              desc: 'Bakır imbikte uygulanan geleneksel yöntem. Gül, lavanta ve aromatik bitkiler için tercih edilir.',
            },
            {
              icon: <Sparkles size={20} aria-hidden="true" />,
              title: 'Soğuk Pres Ekstraksiyonu',
              desc: 'Narenciye kabuklarından yağ elde etmek için mekanik baskı; ısı uygulanmaz, en taze sonuç.',
            },
            {
              icon: <Wind size={20} aria-hidden="true" />,
              title: 'Enfleuraj ve Soğuk Maserasyon',
              desc: 'Hassas çiçeklerin yağ veya alkol içinde haftalarca bırakılması; absolü elde etmek için.',
            },
            {
              icon: <Droplets size={20} aria-hidden="true" />,
              title: 'Süperkritik CO₂ Ekstraksiyonu',
              desc: 'Modern teknoloji; baskı altındaki CO₂ ile hassas molekülleri hasarsız ekstrakte eder.',
            },
          ].map((m) => (
            <div key={m.title} className="prf-method-card">
              <div className="prf-method-card__icon">{m.icon}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--sp-6)' }}>
        <Button href={pageHref('koleksiyon')} variant="primary">Tüm Koleksiyonu Gör</Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page: Services & Stores (Mağazalar)
// ---------------------------------------------------------------------------

function PerfumeStores() {
  return (
    <div className="prf-stores section-wrap">
      <SectionHeading
        eyebrow="Koku Odaları"
        title="Karaköy, Galata ve Alaçatı Atölyeleri"
        body="Her ziyaret, kişisel koku haritanızı birlikte çizmek için bir başlangıç noktasıdır."
      />

      {/* Stores */}
      <div className="prf-stores__grid">
        {perfumeStores.map((store) => (
          <div key={store.id} className="prf-store-card">
            <div className="prf-store-card__header">
              <h2>{store.name}</h2>
              <div className="prf-store-card__location">
                <MapPin size={13} aria-hidden="true" />
                {store.district}, {store.city}
              </div>
            </div>
            <p className="prf-store-card__address">{store.address}</p>
            <div className="prf-store-card__contact">
              <Phone size={13} aria-hidden="true" />
              <a href={`tel:${store.phone}`}>{store.phone}</a>
            </div>
            <div className="prf-store-card__hours">
              <Calendar size={13} aria-hidden="true" />
              <span>{store.hours}</span>
            </div>
            <div className="prf-store-card__features">
              {store.features.map((f) => (
                <span key={f} className="prf-store-feature">{f}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="prf-services section-wrap">
        <SectionHeading
          eyebrow="Deneyimler"
          title="Atölye Hizmetleri ve Konsültasyonlar"
          level={2}
        />
        <div className="prf-services__grid">
          {perfumeServices.map((svc) => (
            <div key={svc.id} className="prf-service-card">
              <div className="prf-service-card__header">
                <h3>{svc.title}</h3>
                <div className="prf-service-card__meta">
                  <span><Clock size={13} aria-hidden="true" /> {svc.duration}</span>
                  <span className="prf-service-card__price">{formatPrice(svc.price)}</span>
                </div>
              </div>
              <p className="prf-service-card__desc">{svc.description}</p>
              <ul className="prf-service-card__includes">
                {svc.includes.map((inc, i) => (
                  <li key={i}>
                    <Sparkles size={12} aria-hidden="true" /> {inc}
                  </li>
                ))}
              </ul>
              <Button href={pageHref('magazalar')} variant="outline">
                Randevu Al
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page: Fragrance Detail
// ---------------------------------------------------------------------------

function PerfumeDetail({ itemSlug }: { itemSlug: string }) {
  const perfume = getPerfumeBySlug(itemSlug);

  if (!perfume) {
    return (
      <div className="prf-not-found section-wrap">
        <h1>Koku Bulunamadı</h1>
        <Button href={pageHref('koleksiyon')} variant="outline">
          <ArrowLeft size={15} /> Koleksiyona Dön
        </Button>
      </div>
    );
  }

  const related = perfumes
    .filter((p) => p.category === perfume.category && p.id !== perfume.id)
    .slice(0, 4);

  const concentration = CONCENTRATION_SHORTHAND[perfume.concentration] ?? perfume.concentration;

  return (
    <div className="prf-detail section-wrap">
      {/* Back */}
      <a href={pageHref('koleksiyon')} className="prf-back-nav">
        <ArrowLeft size={16} aria-hidden="true" /> Koleksiyona Dön
      </a>

      <div className="prf-detail__layout">
        {/* Image */}
        <div className="prf-detail__image-col">
          <img
            src={perfume.image}
            alt={perfume.imageAlt}
            className="prf-detail__image"
          />
          <div className="prf-detail__availability">
            {perfume.inStock ? (
              <span className="prf-in-stock">Stokta Mevcut</span>
            ) : (
              <span className="prf-out-of-stock">Geçici Olarak Tükendi</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="prf-detail__content">
          <div className="prf-detail__collection">{perfume.collection}</div>
          <h1 className="prf-detail__name">{perfume.name}</h1>
          <p className="prf-detail__tagline">{perfume.tagline}</p>

          {/* Key attributes */}
          <div className="prf-detail__attrs">
            <div className="prf-detail__attr">
              <span className="prf-detail__attr-label">Konsantrasyon</span>
              <span className="prf-detail__attr-value">{perfume.concentration}</span>
            </div>
            <div className="prf-detail__attr">
              <span className="prf-detail__attr-label">Hacim</span>
              <span className="prf-detail__attr-value">{perfume.volumeMl} ml</span>
            </div>
            <div className="prf-detail__attr">
              <span className="prf-detail__attr-label">Koku Ailesi</span>
              <span className="prf-detail__attr-value">{perfume.category}</span>
            </div>
            <div className="prf-detail__attr">
              <span className="prf-detail__attr-label">Mevsim</span>
              <span className="prf-detail__attr-value">{perfume.season}</span>
            </div>
            <div className="prf-detail__attr">
              <span className="prf-detail__attr-label">Yayılım</span>
              <span className="prf-detail__attr-value">{perfume.sillage}</span>
            </div>
            <div className="prf-detail__attr">
              <span className="prf-detail__attr-label">Kalıcılık</span>
              <span className="prf-detail__attr-value">{perfume.longevity}</span>
            </div>
            <div className="prf-detail__attr">
              <span className="prf-detail__attr-label">Yönelim</span>
              <span className="prf-detail__attr-value">{perfume.gender}</span>
            </div>
            <div className="prf-detail__attr">
              <span className="prf-detail__attr-label">Hasat Yılı</span>
              <span className="prf-detail__attr-value">{perfume.harvestYear}</span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="prf-detail__purchase">
            <span className="prf-detail__price">{formatPrice(perfume.price)}</span>
            <Button href={pageHref('magazalar')} variant="primary">
              Tadım Randevusu Al
            </Button>
          </div>
        </div>
      </div>

      {/* Full description */}
      <div className="prf-detail__description">
        <h2>Koku Profili</h2>
        <p>{perfume.description}</p>
        <blockquote className="prf-detail__character">
          Karakter: <em>{perfume.character}</em>
        </blockquote>
      </div>

      {/* Olfactive pyramid */}
      <div className="prf-detail__pyramid-section">
        <h2>Olfaktör Piramit</h2>
        <div className="prf-detail__pyramid">
          {/* Top */}
          <div className="prf-detail__pyramid-tier prf-detail__pyramid-tier--top">
            <h3>Üst Notalar <span>(İlk 30 Dakika)</span></h3>
            <div className="prf-detail__pyramid-notes">
              {perfume.notes.top.map((n) => (
                <span key={n} className="prf-note-chip prf-note-chip--top">{n}</span>
              ))}
            </div>
          </div>
          {/* Heart */}
          <div className="prf-detail__pyramid-tier prf-detail__pyramid-tier--heart">
            <h3>Kalp Notalar <span>(30 dk – 4 Saat)</span></h3>
            <div className="prf-detail__pyramid-notes">
              {perfume.notes.heart.map((n) => (
                <span key={n} className="prf-note-chip prf-note-chip--heart">{n}</span>
              ))}
            </div>
          </div>
          {/* Base */}
          <div className="prf-detail__pyramid-tier prf-detail__pyramid-tier--base">
            <h3>Dip Notalar <span>(4 Saat+)</span></h3>
            <div className="prf-detail__pyramid-notes">
              {perfume.notes.base.map((n) => (
                <span key={n} className="prf-note-chip prf-note-chip--base">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Craft details */}
      <div className="prf-detail__craft">
        <h2>Zanaatkarlık Detayları</h2>
        <dl className="prf-detail__craft-list">
          <div className="prf-detail__craft-row">
            <dt>Parfümör</dt>
            <dd>{perfume.perfumer}</dd>
          </div>
          <div className="prf-detail__craft-row">
            <dt>Damıtım Yöntemi</dt>
            <dd>{perfume.distillationMethod}</dd>
          </div>
          <div className="prf-detail__craft-row">
            <dt>Hasat</dt>
            <dd>{perfume.harvestYear}</dd>
          </div>
        </dl>
        <div className="prf-detail__tags">
          {perfume.tags.map((t) => (
            <span key={t} className="prf-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="prf-detail__related">
          <SectionHeading level={2} title={`${perfume.category} Ailesinden Diğer Formüller`} />
          <div className="prf-detail__related-grid">
            {related.map((p) => <PerfumeCard key={p.id} perfume={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

interface PerfumeRendererProps {
  pageSlug: string;
  itemSlug?: string;
}

export function PerfumeRenderer({ pageSlug, itemSlug }: PerfumeRendererProps) {
  const footerLinks = SITE.navigation.footerSections.flatMap((s) =>
    s.links.map((l) => ({ label: l.label, href: l.href }))
  );

  let content: React.ReactNode;

  if (itemSlug) {
    content = <PerfumeDetail itemSlug={itemSlug} />;
  } else {
    switch (pageSlug) {
      case 'index':
      case '':
        content = <PerfumeHome />;
        break;
      case 'koleksiyon':
        content = <PerfumeCollection />;
        break;
      case 'felsefe':
        content = <PerfumeAtelier />;
        break;
      case 'magazalar':
        content = <PerfumeStores />;
        break;
      default:
        content = <PerfumeHome />;
    }
  }

  return (
    <SiteShell
      brand={SITE.brandName}
      tagline={SITE.tagline}
      nav={NAV}
      footerLinks={footerLinks}
    >
      {content}
    </SiteShell>
  );
}

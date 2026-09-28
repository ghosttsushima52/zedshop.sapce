'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Building2,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Compass,
  Award,
  LayoutGrid,
  List,
  X,
  ExternalLink,
  Home,
} from 'lucide-react';
import { SiteShell } from '../../../core/layout';
import { SectionHeading, Button, StatStrip } from '../../../core/ui';
import {
  propertyListings,
  propertyFilterOptions,
  curatedCollections,
  neighborhoodGuides,
  editorialArticles,
  advisoryServices,
  realEstateMetadata,
  getPropertyBySlug,
  getFeaturedProperties,
  type PropertyListing,
} from '../../../content/realEstate';
import { sites } from '../../../content/sites';
import './real-estate.css';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SITE = sites.find((s) => s.slug === 'real-estate')!;

const NAV = SITE.navigation.navItems.map((n) => ({ label: n.label, href: n.href }));

function formatPrice(p: PropertyListing): string {
  return p.formattedPrice;
}

function slugToDetailHref(slug: string) {
  return `/sites/real-estate/detail/${slug}/`;
}

function pageHref(slug: string) {
  return `/sites/real-estate/${slug}/`;
}

// ---------------------------------------------------------------------------
// Property Card — architecture-first info hierarchy
// ---------------------------------------------------------------------------

function PropertyCard({ property }: { property: PropertyListing }) {
  return (
    <a
      href={slugToDetailHref(property.slug)}
      className="property-card"
      aria-label={`${property.title} — ${property.location.district}, ${property.location.city} — ${formatPrice(property)}`}
    >
      <div className="property-card__image-wrap">
        <img
          src={property.image}
          alt={property.alt}
          loading="lazy"
          decoding="async"
          className="property-card__image"
        />
        <span className="property-card__status">{property.status}</span>
        {property.featured && (
          <span className="property-card__badge">Öne Çıkan</span>
        )}
      </div>

      <div className="property-card__body">
        {/* Location — first, since location drives value */}
        <div className="property-card__location">
          <MapPin size={12} aria-hidden="true" />
          <span>
            {property.location.neighborhood}, {property.location.district} &mdash; {property.location.city}
          </span>
        </div>

        <h3 className="property-card__title">{property.name}</h3>

        {/* Category / architectural style */}
        <div className="property-card__category">{property.category}</div>

        {/* Architect — key differentiator */}
        <div className="property-card__architect">
          <Building2 size={12} aria-hidden="true" />
          <span>{property.attributes.architect}</span>
        </div>

        {/* Key metrics row */}
        <div className="property-card__specs">
          <span title="Net alan">
            <Maximize2 size={11} aria-hidden="true" /> {property.attributes.livingAreaM2} m²
          </span>
          <span title="Yatak odası">
            <BedDouble size={11} aria-hidden="true" /> {property.attributes.bedrooms} yatak
          </span>
          <span title="Banyo">
            <Bath size={11} aria-hidden="true" /> {property.attributes.bathrooms} banyo
          </span>
          <span title="Yapım yılı">{property.attributes.yearBuilt} inşa</span>
        </div>

        {/* Materials — architecture-specific data */}
        {property.attributes.materials && (
          <div className="property-card__materials">
            {property.attributes.materials.slice(0, 3).map((m) => (
              <span key={m} className="property-card__material-tag">{m}</span>
            ))}
          </div>
        )}

        <div className="property-card__footer">
          <span className="property-card__price">{formatPrice(property)}</span>
          <span className="property-card__view-link">Detay &rarr;</span>
        </div>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page: Home
// ---------------------------------------------------------------------------

function RealEstateHome() {
  const featured = getFeaturedProperties().slice(0, 6);

  return (
    <div className="re-home">
      {/* Hero */}
      <section className="re-hero">
        <div className="re-hero__inner">
          <p className="re-hero__eyebrow">Mimari &amp; Taşınmaz</p>
          <h1 className="re-hero__title">{realEstateMetadata.tagline}</h1>
          <p className="re-hero__manifesto">{realEstateMetadata.manifesto}</p>
          <div className="re-hero__actions">
            <Button href={pageHref('vitrin')} variant="primary">Portföyü İncele</Button>
            <Button href={pageHref('arama')} variant="outline">Gelişmiş Arama</Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="re-stats-section section-wrap">
        <StatStrip
          stats={[
            { value: String(realEstateMetadata.stats.totalListings), label: 'Mimari Portföy' },
            { value: String(realEstateMetadata.stats.activeCountries), label: 'Aktif Ülke' },
            { value: realEstateMetadata.stats.architectLedRatio, label: 'Mimar Onaylı' },
            { value: realEstateMetadata.stats.heritageRestorationRatio, label: 'Tarihi Miras' },
          ]}
        />
      </section>

      {/* Curated Collections */}
      <section className="re-collections section-wrap">
        <SectionHeading
          eyebrow="Tematik Seçkiler"
          title="Mimari Tipolojiye Göre Koleksiyonlar"
          body="Her koleksiyon, ortak bir yapım felsefesi, malzeme dili veya coğrafi kimlikle bağlı mülkleri bir araya getirir."
        />
        <div className="re-collections__grid">
          {curatedCollections.map((col) => (
            <a
              key={col.id}
              href={`${pageHref('arama')}?category=${col.categorySlug}`}
              className="re-collection-card"
              aria-label={`${col.title} — ${col.propertyCount} mülk`}
            >
              <img src={col.image} alt={col.alt} loading="lazy" decoding="async" />
              <div className="re-collection-card__overlay">
                <span className="re-collection-card__count">{col.propertyCount} mülk</span>
                <h3>{col.title}</h3>
                <p>{col.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="re-featured section-wrap">
        <SectionHeading
          eyebrow="Öne Çıkanlar"
          title="Bu Haftanın Mimari Seçkisi"
        />
        <div className="re-featured__grid">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="re-featured__cta">
          <Button href={pageHref('vitrin')} variant="outline">Tüm 72 Mülkü Gör</Button>
        </div>
      </section>

      {/* Editorial Articles teaser */}
      <section className="re-editorial section-wrap">
        <SectionHeading
          eyebrow="Mimari Dosyalar"
          title="Yapı, Malzeme ve Yaşam Üzerine"
        />
        <div className="re-editorial__grid">
          {editorialArticles.slice(0, 3).map((a) => (
            <article key={a.slug} className="re-editorial-card">
              <img src={a.image} alt={a.alt} loading="lazy" decoding="async" />
              <div className="re-editorial-card__body">
                <span className="re-editorial-card__meta">{a.authorRole} &middot; {a.readTime}</span>
                <h3>{a.title}</h3>
                <p>{a.lead.slice(0, 150)}&hellip;</p>
              </div>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 'var(--sp-4)', textAlign: 'center' }}>
          <Button href={pageHref('rehber')} variant="ghost">Tüm Rehber Yazılarını Oku</Button>
        </div>
      </section>

      {/* Offices */}
      <section className="re-offices section-wrap">
        <SectionHeading eyebrow="Ofislerimiz" title="Dört Şehirde Yanınızdayız" />
        <div className="re-offices__grid">
          {realEstateMetadata.offices.map((o) => (
            <div key={o.city} className="re-office-card">
              <MapPin size={16} aria-hidden="true" />
              <strong>{o.city} — {o.neighborhood}</strong>
              <p>{o.address}</p>
              <a href={`tel:${o.phone}`}>{o.phone}</a>
              <a href={`mailto:${o.email}`}>{o.email}</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page: Listings (Vitrin)
// ---------------------------------------------------------------------------

type SortKey = 'price-desc' | 'price-asc' | 'area-desc' | 'year-desc';

function RealEstateListings() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeCountry, setActiveCountry] = useState('');
  const [activeBedrooms, setActiveBedrooms] = useState<number | ''>('');
  const [sortKey, setSortKey] = useState<SortKey>('price-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let items = [...propertyListings];

    // text search
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.location.district.toLowerCase().includes(q) ||
          p.location.neighborhood.toLowerCase().includes(q) ||
          p.attributes.architect.toLowerCase().includes(q) ||
          (p.attributes.materials ?? []).some((m) => m.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    if (activeCategory) {
      items = items.filter((p) => p.category === activeCategory);
    }
    if (activeCountry) {
      items = items.filter((p) => p.location.country === activeCountry);
    }
    if (activeBedrooms !== '') {
      items = items.filter((p) => p.attributes.bedrooms >= activeBedrooms);
    }

    // sort
    items.sort((a, b) => {
      if (sortKey === 'price-desc') return b.price - a.price;
      if (sortKey === 'price-asc') return a.price - b.price;
      if (sortKey === 'area-desc') return b.attributes.livingAreaM2 - a.attributes.livingAreaM2;
      if (sortKey === 'year-desc') return b.attributes.yearBuilt - a.attributes.yearBuilt;
      return 0;
    });

    return items;
  }, [query, activeCategory, activeCountry, activeBedrooms, sortKey]);

  const clearFilters = useCallback(() => {
    setQuery('');
    setActiveCategory('');
    setActiveCountry('');
    setActiveBedrooms('');
    setSortKey('price-desc');
  }, []);

  const hasFilters = query || activeCategory || activeCountry || activeBedrooms !== '';

  return (
    <div className="re-listings">
      {/* Filter Bar — sticky, no layout shift (min-height reserved) */}
      <div className="re-filter-bar">
        <div className="re-filter-bar__inner">
          {/* Search */}
          <div className="re-search-wrap">
            <Search size={16} aria-hidden="true" className="re-search-icon" />
            <input
              type="search"
              className="re-search-input"
              placeholder="Bölge, mimar, malzeme veya etiket arayın…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Mülk arama"
            />
            {query && (
              <button
                className="re-search-clear"
                onClick={() => setQuery('')}
                aria-label="Aramayı temizle"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="re-filter-select-wrap">
            <SlidersHorizontal size={14} aria-hidden="true" />
            <select
              className="re-filter-select"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              aria-label="Mimari kategori"
            >
              <option value="">Tüm Tipolojiler</option>
              {propertyFilterOptions.categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={12} aria-hidden="true" />
          </div>

          {/* Country filter */}
          <div className="re-filter-select-wrap">
            <select
              className="re-filter-select"
              value={activeCountry}
              onChange={(e) => setActiveCountry(e.target.value)}
              aria-label="Ülke filtresi"
            >
              <option value="">Tüm Ülkeler</option>
              {propertyFilterOptions.countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={12} aria-hidden="true" />
          </div>

          {/* Bedrooms filter */}
          <div className="re-filter-select-wrap">
            <BedDouble size={14} aria-hidden="true" />
            <select
              className="re-filter-select"
              value={activeBedrooms}
              onChange={(e) => setActiveBedrooms(e.target.value === '' ? '' : Number(e.target.value))}
              aria-label="Minimum yatak odası"
            >
              <option value="">Yatak Odası</option>
              {propertyFilterOptions.bedroomOptions.map((n) => (
                <option key={n} value={n}>{n}+ yatak</option>
              ))}
            </select>
            <ChevronDown size={12} aria-hidden="true" />
          </div>

          {/* Sort */}
          <div className="re-filter-select-wrap">
            <select
              className="re-filter-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              aria-label="Sıralama"
            >
              <option value="price-desc">Fiyat ↓</option>
              <option value="price-asc">Fiyat ↑</option>
              <option value="area-desc">Alan ↓</option>
              <option value="year-desc">Yapım Yılı</option>
            </select>
            <ChevronDown size={12} aria-hidden="true" />
          </div>

          {/* View toggle */}
          <div className="re-view-toggle" role="group" aria-label="Görünüm">
            <button
              className={`re-view-btn${viewMode === 'grid' ? ' re-view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
              aria-label="Izgara görünümü"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              className={`re-view-btn${viewMode === 'list' ? ' re-view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-pressed={viewMode === 'list'}
              aria-label="Liste görünümü"
            >
              <List size={15} />
            </button>
          </div>

          {hasFilters && (
            <button className="re-clear-btn" onClick={clearFilters}>
              <X size={13} /> Filtreleri Temizle
            </button>
          )}
        </div>

        {/* Result count — stable height to avoid layout shift */}
        <div className="re-result-count" aria-live="polite" aria-atomic="true">
          <span>{filtered.length}</span> mülk gösteriliyor
          {hasFilters && <span className="re-result-count__filtered"> (filtrelenmiş)</span>}
        </div>
      </div>

      {/* Grid / List */}
      <div className={`re-listings__grid re-listings__grid--${viewMode}`}>
        {filtered.length > 0 ? (
          filtered.map((p) =>
            viewMode === 'grid' ? (
              <PropertyCard key={p.id} property={p} />
            ) : (
              <PropertyListRow key={p.id} property={p} />
            )
          )
        ) : (
          <div className="re-empty-state">
            <Search size={32} aria-hidden="true" />
            <p>Bu kriterlere uyan mülk bulunamadı.</p>
            <Button variant="ghost" onClick={clearFilters}>Filtreleri Sıfırla</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyListRow({ property }: { property: PropertyListing }) {
  return (
    <a
      href={slugToDetailHref(property.slug)}
      className="property-list-row"
      aria-label={`${property.title}`}
    >
      <img
        src={property.image}
        alt={property.alt}
        loading="lazy"
        decoding="async"
        className="property-list-row__image"
      />
      <div className="property-list-row__body">
        <div className="property-list-row__location">
          <MapPin size={12} /> {property.location.neighborhood}, {property.location.district}
        </div>
        <h3 className="property-list-row__title">{property.name}</h3>
        <div className="property-list-row__category">{property.category}</div>
        <p className="property-list-row__description">{property.description.slice(0, 140)}&hellip;</p>
        <div className="property-list-row__specs">
          <span><Maximize2 size={11} /> {property.attributes.livingAreaM2} m²</span>
          <span><BedDouble size={11} /> {property.attributes.bedrooms}</span>
          <span><Bath size={11} /> {property.attributes.bathrooms}</span>
          <span>Mimar: {property.attributes.architect}</span>
        </div>
      </div>
      <div className="property-list-row__price">
        <span className="property-list-row__price-value">{formatPrice(property)}</span>
        <span className="property-list-row__status">{property.status}</span>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page: Search (Arama) — focused advanced search UI
// ---------------------------------------------------------------------------

function RealEstateSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [style, setStyle] = useState('');
  const [minBeds, setMinBeds] = useState<number | ''>('');
  const [amenity, setAmenity] = useState('');

  const results = useMemo(() => {
    let items = [...propertyListings];
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          (p.attributes.materials ?? []).some((m) => m.toLowerCase().includes(q))
      );
    }
    if (category) items = items.filter((p) => p.category === category);
    if (country) items = items.filter((p) => p.location.country === country);
    if (style) items = items.filter((p) => p.category === style);
    if (minBeds !== '') items = items.filter((p) => p.attributes.bedrooms >= minBeds);
    if (amenity) items = items.filter((p) => p.tags.some((t) => t.includes(amenity.toLowerCase())));
    return items;
  }, [query, category, country, style, minBeds, amenity]);

  return (
    <div className="re-search-page section-wrap">
      <SectionHeading
        eyebrow="Tipoloji Arama"
        title="Mimari ve Coğrafi Arama Motoru"
        body="Mimar adı, yapım malzemesi, enerji sınıfı veya konuma göre 72 mülk arasında filtreleme yapın."
      />

      <div className="re-advanced-search">
        <div className="re-advanced-search__fields">
          {/* Full text */}
          <div className="re-adv-field re-adv-field--wide">
            <label htmlFor="re-adv-query">Serbest Arama</label>
            <div className="re-adv-input-wrap">
              <Search size={16} />
              <input
                id="re-adv-query"
                type="search"
                placeholder="Bölge, mimar, Urla andeziti, brüt beton…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div className="re-adv-field">
            <label htmlFor="re-adv-cat">Mimari Tipoloji</label>
            <select
              id="re-adv-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Tümü</option>
              {propertyFilterOptions.categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div className="re-adv-field">
            <label htmlFor="re-adv-country">Ülke</label>
            <select
              id="re-adv-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Tümü</option>
              {propertyFilterOptions.countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Architectural Style */}
          <div className="re-adv-field">
            <label htmlFor="re-adv-style">Yapı Stili</label>
            <select
              id="re-adv-style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="">Tümü</option>
              {propertyFilterOptions.categories.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div className="re-adv-field">
            <label htmlFor="re-adv-beds">Min. Yatak Odası</label>
            <select
              id="re-adv-beds"
              value={minBeds}
              onChange={(e) => setMinBeds(e.target.value === '' ? '' : Number(e.target.value))}
            >
              <option value="">Farketmez</option>
              {propertyFilterOptions.bedroomOptions.map((n) => (
                <option key={n} value={n}>{n}+</option>
              ))}
            </select>
          </div>

          {/* Key amenity tag */}
          <div className="re-adv-field">
            <label htmlFor="re-adv-amenity">Özellik / Etiket</label>
            <select
              id="re-adv-amenity"
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
            >
              <option value="">Tümü</option>
              {propertyFilterOptions.keyAmenities.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result summary */}
        <div className="re-adv-results-header" aria-live="polite">
          <span><strong>{results.length}</strong> mülk bulundu</span>
          {(query || category || country || minBeds !== '' || amenity) && (
            <button
              className="re-clear-btn"
              onClick={() => { setQuery(''); setCategory(''); setCountry(''); setStyle(''); setMinBeds(''); setAmenity(''); }}
            >
              <X size={13} /> Sıfırla
            </button>
          )}
        </div>

        <div className="re-listings__grid re-listings__grid--grid">
          {results.length > 0 ? (
            results.map((p) => <PropertyCard key={p.id} property={p} />)
          ) : (
            <div className="re-empty-state">
              <Search size={32} />
              <p>Bu kriterlere uyan mülk bulunamadı. Filtreleri gevşetin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page: Neighborhoods (Bölge Rehberleri)
// ---------------------------------------------------------------------------

function RealEstateNeighborhoods() {
  return (
    <div className="re-neighborhoods section-wrap">
      <SectionHeading
        eyebrow="Bölge Rehberleri"
        title="Coğrafya, Mimari Kimlik ve Yaşam Kültürü"
        body="Her bölgenin kendine özgü yapı malzemesi dilini, topografyasını ve yaşam temposunu anlatan derinlemesine rehberler."
      />

      <div className="re-neighborhoods__grid">
        {neighborhoodGuides.map((guide) => (
          <article key={guide.slug} className="re-neighborhood-card">
            <div className="re-neighborhood-card__image-wrap">
              <img src={guide.image} alt={guide.alt} loading="lazy" decoding="async" />
              <span className="re-neighborhood-card__region">
                <Compass size={12} aria-hidden="true" /> {guide.region}
              </span>
            </div>
            <div className="re-neighborhood-card__body">
              <h2>{guide.title}</h2>
              <p className="re-neighborhood-card__lead">{guide.lead}</p>

              <div className="re-neighborhood-card__section">
                <strong><Building2 size={13} /> Mimari Kimlik</strong>
                <p>{guide.architecturalIdentity}</p>
              </div>

              <div className="re-neighborhood-card__section">
                <strong><Home size={13} /> Yaşam Profili</strong>
                <p>{guide.lifestyleProfile}</p>
              </div>

              <ul className="re-neighborhood-card__highlights">
                {guide.highlights.map((h, i) => (
                  <li key={i}>
                    <CheckCircle2 size={12} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>

              <Button
                href={`${pageHref('arama')}?region=${guide.slug}`}
                variant="ghost"
              >
                Bu Bölgedeki Mülkler &rarr;
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page: Advisory (Rehber/Danışmanlık)
// ---------------------------------------------------------------------------

function RealEstateAdvisory() {
  return (
    <div className="re-advisory section-wrap">
      <SectionHeading
        eyebrow="Danışmanlık ve Edinim"
        title="Mimari Koruma ve Satın Alma Rehberi"
        body="Tarihi yapı edinimleri, restorasyon süreçleri ve uluslararası portföy yönetimi için uzman danışmanlık."
      />

      {/* Advisory steps */}
      <div className="re-advisory__steps">
        {advisoryServices.map((svc) => (
          <div key={svc.id} className="re-advisory-step">
            <div className="re-advisory-step__number">{svc.stepNumber}</div>
            <div className="re-advisory-step__content">
              <h3>{svc.title}</h3>
              <p className="re-advisory-step__lead">{svc.lead}</p>
              <p className="re-advisory-step__desc">{svc.description}</p>
              <ul className="re-advisory-step__deliverables">
                {svc.deliverables.map((d, i) => (
                  <li key={i}>
                    <CheckCircle2 size={13} aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Articles */}
      <div className="re-advisory__articles">
        <SectionHeading
          eyebrow="Mimari Dosyalar"
          title="Derinlemesine Teknik Yazılar"
          level={3}
        />
        <div className="re-advisory__articles-grid">
          {editorialArticles.map((a) => (
            <article key={a.slug} className="re-article-card">
              <img src={a.image} alt={a.alt} loading="lazy" decoding="async" />
              <div className="re-article-card__body">
                <div className="re-article-card__meta">
                  <span>{a.author}</span>
                  <span>{a.authorRole}</span>
                  <span>{a.date}</span>
                  <span><BookOpen size={11} /> {a.readTime}</span>
                </div>
                <h3>{a.title}</h3>
                <p className="re-article-card__subtitle">{a.subtitle}</p>
                <p className="re-article-card__lead">{a.lead}</p>
                <blockquote className="re-article-card__quote">
                  &ldquo;{a.quote}&rdquo;
                </blockquote>
                <div className="re-article-card__tags">
                  {a.tags.map((t) => (
                    <span key={t} className="re-tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page: Property Detail
// ---------------------------------------------------------------------------

function RealEstatePropertyDetail({ itemSlug }: { itemSlug: string }) {
  const property = getPropertyBySlug(itemSlug);

  if (!property) {
    return (
      <div className="re-not-found section-wrap">
        <h1>Mülk Bulunamadı</h1>
        <p>Bu slug&apos;a ait bir mülk portföyde yer almıyor.</p>
        <Button href={pageHref('vitrin')} variant="outline">
          <ArrowLeft size={15} /> Portföye Dön
        </Button>
      </div>
    );
  }

  const related = propertyListings
    .filter((p) => p.category === property.category && p.id !== property.id)
    .slice(0, 3);

  return (
    <div className="re-detail section-wrap">
      {/* Back nav */}
      <a href={pageHref('vitrin')} className="re-back-nav">
        <ArrowLeft size={16} aria-hidden="true" /> Portföye Dön
      </a>

      {/* Title & Location */}
      <div className="re-detail__header">
        <div className="re-detail__header-text">
          <div className="re-detail__location">
            <MapPin size={14} aria-hidden="true" />
            {property.location.neighborhood}, {property.location.district} &mdash; {property.location.city}, {property.location.country}
          </div>
          <h1 className="re-detail__title">{property.title}</h1>
          <div className="re-detail__category">{property.category}</div>
          <div className="re-detail__architect">
            <Building2 size={14} aria-hidden="true" />
            {property.attributes.architect}
            {property.attributes.yearRestored
              ? ` · Restorasyon: ${property.attributes.yearRestored}`
              : ` · ${property.attributes.yearBuilt} İnşa`}
          </div>
        </div>
        <div className="re-detail__price-block">
          <span className="re-detail__price">{formatPrice(property)}</span>
          <span className={`re-detail__status re-detail__status--${property.status.toLowerCase().replace(/ /g, '-')}`}>
            {property.status}
          </span>
          <Button href={pageHref('iletisim')} variant="primary" className="re-detail__cta">
            Portföy Görüşmesi Talep Et
          </Button>
        </div>
      </div>

      {/* Gallery */}
      <div className="re-detail__gallery">
        <img
          src={property.image}
          alt={property.alt}
          className="re-detail__gallery-main"
        />
        {property.gallery.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${property.name} — ${i + 1}. görsel`}
            loading="lazy"
            decoding="async"
            className="re-detail__gallery-thumb"
          />
        ))}
      </div>

      {/* Description */}
      <div className="re-detail__body">
        <div className="re-detail__description">
          <h2>Mülk Hakkında</h2>
          <p>{property.description}</p>
        </div>

        {/* Specification table */}
        <div className="re-detail__specs-panel">
          <h2>Teknik Özellikler</h2>
          <dl className="re-detail__spec-list">
            <div className="re-detail__spec-row">
              <dt>Net Yaşam Alanı</dt>
              <dd>{property.attributes.livingAreaM2} m²</dd>
            </div>
            <div className="re-detail__spec-row">
              <dt>Brüt Alan</dt>
              <dd>{property.attributes.areaM2} m²</dd>
            </div>
            {property.attributes.plotSizeM2 && (
              <div className="re-detail__spec-row">
                <dt>Arsa</dt>
                <dd>{property.attributes.plotSizeM2} m²</dd>
              </div>
            )}
            <div className="re-detail__spec-row">
              <dt>Yatak Odası</dt>
              <dd>{property.attributes.bedrooms}</dd>
            </div>
            <div className="re-detail__spec-row">
              <dt>Banyo</dt>
              <dd>{property.attributes.bathrooms}</dd>
            </div>
            <div className="re-detail__spec-row">
              <dt>Otopark</dt>
              <dd>{property.attributes.parkingSpots} araçlık</dd>
            </div>
            <div className="re-detail__spec-row">
              <dt>İnşa Yılı</dt>
              <dd>{property.attributes.yearBuilt}</dd>
            </div>
            {property.attributes.yearRestored && (
              <div className="re-detail__spec-row">
                <dt>Restorasyon</dt>
                <dd>{property.attributes.yearRestored}</dd>
              </div>
            )}
            <div className="re-detail__spec-row">
              <dt>Isıtma / Soğutma</dt>
              <dd>{property.attributes.heatingCooling}</dd>
            </div>
            <div className="re-detail__spec-row">
              <dt>Enerji Sınıfı</dt>
              <dd>{property.attributes.energyRating}</dd>
            </div>
            <div className="re-detail__spec-row">
              <dt>Manzara</dt>
              <dd>{property.attributes.view}</dd>
            </div>
            {property.attributes.orientation && (
              <div className="re-detail__spec-row">
                <dt>Cephe Yönü</dt>
                <dd>{property.attributes.orientation}</dd>
              </div>
            )}
          </dl>

          {/* Materials */}
          {property.attributes.materials && property.attributes.materials.length > 0 && (
            <div className="re-detail__materials">
              <h3>Yapı Malzemeleri</h3>
              <div className="re-detail__material-tags">
                {property.attributes.materials.map((m) => (
                  <span key={m} className="re-material-chip">{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="re-detail__tags">
            {property.tags.map((t) => (
              <span key={t} className="re-tag">{t}</span>
            ))}
          </div>

          {/* Coordinates */}
          {property.location.coordinates && (
            <div className="re-detail__coordinates">
              <Compass size={13} aria-hidden="true" />
              <span>
                {property.location.coordinates.lat.toFixed(4)}°N,{' '}
                {property.location.coordinates.lng.toFixed(4)}°E
              </span>
              <a
                href={`https://maps.google.com/?q=${property.location.coordinates.lat},${property.location.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="re-map-link"
                aria-label="Google Maps'te görüntüle"
              >
                <ExternalLink size={12} /> Haritada Gör
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="re-detail__related">
          <SectionHeading level={2} title="Benzer Mimari Tipolojide Mülkler" />
          <div className="re-detail__related-grid">
            {related.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

interface RealEstateRendererProps {
  pageSlug: string;
  itemSlug?: string;
}

export function RealEstateRenderer({ pageSlug, itemSlug }: RealEstateRendererProps) {
  const footerLinks = SITE.navigation.footerSections.flatMap((s) =>
    s.links.map((l) => ({ label: l.label, href: l.href }))
  );

  let content: React.ReactNode;

  if (itemSlug) {
    content = <RealEstatePropertyDetail itemSlug={itemSlug} />;
  } else {
    switch (pageSlug) {
      case 'index':
      case '':
        content = <RealEstateHome />;
        break;
      case 'vitrin':
        content = <RealEstateListings />;
        break;
      case 'arama':
        content = <RealEstateSearch />;
        break;
      case 'rehber':
        content = (
          <>
            <RealEstateNeighborhoods />
            <RealEstateAdvisory />
          </>
        );
        break;
      default:
        content = <RealEstateHome />;
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

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Gauge, Music2, Search, SlidersHorizontal, Sparkles, Wrench } from 'lucide-react';
import { SiteShell } from '../../../core/layout';
import { Button, Card, DetailPanel, ItemGrid, MediaFrame, SectionHeading, StatStrip } from '../../../core/ui';
import { guitarFilters, guitarStoreStory, guitarTestingRooms, guitars, getGuitarBySlug, luthierServices } from '../../../content/guitars';

const NAV = [
  { label: 'Vitrin', href: '/sites/guitar/index/' },
  { label: 'Gitarlar', href: '/sites/guitar/katalog/' },
  { label: 'Atölye', href: '/sites/guitar/atolye/' },
  { label: 'Dinleme odaları', href: '/sites/guitar/odalar/' },
  { label: 'Hikâyemiz', href: '/sites/guitar/hikaye/' },
];

const formatPrice = (value: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value);

function GuitarHome() {
  const featured = guitars.filter((guitar) => guitar.featured).slice(0, 6);
  return (
    <>
      <section className="sector-hero sector-hero--guitar">
        <div className="container">
          <p className="section-heading__eyebrow">Galata · İstanbul</p>
          <h1>Bir enstrümanı fotoğrafından değil, rezonansından seçin.</h1>
          <p>Modern üretimlerden arşiv değerindeki gövdelere uzanan 64 parçalık seçki; her gitar teslimden önce luthier masamızdan geçer.</p>
          <div className="hero-actions"><Button href="/sites/guitar/katalog/">Kataloğu aç <ArrowRight size={16} /></Button><Button href="/sites/guitar/atolye/" variant="outline">Atölyeyi incele</Button></div>
        </div>
      </section>
      <section className="container section-block">
        <StatStrip stats={[{ value: '64', label: 'Seçili gitar' }, { value: '6', label: 'Gövde ailesi' }, { value: '3', label: 'Dinleme odası' }, { value: '48 sa.', label: 'Kurulum standardı' }]} />
        <SectionHeading eyebrow="Luthier seçkisi" title="Tezgahtaki altı enstrüman" body="Seri üretimden özel yapıma, farklı çalma karakterlerini aynı odada karşılaştırın." />
        <ItemGrid columns={3}>
          {featured.map((guitar) => <Card key={guitar.slug} title={guitar.name} meta={`${guitar.brand} · ${guitar.category}`} description={guitar.description} price={formatPrice(guitar.price)} image={guitar.image} imageAlt={guitar.imageAlt} href={`/sites/guitar/detail/${guitar.slug}/`} />)}
        </ItemGrid>
      </section>
    </>
  );
}

function GuitarCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [handedness, setHandedness] = useState('all');
  const [sort, setSort] = useState('featured');
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('tr-TR');
    const result = guitars.filter((guitar) =>
      (!normalized || `${guitar.brand} ${guitar.name} ${guitar.series}`.toLocaleLowerCase('tr-TR').includes(normalized)) &&
      (category === 'all' || guitar.category === category) &&
      (handedness === 'all' || guitar.handedness === handedness)
    );
    return [...result].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : Number(b.featured) - Number(a.featured));
  }, [query, category, handedness, sort]);

  return (
    <section className="container section-block">
      <SectionHeading eyebrow="64 enstrüman" title="Gitar kataloğu" body="Gövde, yön ve fiyat aralığını daraltın; her kayıt ayrıntılı teknik föye açılır." />
      <div className="catalog-toolbar">
        <label className="search-field"><Search size={17} /><span className="sr-only">Gitar ara</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Marka veya model ara" /></label>
        <label><SlidersHorizontal size={16} /><span className="sr-only">Kategori</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Tüm gövdeler</option>{guitarFilters.categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">El uyumu</span><select value={handedness} onChange={(e) => setHandedness(e.target.value)}><option value="all">Sağ ve sol el</option>{guitarFilters.handedness.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Sıralama</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Öne çıkanlar</option><option value="price-asc">Fiyat: artan</option><option value="price-desc">Fiyat: azalan</option></select></label>
      </div>
      <p className="catalog-count">{filtered.length} enstrüman gösteriliyor</p>
      <ItemGrid columns={3}>
        {filtered.map((guitar) => <Card key={guitar.slug} title={guitar.name} meta={`${guitar.category} · ${guitar.handedness}`} description={`${guitar.specs.bodyWood}; ${guitar.specs.pickups}`} price={formatPrice(guitar.price)} image={guitar.image} imageAlt={guitar.imageAlt} href={`/sites/guitar/detail/${guitar.slug}/`} />)}
      </ItemGrid>
    </section>
  );
}

function GuitarWorkshop() {
  return <section className="container section-block"><SectionHeading eyebrow="Plek + el işçiliği" title="Atölye masası" body="Tesviye, elektronik, kemik eşik ve restorasyon işlerini aynı ekip takip eder." /><ItemGrid columns={3}>{luthierServices.map((service) => <article className="service-panel" key={service.id}><Wrench size={20} /><p className="section-heading__eyebrow">{service.category}</p><h2>{service.name}</h2><p>{service.description}</p><dl><div><dt>Süre</dt><dd>{service.estimatedDays}</dd></div><div><dt>Başlangıç</dt><dd>{formatPrice(service.priceTRY)}</dd></div></dl><ul>{service.details.map((detail) => <li key={detail}><Check size={14} />{detail}</li>)}</ul></article>)}</ItemGrid></section>;
}

function GuitarRooms() {
  return <section className="container section-block"><SectionHeading eyebrow="Randevulu dinleme" title="Üç farklı akustik bağlam" body="Bir gitarın karakterini sessiz odada, lamba amfide ve kontrollü alt frekansta ayrı ayrı dinleyin." /><ItemGrid columns={3}>{guitarTestingRooms.map((room) => <article className="media-story" key={room.id}><MediaFrame src={room.image} alt={room.name} aspect="4-3" /><h2>{room.name}</h2><p>{room.description}</p><p className="catalog-count">{room.environmentSpecs}</p><ul>{room.equipment.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</ItemGrid></section>;
}

function GuitarStory() {
  return <section className="container section-block editorial-copy"><SectionHeading eyebrow="Perde Luthier" title={guitarStoreStory.title} body={guitarStoreStory.subtitle} />{guitarStoreStory.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}<ItemGrid columns={3}>{guitarStoreStory.guarantees.map((item) => <article className="service-panel" key={item.title}><Sparkles size={18} /><h2>{item.title}</h2><p>{item.desc}</p></article>)}</ItemGrid></section>;
}

function GuitarDetail({ itemSlug }: { itemSlug: string }) {
  const guitar = getGuitarBySlug(itemSlug);
  if (!guitar) return <section className="container section-block"><h1>Enstrüman bulunamadı</h1><Link href="/sites/guitar/katalog/"><ArrowLeft size={16} /> Kataloğa dön</Link></section>;
  const specs = Object.entries(guitar.specs).map(([key, value]) => ({ key: key.replace(/([A-Z])/g, ' $1'), value: String(value) }));
  return <section className="container section-block"><Link className="back-link" href="/sites/guitar/katalog/"><ArrowLeft size={16} /> Kataloğa dön</Link><DetailPanel title={guitar.name} description={guitar.description} image={guitar.image} imageAlt={guitar.imageAlt} meta={[{ key: 'Marka / seri', value: `${guitar.brand} · ${guitar.series}` }, { key: 'Kategori', value: guitar.category }, { key: 'Üretim', value: `${guitar.yearOfProduction} · ${guitar.originCountry}` }, { key: 'Durum', value: guitar.availability }, { key: 'Fiyat', value: formatPrice(guitar.price) }]} cta={<Button>Dinleme randevusu iste</Button>}><div className="spec-table">{specs.map((spec) => <div key={spec.key}><span>{spec.key}</span><strong>{spec.value}</strong></div>)}</div></DetailPanel></section>;
}

export function GuitarRenderer({ pageSlug, itemSlug }: { pageSlug: string; itemSlug?: string }) {
  let content = itemSlug ? <GuitarDetail itemSlug={itemSlug} /> : pageSlug === 'katalog' ? <GuitarCatalog /> : pageSlug === 'atolye' ? <GuitarWorkshop /> : pageSlug === 'odalar' ? <GuitarRooms /> : pageSlug === 'hikaye' ? <GuitarStory /> : <GuitarHome />;
  return <SiteShell brand="Perde Luthier" tagline="Enstrüman evi ve bakım atölyesi" nav={NAV}>{content}</SiteShell>;
}


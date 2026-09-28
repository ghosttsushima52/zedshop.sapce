'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, Landmark, Search, ShieldCheck } from 'lucide-react';
import { SiteShell } from '../../../core/layout';
import { Button, Card, DetailPanel, ItemGrid, MediaFrame, SectionHeading, StatStrip } from '../../../core/ui';
import { RARE_BOOK_CATEGORIES, RARE_BOOKS_ACQUISITION_GUIDE, RARE_BOOKS_CATALOG, RARE_BOOKS_EXHIBITIONS } from '../../../content/rareBooks';

const NAV = [
  { label: 'Galeri', href: '/sites/rare-books/home/' },
  { label: 'Koleksiyon', href: '/sites/rare-books/collection/' },
  { label: 'Sergiler', href: '/sites/rare-books/exhibitions/' },
  { label: 'Edinim', href: '/sites/rare-books/acquisition/' },
];

function Home() {
  const spotlight = RARE_BOOKS_CATALOG.slice(0, 6);
  return <><section className="sector-hero sector-hero--books"><div className="container"><p className="section-heading__eyebrow">Nadirat · Beyoğlu</p><h1>Kâğıdın hafızasını, kaydın izini koruyan bir oda.</h1><p>Osmanlı matbuatı, erken bilim, kartografya ve imzalı ilk baskılardan oluşan 54 parçalık araştırma koleksiyonu.</p><Button href="/sites/rare-books/collection/">Koleksiyona gir <ArrowRight size={16} /></Button></div></section><section className="container section-block"><StatStrip stats={[{ value: '54', label: 'Katalog kaydı' }, { value: '7', label: 'Araştırma alanı' }, { value: '4', label: 'Küratöryel sergi' }, { value: '48 sa.', label: 'Belge inceleme' }]} /><SectionHeading eyebrow="Okuma masasında" title="Küratörün güncel seçkisi" /><ItemGrid columns={3}>{spotlight.map((item) => <Card key={item.slug} title={item.title} meta={`${item.author} · ${item.year}`} description={item.significance} price={item.displayPrice} image={item.imageUrl} imageAlt={item.alt} href={`/sites/rare-books/detail/${item.slug}/`} />)}</ItemGrid></section></>;
}

function Collection() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const filtered = useMemo(() => { const q = query.toLocaleLowerCase('tr-TR'); return RARE_BOOKS_CATALOG.filter((item) => (!q || `${item.title} ${item.author} ${item.period}`.toLocaleLowerCase('tr-TR').includes(q)) && (category === 'all' || item.category === category)); }, [query, category]);
  return <section className="container section-block"><SectionHeading eyebrow="54 kayıt" title="Koleksiyon dizini" body="Eser adı, müellif veya dönemle arayın; her kayıt provenans ve kondisyon notlarına açılır." /><div className="catalog-toolbar"><label className="search-field"><Search size={17} /><span className="sr-only">Koleksiyonda ara</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Eser, müellif veya dönem" /></label><label><span className="sr-only">Kategori</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Tüm alanlar</option>{RARE_BOOK_CATEGORIES.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label></div><p className="catalog-count">{filtered.length} kayıt</p><ItemGrid columns={3}>{filtered.map((item) => <Card key={item.slug} title={item.title} meta={`${item.author} · ${item.year}`} description={item.condition} price={item.displayPrice} image={item.imageUrl} imageAlt={item.alt} href={`/sites/rare-books/detail/${item.slug}/`} />)}</ItemGrid></section>;
}

function Exhibitions() { return <section className="container section-block"><SectionHeading eyebrow="Sergi takvimi" title="Belgenin bağlamını yeniden kurmak" body="Her dosya, eserleri yalnız nesne olarak değil düşünsel bir hat üzerinde birlikte okur." /><div className="editorial-stack">{RARE_BOOKS_EXHIBITIONS.map((item) => <article className="exhibition-row" key={item.slug}><MediaFrame src={item.imageUrl} alt={item.alt} aspect="3-2" /><div><p className="section-heading__eyebrow">{item.dates.start} — {item.dates.end}</p><h2>{item.title}</h2><p>{item.subtitle}</p><p>{item.summary}</p><dl><div><dt>Küratör</dt><dd>{item.curator}</dd></div><div><dt>Mekân</dt><dd>{item.location}</dd></div></dl></div></article>)}</div></section>; }

function Acquisition() { const guide = RARE_BOOKS_ACQUISITION_GUIDE; return <section className="container section-block editorial-copy"><SectionHeading eyebrow="Özel satış ve danışmanlık" title={guide.title} body={guide.summary} /><div className="editorial-two-col"><article><ShieldCheck size={22} /><h2>Provenans protokolü</h2><ul>{guide.provenanceProtocol.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><h2>Konservasyon</h2><ul>{guide.conservationStandards.map((item) => <li key={item}>{item}</li>)}</ul></article><article><Landmark size={22} /><h2>Özel satış süreci</h2><ol>{guide.privateSaleProcess.map((step) => <li key={step.step}><span>{step.step}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div></li>)}</ol></article></div></section>; }

function Detail({ slug }: { slug: string }) { const item = RARE_BOOKS_CATALOG.find((entry) => entry.slug === slug); if (!item) return <section className="container section-block"><h1>Kayıt bulunamadı</h1></section>; return <section className="container section-block"><Link className="back-link" href="/sites/rare-books/collection/"><ArrowLeft size={16} /> Koleksiyona dön</Link><DetailPanel title={item.title} description={item.description} image={item.imageUrl} imageAlt={item.alt} meta={[{ key: 'Müellif', value: item.author }, { key: 'Tarih / dönem', value: `${item.year} · ${item.period}` }, { key: 'Cilt', value: item.binding }, { key: 'Dil / sayfa', value: `${item.language} · ${item.pages}` }, { key: 'Kondisyon', value: item.condition }, { key: 'Bedel', value: item.displayPrice }]} cta={<Button>Eser dosyası iste</Button>}><h2>Provenans</h2><p>{item.provenance}</p><h2>Bibliyografik önemi</h2><p>{item.significance}</p><ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></DetailPanel></section>; }

export function RareBooksRenderer({ pageSlug, itemSlug }: { pageSlug: string; itemSlug?: string }) { const content = itemSlug ? <Detail slug={itemSlug} /> : pageSlug === 'collection' ? <Collection /> : pageSlug === 'exhibitions' ? <Exhibitions /> : pageSlug === 'acquisition' ? <Acquisition /> : <Home />; return <SiteShell brand="Nadirat Kitap & Matbua" tagline="Nadir kitap, harita ve baskı galerisi" nav={NAV}>{content}</SiteShell>; }


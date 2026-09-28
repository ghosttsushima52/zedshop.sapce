/**
 * Services Sector Route Manifest
 * Defines all available routes, page slugs, detail items and metadata
 * across Law, SaaS, Dental and Fitness demonstration sites.
 */

import { lawFirmData } from '@/content/law';
import { saasPlatformData } from '@/content/saas';
import { dentalClinicData } from '@/content/dental';
import { fitnessClubData } from '@/content/fitness';
import { getPageRoute, getDetailRoute } from './common/routes';

export interface ServiceRouteItem {
  siteId: string;
  pageSlug: string;
  itemSlug?: string;
  path: string;
  title: string;
  kind: 'page' | 'detail';
  category?: string;
}

export interface ServiceSiteMeta {
  siteId: string;
  canonicalSlug: string;
  brandName: string;
  sector: 'corporate' | 'wellness';
  tagline: string;
  pages: Array<{
    pageSlug: string;
    path: string;
    title: string;
    aliases?: string[];
  }>;
  detailItems: Array<{
    itemSlug: string;
    path: string;
    title: string;
    type: string;
  }>;
}

function buildManifest(): ServiceRouteItem[] {
  const routes: ServiceRouteItem[] = [];

  // 1. Law
  const lawPages = [
    { pageSlug: '', title: 'Büro Profili' },
    { pageSlug: 'practices', title: 'Uzmanlık Alanları' },
    { pageSlug: 'team', title: 'Ortaklar & Ekip' },
    { pageSlug: 'publications', title: 'Hukuki Yayınlar' },
    { pageSlug: 'contact', title: 'İletişim & Danışma' },
  ];
  for (const page of lawPages) {
    routes.push({
      siteId: 'law',
      pageSlug: page.pageSlug || 'home',
      path: getPageRoute('law', page.pageSlug),
      title: page.title,
      kind: 'page',
    });
  }
  for (const practice of lawFirmData.practiceAreas) {
    routes.push({
      siteId: 'law',
      pageSlug: 'detail',
      itemSlug: practice.slug,
      path: getDetailRoute('law', practice.slug),
      title: `${practice.title} | Uzmanlık İncelemesi`,
      kind: 'detail',
      category: 'Uzmanlık Alanı',
    });
  }
  for (const pub of lawFirmData.publications) {
    routes.push({
      siteId: 'law',
      pageSlug: 'detail',
      itemSlug: pub.slug,
      path: getDetailRoute('law', pub.slug),
      title: `${pub.title} | Hukuki Bülten`,
      kind: 'detail',
      category: 'Hukuki Yayın',
    });
  }

  // 2. SaaS
  const saasPages = [
    { pageSlug: '', title: 'Platform Genel Bakış' },
    { pageSlug: 'product', title: 'Çekirdek Modüller' },
    { pageSlug: 'solutions', title: 'Sektörel Çözümler' },
    { pageSlug: 'pricing', title: 'Şeffaf Fiyatlandırma' },
    { pageSlug: 'changelog', title: 'Sürüm Günlüğü' },
    { pageSlug: 'docs', title: 'Geliştirici Dokümantasyonu' },
  ];
  for (const page of saasPages) {
    routes.push({
      siteId: 'saas',
      pageSlug: page.pageSlug || 'home',
      path: getPageRoute('saas', page.pageSlug),
      title: page.title,
      kind: 'page',
    });
  }
  for (const mod of saasPlatformData.modules) {
    routes.push({
      siteId: 'saas',
      pageSlug: 'detail',
      itemSlug: mod.slug,
      path: getDetailRoute('saas', mod.slug),
      title: `${mod.name} | Modül Mimarisi`,
      kind: 'detail',
      category: 'Ürün Modülü',
    });
  }
  for (const uc of saasPlatformData.useCases) {
    routes.push({
      siteId: 'saas',
      pageSlug: 'detail',
      itemSlug: uc.slug,
      path: getDetailRoute('saas', uc.slug),
      title: `${uc.title} | Vaka Çalışması`,
      kind: 'detail',
      category: 'Kullanım Senaryosu',
    });
  }

  // 3. Dental
  const dentalPages = [
    { pageSlug: '', title: 'Klinik & Felsefe' },
    { pageSlug: 'treatments', title: 'Tedavi Protokolleri' },
    { pageSlug: 'clinicians', title: 'Uzman Hekim Kadrosu' },
    { pageSlug: 'technology', title: 'Klinik Teknoloji & Sterilizasyon' },
    { pageSlug: 'patient-guide', title: 'Hasta Rehberi & Randevu' },
  ];
  for (const page of dentalPages) {
    routes.push({
      siteId: 'dental',
      pageSlug: page.pageSlug || 'home',
      path: getPageRoute('dental', page.pageSlug),
      title: page.title,
      kind: 'page',
    });
  }
  for (const tr of dentalClinicData.treatments) {
    routes.push({
      siteId: 'dental',
      pageSlug: 'detail',
      itemSlug: tr.slug,
      path: getDetailRoute('dental', tr.slug),
      title: `${tr.name} | Tedavi Protokolü`,
      kind: 'detail',
      category: 'Tedavi Protokolü',
    });
  }

  // 4. Fitness
  const fitnessPages = [
    { pageSlug: '', title: 'Stüdyo Felsefesi' },
    { pageSlug: 'programs', title: 'Antrenman Programları' },
    { pageSlug: 'coaches', title: 'Koç Kadrosu' },
    { pageSlug: 'facilities', title: 'Tesis Donanımı & Toparlanma' },
    { pageSlug: 'memberships', title: 'Üyelik Modelleri' },
    { pageSlug: 'schedule', title: 'Haftalık Seans Takvimi' },
  ];
  for (const page of fitnessPages) {
    routes.push({
      siteId: 'fitness',
      pageSlug: page.pageSlug || 'home',
      path: getPageRoute('fitness', page.pageSlug),
      title: page.title,
      kind: 'page',
    });
  }
  for (const prog of fitnessClubData.programs) {
    routes.push({
      siteId: 'fitness',
      pageSlug: 'detail',
      itemSlug: prog.slug,
      path: getDetailRoute('fitness', prog.slug),
      title: `${prog.title} | Program Metodolojisi`,
      kind: 'detail',
      category: 'Antrenman Programı',
    });
  }

  return routes;
}

export const servicesRouteManifest: ServiceRouteItem[] = buildManifest();

export const servicesSitesMeta: Record<string, ServiceSiteMeta> = {
  law: {
    siteId: 'law',
    canonicalSlug: 'law',
    brandName: lawFirmData.brand.name,
    sector: 'corporate',
    tagline: lawFirmData.brand.tagline,
    pages: [
      { pageSlug: '', path: '/sites/law/', title: 'Büro Profili', aliases: ['home', 'index'] },
      { pageSlug: 'practices', path: '/sites/law/practices/', title: 'Uzmanlık Alanları', aliases: ['uzmanliklar', 'uzmanlik-alanlari'] },
      { pageSlug: 'team', path: '/sites/law/team/', title: 'Ortaklar & Ekip', aliases: ['ekip', 'avukatlar'] },
      { pageSlug: 'publications', path: '/sites/law/publications/', title: 'Hukuki Yayınlar', aliases: ['yayinlar', 'bulten'] },
      { pageSlug: 'contact', path: '/sites/law/contact/', title: 'İletişim & Danışma', aliases: ['iletisim', 'ofisler'] },
    ],
    detailItems: [
      ...lawFirmData.practiceAreas.map((p) => ({
        itemSlug: p.slug,
        path: getDetailRoute('law', p.slug),
        title: p.title,
        type: 'practice',
      })),
      ...lawFirmData.publications.map((pub) => ({
        itemSlug: pub.slug,
        path: getDetailRoute('law', pub.slug),
        title: pub.title,
        type: 'publication',
      })),
    ],
  },
  saas: {
    siteId: 'saas',
    canonicalSlug: 'saas',
    brandName: saasPlatformData.brand.name,
    sector: 'corporate',
    tagline: saasPlatformData.brand.tagline,
    pages: [
      { pageSlug: '', path: '/sites/saas/', title: 'Platform', aliases: ['home', 'index'] },
      { pageSlug: 'product', path: '/sites/saas/product/', title: 'Modüller', aliases: ['ozellikler', 'moduller'] },
      { pageSlug: 'solutions', path: '/sites/saas/solutions/', title: 'Çözümler', aliases: ['cozumler', 'senaryolar'] },
      { pageSlug: 'pricing', path: '/sites/saas/pricing/', title: 'Fiyatlandırma', aliases: ['fiyatlandirma', 'paketler'] },
      { pageSlug: 'changelog', path: '/sites/saas/changelog/', title: 'Sürüm Günlüğü', aliases: ['guncellemeler', 'surum-notlari'] },
      { pageSlug: 'docs', path: '/sites/saas/docs/', title: 'Geliştirici Dokümanları', aliases: ['dokumanlar', 'belgeler'] },
    ],
    detailItems: [
      ...saasPlatformData.modules.map((m) => ({
        itemSlug: m.slug,
        path: getDetailRoute('saas', m.slug),
        title: m.name,
        type: 'module',
      })),
      ...saasPlatformData.useCases.map((u) => ({
        itemSlug: u.slug,
        path: getDetailRoute('saas', u.slug),
        title: u.title,
        type: 'use-case',
      })),
    ],
  },
  dental: {
    siteId: 'dental',
    canonicalSlug: 'dental',
    brandName: dentalClinicData.brand.name,
    sector: 'corporate',
    tagline: dentalClinicData.brand.tagline,
    pages: [
      { pageSlug: '', path: '/sites/dental/', title: 'Klinik', aliases: ['home', 'index'] },
      { pageSlug: 'treatments', path: '/sites/dental/treatments/', title: 'Tedavi Protokolleri', aliases: ['tedaviler'] },
      { pageSlug: 'clinicians', path: '/sites/dental/clinicians/', title: 'Hekim Kadrosu', aliases: ['hekimler', 'doktorlar'] },
      { pageSlug: 'technology', path: '/sites/dental/technology/', title: 'Klinik Teknoloji', aliases: ['teknoloji', 'donanim'] },
      { pageSlug: 'patient-guide', path: '/sites/dental/patient-guide/', title: 'Hasta Rehberi & Randevu', aliases: ['hasta-rehberi', 'randevu'] },
    ],
    detailItems: dentalClinicData.treatments.map((t) => ({
      itemSlug: t.slug,
      path: getDetailRoute('dental', t.slug),
      title: t.name,
      type: 'treatment',
    })),
  },
  fitness: {
    siteId: 'fitness',
    canonicalSlug: 'fitness',
    brandName: fitnessClubData.brand.name,
    sector: 'wellness',
    tagline: fitnessClubData.brand.tagline,
    pages: [
      { pageSlug: '', path: '/sites/fitness/', title: 'Stüdyo', aliases: ['home', 'index'] },
      { pageSlug: 'programs', path: '/sites/fitness/programs/', title: 'Programlar', aliases: ['programlar'] },
      { pageSlug: 'coaches', path: '/sites/fitness/coaches/', title: 'Koç Kadrosu', aliases: ['koclar', 'egitmenler'] },
      { pageSlug: 'facilities', path: '/sites/fitness/facilities/', title: 'Tesis & Toparlanma', aliases: ['tesisler', 'alanlar'] },
      { pageSlug: 'memberships', path: '/sites/fitness/memberships/', title: 'Üyelik Modelleri', aliases: ['uyelik', 'uyelikler'] },
      { pageSlug: 'schedule', path: '/sites/fitness/schedule/', title: 'Haftalık Takvim', aliases: ['takvim', 'seanslar'] },
    ],
    detailItems: fitnessClubData.programs.map((p) => ({
      itemSlug: p.slug,
      path: getDetailRoute('fitness', p.slug),
      title: p.title,
      type: 'program',
    })),
  },
};

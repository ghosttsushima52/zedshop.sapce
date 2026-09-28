'use client';

import React from 'react';
import { SiteShell } from '@/core/layout';
import { lawFirmData } from '@/content/law';
import { getPageRoute } from '../common/routes';
import { LawHome } from './LawHome';
import { LawPractices } from './LawPractices';
import { LawTeam } from './LawTeam';
import { LawPublications } from './LawPublications';
import { LawContact } from './LawContact';
import { LawDetail } from './LawDetail';

interface LawRendererProps {
  siteId: string;
  pageSlug?: string;
  itemSlug?: string;
}

export function LawRenderer({ siteId, pageSlug = '', itemSlug }: LawRendererProps) {
  const navItems = [
    { label: 'Büro Profili', href: getPageRoute(siteId, ''), current: !pageSlug || pageSlug === 'home' || pageSlug === 'index' },
    { label: 'Uzmanlık Alanları', href: getPageRoute(siteId, 'practices'), current: pageSlug === 'practices' || pageSlug === 'uzmanliklar' || pageSlug === 'uzmanlik-alanlari' },
    { label: 'Ortaklar & Ekip', href: getPageRoute(siteId, 'team'), current: pageSlug === 'team' || pageSlug === 'ekip' },
    { label: 'Hukuki Yayınlar', href: getPageRoute(siteId, 'publications'), current: pageSlug === 'publications' || pageSlug === 'yayinlar' },
    { label: 'İletişim & Danışma', href: getPageRoute(siteId, 'contact'), current: pageSlug === 'contact' || pageSlug === 'iletisim' },
  ];

  const footerLinks = [
    { label: 'M&A ve Şirketler Hukuku', href: getPageRoute(siteId, 'practices') },
    { label: 'Uluslararası Tahkim', href: getPageRoute(siteId, 'practices') },
    { label: 'TBB Meslek Kuralları', href: getPageRoute(siteId, 'contact') },
    { label: 'Çıkar Çatışması Sorgusu', href: getPageRoute(siteId, 'contact') },
    { label: 'Gizlilik ve KVKK Politikası', href: getPageRoute(siteId, '') },
  ];

  const normalizedPage = (pageSlug || '').toLowerCase().trim();

  let content: React.ReactNode;

  if (itemSlug || normalizedPage === 'detail') {
    content = <LawDetail siteId={siteId} itemSlug={itemSlug || ''} />;
  } else if (normalizedPage === 'practices' || normalizedPage === 'uzmanliklar' || normalizedPage === 'uzmanlik-alanlari') {
    content = <LawPractices siteId={siteId} />;
  } else if (normalizedPage === 'team' || normalizedPage === 'ekip') {
    content = <LawTeam siteId={siteId} />;
  } else if (normalizedPage === 'publications' || normalizedPage === 'yayinlar' || normalizedPage === 'bulten') {
    content = <LawPublications siteId={siteId} />;
  } else if (normalizedPage === 'contact' || normalizedPage === 'iletisim') {
    content = <LawContact siteId={siteId} />;
  } else {
    content = <LawHome siteId={siteId} />;
  }

  return (
    <SiteShell
      brand={lawFirmData.brand.name}
      tagline={lawFirmData.brand.tagline}
      nav={navItems}
      footerLinks={footerLinks}
    >
      {content}
    </SiteShell>
  );
}

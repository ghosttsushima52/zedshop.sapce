/**
 * Route link helper utilities for services sector sites.
 * Follows the required specification:
 * Page routes: /sites/{siteId}/{pageSlug}/
 * Detail routes: /sites/{siteId}/detail/{itemSlug}/
 */

export type ServiceSiteType = 'law' | 'saas' | 'dental' | 'fitness';

export function resolveServiceSiteType(siteId: string): ServiceSiteType | null {
  const normalized = siteId.toLowerCase();
  if (normalized === 'law' || normalized.includes('baran') || normalized.includes('demirbag') || normalized.includes('hukuk')) {
    return 'law';
  }
  if (normalized === 'saas' || normalized.includes('vektor') || normalized.includes('cloud')) {
    return 'saas';
  }
  if (normalized === 'dental' || normalized.includes('dent') || normalized.includes('smyrna') || normalized.includes('klinik')) {
    return 'dental';
  }
  if (normalized === 'fitness' || normalized.includes('kuvvet') || normalized.includes('kor') || normalized.includes('spor')) {
    return 'fitness';
  }
  return null;
}

export function getPageRoute(siteId: string, pageSlug: string): string {
  if (!pageSlug || pageSlug === 'home' || pageSlug === 'index') {
    return `/sites/${siteId}/`;
  }
  // Remove leading or trailing slashes for clean path composition
  const cleanSlug = pageSlug.replace(/^\/+|\/+$/g, '');
  return `/sites/${siteId}/${cleanSlug}/`;
}

export function getDetailRoute(siteId: string, itemSlug: string): string {
  const cleanSlug = itemSlug.replace(/^\/+|\/+$/g, '');
  return `/sites/${siteId}/detail/${cleanSlug}/`;
}

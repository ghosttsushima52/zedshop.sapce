/**
 * Hospitality Sector — Public Entry Point
 *
 * Exports:
 *  - HospitalitySiteRenderer  →  single component routing all hospitality sites
 *  - hospitalityRouteManifest →  static route manifest for integration/QA scripts
 *
 * Supported siteIds: 'restaurant' | 'hotel' | 'travel'
 *
 * URL patterns consumed:
 *   /sites/{siteId}/{pageSlug}/
 *   /sites/{siteId}/detail/{itemSlug}/
 */

'use client';

import './hospitality.css';

// ── Restaurant ────────────────────────────────────────────────
import { RestaurantHome } from './restaurant/RestaurantHome';
import { RestaurantMenu } from './restaurant/RestaurantMenu';
import { RestaurantStory } from './restaurant/RestaurantStory';
import { RestaurantReservation } from './restaurant/RestaurantReservation';
import { RestaurantMenuDetail } from './restaurant/RestaurantMenuDetail';

// ── Hotel ─────────────────────────────────────────────────────
import { HotelHome } from './hotel/HotelHome';
import { HotelRooms } from './hotel/HotelRooms';
import { HotelExperiences } from './hotel/HotelExperiences';
import { HotelSpa } from './hotel/HotelSpa';
import { HotelLocation } from './hotel/HotelLocation';
import { HotelRoomDetail } from './hotel/HotelRoomDetail';

// ── Travel ────────────────────────────────────────────────────
import TravelHome from './travel/TravelHome';
import TravelJourneys from './travel/TravelJourneys';
import TravelGuides from './travel/TravelGuides';
import TravelPreparation from './travel/TravelPreparation';
import { TravelSeasons } from './travel/TravelSeasons';
import { TravelJourneyDetail } from './travel/TravelJourneyDetail';

// ─────────────────────────────────────────────────────────────

export type HospitalitySiteId = 'restaurant' | 'hotel' | 'travel';

/** Props consumed by HospitalitySiteRenderer */
export interface HospitalityRendererProps {
  /** The site ID — determines which brand/vertical to render */
  siteId: HospitalitySiteId;
  /**
   * The page slug — maps to named pages within each site.
   * Use 'index' for the home page.
   */
  pageSlug: string;
  /**
   * Optional item slug for detail views.
   * When present the renderer shows the detail page for that item
   * regardless of pageSlug.
   */
  itemSlug?: string;
}

/**
 * HospitalitySiteRenderer
 *
 * Single entry point for all three hospitality sites.  Reads the
 * siteId + pageSlug (+ optional itemSlug) and delegates to the
 * correct page component.
 *
 * Link conventions:
 *   Catalog / list page  → /sites/{siteId}/{pageSlug}/
 *   Item detail          → /sites/{siteId}/detail/{itemSlug}/
 */
export function HospitalitySiteRenderer({
  siteId,
  pageSlug,
  itemSlug,
}: HospitalityRendererProps) {
  // ── Detail route (itemSlug takes precedence over pageSlug) ──
  if (itemSlug) {
    switch (siteId) {
      case 'restaurant':
        return <RestaurantMenuDetail slug={itemSlug} />;
      case 'hotel':
        return <HotelRoomDetail slug={itemSlug} />;
      case 'travel':
        return <TravelJourneyDetail slug={itemSlug} />;
    }
  }

  // ── Restaurant routes ─────────────────────────────────────
  if (siteId === 'restaurant') {
    switch (pageSlug) {
      case 'index':
      case '':
        return <RestaurantHome />;
      case 'menu':
        return <RestaurantMenu />;
      case 'sefin-hikayesi':
        return <RestaurantStory />;
      case 'rezervasyon':
        return <RestaurantReservation />;
      default:
        return <RestaurantHome />;
    }
  }

  // ── Hotel routes ──────────────────────────────────────────
  if (siteId === 'hotel') {
    switch (pageSlug) {
      case 'index':
      case '':
        return <HotelHome />;
      case 'odalar':
        return <HotelRooms />;
      case 'deneyimler':
        return <HotelExperiences />;
      case 'spa':
        return <HotelSpa />;
      case 'ulasim':
        return <HotelLocation />;
      default:
        return <HotelHome />;
    }
  }

  // ── Travel routes ─────────────────────────────────────────
  if (siteId === 'travel') {
    switch (pageSlug) {
      case 'index':
      case '':
        return <TravelHome />;
      case 'rotalar':
        return <TravelJourneys />;
      case 'rehberler':
        return <TravelGuides />;
      case 'hazirlik':
        return <TravelPreparation />;
      case 'mevsimler':
        return <TravelSeasons />;
      default:
        return <TravelHome />;
    }
  }

  // Fallback — should never reach here if siteId is typed correctly
  return (
    <div style={{ padding: 'var(--sp-8)', textAlign: 'center', color: 'var(--c-fg-muted)' }}>
      <p>Geçersiz site veya sayfa adresi.</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROUTE MANIFEST
// ─────────────────────────────────────────────────────────────

/**
 * Represents a single static route within a hospitality site.
 */
export interface HospitalityRoute {
  siteId: HospitalitySiteId;
  /** Turkish page label */
  label: string;
  /** The pageSlug that maps to this page in HospitalitySiteRenderer */
  pageSlug: string;
  /** Full URL path for this route */
  href: string;
  /** Layout type hint for QA scripts */
  layoutType: 'home' | 'catalog' | 'editorial' | 'form' | 'standard' | 'detail';
}

/**
 * hospitalityRouteManifest
 *
 * Complete listing of every addressable route for all three
 * hospitality sites.  Used by integration tests, sitemaps and
 * the showcase navigation builder.
 *
 * Detail routes follow the pattern /sites/{siteId}/detail/{itemSlug}/
 * and are NOT listed here — they are generated dynamically from the
 * catalogue data (restaurantMenuItems, HOTEL_ROOMS, EXPEDITION_JOURNEYS).
 */
export const hospitalityRouteManifest: HospitalityRoute[] = [
  // ── Restaurant ──────────────────────────────────────────────
  {
    siteId: 'restaurant',
    label: 'Mola Kıyı Restoranı — Karşılama',
    pageSlug: 'index',
    href: '/sites/restaurant/index/',
    layoutType: 'home',
  },
  {
    siteId: 'restaurant',
    label: 'Mevsim Menüsü (64 Lezzet)',
    pageSlug: 'menu',
    href: '/sites/restaurant/menu/',
    layoutType: 'catalog',
  },
  {
    siteId: 'restaurant',
    label: 'Şefin Hikayesi',
    pageSlug: 'sefin-hikayesi',
    href: '/sites/restaurant/sefin-hikayesi/',
    layoutType: 'editorial',
  },
  {
    siteId: 'restaurant',
    label: 'Rezervasyon',
    pageSlug: 'rezervasyon',
    href: '/sites/restaurant/rezervasyon/',
    layoutType: 'form',
  },

  // ── Hotel ────────────────────────────────────────────────────
  {
    siteId: 'hotel',
    label: 'Kaf Dağı İnziva — Vadi Ruhu',
    pageSlug: 'index',
    href: '/sites/hotel/index/',
    layoutType: 'home',
  },
  {
    siteId: 'hotel',
    label: 'Odalar & Villalar (18 Seçenek)',
    pageSlug: 'odalar',
    href: '/sites/hotel/odalar/',
    layoutType: 'catalog',
  },
  {
    siteId: 'hotel',
    label: 'Doğa Deneyimleri (20 Program)',
    pageSlug: 'deneyimler',
    href: '/sites/hotel/deneyimler/',
    layoutType: 'catalog',
  },
  {
    siteId: 'hotel',
    label: 'Termal Spa & Orman Esenliği',
    pageSlug: 'spa',
    href: '/sites/hotel/spa/',
    layoutType: 'standard',
  },
  {
    siteId: 'hotel',
    label: 'Konum, Ulaşım & Mevsim',
    pageSlug: 'ulasim',
    href: '/sites/hotel/ulasim/',
    layoutType: 'standard',
  },

  // ── Travel ──────────────────────────────────────────────────
  {
    siteId: 'travel',
    label: 'Keşif Seyahat Stüdyosu — Anasayfa',
    pageSlug: 'index',
    href: '/sites/travel/index/',
    layoutType: 'home',
  },
  {
    siteId: 'travel',
    label: 'Keşif Rotaları (36 Sefer)',
    pageSlug: 'rotalar',
    href: '/sites/travel/rotalar/',
    layoutType: 'catalog',
  },
  {
    siteId: 'travel',
    label: 'Keşif Rehberleri',
    pageSlug: 'rehberler',
    href: '/sites/travel/rehberler/',
    layoutType: 'standard',
  },
  {
    siteId: 'travel',
    label: 'Sefer Hazırlık Rehberi',
    pageSlug: 'hazirlik',
    href: '/sites/travel/hazirlik/',
    layoutType: 'editorial',
  },
  {
    siteId: 'travel',
    label: 'Dört Mevsim Sefer Takvimi',
    pageSlug: 'mevsimler',
    href: '/sites/travel/mevsimler/',
    layoutType: 'standard',
  },
];

// ── Re-export individual components for direct import ──────────

// Restaurant
export { RestaurantHome, RestaurantMenu, RestaurantStory, RestaurantReservation, RestaurantMenuDetail };

// Hotel
export { HotelHome, HotelRooms, HotelExperiences, HotelSpa, HotelLocation, HotelRoomDetail };

// Travel
export { TravelHome, TravelJourneys, TravelGuides, TravelPreparation, TravelSeasons, TravelJourneyDetail };

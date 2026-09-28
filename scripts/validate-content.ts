import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SHOWCASE_SITES, getAllStaticSiteParams } from '../src/lib/showcase';
import { VISUAL_SYSTEMS } from '../src/core/theme/tokens';
import { restaurantMenuItems } from '../src/content/restaurant';
import { propertyListings } from '../src/content/realEstate';
import { perfumes } from '../src/content/perfume';
import { guitars } from '../src/content/guitars';
import { RARE_BOOKS_CATALOG } from '../src/content/rareBooks';
import { EXPEDITION_JOURNEYS } from '../src/content/travel';
import { HOTEL_EXPERIENCES, HOTEL_ROOMS } from '../src/content/hotel';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertUnique(label: string, values: string[]) {
  assert(new Set(values).size === values.length, `${label}: yinelenen slug bulundu.`);
}

function assertCount(label: string, actual: number, expected: number) {
  assert(actual === expected, `${label}: ${expected} bekleniyordu, ${actual} bulundu.`);
}

assertCount('Demo sitesi sayısı', SHOWCASE_SITES.length, 12);
assertCount('Görsel sistem sayısı', VISUAL_SYSTEMS.length, 6);
assert(SHOWCASE_SITES.every((site) => site.pages.length >= 4), 'Her demo sitesinde en az dört ana sayfa bulunmalı.');
assertUnique('Site kimlikleri', SHOWCASE_SITES.map((site) => site.id));

assertCount('Restoran menüsü', restaurantMenuItems.length, 64);
assertCount('Emlak ilanları', propertyListings.length, 72);
assertCount('Parfüm kataloğu', perfumes.length, 48);
assertCount('Gitar kataloğu', guitars.length, 64);
assertCount('Nadir eser kataloğu', RARE_BOOKS_CATALOG.length, 54);
assertCount('Seyahat rotaları', EXPEDITION_JOURNEYS.length, 36);
assert(HOTEL_ROOMS.length + HOTEL_EXPERIENCES.length >= 36, 'Otel oda ve deneyim envanteri en az 36 olmalı.');

for (const [label, items] of [
  ['Restoran', restaurantMenuItems],
  ['Emlak', propertyListings],
  ['Parfüm', perfumes],
  ['Gitar', guitars],
  ['Nadir eser', RARE_BOOKS_CATALOG],
  ['Seyahat', EXPEDITION_JOURNEYS],
] as const) {
  assertUnique(label, items.map((item) => item.slug));
}

const routeParams = getAllStaticSiteParams();
assert(routeParams.length > 400, `Statik rota kapsamı 400 üzeri olmalı; ${routeParams.length} bulundu.`);
assertUnique('Statik rotalar', routeParams.map((route) => `${route.site}/${route.segments.join('/')}`));

const disclosure = readFileSync(resolve('src/core/layout/DemoDisclosure.tsx'), 'utf8');
assert(disclosure.includes('Demo site'), 'Her SiteShell içinde kullanılan görünür "Demo site" ibaresi bulunamadı.');

console.log(JSON.stringify({
  status: 'ok',
  sites: SHOWCASE_SITES.length,
  visualSystems: VISUAL_SYSTEMS.length,
  primaryPages: SHOWCASE_SITES.reduce((sum, site) => sum + site.pages.length, 0),
  staticRoutes: routeParams.length,
  catalogCounts: {
    restaurant: restaurantMenuItems.length,
    realEstate: propertyListings.length,
    perfume: perfumes.length,
    guitars: guitars.length,
    rareBooks: RARE_BOOKS_CATALOG.length,
    travel: EXPEDITION_JOURNEYS.length,
    hotelInventory: HOTEL_ROOMS.length + HOTEL_EXPERIENCES.length,
  },
}, null, 2));

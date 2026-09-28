'use client';

import { useState } from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { SectionHeading, FilterBar, ItemGrid, Card } from '../../../core/ui/primitives';
import { restaurantMenuItems, restaurantCategories, restaurantMetadata } from '../../../content/restaurant';
import { Search } from 'lucide-react';

export function RestaurantMenu() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChefSpecial, setShowChefSpecial] = useState(false);
  const [activeDietary, setActiveDietary] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');

  const categories = [{ id: 'all', name: 'Tüm Menü' }, ...restaurantCategories];
  const dietaryOptions = ['all', 'Vejetaryen', 'Glütensiz', 'Deniz Ürünü', 'Vegan'];

  const filteredItems = restaurantMenuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === restaurantCategories.find(c => c.id === activeCategory)?.name;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChefSpecial = !showChefSpecial || item.isChefSpecial;
    const matchesDietary = activeDietary === 'all' || item.attributes.dietary.includes(activeDietary);

    return matchesCategory && matchesSearch && matchesChefSpecial && matchesDietary;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0; // default category order (already implicit in array)
  });

  return (
    <SiteShell
      brand={restaurantMetadata.brandName}
      nav={[
        { label: 'Ana Sayfa', href: '/sites/restaurant' },
        { label: 'Menü', href: '/sites/restaurant/menu' },
        { label: 'Hikayemiz', href: '/sites/restaurant/story' },
        { label: 'Rezervasyon', href: '/sites/restaurant/rezervasyon' },
      ]}
    >
      <section style={{ paddingBlock: 'var(--sp-12)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--sp-4)' }}>
          <SectionHeading title="Lezzet Kataloğu" body="Ege'nin taze mahsulleri ve bostanımızdan sofranıza uzanan 64 farklı özgün lezzet." align="center" />
          
          <div style={{ marginBlock: 'var(--sp-8)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            {/* Search and Sort */}
            <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', flex: '1 1 300px' }}>
                <Search size={20} style={{ position: 'absolute', left: 'var(--sp-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Menüde ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--sp-3) var(--sp-3) var(--sp-3) var(--sp-10)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--c-bg)',
                    color: 'var(--c-text)',
                  }}
                />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'default' | 'asc' | 'desc')}
                style={{
                  padding: 'var(--sp-3)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--c-bg)',
                  color: 'var(--c-text)',
                }}
              >
                <option value="default">Önerilen Sıralama</option>
                <option value="asc">Fiyat (Artan)</option>
                <option value="desc">Fiyat (Azalan)</option>
              </select>
            </div>

            {/* Filters */}
            <FilterBar
              label="Kategoriler"
              chips={categories.map(c => ({ id: c.id, label: c.name }))}
              active={activeCategory}
              onChange={setActiveCategory}
            />

            <div style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap', alignItems: 'center', marginTop: 'var(--sp-2)' }}>
              <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Diyet:</span>
                <select
                  value={activeDietary}
                  onChange={(e) => setActiveDietary(e.target.value)}
                  style={{
                    padding: 'var(--sp-2)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--c-bg)',
                    fontSize: 'var(--text-sm)'
                  }}
                >
                  {dietaryOptions.map(opt => <option key={opt} value={opt}>{opt === 'all' ? 'Tümü' : opt}</option>)}
                </select>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showChefSpecial}
                  onChange={(e) => setShowChefSpecial(e.target.checked)}
                />
                Şefin İmza Tabakları
              </label>
            </div>
          </div>

          <ItemGrid columns={3}>
            {sortedItems.map(item => (
              <Card
                key={item.id}
                title={item.name}
                meta={item.category}
                price={item.formattedPrice}
                description={item.description}
                image={item.image}
                imageAlt={item.alt}
                href={`/sites/restaurant/detail/${item.slug}`}
              >
                <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap', marginTop: 'var(--sp-4)' }}>
                  {item.attributes.dietary.map(badge => (
                    <span key={badge} style={{ fontSize: 'var(--text-xs)', padding: 'var(--sp-1) var(--sp-2)', backgroundColor: 'var(--c-bg-subtle)', borderRadius: 'var(--radius-full)', border: '1px solid var(--c-border)' }}>
                      {badge}
                    </span>
                  ))}
                  {item.isChefSpecial && (
                    <span style={{ fontSize: 'var(--text-xs)', padding: 'var(--sp-1) var(--sp-2)', backgroundColor: 'var(--c-accent)', color: 'white', borderRadius: 'var(--radius-full)' }}>
                      Şefin İmzası
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </ItemGrid>
          
          {sortedItems.length === 0 && (
            <div style={{ textAlign: 'center', paddingBlock: 'var(--sp-12)', color: 'var(--c-text-muted)' }}>
              Arama kriterlerinize uygun lezzet bulunamadı.
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

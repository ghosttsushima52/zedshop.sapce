import { SiteShell } from '../../../core/layout/SiteShell';
import { DetailPanel, Button } from '../../../core/ui/primitives';
import { restaurantMenuItems, restaurantMetadata } from '../../../content/restaurant';
import { notFound } from 'next/navigation';
import { ArrowLeft, Info, Droplets } from 'lucide-react';

interface RestaurantMenuDetailProps {
  slug: string;
}

export function RestaurantMenuDetail({ slug }: RestaurantMenuDetailProps) {
  const item = restaurantMenuItems.find(i => i.slug === slug);

  if (!item) {
    notFound();
  }

  // Find allergens based on dietary attributes containing 'Deniz Ürünü', 'Kabuklu', 'Glüten' etc.
  const allergens = item.attributes.dietary.filter(d => 
    d.includes('Deniz Ürünü') || d.includes('Glüten') || d.includes('Kabuklu')
  );

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
      <article style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
        <div style={{ marginBottom: 'var(--sp-8)' }}>
          <Button href="/sites/restaurant/menu" variant="ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <ArrowLeft size={16} /> Geriye Dön
          </Button>
        </div>

        <DetailPanel
          title={item.name}
          description={item.description}
          image={item.image}
          imageAlt={item.alt}
          imageAspect="16-9"
          meta={[
            { key: 'Kategori', value: item.category },
            { key: 'Fiyat', value: item.formattedPrice },
            { key: 'Porsiyon', value: item.attributes.servingSize },
            { key: 'Sıcaklık', value: item.attributes.temperature },
          ]}
        >
          {/* Badges */}
          <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap', marginBlock: 'var(--sp-6)' }}>
            {item.attributes.dietary.map(badge => (
              <span key={badge} style={{ fontSize: 'var(--text-xs)', padding: 'var(--sp-1) var(--sp-3)', backgroundColor: 'var(--c-bg-subtle)', borderRadius: 'var(--radius-full)', border: '1px solid var(--c-border)' }}>
                {badge}
              </span>
            ))}
            {item.isChefSpecial && (
              <span style={{ fontSize: 'var(--text-xs)', padding: 'var(--sp-1) var(--sp-3)', backgroundColor: 'var(--c-accent)', color: 'white', borderRadius: 'var(--radius-full)' }}>
                Şefin İmzası
              </span>
            )}
            {item.isSeasonal && (
              <span style={{ fontSize: 'var(--text-xs)', padding: 'var(--sp-1) var(--sp-3)', backgroundColor: 'var(--c-bg-subtle)', border: '1px dashed var(--c-accent)', borderRadius: 'var(--radius-full)' }}>
                Mevsimsel
              </span>
            )}
          </div>

          <div style={{ marginTop: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-6)' }}>
            <section>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                Hazırlık & Teknik
              </h3>
              <p style={{ color: 'var(--c-text-muted)' }}>{item.attributes.preparation}</p>
            </section>
            
            <section>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                Tedarik Hikayesi
              </h3>
              <p style={{ color: 'var(--c-text-muted)' }}>{item.attributes.origin}</p>
            </section>

            <section>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                Eşleşme Önerisi
              </h3>
              <p style={{ color: 'var(--c-text-muted)' }}>{item.attributes.pairing}</p>
            </section>
          </div>

          {allergens.length > 0 && (
            <div style={{ marginTop: 'var(--sp-8)', padding: 'var(--sp-4)', backgroundColor: 'var(--c-bg-subtle)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--c-accent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontWeight: 'bold', marginBottom: 'var(--sp-2)' }}>
                <Info size={18} /> Alerjen Bildirimi
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-text-muted)' }}>
                Bu ürün şu alerjenleri içerir: {allergens.join(', ')}. Lütfen sipariş vermeden önce servis ekibimize bilgi veriniz.
              </p>
            </div>
          )}
        </DetailPanel>
      </article>
    </SiteShell>
  );
}

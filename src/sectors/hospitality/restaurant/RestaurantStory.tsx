import { SiteShell } from '../../../core/layout/SiteShell';
import { SectionHeading, MediaFrame, ItemGrid, Card } from '../../../core/ui/primitives';
import { restaurantStory, chefProfile, restaurantMetadata } from '../../../content/restaurant';

export function RestaurantStory() {
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
      <article>
        {/* Editorial Hero */}
        <header style={{ position: 'relative', height: '60vh', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--c-bg-subtle)', overflow: 'hidden' }}>
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80" 
            alt="Chef working with fire" 
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} 
          />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: 'var(--sp-8)', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--sp-6)' }}>{restaurantStory.title}</h1>
            <p style={{ fontSize: 'var(--text-xl)', fontStyle: 'italic', color: 'var(--c-text)', borderLeft: '4px solid var(--c-accent)', paddingLeft: 'var(--sp-4)', textAlign: 'left', margin: '0 auto', maxWidth: '600px' }}>
              "{chefProfile.quote}"
            </p>
          </div>
        </header>

        {/* Story Sections */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--sp-12) var(--sp-4)' }}>
          <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--sp-12)', fontWeight: 'bold' }}>
            {restaurantStory.leadParagraph}
          </p>

          {restaurantStory.sections.map((section, idx) => (
            <section key={idx} style={{ marginBottom: 'var(--sp-12)' }}>
              <SectionHeading title={section.heading} level={2} />
              <p style={{ marginTop: 'var(--sp-4)', lineHeight: 1.8, color: 'var(--c-text-muted)' }}>
                {section.body}
              </p>
            </section>
          ))}
          
          {/* Chef's Philosophy List as Prose */}
          <section style={{ marginBottom: 'var(--sp-12)' }}>
             <SectionHeading title="Şefin Felsefesi & Meşe Ateşi Tekniği" level={2} />
             {chefProfile.philosophyPoints.map((point, idx) => (
               <div key={idx} style={{ marginTop: 'var(--sp-6)' }}>
                 <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>{point.title}</h3>
                 <p style={{ lineHeight: 1.8, color: 'var(--c-text-muted)' }}>{point.description}</p>
               </div>
             ))}
          </section>
        </div>

        {/* Terroir Partner Deep-dive Grid */}
        <section style={{ backgroundColor: 'var(--c-bg-subtle)', paddingBlock: 'var(--sp-16)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--sp-4)' }}>
            <SectionHeading title="Yerel Üretici Ağımız" body="Denizin ve toprağın asıl kahramanları." align="center" />
            <ItemGrid columns={2} style={{ marginTop: 'var(--sp-12)' }}>
              {restaurantStory.terroirPartners.map((partner, idx) => (
                <Card
                  key={idx}
                  title={partner.name}
                  meta={partner.region}
                  description={partner.note}
                >
                  <div style={{ marginTop: 'var(--sp-4)', display: 'inline-block', borderBottom: '2px solid var(--c-accent)', paddingBottom: 'var(--sp-1)' }}>
                    Özel Ürün: {partner.product}
                  </div>
                </Card>
              ))}
            </ItemGrid>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}

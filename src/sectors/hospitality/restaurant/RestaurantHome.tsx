import { SiteShell } from '../../../core/layout/SiteShell';
import { SectionHeading, Button, ItemGrid, Card, StatStrip, MediaFrame } from '../../../core/ui/primitives';
import { restaurantMetadata, chefProfile, restaurantStory } from '../../../content/restaurant';
import { ChefHat, Flame, Leaf, Wine } from 'lucide-react';

export function RestaurantHome() {
  const stats = [
    { label: 'Çalışma Günleri', value: 'Salı–Pazar Açık' },
    { label: 'Pişirme Tekniği', value: 'Meşe Kömürü & Taş Fırın' },
    { label: 'Katalog', value: '64 Özgün Menü Kalemi' },
    { label: 'Tedarik Ağı', value: 'Yerel Üretici Ortaklıkları' },
  ];

  return (
    <SiteShell
      brand={restaurantMetadata.brandName}
      tagline={restaurantMetadata.tagline}
      nav={[
        { label: 'Ana Sayfa', href: '/sites/restaurant' },
        { label: 'Menü', href: '/sites/restaurant/menu' },
        { label: 'Hikayemiz', href: '/sites/restaurant/story' },
        { label: 'Rezervasyon', href: '/sites/restaurant/rezervasyon' },
      ]}
    >
      {/* Hero Section */}
      <section style={{ paddingBlock: 'var(--sp-16)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--sp-4)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: 'var(--sp-6)' }}>
            Kuzey Ege'nin Taş İskelelerinde Çağdaş Kıyı Gastronomisi
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--c-text-muted)', marginBottom: 'var(--sp-8)' }}>
            Urla ve Cunda kıyılarının yabani otları, taş baskı zeytinyağları ve günlük taze deniz mahsulleriyle hazırlanan, toprağa ve denize saygılı bir lezzet deneyimi. Ateş, taş ve fermantasyonun ritmiyle şekillenen menümüzü keşfedin.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="/sites/restaurant/menu" variant="primary">Menüyü İncele</Button>
            <Button href="/sites/restaurant/rezervasyon" variant="outline">Masa Ayırt</Button>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ borderBlock: '1px solid var(--c-border)', backgroundColor: 'var(--c-bg-subtle)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--sp-4)' }}>
          <StatStrip stats={stats} />
        </div>
      </section>

      {/* Manifesto / Philosophy Section */}
      <section style={{ paddingBlock: 'var(--sp-16)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--sp-4)' }}>
          <ItemGrid columns={2}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <SectionHeading eyebrow="Felsefemiz" title="Toprak, Taş ve Tuzlu Su" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginTop: 'var(--sp-6)', color: 'var(--c-text-muted)' }}>
                <p>{chefProfile.bio}</p>
                <p>"{chefProfile.quote}"</p>
                <p>{restaurantStory.leadParagraph}</p>
              </div>
            </div>
            <MediaFrame src={chefProfile.image} alt={chefProfile.alt} aspect="3-4" />
          </ItemGrid>
        </div>
      </section>

      {/* Terroir Partner Grid */}
      <section style={{ paddingBlock: 'var(--sp-16)', backgroundColor: 'var(--c-bg-subtle)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--sp-4)' }}>
          <SectionHeading eyebrow="Tedarik Ağımız" title="Terroir Ortaklarımız" body="Sıfır kilometre vizyonumuzla, yerel üreticilerimizin taze mahsullerini mutfağımıza taşıyoruz." align="center" />
          <ItemGrid columns={2} className="mt-8" style={{ marginTop: 'var(--sp-8)' }}>
            {restaurantStory.terroirPartners.map((partner, idx) => (
              <Card
                key={idx}
                title={partner.name}
                meta={partner.region}
                description={partner.note}
              >
                <div style={{ marginTop: 'var(--sp-4)', fontWeight: 'bold', fontSize: 'var(--text-sm)', color: 'var(--c-accent)' }}>
                  {partner.product}
                </div>
              </Card>
            ))}
          </ItemGrid>
        </div>
      </section>
    </SiteShell>
  );
}

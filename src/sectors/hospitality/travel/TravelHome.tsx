import React from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { EXPEDITION_JOURNEYS, JOURNEY_CATEGORIES, SEASONAL_PROGRAMMING } from '../../../content/travel';
import { ArrowRight, Mountain, Globe, Award, Map as MapIcon, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../core/ui/primitives';

export default function TravelHome() {
  const featuredJourneys = [...EXPEDITION_JOURNEYS]
    .sort((a, b) => parseInt(b.altitudeProfile.replace(/\D/g, '')) - parseInt(a.altitudeProfile.replace(/\D/g, '')))
    .slice(0, 3);

  return (
    <SiteShell
      brand="Pusula Keşif"
      tagline="Özel Keşif ve Seyahat Stüdyosu"
      title="Özel Keşif ve Seyahat Stüdyosu - Avenox"
      description="Dünyanın en uzak köşelerine özel sefer rotaları."
    >
      {/* Hero Section */}
      <section style={{ padding: 'var(--space-24) var(--space-6)', backgroundColor: 'var(--c-bg-subtle)', color: 'var(--c-fg)', textAlign: 'center', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'var(--text-6xl)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 'var(--space-6)', lineHeight: 1.1 }}>
            Dünyanın En Uzak Köşelerine Özel Sefer Rotaları
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--c-fg-muted)', marginBottom: 'var(--space-10)' }}>
            Özel Keşif ve Seyahat Stüdyomuz, gezegenin en el değmemiş coğrafyalarında, sınırları zorlayan, özgün ve dönüştürücü deneyimler sunar.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <Link href="/sites/travel/rotalar">
              <Button size="lg" variant="primary">
                Rotaları Keşfet
              </Button>
            </Link>
            <Link href="/sites/travel/rehberler">
              <Button size="lg" variant="outline">
                Rehberlerle Tanış
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ backgroundColor: 'var(--c-bg-raised)', color: 'var(--c-fg)', padding: 'var(--space-8) var(--space-6)', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)', textAlign: 'center' }}>
          <div>
            <MapIcon size={32} style={{ margin: '0 auto var(--space-2) auto', color: 'var(--c-primary)' }} />
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>36</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)' }}>Özgün Rota</div>
          </div>
          <div>
            <Globe size={32} style={{ margin: '0 auto var(--space-2) auto', color: 'var(--c-primary)' }} />
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>6</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)' }}>Coğrafi Kategori</div>
          </div>
          <div>
            <Award size={32} style={{ margin: '0 auto var(--space-2) auto', color: 'var(--c-primary)' }} />
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>IFMGA</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)' }}>Sertifikalı Rehberler</div>
          </div>
          <div>
            <Mountain size={32} style={{ margin: '0 auto var(--space-2) auto', color: 'var(--c-primary)' }} />
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>12</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)' }}>Ülke</div>
          </div>
        </div>
      </section>

      {/* Featured Journeys */}
      <section style={{ padding: 'var(--space-24) var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, marginBottom: 'var(--space-12)', textAlign: 'center' }}>
          Öne Çıkan Keşif Seferleri
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
          {featuredJourneys.map(journey => (
            <Link key={journey.id} href={`/sites/travel/detail/${journey.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ borderRadius: 'var(--card-radius)', overflow: 'hidden', backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <img src={journey.imageUrl} alt={journey.alt} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-6)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, padding: 'var(--space-1) var(--space-2)', backgroundColor: 'var(--c-bg-subtle)', color: 'var(--c-primary)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-full)' }}>
                      {journey.region}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{journey.title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', marginBottom: 'var(--space-4)', flexGrow: 1 }}>{journey.subtitle}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--c-border)', paddingTop: 'var(--space-4)' }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-fg-muted)' }}>{journey.duration.text}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--c-primary)', fontWeight: 500 }}>
                      Keşfet <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Overview */}
      <section style={{ backgroundColor: 'var(--c-bg-subtle)', padding: 'var(--space-24) var(--space-6)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, marginBottom: 'var(--space-12)', textAlign: 'center' }}>
            Keşif Havzaları
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
            {JOURNEY_CATEGORIES.map(category => (
              <div key={category.key} className="card" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--card-radius)', boxShadow: 'var(--card-shadow)' }}>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>{category.label}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 1.6 }}>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ padding: 'var(--space-24) var(--space-6)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Keşif Felsefemiz</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', fontSize: 'var(--text-lg)', color: 'var(--c-fg-muted)', lineHeight: 1.8 }}>
          <p>
            Seyahat, sadece bir yer değiştirme eylemi değil, gezegenin en vahşi ve bakir köşeleriyle derin bir bağ kurma sanatıdır. Bizler, kitle turizminin ayak basmadığı rotalarda, küçük gruplar halinde sürdürülebilir ve sorumlu keşif seferleri düzenliyoruz.
          </p>
          <p>
            Doğanın ritmine saygı duymak, yerel kültürlerle otantik ve eşit düzeyde etkileşim kurmak en temel prensibimizdir. Her bir seferimiz, sadece görsel bir şölen değil, aynı zamanda antropolojik, jeolojik ve ruhsal bir öğrenme sürecidir.
          </p>
          <p>
            İz bırakmama (Leave No Trace) ilkelerine sıkı sıkıya bağlı kalarak, gelecek nesillere bu benzersiz coğrafyaları en saf haliyle bırakmayı hedefliyoruz. Bizimle yola çıkmak, sınırlarınızı yeniden tanımlamaktır.
          </p>
        </div>
      </section>

      {/* Seasonal Teaser */}
      <section style={{ backgroundColor: 'var(--c-bg-subtle)', padding: 'var(--space-24) var(--space-6)', borderTop: '1px solid var(--c-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 700 }}>Dört Mevsim Keşif</h2>
            <Link href="/sites/travel/seasons" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--c-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Sezon Takvimini İncele <ArrowRight size={20} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
            {SEASONAL_PROGRAMMING.map(season => (
              <div key={season.season} className="card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: 'var(--space-6)', borderRadius: 'var(--card-radius)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <Calendar style={{ color: 'var(--c-primary)' }} />
                  <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>{season.season}</h3>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-subtle)', marginBottom: 'var(--space-2)' }}>{season.months}</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-4)' }}>Odak: {season.focus}</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)' }}>{season.climateContext}</p>
              </div>
            )) || (
              [ 'Bahar', 'Yaz', 'Güz', 'Kış' ].map(s => (
                <div key={s} className="card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: 'var(--space-6)', borderRadius: 'var(--card-radius)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <Calendar style={{ color: 'var(--c-primary)' }} />
                    <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>{s}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

'use client';
import React, { useState, useMemo } from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { HOTEL_EXPERIENCES } from '../../../content/hotel';

export function HotelExperiences() {
  const [activeCategory, setActiveCategory] = useState<string>('Hepsi');

  const categories = [
    { id: 'Hepsi', label: 'Hepsi' },
    { id: 'doga_ve_yuruyus', label: 'Doğa & Yürüyüş' },
    { id: 'gastronomi_ve_hasat', label: 'Gastronomi & Hasat' },
    { id: 'zihin_ve_beden', label: 'Zihin & Beden' },
    { id: 'zanaat_ve_atolye', label: 'Zanaat & Atölye' },
    { id: 'gece_ve_astronomi', label: 'Gece & Astronomi' }
  ];

  const filteredExperiences = useMemo(() => {
    if (activeCategory === 'Hepsi') return HOTEL_EXPERIENCES;
    return HOTEL_EXPERIENCES.filter(exp => exp.category === activeCategory);
  }, [activeCategory]);

  return (
    <SiteShell brand="Kaf Dağı İnziva" tagline="Sessizlik ve Doğa Oteli">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Intro */}
        <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1rem' }}>Doğa ve Zanaat Deneyimleri</h1>
          <p style={{ color: 'var(--c-fg-muted)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
            Bölgenin yerel kültürünü, coğrafyanın sunduğu cömertliği ve zanaatkar ruhunu keşfedin. Zamanın yavaş aktığı bu topraklarda kendinize yeni deneyimler hediye edin.
          </p>
        </section>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid var(--c-border)',
                backgroundColor: activeCategory === cat.id ? 'var(--c-primary)' : 'var(--c-bg-subtle)',
                color: activeCategory === cat.id ? 'var(--c-primary-fg)' : 'var(--c-fg)',
                cursor: 'pointer',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {filteredExperiences.map(exp => (
            <div key={exp.id} className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--card-radius)', overflow: 'hidden' }}>
              <img src={exp.imageUrl} alt={exp.alt} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-fg-subtle)' }}>{categories.find(c => c.id === exp.category)?.label}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-primary)' }}>{exp.displayPrice}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--c-fg)' }}>{exp.title}</h3>
                <div style={{ fontSize: '0.875rem', color: 'var(--c-fg-muted)', marginBottom: '1rem' }}>
                  <p><strong>Rehber:</strong> {exp.host}</p>
                  <p><strong>Süre:</strong> {exp.duration} &bull; <strong>Sezon:</strong> {exp.seasonality.join(', ')}</p>
                </div>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.875rem', color: 'var(--c-fg-muted)' }}>
                  {exp.highlights.slice(0, 3).map((hl, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{hl}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

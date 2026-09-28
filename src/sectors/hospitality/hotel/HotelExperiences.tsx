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
    <SiteShell>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Intro */}
        <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1rem' }}>Doğa ve Zanaat Deneyimleri</h1>
          <p style={{ color: '#555', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
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
                border: '1px solid #ccc',
                backgroundColor: activeCategory === cat.id ? '#000' : '#fff',
                color: activeCategory === cat.id ? '#fff' : '#000',
                cursor: 'pointer',
                borderRadius: '9999px',
                fontSize: '0.875rem'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {filteredExperiences.map(exp => (
            <div key={exp.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={exp.imageUrl} alt={exp.alt} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', marginBottom: '1rem' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>{categories.find(c => c.id === exp.category)?.label}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{exp.displayPrice}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{exp.title}</h3>
              <div style={{ fontSize: '0.875rem', color: '#555', marginBottom: '1rem' }}>
                <p><strong>Rehber:</strong> {exp.host}</p>
                <p><strong>Süre:</strong> {exp.duration} &bull; <strong>Sezon:</strong> {exp.seasonality.join(', ')}</p>
              </div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.875rem', color: '#444' }}>
                {exp.highlights.slice(0, 3).map((hl, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>{hl}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

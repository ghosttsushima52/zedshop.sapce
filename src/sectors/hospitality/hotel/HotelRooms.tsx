'use client';
import React, { useState, useMemo } from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { Button } from '../../../core/ui/primitives';
import { HOTEL_ROOMS } from '../../../content/hotel';
import Link from 'next/link';

export function HotelRooms() {
  const [filterType, setFilterType] = useState<string>('Hepsi');
  const [filterCapacity, setFilterCapacity] = useState<string>('Hepsi');
  const [sortBy, setSortBy] = useState<string>('Fiyat Artan');

  const filteredRooms = useMemo(() => {
    let result = [...HOTEL_ROOMS];

    // Filter by type
    if (filterType !== 'Hepsi') {
      result = result.filter(r => r.type.toLowerCase() === filterType.toLowerCase());
    }

    // Filter by capacity
    if (filterCapacity !== 'Hepsi') {
      if (filterCapacity === '1-2') {
        result = result.filter(r => r.capacity.adults <= 2);
      } else if (filterCapacity === '3-4') {
        result = result.filter(r => r.capacity.adults >= 3 && r.capacity.adults <= 4);
      } else if (filterCapacity === '5+') {
        result = result.filter(r => r.capacity.adults >= 5);
      }
    }

    // Sort
    if (sortBy === 'Fiyat Artan') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'Fiyat Azalan') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'Genişlik') {
      result.sort((a, b) => b.areaSqm - a.areaSqm);
    }

    return result;
  }, [filterType, filterCapacity, sortBy]);

  return (
    <SiteShell brand="Kaf Dağı İnziva" tagline="Sessizlik ve Doğa Oteli">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1rem' }}>Yaşam Alanları</h1>
          <p style={{ color: 'var(--c-fg-muted)', fontSize: '1.125rem' }}>Doğanın içinde, özenle tasarlanmış benzersiz konaklama seçeneklerimiz.</p>
        </header>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', justifyContent: 'center' }}>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '0.5rem 1rem', border: '1px solid var(--c-border)', backgroundColor: 'var(--c-bg-subtle)', color: 'var(--c-fg)', borderRadius: 'var(--radius-md)' }}>
            <option value="Hepsi">Tüm Tipler</option>
            <option value="Suit">Süit</option>
            <option value="Villa">Villa</option>
            <option value="Pavilion">Pavyon</option>
            <option value="Oda">Oda</option>
          </select>

          <select value={filterCapacity} onChange={(e) => setFilterCapacity(e.target.value)} style={{ padding: '0.5rem 1rem', border: '1px solid var(--c-border)', backgroundColor: 'var(--c-bg-subtle)', color: 'var(--c-fg)', borderRadius: 'var(--radius-md)' }}>
            <option value="Hepsi">Kapasite</option>
            <option value="1-2">1-2 Kişi</option>
            <option value="3-4">3-4 Kişi</option>
            <option value="5+">5+ Kişi</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.5rem 1rem', border: '1px solid var(--c-border)', backgroundColor: 'var(--c-bg-subtle)', color: 'var(--c-fg)', borderRadius: 'var(--radius-md)' }}>
            <option value="Fiyat Artan">Fiyat (Düşükten Yükseğe)</option>
            <option value="Fiyat Azalan">Fiyat (Yüksekten Düşüğe)</option>
            <option value="Genişlik">Büyüklük (Genişten Dara)</option>
          </select>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {filteredRooms.map(room => (
            <div key={room.id} className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--card-radius)', overflow: 'hidden' }}>
              <Link href={`/sites/hotel/detail/${room.slug}`}>
                <img src={room.imageUrl} alt={room.alt} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
              </Link>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-fg-subtle)' }}>{room.type}</span>
                  <span style={{ fontWeight: 600, color: 'var(--c-primary)' }}>{room.displayPrice}</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>
                  <Link href={`/sites/hotel/detail/${room.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {room.title}
                  </Link>
                </h2>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--c-fg-muted)' }}>
                  <span>{room.areaSqm} m²</span>
                  <span>&bull;</span>
                  <span>{room.capacity.text}</span>
                </div>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.875rem', color: 'var(--c-fg-muted)', flex: 1 }}>
                  {room.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                  ))}
                </ul>
                <Link href={`/sites/hotel/detail/${room.slug}`} style={{ marginTop: '1rem' }}>
                  <Button variant="primary" style={{ width: '100%' }}>Oda Seçin</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

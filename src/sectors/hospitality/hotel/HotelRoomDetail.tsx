import React from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { HOTEL_ROOMS } from '../../../content/hotel';
import { Button } from '../../../core/ui/primitives';
import { MapPin, Flame, Bath, Users, Maximize, Bed } from 'lucide-react';
import Link from 'next/link';

export function HotelRoomDetail({ slug }: { slug: string }) {
  const room = HOTEL_ROOMS.find(r => r.slug === slug);

  if (!room) {
    return (
      <SiteShell>
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h1>Oda bulunamadı.</h1>
          <Link href="/sites/hotel/odalar" style={{ textDecoration: 'underline' }}>Tüm Odalara Dön</Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell brand="Kaf Dağı İnziva" tagline="Sessizlik ve Doğa Oteli">
      {/* Hero Image */}
      <div style={{ height: '60vh', width: '100%', position: 'relative' }}>
        <img src={room.imageUrl} alt={room.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 2rem', color: '#fff', maxWidth: '1200px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', border: '1px solid #fff', borderRadius: '99px', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
            {room.type}
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '0.5rem' }}>{room.title}</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>{room.tagline}</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem' }}>
        {/* Main Content */}
        <div>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--c-border)', color: 'var(--c-fg-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Maximize size={20} /> {room.areaSqm} m²</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={20} /> {room.capacity.text}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bed size={20} /> {room.bedConfiguration}</div>
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1.5rem' }}>Mekansal Deneyim</h2>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--c-fg-muted)', marginBottom: '1.5rem' }}>{room.description}</p>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--c-fg-muted)', marginBottom: '3rem' }}>{room.spatialDetails}</p>

          <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1.5rem' }}>Öne Çıkan Özellikler</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', listStyle: 'none', padding: 0, marginBottom: '3rem' }}>
            {room.features.map((feature, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--c-fg-muted)' }}>
                <Flame size={18} style={{ color: 'var(--c-primary)' }} /> {feature}
              </li>
            ))}
          </ul>

          <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1.5rem' }}>Donanımlar</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', listStyle: 'circle', paddingLeft: '1.5rem', color: 'var(--c-fg-muted)' }}>
            {room.amenities.map((amenity, i) => (
              <li key={i}>{amenity}</li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '2rem', padding: '2rem', backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--card-radius)', textAlign: 'center', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--c-primary)' }}>{room.displayPrice}</div>
            <Button variant="primary" style={{ width: '100%', marginBottom: '1rem' }}>Rezervasyon İçin İletişim</Button>
            <Link href="/sites/hotel/odalar" style={{ display: 'inline-block', color: 'var(--c-fg-muted)', textDecoration: 'underline', fontSize: '0.875rem' }}>
              Tüm Odalara Dön
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

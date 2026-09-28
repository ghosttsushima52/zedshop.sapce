import React from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { Button } from '../../../core/ui/primitives';
import { HOTEL_ROOMS } from '../../../content/hotel';
import Link from 'next/link';

export function HotelHome() {
  const featuredRooms = HOTEL_ROOMS.slice(0, 3);
  
  return (
    <SiteShell>
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: -1 }}>
          <img src={HOTEL_ROOMS[6]?.imageUrl} alt="Kaf Dağı Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        </div>
        <div style={{ maxWidth: '1200px', padding: '2rem', textAlign: 'center', color: '#fff', zIndex: 1 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 300, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Doğanın Ritmiyle Yeniden Tanışın
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '600px', marginInline: 'auto' }}>
            Kaçkar Dağları'nın sisli zirvelerinde, lüks ve sadeliğin kusursuz uyumunu sunan bir sığınak. Kendinizi doğanın iyileştirici gücüne bırakın.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/sites/hotel/odalar">
              <Button style={{ backgroundColor: '#fff', color: '#000' }}>Oda Seç</Button>
            </Link>
            <Link href="/sites/hotel/deneyimler">
              <Button style={{ backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }}>Deneyimler</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ backgroundColor: 'var(--color-surface-muted, #f5f5f5)', padding: '3rem 0', borderBottom: '1px solid var(--color-border, #e5e5e5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', textAlign: 'center' }}>
          <div><strong style={{ display: 'block', fontSize: '2rem' }}>18</strong><span>Oda ve Villa</span></div>
          <div><strong style={{ display: 'block', fontSize: '2rem' }}>20</strong><span>Rehberli Deneyim</span></div>
          <div><strong style={{ display: 'block', fontSize: '2rem' }}>4 Mevsim</strong><span>Açık</span></div>
          <div><strong style={{ display: 'block', fontSize: '2rem' }}>Kaçkar</strong><span>Dağları</span></div>
        </div>
      </section>

      {/* Teaser Grid */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', fontWeight: 300 }}>Öne Çıkan Yaşam Alanları</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {featuredRooms.map(room => (
            <div key={room.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <img src={room.imageUrl} alt={room.alt} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              <div>
                <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>{room.type}</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{room.title}</h3>
                <p style={{ color: '#555', marginTop: '0.5rem' }}>{room.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ backgroundColor: '#000', color: '#fff', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 300, textAlign: 'center' }}>Felsefemiz</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.125rem', lineHeight: 1.6, opacity: 0.9 }}>
            <p>Doğa mimarisi, var olanı bozmadan onunla bütünleşmeyi gerektirir. Kaf Dağı İnziva, bulunduğu coğrafyanın taşını, ahşabını ve ruhunu yansıtan bir anlayışla inşa edildi.</p>
            <p>Yavaş seyahat felsefesini benimsiyoruz. Ziyaretçilerimizi zamanın yavaş aktığı, anıların derinleştiği ve kendileriyle baş başa kalabilecekleri bir atmosfere davet ediyoruz.</p>
            <p>Minimal ayak izi prensibimizle, enerjimizi doğadan alıyor, atıklarımızı kaynağında ayrıştırıyor ve sadece çevremize değil, yerel topluluğa da değer katmayı hedefliyoruz.</p>
          </div>
          <blockquote style={{ fontSize: '1.5rem', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem', borderLeft: 'none', padding: 0 }}>
            "Doğanın sessizliği, ruhun en güçlü müziğidir."
          </blockquote>
        </div>
      </section>

      {/* Seasonal Preview */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', fontWeight: 300 }}>Dört Mevsim İnziva</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            { name: 'Bahar', theme: 'Uyanış ve Yenilenme', exp: 'Yabani Ot Toplayıcılığı' },
            { name: 'Yaz', theme: 'Güneş ve Bereket', exp: 'Açık Ateş Şef Masası' },
            { name: 'Güz', theme: 'Hasat ve Dönüşüm', exp: 'Soğuk Taş Baskı Zeytin Hasadı' },
            { name: 'Kış', theme: 'İçedönüş ve Sessizlik', exp: 'Samanyolu Gözlemi' }
          ].map((season) => (
            <div key={season.name} style={{ padding: '2rem', backgroundColor: '#f9f9f9', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>{season.name}</h3>
              <p style={{ color: '#444' }}><strong>Tema:</strong> {season.theme}</p>
              <p style={{ color: '#444' }}><strong>Öne Çıkan:</strong> {season.exp}</p>
              <Link href="/sites/hotel/deneyimler" style={{ marginTop: 'auto', textDecoration: 'underline', fontWeight: 500, color: '#000' }}>
                Detayları İncele
              </Link>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

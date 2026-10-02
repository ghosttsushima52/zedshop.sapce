import React from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { Button } from '../../../core/ui/primitives';

export function HotelSpa() {
  const facilities = [
    { name: 'Açık Termal Havuz', desc: 'Vadinin ortasında, 38°C doğal kaynak suyu ile kışın dahi sıcak bir kucaklaşma.', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
    { name: 'Kaya Buhar Odası', desc: 'Doğal mağara formunda oyulmuş, okaliptüs esanslı buhar banyosu.', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80' },
    { name: 'Orman Terapi Odaları', desc: 'Çam ağaçlarına bakan geniş pencereli masaj ve ritüel odaları.', img: 'https://images.unsplash.com/photo-1600334129128-685054366eb9?auto=format&fit=crop&w=800&q=80' }
  ];

  const treatments = [
    { title: 'Dağ Esintisi Masajı', desc: 'Bölgeye özgü ardıç ve kekik yağları ile uygulanan derin doku masajı.' },
    { title: 'Termal Su Ritüeli', desc: 'Mineral yönünden zengin termal su ile arınma ve kese uygulaması.' },
    { title: 'Volkanik Taş Terapisi', desc: 'Sıcak bazalt taşları ile kas gerginliklerini yok eden seans.' },
    { title: 'Bentonit Çamur Banyosu', desc: 'Cildi yenileyen ve toksinlerden arındıran doğal çamur sarması.' },
    { title: 'Shiatsu & Akupresür', desc: 'Enerji meridyenlerini dengeleyen uzak doğu masaj tekniği.' }
  ];

  return (
    <SiteShell brand="Kaf Dağı İnziva" tagline="Sessizlik ve Doğa Oteli">
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--c-bg-subtle)', color: 'var(--c-fg)', padding: '6rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--c-border)' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 300, marginBottom: '1.5rem' }}>Spa & Termal Şifa</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', color: 'var(--c-fg-muted)' }}>
          Yerin derinliklerinden gelen termal suyun iyileştirici gücüyle bedeninizi ve ruhunuzu yenileyin. Doğanın sessizliğinde tam bir arınma.
        </p>
      </section>

      {/* Facilities */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 300 }}>Şifa Alanları</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {facilities.map((fac, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--card-radius)', overflow: 'hidden' }}>
              <img src={fac.img} alt={fac.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--c-fg)' }}>{fac.name}</h3>
                <p style={{ color: 'var(--c-fg-muted)', lineHeight: 1.6 }}>{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments Menu */}
      <section style={{ backgroundColor: 'var(--c-bg-subtle)', padding: '5rem 2rem', borderTop: '1px solid var(--c-border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 300 }}>Bakım & Terapi Menüsü</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {treatments.map((tr, idx) => (
              <div key={idx} style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--c-border)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--c-fg)' }}>{tr.title}</h3>
                <p style={{ color: 'var(--c-fg-muted)' }}>{tr.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button variant="primary">Rezervasyon İçin İletişim</Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

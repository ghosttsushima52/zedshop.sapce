import React from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { MapPin, Plane, Car, AlertTriangle } from 'lucide-react';

export function HotelLocation() {
  return (
    <SiteShell>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 300, textAlign: 'center', marginBottom: '2rem' }}>Konum ve Ulaşım</h1>
        
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <MapPin size={32} style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ fontSize: '1.25rem' }}>Kaf Dağı Vadi Yolu No: 42, Çamlıhemşin / Rize</p>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>41.0123° K, 40.9876° D</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plane size={24} /> Transfer Seçenekleri
            </h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderLeft: '4px solid #000' }}>
                <strong>Rize-Artvin Havalimanı:</strong> 45 km (VIP Transfer: 50 Dk)
              </li>
              <li style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderLeft: '4px solid #000' }}>
                <strong>Trabzon Havalimanı:</strong> 160 km (VIP Transfer: 2.5 Saat)
              </li>
              <li style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderLeft: '4px solid #000' }}>
                <strong>Helikopter Transferi:</strong> İstanbul / Trabzon çıkışlı özel uçuşlar için otel pistimiz mevcuttur.
              </li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Car size={24} /> Yol ve Sürüş Bilgisi
            </h2>
            <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <p style={{ margin: 0 }}>
                Vadimize ulaşan son 5 kilometrelik orman yolu stabilize topraktır. Yüksek altlıklı SUV araçlar tavsiye edilir. Kış aylarında kar lastiği ve zincir zorunludur.
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '3rem' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', fontWeight: 300 }}>Mevsimlere Göre Hazırlık</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { s: 'Bahar', p: 'Yağmurluk, su geçirmez yürüyüş botu, katmanlı giysiler.' },
              { s: 'Yaz', p: 'Hafif kumaşlar, güneş kremi, akşam serinliği için ince bir kazak.' },
              { s: 'Güz', p: 'Rüzgarlık, termal içlik, kalın tabanlı bot, şapka.' },
              { s: 'Kış', p: 'Kar botu, kalın mont, atkı-bere, yün çoraplar.' }
            ].map(item => (
              <div key={item.s} style={{ padding: '1.5rem', backgroundColor: '#fafafa', border: '1px solid #eaeaea' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.s}</h3>
                <p style={{ color: '#555', fontSize: '0.875rem' }}>{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

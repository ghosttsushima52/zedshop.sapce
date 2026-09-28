'use client';

import { useState } from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { SectionHeading, Button, Card } from '../../../core/ui/primitives';
import { reservationDetails, restaurantMetadata } from '../../../content/restaurant';

export function RestaurantReservation() {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  
  const [formData, setFormData] = useState({
    area: '',
    time: '',
    date: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    requests: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReference('MOLA-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <section style={{ paddingBlock: 'var(--sp-12)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--sp-4)' }}>
          
          {submitted ? (
            <div style={{ padding: 'var(--sp-12)', textAlign: 'center', backgroundColor: 'var(--c-bg-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <SectionHeading title="Rezervasyonunuz Onaylandı" align="center" />
              <p style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--text-lg)' }}>
                Referans Kodunuz: <strong>{reference}</strong>
              </p>
              <div style={{ marginTop: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-2)', textAlign: 'left', maxWidth: '400px', margin: 'var(--sp-8) auto', backgroundColor: 'var(--c-bg)', padding: 'var(--sp-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--c-border)' }}>
                <div><strong>İsim:</strong> {formData.name}</div>
                <div><strong>Tarih:</strong> {formData.date}</div>
                <div><strong>Oturum:</strong> {formData.time}</div>
                <div><strong>Kişi Sayısı:</strong> {formData.guests}</div>
                <div><strong>Alan:</strong> {formData.area}</div>
              </div>
              <p style={{ color: 'var(--c-text-muted)', marginBottom: 'var(--sp-8)' }}>
                Onay e-postası {formData.email} adresine gönderildi. Sizi ağırlamaktan mutluluk duyacağız.
              </p>
              <Button onClick={() => setSubmitted(false)}>Yeni Rezervasyon</Button>
            </div>
          ) : (
            <>
              <SectionHeading title={reservationDetails.title} body={reservationDetails.lead} align="center" />
              
              <form onSubmit={handleSubmit} style={{ marginTop: 'var(--sp-12)', display: 'grid', gap: 'var(--sp-8)' }}>
                
                {/* Seating Area Selection */}
                <fieldset style={{ border: 'none', padding: 0 }}>
                  <legend style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--sp-4)' }}>Oturma Alanı Seçimi</legend>
                  <div style={{ display: 'grid', gap: 'var(--sp-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    {reservationDetails.seatingAreas.slice(0, 3).map((area) => (
                      <label key={area.id} style={{ cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="area"
                          value={area.name}
                          required
                          checked={formData.area === area.name}
                          onChange={handleInputChange}
                          style={{ position: 'absolute', opacity: 0 }}
                        />
                        <Card 
                          title={area.name}
                          description={area.description}
                          className={formData.area === area.name ? 'card--active' : ''}
                          style={{ 
                            border: formData.area === area.name ? '2px solid var(--c-accent)' : '1px solid var(--c-border)',
                            backgroundColor: formData.area === area.name ? 'var(--c-bg-subtle)' : 'var(--c-bg)',
                            height: '100%'
                          }}
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div style={{ display: 'grid', gap: 'var(--sp-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  {/* Sitting Time */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--sp-2)', fontWeight: 'bold' }}>Oturum Saati</label>
                    <select name="time" value={formData.time} onChange={handleInputChange} required style={inputStyles}>
                      <option value="">Seçiniz</option>
                      <option value="Öğle 12:30–15:30">Öğle (12:30–15:30)</option>
                      <option value="Akşam 19:00–23:30">Akşam (19:00–23:30)</option>
                    </select>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--sp-2)', fontWeight: 'bold' }}>Tarih</label>
                    <input type="date" name="date" min={today} value={formData.date} onChange={handleInputChange} required style={inputStyles} />
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--sp-2)', fontWeight: 'bold' }}>Kişi Sayısı</label>
                    <select name="guests" value={formData.guests} onChange={handleInputChange} required style={inputStyles}>
                      {[...Array(10)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} Kişi</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 'var(--sp-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--sp-2)', fontWeight: 'bold' }}>Ad Soyad</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={inputStyles} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--sp-2)', fontWeight: 'bold' }}>E-posta</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={inputStyles} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--sp-2)', fontWeight: 'bold' }}>Telefon</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required style={inputStyles} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--sp-2)', fontWeight: 'bold' }}>Özel İstekler / Alerjiler</label>
                  <textarea name="requests" value={formData.requests} onChange={handleInputChange} rows={4} style={inputStyles}></textarea>
                </div>

                <Button type="submit" variant="primary" style={{ width: '100%', paddingBlock: 'var(--sp-4)', fontSize: 'var(--text-lg)' }}>
                  Rezervasyon Talebi Gönder
                </Button>
              </form>
            </>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

const inputStyles = {
  width: '100%',
  padding: 'var(--sp-3)',
  border: '1px solid var(--c-border)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--c-bg)',
  color: 'var(--c-text)',
  fontFamily: 'inherit',
};

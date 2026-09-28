'use client';

import React, { useState } from 'react';
import type { RareBookItem } from '@/content/rareBooks';
import { X, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/core/ui/primitives';

interface ReservationModalProps {
  item: RareBookItem;
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ item, isOpen, onClose }: ReservationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Beyazıt Sahaflar Galerisi');
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const code = `AVX-NAD-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(code);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--sp-4)',
      }}
      onClick={handleResetAndClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          background: 'var(--c-bg-raised)',
          border: '1px solid var(--c-border-strong)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--sp-4) var(--sp-6)',
            borderBottom: '1px solid var(--c-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} style={{ color: 'var(--c-accent)' }} />
            <h3
              id="reservation-modal-title"
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--c-fg)',
                fontFamily: 'var(--font-display)',
                margin: 0,
              }}
            >
              Özel İnceleme & Rezervasyon Randevusu
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Kapat"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--c-fg-muted)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--sp-6)' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', paddingBlock: 'var(--sp-4)' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--sp-4)',
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--c-fg)',
                  marginBottom: 'var(--sp-2)',
                }}
              >
                Randevu Talebiniz Alındı
              </h4>

              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--c-fg-muted)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--sp-4)',
                }}
              >
                Sayın <strong>{name}</strong>, <strong>{item.title}</strong> eseri için
                inceleme talebiniz arşiv uzmanlarımıza iletilmiştir.
              </p>

              <div
                style={{
                  background: 'var(--c-bg)',
                  border: '1px dashed var(--c-border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--sp-3)',
                  marginBottom: 'var(--sp-6)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--c-accent)',
                  fontWeight: 700,
                }}
              >
                Kayıt Kodu: {reservationCode}
              </div>

              <Button variant="primary" onClick={handleResetAndClose}>
                Tamamla ve Kapat
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              {/* Item Summary Banner */}
              <div
                style={{
                  padding: 'var(--sp-3)',
                  background: 'var(--c-bg-subtle)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-3)',
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 700,
                      color: 'var(--c-fg)',
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h4>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>
                    {item.year} • {item.author} • {item.displayPrice}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="res-name"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--c-fg-muted)',
                    marginBottom: 'var(--sp-1)',
                  }}
                >
                  Adınız ve Soyadınız
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Koleksiyoner veya kurum temsilcisi adı"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    fontSize: 'var(--text-sm)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--c-border-strong)',
                    background: 'var(--c-bg)',
                    color: 'var(--c-fg)',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
                <div>
                  <label
                    htmlFor="res-email"
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--c-fg-muted)',
                      marginBottom: 'var(--sp-1)',
                    }}
                  >
                    E-Posta
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@koleksiyon.com"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      fontSize: 'var(--text-sm)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--c-border-strong)',
                      background: 'var(--c-bg)',
                      color: 'var(--c-fg)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="res-phone"
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--c-fg-muted)',
                      marginBottom: 'var(--sp-1)',
                    }}
                  >
                    Telefon
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+90 (5XX) XXX XX XX"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      fontSize: 'var(--text-sm)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--c-border-strong)',
                      background: 'var(--c-bg)',
                      color: 'var(--c-fg)',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
                <div>
                  <label
                    htmlFor="res-date"
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--c-fg-muted)',
                      marginBottom: 'var(--sp-1)',
                    }}
                  >
                    Tercih Edilen Randevu Tarihi
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      fontSize: 'var(--text-sm)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--c-border-strong)',
                      background: 'var(--c-bg)',
                      color: 'var(--c-fg)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="res-loc"
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--c-fg-muted)',
                      marginBottom: 'var(--sp-1)',
                    }}
                  >
                    Ziyaret Yeri
                  </label>
                  <select
                    id="res-loc"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      fontSize: 'var(--text-sm)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--c-border-strong)',
                      background: 'var(--c-bg)',
                      color: 'var(--c-fg)',
                    }}
                  >
                    <option value="Beyazıt Sahaflar Galerisi">Beyazıt Sahaflar Galerisi</option>
                    <option value="Pera Sergi Salonu (Beyoğlu)">Pera Sergi Salonu (Beyoğlu)</option>
                    <option value="Özel İklimlendirme Odası (Kasa İncelemesi)">Özel Kasa İncelemesi</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--c-fg-faint)',
                }}
              >
                <ShieldCheck size={14} style={{ color: 'var(--c-accent)' }} />
                <span>Ekspertiz ve inceleme randevuları ILAB gizlilik kurallarına tabidir.</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--sp-3)', marginTop: 'var(--sp-2)' }}>
                <Button variant="ghost" type="button" onClick={handleResetAndClose}>
                  İptal
                </Button>
                <Button variant="primary" type="submit">
                  Randevu Talebini Onayla
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

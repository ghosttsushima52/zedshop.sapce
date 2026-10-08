'use client';

import React, { useState, useEffect } from 'react';
import {
  PaymentStatus,
  PaymentRequest,
  ReceiptData
} from './types';
import {
  getOrCreateSessionId,
  getRequestBySession,
  createPaymentRequest,
  submitReceipt,
  resetSessionRequest,
  subscribeToPaymentUpdates,
} from './paymentStore';
import { CountdownTimer } from './CountdownTimer';
import { ReceiptUpload } from './ReceiptUpload';

interface PaymentFlowProps {
  productTitle?: string;
  defaultAmount?: string;
  initialAmount?: string;
  brandTitle?: string;
  targetSite?: string;
  themeAccent?: string;
  onDone?: () => void;
}

export function PaymentFlow({
  productTitle = 'Standart Sipariş',
  defaultAmount,
  initialAmount,
  brandTitle,
  targetSite,
  themeAccent = '#38bdf8',
  onDone,
}: PaymentFlowProps) {
  const effectiveBrandTitle = targetSite || brandTitle || 'Güvenli IBAN Ödeme Sistemi';
  const effectiveAmount = initialAmount || defaultAmount || '24.990,00 TL';
  const [sessionId, setSessionId] = useState('');
  const [request, setRequest] = useState<PaymentRequest | null>(null);
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [copied, setCopied] = useState(false);

  // Form states
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Initialize and subscribe
  useEffect(() => {
    const sid = getOrCreateSessionId();
    setSessionId(sid);

    const checkState = () => {
      const active = getRequestBySession(sid);
      if (active) {
        setRequest(active);
        // Check if expired
        if (active.status === 'approved' && active.expires_at) {
          const isExp = new Date(active.expires_at).getTime() < Date.now();
          setStatus(isExp ? 'expired' : 'approved');
        } else {
          setStatus(active.status);
        }
      }
    };

    checkState();
    const unsubscribe = subscribeToPaymentUpdates(checkState);
    return () => unsubscribe();
  }, []);

  const handleStartRequest = () => {
    setStatus('form');
  };

  const handlePhoneChange = (val: string) => {
    // Only numbers
    const cleaned = val.replace(/\D/g, '');
    setUserPhone(cleaned);
    if (cleaned && !cleaned.startsWith('05') && !cleaned.startsWith('5')) {
      setPhoneError('Telefon numarası 05XX formatında olmalıdır.');
    } else if (cleaned.length > 11) {
      setPhoneError('Geçersiz numara uzunluğu.');
    } else {
      setPhoneError(null);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPhone = userPhone.startsWith('0') ? userPhone : '0' + userPhone;

    if (!/^05\d{9}$/.test(formattedPhone)) {
      setPhoneError('Lütfen geçerli bir 11 haneli GSM numarası girin (Örn: 05321234567)');
      return;
    }

    const newReq = createPaymentRequest({
      session_id: sessionId,
      user_name: userName.trim(),
      user_phone: formattedPhone,
      user_email: userEmail.trim() || undefined,
      product_name: productTitle,
      amount: effectiveAmount,
    });

    setRequest(newReq);
    setStatus('waiting');
  };

  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReceiptUploaded = (receipt: ReceiptData) => {
    if (!request) return;
    const updated = submitReceipt(request.id, receipt);
    if (updated) {
      setRequest(updated);
      setStatus('done');
      if (onDone) onDone();
    }
  };

  const handleReset = () => {
    resetSessionRequest(sessionId);
    setRequest(null);
    setStatus('idle');
    setUserName('');
    setUserPhone('');
    setUserEmail('');
  };

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '32px 24px',
        background: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--card-border, #e2e8f0)',
        borderRadius: '24px',
        boxShadow: 'var(--card-shadow, 0 10px 30px rgba(0,0,0,0.06))',
        color: 'var(--c-fg, #0f172a)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--c-border, #e2e8f0)', paddingBottom: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'var(--c-bg-subtle, #f1f5f9)', color: themeAccent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{effectiveBrandTitle}</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--c-fg-muted, #64748b)' }}>
              Ürün: <strong>{productTitle}</strong> · Tutar: <strong>{effectiveAmount}</strong>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--c-fg-muted, #64748b)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>256-Bit SSL</span>
        </div>
      </div>

      {/* STATE 1: IDLE */}
      {status === 'idle' && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--c-bg-subtle, #f1f5f9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: themeAccent,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
              <line x1="2" y1="20" x2="22" y2="20" />
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
            Havale & EFT ile Ödeme
          </h2>
          <p style={{ color: 'var(--c-fg-muted, #64748b)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Ödeme yapacağınız banka hesap bilgileri (IBAN) ve işlem süreniz yöneticimiz tarafından anlık olarak tanımlanacaktır.
          </p>

          <button
            onClick={handleStartRequest}
            style={{
              padding: '14px 28px',
              borderRadius: '12px',
              background: themeAccent === '#38bdf8' ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' : themeAccent,
              color: '#ffffff',
              border: 'none',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            }}
          >
            <span>Ödeme Bilgisi Talep Et</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      )}

      {/* STATE 2: FORM */}
      {status === 'form' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 6px 0' }}>Ödeme Talebi Oluştur</h2>
            <p style={{ fontSize: '13px', color: 'var(--c-fg-muted, #64748b)', margin: 0 }}>
              Yalnızca iletişim bilgilerinizi giriniz. Vergi numarası veya şirket bilgisi gerekmez.
            </p>
          </div>

          <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Ad Soyad <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Ahmet Yılmaz"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--c-border, #cbd5e1)',
                    background: 'var(--c-bg-subtle, #f8fafc)',
                    color: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Telefon Numarası (GSM) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div>
                <input
                  type="tel"
                  required
                  placeholder="05XXXXXXXXX"
                  value={userPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: `1px solid ${phoneError ? '#ef4444' : 'var(--c-border, #cbd5e1)'}`,
                    background: 'var(--c-bg-subtle, #f8fafc)',
                    color: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              {phoneError && (
                <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{phoneError}</span>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                E-posta Adresi <span style={{ fontSize: '11px', color: 'var(--c-fg-muted, #94a3b8)' }}>(Opsiyonel)</span>
              </label>
              <div>
                <input
                  type="email"
                  placeholder="ornek@mail.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--c-border, #cbd5e1)',
                    background: 'var(--c-bg-subtle, #f8fafc)',
                    color: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--c-border, #cbd5e1)',
                  background: 'transparent',
                  color: 'inherit',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Geri
              </button>
              <button
                type="submit"
                style={{
                  flex: 2,
                  padding: '12px',
                  borderRadius: '10px',
                  background: themeAccent === '#38bdf8' ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' : themeAccent,
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Talebi Gönder</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STATE 3: WAITING */}
      {status === 'waiting' && (
        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: '#0284c7',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 14 14" />
            </svg>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
            Ödeme Talebiniz Yöneticilerimize İletildi
          </h2>
          <p style={{ color: 'var(--c-fg-muted, #64748b)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
            Talebiniz inceleniyor. Yönetici tarafından onaylandığında bu ekranda IBAN bilgileri ve geri sayım süreniz otomatik olarak görüntülenecektir.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'var(--c-bg-subtle, #f1f5f9)',
              fontSize: '12px',
              color: 'var(--c-fg-muted, #64748b)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>Canlı Onay Bekleniyor (Sayfayı kapatmayınız)</span>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button
              onClick={handleReset}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--c-fg-muted, #94a3b8)',
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Talebi İptal Et ve Başa Dön
            </button>
          </div>
        </div>
      )}

      {/* STATE 4: APPROVED */}
      {status === 'approved' && request && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Onaylandı</span>
              </span>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '6px 0 0 0' }}>Ödeme ve Transfer Bilgileri</h2>
            </div>
            {request.expires_at && (
              <CountdownTimer
                expiresAt={request.expires_at}
                onExpire={() => setStatus('expired')}
              />
            )}
          </div>

          {/* Details Box */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--c-border, #cbd5e1)',
              background: 'var(--c-bg-subtle, #f8fafc)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--c-fg-muted, #64748b)', fontWeight: 600 }}>Banka Adı</span>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--c-fg, #0f172a)' }}>
                  {request.bank_name || 'Garanti BBVA'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--c-fg-muted, #64748b)', fontWeight: 600 }}>Hesap Sahibi</span>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--c-fg, #0f172a)' }}>
                  {request.account_holder || 'Resmi Satış & Tahsilat'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--c-fg-muted, #64748b)', fontWeight: 600 }}>Ödenecek Tutar</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#10b981' }}>
                  {request.amount}
                </div>
              </div>
            </div>

            {/* IBAN Row */}
            <div
              style={{
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--c-border, #cbd5e1)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--c-fg-muted, #64748b)', fontWeight: 600 }}>IBAN Numarası</span>
                <div style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, fontSize: '16px', letterSpacing: '0.04em' }}>
                  {request.iban || 'TR00 0000 0000 0000 0000 0000 00'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyIban(request.iban || '')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: copied ? '#10b981' : themeAccent === '#38bdf8' ? '#0284c7' : themeAccent,
                  color: '#fff',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>

            {request.admin_note && (
              <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', fontSize: '13px' }}>
                <strong>Yönetici Notu:</strong> {request.admin_note}
              </div>
            )}
          </div>

          {/* Receipt Upload section */}
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0' }}>Dekont / Fiş Yükleme</h3>
            <p style={{ fontSize: '12px', color: 'var(--c-fg-muted, #64748b)', margin: 0 }}>
              Transferi gerçekleştirdikten sonra banka dekontunuzu yükleyiniz.
            </p>
            <ReceiptUpload
              requestId={request.id}
              onUploadSuccess={handleReceiptUploaded}
            />
          </div>
        </div>
      )}

      {/* STATE 5: EXPIRED */}
      {status === 'expired' && (
        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: '#ef4444',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: '#ef4444' }}>
            Süreniz Doldu
          </h2>
          <p style={{ color: 'var(--c-fg-muted, #64748b)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
            Tahsis edilen ödeme süresi sona ermiştir. Güvenlik protokolümüz gereği IBAN bilgileri yenilenmelidir. Lütfen tekrar talep oluşturun.
          </p>

          <button
            onClick={handleReset}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              background: themeAccent === '#38bdf8' ? '#0284c7' : themeAccent,
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Yeni Talep Oluştur
          </button>
        </div>
      )}

      {/* STATE 6: DONE */}
      {status === 'done' && (
        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: '#10b981',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
            Ödemeniz ve Dekontunuz Başarıyla Alındı
          </h2>
          <p style={{ color: 'var(--c-fg-muted, #64748b)', fontSize: '14px', maxWidth: '460px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
            Dekontunuz onay kuyruğuna alınmıştır. Müşteri temsilcimiz siparişinizi en kısa sürede teslim edecektir.
          </p>

          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'var(--c-bg-subtle, #f8fafc)',
              border: '1px solid var(--c-border, #e2e8f0)',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '13px',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <div><strong>Talep No:</strong> {request?.id}</div>
            <div><strong>Alıcı:</strong> {request?.user_name} ({request?.user_phone})</div>
            <div><strong>Tutar:</strong> {request?.amount}</div>
            {request?.receipt && (
              <div><strong>Yüklenen Dekont:</strong> {request.receipt.file_name}</div>
            )}
          </div>

          <div>
            <button
              onClick={handleReset}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'transparent',
                border: '1px solid var(--c-border, #cbd5e1)',
                color: 'inherit',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Yeni İşlem Başlat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

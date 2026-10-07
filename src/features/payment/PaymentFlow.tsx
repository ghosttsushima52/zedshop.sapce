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
import {
  CreditCard,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Clock,
  Building,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';

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
          <div style={{ padding: '8px', borderRadius: '12px', background: 'var(--c-bg-subtle, #f1f5f9)', color: themeAccent }}>
            <CreditCard size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{brandTitle}</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--c-fg-muted, #64748b)' }}>
              Ürün: <strong>{productTitle}</strong> · Tutar: <strong>{defaultAmount}</strong>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--c-fg-muted, #64748b)' }}>
          <Lock size={12} />
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
            <Building size={36} />
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
            <ArrowRight size={18} />
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
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-fg-muted, #94a3b8)' }} />
                <input
                  type="text"
                  required
                  placeholder="Ahmet Yılmaz"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
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
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-fg-muted, #94a3b8)' }} />
                <input
                  type="tel"
                  required
                  placeholder="05XXXXXXXXX"
                  value={userPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
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
                  <AlertCircle size={13} />
                  <span>{phoneError}</span>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                E-posta Adresi <span style={{ fontSize: '11px', color: 'var(--c-fg-muted, #94a3b8)' }}>(Opsiyonel)</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-fg-muted, #94a3b8)' }} />
                <input
                  type="email"
                  placeholder="ornek@mail.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
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
                <ArrowRight size={16} />
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
            <Clock size={32} className="animate-spin" />
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
            <RefreshCw size={12} className="animate-spin" />
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
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                <CheckCircle2 size={12} /> Onaylandı
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
                {copied ? <Check size={14} /> : <Copy size={14} />}
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
            <AlertCircle size={32} />
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
            <ShieldCheck size={40} />
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

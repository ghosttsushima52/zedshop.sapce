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
  productTitle = 'Volta Elektrikli Araç Rezervasyonu',
  defaultAmount,
  initialAmount,
  brandTitle,
  targetSite,
  themeAccent = '#dc2626',
  onDone,
}: PaymentFlowProps) {
  const effectiveBrandTitle = targetSite || brandTitle || 'Volta Motor';
  const effectiveAmount = initialAmount || defaultAmount || '24.990,00 TL';
  const [sessionId, setSessionId] = useState('');
  const [request, setRequest] = useState<PaymentRequest | null>(null);
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'havale' | 'card'>('havale');

  // Form states
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCity, setUserCity] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Initialize and subscribe
  useEffect(() => {
    const sid = getOrCreateSessionId();
    setSessionId(sid);

    const checkState = () => {
      const active = getRequestBySession(sid);
      if (active) {
        setRequest(active);
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
      user_email: userCity ? `Teslimat Şehri: ${userCity.trim()}` : undefined,
      product_name: productTitle,
      amount: effectiveAmount,
    });

    setRequest(newReq);
    setStatus('waiting');
  };

  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban.replace(/\s+/g, ''));
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleCopyRef = (refCode: string) => {
    navigator.clipboard.writeText(refCode);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
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
    setUserCity('');
  };

  const refCode = request?.id ? `VOLTA-${String(request.id).replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase()}` : 'VOLTA-SIPARIS';

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/80 overflow-hidden text-slate-800">
      {/* Top Header */}
      <div className="bg-[#14212d] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            V
          </div>
          <div>
            <div className="text-xs text-red-400 font-bold uppercase tracking-wider">Güvenli Ödeme & Rezervasyon</div>
            <h3 className="text-base sm:text-lg font-black text-white">{effectiveBrandTitle}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-semibold">256-Bit SSL Güvenli</span>
        </div>
      </div>

      {/* Order Summary Ribbon */}
      <div className="bg-slate-50 px-5 sm:px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Seçili Model / Ürün:</span>
          <span className="font-bold text-slate-900">{productTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Toplam Tutar:</span>
          <span className="text-sm font-black text-red-600">{effectiveAmount}</span>
        </div>
      </div>

      {/* Payment Method Selector Tabs (Doabys Style) */}
      <div className="p-5 sm:p-6 pb-2">
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 mb-6">
          <button
            type="button"
            onClick={() => setPaymentMethod('havale')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              paymentMethod === 'havale'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span>Havale / EFT / FAST</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              paymentMethod === 'card'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span>Kredi / Banka Kartı</span>
          </button>
        </div>

        {paymentMethod === 'card' && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Kart ile Online Tahsilat & Taksit</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-4 leading-relaxed">
              Kredi kartı ile peşin veya 12 aya varan taksit seçenekleri için müşteri temsilcimiz üzerinden güvenli 3D Secure ödeme linki oluşturabilirsiniz.
            </p>
            <a
              href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(productTitle)}%20i%C3%A7in%20kredi%20kart%C4%B1%20ile%20%C3%B6deme%20linki%20istiyorum`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-emerald-600/20"
            >
              <span>Kart Ödeme Linki Talep Et</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Main Payment Content Container */}
      <div className="p-5 sm:p-6 pt-0">
        {/* STATE 1: IDLE */}
        {status === 'idle' && (
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-sm">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Resmi Banka Havalesi / FAST ile Ödeme
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              Ödeme yapacağınız resmi şirket banka hesap (IBAN) bilgileriniz ve sipariş referans kodunuz anında tanımlanacaktır.
            </p>

            <button
              onClick={handleStartRequest}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-600/20 transition-all text-sm active:scale-98"
            >
              <span>Ödeme Bilgilerini Görüntüle</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        )}

        {/* STATE 2: FORM (Clean, No Tax ID, Direct & Simple) */}
        {status === 'form' && (
          <div>
            <div className="mb-5">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">İletişim & Rezervasyon Bilgileri</h3>
              <p className="text-xs text-slate-500 mt-1">
                Yalnızca iletişim bilgilerinizi giriniz. Şirket evrakı veya vergi numarası istenmez.
              </p>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ad Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Ahmet Yılmaz"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  GSM Telefon Numarası <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="05XXXXXXXXX"
                  value={userPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    phoneError ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-slate-50/50'
                  } text-slate-900 text-sm focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition`}
                />
                {phoneError && (
                  <p className="text-xs text-red-600 mt-1 font-semibold flex items-center gap-1">
                    <span>⚠</span> {phoneError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Teslimat İli / İlçe <span className="text-slate-400 font-normal">(Opsiyonel)</span>
                </label>
                <input
                  type="text"
                  placeholder="Örn: İstanbul / Kadıköy"
                  value={userCity}
                  onChange={(e) => setUserCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition"
                >
                  Geri
                </button>
                <button
                  type="submit"
                  className="flex-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2"
                >
                  <span>IBAN Bilgilerini Getir</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STATE 3: WAITING / VERIFYING */}
        {status === 'waiting' && (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100 animate-pulse">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
              Banka Bilgileri Hazırlanıyor
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              Adınıza özel tahsilat hesap bilgileri ve 10 dakikalık işlem süreniz tanımlanıyor. Lütfen sayfayı kapatmayınız.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Canlı Onay Bekleniyor</span>
            </div>

            <div className="mt-6">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-600 underline font-medium"
              >
                İptal Et ve Bilgileri Düzenle
              </button>
            </div>
          </div>
        )}

        {/* STATE 4: APPROVED / ACTIVE PAYMENT DETAILS */}
        {status === 'approved' && request && (
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-4 border-b border-slate-200">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Ödeme Bilgileri Aktif</span>
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">Havale & EFT Bilgileri</h3>
              </div>
              {request.expires_at && (
                <CountdownTimer
                  expiresAt={request.expires_at}
                  onExpire={() => setStatus('expired')}
                />
              )}
            </div>

            {/* Official Bank Details Card */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Banka</span>
                  <strong className="text-slate-900 text-sm sm:text-base font-bold">{request.bank_name || 'Türkiye İş Bankası'}</strong>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Hesap Sahibi</span>
                  <strong className="text-slate-900 text-sm sm:text-base font-bold">{request.account_holder || 'Volta Motor San. ve Tic. A.Ş.'}</strong>
                </div>
              </div>

              {/* IBAN Box with Quick Copy */}
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">IBAN Numarası</span>
                  <span className="font-mono font-bold text-slate-900 text-sm sm:text-base tracking-tight select-all">
                    {request.iban || 'TR00 0000 0000 0000 0000 0000 00'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyIban(request.iban || '')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                    copiedIban ? 'bg-emerald-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {copiedIban ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reference Code & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Açıklama / Referans Kodu</span>
                    <span className="font-mono font-black text-slate-800 text-xs sm:text-sm">{refCode}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyRef(refCode)}
                    className="text-[11px] font-bold text-red-600 hover:text-red-700 underline"
                  >
                    {copiedRef ? 'Kopyalandı' : 'Kopyala'}
                  </button>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Ödenecek Tutar</span>
                    <span className="font-black text-emerald-600 text-base sm:text-lg">{request.amount}</span>
                  </div>
                </div>
              </div>

              {request.admin_note && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-xl">
                  <strong>Yetkili Notu:</strong> {request.admin_note}
                </div>
              )}
            </div>

            {/* Step: Receipt Upload */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <h4 className="font-black text-slate-900 text-sm sm:text-base mb-1">Dekont / Fiş Yükleme</h4>
              <p className="text-xs text-slate-500 mb-3">
                Havale / FAST transferinizi tamamladıktan sonra banka dekontunuzu yükleyiniz.
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
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">Ödeme Süresi Sona Erdi</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
              Güvenlik protokolü gereği tahsis edilen 10 dakikalık IBAN işlem süresi dolmuştur. Yeni bir ödeme talebi oluşturabilirsiniz.
            </p>

            <button
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition"
            >
              Yeni Talep Oluştur
            </button>
          </div>
        )}

        {/* STATE 6: DONE */}
        {status === 'done' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Dekontunuz ve Siparişiniz Alındı
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              Ödemeniz muhasebe birimimiz tarafından onay kuyruğuna alınmıştır. Araç teslimat ve fatura süreçleri için yetkilimiz sizinle irtibata geçecektir.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left max-w-md mx-auto mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Sipariş Referansı:</span>
                <span className="font-mono font-bold text-slate-900">{refCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Alıcı Adı:</span>
                <span className="font-bold text-slate-900">{request?.user_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Telefon:</span>
                <span className="font-bold text-slate-900">{request?.user_phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tutar:</span>
                <span className="font-black text-emerald-600">{request?.amount}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/905000000000?text=Merhaba,%20${refCode}%20referansl%C4%B1%20sipari%C5%9Fim%20i%C3%A7in%20dekontumu%20y%C3%BCkledim.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl text-xs transition"
              >
                <span>WhatsApp ile Onay Durumu Öğren</span>
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Yeni Sipariş / İşlem
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

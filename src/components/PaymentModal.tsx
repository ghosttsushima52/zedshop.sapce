'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { VoltaModel } from '@/types';
import { WhatsAppIcon } from './Icons';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedModel?: VoltaModel | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  preselectedModel,
}) => {
  const { user } = useAuth();
  const { models, createOrder, bankInfo } = useData();

  // Step state: 1 = Contact & Delivery Info, 2 = Model & Payment
  const [step, setStep] = useState<1 | 2>(1);

  const [selectedModelId, setSelectedModelId] = useState<string>(
    preselectedModel ? preselectedModel.id : models[0]?.id || 'vsm'
  );
  
  // Only Bank Transfer / EFT
  const paymentMethod = 'havale';
  
  // Step 1 Form fields (E-mail removed per user request)
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [receiptNote, setReceiptNote] = useState('');

  const [stepError, setStepError] = useState<string | null>(null);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  // Sync model selection & reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (preselectedModel) {
        setSelectedModelId(preselectedModel.id);
      } else if (models.length > 0 && !selectedModelId) {
        setSelectedModelId(models[0].id);
      }
      setCompletedOrderNumber(null);
      setStep(1);
      setStepError(null);
    }
  }, [isOpen, preselectedModel, models]);

  // Autofill if logged in user data arrives
  useEffect(() => {
    if (user) {
      if (user.name && !name) setName(user.name);
      if (user.phone && !phone) setPhone(user.phone);
    }
  }, [user]);

  if (!isOpen) return null;

  const currentModel = models.find((m) => m.id === selectedModelId) || preselectedModel || models[0];
  const finalPrice = currentModel && currentModel.price > 0 ? currentModel.price : 24990;

  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStepError(null);

    if (!phone.trim()) {
      setStepError('Lütfen geçerli bir telefon numarası giriniz.');
      return;
    }

    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.trim();
    const fallbackEmail = user?.email || (cleanPhone ? `${cleanPhone.replace(/\D/g, '')}@voltaservis.net` : 'musteri@voltaservis.net');

    const order = createOrder({
      customerName: name.trim() || 'Değerli Müşterimiz',
      customerPhone: cleanPhone,
      customerEmail: fallbackEmail,
      modelId: currentModel?.id || 'vsm',
      modelName: currentModel ? `Volta ${currentModel.name}` : 'Volta Motosiklet',
      amount: finalPrice,
      paymentMethod,
      city: city.trim() || 'Belirtilmedi',
      address: address.trim() || 'Belirtilmedi',
      receiptNote: receiptNote.trim(),
    });

    setCompletedOrderNumber(order.orderNumber);
  };

  const handleResetAndClose = () => {
    setCompletedOrderNumber(null);
    setStep(1);
    setStepError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-2 sm:p-4 flex sm:items-center items-start justify-center animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#14212d] text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/volta-service-logo.png" alt="Volta" className="w-10 h-10 object-contain rounded-xl" />
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">Güvenli Araç Rezervasyonu & Ödeme</h3>
              <p className="text-xs text-slate-400">SSL 256-Bit Şifreli Doğrudan Fabrika Siparişi</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator Header (Only shown when not completed) */}
        {!completedOrderNumber && (
          <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg ${step === 1 ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                1. İletişim Bilgileri
              </span>
              <span className="text-slate-400">→</span>
              <span className={`px-2.5 py-1 rounded-lg ${step === 2 ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                2. Model & Ödeme
              </span>
            </div>
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-600 hover:text-slate-900 font-semibold underline text-[11px]"
              >
                ← 1. Adıma Dön
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {completedOrderNumber ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto font-black shadow-md">
                ✓
              </div>
              <h4 className="text-xl font-black text-slate-900">Siparişiniz Alındı!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Talebiniz başarıyla kaydedildi. Sipariş numaranız ve ayrıntılarınız müşteri panelinize aktarılmıştır.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-xs mx-auto">
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Sipariş Takip Numarası</span>
                <span className="font-mono text-lg font-black text-slate-900">{completedOrderNumber}</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/905000000000?text=Merhaba,%20${encodeURIComponent(completedOrderNumber)}%20numaral%C4%B1%20sipari%C5%9Fim%20i%C3%A7in%20%C3%B6deme%20bilgisi%20talep%20ediyorum`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp ile Ödeme Bilgisi Al</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition"
                >
                  Tamamla ve Kapat
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* ================= STEP 1: İLETİŞİM BİLGİLERİ ================= */
            <form onSubmit={handleProceedToStep2} className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  1. İLETİŞİM BİLGİLERİ — HIZLI SİPARİŞ
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lütfen teslimat ve sipariş teyidi için telefon numaranızı giriniz (üyelik gerekmez).
                </p>
              </div>

              {stepError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl">
                  {stepError}
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Ad Soyad (İsteğe bağlı)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ahmet Yılmaz"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Telefon Numarası *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Teslimat İli (İsteğe bağlı)
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="İstanbul, Ankara, İzmir..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Teslimat Adresi (İsteğe bağlı)
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Mahalle, cadde, sokak, bina ve daire numarası..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Ödeme Notu / Dekont Numarası (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={receiptNote}
                  onChange={(e) => setReceiptNote(e.target.value)}
                  placeholder="Varsa notunuz veya açıklamanız"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition shadow-md active:scale-98 flex items-center gap-2"
                >
                  <span>Devam Et (Model ve Ödeme Seçimi)</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          ) : (
            /* ================= STEP 2: MODEL SEÇİMİ VE ÖDEME ================= */
            <form onSubmit={handleFinalSubmit} className="space-y-5">
              {/* Step 2.1: Model Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  1. SEÇİLEN MODEL & SATIŞ FİYATI
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedModelId(m.id)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                        selectedModelId === m.id
                          ? 'border-red-600 bg-red-50/50 shadow-sm ring-2 ring-red-100'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <span className="text-xs font-black text-slate-900">{m.name}</span>
                      <span className="text-[11px] font-bold text-red-600 mt-1 font-mono">
                        {m.price.toLocaleString('tr-TR')} TL
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2.2: Payment Method (Only Banka Havalesi / EFT) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  2. ÖDEME YÖNTEMİ
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-3.5 rounded-2xl border border-red-600 bg-red-50/40 ring-2 ring-red-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full border-2 border-red-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        Banka Havalesi / EFT
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                      Aktif
                    </span>
                  </div>
                </div>

                {/* Bank / IBAN Info Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-3 space-y-3 text-xs">
                  {bankInfo && bankInfo.iban ? (
                    <div className="space-y-2">
                      {bankInfo.bankName && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Banka:</span>
                          <span className="font-bold text-slate-900">{bankInfo.bankName}</span>
                        </div>
                      )}
                      {bankInfo.accountHolder && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Alıcı:</span>
                          <span className="font-bold text-slate-900">{bankInfo.accountHolder}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">IBAN:</span>
                        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">
                          {bankInfo.iban}
                        </span>
                      </div>
                      {bankInfo.description && (
                        <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                          {bankInfo.description}
                        </p>
                      )}
                    </div>
                  ) : null}

                  {/* "Ödeme Bilgisi Talep Et" Info Block */}
                  <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-black text-amber-900 text-xs block">
                        💳 Ödeme Bilgisi Talep Et
                      </span>
                      <p className="text-[11px] text-amber-800/90 mt-0.5">
                        Siparişinizi tamamladıktan sonra veya doğrudan danışmanımızdan güncel IBAN & ödeme bilgisi talep edebilirsiniz.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(currentModel.name)}%20modeli%20i%C3%A7in%20%C3%B6deme%20bilgisi%20talep%20ediyorum`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3.5 py-2 rounded-xl transition whitespace-nowrap shadow-sm"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Bilgi Talep Et</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1">
                    * Açıklama kısmına adınızı ve telefon numaranızı yazınız.
                  </p>
                </div>
              </div>

              {/* Total & Submit Button ("Siparişi Tamamla") */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">TOPLAM TUTAR</span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {finalPrice.toLocaleString('tr-TR')},00 TL
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-md active:scale-98"
                >
                  Siparişi Tamamla
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

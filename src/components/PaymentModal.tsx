'use client';

import React, { useState } from 'react';
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
  const { models, createOrder } = useData();

  const [selectedModelId, setSelectedModelId] = useState<string>(
    preselectedModel ? preselectedModel.id : models[0]?.id || 'vsm'
  );
  const [paymentMethod, setPaymentMethod] = useState<'havale' | 'kart' | 'fast'>('havale');
  
  // Form fields
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState('İstanbul');
  const [address, setAddress] = useState('');
  const [receiptNote, setReceiptNote] = useState('');

  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentModel = models.find((m) => m.id === selectedModelId) || preselectedModel || models[0];
  const finalPrice = currentModel ? currentModel.price : 24990;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Lütfen tüm zorunlu alanları doldurunuz.');
      return;
    }

    const order = createOrder({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim() || (user?.email || 'musteri@volta.com.tr'),
      modelId: currentModel.id,
      modelName: `Volta ${currentModel.name}`,
      amount: finalPrice,
      paymentMethod,
      city,
      address: address.trim(),
      receiptNote: receiptNote.trim(),
    });

    setCompletedOrderNumber(order.orderNumber);
  };

  const handleResetAndClose = () => {
    setCompletedOrderNumber(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#14212d] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
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

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {completedOrderNumber ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto font-black shadow-md">
                ✓
              </div>
              <h4 className="text-xl font-black text-slate-900">Rezervasyonunuz Alındı!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Talebiniz başarıyla kaydedildi. Sipariş numaranız ve ayrıntılarınız müşteri panelinize aktarılmıştır.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-xs mx-auto">
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Sipariş Takip Numarası</span>
                <span className="font-mono text-lg font-black text-slate-900">{completedOrderNumber}</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/905000000000?text=Merhaba,%20${encodeURIComponent(completedOrderNumber)}%20numaral%C4%B1%20rezervasyonum%20hakk%C4%B1nda%20dekont%20payla%C5%9Fmak%20istiyorum`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp ile Dekont Bildir</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition"
                >
                  Tamamla ve Kapat
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Select Model */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  1. Seçilen Model & Satış Fiyatı
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

              {/* Step 2: Payment Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  2. Ödeme Yöntemi
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'havale', label: 'Banka Havalesi / EFT', desc: 'Resmi Şirket Hesabı' },
                    { id: 'fast', label: 'FAST Anında Transfer', desc: '7/24 Kesintisiz' },
                    { id: 'kart', label: 'Kredi Kartı / Rezervasyon', desc: 'Taksit & Güvence' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-2xl border text-left transition ${
                        paymentMethod === pm.id
                          ? 'border-red-600 bg-red-50/50 shadow-sm ring-2 ring-red-100'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block">{pm.label}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">{pm.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Bank Account Info Box */}
                {(paymentMethod === 'havale' || paymentMethod === 'fast') && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Banka:</span>
                      <span className="font-bold text-slate-900">Ziraat Bankası / Türkiye İş Bankası</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Alıcı Unvanı:</span>
                      <span className="font-bold text-slate-900">Volta Motor San. ve Tic. A.Ş.</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">IBAN:</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">
                        TR84 0001 0090 1234 5678 9012 34
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      * Açıklama kısmına adınızı ve telefon numaranızı yazınız.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 3: Customer Details */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  3. Teslimat & İletişim Bilgileri
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Ad Soyad *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ahmet Yılmaz"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Telefon Numarası *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">E-Posta Adresi</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ahmet@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Teslimat İli *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="İstanbul, Ankara, İzmir..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Teslimat Adresi *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Mahalle, cadde, sokak, bina ve daire numarası..."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Ödeme Notu / Dekont Numarası (Opsiyonel)</label>
                  <input
                    type="text"
                    value={receiptNote}
                    onChange={(e) => setReceiptNote(e.target.value)}
                    placeholder="örn: Garanti FAST 124567 nolu transfer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-red-600 outline-none"
                  />
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Toplam Tutar</span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {finalPrice.toLocaleString('tr-TR')},00 TL
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md active:scale-98"
                >
                  Rezervasyonu Onayla
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

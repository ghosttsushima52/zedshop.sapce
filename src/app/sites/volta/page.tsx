'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getVoltaModels, VoltaModel } from '@/content/volta';
import { PaymentFlow } from '@/features/payment/PaymentFlow';
import { useAuth } from '@/features/auth/AuthContext';

type InfoModalType = 
  | 'kurumsal' 
  | 'garanti' 
  | 'kampanyalar' 
  | 'bayiler' 
  | 'servisler' 
  | 'yedekparca' 
  | 'iletisim' 
  | 'gizlilik' 
  | 'kullanim' 
  | 'kvkk' 
  | 'mesafeli' 
  | null;

// Reusable Minimal WhatsApp Icon Component
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.821 2.791.821 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.807-5.767-5.807zm3.398 8.163c-.144.405-.837.774-1.17.824-.312.045-.634.076-1.782-.401-1.393-.578-2.316-1.996-2.386-2.09-.07-.094-.567-.756-.567-1.442 0-.686.357-1.023.484-1.164.127-.141.278-.176.371-.176.094 0 .188.001.27.006.088.004.206-.034.322.247.12.289.412 1.009.447 1.082.035.073.059.158.01.256-.048.098-.073.159-.145.244-.073.085-.154.19-.22.256-.073.073-.15.153-.064.3.086.147.383.633.821 1.023.564.502 1.04.657 1.188.73.148.073.235.061.322-.039.088-.099.373-.434.472-.584.099-.15.198-.125.33-.075.132.05 838.414 1.004.496.166.082.278.125.318.191.041.066.041.385-.103.79z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.176L2 22l4.981-1.398C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.273c-1.636 0-3.16-.492-4.44-1.336l-.318-.207-2.955.827.842-2.885-.227-.333C3.993 14.978 3.5 13.535 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.273-8.5 8.273z" />
  </svg>
);

export default function VoltaMotorPage() {
  const [models, setModels] = useState<VoltaModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [activeCheckoutModel, setActiveCheckoutModel] = useState<VoltaModel | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<VoltaModel | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeInfoModal, setActiveInfoModal] = useState<InfoModalType>(null);
  const [kurumsalTab, setKurumsalTab] = useState<'hakkimizda' | 'misyon' | 'kalite' | 'surdurulebilirlik'>('hakkimizda');

  const { user, logout } = useAuth();

  useEffect(() => {
    setModels(getVoltaModels());

    const handleStorage = () => {
      setModels(getVoltaModels());
    };

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('volta_prices_channel');
      bc.onmessage = () => {
        setModels(getVoltaModels());
      };
    } catch {
      // ignore
    }

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      if (bc) bc.close();
    };
  }, []);

  // Update selectedProductDetail if models change in real-time from admin
  useEffect(() => {
    if (selectedProductDetail) {
      const updated = models.find(m => m.id === selectedProductDetail.id);
      if (updated) {
        setSelectedProductDetail(updated);
      }
    }
  }, [models, selectedProductDetail]);

  const featuredModels = models.filter((m) => m.isFeaturedCampaign);
  const categories = ['Tümü', 'Elektrikli Motosiklet', 'Elektrikli Bisiklet', 'Elektrikli Moped', 'Elektrikli Üç Tekerlekli'];
  
  const filteredCatalog = selectedCategory === 'Tümü' 
    ? models 
    : models.filter(m => m.category === selectedCategory);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const startCheckout = (model: VoltaModel) => {
    setActiveCheckoutModel(model);
    setIsCheckoutOpen(true);
  };

  const openProductDetail = (model: VoltaModel) => {
    setSelectedProductDetail(model);
    setActiveGalleryIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDirectPayment = () => {
    setIsMobileMenuOpen(false);
    setIsPaymentModalOpen(true);
  };

  const openInfoModal = (type: InfoModalType) => {
    setIsMobileMenuOpen(false);
    setActiveInfoModal(type);
  };

  // ================= RENDER TRUE FULL-SCREEN PRODUCT DETAIL VIEW =================
  if (selectedProductDetail) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-red-600 selection:text-white pb-24 sm:pb-16">
        {/* Sticky Top Header on Full-Screen Detail Page */}
        <header className="sticky top-0 z-40 bg-[#14212d] text-white border-b border-slate-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <button
              onClick={() => setSelectedProductDetail(null)}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-slate-700/80 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Kataloğa Dön</span>
            </button>

            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/volta-service-logo.png" 
                alt="Volta Dönüşüm Servisi" 
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-xl drop-shadow-md"
              />
              <div className="hidden md:flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">VOLTA</span>
                <span className="text-[9px] font-bold tracking-[0.16em] text-emerald-400 uppercase">DÖNÜŞÜM SERVİSİ</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(selectedProductDetail.name)}%20modeli%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition shadow-sm active:scale-95"
                title="WhatsApp Destek"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => startCheckout(selectedProductDetail)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition flex items-center gap-1.5 active:scale-95"
              >
                <span>Sipariş Ver</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <button
                onClick={() => setSelectedProductDetail(null)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-semibold transition border border-slate-700/80"
                title="Ana Sayfaya Dön"
              >
                ✕
              </button>
            </div>
          </div>
        </header>

        {/* Main Full-Screen Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <button onClick={() => setSelectedProductDetail(null)} className="hover:text-slate-900 transition">Ana Sayfa</button>
            <span>/</span>
            <button onClick={() => setSelectedProductDetail(null)} className="hover:text-slate-900 transition">Modeller</button>
            <span>/</span>
            <span className="text-slate-700">{selectedProductDetail.category}</span>
            <span>/</span>
            <span className="text-red-600 font-bold">Volta {selectedProductDetail.name}</span>
          </div>

          {/* Product Hero 2-Column Showroom Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
            {/* Left Column: Giant Multi-Angle Photo Gallery */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-100 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[480px]">
                {/* Badges Over Image */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100/95 border border-slate-200 px-3 py-1 rounded-lg backdrop-blur-sm">
                    {selectedProductDetail.category}
                  </span>
                  {selectedProductDetail.discountRate ? (
                    <span className="text-xs font-bold text-white bg-red-600 px-3 py-1 rounded-lg shadow-sm">
                      %{selectedProductDetail.discountRate} İndirim
                    </span>
                  ) : null}
                  {selectedProductDetail.advantageAmount ? (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg">
                      {selectedProductDetail.advantageAmount.toLocaleString('tr-TR')} TL Avantaj
                    </span>
                  ) : null}
                </div>

                <div className="absolute top-5 right-5 text-xs text-slate-400 font-bold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                  Açı {activeGalleryIndex + 1} / {(selectedProductDetail.images?.length || 1)}
                </div>

                {/* Main High-Resolution Photo */}
                <div className="w-full h-72 sm:h-96 flex items-center justify-center p-4 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={selectedProductDetail.images?.[activeGalleryIndex] || selectedProductDetail.image} 
                    alt={selectedProductDetail.name} 
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                </div>
              </div>

              {/* Gallery Thumbnails List (Multiple Real Angles) */}
              {selectedProductDetail.images && selectedProductDetail.images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none">
                  {selectedProductDetail.images.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 p-2 bg-white shrink-0 transition shadow-sm ${
                        activeGalleryIndex === idx 
                          ? 'border-red-600 shadow-md ring-2 ring-red-100 scale-105' 
                          : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgSrc} alt={`Görsel ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Commercial & Purchase Box */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Stokta Mevcut • Hızlı Sevkiyat</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Volta {selectedProductDetail.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  {selectedProductDetail.tagline}
                </p>

                {/* Pricing Banner */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-md my-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Doğrudan Fabrika & Satış Fiyatı</span>
                  <div className="flex items-baseline gap-3 mt-1.5 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                      {selectedProductDetail.price.toLocaleString('tr-TR')},00 <span className="text-lg font-bold text-slate-500">TL</span>
                    </span>
                    {selectedProductDetail.oldPrice ? (
                      <span className="text-base text-slate-400 line-through font-semibold font-mono">
                        {selectedProductDetail.oldPrice.toLocaleString('tr-TR')} TL
                      </span>
                    ) : null}
                  </div>

                  {selectedProductDetail.advantageAmount ? (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Toplam Tasarruf:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                        {selectedProductDetail.advantageAmount.toLocaleString('tr-TR')} TL Doğrudan Avantaj
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Quick Highlight Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <span className="text-[10px] text-slate-400 block font-medium">Motor</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold mt-0.5 block">{selectedProductDetail.specs.engine.split(' ')[0]}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <span className="text-[10px] text-slate-400 block font-medium">Menzil</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold mt-0.5 block">{selectedProductDetail.specs.range.split(' ')[0]}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <span className="text-[10px] text-slate-400 block font-medium">Azami Hız</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold mt-0.5 block">{selectedProductDetail.specs.speed.split(' ')[0]}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <span className="text-[10px] text-slate-400 block font-medium">Akü / Batarya</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold mt-0.5 block">{selectedProductDetail.specs.battery.split(' ')[0]}</strong>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>Öne Çıkan Standart Donanımlar</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {selectedProductDetail.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => startCheckout(selectedProductDetail)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm sm:text-base flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Online Sipariş Ver & Rezervasyon Yap</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <a
                  href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(selectedProductDetail.name)}%20modeli%20hakk%C4%B1nda%20teknik%20bilgi%20ve%20stok%20durumu%20almak%20istiyorum`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-2xl transition text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp Satış Danışmanı ile Görüş</span>
                </a>
              </div>
            </div>
          </div>

          {/* Full-Screen Detailed Technical Specs Grid */}
          {selectedProductDetail.detailedSpecs && selectedProductDetail.detailedSpecs.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Kapsamlı Teknik Özellikler Tablosu
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Volta {selectedProductDetail.name} modeline ait resmi fabrika verileri ve mühendislik parametreleri
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  TSE & CE Onaylı
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                {selectedProductDetail.detailedSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 transition">
                    <span className="text-slate-500 font-semibold">{spec.label}:</span>
                    <strong className="text-slate-900 text-right font-bold max-w-[60%]">{spec.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guarantees Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                🛡
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">2 Yıl Resmi Garanti</h4>
                <p className="text-xs text-slate-500 mt-0.5">Fabrika garantisi ve 10 yıl parça temin güvencesi</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">100 km &apos;de 4 TL</h4>
                <p className="text-xs text-slate-500 mt-0.5">Standart ev prizinden ultra ekonomik şarj imkanı</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
                🚚
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Ücretsiz Sevkiyat</h4>
                <p className="text-xs text-slate-500 mt-0.5">Adresinize veya en yakın bayiye montajı yapılmış teslimat</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">
                🔧
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">81 İlde Servis</h4>
                <p className="text-xs text-slate-500 mt-0.5">500+ TSE onaylı yetkili servis ve mobil destek ağı</p>
              </div>
            </div>
          </div>

          {/* Other Models Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-6">Diğer Elektrikli Modelleri Keşfedin</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {models.filter(m => m.id !== selectedProductDetail.id).map(m => (
                <div
                  key={m.id}
                  onClick={() => openProductDetail(m)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-full h-32 bg-slate-50 rounded-xl flex items-center justify-center p-2 mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.image} alt={m.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[10px] font-bold text-red-600 uppercase">{m.category}</span>
                    <h4 className="font-black text-slate-900 text-base">{m.name}</h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-sm">{m.price.toLocaleString('tr-TR')} TL</span>
                    <span className="text-xs text-red-600 font-semibold group-hover:underline">İncele →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Floating WhatsApp Action Button (FAB) on Detail Page */}
        <div className="fixed bottom-20 sm:bottom-6 right-5 sm:right-6 z-40">
          <a 
            href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(selectedProductDetail.name)}%20modeli%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold text-xs sm:text-sm active:scale-95"
            title="WhatsApp ile İletişime Geçin"
          >
            <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>WhatsApp Danışmanı</span>
          </a>
        </div>

        {/* Sticky Mobile Bottom Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
          <div>
            <span className="text-[10px] text-slate-500 font-medium block leading-none">{selectedProductDetail.name}</span>
            <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
              {selectedProductDetail.price.toLocaleString('tr-TR')} TL
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(selectedProductDetail.name)}%20modeli%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition"
              title="WhatsApp Danışmanı"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <button
              onClick={() => startCheckout(selectedProductDetail)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
            >
              <span>Sipariş Ver</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Checkout Modal when clicked on full-screen detail view */}
        {isCheckoutOpen && activeCheckoutModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative border border-slate-200">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition font-bold"
              >
                ✕
              </button>

              <div className="mb-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 border border-slate-100 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeCheckoutModel.image} alt={activeCheckoutModel.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-xs font-bold text-red-600 uppercase">{activeCheckoutModel.category}</span>
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">{activeCheckoutModel.name}</h3>
                  <p className="text-sm sm:text-base font-black text-slate-800 leading-none mt-0.5">
                    {activeCheckoutModel.price.toLocaleString('tr-TR')},00 TL
                  </p>
                </div>
              </div>

              <PaymentFlow 
                targetSite="Volta Motor" 
                productTitle={`Volta ${activeCheckoutModel.name} - ${activeCheckoutModel.category}`}
                initialAmount={`${activeCheckoutModel.price.toLocaleString('tr-TR')} TL`}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= MAIN HOME / CATALOG PAGE =================
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* Official Volta Motor Navy Header */}
      <header className="sticky top-0 z-40 bg-[#14212d] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Volta Dönüşüm Servisi Logo */}
          <Link href="/sites/volta" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/volta-service-logo.png" 
              alt="Volta Dönüşüm Servisi" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl drop-shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">VOLTA</span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-emerald-400 uppercase">DÖNÜŞÜM SERVİSİ</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-200">
            <button onClick={() => openInfoModal('kurumsal')} className="hover:text-emerald-400 transition-colors">
              Kurumsal
            </button>
            <a href="#modeller" className="hover:text-emerald-400 transition-colors">
              Modeller
            </a>
            <button onClick={() => openInfoModal('garanti')} className="hover:text-emerald-400 transition-colors">
              Garanti
            </button>
            <button onClick={() => openInfoModal('kampanyalar')} className="hover:text-emerald-400 transition-colors">
              Kampanyalar
            </button>
            <button onClick={() => openInfoModal('bayiler')} className="hover:text-emerald-400 transition-colors">
              Bayiler
            </button>
            <button onClick={() => openInfoModal('servisler')} className="hover:text-emerald-400 transition-colors">
              Servisler
            </button>
            <button onClick={() => openInfoModal('yedekparca')} className="hover:text-emerald-400 transition-colors">
              Yedek Parça
            </button>
            <button onClick={() => openInfoModal('iletisim')} className="hover:text-emerald-400 transition-colors">
              İletişim
            </button>
          </nav>

          {/* Top Right: Direct Pay & 3-Line Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition shadow-sm active:scale-95"
              title="WhatsApp Danışmanı"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={openDirectPayment}
              className="hidden sm:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
            >
              <span>Ödeme Yap</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition border border-slate-700/80 active:scale-95"
              aria-label="Menü"
            >
              {isMobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="12" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer Menu (3 Çizgi Menüsü) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 border-l border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Menu Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/volta-service-logo.png" 
                    alt="Volta Dönüşüm Servisi" 
                    className="w-10 h-10 object-contain rounded-lg shadow-sm"
                  />
                  <div>
                    <span className="font-black text-slate-900 text-lg leading-none block">VOLTA</span>
                    <span className="text-[9px] font-bold text-emerald-600 tracking-wider">DÖNÜŞÜM SERVİSİ</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition"
                >
                  ✕
                </button>
              </div>

              {/* Action Button: Ödeme Yap & WhatsApp */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <button
                  onClick={openDirectPayment}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-3 rounded-xl shadow-sm hover:shadow transition-all text-xs flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  <span>Ödeme Yap</span>
                </button>
                <a
                  href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-3 rounded-xl transition text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Menu Navigation Links */}
              <nav className="flex flex-col gap-1">
                <button
                  onClick={() => openInfoModal('kurumsal')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>KURUMSAL</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <a
                  href="#modeller"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>MODELLER</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>

                <button
                  onClick={() => openInfoModal('garanti')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>GARANTİ</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <button
                  onClick={() => openInfoModal('kampanyalar')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>KAMPANYALAR</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <button
                  onClick={() => openInfoModal('bayiler')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>BAYİLER</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <button
                  onClick={() => openInfoModal('servisler')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span>SERVİSLER</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <button
                  onClick={() => openInfoModal('yedekparca')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span>YEDEK PARÇA</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <button
                  onClick={() => openInfoModal('iletisim')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>İLETİŞİM</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="pt-4 border-t border-slate-100">
              {user && (
                <div className="bg-slate-50 p-3 rounded-xl mb-3 border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">Giriş Yapıldı:</span>
                    <span className="font-mono font-bold text-slate-800">{user.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 bg-slate-900 text-white text-xs font-semibold py-2 rounded-lg text-center hover:bg-slate-800 transition"
                    >
                      Yönetim Paneli
                    </Link>
                    <button
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 transition"
                    >
                      Çıkış
                    </button>
                  </div>
                </div>
              )}

              <a
                href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Danışma Hattı</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Featured Vehicle Showcase Section (Clean Luxury Grid - Directly Under Navbar) */}
      <section id="featured" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {featuredModels.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-md shadow-slate-100 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-300 relative group"
            >
              {item.advantageAmount ? (
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-red-600 text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {item.advantageAmount.toLocaleString('tr-TR')} TL Avantaj
                </div>
              ) : null}

              <div>
                <div className="mb-3 cursor-pointer" onClick={() => openProductDetail(item)}>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md inline-block">
                      {item.category}
                    </span>
                    {item.discountRate ? (
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        %{item.discountRate} İndirim
                      </span>
                    ) : null}
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mt-2 leading-snug tracking-tight hover:text-red-600 transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Product Visual Container (Clickable -> Opens Full-Screen Detail View) */}
                <div 
                  onClick={() => openProductDetail(item)}
                  className="relative w-full h-48 sm:h-60 my-4 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-4 border border-slate-100 group-hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
                  title="Detaylı İncele ve Fotoğraflara Bak (Tam Ekran)"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <span>Tam Ekran İncele</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-4 text-center cursor-pointer" onClick={() => openProductDetail(item)}>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-medium">Motor</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">{item.specs.engine.split(' ')[0]}</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-medium">Menzil</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">{item.specs.range.split(' ')[0]}</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-medium">Hız</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">{item.specs.speed.split(' ')[0]}</div>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-1.5 text-xs text-slate-600 mb-5">
                  {item.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Action Section */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    {item.oldPrice ? (
                      <div className="text-xs text-slate-400 line-through font-semibold mb-0.5">
                        {item.oldPrice.toLocaleString('tr-TR')},00 TL
                      </div>
                    ) : null}
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                      {item.price.toLocaleString('tr-TR')},00 <span className="text-sm font-bold text-slate-500">TL</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => startCheckout(item)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-3 sm:px-4 rounded-xl shadow-sm hover:shadow transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <span>Sipariş Ver</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <button
                    onClick={() => openProductDetail(item)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-3 sm:px-4 rounded-xl transition text-xs sm:text-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Detayları İncele</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Catalog Section (100% Electric - No Petrol) */}
      <section id="modeller" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>%100 ELEKTRİKLİ MOBİLİTE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-snug tracking-tight">
              Tüm Volta Elektrikli Modelleri
            </h2>
            <p className="text-slate-600 text-xs sm:text-base mt-1.5 leading-relaxed max-w-2xl">
              Benzin masrafına, egzoz dumanına ve bakım derdine son veren yeni nesil elektrikli araçlar.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCatalog.map((model) => (
            <div 
              key={model.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-3">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-semibold">{model.category}</span>
                  <div className="flex items-center gap-1">
                    {model.discountRate ? (
                      <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">%{model.discountRate} İndirim</span>
                    ) : null}
                    {model.advantageAmount ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">{model.advantageAmount.toLocaleString('tr-TR')} TL Avantaj</span>
                    ) : null}
                  </div>
                </div>

                <div 
                  onClick={() => openProductDetail(model)}
                  className="w-full h-44 bg-slate-50 rounded-xl flex items-center justify-center p-3 mb-4 cursor-pointer hover:bg-slate-100/80 transition-colors relative"
                  title="Detaylı İncele ve Fotoğraflara Bak (Tam Ekran)"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-slate-900/75 text-white text-[10px] font-semibold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    Tam Ekran İncele
                  </div>
                </div>

                <h3 
                  onClick={() => openProductDetail(model)}
                  className="text-lg sm:text-xl font-black text-slate-900 leading-snug cursor-pointer hover:text-red-600 transition-colors"
                >
                  {model.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{model.tagline}</p>

                {/* Specs List */}
                <div 
                  onClick={() => openProductDetail(model)}
                  className="grid grid-cols-2 gap-2 mt-4 text-xs cursor-pointer"
                >
                  <div className="bg-slate-50 p-2 rounded-lg text-slate-700">
                    <span className="text-slate-400 block text-[10px]">Motor Gücü</span>
                    <strong className="text-slate-900">{model.specs.engine}</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg text-slate-700">
                    <span className="text-slate-400 block text-[10px]">Menzil</span>
                    <strong className="text-slate-900">{model.specs.range}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {model.oldPrice ? (
                    <div className="text-xs text-slate-400 line-through font-semibold">
                      {model.oldPrice.toLocaleString('tr-TR')},00 TL
                    </div>
                  ) : null}
                  <div className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                    {model.price.toLocaleString('tr-TR')},00 <span className="text-xs font-bold text-slate-500">TL</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openProductDetail(model)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2 px-3 rounded-xl transition"
                    title="Detay & Özellikler"
                  >
                    Detay
                  </button>
                  <button
                    onClick={() => startCheckout(model)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-2 px-3.5 sm:px-4 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Sipariş</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits / Mobility Guarantee Section */}
      <section id="avantajlar" className="bg-white py-12 sm:py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">Neden Elektrikli Volta?</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Sıfır fosil yakıt, minimum işletme maliyeti ve sessiz konforlu sürüş deneyimi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="16" height="12" rx="2" />
                  <path d="M22 11v4" />
                  <path d="M10 11l-2 3h4l-2 3" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">Ev Prizinden Kolay Şarj</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Özel şarj istasyonuna gerek duymadan standart 220V ev prizinizden taşınabilir bataryanızı güvenle doldurun.
              </p>
            </div>

            <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">100 Kilometrede Sadece 4 TL</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Benzinli araçlara göre %90 daha düşük enerji maliyetiyle bütçenizi koruyun, çevreci sürüşün keyfini yaşayın.
              </p>
            </div>

            <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">2 Yıl Garanti & Yaygın Servis</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Türkiye genelinde yüzlerce yetkili servis noktası ve orijinal yedek parça desteği ile her zaman yanınızdayız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Live Dynamic Payment Section */}
      <section id="odeme" className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full inline-block">
            GÜVENLİ SİPARİŞ & TAHSİLAT
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mt-2.5 leading-snug tracking-tight">
            Online Rezervasyon ve Banka Tahsilat Merkezi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl mx-auto leading-relaxed">
            Banka Havalesi ve FAST transferi ile siparişinizi oluşturabilir, adınıza özel tahsis edilen işlem sürenizle dekontunuzu yükleyebilirsiniz.
          </p>
        </div>

        <PaymentFlow 
          targetSite="Volta Motor" 
          productTitle="Volta Elektrikli Araç Rezervasyonu"
          initialAmount={activeCheckoutModel ? `${activeCheckoutModel.price.toLocaleString('tr-TR')} TL` : '24.990 TL'}
        />
      </section>

      {/* ================= MODAL: DIRECT PAYMENT MODAL ================= */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition font-bold"
            >
              ✕
            </button>

            <div className="mb-6 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/volta-service-logo.png" 
                alt="Volta Dönüşüm Servisi" 
                className="w-12 h-12 object-contain rounded-xl shadow-sm"
              />
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">VOLTA DÖNÜŞÜM SERVİSİ</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">Online Rezervasyon & Ödeme</h3>
              </div>
            </div>

            <PaymentFlow 
              targetSite="Volta Motor" 
              productTitle="Volta Elektrikli Araç Ödeme / Rezervasyon"
              initialAmount="24.990 TL"
            />
          </div>
        </div>
      )}

      {/* ================= MODAL: CHECKOUT MODAL ================= */}
      {isCheckoutOpen && activeCheckoutModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition font-bold"
            >
              ✕
            </button>

            <div className="mb-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 border border-slate-100 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeCheckoutModel.image} alt={activeCheckoutModel.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase">{activeCheckoutModel.category}</span>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">{activeCheckoutModel.name}</h3>
                <p className="text-sm sm:text-base font-black text-slate-800 leading-none mt-0.5">
                  {activeCheckoutModel.price.toLocaleString('tr-TR')},00 TL
                </p>
              </div>
            </div>

            <PaymentFlow 
              targetSite="Volta Motor" 
              productTitle={`Volta ${activeCheckoutModel.name} - ${activeCheckoutModel.category}`}
              initialAmount={`${activeCheckoutModel.price.toLocaleString('tr-TR')} TL`}
            />
          </div>
        </div>
      )}

      {/* ================= MODAL: CORPORATE / INFO MODALS ================= */}
      {activeInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setActiveInfoModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition font-bold text-sm"
            >
              ✕
            </button>

            {/* Modal Content Switcher */}
            {activeInfoModal === 'kurumsal' && (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/volta-service-logo.png" alt="Volta" className="w-10 h-10 object-contain rounded-lg" />
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase">KURUMSAL</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Volta Motor & Dönüşüm Servisi</h3>
                  </div>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
                  {[
                    { id: 'hakkimizda', label: 'Hakkımızda' },
                    { id: 'misyon', label: 'Misyon & Vizyon' },
                    { id: 'kalite', label: 'Kalite Politikası' },
                    { id: 'surdurulebilirlik', label: 'Sürdürülebilirlik' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setKurumsalTab(tab.id as any)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                        kurumsalTab === tab.id 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {kurumsalTab === 'hakkimizda' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <p>
                      Volta Motor, Türkiye’nin en büyük elektrikli araç ve hafif mobilite üreticilerinden biri olarak kurulduğu günden bu yana sürdürülebilir, çevreci ve yüksek teknolojili ulaşım çözümleri sunmaktadır.
                    </p>
                    <p>
                      Modern entegre tesislerimizde üretilen elektrikli motosiklet, elektrikli bisiklet ve hafif ticari araçlarımız; üstün mühendislik kalitesi, düşük enerji tüketimi ve yaygın servis ağı ile milyonlarca kullanıcının tercihi haline gelmiştir.
                    </p>
                    <div className="grid grid-cols-3 gap-3 pt-3">
                      <div className="bg-slate-50 p-3 rounded-xl text-center">
                        <span className="text-lg font-black text-slate-900 block">500.000+</span>
                        <span className="text-[11px] text-slate-500">Mutlu Kullanıcı</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl text-center">
                        <span className="text-lg font-black text-slate-900 block">81 İl</span>
                        <span className="text-[11px] text-slate-500">Yaygın Servis Ağı</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl text-center">
                        <span className="text-lg font-black text-slate-900 block">%100</span>
                        <span className="text-[11px] text-slate-500">Elektrikli Mobilite</span>
                      </div>
                    </div>
                  </div>
                )}

                {kurumsalTab === 'misyon' && (
                  <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <strong className="text-slate-900 block text-sm mb-1">Misyonumuz</strong>
                      <p>
                        Gelişmiş elektrikli tahrik teknolojilerini herkes için erişilebilir, güvenli ve ekonomik hale getirerek şehir içi ulaşımda çevre dostu dönüşüme öncülük etmek.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <strong className="text-slate-900 block text-sm mb-1">Vizyonumuz</strong>
                      <p>
                        Türkiye’de ve uluslararası pazarda hafif elektrikli araç segmentinde lider marka olarak, sıfır emisyonlu sürdürülebilir bir geleceğin mimarı olmak.
                      </p>
                    </div>
                  </div>
                )}

                {kurumsalTab === 'kalite' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <p>
                      Üretim bandımızdan çıkan her Volta aracı, uluslararası TSE, CE ve ISO 9001 kalite standartlarına uygun olarak zorlu güvenlik, batarya dayanıklılık ve fren testlerinden geçirilir.
                    </p>
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        <span>Sertifikalı lityum ve derin döngülü jel batarya teknolojisi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        <span>Korozyona dayanıklı hafif alüminyum şasi mimarisi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        <span>2 Yıl Resmi Garanti ve 10 Yıl Parça Bulundurma Taahhüdü</span>
                      </li>
                    </ul>
                  </div>
                )}

                {kurumsalTab === 'surdurulebilirlik' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <p>
                      Volta Motor olarak fosil yakıtlara olan bağımlılığı ortadan kaldırmayı, şehirlerimizdeki karbon salınımını ve gürültü kirliliğini sıfıra indirmeyi hedefliyoruz.
                    </p>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-emerald-900 text-xs">
                      ⚡ <strong>Çevreci Tasarruf:</strong> Yılda ortalama 10.000 km yol yapan bir Volta kullanıcısı, atmosferi 1.2 ton karbon gazından korur ve %90 yakıt tasarrufu sağlar.
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeInfoModal === 'garanti' && (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    🛡
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase">GÜVENCE & DESTEK</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">2 Yıl Resmi Garanti Hizmeti</h3>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    Tüm Volta Motor elektrikli araçları, fatura tarihinden itibaren <strong>2 Yıl Resmi Fabrika Garantisi</strong> altındadır.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <strong className="text-slate-900 block mb-1">Kapsam</strong>
                      <p className="text-xs">Motor, beyin (controller), şasi, gösterge ve elektronik bileşenler tam garanti kapsamındadır.</p>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <strong className="text-slate-900 block mb-1">Batarya Güvencesi</strong>
                      <p className="text-xs">Lityum ve Jel aküler üretim ve fabrikasyon hatalarına karşı koruma altındadır.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <strong className="text-slate-900 block text-xs mb-1">Periyodik Bakım ve Servis</strong>
                    <p className="text-xs">
                      İlk 500 km ve sonrasındaki her 2.500 km periyodik bakım yetkili servislerimizde uzman teknisyenlerce gerçekleştirilmektedir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeInfoModal === 'kampanyalar' && (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    🏷
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase">FIRSATLAR & AVANTAJLAR</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Güncel Kampanyalar</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-2xl">
                    <div className="flex items-center justify-between font-bold text-red-700 text-sm mb-1">
                      <span>Elektrikli Mobilite Dönüşüm İndirimi</span>
                      <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">Aktif</span>
                    </div>
                    <p className="text-slate-700 text-xs">
                      Tüm modellerde nakit ve banka havalesine özel <strong>5.000 TL&apos;ye varan doğrudan indirim avantajı</strong> sunulmaktadır.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                    <div className="flex items-center justify-between font-bold text-slate-900 text-sm mb-1">
                      <span>Ücretsiz Fabrika Sevkiyatı & Kurulum</span>
                      <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded">Ücretsiz</span>
                    </div>
                    <p className="text-slate-600 text-xs">
                      Siparişiniz doğrudan adresinize veya en yakın yetkili servis noktasına ücretsiz olarak sevk edilir ve ilk sürüşe hazır teslim edilir.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                    <div className="flex items-center justify-between font-bold text-slate-900 text-sm mb-1">
                      <span>Kask ve Güvenlik Kilidi Hediyesi</span>
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">Hediye</span>
                    </div>
                    <p className="text-slate-600 text-xs">
                      Seçili elektrikli bisiklet ve moped alımlarında TSE onaylı güvenlik kaskı ve çelik kilit hediye edilmektedir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeInfoModal === 'bayiler' && (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    🏢
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase">SATIŞ NOKTALARI</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Yetkili Bayi Ağı</h3>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    Türkiye&apos;nin 81 ilinde 400&apos;ün üzerinde yetkili satış noktamız ile size en yakın Volta showroom&apos;unda test sürüşü yapabilir, modellerimizi yerinde inceleyebilirsiniz.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm">Test Sürüşü & Rezervasyon</div>
                    <p className="text-xs">
                      İnternet sitemiz üzerinden sipariş oluşturduğunuzda ürününüz bölgenizdeki yetkili bayimiz tarafından sıfır kilometre ve plakaya hazır şekilde teslim edilir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeInfoModal === 'servisler' && (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                    🔧
                  </div>
                  <div>
                    <span className="text-xs font-bold text-teal-600 uppercase">SATIŞ SONRASI HİZMETLER</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Yetkili Servis Ağı</h3>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    500&apos;ü aşkın TSE belgeli yetkili servis istasyonumuzla periyodik bakım, onarım, akü değişimi ve yazılım güncellemelerinde kesintisiz destek sağlıyoruz.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <strong className="text-slate-900 block mb-1">Mobil Servis</strong>
                      <span>Gerektiğinde yerinde arıza tespit ve servis desteği</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <strong className="text-slate-900 block mb-1">Orijinal Parça</strong>
                      <span>%100 orijinal ve sertifikalı fabrika yedek parçaları</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeInfoModal === 'yedekparca' && (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    ⚙
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">ORİJİNAL DONANIM</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Yedek Parça & Aksesuar</h3>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    Volta elektrikli araçlarınız için ihtiyaç duyduğunuz tüm akü blokları, şarj adaptörleri, lastik, fren balataları ve gövde aksesuarları doğrudan fabrikadan temin edilmektedir.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <strong className="text-slate-900 block text-xs mb-1">Hızlı Kargo Garantisi</strong>
                    <p className="text-xs">
                      Tüm standart sarf malzemeleri ve yedek parçalar 24 saat içerisinde yetkili servislerimize kargolanmaktadır.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeInfoModal === 'iletisim' && (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                    📞
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase">MÜŞTERİ HİZMETLERİ</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">İletişim & Fabrika Bilgileri</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Çağrı Merkezi & Danışma Hattı</span>
                      <strong className="text-slate-900 text-sm">0850 305 85 82</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a href="tel:08503058582" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition">
                        Ara
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">E-Posta İletişim</span>
                    <strong className="text-slate-900">info@volta.com.tr • destek@volta.com.tr</strong>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Fabrika & Üretim Tesisi</span>
                    <strong className="text-slate-900">Gümüşova Organize Sanayi Bölgesi, Düzce / TÜRKİYE</strong>
                  </div>
                </div>
              </div>
            )}

            {(activeInfoModal === 'gizlilik' || activeInfoModal === 'kullanim' || activeInfoModal === 'kvkk' || activeInfoModal === 'mesafeli') && (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                    ⚖
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">HUKUKİ BİLGİLENDİRME</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {activeInfoModal === 'gizlilik' && 'Gizlilik Politikası'}
                      {activeInfoModal === 'kullanim' && 'Kullanım Koşulları'}
                      {activeInfoModal === 'kvkk' && 'KVKK Aydınlatma Metni'}
                      {activeInfoModal === 'mesafeli' && 'Mesafeli Satış Sözleşmesi'}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
                  <p>
                    Volta Motor & Dönüşüm Servisi Sanayi ve Ticaret A.Ş. olarak müşterilerimizin kişisel verilerinin güvenliğine ve gizliliğine en üst düzeyde önem vermekteyiz.
                  </p>
                  <p>
                    6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, sipariş ve rezervasyon işlemleriniz esnasında paylaştığınız bilgiler yalnızca siparişin oluşturulması, banka havalesi teyidi, teslimat ve garanti süreçlerinin işletilmesi amacıyla işlenmektedir.
                  </p>
                  <p>
                    Banka ödeme işlemlerinde kullanıcı güvenliği için SSL 256-bit şifreleme protokolü ve tekil işlem süreleri uygulanmaktadır.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a 
          href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold text-xs sm:text-sm active:scale-95"
          title="WhatsApp ile İletişime Geçin"
        >
          <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>WhatsApp Danışmanı</span>
        </a>
      </div>

      {/* Official Footer */}
      <footer className="bg-[#14212d] text-slate-400 py-10 sm:py-12 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/volta-service-logo.png" 
                alt="Volta Dönüşüm Servisi" 
                className="w-10 h-10 object-contain rounded-lg"
              />
              <span className="text-lg font-black text-white">VOLTA</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 font-semibold">VOLTA DÖNÜŞÜM & GARANTİ SERVİSİ</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300">
              <button onClick={() => openInfoModal('kurumsal')} className="hover:text-white transition">Kurumsal</button>
              <a href="#modeller" className="hover:text-white transition">Modeller</a>
              <button onClick={() => openInfoModal('garanti')} className="hover:text-white transition">Garanti</button>
              <button onClick={() => openInfoModal('kampanyalar')} className="hover:text-white transition">Kampanyalar</button>
              <button onClick={() => openInfoModal('bayiler')} className="hover:text-white transition">Bayiler & Servisler</button>
              <button onClick={() => openInfoModal('iletisim')} className="hover:text-white transition">İletişim</button>
              <button onClick={openDirectPayment} className="hover:text-emerald-400 text-emerald-400 font-semibold transition">Ödeme Bildirimi</button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>© 2026 Volta Motor & Dönüşüm Servisi Sanayi ve Ticaret A.Ş. Tüm hakları saklıdır.</div>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => openInfoModal('gizlilik')} className="hover:text-slate-300 transition">Gizlilik Politikası</button>
              <button onClick={() => openInfoModal('kullanim')} className="hover:text-slate-300 transition">Kullanım Koşulları</button>
              <button onClick={() => openInfoModal('kvkk')} className="hover:text-slate-300 transition">KVKK Aydınlatma Metni</button>
              <button onClick={() => openInfoModal('mesafeli')} className="hover:text-slate-300 transition">Mesafeli Satış Sözleşmesi</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

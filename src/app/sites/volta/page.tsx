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
  const [selectedRegion, setSelectedRegion] = useState<string>('Tümü');

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
    setActiveInfoModal(null);
    setIsPaymentModalOpen(false);
    setSelectedProductDetail(model);
    setActiveGalleryIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDirectPayment = () => {
    setIsMobileMenuOpen(false);
    setSelectedProductDetail(null);
    setActiveInfoModal(null);
    setIsPaymentModalOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openInfoModal = (type: InfoModalType) => {
    setIsMobileMenuOpen(false);
    setSelectedProductDetail(null);
    setIsPaymentModalOpen(false);
    setActiveInfoModal(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAllSubPages = () => {
    setSelectedProductDetail(null);
    setActiveInfoModal(null);
    setIsPaymentModalOpen(false);
    setIsCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================= RENDER TRUE FULL-SCREEN PRODUCT DETAIL VIEW =================
  if (selectedProductDetail) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-red-600 selection:text-white pb-24 sm:pb-16">
        {/* Sticky Top Header on Full-Screen Detail Page */}
        <header className="sticky top-0 z-40 bg-[#14212d] text-white border-b border-slate-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <button
              onClick={closeAllSubPages}
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
                onClick={closeAllSubPages}
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
            <button onClick={closeAllSubPages} className="hover:text-slate-900 transition">Ana Sayfa</button>
            <span>/</span>
            <button onClick={closeAllSubPages} className="hover:text-slate-900 transition">Modeller</button>
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

                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Volta {selectedProductDetail.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  {selectedProductDetail.tagline}
                </p>

                {/* Price Display Card */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm my-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Resmi Satış Fiyatı</span>
                    {selectedProductDetail.oldPrice ? (
                      <span className="text-sm text-slate-400 line-through font-semibold">
                        {selectedProductDetail.oldPrice.toLocaleString('tr-TR')},00 TL
                      </span>
                    ) : null}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {selectedProductDetail.price.toLocaleString('tr-TR')},00 <span className="text-lg font-bold text-slate-500">TL</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓ KDV Dahil</span> • Adrese Teslimat & Anahtar Teslim Montaj
                  </p>
                </div>

                {/* Core Performance Metric Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Motor Gücü</span>
                    <strong className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">{selectedProductDetail.specs.engine}</strong>
                  </div>
                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Menzil Kapasitesi</span>
                    <strong className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">{selectedProductDetail.specs.range}</strong>
                  </div>
                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Maksimum Hız</span>
                    <strong className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">{selectedProductDetail.specs.speed}</strong>
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Öne Çıkan Donanımlar</h4>
                  <ul className="space-y-2">
                    {selectedProductDetail.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => startCheckout(selectedProductDetail)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 sm:py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Hemen Sipariş Ver & Rezervasyon Yap</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <a
                  href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(selectedProductDetail.name)}%20modeli%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 sm:py-3.5 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>WhatsApp Satış Danışmanı ile Görüş</span>
                </a>
              </div>
            </div>
          </div>

          {/* Full Technical Specifications Table */}
          {selectedProductDetail.detailedSpecs && selectedProductDetail.detailedSpecs.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Detaylı Teknik Özellikler</h3>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-12">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-start gap-3.5 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">2 Yıl Resmi Garanti</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">Fabrika garantisi ve 10 yıl parça temin güvencesi</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-start gap-3.5 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">100 km &apos;de 4 TL</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">Standart ev prizinden ultra ekonomik şarj imkanı</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-start gap-3.5 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Ücretsiz Sevkiyat</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">Adresinize veya en yakın bayiye montajı yapılmış teslimat</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-start gap-3.5 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">81 İlde Servis</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">500+ TSE onaylı yetkili servis ve mobil destek ağı</p>
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

  // ================= RENDER TRUE FULL-SCREEN DIRECT PAYMENT PORTAL =================
  if (isPaymentModalOpen) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-red-600 selection:text-white pb-24 sm:pb-16">
        <header className="sticky top-0 z-40 bg-[#14212d] text-white border-b border-slate-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <button
              onClick={closeAllSubPages}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-slate-700/80 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Ana Sayfaya Dön</span>
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
                href="https://wa.me/905000000000?text=Merhaba,%20%C3%B6deme%20ve%20rezervasyon%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition shadow-sm active:scale-95"
                title="WhatsApp Destek"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={closeAllSubPages}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-semibold transition border border-slate-700/80"
                title="Kapat"
              >
                ✕
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <button onClick={closeAllSubPages} className="hover:text-slate-900 transition">Ana Sayfa</button>
            <span>/</span>
            <span className="text-red-600 font-bold">Online Ödeme & Rezervasyon Portalı</span>
          </div>

          <div className="text-center mb-8">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full inline-block">
              GÜVENLİ BANKA TAHSİLAT MERKEZİ
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-2.5 leading-snug">
              Online Rezervasyon ve Ödeme Bildirimi
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl mx-auto leading-relaxed">
              Banka Havalesi ve FAST transferi ile araç rezervasyonunuzu anında başlatabilir, dekontunuzu yükleyerek onay sürecini takip edebilirsiniz.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <PaymentFlow 
              targetSite="Volta Motor" 
              productTitle="Volta Elektrikli Araç Rezervasyonu"
              initialAmount="24.990 TL"
            />
          </div>
        </main>

        <div className="fixed bottom-6 right-6 z-40">
          <a 
            href="https://wa.me/905000000000?text=Merhaba,%20%C3%B6deme%20hakk%C4%B1nda%20dan%C4%B1%C5%9Fmak%20istiyorum"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold text-xs sm:text-sm active:scale-95"
            title="WhatsApp ile İletişime Geçin"
          >
            <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>WhatsApp Danışmanı</span>
          </a>
        </div>
      </div>
    );
  }

  // ================= RENDER TRUE FULL-SCREEN CORPORATE & INFO PAGES =================
  if (activeInfoModal) {
    const getModalTitle = () => {
      switch (activeInfoModal) {
        case 'kurumsal': return 'Kurumsal';
        case 'garanti': return '2 Yıl Resmi Garanti';
        case 'kampanyalar': return 'Güncel Kampanyalar';
        case 'bayiler': return 'Yetkili Bayi Ağı';
        case 'servisler': return 'Yetkili Servis Ağı';
        case 'yedekparca': return 'Yedek Parça & Donanım';
        case 'iletisim': return 'Müşteri Hizmetleri & İletişim';
        case 'gizlilik': return 'Gizlilik Politikası';
        case 'kullanim': return 'Kullanım Koşulları';
        case 'kvkk': return 'KVKK Aydınlatma Metni';
        case 'mesafeli': return 'Mesafeli Satış Sözleşmesi';
        default: return 'Bilgilendirme';
      }
    };

    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-red-600 selection:text-white pb-24 sm:pb-16">
        <header className="sticky top-0 z-40 bg-[#14212d] text-white border-b border-slate-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <button
              onClick={closeAllSubPages}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-slate-700/80 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Ana Sayfaya Dön</span>
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
                href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition shadow-sm active:scale-95"
                title="WhatsApp Destek"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={openDirectPayment}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition flex items-center gap-1.5 active:scale-95"
              >
                <span>Ödeme Yap</span>
              </button>

              <button
                onClick={closeAllSubPages}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-semibold transition border border-slate-700/80"
                title="Kapat"
              >
                ✕
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <button onClick={closeAllSubPages} className="hover:text-slate-900 transition">Ana Sayfa</button>
            <span>/</span>
            <span className="text-red-600 font-bold">{getModalTitle()}</span>
          </div>

          {/* ================= KURUMSAL VIEW ================= */}
          {activeInfoModal === 'kurumsal' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/volta-service-logo.png" alt="Volta" className="w-14 h-14 object-contain rounded-2xl drop-shadow" />
                    <div>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">KURUMSAL PROFİL</span>
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Volta Motor & Dönüşüm Servisi</h1>
                    </div>
                  </div>

                  {/* Subtabs */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
                    {[
                      { id: 'hakkimizda', label: 'Hakkımızda' },
                      { id: 'misyon', label: 'Misyon & Vizyon' },
                      { id: 'kalite', label: 'Kalite Politikası' },
                      { id: 'surdurulebilirlik', label: 'Sürdürülebilirlik' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setKurumsalTab(tab.id as any)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                          kurumsalTab === tab.id 
                            ? 'bg-white text-slate-900 shadow-sm' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  {kurumsalTab === 'hakkimizda' && (
                    <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                      <p className="text-base text-slate-800 font-medium leading-relaxed">
                        Volta Motor, Türkiye’nin en büyük elektrikli araç ve hafif mobilite üreticilerinden biri olarak kurulduğu günden bu yana sürdürülebilir, çevreci ve yüksek teknolojili ulaşım çözümleri sunmaktadır.
                      </p>
                      <p>
                        Modern entegre tesislerimizde üretilen elektrikli motosiklet, elektrikli bisiklet ve hafif ticari araçlarımız; üstün mühendislik kalitesi, düşük enerji tüketimi ve 81 ildeki yaygın servis ağı ile yüz binlerce kullanıcının güvenilir tercihi haline gelmiştir.
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">500.000+</span>
                          <span className="text-xs text-slate-500 font-semibold mt-1 block">Mutlu Kullanıcı</span>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">81 İl</span>
                          <span className="text-xs text-slate-500 font-semibold mt-1 block">Yetkili Servis Ağı</span>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">%100</span>
                          <span className="text-xs text-slate-500 font-semibold mt-1 block">Elektrikli Mobilite</span>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">50.000 m²</span>
                          <span className="text-xs text-slate-500 font-semibold mt-1 block">Entegre Üretim Tesisi</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {kurumsalTab === 'misyon' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold mb-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 14 14" />
                          </svg>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-2">Misyonumuz</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Gelişmiş elektrikli tahrik teknolojilerini herkes için erişilebilir, güvenli ve ekonomik hale getirerek şehir içi ulaşımda çevre dostu dönüşüme öncülük etmek.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold mb-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-2">Vizyonumuz</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Türkiye’de ve uluslararası pazarda hafif elektrikli araç segmentinde lider marka olarak, sıfır emisyonlu sürdürülebilir bir geleceğin mimarı olmak.
                        </p>
                      </div>
                    </div>
                  )}

                  {kurumsalTab === 'kalite' && (
                    <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                      <p>
                        Üretim bandımızdan çıkan her Volta aracı, uluslararası TSE, CE ve ISO 9001 kalite standartlarına uygun olarak zorlu güvenlik, batarya dayanıklılık ve fren testlerinden geçirilir.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <h4 className="font-bold text-slate-900 text-sm mb-1">Batarya Güvenliği</h4>
                          <p className="text-xs text-slate-500">Sertifikalı lityum ve derin döngülü jel batarya teknolojisi</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <h4 className="font-bold text-slate-900 text-sm mb-1">Şasi Dayanımı</h4>
                          <p className="text-xs text-slate-500">Korozyona dayanıklı hafif alüminyum ve çelik şasi mimarisi</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <h4 className="font-bold text-slate-900 text-sm mb-1">Resmi Garanti</h4>
                          <p className="text-xs text-slate-500">2 Yıl Resmi Garanti ve 10 Yıl Parça Bulundurma Taahhüdü</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {kurumsalTab === 'surdurulebilirlik' && (
                    <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                      <p>
                        Volta Motor olarak fosil yakıtlara olan bağımlılığı ortadan kaldırmayı, şehirlerimizdeki karbon salınımını ve gürültü kirliliğini sıfıra indirmeyi hedefliyoruz.
                      </p>
                      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-emerald-950">
                        <h4 className="font-bold text-base mb-1 text-emerald-900">Çevreci Tasarruf</h4>
                        <p className="text-xs sm:text-sm">
                          Yılda ortalama 10.000 km yol yapan bir Volta kullanıcısı, atmosferi 1.2 ton karbon gazından korur ve standart içten yanmalı motorlara kıyasla %90 enerji tasarrufu sağlar.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= GARANTI VIEW ================= */}
          {activeInfoModal === 'garanti' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">RESMİ GÜVENCE STANDARTLARI</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Volta 2 Yıl Resmi Fabrika Garantisi</h1>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">Garanti Kapsamı</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Motor, dijital beyin (ECU/controller), şasi, LCD gösterge paneli ve tüm elektronik aksamlar fatura tarihinden itibaren 2 yıl boyunca tam fabrika garantisi kapsamındadır.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">Batarya & Güç Güvencesi</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Orijinal Lityum-İyon ve Derin Döngülü Jel bataryalar fabrikasyon ve üretim kusurlarına karşı resmi koruma altındadır.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">Periyodik Bakım Programı</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      İlk 500 km rodaj/güvenlik kontrolü ve ardından her 2.500 km periyodik servis bakımı yetkili istasyonlarımızda hızlıca gerçekleştirilir.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">10 Yıl Yedek Parça Temini</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Sanayi ve Teknoloji Bakanlığı mevzuatına uygun olarak tüm modellerimizde 10 yıl boyunca kesintisiz orijinal parça tedarik garantisi sunulmaktadır.
                    </p>
                  </div>
                </div>

                {/* Maintenance Table */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
                  <div className="bg-slate-100 p-4 font-bold text-slate-900 text-xs sm:text-sm">
                    Periyodik Bakım ve Kontrol Tablosu
                  </div>
                  <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                    <div className="p-3.5 flex items-center justify-between bg-white">
                      <span className="font-bold text-slate-800">500 km</span>
                      <span className="text-slate-600">İlk Güvenlik, Fren & Cıvata Tork Kontrolü</span>
                      <span className="text-emerald-600 font-bold">Ücretsiz Kontrol</span>
                    </div>
                    <div className="p-3.5 flex items-center justify-between bg-slate-50/50">
                      <span className="font-bold text-slate-800">2.500 km</span>
                      <span className="text-slate-600">Batarya Sağlık Testi, Lastik Basınç & Fren Balata Ayarı</span>
                      <span className="text-slate-700 font-medium">Standart Bakım</span>
                    </div>
                    <div className="p-3.5 flex items-center justify-between bg-white">
                      <span className="font-bold text-slate-800">5.000 km</span>
                      <span className="text-slate-600">Elektrik Tesisatı, Süspansiyon & Rulman Denetimi</span>
                      <span className="text-slate-700 font-medium">Kapsamlı Bakım</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= KAMPANYALAR VIEW ================= */}
          {activeInfoModal === 'kampanyalar' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">GÜNCEL FIRSATLAR</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Volta Elektrikli Mobilite Kampanyaları</h1>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">Aktif Fırsat</span>
                      <h3 className="text-xl font-black text-slate-900 mt-3 mb-2">Elektrikli Dönüşüm & Nakit Avantajı</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        Banka havalesi ve FAST ile peşin alımlarda tüm elektrikli motosiklet ve mopedlerde <strong>5.000 TL&apos;ye varan doğrudan indirim</strong> fırsatı!
                      </p>
                    </div>
                    <button onClick={closeAllSubPages} className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5">
                      <span>Modelleri İncele</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">81 İl Geçerli</span>
                      <h3 className="text-xl font-black text-slate-900 mt-3 mb-2">Ücretsiz Adrese Teslimat & Montaj</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        Siparişiniz doğrudan fabrikanın özel lojistik araçlarıyla adresinize sevk edilir. Yetkili servis tarafından akü montajı tamamlanmış ve ilk sürüşe hazır teslim edilir.
                      </p>
                    </div>
                    <button onClick={closeAllSubPages} className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5">
                      <span>Hemen Sipariş Ver</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="bg-blue-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">Hediye Paketi</span>
                      <h3 className="text-xl font-black text-slate-900 mt-3 mb-2">Kask & Güvenlik Kilidi Hediyesi</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        Seçili elektrikli bisiklet ve moped alımlarında TSE onaylı aerodinamik sürüş kaskı ve çelik spiral güvenlik kilidi kutu içeriğinde ücretsiz gönderilmektedir.
                      </p>
                    </div>
                    <button onClick={closeAllSubPages} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5">
                      <span>Detaylı Bilgi</span>
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="bg-slate-700 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">Eski / Yeni Takas</span>
                      <h3 className="text-xl font-black text-slate-900 mt-3 mb-2">Eski Benzinli Aracını Getir, Volta&apos;ya Geç</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        Eski benzinli scooter veya motosikletinizi bayilerimize getirerek ek takas indiriminden yararlanabilir, benzin masraflarına hemen son verebilirsiniz.
                      </p>
                    </div>
                    <a 
                      href="https://wa.me/905000000000?text=Merhaba,%20takas%20kampanyas%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp ile Teklif Al</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= BAYİLER VIEW ================= */}
          {activeInfoModal === 'bayiler' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SATIŞ VE SHOWROOM AĞI</span>
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-900">81 İlde Yetkili Bayilerimiz</h1>
                    </div>
                  </div>

                  {/* Region Filter */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
                    {['Tümü', 'Marmara', 'Ege', 'İç Anadolu', 'Akdeniz', 'Karadeniz'].map((reg) => (
                      <button
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                          selectedRegion === reg ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { city: 'İstanbul / Anadolu', name: 'Volta Kadıköy Plaza', address: 'Bağdat Caddesi No: 142, Kadıköy', phone: '0216 414 00 12', region: 'Marmara' },
                    { city: 'İstanbul / Avrupa', name: 'Volta Maslak Showroom', address: 'Büyükdere Cad. No: 88, Maslak', phone: '0212 285 00 24', region: 'Marmara' },
                    { city: 'Ankara', name: 'Volta Çankaya Merkez', address: 'Turan Güneş Bulvarı No: 54, Çankaya', phone: '0312 440 00 36', region: 'İç Anadolu' },
                    { city: 'İzmir', name: 'Volta Alsancak Showroom', address: 'Şair Eşref Bulvarı No: 32, Alsancak', phone: '0232 464 00 48', region: 'Ege' },
                    { city: 'Bursa', name: 'Volta Nilüfer Plaza', address: 'FSM Bulvarı No: 19, Nilüfer', phone: '0224 245 00 60', region: 'Marmara' },
                    { city: 'Antalya', name: 'Volta Muratpaşa Showroom', address: 'Metin Kasapoğlu Cad. No: 77, Muratpaşa', phone: '0242 316 00 72', region: 'Akdeniz' },
                    { city: 'Kocaeli', name: 'Volta İzmit Merkez', address: 'D-100 Karayolu Üzeri No: 112, İzmit', phone: '0262 331 00 84', region: 'Marmara' },
                    { city: 'Düzce', name: 'Volta Fabrika Satış Mağazası', address: 'Gümüşova OSB 1. Cadde No: 5, Düzce', phone: '0380 731 00 96', region: 'Karadeniz' },
                    { city: 'Adana', name: 'Volta Seyhan Showroom', address: 'Ziyapaşa Bulvarı No: 41, Seyhan', phone: '0322 458 00 10', region: 'Akdeniz' },
                  ].filter(b => selectedRegion === 'Tümü' || b.region === selectedRegion).map((b, idx) => (
                    <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                          {b.city}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-2">{b.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{b.address}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-slate-700">{b.phone}</span>
                        <a 
                          href={`https://wa.me/905000000000?text=Merhaba,%20${encodeURIComponent(b.name)}%20i%C3%A7in%20test%20s%C3%BCr%C3%BC%C5%9F%C3%BC%20randevusu%20almak%20istiyorum`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-600 font-bold hover:underline"
                        >
                          Randevu Al →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= SERVİSLER VIEW ================= */}
          {activeInfoModal === 'servisler' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SATIŞ SONRASI HİZMETLER</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">500+ TSE Belgeli Yetkili Servis Ağı</h1>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Periyodik Bakım</h4>
                    <p className="text-xs text-slate-500">TSE standartlarında uzman teknisyenlerle hızlı servis</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Batarya Sağlık Testi</h4>
                    <p className="text-xs text-slate-500">Bilgisayarlı hücre ve kapasite analiz cihazları</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Orijinal Parça</h4>
                    <p className="text-xs text-slate-500">%100 fabrika barkodlu garantili yedek parça</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Mobil Servis</h4>
                    <p className="text-xs text-slate-500">Acil durumlarda yerinde arıza tespit ve onarım desteği</p>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold">Servis Randevusu ve Danışma Hattı</h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">Türkiye genelindeki tüm yetkili servis randevularınız için tek numara.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="tel:08503058582" className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition">
                      0850 305 85 82
                    </a>
                    <a 
                      href="https://wa.me/905000000000?text=Merhaba,%20servis%20randevusu%20almak%20istiyorum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp Servis</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= YEDEK PARÇA VIEW ================= */}
          {activeInfoModal === 'yedekparca' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ORİJİNAL DONANIM & AKSESUAR</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Volta Orijinal Yedek Parça Merkezi</h1>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Batarya & Akü Paketleri</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Lityum-İyon ve Jel batarya modülleri, BMS kontrol üniteleri.</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Akıllı Şarj Adaptörleri</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Otomatik akım kesmeli, aşırı gerilim korumalı hızlı şarj cihazları.</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Fren & Balata Donanımları</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Hidrolik disk frenler, kaliperler, kampana ve balata setleri.</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Lastik & Jant Grubu</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Tubeless patlamaya dirençli lastikler ve alaşımlı jantlar.</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Motor Beyni (ECU)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Orijinal fabrikasyon yazılımlı fırçasız motor kontrol beyinleri.</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Aydınlatma & Göstergeler</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">LED farlar, sinyaller, dijital renkli LCD gösterge panelleri.</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Doğrudan Fabrikadan Orijinal Parça Siparişi</h4>
                    <p className="text-xs text-slate-500">Parça numarası ve model bilginizle WhatsApp üzerinden sipariş verebilirsiniz.</p>
                  </div>
                  <a 
                    href="https://wa.me/905000000000?text=Merhaba,%20orijinal%20yedek%20par%C3%A7a%20sipari%C5%9Fi%20vermek%20istiyorum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp Parça Siparişi</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ================= İLETİŞİM VIEW ================= */}
          {activeInfoModal === 'iletisim' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">MÜŞTERİ HİZMETLERİ & FABRİKA</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">İletişim ve Destek Merkezi</h1>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Çağrı Merkezi & Danışma Hattı</span>
                      <h3 className="text-2xl font-black text-slate-900 mt-1 mb-2">0850 305 85 82</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Hafta içi 08:30 - 18:00, Cumartesi 09:00 - 14:00 saatleri arasında kesintisiz danışmanlık desteği.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2">
                      <a href="tel:08503058582" className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-2 px-4 rounded-xl transition">
                        Hemen Ara
                      </a>
                      <a 
                        href="https://wa.me/905000000000?text=Merhaba,%20bilgi%20almak%20istiyorum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-4 rounded-xl transition flex items-center gap-1.5"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp Destek</span>
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">E-Posta İletişim</span>
                      <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">info@volta.com.tr</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Kurumsal talepleriniz, bayi başvuruları ve servis bildirimleriniz için e-posta adresimizden bize 7/24 ulaşabilirsiniz.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <span className="text-xs font-semibold text-slate-700">Teknik Destek: destek@volta.com.tr</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fabrika & Üretim Kampüsü</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-1">Volta Motor Sanayi ve Ticaret A.Ş.</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Gümüşova Organize Sanayi Bölgesi 1. Cadde No: 5, Gümüşova / DÜZCE - TÜRKİYE
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= HUKUKİ VIEW ================= */}
          {(activeInfoModal === 'gizlilik' || activeInfoModal === 'kullanim' || activeInfoModal === 'kvkk' || activeInfoModal === 'mesafeli') && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">HUKUKİ VE YASAL BİLGİLENDİRME</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{getModalTitle()}</h1>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  <p>
                    Volta Motor & Dönüşüm Servisi Sanayi ve Ticaret A.Ş. olarak müşterilerimizin kişisel verilerinin korunması, gizliliği ve güvenliği temel önceliğimizdir.
                  </p>
                  <p>
                    6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuat uyarınca; sitemiz üzerinden yapılan online sipariş, rezervasyon, teknik servis ve ödeme bildirim süreçlerinde paylaşılan ad, soyad, telefon, adres ve ödeme teyit dekontu bilgileri yalnızca yasal yükümlülüklerin yerine getirilmesi, araç tescil işlemleri, garanti başlatılması ve faturalandırma amacıyla işlenmektedir.
                  </p>
                  <p>
                    Banka ödeme işlemlerinde kullanıcı güvenliği için SSL 256-bit uçtan uca şifreleme protokolü ve tekil işlem süreleri uygulanmaktadır. Bilgileriniz hiçbir koşulda üçüncü şahıslarla paylaşılmaz ve ticari amaçla satılmaz.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4 text-slate-700">
                    <strong>Resmi İletişim:</strong> KVKK kapsamındaki haklarınız ve bilgi talepleriniz için <span className="font-mono text-slate-900">kvkk@volta.com.tr</span> adresine yazılı olarak başvurabilirsiniz.
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

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

          {/* Desktop Navigation - Clean Unified Styles */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-200">
            <button 
              onClick={() => openInfoModal('kurumsal')} 
              className="bg-transparent border-0 outline-none p-0 appearance-none text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer font-bold tracking-wider text-xs sm:text-sm uppercase"
            >
              Kurumsal
            </button>
            <a 
              href="#modeller" 
              className="bg-transparent border-0 outline-none p-0 text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer font-bold tracking-wider text-xs sm:text-sm uppercase"
            >
              Modeller
            </a>
            <button 
              onClick={() => openInfoModal('garanti')} 
              className="bg-transparent border-0 outline-none p-0 appearance-none text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer font-bold tracking-wider text-xs sm:text-sm uppercase"
            >
              Garanti
            </button>
            <button 
              onClick={() => openInfoModal('kampanyalar')} 
              className="bg-transparent border-0 outline-none p-0 appearance-none text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer font-bold tracking-wider text-xs sm:text-sm uppercase"
            >
              Kampanyalar
            </button>
            <button 
              onClick={() => openInfoModal('bayiler')} 
              className="bg-transparent border-0 outline-none p-0 appearance-none text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer font-bold tracking-wider text-xs sm:text-sm uppercase"
            >
              Bayiler
            </button>
            <button 
              onClick={() => openInfoModal('servisler')} 
              className="bg-transparent border-0 outline-none p-0 appearance-none text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer font-bold tracking-wider text-xs sm:text-sm uppercase"
            >
              Servisler
            </button>
            <button 
              onClick={() => openInfoModal('yedekparca')} 
              className="bg-transparent border-0 outline-none p-0 appearance-none text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer font-bold tracking-wider text-xs sm:text-sm uppercase"
            >
              Yedek Parça
            </button>
            <button 
              onClick={() => openInfoModal('iletisim')} 
              className="bg-transparent border-0 outline-none p-0 appearance-none text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer font-bold tracking-wider text-xs sm:text-sm uppercase"
            >
              İletişim
            </button>
          </nav>

          {/* Top Right: WhatsApp & Direct Pay & 3-Line Hamburger Menu */}
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

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300 font-medium">
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

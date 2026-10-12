'use client';

import React, { useState } from 'react';
import { VoltaModel } from '@/types';
import { WhatsAppIcon } from './Icons';

interface ProductDetailModalProps {
  model: VoltaModel | null;
  onClose: () => void;
  onStartCheckout: (model: VoltaModel) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  model,
  onClose,
  onStartCheckout,
}) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  if (!model) return null;

  const images = model.images && model.images.length > 0 ? model.images : [model.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f8fafc] text-slate-900 pb-24 sm:pb-16 animate-in fade-in duration-200">
      {/* Sticky Top Header on Full-Screen Detail View */}
      <header className="sticky top-0 z-40 bg-[#14212d] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-slate-700/80 active:scale-95 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Kataloğa Dön</span>
          </button>

          <div className="flex items-center gap-3 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/volta-service-logo.png" 
              alt="Volta Dönüşüm Servisi" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-xl drop-shadow-md"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-black text-sm sm:text-base tracking-tight uppercase leading-none">VOLTA SHOWROOM</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">RESMİ DÖNÜŞÜM SERVİSİ</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a 
              href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(model.name)}%20modeli%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 sm:py-2.5 rounded-xl transition shadow-sm active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Danışmanı</span>
            </a>
            <button
              onClick={() => onStartCheckout(model)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl transition shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <span>Sipariş Ver</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800 p-2 sm:p-2.5 rounded-xl transition"
              title="Kapat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-6 overflow-x-auto pb-1 whitespace-nowrap">
          <button onClick={onClose} className="hover:text-red-600 transition">Ana Sayfa</button>
          <span>/</span>
          <button onClick={onClose} className="hover:text-red-600 transition">Modeller</button>
          <span>/</span>
          <span className="text-slate-700">{model.category}</span>
          <span>/</span>
          <span className="text-red-600 font-bold">Volta {model.name}</span>
        </div>

        {/* 2-Column Showroom Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Left Column: Multi-Angle Photo Gallery */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-100 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[480px]">
              {/* Badges Over Image (Never collides with angle text) */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 flex flex-wrap gap-1.5 sm:gap-2 z-10 max-w-[calc(100%-80px)]">
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 bg-slate-100/95 border border-slate-200 px-2.5 sm:px-3 py-1 rounded-lg backdrop-blur-sm">
                  {model.category}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 sm:px-3 py-1 rounded-lg backdrop-blur-sm">
                  Bluetooth 5.2
                </span>
                {model.discountRate ? (
                  <span className="text-[10px] sm:text-xs font-bold text-white bg-red-600 px-2.5 sm:px-3 py-1 rounded-lg shadow-sm">
                    %{model.discountRate} İndirim
                  </span>
                ) : null}
                {model.advantageAmount ? (
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 sm:px-3 py-1 rounded-lg">
                    {model.advantageAmount.toLocaleString('tr-TR')} TL Avantaj
                  </span>
                ) : null}
              </div>

              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-[11px] sm:text-xs text-slate-400 font-bold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                Açı {activeGalleryIndex + 1} / {images.length}
              </div>

              {/* Main Photo */}
              <div className="w-full h-72 sm:h-96 flex items-center justify-center p-4 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={images[activeGalleryIndex] || model.image} 
                  alt={model.name} 
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
              </div>
            </div>

            {/* Gallery Thumbnails List */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none">
                {images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 p-1.5 transition-all bg-white shrink-0 ${
                      activeGalleryIndex === idx 
                        ? 'border-red-600 shadow-md ring-2 ring-red-100' 
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                    title={`${model.name} Açı ${idx + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {model.inStock ? 'Stokta Mevcut • Hızlı Sevkiyat' : 'Tükendi'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                Volta {model.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                {model.tagline}
              </p>

              {/* Price Display Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm my-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Resmi Satış Fiyatı</span>
                  {model.oldPrice ? (
                    <span className="text-sm text-slate-400 line-through font-semibold">
                      {model.oldPrice.toLocaleString('tr-TR')},00 TL
                    </span>
                  ) : null}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {model.price.toLocaleString('tr-TR')},00 <span className="text-lg font-bold text-slate-500">TL</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓ KDV Dahil</span> • Adrese Teslimat & Anahtar Teslim Montaj
                </p>
              </div>

              {/* Core Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Motor Gücü</span>
                  <strong className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">{model.specs.engine}</strong>
                </div>
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Menzil Kapasitesi</span>
                  <strong className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">{model.specs.range}</strong>
                </div>
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Maksimum Hız</span>
                  <strong className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">{model.specs.speed}</strong>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Öne Çıkan Donanımlar</h4>
                <ul className="space-y-2">
                  {model.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop Action Area */}
            <div className="hidden sm:flex flex-col gap-3 pt-6 border-t border-slate-200">
              <button
                onClick={() => onStartCheckout(model)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 text-base"
              >
                <span>Hemen Sipariş Ver & Rezervasyon Yap</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <a
                href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(model.name)}%20modeli%20hakk%C4%B1nda%20teknik%20bilgi%20ve%20teklif%20almak%20istiyorum`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-2xl transition flex items-center justify-center gap-2 text-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp ile Danışmanla Görüş</span>
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mt-8">
          <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">DETAYLI VERİLER</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Volta {model.name} Fabrika Teknik Özellikleri</h3>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              TSE & CE Onaylı
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-500 font-medium">Motor Gücü</span>
              <span className="font-bold text-slate-900">{model.specs.engine}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-500 font-medium">Batarya & Akü</span>
              <span className="font-bold text-slate-900">{model.specs.battery}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-500 font-medium">Menzil</span>
              <span className="font-bold text-slate-900">{model.specs.range}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-500 font-medium">Azami Hız</span>
              <span className="font-bold text-slate-900">{model.specs.speed}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-500 font-medium">Şarj Süresi</span>
              <span className="font-bold text-slate-900">{model.specs.chargeTime}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-500 font-medium">Fren Tipi</span>
              <span className="font-bold text-slate-900">{model.specs.brakes}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-500 font-medium">Ağırlık</span>
              <span className="font-bold text-slate-900">{model.specs.weight}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-500 font-medium">Taşıma Kapasitesi</span>
              <span className="font-bold text-slate-900">{model.specs.payload}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Bottom Bar (WhatsApp Icon + Sipariş Ver Button) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] text-slate-500 font-medium block leading-none">{model.name}</span>
          <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
            {model.price.toLocaleString('tr-TR')} TL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(model.name)}%20modeli%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition shadow-sm"
            title="WhatsApp Danışmanı"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <button
            onClick={() => onStartCheckout(model)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
          >
            <span>Sipariş Ver</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

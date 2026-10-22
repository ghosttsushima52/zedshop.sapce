'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { VoltaModel } from '@/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { AdminPanel } from '@/components/AdminPanel';
import { UserOrdersModal } from '@/components/UserOrdersModal';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { InfoPagesModal } from '@/components/InfoPagesModal';
import { PaymentModal } from '@/components/PaymentModal';
import { WhatsAppIcon } from '@/components/Icons';

export default function HomePage() {
  const { user, isAdmin } = useAuth();
  const { models } = useData();

  // Modals state
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [activeProductDetail, setActiveProductDetail] = useState<VoltaModel | null>(null);
  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isUserOrdersOpen, setIsUserOrdersOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [checkoutTargetModel, setCheckoutTargetModel] = useState<VoltaModel | null>(null);

  const categories = ['Tümü', 'Elektrikli Motosiklet', 'Elektrikli Bisiklet', 'Elektrikli Moped', 'Elektrikli Üç Tekerlekli'];

  const filteredCatalog = selectedCategory === 'Tümü'
    ? models
    : models.filter((m) => m.category === selectedCategory);

  const featuredModels = models.filter((m) => m.isFeaturedCampaign);

  const handleStartCheckout = (model: VoltaModel) => {
    setActiveProductDetail(null);
    setCheckoutTargetModel(model);
    setIsPaymentModalOpen(true);
  };

  const handleOpenDirectPayment = () => {
    setCheckoutTargetModel(null);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans antialiased selection:bg-red-600 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        onOpenInfo={(type) => setActiveInfoModal(type)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenOrders={() => setIsUserOrdersOpen(true)}
        onOpenPayment={handleOpenDirectPayment}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
      />

      {/* Hero Welcome Banner */}
      <section className="bg-gradient-to-b from-[#14212d] via-[#1a2b3b] to-[#14212d] text-white py-12 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>2026 Yeni Nesil Bluetooth Bağlantılı Modeller Stokta</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
                Geleceğin Şehir İçi <br className="hidden sm:block" />
                <span className="text-red-500">Elektrikli Mobilite</span> Dünyası
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Volta Motor güvencesiyle 81 ilde anahtar teslim sürüşe hazır teslimat, 2 yıl resmi fabrika garantisi ve gelişmiş Bluetooth akıllı telemetri desteği.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#models"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-lg shadow-red-900/30 active:scale-98"
                >
                  Modelleri Keşfet
                </a>
                <button
                  onClick={() => setActiveInfoModal('garanti')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition border border-slate-700 active:scale-98"
                >
                  2 Yıl Garanti Standartları
                </button>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-center">
                <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/60">
                  <span className="block text-base sm:text-lg font-black text-white">500.000+</span>
                  <span className="text-[10px] text-slate-400 font-medium">Mutlu Kullanıcı</span>
                </div>
                <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/60">
                  <span className="block text-base sm:text-lg font-black text-white">81 İl</span>
                  <span className="text-[10px] text-slate-400 font-medium">Yetkili Servis Ağı</span>
                </div>
                <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/60">
                  <span className="block text-base sm:text-lg font-black text-white">%100</span>
                  <span className="text-[10px] text-slate-400 font-medium">Yerli & Orijinal</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-tr from-slate-900 to-slate-800/80 rounded-3xl p-6 border border-slate-700/70 shadow-2xl flex flex-col items-center">
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Öne Çıkan
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/volta/vsm-sag-capraz-1_3e81a39e-8153-453e-aeaa-6bf7df6aef88.png"
                  alt="Volta VSM"
                  className="w-72 h-64 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
                <div className="w-full text-center mt-3 pt-3 border-t border-slate-700">
                  <h3 className="font-black text-lg text-white">Volta VSM Elektrikli Motosiklet</h3>
                  <p className="text-xs text-slate-400 mt-0.5">24.990 TL • Bluetooth 5.0 Akıllı BMS</p>
                  <button
                    onClick={() => {
                      const vsm = models.find((m) => m.id === 'vsm');
                      if (vsm) setActiveProductDetail(vsm);
                    }}
                    className="mt-3 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl transition border border-slate-600"
                  >
                    Detaylı İncele (Tam Ekran Showroom)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicle Showcase Section (Clean Luxury Grid) */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
            ÖNE ÇIKAN MODELLER
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Şehir İçi Popüler Elektrikli Araçlar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            En çok tercih edilen elektrikli motosiklet ve bisiklet modellerimizi keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {featuredModels.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-md shadow-slate-100 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                <div className="mb-3 cursor-pointer" onClick={() => setActiveProductDetail(item)}>
                  {/* Clean Non-Overlapping Badges (flex-wrap) */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      Bluetooth 5.2
                    </span>
                    {item.discountRate ? (
                      <span className="text-[10px] sm:text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        %{item.discountRate} İndirim
                      </span>
                    ) : null}
                    {item.advantageAmount ? (
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                        {item.advantageAmount.toLocaleString('tr-TR')} TL Avantaj
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-snug tracking-tight hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Product Visual Container (Clickable -> Opens Full-Screen Detail View) */}
                <div 
                  onClick={() => setActiveProductDetail(item)}
                  className="w-full h-56 sm:h-64 bg-slate-50 rounded-2xl flex items-center justify-center p-4 my-4 cursor-pointer hover:bg-slate-100/70 transition-colors relative"
                  title="Detaylı İncele ve Çok Açılı Fotoğraflara Bak"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    Tam Ekran İncele ›
                  </div>
                </div>

                {/* Core Specs Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-4 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Motor</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">{item.specs.engine.split(' ')[0]}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Menzil</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">{item.specs.range.split(' ')[0]}</div>
                  </div>
                  <div>
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
                    onClick={() => handleStartCheckout(item)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-3 sm:px-4 rounded-xl shadow-sm hover:shadow transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <span>Sipariş Ver</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveProductDetail(item)}
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

      {/* Full Catalog Section */}
      <section id="models" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 w-full max-w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 w-full max-w-full min-w-0">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
              VOLTA ÜRÜN GAMMI
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tüm Elektrikli Modeller
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full max-w-full min-w-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
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
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 font-medium mb-3 gap-1">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-semibold">
                    {model.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {model.discountRate ? (
                      <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">
                        %{model.discountRate} İndirim
                      </span>
                    ) : null}
                    {model.advantageAmount ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        {model.advantageAmount.toLocaleString('tr-TR')} TL Avantaj
                      </span>
                    ) : null}
                  </div>
                </div>

                <div
                  onClick={() => setActiveProductDetail(model)}
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
                    Görsellere Bak ›
                  </div>
                </div>

                <div className="cursor-pointer" onClick={() => setActiveProductDetail(model)}>
                  <h3 className="font-bold text-slate-900 text-lg hover:text-red-600 transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {model.tagline}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-1 py-3 text-center my-3 bg-slate-50/70 rounded-xl text-slate-700 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Motor</span>
                    <span className="font-semibold">{model.specs.engine.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Menzil</span>
                    <span className="font-semibold">{model.specs.range.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Hız</span>
                    <span className="font-semibold">{model.specs.speed.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    {model.oldPrice ? (
                      <span className="text-xs text-slate-400 line-through mr-1 font-semibold">
                        {model.oldPrice.toLocaleString('tr-TR')} TL
                      </span>
                    ) : null}
                    <span className="text-lg font-black text-slate-900">
                      {model.price.toLocaleString('tr-TR')} TL
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveProductDetail(model)}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold underline"
                  >
                    Detaylar
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartCheckout(model)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-xl transition text-xs shadow-sm flex items-center justify-center gap-1 active:scale-98"
                  >
                    <span>Sipariş Ver</span>
                  </button>
                  <a
                    href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(model.name)}%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition shadow-sm shrink-0"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Compact WhatsApp FAB on Mobile/Desktop */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40">
        <a 
          href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all font-semibold text-xs sm:text-sm active:scale-95 border-2 border-white/20"
          title="WhatsApp Danışmanı ile Görüşün"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span className="hidden sm:inline">WhatsApp Danışmanı</span>
        </a>
      </div>

      {/* Footer */}
      <Footer
        onOpenInfo={(type) => setActiveInfoModal(type)}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
        isAdmin={isAdmin}
      />

      {/* Modals */}
      <ProductDetailModal
        model={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        onStartCheckout={handleStartCheckout}
      />

      <InfoPagesModal
        type={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
        onOpenPayment={handleOpenDirectPayment}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setCheckoutTargetModel(null);
        }}
        preselectedModel={checkoutTargetModel}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAdminLoginSuccess={() => setIsAdminPanelOpen(true)}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

      <UserOrdersModal
        isOpen={isUserOrdersOpen}
        onClose={() => setIsUserOrdersOpen(false)}
        onStartPayment={handleOpenDirectPayment}
      />
    </div>
  );
}

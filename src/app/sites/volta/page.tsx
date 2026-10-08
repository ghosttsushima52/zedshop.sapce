'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  BatteryCharging, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  Gauge,
  SlidersHorizontal,
  Lock,
  Layers
} from 'lucide-react';
import { getVoltaModels, VoltaModel } from '@/content/volta';
import { PaymentFlow } from '@/features/payment/PaymentFlow';
import { useAuth } from '@/features/auth/AuthContext';

export default function VoltaMotorPage() {
  const [models, setModels] = useState<VoltaModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [activeCheckoutModel, setActiveCheckoutModel] = useState<VoltaModel | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { user, isMasterAdmin, isLegendClient, logout, openGate } = useAuth();

  useEffect(() => {
    // Load models
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

  const featuredModels = models.filter((m) => m.isFeaturedCampaign);
  const categories = ['Tümü', 'Elektrikli Motosiklet', 'Elektrikli Bisiklet', 'Elektrikli Moped', 'Elektrikli Üç Tekerlekli'];
  
  const filteredCatalog = selectedCategory === 'Tümü' 
    ? models 
    : models.filter(m => m.category === selectedCategory);

  const startCheckout = (model: VoltaModel) => {
    setActiveCheckoutModel(model);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-red-500 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-red-600 text-white text-xs sm:text-sm font-medium py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase">FIRSAT</span>
            <span className="truncate">Ekim Ayına Özel Elektrikli Mobilite Kampanyası Başladı!</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-red-100">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 2 Yıl Resmi Garanti</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> %100 Elektrikli Sıfır Emisyon</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Aynı Gün Kargo & Yetkili Teslimat</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/sites/volta" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                V
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">VOLTA</span>
                <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase">Elektrikli Araçlar</span>
              </div>
            </Link>
          </div>

          {/* Navigation - Note: Kampanya, Bayiler, Servisler, Yedek Parça are REMOVED as requested */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#featured" className="hover:text-red-600 transition-colors">Öne Çıkanlar</a>
            <a href="#modeller" className="hover:text-red-600 transition-colors">Tüm Modeller</a>
            <a href="#avantajlar" className="hover:text-red-600 transition-colors">Elektrikli Mobilite</a>
            <a href="#odeme" className="hover:text-red-600 transition-colors">IBAN ile Kolay Ödeme</a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{user.username}</span>
                </div>
                <Link 
                  href="/admin" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow-sm"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-red-400" />
                  <span>Admin Paneli</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-slate-500 hover:text-red-600 px-2 py-1 transition font-semibold"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <button
                onClick={openGate}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 transition"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                Giriş
              </button>
            )}

            <a 
              href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all shadow-emerald-600/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Destek</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Campaign Hero Banner - Exact visual text requirement */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/60 via-white to-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold mb-4 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2026 EKİM ÖZEL KAMPANYASI</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Ekim ayına özel avantajları kaçırmayın.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium">
              Size uygun Volta modelini şimdi keşfedin.
            </p>
          </div>

          {/* Campaign Featured Banner / Two Prominent Products (Matching User Reference Image) */}
          <div id="featured" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {featuredModels.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 flex flex-col justify-between hover:border-red-400 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 relative group"
              >
                {/* Advantage Badge */}
                {item.advantageAmount && (
                  <div className="absolute top-5 right-5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full shadow-md shadow-red-500/30">
                    {item.advantageAmount.toLocaleString('tr-TR')} TL Fiyat Avantajı
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                      {item.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Product Visual Container */}
                  <div className="relative w-full h-56 sm:h-64 my-4 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-4 border border-slate-100 group-hover:scale-[1.02] transition-transform duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Key Highlights */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-4 text-center">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[11px] text-slate-400 font-medium">Motor</div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800">{item.specs.engine.split(' ')[0]}</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[11px] text-slate-400 font-medium">Menzil</div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800">{item.specs.range.split(' ')[0]}</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[11px] text-slate-400 font-medium">Hız</div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800">{item.specs.speed.split(' ')[0]}</div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 text-xs text-slate-600 mb-6">
                    {item.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and Action Section */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      {item.oldPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">
                            {item.oldPrice.toLocaleString('tr-TR')},00 TL
                          </span>
                          {item.discountRate && (
                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                              %{item.discountRate} İndirim
                            </span>
                          )}
                        </div>
                      )}
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {item.price.toLocaleString('tr-TR')},00 <span className="text-base sm:text-lg font-bold text-slate-600">TL</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => startCheckout(item)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-600/25 transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 group/btn"
                    >
                      <span>Hemen Satın Al</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                    <a
                      href={`https://wa.me/905000000000?text=Merhaba,%20Volta%20${encodeURIComponent(item.name)}%20modeli%20hakk%C4%B1nda%20bilgi%20ve%20rezervasyon%20istiyorum`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl transition text-xs sm:text-sm flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Bilgi</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Catalog Section (100% Electric - No Petrol) */}
      <section id="modeller" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> %100 ELEKTRİKLİ MOBİLİTE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tüm Volta Elektrikli Modelleri
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
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
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
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
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-3">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-semibold">{model.category}</span>
                  {model.discountRate && (
                    <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">%{model.discountRate} İndirim</span>
                  )}
                </div>

                <div className="w-full h-44 bg-slate-50 rounded-xl flex items-center justify-center p-3 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h3 className="text-xl font-black text-slate-900">{model.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{model.tagline}</p>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
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
                  {model.oldPrice && (
                    <div className="text-xs text-slate-400 line-through font-semibold">
                      {model.oldPrice.toLocaleString('tr-TR')},00 TL
                    </div>
                  )}
                  <div className="text-xl font-black text-slate-900">
                    {model.price.toLocaleString('tr-TR')},00 <span className="text-xs font-bold text-slate-500">TL</span>
                  </div>
                </div>

                <button
                  onClick={() => startCheckout(model)}
                  className="bg-slate-900 hover:bg-red-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>Sipariş</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits / Mobility Guarantee */}
      <section id="avantajlar" className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Neden Elektrikli Volta?</h2>
            <p className="text-slate-600 text-sm mt-2">
              Sıfır fosil yakıt, minimum işletme maliyeti ve sessiz konforlu sürüş.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold mb-4">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ev Prizinden Kolay Şarj</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Özel şarj istasyonuna gerek yok! Standart 220V ev prizinizden taşınabilir bataryanızı kolayca doldurun.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100 Kilometrede Sadece 4 TL</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Benzinli araçlara göre %90 daha düşük yakıt tüketimi ile bütçenizi koruyun, tasarrufun keyfini sürün.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Güvenli IBAN & Admin Onayı</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dinamik admin onaylı ve geri sayımlı banka havale sistemimizle siparişleriniz anında işleme alınır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Live Dynamic Payment Section */}
      <section id="odeme" className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
            DİNAMİK ÖDEME MERKEZİ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Admin Onaylı & Geri Sayımlı IBAN Havale Sistemi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl mx-auto">
            Vergi No istenmez. Yalnızca Ad Soyad ve GSM bilgisi ile talebinizi iletin; admin onayından sonra 10 dakikalık geri sayım ve dekont yükleme ekranı açılır.
          </p>
        </div>

        <PaymentFlow 
          targetSite="Volta Motor" 
          productTitle="Volta Elektrikli Araç Rezervasyonu"
          initialAmount={activeCheckoutModel ? `${activeCheckoutModel.price.toLocaleString('tr-TR')} TL` : '24.990 TL'}
        />
      </section>

      {/* Modal Checkout when clicked on product */}
      {isCheckoutOpen && activeCheckoutModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition"
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
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{activeCheckoutModel.name}</h3>
                <p className="text-sm font-black text-slate-800">
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

      {/* Floating WhatsApp Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a 
          href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all group font-bold text-sm"
          title="WhatsApp ile İletişime Geçin"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="hidden sm:inline">WhatsApp Danışmanı</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-lg">
                V
              </div>
              <span className="text-lg font-black text-white">VOLTA</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Türkiye Elektrikli Mobilite Çözümleri</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-white transition">Showcase Ana Sayfa</Link>
              <Link href="/sites/legendgame" className="hover:text-white transition">LegendGame</Link>
              <Link href="/admin" className="hover:text-white transition">Admin Paneli</Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>© 2026 Volta Motor & Avenox Showcase. Tüm hakları saklıdır.</div>
            <div className="flex gap-4">
              <span>Gizlilik Politikası</span>
              <span>Kullanım Şartları</span>
              <span>Mesafeli Satış Sözleşmesi</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Gamepad2, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Star, 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Lock, 
  HelpCircle,
  ExternalLink,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import { getLegendListings, GameListing } from '@/content/legendgame';
import { PaymentFlow } from '@/features/payment/PaymentFlow';
import { useAuth } from '@/features/auth/AuthContext';

export default function LegendGamePage() {
  const [listings, setListings] = useState<GameListing[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>('Tümü');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<GameListing | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { user, isMasterAdmin, isLegendClient, openGate, logout } = useAuth();

  useEffect(() => {
    setListings(getLegendListings());
  }, []);

  const games = ['Tümü', 'Valorant', 'CS2', 'League of Legends', 'Steam', 'Brawl Stars', 'PUBG Mobile'];
  const categories = ['Tümü', 'Hesap', 'Skin & Bıçak', 'E-Pin & VP', 'Random Key', 'Elmas & UC'];

  const filteredListings = listings.filter((item) => {
    const matchesGame = selectedGame === 'Tümü' || item.game === selectedGame;
    const matchesCat = selectedCategory === 'Tümü' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.game.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGame && matchesCat && matchesSearch;
  });

  const handleBuy = (item: GameListing) => {
    setActiveItem(item);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Ticker */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-500/20 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-500/20 text-cyan-400 font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-cyan-500/30">
              GÜVENLİ TİCARET
            </span>
            <span className="text-slate-300 truncate">
              İtemsatış Güvencesiyle 7/24 Otomatik Teslimat & Admin Onaylı Havale/EFT Sistemi
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Escrow Havuz Güvencesi</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-yellow-400" /> Anında Dijital Teslimat</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-400" /> 10 Dk IBAN Rezervasyon</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#0e1424]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/sites/legendgame" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-wider text-white">LEGEND</span>
                <span className="text-2xl font-black text-cyan-400">GAME</span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Gaming Pazar Yeri & E-Pin</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text"
              placeholder="Oyun, hesap, skin veya e-pin ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>

          {/* Right Profile & Actions */}
          <div className="flex items-center gap-3">
            {isLegendClient && (
              <div className="flex items-center gap-2 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-xl text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-cyan-300 font-medium font-mono">{user?.username}</span>
              </div>
            )}

            {isMasterAdmin && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl shadow-md transition"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Admin Paneli
              </Link>
            )}

            {!user ? (
              <button
                onClick={openGate}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                Giriş Yap
              </button>
            ) : (
              <button
                onClick={logout}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 transition"
              >
                Çıkış
              </button>
            )}

            <a
              href="#odeme"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 rounded-xl shadow-lg shadow-cyan-500/25 transition active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Bakiye Yükle</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner with Esports Flair */}
      <section className="relative overflow-hidden py-12 lg:py-16 border-b border-slate-800 bg-gradient-to-b from-[#11192e] to-[#0b0f19]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-4">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>TÜRKİYE&apos;NİN EN GÜVENİLİR OYUNCU PLATFORMU</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Oyun Dünyasının <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Efsane Hesapları</span> & İndirimli E-Pinleri
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mb-6 max-w-xl leading-relaxed">
                Valorant, CS2, League of Legends hesapları, silah kaplamaları ve resmi e-pinler. Admin onaylı dinamik IBAN sistemiyle anında ödeme yapın, beklemeden teslim alın.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#ilanlar"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition text-sm flex items-center gap-2"
                >
                  <span>İlanları Keşfet</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#odeme"
                  className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-5 py-3 rounded-xl transition text-sm flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dinamik IBAN Sistemi</span>
                </a>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="text-2xl font-black text-white font-mono">15.000+</div>
                <div className="text-xs text-slate-400 mt-1">Tamamlanan Güvenli Takas</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="text-2xl font-black text-cyan-400 font-mono">%100</div>
                <div className="text-xs text-slate-400 mt-1">Garantili İlk Mail Teslimi</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="text-2xl font-black text-amber-400 font-mono">10 Dakika</div>
                <div className="text-xs text-slate-400 mt-1">Geri Sayımlı Canlı IBAN Rezervasyonu</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="text-2xl font-black text-emerald-400 font-mono">0 Vergi No</div>
                <div className="text-xs text-slate-400 mt-1">Yalnızca Ad Soyad & Telefon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Categories Section */}
      <section id="ilanlar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-4 mb-8">
          {/* Game filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-500 uppercase shrink-0 mr-1">Oyun:</span>
            {games.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGame(g)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedGame === g
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-500 uppercase shrink-0 mr-1">Kategori:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === c
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-900/60 text-slate-500 border border-slate-800/80 hover:text-slate-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Header Gradient banner representing game art */}
                <div className={`h-24 bg-gradient-to-r ${item.imageGradient} p-3 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      {item.game}
                    </span>
                    {item.badge && (
                      <span className="bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-white/90 font-bold text-xs bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded w-fit">
                    {item.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-4">
                  <h3 className="font-bold text-sm text-white line-clamp-2 min-h-[40px] group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                        {item.seller.username[0]}
                      </div>
                      <span className="truncate max-w-[90px]">{item.seller.username}</span>
                      {item.seller.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-mono font-semibold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.seller.rating}</span>
                    </div>
                  </div>

                  {/* Bullet perks */}
                  <ul className="mt-3 space-y-1 text-[11px] text-slate-400">
                    {item.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="truncate flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price and Action Footer */}
              <div className="p-4 pt-2 border-t border-slate-800/80 bg-slate-950/40">
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    {item.oldPrice && (
                      <span className="text-[11px] text-slate-500 line-through mr-1.5">
                        {item.oldPrice} TL
                      </span>
                    )}
                    <span className="text-lg font-black text-white font-mono">
                      {item.price.toLocaleString('tr-TR')} <span className="text-xs text-cyan-400">TL</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                    {item.deliveryType}
                  </span>
                </div>

                <button
                  onClick={() => handleBuy(item)}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Hemen Satın Al</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Payment Center Section */}
      <section id="odeme" className="py-16 bg-[#0e1424] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-3 py-1 rounded-full">
              DİNAMİK IBAN & DEKONT MERKEZİ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
              Admin Onaylı Canlı IBAN Ödeme Sistemi
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Vergi No talep edilmez. Yalnızca Ad Soyad ve GSM bilgisi giriniz. Yönetici panelinden onaylandığında 10 dakikalık IBAN ve dekont yükleme sayacı aktifleşir.
            </p>
          </div>

          <PaymentFlow
            targetSite="LegendGame"
            productTitle="LegendGame Bakiye / Ürün Satın Alma"
            initialAmount={activeItem ? `${activeItem.price} TL` : '1.250 TL'}
          />
        </div>
      </section>

      {/* Modal Checkout when item is clicked */}
      {isCheckoutOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0e1424] border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-white">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ✕
            </button>

            <div className="mb-6 flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${activeItem.imageGradient} flex items-center justify-center text-white shrink-0`}>
                <Gamepad2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase">{activeItem.game} • {activeItem.category}</span>
                <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-1">{activeItem.title}</h3>
                <p className="text-base font-black text-emerald-400 font-mono">
                  {activeItem.price.toLocaleString('tr-TR')} TL
                </p>
              </div>
            </div>

            <PaymentFlow
              targetSite="LegendGame"
              productTitle={`LegendGame: ${activeItem.title}`}
              initialAmount={`${activeItem.price} TL`}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#080b12] text-slate-400 py-12 text-xs border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black">
                LG
              </div>
              <span className="text-lg font-black text-white font-mono">LEGENDGAME</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">İtemsatış & Gaming Marketplace</span>
            </div>

            {isMasterAdmin && (
              <div className="flex items-center gap-6">
                <Link href="/" className="hover:text-white transition">Showcase Ana Sayfa</Link>
                <Link href="/sites/volta" className="hover:text-white transition">Volta Motor</Link>
                <Link href="/admin" className="hover:text-white transition">Admin Paneli</Link>
              </div>
            )}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-[11px]">
            <div>© 2026 LegendGame & Avenox Ecosystem.</div>
            <div className="flex gap-4">
              <span>Escrow Politikası</span>
              <span>Kullanıcı Sözleşmesi</span>
              <span>İade Şartları</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

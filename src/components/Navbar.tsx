'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { WhatsAppIcon } from './Icons';

interface NavbarProps {
  onOpenInfo: (type: string) => void;
  onOpenAuth: () => void;
  onOpenOrders: () => void;
  onOpenPayment: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInfo,
  onOpenAuth,
  onOpenOrders,
  onOpenPayment,
  onOpenAdmin,
}) => {
  const { user, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#14212d] text-white border-b border-slate-800/90 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0 active:scale-98 transition-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/volta-service-logo.png"
            alt="Volta Motor"
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-xl drop-shadow-md"
          />
          <div className="flex flex-col">
            <span className="font-black text-base sm:text-lg tracking-tight uppercase leading-none text-white">
              VOLTA
            </span>
            <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold tracking-wider uppercase mt-0.5">
              DÖNÜŞÜM SERVİSİ
            </span>
          </div>
        </Link>

        {/* Desktop Links (No wrapping, generous spacing) */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 whitespace-nowrap shrink-0">
          <a
            href="#models"
            className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            Modeller
          </a>
          <button
            onClick={() => onOpenInfo('garanti')}
            className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            2 Yıl Garanti
          </button>
          <button
            onClick={() => onOpenInfo('kampanyalar')}
            className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            Kampanyalar
          </button>
          <button
            onClick={() => onOpenInfo('bayiler')}
            className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            Bayiler
          </button>
          <button
            onClick={() => onOpenInfo('servisler')}
            className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            Servisler
          </button>
          <button
            onClick={() => onOpenInfo('yedekparca')}
            className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            Yedek Parça
          </button>
          <button
            onClick={() => onOpenInfo('kurumsal')}
            className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            Kurumsal
          </button>
          <button
            onClick={() => onOpenInfo('iletisim')}
            className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            İletişim
          </button>
        </nav>

        {/* Top Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          {/* Admin Panel Button (ONLY VISIBLE TO GGLEGEND) */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-3 py-2 rounded-xl transition shadow-md flex items-center gap-1.5 animate-pulse"
              title="Yönetim Paneline Giriş (Sadece gglegend)"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">Admin Paneli</span>
            </button>
          )}

          {/* User Status / Login Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenOrders}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition border border-slate-700 flex items-center gap-1.5"
                title="Hesap ve Siparişlerim"
              >
                <span>👤</span>
                <span className="max-w-[100px] truncate hidden sm:inline">{user.name}</span>
                <span className="sm:hidden">Profil</span>
              </button>
              <button
                onClick={logout}
                className="text-xs text-slate-400 hover:text-red-400 px-2 py-1.5 rounded-lg transition"
                title="Çıkış Yap"
              >
                Çıkış
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition border border-slate-700/80 active:scale-95 flex items-center gap-1.5"
            >
              <span>Giriş / Kayıt</span>
            </button>
          )}

          {/* WhatsApp Direct Button */}
          <a
            href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 sm:py-2.5 rounded-xl transition shadow-sm active:scale-95 shrink-0"
            title="WhatsApp Müşteri Danışmanı"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* Online Order / Rezervasyon CTA */}
          <button
            onClick={onOpenPayment}
            className="bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-sm active:scale-95 shrink-0"
          >
            <span>Ödeme Yap</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
            aria-label="Menüyü Aç"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0d161e] border-t border-slate-800 px-4 py-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {isAdmin && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">⚡ Süper Admin (gglegend)</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl"
              >
                Admin Paneli
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <a
              href="#models"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200"
            >
              🏍️ Modeller
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInfo('garanti');
              }}
              className="p-3 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200"
            >
              🛡️ 2 Yıl Garanti
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInfo('kampanyalar');
              }}
              className="p-3 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200"
            >
              🏷️ Kampanyalar
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInfo('bayiler');
              }}
              className="p-3 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200"
            >
              📍 Yetkili Bayiler
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInfo('servisler');
              }}
              className="p-3 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200"
            >
              🔧 Yetkili Servisler
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInfo('yedekparca');
              }}
              className="p-3 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200"
            >
              ⚙️ Yedek Parça
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInfo('kurumsal');
              }}
              className="p-3 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200"
            >
              🏢 Kurumsal
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInfo('iletisim');
              }}
              className="p-3 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200"
            >
              📞 İletişim & Destek
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Danışmanı ile Görüşün</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

'use client';

import React from 'react';
import { WhatsAppIcon } from './Icons';

interface FooterProps {
  onOpenInfo: (type: string) => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfo, onOpenAdmin, isAdmin }) => {
  return (
    <footer className="bg-[#14212d] text-slate-400 py-12 sm:py-16 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/volta-service-logo.png"
                alt="Volta Motor"
                className="w-10 h-10 object-contain rounded-xl"
              />
              <div>
                <span className="font-black text-white text-base tracking-tight block">VOLTA MOTOR</span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                  DÖNÜŞÜM SERVİSİ
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Türkiye&apos;nin en büyük elektrikli hafif mobilite üreticisi. 2 yıl fabrika garantisi, yaygın servis ve orijinal yedek parça güvencesi.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/905000000000?text=Merhaba,%20Volta%20modelleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3.5 py-2 rounded-xl transition text-xs shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Danışma Hattı</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Modeller & Hizmetler</h4>
            <ul className="space-y-2">
              <li>
                <a href="#models" className="hover:text-white transition">Tüm Elektrikli Araçlar</a>
              </li>
              <li>
                <button onClick={() => onOpenInfo('garanti')} className="hover:text-white transition text-left">
                  2 Yıl Resmi Garanti
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('kampanyalar')} className="hover:text-white transition text-left">
                  Aktif Kampanyalar & Fırsatlar
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('yedekparca')} className="hover:text-white transition text-left">
                  Orijinal Yedek Parça
                </button>
              </li>
            </ul>
          </div>

          {/* Network & Support */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Yetkili Ağ & Destek</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenInfo('bayiler')} className="hover:text-white transition text-left">
                  81 İl Yetkili Bayiler
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('servisler')} className="hover:text-white transition text-left">
                  500+ Yetkili Servis Ağı
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('kurumsal')} className="hover:text-white transition text-left">
                  Hakkımızda & Fabrika
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('iletisim')} className="hover:text-white transition text-left">
                  İletişim ve Müşteri Hizmetleri
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Admin */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Kurumsal & Yasal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenInfo('gizlilik')} className="hover:text-white transition text-left">
                  Gizlilik Politikası
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('kullanim')} className="hover:text-white transition text-left">
                  Kullanım Koşulları
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('kvkk')} className="hover:text-white transition text-left">
                  KVKK Aydınlatma Metni
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('mesafeli')} className="hover:text-white transition text-left">
                  Mesafeli Satış Sözleşmesi
                </button>
              </li>
              {isAdmin && (
                <li className="pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>⚡ Admin Paneli (gglegend)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Volta Motor Sanayi ve Ticaret A.Ş. Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-2">
            <span>Türkiye&apos;nin Yerli Elektrikli Mobilite Markası</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

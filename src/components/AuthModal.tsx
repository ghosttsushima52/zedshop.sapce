'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAdminLoginSuccess }) => {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!loginIdentifier.trim()) {
      setFeedback({ type: 'error', message: 'Lütfen kullanıcı adı veya e-posta girin.' });
      return;
    }

    const res = login(loginIdentifier, loginPassword);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message || 'Giriş başarılı!' });
      setTimeout(() => {
        onClose();
        if (loginIdentifier.trim().toLowerCase() === 'gglegend' && onAdminLoginSuccess) {
          onAdminLoginSuccess();
        }
      }, 700);
    } else {
      setFeedback({ type: 'error', message: res.message || 'Giriş başarısız.' });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!regUsername.trim()) {
      setFeedback({ type: 'error', message: 'Kullanıcı adı zorunludur.' });
      return;
    }

    const res = register(regName, regUsername, regEmail, regPhone, regPassword);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message || 'Kayıt başarılı!' });
      setTimeout(() => {
        onClose();
        if (regUsername.trim().toLowerCase() === 'gglegend' && onAdminLoginSuccess) {
          onAdminLoginSuccess();
        }
      }, 700);
    } else {
      setFeedback({ type: 'error', message: res.message || 'Kayıt başarısız.' });
    }
  };

  // Quick helper to fill gglegend admin credentials
  const fillAdminCredentials = () => {
    setLoginIdentifier('gglegend');
    setLoginPassword('gglegend');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="bg-[#14212d] text-white p-6 sm:p-7">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/volta-service-logo.png" alt="Volta" className="w-10 h-10 object-contain rounded-xl" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Volta Müşteri & Yönetici Paneli</h2>
              <p className="text-xs text-slate-400 mt-0.5">Sipariş takibi ve rezervasyon işlemleri</p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl mt-5">
            <button
              onClick={() => {
                setActiveTab('login');
                setFeedback(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'login' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setFeedback(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'register' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kayıt Ol
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7">
          {feedback && (
            <div
              className={`mb-4 p-3 rounded-xl text-xs font-semibold ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kullanıcı Adı veya E-Posta
                </label>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="örn: gglegend veya ahmet@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-red-600 focus:bg-white outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Şifre
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-red-600 focus:bg-white outline-none transition"
                />
              </div>

              {/* Admin One-Click Quick Fill Helper */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-amber-900 block">Yönetici Girişi (gglegend)</span>
                  <span className="text-[10px] text-amber-700">Yönetim paneline sadece gglegend yetkilidir.</span>
                </div>
                <button
                  type="button"
                  onClick={fillAdminCredentials}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-black px-2.5 py-1.5 rounded-lg transition shrink-0"
                >
                  Doldur
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition text-sm shadow-md active:scale-98"
              >
                Giriş Yap
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ahmet Yılmaz"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-medium focus:ring-2 focus:ring-red-600 focus:bg-white outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="kullaniciadi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-red-600 focus:bg-white outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-red-600 focus:bg-white outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="ahmet@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-medium focus:ring-2 focus:ring-red-600 focus:bg-white outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Şifre
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-medium focus:ring-2 focus:ring-red-600 focus:bg-white outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition text-sm shadow-md active:scale-98 mt-2"
              >
                Kayıt Ol ve Giriş Yap
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

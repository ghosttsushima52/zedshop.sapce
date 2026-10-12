'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { AdminPanel } from '@/components/AdminPanel';

export default function DedicatedAdminPage() {
  const { user, login, isAdmin } = useAuth();
  const [username, setUsername] = useState('gglegend');
  const [password, setPassword] = useState('gglegend');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() !== 'gglegend') {
      setFeedback('Bu alana sadece gglegend kullanıcı adı ile erişilebilir.');
      return;
    }
    const res = login(username, password);
    if (!res.success) {
      setFeedback(res.message || 'Giriş başarısız.');
    }
  };

  // If already logged in as gglegend, display Admin Panel view
  if (isAdmin && user?.username.toLowerCase() === 'gglegend') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <header className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between text-white">
          <Link href="/" className="text-xs text-slate-400 hover:text-white font-bold flex items-center gap-1.5">
            <span>← Vitrine / Ana Sayfaya Dön</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400">⚡ Süper Admin (gglegend) Aktif</span>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6 flex items-center justify-center">
          <AdminPanel isOpen={true} onClose={() => { window.location.href = '/'; }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d161e] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center font-black text-2xl mx-auto shadow-md mb-3">
            ⚡
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Volta Yönetici Girişi</h1>
          <p className="text-xs text-slate-500 mt-1">
            Yönetim paneline sadece <span className="font-bold text-slate-900 font-mono">gglegend</span> hesabıyla giriş yapılabilir.
          </p>
        </div>

        {feedback && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-bold rounded-xl">
            {feedback}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Yönetici Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="gglegend"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl transition text-sm shadow-md active:scale-98"
          >
            gglegend Olarak Giriş Yap
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-900 font-semibold underline">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

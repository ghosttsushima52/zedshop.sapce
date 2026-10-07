'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function AnimatedEntryGate() {
  const { user, isAuthenticated, isMasterAdmin, isGateOpen, login, logout } = useAuth();
  
  // Phase state: 'intro' (0-2s) -> 'login' -> 'granted'
  const [phase, setPhase] = useState<'intro' | 'login' | 'granted'>('intro');
  const [progress, setProgress] = useState(0);

  // Form state - ZERO HINTS
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // 0 - 2 Second Sleek Intro Animation
  useEffect(() => {
    if (!isAuthenticated) {
      document.body.style.overflow = 'hidden';
      
      const startTime = Date.now();
      const duration = 2000; // Exact 2 seconds

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
        setProgress(currentProgress);

        if (elapsed >= duration) {
          clearInterval(timer);
          setPhase('login');
        }
      }, 30);

      return () => {
        clearInterval(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Lütfen kullanıcı adı ve parolanızı eksiksiz giriniz.');
      triggerShake();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setLoading(false);

      if (res.success) {
        setPhase('granted');
        setTimeout(() => {
          document.body.style.overflow = '';
          if (res.role === 'legend_client' && pathname !== '/sites/legendgame' && pathname !== '/legendgame') {
            router.push('/sites/legendgame');
          }
        }, 850);
      } else {
        setError(res.message || 'Geçersiz kimlik bilgileri. Erişim engellendi.');
        triggerShake();
      }
    }, 450);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // If already authenticated and gate is unlocked, render minimal floating status pill
  if (isAuthenticated && phase !== 'intro') {
    return (
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs shadow-xl font-mono">
        <span className={`w-2 h-2 rounded-full ${isMasterAdmin ? 'bg-emerald-400' : 'bg-cyan-400'} animate-pulse`} />
        <span className="font-semibold text-slate-200">{user?.username}</span>
        {isMasterAdmin && (
          <a
            href="/admin"
            className="px-2 py-0.5 rounded bg-red-600/30 text-red-300 hover:bg-red-600/50 text-[11px] font-bold transition ml-1"
          >
            Panel
          </a>
        )}
        <button
          onClick={logout}
          className="text-slate-400 hover:text-rose-400 transition text-[11px] ml-1.5 pl-1.5 border-l border-slate-700"
          title="Çıkış Yap ve Ekranı Kilitle"
        >
          Kapat
        </button>
      </div>
    );
  }

  // Strictly blocking gate modal
  return (
    <div className="fixed inset-0 z-[999999] bg-[#04060a] flex items-center justify-center p-4 select-none overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-900/20 via-cyan-900/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tl from-red-900/15 via-rose-900/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* PHASE 1: 0 - 2 Saniye Açılış Animasyonu */}
      {phase === 'intro' && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm w-full animate-in fade-in duration-700">
          {/* Animated Central Emblem */}
          <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
            {/* Outer rotating pulse ring */}
            <div className="absolute inset-0 rounded-3xl border border-cyan-500/30 animate-[spin_6s_linear_infinite]" />
            <div className="absolute inset-2 rounded-2xl border border-indigo-500/40 animate-[spin_4s_linear_infinite_reverse]" />
            
            {/* Center Glowing Logo Monogram */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-rose-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/40 relative z-10 animate-pulse">
              <span className="text-3xl font-black tracking-tighter">A</span>
            </div>

            {/* Glowing radial back-shadow */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
          </div>

          {/* Intro Text */}
          <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white mb-2 uppercase font-mono">
            AVENOX PROTOCOL
          </h2>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mb-6">
            GÜVENLİ ERİŞİM MERKEZİ BAŞLATILIYOR
          </p>

          {/* Sleek Minimal Progress Bar */}
          <div className="w-56 h-1.5 bg-slate-900/80 rounded-full overflow-hidden border border-slate-800 relative">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-500 rounded-full transition-all duration-75 ease-out shadow-sm shadow-cyan-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-2.5">
            %{progress}
          </div>
        </div>
      )}

      {/* PHASE 2: Giriş Yap Formu (SIFIR HINT / KESİNTİSİZ KİLİT) */}
      {phase === 'login' && (
        <div className={`relative z-10 w-full max-w-md bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-500 ${shake ? 'animate-bounce' : ''}`}>
          
          {/* Header */}
          <div className="text-center mb-7">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3 shadow-lg shadow-cyan-500/10">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Yetkili Girişi
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Devam etmek için sisteme tanımlı kullanıcı adı ve şifrenizi giriniz.
            </p>
          </div>

          {/* Login Form - ZERO HINTS */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı Adı"
                  autoFocus
                  autoComplete="off"
                  className="w-full bg-[#05070e] border border-slate-800 focus:border-cyan-500/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Parola
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full bg-[#05070e] border border-slate-800 focus:border-cyan-500/80 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-cyan-500 via-indigo-600 to-rose-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-rose-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500/70" />
            <span>256-Bit Uçtan Uca Şifreli Protokol</span>
          </div>
        </div>
      )}

      {/* PHASE 3: Onaylandı / Başarılı Geçiş Animasyonu */}
      {phase === 'granted' && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center animate-in zoom-in-90 fade-in duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 shadow-2xl shadow-emerald-500/50 animate-pulse">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white font-mono tracking-wider">
            ERİŞİM ONAYLANDI
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Sisteme yönlendiriliyorsunuz...
          </p>
        </div>
      )}
    </div>
  );
}

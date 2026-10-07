'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function AnimatedEntryGate() {
  const { user, isAuthenticated, isMasterAdmin, login, logout } = useAuth();
  
  // Phase: 'intro' (0-2s) -> 'login' -> 'success'
  const [phase, setPhase] = useState<'intro' | 'login' | 'success'>('intro');
  const [progress, setProgress] = useState(0);

  // Form states - ZERO HINTS
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // 0 - 2 Saniye Açılış Animasyonu
  useEffect(() => {
    if (!isAuthenticated) {
      document.body.style.overflow = 'hidden';
      
      const startTime = Date.now();
      const duration = 2000; // 2 saniye

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, Math.round((elapsed / duration) * 100));
        setProgress(p);

        if (elapsed >= duration) {
          clearInterval(interval);
          setPhase('login');
        }
      }, 25);

      return () => {
        clearInterval(interval);
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
      setError('Lütfen kullanıcı adı ve parolanızı giriniz.');
      triggerShake();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setLoading(false);

      if (res.success) {
        setPhase('success');
        setTimeout(() => {
          document.body.style.overflow = '';
          if (res.role === 'legend_client' && pathname !== '/sites/legendgame' && pathname !== '/legendgame') {
            router.push('/sites/legendgame');
          }
        }, 800);
      } else {
        setError(res.message || 'Geçersiz kimlik bilgileri. Erişim engellendi.');
        triggerShake();
      }
    }, 450);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // Kullanıcı zaten giriş yapmışsa: Sadece sağ üstte ufak oturum hapı göster
  if (isAuthenticated && phase !== 'intro') {
    return (
      <div
        style={{
          position: 'fixed',
          top: '12px',
          right: '12px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fff',
          fontSize: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          fontFamily: 'var(--font-mono, monospace)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isMasterAdmin ? '#10b981' : '#38bdf8',
            boxShadow: `0 0 10px ${isMasterAdmin ? '#10b981' : '#38bdf8'}`,
          }}
        />
        <span style={{ fontWeight: 600 }}>{user?.username}</span>
        {isMasterAdmin && (
          <a
            href="/admin"
            style={{
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'rgba(239, 68, 68, 0.25)',
              color: '#fca5a5',
              textDecoration: 'none',
              marginLeft: '4px',
              fontSize: '11px',
              fontWeight: 700,
              border: '1px solid rgba(239, 68, 68, 0.4)',
            }}
          >
            Panel
          </a>
        )}
        <button
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.5)',
            cursor: 'pointer',
            padding: '2px 4px',
            fontSize: '11px',
            textDecoration: 'underline',
            marginLeft: '4px',
          }}
        >
          Çıkış
        </button>
      </div>
    );
  }

  // Giriş yapılmamışsa: ARKADAKİ VİTRİN ASLA GÖRÜNMEZ (100% Opaque Blocking Layer)
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#030712', // Katı karanlık arka plan, arkası ASLA görünmez
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        userSelect: 'none',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
      }}
    >
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.85); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.8; }
          100% { transform: scale(0.85); opacity: 0.2; }
        }
        @keyframes orbitSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cardFadeIn {
          0% { opacity: 0; transform: scale(0.95) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shakeEff {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        @keyframes laserGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Arka Plan Ambiyans Işıkları */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* ================= 1. AŞAMA: 0 - 2 SANİYE SLEEK ANİMASYON ================= */}
      {phase === 'intro' && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: '380px',
            width: '100%',
          }}
        >
          {/* Lüks Holografik Yörünge Halkaları */}
          <div
            style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Dış Yörünge */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1.5px dashed rgba(56, 189, 248, 0.4)',
                animation: 'orbitSpin 6s linear infinite',
              }}
            />
            {/* Orta Dairesel Dalga */}
            <div
              style={{
                position: 'absolute',
                inset: '14px',
                borderRadius: '50%',
                border: '1px solid rgba(129, 140, 248, 0.5)',
                animation: 'pulseRing 2.2s ease-in-out infinite',
              }}
            />
            {/* Merkez Parıldayan Çekirdek Işığı */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #38bdf8 0%, #6366f1 80%)',
                boxShadow: '0 0 35px #38bdf8, 0 0 60px rgba(99, 102, 241, 0.8)',
              }}
            />
          </div>

          <h2
            style={{
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '0.2em',
              color: '#fff',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            SİSTEM BAŞLATILIYOR
          </h2>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.45)',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.08em',
            }}
          >
            GÜVENLİ PROTOKOL DOĞRULANIYOR
          </p>

          {/* İlerleme Çubuğu */}
          <div
            style={{
              width: '240px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.2)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #38bdf8, #818cf8, #f43f5e)',
                borderRadius: '999px',
                boxShadow: '0 0 10px #38bdf8',
                transition: 'width 0.04s linear',
              }}
            />
          </div>

          <div
            style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.4)',
              marginTop: '10px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            %{progress}
          </div>
        </div>
      )}

      {/* ================= 2. AŞAMA: LOGOSUZ & SIFIR HİNT GİRİŞ KARTI ================= */}
      {phase === 'login' && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '430px',
            width: '100%',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '36px 32px',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.08)',
            animation: isShaking ? 'shakeEff 0.45s ease-in-out' : 'cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Başlık Alanı - LOGOSUZ */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.02em',
                margin: '0 0 8px 0',
              }}
            >
              Yetkili Girişi
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.55)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Devam etmek için tanımlı kullanıcı adı ve şifrenizi giriniz.
            </p>
          </div>

          {/* Hata Uyarısı */}
          {error && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#fca5a5',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
                animation: 'cardFadeIn 0.2s ease',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, color: '#f87171' }} />
              <span>{error}</span>
            </div>
          )}

          {/* Form - HİÇBİR HİNT / İPUCU / PRESET YOKTUR */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                Kullanıcı Adı
              </label>
              <div style={{ position: 'relative' }}>
                <User
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.4)',
                  }}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı Adı"
                  required
                  autoFocus
                  autoComplete="off"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    background: 'rgba(8, 12, 22, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#38bdf8';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                Parola
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.4)',
                  }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 42px',
                    borderRadius: '12px',
                    background: 'rgba(8, 12, 22, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#38bdf8';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '10px',
                padding: '13px 18px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
                border: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 10px 25px -4px rgba(2, 132, 199, 0.5)',
                transition: 'transform 0.15s, opacity 0.15s, box-shadow 0.15s',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px -4px rgba(2, 132, 199, 0.65)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(2, 132, 199, 0.5)';
                }
              }}
            >
              {loading ? (
                <span>Doğrulanıyor...</span>
              ) : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Alt Bilgi */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.4)',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            256-Bit Uçtan Uca Şifreli Protokol
          </div>
        </div>
      )}

      {/* ================= 3. AŞAMA: ONAYLANDI ================= */}
      {phase === 'success' && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            animation: 'cardFadeIn 0.3s ease',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              marginBottom: '16px',
              boxShadow: '0 0 35px rgba(16, 185, 129, 0.4)',
            }}
          >
            <CheckCircle2 size={36} />
          </div>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 6px 0',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.05em',
            }}
          >
            ERİŞİM ONAYLANDI
          </h2>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: 0,
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            Yönlendiriliyorsunuz...
          </p>
        </div>
      )}
    </div>
  );
}

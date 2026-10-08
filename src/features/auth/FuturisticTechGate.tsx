'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { User, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function FuturisticTechGate() {
  const { user, isAuthenticated, isMasterAdmin, checkCredentials, login, logout } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [shake, setShake] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Lütfen kullanıcı adı ve parolanızı giriniz.');
      triggerShake();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const check = checkCredentials(username, password);
      setLoading(false);

      if (check.valid) {
        setIsGranted(true);
        setTimeout(() => {
          login(username, password);
          document.body.style.overflow = '';
          if (check.role === 'legend_client') {
            window.location.href = '/sites/volta/';
          }
        }, 600);
      } else {
        setErrorMsg('Hatalı kullanıcı adı veya şifre. Erişim engellendi.');
        triggerShake();
      }
    }, 280);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Eğer kullanıcı zaten giriş yapmışsa, sağ üstte ufak durum hapı göster
  if (isAuthenticated && !isGranted) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '12px',
          right: '12px',
          zIndex: 999999,
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

  // GİRİŞ YAPILMADAN ÖNCE: TEK SAYFA HALİNDE ORTADAN YAVAŞÇA BÜYÜYEN SLEEK GİRİŞ KARTI
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        background: '#040711', // Katı derin karanlık arka plan
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
      }}
    >
      <style>{`
        /* Ortadan yavaşça büyüyen sleek animasyon */
        @keyframes smoothScaleUpCenter {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shakeGlitch {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        @keyframes ambientPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.15); opacity: 0.25; }
        }
      `}</style>

      {/* Arka plan derin uzay ışıması */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'ambientPulse 6s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '30%',
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'ambientPulse 6s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }}
      />

      {/* Ortadan yavaşça büyüyen Kart (LOGOSUZ & SIFIR HİNT) */}
      {!isGranted ? (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '420px',
            width: '100%',
            background: 'rgba(11, 18, 33, 0.88)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '24px',
            padding: '40px 34px',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(56, 189, 248, 0.1)',
            animation: shake
              ? 'shakeGlitch 0.45s ease-in-out'
              : 'smoothScaleUpCenter 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
          {errorMsg && (
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
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, color: '#f87171' }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form - KESİNLİKLE SIFIR HİNT / İPUCU YOKTUR */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    background: 'rgba(6, 11, 22, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#38bdf8';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
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
                    background: 'rgba(6, 11, 22, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#38bdf8';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
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
                transition: 'all 0.15s ease',
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

          {/* Alt Güvenlik Yazısı */}
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
      ) : (
        /* Başarılı Giriş */
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
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

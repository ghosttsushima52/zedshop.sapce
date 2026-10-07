'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function FuturisticTechGate() {
  const { user, isAuthenticated, isMasterAdmin, login, logout } = useAuth();

  // Phase: 'intro' (0-2s) -> 'console' -> 'granted'
  const [phase, setPhase] = useState<'intro' | 'console' | 'granted'>('intro');
  const [progress, setProgress] = useState(0);
  const [telemetryLog, setTelemetryLog] = useState('SYSTEM BOOTING...');

  // Form states - STRICTLY ZERO HINTS
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [glitchShake, setGlitchShake] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // 0 - 2 Saniye Açılış Animasyonu (Cinematic Cyber HUD Boot)
  useEffect(() => {
    if (!isAuthenticated) {
      document.body.style.overflow = 'hidden';
      const startTime = Date.now();
      const duration = 2000; // Tam 2 saniye

      const logs = [
        'INITIALIZING QUANTUM ENCRYPTION...',
        'CHECKING TLS HANDSHAKE & NEURAL LINK...',
        'SCANNING SYSTEM INTEGRITY...',
        'BYPASS PROTECTION: LOCKED',
        'TERMINAL READY FOR OPERATOR AUTH'
      ];

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, Math.round((elapsed / duration) * 100));
        setProgress(p);

        // Update telemetry log text
        const logIndex = Math.min(logs.length - 1, Math.floor((p / 100) * logs.length));
        setTelemetryLog(logs[logIndex]);

        if (elapsed >= duration) {
          clearInterval(interval);
          setPhase('console');
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim() || !password.trim()) {
      setErrorMsg('GİRİŞ PARAMETRELERİ EKSİK. KULLANICI VE ŞİFRE GEREKLİ.');
      triggerGlitch();
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
        setErrorMsg('403 YETKİSİZ ERİŞİM: KİMLİK DOĞRULANAMADI.');
        triggerGlitch();
      }
    }, 450);
  };

  const triggerGlitch = () => {
    setGlitchShake(true);
    setTimeout(() => setGlitchShake(false), 500);
  };

  // Eğer giriş yapılmışsa sadece sağ üstte minimal sci-fi durum çubuğu göster
  if (isAuthenticated && phase !== 'intro') {
    return (
      <div
        style={{
          position: 'fixed',
          top: '12px',
          right: '12px',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 14px',
          borderRadius: '4px',
          background: 'rgba(2, 6, 18, 0.92)',
          border: '1px solid #00f0ff',
          color: '#00f0ff',
          fontSize: '11px',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
          fontFamily: 'monospace',
          letterSpacing: '0.08em',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isMasterAdmin ? '#00ff66' : '#00f0ff',
            boxShadow: `0 0 8px ${isMasterAdmin ? '#00ff66' : '#00f0ff'}`,
          }}
        />
        <span>OPERATOR: {user?.username}</span>
        {isMasterAdmin && (
          <a
            href="/admin"
            style={{
              padding: '2px 8px',
              borderRadius: '2px',
              background: 'rgba(255, 0, 85, 0.2)',
              border: '1px solid #ff0055',
              color: '#ff0055',
              textDecoration: 'none',
              fontSize: '10px',
              fontWeight: 800,
            }}
          >
            [ ADMIN ]
          </a>
        )}
        <button
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.5)',
            cursor: 'pointer',
            fontSize: '11px',
            fontFamily: 'monospace',
            textDecoration: 'underline',
            marginLeft: '4px',
          }}
        >
          KİLİTLE
        </button>
      </div>
    );
  }

  // GİRİŞ YAPILMADAN ÖNCE: TEK SAYFA HALİNDE 100% FUTURISTIC TECH CONSOLE
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        background: '#020409',
        color: '#e2e8f0',
        fontFamily: "'JetBrains Mono', 'Space Grotesk', monospace, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseLaser {
          0% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.9; transform: scale(1.05); }
          100% { opacity: 0.3; transform: scale(0.95); }
        }
        @keyframes scanlineAnim {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes glitchShakeKey {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-6px, 2px); }
          40% { transform: translate(6px, -2px); }
          60% { transform: translate(-4px, -2px); }
          80% { transform: translate(4px, 2px); }
        }
        @keyframes cyberFadeIn {
          0% { opacity: 0; transform: scale(0.94); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
      `}</style>

      {/* Cyber Grid & Perspective Lines Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Scanline CRT Texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      {/* Top Header Telemetry Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '42px',
          borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
          background: 'rgba(2, 6, 14, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          fontSize: '11px',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          color: 'rgba(0, 240, 255, 0.7)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
          <span>NET_CORE: RESTRICTED</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>PORT: 443_TLS</span>
          <span>SEC_MATRIX: ACTIVE</span>
        </div>
      </div>

      {/* ================= 1. AŞAMA: 0 - 2 SANİYE AÇILIŞ ANİMASYONU ================= */}
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
            animation: 'cyberFadeIn 0.4s ease',
          }}
        >
          {/* Cyber Radar HUD Ring */}
          <div
            style={{
              position: 'relative',
              width: '140px',
              height: '140px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Dış Kesikli Radar Çemberi */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1.5px dashed #00f0ff',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
                animation: 'radarSweep 5s linear infinite',
              }}
            />
            {/* İç Dönen Optik Gösterge */}
            <div
              style={{
                position: 'absolute',
                inset: '16px',
                borderRadius: '50%',
                border: '1px solid rgba(99, 102, 241, 0.6)',
                borderTopColor: '#ff0055',
                animation: 'radarSweep 2.5s linear infinite reverse',
              }}
            />
            {/* Merkez Hedef Noktası */}
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#00f0ff',
                boxShadow: '0 0 25px #00f0ff, 0 0 50px rgba(0, 240, 255, 0.8)',
                animation: 'pulseLaser 1.5s ease-in-out infinite',
              }}
            />
            {/* Nişangah Çizgileri */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: '1px', background: 'rgba(0, 240, 255, 0.2)' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'rgba(0, 240, 255, 0.2)' }} />
          </div>

          {/* Sci-Fi Başlık & Log */}
          <div
            style={{
              fontSize: '12px',
              fontFamily: 'monospace',
              letterSpacing: '0.25em',
              color: '#00f0ff',
              marginBottom: '8px',
              textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
            }}
          >
            // SYSTEM INITIATION //
          </div>

          <div
            style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '24px',
              minHeight: '20px',
            }}
          >
            {telemetryLog}
          </div>

          {/* Lazer İlerleme Çubuğu */}
          <div
            style={{
              width: '280px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #00f0ff 0%, #6366f1 70%, #ff0055 100%)',
                boxShadow: '0 0 15px #00f0ff',
                transition: 'width 0.04s linear',
              }}
            />
          </div>

          <div
            style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              color: '#00f0ff',
              marginTop: '12px',
              letterSpacing: '0.1em',
            }}
          >
            [ LOAD_FACTOR: {progress}% ]
          </div>
        </div>
      )}

      {/* ================= 2. AŞAMA: LOGOSUZ & SIFIR HİNT CYBER KONSOL ================= */}
      {phase === 'console' && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '440px',
            width: '100%',
            background: 'rgba(6, 12, 26, 0.94)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            boxShadow: '0 0 50px rgba(0, 240, 255, 0.15), 0 25px 60px rgba(0, 0, 0, 0.95)',
            padding: '36px 32px',
            animation: glitchShake ? 'glitchShakeKey 0.45s ease-in-out' : 'cyberFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Fütüristik 4 Köşe Ayracı (Corner Brackets) */}
          <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '12px', height: '12px', borderTop: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff' }} />
          <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '12px', height: '12px', borderTop: '2px solid #00f0ff', borderRight: '2px solid #00f0ff' }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '12px', height: '12px', borderBottom: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff' }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '12px', height: '12px', borderBottom: '2px solid #00f0ff', borderRight: '2px solid #00f0ff' }} />

          {/* Konsol Üst Başlık (LOGOSUZ) */}
          <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(0, 240, 255, 0.15)', paddingBottom: '16px' }}>
            <div
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                color: '#00f0ff',
                letterSpacing: '0.2em',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ width: '6px', height: '6px', background: '#00f0ff', display: 'inline-block' }} />
              <span>TERMINAL: ACCESS_PORTAL_V2</span>
            </div>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '0.04em',
                margin: '0 0 6px 0',
                textTransform: 'uppercase',
              }}
            >
              KİMLİK DOĞRULAMA
            </h1>
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Sistem erişimi için yetkili operatör kodlarını tanımlayınız.
            </p>
          </div>

          {/* Hata Uyarısı */}
          {errorMsg && (
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(255, 0, 85, 0.15)',
                border: '1px solid #ff0055',
                color: '#ff6b8b',
                fontSize: '11px',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
                boxShadow: '0 0 15px rgba(255, 0, 85, 0.2)',
              }}
            >
              <ShieldAlert size={16} style={{ color: '#ff0055', flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form - STRICTLY ZERO HINTS */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: 'rgba(0, 240, 255, 0.8)',
                  marginBottom: '8px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                // KULLANICI KİMLİĞİ (OPERATOR_ID)
              </label>
              <div style={{ position: 'relative' }}>
                <User
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(0, 240, 255, 0.5)',
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
                    padding: '12px 14px 12px 38px',
                    background: 'rgba(2, 6, 16, 0.9)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    color: '#fff',
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#00f0ff';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 240, 255, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.25)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: 'rgba(0, 240, 255, 0.8)',
                  marginBottom: '8px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                // ERİŞİM ANAHTARI (CIPHER_KEY)
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(0, 240, 255, 0.5)',
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
                    padding: '12px 40px 12px 38px',
                    background: 'rgba(2, 6, 16, 0.9)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    color: '#fff',
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#00f0ff';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 240, 255, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.25)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(0, 240, 255, 0.6)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '10px',
                padding: '13px 18px',
                background: 'linear-gradient(90deg, #00f0ff 0%, #4f46e5 100%)',
                border: 'none',
                color: '#020617',
                fontSize: '12px',
                fontFamily: 'monospace',
                fontWeight: 900,
                letterSpacing: '0.12em',
                cursor: loading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)',
                transition: 'all 0.15s ease',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 240, 255, 0.7)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? (
                <span>KİMLİK DOĞRULANIYOR...</span>
              ) : (
                <>
                  <span>[ SİSTEME GİRİŞ YAP ]</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Alt Güvenlik Protokolü */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(0, 240, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.35)',
              fontFamily: 'monospace',
            }}
          >
            <span>SECURITY LEVEL: CLASS_4</span>
            <span style={{ color: '#00f0ff' }}>STATUS: ENCRYPTED</span>
          </div>
        </div>
      )}

      {/* ================= 3. AŞAMA: ONAYLANDI ================= */}
      {phase === 'granted' && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            animation: 'cyberFadeIn 0.3s ease',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              border: '2px solid #00ff66',
              boxShadow: '0 0 40px #00ff66',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00ff66',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={42} />
          </div>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 900,
              color: '#00ff66',
              margin: '0 0 8px 0',
              letterSpacing: '0.15em',
              textShadow: '0 0 15px rgba(0, 255, 102, 0.6)',
            }}
          >
            [ ERİŞİM ONAYLANDI ]
          </h2>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0,
              letterSpacing: '0.1em',
            }}
          >
            GÜVENLİK BARİYERİ KALDIRILIYOR...
          </p>
        </div>
      )}

      {/* Bottom Telemetry Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.25)',
          fontFamily: 'monospace',
          letterSpacing: '0.15em',
        }}
      >
        AVENOX OS // BUILD_2026.10 // RESTRICTED RUNTIME
      </div>
    </div>
  );
}

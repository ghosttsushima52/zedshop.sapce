'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { ShieldCheck, Lock, User, Eye, EyeOff, Sparkles, Gamepad2, ArrowRight, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MASTER_CREDENTIALS, LEGEND_CREDENTIALS } from './types';

export function AnimatedEntryGate() {
  const { user, isAuthenticated, isMasterAdmin, isGateOpen, login, logout, closeGate, openGate } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isGateOpen && isAuthenticated) {
    // Render top mini status badge when authenticated
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
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fff',
          fontSize: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          fontFamily: 'var(--font-mono, monospace)',
        }}
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isMasterAdmin ? '#10b981' : '#6366f1', boxShadow: '0 0 8px currentColor' }}></span>
        <span style={{ fontWeight: 600 }}>{user?.username}</span>
        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>({isMasterAdmin ? 'Master Admin' : 'Legend Client'})</span>
        {isMasterAdmin && (
          <a
            href="/admin/"
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'rgba(99, 102, 241, 0.25)',
              color: '#a5b4fc',
              textDecoration: 'none',
              marginLeft: '4px',
              border: '1px solid rgba(99, 102, 241, 0.4)',
            }}
          >
            Yönetim Paneli
          </a>
        )}
        <button
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            padding: '2px 4px',
            fontSize: '11px',
            textDecoration: 'underline',
          }}
        >
          Çıkış
        </button>
      </div>
    );
  }

  if (!isGateOpen) {
    return (
      <button
        onClick={openGate}
        title="Giriş Yap / Kimlik Doğrula"
        style={{
          position: 'fixed',
          top: '14px',
          right: '14px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 14px',
          borderRadius: '9999px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fff',
          fontSize: '12px',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono, monospace)',
          transition: 'all 0.2s ease',
        }}
      >
        <Lock size={13} style={{ color: '#38bdf8' }} />
        <span>Giriş Yap</span>
      </button>
    );
  }

  const handleFillMaster = () => {
    setUsername(MASTER_CREDENTIALS.username);
    setPassword(MASTER_CREDENTIALS.password);
    setError(null);
  };

  const handleFillLegend = () => {
    setUsername(LEGEND_CREDENTIALS.username);
    setPassword(LEGEND_CREDENTIALS.password);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setLoading(false);
      if (res.success) {
        if (res.role === 'master_admin') {
          setSuccessMsg('👑 Ana Yönetici Yetkileri Doğrulandı. Tüm siteler aktif.');
          setTimeout(() => {
            closeGate();
            setSuccessMsg(null);
          }, 1000);
        } else {
          setSuccessMsg('🎮 Legend Gamer Doğrulandı. Yönlendiriliyorsunuz...');
          setTimeout(() => {
            closeGate();
            setSuccessMsg(null);
            router.push('/sites/legendgame/index/');
          }, 1000);
        }
      } else {
        setError(res.message || 'Hatalı giriş!');
      }
    }, 450);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.92) 0%, rgba(2, 6, 23, 0.98) 100%)',
        backdropFilter: 'blur(16px)',
        padding: '16px',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(30, 41, 59, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.15)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow ambient accent */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '260px',
            height: '140px',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(99, 102, 241, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <button
          onClick={closeGate}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '10px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.2))',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              marginBottom: '12px',
            }}
          >
            <ShieldCheck size={28} style={{ color: '#38bdf8' }} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Avenox Güvenli Giriş Kapısı
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', margin: 0, lineHeight: 1.5 }}>
            Yetkili portala erişmek için giriş yapın veya demo vitrinine devam edin.
          </p>
        </div>

        {/* Quick Fill Preset Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={handleFillMaster}
            style={{
              padding: '8px 10px',
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              color: '#7dd3fc',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={12} />
            <span>Ana Yönetici (qwacy)</span>
          </button>
          <button
            type="button"
            onClick={handleFillLegend}
            style={{
              padding: '8px 10px',
              borderRadius: '10px',
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              color: '#d8b4fe',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Gamepad2 size={12} />
            <span>Legend Gamer (Müşteri)</span>
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#86efac',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Kullanıcı Adı (Username)
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="qwacy veya ggLegendGamer3339"
                required
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 38px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Şifre (Password)
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '11px 40px 11px 38px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
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
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: 0,
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
              marginTop: '8px',
              padding: '12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              border: 'none',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px -4px rgba(59, 130, 246, 0.5)',
              transition: 'transform 0.15s ease',
            }}
          >
            {loading ? 'Doğrulanıyor...' : (
              <>
                <span>Güvenli Giriş Yap</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
          <button
            type="button"
            onClick={closeGate}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Misafir Olarak Vitrini İncele →
          </button>
        </div>
      </div>
    </div>
  );
}

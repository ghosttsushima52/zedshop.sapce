'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiresAt: string;
  onExpire?: () => void;
}

export function CountdownTimer({ expiresAt, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const target = new Date(expiresAt).getTime();
    const diff = Math.floor((target - Date.now()) / 1000);
    return Math.max(0, diff);
  });

  useEffect(() => {
    const update = () => {
      const target = new Date(expiresAt).getTime();
      const diff = Math.floor((target - Date.now()) / 1000);
      if (diff <= 0) {
        setTimeLeft(0);
        if (onExpire) onExpire();
      } else {
        setTimeLeft(diff);
      }
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 120; // under 2 mins
  const isCritical = timeLeft < 30;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '12px',
        background: isCritical
          ? 'rgba(239, 68, 68, 0.15)'
          : isUrgent
          ? 'rgba(245, 158, 11, 0.15)'
          : 'rgba(56, 189, 248, 0.12)',
        border: `1px solid ${
          isCritical ? '#ef4444' : isUrgent ? '#f59e0b' : '#38bdf8'
        }`,
        color: isCritical ? '#ef4444' : isUrgent ? '#f59e0b' : '#38bdf8',
        fontWeight: 700,
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '16px',
        letterSpacing: '0.04em',
        boxShadow: isCritical ? '0 0 16px rgba(239, 68, 68, 0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {isCritical ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      <span>Kalan Süre: {formattedTime}</span>
    </div>
  );
}

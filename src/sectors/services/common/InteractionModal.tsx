'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle2, Clock, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '@/core/ui';

export interface InteractionConfirmationData {
  title: string;
  referenceNumber: string;
  summary: string;
  details?: Array<{ label: string; value: string }>;
  nextSteps?: string[];
  disclaimer?: string;
}

interface InteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InteractionConfirmationData | null;
}

export function InteractionModal({ isOpen, onClose, data }: InteractionModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--sp-4)',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          background: 'var(--c-bg)',
          color: 'var(--c-fg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--c-border)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--sp-4) var(--sp-6)',
            borderBottom: '1px solid var(--c-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--c-bg-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--c-accent)' }} />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Talebiniz Alındı</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--c-fg-muted)',
              display: 'flex',
              padding: 'var(--sp-1)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: 'var(--sp-6)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-4)',
          }}
        >
          <div>
            <h3
              id="modal-title"
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                color: 'var(--c-fg)',
                marginBlockEnd: 'var(--sp-2)',
              }}
            >
              {data.title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)' }}>
              {data.summary}
            </p>
          </div>

          {/* Reference badge */}
          <div
            style={{
              padding: 'var(--sp-3) var(--sp-4)',
              background: 'var(--c-bg-subtle)',
              border: '1px dashed var(--c-border-strong)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
              Takip / Kayıt No
            </span>
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                color: 'var(--c-accent)',
              }}
            >
              {data.referenceNumber}
            </code>
          </div>

          {/* Details table */}
          {data.details && data.details.length > 0 && (
            <div style={{ border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              {data.details.map((d, idx) => (
                <div
                  key={d.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 'var(--sp-2) var(--sp-3)',
                    fontSize: 'var(--text-xs)',
                    background: idx % 2 === 0 ? 'var(--c-bg)' : 'var(--c-bg-subtle)',
                    borderBottom: idx < (data.details?.length ?? 0) - 1 ? '1px solid var(--c-border)' : 'none',
                  }}
                >
                  <span style={{ color: 'var(--c-fg-muted)' }}>{d.label}</span>
                  <span style={{ fontWeight: 600, color: 'var(--c-fg)' }}>{d.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Next Steps */}
          {data.nextSteps && data.nextSteps.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg-muted)' }}>
                Sonraki Adımlar:
              </span>
              <ul style={{ paddingLeft: 'var(--sp-4)', fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
                {data.nextSteps.map((step, idx) => (
                  <li key={idx} style={{ marginBlockEnd: 'var(--sp-1)' }}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Optional Disclaimer in Modal */}
          {data.disclaimer && (
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--c-fg-faint)',
                lineHeight: 'var(--leading-normal)',
                paddingTop: 'var(--sp-2)',
                borderTop: '1px solid var(--c-border)',
              }}
            >
              <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: 'var(--c-accent)' }} />
              {data.disclaimer}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: 'var(--sp-4) var(--sp-6)',
            borderTop: '1px solid var(--c-border)',
            display: 'flex',
            justifyContent: 'flex-end',
            background: 'var(--c-bg-subtle)',
          }}
        >
          <Button variant="primary" onClick={onClose}>
            Anladım, Kapat
          </Button>
        </div>
      </div>
    </div>
  );
}

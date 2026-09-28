'use client';

import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from '@/core/ui/primitives';

interface EditorialEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EditorialEmptyState({
  title = 'Aramanızla eşleşen kayıt bulunamadı',
  description = 'Arama terimlerinizi basitleştirmeyi veya filtre seçimlerinizi sıfırlamayı deneyebilirsiniz.',
  actionLabel = 'Filtreleri Temizle',
  onAction,
  icon,
}: EditorialEmptyStateProps) {
  return (
    <div
      role="status"
      style={{
        paddingBlock: 'var(--sp-16)',
        paddingInline: 'var(--sp-8)',
        textAlign: 'center',
        background: 'var(--c-bg-subtle)',
        border: '1px dashed var(--c-border-strong)',
        borderRadius: 'var(--radius-md)',
        marginBlock: 'var(--sp-8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--sp-4)',
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--c-bg-raised)',
          color: 'var(--c-fg-faint)',
          border: '1px solid var(--c-border)',
        }}
        aria-hidden="true"
      >
        {icon || <SearchX size={26} />}
      </div>

      <div style={{ maxWidth: '480px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--c-fg)',
            marginBlockEnd: 'var(--sp-2)',
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--c-fg-muted)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {description}
        </p>
      </div>

      {onAction && (
        <Button variant="outline" onClick={onAction} style={{ gap: '0.5rem' }}>
          <RotateCcw size={14} aria-hidden="true" />
          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  );
}

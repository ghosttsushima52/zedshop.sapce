'use client';

import React, { useState } from 'react';
import type { JournalArticle } from '@/content/types';
import { authors as allAuthors } from '@/content/journal';
import { Quote, Check, Copy, X } from 'lucide-react';
import { Button } from '@/core/ui/primitives';

interface CitationModalProps {
  article: JournalArticle;
  isOpen: boolean;
  onClose: () => void;
}

export function CitationModal({ article, isOpen, onClose }: CitationModalProps) {
  const [activeTab, setActiveTab] = useState<'apa' | 'bibtex' | 'chicago'>('apa');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const articleAuthors = allAuthors.filter((a) =>
    article.authorIds.includes(a.id)
  );
  const authorNames = articleAuthors.map((a) => a.name).join(', ');
  const year = new Date(article.publishDate).getFullYear();

  const citations = {
    apa: `${authorNames} (${year}). ${article.title}. Yörünge Araştırma Dergisi, ${article.volume}(${article.issue}), https://doi.org/${article.doi}`,
    bibtex: `@article{yorunge_${article.slug.replace(/-/g, '_')},
  title = {${article.title}},
  author = {${articleAuthors.map((a) => a.name).join(' and ')}},
  journal = {Yörünge Araştırma Dergisi},
  volume = {${article.volume}},
  number = {${article.issue}},
  year = {${year}},
  doi = {${article.doi}},
  url = {https://doi.org/${article.doi}}
}`,
    chicago: `${authorNames}. "${article.title}." Yörünge Araştırma Dergisi ${article.volume}, no. ${article.issue} (${year}). doi:${article.doi}.`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(citations[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="citation-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--sp-4)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'var(--c-bg-raised)',
          border: '1px solid var(--c-border-strong)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--sp-4) var(--sp-6)',
            borderBottom: '1px solid var(--c-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Quote size={16} style={{ color: 'var(--c-accent)' }} />
            <h3
              id="citation-modal-title"
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: 'var(--c-fg)',
                fontFamily: 'var(--font-display)',
                margin: 0,
              }}
            >
              Atıf Biçimi (Cite Article)
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--c-fg-muted)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab selection */}
        <div
          style={{
            padding: 'var(--sp-3) var(--sp-6)',
            background: 'var(--c-bg-subtle)',
            borderBottom: '1px solid var(--c-border)',
            display: 'flex',
            gap: 'var(--sp-2)',
          }}
        >
          {(['apa', 'bibtex', 'chicago'] as const).map((format) => (
            <button
              key={format}
              onClick={() => setActiveTab(format)}
              style={{
                padding: '4px 12px',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: activeTab === format ? 'var(--c-accent)' : 'var(--c-border)',
                background:
                  activeTab === format
                    ? 'var(--c-accent)'
                    : 'transparent',
                color:
                  activeTab === format
                    ? 'var(--c-accent-fg)'
                    : 'var(--c-fg-muted)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wide)',
              }}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Body content */}
        <div style={{ padding: 'var(--sp-6)' }}>
          <pre
            style={{
              background: 'var(--c-bg)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--sp-4)',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--c-fg)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.6,
              maxHeight: '220px',
              overflowY: 'auto',
            }}
          >
            {citations[activeTab]}
          </pre>

          <div
            style={{
              marginTop: 'var(--sp-4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
              DOI: {article.doi}
            </span>
            <Button
              variant="primary"
              onClick={handleCopy}
              style={{ gap: '0.4rem', fontSize: 'var(--text-xs)' }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Kopyalandı' : 'Panoya Kopyala'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

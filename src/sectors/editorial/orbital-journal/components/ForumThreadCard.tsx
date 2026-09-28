import React from 'react';
import type { ForumThread } from '@/content/types';
import { getSiteDetailRoute } from '../../shared/routes';
import {
  MessageSquare,
  CheckCircle2,
  Pin,
  Eye,
  ThumbsUp,
  Tag,
  ArrowRight,
} from 'lucide-react';

interface ForumThreadCardProps {
  thread: ForumThread;
  className?: string;
}

export function ForumThreadCard({ thread, className = '' }: ForumThreadCardProps) {
  const detailUrl = getSiteDetailRoute('orbital-journal', thread.slug);
  const formattedDate = new Date(thread.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article
      className={`forum-thread-card ${className}`}
      style={{
        padding: 'var(--sp-5) var(--sp-6)',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--card-radius)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-3)',
        transition:
          'border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
      }}
    >
      {/* Meta Row: Badges & Category */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--sp-2)',
          fontSize: 'var(--text-xs)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          {thread.pinned && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: 'var(--c-accent)',
                fontWeight: 600,
                background: 'rgba(99, 102, 241, 0.1)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              <Pin size={11} aria-hidden="true" />
              <span>Sabitlendi</span>
            </span>
          )}

          {thread.solved && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: '#10b981',
                fontWeight: 600,
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              <CheckCircle2 size={11} aria-hidden="true" />
              <span>Çözüldü</span>
            </span>
          )}

          <span
            style={{
              color: 'var(--c-fg-muted)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            {thread.categoryName}
          </span>
        </div>

        <time
          dateTime={thread.createdAt}
          style={{ color: 'var(--c-fg-faint)', fontSize: 'var(--text-xs)' }}
        >
          {formattedDate}
        </time>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-md)',
          fontWeight: 600,
          lineHeight: 'var(--leading-snug)',
          color: 'var(--c-fg)',
          margin: 0,
        }}
      >
        <a
          href={detailUrl}
          style={{
            color: 'inherit',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <span>{thread.title}</span>
          <ArrowRight
            size={13}
            style={{ opacity: 0.5, flexShrink: 0 }}
            aria-hidden="true"
          />
        </a>
      </h3>

      {/* Excerpt */}
      <p
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--c-fg-muted)',
          lineHeight: 'var(--leading-relaxed)',
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {thread.initialPost.content}
      </p>

      {/* Footer: Author, Tags & Stats */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--sp-3)',
          paddingTop: 'var(--sp-2)',
          borderTop: '1px solid var(--c-border)',
          fontSize: 'var(--text-xs)',
          color: 'var(--c-fg-faint)',
        }}
      >
        {/* Author info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <img
            src={thread.author.avatarUrl}
            alt={thread.author.name}
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            loading="lazy"
          />
          <span style={{ color: 'var(--c-fg)', fontWeight: 500 }}>
            {thread.author.name}
          </span>
          <span style={{ color: 'var(--c-fg-faint)' }}>
            ({thread.author.affiliation})
          </span>
        </div>

        {/* Tags & Counts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
          {thread.tags && thread.tags.length > 0 && (
            <div
              style={{
                display: 'none',
                gap: '0.25rem',
                alignItems: 'center',
              }}
              className="thread-tags-desktop"
            >
              <Tag size={11} aria-hidden="true" />
              <span>{thread.tags.slice(0, 2).join(', ')}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              title="Yanıtlar"
            >
              <MessageSquare size={12} aria-hidden="true" />
              <span>{thread.replyCount}</span>
            </span>
            <span
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              title="Görüntülenme"
            >
              <Eye size={12} aria-hidden="true" />
              <span>{thread.viewCount}</span>
            </span>
            <span
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              title="Beğeni"
            >
              <ThumbsUp size={12} aria-hidden="true" />
              <span>{thread.likeCount}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

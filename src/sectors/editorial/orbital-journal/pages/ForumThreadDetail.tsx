'use client';

import React, { useState } from 'react';
import type { ForumThread } from '@/content/types';
import { forumThreads as allThreads } from '@/content/journal';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { ForumThreadCard } from '../components/ForumThreadCard';
import { getSitePageRoute } from '../../shared/routes';
import { Button } from '@/core/ui/primitives';
import {
  CheckCircle2,
  Pin,
  ThumbsUp,
  MessageSquare,
  Share2,
  Code2,
  Check,
  Send,
  User,
  ShieldCheck,
} from 'lucide-react';

interface ForumThreadDetailProps {
  thread: ForumThread;
}

export function ForumThreadDetail({ thread }: ForumThreadDetailProps) {
  const [likes, setLikes] = useState(thread.likeCount);
  const [liked, setLiked] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState(thread.replies);
  const [replySuccess, setReplySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const relatedThreads = allThreads
    .filter((t) => t.id !== thread.id && t.categoryId === thread.categoryId)
    .slice(0, 2);

  const formattedDate = new Date(thread.createdAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleLike = () => {
    if (!liked) {
      setLikes((l) => l + 1);
      setLiked(true);
    } else {
      setLikes((l) => l - 1);
      setLiked(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: thread.title,
        text: thread.initialPost.content,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = {
      id: `rep-custom-${Date.now()}`,
      author: {
        name: 'Bağımsız Araştırmacı (Siz)',
        role: 'Ziyaretçi Araştırmacı',
        affiliation: 'Açık Bilim Üyesi',
        avatarUrl:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      },
      createdAt: new Date().toISOString(),
      content: replyText.trim(),
      likeCount: 0,
    };

    setReplies((prev) => [...prev, newReply]);
    setReplyText('');
    setReplySuccess(true);
    setTimeout(() => setReplySuccess(false), 3000);
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp-6) var(--sp-16)' }}>
      <Breadcrumbs
        items={[
          { label: 'Genel Bakış', href: getSitePageRoute('orbital-journal', 'home') },
          { label: 'Araştırma Forumu', href: getSitePageRoute('orbital-journal', 'forum') },
          { label: thread.title },
        ]}
      />

      <article style={{ maxWidth: '880px', marginInline: 'auto' }}>
        {/* Header */}
        <header style={{ marginBlockEnd: 'var(--sp-6)' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--sp-2)',
              fontSize: 'var(--text-xs)',
              marginBlockEnd: 'var(--sp-3)',
            }}
          >
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
                <span>Sabitlenmiş Tartışma</span>
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
                <span>Doğrulanmış Çözüm</span>
              </span>
            )}

            <span
              style={{
                color: 'var(--c-accent)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wide)',
              }}
            >
              {thread.categoryName}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(var(--text-xl), 3vw, var(--text-2xl))',
              fontWeight: 800,
              lineHeight: 1.2,
              color: 'var(--c-fg)',
              letterSpacing: 'var(--tracking-tight)',
              marginBlockEnd: 'var(--sp-4)',
            }}
          >
            {thread.title}
          </h1>

          {/* Author bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--sp-4)',
              paddingBlock: 'var(--sp-3)',
              borderTop: '1px solid var(--c-border)',
              borderBottom: '1px solid var(--c-border)',
              fontSize: 'var(--text-xs)',
              color: 'var(--c-fg-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
              <img
                src={thread.author.avatarUrl}
                alt={thread.author.name}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid var(--c-border)',
                }}
                loading="lazy"
              />
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    color: 'var(--c-fg)',
                  }}
                >
                  {thread.author.name}
                </span>
                <span style={{ color: 'var(--c-fg-faint)' }}>
                  {thread.author.role} • {thread.author.affiliation}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
              <time dateTime={thread.createdAt} style={{ color: 'var(--c-fg-faint)' }}>
                {formattedDate}
              </time>

              <button
                type="button"
                onClick={handleShare}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--c-accent)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontWeight: 600,
                  fontSize: 'var(--text-xs)',
                }}
              >
                {shareSuccess ? <Check size={12} /> : <Share2 size={12} />}
                <span>{shareSuccess ? 'Kopyalandı' : 'Paylaş'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Initial Post Card */}
        <section
          aria-label="İlk soru veya konu metni"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--sp-6)',
            marginBlockEnd: 'var(--sp-8)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--c-fg)',
              marginBlockEnd: 'var(--sp-4)',
            }}
          >
            {thread.initialPost.content}
          </div>

          {/* Code snippet if present */}
          {thread.initialPost.codeSnippet && (
            <div style={{ marginBlockEnd: 'var(--sp-4)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--c-fg-faint)',
                  marginBottom: 'var(--sp-1)',
                  fontWeight: 600,
                }}
              >
                <Code2 size={13} />
                <span>Teknik Kod / Veri Yapısı:</span>
              </div>
              <pre
                style={{
                  background: 'var(--c-bg)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--sp-4)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--c-fg)',
                  overflowX: 'auto',
                  lineHeight: 1.5,
                }}
              >
                {thread.initialPost.codeSnippet}
              </pre>
            </div>
          )}

          {/* Tags & Action Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--sp-3)',
              paddingTop: 'var(--sp-4)',
              borderTop: '1px solid var(--c-border)',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {thread.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 'var(--text-xs)',
                    background: 'var(--c-bg-subtle)',
                    border: '1px solid var(--c-border)',
                    color: 'var(--c-fg-muted)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={handleLike}
              style={{
                fontSize: 'var(--text-xs)',
                padding: '4px 12px',
                gap: '0.35rem',
                color: liked ? 'var(--c-accent)' : 'inherit',
                borderColor: liked ? 'var(--c-accent)' : 'var(--c-border)',
              }}
            >
              <ThumbsUp size={13} style={{ fill: liked ? 'currentColor' : 'none' }} />
              <span>{likes} Faydalı Bulundu</span>
            </Button>
          </div>
        </section>

        {/* Replies Timeline Section */}
        <section aria-label="Araştırmacı yanıtları" style={{ marginBlockEnd: 'var(--sp-12)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--c-fg)',
              marginBottom: 'var(--sp-4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <MessageSquare size={18} style={{ color: 'var(--c-accent)' }} />
            <span>Hakem ve Araştırmacı Katkıları ({replies.length})</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            {replies.map((reply) => {
              const replyDate = new Date(reply.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={reply.id}
                  style={{
                    background: reply.isAcceptedAnswer
                      ? 'rgba(16, 185, 129, 0.04)'
                      : 'var(--card-bg)',
                    border: `1px solid ${
                      reply.isAcceptedAnswer ? '#10b981' : 'var(--card-border)'
                    }`,
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--sp-5) var(--sp-6)',
                  }}
                >
                  {/* Accepted Answer Banner */}
                  {reply.isAcceptedAnswer && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        color: '#10b981',
                        letterSpacing: 'var(--tracking-wide)',
                        textTransform: 'uppercase',
                        marginBottom: 'var(--sp-3)',
                      }}
                    >
                      <CheckCircle2 size={14} />
                      <span>Soru Sahibi Tarafından Onaylanan Çözüm</span>
                    </div>
                  )}

                  {/* Reply Author */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--sp-3)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                      <img
                        src={reply.author.avatarUrl}
                        alt={reply.author.name}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1px solid var(--c-border)',
                        }}
                        loading="lazy"
                      />
                      <div>
                        <span
                          style={{
                            display: 'block',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 700,
                            color: 'var(--c-fg)',
                          }}
                        >
                          {reply.author.name}
                        </span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
                          {reply.author.role} • {reply.author.affiliation}
                        </span>
                      </div>
                    </div>

                    <time
                      dateTime={reply.createdAt}
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}
                    >
                      {replyDate}
                    </time>
                  </div>

                  {/* Reply Content */}
                  <div
                    style={{
                      fontSize: 'var(--text-sm)',
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--c-fg)',
                      marginBlockEnd: 'var(--sp-3)',
                    }}
                  >
                    {reply.content}
                  </div>

                  {/* Reply Footer */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--c-fg-faint)',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ThumbsUp size={11} aria-hidden="true" />
                      <span>{reply.likeCount} beğeni</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Add Reply Simulated Form */}
        <section
          aria-label="Tartışmaya katkı sunun"
          style={{
            background: 'var(--c-bg-subtle)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--sp-6)',
            marginBlockEnd: 'var(--sp-12)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              color: 'var(--c-fg)',
              marginBottom: 'var(--sp-2)',
            }}
          >
            Tartışmaya Katkı Sunun (Yanıt Yazın)
          </h2>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--c-fg-muted)',
              marginBottom: 'var(--sp-4)',
              lineHeight: 1.4,
            }}
          >
            Yörünge Forumu akademik nezaket, doğrulanabilir veri ve metodolojik saygı kurallarına tabidir.
          </p>

          {replySuccess ? (
            <div
              style={{
                padding: 'var(--sp-4)',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: 'var(--radius-sm)',
                color: '#10b981',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <CheckCircle2 size={16} />
              <span>Yanıtınız başarıyla eklendi. Teşekkürler.</span>
            </div>
          ) : (
            <form onSubmit={handleAddReply}>
              <textarea
                rows={3}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Önerdiğiniz çözüm yolunu, deney protokolünü veya literatür referansınızı yazın..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: 'var(--text-sm)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--c-border-strong)',
                  background: 'var(--c-bg)',
                  color: 'var(--c-fg)',
                  resize: 'vertical',
                  marginBottom: 'var(--sp-4)',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" type="submit" style={{ gap: '0.4rem', fontSize: 'var(--text-xs)' }}>
                  <Send size={13} aria-hidden="true" />
                  <span>Yanıtı Yayınla</span>
                </Button>
              </div>
            </form>
          )}
        </section>

        {/* Related Forum Discussions */}
        {relatedThreads.length > 0 && (
          <section aria-label="İlgili forum konuları">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--c-fg)',
                marginBottom: 'var(--sp-4)',
              }}
            >
              Aynı Kategorideki Diğer Tartışmalar
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {relatedThreads.map((rel) => (
                <ForumThreadCard key={rel.id} thread={rel} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

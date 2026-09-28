'use client';

import React, { useState, useMemo } from 'react';
import { forumThreads, categories } from '@/content/journal';
import { ForumThreadCard } from '../components/ForumThreadCard';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { EditorialEmptyState } from '../../shared/components/EditorialEmptyState';
import { getSitePageRoute } from '../../shared/routes';
import { Button } from '@/core/ui/primitives';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Pin,
  PlusCircle,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

export function JournalForum() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'pinned'>('all');
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);

  // New topic simulation form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]?.id || '');
  const [newContent, setNewContent] = useState('');
  const [newSuccess, setNewSuccess] = useState(false);

  const filteredThreads = useMemo(() => {
    let result = [...forumThreads];

    // Filter category
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.categoryId === selectedCategory);
    }

    // Filter status
    if (statusFilter === 'solved') {
      result = result.filter((t) => t.solved);
    } else if (statusFilter === 'pinned') {
      result = result.filter((t) => t.pinned);
    }

    // Filter search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.initialPost.content.toLowerCase().includes(q) ||
          t.author.name.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [searchQuery, selectedCategory, statusFilter]);

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setNewSuccess(true);
    setTimeout(() => {
      setNewSuccess(false);
      setIsNewTopicOpen(false);
      setNewTitle('');
      setNewContent('');
    }, 2500);
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp-6)' }}>
      <Breadcrumbs
        items={[
          { label: 'Genel Bakış', href: getSitePageRoute('orbital-journal', 'home') },
          { label: 'Araştırma Forumu ve Açık Diyalog' },
        ]}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--sp-6)',
          marginBlockEnd: 'var(--sp-8)',
        }}
      >
        <div>
          <span
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-accent)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
            }}
          >
            Açık Bilim ve Hakem Diyaloğu
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(var(--text-xl), 3vw, var(--text-2xl))',
              fontWeight: 800,
              color: 'var(--c-fg)',
              letterSpacing: 'var(--tracking-tight)',
              marginBlock: '0.25rem 0.5rem',
            }}
          >
            Üye Araştırma Forumu
          </h1>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--c-fg-muted)',
              maxWidth: '65ch',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Deney kalibrasyonu, veri setleri analizi, asenkron mantık kodları, kavitasyon
            ölçümleri ve açık hakemlik süreçleri için bilim insanları arası doğrudan tartışma kanalı.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsNewTopicOpen((v) => !v)}
          style={{ gap: '0.4rem', whiteSpace: 'nowrap' }}
        >
          <PlusCircle size={15} aria-hidden="true" />
          <span>Yeni Tartışma Başlat</span>
        </Button>
      </div>

      {/* New Topic Modal / Collapsible Form */}
      {isNewTopicOpen && (
        <div
          style={{
            background: 'var(--c-bg-raised)',
            border: '1px solid var(--c-accent)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--sp-6)',
            marginBlockEnd: 'var(--sp-8)',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setIsNewTopicOpen(false)}
            aria-label="Formu kapat"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--c-fg-faint)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-md)',
              fontWeight: 700,
              color: 'var(--c-fg)',
              marginBlockEnd: 'var(--sp-4)',
            }}
          >
            Yeni Araştırma Başlığı Aç (Simülasyon)
          </h2>

          {newSuccess ? (
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
              <CheckCircle2 size={18} />
              <span>Başlığınız moderasyon ve hakem heyeti onayına iletildi. Teşekkürler.</span>
            </div>
          ) : (
            <form onSubmit={handleSimulateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div>
                <label
                  htmlFor="topic-title"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--c-fg-muted)',
                    marginBottom: 'var(--sp-1)',
                  }}
                >
                  Tartışma Başlığı (Açık ve teknik)
                </label>
                <input
                  id="topic-title"
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: 20K kriyojenik sıcaklıkta grafen aerojel temas direnci sapmaları..."
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    fontSize: 'var(--text-sm)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--c-border-strong)',
                    background: 'var(--c-bg)',
                    color: 'var(--c-fg)',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
                <div>
                  <label
                    htmlFor="topic-cat"
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--c-fg-muted)',
                      marginBottom: 'var(--sp-1)',
                    }}
                  >
                    Disiplin / Kategori
                  </label>
                  <select
                    id="topic-cat"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      fontSize: 'var(--text-sm)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--c-border-strong)',
                      background: 'var(--c-bg)',
                      color: 'var(--c-fg)',
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="topic-body"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--c-fg-muted)',
                    marginBottom: 'var(--sp-1)',
                  }}
                >
                  Metodoloji, Gözlem veya Hipotez Açıklaması
                </label>
                <textarea
                  id="topic-body"
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Deney düzeneği, sensör kalibrasyonu, kullanılan reaktifler veya kod bloklarınızı detaylandırın..."
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    fontSize: 'var(--text-sm)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--c-border-strong)',
                    background: 'var(--c-bg)',
                    color: 'var(--c-fg)',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--sp-3)' }}>
                <Button variant="ghost" type="button" onClick={() => setIsNewTopicOpen(false)}>
                  İptal
                </Button>
                <Button variant="primary" type="submit">
                  Başlığı Gönder
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <section
        aria-label="Forum filtre ve arama araçları"
        style={{
          background: 'var(--c-bg-raised)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--sp-4) var(--sp-6)',
          marginBlockEnd: 'var(--sp-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-4)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--sp-4)',
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '520px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--c-fg-faint)',
              }}
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Forum başlıklarında, kod parçalarında veya sorularda ara..."
              aria-label="Forumda ara"
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                fontSize: 'var(--text-sm)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--c-border-strong)',
                background: 'var(--c-bg)',
                color: 'var(--c-fg)',
                outline: 'none',
              }}
            />
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', gap: 'var(--sp-1)' }} role="group" aria-label="Durum filtreleri">
            <button
              type="button"
              className={`filter-chip${statusFilter === 'all' ? ' filter-chip--active' : ''}`}
              aria-pressed={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
            >
              Tüm Başlıklar
            </button>
            <button
              type="button"
              className={`filter-chip${statusFilter === 'solved' ? ' filter-chip--active' : ''}`}
              aria-pressed={statusFilter === 'solved'}
              onClick={() => setStatusFilter('solved')}
              style={{ gap: '0.25rem', display: 'inline-flex', alignItems: 'center' }}
            >
              <CheckCircle2 size={12} aria-hidden="true" />
              <span>Çözülenler</span>
            </button>
            <button
              type="button"
              className={`filter-chip${statusFilter === 'pinned' ? ' filter-chip--active' : ''}`}
              aria-pressed={statusFilter === 'pinned'}
              onClick={() => setStatusFilter('pinned')}
              style={{ gap: '0.25rem', display: 'inline-flex', alignItems: 'center' }}
            >
              <Pin size={12} aria-hidden="true" />
              <span>Sabitlenenler</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--sp-2)',
            paddingTop: 'var(--sp-2)',
            borderTop: '1px solid var(--c-border)',
          }}
          role="group"
          aria-label="Kategori filtreleri"
        >
          <button
            type="button"
            className={`filter-chip${selectedCategory === 'all' ? ' filter-chip--active' : ''}`}
            aria-pressed={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          >
            Tüm Kategoriler ({forumThreads.length})
          </button>
          {categories.map((c) => {
            const count = forumThreads.filter((t) => t.categoryId === c.id).length;
            if (count === 0) return null;
            return (
              <button
                key={c.id}
                type="button"
                className={`filter-chip${selectedCategory === c.id ? ' filter-chip--active' : ''}`}
                aria-pressed={selectedCategory === c.id}
                onClick={() => setSelectedCategory(c.id)}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Threads List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
        {filteredThreads.length === 0 ? (
          <EditorialEmptyState
            title="Aramanızla eşleşen forum konusu bulunamadı"
            description="Lütfen aradığınız terimleri değiştirin veya kategori filtresini sıfırlayın."
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setStatusFilter('all');
            }}
          />
        ) : (
          filteredThreads.map((thread) => (
            <ForumThreadCard key={thread.id} thread={thread} />
          ))
        )}
      </div>
    </div>
  );
}

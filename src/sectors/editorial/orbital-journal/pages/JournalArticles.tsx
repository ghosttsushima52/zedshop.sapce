'use client';

import React, { useState, useMemo } from 'react';
import { articles, categories, authors as allAuthors } from '@/content/journal';
import { ArticleCard } from '../components/ArticleCard';
import { EditorialEmptyState } from '../../shared/components/EditorialEmptyState';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { getSitePageRoute } from '../../shared/routes';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Check,
} from 'lucide-react';

export function JournalArticles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'citations-desc' | 'read-time'>('date-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'row'>('grid');

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (article) =>
          article.categoryId === selectedCategory ||
          categories.find((c) => c.slug === selectedCategory)?.id === article.categoryId
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((article) => {
        const titleMatch = article.title.toLowerCase().includes(q);
        const subtitleMatch = article.subtitle.toLowerCase().includes(q);
        const abstractMatch = article.abstract.toLowerCase().includes(q);
        const doiMatch = article.doi.toLowerCase().includes(q);
        const tagsMatch = article.tags.some((t) => t.toLowerCase().includes(q));
        const authorMatch = allAuthors
          .filter((a) => article.authorIds.includes(a.id))
          .some((a) => a.name.toLowerCase().includes(q));

        return (
          titleMatch ||
          subtitleMatch ||
          abstractMatch ||
          doiMatch ||
          tagsMatch ||
          authorMatch
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'citations-desc') {
        return b.metrics.citations - a.metrics.citations;
      }
      if (sortBy === 'read-time') {
        return a.readTimeMinutes - b.readTimeMinutes;
      }
      // date-desc
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('date-desc');
  };

  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'all';

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp-6)' }}>
      <Breadcrumbs
        items={[
          { label: 'Genel Bakış', href: getSitePageRoute('orbital-journal', 'home') },
          { label: 'Hakemli Makaleler' },
        ]}
      />

      {/* Header */}
      <header style={{ marginBlockEnd: 'var(--sp-8)' }}>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--c-accent)',
            letterSpacing: 'var(--tracking-caps)',
            textTransform: 'uppercase',
          }}
        >
          Açık Erişim Kütüphanesi
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
          Hakemli Araştırma Makaleleri
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--c-fg-muted)',
            maxWidth: '65ch',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Disiplinlerarası bilim, uzay sistemleri, oşinografi, malzeme mühendisliği ve
          nöromorfik devreler üzerine tam metin hakemli çalışmalar dizini.
        </p>
      </header>

      {/* Filter and Search Bar */}
      <section
        aria-label="Makale filtreleme ve arama araçları"
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
        {/* Top Controls: Search Input + Sort + View Mode */}
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
          <div
            style={{
              position: 'relative',
              flex: '1 1 280px',
              maxWidth: '520px',
            }}
          >
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
              placeholder="Makale başlığı, yazar, DOI veya kavram arayın..."
              aria-label="Makalelerde ara"
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

          {/* Sort & View Switches */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SlidersHorizontal size={14} style={{ color: 'var(--c-fg-faint)' }} />
              <label htmlFor="sort-select" style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
                Sıralama:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  fontSize: 'var(--text-xs)',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--c-border)',
                  background: 'var(--c-bg)',
                  color: 'var(--c-fg)',
                  cursor: 'pointer',
                }}
              >
                <option value="date-desc">Yayın Tarihine Göre (En Yeni)</option>
                <option value="citations-desc">Atıf Sayısına Göre</option>
                <option value="read-time">Okuma Süresine Göre</option>
              </select>
            </div>

            {/* View layout switch */}
            <div
              style={{
                display: 'flex',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
              }}
              role="group"
              aria-label="Görünüm biçimi"
            >
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                title="Izgara Görünümü"
                style={{
                  padding: '5px 8px',
                  background: viewMode === 'grid' ? 'var(--c-accent)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--c-accent-fg)' : 'var(--c-fg-muted)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <LayoutGrid size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('row')}
                aria-pressed={viewMode === 'row'}
                title="Liste Görünümü"
                style={{
                  padding: '5px 8px',
                  background: viewMode === 'row' ? 'var(--c-accent)' : 'transparent',
                  color: viewMode === 'row' ? 'var(--c-accent-fg)' : 'var(--c-fg-muted)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <List size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Chips Bar */}
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
            Tüm Disiplinler ({articles.length})
          </button>

          {categories.map((category) => {
            const count = articles.filter((a) => a.categoryId === category.id).length;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                className={`filter-chip${isSelected ? ' filter-chip--active' : ''}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({count})
              </button>
            );
          })}

          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: 'var(--text-xs)',
                color: 'var(--c-accent)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              <RotateCcw size={12} aria-hidden="true" />
              <span>Sıfırla</span>
            </button>
          )}
        </div>
      </section>

      {/* Results Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 'var(--text-xs)',
          color: 'var(--c-fg-faint)',
          marginBlockEnd: 'var(--sp-4)',
        }}
      >
        <span>
          Toplam <strong>{filteredArticles.length}</strong> makale listeleniyor
          {isFiltered && ' (Filtrelenmiş)'}
        </span>
      </div>

      {/* Articles Presentation */}
      {filteredArticles.length === 0 ? (
        <EditorialEmptyState
          title="Filtre kriterlerine uygun makale bulunamadı"
          description="Aradığınız başlık, yazar veya DOI numarasına ait eşleşme yok. Lütfen arama sözcüklerini sadeleştirin."
          onAction={resetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="grid" />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: 'var(--c-bg-raised)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-md)',
            paddingInline: 'var(--sp-6)',
          }}
        >
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="row" />
          ))}
        </div>
      )}
    </div>
  );
}

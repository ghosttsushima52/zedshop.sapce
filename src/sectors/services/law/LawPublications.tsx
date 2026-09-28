'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Search,
  Scale,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { lawFirmData } from '@/content/law';
import { getPageRoute, getDetailRoute } from '../common/routes';
import { LegalDisclaimer } from '../common/Disclaimers';
import { Button } from '@/core/ui';

interface LawPublicationsProps {
  siteId: string;
}

export function LawPublications({ siteId }: LawPublicationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    return Array.from(new Set(lawFirmData.publications.map((p) => p.category)));
  }, []);

  const filteredPubs = useMemo(() => {
    return lawFirmData.publications.filter((pub) => {
      const matchCategory = selectedCategory === 'all' || pub.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Header */}
      <header style={{ marginBottom: 'var(--sp-8)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', color: 'var(--c-accent)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', marginBottom: 'var(--sp-2)' }}>
          <BookOpen size={16} />
          <span>Hukuki Bülten & Araştırmalar</span>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 'var(--leading-tight)',
            color: 'var(--c-fg)',
            marginBottom: 'var(--sp-3)',
          }}
        >
          Mevzuat Değişiklikleri ve İçtihat Bültenleri
        </h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--c-fg-muted)', maxWidth: '800px', lineHeight: 'var(--leading-relaxed)' }}>
          Yargıtay içtihatları birleştirme kararları, Danıştay vergi daireleri kurulları kararları ve SPK/Rekabet Kurumu tebliğleri doğrultusunda periyodik analizlerimizi paylaşıyoruz.
        </p>
      </header>

      {/* Search and Category Filters */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-4)',
          padding: 'var(--sp-4)',
          background: 'var(--c-bg-subtle)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        {/* Search input */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-fg-faint)' }} />
          <input
            type="text"
            placeholder="Makale başlığı, kanun maddesi veya anahtar kelime ile arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--sp-2) var(--sp-3) var(--sp-2) 36px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--c-border)',
              background: 'var(--c-bg)',
              color: 'var(--c-fg)',
              fontSize: 'var(--text-sm)',
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--c-fg-faint)', textTransform: 'uppercase', marginRight: 'var(--sp-2)' }}>
            Kategoriler:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: 'var(--sp-1) var(--sp-3)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid',
              borderColor: selectedCategory === 'all' ? 'var(--c-accent)' : 'var(--c-border)',
              background: selectedCategory === 'all' ? 'var(--c-accent)' : 'var(--c-bg)',
              color: selectedCategory === 'all' ? 'var(--c-accent-fg)' : 'var(--c-fg)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Tümü ({lawFirmData.publications.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: 'var(--sp-1) var(--sp-3)',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--c-accent)' : 'var(--c-border)',
                background: selectedCategory === cat ? 'var(--c-accent)' : 'var(--c-bg)',
                color: selectedCategory === cat ? 'var(--c-accent-fg)' : 'var(--c-fg)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      {filteredPubs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-12)', color: 'var(--c-fg-muted)' }}>
          Aramanızla eşleşen hukuki yayın bulunamadı. Lütfen arama terimini değiştirin.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {filteredPubs.map((pub) => {
            const author = lawFirmData.teamMembers.find((m) => m.slug === pub.authorSlug);
            return (
              <article
                key={pub.slug}
                style={{
                  padding: 'var(--sp-6)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--c-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--sp-3)',
                  transition: 'border-color var(--dur-fast) var(--ease-out)',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--sp-2)' }}>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--c-accent)',
                      background: 'color-mix(in srgb, var(--c-accent) 10%, transparent)',
                      padding: 'var(--sp-1) var(--sp-2)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {pub.category}
                  </span>
                  <div style={{ display: 'flex', gap: 'var(--sp-4)', fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
                      <Calendar size={13} /> {pub.publishedAt}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
                      <Clock size={13} /> {pub.readTimeMinutes} dk okuma
                    </span>
                  </div>
                </div>

                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-fg)' }}>
                  <a href={getDetailRoute(siteId, pub.slug)} style={{ color: 'inherit' }}>
                    {pub.title}
                  </a>
                </h2>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
                  {pub.excerpt}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--sp-3)', paddingTop: 'var(--sp-2)', borderTop: '1px solid var(--c-border-subtle, var(--c-border))' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-xs)', color: 'var(--c-fg)' }}>
                    <User size={14} style={{ color: 'var(--c-fg-faint)' }} />
                    <span>Yazar: <strong>{author?.name || 'Hukuk Çalışma Grubu'}</strong> ({author?.title})</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                    {pub.legalCitations.length > 0 && (
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
                        <Scale size={13} /> {pub.legalCitations.length} İçtihat Atfı
                      </span>
                    )}
                    <a
                      href={getDetailRoute(siteId, pub.slug)}
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--c-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--sp-1)',
                      }}
                    >
                      Tam Metni Oku <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <LegalDisclaimer />
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { EXPEDITION_JOURNEYS, JOURNEY_CATEGORIES } from '../../../content/travel';
import { Search, SlidersHorizontal, MapPin, Clock, Users, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type SortOption = 'price_asc' | 'price_desc' | 'duration_asc' | 'duration_desc' | 'difficulty_asc' | 'difficulty_desc';

const difficultyRank: Record<string, number> = {
  'Kolay-Orta': 1,
  'Orta': 2,
  'Orta-Zor': 3,
  'Zorlu': 4,
  'Ekstrem': 5,
};

const seasonMonthMap: Record<string, string[]> = {
  'İlkbahar': ['Mart', 'Nisan', 'Mayıs'],
  'Yaz': ['Haziran', 'Temmuz', 'Ağustos'],
  'Güz': ['Eylül', 'Ekim', 'Kasım'],
  'Kış': ['Aralık', 'Ocak', 'Şubat'],
};

export default function TravelJourneys() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('price_asc');

  const filteredJourneys = useMemo(() => {
    let result = EXPEDITION_JOURNEYS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.region.toLowerCase().includes(q) || 
        j.country.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(j => j.category === categoryFilter);
    }

    if (difficultyFilter !== 'all') {
      result = result.filter(j => j.difficulty === difficultyFilter);
    }

    if (seasonFilter !== 'all') {
      const targetMonths = seasonMonthMap[seasonFilter] || [];
      result = result.filter(j => j.bestSeasons.some(m => targetMonths.includes(m)));
    }

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'price_asc':
          return a.pricePerPerson - b.pricePerPerson;
        case 'price_desc':
          return b.pricePerPerson - a.pricePerPerson;
        case 'duration_asc':
          return a.duration.days - b.duration.days;
        case 'duration_desc':
          return b.duration.days - a.duration.days;
        case 'difficulty_asc':
          return (difficultyRank[a.difficulty] || 0) - (difficultyRank[b.difficulty] || 0);
        case 'difficulty_desc':
          return (difficultyRank[b.difficulty] || 0) - (difficultyRank[a.difficulty] || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, categoryFilter, difficultyFilter, seasonFilter, sortOption]);

  return (
    <SiteShell
      theme="violet-signal"
      title="Tüm Rotalar - Özel Keşif Stüdyosu"
      description="Dünyanın en uzak köşelerine özel sefer rotalarını keşfedin."
    >
      <div style={{ backgroundColor: 'var(--color-slate-50)', minHeight: '100vh', padding: 'var(--space-12) var(--space-6)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Keşif Kataloğu</h1>
          
          {/* Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', backgroundColor: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px', position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate-400)' }} />
                <input 
                  type="text" 
                  placeholder="Rota, bölge veya ülke ara..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-3) var(--space-10)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)', outline: 'none' }}
                />
              </div>
              <select 
                value={sortOption} 
                onChange={e => setSortOption(e.target.value as SortOption)}
                style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)', outline: 'none', backgroundColor: 'white' }}
              >
                <option value="price_asc">Fiyat (Artan)</option>
                <option value="price_desc">Fiyat (Azalan)</option>
                <option value="duration_asc">Süre (Kısa-Uzun)</option>
                <option value="duration_desc">Süre (Uzun-Kısa)</option>
                <option value="difficulty_asc">Zorluk (Kolay-Zor)</option>
                <option value="difficulty_desc">Zorluk (Zor-Kolay)</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
              <SlidersHorizontal size={20} style={{ color: 'var(--color-slate-500)' }} />
              
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)' }}>
                <option value="all">Tüm Kategoriler</option>
                {JOURNEY_CATEGORIES.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>

              <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)' }}>
                <option value="all">Tüm Zorluklar</option>
                <option value="Kolay-Orta">Kolay-Orta</option>
                <option value="Orta">Orta</option>
                <option value="Orta-Zor">Orta-Zor</option>
                <option value="Zorlu">Zorlu</option>
                <option value="Ekstrem">Ekstrem</option>
              </select>

              <select value={seasonFilter} onChange={e => setSeasonFilter(e.target.value)} style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)' }}>
                <option value="all">Tüm Mevsimler</option>
                <option value="İlkbahar">İlkbahar</option>
                <option value="Yaz">Yaz</option>
                <option value="Güz">Güz</option>
                <option value="Kış">Kış</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-slate-500)' }}>
            Toplam {filteredJourneys.length} rota bulundu.
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
            {filteredJourneys.map(journey => (
              <Link key={journey.id} href={`/sites/travel/detail/${journey.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={journey.imageUrl} alt={journey.alt} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: 'var(--space-2)' }}>
                      <span style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                        {JOURNEY_CATEGORIES.find(c => c.key === journey.category)?.label || journey.category}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span style={{ backgroundColor: 'white', color: 'var(--color-slate-900)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                        {journey.difficulty}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--color-slate-500)', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-2)' }}>
                      <MapPin size={14} /> {journey.region}, {journey.country}
                    </div>
                    <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-1)', lineHeight: 1.3 }}>{journey.title}</h2>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-600)', marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {journey.subtitle}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)' }}>
                        <Clock size={14} /> {journey.duration.text}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)' }}>
                        <Users size={14} /> {journey.groupSize.text}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)' }}>
                        <Calendar size={14} /> {journey.bestSeasons.slice(0,2).join(', ')}{journey.bestSeasons.length > 2 ? '...' : ''}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-slate-100)', paddingTop: 'var(--space-4)' }}>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-violet-700)' }}>
                        {journey.displayPrice}
                      </div>
                      <ArrowRight size={18} style={{ color: 'var(--color-violet-500)' }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

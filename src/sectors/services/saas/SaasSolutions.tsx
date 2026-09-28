'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Quote,
} from 'lucide-react';
import { saasPlatformData } from '@/content/saas';
import { getPageRoute, getDetailRoute } from '../common/routes';
import { Button } from '@/core/ui';

interface SaasSolutionsProps {
  siteId: string;
}

export function SaasSolutions({ siteId }: SaasSolutionsProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const industries = useMemo(() => {
    return Array.from(new Set(saasPlatformData.useCases.map((u) => u.industry)));
  }, []);

  const filteredUseCases = useMemo(() => {
    if (selectedIndustry === 'all') return saasPlatformData.useCases;
    return saasPlatformData.useCases.filter((u) => u.industry === selectedIndustry);
  }, [selectedIndustry]);

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Header */}
      <header style={{ marginBottom: 'var(--sp-8)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', color: 'var(--c-accent)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', marginBottom: 'var(--sp-2)' }}>
          <TrendingUp size={16} />
          <span>Sektörel Çözümler</span>
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
          Saha Operasyonlarında Doğrulanmış Vaka Sonuçları
        </h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--c-fg-muted)', maxWidth: '850px', lineHeight: 'var(--leading-relaxed)' }}>
          Soğuk zincir lojistiğinden telekomünikasyon altyapı bakımına, hızlı tüketim dağıtımından mikro mobilite filo şarjına kadar 8 farklı kritik endüstride sağlanan ölçülebilir kazanımlar.
        </p>
      </header>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--sp-2)',
          padding: 'var(--sp-4)',
          background: 'var(--c-bg-subtle)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--c-fg-faint)', textTransform: 'uppercase', marginRight: 'var(--sp-2)' }}>
          <Filter size={14} /> Endüstri:
        </span>
        <button
          onClick={() => setSelectedIndustry('all')}
          style={{
            padding: 'var(--sp-1) var(--sp-3)',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid',
            borderColor: selectedIndustry === 'all' ? 'var(--c-accent)' : 'var(--c-border)',
            background: selectedIndustry === 'all' ? 'var(--c-accent)' : 'var(--c-bg)',
            color: selectedIndustry === 'all' ? 'var(--c-accent-fg)' : 'var(--c-fg)',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Tüm Sektörler ({saasPlatformData.useCases.length})
        </button>
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            style={{
              padding: 'var(--sp-1) var(--sp-3)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid',
              borderColor: selectedIndustry === ind ? 'var(--c-accent)' : 'var(--c-border)',
              background: selectedIndustry === ind ? 'var(--c-accent)' : 'var(--c-bg)',
              color: selectedIndustry === ind ? 'var(--c-accent-fg)' : 'var(--c-fg)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Solutions Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
        {filteredUseCases.map((uc) => (
          <article
            key={uc.slug}
            style={{
              padding: 'var(--sp-8)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--c-bg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-6)',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
              <div>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--c-accent)',
                    background: 'color-mix(in srgb, var(--c-accent) 10%, transparent)',
                    padding: 'var(--sp-1) var(--sp-2)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-block',
                    marginBottom: 'var(--sp-2)',
                  }}
                >
                  {uc.industry}
                </span>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--c-fg)' }}>
                  <a href={getDetailRoute(siteId, uc.slug)} style={{ color: 'inherit' }}>
                    {uc.title}
                  </a>
                </h2>
              </div>

              {/* Benchmarks tags */}
              <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
                {uc.benchmarkStats.map((st, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 'var(--sp-2) var(--sp-4)',
                      background: 'var(--c-bg-subtle)',
                      border: '1px solid var(--c-border)',
                      borderRadius: 'var(--radius-sm)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-accent)' }}>
                      {st.improvement}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>{st.metric}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge & Solution Side by Side */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
              <div style={{ padding: 'var(--sp-4)', background: 'var(--c-bg-subtle)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--c-fg-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 'var(--sp-1)' }}>
                  Operasyonel Darboğaz:
                </span>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)' }}>
                  {uc.challenge}
                </p>
              </div>

              <div style={{ padding: 'var(--sp-4)', background: 'color-mix(in srgb, var(--c-accent) 6%, transparent)', border: '1px solid var(--c-accent)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--c-accent)', textTransform: 'uppercase', display: 'block', marginBottom: 'var(--sp-1)' }}>
                  Platform Çözümü & Çıktı:
                </span>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg)', lineHeight: 'var(--leading-normal)' }}>
                  {uc.operationalOutcome}
                </p>
              </div>
            </div>

            {/* Bottom Row: Quote & Link */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-4)', borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-4)' }}>
              <div style={{ fontStyle: 'italic', fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', maxWidth: '650px' }}>
                "{uc.quote.text}" — <strong style={{ color: 'var(--c-fg)' }}>{uc.quote.authorRole}</strong> ({uc.quote.companyType})
              </div>

              <Button href={getDetailRoute(siteId, uc.slug)} variant="primary">
                Vaka Raporunu Gör <ArrowRight size={14} />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

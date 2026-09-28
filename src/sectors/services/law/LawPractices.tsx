'use client';

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Shield,
  Scale,
  ArrowRight,
  Filter,
  CheckCircle,
  Building,
} from 'lucide-react';
import { lawFirmData } from '@/content/law';
import { getPageRoute, getDetailRoute } from '../common/routes';
import { LegalDisclaimer } from '../common/Disclaimers';
import { Button } from '@/core/ui';

interface LawPracticesProps {
  siteId: string;
}

export function LawPractices({ siteId }: LawPracticesProps) {
  const [selectedSector, setSelectedSector] = useState<string>('all');

  // Extract all unique sectors across practices
  const allSectors = useMemo(() => {
    const set = new Set<string>();
    lawFirmData.practiceAreas.forEach((p) => {
      p.sectorsServed.forEach((s) => set.add(s));
    });
    return Array.from(set);
  }, []);

  const filteredPractices = useMemo(() => {
    if (selectedSector === 'all') return lawFirmData.practiceAreas;
    return lawFirmData.practiceAreas.filter((p) =>
      p.sectorsServed.includes(selectedSector)
    );
  }, [selectedSector]);

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Header */}
      <header style={{ marginBottom: 'var(--sp-8)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', color: 'var(--c-accent)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', marginBottom: 'var(--sp-2)' }}>
          <Briefcase size={16} />
          <span>Uzmanlık Alanlarımız</span>
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
          Kurumsal Hukuk ve Regülasyon Disiplinleri
        </h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--c-fg-muted)', maxWidth: '800px', lineHeight: 'var(--leading-relaxed)' }}>
          Şirketler topluluğu yeniden yapılandırmalarından sınır ötesi tahkim davalarına, algoritmik sistem uyumundan enerji proje finansmanına kadar 10 temel alanda derinlikli avukatlık ve danışmanlık hizmeti sunuyoruz.
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
          <Filter size={14} /> Sektöre Göre Filtrele:
        </span>
        <button
          onClick={() => setSelectedSector('all')}
          style={{
            padding: 'var(--sp-1) var(--sp-3)',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid',
            borderColor: selectedSector === 'all' ? 'var(--c-accent)' : 'var(--c-border)',
            background: selectedSector === 'all' ? 'var(--c-accent)' : 'var(--c-bg)',
            color: selectedSector === 'all' ? 'var(--c-accent-fg)' : 'var(--c-fg)',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Tüm Alanlar ({lawFirmData.practiceAreas.length})
        </button>
        {allSectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            style={{
              padding: 'var(--sp-1) var(--sp-3)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid',
              borderColor: selectedSector === sector ? 'var(--c-accent)' : 'var(--c-border)',
              background: selectedSector === sector ? 'var(--c-accent)' : 'var(--c-bg)',
              color: selectedSector === sector ? 'var(--c-accent-fg)' : 'var(--c-fg)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Practices List — Dossier-style layout, avoiding generic repetitive cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
        {filteredPractices.map((practice, index) => {
          const leadPartner = lawFirmData.teamMembers.find((m) => m.slug === practice.leadPartnerSlug);
          return (
            <article
              key={practice.slug}
              style={{
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--c-bg)',
                padding: 'var(--sp-6)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--sp-6)',
                transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
              }}
            >
              {/* Practice Summary & Scope */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--c-fg-faint)',
                        fontWeight: 600,
                      }}
                    >
                      DİSİPLİN #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-border-strong)' }}>&bull;</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>
                      {practice.regulatoryFramework.length} Mevzuat Dayanağı
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-3)' }}>
                    <a href={getDetailRoute(siteId, practice.slug)} style={{ color: 'inherit' }}>
                      {practice.title}
                    </a>
                  </h2>

                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-4)' }}>
                    {practice.summary}
                  </p>
                </div>

                {/* Scope points */}
                <div style={{ marginTop: 'var(--sp-2)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg-faint)', marginBottom: 'var(--sp-2)' }}>
                    Öne Çıkan Faaliyet Kapsamı:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                    {practice.scopeOfWork.slice(0, 3).map((item, idx) => (
                      <li key={idx} style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-2)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dossier Meta & Details link */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderLeft: '1px solid var(--c-border)',
                  paddingLeft: 'var(--sp-6)',
                  background: 'var(--c-bg-subtle)',
                  margin: 'calc(var(--sp-6) * -1)',
                  marginLeft: 0,
                  padding: 'var(--sp-6)',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg-faint)', marginBottom: 'var(--sp-2)' }}>
                    Hizmet Verilen Sektörler:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', marginBottom: 'var(--sp-4)' }}>
                    {practice.sectorsServed.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: 'var(--text-xs)',
                          background: 'var(--c-bg)',
                          border: '1px solid var(--c-border)',
                          padding: 'var(--sp-1) var(--sp-2)',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {leadPartner && (
                    <div style={{ marginTop: 'var(--sp-3)', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--c-border)' }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>Sorumlu Ortak:</div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-fg)' }}>
                        {leadPartner.name} ({leadPartner.title})
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 'var(--sp-6)', display: 'flex', gap: 'var(--sp-3)' }}>
                  <Button href={getDetailRoute(siteId, practice.slug)} variant="primary">
                    Detaylı İncele <ArrowRight size={14} />
                  </Button>
                  <Button href={getPageRoute(siteId, 'contact')} variant="ghost">
                    Danışma İste
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <LegalDisclaimer />
    </div>
  );
}

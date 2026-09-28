'use client';

import React from 'react';
import {
  Cpu,
  Zap,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  Terminal,
} from 'lucide-react';
import { saasPlatformData } from '@/content/saas';
import { getPageRoute, getDetailRoute } from '../common/routes';
import { Button } from '@/core/ui';

interface SaasProductProps {
  siteId: string;
}

export function SaasProduct({ siteId }: SaasProductProps) {
  const { modules } = saasPlatformData;

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Header */}
      <header style={{ marginBottom: 'var(--sp-8)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', color: 'var(--c-accent)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', marginBottom: 'var(--sp-2)' }}>
          <Layers size={16} />
          <span>Platform Mimarisi</span>
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
          Çekirdek Operasyon Modülleri ve Altyapı Motorları
        </h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--c-fg-muted)', maxWidth: '850px', lineHeight: 'var(--leading-relaxed)' }}>
          VektörOps altyapısı, her biri bağımsız olarak yatayda ölçeklenebilen, gRPC ve WebSocket protokolleri üzerinden mikrosaniye seviyesinde haberleşen 6 çekirdek modülden oluşur.
        </p>
      </header>

      {/* Modules List — Dense, technical, product-like bento/card structure */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
        {modules.map((mod, idx) => (
          <article
            key={mod.slug}
            style={{
              padding: 'var(--sp-8)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--c-bg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--sp-8)',
              alignItems: 'start',
            }}
          >
            {/* Left: Module Info & Capabilities */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-accent)',
                    fontWeight: 700,
                    background: 'color-mix(in srgb, var(--c-accent) 10%, transparent)',
                    padding: 'var(--sp-1) var(--sp-2)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  MODÜL #{String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', fontFamily: 'var(--font-mono)' }}>
                  {mod.technicalSpecs.protocol}
                </span>
              </div>

              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-2)' }}>
                <a href={getDetailRoute(siteId, mod.slug)} style={{ color: 'inherit' }}>
                  {mod.name}
                </a>
              </h2>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-4)' }}>
                {mod.shortDescription}
              </p>

              {/* Capabilities checklist */}
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg-faint)', marginBottom: 'var(--sp-2)' }}>
                  Öne Çıkan Kabiliyetler:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  {mod.capabilities.slice(0, 3).map((cap, cIdx) => (
                    <li key={cIdx} style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-2)' }}>
                      <span style={{ color: 'var(--c-accent)', fontWeight: 700 }}>&rarr;</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)' }}>
                <Button href={getDetailRoute(siteId, mod.slug)} variant="primary">
                  Mimari Detayları <ArrowRight size={14} />
                </Button>
                <Button href={getPageRoute(siteId, 'docs')} variant="ghost">
                  SDK Dokümanları
                </Button>
              </div>
            </div>

            {/* Right: Technical Specs & Metric Impact Box */}
            <div
              style={{
                padding: 'var(--sp-6)',
                background: 'var(--c-bg-subtle)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--c-border)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg-faint)' }}>
                  Ölçülen Performans
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={13} /> {mod.metricsImpact.value}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)', fontSize: 'var(--text-xs)' }}>
                <div>
                  <span style={{ color: 'var(--c-fg-faint)', display: 'block', marginBottom: '2px' }}>Uçtan Uca Gecikme</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-fg)' }}>{mod.technicalSpecs.latency}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--c-fg-faint)', display: 'block', marginBottom: '2px' }}>Ölçeklenme</span>
                  <strong style={{ color: 'var(--c-fg)' }}>{mod.technicalSpecs.scalability}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--c-fg-faint)', display: 'block', marginBottom: '2px' }}>İletişim Protokolü</span>
                  <strong style={{ color: 'var(--c-fg)' }}>{mod.technicalSpecs.protocol}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--c-fg-faint)', display: 'block', marginBottom: '2px' }}>Sertifikasyon</span>
                  <strong style={{ color: 'var(--c-fg)' }}>{mod.technicalSpecs.compliance}</strong>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--sp-3)',
                  background: 'var(--c-bg)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--c-fg-muted)',
                  lineHeight: 'var(--leading-normal)',
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--c-fg)', marginBottom: '2px' }}>Saha Çıktısı:</div>
                {mod.metricsImpact.label}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

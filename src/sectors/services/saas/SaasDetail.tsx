'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Terminal,
  Activity,
  Shield,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  TrendingUp,
  Quote,
  Server,
} from 'lucide-react';
import { saasPlatformData, SaasProductModule, SaasUseCase } from '@/content/saas';
import { getPageRoute, getDetailRoute } from '../common/routes';
import { Button } from '@/core/ui';

interface SaasDetailProps {
  siteId: string;
  itemSlug: string;
}

export function SaasDetail({ siteId, itemSlug }: SaasDetailProps) {
  const moduleItem = saasPlatformData.modules.find((m) => m.slug === itemSlug);
  const useCaseItem = saasPlatformData.useCases.find((u) => u.slug === itemSlug);

  if (moduleItem) {
    return <ModuleDetail siteId={siteId} module={moduleItem} />;
  }

  if (useCaseItem) {
    return <UseCaseDetail siteId={siteId} useCase={useCaseItem} />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--sp-12) var(--sp-4)', textAlign: 'center' }}>
      <Cpu size={48} style={{ margin: '0 auto var(--sp-4)', color: 'var(--c-fg-faint)' }} />
      <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-2)' }}>Platform Bileşeni Bulunamadı</h2>
      <p style={{ color: 'var(--c-fg-muted)', marginBottom: 'var(--sp-6)' }}>
        Belirtilen modül veya senaryo kaydı platform dizinimizde bulunamadı.
      </p>
      <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center' }}>
        <Button href={getPageRoute(siteId, 'product')} variant="outline">
          Modüllere Dön
        </Button>
        <Button href={getPageRoute(siteId, 'solutions')} variant="ghost">
          Çözümlere Dön
        </Button>
      </div>
    </div>
  );
}

function ModuleDetail({ siteId, module }: { siteId: string; module: SaasProductModule }) {
  const [copied, setCopied] = useState(false);

  const sampleCode = `// VektörOps ${module.name} SDK Entegrasyonu
import { createVectorClient } from '@vektorops/sdk-node';

const client = createVectorClient({
  endpoint: 'grpc.vektorops.internal:443',
  apiKey: process.env.VEKTOR_API_KEY,
  clusterRegion: 'eu-central-1',
  protocol: '${module.technicalSpecs.protocol}'
});

// Modül Başlatma & Akış Dinleme
const stream = await client.modules['${module.slug}'].subscribe({
  qos: 'exactly-once',
  maxBatchLatencyMs: 15,
  telemetryFilter: { status: 'ACTIVE' }
});

stream.on('event', (data) => {
  console.log('[Telemetry]: İşlenen veri paketi', data.taskId);
});`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article style={{ maxWidth: '1080px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Sayfa yolu" style={{ marginBottom: 'var(--sp-6)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
        <a href={getPageRoute(siteId, '')} style={{ color: 'inherit' }}>Platform</a>
        <ChevronRight size={14} />
        <a href={getPageRoute(siteId, 'product')} style={{ color: 'inherit' }}>Çekirdek Modüller</a>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--c-fg)' }}>{module.name}</span>
      </nav>

      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--c-border)',
          paddingBottom: 'var(--sp-8)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', color: 'var(--c-accent)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', marginBottom: 'var(--sp-3)' }}>
          <Cpu size={16} />
          <span>Sistem Mimarisi Bileşeni</span>
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
          {module.name}
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', maxWidth: '850px' }}>
          {module.tagline}
        </p>

        {/* Impact Bar */}
        <div
          style={{
            marginTop: 'var(--sp-6)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--sp-4)',
            padding: 'var(--sp-3) var(--sp-5)',
            background: 'color-mix(in srgb, var(--c-accent) 8%, transparent)',
            border: '1px solid var(--c-accent)',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          <Zap size={18} style={{ color: 'var(--c-accent)' }} />
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--c-fg)' }}>
            Ölçülen Etki: {module.metricsImpact.value}
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>
            ({module.metricsImpact.label})
          </span>
        </div>
      </header>

      {/* Grid: Details & Tech Specs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--sp-10)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Architecture & Capabilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
          <section>
            <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-3)' }}>
              İşlevsel Mimari Açıklaması
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-4)' }}>
              {module.shortDescription}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
              {module.architectureDetails}
            </p>
          </section>

          {/* Capabilities Checklist */}
          <section
            style={{
              padding: 'var(--sp-6)',
              background: 'var(--c-bg-subtle)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg)', marginBottom: 'var(--sp-4)' }}>
              Çekirdek Kabiliyetler ve Protokoller
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {module.capabilities.map((cap, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-3)', fontSize: 'var(--text-sm)', color: 'var(--c-fg)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Code Integration Terminal */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg)' }}>
                <Terminal size={14} style={{ color: 'var(--c-accent)' }} />
                <span>Entegrasyon SDK Örneği</span>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--sp-1) var(--sp-2)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--c-fg-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-1)',
                }}
              >
                {copied ? <Check size={12} style={{ color: 'var(--c-accent)' }} /> : <Copy size={12} />}
                <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
              </button>
            </div>
            <pre
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                padding: 'var(--sp-4)',
                background: 'var(--c-bg-subtle)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md)',
                overflowX: 'auto',
                lineHeight: 1.6,
                color: 'var(--c-fg)',
              }}
            >
              <code>{sampleCode}</code>
            </pre>
          </section>
        </div>

        {/* Right Column: Technical Specs Card */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <div
            style={{
              padding: 'var(--sp-6)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--c-bg)',
            }}
          >
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg-faint)', marginBottom: 'var(--sp-4)' }}>
              Teknik Altyapı Parametreleri
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>Maksimum Uçtan Uca Gecikme</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-accent)' }}>
                  {module.technicalSpecs.latency}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-3)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>Protokol ve İletişim Arayüzü</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-fg)' }}>
                  {module.technicalSpecs.protocol}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-3)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>Yatay Ölçeklenme Sınırı</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-fg)' }}>
                  {module.technicalSpecs.scalability}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-3)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>Güvenlik ve Regülasyon Uyumu</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-fg)' }}>
                  {module.technicalSpecs.compliance}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div
            style={{
              padding: 'var(--sp-6)',
              background: 'var(--c-bg-subtle)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-3)',
            }}
          >
            <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--c-fg)' }}>
              Canlı Kümede Test Edin
            </h4>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>
              VektörOps API anahtarı alarak bu modülü sandbox ortamında kendi telemetri verinizle test edebilirsiniz.
            </p>
            <Button href={getPageRoute(siteId, 'pricing')} variant="primary">
              30 Günlük Pilot Talep Et
            </Button>
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 'var(--sp-8)', borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-6)' }}>
        <Button href={getPageRoute(siteId, 'product')} variant="outline">
          <ArrowLeft size={16} /> Tüm Modüllere Dön
        </Button>
      </div>
    </article>
  );
}

function UseCaseDetail({ siteId, useCase }: { siteId: string; useCase: SaasUseCase }) {
  return (
    <article style={{ maxWidth: '980px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Sayfa yolu" style={{ marginBottom: 'var(--sp-6)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
        <a href={getPageRoute(siteId, '')} style={{ color: 'inherit' }}>Platform</a>
        <ChevronRight size={14} />
        <a href={getPageRoute(siteId, 'solutions')} style={{ color: 'inherit' }}>Sektörel Çözümler</a>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--c-fg)' }}>{useCase.industry}</span>
      </nav>

      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--c-border)',
          paddingBottom: 'var(--sp-8)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--c-accent)',
            letterSpacing: 'var(--tracking-caps)',
            marginBottom: 'var(--sp-3)',
          }}
        >
          {useCase.industry} Sektör Senaryosu
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 'var(--leading-tight)',
            color: 'var(--c-fg)',
            marginBottom: 'var(--sp-4)',
          }}
        >
          {useCase.title}
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
          {useCase.operationalOutcome}
        </p>
      </header>

      {/* Benchmarks strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--sp-4)',
          padding: 'var(--sp-6)',
          background: 'var(--c-bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--c-border)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        {useCase.benchmarkStats.map((stat, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
              {stat.metric}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--c-accent)' }}>
              {stat.improvement}
            </span>
          </div>
        ))}
      </div>

      {/* Challenge vs Solution */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--sp-8)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        <section
          style={{
            padding: 'var(--sp-6)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--c-bg)',
          }}
        >
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: '#ef4444', marginBottom: 'var(--sp-3)' }}>
            Operasyonel Zorluk & Darboğaz
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
            {useCase.challenge}
          </p>
        </section>

        <section
          style={{
            padding: 'var(--sp-6)',
            border: '1px solid var(--c-accent)',
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in srgb, var(--c-accent) 4%, transparent)',
          }}
        >
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-accent)', marginBottom: 'var(--sp-3)' }}>
            VektörOps Mimari Çözümü
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg)', lineHeight: 'var(--leading-relaxed)' }}>
            {useCase.solution}
          </p>
        </section>
      </div>

      {/* Workflows */}
      <section
        style={{
          padding: 'var(--sp-6)',
          background: 'var(--c-bg-subtle)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg)', marginBottom: 'var(--sp-4)' }}>
          Kritik İş Akışları (Key Workflows)
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {useCase.keyWorkflows.map((wf, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-3)', fontSize: 'var(--text-sm)', color: 'var(--c-fg)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '2px' }} />
              <span>{wf}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Quote */}
      <blockquote
        style={{
          padding: 'var(--sp-6)',
          background: 'var(--c-bg)',
          border: '1px solid var(--c-border)',
          borderLeft: '4px solid var(--c-accent)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        <p style={{ fontSize: 'var(--text-md)', fontStyle: 'italic', color: 'var(--c-fg)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-3)' }}>
          "{useCase.quote.text}"
        </p>
        <footer style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>
          <strong>{useCase.quote.authorRole}</strong> &bull; {useCase.quote.companyType}
        </footer>
      </blockquote>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-6)' }}>
        <Button href={getPageRoute(siteId, 'solutions')} variant="outline">
          <ArrowLeft size={16} /> Tüm Çözümlere Dön
        </Button>
        <Button href={getPageRoute(siteId, 'pricing')} variant="primary">
          Benzer Bir Senaryoyu Hayata Geçirin
        </Button>
      </div>
    </article>
  );
}

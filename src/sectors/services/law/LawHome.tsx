'use client';

import React from 'react';
import {
  Scale,
  Shield,
  Briefcase,
  Users,
  BookOpen,
  ArrowRight,
  FileCheck2,
  Globe2,
  Building,
} from 'lucide-react';
import { lawFirmData } from '@/content/law';
import { getPageRoute, getDetailRoute } from '../common/routes';
import { LegalDisclaimer } from '../common/Disclaimers';
import { Button } from '@/core/ui';

interface LawHomeProps {
  siteId: string;
}

export function LawHome({ siteId }: LawHomeProps) {
  const { brand } = lawFirmData;
  const featuredPractices = lawFirmData.practiceAreas.slice(0, 6);
  const featuredPubs = lawFirmData.publications.slice(0, 3);

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Hero Section */}
      <section
        style={{
          paddingBlock: 'var(--sp-12) var(--sp-10)',
          borderBottom: '1px solid var(--c-border)',
          marginBottom: 'var(--sp-12)',
        }}
      >
        <div style={{ maxWidth: '920px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--sp-2)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-caps)',
              color: 'var(--c-accent)',
              marginBottom: 'var(--sp-4)',
            }}
          >
            <Scale size={16} />
            <span>{brand.registeredName} &bull; Kuruluş {brand.foundingYear}</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--c-fg)',
              marginBottom: 'var(--sp-6)',
            }}
          >
            {brand.heroHeadline}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--c-fg-muted)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--sp-8)',
              maxWidth: '820px',
            }}
          >
            {brand.heroSubheadline}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
            <Button href={getPageRoute(siteId, 'contact')} variant="primary">
              Ön Danışma ve Görüşme Talebi <ArrowRight size={16} />
            </Button>
            <Button href={getPageRoute(siteId, 'practices')} variant="outline">
              10 Faaliyet Disiplinini İnceleyin
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--sp-6)',
          padding: 'var(--sp-8)',
          background: 'var(--c-bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--c-border)',
          marginBottom: 'var(--sp-12)',
        }}
      >
        {brand.stats.map((st) => (
          <div key={st.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg-faint)' }}>
              {st.label}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--c-fg)' }}>
              {st.value}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)' }}>
              {st.detail}
            </span>
          </div>
        ))}
      </section>

      {/* Practice Areas Highlight */}
      <section style={{ marginBottom: 'var(--sp-12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--sp-6)', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', color: 'var(--c-accent)', marginBottom: 'var(--sp-1)' }}>
              Hukuki Uzmanlıklar
            </div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--c-fg)' }}>
              Öne Çıkan Faaliyet Alanları
            </h2>
          </div>
          <Button href={getPageRoute(siteId, 'practices')} variant="ghost">
            Tüm 10 Disiplini Gör <ArrowRight size={14} />
          </Button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          {featuredPractices.map((practice) => (
            <div
              key={practice.slug}
              style={{
                padding: 'var(--sp-6)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--c-bg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--dur-fast) var(--ease-out)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
                    {practice.sectorsServed[0]}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', fontFamily: 'var(--font-mono)' }}>
                    {practice.scopeOfWork.length} Kapsam
                  </span>
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-2)' }}>
                  <a href={getDetailRoute(siteId, practice.slug)} style={{ color: 'inherit' }}>
                    {practice.title}
                  </a>
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-4)' }}>
                  {practice.summary}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
                  {practice.regulatoryFramework[0]}
                </span>
                <a
                  href={getDetailRoute(siteId, practice.slug)}
                  style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-accent)', display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}
                >
                  İncele <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Managing Partner Statement / Institutional Dossier */}
      <section
        style={{
          padding: 'var(--sp-8)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--c-bg-subtle)',
          marginBottom: 'var(--sp-12)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--sp-8)',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', color: 'var(--c-accent)', display: 'block', marginBottom: 'var(--sp-2)' }}>
            Kurumsal Yönetim İlkeleri
          </span>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-3)' }}>
            Bağımsız Denetim ve Çıkar Çatışması Hassasiyeti
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-4)' }}>
            Demirbağ & Ortakları olarak, her yeni vekalet veya danışmanlık talebini kabul etmeden önce katı çıkar çatışması filtrelerimizden geçiririz. Müvekkillerimizin stratejik hedeflerini, kanunun lafzı ve ruhuna sadakatle, ticari gerçekçilikten kopmadan koruruz.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', fontSize: 'var(--text-xs)', color: 'var(--c-fg)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
              <FileCheck2 size={16} style={{ color: 'var(--c-accent)' }} /> TBB Meslek İlkeleri
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
              <Globe2 size={16} style={{ color: 'var(--c-accent)' }} /> IBA Uyum Standartları
            </span>
          </div>
        </div>

        <div
          style={{
            padding: 'var(--sp-6)',
            background: 'var(--c-bg)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--c-accent)',
          }}
        >
          <blockquote style={{ fontSize: 'var(--text-sm)', fontStyle: 'italic', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-3)' }}>
            "Büyük sermaye işlemlerinde asıl başarı, yalnızca sözleşmeyi imzalamak değil; beş ya da on yıl sonra ortaya çıkabilecek regülatif riskleri bugünden bertaraf edebilmektir."
          </blockquote>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--c-fg)' }}>
            Dr. Av. Melis Demirbağ
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
            Yönetici Ortak &bull; İstanbul Barosu Sicil No: 34120
          </div>
        </div>
      </section>

      {/* Publications Preview */}
      <section style={{ marginBottom: 'var(--sp-12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--sp-6)', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', color: 'var(--c-accent)', marginBottom: 'var(--sp-1)' }}>
              Güncel Mevzuat
            </div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--c-fg)' }}>
              Hukuki İncelemeler & Bülten
            </h2>
          </div>
          <Button href={getPageRoute(siteId, 'publications')} variant="ghost">
            Tüm 12 Yayını Gör <ArrowRight size={14} />
          </Button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          {featuredPubs.map((pub) => (
            <article
              key={pub.slug}
              style={{
                padding: 'var(--sp-6)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--c-bg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', marginBottom: 'var(--sp-2)' }}>
                  <span style={{ color: 'var(--c-accent)', fontWeight: 600 }}>{pub.category}</span>
                  <span>{pub.publishedAt}</span>
                </div>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-2)' }}>
                  <a href={getDetailRoute(siteId, pub.slug)} style={{ color: 'inherit' }}>
                    {pub.title}
                  </a>
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-4)' }}>
                  {pub.excerpt.slice(0, 140)}...
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--text-xs)' }}>
                <span style={{ color: 'var(--c-fg-faint)' }}>{pub.readTimeMinutes} dk okuma</span>
                <a href={getDetailRoute(siteId, pub.slug)} style={{ color: 'var(--c-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  Oku <ArrowRight size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Offices Bar */}
      <section
        style={{
          padding: 'var(--sp-8)',
          background: 'var(--c-bg-subtle)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--sp-8)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--sp-6)',
        }}
      >
        <div>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
            İstanbul & Ankara Merkezlerimizden Hizmet Sunuyoruz
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>
            Levent Kanyon Ofis Bloğu ve Çankaya Arjantin Caddesi lokasyonlarımızda kurumsal görüşme randevuları oluşturabilirsiniz.
          </p>
        </div>
        <Button href={getPageRoute(siteId, 'contact')} variant="primary">
          İletişim ve Ön Değerlendirme
        </Button>
      </section>

      <LegalDisclaimer />
    </div>
  );
}

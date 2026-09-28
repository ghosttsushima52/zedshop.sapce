'use client';

import React from 'react';
import {
  ArrowLeft,
  Briefcase,
  FileText,
  Scale,
  Shield,
  Clock,
  Calendar,
  User,
  Building2,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { lawFirmData, LawPracticeArea, LawPublication } from '@/content/law';
import { getPageRoute, getDetailRoute } from '../common/routes';
import { LegalDisclaimer } from '../common/Disclaimers';
import { Button } from '@/core/ui';

interface LawDetailProps {
  siteId: string;
  itemSlug: string;
}

export function LawDetail({ siteId, itemSlug }: LawDetailProps) {
  const practice = lawFirmData.practiceAreas.find((p) => p.slug === itemSlug);
  const publication = lawFirmData.publications.find((pub) => pub.slug === itemSlug);

  if (practice) {
    return <PracticeDetail siteId={siteId} practice={practice} />;
  }

  if (publication) {
    return <PublicationDetail siteId={siteId} publication={publication} />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--sp-12) var(--sp-4)', textAlign: 'center' }}>
      <Scale size={48} style={{ margin: '0 auto var(--sp-4)', color: 'var(--c-fg-faint)' }} />
      <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-2)' }}>Hukuki Kayıt Bulunamadı</h2>
      <p style={{ color: 'var(--c-fg-muted)', marginBottom: 'var(--sp-6)' }}>
        Aradığınız uzmanlık alanı veya yayın kaydı arşivlerimizde yer almamaktadır veya yayından kaldırılmıştır.
      </p>
      <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center' }}>
        <Button href={getPageRoute(siteId, 'practices')} variant="outline">
          Uzmanlık Alanlarına Dön
        </Button>
        <Button href={getPageRoute(siteId, 'publications')} variant="ghost">
          Yayın Bültenine Dön
        </Button>
      </div>
    </div>
  );
}

function PracticeDetail({ siteId, practice }: { siteId: string; practice: LawPracticeArea }) {
  const leadPartner = lawFirmData.teamMembers.find((m) => m.slug === practice.leadPartnerSlug);

  return (
    <article style={{ maxWidth: '1080px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Sayfa yolu" style={{ marginBottom: 'var(--sp-6)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
        <a href={getPageRoute(siteId, '')} style={{ color: 'inherit' }}>Büro Profili</a>
        <ChevronRight size={14} />
        <a href={getPageRoute(siteId, 'practices')} style={{ color: 'inherit' }}>Uzmanlık Alanları</a>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--c-fg)' }}>{practice.title}</span>
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
          <Briefcase size={16} />
          <span>Faaliyet Disiplini</span>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 'var(--leading-snug)',
            color: 'var(--c-fg)',
            marginBottom: 'var(--sp-4)',
          }}
        >
          {practice.title}
        </h1>
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--c-fg-muted)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: '850px',
          }}
        >
          {practice.summary}
        </p>
      </header>

      {/* Main Grid: Overview + Sidebar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--sp-10)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Scope & Matters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
          {/* Detailed Overview */}
          <section>
            <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 700, marginBottom: 'var(--sp-3)', color: 'var(--c-fg)' }}>
              Uygulama Çerçevesi ve Stratejik Yaklaşım
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
              {practice.detailedOverview}
            </p>
          </section>

          {/* Scope of Work */}
          <section
            style={{
              padding: 'var(--sp-6)',
              background: 'var(--c-bg-subtle)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg)', marginBottom: 'var(--sp-4)' }}>
              Hukuki Hizmet Kapsamı (Scope of Work)
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {practice.scopeOfWork.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-3)', fontSize: 'var(--text-sm)', color: 'var(--c-fg)' }}>
                  <Shield size={16} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '3px' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Representative Matters */}
          {practice.representativeMatters.length > 0 && (
            <section>
              <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-3)' }}>
                Temsil Edilen Tipik Süreçler ve Dosyalar
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {practice.representativeMatters.map((matter, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 'var(--sp-4)',
                      borderLeft: '3px solid var(--c-accent)',
                      background: 'var(--c-bg-subtle)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--c-fg-muted)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {matter}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Lead Partner, Sectors, Regulatory Framework */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          {/* Lead Partner Card */}
          {leadPartner && (
            <div
              style={{
                padding: 'var(--sp-6)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--c-bg)',
              }}
            >
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', marginBottom: 'var(--sp-3)' }}>
                Sorumlu Ortak Avukat
              </div>
              <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                {leadPartner.name}
              </h4>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-accent)', fontWeight: 600, marginBottom: 'var(--sp-3)' }}>
                {leadPartner.title} &bull; {leadPartner.barAssociation} (Sicil: {leadPartner.barNumber})
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--sp-4)' }}>
                {leadPartner.biography.slice(0, 160)}...
              </p>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
                Doğrudan İletişim: <span style={{ color: 'var(--c-fg)' }}>{leadPartner.directEmail}</span>
              </div>
            </div>
          )}

          {/* Sectors Served */}
          <div
            style={{
              padding: 'var(--sp-6)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--c-bg-subtle)',
            }}
          >
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg)', marginBottom: 'var(--sp-3)' }}>
              Odak Endüstriler
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {practice.sectorsServed.map((sec) => (
                <span
                  key={sec}
                  style={{
                    padding: 'var(--sp-1) var(--sp-2)',
                    background: 'var(--c-bg)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--c-fg)',
                  }}
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>

          {/* Regulatory Framework */}
          <div
            style={{
              padding: 'var(--sp-6)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--c-bg-subtle)',
            }}
          >
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg)', marginBottom: 'var(--sp-3)' }}>
              Temel Mevzuat Dayanakları
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              {practice.regulatoryFramework.map((reg, idx) => (
                <li key={idx} style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                  <Scale size={14} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
                  <span>{reg}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation CTA */}
          <div
            style={{
              padding: 'var(--sp-6)',
              border: '1px solid var(--c-accent)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--c-accent) 6%, transparent)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-3)',
            }}
          >
            <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--c-fg)' }}>
              Gizlilik Kapsamında Danışma
            </h4>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)' }}>
              Bu alanda şirketiniz için ön inceleme ve çıkar çatışması taraması talep edebilirsiniz.
            </p>
            <Button href={getPageRoute(siteId, 'contact')} variant="primary">
              Ön Görüşme Talebi İletin
            </Button>
          </div>
        </aside>
      </div>

      <LegalDisclaimer />
    </article>
  );
}

function PublicationDetail({ siteId, publication }: { siteId: string; publication: LawPublication }) {
  const author = lawFirmData.teamMembers.find((m) => m.slug === publication.authorSlug);

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Sayfa yolu" style={{ marginBottom: 'var(--sp-6)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
        <a href={getPageRoute(siteId, '')} style={{ color: 'inherit' }}>Büro Profili</a>
        <ChevronRight size={14} />
        <a href={getPageRoute(siteId, 'publications')} style={{ color: 'inherit' }}>Hukuki Yayınlar</a>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--c-fg)' }}>{publication.category}</span>
      </nav>

      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--c-border)',
          paddingBottom: 'var(--sp-8)',
          marginBottom: 'var(--sp-8)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
          <span
            style={{
              padding: 'var(--sp-1) var(--sp-3)',
              background: 'var(--c-bg-subtle)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-pill)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--c-accent)',
            }}
          >
            {publication.category}
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
            <Calendar size={13} /> {publication.publishedAt}
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
            <Clock size={13} /> {publication.readTimeMinutes} dk okuma
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 'var(--leading-tight)',
            color: 'var(--c-fg)',
            marginBottom: 'var(--sp-4)',
          }}
        >
          {publication.title}
        </h1>

        <p
          style={{
            fontSize: 'var(--text-md)',
            color: 'var(--c-fg-muted)',
            fontStyle: 'italic',
            lineHeight: 'var(--leading-relaxed)',
            borderLeft: '3px solid var(--c-border-strong)',
            paddingLeft: 'var(--sp-4)',
          }}
        >
          {publication.excerpt}
        </p>

        {author && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginTop: 'var(--sp-6)' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--c-bg-subtle)',
                border: '1px solid var(--c-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--c-fg-muted)',
              }}
            >
              <User size={20} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--c-fg)' }}>{author.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>
                {author.title} &bull; {author.barAssociation} (Sicil: {author.barNumber})
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Article Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--c-fg)' }}>
        {publication.content.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* Citations Box */}
      {publication.legalCitations.length > 0 && (
        <div
          style={{
            marginBlock: 'var(--sp-8)',
            padding: 'var(--sp-6)',
            background: 'var(--c-bg-subtle)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg)', marginBottom: 'var(--sp-3)' }}>
            <Scale size={16} style={{ color: 'var(--c-accent)' }} />
            <span>Hukuki Atıflar ve İçtihat Referansları</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {publication.legalCitations.map((cite, idx) => (
              <li
                key={idx}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--c-fg-muted)',
                  padding: 'var(--sp-2) var(--sp-3)',
                  background: 'var(--c-bg)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {cite}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {publication.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', marginBottom: 'var(--sp-8)' }}>
          {publication.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--c-fg-faint)',
                background: 'var(--c-bg-subtle)',
                padding: 'var(--sp-1) var(--sp-2)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer Back action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--c-border)', paddingTop: 'var(--sp-6)' }}>
        <Button href={getPageRoute(siteId, 'publications')} variant="outline">
          <ArrowLeft size={16} /> Tüm Yayınlara Dön
        </Button>
        <Button href={getPageRoute(siteId, 'contact')} variant="ghost">
          Bu Konuda Görüşme İsteyin
        </Button>
      </div>

      <LegalDisclaimer />
    </article>
  );
}

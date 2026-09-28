'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  Award,
  GraduationCap,
  Globe,
  Mail,
  Phone,
  BookOpen,
  Filter,
} from 'lucide-react';
import { lawFirmData } from '@/content/law';
import { getPageRoute, getDetailRoute } from '../common/routes';
import { LegalDisclaimer } from '../common/Disclaimers';
import { Button } from '@/core/ui';

interface LawTeamProps {
  siteId: string;
}

export function LawTeam({ siteId }: LawTeamProps) {
  const [selectedSeniority, setSelectedSeniority] = useState<string>('all');

  const seniorityOptions = useMemo(() => {
    const list = Array.from(new Set(lawFirmData.teamMembers.map((m) => m.seniority)));
    return list;
  }, []);

  const filteredMembers = useMemo(() => {
    if (selectedSeniority === 'all') return lawFirmData.teamMembers;
    return lawFirmData.teamMembers.filter((m) => m.seniority === selectedSeniority);
  }, [selectedSeniority]);

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Header */}
      <header style={{ marginBottom: 'var(--sp-8)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', color: 'var(--c-accent)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', marginBottom: 'var(--sp-2)' }}>
          <Users size={16} />
          <span>Avukatlık Ortaklığı & Danışmanlar</span>
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
          Hukuk Kadromuz ve Danışman Kurulumuz
        </h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--c-fg-muted)', maxWidth: '800px', lineHeight: 'var(--leading-relaxed)' }}>
          Kıdemli ortaklarımız, bağımsız tahkim hakemlerimiz ve regülasyon danışmanlarımızla çok uluslu ve yerel kurumsal müvekkillere en yüksek etik ve hukuki standartlarda rehberlik ediyoruz.
        </p>
      </header>

      {/* Seniority Filter */}
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
          <Filter size={14} /> Kıdeme Göre:
        </span>
        <button
          onClick={() => setSelectedSeniority('all')}
          style={{
            padding: 'var(--sp-1) var(--sp-3)',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid',
            borderColor: selectedSeniority === 'all' ? 'var(--c-accent)' : 'var(--c-border)',
            background: selectedSeniority === 'all' ? 'var(--c-accent)' : 'var(--c-bg)',
            color: selectedSeniority === 'all' ? 'var(--c-accent-fg)' : 'var(--c-fg)',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Tüm Ekip ({lawFirmData.teamMembers.length})
        </button>
        {seniorityOptions.map((sen) => (
          <button
            key={sen}
            onClick={() => setSelectedSeniority(sen)}
            style={{
              padding: 'var(--sp-1) var(--sp-3)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid',
              borderColor: selectedSeniority === sen ? 'var(--c-accent)' : 'var(--c-border)',
              background: selectedSeniority === sen ? 'var(--c-accent)' : 'var(--c-bg)',
              color: selectedSeniority === sen ? 'var(--c-accent-fg)' : 'var(--c-fg)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {sen}
          </button>
        ))}
      </div>

      {/* Team Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--sp-6)',
        }}
      >
        {filteredMembers.map((member) => (
          <article
            key={member.slug}
            style={{
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--c-bg)',
              padding: 'var(--sp-6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Seniority badge & Bar Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-3)' }}>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-wide)',
                    color: 'var(--c-accent)',
                    background: 'color-mix(in srgb, var(--c-accent) 10%, transparent)',
                    padding: 'var(--sp-1) var(--sp-2)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {member.seniority}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', fontFamily: 'var(--font-mono)' }}>
                  Sicil: {member.barNumber}
                </span>
              </div>

              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                {member.name}
              </h2>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', marginBottom: 'var(--sp-3)' }}>
                {member.title} &bull; {member.barAssociation} ({member.admittedYear} Baro Girişli)
              </div>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-4)' }}>
                {member.biography}
              </p>

              {/* Education list */}
              <div style={{ marginBottom: 'var(--sp-4)', padding: 'var(--sp-3)', background: 'var(--c-bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)' }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--c-fg-faint)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', display: 'flex', alignItems: 'center', gap: 'var(--sp-1)', marginBottom: 'var(--sp-2)' }}>
                  <GraduationCap size={14} /> Hukuk ve Akademik Geçmiş
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
                  {member.education.map((edu, idx) => (
                    <li key={idx} style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg)' }}>
                      <strong>{edu.degree}</strong> &bull; {edu.institution} ({edu.year})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages & Memberships */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', marginBottom: 'var(--sp-4)', fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                  <Globe size={14} style={{ color: 'var(--c-fg-faint)', flexShrink: 0 }} />
                  <span>Diller: {member.languages.join(', ')}</span>
                </div>
                {member.academicMemberships.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-2)' }}>
                    <Award size={14} style={{ color: 'var(--c-fg-faint)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Üyelikler: {member.academicMemberships.join('; ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Direct contact footer */}
            <div
              style={{
                borderTop: '1px solid var(--c-border)',
                paddingTop: 'var(--sp-3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'var(--text-xs)',
              }}
            >
              <a
                href={`mailto:${member.directEmail}`}
                style={{
                  color: 'var(--c-fg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-1)',
                  textDecoration: 'none',
                }}
              >
                <Mail size={13} style={{ color: 'var(--c-accent)' }} /> {member.directEmail}
              </a>
              <span style={{ color: 'var(--c-fg-faint)' }}>Dahili: {member.phoneExtension}</span>
            </div>
          </article>
        ))}
      </div>

      <LegalDisclaimer />
    </div>
  );
}

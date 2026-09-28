import React from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { EXPEDITION_GUIDES } from '../../../content/travel';
import { Award, Shield, Map as MapIcon, ArrowRight } from 'lucide-react';
import { Button } from '../../../core/ui/primitives';
import Link from 'next/link';

export default function TravelGuides() {
  // If EXPEDITION_GUIDES is undefined for some reason, provide a safe fallback or just rely on it being there
  const guides = EXPEDITION_GUIDES || [];

  return (
    <SiteShell
      theme="violet-signal"
      title="Keşif Rehberlerimiz - Özel Keşif Stüdyosu"
      description="Uzman keşif liderlerimizle tanışın."
    >
      <div style={{ backgroundColor: 'var(--color-slate-900)', color: 'white', padding: 'var(--space-24) var(--space-6)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'var(--text-5xl)', fontWeight: 700, marginBottom: 'var(--space-6)', letterSpacing: '-0.02em' }}>
            Saha Uzmanları ve Keşif Liderleri
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-slate-300)', lineHeight: 1.6 }}>
            En zorlu coğrafyalarda güvenliğinizi ve deneyiminizin derinliğini sağlayan, antropolojiden glasiyolojiye kadar farklı alanlarda uzmanlaşmış IFMGA sertifikalı liderlerimiz.
          </p>
        </div>
      </div>

      <div style={{ padding: 'var(--space-24) var(--space-6)', backgroundColor: 'var(--color-slate-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-8)' }}>
            {guides.map((guide: any) => (
              <div key={guide.id} style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
                <img src={guide.imageUrl} alt={guide.alt} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-6)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                    <div>
                      <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{guide.name}</h2>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-violet-600)', fontWeight: 600 }}>{guide.title}</div>
                    </div>
                  </div>
                  
                  <div style={{ margin: 'var(--space-4) 0', padding: 'var(--space-4)', backgroundColor: 'var(--color-slate-50)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                      <MapIcon size={16} style={{ color: 'var(--color-slate-500)' }} />
                      <span style={{ fontWeight: 500 }}>Uzmanlık:</span> {guide.specialty}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                      <Shield size={16} style={{ color: 'var(--color-slate-500)' }} />
                      <span style={{ fontWeight: 500 }}>Deneyim:</span> {guide.experienceYears} Yıl
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                      <Award size={16} style={{ color: 'var(--color-slate-500)' }} />
                      <span style={{ fontWeight: 500 }}>Yönettiği Sefer:</span> {guide.expeditionsLed}+
                    </div>
                  </div>

                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-600)', lineHeight: 1.6, marginBottom: 'var(--space-4)', flexGrow: 1 }}>
                    {guide.bio}
                  </p>

                  <div style={{ borderTop: '1px solid var(--color-slate-200)', paddingTop: 'var(--space-4)' }}>
                    <h3 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-slate-500)', marginBottom: 'var(--space-2)' }}>Sertifikasyonlar</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {guide.credentials.map((cred: string, i: number) => (
                        <span key={i} style={{ backgroundColor: 'var(--color-violet-50)', color: 'var(--color-violet-800)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-violet-900)', color: 'white', padding: 'var(--space-16) var(--space-6)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Bir Sonraki Seferinizi Planlayın</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-violet-200)', marginBottom: 'var(--space-8)' }}>Uzmanlarımızla iletişime geçin ve size en uygun rotayı birlikte belirleyelim.</p>
          <Link href="/sites/travel/rotalar">
            <Button size="lg" style={{ backgroundColor: 'white', color: 'var(--color-violet-900)', fontWeight: 600 }}>
              Sefer Planla <ArrowRight size={18} style={{ marginLeft: 'var(--space-2)' }} />
            </Button>
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}

'use client';

import React from 'react';
import { ShieldAlert, AlertCircle, FileText, Stethoscope } from 'lucide-react';

interface LegalDisclaimerProps {
  className?: string;
  variant?: 'banner' | 'card' | 'inline';
}

export function LegalDisclaimer({ className = '', variant = 'card' }: LegalDisclaimerProps) {
  if (variant === 'banner') {
    return (
      <aside
        className={`legal-disclaimer legal-disclaimer--banner ${className}`}
        role="note"
        aria-label="Hukuki Bilgilendirme Notu"
        style={{
          padding: 'var(--sp-3) var(--sp-4)',
          background: 'var(--c-bg-subtle)',
          borderBottom: '1px solid var(--c-border)',
          fontSize: 'var(--text-xs)',
          color: 'var(--c-fg-muted)',
          lineHeight: 'var(--leading-normal)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sp-3)',
        }}
      >
        <ShieldAlert size={16} style={{ color: 'var(--c-accent)', flexShrink: 0 }} aria-hidden="true" />
        <div>
          <strong>TBB Meslek Kuralları Bildirimi:</strong> Bu sitedeki yayınlar ve açıklamalar yalnızca genel bilgilendirme amaçlıdır; hukuki mütalaa veya resmi avukat-müvekkil ilişkisi doğurmaz.
        </div>
      </aside>
    );
  }

  return (
    <section
      className={`legal-disclaimer legal-disclaimer--card ${className}`}
      role="note"
      aria-label="Yasal Uyar ve Bilgilendirme"
      style={{
        padding: 'var(--sp-6)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--c-bg-subtle)',
        border: '1px solid var(--c-border)',
        marginBlock: 'var(--sp-8)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-4)' }}>
        <FileText size={22} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
          <h4
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              color: 'var(--c-fg)',
            }}
          >
            Yasal Mevzuat ve Mesleki İlke Bildirimi
          </h4>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
            Bu web sitesinde yer alan tüm içerikler, makaleler, içtihat değerlendirmeleri ve kurumsal analizler; 1136 sayılı Avukatlık Kanunu, Türkiye Barolar Birliği Reklam Yasağı Yönetmeliği ve Meslek Kuralları çerçevesinde yalnızca kamuoyunu ve iş dünyasını bilgilendirme amacıyla sunulmuştur.
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
            Burada yer alan bilgiler somut bir uyuşmazlığa doğrudan uygulanamaz, hukuki danışmanlık veya dava garantisi teşkil etmez. Büromuz ile resmi ve karşılıklı bir vekaletname sözleşmesi akdedilinceye kadar avukat-müvekkil gizlilik ilişkisi kurulmuş sayılmaz.
          </p>
        </div>
      </div>
    </section>
  );
}

interface MedicalDisclaimerProps {
  className?: string;
  variant?: 'banner' | 'card' | 'inline';
}

export function MedicalDisclaimer({ className = '', variant = 'card' }: MedicalDisclaimerProps) {
  if (variant === 'banner') {
    return (
      <aside
        className={`medical-disclaimer medical-disclaimer--banner ${className}`}
        role="note"
        aria-label="Tıbbi Bilgilendirme Uyarısı"
        style={{
          padding: 'var(--sp-3) var(--sp-4)',
          background: 'var(--c-bg-subtle)',
          borderBottom: '1px solid var(--c-border)',
          fontSize: 'var(--text-xs)',
          color: 'var(--c-fg-muted)',
          lineHeight: 'var(--leading-normal)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sp-3)',
        }}
      >
        <Stethoscope size={16} style={{ color: 'var(--c-accent)', flexShrink: 0 }} aria-hidden="true" />
        <div>
          <strong>Tıbbi Uyarı:</strong> Sayfalarımızdaki tedavi anlatımları bilgilendirme amaçlıdır. Kesin tanı ve tedavi protokolü yalnızca hekim muayenesiyle belirlenir.
        </div>
      </aside>
    );
  }

  return (
    <section
      className={`medical-disclaimer medical-disclaimer--card ${className}`}
      role="note"
      aria-label="Sağlık Mevzuatı ve Tıbbi Bilgilendirme"
      style={{
        padding: 'var(--sp-6)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--c-bg-subtle)',
        border: '1px solid var(--c-border)',
        marginBlock: 'var(--sp-8)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-4)' }}>
        <AlertCircle size={22} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
          <h4
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              color: 'var(--c-fg)',
            }}
          >
            Sağlık Hizmetleri Bilgilendirme ve Deontoloji Bildirimi
          </h4>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
            T.C. Sağlık Bakanlığı Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik ile Tıbbi Deontoloji Tüzüğü hükümleri uyarınca; bu sitede yer alan tedavi aşamaları, vaka süreleri ve teknik açıklamalar yalnızca genel sağlık okuryazarlığını destekleme amaçlıdır.
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-relaxed)' }}>
            Diş hekimliği uygulamalarının sonuçları, iyileşme süreleri ve osseointegrasyon başarı oranları; hastanın sistemik sağlık durumu, kemik morfolojisi, ağız hijyeni ve biyolojik parametrelerine göre kişiden kişiye değişkenlik gösterir. Hiçbir tedavi kesin veya acısızlık garantisiyle taahhüt edilemez.
          </p>
        </div>
      </div>
    </section>
  );
}

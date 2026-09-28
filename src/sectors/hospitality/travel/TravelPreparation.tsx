import React from 'react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { PREPARATION_GUIDE } from '../../../content/travel';
import { CheckCircle, AlertTriangle, Backpack, HeartPulse, FileText, Leaf } from 'lucide-react';

const FALLBACK_SECTIONS = [
  {
    title: 'Fiziksel Kondisyon',
    description: 'Yüksek irtifa ve zorlu arazi şartlarına uyum sağlamak için seferden aylar önce başlaması gereken fiziksel hazırlık süreci.',
    items: [
      { heading: 'Kardiyovasküler Dayanıklılık', detail: 'Haftada en az 4 gün, 45-60 dakikalık koşu, yüzme veya bisiklet antrenmanları.' },
      { heading: 'Kuvvet Antrenmanı', detail: 'Özellikle bacak, core bölgesi ve sırt kaslarını güçlendirecek ağırlık çalışmaları.' },
      { heading: 'İrtifa Simülasyonu', detail: 'Mümkünse sefer öncesi hafta sonları yerel dağlık bölgelerde ağırlıklı çanta ile yürüyüşler.' }
    ],
    icon: <HeartPulse size={24} />
  },
  {
    title: 'Donanım ve Ekipman',
    description: 'Hayatta kalma ve konforunuz için kritik olan katmanlı giyinme ve teknik malzeme seçimi.',
    items: [
      { heading: 'Üç Katman Kuralı', detail: 'Nefes alabilen içlik, yalıtım sağlayan orta katman (polar/kaz tüyü) ve dış koruma (hardshell).' },
      { heading: 'Ayak Sağlığı', detail: 'Rotanın zorluğuna uygun (B1, B2 veya B3) önceden giyilip açılmış dağcılık botları.' },
      { heading: 'Teknik Malzemeler', detail: 'UV korumalı buzul gözlüğü, teleskopik baton ve özel uyku tulumları.' }
    ],
    icon: <Backpack size={24} />
  },
  {
    title: 'Sağlık ve Aşılar',
    description: 'Egzotik ve izole coğrafyalara seyahat etmeden önce alınması gereken tıbbi önlemler.',
    items: [
      { heading: 'Rutin Kontroller', detail: 'Seferden 2 ay önce tam kapsamlı sağlık taraması ve diş hekimi kontrolü.' },
      { heading: 'Bölgeye Özel Aşılar', detail: 'Gidilecek coğrafyaya özgü sarı humma, tifo veya sıtma proflaksisi.' },
      { heading: 'Kişisel İlkyardım Kiti', detail: 'Düzenli kullanılan ilaçlar, geniş spektrumlu antibiyotik ve irtifa ilaçları.' }
    ],
    icon: <HeartPulse size={24} />
  },
  {
    title: 'Belgeler ve Sigorta',
    description: 'Bürokratik süreçler ve acil durum güvenceleri.',
    items: [
      { heading: 'Özel İzinler', detail: 'Sınır bölgeleri ve milli parklar için aylar öncesinden alınması gereken giriş vizeleri.' },
      { heading: 'Kapsamlı Sigorta', detail: 'Helikopterle arama-kurtarma ve yüksek irtifa tahliyesini kapsayan özel dağcılık sigortası.' }
    ],
    icon: <FileText size={24} />
  },
  {
    title: 'İz Bırakma (Leave No Trace)',
    description: 'Ziyaret ettiğimiz vahşi doğayı koruma taahhüdümüz.',
    items: [
      { heading: 'Sıfır Atık', detail: 'Tüm kişisel çöplerin şehre geri getirilmesi ve biyolojik atık yönetimi.' },
      { heading: 'Yaban Hayatına Saygı', detail: 'Hayvanlara güvenli mesafeden yaklaşma ve yaşam alanlarına müdahale etmeme.' }
    ],
    icon: <Leaf size={24} />
  }
];

export default function TravelPreparation() {
  const sections = PREPARATION_GUIDE.length > 0 ? PREPARATION_GUIDE : FALLBACK_SECTIONS;

  return (
    <SiteShell
      theme="violet-signal"
      title="Sefer Hazırlığı - Özel Keşif Stüdyosu"
      description="Keşif seferlerine hazırlanmak için kapsamlı rehber."
    >
      {/* Editorial Intro */}
      <div style={{ backgroundColor: 'var(--color-slate-900)', color: 'white', padding: 'var(--space-24) var(--space-6)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'var(--text-5xl)', fontWeight: 700, marginBottom: 'var(--space-6)', letterSpacing: '-0.02em' }}>
            Sefer Hazırlığı ve Protokoller
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-slate-300)', lineHeight: 1.6 }}>
            Vahşi doğaya ve yüksek irtifalara yapılacak bir sefer, evden çıkmadan aylar önce başlar. Fiziksel dayanıklılıktan teknik donanıma, zihinsel hazırlıktan ekolojik farkındalığa kadar tüm detayları eksiksiz planlamak, güvenliğinizin ve başarınızın temelidir.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-slate-50)', padding: 'var(--space-24) var(--space-6)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {sections.map((section: any, idx: number) => (
            <div key={idx} style={{ backgroundColor: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div style={{ backgroundColor: 'var(--color-violet-100)', color: 'var(--color-violet-700)', padding: 'var(--space-3)', borderRadius: 'var(--radius-full)' }}>
                  {section.icon || <CheckCircle size={28} />}
                </div>
                <div>
                  <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>{section.title}</h2>
                  <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-slate-600)', marginTop: 'var(--space-2)' }}>{section.description}</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
                {section.items.map((item: any, i: number) => (
                  <div key={i} style={{ borderLeft: '3px solid var(--color-violet-500)', paddingLeft: 'var(--space-4)' }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{item.heading}</h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-600)', lineHeight: 1.6 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Gear Checklist Summary */}
          <div style={{ backgroundColor: 'var(--color-slate-900)', color: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>Genel Ekipman Çerçevesi</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-violet-300)', marginBottom: 'var(--space-3)' }}>Giyim</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-slate-300)' }}>
                  <li style={{ marginBottom: '8px' }}>• Termal içlik takımı (Merino)</li>
                  <li style={{ marginBottom: '8px' }}>• Polar / Softshell ceket</li>
                  <li style={{ marginBottom: '8px' }}>• Kaz tüyü mont (İrtifaya uygun)</li>
                  <li style={{ marginBottom: '8px' }}>• Gore-Tex fırtına pantolonu & ceket</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-violet-300)', marginBottom: 'var(--space-3)' }}>Donanım</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-slate-300)' }}>
                  <li style={{ marginBottom: '8px' }}>• Kategori 3-4 Buzul Gözlüğü</li>
                  <li style={{ marginBottom: '8px' }}>• Teleskopik baton</li>
                  <li style={{ marginBottom: '8px' }}>• Kafa feneri (Yedek pilli)</li>
                  <li style={{ marginBottom: '8px' }}>• İrtifaya uygun uyku tulumu</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-violet-300)', marginBottom: 'var(--space-3)' }}>Kişisel</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-slate-300)' }}>
                  <li style={{ marginBottom: '8px' }}>• Güneş kremi (50+ SPF)</li>
                  <li style={{ marginBottom: '8px' }}>• Kişisel medikal kit</li>
                  <li style={{ marginBottom: '8px' }}>• Su arıtma filtresi / tabletleri</li>
                  <li style={{ marginBottom: '8px' }}>• Powerbank ve solar şarj</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Emergency Protocols */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', backgroundColor: 'var(--color-red-50)', border: '1px solid var(--color-red-200)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
            <AlertTriangle size={32} style={{ color: 'var(--color-red-600)', flexShrink: 0 }} />
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-red-800)', marginBottom: 'var(--space-2)' }}>Acil Durum Protokolleri</h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-red-700)', lineHeight: 1.6 }}>
                Tüm seferlerimizde rehberlerimiz, uydu telefonları ve Garmin inReach acil durum iletişim cihazları ile donatılmıştır. Olası medikal tahliye senaryoları için önceden bölgedeki arama-kurtarma ekipleriyle koordinasyon sağlanır. Kritik rotalarda portatif oksijen tüpleri ve gamow bag (taşınabilir hiperbarik çember) standart ekipmanımızdır. Katılımcıların özel sağlık sigortası klozları sefer öncesi teyit edilir.
              </p>
            </div>
          </div>

        </div>
      </div>
    </SiteShell>
  );
}

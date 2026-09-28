'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Printer,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { lawFirmData } from '@/content/law';
import { LegalDisclaimer } from '../common/Disclaimers';
import { InteractionModal, InteractionConfirmationData } from '../common/InteractionModal';
import { Button } from '@/core/ui';

interface LawContactProps {
  siteId: string;
}

export function LawContact({ siteId }: LawContactProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    practiceSlug: lawFirmData.practiceAreas[0]?.slug || '',
    urgency: 'Standart Değerlendirme',
    description: '',
    conflictAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalData, setModalData] = useState<InteractionConfirmationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.description) {
      setErrorMsg('Lütfen isim, kurumsal e-posta ve konu özetini eksiksiz doldurunuz.');
      return;
    }
    if (!formData.conflictAgreed) {
      setErrorMsg('Lütfen çıkar çatışması ve TBB meslek kuralları bildirim onayını işaretleyiniz.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    // Simulate realistic asynchronous submission
    setTimeout(() => {
      setIsSubmitting(false);
      const practiceObj = lawFirmData.practiceAreas.find((p) => p.slug === formData.practiceSlug);
      const refCode = `DB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      setModalData({
        title: 'Ön Değerlendirme Talebiniz Alındı',
        referenceNumber: refCode,
        summary: `${formData.fullName} adına ${practiceObj?.title || 'Kurumsal Hukuk'} alanındaki ön bilgilendirme başvurunuz büromuzun çıkar çatışması (conflict-of-interest) tarama sistemine iletilmiştir.`,
        details: [
          { label: 'Başvuran', value: formData.fullName },
          { label: 'Şirket / Kurum', value: formData.company || 'Belirtilmedi' },
          { label: 'İlgili Disiplin', value: practiceObj?.title || 'Genel Kurumsal' },
          { label: 'Öncelik Durumu', value: formData.urgency },
          { label: 'İletişim E-Posta', value: formData.email },
        ],
        nextSteps: [
          'TBB kuralları gereği karşı taraf çıkar çatışması kontrolü 4 iş saati içinde tamamlanır.',
          'Mani bir durum bulunmaması halinde sorumlu ortak avukatımız gizlilik protokolü ile tarafınıza dönüş yapacaktır.',
          'Resmi vekaletname tanzim edilinceye kadar bu form vekil-müvekkil ilişkisi doğurmaz.',
        ],
        disclaimer: 'Bu bildirim 1136 sayılı Avukatlık Kanunu ve TBB Reklam Yasağı Yönetmeliği kapsamında gizli tutulmaktadır.',
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        practiceSlug: lawFirmData.practiceAreas[0]?.slug || '',
        urgency: 'Standart Değerlendirme',
        description: '',
        conflictAgreed: false,
      });
    }, 700);
  };

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4)' }}>
      {/* Header */}
      <header style={{ marginBottom: 'var(--sp-8)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', color: 'var(--c-accent)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', marginBottom: 'var(--sp-2)' }}>
          <Building2 size={16} />
          <span>İletişim & Randevu</span>
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
          Ofis Lokasyonları ve Gizlilik Odaklı Ön Görüşme
        </h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--c-fg-muted)', maxWidth: '800px', lineHeight: 'var(--leading-relaxed)' }}>
          İstanbul Levent genel merkezimiz ve Ankara Çankaya irtibat ofisimiz nezdinde; çıkar çatışması değerlendirmesi tamamlanmış kurumsal görüşmeler randevu usulüyle kabul edilmektedir.
        </p>
      </header>

      {/* Grid: Offices + Consultation Form */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--sp-10)',
          alignItems: 'start',
        }}
      >
        {/* Left: Offices list & Consultation workflow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-fg)' }}>
            Ofis Bilgileri
          </h2>

          {lawFirmData.offices.map((office) => (
            <div
              key={office.city}
              style={{
                padding: 'var(--sp-6)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--c-bg)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-3)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--c-accent)',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  {office.city} Ofisi
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)' }}>
                  PK: {office.postalCode}
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-fg)' }}>
                {office.name}
              </h3>

              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-2)' }}>
                <MapPin size={16} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span>{office.addressLine1}, {office.addressLine2}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-2)', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--c-border)', fontSize: 'var(--text-xs)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)', color: 'var(--c-fg)' }}>
                  <Phone size={13} style={{ color: 'var(--c-fg-faint)' }} /> {office.telephone}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)', color: 'var(--c-fg-muted)' }}>
                  <Printer size={13} style={{ color: 'var(--c-fg-faint)' }} /> Faks: {office.facsimile}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)', color: 'var(--c-fg)' }}>
                  <Mail size={13} style={{ color: 'var(--c-fg-faint)' }} /> {office.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)', color: 'var(--c-fg-muted)' }}>
                  <Clock size={13} style={{ color: 'var(--c-fg-faint)' }} /> {office.workingHours}
                </div>
              </div>
            </div>
          ))}

          {/* Consultation Process Steps */}
          <div
            style={{
              padding: 'var(--sp-6)',
              background: 'var(--c-bg-subtle)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--c-fg)', marginBottom: 'var(--sp-4)' }}>
              Ön Danışma ve Çıkar Çatışması Süreci
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              {lawFirmData.consultationSteps.map((step) => (
                <div key={step.stepNumber} style={{ display: 'flex', gap: 'var(--sp-3)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--c-accent)',
                      background: 'var(--c-bg)',
                      border: '1px solid var(--c-border)',
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-fg)', marginBottom: '2px' }}>
                      {step.title}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)' }}>
                      {step.description}
                    </p>
                    <span style={{ display: 'inline-block', marginTop: 'var(--sp-1)', fontSize: 'var(--text-xs)', color: 'var(--c-fg-faint)', fontStyle: 'italic' }}>
                      Güvence: {step.safeguard}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Consultation Request Form */}
        <section
          style={{
            padding: 'var(--sp-8)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--c-bg)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ marginBottom: 'var(--sp-6)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-fg)', marginBottom: 'var(--sp-2)' }}>
              Kurumsal Ön Değerlendirme Talebi
            </h2>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)' }}>
              Aşağıdaki formu doldurarak şirketiniz için gizlilik esasına dayalı bir ön inceleme ve çıkar çatışması taraması başlatabilirsiniz.
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                padding: 'var(--sp-3) var(--sp-4)',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: 'var(--radius-sm)',
                color: '#ef4444',
                fontSize: 'var(--text-xs)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-2)',
                marginBottom: 'var(--sp-4)',
              }}
            >
              <AlertTriangle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                Yetkili İsim & Soyisim *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Örn: Av. Selin Yılmaz veya Murat Aksoy"
                style={{
                  width: '100%',
                  padding: 'var(--sp-2) var(--sp-3)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--c-bg)',
                  color: 'var(--c-fg)',
                  fontSize: 'var(--text-sm)',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                  Kurumsal E-Posta *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="isim@sirketiniz.com"
                  style={{
                    width: '100%',
                    padding: 'var(--sp-2) var(--sp-3)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--c-bg)',
                    color: 'var(--c-fg)',
                    fontSize: 'var(--text-sm)',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+90 (___) ___ __ __"
                  style={{
                    width: '100%',
                    padding: 'var(--sp-2) var(--sp-3)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--c-bg)',
                    color: 'var(--c-fg)',
                    fontSize: 'var(--text-sm)',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                  Şirket / Müvekkil Unvanı
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Anonim veya Limited Şirket"
                  style={{
                    width: '100%',
                    padding: 'var(--sp-2) var(--sp-3)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--c-bg)',
                    color: 'var(--c-fg)',
                    fontSize: 'var(--text-sm)',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                  Öncelik / Süreç Durumu
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  style={{
                    width: '100%',
                    padding: 'var(--sp-2) var(--sp-3)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--c-bg)',
                    color: 'var(--c-fg)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <option value="Standart Değerlendirme">Standart Değerlendirme (1-2 İş Günü)</option>
                  <option value="İvedi İnceleme">İvedi İnceleme (Aynı Gün / 24 Saat)</option>
                  <option value="Tahkim / Dava Hak Düşürücü Süre İçi">Tahkim / Dava Hak Düşürücü Süre İçi</option>
                  <option value="Kapanış Aşaması M&A Süreci">Kapanış Aşaması M&A Süreci</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                İlgili Hukuk Disiplini *
              </label>
              <select
                value={formData.practiceSlug}
                onChange={(e) => setFormData({ ...formData, practiceSlug: e.target.value })}
                style={{
                  width: '100%',
                  padding: 'var(--sp-2) var(--sp-3)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--c-bg)',
                  color: 'var(--c-fg)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {lawFirmData.practiceAreas.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-fg)', marginBottom: 'var(--sp-1)' }}>
                Uyuşmazlık veya Süreç Özeti *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Lütfen gizli ticari sır veya üçüncü kişilere ait hassas bilgileri aktarmaksızın, hukuki ihtiyacınızın ana çerçevesini ve karşı taraf adını (çıkar çatışması sorgusu için) özetleyiniz."
                style={{
                  width: '100%',
                  padding: 'var(--sp-2) var(--sp-3)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--c-bg)',
                  color: 'var(--c-fg)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--leading-normal)',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Conflict Check Agreement */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-3)', padding: 'var(--sp-3)', background: 'var(--c-bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)' }}>
              <input
                type="checkbox"
                id="conflictCheck"
                checked={formData.conflictAgreed}
                onChange={(e) => setFormData({ ...formData, conflictAgreed: e.target.checked })}
                style={{ marginTop: '2px', cursor: 'pointer' }}
              />
              <label htmlFor="conflictCheck" style={{ fontSize: 'var(--text-xs)', color: 'var(--c-fg-muted)', lineHeight: 'var(--leading-normal)', cursor: 'pointer' }}>
                Türkiye Barolar Birliği Meslek Kuralları uyarınca; bu talebin avukat-müvekkil ilişkisi tesis etmediğini, nihai kabulün çıkar çatışması taraması ve resmi vekalet akdi akabinde gerçekleşeceğini kabul ediyorum.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              style={{ width: '100%', padding: 'var(--sp-3) var(--sp-4)', marginTop: 'var(--sp-2)' }}
            >
              {isSubmitting ? (
                <span>Çıkar Çatışması Sorgusu Yapılıyor...</span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                  <Send size={16} /> Ön İnceleme Talebini Gönder
                </span>
              )}
            </Button>
          </form>
        </section>
      </div>

      <LegalDisclaimer />

      {/* Confirmation Modal */}
      <InteractionModal
        isOpen={modalData !== null}
        onClose={() => setModalData(null)}
        data={modalData}
      />
    </div>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import { ReceiptData } from './types';

interface ReceiptUploadProps {
  requestId: string | number;
  onUploadSuccess: (receipt: ReceiptData) => void;
}

export function ReceiptUpload({ requestId, onUploadSuccess }: ReceiptUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(selected.type)) {
      setError('Lütfen yalnızca PDF, JPG veya PNG formatında dekont yükleyin.');
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setError('Dosya boyutu 10MB sınırını aşamaz.');
      return;
    }

    setFile(selected);
    if (selected.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(selected);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Lütfen yüklemek için bir dekont dosyası seçin.');
      return;
    }

    setUploading(true);
    setError(null);

    // Read as DataURL for persistent client storage & server compatibility
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const receipt: ReceiptData = {
        id: 'rc_' + Date.now(),
        payment_request_id: requestId,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        data_url: dataUrl,
        uploaded_at: new Date().toISOString(),
      };

      setTimeout(() => {
        setUploading(false);
        onUploadSuccess(receipt);
      }, 600);
    };

    reader.onerror = () => {
      setUploading(false);
      setError('Dosya okunurken bir hata oluştu.');
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed var(--c-border-strong, rgba(255,255,255,0.2))',
            borderRadius: '16px',
            padding: '28px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: 'var(--c-bg-subtle, rgba(255,255,255,0.03))',
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary, #38bdf8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 10px auto' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--c-fg, #fff)' }}>
            Dekont / Fiş Dosyası Seç veya Sürükle
          </div>
          <div style={{ fontSize: '12px', color: 'var(--c-fg-muted, rgba(255,255,255,0.5))', marginTop: '4px' }}>
            PDF, JPG, PNG formatları (Maks. 10MB)
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--c-border, rgba(255,255,255,0.15))',
            backgroundColor: 'var(--c-bg-raised, rgba(30,41,59,0.5))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Önizleme"
                style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
            )}
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {file.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--c-fg-muted, rgba(255,255,255,0.5))' }}>
                {(file.size / 1024).toFixed(1)} KB · {file.type.split('/')[1]?.toUpperCase()}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '6px',
              color: '#ef4444',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {error && (
        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
          {error}
        </div>
      )}

      {file && (
        <button
          type="submit"
          disabled={uploading}
          className="w-full mt-3.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-98"
          style={{ cursor: uploading ? 'wait' : 'pointer' }}
        >
          {uploading ? (
            <span>Dekont Yükleniyor...</span>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Dekontu Onaya Gönder</span>
            </>
          )}
        </button>
      )}
    </form>
  );
}

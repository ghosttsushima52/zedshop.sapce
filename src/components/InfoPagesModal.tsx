'use client';

import React, { useState } from 'react';
import { WhatsAppIcon } from './Icons';

interface InfoPagesModalProps {
  type: string | null;
  onClose: () => void;
  onOpenPayment: () => void;
}

export const InfoPagesModal: React.FC<InfoPagesModalProps> = ({ type, onClose, onOpenPayment }) => {
  const [kurumsalTab, setKurumsalTab] = useState<'hakkimizda' | 'misyon' | 'kalite' | 'surdurulebilirlik'>('hakkimizda');
  const [selectedRegion, setSelectedRegion] = useState<string>('Tümü');

  if (!type) return null;

  const getModalTitle = () => {
    switch (type) {
      case 'kurumsal': return 'Kurumsal & Şirket Profili';
      case 'garanti': return '2 Yıl Resmi Fabrika Garantisi';
      case 'kampanyalar': return 'Satış ve Elektrikli Mobilite Kampanyaları';
      case 'bayiler': return '81 İlde Yetkili Bayi ve Satış Ağı';
      case 'servisler': return '500+ TSE Onaylı Yetkili Servis İstasyonu';
      case 'yedekparca': return 'Volta Orijinal Yedek Parça Merkezi';
      case 'iletisim': return 'İletişim ve Müşteri Destek Merkezi';
      case 'gizlilik': return 'Gizlilik Politikası ve Güvenlik';
      case 'kullanim': return 'Kullanım Koşulları & Sözleşmesi';
      case 'kvkk': return 'KVKK Aydınlatma Metni';
      case 'mesafeli': return 'Mesafeli Satış ve Teslimat Sözleşmesi';
      default: return 'Bilgilendirme';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f8fafc] text-slate-900 pb-20 animate-in fade-in duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#14212d] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-slate-700/80 active:scale-95 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Ana Sayfaya Dön</span>
          </button>

          <div className="flex items-center gap-3 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/volta-service-logo.png" 
              alt="Volta Motor" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-xl drop-shadow-md"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-black text-sm sm:text-base tracking-tight uppercase leading-none">VOLTA MOTOR</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">{getModalTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenPayment();
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl transition shadow-md active:scale-95"
            >
              Ödeme Yap
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800 p-2 sm:p-2.5 rounded-xl transition"
              title="Kapat"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-6 overflow-x-auto pb-1 whitespace-nowrap">
          <button onClick={onClose} className="hover:text-red-600 transition">Ana Sayfa</button>
          <span>/</span>
          <span className="text-red-600 font-bold">{getModalTitle()}</span>
        </div>

        {/* ================= KURUMSAL VIEW ================= */}
        {type === 'kurumsal' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/volta-service-logo.png" alt="Volta" className="w-14 h-14 object-contain rounded-2xl drop-shadow" />
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">KURUMSAL PROFİL</span>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                      Volta Motor & Dönüşüm Servisi
                    </h1>
                  </div>
                </div>

                {/* Subtabs */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
                  {[
                    { id: 'hakkimizda', label: 'Hakkımızda' },
                    { id: 'misyon', label: 'Misyon & Vizyon' },
                    { id: 'kalite', label: 'Kalite Politikası' },
                    { id: 'surdurulebilirlik', label: 'Sürdürülebilirlik' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setKurumsalTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                        kurumsalTab === tab.id 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                {kurumsalTab === 'hakkimizda' && (
                  <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                    <p className="text-base text-slate-800 font-medium leading-relaxed">
                      Volta Motor, Türkiye’nin en büyük elektrikli araç ve hafif mobilite üreticilerinden biri olarak kurulduğu günden bu yana sürdürülebilir, çevreci ve yüksek teknolojili ulaşım çözümleri sunmaktadır.
                    </p>
                    <p>
                      Modern entegre tesislerimizde üretilen elektrikli motosiklet, elektrikli bisiklet ve hafif ticari araçlarımız; üstün mühendislik kalitesi, Bluetooth akıllı telemetri desteği, düşük enerji tüketimi ve 81 ildeki yaygın servis ağı ile yüz binlerce kullanıcının güvenilir tercihi haline gelmiştir.
                    </p>
                    
                    {/* Fixed Stats Grid: No text wrapping or clipping */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-4">
                      <div className="bg-slate-50 p-3.5 sm:p-5 rounded-2xl border border-slate-200 text-center">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 block whitespace-nowrap tracking-tight leading-none">500.000+</span>
                        <span className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-1 block leading-tight">Mutlu Kullanıcı</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 sm:p-5 rounded-2xl border border-slate-200 text-center">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 block whitespace-nowrap tracking-tight leading-none">81 İl</span>
                        <span className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-1 block leading-tight">Yetkili Servis Ağı</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 sm:p-5 rounded-2xl border border-slate-200 text-center">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 block whitespace-nowrap tracking-tight leading-none">%100</span>
                        <span className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-1 block leading-tight">Elektrikli Mobilite</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 sm:p-5 rounded-2xl border border-slate-200 text-center">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 block whitespace-nowrap tracking-tight leading-none">50.000 m²</span>
                        <span className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-1 block leading-tight">Entegre Üretim Tesisi</span>
                      </div>
                    </div>
                  </div>
                )}

                {kurumsalTab === 'misyon' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-1">MİSYON</span>
                      <h3 className="text-base font-bold text-slate-900 mb-2">Hedefimiz</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Gelişmiş elektrikli tahrik ve Bluetooth bağlantılı akıllı mobilite teknolojilerini herkes için erişilebilir, güvenli ve ekonomik hale getirerek şehir içi ulaşımda çevre dostu dönüşüme öncülük etmek.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">VİZYON</span>
                      <h3 className="text-base font-bold text-slate-900 mb-2">Gelecek Bakışımız</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Türkiye’de ve uluslararası pazarda hafif elektrikli araç segmentinde lider marka olarak, sıfır emisyonlu sürdürülebilir bir geleceğin mimarı olmak.
                      </p>
                    </div>
                  </div>
                )}

                {kurumsalTab === 'kalite' && (
                  <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                    <p>
                      Üretim bandımızdan çıkan her Volta aracı, uluslararası TSE, CE ve ISO 9001 kalite standartlarına uygun olarak zorlu güvenlik, batarya dayanıklılık ve fren testlerinden geçirilir.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">SERTİFİKASYON</span>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Batarya Güvenliği</h4>
                        <p className="text-xs text-slate-500">Sertifikalı lityum ve derin döngülü jel batarya teknolojisi</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">MÜHENDİSLİK</span>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Şasi Dayanımı</h4>
                        <p className="text-xs text-slate-500">Korozyona dayanıklı hafif alüminyum ve çelik şasi mimarisi</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">TAAHHÜT</span>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Resmi Garanti</h4>
                        <p className="text-xs text-slate-500">2 Yıl Resmi Garanti ve 10 Yıl Parça Bulundurma Taahhüdü</p>
                      </div>
                    </div>
                  </div>
                )}

                {kurumsalTab === 'surdurulebilirlik' && (
                  <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200 space-y-3 text-sm text-emerald-950">
                    <h3 className="font-bold text-emerald-900 text-base">Sıfır Karbon Ayak İzi Taahhüdümüz</h3>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      Her gün yollara çıkan binlerce Volta elektrikli aracı, fosil yakıt tüketimini azaltarak yılda tonlarca karbon emisyonunun önüne geçmektedir. Üretim süreçlerimizde geri dönüştürülebilir malzemeler ve yenilenebilir enerji kaynakları kullanılmaktadır.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= GARANTİ VIEW ================= */}
        {type === 'garanti' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">RESMİ GÜVENCE STANDARTLARI</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                  Volta 2 Yıl Resmi Fabrika Garantisi
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">KAPSAM</span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">Elektronik ve Mekanik Garanti</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Motor, dijital beyin (ECU/controller), Bluetooth modülü, şasi, LCD/TFT gösterge paneli ve tüm elektronik aksamlar fatura tarihinden itibaren 2 yıl boyunca tam fabrika garantisi kapsamındadır.
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">BATARYA</span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">Güç & Akü Güvencesi</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Orijinal Lityum-İyon ve Derin Döngülü Jel bataryalar fabrikasyon ve üretim kusurlarına karşı resmi koruma altındadır.
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">PERİYODİK BAKIM</span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">Planlı Servis Programı</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    İlk 500 km rodaj/güvenlik kontrolü ve ardından her 2.500 km periyodik servis bakımı yetkili istasyonlarımızda hızlıca gerçekleştirilir.
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">YEDEK PARÇA</span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">10 Yıl Parça Temini</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sanayi ve Teknoloji Bakanlığı mevzuatına uygun olarak tüm modellerimizde 10 yıl boyunca kesintisiz orijinal parça tedarik garantisi sunulmaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= KAMPANYALAR VIEW ================= */}
        {type === 'kampanyalar' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">GÜNCEL FIRSATLAR</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                  Volta Elektrikli Mobilite Kampanyaları
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl flex flex-col justify-between">
                  <div>
                    <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">Aktif Fırsat</span>
                    <h3 className="text-xl font-black text-slate-900 mt-3 mb-2">Elektrikli Dönüşüm & Nakit Avantajı</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Banka havalesi ve FAST ile peşin alımlarda tüm elektrikli motosiklet ve mopedlerde <strong>5.000 TL&apos;ye varan doğrudan indirim</strong> fırsatı!
                    </p>
                  </div>
                  <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5">
                    Modelleri İncele
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl flex flex-col justify-between">
                  <div>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">81 İl Geçerli</span>
                    <h3 className="text-xl font-black text-slate-900 mt-3 mb-2">Ücretsiz Adrese Teslimat & Montaj</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Siparişiniz doğrudan fabrikanın özel lojistik araçlarıyla adresinize sevk edilir. Yetkili servis tarafından akü montajı tamamlanmış ve ilk sürüşe hazır teslim edilir.
                    </p>
                  </div>
                  <button onClick={() => { onClose(); onOpenPayment(); }} className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5">
                    Hemen Sipariş Ver
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= BAYİLER VIEW ================= */}
        {type === 'bayiler' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">SATIŞ VE SHOWROOM AĞI</span>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                    81 İlde Yetkili Bayilerimiz
                  </h1>
                </div>

                {/* Region Filter */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
                  {['Tümü', 'Marmara', 'Ege', 'İç Anadolu', 'Akdeniz', 'Karadeniz'].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                        selectedRegion === reg ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Volta Kadıköy Showroom', city: 'İstanbul', address: 'Bağdat Cad. No: 142/A Kadıköy', phone: '0216 411 20 00' },
                  { name: 'Volta Ankara Merkez Bayi', city: 'Ankara', address: 'İstanbul Yolu 7. Km No: 88 Yenimahalle', phone: '0312 397 50 00' },
                  { name: 'Volta İzmir Alsancak Showroom', city: 'İzmir', address: 'Şair Eşref Bulvarı No: 54 Konak', phone: '0232 464 30 00' },
                  { name: 'Volta Bursa Nilüfer Plaza', city: 'Bursa', address: 'Fatih Sultan Mehmet Bulvarı No: 22', phone: '0224 242 80 00' },
                  { name: 'Volta Antalya Muratpaşa Bayi', city: 'Antalya', address: 'Aspendos Bulvarı No: 110 Muratpaşa', phone: '0242 321 70 00' },
                  { name: 'Volta Adana Seyhan Showroom', city: 'Adana', address: 'Turhan Cemal Beriker Bulvarı No: 45', phone: '0322 458 10 00' },
                ].map((b, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-red-600 uppercase block mb-1">{b.city}</span>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{b.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{b.address}</p>
                    <span className="text-xs font-mono font-semibold text-slate-700 block">{b.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= SERVİSLER VIEW (NO 0850 PHONE NUMBER) ================= */}
        {type === 'servisler' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">SATIŞ SONRASI HİZMETLER</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                  500+ TSE Belgeli Yetkili Servis Ağı
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">PERİYODİK</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Planlı Bakım</h4>
                  <p className="text-xs text-slate-500">TSE standartlarında uzman teknisyenlerle hızlı servis</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">ANALİZ</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Batarya Sağlık Testi</h4>
                  <p className="text-xs text-slate-500">Bilgisayarlı hücre ve kapasite analiz cihazları</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">ORİJİNAL</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Barkodlu Yedek Parça</h4>
                  <p className="text-xs text-slate-500">%100 fabrika barkodlu garantili yedek parça</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">ACİL</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Mobil Servis Desteği</h4>
                  <p className="text-xs text-slate-500">Acil durumlarda yerinde arıza tespit ve onarım desteği</p>
                </div>
              </div>

              {/* Servis Randevu Box (CLEAN - NO 0850) */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold">Servis Randevusu ve Destek Hattı</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">Türkiye genelindeki yetkili servis randevuları ve teknik danışmanlık için doğrudan WhatsApp üzerinden anında ulaşabilirsiniz.</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a 
                    href="https://wa.me/905000000000?text=Merhaba,%20servis%20randevusu%20almak%20istiyorum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp Servis Randevusu Al</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= YEDEK PARÇA VIEW ================= */}
        {type === 'yedekparca' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">ORİJİNAL DONANIM & AKSESUAR</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                  Volta Orijinal Yedek Parça Merkezi
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">GÜÇ GRUBU</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Batarya & Akü Paketleri</h4>
                  <p className="text-xs text-slate-500">Lityum-İyon ve Jel batarya modülleri, Bluetooth Smart BMS üniteleri.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">ŞARJ GRUBU</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Akıllı Şarj Adaptörleri</h4>
                  <p className="text-xs text-slate-500">Otomatik akım kesmeli, aşırı gerilim korumalı hızlı şarj cihazları.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">FREN SİSTEMİ</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Fren & Balata Donanımları</h4>
                  <p className="text-xs text-slate-500">Hidrolik disk frenler, kaliperler, kampana ve balata setleri.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Doğrudan Fabrikadan Orijinal Parça Siparişi</h4>
                  <p className="text-xs text-slate-500">Parça numarası ve model bilginizle WhatsApp üzerinden sipariş verebilirsiniz.</p>
                </div>
                <a 
                  href="https://wa.me/905000000000?text=Merhaba,%20orijinal%20yedek%20par%C3%A7a%20sipari%C5%9Fi%20vermek%20istiyorum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp Parça Siparişi</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= İLETİŞİM VIEW (NO 0850) ================= */}
        {type === 'iletisim' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">MÜŞTERİ HİZMETLERİ & FABRİKA</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                  İletişim ve Destek Merkezi
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Canlı Destek & Danışma</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 mb-2">WhatsApp Müşteri Hizmetleri</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Hafta içi 08:30 - 18:00, Cumartesi 09:00 - 14:00 saatleri arasında ve acil servis ihtiyaçlarınızda doğrudan WhatsApp üzerinden kesintisiz danışmanlık desteği.
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2">
                    <a 
                      href="https://wa.me/905000000000?text=Merhaba,%20bilgi%20almak%20istiyorum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp ile Hemen Yazın</span>
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">E-Posta İletişim</span>
                    <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">info@volta.com.tr</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Kurumsal talepleriniz, bayi başvuruları ve servis bildirimleriniz için e-posta adresimizden bize 7/24 ulaşabilirsiniz.
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <span className="text-xs font-semibold text-slate-700">Teknik Destek: destek@volta.com.tr</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fabrika & Üretim Kampüsü</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-1">Volta Motor Sanayi ve Ticaret A.Ş.</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Gümüşova Organize Sanayi Bölgesi 1. Cadde No: 5, Gümüşova / DÜZCE - TÜRKİYE
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= HUKUKİ VIEWS ================= */}
        {(type === 'gizlilik' || type === 'kullanim' || type === 'kvkk' || type === 'mesafeli') && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">HUKUKİ VE YASAL BİLGİLENDİRME</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                  {getModalTitle()}
                </h1>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                <p>
                  Volta Motor & Dönüşüm Servisi Sanayi ve Ticaret A.Ş. olarak müşterilerimizin kişisel verilerinin korunması, gizliliği ve güvenliği temel önceliğimizdir.
                </p>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuat uyarınca; sitemiz üzerinden yapılan online sipariş, rezervasyon, teknik servis ve ödeme bildirim süreçlerinde paylaşılan ad, soyad, telefon, adres ve ödeme teyit dekontu bilgileri yalnızca yasal yükümlülüklerin yerine getirilmesi, araç tescil işlemleri, garanti başlatılması ve faturalandırma amacıyla işlenmektedir.
                </p>
                <p>
                  Banka ödeme işlemlerinde kullanıcı güvenliği için SSL 256-bit uçtan uca şifreleme protokolü uygulanmaktadır. Bilgileriniz hiçbir koşulda üçüncü şahıslarla paylaşılmaz.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4 text-slate-700">
                  <strong>Resmi İletişim:</strong> KVKK kapsamındaki haklarınız ve bilgi talepleriniz için <span className="font-mono text-slate-900">kvkk@volta.com.tr</span> adresine yazılı olarak başvurabilirsiniz.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

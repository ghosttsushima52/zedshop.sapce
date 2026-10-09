export interface VoltaModel {
  id: string;
  name: string;
  category: 'Elektrikli Motosiklet' | 'Elektrikli Bisiklet' | 'Elektrikli Moped' | 'Elektrikli Üç Tekerlekli';
  tagline: string;
  price: number;
  oldPrice?: number;
  discountRate?: number;
  advantageAmount?: number;
  image: string;
  images?: string[];
  specs: {
    engine: string;
    range: string;
    speed: string;
    battery: string;
    brakes?: string;
    weight?: string;
    chargeTime?: string;
    capacity?: string;
  };
  features: string[];
  detailedSpecs?: { label: string; value: string }[];
  isFeaturedCampaign?: boolean;
}

export const INITIAL_VOLTA_MODELS: VoltaModel[] = [
  {
    id: 'vsm',
    name: 'VSM',
    category: 'Elektrikli Motosiklet',
    tagline: 'Şehir içi pratik ve ekonomik elektrikli motosiklet çözümü',
    price: 24990,
    oldPrice: 28900,
    discountRate: 13,
    advantageAmount: 3910,
    image: '/images/volta/vsm.jpg',
    images: [
      '/images/volta/vsm.jpg',
      '/images/volta/vsm.jpg',
      '/images/volta/vb2_pro.jpg',
    ],
    specs: {
      engine: '220W Verimli Motor',
      range: '40 km Menzil',
      speed: '25 km/s Azami Hız',
      battery: '48V 14Ah VRLA Jel Akü',
      brakes: 'Ön / Arka Kampana Fren',
      weight: '52 kg',
      chargeTime: '6 - 8 Saat (220V Standart Priz)',
      capacity: '130 kg Azami Taşıma Kapasitesi'
    },
    detailedSpecs: [
      { label: 'Motor Gücü', value: '220W Yüksek Verimli Fırçasız DC Motor' },
      { label: 'Batarya & Akü', value: '48V 14Ah VRLA Derin Döngülü Jel Akü' },
      { label: 'Menzil', value: '40 km (Sürüş moduna ve yüke göre değişken)' },
      { label: 'Azami Hız', value: '25 km/s (Yasal Şehir İçi Hız Sınırı)' },
      { label: 'Şarj Süresi', value: 'Standart 220V Ev Prizinden 6-8 Saat' },
      { label: 'Fren Sistemi', value: 'Mekanik Kampana Ön ve Arka Fren' },
      { label: 'Aydınlatma', value: 'Geniş Açılı LED Ön Far ve Entegre Arka Stop' },
      { label: 'Taşıma & Ağırlık', value: '52 kg Boş Ağırlık / 130 kg Taşıma Kapasitesi' },
      { label: 'Ehliyet Durumu', value: 'Ehliyetsiz & B Sınıfı ile Kullanıma Uygun' },
      { label: 'Garanti', value: '2 Yıl Volta Motor Resmi Fabrika Garantisi' }
    ],
    features: [
      'Çıkarılabilir Taşınabilir Akü Kutusu (Evde / Ofiste Kolay Şarj)',
      'Pedallı Sürüş Asistanı & Şehir İçi Ulaşım Kolaylığı',
      'LED Ön Far & Arka Güvenlik Stop Lambası',
      'B Sınıfı Ehliyet veya Ehliyetsiz Kullanım İmkanı',
      'Geniş Ön Sepet ve Ergonomik Süngerli Konfor Sele'
    ],
    isFeaturedCampaign: true
  },
  {
    id: 'vb2-pro',
    name: 'VB2 PRO',
    category: 'Elektrikli Bisiklet',
    tagline: 'Katlanabilir alüminyum gövde ile özgürce her yere yanınızda',
    price: 32990,
    oldPrice: 36950,
    discountRate: 10,
    advantageAmount: 3960,
    image: '/images/volta/vb2_pro.jpg',
    images: [
      '/images/volta/vb2_pro.jpg',
      '/images/volta/vb2_pro.jpg',
      '/images/volta/vsm.jpg',
    ],
    specs: {
      engine: '250W Yüksek Torklu Motor',
      range: '50-80 km Destek Menzili',
      speed: '25 km/s Yasal Hız Sınırı',
      battery: '36V 10.4Ah Lityum-İyon Entegre Akü',
      brakes: 'Ön / Arka Mekanik Disk Fren',
      weight: '22 kg',
      chargeTime: '4 - 6 Saat',
      capacity: '120 kg'
    },
    detailedSpecs: [
      { label: 'Motor Gücü', value: '250W Arka Göbek Fırçasız Motor' },
      { label: 'Batarya', value: '36V 10.4Ah Kilitlenebilir Taşınabilir Lityum-İyon' },
      { label: 'Destek Menzili', value: '50 - 80 km (Pedal Asistan Desteği ile)' },
      { label: 'Vites Sistemi', value: 'Shimano 6 İleri Vites Aktarma Mekanizması' },
      { label: 'Kadro & Gövde', value: 'Hafif ve Mukavemetli Katlanabilir Alüminyum Kadro' },
      { label: 'Gösterge Ekranı', value: 'Akıllı LCD Dijital Hız, Batarya ve Kademe Ekranı' },
      { label: 'Fren Sistemi', value: 'Yüksek Performanslı Ön & Arka Disk Fren' },
      { label: 'Süspansiyon', value: 'Kilitlenebilir Ön Amortisörlü Maşa' },
      { label: 'Ağırlık', value: '22 kg (Batarya dahil süper hafif tasarım)' },
      { label: 'Garanti', value: '2 Yıl Volta Motor Resmi Garantisi' }
    ],
    features: [
      'Hafif Katlanabilir Alüminyum Kadro (Araç Bagajına Sığar)',
      'Entegre Akıllı LCD Bilgi & Hız Ekranı',
      'Shimano 6 Vites Profesyonel Aktarma Sistemi',
      'Kadro İçi Gizli Kilitlenebilir Lityum Batarya',
      'Süspansiyonlu Ön Maşa ile Pürüzsüz & Sarsıntısız Sürüş'
    ],
    isFeaturedCampaign: true
  },
  {
    id: 'vs1',
    name: 'VS1',
    category: 'Elektrikli Moped',
    tagline: 'Modern çizgiler, sıfır emisyon ve sessiz şehir performansı',
    price: 43900,
    oldPrice: 48500,
    discountRate: 9,
    advantageAmount: 4600,
    image: '/images/volta/vsm.jpg',
    images: [
      '/images/volta/vsm.jpg',
      '/images/volta/vb2_pro.jpg'
    ],
    specs: {
      engine: '1500W Bosch Motor',
      range: '55 km Menzil',
      speed: '45 km/s Azami Hız',
      battery: '60V 20Ah Jel Akü',
      brakes: 'Ön Disk / Arka Kampana',
      weight: '68 kg',
      chargeTime: '6 - 7 Saat',
      capacity: '150 kg'
    },
    detailedSpecs: [
      { label: 'Motor Gücü', value: '1500W Yüksek Verimli Bosch Elektrikli Motor' },
      { label: 'Batarya', value: '60V 20Ah Derin Deşarjlı Jel Batarya Paketi' },
      { label: 'Menzil', value: '55 km Şehir İçi Optimum Kullanım' },
      { label: 'Azami Hız', value: '45 km/s Hız Limiti' },
      { label: 'Gösterge', value: 'Geniş Renkli Dijital TFT Gösterge Paneli' },
      { label: 'Aydınlatma', value: 'Full LED Gündüz Farları ve Arka Stop' },
      { label: 'Ekstralar', value: 'USB Şarj Çıkışı & Kask Askısı' },
      { label: 'Garanti', value: '2 Yıl Resmi Volta Fabrika Garantisi' }
    ],
    features: [
      'Geniş Dijital Gösterge Paneli ve Hız Uyarıları',
      'Gündüz LED Farları ve Dinamik Projektör Aydınlatma',
      'USB Şarj Portu ile Telefon ve Cihaz Şarjı',
      'Yüksek Taşıma Kapasitesi ve Çift Kişilik Konforlu Sele'
    ]
  },
  {
    id: 'vm4',
    name: 'VM4',
    category: 'Elektrikli Üç Tekerlekli',
    tagline: 'Maksimum denge, güvenlik ve yük taşıma kapasitesi',
    price: 54900,
    oldPrice: 59900,
    discountRate: 8,
    advantageAmount: 5000,
    image: '/images/volta/vsm.jpg',
    images: [
      '/images/volta/vsm.jpg',
      '/images/volta/vb2_pro.jpg'
    ],
    specs: {
      engine: '1000W Diferansiyelli Motor',
      range: '45 km Menzil',
      speed: '25 km/s Güvenli Hız',
      battery: '60V 20Ah Jel Akü',
      brakes: 'Ön & Arka Hidrolik Kampana',
      weight: '98 kg',
      chargeTime: '7 - 8 Saat',
      capacity: '180 kg'
    },
    detailedSpecs: [
      { label: 'Motor', value: '1000W Güçlendirilmiş Diferansiyelli Elektrik Motoru' },
      { label: 'Batarya', value: '60V 20Ah Yüksek Kapasiteli Jel Akü' },
      { label: 'Güvenlik', value: 'Geri Vites Sesli İkazı & Denge Destek Tekerlekleri' },
      { label: 'Koltuk Düzeni', value: 'Kolçaklı, İleri-Geri Ayarlanabilir Ortopedik Koltuk' },
      { label: 'Depolama', value: 'Geniş Arka Bagaj Sepeti ve Ön Saklama Bölmesi' },
      { label: 'Garanti', value: '2 Yıl Resmi Üretici Garantisi' }
    ],
    features: [
      'Geri Vites ve Sesli İkaz Sistemi',
      'Kolçaklı ve İleri-Geri Ayarlı Lüks Koltuk',
      'Geniş Arka Alışveriş & Eşya Sepeti',
      'Devrilmeyi Önleyici Güvenlik Denge Tekerlekleri'
    ]
  },
  {
    id: 'vb1',
    name: 'VB1',
    category: 'Elektrikli Bisiklet',
    tagline: 'Klasik şehir bisikleti zarafeti, elektrik gücüyle buluştu',
    price: 27900,
    oldPrice: 30500,
    discountRate: 8,
    advantageAmount: 2600,
    image: '/images/volta/vb2_pro.jpg',
    images: [
      '/images/volta/vb2_pro.jpg',
      '/images/volta/vsm.jpg'
    ],
    specs: {
      engine: '250W Fırçasız Motor',
      range: '40-60 km Menzil',
      speed: '25 km/s',
      battery: '36V 8.8Ah Lityum Akü',
      brakes: 'V-Fren & Kampana',
      weight: '20 kg',
      chargeTime: '4 - 5 Saat',
      capacity: '110 kg'
    },
    detailedSpecs: [
      { label: 'Motor Gücü', value: '250W Entegre Göbek Motoru' },
      { label: 'Batarya', value: '36V 8.8Ah Çıkarılabilir Taşınabilir Lityum Batarya' },
      { label: 'Menzil', value: '40 - 60 km Pedal Destekli Menzil' },
      { label: 'Kadro', value: 'Alüminyum Alaşımlı Şehir Kadrosu' },
      { label: 'Bagaj', value: 'Geniş Arka Taşıma Rafı' },
      { label: 'Garanti', value: '2 Yıl Resmi Volta Garantisi' }
    ],
    features: [
      'Ergonomik Şehir Geometrisi ve Kolay İniş-Biniş Kadro',
      'Çıkarılabilir Hafif Lityum Batarya',
      'Geniş Arka Bagaj Taşıyıcı Raf',
      'Ayarlanabilir Ergonomik Gidon ve Jel Destekli Sele'
    ]
  }
];

const VOLTA_CUSTOM_PRICES_KEY = 'volta_custom_prices_v1';

export function getVoltaModels(): VoltaModel[] {
  if (typeof window === 'undefined') {
    return INITIAL_VOLTA_MODELS;
  }
  try {
    const raw = localStorage.getItem(VOLTA_CUSTOM_PRICES_KEY);
    if (!raw) return INITIAL_VOLTA_MODELS;
    const overrides: Record<string, Partial<VoltaModel>> = JSON.parse(raw);
    return INITIAL_VOLTA_MODELS.map((model) => {
      const override = overrides[model.id];
      if (!override) return model;
      return {
        ...model,
        ...override,
        price: override.price ?? model.price,
        oldPrice: override.oldPrice ?? model.oldPrice,
        discountRate: override.discountRate ?? model.discountRate,
        advantageAmount: override.advantageAmount ?? model.advantageAmount,
        isFeaturedCampaign: override.isFeaturedCampaign !== undefined ? override.isFeaturedCampaign : model.isFeaturedCampaign,
      };
    });
  } catch {
    return INITIAL_VOLTA_MODELS;
  }
}

export function saveVoltaPriceOverride(
  id: string,
  price: number,
  oldPrice?: number,
  discountRate?: number,
  advantageAmount?: number,
  isFeaturedCampaign?: boolean
) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(VOLTA_CUSTOM_PRICES_KEY);
    const overrides: Record<string, Partial<VoltaModel>> = raw ? JSON.parse(raw) : {};
    
    // Auto calculate if not supplied
    const calculatedDiscount = (oldPrice && oldPrice > price) 
      ? Math.round(((oldPrice - price) / oldPrice) * 100) 
      : undefined;
      
    const calculatedAdvantage = (oldPrice && oldPrice > price) 
      ? oldPrice - price 
      : undefined;

    overrides[id] = {
      price,
      oldPrice,
      discountRate: discountRate !== undefined && discountRate > 0 ? discountRate : calculatedDiscount,
      advantageAmount: advantageAmount !== undefined && advantageAmount > 0 ? advantageAmount : calculatedAdvantage,
      isFeaturedCampaign: isFeaturedCampaign !== undefined ? isFeaturedCampaign : overrides[id]?.isFeaturedCampaign,
    };
    
    localStorage.setItem(VOLTA_CUSTOM_PRICES_KEY, JSON.stringify(overrides));
    
    // Broadcast change
    try {
      const bc = new BroadcastChannel('volta_prices_channel');
      bc.postMessage({ type: 'PRICES_UPDATED', id, price });
      bc.close();
    } catch {
      // ignore
    }
  } catch (e) {
    console.error('Failed to save Volta price override:', e);
  }
}

export function resetVoltaPrices() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(VOLTA_CUSTOM_PRICES_KEY);
  try {
    const bc = new BroadcastChannel('volta_prices_channel');
    bc.postMessage({ type: 'PRICES_RESET' });
    bc.close();
  } catch {
    // ignore
  }
}

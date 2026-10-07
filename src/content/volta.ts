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
  specs: {
    engine: string;
    range: string;
    speed: string;
    battery: string;
    brakes?: string;
    weight?: string;
  };
  features: string[];
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
    specs: {
      engine: '220W Verimli Motor',
      range: '40 km Menzil',
      speed: '25 km/s Azami Hız',
      battery: '48V 14Ah VRLA Jel Akü',
      brakes: 'Ön / Arka Kampana Fren',
      weight: '52 kg'
    },
    features: [
      'Çıkarılabilir Taşınabilir Akü Kutusu',
      'Pedallı Sürüş Asistanı & Şehir İçi Ulaşım',
      'LED Ön Far & Arka Stop Lambası',
      'B Sınıfı Ehliyet veya Ehliyetsiz Kullanım İmkanı',
      'Geniş Ön Sepet ve Konforlu Sele'
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
    specs: {
      engine: '250W Yüksek Torklu Motor',
      range: '50-80 km Destek Menzili',
      speed: '25 km/s Yasal Hız Sınırı',
      battery: '36V 10.4Ah Lityum-İyon Entegre Akü',
      brakes: 'Ön / Arka Mekanik Disk Fren',
      weight: '22 kg'
    },
    features: [
      'Hafif Katlanabilir Alüminyum Kadro',
      'Entegre Akıllı LCD Bilgi Ekranı',
      'Shimano 6 Vites Aktarma Sistemi',
      'Kadro İçi Gizli Kilitlenebilir Lityum Batarya',
      'Süspansiyonlu Ön Maşa ile Pürüzsüz Sürüş'
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
    specs: {
      engine: '1500W Bosch Motor',
      range: '55 km Menzil',
      speed: '45 km/s',
      battery: '60V 20Ah Jel Akü',
      brakes: 'Ön Disk / Arka Kampana',
      weight: '68 kg'
    },
    features: [
      'Geniş Dijital Gösterge Paneli',
      'Gündüz LED Farları ve Dinamik Aydınlatma',
      'USB Şarj Portu ile Cihaz Şarjı',
      'Yüksek Taşıma Kapasitesi'
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
    specs: {
      engine: '1000W Diferansiyelli Motor',
      range: '45 km Menzil',
      speed: '25 km/s',
      battery: '60V 20Ah Jel Akü',
      brakes: 'Ön & Arka Hidrolik Kampana',
      weight: '98 kg'
    },
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
    specs: {
      engine: '250W Fırçasız Motor',
      range: '40-60 km Menzil',
      speed: '25 km/s',
      battery: '36V 8.8Ah Lityum Akü',
      brakes: 'V-Fren & Kampana',
      weight: '20 kg'
    },
    features: [
      'Ergonomik Şehir Geometrisi',
      'Çıkarılabilir Lityum Batarya',
      'Geniş Arka Bagaj Taşıyıcı',
      'Ayarlanabilir Gidon ve Sele'
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
  advantageAmount?: number
) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(VOLTA_CUSTOM_PRICES_KEY);
    const overrides: Record<string, Partial<VoltaModel>> = raw ? JSON.parse(raw) : {};
    overrides[id] = {
      price,
      oldPrice,
      discountRate,
      advantageAmount: advantageAmount ?? (oldPrice ? oldPrice - price : undefined),
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

import { VoltaModel } from '@/types';

export const INITIAL_VOLTA_MODELS: VoltaModel[] = [
  {
    id: 'vsm',
    name: 'VSM',
    category: 'Elektrikli Motosiklet',
    tagline: 'Şehir içi pratik, ekonomik ve Bluetooth bağlantılı elektrikli mobilite',
    price: 24990,
    oldPrice: 28900,
    discountRate: 13,
    advantageAmount: 3910,
    inStock: true,
    image: '/images/volta/vsm-sag-capraz-1_3e81a39e-8153-453e-aeaa-6bf7df6aef88.png',
    images: [
      '/images/volta/vsm-sag-capraz-1_3e81a39e-8153-453e-aeaa-6bf7df6aef88.png',
      '/images/volta/vsm-sag-yan-1.png',
      '/images/volta/vsm-on-1.png',
      '/images/volta/vsm-gidon.png'
    ],
    specs: {
      engine: '220W Verimli Motor',
      range: '40 km Menzil',
      speed: '25 km/s Azami Hız',
      battery: '48V 14Ah VRLA Jel Akü',
      chargeTime: '6 - 8 Saat (220V Standart Priz)',
      weight: '52 kg',
      payload: '130 kg Azami Taşıma Kapasitesi',
      brakes: 'Ön / Arka Mekanik Kampana Fren'
    },
    features: [
      'Bluetooth 5.0 Mobil Uygulama ile Batarya Sağlığı & Telemetri Takibi',
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
    tagline: 'Katlanabilir alüminyum gövde, Bluetooth akıllı LCD ekran ve yüksek menzil',
    price: 32990,
    oldPrice: 36950,
    discountRate: 10,
    advantageAmount: 3960,
    inStock: true,
    image: '/images/volta/vb2-pro-sag-capraz-5-photoroom_d260796b-3652-4ce2-9c55-d340d096164a.png',
    images: [
      '/images/volta/vb2-pro-sag-capraz-5-photoroom_d260796b-3652-4ce2-9c55-d340d096164a.png',
      '/images/volta/vb2-pro-sag-yan-4-photoroom.png',
      '/images/volta/vb2-pro-sol-yan-4-photoroom.png',
      '/images/volta/vb2-pro-on-kopya-photoroom.png'
    ],
    specs: {
      engine: '250W Yüksek Torklu Motor',
      range: '50-80 km Destek Menzili',
      speed: '25 km/s Yasal Hız Sınırı',
      battery: '36V 10.4Ah Lityum-İyon Entegre Akü',
      chargeTime: '4 - 6 Saat',
      weight: '22 kg',
      payload: '120 kg',
      brakes: 'Ön / Arka Mekanik Disk Fren'
    },
    features: [
      'Bluetooth 5.2 ile Volta Bisiklet Mobil Uygulaması Eşleşmesi',
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
    tagline: 'Bluetooth anahtarsız çalıştırma (Keyless Go), dijital TFT ve sessiz Bosch motor',
    price: 43900,
    oldPrice: 48500,
    discountRate: 9,
    advantageAmount: 4600,
    inStock: true,
    image: '/images/volta/vs1_ca91ac4d-0a91-4e8f-99b8-050592bd7037.png',
    images: [
      '/images/volta/vs1_ca91ac4d-0a91-4e8f-99b8-050592bd7037.png',
      '/images/volta/vs1-3.png',
      '/images/volta/vsx_9d818676-5040-4fb7-b431-50600cf5c1b5.png'
    ],
    specs: {
      engine: '1500W Bosch Motor',
      range: '55 km Menzil',
      speed: '45 km/s Azami Hız',
      battery: '60V 20Ah Jel Akü',
      chargeTime: '6 - 7 Saat',
      weight: '68 kg',
      payload: '150 kg',
      brakes: 'Ön Disk / Arka Kampana Fren'
    },
    features: [
      'Bluetooth 5.2 ile Anahtarsız Yaklaşarak Çalıştırma & Otomatik Kilit (Keyless Go)',
      'Bluetooth Entegre Dahili Hoparlör Sistemi & Kablosuz Müzik Çalma',
      'Geniş Dijital TFT Gösterge Paneli ve Telefon Bildirim Yansıtma',
      'Gündüz LED Farları ve Dinamik Projektör Aydınlatma',
      'USB Hızlı Şarj Portu ile Telefon ve Cihaz Şarjı',
      'Yüksek Taşıma Kapasitesi ve Çift Kişilik Konforlu Sele'
    ],
    isFeaturedCampaign: false
  },
  {
    id: 'vm4',
    name: 'VM4',
    category: 'Elektrikli Üç Tekerlekli',
    tagline: 'Maksimum denge, Bluetooth ses sistemi, güvenlik ve yük taşıma kapasitesi',
    price: 54900,
    oldPrice: 59900,
    discountRate: 8,
    advantageAmount: 5000,
    inStock: true,
    image: '/images/volta/Volta_VM2_3_Tekerli_Elektrikli.png',
    images: [
      '/images/volta/Volta_VM2_3_Tekerli_Elektrikli.png',
      '/images/volta/vm2-photoroom-kopya.png',
      '/images/volta/vm5-neo-dekupe-2_d68e7c80-f9d0-4391-bcf0-a7672eb3f166.png'
    ],
    specs: {
      engine: '1000W Diferansiyelli Motor',
      range: '45 km Menzil',
      speed: '25 km/s Güvenli Hız',
      battery: '60V 20Ah Jel Akü',
      chargeTime: '7 - 8 Saat',
      weight: '98 kg',
      payload: '180 kg',
      brakes: 'Ön & Arka Hidrolik Kampana Fren'
    },
    features: [
      'Bluetooth Kablosuz Hoparlör ve Müzik Çalar Donanımı',
      'Geri Vites ve Sesli İkaz Sistemi',
      'Kolçaklı ve İleri-Geri Ayarlı Lüks Koltuk',
      'Geniş Arka Alışveriş & Eşya Sepeti',
      'Devrilmeyi Önleyici Güvenlik Denge Tekerlekleri'
    ],
    isFeaturedCampaign: false
  },
  {
    id: 'vb1',
    name: 'VB1',
    category: 'Elektrikli Bisiklet',
    tagline: 'Klasik şehir bisikleti zarafeti, Bluetooth sürüş asistanı ve lityum güç',
    price: 27900,
    oldPrice: 30500,
    discountRate: 8,
    advantageAmount: 2600,
    inStock: true,
    image: '/images/volta/vb5_4bed783a-8a8f-4393-8d1e-076f232036b9.png',
    images: [
      '/images/volta/vb5_4bed783a-8a8f-4393-8d1e-076f232036b9.png',
      '/images/volta/vb5-2.png',
      '/images/volta/vb5-3.png',
      '/images/volta/vb5-4.png'
    ],
    specs: {
      engine: '250W Fırçasız Motor',
      range: '40-60 km Menzil',
      speed: '25 km/s',
      battery: '36V 8.8Ah Lityum Akü',
      chargeTime: '4 - 5 Saat',
      weight: '20 kg',
      payload: '110 kg',
      brakes: 'V-Fren & Kampana'
    },
    features: [
      'Bluetooth Akıllı Sürüş Asistanı & Mobil Uyumluluk',
      'Ergonomik Şehir Geometrisi ve Kolay İniş-Biniş Kadro',
      'Çıkarılabilir Hafif Lityum Batarya',
      'Geniş Arka Bagaj Taşıyıcı Raf',
      'Ayarlanabilir Ergonomik Gidon ve Jel Destekli Sele'
    ],
    isFeaturedCampaign: false
  }
];

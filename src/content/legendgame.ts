export interface GameListing {
  id: string;
  game: 'Valorant' | 'CS2' | 'League of Legends' | 'Steam' | 'Brawl Stars' | 'PUBG Mobile';
  title: string;
  category: 'Hesap' | 'Skin & Bıçak' | 'E-Pin & VP' | 'Random Key' | 'Elmas & UC';
  price: number;
  oldPrice?: number;
  badge?: string;
  seller: {
    username: string;
    rating: number; // e.g. 4.9
    totalSales: number;
    isVerified: boolean;
  };
  features: string[];
  deliveryType: 'Anında Teslimat' | '10-30 Dk Teslimat';
  imageGradient: string;
}

export const INITIAL_GAME_LISTINGS: GameListing[] = [
  {
    id: 'val-kuronami-vandal',
    game: 'Valorant',
    title: 'Kuronami Vandal + Yağmacı Karambit Full Hesap (İmmortal 2)',
    category: 'Hesap',
    price: 1850,
    oldPrice: 2400,
    badge: 'Popüler & Çok Satan',
    seller: {
      username: 'ProGamer_TR',
      rating: 4.95,
      totalSales: 1420,
      isVerified: true
    },
    features: [
      'Kuronami Vandal Full Seviye + Renkler',
      'Yağmacı Karambit & Asil 2.0 Bıçak',
      'İmmortal 2 Derece (TR Sunucusu)',
      'İlk Mail ve Tüm Fatura Bilgileri Dahil',
      'Kalıcı Ban Riski Yok, Temiz Sicil'
    ],
    deliveryType: 'Anında Teslimat',
    imageGradient: 'from-rose-600 via-red-500 to-amber-600'
  },
  {
    id: 'val-vp-8400',
    game: 'Valorant',
    title: '8400 VP Valorant Points TR Resmi Kod (İndirimli)',
    category: 'E-Pin & VP',
    price: 1250,
    oldPrice: 1420,
    badge: '%12 İndirim',
    seller: {
      username: 'LegendEpin_Offical',
      rating: 5.0,
      totalSales: 8900,
      isVerified: true
    },
    features: [
      'Riot Games Resmi E-Pin Kodu',
      'Tüm TR Sunucularında Geçerli',
      'SMS & E-Posta ile Anında Dijital Teslimat',
      '7/24 Canlı Destek Garantisi'
    ],
    deliveryType: 'Anında Teslimat',
    imageGradient: 'from-red-500 via-rose-600 to-pink-600'
  },
  {
    id: 'cs2-karambit-doppler',
    game: 'CS2',
    title: 'Karambit Doppler Phase 2 (Fabrikadan Yeni Çıkmış) 0.01 Float',
    category: 'Skin & Bıçak',
    price: 24500,
    oldPrice: 28000,
    badge: 'Nadir Koleksiyon',
    seller: {
      username: 'SkinTrader_CS',
      rating: 4.98,
      totalSales: 630,
      isVerified: true
    },
    features: [
      'Phase 2 Maksimum Pembe Galaksi Deseni',
      'Çiziksiz Köşe (Clean Corner)',
      'Steam Takas Koruması Yok (Anında Takaslanabilir)',
      'Güvenli Escrow & Takas Doğrulaması'
    ],
    deliveryType: '10-30 Dk Teslimat',
    imageGradient: 'from-cyan-600 via-blue-600 to-indigo-700'
  },
  {
    id: 'cs2-prime-global',
    game: 'CS2',
    title: 'CS2 Seçkin (Prime) Statüsünde 10 Yıllık Rozetli Hesap',
    category: 'Hesap',
    price: 650,
    oldPrice: 850,
    badge: 'Seçkin Durum',
    seller: {
      username: 'SteamVeterans',
      rating: 4.9,
      totalSales: 2100,
      isVerified: true
    },
    features: [
      'Prime Statüsü Aktif',
      '10 Yıllık ve 5 Yıllık Hizmet Rozetleri',
      'Steam Seviye 25 + Temiz VAC Durumu',
      'Tüm Orijinal E-Posta Bilgileriyle Birlikte'
    ],
    deliveryType: 'Anında Teslimat',
    imageGradient: 'from-amber-600 via-yellow-500 to-orange-600'
  },
  {
    id: 'lol-challenger-ready',
    game: 'League of Legends',
    title: 'Tüm Şampiyonlar Açık + 180 Kostüm (Özel Prestij Serisi) TR',
    category: 'Hesap',
    price: 1450,
    oldPrice: 1900,
    badge: 'Full Şampiyon',
    seller: {
      username: 'ChallengerVault',
      rating: 4.92,
      totalSales: 780,
      isVerified: true
    },
    features: [
      '168 Şampiyonun Tamamı Açık',
      '180 Kostüm (3 Ebedi, 14 Efsanevi, 6 Prestij)',
      '120.000 Mavi Öz Hazır',
      'Takdir Seviyesi 5, Ban Geçmişi Sıfır'
    ],
    deliveryType: 'Anında Teslimat',
    imageGradient: 'from-blue-600 via-sky-500 to-teal-500'
  },
  {
    id: 'steam-random-vip',
    game: 'Steam',
    title: 'VIP Steam Random Key (Minimum 50$ - 150$ Değerinde Oyun Garantili)',
    category: 'Random Key',
    price: 89,
    oldPrice: 150,
    badge: 'AAA Oyun Garantili',
    seller: {
      username: 'KeyMaster_Global',
      rating: 4.88,
      totalSales: 14500,
      isVerified: true
    },
    features: [
      'AAA Sınıfı Oyun Garantisi (Cyberpunk, RDR2, GTA V vb.)',
      'Ücretsiz DLC veya Düşük Bütçeli Oyun İçermez',
      'Tek Seferlik Küresel Steam Kodu',
      'Otomatik Bot Teslimatı'
    ],
    deliveryType: 'Anında Teslimat',
    imageGradient: 'from-indigo-600 via-purple-600 to-pink-600'
  },
  {
    id: 'pubg-uc-8100',
    game: 'PUBG Mobile',
    title: '8100 UC PUBG Mobile Resmi Yükleme Kodu (Global)',
    category: 'Elmas & UC',
    price: 1890,
    oldPrice: 2150,
    badge: 'Resmi Kod',
    seller: {
      username: 'LegendEpin_Offical',
      rating: 5.0,
      totalSales: 8900,
      isVerified: true
    },
    features: [
      'Midasbuy Resmi Yükleme Kodu',
      'Tüm Dünya ve Türkiye Hesaplarında Geçerli',
      'Şifresiz Güvenli Yükleme',
      'Anında SMS & Mail Teslim'
    ],
    deliveryType: 'Anında Teslimat',
    imageGradient: 'from-yellow-600 via-amber-500 to-red-600'
  },
  {
    id: 'brawl-gems-360',
    game: 'Brawl Stars',
    title: '360 Elmas + Brawl Pass Plus Paketi Resmi Kodu',
    category: 'Elmas & UC',
    price: 490,
    oldPrice: 590,
    badge: 'Popüler',
    seller: {
      username: 'SupercellDirect',
      rating: 4.96,
      totalSales: 3400,
      isVerified: true
    },
    features: [
      'Supercell Store Resmi Aktivasyon Kodu',
      'Süpercell ID ile 1 Tıkla Hesaba Geçiş',
      'Brawl Pass Açılabilir Bakiye',
      'Güvenli ve Lisanslı Dijital Ürün'
    ],
    deliveryType: 'Anında Teslimat',
    imageGradient: 'from-violet-600 via-fuchsia-600 to-pink-500'
  }
];

const LEGEND_LISTINGS_KEY = 'legendgame_listings_v1';

export function getLegendListings(): GameListing[] {
  if (typeof window === 'undefined') return INITIAL_GAME_LISTINGS;
  try {
    const raw = localStorage.getItem(LEGEND_LISTINGS_KEY);
    if (!raw) return INITIAL_GAME_LISTINGS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_GAME_LISTINGS;
  }
}

export function saveLegendListing(listing: GameListing) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLegendListings();
    const index = current.findIndex(l => l.id === listing.id);
    let updated: GameListing[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = listing;
    } else {
      updated = [listing, ...current];
    }
    localStorage.setItem(LEGEND_LISTINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save listing:', e);
  }
}

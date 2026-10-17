export interface User {
  id: string;
  name: string;
  username: string; // 'gglegend' is the superadmin
  email: string;
  phone: string;
  password?: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface VoltaModelSpecs {
  engine: string;
  range: string;
  speed: string;
  battery: string;
  chargeTime: string;
  weight: string;
  payload: string;
  brakes: string;
}

export interface VoltaModel {
  id: string;
  name: string;
  tagline: string;
  category: 'Elektrikli Motosiklet' | 'Elektrikli Bisiklet' | 'Elektrikli Moped' | 'Elektrikli Üç Tekerlekli';
  price: number;
  oldPrice?: number;
  discountRate?: number;
  advantageAmount?: number;
  isFeaturedCampaign?: boolean;
  inStock: boolean;
  image: string;
  images: string[];
  specs: VoltaModelSpecs;
  features: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  modelId: string;
  modelName: string;
  amount: number;
  paymentMethod: 'havale' | 'kart' | 'fast';
  status: 'beklemede' | 'onaylandi' | 'sevk_edildi' | 'tamamlandi' | 'iptal';
  city: string;
  address: string;
  notes?: string;
  receiptNote?: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  badge: string;
  description: string;
  active: boolean;
  discountBadge?: string;
}

export interface BankInfo {
  bankName: string;
  accountHolder: string;
  iban: string;
  description?: string;
}


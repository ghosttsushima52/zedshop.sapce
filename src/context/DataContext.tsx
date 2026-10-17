'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { VoltaModel, Order, BankInfo } from '@/types';
import { INITIAL_VOLTA_MODELS } from '@/data/models';

interface DataContextType {
  models: VoltaModel[];
  updateModel: (id: string, updates: Partial<VoltaModel>) => void;
  resetModels: () => void;
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  bankInfo: BankInfo;
  updateBankInfo: (info: BankInfo) => void;
}

const MODELS_STORAGE_KEY = 'volta_models_data_v2';
const ORDERS_STORAGE_KEY = 'volta_orders_data_v2';
const BANK_STORAGE_KEY = 'volta_bank_info_v1';

const DEFAULT_BANK_INFO: BankInfo = {
  bankName: '',
  accountHolder: '',
  iban: '',
  description: 'Ödeme bilgisi için siparişinizi tamamlayabilir veya doğrudan talep edebilirsiniz.',
};


// Seed demo orders so admin panel is not empty upon first load
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'VLT-849201',
    customerName: 'Ahmet Yılmaz',
    customerPhone: '0532 450 12 34',
    customerEmail: 'ahmet.yilmaz@gmail.com',
    modelId: 'vsm',
    modelName: 'Volta VSM',
    amount: 24990,
    paymentMethod: 'havale',
    status: 'onaylandi',
    city: 'İstanbul',
    address: 'Kadıköy, Moda Cad. No: 14 Daire: 2',
    receiptNote: 'Akbank Havalesi teyit edildi.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'ord-102',
    orderNumber: 'VLT-849202',
    customerName: 'Burak Demir',
    customerPhone: '0543 890 56 78',
    customerEmail: 'burak.d@outlook.com',
    modelId: 'vb2-pro',
    modelName: 'Volta VB2 PRO',
    amount: 32990,
    paymentMethod: 'fast',
    status: 'beklemede',
    city: 'İzmir',
    address: 'Karşıyaka, Bostanlı Mah. 1820 Sok.',
    notes: 'Mesai saatleri sonrası teslimat rica olunur.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'ord-103',
    orderNumber: 'VLT-849203',
    customerName: 'Zeynep Kaya',
    customerPhone: '0555 123 78 90',
    customerEmail: 'zeynep.kaya@gmail.com',
    modelId: 'vs1',
    modelName: 'Volta VS1',
    amount: 43900,
    paymentMethod: 'kart',
    status: 'sevk_edildi',
    city: 'Bursa',
    address: 'Nilüfer, Ataevler Mah.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [models, setModels] = useState<VoltaModel[]>(INITIAL_VOLTA_MODELS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);
  const [bankInfo, setBankInfo] = useState<BankInfo>(DEFAULT_BANK_INFO);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedModels = localStorage.getItem(MODELS_STORAGE_KEY);
      if (storedModels) {
        setModels(JSON.parse(storedModels));
      } else {
        localStorage.setItem(MODELS_STORAGE_KEY, JSON.stringify(INITIAL_VOLTA_MODELS));
      }

      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
      }

      const storedBank = localStorage.getItem(BANK_STORAGE_KEY);
      if (storedBank) {
        setBankInfo(JSON.parse(storedBank));
      } else {
        localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(DEFAULT_BANK_INFO));
      }
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  }, []);


  const updateModel = (id: string, updates: Partial<VoltaModel>) => {
    const updated = models.map((m) => {
      if (m.id !== id) return m;
      const merged = { ...m, ...updates };

      // Recompute advantage if oldPrice and price are present
      if (updates.oldPrice !== undefined || updates.price !== undefined) {
        const curOld = updates.oldPrice ?? m.oldPrice;
        const curPrice = updates.price ?? m.price;
        if (curOld && curOld > curPrice) {
          merged.advantageAmount = curOld - curPrice;
          merged.discountRate = Math.round(((curOld - curPrice) / curOld) * 100);
        }
      }

      return merged;
    });

    setModels(updated);
    try {
      localStorage.setItem(MODELS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save models:', e);
    }
  };

  const resetModels = () => {
    setModels(INITIAL_VOLTA_MODELS);
    localStorage.setItem(MODELS_STORAGE_KEY, JSON.stringify(INITIAL_VOLTA_MODELS));
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber: `VLT-${randomSuffix}`,
      status: 'beklemede',
      createdAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save order:', e);
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update order status:', e);
    }
  };

  const deleteOrder = (orderId: string) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete order:', e);
    }
  };

  const updateBankInfo = (newInfo: BankInfo) => {
    setBankInfo(newInfo);
    try {
      localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(newInfo));
    } catch (e) {
      console.error('Failed to save bank info:', e);
    }
  };

  return (
    <DataContext.Provider
      value={{
        models,
        updateModel,
        resetModels,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        bankInfo,
        updateBankInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

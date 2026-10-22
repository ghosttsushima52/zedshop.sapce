'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { WhatsAppIcon } from './Icons';

interface UserOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPayment: () => void;
}

export const UserOrdersModal: React.FC<UserOrdersModalProps> = ({ isOpen, onClose, onStartPayment }) => {
  const { user, isAdmin } = useAuth();
  const { orders } = useData();

  if (!isOpen || !user) return null;

  // Filter orders related to the logged in user
  // If user is gglegend, can view all orders or their orders
  const userOrders = isAdmin
    ? orders
    : orders.filter((o) => {
        const emailMatch = user.email && o.customerEmail && o.customerEmail.toLowerCase() === user.email.toLowerCase();
        const phoneMatch = user.phone && o.customerPhone && o.customerPhone.replace(/\D/g, '') === user.phone.replace(/\D/g, '');
        const nameMatch = user.name && o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase();
        return emailMatch || phoneMatch || nameMatch;
      });

  return (
    <div className="fixed inset-0 z-50 flex sm:items-center items-start justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#14212d] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
              👤
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight">{user.name}</h3>
                {isAdmin && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    YÖNETİCİ
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">@{user.username} • {user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isAdmin ? 'Tüm Rezervasyon ve Sipariş Kayıtları' : 'Siparişlerim & Rezervasyonlarım'}
            </h4>
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
              {userOrders.length} Kayıt
            </span>
          </div>

          {userOrders.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-3xl block mb-2">🛵</span>
              <p className="text-sm font-bold text-slate-700">Henüz aktif bir araç rezervasyonunuz bulunmuyor.</p>
              <p className="text-xs text-slate-500 mt-1">Dilediğiniz Volta modelini seçerek hemen online sipariş oluşturabilirsiniz.</p>
              <button
                onClick={() => {
                  onClose();
                  onStartPayment();
                }}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
              >
                Yeni Rezervasyon Yap
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {userOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {ord.orderNumber}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        ord.status === 'onaylandi'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'sevk_edildi'
                          ? 'bg-blue-100 text-blue-800'
                          : ord.status === 'iptal'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <h5 className="font-bold text-slate-900 text-sm">{ord.modelName}</h5>
                    <span className="font-black text-red-600 text-sm font-mono">
                      {ord.amount.toLocaleString('tr-TR')} TL
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-2 space-y-0.5">
                    <p><strong>Ödeme Yöntemi:</strong> {ord.paymentMethod.toUpperCase()}</p>
                    <p><strong>Teslimat İli:</strong> {ord.city}</p>
                    <p><strong>Tarih:</strong> {new Date(ord.createdAt).toLocaleDateString('tr-TR')}</p>
                    {ord.receiptNote && (
                      <p className="text-emerald-700 font-semibold mt-1">
                        <strong>Ödeme Teyidi:</strong> {ord.receiptNote}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Support Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <div>
              <h5 className="text-xs font-bold text-emerald-900">Sipariş Danışma Hattı</h5>
              <p className="text-[11px] text-emerald-700">Rezervasyon durumu ve sevkiyat sorularınız için doğrudan WhatsApp&apos;tan yazabilirsiniz.</p>
            </div>
            <a
              href="https://wa.me/905000000000?text=Merhaba,%20sipari%C5%9Fim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shadow-sm"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp Destek</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { VoltaModel, Order } from '@/types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin, usersList } = useAuth();
  const { models, updateModel, resetModels, orders, updateOrderStatus, deleteOrder, bankInfo, updateBankInfo } = useData();

  const [activeTab, setActiveTab] = useState<'models' | 'orders' | 'users' | 'bank' | 'stats'>('models');
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOldPrice, setEditOldPrice] = useState<number>(0);
  const [editInStock, setEditInStock] = useState<boolean>(true);
  const [editIsFeatured, setEditIsFeatured] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Bank & IBAN local form state
  const [adminBankName, setAdminBankName] = useState(bankInfo?.bankName || '');
  const [adminAccountHolder, setAdminAccountHolder] = useState(bankInfo?.accountHolder || '');
  const [adminIban, setAdminIban] = useState(bankInfo?.iban || '');
  const [adminBankDesc, setAdminBankDesc] = useState(bankInfo?.description || '');


  if (!isOpen) return null;

  // Strict Security Check: Only gglegend allowed!
  if (!isAdmin || user?.username.toLowerCase() !== 'gglegend') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-red-200">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
            🔒
          </div>
          <h2 className="text-xl font-black text-slate-900">Yetkisiz Erişim Engellendi</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Volta Motor Yönetim Paneline sadece <span className="font-bold text-red-600 font-mono">gglegend</span> kullanıcı adına sahip süper yönetici erişebilir.
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition"
          >
            Kapat
          </button>
        </div>
      </div>
    );
  }

  const handleStartEdit = (m: VoltaModel) => {
    setEditingModelId(m.id);
    setEditPrice(m.price);
    setEditOldPrice(m.oldPrice || m.price);
    setEditInStock(m.inStock);
    setEditIsFeatured(!!m.isFeaturedCampaign);
  };

  const handleSaveModel = (id: string) => {
    updateModel(id, {
      price: Number(editPrice),
      oldPrice: Number(editOldPrice),
      inStock: editInStock,
      isFeaturedCampaign: editIsFeatured,
    });
    setEditingModelId(null);
    setSaveSuccessMessage('Model fiyat ve stok bilgileri başarıyla güncellendi!');
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter((o) => o.status === statusFilter);

  const totalRevenue = orders
    .filter((o) => o.status !== 'iptal')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#14212d] text-white px-6 py-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center font-black text-xl shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight">Volta Motor Yönetim Paneli</h1>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  gglegend (Süper Admin)
                </span>
              </div>
              <p className="text-xs text-slate-400">Canlı fiyat yönetimi, gelen siparişler ve kullanıcılar</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-9 h-9 rounded-xl flex items-center justify-center transition border border-slate-700 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('models')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'models'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white'
              }`}
            >
              🏍️ Fiyat & Model Yönetimi ({models.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white'
              }`}
            >
              📦 Gelen Siparişler ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'users'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white'
              }`}
            >
              👥 Kayıtlı Kullanıcılar ({usersList.length})
            </button>
            <button
              onClick={() => {
                setAdminBankName(bankInfo?.bankName || '');
                setAdminAccountHolder(bankInfo?.accountHolder || '');
                setAdminIban(bankInfo?.iban || '');
                setAdminBankDesc(bankInfo?.description || '');
                setActiveTab('bank');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'bank'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white'
              }`}
            >
              💳 IBAN & Ödeme Bilgisi
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'stats'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white'
              }`}
            >
              📊 Finans & Raporlar
            </button>
          </div>

          {activeTab === 'models' && (
            <button
              onClick={resetModels}
              className="text-[11px] font-semibold text-slate-500 hover:text-red-600 underline whitespace-nowrap shrink-0"
              title="Fiyatları fabrika varsayılanına döndür"
            >
              Varsayılana Sıfırla
            </button>
          )}
        </div>

        {/* Success Banner */}
        {saveSuccessMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-bold px-6 py-2.5 flex items-center justify-between">
            <span>✓ {saveSuccessMessage}</span>
            <button onClick={() => setSaveSuccessMessage(null)} className="text-emerald-600 hover:text-emerald-900">✕</button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {/* TAB 1: MODELS MANAGEMENT */}
          {activeTab === 'models' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Canlı Araç Fiyat ve Stok Kontrolü</h3>
                  <p className="text-xs text-slate-500">Değiştirdiğiniz fiyatlar ve indirimler ana sayfada anında güncellenir.</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  Gerçek Zamanlı Senkronize
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {models.map((m) => {
                  const isEditing = editingModelId === m.id;
                  return (
                    <div
                      key={m.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      {/* Product Thumbnail & Identity */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-xl p-1 flex items-center justify-center shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={m.image} alt={m.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-black text-slate-900">{m.name}</h4>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {m.category}
                            </span>
                            {m.isFeaturedCampaign && (
                              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                                Öne Çıkan
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 max-w-md line-clamp-1">{m.tagline}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                            <span className="font-bold text-slate-900">
                              Satış: {m.price.toLocaleString('tr-TR')} TL
                            </span>
                            {m.oldPrice && (
                              <span className="text-slate-400 line-through">
                                Liste: {m.oldPrice.toLocaleString('tr-TR')} TL
                              </span>
                            )}
                            <span className={m.inStock ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                              {m.inStock ? '• Stokta Var' : '• Tükendi'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Edit Fields or Action Button */}
                      {isEditing ? (
                        <div className="w-full md:w-auto bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Satış Fiyatı (TL)</label>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-28 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Liste Fiyatı (TL)</label>
                              <input
                                type="number"
                                value={editOldPrice}
                                onChange={(e) => setEditOldPrice(Number(e.target.value))}
                                className="w-28 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-3 pt-1">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editInStock}
                                onChange={(e) => setEditInStock(e.target.checked)}
                                className="rounded text-red-600"
                              />
                              <span>Stokta Var</span>
                            </label>
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editIsFeatured}
                                onChange={(e) => setEditIsFeatured(e.target.checked)}
                                className="rounded text-red-600"
                              />
                              <span>Öne Çıkar</span>
                            </label>
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <button
                              onClick={() => handleSaveModel(m.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
                            >
                              Kaydet
                            </button>
                            <button
                              onClick={() => setEditingModelId(null)}
                              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-2.5 py-1.5 rounded-lg transition"
                            >
                              Vazgeç
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button
                            onClick={() => handleStartEdit(m)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm"
                          >
                            Düzenle & Fiyat Değiştir
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Order Filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Gelen Siparişler & Rezervasyon Talepleri</h3>
                  <p className="text-xs text-slate-500">Müşterilerin verdiği siparişleri ve ödeme bildirimlerini yönetin.</p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {['all', 'beklemede', 'onaylandi', 'sevk_edildi', 'iptal'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition capitalize ${
                        statusFilter === st ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {st === 'all' ? 'Tümü' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                  <p className="text-sm font-bold text-slate-600">Seçilen filtrelere uygun sipariş bulunamadı.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{ord.modelName}</span>
                          <span className="text-xs font-mono font-black text-red-600">
                            {ord.amount.toLocaleString('tr-TR')} TL
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 flex flex-wrap gap-x-3 gap-y-1 pt-1">
                          <span>👤 <strong>Müşteri:</strong> {ord.customerName}</span>
                          <span>📞 <strong>Tel:</strong> {ord.customerPhone}</span>
                          <span>📍 <strong>Şehir:</strong> {ord.city}</span>
                          <span>💳 <strong>Ödeme:</strong> {ord.paymentMethod.toUpperCase()}</span>
                        </div>
                        {ord.address && (
                          <p className="text-[11px] text-slate-500"><strong>Adres:</strong> {ord.address}</p>
                        )}
                        {ord.receiptNote && (
                          <p className="text-[11px] text-emerald-700 bg-emerald-50 p-1.5 rounded-lg inline-block">
                            <strong>Ödeme Notu:</strong> {ord.receiptNote}
                          </p>
                        )}
                      </div>

                      {/* Status Selector & Actions */}
                      <div className="flex items-center gap-2 self-end md:self-center">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className={`text-xs font-bold rounded-xl px-3 py-2 border outline-none cursor-pointer ${
                            ord.status === 'onaylandi'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : ord.status === 'sevk_edildi'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : ord.status === 'iptal'
                              ? 'bg-red-50 text-red-800 border-red-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="beklemede">Beklemede</option>
                          <option value="onaylandi">Onaylandı</option>
                          <option value="sevk_edildi">Sevk Edildi</option>
                          <option value="tamamlandi">Tamamlandı</option>
                          <option value="iptal">İptal Edildi</option>
                        </select>
                        <button
                          onClick={() => deleteOrder(ord.id)}
                          className="text-slate-400 hover:text-red-600 p-2 text-xs font-bold"
                          title="Siparişi Sil"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: USERS LIST */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm">Sisteme Kayıtlı Kullanıcılar</h3>
                <p className="text-xs text-slate-500">Sitenizden kayıt olan kullanıcılar ve yöneticiler.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100 text-xs">
                  {usersList.map((u) => (
                    <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                          u.username.toLowerCase() === 'gglegend'
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {u.username.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{u.name}</span>
                            <span className="font-mono text-slate-500">(@{u.username})</span>
                            {u.username.toLowerCase() === 'gglegend' && (
                              <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                                SÜPER ADMİN
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-[11px] mt-0.5">{u.email} • {u.phone || 'Telefon belirtilmedi'}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {new Date(u.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: BANK & IBAN SETTINGS */}
          {activeTab === 'bank' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Banka & IBAN Bilgileri Yönetimi</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Buraya girdiğiniz IBAN ve banka bilgileri ödeme ekranında müşterilere gösterilir. Boş bırakırsanız müşteriler doğrudan WhatsApp ile ödeme bilgisi talep edebilir.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Banka Adı
                    </label>
                    <input
                      type="text"
                      value={adminBankName}
                      onChange={(e) => setAdminBankName(e.target.value)}
                      placeholder="örn: Ziraat Bankası, Garanti BBVA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Hesap Sahibi / Alıcı Unvanı
                    </label>
                    <input
                      type="text"
                      value={adminAccountHolder}
                      onChange={(e) => setAdminAccountHolder(e.target.value)}
                      placeholder="örn: Ad Soyad veya Şirket Unvanı"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      IBAN Numarası
                    </label>
                    <input
                      type="text"
                      value={adminIban}
                      onChange={(e) => setAdminIban(e.target.value)}
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Ödeme Açıklaması / Talimatı
                    </label>
                    <textarea
                      value={adminBankDesc}
                      onChange={(e) => setAdminBankDesc(e.target.value)}
                      placeholder="örn: Açıklama kısmına sipariş takip numaranızı ve adınızı yazınız."
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setAdminBankName('');
                      setAdminAccountHolder('');
                      setAdminIban('');
                      setAdminBankDesc('');
                      updateBankInfo({
                        bankName: '',
                        accountHolder: '',
                        iban: '',
                        description: '',
                      });
                      setSaveSuccessMessage('IBAN bilgisi temizlendi. Ödeme ekranında sadece Bilgi Talep Et gösterilecek.');
                      setTimeout(() => setSaveSuccessMessage(null), 3000);
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-red-600"
                  >
                    IBAN Bilgisini Temizle
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateBankInfo({
                        bankName: adminBankName.trim(),
                        accountHolder: adminAccountHolder.trim(),
                        iban: adminIban.trim(),
                        description: adminBankDesc.trim(),
                      });
                      setSaveSuccessMessage('Banka ve IBAN bilgileri başarıyla güncellendi!');
                      setTimeout(() => setSaveSuccessMessage(null), 3000);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2.5 rounded-xl text-xs transition shadow-sm"
                  >
                    Bilgileri Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STATS & FINANCIAL SUMMARY */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase">Toplam Ciro</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {totalRevenue.toLocaleString('tr-TR')} TL
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Aktif Sipariş Toplamı</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase">Toplam Sipariş</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {orders.length} Adet
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
                    {orders.filter(o => o.status === 'beklemede').length} beklemede
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase">Kayıtlı Müşteriler</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {usersList.length} Kullanıcı
                  </div>
                  <span className="text-[11px] text-blue-600 font-semibold mt-1 block">1 Süper Admin (gglegend)</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase">Aktif Model Sayısı</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {models.length} Model
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Tümü Satışa Açık</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

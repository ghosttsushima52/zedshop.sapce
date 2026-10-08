'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Eye, 
  SlidersHorizontal, 
  RefreshCw, 
  Gamepad2, 
  Zap, 
  DollarSign, 
  Globe, 
  ExternalLink, 
  User, 
  Phone, 
  Mail, 
  AlertTriangle,
  Lock,
  ArrowRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  getStoredPaymentRequests, 
  approvePaymentRequest, 
  rejectPaymentRequest, 
  deletePaymentRequest,
  subscribePaymentUpdates 
} from '@/features/payment/paymentStore';
import { PaymentRequest } from '@/features/payment/types';
import { getVoltaModels, saveVoltaPriceOverride, resetVoltaPrices, VoltaModel } from '@/content/volta';
import { getLegendListings, saveLegendListing, GameListing } from '@/content/legendgame';
import { SHOWCASE_SITES } from '@/lib/showcase';

export default function AdminDashboardPage() {
  const { user, isMasterAdmin, isLegendClient, login, logout, openGate } = useAuth();
  const [activeTab, setActiveTab] = useState<'payments' | 'volta' | 'legend' | 'sites'>('volta');
  
  // Login form state (if accessed directly without being logged in)
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Payment Requests State
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApproveReq, setSelectedApproveReq] = useState<PaymentRequest | null>(null);
  
  // Approval Modal Form State
  const [approveIban, setApproveIban] = useState('TR33 0006 1005 1234 5678 9012 34');
  const [approveBank, setApproveBank] = useState('Türkiye İş Bankası');
  const [approveHolder, setApproveHolder] = useState('Avenox Bilişim & Mobilite Tic. A.Ş.');
  const [approveAmount, setApproveAmount] = useState('');
  const [approveNote, setApproveNote] = useState('Lütfen açıklama kısmına Ad Soyad ve GSM numaranızı yazınız.');
  const [approveDurationMinutes, setApproveDurationMinutes] = useState(10);

  // Receipt Preview Modal
  const [previewReceiptReq, setPreviewReceiptReq] = useState<PaymentRequest | null>(null);

  // Volta Models State
  const [voltaModels, setVoltaModels] = useState<VoltaModel[]>([]);
  const [editingVoltaId, setEditingVoltaId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOldPrice, setEditOldPrice] = useState<number>(0);
  const [voltaSaveMsg, setVoltaSaveMsg] = useState<string | null>(null);

  // Legend Listings State
  const [legendListings, setLegendListings] = useState<GameListing[]>([]);

  // Load initial data & subscriptions
  useEffect(() => {
    setPaymentRequests(getStoredPaymentRequests());
    setVoltaModels(getVoltaModels());
    setLegendListings(getLegendListings());

    const unsub = subscribePaymentUpdates((requests: PaymentRequest[]) => {
      setPaymentRequests(requests);
    });

    const handleStorage = () => {
      setPaymentRequests(getStoredPaymentRequests());
      setVoltaModels(getVoltaModels());
      setLegendListings(getLegendListings());
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      unsub();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(loginUser, loginPass);
    if (!res.success) {
      setLoginError(res.message || 'Hatalı kullanıcı adı veya şifre.');
    } else {
      setLoginError(null);
    }
  };

  const openApproveModal = (req: PaymentRequest) => {
    setSelectedApproveReq(req);
    setApproveAmount(req.amount || '1.000 TL');
  };

  const submitApproval = () => {
    if (!selectedApproveReq) return;
    approvePaymentRequest(selectedApproveReq.id, {
      iban: approveIban,
      bank_name: approveBank,
      account_holder: approveHolder,
      amount: approveAmount,
      admin_note: approveNote,
      duration_minutes: approveDurationMinutes,
    });
    setSelectedApproveReq(null);
    setPaymentRequests(getStoredPaymentRequests());
  };

  const handleReject = (id: string) => {
    if (confirm('Bu ödeme talebini reddetmek istediğinize emin misiniz?')) {
      rejectPaymentRequest(id);
      setPaymentRequests(getStoredPaymentRequests());
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu talebi silmek istediğinize emin misiniz?')) {
      deletePaymentRequest(id);
      setPaymentRequests(getStoredPaymentRequests());
    }
  };

  const startEditVolta = (model: VoltaModel) => {
    setEditingVoltaId(model.id);
    setEditPrice(model.price);
    setEditOldPrice(model.oldPrice || model.price);
  };

  const saveVoltaEdit = (id: string) => {
    const discount = editOldPrice > editPrice ? Math.round(((editOldPrice - editPrice) / editOldPrice) * 100) : 0;
    const advantage = editOldPrice > editPrice ? editOldPrice - editPrice : 0;
    saveVoltaPriceOverride(id, editPrice, editOldPrice, discount, advantage);
    setVoltaModels(getVoltaModels());
    setEditingVoltaId(null);
    setVoltaSaveMsg('Fiyat başarıyla güncellendi ve tüm pencerelere yansıtıldı!');
    setTimeout(() => setVoltaSaveMsg(null), 3500);
  };

  const resetAllVolta = () => {
    if (confirm('Tüm Volta fiyatlarını fabrika varsayılanlarına döndürmek istiyor musunuz?')) {
      resetVoltaPrices();
      setVoltaModels(getVoltaModels());
      setVoltaSaveMsg('Tüm Volta fiyatları sıfırlandı.');
      setTimeout(() => setVoltaSaveMsg(null), 3000);
    }
  };

  // If not logged in as Master Admin or Volta Admin
  if (!isMasterAdmin && !isLegendClient) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black">Yönetici Paneli</h1>
              <p className="text-xs text-slate-400">Yetkili Girişi Gerekir (Master Admin / Volta Yetkilisi)</p>
            </div>
          </div>

          <form onSubmit={handleDirectLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kullanıcı Adı</label>
              <input 
                type="text" 
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="qwacy"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Şifre</label>
              <input 
                type="password" 
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="Master admin şifresi..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-600/30 text-sm"
            >
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
              ← Showcase Ana Sayfasına Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter requests
  const filteredRequests = paymentRequests.filter((r) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') return r.status === 'pending' || r.status === 'waiting';
    return r.status === statusFilter;
  });

  const pendingCount = paymentRequests.filter(r => r.status === 'pending' || r.status === 'waiting').length;
  const receiptCount = paymentRequests.filter(r => r.status === 'receipt_submitted').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white">
      {/* Admin Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-600/25">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">
                  {isMasterAdmin ? 'AVENOX MASTER PANEL' : 'VOLTA MOTOR & IBAN PANELİ'}
                </h1>
                <span className="text-[10px] bg-red-600/20 text-red-400 border border-red-500/30 font-mono px-2 py-0.5 rounded-full font-bold">
                  {user?.username} ({isMasterAdmin ? 'Master Admin' : 'Volta Yetkilisi'})
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isMasterAdmin 
                  ? 'Canlı Ödemeler, Dekontlar, Volta Fiyatları & Çoklu Site Ekosistemi' 
                  : 'Volta Fiyat Güncelleme, Canlı IBAN Onaylama ve Dekont Kontrolü'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isMasterAdmin ? (
              <Link 
                href="/" 
                className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Showcase</span>
              </Link>
            ) : (
              <Link 
                href="/sites/volta" 
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-2 rounded-xl transition flex items-center gap-1.5 border border-slate-700 font-semibold"
              >
                <Zap className="w-3.5 h-3.5 text-red-400" />
                <span>Volta Sitesine Git</span>
              </Link>
            )}
            <button
              onClick={logout}
              className="text-xs text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 px-3 py-2 rounded-xl transition font-semibold"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-slate-800/80 py-2">
          <button
            onClick={() => setActiveTab('volta')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'volta'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Volta Fiyat Yönetimi</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Ödeme & IBAN Talepleri</span>
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black animate-pulse">
                {pendingCount}
              </span>
            )}
            {receiptCount > 0 && (
              <span className="bg-emerald-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                {receiptCount} Dekont
              </span>
            )}
          </button>

          {isMasterAdmin && (
            <>
              <button
                onClick={() => setActiveTab('legend')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'legend'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>LegendGame Pazar Yeri</span>
              </button>

              <button
                onClick={() => setActiveTab('sites')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'sites'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Tüm Demo Siteleri (12+2)</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= TAB 1: PAYMENTS ================= */}
        {activeTab === 'payments' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">Canlı Havale / IBAN Talepleri</h2>
                <p className="text-xs text-slate-400">
                  Volta Motor ve LegendGame sitelerinden gelen onay bekleyen ödeme talepleri ve dekontlar
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: 'Tümü' },
                  { id: 'pending', label: 'Onay Bekleyen' },
                  { id: 'approved', label: 'IBAN Verildi' },
                  { id: 'receipt_submitted', label: 'Dekont Yüklendi' },
                  { id: 'rejected', label: 'Reddedildi' },
                  { id: 'expired', label: 'Süresi Dolan' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      statusFilter === st.id
                        ? 'bg-slate-700 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Requests Table / Cards */}
            {filteredRequests.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
                <CreditCard className="w-12 h-12 mx-auto mb-3 text-slate-600 opacity-60" />
                <h3 className="text-base font-bold text-white mb-1">Henüz Talep Bulunmuyor</h3>
                <p className="text-xs max-w-sm mx-auto">
                  Volta veya LegendGame sitelerinden yeni bir ödeme talebi oluşturulduğunda burada anında belirecektir.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Customer Info & Status */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase ${
                            req.status === 'pending' || req.status === 'waiting'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                              : req.status === 'approved'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : req.status === 'receipt_submitted' || req.status === 'done'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : req.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {(req.status === 'pending' || req.status === 'waiting') && '⏳ Onay Bekliyor'}
                            {req.status === 'approved' && '⌛ Süre Sayıyor (IBAN Verildi)'}
                            {(req.status === 'receipt_submitted' || req.status === 'done') && '✅ Dekont Yüklendi!'}
                            {req.status === 'rejected' && '❌ Reddedildi'}
                            {req.status === 'expired' && '⏱ Süresi Doldu'}
                          </span>

                          <span className="text-xs text-slate-500 font-mono">
                            Kaynak: <strong className="text-slate-300">{req.site || 'Genel'}</strong>
                          </span>

                          <span className="text-xs text-slate-500">
                            {new Date(req.created_at).toLocaleTimeString('tr-TR')}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                          <div className="flex items-center gap-1.5 text-white font-bold">
                            <User className="w-4 h-4 text-slate-400" />
                            <span>{req.user_name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span>{req.user_phone}</span>
                          </div>
                          {req.user_email && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span>{req.user_email}</span>
                            </div>
                          )}
                          <div className="bg-slate-800/80 px-2.5 py-1 rounded-lg text-emerald-400 font-mono font-bold text-xs">
                            {req.amount}
                          </div>
                        </div>

                        {req.admin_note && (
                          <div className="text-xs text-slate-400 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 max-w-xl">
                            Admin Notu: {req.admin_note}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {(req.status === 'pending' || req.status === 'waiting') && (
                          <>
                            <button
                              onClick={() => openApproveModal(req)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>IBAN & Süre Ata (Onayla)</span>
                            </button>
                            <button
                              onClick={() => handleReject(String(req.id))}
                              className="bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-300 font-semibold px-3 py-2 rounded-xl text-xs transition"
                            >
                              Reddet
                            </button>
                          </>
                        )}

                        {(req.status === 'receipt_submitted' || req.status === 'done') && req.receipt && (
                          <button
                            onClick={() => setPreviewReceiptReq(req)}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-cyan-600/20"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Dekontu Görüntüle</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(String(req.id))}
                          className="text-slate-500 hover:text-rose-400 p-2 text-xs transition"
                          title="Talebi Sil"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: VOLTA ================= */}
        {activeTab === 'volta' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-white">Volta Model & Fiyat Yönetimi</h2>
                <p className="text-xs text-slate-400">
                  Modellerin satış fiyatlarını, liste fiyatlarını ve indirim oranlarını buradan anlık olarak güncelleyin.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={resetAllVolta}
                  className="text-xs text-slate-400 hover:text-rose-300 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition"
                >
                  Fabrika Fiyatlarına Sıfırla
                </button>
                <Link
                  href="/sites/volta"
                  target="_blank"
                  className="text-xs text-red-400 hover:text-white bg-red-950/60 border border-red-800/60 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Volta Sitesini Aç</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {voltaSaveMsg && (
              <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-800 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{voltaSaveMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {voltaModels.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-red-400 bg-red-950/60 px-2 py-0.5 rounded">
                        {m.category}
                      </span>
                      <h3 className="text-xl font-black text-white mt-1">{m.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{m.tagline}</p>
                    </div>

                    <div className="text-right">
                      {m.oldPrice && (
                        <div className="text-xs text-slate-500 line-through">
                          {m.oldPrice.toLocaleString('tr-TR')} TL
                        </div>
                      )}
                      <div className="text-xl font-black text-white font-mono">
                        {m.price.toLocaleString('tr-TR')} TL
                      </div>
                      {m.discountRate && (
                        <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded">
                          %{m.discountRate} İndirim
                        </span>
                      )}
                    </div>
                  </div>

                  {editingVoltaId === m.id ? (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 bg-slate-950/60 p-4 rounded-xl">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-400 font-semibold mb-1">Satış Fiyatı (TL)</label>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-red-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 font-semibold mb-1">Eski / Çizili Fiyat (TL)</label>
                          <input
                            type="number"
                            value={editOldPrice}
                            onChange={(e) => setEditOldPrice(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-red-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => saveVoltaEdit(m.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition"
                        >
                          Kaydet ve Yayınla
                        </button>
                        <button
                          onClick={() => setEditingVoltaId(null)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg text-xs transition"
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Motor: <strong className="text-slate-200">{m.specs.engine}</strong>
                      </span>
                      <button
                        onClick={() => startEditVolta(m)}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        Fiyatı Düzenle
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: LEGENDGAME ================= */}
        {activeTab === 'legend' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-white">LegendGame İlan Envanteri</h2>
                <p className="text-xs text-slate-400">
                  İtemsatış tarzı oyun hesapları, skinler, e-pin ve random key ilanları
                </p>
              </div>

              <Link
                href="/sites/legendgame"
                target="_blank"
                className="text-xs text-cyan-400 hover:text-white bg-cyan-950/60 border border-cyan-800/60 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
              >
                <span>LegendGame Sitesini Aç</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {legendListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-cyan-400 font-bold">{item.game}</span>
                      <span className="text-slate-500">{item.category}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white line-clamp-2 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-400">Satıcı: {item.seller.username} ({item.seller.rating} ★)</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-base font-black text-white font-mono">
                      {item.price.toLocaleString('tr-TR')} TL
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                      {item.deliveryType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: ALL DEMO SITES ================= */}
        {activeTab === 'sites' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-black text-white">Tüm Çoklu Site Ekosistemi</h2>
              <p className="text-xs text-slate-400">
                Avenox Showcase bünyesindeki 12 editoryal sektör demosu ve 2 özel müşteri projesi
              </p>
            </div>

            {/* Special Projects */}
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Özel Müşteri & Entegre Projeler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link
                href="/sites/volta"
                className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-900/40 p-5 rounded-2xl hover:border-red-500 transition group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-red-600 text-white font-bold text-xs px-2.5 py-0.5 rounded">VOLTA MOTOR</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                </div>
                <h4 className="text-base font-bold text-white">Elektrikli Mobilite & Resmi E-Ticaret</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Ekim kampanyası, VSM & VB2 PRO, %100 elektrikli modeller, admin fiyat özelleştirme ve IBAN ödeme.
                </p>
              </Link>

              <Link
                href="/sites/legendgame"
                className="bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-900/40 p-5 rounded-2xl hover:border-cyan-500 transition group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-cyan-500 text-slate-950 font-bold text-xs px-2.5 py-0.5 rounded">LEGENDGAME</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                </div>
                <h4 className="text-base font-bold text-white">Gaming Marketplace & E-Pin</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Valorant, CS2, LoL, Steam hesapları, escrow havuzu, dinamik IBAN ve dekont yükleme entegrasyonu.
                </p>
              </Link>
            </div>

            {/* 12 Core Showcase Demos */}
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">12 Editoryal Showcase Demosu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SHOWCASE_SITES.map((site) => (
                <Link
                  key={site.id}
                  href={`/sites/${site.id}/anasayfa`}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-slate-700 transition group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-slate-400">{site.category}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{site.pages.length} sayfa</span>
                  </div>
                  <h4 className="font-bold text-white group-hover:text-red-400 transition text-sm">{site.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{site.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ================= APPROVE PAYMENT MODAL ================= */}
      {selectedApproveReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedApproveReq(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Ödeme Talebini Onayla</h3>
                <p className="text-xs text-slate-400">
                  Kullanıcı: <strong className="text-white">{selectedApproveReq.user_name}</strong> ({selectedApproveReq.user_phone})
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Banka Adı</label>
                <input
                  type="text"
                  value={approveBank}
                  onChange={(e) => setApproveBank(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hesap Sahibi</label>
                <input
                  type="text"
                  value={approveHolder}
                  onChange={(e) => setApproveHolder(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">IBAN Numarası</label>
                <input
                  type="text"
                  value={approveIban}
                  onChange={(e) => setApproveIban(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ödenecek Tutar (TL)</label>
                  <input
                    type="text"
                    value={approveAmount}
                    onChange={(e) => setApproveAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Geri Sayım (Dakika)</label>
                  <input
                    type="number"
                    value={approveDurationMinutes}
                    onChange={(e) => setApproveDurationMinutes(Number(e.target.value))}
                    min={1}
                    max={120}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Açıklaması / Not</label>
                <textarea
                  value={approveNote}
                  onChange={(e) => setApproveNote(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedApproveReq(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={submitApproval}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                >
                  Onayla ve Geri Sayımı Başlat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= RECEIPT PREVIEW MODAL ================= */}
      {previewReceiptReq && previewReceiptReq.receipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPreviewReceiptReq(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Yüklenen Dekont Önizlemesi</h3>
                <p className="text-xs text-slate-400">
                  {previewReceiptReq.user_name} • {previewReceiptReq.user_phone} • {previewReceiptReq.amount}
                </p>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/80 mb-4 flex items-center justify-center min-h-[300px]">
              {(() => {
                const imgPath = previewReceiptReq.receipt.data_url || previewReceiptReq.receipt.file_path || '';
                const fileName = previewReceiptReq.receipt.file_name || previewReceiptReq.receipt.original_name || 'dekont';
                const fileSize = previewReceiptReq.receipt.file_size || previewReceiptReq.receipt.size || 0;
                const isImg = imgPath.startsWith('data:image') || imgPath.endsWith('.jpg') || imgPath.endsWith('.png') || imgPath.endsWith('.jpeg');
                
                if (isImg && imgPath) {
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={imgPath} 
                      alt="Yüklenen Dekont" 
                      className="max-h-[500px] max-w-full rounded-lg object-contain"
                    />
                  );
                }

                return (
                  <div className="text-center p-8 text-slate-400">
                    <FileText className="w-16 h-16 mx-auto mb-2 text-cyan-400" />
                    <p className="text-sm font-bold text-white">{fileName}</p>
                    <p className="text-xs text-slate-500 mt-1">Dosya Boyutu: {(fileSize / 1024).toFixed(1)} KB</p>
                    {imgPath && (
                      <a
                        href={imgPath}
                        download={fileName}
                        className="inline-block mt-4 px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold"
                      >
                        Dosyayı İndir
                      </a>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Yüklenme: {new Date(previewReceiptReq.receipt.uploaded_at).toLocaleString('tr-TR')}</span>
              <button
                onClick={() => setPreviewReceiptReq(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

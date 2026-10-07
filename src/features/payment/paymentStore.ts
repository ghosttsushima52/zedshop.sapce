'use client';

import { PaymentRequest, ApprovePayload, ReceiptData } from './types';

const STORAGE_KEY = 'zedshop_payment_requests_v2';
const SESSION_KEY = 'zedshop_user_session_id_v2';
const CHANNEL_NAME = 'zedshop_payment_sync_v2';

let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  } catch {}
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server-session';
  let sid = localStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = 'sid_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    localStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

export function getAllRequests(): PaymentRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAllRequests(requests: PaymentRequest[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'UPDATE', timestamp: Date.now() });
    }
  } catch {}
}

export function getRequestBySession(sessionId: string): PaymentRequest | null {
  const all = getAllRequests();
  return all.find((r) => r.session_id === sessionId) || null;
}

export function getRequestById(id: string | number): PaymentRequest | null {
  const all = getAllRequests();
  return all.find((r) => String(r.id) === String(id)) || null;
}

export function createPaymentRequest(data: {
  session_id: string;
  user_name: string;
  user_phone: string;
  user_email?: string;
  product_name?: string;
  amount: string;
}): PaymentRequest {
  const all = getAllRequests();
  // Filter out any existing pending/old request for this session
  const filtered = all.filter((r) => r.session_id !== data.session_id);

  const newReq: PaymentRequest = {
    id: 'pr_' + Date.now(),
    session_id: data.session_id,
    user_name: data.user_name,
    user_phone: data.user_phone,
    user_email: data.user_email,
    product_name: data.product_name || 'Özel Sipariş',
    amount: data.amount,
    status: 'waiting', // Enters waiting approval
    created_at: new Date().toISOString(),
  };

  filtered.unshift(newReq);
  saveAllRequests(filtered);
  return newReq;
}

export function approvePaymentRequest(
  id: string | number,
  payload: ApprovePayload
): PaymentRequest | null {
  const all = getAllRequests();
  const req = all.find((r) => String(r.id) === String(id));
  if (!req) return null;

  const now = new Date();
  const durationMs = (payload.duration_minutes || 10) * 60 * 1000;
  const expiresAt = new Date(now.getTime() + durationMs).toISOString();

  req.status = 'approved';
  req.iban = payload.iban;
  req.bank_name = payload.bank_name;
  req.account_holder = payload.account_holder;
  req.amount = payload.amount || req.amount;
  req.admin_note = payload.admin_note || '';
  req.duration_minutes = payload.duration_minutes;
  req.approved_at = now.toISOString();
  req.expires_at = expiresAt;

  saveAllRequests(all);
  return req;
}

export function rejectPaymentRequest(id: string | number, reason?: string): PaymentRequest | null {
  const all = getAllRequests();
  const req = all.find((r) => String(r.id) === String(id));
  if (!req) return null;

  req.status = 'rejected';
  req.admin_note = reason || 'Yönetici tarafından reddedildi.';
  saveAllRequests(all);
  return req;
}

export function submitReceipt(
  id: string | number,
  receipt: ReceiptData
): PaymentRequest | null {
  const all = getAllRequests();
  const req = all.find((r) => String(r.id) === String(id));
  if (!req) return null;

  req.status = 'done';
  req.receipt = receipt;
  saveAllRequests(all);
  return req;
}

export function resetSessionRequest(sessionId: string) {
  const all = getAllRequests();
  const filtered = all.filter((r) => r.session_id !== sessionId);
  saveAllRequests(filtered);
}

export function deletePaymentRequest(id: string | number): boolean {
  const all = getAllRequests();
  const filtered = all.filter((r) => String(r.id) !== String(id));
  if (filtered.length !== all.length) {
    saveAllRequests(filtered);
    return true;
  }
  return false;
}

export { getAllRequests as getStoredPaymentRequests };

export function subscribeToPaymentUpdates(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };

  const handleMessage = () => {
    callback();
  };

  window.addEventListener('storage', handleStorage);
  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleMessage);
  }

  // Polling fallback every 2 seconds
  const interval = setInterval(callback, 2000);

  return () => {
    window.removeEventListener('storage', handleStorage);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleMessage);
    }
    clearInterval(interval);
  };
}

export function subscribePaymentUpdates(callback: (requests: PaymentRequest[]) => void): () => void {
  const notify = () => callback(getAllRequests());
  return subscribeToPaymentUpdates(notify);
}

export type PaymentStatus = 
  | 'idle' 
  | 'form' 
  | 'waiting' 
  | 'pending' 
  | 'approved' 
  | 'expired' 
  | 'rejected' 
  | 'receipt_submitted' 
  | 'done';

export interface PaymentRequest {
  id: string | number;
  session_id: string;
  user_name: string;
  user_phone: string;
  user_email?: string;
  product_name?: string;
  amount: string;
  status: PaymentStatus;
  site?: string;
  iban?: string;
  bank_name?: string;
  account_holder?: string;
  admin_note?: string;
  duration_minutes?: number;
  approved_at?: string;
  expires_at?: string;
  created_at: string;
  receipt?: ReceiptData;
}

export interface ReceiptData {
  id: string | number;
  payment_request_id: string | number;
  file_name: string;
  original_name?: string;
  file_size: number;
  size?: number;
  mime_type: string;
  data_url?: string;
  file_path?: string;
  uploaded_at: string;
}

export interface ApprovePayload {
  iban: string;
  bank_name: string;
  account_holder: string;
  amount: string;
  admin_note?: string;
  duration_minutes: number;
}

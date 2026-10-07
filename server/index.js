const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Database setup using SQLite3 or sqlite in-memory / file
// We'll support both better-sqlite3 or sqlite3 if installed, or lightweight json/sqlite file fallback
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const DB_FILE = path.join(DATA_DIR, 'payments.json');

// File storage helper simulating SQLite schema
function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initial = { payment_requests: [], receipts: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return { payment_requests: [], receipts: [] };
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer storage for dekont upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Yalnızca JPG, PNG veya PDF formatları kabul edilir.'));
    }
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`[Socket] Connected: ${socket.id}`);

  // Subscribe user to payment request room by session or request id
  socket.on('payment:subscribe', (data) => {
    const room = typeof data === 'string' ? data : (data.sessionId || data.paymentId);
    if (room) {
      socket.join(`payment:${room}`);
      console.log(`[Socket] ${socket.id} joined room payment:${room}`);
    }
  });

  // Admin joins admin notification room
  socket.on('admin:join', () => {
    socket.join('admin:room');
    console.log(`[Socket] Admin joined admin:room: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Disconnected: ${socket.id}`);
  });
});

// 1. POST /api/payment-requests
app.post('/api/payment-requests', (req, res) => {
  const { session_id, user_name, user_phone, user_email, amount, product_name } = req.body;

  if (!session_id || !user_name || !user_phone) {
    return res.status(400).json({ error: 'session_id, user_name ve user_phone alanları zorunludur.' });
  }

  // GSM regex validation (05XX)
  const gsmRegex = /^05\d{9}$/;
  const cleanPhone = user_phone.replace(/\s+/g, '');
  if (!gsmRegex.test(cleanPhone)) {
    return res.status(400).json({ error: 'Telefon numarası geçerli bir 05XX formatında olmalıdır.' });
  }

  const db = loadDB();
  const newReq = {
    id: db.payment_requests.length + 1,
    session_id,
    user_name: user_name.trim(),
    user_phone: cleanPhone,
    user_email: user_email ? user_email.trim() : null,
    amount: amount || '1.000 TL',
    product_name: product_name || 'Özel Sipariş',
    status: 'pending', // or 'waiting'
    iban: null,
    bank_name: null,
    account_holder: null,
    admin_note: null,
    approved_at: null,
    expires_at: null,
    created_at: new Date().toISOString()
  };

  db.payment_requests.push(newReq);
  saveDB(db);

  // Notify admin room
  io.to('admin:room').emit('notification:new', newReq);

  return res.status(201).json(newReq);
});

// 2. GET /api/payment-requests/session/:sessionId
app.get('/api/payment-requests/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const db = loadDB();
  const found = db.payment_requests.slice().reverse().find((r) => r.session_id === sessionId);

  if (!found) {
    return res.status(404).json({ message: 'Aktif ödeme talebi bulunamadı.' });
  }

  // Check if expired
  if (found.status === 'approved' && found.expires_at) {
    if (new Date() > new Date(found.expires_at)) {
      found.status = 'expired';
      saveDB(db);
    }
  }

  return res.json(found);
});

// 3. POST /api/payment-requests/:id/approve
app.post('/api/payment-requests/:id/approve', (req, res) => {
  const { id } = req.params;
  const { iban, bank_name, account_holder, amount, admin_note, duration_minutes = 10 } = req.body;

  const db = loadDB();
  const target = db.payment_requests.find((r) => String(r.id) === String(id));
  if (!target) {
    return res.status(404).json({ error: 'Talep bulunamadı.' });
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + duration_minutes * 60 * 1000).toISOString();

  target.status = 'approved';
  target.iban = iban || target.iban;
  target.bank_name = bank_name || target.bank_name;
  target.account_holder = account_holder || target.account_holder;
  target.amount = amount || target.amount;
  target.admin_note = admin_note || null;
  target.approved_at = now.toISOString();
  target.expires_at = expiresAt;

  saveDB(db);

  // Emit real-time notification to client room
  io.to(`payment:${target.session_id}`).emit('payment:approved', target);
  io.to(`payment:${target.id}`).emit('payment:approved', target);

  return res.json(target);
});

// 4. POST /api/payment-requests/:id/reject
app.post('/api/payment-requests/:id/reject', (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const db = loadDB();
  const target = db.payment_requests.find((r) => String(r.id) === String(id));
  if (!target) {
    return res.status(404).json({ error: 'Talep bulunamadı.' });
  }

  target.status = 'rejected';
  target.admin_note = reason || 'Yönetici tarafından reddedildi.';
  saveDB(db);

  io.to(`payment:${target.session_id}`).emit('payment:rejected', target);

  return res.json(target);
});

// 5. POST /api/receipts
app.post('/api/receipts', upload.single('receipt'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Dekont dosyası yüklenmedi.' });
  }

  const { payment_request_id } = req.body;
  if (!payment_request_id) {
    return res.status(400).json({ error: 'payment_request_id zorunludur.' });
  }

  const db = loadDB();
  const target = db.payment_requests.find((r) => String(r.id) === String(payment_request_id));
  if (!target) {
    return res.status(404).json({ error: 'İlgili ödeme talebi bulunamadı.' });
  }

  const receiptRecord = {
    id: db.receipts.length + 1,
    payment_request_id: Number(payment_request_id),
    file_path: `/uploads/${req.file.filename}`,
    original_name: req.file.originalname,
    mime_type: req.file.mimetype,
    size: req.file.size,
    uploaded_at: new Date().toISOString()
  };

  db.receipts.push(receiptRecord);
  target.status = 'receipt_submitted';
  target.receipt = receiptRecord;
  saveDB(db);

  io.to(`payment:${target.session_id}`).emit('payment:receipt_submitted', target);
  io.to('admin:room').emit('notification:receipt', { target, receiptRecord });

  return res.status(201).json({
    message: 'Dekont başarıyla yüklendi.',
    receipt: receiptRecord,
    payment: target
  });
});

// 6. GET /api/payment-requests (For Admin)
app.get('/api/payment-requests', (req, res) => {
  const db = loadDB();
  return res.json(db.payment_requests);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`[Payment Backend Server] Listening on port ${PORT}`);
});

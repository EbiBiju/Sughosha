require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const { connectDB, requireDB } = require('./config/db');

// ── Connect to MongoDB Atlas ──────────────────────────────────────────────────
connectDB();

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:8081', 'http://127.0.0.1:8081', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// ── Auth Routes (protected by DB check) ──────────────────────────────────────
const authRouter = require('./routes/auth');
app.use('/api/auth', requireDB, authRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected';
    res.json({
        status:    'running',
        message:   '🚀 SughOsha Backend is Live!',
        database:  dbStatus,
        endpoints: {
            signup: 'POST /api/auth/signup',
            login:  'POST /api/auth/login',
            me:     'GET  /api/auth/me',
        }
    });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 SughOsha Backend running at http://localhost:${PORT}`);
    console.log(`   POST /api/auth/signup  → Register new user`);
    console.log(`   POST /api/auth/login   → Login existing user`);
    console.log(`   GET  /api/auth/me      → Verify token\n`);
});
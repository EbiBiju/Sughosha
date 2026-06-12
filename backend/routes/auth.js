const express = require('express');
const router  = express.Router();
const { signup, login, getMe } = require('../controllers/authController');

// POST /api/auth/signup  → Create new account
router.post('/signup', signup);

// POST /api/auth/login   → Login existing user
router.post('/login', login);

// GET  /api/auth/me      → Verify token & get current user
router.get('/me', getMe);

module.exports = router;
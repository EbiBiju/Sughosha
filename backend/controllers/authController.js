const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

// ── Helper: generate JWT ──────────────────────────────────────────────────────
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }   // Stay logged in for 7 days
    );
};

// ── SIGNUP ─────────────────────────────────────────────────────────────────────
// POST /api/auth/signup
// Body: { name, email, password }
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ── 1. Validate all fields are present ────────────────────────────────
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        // ── 2. Validate email format ──────────────────────────────────────────
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address.' });
        }

        // ── 3. Validate password strength ─────────────────────────────────────
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters.' });
        }

        // ── 4. Check if user already exists ──────────────────────────────────
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists. Try logging in.' });
        }

        // ── 5. Hash the password ──────────────────────────────────────────────
        const salt           = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ── 6. Create the user ────────────────────────────────────────────────
        const newUser = await User.create({
            name:     name.trim(),
            email:    email.toLowerCase().trim(),
            password: hashedPassword
        });

        // ── 7. Generate token ─────────────────────────────────────────────────
        const token = generateToken(newUser._id);

        console.log(`[Auth] New user signed up: ${newUser.email}`);

        // ── 8. Return success ─────────────────────────────────────────────────
        res.status(201).json({
            message: 'Account created successfully! Welcome to SughOsha.',
            token,
            user: {
                id:    newUser._id,
                name:  newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error('[Signup Error]', err.message);
        res.status(500).json({ message: 'Server error during signup. Please try again.' });
    }
};


// ── LOGIN ──────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ── 1. Validate inputs ────────────────────────────────────────────────
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter your email and password.' });
        }

        // ── 2. Find user (select password explicitly since it might be excluded by default) ──
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            // Use a generic message to prevent email enumeration attacks
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // ── 3. Compare password ───────────────────────────────────────────────
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // ── 4. Generate token ─────────────────────────────────────────────────
        const token = generateToken(user._id);

        console.log(`[Auth] User logged in: ${user.email}`);

        // ── 5. Return success ─────────────────────────────────────────────────
        res.json({
            message: `Welcome back, ${user.name}!`,
            token,
            user: {
                id:    user._id,
                name:  user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error('[Login Error]', err.message);
        res.status(500).json({ message: 'Server error during login. Please try again.' });
    }
};


// ── VERIFY TOKEN (optional protected route helper) ────────────────────────────
// GET /api/auth/me  — validates the JWT and returns user info
exports.getMe = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Not authenticated.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ user });
    } catch (err) {
        res.status(401).json({ message: 'Token is invalid or expired.' });
    }
};
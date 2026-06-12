// ============================================================
//  SughOsha Auth Server  —  auth-server.js
//  Handles Google + Facebook OAuth flows
//  Run with: node auth-server.js
// ============================================================

require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express    = require('express');
const session    = require('express-session');
const passport   = require('passport');
const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const path       = require('path');
const fs         = require('fs');

const app  = express();
const PORT = process.env.AUTH_PORT || 8082;
const BASE = process.env.BASE_URL  || `http://localhost:${PORT}`;

// ── Simple in-memory user store (replace with your DB later) ────────────────
const users = {};   // keyed by provider+id, e.g. "google:108xxx"

function findOrCreate(profile, provider) {
    const key = `${provider}:${profile.id}`;
    if (!users[key]) {
        users[key] = {
            id:       key,
            provider: provider,
            name:     profile.displayName || profile.name?.givenName || 'User',
            email:    profile.emails?.[0]?.value || '',
            photo:    profile.photos?.[0]?.value || '',
            createdAt: new Date().toISOString()
        };
        console.log(`[Auth] New user registered via ${provider}:`, users[key].email || users[key].name);
    } else {
        console.log(`[Auth] Existing user logged in via ${provider}:`, users[key].email || users[key].name);
    }
    return users[key];
}

// ── Session & Passport setup ─────────────────────────────────────────────────
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,   // Set to true when using HTTPS in production
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, users[id] || null));

// ── CORS headers so login.html (port 8081) can talk to auth server (8082) ───
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// ── Google Strategy ──────────────────────────────────────────────────────────
const googleConfigured = process.env.GOOGLE_CLIENT_ID &&
                         process.env.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE';

if (googleConfigured) {
    passport.use(new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:  `${BASE}/auth/google/callback`,
        scope:        ['profile', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        const user = findOrCreate(profile, 'google');
        done(null, user);
    }));
    console.log('[Auth] ✅ Google OAuth configured');
} else {
    console.warn('[Auth] ⚠️  Google OAuth NOT configured — add GOOGLE_CLIENT_ID to .env');
}

// ── Facebook Strategy ─────────────────────────────────────────────────────────
const fbConfigured = process.env.FACEBOOK_APP_ID &&
                     process.env.FACEBOOK_APP_ID !== 'YOUR_FACEBOOK_APP_ID_HERE';

if (fbConfigured) {
    passport.use(new FacebookStrategy({
        clientID:     process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL:  `${BASE}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'emails', 'photos']
    }, (accessToken, refreshToken, profile, done) => {
        const user = findOrCreate(profile, 'facebook');
        done(null, user);
    }));
    console.log('[Auth] ✅ Facebook OAuth configured');
} else {
    console.warn('[Auth] ⚠️  Facebook OAuth NOT configured — add FACEBOOK_APP_ID to .env');
}

// ── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/auth/status', (req, res) => {
    res.json({
        loggedIn: !!req.user,
        user: req.user || null,
        providers: {
            google:   googleConfigured,
            facebook: fbConfigured,
            apple:    false   // Apple requires HTTPS — set up after deployment
        }
    });
});

// ── Google ───────────────────────────────────────────────────────────────────
app.get('/auth/google', (req, res, next) => {
    if (!googleConfigured) {
        return res.redirect(`http://localhost:8081/login.html?error=google_not_configured`);
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:8081/login.html?error=google_failed' }),
    (req, res) => {
        // Success — send user back to the main site with a success flag
        res.redirect(`http://localhost:8081/index.html?auth=success&provider=google&name=${encodeURIComponent(req.user.name)}`);
    }
);

// ── Facebook ─────────────────────────────────────────────────────────────────
app.get('/auth/facebook', (req, res, next) => {
    if (!fbConfigured) {
        return res.redirect(`http://localhost:8081/login.html?error=facebook_not_configured`);
    }
    passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
});

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: 'http://localhost:8081/login.html?error=facebook_failed' }),
    (req, res) => {
        res.redirect(`http://localhost:8081/index.html?auth=success&provider=facebook&name=${encodeURIComponent(req.user.name)}`);
    }
);

// ── Apple (HTTPS only — placeholder for production deployment) ───────────────
app.get('/auth/apple', (req, res) => {
    res.redirect(`http://localhost:8081/login.html?error=apple_requires_https`);
});

// ── Logout ────────────────────────────────────────────────────────────────────
app.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.redirect('http://localhost:8081/login.html?logout=true');
    });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🔐 SughOsha Auth Server running at http://localhost:${PORT}`);
    console.log(`   Google:   ${googleConfigured  ? '✅ Ready' : '⚠️  Needs credentials in .env'}`);
    console.log(`   Facebook: ${fbConfigured      ? '✅ Ready' : '⚠️  Needs credentials in .env'}`);
    console.log(`   Apple:    ⚠️  Requires HTTPS domain (configure after deployment)\n`);
    console.log(`   Open setup guide: SETUP_GUIDE.md\n`);
});

# 🔐 SughOsha Social Login — Setup Guide

Everything is coded. You just need to paste in your credentials.

---

## Step 1 — Start the Auth Server

Open a **new terminal** (keep your existing `serve.js` running on port 8081):

```bash
cd c:\Users\Test\OneDrive\Documents\Shughosha
node auth-server.js
```

You'll see something like:
```
🔐 SughOsha Auth Server running at http://localhost:8082
   Google:   ⚠️  Needs credentials in .env
   Facebook: ⚠️  Needs credentials in .env
```

---

## Step 2 — Get Google Credentials (Free, ~5 min)

1. Go to → **https://console.cloud.google.com**
2. Create a new project (or use an existing one)
3. Go to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Add Authorized redirect URI:
   ```
   http://localhost:8082/auth/google/callback
   ```
7. Copy your **Client ID** and **Client Secret**
8. Open `.env` and replace:
   ```
   GOOGLE_CLIENT_ID=paste_your_client_id_here
   GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
   ```
9. Restart `auth-server.js` → Google button now works ✅

---

## Step 3 — Get Facebook Credentials (Free, ~10 min)

1. Go to → **https://developers.facebook.com**
2. Click **My Apps → Create App**
3. Choose **Consumer** type
4. In your app's dashboard: **Add Product → Facebook Login → Web**
5. Go to **Settings → Basic** → copy **App ID** and **App Secret**
6. Go to **Facebook Login → Settings** → add Valid OAuth Redirect URI:
   ```
   http://localhost:8082/auth/facebook/callback
   ```
7. Open `.env` and replace:
   ```
   FACEBOOK_APP_ID=paste_your_app_id_here
   FACEBOOK_APP_SECRET=paste_your_app_secret_here
   ```
8. Restart `auth-server.js` → Facebook button now works ✅

---

## Step 4 — Apple (After You Deploy to a Real Domain)

Apple Sign In requires:
- An Apple Developer account ($99/year)
- Your app served on a real **HTTPS** domain (not localhost)
- An App ID with "Sign In with Apple" capability

**For now**: The Apple button shows a friendly message explaining this.
**After deployment**: I can add full Apple OAuth support.

---

## How the Flow Works

```
User clicks Google →
  Browser goes to localhost:8082/auth/google →
    Google shows consent screen →
      User approves →
        Google redirects to localhost:8082/auth/google/callback →
          Auth server creates/finds user →
            Browser goes to localhost:8081/index.html?auth=success&provider=google →
              Home page shows welcome toast 🎉
```

---

## Files Created/Modified

| File | Change |
|------|--------|
| `auth-server.js` | **NEW** — The OAuth backend |
| `.env` | **NEW** — Your credentials go here |
| `login.html` | Buttons now redirect to OAuth + toast notifications |
| `signup.html` | Buttons now redirect to OAuth + toast notifications |
| `index.html` | Shows welcome toast on successful login return |

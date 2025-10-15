# 📸 Visual Setup Guide - Fix "Error sending recovery email"

## Step-by-Step Screenshots Guide

### Step 1: Open Supabase Dashboard

```
🌐 Go to: https://supabase.com/dashboard
👉 Click on your project
```

### Step 2: Navigate to URL Configuration

```
📍 Location: Authentication → URL Configuration

You should see a page with:
┌─────────────────────────────────────────┐
│ URL Configuration                       │
├─────────────────────────────────────────┤
│                                         │
│ Site URL                                │
│ ┌─────────────────────────────────┐    │
│ │ http://localhost:3000          │    │ ← SET THIS!
│ └─────────────────────────────────┘    │
│                                         │
│ Redirect URLs                           │
│ ┌─────────────────────────────────┐    │
│ │ http://localhost:3000/**       │    │ ← ADD THIS!
│ │ + Add another                   │    │
│ └─────────────────────────────────┘    │
│                                         │
│        [Save] [Cancel]                  │
└─────────────────────────────────────────┘
```

### Step 3: What You Should See (CORRECT ✅)

```
Site URL:
┌─────────────────────────────────────┐
│ http://localhost:3000              │ ✅ CORRECT
└─────────────────────────────────────┘

Redirect URLs:
┌─────────────────────────────────────┐
│ http://localhost:3000/**           │ ✅ CORRECT (wildcard)
│ http://localhost:3000/auth/reset-  │ ✅ ALSO GOOD (specific)
│   password                          │
└─────────────────────────────────────┘
```

### Step 4: Common Mistakes (WRONG ❌)

```
❌ WRONG: Site URL with trailing slash
┌─────────────────────────────────────┐
│ http://localhost:3000/             │ ❌ Remove the /
└─────────────────────────────────────┘

❌ WRONG: HTTPS when running locally
┌─────────────────────────────────────┐
│ https://localhost:3000             │ ❌ Use http (no 's')
└─────────────────────────────────────┘

❌ WRONG: Wrong port number
┌─────────────────────────────────────┐
│ http://localhost:3001              │ ❌ Check your actual port
└─────────────────────────────────────┘

❌ WRONG: Empty Redirect URLs
Redirect URLs:
┌─────────────────────────────────────┐
│ (empty)                            │ ❌ Must add URLs!
└─────────────────────────────────────┘
```

### Step 5: Enable Email Provider

```
📍 Location: Authentication → Providers

Look for the Email row:
┌─────────────────────────────────────────┐
│ Provider    │ Enabled │                 │
├─────────────────────────────────────────┤
│ Email       │   ✓     │ [Configure]     │ ← Must be checked!
│ Phone       │         │ [Configure]     │
│ Google      │         │ [Configure]     │
└─────────────────────────────────────────┘

Click [Configure] on Email to see options:
┌─────────────────────────────────────────┐
│ Email Provider Settings                 │
├─────────────────────────────────────────┤
│ ✅ Enable Email Provider               │ ← Must be ON
│                                         │
│ ☐ Confirm email                        │ ← Can be OFF for testing
│ ☐ Secure email change                  │
│                                         │
│        [Save]                           │
└─────────────────────────────────────────┘
```

### Step 6: Check SMTP Settings (Optional)

```
📍 Location: Project Settings → Auth → SMTP Settings

Built-in Email (Default):
┌─────────────────────────────────────────┐
│ SMTP Settings                           │
├─────────────────────────────────────────┤
│ ⚠️  Email rate limits and restrictions  │
│                                         │
│ You're using built-in email service.    │
│ Rate limits apply.                      │
│                                         │
│ [Set up custom SMTP server]             │ ← Click to configure
└─────────────────────────────────────────┘

Custom SMTP (Recommended):
┌─────────────────────────────────────────┐
│ SMTP Settings                           │
├─────────────────────────────────────────┤
│ ✅ Enable Custom SMTP                  │
│                                         │
│ Host                                    │
│ ┌─────────────────────────────────┐    │
│ │ smtp.gmail.com                 │    │
│ └─────────────────────────────────┘    │
│                                         │
│ Port Number                             │
│ ┌─────────────────────────────────┐    │
│ │ 587                            │    │
│ └─────────────────────────────────┘    │
│                                         │
│ Username                                │
│ ┌─────────────────────────────────┐    │
│ │ your-email@gmail.com           │    │
│ └─────────────────────────────────┘    │
│                                         │
│ Password                                │
│ ┌─────────────────────────────────┐    │
│ │ ••••••••••••••••               │    │ ← App Password!
│ └─────────────────────────────────┘    │
│                                         │
│ Sender email                            │
│ ┌─────────────────────────────────┐    │
│ │ your-email@gmail.com           │    │
│ └─────────────────────────────────┘    │
│                                         │
│ Sender name                             │
│ ┌─────────────────────────────────┐    │
│ │ DetectX                        │    │
│ └─────────────────────────────────┘    │
│                                         │
│        [Save]                           │
└─────────────────────────────────────────┘
```

### Step 7: Test Using Diagnostic Page

```
🖥️  Terminal:
$ npm run dev

🌐 Browser: http://localhost:3000/test-email

You'll see:
┌─────────────────────────────────────────┐
│ Email Test Page                         │
├─────────────────────────────────────────┤
│                                         │
│ Test Email Address                      │
│ ┌─────────────────────────────────┐    │
│ │ user@example.com               │    │
│ └─────────────────────────────────┘    │
│                                         │
│ [Test Password Reset Email]             │
│ [Check Configuration]                   │
│                                         │
└─────────────────────────────────────────┘

SUCCESS ✅:
┌─────────────────────────────────────────┐
│ ✅ Success!                             │
│                                         │
│ Test Details:                           │
│ ⏱️ Duration: 234ms                     │
│ 🕐 Timestamp: 2025-10-15T10:30:00Z    │
│ 🌐 Origin: http://localhost:3000      │
│                                         │
│ ✅ Email Sent Successfully!            │
│ Check the email inbox for:              │
│ user@example.com                        │
└─────────────────────────────────────────┘

ERROR ❌:
┌─────────────────────────────────────────┐
│ ❌ Error                                │
│                                         │
│ Error Details:                          │
│ Message: Invalid redirect URL           │
│ Status: 400                             │
│                                         │
│ 💡 Next Steps:                         │
│ • Check Site URL configuration          │
│ • Verify redirect URLs are allowed      │
│ • See troubleshooting guide             │
└─────────────────────────────────────────┘
```

### Step 8: Check Browser Console

```
Press F12 to open DevTools, then click Console tab:

✅ SUCCESS Logs:
🔍 Attempting password reset for: user@example.com
🌐 Redirect URL: http://localhost:3000/auth/reset-password
📊 Reset password response: { data: {}, error: null }
✅ Password reset email sent successfully

❌ ERROR Logs:
🔍 Attempting password reset for: user@example.com
🌐 Redirect URL: http://localhost:3000/auth/reset-password
❌ Supabase error: { message: "Invalid redirect URL", ... }
```

### Step 9: Check Supabase Logs

```
📍 Location: Supabase Dashboard → Logs → Auth Logs

Look for recent entries:
┌─────────────────────────────────────────────────────┐
│ Time        │ Event            │ Details             │
├─────────────────────────────────────────────────────┤
│ 10:30:01 AM │ password_recovery│ ✅ Success          │
│             │ user@example.com │                     │
├─────────────────────────────────────────────────────┤
│ 10:29:45 AM │ password_recovery│ ❌ Error            │
│             │ user@example.com │ Invalid redirect    │
└─────────────────────────────────────────────────────┘

Click on entry to see details:
┌─────────────────────────────────────────┐
│ Event Details                           │
├─────────────────────────────────────────┤
│ Event: password_recovery                │
│ Email: user@example.com                 │
│ Status: error                           │
│ Error: Invalid redirect URL             │
│                                         │
│ Config:                                 │
│ - Redirect: http://localhost:3000/...  │
│ - Allowed: (empty)                      │ ← Problem!
└─────────────────────────────────────────┘
```

## Gmail App Password Setup

```
Step 1: Google Account Security
┌─────────────────────────────────────────┐
│ Google Account                          │
│ → Security                              │
│   → 2-Step Verification                 │
│     → [Turn on]                         │
└─────────────────────────────────────────┘

Step 2: Generate App Password
┌─────────────────────────────────────────┐
│ Google Account                          │
│ → Security                              │
│   → 2-Step Verification (enabled)       │
│     → App passwords                     │
│       → Select app: Mail                │
│       → Select device: Other (Custom)   │
│       → Name: "Supabase DetectX"        │
│       → [Generate]                      │
└─────────────────────────────────────────┘

Step 3: Copy Password
┌─────────────────────────────────────────┐
│ Your app password                       │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ abcd efgh ijkl mnop            │    │ ← Copy this!
│ └─────────────────────────────────┘    │
│                                         │
│ Use this password in Supabase SMTP     │
│ (Remove spaces when pasting)            │
└─────────────────────────────────────────┘
```

## Quick Reference Card

```
╔═══════════════════════════════════════════╗
║  SUPABASE EMAIL CONFIGURATION CARD        ║
╠═══════════════════════════════════════════╣
║                                           ║
║  SITE URL (for local dev):                ║
║  http://localhost:3000                    ║
║                                           ║
║  REDIRECT URLS:                           ║
║  http://localhost:3000/**                 ║
║  http://localhost:3000/auth/reset-password║
║                                           ║
║  EMAIL PROVIDER:                          ║
║  ✅ Enabled                               ║
║                                           ║
║  SMTP (Gmail):                            ║
║  Host: smtp.gmail.com                     ║
║  Port: 587                                ║
║  User: your-email@gmail.com               ║
║  Pass: [16-char app password]             ║
║                                           ║
║  TEST PAGE:                               ║
║  http://localhost:3000/test-email         ║
║                                           ║
╚═══════════════════════════════════════════╝
```

## Troubleshooting Flowchart

```
Start
  │
  ├─ Error sending email?
  │   │
  │   ├─ "Invalid redirect URL"
  │   │   └─→ Add URL to allowed list
  │   │       ✅ Fixed!
  │   │
  │   ├─ "Rate limit" / "Too many requests"
  │   │   └─→ Wait 15 minutes
  │   │       OR set up custom SMTP
  │   │       ✅ Fixed!
  │   │
  │   ├─ "SMTP auth failed"
  │   │   └─→ Use Gmail App Password
  │   │       ✅ Fixed!
  │   │
  │   └─ Other error
  │       └─→ Check Supabase logs
  │           └─→ See detailed guide
  │
  └─ Success! ✅
      └─→ Email should arrive in 1-2 minutes
          └─→ Check spam folder if not in inbox
```

## Need More Help?

See these detailed guides:
- `/docs/IMMEDIATE_FIX.md` - Quick fix steps
- `/docs/EMAIL_TROUBLESHOOTING.md` - Detailed troubleshooting
- `/docs/SUPABASE_EMAIL_CONFIG.md` - Full configuration guide

Or use the test page:
- http://localhost:3000/test-email

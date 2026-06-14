# Setup Guide

## Step 1 — Install Node.js
Download from https://nodejs.org (LTS version)

## Step 2 — Install dependencies
Open terminal in the `auth-app` folder and run:
```
npm install
```

## Step 3 — Create Supabase project
1. Go to https://supabase.com and create a free account
2. Click "New project" and give it a name
3. Once created, go to **Settings → API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 4 — Create the device_logs table in Supabase
Go to **SQL Editor** in Supabase and run:
```sql
create table device_logs (
  id uuid default gen_random_uuid() primary key,
  email text,
  ip_address text,
  user_agent text,
  browser text,
  os text,
  device_type text,
  signed_up_at timestamptz default now()
);

-- Allow server to insert logs
alter table device_logs enable row level security;
create policy "Service role can insert" on device_logs
  for insert with check (true);
```

## Step 5 — Add environment variables
1. Copy `.env.local.example` → `.env.local`
2. Fill in your 3 Supabase keys from Step 3

## Step 6 — Run locally (optional)
```
npm run dev
```
Open http://localhost:3000

## Step 7 — Deploy to Vercel
1. Push your project to GitHub
2. Go to https://vercel.com → "New Project" → import your repo
3. In Vercel project settings → **Environment Variables**, add the same 3 variables from `.env.local`
4. Deploy!

Vercel gives you a free URL like `https://your-app.vercel.app` — share that link.

---

## What gets stored when someone signs up?
- Their **email + hashed password** (in Supabase Auth — you can view in Authentication tab)
- In `device_logs` table: email, IP address, browser, OS, device type, timestamp

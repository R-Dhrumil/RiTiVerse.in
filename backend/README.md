# 🛠️ Nirmaan Softworks - Backend & Database Architecture

This directory contains the standalone Node.js/Express API server, PostgreSQL/Supabase database migrations, security policies, and utility scripts for Nirmaan Softworks.

---

## 📁 Directory Structure

```
backend/
├── package.json               # Backend dependencies & NPM scripts
├── server.js                  # Express API server entry point
├── schema.sql                 # PostgreSQL / Supabase SQL table & RLS migration
├── config/
│   └── supabase.js            # Server-side Supabase client configuration
├── routes/
│   └── contact.js             # /api/contact endpoints (validation & persistence)
└── scripts/
    └── fetch-stitch-screens.mjs# Stitch screen export utility script
```

---

## 🗄️ Supabase Database Setup (`schema.sql`)

1. Open your [Supabase Dashboard](https://supabase.com/dashboard) SQL Editor.
2. Run the SQL statements inside [`backend/schema.sql`](file:///d:/KD_Company/Website/backend/schema.sql):
   - Creates the `contact_submissions` table.
   - Configures Row Level Security (RLS) policies for anonymous form insertion.
   - Enables automated `updated_at` triggers and indexes.

---

## 🚀 Running the Backend Server

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration (`.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
SUPABASE_URL=https://igpuggmoskurxzebyolq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_key
```

### 3. Start API Server
```bash
npm start
```
The server will run on `http://localhost:5000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check status |
| `POST` | `/api/contact` | Submit a new consultation inquiry |
| `GET` | `/api/contact` | Fetch recent submissions (Admin only) |

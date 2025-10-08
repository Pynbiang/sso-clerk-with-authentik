# Project Context — Clerk + Authentik + Supabase + React Stack

## 🎯 Goal

Build a full authentication and user management system using:

- Frontend: React + Clerk
- Backend: Node.js (Express)
- Database: Supabase
- Identity Provider: Authentik (Docker, self-hosted)

## 🚀 Core Features

1. **User Registration**

   - User registers using Clerk SignUp UI.
   - Clerk triggers webhook → backend `/clerk-webhook`.
   - Backend:
     - Creates user in Authentik.
     - Inserts user profile into Supabase.

2. **User Login**

   - Login handled by Clerk SignIn UI.
   - Clerk provides session token (JWT).
   - Frontend calls backend APIs with `Authorization: Bearer <JWT>`.
   - Backend verifies JWT via Clerk JWKS.

3. **Profile View**

   - Authenticated user can view profile.
   - Backend fetches data from Supabase using Clerk ID.

4. **Data Synchronization**

   - On Clerk `user.created`, `user.updated`, or `user.deleted`:
     - Backend syncs updates to Authentik and Supabase.

5. **Authentication Integration**
   - Authentik acts as federated identity provider.
   - Clerk handles frontend sessions.
   - Supabase stores persistent user data.

---

## 🧱 Architecture Overview

[ React + Clerk ]
│
▼
[ Clerk Cloud ]
│ Webhooks
▼
[ Node.js Backend ]
├─ Verifies Clerk webhook
├─ Syncs user to Authentik
├─ Inserts/updates Supabase
└─ Serves secure APIs (/api/profile)
│
▼
[ Supabase DB ]

[ Authentik (Docker) ]
└─ Central Identity Provider

---

## 🗂 Folder Structure

project-root/
│
├── authentik/
│ └── docker-compose.yml
│
├── backend/
│ ├── src/
│ │ ├── index.js
│ │ ├── routes/
│ │ │ ├── clerkWebhook.js
│ │ │ └── profile.js
│ │ ├── middlewares/
│ │ │ └── verifyClerkToken.js
│ │ ├── services/
│ │ │ ├── authentikService.js
│ │ │ └── supabaseService.js
│ │ ├── utils/
│ │ │ └── verifySignature.js
│ │ └── config/
│ │ └── env.js
│ ├── .env
│ ├── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Profile.jsx
│ │ │ └── Header.jsx
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ └── ProfilePage.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env
│ ├── vite.config.js
│ ├── package.json
│
└── README.md

---

## ⚙️ Environment Variables

**Backend (`backend/.env`)**
PORT=5000
CLERK*WEBHOOK_SECRET=whsec*...
CLERK_JWKS_URL=https://clerk.YOUR_INSTANCE_ID.clerk.accounts.dev/.well-known/jwks.json

AUTHENTIK_BASE_URL=http://localhost:9000/api/v3

AUTHENTIK_TOKEN=your_authentik_api_token
SUPABASE_URL=https://yourproject.supabase.co

SUPABASE_KEY=service_role_key

---

**Frontend (`frontend/.env`)**
VITE*CLERK_PUBLISHABLE_KEY=pk_test*...
VITE_API_URL=http://localhost:5000

---

## 🧩 Data Flow: User Registration

1. User signs up → Clerk creates user
2. Clerk webhook → backend
3. Backend verifies signature
4. Backend creates Authentik user
5. Backend inserts profile in Supabase
6. User logs in → JWT verified → fetch `/api/profile`

---

## 🧠 Run Instructions

```bash
# Start Authentik
cd authentik
docker compose up -d

# Start backend
cd backend
npm install
npm run dev

# Start frontend
cd frontend
npm install
npm run dev
```

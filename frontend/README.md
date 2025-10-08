## Clerk + Authentik (OIDC) + Supabase Starter (React + TypeScript)

This app uses Clerk for auth UI/session, Authentik as the OIDC Identity Provider, and Supabase to store user profiles.

### Prerequisites

- Node 18+
- A Clerk account
- An Authentik instance (OIDC Provider)
- A Supabase project

### Environment Variables

Create a `.env` file in the project root with:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Note: Authentik OIDC credentials are configured inside Clerk (not the frontend). Keep these somewhere safe for reference:

- AUTHENTIK_OIDC_CLIENT_ID=your_client_id
- AUTHENTIK_OIDC_CLIENT_SECRET=your_client_secret
- AUTHENTIK_OIDC_ISSUER_URL=https://authentik.example.com/application/o/your-issuer

### Authentik OIDC -> Clerk SSO Setup

1. In Authentik, create an Application (Provider type: OIDC). Note the `Issuer URL`, `Client ID`, and `Client Secret`.
2. In Clerk Dashboard, go to SSO Connections → OIDC, add a new connection:
   - Issuer URL: your Authentik OIDC issuer (e.g., `https://authentik.example.com/application/o/your-issuer`)
   - Client ID / Secret: from Authentik
   - Map claims to Clerk identifiers (email, name). Enable as a Sign-In + Sign-Up connection.
3. In Clerk → Instances → Domains/URLs, add your dev URL (e.g., `http://localhost:5173`).

Clerk will now delegate authentication to Authentik while providing React UI and sessions.

### Supabase Setup

1. In the Supabase SQL editor, run `supabase_schema.sql` from the project root to create the `profiles` table and RLS policies (demo-friendly).
2. Get your `Project URL` and `anon` key from Supabase → Settings → API and put them in `.env`.

### Install & Run

```
npm install
npm run dev
```

Open `http://localhost:5173`.

### App Behavior

- Sign in/up via Clerk pages. Clerk routes to Authentik for credentials.
- On first login, the app upserts a row into `public.profiles` using Clerk `user.id` as `clerk_user_id`. If available, the Authentik external ID is stored. Email/username is used as `username`.
- `/dashboard` and `/profile` are protected by `ProtectedRoute`.
- `/profile` displays Clerk's `<UserProfile />` and editable Supabase fields (username, bio).

### Key Files

- `src/main.tsx`: Bootstraps `ClerkProvider` and router.
- `src/App.tsx`: Routes, `ProtectedRoute`, and `AuthSync` to upsert on login.
- `src/components/ProtectedRoute.tsx`: Guards protected routes.
- `src/components/AuthSync.tsx`: Best-effort profile upsert when signed in.
- `src/lib/supabaseClient.ts`: Supabase client.
- `src/lib/profileService.ts`: Profile CRUD and Clerk→Supabase sync.
- `src/pages/*`: `SignInPage`, `SignUpPage`, `Dashboard`, `ProfilePage`.

### Notes

- Replace environment placeholders with your real values.
- Adjust Supabase RLS for production; demo policies allow public read/write.

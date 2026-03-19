# Pentecost University — HR Recruitment System

This repository contains a minimal scaffold for the Pentecost University HR recruitment system.

Features included in scaffold:
- Next.js frontend pages (minimal)
- Prisma schema with SQLite for local development
- API routes for auth (signup/login), jobs, applications
- OpenAI similarity API endpoint (requires `OPENAI_API_KEY`)
- Placeholders for Twilio/WhatsApp and Jitsi/Daily video integration

Quick setup (local):

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:

```bash
npm install
npx prisma generate
npm run dev
```

Deployment notes:
- Local development: the scaffold can run with SQLite (set `DATABASE_URL` to `file:./dev.db`).

- Production (Vercel + Supabase Postgres):
	1. Create a Supabase project and Postgres database at https://app.supabase.com.
	2. In Supabase Project Settings → Database you will find the connection string. Copy the `DATABASE_URL` (format: `postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME?schema=public`) and add it as an environment variable in Vercel.
	3. On Vercel, create a new project from this repo. In the project Settings → Environment Variables add:
		 - `DATABASE_URL` (Supabase connection string)
		 - `OPENAI_API_KEY` (OpenAI API key)
		 - `JWT_SECRET` (secure random string)
		 - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER` (if using Twilio)
	4. Build & run commands on Vercel: `npm run build` and `npm start` (Vercel will run automatic builds).
	5. Database migrations: locally run `npx prisma migrate dev --name init` to create migration files. For production apply migrations with:

```bash
# generate client
npx prisma generate

# apply migrations in production environment (after pushing migration files)
npx prisma migrate deploy
```

	Alternatively, you can run SQL directly in Supabase to create the schema or use `prisma db push` for a quick sync (note: `db push` does not create migration history).

- Notes:
	- Ensure `schema.prisma` uses `provider = "postgresql"` and `DATABASE_URL` points to your Supabase Postgres instance.
	- Store sensitive keys (OpenAI, Twilio, JWT_SECRET) as Vercel Environment Variables (do not commit them).
	- If you prefer, host the database on Supabase and keep the Next.js app on Vercel; both integrate well together.

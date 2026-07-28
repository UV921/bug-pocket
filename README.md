# BugPocket

BugPocket is a mini SaaS-style bug tracking application built with Next.js full-stack concepts. Users authenticate, report bugs, manage severity and status, and track issues from a dashboard and personal library.

Built for the **Next.js Full Stack Project – Web Dev Cohort 2026**.

---

## Project overview

Users can:

* Create bug reports with reproduction steps, severity, environment, snippets, and solutions
* Track bug severity and status
* View and manage bugs in a library
* Authenticate securely with JWT HttpOnly cookies

Demonstrates:

* File-based App Router + route groups
* Layouts
* API Route Handlers
* Server Actions
* Prisma + PostgreSQL (Neon)
* SSR for protected pages
* Full CRUD

---

## Tech stack

**Frontend:** Next.js 16, React, TypeScript, Tailwind CSS, React Hook Form, Zod, shadcn/ui

**Backend:** Next.js Route Handlers, Server Actions, JWT auth

**Database:** Prisma ORM, PostgreSQL / Neon

**Deploy:** Vercel

---

## Features

### Authentication

* Signup / login
* JWT access + refresh tokens
* HttpOnly cookies
* Protected routes (`proxy.ts`)
* Logout

### Bug management

* Create, view, update, delete
* Severity: LOW · MEDIUM · HIGH · CRITICAL
* Status: OPEN · IN_PROGRESS · RESOLVED · CLOSED

### Dashboard

* Total / open / critical stats
* Recent bugs

### Library & profile

* Full bug listing and detail editing
* Profile summary

---

## Routes

### Public

| Path | Description |
|------|-------------|
| `/` | Landing |
| `/login` | Login |
| `/signin` | Redirects to `/login` |
| `/signup` | Signup |
| `/about` | About |

### Protected

| Path | Description |
|------|-------------|
| `/dashboard` | Stats + recent bugs |
| `/library` | Bug list |
| `/library/new` | Create bug |
| `/library/[id]` | View / update / delete |
| `/profile` | Account summary |

---

## API routes

### `GET /api/bugs`

List bugs for the authenticated user.

### `POST /api/bugs`

Create a bug (JSON body matching create schema).

### `GET /api/bugs/[id]`

Fetch one bug owned by the user.

### `PATCH /api/bugs/[id]`

Update fields (title, status, severity, etc.).

### `DELETE /api/bugs/[id]`

Delete a bug owned by the user.

All bug API routes require the `accessToken` cookie.

---

## Getting started

```bash
bun install   # or npm install
cp .env.example .env   # set DATABASE_URL and JWT_SECRET_KEY
bunx prisma migrate deploy
bunx prisma generate
bun run dev
```

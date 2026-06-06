# BugPocket 🐞

BugPocket is a mini SaaS-style bug tracking application built with Next.js Full Stack concepts. Users can authenticate, report bugs, manage issues, and track bug-related information in a clean dashboard interface.

This project was built as part of the **Next.js Full Stack Project – Web Dev Cohort 2026**.

---

## 🚀 Project Overview

BugPocket helps developers or teams manage software bugs in one place.

Users can:

* Create bug reports
* Track bug severity and status
* View all bugs in a library
* Manage bug details
* Authenticate securely using JWT cookies

The project demonstrates major Next.js Full Stack concepts including:

* File Based Routing
* Layouts
* API Routes
* Server Actions
* Database Integration
* SSR, SSG and ISR
* CRUD operations

---

## 🛠 Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* Shadcn UI

### Backend

* Next.js API Routes
* Server Actions
* JWT Authentication

### Database

* Prisma ORM
* PostgreSQL / Neon Database

### Deployment

* Vercel

---

## ✨ Features Implemented

### Authentication

* User Signup
* User Login
* JWT Access Token
* Refresh Token System
* HttpOnly Cookies
* Protected Routes

### Bug Management

* Create Bug
* View Bugs
* Update Bug
* Delete Bug

### Dashboard

* User dashboard
* Bug statistics
* Recent bugs

### Library

* View all bugs
* Bug listing and management

---

## 📂 Routes / Pages

### Public Routes

* `/`
* `/signin`
* `/signup`
* `/about`

### Protected Routes

* `/dashboard`
* `/library`
* `/profile`

---

## 🔌 API Routes

### Bugs API

#### GET

```http
/api/bugs
```

Get all bugs.

#### POST

```http
/api/bugs
```

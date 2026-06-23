# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server with HMR
npm run build     # production build → dist/
npm run preview   # serve the dist/ build locally
npm run lint      # ESLint across all .js/.jsx files
```

No test runner is configured yet.

## Project Overview

**rquest** is "Random Quest" — a React 19 + Vite 8 SPA that generates personal challenges for users. The current `src/App.jsx` is still the Vite starter template; the actual app is being built from the skeleton in `skeleton/`.

Backend is **Supabase** (auth, database, storage).

## Planned Architecture (from `skeleton/app_outline`)

### Routes / Views

| Route | Auth Required | Purpose |
|---|---|---|
| `/` or `/login` | No | Login form |
| `/register` | No | Registration form |
| `/categories` | Yes (new users only) | Category preference selection after first login |
| `/welcome` | Yes (new users only) | One-time welcome screen |
| `/dashboard` | Yes | Current generated challenge |
| `/saved` | Yes | Bookmarked challenges |
| `/history` | Yes | Past challenges |
| `/settings` | Yes | Category preferences |
| `/profile` | Yes | Name/email/password + total points |
| `/leaderboard` | Yes | Top 50 users by points |

### Data Model (Supabase)

Key entities implied by the CRUD outline:
- **Users** — name, email, password (via Supabase Auth), total points
- **Challenges** — generated challenge content, status (incomplete → complete), category
- **User Categories** — user's selected category preferences (many-to-many)
- **Saved Challenges** — junction between users and challenges they bookmarked
- **Challenge History** — log of challenges a user has received

### Points & Leaderboard

- Each completed challenge = 10 points, stored in Supabase
- Leaderboard ranks top 50: ranks 1–10 "Crimson Quest Master", 11–25 "Quest Knight", 26–50 "Quest Squire"

### Routing Notes

`react-router-dom` v7 is installed. Route protection for authenticated vs. unauthenticated views must be implemented (unauthenticated users can only see `/login` and `/register`).

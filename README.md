

> **FocusFlow** — Smart Productivity Dashboard

---

## Project overview

**Short description:** FocusFlow is a responsive single-page productivity dashboard built with React + TypeScript. It demonstrates polished frontend skills: component architecture, state management, charts, animations, accessibility, testing, and CI/CD.

**Primary goals:**

* Produce a visually appealing, accessible UI
* Showcase modern frontend engineering practices
* Ship a deployed demo (Vercel) with a clear README and demo assets for hiring managers


```md
# FocusFlow — Smart Productivity Dashboard


**Stack:** React, TypeScript, Vite, Tailwind CSS, Zustand, Recharts, Supabase (auth & DB)

## What is FocusFlow?
FocusFlow helps users manage tasks and visualize productivity trends. Built to showcase frontend craftsmanship: clean component architecture, responsiveness, accessibility, and data visualization.

## Features
- Email + OAuth (GitHub/Google) auth via Supabase
- Task CRUD with tags and projects
- Drag-and-drop reordering
- Daily/weekly analytics (charts)
- Templates and quick-add
- Theme toggle (light/dark), keyboard shortcuts
- Responsive + accessible (ARIA, keyboard navigation)

## Quick start (developer)
1. `git clone https://github.com/<your-username>/focusflow.git`
2. `cd focusflow`
3. `cp .env.example .env` and fill values (SUPABASE_URL, SUPABASE_KEY)
4. `npm install` or `pnpm install`
5. `npm run dev`

## Scripts
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run preview` — preview production build locally
- `npm run lint` — run linters
- `npm run test` — unit tests (Jest + React Testing Library)
- `npm run e2e` — e2e tests (Cypress or Playwright)

## Architecture notes
- **Frontend:** Vite + React + TypeScript
- **State:** Zustand (lightweight store)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Backend:** Supabase (auth + Postgres) — replaceable with REST API

## What to highlight in interviews
- Component design and separation of concerns
- Performance decisions (lazy loading, memoization)
- Accessibility choices and testing
- CI/CD workflow and preview deployments

## Contributing
- Follow `CONTRIBUTING.md` for branching and commit message conventions
- Use `feat/fix/docs/test:` prefixes in commits

## License
MIT
```

---

## Suggested `.env.example`

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_APP_ENV=development
```

---

## Folder structure (recommended)

```
focusflow/
├─ .github/
│  └─ workflows/
│     └─ ci.yml                 # lint, test, build, deploy preview
├─ public/                      # static assets (favicons, demo video)
│  └─ demo.mp4
├─ src/
│  ├─ assets/                   # images, icons, fonts
│  ├─ components/               # reusable UI components (atomic -> composite)
│  │  ├─ Button/
│  │  ├─ TaskCard/
│  │  └─ Modal/
│  ├─ features/                 # feature folders (co-locate UI + hooks + tests)
│  │  ├─ tasks/
│  │  │  ├─ TaskList.tsx
│  │  │  ├─ taskApi.ts
│  │  │  └─ task.test.tsx
│  │  └─ analytics/
│  ├─ hooks/                    # custom hooks (useAuth, useHotkeys)
│  ├─ libs/                     # wrappers (supabase client, api client)
│  ├─ pages/                    # top-level pages (Dashboard, Analytics, Settings)
│  ├─ routes/                   # route definitions
│  ├─ stores/                   # Zustand store files
│  ├─ styles/                   # global Tailwind config, css utilities
│  ├─ utils/                    # helpers, formatters
│  ├─ App.tsx
│  └─ main.tsx
├─ tests/                       # e2e tests or integration tests
├─ .env.example
├─ README.md
└─ package.json
```

### Notes about structure

* **components/**: keep them small and focused. Favor composition over prop-drilling.
* **features/**: co-locate everything related to a feature: UI, hooks, API calls, and tests. This makes PRs and ownership clear.
* **stores/**: keep small domain-specific stores; avoid a single large store object.

---

## Coding & commit conventions (short)

* Commit message prefixes: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`
* Use TypeScript `strict` mode
* Prefer small PRs (1 feature / bug per PR)
* Prettier + ESLint rules enforced in CI

---

=

# Agent Context: athulthomasatz.github.io

> This document tracks the architecture, decisions, and state of this portfolio project for AI coding agents.

---

## Project Overview

This is **Athul Thomas's developer portfolio**, currently undergoing a revamp from a single React app into a dual-version setup:

- **v1 (Legacy)** — The original portfolio built with React 19 + CRA, used from 2024–June 2026. Preserved at `/v1`.
- **v2 (Current)** — A new modern portfolio built with **Astro 6 + React islands + Tailwind CSS 3**. Served at root `/`.

The v2 site will feature a **Portfolio Timeline** section where visitors can click to view the v1 legacy version.

---

## Tech Stack

### v2 (New Portfolio — Root)
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Astro | 6.4.4 | Static site generation, zero-JS-by-default |
| Interactivity | React | 19.2.7 | Islands for interactive components (modals, animations, clipboard) |
| Styling | Tailwind CSS | 3.4.19 | Utility-first CSS |
| PostCSS | PostCSS + Autoprefixer | — | CSS processing |
| Animations | Framer Motion | 12.40.0 | React island animations |
| Icons | lucide-react | 1.17.0 | Icon library |
| Build Tool | Vite | 7.3.5 | Bundler (via Astro) |
| Sitemap | @astrojs/sitemap | 3.7.3 | Auto-generated sitemap |

### v1 (Legacy — `/v1`)
| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19 + CRA | Original single-page portfolio |
| Styling | Styled Components + CSS variables | Theming system (dark/light/cyberpunk/forest/sunset) |
| Animation | Framer Motion | Scroll animations, project modals |
| Icons | react-icons | fa/si icon sets |
| Smooth Scroll | react-scroll | Navbar anchor links |

### Deployment
- **Target:** GitHub Pages (`athulthomasatz.github.io`)
- **Deploy Tool:** `gh-pages` npm package
- **Build Output:** `dist/` (Astro default)

---

## Architecture

```
repo/
├── v1-legacy/              # Self-contained React app (legacy portfolio)
│   ├── src/                # React components, context, styles, utils
│   ├── public/             # Static assets (favicon, resumes, images)
│   ├── package.json        # CRA dependencies. "homepage": "/v1"
│   ├── package-lock.json
│   └── build/              # CRA build output (generated)
│
├── public/                 # Astro static files (copied as-is to dist/)
│   ├── command-line.png    # Favicon for v2
│   └── v1/                 # Built v1 output (copied here by copy:v1 script)
│       ├── index.html
│       ├── static/js/...
│       ├── static/css/...
│       └── assets/...
│
├── src/                    # New Astro portfolio source
│   ├── components/         # Shared Astro + React components
│   ├── layouts/
│   │   └── Layout.astro    # Global HTML wrapper, SEO meta, JSON-LD
│   ├── pages/
│   │   └── index.astro     # Root page (single-page portfolio)
│   ├── sections/           # Page sections (Hero, About, Projects, etc.)
│   └── styles/
│       └── global.css      # Tailwind directives + base styles
│
├── astro.config.mjs        # Astro config (site URL, integrations)
├── tailwind.config.js      # Tailwind theme (fonts: Inter, JetBrains Mono)
├── postcss.config.js       # PostCSS config (tailwind + autoprefixer)
└── package.json            # Root scripts & v2 dependencies
```

---

## Build Pipeline

Root `package.json` scripts:

```json
{
  "build:v1": "cd v1-legacy && npm ci && npm run build",
  "copy:v1":  "rm -rf public/v1 && cp -r v1-legacy/build public/v1",
  "dev":      "astro dev",
  "build":    "npm run copy:v1 && astro build",
  "preview":  "astro preview",
  "deploy":   "gh-pages -d dist"
}
```

### Build Flow
1. `npm run copy:v1`
   - Deletes old `public/v1/`
   - Copies `v1-legacy/build/` → `public/v1/`
2. `astro build`
   - Builds v2 Astro site
   - Copies `public/` contents into `dist/`
3. Final `dist/`:
   - `dist/index.html` — v2 portfolio (root `/`)
   - `dist/v1/index.html` — v1 portfolio (at `/v1`)
   - `dist/sitemap-*.xml` — Auto-generated sitemaps

> **Important:** v1 is treated as **static files** by Astro. Astro does not process v1's React code, CSS, or JS. v1's React bundle loads and hydrates independently in the browser.

---

## How v1 Path Handling Works

v1's `package.json` sets `"homepage": "/v1"`. This tells Create React App to prefix all asset paths:

```html
<!-- v1-legacy/build/index.html -->
<link rel="icon" href="/v1/command-line.png">
<link rel="stylesheet" href="/v1/static/css/main.1e8f2050.css">
<script defer src="/v1/static/js/main.bcee1414.js"></script>
```

This prevents asset path conflicts with v2 and ensures v1's files are loaded from the correct `/v1/` prefix.

### v1 Link in v2
The v2 link to v1 uses the explicit file path:

```astro
<!-- src/pages/index.astro -->
<a href="/v1/index.html">View v1 Portfolio (2024 – 2026)</a>
```

> **Why `/v1/index.html` instead of `/v1`?** Astro's dev server (`astro dev`) does not serve directory indexes for static folders. `/v1` and `/v1/` return 404 in dev mode. `/v1/index.html` works correctly in `astro dev`, `astro preview`, and GitHub Pages.

---

## Completed Work

### Phase 1: v1 Migration
- [x] Moved entire React app into `v1-legacy/`
- [x] Updated `v1-legacy/package.json` `homepage` to `"/v1"`
- [x] Verified v1 builds independently with correct asset paths
- [x] Committed: `chore: migrate current portfolio to v1-legacy with /v1 base path`

### Phase 2: Astro Foundation
- [x] Initialized Astro 6 at repo root
- [x] Installed React, Tailwind, Sitemap integrations
- [x] Created build pipeline (`copy:v1` + `astro build`)
- [x] Created `Layout.astro` with JSON-LD Person schema, Google Fonts, meta tags
- [x] Created placeholder `index.astro` with v1 link
- [x] Fixed Vite 8 → Vite 7 compatibility issue
- [x] Fixed v1 link to use `/v1/index.html` for dev/preview compatibility
- [x] Committed: `feat: initialize Astro portfolio with v1 legacy integration`
- [x] Committed: `fix: v1 link and vite version compatibility`

### Current State
- v1 builds and serves correctly at `/v1/index.html`
- v2 placeholder serves at root `/`
- Full build (`npm run build`) produces working `dist/` with both versions
- GitHub Pages deployment ready via `npm run deploy`

---

## Design Direction (Pending)

**User's stated preferences:**
- Modern single-page portfolio
- Some sections should be **interactive**
- **Animations** should be present
- Simple overall design, not overly complex

**User will provide:** A `design.md` file with their design ideas.

**Do NOT proceed with v2 section implementation until `design.md` is provided and reviewed.**

---

## Next Steps (Blocked on design.md)

1. Review user's `design.md`
2. Plan section architecture based on design
3. Build v2 sections:
   - Navbar (React island: smooth scroll, mobile hamburger, theme toggle)
   - Hero (React island: typing animation)
   - About (story-first + skills grid)
   - Projects (cards + modal detail view)
   - **Portfolio Timeline** ⭐ (v1 gateway)
   - Contact (email copy-to-clipboard, social links)
   - Footer
4. Add scroll-triggered animations (Framer Motion `whileInView` or IntersectionObserver)
5. Responsive polish (mobile breakpoints)
6. SEO final check (Open Graph, Twitter Cards, sitemap)
7. Deploy to GitHub Pages

---

## Notes for Agents

- **v1 is read-only.** Do not modify code inside `v1-legacy/src/` unless explicitly fixing a build-breaking issue.
- **v1 and v2 share no runtime state.** They are completely separate apps.
- **React islands in v2:** Use `client:*` directives (e.g., `client:load`, `client:visible`, `client:idle`) to hydrate interactive components. Default Astro components should be `.astro` files for zero JS overhead.
- **Tailwind v3 is used, not v4.** We downgraded from v4 due to `@astrojs/tailwind` and `@tailwindcss/vite` compatibility issues with Astro 6.
- **Fonts:** Inter (sans) + JetBrains Mono (mono) loaded via Google Fonts in `Layout.astro`.
- **Theme:** Dark-first design (`bg-neutral-950 text-neutral-100`). Light mode toggle can be added later as a React island.
- **Always run `npm run build` before deploying** to ensure v1 is copied into the build.

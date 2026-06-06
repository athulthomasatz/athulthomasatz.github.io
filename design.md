# Portfolio Design System

> Design specifications and decisions for Athul Thomas's developer portfolio (v2).

---

## Design Philosophy

**Executive Precision** — Architectural, precise, tech-forward, and high-performance.

The portfolio communicates seniority through restraint. Every element serves a purpose. Animations are fluid but never decorative. The dark palette with cyan accents evokes a command-line interface reimagined for the modern web.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Surface** | `#12131a` | Page background |
| **Surface Container** | `#1a1b22` | Sidebar, cards, elevated surfaces |
| **Accent** | `#00f0ff` | Active states, glows, CTAs, focus rings |
| **Text Primary** | `#ffffff` | Headings, active nav labels |
| **Text Secondary** | `#a1a1aa` | Body text, inactive nav labels, descriptions |
| **Border** | `rgba(255,255,255,0.05)` | Dividers, subtle separators |

### Accent Glow Presets
```css
/* Orb glow */
box-shadow: 0 0 8px 3px #00f0ff,
            0 0 16px 6px rgba(0,240,255,0.5),
            0 0 32px 12px rgba(0,240,255,0.25);

/* Beam glow */
box-shadow: 0 0 8px #00f0ff,
            0 0 16px rgba(0,240,255,0.4),
            0 0 32px rgba(0,240,255,0.15);
```

---

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Sans** | Geist | 400, 500, 600, 700 | Body, UI labels, buttons |
| **Mono** | Geist Mono | 400, 500, 600 | Code, tags, accent text |

### Type Scale
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | `clamp(3rem, 8vw, 5rem)` | 700 | 1.1 | Hero name |
| H1 | `2.5rem` | 700 | 1.2 | Section headings |
| H2 | `1.5rem` | 600 | 1.3 | Sub-headings |
| Body | `1rem` | 400 | 1.6 | Paragraphs |
| Small | `0.875rem` | 500 | 1.5 | Labels, nav items |
| Mono | `0.875rem` | 400 | 1.4 | Tags, code snippets |

---

## Layout Principles

- **Sidebar-anchored layout** with fluid content area
- **Minimum section height:** `100vh` for major sections
- **Max content width:** `1200px` centered
- **Content padding:** `px-6` mobile, `px-12` desktop
- **Grid:** CSS Grid or Flexbox based on section needs
- **Depth:** Flat, minimal shadows; depth communicated through color contrast and glows

### Z-Index Hierarchy
| Layer | Z-Index | Element |
|-------|---------|---------|
| Background | 0 | Page background |
| Content | 10 | Main sections |
| Sidebar | 40 | Fixed navigation |
| Overlays | 50 | Mobile drawer backdrop |
| Floating | 100 | Tooltip, notifications |

---

## Navbar (Sidebar)

### Structure

The navigation is a **full-height vertical sidebar** on desktop, collapsing to a **hamburger drawer** on mobile.

#### Desktop Sidebar
- **Position:** Fixed left, full viewport height
- **Expanded width:** `260px`
- **Collapsed width:** `72px`
- **Background:** `surface-container` (`#1a1b22`)
- **Border:** Right border `1px solid rgba(255,255,255,0.05)`

#### Sections (top to bottom)
1. **Brand/Logo** — "AT" badge + "Athul Thomas" name
2. **Navigation Items** — 6 sections
3. **Collapse Toggle** — Chevron button

### Navigation Items

| # | Label | Icon | Section ID |
|---|-------|------|------------|
| 1 | Home | `Home` | `#home` |
| 2 | About | `User` | `#about` |
| 3 | Projects | `Briefcase` | `#projects` |
| 4 | Certificates | `Award` | `#certificates` |
| 5 | Experience | `Clock` | `#experience` |
| 6 | Contact | `Mail` | `#contact` |

#### Item Spacing
- **Vertical gap:** `24px` (`space-y-6`)
- **Item padding:** `px-3 py-3`
- **Nav area padding:** `py-8 px-3`

#### Active State (Beam)
- A **3px-wide cyan beam** sits on the **vertical line** at the active section
- Height: `36px` (centered on item)
- Background: `#00f0ff`
- Glow: `box-shadow` preset (see Color Palette)
- Entrance: `scaleY: 0.5 → 1` + fade in over `300ms`

#### Inactive State
- Text color: `text-secondary` (`#a1a1aa`)
- Hover: `text-white` + subtle background `rgba(255,255,255,0.05)`
- Transition: `200ms ease-in-out`

### Vertical Line (The Track)

A subtle vertical line runs alongside the nav items, serving as both:
- **Travel track** for the orb during click transitions
- **Anchor** for the beam indicator

- **Position:** `left-[21px]` inside nav container
- **Width:** `1px`
- **Color:** `rgba(255,255,255,0.1)`
- **Extends:** From top to bottom of nav area (`top-8 bottom-8`)

### Traveling Orb (Click Interaction)

When a nav item is **clicked**, an orb travels along the vertical line from the current section to the target section.

#### Orb Specs
- **Size:** `10px × 10px` (`w-2.5 h-2.5`)
- **Shape:** Circle
- **Color:** `#00f0ff`
- **Glow:** Stronger than beam (see Color Palette — Orb Glow)

#### Animation Timeline
| Phase | Duration | Description |
|-------|----------|-------------|
| Travel | `0-600ms` | Orb moves from start → destination. Ease: `[0.22, 1, 0.36, 1]` |
| Exit | `600-900ms` | Orb fades out + shrinks (`scale: 0.3`). Beam begins growing in |
| Settled | `900ms+` | Beam fully visible. Orb gone. |

**Rule:** Only ONE indicator visible at a time.
- Traveling → Orb visible, beam hidden
- Settled → Beam visible, orb hidden

### Collapse/Expand

- **Trigger:** Button at bottom of sidebar
- **Expanded:** Shows icons + labels (~260px)
- **Collapsed:** Shows icons only (~72px)
- **Animation:** Width transition `250ms ease-in-out`
- **Label animation:** Fade + width collapse `200ms`
- **Persistence:** Saved to `localStorage`

### Mobile Drawer

On screens `< 768px`:
- Sidebar is hidden
- **Hamburger button** appears fixed top-left
- Clicking opens a **slide-out drawer** from left
- Drawer contains full expanded sidebar
- **Focus trap:** Tab cycles within drawer
- **Escape:** Closes drawer, returns focus to hamburger
- **Backdrop:** `bg-black/60 backdrop-blur-sm`

### Keyboard Accessibility

- `Tab` / `Shift+Tab` — Focus nav items, collapse toggle, hamburger
- `↑` / `↓` — Move focus between nav items
- `Home` / `End` — First / last nav item
- `Enter` / `Space` — Activate focused item (triggers orb travel + scroll)
- `Escape` — Close mobile drawer
- `:focus-visible` — Cyan ring (`ring-accent/60`)

---

## Animation Principles

### Easing
| Name | Value | Usage |
|------|-------|-------|
| **Smooth** | `[0.22, 1, 0.36, 1]` | Orb travel, major transitions |
| **Ease Out** | `[0.25, 0.1, 0.25, 1]` | Secondary animations |
| **Standard** | `ease-in-out` | Hover states, color transitions |

### Durations
| Context | Duration |
|---------|----------|
| Hover states | `200ms` |
| Sidebar collapse | `250ms` |
| Orb travel | `600ms` |
| Orb exit / beam entrance | `300ms` |
| Mobile drawer | `300ms` spring |
| Scroll-triggered reveals | `400-600ms` |

### General Rules
- All state changes use `transition` or Framer Motion
- Respect `prefers-reduced-motion` — disable animations for users who prefer reduced motion
- No animation is purely decorative — every motion guides attention or communicates state

---

## Component Patterns

### Buttons
- **Primary:** `bg-accent text-surface` with `hover:brightness-110`
- **Secondary:** `bg-white/5 text-white` with `hover:bg-white/10`
- **Ghost:** Transparent with hover background
- **Border radius:** `rounded-lg` (`8px`)
- **Padding:** `px-6 py-3`
- **Font:** Mono, semibold

### Cards (Future)
- Background: `surface-container` (`#1a1b22`)
- Border: `1px solid rgba(255,255,255,0.05)`
- Border radius: `rounded-xl` (`12px`)
- Hover: Subtle border brightening + `translateY(-2px)`
- Transition: `250ms ease-out`

### Tags
- Background: `rgba(0,240,255,0.1)`
- Text: `accent` (`#00f0ff`)
- Border radius: `rounded-full`
- Font: Mono, small

---

## Responsive Breakpoints

| Name | Width | Layout Changes |
|------|-------|----------------|
| **Mobile** | `< 768px` | Sidebar hidden, hamburger drawer, single column |
| **Tablet** | `768px - 1024px` | Sidebar expanded or collapsed, content adjusts |
| **Desktop** | `> 1024px` | Full sidebar expanded by default, max content width |

---

## Sections (Planned)

| Section | ID | Description |
|---------|-----|-------------|
| **Hero** | `#home` | Name, tagline, typing effect, CTA |
| **About** | `#about` | Story-first narrative, skills grid |
| **Projects** | `#projects` | Project cards with modals |
| **Certificates** | `#certificates` | Credential showcase |
| **Experience** | `#experience` | Work history / timeline |
| **Contact** | `#contact` | Email, social links, form |

---

## Assets

- **Favicon:** `command-line.png`
- **Fonts:** Geist Sans + Geist Mono (self-hosted WOFF2 variable fonts)
- **Icons:** Lucide React

---

## Notes

- **Theme:** Dark mode only. No light mode toggle planned.
- **v1 Gateway:** A "View v1 Portfolio (2024 – 2026)" link in Hero section links to `/v1/index.html`
- **Performance:** Target Lighthouse 95+ via Astro's zero-JS-by-default architecture

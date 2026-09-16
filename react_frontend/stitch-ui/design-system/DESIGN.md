---
name: Apex Academic Tech
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-performance, academic-technical SaaS environment tailored for campus hackathons, symposiums, engineering workshops, and competitive tech fests. The aesthetic blends rigorous corporate SaaS discipline with the kinetic energy of emerging student engineers. 

The emotional tone evokes clarity, architectural rigor, and administrative mastery. Visual balance leans heavily on modern technical minimalism: clean structured grid layouts, disciplined typography, generous negative space, crisp micro-borders, and high-precision status signaling. Extraneous decorative styling is omitted in favor of structural clarity, high data density, and instantaneous scanability.

## Colors

The palette leverages a structured light mode foundation punctuated by deep slate structural anchors and electric indigo highlights:

- **Primary (`#4f46e5` / Indigo-Violet):** The primary interaction token used for decisive calls-to-action, navigation active states, key focus rings, and selection indicators. Accompanied by `#6366f1` for hover states and subtle primary tints (`rgba(79, 70, 229, 0.08)`) for active pill fills.
- **Secondary (`#0f172a` / Deep Slate Navy):** Anchors the design system. Applied to primary text, dense headers, prominent summary metrics, top navigation surfaces, and elevated contrast panels.
- **Tertiary (`#10b981` / Emerald Green):** Denotes open registration, active hackathon tracks, verified student credentials, and healthy metric throughput.
- **Supporting Accents:**
  - **Warning / At Capacity:** Amber (`#f59e0b`) indicating nearing ticket limits or schedule conflicts.
  - **Critical / Closed:** Crimson (`#ef4444`) for cancelled sessions, capacity limits reached, and destructive actions.
- **Neutrals & Canvas:** Base canvas is set to crisp cool-white `#f8fafc`. Surface cards render at `#ffffff`. Structural borders strictly employ subtle slate boundaries (`#e2e8f0` / `rgba(100, 116, 139, 0.2)`). Secondary body copy and neutral badges leverage `#64748b`.

## Typography

The typographic hierarchy pairs two harmonious sans-serifs:
- **Headings & Quantitative Accents:** Plus Jakarta Sans provides refined geometric weight with subtly sculpted counters, giving event titles and analytics cards an authoritative presence.
- **Body & Data Displays:** Inter serves as the workhorse for dense multi-field forms, technical schedules, team rosters, and log outputs. Its tall x-height and standardized numerals guarantee legibility across tabular datasets and narrow mobile cards.

Headlines larger than 28px automatically scale down on mobile viewports via dedicated mobile scale tokens. All numeric dashboard callouts and metric counts must implement `font-feature-settings: 'tnum' 1` for consistent columnar alignment.

## Layout & Spacing

This design system uses a 12-column responsive fluid grid anchored by explicit maximum container boundaries:
- **Desktop (1280px+):** 12-column grid with a fixed max-width container of 1440px, 1.5rem (`24px`) gutters, and 2rem (`32px`) canvas margins. Sidebar dashboards feature an immutable 260px navigation panel alongside the fluid canvas.
- **Tablet (768px - 1279px):** 8-column layout with 1.25rem (`20px`) gutters and 1.5rem (`24px`) canvas margins. Navigation collapses to an expandable drawer or compact icon-rail (72px).
- **Mobile (< 768px):** 4-column layout with 1rem (`16px`) gutters and 1rem (`16px`) outer margins. Multi-column event listings and metric grids collapse to single-stack columns.

Spacing rhythm is strictly governed by an 8pt linear model (with a 4pt sub-unit for tight micro-spacing). `space-xs` (4px) and `space-sm` (8px) govern compact status badges, button padding, and icon-to-label gaps. `space-md` (16px) controls form stack intervals and internal card padding. `space-lg` (24px) separates card clusters and data grid sections, while `space-xl` (40px) demarcates major page landmarks.

## Elevation & Depth

Visual depth is achieved through layered tonal surfaces combined with sharp micro-borders and soft ambient shadows:

- **Flat Foundation:** The canvas rests at `#f8fafc`. Secondary layered panels (e.g., sidebar rails, filter drawers) reside at `#f1f5f9` or high-opacity white `#ffffff`.
- **Micro-Border Structure:** All cards, dropdowns, and modules utilize a 1px border styled with `rgba(100, 116, 139, 0.16)` (`#e2e8f0`). This defines spatial bounds without inducing visual noise.
- **Ambient Shadow Scale:**
  - *Resting Card:* `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
  - *Interactive / Card Hover:* `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`. Accompanied by a 1px border color transition to `rgba(79, 70, 229, 0.3)`.
  - *Floating Dialogs & Popovers:* `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`.
- **Scrim Overlay:** Modal backdrops use `rgba(15, 23, 42, 0.6)` paired with a soft `backdrop-blur(4px)` to isolate active workflows.

## Shapes

The design system establishes a cohesive rounded geometry balanced for modern web software:
- **Base Components (`rounded`, 0.5rem / 8px):** Applied to form inputs, buttons, table cell focus bounds, and dropdown lists.
- **Card Containers (`rounded-lg` / `rounded-xl`, 1rem - 1.5rem / 16px - 24px):** Event detail cards, hackathon team workspaces, metric displays, and modals adhere strictly to smooth 16px corner radiuses.
- **Badges & Avatars (Full Pill, 9999px):** Event status chips, seat capacity badges, speaker tags, and user profile pictures utilize complete cylindrical rounding to stand out against structural rectangular cards.

## Components

### Buttons
- **Primary:** Background `#4f46e5`, text `#ffffff`, font `label-lg`, padding `10px 20px`, border radius `8px`. Hover: `#6366f1`. Active: `#4338ca`. Shadow: `0 1px 2px rgba(79, 70, 229, 0.2)`. Focus: 2px ring offset with `#4f46e5`.
- **Secondary:** Background `#ffffff`, text `#0f172a`, border `1px solid #e2e8f0`. Hover: `#f8fafc` with border `#cbd5e1`.
- **Destructive:** Background `#ffffff`, border `1px solid #fecaca`, text `#ef4444`. Hover: Background `#fef2f2`.

### Status Badges & Chips
- Designed as compact pill-shaped containers (`padding: 4px 10px`, typography `label-sm`, uppercase, font weight 600).
- **Open / Active:** Background `rgba(16, 185, 129, 0.1)`, text `#047857`, border `1px solid rgba(16, 185, 129, 0.2)`. Includes a pulse-dot indicator (`6px` emerald circle).
- **Near Capacity / Late Registration:** Background `rgba(245, 158, 11, 0.1)`, text `#b45309`, border `1px solid rgba(245, 158, 11, 0.2)`.
- **Closed / Cancelled:** Background `rgba(239, 68, 68, 0.1)`, text `#b91c1c`, border `1px solid rgba(239, 68, 68, 0.2)`.
- **Category Filter Chips:** Neutral `#ffffff`, border `1px solid #e2e8f0`, text `#475569`. Active state toggles to `#0f172a` fill with `#ffffff` text.

### Input Fields & Controls
- **Text Inputs & Selects:** Height `42px`, padding `0 14px`, border `1px solid #cbd5e1`, background `#ffffff`, typography `body-md`. Focus transitions border to `#4f46e5` with a `3px` outline halo of `rgba(79, 70, 229, 0.15)`.
- **Checkboxes & Radios:** Size `18px`, border `1.5px solid #94a3b8`, radius `4px` (checkbox) / `50%` (radio). Checked state: fill `#4f46e5` with `#ffffff` glyph.

### Cards & Event Grid Modules
- **Event Pass Card:** Surface `#ffffff`, border `1px solid #e2e8f0`, radius `16px`, internal padding `20px`. Header row separates track metadata from capacity badge. Middle section highlights event time, venue room, and speaker thumbnail. Footer features rapid-action CTA ("RSVP" or "Manage Pass") alongside live countdown indicators.

### Data Tables & Participant Lists
- Row heights standardized at `56px`. Header row has uppercase `label-sm` text in `#64748b` over `#f8fafc`. Hovering over a row applies `#f8fafc` transition with an accessible left-edge 3px indigo border highlight for keyboard navigation.
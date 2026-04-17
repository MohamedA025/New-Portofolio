# Portfolio Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page GitHub Pages portfolio from a single HTML file — with separate CSS/JS/images folders, 11 anonymous case study pages, and 9 service cards including GEO, AEO, AIO, and Content Strategy.

**Architecture:** Pure static site (no build step). `index.html` at root. Case study pages in `case-studies/`. Shared styles in `css/main.css`, page-specific styles in separate CSS files. Two JS files: `main.js` (every page) and `filter.js` (case studies index only).

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (ES6), Google Fonts (Instrument Serif + DM Sans), GitHub Pages.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Homepage — hero, stats, 9 services, 3 featured results, tools, contact |
| `case-studies.html` | Grid of all 11 case study cards with filter tabs |
| `case-studies/[slug].html` | Individual case study — 11 files |
| `css/main.css` | CSS vars, reset, nav, footer, buttons, reveal, utilities |
| `css/home.css` | Hero, stats, services, featured, tools, industries, CTA, contact |
| `css/case-studies.css` | Filter tabs, card grid |
| `css/case-study.css` | Breadcrumb, metric strip, screenshot block, story sections |
| `js/main.js` | Nav scroll (rAF throttled), mobile toggle, IntersectionObserver reveal |
| `js/filter.js` | Filter tab logic for case-studies.html |
| `images/case-[slug].png` | 11 placeholder slots — user drops real GSC screenshots here |

---

## Task 1: Scaffold

**Files:** Create all directories and placeholder image SVGs.

- [ ] **Step 1: Create folder structure**

```bash
mkdir -p "C:/Users/MOHAMMED/Desktop/portfolio/case-studies"
mkdir -p "C:/Users/MOHAMMED/Desktop/portfolio/css"
mkdir -p "C:/Users/MOHAMMED/Desktop/portfolio/js"
mkdir -p "C:/Users/MOHAMMED/Desktop/portfolio/images"
```

- [ ] **Step 2: Create placeholder SVG for each case study image**

Write this file to `images/case-enterprise-logistics.png` — actually save as `.svg` and reference accordingly. Create one SVG per case study. All share the same template, only the label text differs.

Create `images/placeholder.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#18181c"/>
  <rect x="40" y="40" width="320" height="80" rx="8" fill="#111114" stroke="#222226" stroke-width="1"/>
  <rect x="40" y="140" width="200" height="16" rx="4" fill="#222226"/>
  <rect x="40" y="168" width="280" height="12" rx="4" fill="#1a1a1e"/>
  <rect x="40" y="250" width="1120" height="360" rx="8" fill="#111114" stroke="#222226" stroke-width="1"/>
  <text x="600" y="445" font-family="system-ui,sans-serif" font-size="18" fill="#8a887f" text-anchor="middle">Drop your GSC screenshot here</text>
  <text x="600" y="475" font-family="system-ui,sans-serif" font-size="13" fill="#4a4a50" text-anchor="middle">images/case-[slug].png</text>
</svg>
```

- [ ] **Step 3: Create a .gitignore**

Create `portfolio/.gitignore`:
```
.DS_Store
Thumbs.db
*.log
node_modules/
```

- [ ] **Step 4: Commit scaffold**

```bash
cd "C:/Users/MOHAMMED/Desktop/portfolio"
git init
git add .
git commit -m "chore: scaffold portfolio folder structure"
```

---

## Task 2: main.css

**Files:** Create `css/main.css`

- [ ] **Step 1: Write main.css**

```css
/* ============================================================
   MAIN.CSS — shared across all pages
   ============================================================ */

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #0a0a0c;
  --bg-card: #111114;
  --bg-elevated: #18181c;
  --text: #e8e6e1;
  --text-muted: #8a887f;
  --accent: #c9f06b;
  --accent-dim: #4a5a20;
  --border: #222226;
  --serif: 'Instrument Serif', Georgia, serif;
  --sans: 'DM Sans', system-ui, sans-serif;
}

html { scroll-behavior: smooth; font-size: 16px; }
body { background: var(--bg); color: var(--text); font-family: var(--sans); line-height: 1.7; overflow-x: hidden; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }

/* Noise texture */
body::after {
  content: '';
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 9999; opacity: .35;
}

/* ── NAV ── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 1.25rem 2.5rem;
  display: flex; justify-content: space-between; align-items: center;
  backdrop-filter: blur(20px);
  background: rgba(10,10,12,.7);
  border-bottom: 1px solid rgba(255,255,255,.04);
  transition: background .4s;
}
nav.scrolled { background: rgba(10,10,12,.92); }
.nav-logo { font-family: var(--serif); font-size: 1.4rem; letter-spacing: -.02em; }
.nav-logo span { color: var(--accent); }
.nav-links { display: flex; gap: 2rem; align-items: center; }
.nav-links a { font-size: .85rem; letter-spacing: .08em; text-transform: uppercase; color: var(--text-muted); transition: color .3s; }
.nav-links a:hover { color: var(--accent); }
.nav-cta {
  background: var(--accent); color: var(--bg);
  padding: .55rem 1.4rem; border-radius: 100px;
  font-weight: 500; font-size: .82rem; letter-spacing: .04em;
  transition: transform .3s, box-shadow .3s;
}
.nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(201,240,107,.25); }
.mobile-toggle {
  display: none; background: none; border: none;
  color: var(--text); font-size: 1.5rem; cursor: pointer;
}
.mobile-nav {
  display: none; position: fixed; top: 60px; left: 0; right: 0;
  background: rgba(10,10,12,.96); border-bottom: 1px solid var(--border);
  padding: 1.5rem; flex-direction: column; gap: 1rem; z-index: 99;
}
.mobile-nav.open { display: flex; }
.mobile-nav a { font-size: .95rem; color: var(--text-muted); padding: .5rem 0; }

/* ── BUTTONS ── */
.btn-primary {
  background: var(--accent); color: var(--bg);
  padding: .8rem 2rem; border-radius: 100px;
  font-weight: 500; font-size: .9rem;
  display: inline-flex; align-items: center; gap: .5rem;
  transition: transform .3s, box-shadow .3s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,240,107,.2); }
.btn-secondary {
  border: 1px solid var(--border); padding: .8rem 2rem; border-radius: 100px;
  font-size: .9rem; color: var(--text-muted); transition: border-color .3s, color .3s;
}
.btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

/* ── SECTION UTILITIES ── */
.section { padding: 6rem 2.5rem; }
.section-header { max-width: 1100px; margin: 0 auto 3.5rem; }
.section-label { font-size: .75rem; text-transform: uppercase; letter-spacing: .15em; color: var(--accent); margin-bottom: .75rem; }
.section-title { font-family: var(--serif); font-size: clamp(2rem,4vw,3rem); letter-spacing: -.02em; line-height: 1.1; }
.section-desc { color: var(--text-muted); max-width: 560px; margin-top: .75rem; font-size: .95rem; }

/* ── FOOTER ── */
footer { border-top: 1px solid var(--border); padding: 2.5rem; text-align: center; }
footer p { font-size: .78rem; color: var(--text-muted); letter-spacing: .05em; }

/* ── REVEAL ANIMATION ── */
.reveal { opacity: 0; transform: translateY(40px); transition: opacity .7s cubic-bezier(.25,.46,.45,.94), transform .7s cubic-bezier(.25,.46,.45,.94); }
.reveal.visible { opacity: 1; transform: translateY(0); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .nav-links { display: none; }
  .mobile-toggle { display: block; }
  nav { padding: 1rem 1.5rem; }
  .section { padding: 4rem 1.5rem; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/main.css
git commit -m "feat: add shared main.css with variables, nav, footer, utilities"
```

---

## Task 3: home.css

**Files:** Create `css/home.css`

- [ ] **Step 1: Write home.css**

```css
/* ============================================================
   HOME.CSS — index.html only
   ============================================================ */

/* ── HERO ── */
.hero { min-height: 100vh; display: flex; align-items: center; padding: 8rem 2.5rem 4rem; position: relative; }
.hero::before {
  content: ''; position: absolute; top: -20%; right: -10%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(201,240,107,.06) 0%, transparent 70%);
  pointer-events: none;
}
.hero-inner { max-width: 1100px; margin: 0 auto; width: 100%; }
.hero-tag {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .4rem 1rem; border: 1px solid var(--border); border-radius: 100px;
  font-size: .78rem; letter-spacing: .1em; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 2rem;
  animation: fadeUp .8s ease both;
}
.hero-tag .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
.hero h1 {
  font-family: var(--serif); font-size: clamp(2.8rem,7vw,5.5rem);
  line-height: 1.05; letter-spacing: -.03em; margin-bottom: 1.5rem;
  animation: fadeUp .8s ease .1s both;
}
.hero h1 em { font-style: italic; color: var(--accent); }
.hero-sub { font-size: 1.15rem; color: var(--text-muted); max-width: 560px; line-height: 1.8; margin-bottom: 2.5rem; animation: fadeUp .8s ease .2s both; }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; animation: fadeUp .8s ease .3s both; }

/* ── STATS ── */
.stats { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 3rem 2.5rem; }
.stats-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; }
.stat { text-align: center; opacity: 0; animation: fadeUp .6s ease both; }
.stat:nth-child(1) { animation-delay: .1s; }
.stat:nth-child(2) { animation-delay: .2s; }
.stat:nth-child(3) { animation-delay: .3s; }
.stat:nth-child(4) { animation-delay: .4s; }
.stat-num { font-family: var(--serif); font-size: clamp(2rem,4vw,3.2rem); color: var(--accent); letter-spacing: -.02em; }
.stat-label { font-size: .8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: .12em; margin-top: .3rem; }

/* ── SERVICES ── */
.services-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.service-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 2rem;
  transition: border-color .4s, transform .4s; position: relative; overflow: hidden;
}
.service-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: var(--accent); transform: scaleX(0); transition: transform .4s; transform-origin: left;
}
.service-card:hover::before { transform: scaleX(1); }
.service-card:hover { border-color: rgba(201,240,107,.2); transform: translateY(-4px); }
.service-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--bg-elevated); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; font-size: 1.2rem; }
.service-card h3 { font-family: var(--serif); font-size: 1.3rem; margin-bottom: .75rem; }
.service-card p { font-size: .88rem; color: var(--text-muted); line-height: 1.7; }

/* ── FEATURED RESULTS ── */
.featured-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.featured-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 2rem;
  display: flex; flex-direction: column; transition: border-color .4s, transform .4s;
}
.featured-card:hover { border-color: rgba(201,240,107,.15); transform: translateY(-3px); }
.featured-tag { font-size: .7rem; text-transform: uppercase; letter-spacing: .15em; color: var(--accent); margin-bottom: .6rem; display: inline-flex; align-items: center; gap: .5rem; }
.featured-tag::before { content: ''; width: 12px; height: 1px; background: var(--accent); }
.featured-card h3 { font-family: var(--serif); font-size: 1.2rem; margin-bottom: .5rem; line-height: 1.25; }
.featured-card p { font-size: .85rem; color: var(--text-muted); line-height: 1.7; flex: 1; margin-bottom: 1.25rem; }
.featured-metrics { display: flex; gap: 1.5rem; padding-top: .75rem; border-top: 1px solid var(--border); margin-bottom: 1.25rem; }
.featured-metric-val { font-family: var(--serif); font-size: 1.4rem; color: var(--accent); line-height: 1.1; }
.featured-metric-label { font-size: .65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: .08em; margin-top: .15rem; }
.featured-link { font-size: .82rem; color: var(--accent); display: inline-flex; align-items: center; gap: .4rem; transition: gap .3s; }
.featured-link:hover { gap: .7rem; }

/* ── TOOLS ── */
.tools-section { background: var(--bg-card); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.tools-grid { max-width: 1100px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: .75rem; justify-content: center; }
.tool-pill { padding: .5rem 1.2rem; border: 1px solid var(--border); border-radius: 100px; font-size: .82rem; color: var(--text-muted); transition: border-color .3s, color .3s; white-space: nowrap; }
.tool-pill:hover { border-color: var(--accent); color: var(--accent); }

/* ── INDUSTRIES ── */
.client-types { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }
.client-type { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; text-align: center; transition: border-color .3s; }
.client-type:hover { border-color: rgba(201,240,107,.2); }
.client-type-icon { font-size: 1.8rem; margin-bottom: .75rem; }
.client-type h4 { font-family: var(--serif); font-size: 1.05rem; margin-bottom: .4rem; }
.client-type p { font-size: .78rem; color: var(--text-muted); }

/* ── CTA ── */
.cta-section { padding: 8rem 2.5rem; text-align: center; position: relative; }
.cta-section::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 800px; height: 400px;
  background: radial-gradient(ellipse, rgba(201,240,107,.06) 0%, transparent 70%);
  pointer-events: none;
}
.cta-section h2 { font-family: var(--serif); font-size: clamp(2.2rem,5vw,3.8rem); letter-spacing: -.03em; margin-bottom: 1rem; line-height: 1.1; }
.cta-section h2 em { font-style: italic; color: var(--accent); }
.cta-section p { color: var(--text-muted); max-width: 500px; margin: 0 auto 2.5rem; font-size: 1rem; }
.cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

/* ── CONTACT ── */
.contact-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.contact-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 2rem; text-align: center; transition: border-color .3s, transform .3s; }
.contact-card:hover { border-color: rgba(201,240,107,.2); transform: translateY(-2px); }
.contact-card-icon { font-size: 1.5rem; margin-bottom: 1rem; }
.contact-card h4 { font-size: .9rem; margin-bottom: .4rem; }
.contact-card p { font-size: .85rem; color: var(--text-muted); }
.contact-card a { color: var(--accent); transition: opacity .3s; }
.contact-card a:hover { opacity: .7; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .stats-inner { grid-template-columns: repeat(2,1fr); gap: 1.5rem; }
  .services-grid { grid-template-columns: 1fr; }
  .featured-grid { grid-template-columns: 1fr; }
  .client-types { grid-template-columns: repeat(2,1fr); }
  .contact-grid { grid-template-columns: 1fr; }
  .hero { padding: 7rem 1.5rem 3rem; }
}
@media (max-width: 500px) {
  .stats-inner, .client-types { grid-template-columns: 1fr; }
  .hero-actions { flex-direction: column; }
  .hero-actions a { text-align: center; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/home.css
git commit -m "feat: add home.css for homepage-specific styles"
```

---

## Task 4: case-studies.css + case-study.css

**Files:** Create `css/case-studies.css`, `css/case-study.css`

- [ ] **Step 1: Write case-studies.css**

```css
/* ============================================================
   CASE-STUDIES.CSS — case-studies.html only
   ============================================================ */

.filter-tabs { max-width: 1100px; margin: 0 auto 2.5rem; display: flex; gap: .5rem; flex-wrap: wrap; }
.filter-tab {
  padding: .45rem 1.2rem; border: 1px solid var(--border); border-radius: 100px;
  font-size: .8rem; color: var(--text-muted); cursor: pointer;
  transition: border-color .3s, color .3s, background .3s;
  background: none; font-family: var(--sans);
}
.filter-tab:hover, .filter-tab.active { border-color: var(--accent); color: var(--accent); background: rgba(201,240,107,.06); }

.cases-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.case-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
  overflow: hidden; transition: border-color .4s, transform .4s;
  display: flex; flex-direction: column;
}
.case-card:hover { border-color: rgba(201,240,107,.15); transform: translateY(-3px); }
.case-content { padding: 1.75rem; display: flex; flex-direction: column; flex: 1; }
.case-tag { font-size: .7rem; text-transform: uppercase; letter-spacing: .15em; color: var(--accent); margin-bottom: .6rem; display: inline-flex; align-items: center; gap: .5rem; }
.case-tag::before { content: ''; width: 12px; height: 1px; background: var(--accent); }
.case-content h3 { font-family: var(--serif); font-size: 1.15rem; margin-bottom: .5rem; line-height: 1.25; }
.case-content p { font-size: .83rem; color: var(--text-muted); line-height: 1.7; flex: 1; margin-bottom: 1rem; }
.case-metrics { display: flex; gap: 1.25rem; flex-wrap: wrap; padding-top: .75rem; border-top: 1px solid var(--border); margin-bottom: 1rem; }
.case-metric-val { font-family: var(--serif); font-size: 1.25rem; color: var(--accent); line-height: 1.1; }
.case-metric-label { font-size: .65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: .08em; margin-top: .15rem; }
.case-link { font-size: .82rem; color: var(--accent); display: inline-flex; align-items: center; gap: .4rem; transition: gap .3s; margin-top: auto; }
.case-link:hover { gap: .7rem; }

@media (max-width: 900px) { .cases-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Write case-study.css**

```css
/* ============================================================
   CASE-STUDY.CSS — individual case study pages
   ============================================================ */

/* ── BREADCRUMB ── */
.breadcrumb { max-width: 1100px; margin: 0 auto; padding: 6rem 0 0; display: flex; align-items: center; gap: .5rem; font-size: .8rem; color: var(--text-muted); }
.breadcrumb a { color: var(--text-muted); transition: color .3s; }
.breadcrumb a:hover { color: var(--accent); }
.breadcrumb span { color: var(--text-muted); }
.breadcrumb .current { color: var(--text); }

/* ── CS HERO ── */
.cs-hero { padding: 2rem 2.5rem 4rem; }
.cs-hero-inner { max-width: 1100px; margin: 0 auto; }
.cs-tag { font-size: .75rem; text-transform: uppercase; letter-spacing: .15em; color: var(--accent); margin-bottom: 1rem; display: inline-flex; align-items: center; gap: .5rem; }
.cs-tag::before { content: ''; width: 16px; height: 1px; background: var(--accent); }
.cs-hero h1 { font-family: var(--serif); font-size: clamp(2rem,5vw,3.5rem); line-height: 1.05; letter-spacing: -.03em; margin-bottom: 1rem; }
.cs-hero h1 em { font-style: italic; color: var(--accent); }
.cs-hero-sub { font-size: 1.1rem; color: var(--text-muted); max-width: 600px; line-height: 1.8; }

/* ── METRIC STRIP ── */
.cs-metrics { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 2.5rem 2.5rem; }
.cs-metrics-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; }
.cs-metric { text-align: center; }
.cs-metric-val { font-family: var(--serif); font-size: clamp(1.8rem,3.5vw,2.8rem); color: var(--accent); letter-spacing: -.02em; line-height: 1.1; }
.cs-metric-label { font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: .12em; margin-top: .4rem; }

/* ── SCREENSHOT ── */
.screenshot-block { max-width: 1100px; margin: 4rem auto; padding: 0 2.5rem; }
.screenshot-block img { width: 100%; border-radius: 12px; border: 1px solid var(--border); }
.screenshot-block.placeholder img { display: none; }
.screenshot-block.placeholder::before {
  content: 'Drop your GSC screenshot into images/';
  display: block; width: 100%; min-height: 360px;
  background: var(--bg-card); border: 1px dashed var(--border); border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: .85rem; color: var(--text-muted); text-align: center;
  padding: 2rem;
}
.screenshot-caption { font-size: .78rem; color: var(--text-muted); margin-top: .75rem; text-align: center; letter-spacing: .05em; }

/* ── STORY ── */
.cs-story { max-width: 1100px; margin: 0 auto; padding: 0 2.5rem 4rem; display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
.cs-story-section { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; }
.cs-story-label { font-size: .7rem; text-transform: uppercase; letter-spacing: .15em; color: var(--accent); margin-bottom: 1rem; }
.cs-story-section h3 { font-family: var(--serif); font-size: 1.2rem; margin-bottom: .75rem; }
.cs-story-section p { font-size: .88rem; color: var(--text-muted); line-height: 1.75; }
.cs-story-section ul { list-style: none; padding: 0; }
.cs-story-section ul li { font-size: .88rem; color: var(--text-muted); line-height: 1.75; padding-left: 1.2rem; position: relative; }
.cs-story-section ul li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-size: .8rem; }

/* ── CS CTA BAR ── */
.cs-cta { background: var(--bg-card); border-top: 1px solid var(--border); padding: 4rem 2.5rem; text-align: center; }
.cs-cta h2 { font-family: var(--serif); font-size: clamp(1.6rem,3vw,2.4rem); margin-bottom: .75rem; }
.cs-cta p { color: var(--text-muted); font-size: .95rem; margin-bottom: 2rem; }
.cs-cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

/* ── BACK LINK ── */
.back-link { display: inline-flex; align-items: center; gap: .5rem; font-size: .82rem; color: var(--text-muted); transition: color .3s; margin-bottom: 2rem; }
.back-link:hover { color: var(--accent); }

@media (max-width: 900px) {
  .cs-metrics-inner { grid-template-columns: repeat(2,1fr); }
  .cs-story { grid-template-columns: 1fr; }
  .breadcrumb, .cs-hero, .screenshot-block, .cs-story { padding-left: 1.5rem; padding-right: 1.5rem; }
}
@media (max-width: 500px) {
  .cs-metrics-inner { grid-template-columns: repeat(2,1fr); }
}
```

- [ ] **Step 3: Commit**

```bash
git add css/case-studies.css css/case-study.css
git commit -m "feat: add case-studies and case-study CSS"
```

---

## Task 5: main.js + filter.js

**Files:** Create `js/main.js`, `js/filter.js`

- [ ] **Step 1: Write main.js**

```js
// main.js — runs on every page

(function () {
  'use strict';

  // ── NAV SCROLL ──
  const navEl = document.querySelector('nav');
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 100);
        ticking = false;
      });
      ticking = true;
    }
  });

  // ── MOBILE TOGGLE ──
  const toggleBtn = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
    // Close on any link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });
  }

  // ── REVEAL OBSERVER ──
  let revealCount = 0;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const delay = (revealCount % 4) * 80;
        revealCount++;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}());
```

- [ ] **Step 2: Write filter.js**

```js
// filter.js — case-studies.html only

(function () {
  'use strict';

  function filterCases(cat, e) {
    var tab = e.target.closest('.filter-tab');
    if (!tab) return;

    document.querySelectorAll('.filter-tab').forEach(function (t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');

    document.querySelectorAll('.case-card').forEach(function (card) {
      var show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
      if (show) {
        card.classList.remove('visible');
        window.requestAnimationFrame(function () {
          card.classList.add('visible');
        });
      }
    });
  }

  // Wire up filter tabs
  document.querySelectorAll('.filter-tab').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      filterCases(btn.dataset.filter, e);
    });
  });
}());
```

- [ ] **Step 3: Commit**

```bash
git add js/main.js js/filter.js
git commit -m "feat: add main.js and filter.js"
```

---

## Task 6: index.html

**Files:** Create `index.html`

- [ ] **Step 1: Write index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'">
  <title>Mohamed Amin | SEO Specialist &#8212; Technical SEO, GEO &amp; AI Search</title>
  <meta name="description" content="SEO Specialist with 4+ years of experience. 7.2M+ organic clicks for e-commerce, enterprise, and hospitality brands.">
  <meta property="og:title" content="Mohamed Amin | SEO Specialist">
  <meta property="og:description" content="Driving measurable organic growth for e-commerce, enterprise, and luxury brands.">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"></noscript>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/home.css">
</head>
<body>

<nav>
  <a href="index.html" class="nav-logo">Mohamed<span>.</span></a>
  <div class="nav-links">
    <a href="#services">Services</a>
    <a href="case-studies.html">Case Studies</a>
    <a href="#tools">Tools</a>
    <a href="#contact">Contact</a>
    <a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" class="nav-cta" target="_blank" rel="noopener noreferrer">Hire me on Upwork</a>
  </div>
  <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">&#9776;</button>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="#services">Services</a>
  <a href="case-studies.html">Case Studies</a>
  <a href="#tools">Tools</a>
  <a href="#contact">Contact</a>
  <a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" target="_blank" rel="noopener noreferrer">Hire me on Upwork</a>
</div>

<!-- Hero -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-tag"><span class="dot"></span> Available for new projects</div>
    <h1>I make websites <em>rank.</em><br>Not someday &#8212; <em>now.</em></h1>
    <p class="hero-sub">SEO Specialist with 4+ years of experience. I've driven organic growth for e-commerce stores, enterprise brands, and luxury hospitality groups. From new sites at zero to properties pulling 4.8M+ clicks per year.</p>
    <div class="hero-actions">
      <a href="#contact" class="btn-primary">Get a free SEO audit <span>&rarr;</span></a>
      <a href="case-studies.html" class="btn-secondary">See my results</a>
    </div>
  </div>
</section>

<!-- Stats -->
<section class="stats">
  <div class="stats-inner">
    <div class="stat"><div class="stat-num">7.2M+</div><div class="stat-label">Total clicks managed</div></div>
    <div class="stat"><div class="stat-num">180M+</div><div class="stat-label">Total impressions</div></div>
    <div class="stat"><div class="stat-num">20+</div><div class="stat-label">Projects delivered</div></div>
    <div class="stat"><div class="stat-num">4+</div><div class="stat-label">Years of experience</div></div>
  </div>
</section>

<!-- Services -->
<section class="section" id="services">
  <div class="section-header">
    <div class="section-label">What I do</div>
    <h2 class="section-title">Full-spectrum SEO</h2>
    <p class="section-desc">Every service is backed by data. I work with Google Search Console, not guesswork.</p>
  </div>
  <div class="services-grid">
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&lt;/&gt;</div>
      <h3>Technical SEO</h3>
      <p>Crawl audits, Core Web Vitals, structured data, site architecture, XML sitemaps, and rendering fixes.</p>
    </div>
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&#9998;</div>
      <h3>Content Strategy</h3>
      <p>Content planning, gap analysis, topical authority mapping, and editorial calendars built around real search demand.</p>
    </div>
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&#10024;</div>
      <h3>GEO &#8212; Generative Engine Optimization</h3>
      <p>Optimize for AI-generated answers. Entity coverage, passage-level citability, and source authority signals for ChatGPT and Perplexity.</p>
    </div>
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&#9650;</div>
      <h3>AEO &amp; AIO</h3>
      <p>Answer Engine Optimization and AI Overview Optimization. Appear in featured snippets, Google AI Overviews, and People Also Ask boxes.</p>
    </div>
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&#9873;</div>
      <h3>Local SEO &amp; GBP</h3>
      <p>Google Business Profile optimization, local citations, map pack rankings, and review strategy.</p>
    </div>
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&#9654;</div>
      <h3>YouTube SEO</h3>
      <p>Video keyword research, metadata optimization, thumbnail CTR strategy, and channel authority building.</p>
    </div>
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&#9733;</div>
      <h3>E-commerce SEO</h3>
      <p>Shopify, WooCommerce, custom platforms. Product schema, collection pages, and faceted navigation fixes.</p>
    </div>
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&#127760;</div>
      <h3>International &amp; Multilingual SEO</h3>
      <p>Hreflang implementation, Arabic SEO, regional keyword targeting, and multi-market content strategy.</p>
    </div>
    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">&#128196;</div>
      <h3>On-Page SEO &amp; E-E-A-T</h3>
      <p>Meta tags, heading structure, internal linking, author authority signals, and trust-building content elements.</p>
    </div>
  </div>
</section>

<!-- Featured Results -->
<section class="section" style="background:var(--bg-card)">
  <div class="section-header">
    <div class="section-label">Top results</div>
    <h2 class="section-title">Numbers that speak</h2>
    <p class="section-desc">Three projects. Real GSC data. No vanity metrics.</p>
  </div>
  <div class="featured-grid">
    <div class="featured-card reveal">
      <div class="featured-tag">Enterprise &bull; Logistics</div>
      <h3>4.85M clicks in 12 months</h3>
      <p>Enterprise technical SEO across thousands of pages and 12+ markets.</p>
      <div class="featured-metrics">
        <div><div class="featured-metric-val">4.85M</div><div class="featured-metric-label">Clicks</div></div>
        <div><div class="featured-metric-val">83M</div><div class="featured-metric-label">Impressions</div></div>
        <div><div class="featured-metric-val">5.8%</div><div class="featured-metric-label">CTR</div></div>
      </div>
      <a href="case-studies/enterprise-logistics.html" class="featured-link">Read case study &rarr;</a>
    </div>
    <div class="featured-card reveal">
      <div class="featured-tag">Enterprise &bull; Real Estate</div>
      <h3>1.48M clicks for a property developer</h3>
      <p>Large-scale SEO across hundreds of property and community pages.</p>
      <div class="featured-metrics">
        <div><div class="featured-metric-val">1.48M</div><div class="featured-metric-label">Clicks</div></div>
        <div><div class="featured-metric-val">70.9M</div><div class="featured-metric-label">Impressions</div></div>
        <div><div class="featured-metric-val">2.1%</div><div class="featured-metric-label">CTR</div></div>
      </div>
      <a href="case-studies/real-estate-developer.html" class="featured-link">Read case study &rarr;</a>
    </div>
    <div class="featured-card reveal">
      <div class="featured-tag">E-commerce &bull; Jewellery</div>
      <h3>Position 14 to 7.5 in 16 months</h3>
      <p>Full technical audit, product schema, and collection page restructuring.</p>
      <div class="featured-metrics">
        <div><div class="featured-metric-val">87.7K</div><div class="featured-metric-label">Clicks</div></div>
        <div><div class="featured-metric-val">3.58M</div><div class="featured-metric-label">Impressions</div></div>
        <div><div class="featured-metric-val">7.5</div><div class="featured-metric-label">Avg position</div></div>
      </div>
      <a href="case-studies/jewellery-ecommerce.html" class="featured-link">Read case study &rarr;</a>
    </div>
  </div>
  <div style="max-width:1100px;margin:2.5rem auto 0;text-align:center;">
    <a href="case-studies.html" class="btn-secondary">View all 11 case studies &rarr;</a>
  </div>
</section>

<!-- Tools -->
<section class="section tools-section" id="tools">
  <div class="section-header">
    <div class="section-label">My toolkit</div>
    <h2 class="section-title">Tools I use every day</h2>
  </div>
  <div class="tools-grid">
    <span class="tool-pill">Google Search Console</span>
    <span class="tool-pill">Google Analytics (GA4)</span>
    <span class="tool-pill">Ahrefs</span>
    <span class="tool-pill">SEMrush</span>
    <span class="tool-pill">Screaming Frog</span>
    <span class="tool-pill">Surfer SEO</span>
    <span class="tool-pill">Google Tag Manager</span>
    <span class="tool-pill">Google Business Profile</span>
    <span class="tool-pill">PageSpeed Insights</span>
    <span class="tool-pill">Schema.org</span>
    <span class="tool-pill">YouTube Studio</span>
    <span class="tool-pill">TubeBuddy</span>
    <span class="tool-pill">VidIQ</span>
    <span class="tool-pill">Shopify</span>
    <span class="tool-pill">WordPress</span>
    <span class="tool-pill">Google Looker Studio</span>
  </div>
</section>

<!-- Industries -->
<section class="section">
  <div class="section-header">
    <div class="section-label">Industries served</div>
    <h2 class="section-title">Who I work with</h2>
  </div>
  <div class="client-types">
    <div class="client-type reveal">
      <div class="client-type-icon" aria-hidden="true">&#128722;</div>
      <h4>E-commerce</h4>
      <p>Sportswear, jewellery, furniture, and marketplaces on Shopify and custom platforms.</p>
    </div>
    <div class="client-type reveal">
      <div class="client-type-icon" aria-hidden="true">&#127960;</div>
      <h4>Hospitality</h4>
      <p>Luxury hotels, resorts, and multi-property brands competing for destination searches.</p>
    </div>
    <div class="client-type reveal">
      <div class="client-type-icon" aria-hidden="true">&#127970;</div>
      <h4>Real Estate</h4>
      <p>Property developers and listing platforms across the region.</p>
    </div>
    <div class="client-type reveal">
      <div class="client-type-icon" aria-hidden="true">&#128640;</div>
      <h4>Enterprise &amp; SaaS</h4>
      <p>Large sites, multi-market SEO, and new brands building organic from zero.</p>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <h2>Ready to <em>grow</em><br>your organic traffic?</h2>
  <p>Send me your URL. I'll reply with your biggest SEO opportunities. No charge, no commitment.</p>
  <div class="cta-actions">
    <a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" class="btn-primary" target="_blank" rel="noopener noreferrer">Hire me on Upwork &rarr;</a>
    <a href="mailto:mohameddamin025@gmail.com" class="btn-secondary">Email me directly</a>
  </div>
</section>

<!-- Contact -->
<section class="section" id="contact" style="background:var(--bg-card)">
  <div class="section-header">
    <div class="section-label">Get in touch</div>
    <h2 class="section-title">Let's talk SEO</h2>
  </div>
  <div class="contact-grid">
    <div class="contact-card">
      <div class="contact-card-icon" aria-hidden="true">&#9993;</div>
      <h4>Email</h4>
      <p><a href="mailto:mohameddamin025@gmail.com">mohameddamin025@gmail.com</a></p>
    </div>
    <div class="contact-card">
      <div class="contact-card-icon" aria-hidden="true">&#128100;</div>
      <h4>LinkedIn</h4>
      <p><a href="https://www.linkedin.com/in/mohamed-amin-174924234/" target="_blank" rel="noopener noreferrer">Mohamed Amin</a></p>
    </div>
    <div class="contact-card">
      <div class="contact-card-icon" aria-hidden="true">&#128188;</div>
      <h4>Upwork</h4>
      <p><a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" target="_blank" rel="noopener noreferrer">View my profile</a></p>
    </div>
  </div>
</section>

<footer>
  <p>&copy; 2026 Mohamed Amin. SEO Specialist &#8212; Giza, Egypt.</p>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add homepage index.html"
```

---

## Task 7: case-studies.html

**Files:** Create `case-studies.html`

- [ ] **Step 1: Write case-studies.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'">
  <title>Case Studies | Mohamed Amin &#8212; SEO Specialist</title>
  <meta name="description" content="11 SEO case studies with real Google Search Console data. E-commerce, enterprise, hospitality, and more.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"></noscript>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/case-studies.css">
</head>
<body>

<nav>
  <a href="index.html" class="nav-logo">Mohamed<span>.</span></a>
  <div class="nav-links">
    <a href="index.html#services">Services</a>
    <a href="case-studies.html">Case Studies</a>
    <a href="index.html#tools">Tools</a>
    <a href="index.html#contact">Contact</a>
    <a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" class="nav-cta" target="_blank" rel="noopener noreferrer">Hire me on Upwork</a>
  </div>
  <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">&#9776;</button>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="index.html#services">Services</a>
  <a href="case-studies.html">Case Studies</a>
  <a href="index.html#tools">Tools</a>
  <a href="index.html#contact">Contact</a>
  <a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" target="_blank" rel="noopener noreferrer">Hire me on Upwork</a>
</div>

<section class="section" style="padding-top:8rem">
  <div class="section-header">
    <div class="section-label">Proven results</div>
    <h1 class="section-title">11 case studies. Real GSC data.</h1>
    <p class="section-desc">Every number comes from Google Search Console. No vanity metrics. No made-up stats.</p>
  </div>

  <div class="filter-tabs">
    <button class="filter-tab active" data-filter="all">All projects</button>
    <button class="filter-tab" data-filter="enterprise">Enterprise</button>
    <button class="filter-tab" data-filter="ecommerce">E-commerce</button>
    <button class="filter-tab" data-filter="hospitality">Hospitality</button>
    <button class="filter-tab" data-filter="other">Other</button>
  </div>

  <div class="cases-grid">

    <div class="case-card reveal" data-cat="enterprise">
      <div class="case-content">
        <div class="case-tag">Enterprise &bull; Logistics</div>
        <h3>4.85M clicks in 12 months</h3>
        <p>Enterprise technical SEO across thousands of pages and multiple markets.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">4.85M</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">83M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">5.8%</div><div class="case-metric-label">CTR</div></div>
        </div>
        <a href="case-studies/enterprise-logistics.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="enterprise">
      <div class="case-content">
        <div class="case-tag">Enterprise &bull; Real Estate</div>
        <h3>1.48M clicks for a property developer</h3>
        <p>SEO across hundreds of property pages and community listings.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">1.48M</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">70.9M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">2.1%</div><div class="case-metric-label">CTR</div></div>
        </div>
        <a href="case-studies/real-estate-developer.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="hospitality">
      <div class="case-content">
        <div class="case-tag">Hospitality &bull; Luxury Hotel</div>
        <h3>184K clicks for a luxury hotel brand</h3>
        <p>Location SEO, hotel schema, and destination page strategy.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">184K</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">9.65M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">1.9%</div><div class="case-metric-label">CTR</div></div>
        </div>
        <a href="case-studies/luxury-hotel-a.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="hospitality">
      <div class="case-content">
        <div class="case-tag">Hospitality &bull; Hotel Group</div>
        <h3>166K clicks with 3% CTR</h3>
        <p>Multi-property SEO with strong click-through performance.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">166K</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">5.56M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">3%</div><div class="case-metric-label">CTR</div></div>
        </div>
        <a href="case-studies/hotel-chain.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="ecommerce">
      <div class="case-content">
        <div class="case-tag">E-commerce &bull; Jewellery</div>
        <h3>Position 14 to 7.5 in 16 months</h3>
        <p>Technical audit, product schema, and collection page restructuring.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">87.7K</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">3.58M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">7.5</div><div class="case-metric-label">Avg position</div></div>
        </div>
        <a href="case-studies/jewellery-ecommerce.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="ecommerce">
      <div class="case-content">
        <div class="case-tag">E-commerce &bull; Sportswear</div>
        <h3>+120% click growth for a sportswear brand</h3>
        <p>Clicks grew from 37.1K to 81.9K. Impressions up from 2M to 4.76M.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">81.9K</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">4.76M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">+120%</div><div class="case-metric-label">Growth</div></div>
        </div>
        <a href="case-studies/sportswear.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="ecommerce">
      <div class="case-content">
        <div class="case-tag">E-commerce &bull; Marketplace</div>
        <h3>+171% click growth in 6 months</h3>
        <p>Grew from 21.9K to 59.4K clicks. Impressions surged 241%.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">59.4K</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">1.49M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">+171%</div><div class="case-metric-label">Growth</div></div>
        </div>
        <a href="case-studies/marketplace.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="other">
      <div class="case-content">
        <div class="case-tag">Automotive &bull; Car Listings</div>
        <h3>52.9K clicks with 4.5% CTR</h3>
        <p>CTR improved from 3.3% to 4.5%. Position jumped from 11.1 to 9.7.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">52.9K</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">1.18M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">4.5%</div><div class="case-metric-label">CTR</div></div>
        </div>
        <a href="case-studies/car-listing.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="ecommerce">
      <div class="case-content">
        <div class="case-tag">E-commerce &bull; Furniture</div>
        <h3>Steady growth for a furniture brand</h3>
        <p>Grew from 15.8K to 18.3K clicks. Impressions rose to 1.34M.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">18.3K</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">1.34M</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">14.7</div><div class="case-metric-label">Avg position</div></div>
        </div>
        <a href="case-studies/furniture.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="ecommerce">
      <div class="case-content">
        <div class="case-tag">E-commerce &bull; New Site</div>
        <h3>From 29 clicks to 5,179 in 6 months</h3>
        <p>Brand-new store. Built the full SEO foundation from scratch.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">5,179</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">81.6K</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">6.3%</div><div class="case-metric-label">CTR</div></div>
        </div>
        <a href="case-studies/new-store.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

    <div class="case-card reveal" data-cat="other">
      <div class="case-content">
        <div class="case-tag">Wellness &bull; UK Market</div>
        <h3>+124% impression growth &#8212; UK wellness brand</h3>
        <p>Built organic presence from zero. +45% click growth quarter-on-quarter.</p>
        <div class="case-metrics">
          <div><div class="case-metric-val">1,402</div><div class="case-metric-label">Clicks</div></div>
          <div><div class="case-metric-val">162K</div><div class="case-metric-label">Impressions</div></div>
          <div><div class="case-metric-val">+45%</div><div class="case-metric-label">QoQ growth</div></div>
        </div>
        <a href="case-studies/wellness-uk.html" class="case-link">Read case study &rarr;</a>
      </div>
    </div>

  </div>
</section>

<footer>
  <p>&copy; 2026 Mohamed Amin. SEO Specialist &#8212; Giza, Egypt.</p>
</footer>

<script src="js/main.js"></script>
<script src="js/filter.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add case-studies.html
git commit -m "feat: add case studies index page"
```

---

## Task 8: Case study pages — Enterprise pair

**Files:** Create `case-studies/enterprise-logistics.html`, `case-studies/real-estate-developer.html`

> Note: All 11 case study pages share the same HTML structure. Only the data changes. The template below is defined once here; Tasks 9–11 show only the variable data to substitute.

- [ ] **Step 1: Write case-studies/enterprise-logistics.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'">
  <title>Global Logistics Enterprise &#8212; SEO Case Study | Mohamed Amin</title>
  <meta name="description" content="How I drove 4.85M organic clicks in 12 months for a global logistics enterprise through technical SEO at scale.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"></noscript>
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/case-study.css">
</head>
<body>

<nav>
  <a href="../index.html" class="nav-logo">Mohamed<span>.</span></a>
  <div class="nav-links">
    <a href="../index.html#services">Services</a>
    <a href="../case-studies.html">Case Studies</a>
    <a href="../index.html#tools">Tools</a>
    <a href="../index.html#contact">Contact</a>
    <a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" class="nav-cta" target="_blank" rel="noopener noreferrer">Hire me on Upwork</a>
  </div>
  <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">&#9776;</button>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="../index.html#services">Services</a>
  <a href="../case-studies.html">Case Studies</a>
  <a href="../index.html#tools">Tools</a>
  <a href="../index.html#contact">Contact</a>
  <a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" target="_blank" rel="noopener noreferrer">Hire me on Upwork</a>
</div>

<div style="padding:0 2.5rem">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="../index.html">Home</a>
    <span aria-hidden="true">/</span>
    <a href="../case-studies.html">Case Studies</a>
    <span aria-hidden="true">/</span>
    <span class="current">Global Logistics Enterprise</span>
  </nav>
</div>

<section class="cs-hero">
  <div class="cs-hero-inner">
    <div class="cs-tag">Enterprise &bull; Global Logistics</div>
    <h1><em>4.85 million</em> clicks.<br>One site. Twelve months.</h1>
    <p class="cs-hero-sub">Enterprise technical SEO at scale &#8212; thousands of pages, 12 markets, zero wasted crawl budget.</p>
  </div>
</section>

<section class="cs-metrics">
  <div class="cs-metrics-inner">
    <div class="cs-metric reveal"><div class="cs-metric-val">4.85M</div><div class="cs-metric-label">Total Clicks</div></div>
    <div class="cs-metric reveal"><div class="cs-metric-val">83M</div><div class="cs-metric-label">Impressions</div></div>
    <div class="cs-metric reveal"><div class="cs-metric-val">5.8%</div><div class="cs-metric-label">Average CTR</div></div>
    <div class="cs-metric reveal"><div class="cs-metric-val">19.6</div><div class="cs-metric-label">Avg Position</div></div>
  </div>
</section>

<div class="screenshot-block">
  <img src="../images/case-enterprise-logistics.png"
       alt="Google Search Console performance data showing 4.85M clicks and 83M impressions"
       onerror="this.parentElement.classList.add('placeholder')"
       width="1200" height="675" loading="lazy">
  <p class="screenshot-caption">Google Search Console &bull; 12-month view</p>
</div>

<div class="cs-story">
  <div class="cs-story-section reveal">
    <div class="cs-story-label">The challenge</div>
    <h3>Thousands of pages. Most getting zero clicks.</h3>
    <p>A global logistics company had a massive site. Thousands of service and location pages. Most had no clicks. Crawl errors were piling up. Metadata was weak or missing. No structured data. No hreflang for their 12 markets.</p>
  </div>
  <div class="cs-story-section reveal">
    <div class="cs-story-label">What I did</div>
    <h3>Scaled fixes across the whole site.</h3>
    <ul>
      <li>Fixed crawl errors on 5,000+ pages</li>
      <li>Built hreflang tags for 12 international markets</li>
      <li>Rewrote meta titles and descriptions at scale</li>
      <li>Added structured data for services and locations</li>
      <li>Set up automated Core Web Vitals monitoring</li>
    </ul>
  </div>
  <div class="cs-story-section reveal">
    <div class="cs-story-label">The result</div>
    <h3>4.85 million clicks in one year.</h3>
    <p>Total clicks hit 4.85 million. Impressions reached 83 million. CTR settled at 5.8%. This is one of the strongest CTR numbers I've seen at enterprise scale.</p>
  </div>
</div>

<section class="cs-cta">
  <h2>Want results like this?</h2>
  <p>Send me your site. I'll find your biggest SEO wins in 24 hours.</p>
  <div class="cs-cta-actions">
    <a href="https://www.upwork.com/freelancers/~01e36e9e4f4e8bf10b" class="btn-primary" target="_blank" rel="noopener noreferrer">Hire me on Upwork &rarr;</a>
    <a href="../case-studies.html" class="btn-secondary">View all case studies</a>
  </div>
</section>

<footer>
  <p>&copy; 2026 Mohamed Amin. SEO Specialist &#8212; Giza, Egypt.</p>
</footer>

<script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write case-studies/real-estate-developer.html**

Use the same HTML structure as above. Substitute these values:

| Field | Value |
|---|---|
| `<title>` | `Real Estate Developer &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta name="description">` | `How I drove 1.48M organic clicks for a major real estate developer through large-scale property page SEO.` |
| `cs-tag` | `Enterprise &bull; Real Estate` |
| `h1` | `<em>1.48 million</em> clicks.<br>Hundreds of properties. One strategy.` |
| `cs-hero-sub` | `Large-scale SEO across property pages, community listings, and commercial assets.` |
| Metric 1 | `1.48M` / `Total Clicks` |
| Metric 2 | `70.9M` / `Impressions` |
| Metric 3 | `2.1%` / `Average CTR` |
| Metric 4 | `17.9` / `Avg Position` |
| `img src` | `../images/case-real-estate-developer.png` |
| `img alt` | `Google Search Console data showing 1.48M clicks for a real estate developer` |
| `screenshot-caption` | `Google Search Console &bull; Performance overview` |
| Challenge h3 | `Hundreds of property pages. Weak rankings for buying terms.` |
| Challenge p | `A top property developer had a large site. Their pages ranked low for high-intent search terms. Impressions were strong but clicks were poor. Internal linking between communities was broken.` |
| What I did h3 | `Fixed the fundamentals. Built content clusters.` |
| What I did ul | `<li>Rewrote title tags on 300+ property pages</li><li>Built location-based keyword clusters per community</li><li>Added real estate schema with price and availability</li><li>Improved internal links between community and amenity pages</li><li>Fixed duplicate content across listing pages</li>` |
| Result h3 | `1.48 million clicks. 70.9 million impressions.` |
| Result p | `Clicks reached 1.48 million. Impressions hit 70.9 million. Average position improved to 17.9. A strong result for a competitive real estate market.` |
| `breadcrumb .current` | `Real Estate Developer` |
| `cs-cta h2` | `Want results like this?` |
| image filename | `case-real-estate-developer.png` |

- [ ] **Step 3: Commit**

```bash
git add case-studies/enterprise-logistics.html case-studies/real-estate-developer.html
git commit -m "feat: add enterprise case study pages"
```

---

## Task 9: Case study pages — Hospitality pair

**Files:** Create `case-studies/luxury-hotel-a.html`, `case-studies/hotel-chain.html`

- [ ] **Step 1: Write luxury-hotel-a.html** (same template, substitute below)

| Field | Value |
|---|---|
| `<title>` | `Luxury Hotel Brand &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I drove 184K organic clicks for a luxury hotel brand through hotel schema, destination SEO, and CTR optimization.` |
| `cs-tag` | `Hospitality &bull; Luxury Hotel` |
| `h1` | `<em>184K clicks</em> for a luxury hotel brand.<br>Competing with OTAs and winning.` |
| `cs-hero-sub` | `Location-based keyword strategy, hotel schema, and destination pages that convert.` |
| Metric 1 | `184K` / `Total Clicks` |
| Metric 2 | `9.65M` / `Impressions` |
| Metric 3 | `1.9%` / `Average CTR` |
| Metric 4 | `15.3` / `Avg Position` |
| `img src` | `../images/case-luxury-hotel-a.png` |
| `img alt` | `Google Search Console data showing 184K clicks for a luxury hotel brand` |
| `screenshot-caption` | `Google Search Console &bull; Performance overview` |
| Challenge h3 | `Competing with OTAs on hotel and destination terms.` |
| Challenge p | `A luxury hotel group wanted organic bookings. They were losing clicks to OTAs even when ranking above them. Their meta titles were generic. Destination search traffic was untapped.` |
| What I did h3 | `Better titles. Better schema. Better targeting.` |
| What I did ul | `<li>Rewrote meta titles to lead with experience signals, not just the hotel name</li><li>Built hotel schema with check-in details, amenities, and price range</li><li>Targeted destination keywords for each property location</li><li>Added FAQ schema for common booking questions</li><li>Improved page speed on key landing pages</li>` |
| Result h3 | `184K clicks. 9.65 million impressions.` |
| Result p | `Organic clicks hit 184K. Impressions reached 9.65 million. Average position settled at 15.3. The schema upgrades drove rich result appearances in search.` |
| `breadcrumb .current` | `Luxury Hotel Brand` |
| image filename | `case-luxury-hotel-a.png` |

- [ ] **Step 2: Write hotel-chain.html**

| Field | Value |
|---|---|
| `<title>` | `International Hotel Group &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I drove 166K clicks and a 3% CTR for an international hotel group through multi-property SEO.` |
| `cs-tag` | `Hospitality &bull; Hotel Group` |
| `h1` | `<em>166K clicks.</em> 3% CTR.<br>Multi-property SEO that works.` |
| `cs-hero-sub` | `Consistent organic performance across an international hotel chain.` |
| Metric 1 | `166K` / `Total Clicks` |
| Metric 2 | `5.56M` / `Impressions` |
| Metric 3 | `3%` / `Average CTR` |
| Metric 4 | `11.3` / `Avg Position` |
| `img src` | `../images/case-hotel-chain.png` |
| `img alt` | `Google Search Console data showing 166K clicks for an international hotel group` |
| `screenshot-caption` | `Google Search Console &bull; Performance overview` |
| Challenge h3 | `Strong brand traffic. Weak non-brand rankings.` |
| Challenge p | `An international hotel chain ranked well for their brand name. But non-brand rankings were poor. Amenity and location pages were thin. Internal link flow was weak.` |
| What I did h3 | `Expanded local content. Improved site architecture.` |
| What I did ul | `<li>Expanded location pages with locally relevant content</li><li>Added FAQ schema for common booking questions</li><li>Improved internal link flow to high-priority property pages</li><li>Built content clusters around amenity and experience keywords</li><li>Fixed thin content on 80+ location pages</li>` |
| Result h3 | `166K clicks. A solid 3% CTR.` |
| Result p | `Clicks reached 166K. Impressions hit 5.56 million. CTR held at 3% &#8212; above average for hospitality. Average position improved to 11.3.` |
| `breadcrumb .current` | `International Hotel Group` |
| image filename | `case-hotel-chain.png` |

- [ ] **Step 3: Commit**

```bash
git add case-studies/luxury-hotel-a.html case-studies/hotel-chain.html
git commit -m "feat: add hospitality case study pages"
```

---

## Task 10: Case study pages — E-commerce group A

**Files:** `case-studies/jewellery-ecommerce.html`, `case-studies/sportswear.html`, `case-studies/marketplace.html`

- [ ] **Step 1: Write jewellery-ecommerce.html**

| Field | Value |
|---|---|
| `<title>` | `Jewellery E-Commerce &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I improved average position from 14 to 7.5 and drove 87.7K clicks for a jewellery e-commerce store.` |
| `cs-tag` | `E-commerce &bull; Jewellery` |
| `h1` | `Average position: <em>14 to 7.5.</em><br>87.7K clicks in 16 months.` |
| `cs-hero-sub` | `Technical audit, product schema, and collection page restructuring for a jewellery brand.` |
| Metric 1 | `87.7K` / `Total Clicks` |
| Metric 2 | `3.58M` / `Impressions` |
| Metric 3 | `2.5%` / `Average CTR` |
| Metric 4 | `7.5` / `Avg Position` |
| `img src` | `../images/case-jewellery-ecommerce.png` |
| `img alt` | `Google Search Console data showing 87.7K clicks for a jewellery e-commerce brand` |
| `screenshot-caption` | `Google Search Console &bull; 16-month view` |
| Challenge h3 | `Good products. Poor rankings.` |
| Challenge p | `A jewellery store had strong products but weak search visibility. Average position sat at 14. Most collection pages had no schema and thin copy. Duplicate title tags were hurting crawl efficiency.` |
| What I did h3 | `Schema, speed, and stronger content.` |
| What I did ul | `<li>Added product and collection schema across 200+ pages</li><li>Rewrote category page copy with target keywords</li><li>Fixed 40+ duplicate title tags</li><li>Improved mobile page speed scores</li><li>Built internal links from blog content to product pages</li>` |
| Result h3 | `87.7K clicks. Position halved from 14 to 7.5.` |
| Result p | `Clicks reached 87.7K over 16 months. Impressions grew 56% to 3.58 million. Average position improved from 14 to 7.5. The schema changes drove rich results in Google Shopping.` |
| `breadcrumb .current` | `Jewellery E-Commerce` |
| image filename | `case-jewellery-ecommerce.png` |

- [ ] **Step 2: Write sportswear.html**

| Field | Value |
|---|---|
| `<title>` | `Sportswear Brand &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I grew organic clicks by 120% for a sportswear e-commerce brand through keyword expansion and seasonal content.` |
| `cs-tag` | `E-commerce &bull; Sportswear` |
| `h1` | `Clicks up <em>120%.</em><br>From 37.1K to 81.9K.` |
| `cs-hero-sub` | `Keyword expansion and seasonal content strategy for a sportswear e-commerce brand.` |
| Metric 1 | `81.9K` / `Total Clicks` |
| Metric 2 | `4.76M` / `Impressions` |
| Metric 3 | `+120%` / `Click Growth` |
| Metric 4 | `37.1K` / `Starting Clicks` |
| `img src` | `../images/case-sportswear.png` |
| `img alt` | `Google Search Console data showing 120% click growth for a sportswear brand` |
| `screenshot-caption` | `Google Search Console &bull; Period comparison` |
| Challenge h3 | `Plateaued traffic. Gaps in category coverage.` |
| Challenge p | `A sportswear brand had steady traffic but had stopped growing. They were missing seasonal keyword opportunities. Product category pages were thin. Faceted navigation was creating duplicate URLs.` |
| What I did h3 | `Seasonal clusters. Cleaner crawl. New landing pages.` |
| What I did ul | `<li>Mapped seasonal keyword clusters to existing category pages</li><li>Added keyword-rich content to collection pages</li><li>Fixed faceted navigation crawl issues with canonical tags</li><li>Built sport-specific landing pages for key search terms</li><li>Improved internal linking across product categories</li>` |
| Result h3 | `Clicks doubled. Impressions doubled too.` |
| Result p | `Clicks grew from 37.1K to 81.9K &#8212; a 120% increase. Impressions rose from 2.01 million to 4.76 million. Growth held steady across multiple quarters.` |
| `breadcrumb .current` | `Sportswear Brand` |
| image filename | `case-sportswear.png` |

- [ ] **Step 3: Write marketplace.html**

| Field | Value |
|---|---|
| `<title>` | `Online Marketplace &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I grew clicks by 171% for an online marketplace through listing page templates, schema, and crawl efficiency.` |
| `cs-tag` | `E-commerce &bull; Marketplace` |
| `h1` | `Clicks up <em>171%.</em><br>Impressions up 241%.` |
| `cs-hero-sub` | `Scalable SEO for an online marketplace with thousands of listing pages.` |
| Metric 1 | `59.4K` / `Total Clicks` |
| Metric 2 | `1.49M` / `Impressions` |
| Metric 3 | `+171%` / `Click Growth` |
| Metric 4 | `+241%` / `Impression Growth` |
| `img src` | `../images/case-marketplace.png` |
| `img alt` | `Google Search Console data showing 171% click growth for an online marketplace` |
| `screenshot-caption` | `Google Search Console &bull; Period comparison` |
| Challenge h3 | `Thousands of thin listing pages. Poor crawl efficiency.` |
| Challenge p | `An online marketplace had thousands of listing pages. Most were thin and duplicated. The site had weak topical authority. Crawl budget was being wasted on low-value URLs.` |
| What I did h3 | `Templates, schema, and cleaner crawl paths.` |
| What I did ul | `<li>Built dynamic title tag templates for all listing page types</li><li>Added product schema at scale using structured data</li><li>Blocked low-value URLs from crawl with robots.txt and noindex</li><li>Created category hub pages to build topical authority</li><li>Improved site speed across listing page templates</li>` |
| Result h3 | `171% click growth. 241% more impressions.` |
| Result p | `Clicks grew from 21.9K to 59.4K in 6 months. Impressions surged from 437K to 1.49 million &#8212; a 241% increase. Average position improved from 19.9 to 17.9.` |
| `breadcrumb .current` | `Online Marketplace` |
| image filename | `case-marketplace.png` |

- [ ] **Step 4: Commit**

```bash
git add case-studies/jewellery-ecommerce.html case-studies/sportswear.html case-studies/marketplace.html
git commit -m "feat: add jewellery, sportswear, marketplace case study pages"
```

---

## Task 11: Case study pages — Remaining four

**Files:** `case-studies/car-listing.html`, `case-studies/furniture.html`, `case-studies/new-store.html`, `case-studies/wellness-uk.html`

- [ ] **Step 1: Write car-listing.html**

| Field | Value |
|---|---|
| `<title>` | `Car Listing Platform &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I drove 52.9K clicks and improved CTR from 3.3% to 4.5% for a car listing platform in 3 months.` |
| `cs-tag` | `Automotive &bull; Car Listings` |
| `h1` | `CTR up from <em>3.3% to 4.5%.</em><br>52.9K clicks in 3 months.` |
| `cs-hero-sub` | `CTR optimization and vehicle schema for a car listing platform.` |
| Metric 1 | `52.9K` / `Total Clicks` |
| Metric 2 | `1.18M` / `Impressions` |
| Metric 3 | `4.5%` / `Average CTR` |
| Metric 4 | `9.7` / `Avg Position` |
| `img src` | `../images/case-car-listing.png` |
| `img alt` | `Google Search Console data showing 52.9K clicks for a car listing platform` |
| `screenshot-caption` | `Google Search Console &bull; 3-month view` |
| Challenge h3 | `Good impressions. Low click-through rate.` |
| Challenge p | `A car listing platform had solid impressions but a weak CTR of 3.3%. They ranked for car model terms but were losing clicks to competitors with stronger titles and rich results.` |
| What I did h3 | `Better titles. Vehicle schema. Rich results.` |
| What I did ul | `<li>Rewrote title tags to include price signals and availability</li><li>Added vehicle schema with make, model, year, and mileage</li><li>Implemented review schema where eligible</li><li>Improved mobile UX on listing pages</li><li>A/B tested title formats to find the highest CTR pattern</li>` |
| Result h3 | `CTR jumped from 3.3% to 4.5% in 3 months.` |
| Result p | `52.9K clicks in just 3 months. CTR improved from 3.3% to 4.5%. Average position moved from 11.1 to 9.7. The schema upgrades drove rich results across vehicle listings.` |
| `breadcrumb .current` | `Car Listing Platform` |
| image filename | `case-car-listing.png` |

- [ ] **Step 2: Write furniture.html**

| Field | Value |
|---|---|
| `<title>` | `Furniture E-Commerce &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I grew organic traffic for a furniture e-commerce brand through content clusters and product schema.` |
| `cs-tag` | `E-commerce &bull; Furniture` |
| `h1` | `Steady growth.<br><em>18.3K clicks.</em> Strong impressions.` |
| `cs-hero-sub` | `Content clusters and product schema for a furniture e-commerce brand.` |
| Metric 1 | `18.3K` / `Total Clicks` |
| Metric 2 | `1.34M` / `Impressions` |
| Metric 3 | `14.7` / `Avg Position` |
| Metric 4 | `6 mo` / `Period` |
| `img src` | `../images/case-furniture.png` |
| `img alt` | `Google Search Console data showing 18.3K clicks for a furniture e-commerce brand` |
| `screenshot-caption` | `Google Search Console &bull; 6-month view` |
| Challenge h3 | `Ranking for brand. Missing category search.` |
| Challenge p | `A furniture brand had good brand rankings but poor category search visibility. They were missing room-based search terms. Product image alt text was empty across 500+ products.` |
| What I did h3 | `Room clusters. Schema. Image optimization.` |
| What I did ul | `<li>Built content clusters around room types (living room, bedroom, office)</li><li>Added product schema with price and availability on all products</li><li>Wrote keyword-rich alt text for 500+ product images</li><li>Created buying guide content to target high-intent queries</li><li>Improved category page headings and meta descriptions</li>` |
| Result h3 | `Clicks grew from 15.8K to 18.3K.` |
| Result p | `Clicks grew from 15.8K to 18.3K over 6 months. Impressions rose from 960K to 1.34 million. Average position held at 14.7. A steady upward trend with room to grow.` |
| `breadcrumb .current` | `Furniture E-Commerce` |
| image filename | `case-furniture.png` |

- [ ] **Step 3: Write new-store.html**

| Field | Value |
|---|---|
| `<title>` | `New E-Commerce Store &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I grew a brand-new e-commerce store from 29 clicks to 5,179 in 6 months by building SEO from scratch.` |
| `cs-tag` | `E-commerce &bull; New Site` |
| `h1` | `From <em>29 clicks to 5,179.</em><br>Six months. From scratch.` |
| `cs-hero-sub` | `Built a full SEO foundation for a brand-new store with zero organic history.` |
| Metric 1 | `5,179` / `Total Clicks` |
| Metric 2 | `81.6K` / `Impressions` |
| Metric 3 | `6.3%` / `Average CTR` |
| Metric 4 | `29` / `Starting Clicks` |
| `img src` | `../images/case-new-store.png` |
| `img alt` | `Google Search Console data showing growth from 29 to 5,179 clicks for a new e-commerce store` |
| `screenshot-caption` | `Google Search Console &bull; 6-month view` |
| Challenge h3 | `Zero history. Zero rankings. Zero trust.` |
| Challenge p | `A brand-new store had no organic presence at all. Just 29 clicks in the first month. No rankings, no backlinks, no site authority. Every decision had to be right from day one.` |
| What I did h3 | `Right architecture. Right keywords. Right signals.` |
| What I did ul | `<li>Built a clean site architecture with crawl efficiency in mind</li><li>Mapped target keywords to every page before writing any content</li><li>Added full schema markup from launch</li><li>Built initial backlinks through digital PR and supplier partnerships</li><li>Created a content plan targeting long-tail transactional queries</li>` |
| Result h3 | `29 clicks to 5,179 in 6 months.` |
| Result p | `From 29 clicks to 5,179 in just 6 months. Impressions hit 81.6K. CTR reached 6.3% &#8212; a strong number for a new store. The right foundation makes all the difference.` |
| `breadcrumb .current` | `New E-Commerce Store` |
| image filename | `case-new-store.png` |

- [ ] **Step 4: Write wellness-uk.html**

| Field | Value |
|---|---|
| `<title>` | `UK Wellness Brand &#8212; SEO Case Study \| Mohamed Amin` |
| `<meta description>` | `How I grew impressions by 124% and clicks by 45% QoQ for a UK wellness brand through content strategy and FAQ schema.` |
| `cs-tag` | `Wellness &bull; UK Market` |
| `h1` | `Impressions up <em>124%.</em><br>Clicks up 45% in one quarter.` |
| `cs-hero-sub` | `Content strategy and FAQ schema to build organic presence for a UK wellness brand.` |
| Metric 1 | `1,402` / `Total Clicks` |
| Metric 2 | `162K` / `Impressions` |
| Metric 3 | `+45%` / `QoQ Click Growth` |
| Metric 4 | `11.1` / `Avg Position` |
| `img src` | `../images/case-wellness-uk.png` |
| `img alt` | `Google Search Console data showing 124% impression growth for a UK wellness brand` |
| `screenshot-caption` | `Google Search Console &bull; Quarter comparison` |
| Challenge h3 | `Competing against bigger brands with thin content.` |
| Challenge p | `A UK wellness brand had almost no organic traffic. Their content was thin. They were competing against established health and wellness brands with far more authority.` |
| What I did h3 | `Long-tail focus. Schema. Featured snippet targeting.` |
| What I did ul | `<li>Built a content strategy around long-tail wellness queries</li><li>Optimised existing pages for featured snippet opportunities</li><li>Added FAQ schema to 15 key articles</li><li>Improved page speed and Core Web Vitals scores</li><li>Built topical clusters around core wellness themes</li>` |
| Result h3 | `Impressions up 124%. Clicks up 45% in one quarter.` |
| Result p | `Impressions grew 124% to 162K. Clicks hit 1,402 with a 45% quarter-on-quarter growth rate. Average position improved to 11.1. A fast start for a new organic channel.` |
| `breadcrumb .current` | `UK Wellness Brand` |
| image filename | `case-wellness-uk.png` |

- [ ] **Step 5: Commit**

```bash
git add case-studies/car-listing.html case-studies/furniture.html case-studies/new-store.html case-studies/wellness-uk.html
git commit -m "feat: add remaining 4 case study pages"
```

---

## Task 12: Final polish + GitHub push

**Files:** No new files. Verification and deploy.

- [ ] **Step 1: Verify all internal links work**

Open `index.html` in browser. Check:
- Nav links → correct anchors on homepage
- "View all case studies" → opens `case-studies.html`
- Each of the 3 featured cards → opens correct case study page
- "Case Studies" nav link → opens `case-studies.html`

Open `case-studies.html`. Check:
- Filter tabs hide/show correct cards
- All 11 "Read case study →" links open the correct page

Open one case study page (e.g. `enterprise-logistics.html`). Check:
- Breadcrumb links work
- Metrics strip displays
- Screenshot placeholder shows (since image not yet added)
- Story sections display
- CTA links to Upwork with `rel="noopener noreferrer"`
- Back to case studies link works

- [ ] **Step 2: Verify no brand names appear anywhere**

```bash
grep -r -i "dpworld\|armani\|vida\|emaar\|kooheji\|holosophy\|medita" case-studies/ index.html case-studies.html
```

Expected output: no matches.

- [ ] **Step 3: Verify all external links have rel="noopener noreferrer"**

```bash
grep -r 'target="_blank"' . --include="*.html" | grep -v 'rel="noopener noreferrer"'
```

Expected output: no matches.

- [ ] **Step 4: Final commit and push**

```bash
git add -A
git commit -m "feat: complete portfolio site — 11 case studies, 9 services, no brand names"
git remote add origin https://github.com/mohamedamin025/portfolio.git
git push -u origin master
```

- [ ] **Step 5: Tell user where to drop screenshots**

After pushing, the site is live. The user drops their 11 GSC screenshots into the `images/` folder with these exact filenames:

```
images/case-enterprise-logistics.png
images/case-real-estate-developer.png
images/case-luxury-hotel-a.png
images/case-hotel-chain.png
images/case-jewellery-ecommerce.png
images/case-sportswear.png
images/case-marketplace.png
images/case-car-listing.png
images/case-furniture.png
images/case-new-store.png
images/case-wellness-uk.png
```

Then commit and push again:
```bash
git add images/
git commit -m "feat: add GSC screenshots for all case studies"
git push
```

---

## Spec Coverage Check

| Spec requirement | Task |
|---|---|
| Root-friendly layout (index.html at root) | Task 6 |
| Separate css/, js/, images/ folders | Task 1 |
| 9 service cards incl. GEO, AEO, AIO, Content Strategy | Task 6 |
| case-studies.html with filter tabs | Task 7 |
| 11 individual case study pages | Tasks 8–11 |
| Hybrid layout (metrics + story + screenshot) | Tasks 8–11 |
| No brand names anywhere | Tasks 7–11 + Task 12 Step 2 |
| Flesch ≥ 90 copy (short sentences, plain English) | Tasks 8–11 (all story copy) |
| All security fixes (noopener, no implicit event, CSP, rAF throttle) | Tasks 2, 5, 6, 7 |
| Placeholder images with onerror fallback | Tasks 1, 8 |
| `rel="noopener noreferrer"` on all external links | Tasks 6–11 |
| Non-blocking Google Fonts | Tasks 6–11 |

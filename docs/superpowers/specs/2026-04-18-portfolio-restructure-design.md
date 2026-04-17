# Portfolio Restructure — Design Spec
**Date:** 2026-04-18  
**Status:** Approved  
**Author:** Mohamed Amin (via Claude Code)

---

## Overview

Restructure a single-file portfolio (`portfolio-site.html`) into a multi-page GitHub Pages site with clean URLs, separate asset folders, real GSC screenshot images, individual case study pages, and two new service offerings.

---

## Goals

1. GitHub Pages ready — `index.html` at root, push and deploy instantly
2. Clean folder separation — `css/`, `js/`, `images/` each in their own directory
3. 11 individual case study pages with hybrid layout (metrics + story + screenshot)
4. A case studies index page (`case-studies.html`) with filter tabs
5. Add GEO & Content Strategy and International & Multilingual SEO as new services
6. All copy at Flesch Reading Ease ≥ 90 (short sentences, plain English, active voice)
7. All security fixes from prior code review applied (noopener, no implicit event global, CSP meta tag)

---

## Folder Structure

```
portfolio/
├── index.html
├── case-studies.html
├── case-studies/
│   ├── enterprise-logistics.html
│   ├── real-estate-developer.html
│   ├── luxury-hotel-a.html
│   ├── hotel-chain.html
│   ├── jewellery-ecommerce.html
│   ├── sportswear.html
│   ├── marketplace.html
│   ├── car-listing.html
│   ├── furniture.html
│   ├── new-store.html
│   └── wellness-uk.html
├── css/
│   ├── main.css
│   ├── home.css
│   ├── case-studies.css
│   └── case-study.css
├── js/
│   ├── main.js
│   └── filter.js
└── images/
    ├── case-enterprise-logistics.png
    ├── case-real-estate-developer.png
    ├── case-luxury-hotel-a.png
    ├── case-hotel-chain.png
    ├── case-jewellery-ecommerce.png
    ├── case-sportswear.png
    ├── case-marketplace.png
    ├── case-car-listing.png
    ├── case-furniture.png
    ├── case-new-store.png
    └── case-wellness-uk.png
```

**Note:** All images are placeholders at build time. User drops actual GSC screenshots into `images/` using the exact filenames above.

---

## Pages

### index.html (Homepage)

Sections in order:
1. Nav — logo, 4 links (Services, Case Studies, Tools, Contact), Upwork CTA button
2. Hero — tag pill, H1, subheading, two CTAs (Free Assessment → Contact, See Results → case-studies.html)
3. Stats strip — 7.2M+ clicks, 180M+ impressions, 20+ projects, 4+ years
4. Services — 8 cards in 4-col grid (see service list below)
5. Featured results — 3 highlight cards linking to top case studies (DP World, Emaar, Kooheji Jewellery — one enterprise, one real estate, one e-commerce)
6. Tools — pill cloud
7. Industries served — 4 cards
8. CTA section — "Ready to grow?" with Upwork + email links
9. Contact — 3 cards (email, LinkedIn, Upwork)
10. Footer

### case-studies.html (Index)

- Section header
- Filter tabs: All · E-commerce · Enterprise · Hospitality · Other
- Grid of 11 case study cards — each card shows: category tag, title, 3 key metrics, "Read case study →" link to individual page
- No featured/full-width cards — uniform grid for scannability

### case-studies/[slug].html (Individual — 11 pages)

Layout per page:
```
Breadcrumb: Home > Case Studies > [Name]
Hero:
  - Category tag
  - H1 (lead with biggest metric)
  - One-sentence subheading (≤15 words, Flesch 90)
Metric strip (4 cards):
  - Total Clicks | Impressions | CTR | Avg Position
GSC Screenshot:
  - Full-width image (images/case-[slug].png)
  - Caption below
Story (3 sections, each ≤50 words):
  - The challenge
  - What I did (3–4 bullet points, active voice)
  - The result
CTA bar:
  - "Want results like this?" → Upwork link
```

---

## Services (9 total)

| # | Card Title | Description focus |
|---|---|---|
| 1 | Technical SEO | Crawl audits, Core Web Vitals, structured data, site architecture |
| 2 | Content Strategy | Content planning, gap analysis, topical authority mapping, editorial calendars |
| 3 | GEO — Generative Engine Optimization | Optimize for AI-generated answers: entity coverage, passage-level citability, source authority |
| 4 | AEO & AIO | Answer Engine Optimization + AI Overview Optimization — appear in featured snippets, Google AI Overviews, and PAA boxes |
| 5 | Local SEO & GBP | GBP optimization, map pack, citations, reviews |
| 6 | YouTube SEO | Video keyword research, metadata, CTR, channel authority |
| 7 | E-commerce SEO | Shopify, WooCommerce, product schema, faceted navigation |
| 8 | International & Multilingual SEO | Hreflang, Arabic SEO, regional keyword targeting, multi-market strategy |
| 9 | On-Page SEO & E-E-A-T | Meta tags, heading structure, internal linking, author authority, trust signals |

---

## Case Studies Data

**Rule: No brand names anywhere on the site — use descriptive labels only.**

| Slug | Display Name | Category | Clicks | Impressions | CTR | Avg Pos | Period |
|---|---|---|---|---|---|---|---|
| enterprise-logistics | Global Logistics Enterprise | Enterprise | 4.85M | 83M | 5.8% | 19.6 | 12 months |
| real-estate-developer | Real Estate Developer | Enterprise / Real Estate | 1.48M | 70.9M | 2.1% | 17.9 | — |
| luxury-hotel-a | Luxury Hotel Brand | Hospitality | 184K | 9.65M | 1.9% | 15.3 | — |
| hotel-chain | International Hotel Group | Hospitality | 166K | 5.56M | 3% | 11.3 | — |
| jewellery-ecommerce | Jewellery E-Commerce | E-commerce | 87.7K | 3.58M | 2.5% | 10.2 | 16 months |
| sportswear | Sportswear Brand | E-commerce | 81.9K | 4.76M | — | — | +120% growth |
| marketplace | Online Marketplace | E-commerce | 59.4K | 1.49M | — | 17.9 | +171% growth |
| car-listing | Car Listing Platform | Automotive | 52.9K | 1.18M | 4.5% | 9.7 | 3 months |
| furniture | Furniture E-Commerce | E-commerce | 18.3K | 1.34M | — | 14.7 | 6 months |
| new-store | New E-Commerce Store | E-commerce / New site | 5.17K | 81.6K | 6.3% | 10 | 6 months |
| wellness-uk | UK Wellness Brand | Wellness | 1,402 | 162K | 0.9% | 11.1 | +45% QoQ |

---

## CSS Architecture

**main.css** — CSS custom properties, reset, typography, nav, footer, buttons, reveal animation, shared utilities  
**home.css** — hero, stats, services grid, featured results, tools, industries, CTA, contact  
**case-studies.css** — filter tabs, case study card grid  
**case-study.css** — breadcrumb, case hero, metric strip, screenshot block, story sections, CTA bar  

All files use the same CSS custom properties defined in `main.css`:
```css
:root {
  --bg, --bg-card, --bg-elevated, --text, --text-muted,
  --accent, --accent-dim, --border, --serif, --sans
}
```

---

## JS Architecture

**main.js** (runs on every page):
- Cache nav element at load, not in scroll handler
- `requestAnimationFrame` throttle on scroll
- `IntersectionObserver` for `.reveal` elements — uses persistent counter for stagger delay
- Mobile nav toggle — wired via `addEventListener`, no inline `onclick`
- All external `<a target="_blank">` get `rel="noopener noreferrer"` in HTML

**filter.js** (case-studies.html only):
- `filterCases(cat, event)` — receives event as parameter, uses `.closest('.filter-tab')` to avoid child-click bug
- Show/hide cards, re-trigger reveal animation

---

## Security Fixes Applied

All issues from prior review are fixed in the new build:
- `rel="noopener noreferrer"` on every `target="_blank"` link
- No implicit global `event` — passed explicitly to all handlers
- CSP meta tag in every `<head>`
- Scroll handler throttled with `requestAnimationFrame`
- `transition: border-color, transform` instead of `transition: all`
- `IntersectionObserver` stagger uses persistent counter, not entry index

---

## Image Handling

Images are referenced as `../images/case-[slug].png` from within `case-studies/` pages and `images/case-[slug].png` from root pages. Placeholders are styled divs shown when the image file is missing — no broken img tags.

Each case study page uses:
```html
<div class="screenshot-block">
  <img src="../images/case-dpworld.png" 
       alt="Google Search Console data for DP World — 4.85M clicks"
       onerror="this.parentElement.classList.add('placeholder')"
       width="1200" height="675" loading="lazy">
  <p class="screenshot-caption">Google Search Console · 12-month view</p>
</div>
```

---

## Copy Guidelines (Flesch ≥ 90)

- Max sentence length: 12 words
- Use simple words. No jargon.
- Active voice only ("I built", not "was built")
- Each story section: ≤ 50 words total
- H1s lead with the biggest number
- Subheadings answer "so what?" in one line

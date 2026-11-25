# ByDee — Aesthetics & Skin Clinic Website

Bilingual (English / Arabic, RTL) website for ByDee, a clinic in Barbir, Beirut, Lebanon, run by Deena Kaddoura, RN. Built with [Astro](https://astro.build) and outputs plain static HTML, CSS and a small amount of JavaScript.

## Admin area

The clinic owner edits photos, offers, prices, reviews, results, FAQ, journal and settings at `/admin/`. See [ADMIN.md](ADMIN.md) for sign-in setup.

## Commands

```
npm install
npm run dev       # local dev server
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
```

## Structure

```
site.config.mjs        # reads src/cms/settings.json (domain, phone, WhatsApp, analytics, links)
src/cms/*.json         # owner-editable data: settings, photos, offers, prices, reviews, results, FAQ
public/admin/config.yml   # admin area (/admin/) configuration, see ADMIN.md
src/pages/             # / and /ar/ (home), /treatments/<slug>/, /skin-quiz/, /journal/, legal pages (+ /ar/ copies)
src/components/Home.astro   # the home page markup (used for both languages)
src/i18n/en.json, ar.json   # all page text, one key per string
src/i18n/legal.ts           # legal page text (DRAFT, have a lawyer review)
src/i18n/treatments.ts      # treatment page content, general FAQ (DRAFT, Deena to review)
src/data/                   # prices.ts, results.ts, reviews.ts: empty until filled in
src/data/promotions.ts      # offers, gift cards, referral, WhatsApp opt-in: off until filled in
src/content/journal/en|ar/  # journal articles (Markdown), same file name in both folders
src/scripts/quiz.js         # skin quiz logic (runs in the browser, sends nothing)
src/layouts/           # Base (SEO, hreflang, structured data), Legal
src/scripts/           # main.js (UI, booking form), analytics.js (consent-aware)
src/assets/            # photos, optimised to WebP at build time
public/                # favicon, icons, manifest, social image
```

English lives at `/`, Arabic at `/ar/`. Each page has hreflang tags and both appear in the sitemap. Add or change text in both JSON files using the same key.

## Images

Put photos in `src/assets/` with these names (any of jpg, jpeg, png, webp, avif). If a file is missing, a stock photo is used.

`home-hero`, `deena-profile`, `signature-facial`, `skin-rejuvenation`, `laser-resurfacing`, `quadro-laser`, `anti-wrinkle`, `results-1`, `results-2`

## Going live checklist

- **Custom domain:** change `url` in `site.config.mjs`, then add the domain in Vercel.
- **Analytics:** set `analytics.ga4Id` and/or `analytics.metaPixelId`. Nothing loads, and no cookie banner shows, while both are empty. When set, tracking loads only after the visitor accepts.
- **Google Business Profile:** set `googleBusinessUrl` and `googleReviewUrl`, and keep the name, address and phone identical to the profile.
- **Address and map pin:** add the full address and `geo` coordinates.
- **Email:** set `email` to show it on legal pages and in structured data.
- **Legal pages:** have a Lebanese lawyer review `src/i18n/legal.ts`.
- **Prices and packages:** fill `src/data/prices.ts`. Prices show on the treatment cards and pages only once added.
- **Reviews:** add real, agreed reviews to `src/data/reviews.ts`. The section and its nav link appear automatically.
- **Before/after cases:** add photo pairs to `src/assets/` and a consented entry in `src/data/results.ts`. The section, filter buttons and nav link appear automatically.
- **Online booking:** set `bookingUrl` in `site.config.mjs` (Fresha, Setmore, Cal.com...). A "Book online" button then appears.
- **Treatment and FAQ text:** have Deena check `src/i18n/treatments.ts` (sessions, downtime, who should avoid, aftercare) so it matches her practice.
- **Offers, gift cards, referral, WhatsApp opt-in:** fill in `src/data/promotions.ts`. Each part appears only once filled in or switched on. Offers disappear after their end date at the next build.
- **Journal:** add a Markdown file to `src/content/journal/en/` and the same file name to `src/content/journal/ar/`. Set `draft: true` to hide one. Have Deena review articles before publishing.
- **"Why us" counters:** still hidden with a `hidden` attribute in `Home.astro` until real figures are confirmed.
- **Booking:** the form opens WhatsApp with the details. No data is stored on the site.

## Writing a journal article

```md
---
title: "Article title"
description: "One or two sentences shown in search results and the article list."
date: 2026-12-01
treatment: laser-hair-removal   # optional, adds a link to that treatment page
draft: false
---

Your text in Markdown. Use ## for section headings and - for lists.
```

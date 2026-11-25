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
site.config.mjs        # reads src/cms/contact.json and advanced.json
src/cms/*.json         # owner-editable data: contact, advanced, photos, offers, gift cards, referral, prices, reviews, results, FAQ
public/admin/config.yml   # admin area (/admin/) configuration, see ADMIN.md
src/pages/             # / and /ar/ (home), /treatments/<slug>/, /skin-quiz/, /journal/, legal pages (+ /ar/ copies)
src/components/Home.astro   # the home page markup (used for both languages)
src/i18n/en.json, ar.json   # all page text, one key per string
src/i18n/legal.ts           # legal page text (DRAFT, have a lawyer review)
src/i18n/treatments.ts      # treatment page content, general FAQ (DRAFT, Deena to review)
src/data/                   # read the src/cms files for the pages (prices, results, reviews, promotions)
src/content/journal/en|ar/  # journal articles (Markdown), same file name in both folders
src/scripts/quiz.js         # skin quiz logic (runs in the browser, sends nothing)
src/layouts/           # Base (SEO, hreflang, structured data), Legal
src/scripts/           # main.js (UI, booking form), analytics.js (consent-aware)
src/assets/            # photos, optimised to WebP at build time
public/                # favicon, icons, manifest, social image
```

English lives at `/`, Arabic at `/ar/`. Each page has hreflang tags and both appear in the sitemap. Add or change text in both JSON files using the same key.

## Images

The easiest way to change photos is the admin (Website photos). Developers can also put photos in `src/assets/` with these names (jpg, jpeg, png, webp or avif). If neither exists, a stock photo from `src/assets/stock/` is used, all served from this site (no third-party image hosts).

`home-hero`, `deena-profile`, `signature-facial`, `skin-rejuvenation`, `laser-resurfacing`, `quadro-laser`, `anti-wrinkle`, `results-1`, `results-2`

## Going live checklist

- **Custom domain:** add the domain in Vercel, then change the website address in the admin under Advanced settings.
- **Analytics:** in the admin, Advanced settings, add a Google Analytics or Meta Pixel ID. Nothing loads, and no cookie banner shows, while both are empty. When set, tracking loads only after the visitor accepts.
- **Google Business Profile:** in the admin, add the profile link (Advanced settings) and the review link (Contact details). Keep the name, address and phone identical to the profile.
- **Address and map pin:** add the map location in the admin (Advanced settings). The street address is still in the code (`Base.astro` and `en.json`/`ar.json`).
- **Email:** add it in the admin (Contact details) to show it on legal pages and in structured data.
- **Legal pages:** have a Lebanese lawyer review `src/i18n/legal.ts`.
- **Prices and packages:** add them in the admin (Prices). They show on the treatment cards and pages only once added.
- **Reviews:** add real, agreed reviews in the admin (Reviews). The section and its nav link appear automatically.
- **Before/after cases:** add photo pairs with consent in the admin (Before & after). The section, filter buttons and nav link appear automatically.
- **Online booking:** add the booking link in the admin under Contact details (Fresha, Setmore, Cal.com...). A "Book online" button then appears.
- **Treatment and FAQ text:** have Deena check `src/i18n/treatments.ts` (sessions, downtime, who should avoid, aftercare) so it matches her practice.
- **Offers, gift cards, referral, WhatsApp opt-in:** fill them in through the admin. Each part appears only once filled in or switched on. Offers disappear after their end date at the next build.
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

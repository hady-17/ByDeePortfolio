# ByDee — Aesthetics & Skin Clinic Website

Static, bilingual (English / Arabic, RTL) website for ByDee, a clinic in Barbir, Beirut, Lebanon (since 2020), run by Deena Kaddoura, RN — professional certified derma.

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Structure

```
clinic/
├── index.html      # Page markup, SEO meta, structured data
├── css/style.css   # Styles (light/dark theme, RTL support)
├── js/main.js      # i18n, theme, carousel, before/after slider, booking form
└── assets/
    └── *           # Optional local images (see "Images" below)
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Images

Every image first tries a local file in `assets/`. Use the exact name below with any of these extensions: `.webp`, `.jpg`, `.jpeg`, `.jfif`, `.png`, `.avif` (tried in that order). If no file is found, the site falls back to the stock photo. Names are case-sensitive on GitHub Pages.

| File | Used for |
| --- | --- |
| `assets/home-hero` | Hero image |
| `assets/deena-profile` | Deena's profile photo |
| `assets/signature-facial` | Signature Facial card |
| `assets/skin-rejuvenation` | Skin Rejuvenation card |
| `assets/laser-resurfacing` | Laser Resurfacing card |
| `assets/quadro-laser` | Quadro Laser card |
| `assets/anti-wrinkle` | Anti-Wrinkle card |
| `assets/results-1`, `assets/results-2` | Before / after cases |

### Fast image loading (build step)

`scripts/build.mjs` runs in CI before deploying (or locally with `npm install --no-save sharp && node scripts/build.mjs`, output in `_site/`). It:

- resizes images to at most 1200px wide and converts them to WebP (about 2.7 MB became 119 KB in testing);
- matches your files case-insensitively with any extension, and writes the exact path into the page, so the browser makes one request per image with no 404 probing;
- points images that have no local file straight at their stock photo;
- preloads the hero image when a local one exists.

Your original files in `assets/` are never changed. Opening `index.html` directly (no build) still works, using the slower extension lookup.

## Deployment (GitHub Actions)

`.github/workflows/deploy.yml` runs on every push and pull request:

1. **Check**: confirms every local file referenced in `index.html` exists and that `js/main.js` has valid syntax.
2. **Deploy**: on pushes to `main`, publishes `index.html`, `css/`, `js/` and `assets/` to GitHub Pages.

One-time setup: in the GitHub repo go to **Settings → Pages → Source** and choose **GitHub Actions**.

## Configuration

- **WhatsApp number:** `CONFIG.whatsappNumber` in `js/main.js` (digits only, international format) and the `https://wa.me/...` links in `index.html`. Currently `96181126500`.
- **Booking form:** `CONFIG.formMode` — `'whatsapp'` opens WhatsApp with the request details; `'netlify'` posts to Netlify Forms and falls back to WhatsApp.
- **Profile photo:** `assets/deena-profile` (About section).
- **Contact details, hours, map:** Contact section in `index.html`; the map URL is the `data-src` on `.map`.

## Translations

English text lives in the HTML. Arabic strings are in `STR.ar` in `js/main.js`. To add a string, put `data-i18n="key"` on the element and add the key to `STR.ar`.

## Still to fill in

- `[DOMAIN]` in the canonical URL, Open Graph tags and structured data
- `[EMAIL]` in the structured data
- Instagram / Facebook handles (`[HANDLE]`)
- Real testimonials and client names (current ones are samples)
- Name of the nursing association, if it should be shown
- Counters in the "Why us" section (clients, treatments, satisfaction) — replace with real figures
- Open Graph cover image (`images/og-cover.jpg`) and logo

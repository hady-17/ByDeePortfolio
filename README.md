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
    └── Dee.webp    # Deena's profile photo (add this file)
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Configuration

- **WhatsApp number:** `CONFIG.whatsappNumber` in `js/main.js` (digits only, international format) and the `https://wa.me/...` links in `index.html`. Currently `96181126500`.
- **Booking form:** `CONFIG.formMode` — `'whatsapp'` opens WhatsApp with the request details; `'netlify'` posts to Netlify Forms and falls back to WhatsApp.
- **Profile photo:** `assets/Dee.webp` (About section).
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

// Site-wide settings. The values live in src/cms/contact.json and src/cms/advanced.json so the
// clinic owner can edit them in the admin area (/admin/). Used by astro.config.mjs and the pages.
import contact from './src/cms/contact.json' with { type: 'json' };
import advanced from './src/cms/advanced.json' with { type: 'json' };

const clean = (v) => (typeof v === 'string' ? v.trim() : v ?? '');
const lat = Number(advanced.geo?.lat);
const lng = Number(advanced.geo?.lng);
const hasGeo = advanced.geo?.lat != null && advanced.geo?.lng != null && advanced.geo?.lat !== '' && advanced.geo?.lng !== '';

export default {
  url: clean(advanced.url).replace(/\/+$/, '') || 'https://bydee961.vercel.app',
  name: clean(advanced.name) || 'ByDee',
  whatsapp: clean(contact.whatsapp).replace(/\D/g, '') || '96181126500', // digits only
  phone: clean(contact.phone),
  phoneDisplay: clean(contact.phoneDisplay) || clean(contact.phone),
  instagram: clean(contact.instagram),
  email: clean(contact.email),
  bookingUrl: clean(contact.bookingUrl),
  googleBusinessUrl: clean(advanced.googleBusinessUrl),
  googleReviewUrl: clean(contact.googleReviewUrl),
  geo: hasGeo && Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null,
  analytics: {
    ga4Id: clean(advanced.analytics?.ga4Id),
    metaPixelId: clean(advanced.analytics?.metaPixelId)
  },
  lastUpdated: String(clean(advanced.lastUpdated) || '2026-11-24').slice(0, 10)
};

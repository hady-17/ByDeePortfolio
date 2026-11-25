// Site-wide settings. The values live in src/cms/settings.json so the clinic owner can edit them
// in the admin area (/admin/). Used by astro.config.mjs and the pages.
import data from './src/cms/settings.json' with { type: 'json' };

const clean = (v) => (typeof v === 'string' ? v.trim() : v ?? '');
const lat = Number(data.geo?.lat);
const lng = Number(data.geo?.lng);

export default {
  url: clean(data.url).replace(/\/+$/, '') || 'https://bydee961.vercel.app',
  name: clean(data.name) || 'ByDee',
  whatsapp: clean(data.whatsapp).replace(/\D/g, ''), // international format, digits only
  phone: clean(data.phone),
  phoneDisplay: clean(data.phoneDisplay),
  instagram: clean(data.instagram),
  email: clean(data.email),
  bookingUrl: clean(data.bookingUrl),
  googleBusinessUrl: clean(data.googleBusinessUrl),
  googleReviewUrl: clean(data.googleReviewUrl),
  geo: data.geo?.lat != null && data.geo?.lng != null && Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null,
  analytics: {
    ga4Id: clean(data.analytics?.ga4Id),
    metaPixelId: clean(data.analytics?.metaPixelId)
  },
  lastUpdated: clean(data.lastUpdated) || '2026-11-24'
};

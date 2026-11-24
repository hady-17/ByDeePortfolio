// Single place to edit site-wide settings. Used by astro.config.mjs and the pages.
export default {
  // Change this one line when the custom domain is live (e.g. 'https://bydee.com').
  url: 'https://bydee961.vercel.app',
  name: 'ByDee',
  whatsapp: '96181126500', // international format, digits only
  phone: '+96181126500',
  phoneDisplay: '+961 81 126 500',
  instagram: 'https://instagram.com/bydee961',
  email: '', // add a contact email; it is then shown on the legal pages and in structured data

  // Optional online booking page (Fresha, Setmore, Cal.com...). When set, "Book" buttons on the
  // treatment pages and the booking section offer it alongside the form and WhatsApp.
  bookingUrl: '',

  // Google Business Profile. Fill these in once the profile is verified.
  googleBusinessUrl: '', // e.g. https://g.page/...  (added to structured data sameAs)
  googleReviewUrl: '',   // "Write a review" link; the Reviews link appears when set
  geo: null,             // e.g. { lat: 33.88, lng: 35.52 } once the exact pin is known

  // Analytics. Leave empty to load nothing and show no cookie banner.
  analytics: {
    ga4Id: '',       // e.g. 'G-XXXXXXXXXX'
    metaPixelId: ''  // e.g. '1234567890'
  },

  lastUpdated: '2026-11-24' // legal pages
};

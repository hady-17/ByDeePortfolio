/* Consent-aware analytics. Does nothing (and shows no banner) unless an ID is set in site.config.mjs.
   Nothing loads until the visitor accepts. Choice is remembered in localStorage. */
const KEY = 'consent';
const get = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
const set = (v) => { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } };

let loaded = false;
const track = (name, params = {}) => {
  if (!loaded) return;
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
  if (typeof window.fbq === 'function') {
    const map = { whatsapp_click: 'Contact', phone_click: 'Contact', booking_request: 'Lead' };
    if (map[name]) window.fbq('track', map[name], params);
  }
};

function load(ga, pixel) {
  if (loaded) return;
  loaded = true;
  if (ga) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ga, { anonymize_ip: true });
    const s = document.createElement('script');
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`;
    document.head.append(s);
  }
  if (pixel) {
    /* Standard Meta Pixel bootstrap */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', pixel);
    window.fbq('track', 'PageView');
  }
}

export function initAnalytics() {
  const { ga, pixel } = document.body.dataset;
  if (!ga && !pixel) return;

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    if (a.classList.contains('js-wa') || /wa\.me/.test(a.href)) track('whatsapp_click', { location: a.closest('section')?.id || 'page' });
    else if (a.href.startsWith('tel:')) track('phone_click');
  });
  document.addEventListener('bydee:booking', () => track('booking_request'));

  const banner = document.getElementById('cookie-banner');
  const choice = get();
  if (choice === 'granted') load(ga, pixel);
  else if (!choice && banner) banner.hidden = false;
  banner?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-consent]');
    if (!btn) return;
    set(btn.dataset.consent);
    banner.hidden = true;
    if (btn.dataset.consent === 'granted') load(ga, pixel);
  });
  document.querySelectorAll('.js-cookie-settings').forEach((b) => b.addEventListener('click', () => { if (banner) banner.hidden = false; }));
}

/* ==========================================================================
   ByDee — main.js (vanilla, no dependencies)
   Modules: config · utils · theme · header/nav · reveal · hero ·
            counters · before/after · carousel · booking · map · mobile bar
   ========================================================================== */
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';
import { initAnalytics } from './analytics.js';

(() => {
  'use strict';

  /* ---------- CONFIG: edit these ---------- */
  const CONFIG = {
    whatsappNumber: '96181126500', // international format, digits only
    // 'whatsapp' = form opens WhatsApp with the details (works on any host)
    // 'netlify'  = posts to Netlify Forms, falls back to WhatsApp if that fails
    formMode: 'whatsapp',
    autoplayMs: 7000
  };

  /* ---------- Utils ---------- */
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };
  const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = motionMQ.matches;
  motionMQ.addEventListener?.('change', (e) => { reduceMotion = e.matches; });
  const lang = () => (root.lang === 'ar' ? 'ar' : 'en');

  /* ======================================================================
     I18N — English is read from the HTML at load; Arabic lives here.
     Page text is rendered at build time (src/i18n/en.json, ar.json). These
     dictionaries are only used here for messages created in the browser.
     ====================================================================== */
  const STR = { en, ar }; // dictionaries shared with the pages (src/i18n)


  const t = (key, vars) => {
    let s = STR[lang()][key] ?? STR.en[key] ?? '';
    if (vars) Object.keys(vars).forEach((k) => { s = s.replaceAll(`{${k}}`, vars[k]); });
    return s;
  };

  /* ======================================================================
     THEME — prefers-color-scheme by default, manual choice remembered
     ====================================================================== */
  function initTheme() {
    const meta = $('meta[name="theme-color"]');
    const update = () => {
      const dark = root.dataset.theme === 'dark';
      meta.content = dark ? '#141210' : '#FAF6EF';
      $$('.js-theme-toggle').forEach((b) => {
        b.setAttribute('aria-pressed', String(dark));
        b.setAttribute('aria-label', t(dark ? 'a11y.themeLight' : 'a11y.themeDark'));
      });
    };
    const set = (theme, animate) => {
      if (animate && !reduceMotion) {
        root.classList.add('theme-anim');
        window.setTimeout(() => root.classList.remove('theme-anim'), 600);
      }
      root.dataset.theme = theme;
      update();
    };
    $$('.js-theme-toggle').forEach((b) => b.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      store.set('theme', next);
      set(next, true);
    }));
    // Follow the OS only until the visitor makes a choice
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', (e) => {
      if (!store.get('theme')) set(e.matches ? 'dark' : 'light', true);
    });
    document.addEventListener('langchange', update);
    update();
  }

  /* ======================================================================
     HEADER (shrink on scroll), NAV (mobile drawer + current section)
     ====================================================================== */
  function initHeaderNav() {
    const header = $('#header');
    const nav = $('#site-nav');
    const toggle = $('.js-nav-toggle');
    if (!header || !nav || !toggle) return () => {}; // inner pages use a simpler header
    const desktop = window.matchMedia('(min-width: 960px)');

    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', t(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
      document.body.classList.toggle('no-scroll', open);
      $('#mbar')?.classList.toggle('is-hidden', open);
      if (open) $('.nav__link', nav)?.focus({ preventScroll: true });
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('.nav__link', nav).forEach((a) => a.addEventListener('click', () => { if (!desktop.matches) setOpen(false); }));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    desktop.addEventListener?.('change', () => setOpen(false));
    document.addEventListener('langchange', () => setOpen(nav.classList.contains('is-open')));

    // Highlight the section in view
    const links = new Map($$('.nav__link').map((a) => [a.getAttribute('href').slice(1), a]));
    const sectionIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-current'));
        links.get(entry.target.id)?.classList.add('is-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) sectionIO.observe(s); });

    return () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  /* ======================================================================
     SCROLL REVEAL — IntersectionObserver, one-shot
     ====================================================================== */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-visible')); return; }
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealIO.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((el) => revealIO.observe(el));
  }

  /* ======================================================================
     HERO — load choreography + parallax (transform only, only while visible)
     ====================================================================== */
  function initHero() {
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));
    const hero = $('.hero');
    const img = $('.hero__img');
    if (!hero) return () => {}; // only the home page has a hero
    let visible = true;
    const heroIO = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    heroIO.observe(hero);
    return () => {
      if (reduceMotion || !visible || !img) return;
      img.style.setProperty('--py', `${Math.min(window.scrollY * 0.12, 140).toFixed(1)}px`);
    };
  }

  /* ======================================================================
     COUNTERS — ease-out count-up when in view
     ====================================================================== */
  function initCounters() {
    const nums = $$('.stat__num[data-count]');
    const fmt = new Intl.NumberFormat('en-US');
    const render = (el, v) => { el.textContent = fmt.format(v) + (el.dataset.suffix || ''); };
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    nums.forEach((el) => render(el, 0));
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countIO.unobserve(entry.target);
        const el = entry.target;
        const target = Number(el.dataset.count);
        const duration = 1800;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          render(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    nums.forEach((el) => countIO.observe(el));
  }

  /* ======================================================================
     BEFORE / AFTER — pointer (mouse+touch+pen) and keyboard
     ====================================================================== */
  function initBeforeAfter() {
    $$('.ba').forEach((ba) => {
      const handle = $('.ba__handle', ba);
      let pos = 50;
      let dragging = false;

      const set = (v) => {
        pos = Math.max(0, Math.min(100, v));
        ba.style.setProperty('--pos', `${pos}%`);
        handle.setAttribute('aria-valuenow', String(Math.round(pos)));
        handle.setAttribute('aria-valuetext', `${Math.round(pos)}%`);
      };
      const fromPointer = (e) => {
        const r = ba.getBoundingClientRect();
        set(((e.clientX - r.left) / r.width) * 100);
      };

      ba.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        dragging = true;
        ba.setPointerCapture(e.pointerId);
        ba.classList.add('is-dragging');
        fromPointer(e);
        if (e.pointerType === 'mouse') handle.focus({ preventScroll: true });
      });
      ba.addEventListener('pointermove', (e) => { if (dragging) fromPointer(e); });
      const end = () => { dragging = false; ba.classList.remove('is-dragging'); };
      ba.addEventListener('pointerup', end);
      ba.addEventListener('pointercancel', end); // vertical swipe → page scrolls (touch-action: pan-y)

      handle.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? 10 : 2;
        const actions = {
          ArrowLeft: () => set(pos - step), ArrowDown: () => set(pos - step),
          ArrowRight: () => set(pos + step), ArrowUp: () => set(pos + step),
          PageDown: () => set(pos - 10), PageUp: () => set(pos + 10),
          Home: () => set(0), End: () => set(100)
        };
        if (actions[e.key]) { e.preventDefault(); actions[e.key](); }
      });
      set(50);
    });
  }

  /* ======================================================================
     CAROUSEL — crossfade, dots, arrows, swipe, autoplay (paused on
     hover/focus, off-screen, hidden tab, reduced motion)
     ====================================================================== */
  function initCarousel() {
    const car = $('.carousel');
    if (!car) return;
    const track = $('.carousel__track', car);
    const slides = $$('.carousel__slide', car);
    const dotsWrap = $('.carousel__dots', car);
    let index = 0;
    let timer = null;
    let inView = false;
    let paused = false;
    let userTook = false;

    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel__dot';
      b.addEventListener('click', () => { stopAuto(); go(i); });
      dotsWrap.append(b);
      return b;
    });

    const label = () => {
      slides.forEach((s, i) => s.setAttribute('aria-label', t('reviews.slide', { n: i + 1, total: slides.length })));
      dots.forEach((d, i) => d.setAttribute('aria-label', t('reviews.goto', { n: i + 1 })));
    };
    function go(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach((s, i) => {
        const on = i === index;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', String(!on));
        s.inert = !on;
      });
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
    }
    function startAuto() {
      if (timer || userTook || reduceMotion || !inView || paused || document.hidden) return;
      track.setAttribute('aria-live', 'off');
      timer = window.setInterval(() => go(index + 1), CONFIG.autoplayMs);
    }
    function pauseAuto() { window.clearInterval(timer); timer = null; }
    function stopAuto() { userTook = true; pauseAuto(); track.setAttribute('aria-live', 'polite'); }

    $('.carousel__prev', car).addEventListener('click', () => { stopAuto(); go(index - 1); });
    $('.carousel__next', car).addEventListener('click', () => { stopAuto(); go(index + 1); });

    // Swipe (direction-aware for RTL)
    let x0 = null;
    track.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    track.addEventListener('pointerup', (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) < 40) return;
      const forward = root.dir === 'rtl' ? dx > 0 : dx < 0;
      stopAuto(); go(index + (forward ? 1 : -1));
    });

    car.addEventListener('mouseenter', () => { paused = true; pauseAuto(); });
    car.addEventListener('mouseleave', () => { paused = false; startAuto(); });
    car.addEventListener('focusin', () => { paused = true; pauseAuto(); });
    car.addEventListener('focusout', () => { paused = false; startAuto(); });
    document.addEventListener('visibilitychange', () => (document.hidden ? pauseAuto() : startAuto()));
    const carIO = new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? startAuto() : pauseAuto(); }, { threshold: 0.4 });
    carIO.observe(car);

    document.addEventListener('langchange', label);
    label();
    go(0);
  }

  /* ======================================================================
     WHATSAPP + BOOKING FORM
     ====================================================================== */
  const waURL = (text) => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  const openWA = (url) => {
    // Note: passing 'noopener' makes window.open return null, so detach opener manually
    const w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (e) { /* cross-origin */ } }
    else window.location.href = url; // popup blocked → same tab
  };

  function initWhatsAppLinks() {
    const update = () => $$('.js-wa').forEach((a) => { a.href = waURL(t('wa.default')); });
    document.addEventListener('langchange', update);
    update();
  }

  function initBooking() {
    const form = $('#booking-form');
    if (!form) return;
    const status = $('.form__status', form);
    const date = $('#f-date', form);
    const select = $('#f-treatment', form);

    const todayISO = () => {
      const d = new Date();
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 10);
    };
    date.min = todayISO();

    const rules = {
      name: (v) => v.trim().length >= 2,
      phone: (v) => /^\+?[\d\s\-().]{7,20}$/.test(v.trim()) && (v.match(/\d/g) || []).length >= 7,
      treatment: (v) => v !== '',
      date: (v) => v !== '' && v >= todayISO()
    };
    const fields = Object.keys(rules).map((name) => form.elements[name]);

    const check = (field) => {
      const ok = rules[field.name](field.value);
      const wrap = field.closest('.field');
      wrap.classList.toggle('has-error', !ok);
      field.setAttribute('aria-invalid', String(!ok));
      $(`#err-${field.name}`).textContent = ok ? '' : t(`err.${field.name}`);
      return ok;
    };

    fields.forEach((f) => {
      f.addEventListener('blur', () => { if (f.value || f.closest('.field').classList.contains('has-error')) check(f); });
      f.addEventListener('input', () => { if (f.closest('.field').classList.contains('has-error')) check(f); });
      f.addEventListener('change', () => { if (f.closest('.field').classList.contains('has-error')) check(f); });
    });
    document.addEventListener('langchange', () => fields.forEach((f) => { if (f.closest('.field').classList.contains('has-error')) check(f); }));

    // Links such as /?treatment=facial#booking pre-select the dropdown
    const wanted = new URLSearchParams(location.search).get('treatment');
    if (wanted && Array.from(select.options).some((o) => o.value === wanted)) select.value = wanted;

    // Treatment cards pre-select the dropdown
    $$('[data-treatment]').forEach((a) => a.addEventListener('click', () => {
      select.value = a.dataset.treatment;
      const wrap = select.closest('.field');
      if (wrap.classList.contains('has-error')) check(select);
      wrap.classList.remove('is-highlight');
      void wrap.offsetWidth; // restart animation
      wrap.classList.add('is-highlight');
    }));

    const buildMessage = () => {
      const msg = form.elements.message.value.trim();
      return t('wa.form', {
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        treatment: select.options[select.selectedIndex].text,
        date: date.value,
        message: msg ? t('wa.msg') + msg : ''
      });
    };

    const sendViaWhatsApp = () => {
      const url = waURL(buildMessage());
      status.textContent = '';
      status.append(document.createTextNode(`${t('form.wa')} `));
      const link = document.createElement('a');
      link.href = url; link.target = '_blank'; link.rel = 'noopener'; link.textContent = t('form.waLink');
      status.append(link);
      openWA(url);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = fields.filter((f) => !check(f));
      if (invalid.length) { invalid[0].focus(); return; }
      if (form.elements.company.value) return; // honeypot = bot
      document.dispatchEvent(new CustomEvent('bydee:booking'));

      if (CONFIG.formMode === 'netlify') {
        try {
          const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(form)).toString()
          });
          if (!res.ok) throw new Error(String(res.status));
          status.textContent = t('form.sent');
          form.reset();
          date.min = todayISO();
          return;
        } catch (err) { /* fall through to WhatsApp */ }
      }
      sendViaWhatsApp();
    });
  }

  /* ======================================================================
     MAP — click-to-load facade
     ====================================================================== */
  function initResultsFilter() {
    const chips = $$('.chip');
    if (!chips.length) return;
    chips.forEach((chip) => chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => { const on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
      $$('[data-treatment-case]').forEach((fig) => { fig.hidden = f !== 'all' && fig.dataset.treatmentCase !== f; });
    }));
  }

  function initMap() {
    const btn = $('.js-map-load');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.map');
      const iframe = document.createElement('iframe');
      iframe.src = wrap.dataset.src;
      iframe.title = t('map.title');
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      wrap.append(iframe);
      wrap.classList.add('is-loaded');
      iframe.focus();
    });
  }

  /* ======================================================================
     MOBILE BAR — hide while the booking form itself is on screen
     ====================================================================== */
  function initMobileBar() {
    const bar = $('#mbar');
    const booking = $('#booking');
    if (!bar || !booking) return;
    const barIO = new IntersectionObserver(([e]) => bar.classList.toggle('is-hidden', e.isIntersecting), { threshold: 0.25 });
    barIO.observe(booking);
  }

  /* ======================================================================
     MISC — broken image fallback, footer year
     ====================================================================== */
  function initMisc() {
    $$('img:not([data-local])').forEach((img) => {
      const mark = () => img.classList.add('is-broken');
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) mark();
      img.addEventListener('error', mark, { once: true });
    });
    $$('.js-year').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  /* ---------- Boot ---------- */
  /* ======================================================================
     IMAGES: look for a local file in /assets (data-local = path without
     extension) trying several extensions; if none exists, fall back to the
     stock photo kept in data-fallback.
     ====================================================================== */
  const safe = (fn, fallback) => { try { return fn(); } catch (err) { console.error(err); return fallback; } };
  safe(initTheme);
  const onScrollHeader = safe(initHeaderNav, () => {});
  const onScrollHero = safe(initHero, () => {});
  safe(initReveal);
  safe(initCounters);
  safe(initBeforeAfter);
  safe(initResultsFilter);
  safe(initCarousel);
  safe(initWhatsAppLinks);
  safe(initBooking);
  safe(initMap);
  safe(initMobileBar);
  safe(initMisc);

  // One rAF-throttled scroll handler for everything scroll-driven
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScrollHeader(); onScrollHero(); ticking = false; });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  safe(initAnalytics);
})();

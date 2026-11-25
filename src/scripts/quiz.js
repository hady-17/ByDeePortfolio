/* Skin quiz: suggests a starting treatment. Purely client-side, nothing is sent or stored. */

// goal -> [first choice, second choice]
const BY_GOAL = {
  glow: ['skin-rejuvenation', 'signature-facial'],
  clean: ['signature-facial', 'skin-rejuvenation'],
  texture: ['laser-resurfacing', 'skin-rejuvenation'],
  lines: ['anti-wrinkle', 'skin-rejuvenation'],
  hair: ['laser-hair-removal', null]
};
// typical downtime: 0 none, 1 a day or two, 2 up to a week
const DOWNTIME = { 'signature-facial': 0, 'laser-hair-removal': 0, 'anti-wrinkle': 0, 'skin-rejuvenation': 1, 'laser-resurfacing': 2 };
const ALLOWED = { none: 0, short: 1, week: 2 };
const LASER = new Set(['laser-resurfacing', 'laser-hair-removal']);

export function suggest({ goal, downtime, pregnant, tan }) {
  if (pregnant === 'yes') return { main: null, alt: null, notes: ['preg'] };
  let [main, alt] = BY_GOAL[goal];
  const notes = [];
  const ok = (s) => s && DOWNTIME[s] <= ALLOWED[downtime];
  if (!ok(main)) {
    const original = main;
    main = ok(alt) ? alt : 'signature-facial';
    alt = original; // still worth discussing at the consultation
    notes.push('downtime');
  }
  if (tan === 'yes' && (LASER.has(main) || LASER.has(alt))) notes.push('tan');
  return { main, alt: alt && alt !== main ? alt : null, notes };
}

export function initQuiz() {
  const form = document.getElementById('quiz-form');
  const out = document.getElementById('quiz-result');
  if (!form || !out) return;
  const err = form.querySelector('.quiz__error');
  const all = (sel) => Array.from(out.querySelectorAll(sel));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!['goal', 'downtime', 'pregnant', 'tan'].every((k) => data[k])) { err.hidden = false; return; }
    err.hidden = true;

    const r = suggest(data);
    all('[data-note], [data-block], [data-result], [data-alt]').forEach((el) => { el.hidden = true; });
    r.notes.forEach((n) => { out.querySelector(`[data-note="${n}"]`).hidden = false; });
    if (r.main) {
      out.querySelector('[data-block="main"]').hidden = false;
      out.querySelector(`[data-result="${r.main}"]`).hidden = false;
    } else {
      out.querySelector('[data-block="consult"]').hidden = false;
    }
    if (r.alt) {
      out.querySelector('[data-block="alt"]').hidden = false;
      out.querySelector(`[data-alt="${r.alt}"]`).hidden = false;
    }
    form.hidden = true;
    out.hidden = false;
    out.focus();
    document.dispatchEvent(new CustomEvent('bydee:quiz', { detail: r }));
  });

  document.getElementById('quiz-restart')?.addEventListener('click', () => {
    form.reset();
    out.hidden = true;
    form.hidden = false;
    form.querySelector('input')?.focus();
  });
}

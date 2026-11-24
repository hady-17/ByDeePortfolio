// Prices and packages. Empty on purpose: nothing is shown until you fill these in.
// Key = treatment slug (signature-facial, skin-rejuvenation, laser-resurfacing,
// laser-hair-removal, anti-wrinkle). Amounts are in US dollars.

export interface Price {
  from: number;
  /** optional short note, e.g. "per session" */
  note?: { en: string; ar: string };
}
export interface Pack {
  treatment: string;
  name: { en: string; ar: string };
  price: number;
  includes: { en: string; ar: string };
}

export const prices: Record<string, Price> = {
  // 'signature-facial': { from: 40, note: { en: 'per session', ar: 'للجلسة' } },
};

export const packages: Pack[] = [
  // {
  //   treatment: 'laser-hair-removal',
  //   name: { en: 'Full legs, 6 sessions', ar: 'ساقان كاملتان، 6 جلسات' },
  //   price: 300,
  //   includes: { en: 'Six sessions, consultation included', ar: 'ست جلسات مع الاستشارة' }
  // }
];

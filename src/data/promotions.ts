// Offers, gift cards, referral programme and WhatsApp opt-in.
// Edited in the admin area (/admin/), stored in src/cms/promotions.json.
// Nothing appears on the site until it is filled in or switched on.
import data from '../cms/promotions.json';

export interface Bilingual { en: string; ar: string }
export interface Offer {
  title: Bilingual;
  text: Bilingual;
  /** treatment slug: the "Book" link preselects it */
  treatment?: string;
  /** last day of the offer, YYYY-MM-DD. Expired offers are hidden at the next build. */
  until?: string;
}

const dateOnly = (v?: string) => (v ? String(v).slice(0, 10) : undefined);

export const offers: Offer[] = ((data.offers ?? []) as Offer[])
  .filter((o) => o.title?.en || o.title?.ar)
  .map((o) => ({ ...o, until: dateOnly(o.until), treatment: o.treatment || undefined }));

/** Gift cards are ordered through WhatsApp (no payment on the website). */
export const giftCards: { amounts: number[]; note: Bilingual } = {
  amounts: ((data.giftCards?.amounts ?? []) as unknown[]).map(Number).filter((n) => Number.isFinite(n) && n > 0),
  note: { en: data.giftCards?.note?.en ?? '', ar: data.giftCards?.note?.ar ?? '' }
};

export const referral: { enabled: boolean; text: Bilingual } = {
  enabled: Boolean(data.referral?.enabled),
  text: { en: data.referral?.text?.en ?? '', ar: data.referral?.text?.ar ?? '' }
};

/** WhatsApp broadcasts only reach people who have saved the clinic number. */
export const broadcastOptIn: boolean = Boolean(data.broadcastOptIn);

// Offers, gift cards, referral programme and WhatsApp opt-in.
// Edited in the admin area (/admin/), stored in src/cms/offers.json, gift-cards.json, referral.json.
// Nothing appears on the site until it is filled in or switched on.
import offersData from '../cms/offers.json';
import giftData from '../cms/gift-cards.json';
import referralData from '../cms/referral.json';

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
const bi = (v?: Partial<Bilingual>): Bilingual => ({ en: v?.en ?? '', ar: v?.ar ?? '' });

export const offers: Offer[] = ((offersData.offers ?? []) as Offer[])
  .filter((o) => o.title?.en || o.title?.ar)
  .map((o) => ({ title: bi(o.title), text: bi(o.text), until: dateOnly(o.until), treatment: o.treatment || undefined }));

/** Gift cards are ordered through WhatsApp (no payment on the website). */
export const giftCards: { amounts: number[]; note: Bilingual } = {
  amounts: ((giftData.amounts ?? []) as unknown[]).map(Number).filter((n) => Number.isFinite(n) && n > 0),
  note: bi(giftData.note)
};

export const referral: { enabled: boolean; text: Bilingual } = {
  enabled: Boolean(referralData.enabled),
  text: bi(referralData.text)
};

/** WhatsApp broadcasts only reach people who have saved the clinic number. */
export const broadcastOptIn: boolean = Boolean(offersData.broadcastOptIn);

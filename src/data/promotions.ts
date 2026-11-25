// Offers, gift cards, referral programme and WhatsApp opt-in.
// Everything here is OFF / empty on purpose: nothing appears on the site until you fill it in.

export interface Offer {
  title: { en: string; ar: string };
  text: { en: string; ar: string };
  /** treatment slug: adds a "Book" link that preselects it */
  treatment?: string;
  /** last day of the offer, YYYY-MM-DD. Expired offers are hidden automatically. */
  until?: string;
}

export const offers: Offer[] = [
  // {
  //   title: { en: 'Summer-ready laser', ar: 'ليزر استعداداً للصيف' },
  //   text: { en: '20% off full-leg packages booked before 31 March.', ar: 'خصم 20% على باقات الساقين الكاملة عند الحجز قبل 31 آذار.' },
  //   treatment: 'laser-hair-removal',
  //   until: '2027-03-31'
  // }
];

/** Gift cards are sold through WhatsApp (no payment on the website). Leave amounts empty to hide. */
export const giftCards = {
  amounts: [] as number[], // e.g. [50, 100, 150]
  /** optional extra line, e.g. "Valid for 12 months on any treatment." */
  note: { en: '', ar: '' }
};

/** Referral programme. Set enabled to true and describe the reward to show it in the booking section. */
export const referral = {
  enabled: false,
  text: {
    en: '', // e.g. 'Refer a friend: you both get 10% off your next visit.'
    ar: ''
  }
};

/** WhatsApp broadcast opt-in link in the footer. Only turn on if you actually send a broadcast list.
    Note: WhatsApp broadcasts only reach people who have saved the clinic number. */
export const broadcastOptIn = false;

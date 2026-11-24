// Client reviews. Empty on purpose: the Reviews section and its nav links stay hidden
// until you add real reviews here. Only use reviews the client agreed to publish,
// and keep the wording exactly as they wrote it.

export interface Review {
  /** the client's name, or first name and initial, as they agreed */
  name: string;
  /** treatment slug */
  treatment: string;
  /** the review as written, in the language they wrote it */
  text: string;
  lang: 'en' | 'ar';
}

export const reviews: Review[] = [
  // { name: 'Rima H.', treatment: 'skin-rejuvenation', lang: 'en', text: '...' }
];

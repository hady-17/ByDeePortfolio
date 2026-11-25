// Client reviews. Edited in the admin area (/admin/), stored in src/cms/reviews.json.
// The Reviews section stays hidden until a review is added. Only use reviews the client
// agreed to publish, and keep the wording exactly as they wrote it.
import data from '../cms/reviews.json';

export interface Review {
  name: string;
  /** treatment slug */
  treatment: string;
  text: string;
  lang: 'en' | 'ar';
}

export const reviews: Review[] = ((data.reviews ?? []) as Review[]).filter((r) => r.name && r.text);

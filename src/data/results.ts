// Before / after cases. Edited in the admin area (/admin/), stored in src/cms/results.json.
// The Results section and its nav links stay hidden until a case with consent is added.
// Only add a case if the client gave written consent to publish the photos.
import data from '../cms/results.json';

export interface ResultCase {
  /** treatment slug, used by the filter buttons */
  treatment: string;
  sessions: number;
  caption: { en: string; ar: string };
  /** image paths, e.g. /src/assets/uploads/case-1-before.jpg */
  before: string;
  after: string;
  /** must be true. Cases without confirmed consent are skipped */
  consent: boolean;
}

export const results: ResultCase[] = ((data.results ?? []) as ResultCase[]).filter((r) => r.before && r.after && r.treatment);

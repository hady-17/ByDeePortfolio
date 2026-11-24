// Before / after cases. Empty on purpose: the Results section and its nav links stay hidden
// until you add real cases here.
//
// For each case, put two photos in src/assets/ (jpg, png, webp or avif):
//   <id>-before   and   <id>-after
// Only add a case if the client gave written consent to publish the photos.

export interface ResultCase {
  id: string;
  /** treatment slug, used by the filter buttons */
  treatment: string;
  sessions: number;
  caption: { en: string; ar: string };
  /** must be true. Cases without confirmed consent are skipped */
  consent: boolean;
}

export const results: ResultCase[] = [
  // {
  //   id: 'laser-01',
  //   treatment: 'laser-resurfacing',
  //   sessions: 2,
  //   caption: { en: 'Laser resurfacing', ar: 'ليزر تجديد البشرة' },
  //   consent: true
  // }
];

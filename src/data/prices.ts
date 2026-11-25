// Prices and packages. Edited in the admin area (/admin/), stored in src/cms/prices.json.
// Nothing is shown until prices are added. Amounts are in US dollars.
import data from '../cms/prices.json';

export interface Bilingual { en: string; ar: string }
export interface Price { from: number; note?: Bilingual }
export interface Pack { treatment: string; name: Bilingual; price: number; includes: Bilingual }

interface PriceRow { treatment: string; from: number | null; note?: Partial<Bilingual> }

const hasNote = (n?: Partial<Bilingual>) => Boolean(n && (n.en || n.ar));

/** treatment slug -> price */
export const prices: Record<string, Price> = Object.fromEntries(
  ((data.prices ?? []) as PriceRow[])
    .filter((p) => p.treatment && typeof p.from === 'number' && p.from > 0)
    .map((p) => [p.treatment, { from: p.from as number, ...(hasNote(p.note) ? { note: { en: p.note!.en ?? '', ar: p.note!.ar ?? p.note!.en ?? '' } } : {}) }])
);

export const packages: Pack[] = ((data.packages ?? []) as Pack[]).filter((p) => p.treatment && p.name?.en && typeof p.price === 'number');

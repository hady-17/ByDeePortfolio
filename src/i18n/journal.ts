import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './index';

export type Post = CollectionEntry<'journal'>;

/** Published posts for a language, newest first. */
export async function postsFor(lang: Lang): Promise<Post[]> {
  const all = await getCollection('journal', (p) => p.id.startsWith(`${lang}/`) && !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const slugOf = (p: Post) => p.id.split('/').slice(1).join('/');

/** Whether the same article exists (published) in the other language. */
export async function hasTranslation(lang: Lang, slug: string) {
  const other = lang === 'ar' ? 'en' : 'ar';
  return (await postsFor(other)).some((p) => slugOf(p) === slug);
}

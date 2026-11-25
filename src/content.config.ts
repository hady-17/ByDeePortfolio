import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Journal articles: src/content/journal/<en|ar>/<slug>.md
// Use the same file name in both folders for the two language versions of one article.
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** treatment slug this article relates to (adds a link to that treatment page) */
    treatment: z.string().optional(),
    /** true hides the article from the site */
    draft: z.boolean().default(false)
  })
});

export const collections = { journal };

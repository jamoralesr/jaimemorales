import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notas' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    readingTime: z.number().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notas };

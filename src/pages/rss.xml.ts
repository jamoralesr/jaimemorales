import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notas = await getCollection('notas', ({ data }) => !data.draft);

  return rss({
    title: 'Jaime Morales',
    description: 'Notas sobre IA, tecnología y humanidad.',
    site: context.site!,
    items: notas
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.excerpt,
        link: `/notas/${post.id}/`,
      })),
  });
}

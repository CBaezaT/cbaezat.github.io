import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    description: z.string(),
    // Cita académica completa en formato APA (opcional mientras no exista)
    cita: z.string().optional(),
    // Enlace externo: DOI, PDF, página de la revista…
    url: z.string().url().optional(),
    urlLabel: z.string().default('DOI'),
  }),
});

export const collections = { blog, publications };

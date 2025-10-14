import z from 'zod';

export const CatFactsSchema = z.object({
  fact: z.string(),
  length: z.number(),
});

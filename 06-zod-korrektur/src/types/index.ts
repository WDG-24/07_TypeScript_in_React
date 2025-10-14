import type z from 'zod';
import type { CatFactsSchema } from '../schemas/catFacts';
import type { ProductSchema } from '../schemas/products';

export type CatFact = z.infer<typeof CatFactsSchema>;

export type Product = z.infer<typeof ProductSchema>;

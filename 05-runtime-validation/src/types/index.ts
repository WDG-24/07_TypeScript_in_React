import type z from 'zod';
import type { IceCreamOrderSchema } from '../schemas/iceCreamSchema';

export type IceCreamOrderType = z.infer<typeof IceCreamOrderSchema>;

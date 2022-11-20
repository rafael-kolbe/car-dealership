import { z } from 'zod';

export const SaleData = z
    .object({
        sellerName: z.string(),
        carModel: z.string(),
        soldFor: z.number().int(),
    })
    .strict();

export const SaleId = z.string();

import { z } from 'zod';

export const SellerData = z
    .object({
        name: z.string(),
    })
    .strict();

export const SellerId = z.string();

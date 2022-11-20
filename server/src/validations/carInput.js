import { z } from 'zod';

export const CarData = z
    .object({
        carModel: z.string(),
        price: z.number().int(),
    })
    .strict();

export const CarPrice = z
    .object({
        price: z.number().int(),
    })
    .strict();

export const CarId = z.string();

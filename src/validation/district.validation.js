import { z } from 'zod';
export const districtValidate = z
    .object({
        name: z
            .string()
            .min(2, 'Name too short')
            .max(50, 'Name too long')
            .trim()
            .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
    })
    .strict();

export const districtUpdate = z
    .object({
        name: z
            .string()
            .min(2, 'Name too short')
            .max(50, 'Name too long')
            .trim()
            .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces')
            .optional(),
    })
    .strict();

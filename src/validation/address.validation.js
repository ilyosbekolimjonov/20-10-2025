import { z } from 'zod';
export const addressValidate = z
    .object({
        name: z
            .string()
            .min(2, 'Name too short')
            .max(50, 'Name too long')
            .trim()
            .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
        customer_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Customer ID'),
        district_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid District ID'),
        address: z
            .string()
            .min(2, 'Address too short')
            .max(80, 'Address too long')
            .trim(),
        location: z
            .string()
            .min(2, 'Location too short')
            .max(80, 'Location too long')
            .trim(),
    })
    .strict();

export const addressUpdate = z
    .object({
        name: z
            .string()
            .min(2, 'Name too short')
            .max(50, 'Name too long')
            .trim()
            .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces')
            .optional(),
        customer_id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Customer ID')
            .optional(),
        district_id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid District ID')
            .optional(),
        address: z
            .string()
            .min(2, 'Address too short')
            .max(80, 'Address too long')
            .trim()
            .optional(),
        location: z
            .string()
            .min(2, 'Location too short')
            .max(80, 'Location too long')
            .trim()
            .optional(),
    })
    .strict();

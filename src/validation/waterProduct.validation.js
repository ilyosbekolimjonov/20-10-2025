import { z } from 'zod';

export const waterProductValidate = z.object({
    name: z
        .string()
        .min(2, 'Name too short')
        .max(50, 'Name too long')
        .trim()
        .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
    price: z.number().positive('Must be greater than 0'),
    volume_liters: z.number().positive('Must be greater than 0'),
});

export const waterProductUpdate = z.object({
    name: z
        .string()
        .min(2, 'Name too short')
        .max(50, 'Name too long')
        .trim()
        .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces')
        .optional(),
    price: z.number().positive('Must be greater than 0').optional(),
    volume_liters: z.number().positive('Must be greater than 0').optional(),
});

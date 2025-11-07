import { z } from 'zod';
export const paymentValidate = z
    .object({
        order_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID'),
        payment_date: z
            .date()
            .min(new Date('2020-01-01'), 'Too early')
            .max(new Date(), 'Cannot be in future')
            .optional(),
        amount: z.number().positive('Must be greater than 0').min(0.01),
        method: z.enum(['cash', 'card']),
    })
    .strict();

export const paymentUpdate = z
    .object({
        order_id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID')
            .optional(),
        payment_date: z
            .date()
            .min(new Date('2020-01-01'), 'Too early')
            .max(new Date(), 'Cannot be in future')
            .optional(),
        amount: z
            .number()
            .positive('Must be greater than 0')
            .min(0.01)
            .optional()
            .optional(),
        method: z.enum(['cash', 'card']).optional(),
    })
    .strict();

import { z } from 'zod';
export const orderItemValidate = z
    .object({
        order_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID'),
        product_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID'),
        quantity: z.number().positive('Must be greater than 0'),
        total_price: z
            .number()
            .positive('Must be greater than 0')
            .min(0.01)
            .optional(),
    })
    .strict();

export const orderItemUpdate = z
    .object({
        order_id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID')
            .optional(),
        product_id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID')
            .optional(),
        quantity: z.number().positive('Must be greater than 0').optional(),
        total_price: z
            .number()
            .positive('Must be greater than 0')
            .min(0.01)
            .optional(),
    })
    .strict();

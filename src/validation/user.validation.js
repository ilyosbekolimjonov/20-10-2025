import { z } from 'zod'

export const loginValidate = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z
        .string()
        .min(8, `TOO SHORT PASSWORD`)
        .max(30, `TOO LONG PASSWORD`),
})

export const customerValidate = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z
        .string()
        .min(8, `TOO SHORT PASSWORD`)
        .max(30, `TOO LONG PASSWORD`)
        .trim(),
    name: z
        .string()
        .min(2, 'Name too short')
        .max(50, 'Name too long')
        .trim()
        .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
    phone: z.string().regex(/^\+\d{10,15}$/, 'Invalid phone number'),
    role: z.enum(['customer', 'deliveryStaff', 'admin']).optional(),
})

export const customerUpdate = z.object({
    name: z
        .string()
        .min(2, 'Name too short')
        .max(50, 'Name too long')
        .trim()
        .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces')
        .optional(),
    phone: z
        .string()
        .regex(/^\+\d{10,15}$/, 'Invalid phone number')
        .optional(),
    email: z.string().email().optional(),
    password: z
        .string()
        .min(8, `TOO SHORT FOR A PASSWORD`)
        .max(30, `TOO LONG FOR A PASSWORD`)
        .optional(),
})

export const adminUpdateUserValidate = customerUpdate.extend({
    role: z.enum(['customer', 'deliveryStaff', 'admin']).optional(),
})

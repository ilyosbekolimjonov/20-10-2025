import { z } from 'zod';

// CREATE uchun validatsiya
export const deliveryStaffValidate = z
    .object({
        user_id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format (must be ObjectId)'),
        vehicle_number: z
            .string()
            .min(3, 'Vehicle number too short')
            .max(10, 'Vehicle number too long')
            .trim(),
        district_id: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                'Invalid district ID format (must be ObjectId)',
            ),
    })
    .strict();

// UPDATE uchun validatsiya
export const deliveryStaffUpdate = z
    .object({
        name: z
            .string()
            .min(2, 'Name too short')
            .max(50, 'Name too long')
            .trim()
            .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces')
            .optional(),
        phone: z
            .string()
            .regex(/^\+\d{10,15}$/, 'Invalid phone number format (+998901234567)')
            .optional(),
        vehicle_number: z
            .string()
            .min(3, 'Vehicle number too short')
            .max(10, 'Vehicle number too long')
            .trim()
            .optional(),
        district_id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid district ID format')
            .optional(),
    })
    .strict();

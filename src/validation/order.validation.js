import { z } from 'zod';
export const orderValidate = z
	.object({
		customer_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid customer ID'),
		delivery_staff_id: z
			.string()
			.regex(/^[0-9a-fA-F]{24}$/, 'Invalid delivery staff ID'),
		order_date: z
			.date()
			.min(new Date('2020-01-01'), 'Too early')
			.max(new Date(), 'Cannot be in future')
			.optional(),
		status: z.enum(['pending', 'ordered', 'cancelled']),
	})
	.strict();

export const orderUpdate = z
	.object({
		customer_id: z
			.string()
			.regex(/^[0-9a-fA-F]{24}$/, 'Invalid customer ID')
			.optional(),
		delivery_staff_id: z
			.string()
			.regex(/^[0-9a-fA-F]{24}$/, 'Invalid delivery staff ID')
			.optional(),
		order_date: z
			.date()
			.min(new Date('2020-01-01'), 'Too early')
			.max(new Date(), 'Cannot be in future')
			.optional(),
		status: z.enum(['pending', 'ordered', 'cancelled']).optional(),
	})
	.strict();

import { z } from 'zod';

export const createInvoiceSchema = z.object({
	amount: z
		.number('Entrada inválida: esparava-se um número')
		.positive('O valor deve ser maior do que zero'),
	status: z.enum(['PENDING', 'PAID']),
	date: z.coerce.date('Data inválida'),
	customerId: z
		.number('Entrada inválida: esparava-se um número')
		.positive('O valor deve ser maior do que zero')
});

export const updateInvoiceSchema = createInvoiceSchema.partial();

export type createInvoice = z.infer<typeof createInvoiceSchema>;
export type updateInvoice = z.infer<typeof updateInvoiceSchema>;

import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import { customers } from '../mocks/customer.mock.ts';
import type {
	createInvoice,
	updateInvoice
} from '../schemas/invoice.schema.ts';

export async function findAllInvoices(page: number) {
	const invoices = await prisma.invoices.findMany({
		include: { customer: true },
		orderBy: { date: 'desc' },
		skip: (page - 1) * 10,
		take: 10
	});

	return invoices;
}

export async function findInvoiceById(id: number) {
	const invoice = prisma.invoices.findUnique({
		where: { id },
		include: { customer: true }
	});

	if (!invoice) {
		throw new NotFoundError('Fatura com id ${id} não encontrada');
	}

	return invoice;
}

export async function insertInvoice({
	customerId,
	amount,
	status,
	date
}: createInvoice) {
	const invoice = await prisma.invoices.create({
		data: {
			amount,
			status,
			date,
			customer: { connect: { id: customerId } }
		},
		include: { customer: true }
	});
}

export async function modifyInvoice(
	id: number,
	{ customerId, amount, status, date }: updateInvoice
) {
	await findInvoiceById(id);

	const invoice = prisma.invoices.update({
		where: { id },
		data: { customerId, amount, status, date },
		include: { customer: true }
	});
	return invoice;
}

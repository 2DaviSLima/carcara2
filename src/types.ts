export type Customer = {
	id: number;
	name: string;
	email: string;
	status: boolean;
	imageUrl: string | null;
};

export type ValidationFieldError = {
	field: string;
	message: string;
};

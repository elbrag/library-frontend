export interface BookProps {
	id: number;
	title: string;
	author: string;
	dateOfPublish: string;
	coverImage: string;
}

export type BookWithoutId = Omit<BookProps, "id">;

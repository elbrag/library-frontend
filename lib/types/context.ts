import { BookProps, BookWithoutId } from "./book";

export interface BooksContextType {
	currentBooks: BookProps[];
	fetchBooks: () => Promise<void>;
	addBook: (
		book: BookWithoutId
	) => Promise<
		| number
		| { error: string; errors?: Array<{ path: string; message: string }> }
	>;
	deleteBook: (
		id: number
	) => Promise<
		| number
		| { error: string; errors?: Array<{ path: string; message: string }> }
	>;
	editBook: (
		id: number,
		updatedBook: BookWithoutId
	) => Promise<
		| number
		| { error: string; errors?: Array<{ path: string; message: string }> }
	>;
	fetchMade: boolean;
}

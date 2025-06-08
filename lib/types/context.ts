import { BookProps, BookWithoutId } from "./book";

export interface BooksContextType {
	currentBooks: BookProps[];
	fetchBooks: () => Promise<number | { error: string }>;
	addBook: (book: BookWithoutId) => Promise<number | { error: string }>;
	deleteBook: (id: number) => Promise<number | { error: string }>;
	editBook: (
		id: number,
		updatedBook: BookWithoutId
	) => Promise<number | { error: string }>;
	fetchMade: boolean;
}

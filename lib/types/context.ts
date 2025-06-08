import { BookProps, BookWithoutId } from "./book";

export interface BooksContextType {
	currentBooks: BookProps[];
	fetchBooks: () => Promise<void>;
	addBook: (book: BookWithoutId) => Promise<void>;
	deleteBook: (id: number) => Promise<void>;
	editBook: (id: number, updatedBook: BookWithoutId) => Promise<void>;
	fetchMade: boolean;
}

import { BookProps } from "./book";

export interface BooksContextType {
	currentBooks: BookProps[];
	fetchBooks: () => Promise<void>;
	addBook: (book: Omit<BookProps, "id">) => Promise<void>;
	deleteBook: (id: number) => Promise<void>;
	editBook: (id: number, updatedBook: BookProps) => Promise<void>;
}

"use client";
import { BookProps } from "@/lib/types/book";
import { BooksContextType } from "@/lib/types/context";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export const BookContext = createContext<BooksContextType>({
	currentBooks: [],
	fetchBooks: async () => {
		console.warn("No BookContext when trying to run fetchBooks");
	},
	addBook: async () => {
		console.warn("No BookContext when trying to run addBook");
	},
	deleteBook: async () => {
		console.warn("No BookContext when trying to run deleteBook");
	},
	editBook: async () => {
		console.warn("No BookContext when trying to run editBook");
	},
	fetchMade: false,
});

export const BookContextProvider = ({ children }: { children: ReactNode }) => {
	const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books`;
	const [currentBooks, setCurrentBooks] = useState<BookProps[]>([]);
	const [fetchMade, setFetchMade] = useState(false);

	useEffect(() => {
		if (!fetchMade) {
			fetchBooks();
			setFetchMade(true);
		}
	}, [currentBooks.length, fetchMade]);

	/**
	 * Fetch books / GET
	 */
	const fetchBooks = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
			if (!response.ok) {
				throw new Error("Failed to fetch books");
			}
			const data = await response.json();
			setCurrentBooks(data);
		} catch (error) {
			console.error("Error fetching books:", error);
		}
	};

	/**
	 * Add book / POST
	 */
	const addBook = async (newBook: Omit<BookProps, "id">) => {
		try {
			const response = await fetch(baseApiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBook),
			});

			if (!response.ok) {
				throw new Error("Failed to add book");
			}

			const addedBook = await response.json();
			setCurrentBooks([...currentBooks, addedBook]);
		} catch (error) {
			console.error("Error adding book:", error);
		}
	};

	/**
	 * Delete book / DELETE
	 */
	const deleteBook = async (id: number) => {
		try {
			const response = await fetch(`${baseApiUrl}/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete book");
			}

			setCurrentBooks(currentBooks.filter((book) => book.id !== id));
		} catch (error) {
			console.error("Error deleting book:", error);
		}
	};

	/**
	 * Edit book / PUT
	 */
	const editBook = async (id: number, updatedBook: BookProps) => {
		try {
			const response = await fetch(`${baseApiUrl}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedBook),
			});

			if (!response.ok) {
				throw new Error("Failed to edit book");
			}

			const editedBook = await response.json();
			setCurrentBooks(
				currentBooks.map((book) => (book.id === id ? editedBook : book))
			);
		} catch (error) {
			console.error("Error editing book:", error);
		}
	};

	return (
		<BookContext.Provider
			value={{
				currentBooks,
				fetchBooks,
				addBook,
				deleteBook,
				editBook,
				fetchMade,
			}}
		>
			{children}
		</BookContext.Provider>
	);
};

export const useBooks = () => {
	const context = useContext(BookContext);
	if (context === undefined) {
		throw new Error("useBooks must be used within a BooksProvider");
	}
	return context;
};

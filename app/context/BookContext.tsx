"use client";
import { BookProps, BookWithoutId } from "@/lib/types/book";
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
		return 102;
	},
	addBook: async () => {
		return 102;
	},
	deleteBook: async () => {
		return 102;
	},
	editBook: async () => {
		return 102;
	},
	fetchMade: false,
});

export const BookContextProvider = ({ children }: { children: ReactNode }) => {
	const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books`;
	const fallbackErrorMessage = "An unknown error occurred";

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
				const errorData = await response
					.json()
					.catch(() => ({ message: fallbackErrorMessage }));
				throw new Error(errorData.message || "Failed to fetch books");
			}

			const data = await response.json();
			setCurrentBooks(data);
			return response.status;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { error: error.message };
			}
			return { error: fallbackErrorMessage };
		}
	};

	/**
	 * Add book / POST
	 */
	const addBook = async (newBook: BookWithoutId) => {
		try {
			const response = await fetch(baseApiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBook),
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: fallbackErrorMessage }));
				throw new Error(errorData.message || "Failed to add book");
			}

			return response.status;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { error: error.message };
			}
			return { error: fallbackErrorMessage };
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
				const errorData = await response
					.json()
					.catch(() => ({ message: fallbackErrorMessage }));
				throw new Error(errorData.message || "Failed to delete book");
			}

			return response.status;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { error: error.message };
			}
			return { error: fallbackErrorMessage };
		}
	};

	/**
	 * Edit book / PUT
	 */
	const editBook = async (id: number, updatedBook: BookWithoutId) => {
		try {
			const response = await fetch(`${baseApiUrl}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedBook),
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: fallbackErrorMessage }));
				throw new Error(errorData.message || "Failed to edit book");
			}

			return response.status;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { error: error.message };
			}
			return { error: fallbackErrorMessage };
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

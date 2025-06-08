"use client";
import { apiRequest } from "@/lib/helpers/api";
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
	fetchBooks: async () => {},
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

	const [currentBooks, setCurrentBooks] = useState<BookProps[]>([]);
	const [fetchMade, setFetchMade] = useState(false);

	useEffect(() => {
		if (!fetchMade) {
			fetchBooks();
			setFetchMade(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentBooks.length, fetchMade]);

	/**
	 * Fetch books / GET
	 */
	const fetchBooks = async () => {
		const result = await apiRequest(
			baseApiUrl,
			"GET",
			undefined,
			"Failed to fetch books"
		);

		if (typeof result === "number") {
			const booksData = await fetch(baseApiUrl)
				.then((response) => response.json())
				.catch(() => []);
			setCurrentBooks(booksData);
		} else {
			console.error("Error fetching books:", result.error);
		}
	};

	/**
	 * Add book / POST
	 */
	const addBook = async (newBook: BookWithoutId) => {
		return apiRequest(baseApiUrl, "POST", newBook, "Failed to add book");
	};

	/**
	 * Delete book / DELETE
	 */
	const deleteBook = async (id: number) => {
		return apiRequest(
			`${baseApiUrl}/${id}`,
			"DELETE",
			undefined,
			"Failed to delete book"
		);
	};

	/**
	 * Edit book / PUT
	 */
	const editBook = async (id: number, updatedBook: BookWithoutId) => {
		return apiRequest(
			`${baseApiUrl}/${id}`,
			"PUT",
			updatedBook,
			"Failed to edit book"
		);
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

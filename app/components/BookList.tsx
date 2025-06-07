"use client";
import { BookProps } from "@/lib/types/book";
import React from "react";
import Book from "./Book";

const BookList: React.FC<{ books: BookProps[] }> = ({ books }) => {
	return (
		<div>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
				{books.map((book) => (
					<li key={book.id}>
						<Book {...book} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default BookList;

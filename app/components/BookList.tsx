"use client";
import { BookProps } from "@/lib/types/book";
import React from "react";
import Book from "./Book";

const BookList: React.FC<{ books: BookProps[] }> = ({ books }) => {
	return (
		<div className="py-6 md:py-10">
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-4 md:gap-6">
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

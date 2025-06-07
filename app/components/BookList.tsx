"use client";
import { BookProps } from "@/lib/types/book";
import React from "react";
import Book from "./Book";

const BookList: React.FC<{ books: BookProps[] }> = ({ books }) => {
	return (
		<div>
			<ul>
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

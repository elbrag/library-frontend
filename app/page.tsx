"use client";
import { useContext } from "react";
import Heading from "./components/Heading";
import { BookContext } from "./context/BookContext";
import BookList from "./components/BookList";

export default function Home() {
	const { currentBooks } = useContext(BookContext);

	return (
		<div>
			<div className="text-center">
				<Heading tag="h1">Welcome to The Classics Library</Heading>
				<p className="md:text-lg mb-6 md:mb-10">The library is open</p>
			</div>
			<div>
				{!!currentBooks?.length ? (
					<BookList books={currentBooks} />
				) : (
					<Heading tag="h2">There are no books in the library</Heading>
				)}
			</div>
		</div>
	);
}

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
				<p className="md:text-lg">The library is open</p>
			</div>
			<div>{!!currentBooks?.length && <BookList books={currentBooks} />}</div>
		</div>
	);
}

// {
//   "id": 1006,
//   "title": "Brott och straff",
//   "author": "Fjodor Dostojevskij",
//   "dateOfPublish": "2024-09-20T00:00:00.000Z",
//   "coverImage": "https://image.bokus.com/images/9789100808020_383x_brott-och-straff_storpocket"
// }

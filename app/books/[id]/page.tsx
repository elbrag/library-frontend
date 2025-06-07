"use client";
import { useContext } from "react";
import Heading from "../../components/Heading";
import { BookContext } from "../../context/BookContext";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/helpers/date";

const BookSinglePage: React.FC = () => {
	const { id } = useParams();
	const idNumber = typeof id === "string" ? parseInt(id, 10) : null;
	const { currentBooks, fetchMade } = useContext(BookContext);
	const book = currentBooks.find((book) => book.id === idNumber);

	if (!fetchMade) {
		return <div>Fetching book...</div>;
	}
	if (!book) {
		return <div>Book not found</div>;
	}

	return (
		<div>
			<Heading tag="h1">{book.title}</Heading>
			<p>by {book.author}</p>
			<p className="text-sm">Published {formatDate(book.dateOfPublish)}</p>
		</div>
	);
};

export default BookSinglePage;

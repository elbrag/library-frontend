"use client";
import { useContext, useState } from "react";
import Heading from "../../components/Heading";
import { BookContext } from "../../context/BookContext";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/helpers/date";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

const BookSinglePage: React.FC = () => {
	const { id } = useParams();
	const router = useRouter();
	const idNumber = typeof id === "string" ? parseInt(id, 10) : null;
	const { currentBooks, fetchMade, deleteBook } = useContext(BookContext);
	const book = currentBooks.find((book) => book.id === idNumber);
	const [deletionDone, setDeletionDone] = useState(false);

	if (deletionDone) return <div>Book successfully deleted!</div>;
	if (!fetchMade) {
		return <div>Fetching book...</div>;
	}
	if (!book) {
		return <div>Book not found</div>;
	}

	const onDeleteBook = async () => {
		const confirmationMessage = `Are you sure you want to delete the book titled "${book.title}"? This action cannot be undone.`;

		if (window.confirm(confirmationMessage)) {
			await deleteBook(book.id);
			setDeletionDone(true);
			setTimeout(() => {
				router.push("/");
				setDeletionDone(false);
			}, 3000);
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 md:gap-8">
			<Image
				className="w-full max-w-32"
				width={100}
				height={140}
				src={book.coverImage}
				alt={`The cover of ${book.title}`}
			/>
			<div>
				<Heading tag="h1">{book.title}</Heading>
				<p>by {book.author}</p>
				<p className="text-sm mt-4">
					Published {formatDate(book.dateOfPublish)}
				</p>
			</div>
			<div className="flex gap-4">
				<Button label="Edit book" onClick={() => {}} />
				<Button label="Delete book" color="red" onClick={onDeleteBook} />
			</div>
		</div>
	);
};

export default BookSinglePage;

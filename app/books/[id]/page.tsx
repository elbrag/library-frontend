"use client";
import { ChangeEvent, useContext, useState } from "react";
import Heading from "../../components/Heading";
import { BookContext } from "../../context/BookContext";
import { useParams } from "next/navigation";
import { formatDateFromISO, formatDateToISO } from "@/lib/helpers/date";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import Form from "@/app/components/Form";
import { getFormData } from "@/lib/helpers/formData";
import Input from "@/app/components/Input";
import { BookProps } from "@/lib/types/book";

const BookSinglePage: React.FC = () => {
	const { id } = useParams();
	const router = useRouter();
	const idNumber = typeof id === "string" ? parseInt(id, 10) : null;
	const { currentBooks, fetchMade, deleteBook, editBook } =
		useContext(BookContext);
	const book = currentBooks.find((book) => book.id === idNumber);
	const [deletionDone, setDeletionDone] = useState(false);
	const [showEditingMode, setShowEditingMode] = useState(false);
	const formData = getFormData(book);
	const [currentFormData, setCurrentFormData] = useState(formData);
	const [editDone, setEditDone] = useState(false);

	if (deletionDone)
		return <Heading tag="h2">Book successfully deleted!</Heading>;
	if (editDone) return <Heading tag="h2">Book successfully edited!</Heading>;

	if (!fetchMade) {
		return <div>Fetching book...</div>;
	}
	if (!book) {
		return <div>Book not found</div>;
	}

	/**
	 * On Delete Book
	 */
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

	/**
	 * On Input Change
	 */
	const onInputChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
		const newFormData = currentFormData.map((dataObj) => {
			if (dataObj.id === id) {
				return { ...dataObj, value: event.target.value };
			}
			return dataObj;
		});
		setCurrentFormData(newFormData);
	};

	/**
	 * On Save Edits
	 */
	const onSaveEdits = async () => {
		// TODO: Make dry
		const propToFormDataMap: Record<string, keyof Omit<BookProps, "id">> = {
			title: "title",
			author: "author",
			dateOfPublish: "dateOfPublish",
			coverImage: "coverImage",
		};

		const updatedBook: Omit<BookProps, "id"> = currentFormData.reduce(
			(acc, data) => {
				const propKey = propToFormDataMap[data.id];
				if (propKey) {
					if (propKey === "dateOfPublish")
						acc[propKey] = formatDateToISO(data.value);
					else acc[propKey] = data.value;
				}
				return acc;
			},
			{} as Omit<BookProps, "id">
		);
		console.log(updatedBook);
		const result = await editBook(book.id, updatedBook);
		console.log(result);
		setEditDone(true);
		setTimeout(() => {
			setEditDone(false);
		}, 3000);
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
					Published {formatDateFromISO(book.dateOfPublish)}
				</p>
			</div>
			{showEditingMode ? (
				<div>
					<Form>
						{currentFormData.map((data) => (
							<Input
								key={data.id}
								label={data.label}
								id={data.id}
								value={data.value}
								type={data.type}
								onChange={(event) => onInputChange(data.id, event)}
							/>
						))}
					</Form>
					<div className="flex gap-4 mt-4 md:mt-6">
						<Button
							label="Cancel editing"
							onClick={() => setShowEditingMode(false)}
						/>
						<Button label="Save edits" onClick={onSaveEdits} />
					</div>
				</div>
			) : (
				<div className="flex gap-4">
					<Button label="Edit book" onClick={() => setShowEditingMode(true)} />
					<Button label="Delete book" color="red" onClick={onDeleteBook} />
				</div>
			)}
		</div>
	);
};

export default BookSinglePage;

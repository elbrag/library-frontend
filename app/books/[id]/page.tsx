"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { BookContext } from "../../context/BookContext";
import { useParams } from "next/navigation";
import { formatDateFromISO } from "@/lib/helpers/date";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import Form from "@/app/components/Form";
import { getFormData, makeBookFromFormData } from "@/lib/helpers/formData";
import Input from "@/app/components/Input";
import { FormDataObjectProps, FormError } from "@/lib/types/form";
import { checkIfStatusIsOk } from "@/lib/helpers/api";
import Error from "@/app/components/Error";

const BookSinglePage: React.FC = () => {
	const router = useRouter();

	// Find book by id
	const { id } = useParams();
	const idNumber = typeof id === "string" ? parseInt(id, 10) : null;
	const { currentBooks, fetchMade, deleteBook, editBook, fetchBooks } =
		useContext(BookContext);
	const book = currentBooks.find((book) => book.id === idNumber);

	// UI states
	const [deletionLoading, setDeletionLoading] = useState(false);
	const [editingLoading, setEditingLoading] = useState(false);
	const [deletionDone, setDeletionDone] = useState(false);
	const [showEditingMode, setShowEditingMode] = useState(false);
	const [editDone, setEditDone] = useState(false);
	const [errors, setErrors] = useState<FormError[]>([]);
	const [generalError, setGeneralError] = useState<string>();

	// Editing form
	const formData = getFormData(book);
	const [currentFormData, setCurrentFormData] =
		useState<FormDataObjectProps[]>(formData);

	// Keep formData up to date if currentBooks is updated
	useEffect(() => {
		if (currentBooks.length) {
			const formData = getFormData(book);
			setCurrentFormData(formData);
		}
	}, [book, currentBooks]);

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
			setGeneralError("");
			setErrors([]);
			setDeletionLoading(true);
			const result = await deleteBook(book.id);

			if (typeof result === "number") {
				if (checkIfStatusIsOk(result)) {
					setDeletionDone(true);
					await fetchBooks();
					setTimeout(() => {
						setDeletionDone(false);
						setDeletionLoading(false);
						router.push("/");
					}, 3000);
				}
			} else {
				if (result.hasOwnProperty("error")) {
					console.error("Error deleting book:", result.error);
					setGeneralError(result.error);
				}
				if (result.errors?.length) setErrors(result.errors);
				setDeletionLoading(false);
			}
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
		setGeneralError("");
		setErrors([]);
		setEditingLoading(true);

		const updatedBook = makeBookFromFormData(currentFormData);
		const result = await editBook(book.id, updatedBook);

		if (typeof result === "number") {
			if (checkIfStatusIsOk(result)) {
				setEditDone(true);
				await fetchBooks();
				setTimeout(() => {
					setEditDone(false);
					setEditingLoading(false);
				}, 3000);
			}
		} else {
			if (result.hasOwnProperty("error")) {
				console.error("Error editing book:", result.error);
				setGeneralError(result.error);
			}
			if (result.errors?.length) setErrors(result.errors);
			setEditingLoading(false);
		}
	};

	/**
	 * Get errors by input id
	 */
	const getErrorsByInputId = (id: string) => {
		return errors.filter((error) => error.path === id);
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
							<div className="w-full" key={data.id}>
								<Input
									label={data.label}
									id={data.id}
									value={data.value}
									type={data.type}
									onChange={(event) => onInputChange(data.id, event)}
								/>
								{!!getErrorsByInputId(data.id).length &&
									getErrorsByInputId(data.id).map((err) => (
										<div key={err.path} className="my-2">
											<Error errorText={`Error: ${err.message}`} />
										</div>
									))}
							</div>
						))}
					</Form>
					{!!generalError && (
						<div className="mt-4 w-full">
							<Error errorText={`Error: ${generalError}`} />
						</div>
					)}
					<div className="flex gap-4 mt-4 md:mt-6">
						<Button
							label="Cancel editing"
							onClick={() => setShowEditingMode(false)}
						/>
						<Button
							label={editingLoading ? "Saving edits…" : "Save edits"}
							onClick={onSaveEdits}
						/>
					</div>
				</div>
			) : (
				<div className="flex gap-4">
					<Button label="Edit book" onClick={() => setShowEditingMode(true)} />
					<Button
						label={deletionLoading ? "Deleting book…" : "Delete book"}
						color="red"
						onClick={onDeleteBook}
					/>
				</div>
			)}
		</div>
	);
};

export default BookSinglePage;

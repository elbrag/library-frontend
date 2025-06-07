"use client";
import { FormDataObjectProps } from "@/lib/types/form";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { ChangeEvent, useContext, useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import { BookContext } from "../context/BookContext";
import { BookProps } from "@/lib/types/book";
import { getFormData } from "@/lib/helpers/formData";
import { formatDateToISO } from "@/lib/helpers/date";

const AddPage: React.FC = () => {
	const { addBook } = useContext(BookContext);
	const formData = getFormData();
	const [currentFormData, setCurrentFormData] = useState(formData);
	const [success, setSuccess] = useState(false);

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
	 * On Submit
	 */
	const onSubmit = async () => {
		const propToFormDataMap: Record<string, keyof Omit<BookProps, "id">> = {
			title: "title",
			author: "author",
			dateOfPublish: "dateOfPublish",
			coverImage: "coverImage",
		};

		const book: Omit<BookProps, "id"> = currentFormData.reduce((acc, data) => {
			const propKey = propToFormDataMap[data.id];
			if (propKey) {
				if (propKey === "dateOfPublish")
					acc[propKey] = formatDateToISO(data.value);
				else acc[propKey] = data.value;
			}
			return acc;
		}, {} as Omit<BookProps, "id">);

		const result = await addBook(book);
		console.log(result);
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
		}, 5000);
	};

	return (
		<>
			<div className="mb-6 md:mb-10">
				<Heading tag="h1">Add book</Heading>
			</div>
			{success ? (
				<div className="py-4 md:py-10">
					<Heading tag="h2">Book was successfully added!</Heading>
				</div>
			) : (
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
					<div className="mt-4 md:mt-6">
						<Button
							label="Add book"
							isSubmit={true}
							disabled={currentFormData.some(
								(dataObj: FormDataObjectProps) => dataObj.value?.length === 0
							)}
							onClick={onSubmit}
						/>
					</div>
				</Form>
			)}
		</>
	);
};

export default AddPage;

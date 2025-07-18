"use client";
import { FormDataObjectProps, FormError } from "@/lib/types/form";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { ChangeEvent, useContext, useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import { BookContext } from "../context/BookContext";
import { getFormData, makeBookFromFormData } from "@/lib/helpers/formData";
import { checkIfStatusIsOk } from "@/lib/helpers/api";
import Error from "@/app/components/Error";

const AddPage: React.FC = () => {
	const { addBook, fetchBooks } = useContext(BookContext);
	const formData = getFormData();
	const [currentFormData, setCurrentFormData] = useState(formData);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<FormError[]>([]);
	const [generalError, setGeneralError] = useState<string>();

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
		setGeneralError("");
		setErrors([]);
		setLoading(true);
		const book = makeBookFromFormData(currentFormData);
		const result = await addBook(book);

		if (typeof result === "number") {
			if (checkIfStatusIsOk(result)) {
				setSuccess(true);
				await fetchBooks();
				setTimeout(() => {
					const resetFormData = getFormData();
					setCurrentFormData(resetFormData);
					setSuccess(false);
					setLoading(false);
				}, 3000);
			}
		} else {
			if (result.hasOwnProperty("error")) {
				console.error("Error adding book:", result.error);
				setGeneralError(result.error);
			}
			if (result.errors?.length) setErrors(result.errors);
			setLoading(false);
		}
	};

	/**
	 * Get errors by input id
	 */
	const getErrorsByInputId = (id: string) => {
		return errors.filter((error) => error.path === id);
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
					{!!generalError && (
						<div className="mt-4 w-full">
							<Error errorText={`Error: ${generalError}`} />
						</div>
					)}
					<div className="mt-4 md:mt-6">
						<Button
							label={loading ? "Adding book…" : "Add book"}
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

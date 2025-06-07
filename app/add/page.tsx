"use client";
import { FormDataObjectProps } from "@/lib/types/form";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { ChangeEvent, useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";

const AddPage: React.FC = () => {
	const formData: FormDataObjectProps[] = [
		{ label: "Book title", id: "title", value: "", type: "text" },
		{ label: "Author", id: "author", value: "", type: "text" },
		{ label: "Publishing date", id: "dateOfPublish", value: "", type: "date" },
		{ label: "Cover image url", id: "coverImage", value: "", type: "text" },
	];
	const [currentFormData, setCurrentFormData] = useState(formData);

	const onInputChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
		const newFormData = currentFormData.map((dataObj) => {
			if (dataObj.id === id) {
				return { ...dataObj, value: event.target.value };
			}
			return dataObj;
		});

		setCurrentFormData(newFormData);
	};

	return (
		<>
			<div className="mb-6 md:mb-10">
				<Heading tag="h1">Add book</Heading>
			</div>
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
					/>
				</div>
			</Form>
		</>
	);
};

export default AddPage;

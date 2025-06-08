import { BookProps } from "../types/book";
import { FormDataObjectProps } from "../types/form";
import { formatDateToISO } from "./date";

/**
 * Get form data
 * With or without preset values from bookData
 */
export const getFormData = (bookData?: BookProps): FormDataObjectProps[] => {
	const defaultData: FormDataObjectProps[] = [
		{ label: "Book title", id: "title", value: "", type: "text" },
		{ label: "Author", id: "author", value: "", type: "text" },
		{ label: "Publishing date", id: "dateOfPublish", value: "", type: "date" },
		{ label: "Cover image url", id: "coverImage", value: "", type: "text" },
	];

	if (!bookData) {
		return defaultData;
	}

	return defaultData.map((item) => {
		if (bookData.hasOwnProperty(item.id)) {
			const bookDataValue = bookData[item.id as keyof BookProps];
			if (item.type === "date" && typeof bookDataValue === "string") {
				const date = new Date(bookDataValue);
				const formattedDate = date.toISOString().split("T")[0];
				return { ...item, value: formattedDate };
			}
			return { ...item, value: String(bookDataValue) || "" };
		}
		return item;
	});
};

/**
 * Make book from form data
 */
export const makeBookFromFormData = (
	formData: FormDataObjectProps[]
): Omit<BookProps, "id"> => {
	const propToFormDataMap: Record<string, keyof Omit<BookProps, "id">> = {
		title: "title",
		author: "author",
		dateOfPublish: "dateOfPublish",
		coverImage: "coverImage",
	};

	return formData.reduce((acc, data) => {
		const propKey = propToFormDataMap[data.id];
		if (propKey) {
			if (propKey === "dateOfPublish")
				acc[propKey] = formatDateToISO(data.value);
			else acc[propKey] = data.value;
		}
		return acc;
	}, {} as Omit<BookProps, "id">);
};

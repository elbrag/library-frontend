import { ChangeEvent, FormEvent } from "react";

export interface InputProps {
	id: string;
	value: string;
	label: string;
	type?: "text" | "date" | "url";
	placeholder?: string;
	className?: string;
	required?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onClickEnter?: (e: FormEvent<Element>) => void;
}

export interface FormDataObjectProps {
	id: string;
	label: string;
	value: string;
	type: "text" | "date" | "url";
}

export interface FormError {
	path: string;
	message: string;
}

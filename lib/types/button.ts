import { MouseEvent } from "react";

export interface ButtonProps {
	label: string;
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
	isSubmit?: boolean;
	disabled?: boolean;
}

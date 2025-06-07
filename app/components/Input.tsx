"use client";
import { InputProps } from "@/lib/types/form";
import React, { KeyboardEvent } from "react";

const Input: React.FC<InputProps> = ({
	id,
	value,
	label,
	type = "text",
	placeholder,
	className,
	required = false,
	onChange,
	onClickEnter,
}) => {
	const handleKeyDown = (
		e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (!onClickEnter) return;
		if (e.key === "Enter" || e.keyCode === 13) {
			onClickEnter(e);
		}
	};

	return (
		<label className={`w-full text-left block ${className}`}>
			<div className="mb-1 text-sm font-medium">{label}</div>
			<input
				id={id}
				className="bg-orange-50 border border-gray-700 rounded-sm block w-full p-2 md:px-4 md:py-2"
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onKeyDown={handleKeyDown}
				required={required}
			/>
		</label>
	);
};

export default Input;

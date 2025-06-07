"use client";
import { ButtonProps } from "@/lib/types/button";
import React from "react";

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	isSubmit,
	disabled,
}) => {
	let classes =
		"py-1 px-3 md:py-2 md:px-5 bg-gray-900 text-orange-50 rounded-xs transition-colors ";

	classes = disabled
		? classes.concat("opacity-50 cursor-not-allowed")
		: classes.concat("cursor-pointer hover:bg-gray-500");

	return (
		<button
			className={classes}
			type={isSubmit ? "submit" : "button"}
			onClick={(e) => {
				if (onClick) {
					e.preventDefault();
					onClick(e);
				}
			}}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;

"use client";
import { ButtonProps } from "@/lib/types/button";
import React from "react";

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	isSubmit,
	disabled,
	color = "dark",
}) => {
	const colorClasses = color === "dark" ? "bg-gray-900" : "bg-red-700";
	const hoverColorClasses =
		color === "dark" ? "hover:bg-gray-500" : "hover:bg-red-500";

	let classes = `py-1 px-3 md:py-2 md:px-5 rounded-xs transition-colors text-orange-50 ${colorClasses} `;

	// Disabled classes
	classes = disabled
		? classes.concat("opacity-50 cursor-not-allowed")
		: classes.concat(`cursor-pointer ${hoverColorClasses}`);

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

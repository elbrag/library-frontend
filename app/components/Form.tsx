"use client";
import React, { ReactNode } from "react";

const Form: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<form className="w-full max-w-100 flex flex-col items-center justify-center gap-2 md:gap-3">
			{children}
		</form>
	);
};

export default Form;

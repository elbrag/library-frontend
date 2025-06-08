"use client";
import React from "react";

const Error: React.FC<{ errorText: string }> = ({ errorText }) => {
	return (
		<div className="bg-red-500 text-white w-full px-3 md:px-5 py-3 md:py-4">
			<p className="text-sm">{errorText}</p>
		</div>
	);
};

export default Error;

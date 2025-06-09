"use client";
import React from "react";

const Error: React.FC<{ errorText: string }> = ({ errorText }) => {
	return (
		<div className="bg-red-400 text-white w-full px-2 md:px-4 py-2 md:py-3">
			<p className="text-sm">{errorText}</p>
		</div>
	);
};

export default Error;

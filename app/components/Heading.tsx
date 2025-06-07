"use client";

import { HeadingProps } from "@/lib/types/heading";

const Heading: React.FC<HeadingProps> = ({ tag: Tag, children }) => {
	const getClasses = () => {
		switch (Tag) {
			case "h1":
				return "text-2xl md:text-3xl font-bold";
			case "h2":
				return "text-xl md:text-2xl font-medium";
			case "h3":
				return "text-lg md:text-xl font-medium";
		}
	};

	return <Tag className={getClasses()}>{children}</Tag>;
};

export default Heading;

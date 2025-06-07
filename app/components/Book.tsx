"use client";
import { BookProps } from "@/lib/types/book";
import React from "react";
import Heading from "./Heading";
import Image from "next/image";

const Book: React.FC<BookProps> = ({
	id,
	title,
	author,
	dateOfPublish,
	coverImage,
}) => {
	return (
		<div className="w-full overflow-hidden" key={id}>
			<Image
				className="w-full max-w-32"
				width={100}
				height={140}
				src={coverImage}
				alt={`The cover of ${title}`}
			/>
			<Heading tag="h3">
				<div className="font-bold">{title}</div> by {author}
			</Heading>
			<p>Published {dateOfPublish}</p>
		</div>
	);
};

export default Book;

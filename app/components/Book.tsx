"use client";
import { BookProps } from "@/lib/types/book";
import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import { formatDateFromISO } from "@/lib/helpers/date";
import Link from "next/link";

const Book: React.FC<BookProps> = ({
	id,
	title,
	author,
	dateOfPublish,
	coverImage,
}) => {
	return (
		<Link
			href={`books/${id}`}
			className="w-full overflow-hidden bg-orange-50 rounded-sm flex flex-col items-center py-4 px-4 md:px-6 gap-2 md:gap-3 text-center"
		>
			<Image
				className="w-full max-w-32"
				width={100}
				height={140}
				src={coverImage}
				alt={`The cover of ${title}`}
			/>
			<Heading tag="h3">
				<div className="font-bold">{title}</div>{" "}
				<div className="text-sm">by {author}</div>
			</Heading>
			<p className="text-sm">Published {formatDateFromISO(dateOfPublish)}</p>
		</Link>
	);
};

export default Book;

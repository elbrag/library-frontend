"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuItemProps } from "@/lib/types/navigation";

const Navigation: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const menuItems: MenuItemProps[] = [
		{
			label: "Add books",
			path: "add",
		},
		{ label: "Delete books", path: "delete" },
		{ label: "Edit books", path: "edit" },
	];

	return (
		<header className=" w-full px-4 md:px-10 py-3 md:py-8">
			<div className="flex justify-between">
				<Link className="logo font-bold" href="/">
					The Classics Library
				</Link>
				<div className="flex gap-4 items-center relative">
					<a
						className="text-sm flex items-center gap-1"
						aria-label="Logged in as Admin"
					>
						<div>
							<Image
								src="user-icon.svg"
								alt="Profile image"
								width={24}
								height={24}
							/>
						</div>
						Admin
					</a>
					<button
						className="uppercase text-sm bg-white border-gray-900 border py-1 px-2 cursor-pointer"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						Menu
					</button>
					{menuOpen && (
						<nav className="bg-white rounded-sm border border-gray-900 max-w-fit absolute right-0 -bottom-2 translate-y-full px-3 py-2">
							<ul className="flex flex-col justify-between gap-2">
								{menuItems.map((item) => (
									<li key={`menu-item-${item.path}`}>
										<Link href={`/${item.path}`}>{item.label}</Link>
									</li>
								))}
							</ul>
						</nav>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navigation;

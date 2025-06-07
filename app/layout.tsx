import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { BookContextProvider } from "./context/BookContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "The Classics Library",
	description: "A curated library with literary classics only",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-orange-100`}
			>
				<Navigation />
				<BookContextProvider>
					<main className="flex flex-col items-center justify-center pb-12 md:pb-24 min-h-[82vh] mx-3 md:mx-5 text-center">
						<div className="w-full max-w-200 flex flex-col items-center">
							{children}
						</div>
					</main>
				</BookContextProvider>

				<Footer />
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { BookContextProvider } from "./context/BookContext";

const montserrat = Montserrat({
	variable: "--font-geist-sans",
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
			<body className={`${montserrat.variable} antialiased bg-orange-100`}>
				<Navigation />
				<BookContextProvider>
					<main className="font-montserrat flex flex-col items-center justify-center pb-12 md:pb-24 min-h-[82vh] mx-3 md:mx-5 text-center">
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

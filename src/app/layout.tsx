import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const noto_sans = Noto_Sans_JP({
    variable: "--font-noto-sans-jp",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "4blogger",
    description: "Write fast. Anonymously.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
                ></link>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
                ></link>
            </head>
            <body className={`${noto_sans.variable} antialiased`}>
                <div className="flex flex-col min-h-screen bg-white text-gray-900 items-center">
                    <header className="flex items-center justify-center w-full py-4 bg-pink-300">
                        <NavBar />
                    </header>

                    <main className="w-full max-w-[768px] px-8 flex-grow">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}

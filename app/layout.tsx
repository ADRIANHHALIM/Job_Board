// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <ThemeProvider>
                        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                            <Navbar />
                            <main className="flex-grow pt-20 px-4">{children}</main>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

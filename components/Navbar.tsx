"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { BriefcaseBusiness, FilePlus, Sun, Moon, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../app/AuthContext";

export default function Navbar() {
    const pathname = usePathname();
    const [theme, setTheme] = useState<string | null>(null);
    const [showEffect, setShowEffect] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList[savedTheme === "dark" ? "add" : "remove"]("dark");
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        if (!theme) return;
        setShowEffect(true);
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList[newTheme === "dark" ? "add" : "remove"]("dark");

        setTimeout(() => setShowEffect(false), 600);
    };

    // Toggle dropdown
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full p-4 z-50 transition-all ${
                isScrolled
                    ? "backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-300/30 dark:border-gray-700/30 shadow-lg"
                    : "bg-transparent"
            }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 30, damping: 15 }}
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/workquest.png" alt="Work Quest Logo" width={200} height={80} priority />
                </Link>

                {/* Navigation & User Actions */}
                <motion.div
                    className="flex items-center space-x-6 ml-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <NavLink href="/jobs" icon={BriefcaseBusiness} label="Jobs" />
                    <NavLink href="/jobs/create" icon={FilePlus} label="Post Job" />

                    {/* Theme Toggle */}
                    <div className="relative">
                        <motion.button
                            key={theme}
                            onClick={toggleTheme}
                            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition flex items-center shadow-md"
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-blue-400" />
                            )}
                            {showEffect && (
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    initial={{ opacity: 0.8, scale: 0 }}
                                    animate={{ opacity: 0, scale: 3 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    style={{
                                        background: theme === "light"
                                            ? "radial-gradient(circle, rgba(255,165,0,0.7) 100%, rgba(255,165,0,0) 80%)"
                                            : "radial-gradient(circle, rgba(99,102,241,0.7) 100%, rgba(99,102,241,0) 80%)",
                                    }}
                                />
                            )}
                        </motion.button>
                    </div>

                    {/* User Icon Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            aria-label="User Menu"
                        >
                            <User className="w-6 h-6 text-gray-800 dark:text-white" />
                        </button>

                        {dropdownOpen && (
                            <motion.div
                                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link href="/login">
                                    <div className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition">Login</div>
                                </Link>
                                <Link href="/register">
                                    <div className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition">Register</div>
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* User Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-900 dark:text-white">{user.name}</span>
                            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600">
                                Logout
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </motion.nav>
    );
}

// NavLink Component
function NavLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} prefetch={false} className="relative group">
            <motion.div
                className={`flex items-center px-4 py-2 rounded-lg transition relative overflow-hidden 
                ${isActive ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "hover:bg-gray-700 hover:text-gray-200"}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div className="mr-2" initial={{ scale: 1 }} animate={isActive ? { scale: 1.2 } : { scale: 1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                    <Icon className="w-5 h-5" />
                </motion.div>
                <span>{label}</span>
            </motion.div>
        </Link>
    );
}

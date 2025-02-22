"use client"; // Wajib pakai ini karena ada useState dan useEffect

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  return <div className={`${theme === "dark" ? "dark" : ""}`}>{children}</div>;
}

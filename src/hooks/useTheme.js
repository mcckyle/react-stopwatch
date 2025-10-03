//File name: useTheme.js
//Author: Kyle McColgan
//Date: 3 October 2025
//Description: This file contains the theming hook for the React timer project.

import { useEffect, useState } from "react";

export function useTheme()
{
    const getInitialTheme = () => {
        return (
            localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
        );
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return { theme, toggleTheme };
}

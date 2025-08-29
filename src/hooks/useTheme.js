//File name: useTheme.js
//Author: Kyle McColgan
//Date: 26 August 2025
//Description: This file contains the theming hook for the react-timer.

import { useEffect, useState } from "react";

export function useTheme()
{
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.classList.toggle("light", theme === "light");
        document.body.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
        window.dispatchEvent(new Event("theme-change"));
    };

    return { theme, toggleTheme };
}

//document.body.classList.contains("light") ? "light" : "dark"

/*
 u seEffect*(() => {
 const observer = new MutationObserver(() => {
 setTheme(
     document.body.classList.contains("light") ? "light" : "dark"
     );
     });

     observer.observe(document.body, {
     attributes: true,
attributeFilter: ["class"]
});

return () => observer.disconnect();

}, []);*/

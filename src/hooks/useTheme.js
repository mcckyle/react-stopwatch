//File name: useTheme.js
//Author: Kyle McColgan
//Date: 18 June 2025
//Description: This file contains the theming hook for the react-timer.

import { useEffect, useState } from "react";

export function useTheme()
{
    const [theme, setTheme] = useState(
        document.body.classList.contains("light") ? "light" : "dark"
    );

    useEffect(() => {
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

    }, []);

    return theme;
}

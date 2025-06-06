//useTheme.js

import { useEffect, useState } from "react";

export function useTheme()
{
    const [theme, setTheme] = useState(document.body.classList.contains("light-theme") ? "light" : "dark");

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.body.classList.contains("light-theme") ? "light" : "dark");
        });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();

    }, []);

    return theme;
}

//File name: ThemeContext.jsx
//Author: Kyle McColgan
//Date: 15 December 2025
//Description: This file contains the theming context component for the React timer project.

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    const [theme, setTheme] = useState(getInitialTheme);

    const onToggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, onToggleTheme }}>
          {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

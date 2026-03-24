//File name: ThemeContext.jsx
//Author: Kyle McColgan
//Date: 22 March 2026
//Description: This file contains the theming context component for the stopwatch React project.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(undefined);
const THEME_STORAGE_KEY = "theme";

function getPreferredTheme()
{
  if (typeof window === "undefined")
  {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if ( (storedTheme === "light") || (storedTheme === "dark") )
  {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
}

export const ThemeProvider = ({ children }) =>
{
  const [theme, setTheme] = useState(getPreferredTheme);

  const onToggleTheme = useCallback(() =>
  {
    setTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() =>
  {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const contextValue = useMemo(() => ({
    theme,
    onToggleTheme
  }), [theme, onToggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme()
{
  const context = useContext(ThemeContext);

  if (!context)
  {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}

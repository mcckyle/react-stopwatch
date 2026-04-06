//File name: ThemeContext.jsx
//Author: Kyle McColgan
//Date: 5 April 2026
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

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

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

  //Sync DOM + storage.
  useEffect(() =>
  {
    const root = document.documentElement;

    if (!root.classList.contains(theme))
    {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  //Sync with system preference (only if user hasn't overridden).
  useEffect(() =>
  {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) =>
    {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if ( (storedTheme === "light") || (storedTheme === "dark") )
      {
        return;
      }

      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

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

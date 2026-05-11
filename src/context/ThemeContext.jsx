//File name: ThemeContext.jsx
//Author: Kyle McColgan
//Date: 10 May 2026
//Description: This file contains the theming context component for the stopwatch React project.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, useRef } from "react";

const ThemeContext = createContext(undefined);
const THEME_STORAGE_KEY = "theme";

function getSystemTheme()
{
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme()
{
  if (typeof window === "undefined")
  {
    return "light";
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if ((storedTheme === "light") || (storedTheme === "dark"))
  {
    return storedTheme;
  }

  return getSystemTheme();
}

export const ThemeProvider = ({ children }) =>
{
  const hasManualThemeRef = useRef(false);
  const [theme, setTheme] = useState(() =>
  {
    const initialTheme = getInitialTheme();

    if (typeof window !== "undefined")
    {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if ((storedTheme === "light") || (storedTheme === "dark"))
      {
        hasManualThemeRef.current = true;
      }
    }

    return initialTheme;
  });
  const onToggleTheme = useCallback(() =>
  {
    setTheme((previousTheme) =>
    {
      const nextTheme =
        previousTheme === "dark"
          ? "light"
          : "dark";

      hasManualThemeRef.current = true;
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  }, []);

  //Explicitly Sync DOM Theme Dynamically.
  useEffect(() =>
  {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    root.style.colorScheme = theme;
  }, [theme]);

  //Sync with system theme when no override exists.
  useEffect(() =>
  {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) =>
    {
      if (hasManualThemeRef.current)
      {
        return;
      }
      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const contextValue = useMemo(() =>
  {
    return {
      theme,
      onToggleTheme
    };
  }, [theme, onToggleTheme]);

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
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
}

//File name: ThemeContext.jsx
//Author: Kyle McColgan
//Date: 15 May 2026
//Description: This file contains the theming context component for the stopwatch React project.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

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
    return {
      theme: "light",
      hasManualTheme: false
    };
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if ((storedTheme === "light") || (storedTheme === "dark"))
  {
    return {
      theme: storedTheme,
      hasManualTheme: true
    };
  }

  return {
    theme: getSystemTheme(),
    hasManualTheme: false
  };
}

export const ThemeProvider = ({ children }) =>
{
  const initialState = getInitialTheme();
  const hasManualThemeRef = useRef(initialState.hasManualTheme);
  const [theme, setTheme] = useState(initialState.theme);

  const onToggleTheme = useCallback(() =>
  {
    setTheme((currentTheme) =>
    {
      const nextTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";

      hasManualThemeRef.current = true;
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  }, []);

  //Sync Theme to DOM.
  useEffect(() =>
  {
    const root = document.documentElement;

    root.className = theme;
    root.style.colorScheme = theme;
  }, [theme]);

  //Sync With System Theme Until Manual Override Exists.
  useEffect(() =>
  {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const onSystemThemeChange = ({ matches }) =>
    {
      if (hasManualThemeRef.current)
      {
        return;
      }
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", onSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", onSystemThemeChange);
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

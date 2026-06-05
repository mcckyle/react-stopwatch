//File name: ThemeContext.jsx
//Author: Kyle McColgan
//Date: 4 June 2026
//Description: This file contains the theming context component for the stopwatch React project.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";

const ThemeContext = createContext(undefined);
const THEME_STORAGE_KEY = "theme";
const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme()
{
  return window.matchMedia(DARK_MEDIA_QUERY).matches
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

function syncThemeToDocument(theme)
{
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export const ThemeProvider = ({ children }) =>
{
  const initialState = getInitialTheme();
  const hasManualThemeRef = useRef(initialState.hasManualTheme);
  const [theme, setTheme] = useState(initialState.theme);

  const toggleTheme = useCallback(() =>
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
  useLayoutEffect(() =>
  {
    syncThemeToDocument(theme);
  }, [theme]);

  //Sync With System Theme Until Manual Override Exists.
  useEffect(() =>
  {
    const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);

    const onSystemThemeChange = ({ matches }) =>
    {
      if (hasManualThemeRef.current)
      {
        return;
      }
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", onSystemThemeChange);

    return () =>
    {
      mediaQuery.removeEventListener("change", onSystemThemeChange);
    };
  }, []);

  const contextValue = useMemo(() =>
  {
    return {
      theme,
      toggleTheme
    };
  }, [theme, toggleTheme]);

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

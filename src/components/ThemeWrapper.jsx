//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 25 September 2025
//Description: This file contains the ThemeWrapper React UI/UX component for the react-timer.

import React, { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../hooks/useTheme";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    useEffect(() => {
        // Apply the theme class globally.
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: theme,
                fontFamily: "Inter, sans-serif",
                primaryColor: "yellow",
                defaultRadius: "lg",
                headings: {
                    fontFamily: "Playfair Display, serif",
                    sizes: {
                        h1: { fontSize: "clamp(2rem, 6vw, 2.5rem)", fontWeight: 700 },
                        h2: { fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 600 },
                    },
                },
                shadows: {
                    xl: "0 0 20px rgba(212, 175, 55, 0.3)",
                },
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

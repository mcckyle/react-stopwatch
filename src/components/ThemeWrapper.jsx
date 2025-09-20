//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 17 September 2025
//Description: This file contains the ThemeWrapper React UI/UX component for the react-timer.

import React, { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../hooks/useTheme";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    useEffect(() => {
        // Apply the theme class globally.
        document.documentElement.className = theme;
        document.body.className = theme;
    }, [theme]);

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: theme,
                fontFamily: "Inter, sans-serif",
                defaultRadius: "lg",
                primaryColor: "yellow",
                headings: {
                    fontFamily: "Playfair Display, serif",
                    sizes: {
                        h1: { fontSize: "2.25rem", fontWeight: 700 },
                        h2: { fontSize: "1.875rem", fontWeight: 600 },
                    },
                },
                shadows: {
                    xl: "0 0 24px rgba(212, 175, 55, 0.4)",
                },
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

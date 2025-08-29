//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 26 August 2025
//Description: This file contains the ThemeWrapper React UI/UX component for the react-timer.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../hooks/useTheme";

const ThemeWrapper = ({ children }) => {
    const theme = useTheme(); //"light" | "dark".

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
                        h1: { fontSize: '2.25rem', fontWeight: 700 },
                        h2: { fontSize: '1.875rem', fontWeight: 600 },
                    },
                },
                shadows: {
                    xl: "0 0 24px rgba(212, 175, 55, 0.4)",
                },
            }}
        >
            <div className={`theme-surface ${theme}`}>{children}</div>
        </MantineProvider>
    );
};

export default ThemeWrapper;

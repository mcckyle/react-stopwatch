//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 18 December 2025
//Description: This file contains the ThemeWrapper React UI/UX component for the React stopwatch.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    return (
        <MantineProvider
            withNormalizeCSS
            theme={{
                colorScheme: theme,
                fontFamily: "Inter, sans-serif",
                headings: {
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 700,
                },
                primaryColor: "yellow",
                defaultRadius: "lg",
                shadows: {
                    md: "0 6px 20px rgba(0, 0, 0, 0.18)",
                    xl: "0 0 32px rgba(212, 175, 55, 0.22)",
                },
                components: {
                    Button: {
                        defaultProps: {
                            radius: "lg",
                        },
                    },
                },
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

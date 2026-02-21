//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 20 February 2026
//Description: This file contains the Mantine UI/UX component for the React stopwatch project.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: theme,

                fontFamily: "var(--font-sans)",
                fontFamilyMonospace: "var(--font-mono)",

                primaryColor: "brand",
                defaultRadius: "md",

                respectReducedMotion: true,

                colors: {
                    brand: [
                        "#f6f2e3",
                        "#e9ddb6",
                        "#dbc784",
                        "#c7a52f", //primary accent.
                        "#a98c26",
                        "#8b721d",
                        "#6c5915",
                        "#4e400d",
                        "#312804",
                        "#1b1501",
                    ],
                },

                components: {
                    Button: {
                        styles: () => ({
                            root: {
                                transition: "all var(--duration-fast) var(--ease)",
                            },
                        }),
                    },
                    Card: {
                        styles: () => ({
                            root: {
                                backgroundColor: "var(--surface)",
                                boxShadow: "var(--shadow-soft)",
                                border: "1px solid var(--border-subtle)",
                            },
                        }),
                    },
                },
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

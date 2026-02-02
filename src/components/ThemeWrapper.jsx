//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 2 February 2026
//Description: This file contains the Mantine UI/UX component for the React stopwatch project.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    return (
        <MantineProvider
            withNormalizeCSS={false}
            withGlobalStyles={false}
            theme={{
                colorScheme: theme,

                fontFamily: "var(--font-sans)",
                fontFamilyMonospace: "var(--font-mono)",

                defaultRadius: "md",
                focusRing: "never",
                respectReducedMotion: true,

                spacing: {
                    xs: "var(--space-xs)",
                    sm: "var(--space-sm)",
                    md: "var(--space-md)",
                    lg: "var(--space-lg)",
                    xl: "var(--space-xl)",
                },

                components: {
                    Button: {
                        defaultProps: {
                            radius: "md",
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

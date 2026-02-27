//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 27 February 2026
//Description: This file contains the Mantine UI/UX component for the React stopwatch project.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    return (
        <MantineProvider
            theme={{
                colorScheme: theme,

                /* Fonts. */
                fontFamily: "var(--font-sans)",
                fontFamilyMonospace: "var(--font-mono)",

                /* Radius Systems. */
                radius: {
                  xs: "var(--radius-xs)",
                  sm: "var(--radius-sm)",
                  md: "var(--radius-md)",
                  lg: "var(--radius-lg)",
                },
                defaultRadius: "md",

                /* Motion. */
                respectReducedMotion: true,
                transitionTimingFunction: "var(--ease)",

                /* Use Design Tokens Instead of Fixed Palette. */
                colors: {
                    neutral: [
                        "var(--surface-muted)",
                        "var(--surface-muted)",
                        "var(--surface-muted)",
                        "var(--surface)",
                        "var(--surface)",
                        "var(--surface)",
                        "var(--surface)",
                        "var(--surface)",
                        "var(--surface)",
                        "var(--surface)",
                    ],
                },
                primaryColor: "neutral",

                /* Component Customizations. */
                components: {
                    Button: {
                        styles: () => ({
                            root: {
                                borderRadius: "var(--radius-sm)",
                                fontWeight: 600,
                                transition:
                                  "background var(--duration-fast) var(--ease), " +
                                  "color var(--duration-fast) var(--ease), " + "border-color var(--duration-fast) var(--ease), " +
                                  "transform var(--duration-fast) var(--ease)",

                                "&:focus-visible": {
                                    boxShadow: "var(--focus-ring)",
                                },
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

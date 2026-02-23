//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 22 February 2026
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

                primaryColor: "gray",
                defaultRadius: "md",

                respectReducedMotion: true,

                components: {
                    Button: {
                        styles: () => ({
                            root: {
                                transition:
                                  "background var(--duration-fast) var(--ease), color var(--duration-fast) var(--ease), border color var(--duration-fast) var(--ease)",
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

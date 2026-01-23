//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 23 January 2026
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

                defaultRadius: "sm",
                focusRing: "never",
                respectReducedMotion: true,

                components: {
                    Button: {
                        defaultProps: {
                            radius: "sm",
                        },
                        styles: {
                            root: {
                                fontWeight: 500,
                                letterSpacing: "0.02em",
                            },
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

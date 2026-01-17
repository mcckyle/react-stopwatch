//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 16 January 2026
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
                focusRing: "auto",
                respectReducedMotion: true,

                components: {
                    Button: {
                        defaultProps: {
                            radius: "md",
                        },
                        styles: {
                            root: {
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
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

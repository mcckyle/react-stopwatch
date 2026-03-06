//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 6 March 2026
//Description: This file contains the Mantine UI/UX component for the React stopwatch project.

import React, { useMemo } from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    const mantineTheme = useMemo(() => ({
        primaryColor: "gray",

        /* Fonts. */
        fontFamily: "var(--font-sans)",
        fontFamilyMonospace: "var(--font-mono)",

        /* Radius Systems. */
        radius: {
            xs: "var(--radius-xs)",
            sm: "var(--radius-sm)",
            md: "var(--radius-md)",
            lg: "var(--radius-lg)",
            xl: "var(--radius-xl)",
        },
        defaultRadius: "md",

        /* Motion. */
        respectReducedMotion: true,

        /* Component Customizations. */
        components: {
            Button: {
                defaultProps: {
                    radius: "sm",
                },
                styles: {
                    root: {
                        fontWeight: 600,
                        transition: `
                          background var(--duration-fast) var(--ease),
                          color var(--duration-fast) var(--ease),
                          border-color var(--duration-fast) var(--ease),
                          transform var(--duration-fast) var(--ease)
                        `,

                        "&:active": {
                            transform: "translateY(1px)",
                        },

                        "&:focus-visible": {
                            boxShadow: "var(--focus-ring)",
                        },
                    },
                },
            },

            Card: {
                defaultProps: {
                    radius: "lg",
                },
                styles: {
                    root: {
                        background: "var(--surface)",
                        border: "1px solid var(--border-subtle)",
                        boxShadow: "var(--shadow-sm)",
                        transition: `
                          background var(--duration) var(--ease),
                          border-color var(--duration) var(--ease),
                          box-shadow var(--duration) var(--ease)
                        `,

                        "&:hover": {
                            boxShadow: "var(--shadow-md)",
                        },
                      },
                    },
                  },
                },
              }), [theme]);

    return (
        <MantineProvider
          theme={mantineTheme}
          defaultColorScheme={theme}
          withGlobalStyles
          withNormalizeCSS
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 22 March 2026
//Description: This file contains the Mantine UI/UX component for the stopwatch React project.

import React, { useMemo } from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) =>
{
    const { theme } = useTheme(); //"light" || "dark".

    const mantineTheme = useMemo(() =>
    {
      const interactiveTransition = `
        background-color var(--duration-fast) var(--ease),
        color var(--duration-fast) var(--ease),
        border-color var(--duration-fast) var(--ease),
        box-shadow var(--duration-fast) var(--ease),
        transform var(--duration-fast) var(--ease)
      `;

      const surfaceTransition = `
        background-color var(--duration) var(--ease),
        border-color var(--duration) var(--ease),
        box-shadow var(--duration) var(--ease),
        color var(--duration) var(--ease)
      `;

      return {
        primaryColor: "gray",
        defaultRadius: "md",
        respectReducedMotion: true,

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

        /* Component Customizations. */
        components: {
          Button: {
            defaultProps: { radius: "sm" },
            styles: {
              root: {
                fontWeight: 600,
                transition: interactiveTransition,
                "&:active": { transform: "translateY(1px)" },
                "&:focus-visible": { boxShadow: "var(--focus-ring)" }
              },
             },
            },
            Card: {
              defaultProps: { radius: "lg" },
              styles: {
                root: {
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-sm)",
                  transition: surfaceTransition,
                },
              },
            },
            ActionIcon: {
              defaultProps: { radius: "xl" },
                styles: {
                  root: {
                    transition: interactiveTransition,
                    "&:focus-visible": { boxShadow: "var(--focus-ring)" }
                  },
                },
             },
            Modal: {
              styles: {
                  content: {
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-md)",
                    transition: surfaceTransition,
                  },
                  header: {
                    backgroundColor: "transparent",
                  },
              },
            },
          },
        };
      }, [theme]);

    return (
      <MantineProvider
        theme={mantineTheme}
        defaultColorScheme={theme}
      >
          {children}
      </MantineProvider>
    );
};

export default ThemeWrapper;

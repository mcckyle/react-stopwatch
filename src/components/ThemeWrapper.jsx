//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 5 April 2026
//Description: This file contains the Mantine UI/UX component for the stopwatch React project.

import React, { useMemo } from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) =>
{
    const { theme } = useTheme(); //"light" || "dark".
    const mantineTheme = useMemo(() => ({
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
                transition: "var(--transition-interactive)",
                "&:active": { transform: "translateY(1px)" },
                "&:focus-visible": { boxShadow: "var(--focus-ring)" }
              }
             }
            },
            Card: {
              defaultProps: { radius: "lg" },
              styles: {
                root: {
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-sm)",
                  backdropFilter: "var(--backdrop-blur)",
                  transition: "var(--transition-surface)"
                }
              }
            },
            ActionIcon: {
              defaultProps: { radius: "xl" },
                styles: {
                  root: {
                    transition: "var(--transition-interactive)",
                    "&:focus-visible": { boxShadow: "var(--focus-ring)" }
                  }
                }
             },
            Modal: {
              styles: {
                  content: {
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-md)",
                    backdropFilter: "var(--backdrop-blur)",
                    transition: "var(--transition-surface)"
                  },
                  header: {
                    backgroundColor: "transparent"
                  }
              }
            }
          }
        }), []);

    return (
      <MantineProvider theme={mantineTheme} defaultColorScheme={theme}>
        {children}
      </MantineProvider>
    );
};

export default ThemeWrapper;

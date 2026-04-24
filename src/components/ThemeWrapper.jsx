//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 21 April 2026
//Description: This file contains the Mantine UI/UX component for the stopwatch React project.

import React, { useMemo } from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) =>
{
    const { theme } = useTheme(); //"light" || "dark".
    const mantineTheme = useMemo(() => ({
        colorScheme: theme,

        primaryColor: "gray",
        defaultRadius: "md",
        respectReducedMotion: true,

        fontFamily: "var(--font-sans)",
        fontFamilyMonospace: "var(--font-mono)",

        /* Radius System. */
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
            ActionIcon: {
              defaultProps: { radius: "xl" },
                styles: {
                  root: {
                    transition: "var(--transition-interactive)",
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
                  boxShadow: "var(--shadow-xs)",
                  backdropFilter: "var(--backdrop-blur)"
                }
              }
            },
            Modal: {
              styles: {
                content: {
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-md)",
                  backdropFilter: "var(--backdrop-blur)"
                },
                header: {
                  backgroundColor: "transparent"
                }
              }
            }
          }
        }), [theme]);

    return (
      <MantineProvider theme={mantineTheme}>
        {children}
      </MantineProvider>
    );
};

export default ThemeWrapper;

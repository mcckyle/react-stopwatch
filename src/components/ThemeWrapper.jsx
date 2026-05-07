//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 6 May 2026
//Description: This file contains the Mantine UI/UX component for the stopwatch React project.

import React, { useMemo } from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) =>
{
    const { theme } = useTheme(); //"light" || "dark".
    const mantineTheme = useMemo(() =>
    {
      return createTheme({
        primaryColor: "gray",
        defaultRadius: "md",
        respectReducedMotion: true,

        fontFamily: "var(--font-sans)",
        fontFamilyMonospace: "var(--font-mono)",

        /* Component Customizations. */
        components: {
          Button: {
            defaultProps: { radius: "sm" },
            styles: {
              root: {
                fontWeight: 600,
                transition: "var(--transition-interactive)",
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
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-sm)",
                backdropFilter: "var(--backdrop-blur)"
              }
            }
          },
          Modal: {
            styles: {
              content: {
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-lg)",
                backdropFilter: "var(--backdrop-blur)"
              },
              header: {
                background: "transparent"
              }
            }
          }
        }
        });
    }, [theme]);

    return (
      <MantineProvider theme={mantineTheme} forceColorScheme={theme}>
        {children}
      </MantineProvider>
    );
};

export default ThemeWrapper;

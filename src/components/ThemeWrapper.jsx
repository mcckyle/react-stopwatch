//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 15 May 2026
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
        focusRing: "never",
        respectReducedMotion: true,

        fontFamily: "var(--font-sans)",
        fontFamilyMonospace: "var(--font-mono)",
        headings: { fontFamily: "var(--font-sans)", fontWeight: "700" },

        /* Component Customizations. */
        components: {
          Button: {
            defaultProps: { radius: "xl" },
            styles: {
              root: {
                transition: "var(--transition-interactive)"
              }
            }
          },
          ActionIcon: {
            defaultProps: { radius: "xl" },
            styles: {
              root: {
                transition: "var(--transition-interactive)",
              }
            }
          },
          Card: {
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
                background: "var(--surface-overlay)",
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
    }, []);

    return (
      <MantineProvider theme={mantineTheme} forceColorScheme={theme}>
        {children}
      </MantineProvider>
    );
};

export default ThemeWrapper;

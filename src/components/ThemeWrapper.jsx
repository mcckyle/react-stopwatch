//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 29 May 2026
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
        defaultRadius: "xl",
        focusRing: "never",
        respectReducedMotion: true,

        fontFamily: "var(--font-sans)",
        fontFamilyMonospace: "var(--font-mono)",
        headings: { fontFamily: "var(--font-sans)", fontWeight: "700" },

        /* Component Customizations. */
        components: {
          Modal: {
            defaultProps: { centered: true },
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

//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 11 February 2026
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
                focusRing: "never",
                respectReducedMotion: true,

                colors: {
                    brand: [
                        "#fdf6d7",
                        "#f9e7a5",
                        "#f4d46e",
                        "#efc240",
                        "#d4af37",
                        "#b8922f",
                        "#977522",
                        "#755917",
                        "#543e03",
                        "#382708",
                    ],
                },

                primaryColor: "brand",
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

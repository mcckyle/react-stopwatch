//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 15 February 2026
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

                primaryColor: "brand",

                colors: {
                    brand: [
                        "#fbf4da",
                        "#f4e3a4",
                        "#e9cc6a",
                        "#ddb63f",
                        "#c7a52f",
                        "#a88926",
                        "#866c1c",
                        "#644f12",
                        "#463608",
                        "#2d2103",
                    ],
                },
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

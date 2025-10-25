//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 21 October 2025
//Description: This file contains the ThemeWrapper React UI/UX component for the react-timer.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: theme,
                fontFamily: "Inter, sans-serif",
                primaryColor: "yellow",
                primaryShade: 6,
                defaultRadius: "lg",
                headings: { fontFamily: "Playfair Display, serif" },
                colors: {
                    yellow: [
                        "#fffde7", "#fff9c4", "#fff59d",
                        "#fff176", "#ffee58", "#fdd835",
                        "#fbc02d", "#f9a825", "#f57f17", "#f57f17",
                    ],
                },
                shadows: {
                    xl: "0 0 25px rgba(212, 175, 55, 0.3)",
                },
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 15 June 2025
//Description: This file contains the ThemeWrapper React UI/UX component for the react-timer.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../hooks/useTheme";

const ThemeWrapper = ({ children }) => {
    const theme = useTheme();

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: theme,
                fontFamily: "Inter, sans-serif",
                defaultRadius: "lg",
                primaryColor: "yellow",
                headings: {
                    fontFamily: "Playfair Display, serif",
                    sizes: {
                        h1: { fontSize: '2.25rem' },
                        h2: { fontSize: '1.875rem' },
                    },
                },
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 28 December 2025
//Description: This file contains the ThemeWrapper React UI/UX component for the React stopwatch.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    return (
        <MantineProvider
            withNormalizeCSS
            theme={{
                colorScheme: theme,
                fontFamily: "Inter, sans-serif",
                primaryColor: "yellow",
                defaultRadius: "lg",
                components: {
                    Button: {
                        defaultProps: {
                            radius: "lg",
                        },
                    },
                },
            }}
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeWrapper;

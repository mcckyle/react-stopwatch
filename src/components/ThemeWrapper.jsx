//File name: ThemeWrapper.jsx
//Author: Kyle McColgan
//Date: 5 January 2026
//Description: This file contains the ThemeWrapper React UI/UX component for the React stopwatch.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { useTheme } from "../context/ThemeContext";

const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme(); //"light" || "dark".

    return (
        <MantineProvider
            withNormalizeCSS
            withGlobalStyles={false}
            theme={{
                colorScheme: theme,
                fontFamily: "Inter, system-ui, sans-serif",
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

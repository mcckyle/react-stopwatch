//File name: test-utils.jsx
//Author: Kyle McColgan
//Date: 19 June 2025
//Description: This file contains set up related code for the Jest unit testing on the react-timer.

import React from "react";
import { MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";

const AllProviders = ({ children }) => (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme ={{}}
    >
        {children}
    </MantineProvider>
);

const customRender = (ui, options) =>
    render(ui, { wrapper: AllProviders, ...options});

export * from "@testing-library/react";
export { customRender as render };

//src/__tests__/test-utils.jsx

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

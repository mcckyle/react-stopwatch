//File name: test-utils.jsx
//Author: Kyle McColgan
//Date: 7 October 2025
//Description: This file contains set up related code for the Jest unit testing on the React timer project.

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext.jsx";
import ThemeWrapper from "../components/ThemeWrapper.jsx";

const AllProviders = ({ children }) => (
    <ThemeProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeProvider>
);

const customRender = (ui, options) =>
    render(ui, { wrapper: AllProviders, ...options});

export * from "@testing-library/react";
export { customRender as render };

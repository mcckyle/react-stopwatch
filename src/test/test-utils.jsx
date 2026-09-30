//File name: test-utils.jsx
//Author: Kyle McColgan
//Date: 29 September 2026
//Description: This file contains set up related code for Vitest unit testing on the React stopwatch project.

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext.jsx";

const AllProviders = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

const customRender = (ui, options) =>
    render(ui, { wrapper: AllProviders, ...options});

export * from "@testing-library/react";
export { customRender as render };

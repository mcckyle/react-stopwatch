//File name: main.jsx
//Author: Kyle McColgan
//Date: 26 October 2025
//Description: This file contains the main React component for the React stopwatch project.

import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ThemeWrapper from "./components/ThemeWrapper.jsx";
import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </ThemeProvider>
  </React.StrictMode>
);

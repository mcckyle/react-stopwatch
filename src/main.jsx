//File name: main.jsx
//Author: Kyle McColgan
//Date: 29 September 2026
//Description: This file contains the main React component for the React stopwatch project.

import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

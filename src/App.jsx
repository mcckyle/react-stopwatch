//File name: App.jsx
//Author: Kyle McColgan
//Date: 23 September 2025
//Description: This file contains the entry point React component for the react timer project.

import React from "react";
import Timer from "./components/Timer/Timer.jsx";
import { useTheme } from "./hooks/useTheme.js";

import './App.css';
import './components/theme.css';

function App()
{
    const { theme, toggleTheme } = useTheme();

    return (
      <main className={`appContainer ${theme}`}>
          <Timer toggleTheme={toggleTheme} />
      </main>
    );
}

export default App;

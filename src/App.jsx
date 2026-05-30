//File name: App.jsx
//Author: Kyle McColgan
//Date: 29 May 2026
//Description: This file contains the App component for the stopwatch React project.

import Stopwatch from "./components/Stopwatch/Stopwatch.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

import "./components/theme.css";
import "./App.css";

function App()
{
    const { toggleTheme } = useTheme();

    return (
      <main className="app-shell">
        <Stopwatch toggleTheme={toggleTheme} />
      </main>
    );
}

export default App;

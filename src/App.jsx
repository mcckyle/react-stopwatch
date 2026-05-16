//File name: App.jsx
//Author: Kyle McColgan
//Date: 15 May 2026
//Description: This file contains the App component for the stopwatch React project.

import Stopwatch from "./components/Stopwatch/Stopwatch.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

import "./components/theme.css";
import "./App.css";

function App()
{
    const { onToggleTheme } = useTheme();

    return (
      <div className="app-shell">
        <main className="app" aria-label="Precision Stopwatch">
          <Stopwatch onToggleTheme={onToggleTheme} />
        </main>
      </div>
    );
}

export default App;

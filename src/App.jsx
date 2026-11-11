//File name: App.jsx
//Author: Kyle McColgan
//Date: 10 November 2026
//Description: This file contains the App component for the stopwatch React project.

import Stopwatch from "./components/Stopwatch/Stopwatch.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

function App()
{
    const { toggleTheme } = useTheme();

    return <Stopwatch toggleTheme={toggleTheme} />;
}

export default App;

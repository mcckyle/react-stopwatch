//File name: App.jsx
//Author: Kyle McColgan
//Date: 18 June 2025
//Description: This file contains the entry point React component for the react-timer.

import React, { useState, useEffect } from "react";
import Timer from "./components/Timer/Timer.jsx";
import Layout from "./components/Layout/Layout.jsx";
import './components/theme.css';
import './App.css';

function App() {
  const [dark, setDark] = useState(true);

  //const toggleTheme = () => setDark((prev) => !prev);
  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);

    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

//   useEffect(() => {
//     console.log("Viewport width (JS):", window.innerWidth);
//     if(window.innerWidth < 400)
//     {
//       document.body.style.background = 'lightgreen';
//     }
//   }, []);

  useEffect(() => {
    document.body.classList.toggle("light", !dark);
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  //Load theme preference from localStorage...
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if(storedTheme === "light")
    {
        setDark(false);
    }
  }, []);

  const themeClass = dark ? "dark" : "light";

  return (
    <div className={themeClass}>
      <Layout dark={dark} toggleTheme={toggleTheme}>
          <Timer/>
      </Layout>
    </div>
  );
}

export default App;

//File name: App.jsx
//Author: Kyle McColgan
//Date: 16 June 2025
//Description: This file contains the entry point React component for the react-timer.

import React, { useState, useEffect } from "react";
import Timer from "./components/Timer/Timer.jsx";
import Layout from "./components/Layout.jsx";
import './App.css';

function App() {
  const [dark, setDark] = useState(true);

  //const toggleTheme = () => setDark((prev) => !prev);
  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);

    document.body.classList.toggle("light-theme", !newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  //Load theme preference from localStorage...
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if(storedTheme === "light")
    {
        setDark(false);
        document.body.classList.add("light-theme");
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light-theme', !dark);
  }, [dark]);

  return (
      <Layout dark={dark} toggleTheme={toggleTheme}>
          <Timer/>
      </Layout>
  );
}

export default App;

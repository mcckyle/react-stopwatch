//File name: App.jsx
//Author: Kyle McColgan
//Date: 09 June 2025
//Description: This file contains the entry point React component for the react-timer.

import React from "react";
import Timer from "./components/Timer/Timer.jsx";
import Layout from "./components/Layout.jsx";
import './App.css';

function App() {
  return (
      <Layout>
          <Timer />
      </Layout>
  );
}

export default App;

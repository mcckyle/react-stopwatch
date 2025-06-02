//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 02 June 2025
//Description: This file contains reusable, repeated utility functions for the React timer site.

import { useEffect, useRef, useState } from "react";

export function useStopwatch()
{
  const [elapsed, setElapsed] = useState(0); // Stored in milliseconds.
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning)
    {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 100); // Update the UI every 100ms.
    }
    else
    {
        clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggle = () => {
    if (!isRunning)
    {
        startTimeRef.current = Date.now() - elapsed;
    }
    setIsRunning(prev => !prev);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsed(0);
    startTimeRef.current = null;
  }

  const getCurrentTime = () => {
    if (isRunning && startTimeRef.current !== null)
    {
        return Date.now() - startTimeRef.current;
    }
    return elapsed;
  };

  return {
    time: elapsed, //time in milliseconds.
    isRunning,
    toggle,
    reset,
    getCurrentTime,
  };
}

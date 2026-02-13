//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 11 February 2026
//Description: This file contains reusable, repeated utility functions for the React stopwatch project.

import { useEffect, useRef, useState, useCallback } from "react";

export function useStopwatch()
{
  const [elapsed, setElapsed] = useState(0); // Stored in milliseconds.
  const [isRunning, setIsRunning] = useState(false);

  const startRef = useRef(0);
  const frameRef = useRef(null);
  const elapsedRef = useRef(0);

  //Drift-Free Animation Loop.
  const tick = useCallback(() => {
    const now = performance.now();
    const nextElapsed = now - startRef.current;

    elapsedRef.current = nextElapsed;
    setElapsed(nextElapsed);
    frameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if ( ! isRunning)
    {
      if (frameRef.current)
      {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    startRef.current = performance.now() - elapsedRef.current;
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current)
      {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isRunning, tick]);

  const toggle = useCallback(() => {
    setIsRunning((prev) => ! prev);
  }, []);

  const reset = useCallback(() => {
    if (frameRef.current)
    {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    elapsedRef.current = 0;
    startRef.current = 0;

    setIsRunning(false);
    setElapsed(0);
  }, []);

  const getCurrentTime = useCallback(() => {
    if ( ! isRunning)
    {
        return elapsedRef.current;
    }
    return performance.now() - startRef.current;
  }, [isRunning]);

  return {
    time: elapsed, //time in milliseconds.
    isRunning,
    toggle,
    reset,
    getCurrentTime,
  };
}

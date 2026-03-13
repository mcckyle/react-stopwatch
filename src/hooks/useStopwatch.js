//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 5 March 2026
//Description: This file contains the stopwatch functions for the stopwatch React project.

import { useEffect, useRef, useState, useCallback } from "react";

export function useStopwatch()
{
  //Public state (stored in milliseconds).
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Internal refs (no re-renders).
  const startTimeRef = useRef(0); //Timestamp when current run started/resumed.
  const elapsedRef = useRef(0); //Accumulated elapsed time when paused.
  const frameRef = useRef(null); // current Animation Frame ID.

  //Cancel the animation loop safely.
  const cancelLoop = useCallback(() => {
    if (frameRef.current !== null)
    {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  //Drift-Free Animation Loop.
  //Uses performance.now() to avoid cumulative errors.
  const tick = useCallback(() => {
    const now = performance.now();
    const nextElapsed = now - startTimeRef.current;

    if (nextElapsed !== elapsedRef.current)
    {
      elapsedRef.current = nextElapsed;
      setElapsedMs(nextElapsed);
    }

    frameRef.current = requestAnimationFrame(tick);
  }, []);

  //Handle start / pause lifecycle.
  useEffect(() => {
    if ( ! isRunning)
    {
        cancelLoop();
        return;
    }

    //Resume from existing elapsed value.
    startTimeRef.current = performance.now() - elapsedRef.current;
    frameRef.current = requestAnimationFrame(tick);

    return cancelLoop;
  }, [isRunning, tick, cancelLoop]);

  //Toggle running state.
  const toggle = useCallback(() => setIsRunning(prev => !prev), []);

  //Fully reset the stopwatch.
  const reset = useCallback(() => {
    cancelLoop();

    elapsedRef.current = 0;
    startTimeRef.current = 0;

    setElapsedMs(0);
    setIsRunning(false);
  }, [cancelLoop]);

  //Returns precise time without waiting for the next frame.
  const getCurrentTime = useCallback(() => {
    if (!isRunning)
    {
      return elapsedRef.current;
    }

    return performance.now() - startTimeRef.current;
  }, [isRunning]);

  return {
    time: elapsedMs, //time in milliseconds.
    isRunning,
    toggle,
    reset,
    getCurrentTime,
  };
}

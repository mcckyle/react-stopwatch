//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 17 March 2026
//Description: This file contains the stopwatch functions for the stopwatch React project.

import { useEffect, useRef, useState, useCallback } from "react";

export function useStopwatch()
{
  //Render state (what React sees) (stored in milliseconds).
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Internal refs (single source of truth).
  const startTimeRef = useRef(0); //Timestamp when current run started/resumed.
  const elapsedRef = useRef(0); //Accumulated elapsed time when paused.
  const frameRef = useRef(null); // current Animation Frame ID.
  const lastRenderedRef = useRef(0); //Prevents unnecessary renders.

  //Cancel the animation loop safely.
  const cancelLoop = useCallback(() => {
    if (frameRef.current !== null)
    {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  //High-performance animation loop.
  const tick = useCallback(() => {
    const now = performance.now();
    const nextElapsed = now - startTimeRef.current;

    elapsedRef.current = nextElapsed;

    //Only update React when display value actually changes.
    //~10ms precision keeps digits smooth but avoids excessive renders.
    if (Math.floor(nextElapsed / 10) !== Math.floor(lastRenderedRef.current / 10))
    {
      lastRenderedRef.current = nextElapsed;
      setElapsedMs(nextElapsed);
    }

    frameRef.current = requestAnimationFrame(tick);
  }, []);

  //Start / pause lifecycle.
  useEffect(() => {
    if (!isRunning)
    {
        cancelLoop();
        return;
    }

    //Resume from paused state.
    startTimeRef.current = performance.now() - elapsedRef.current;

    if (frameRef.current === null)
    {
      frameRef.current = requestAnimationFrame(tick);
    }

    return cancelLoop;
  }, [isRunning, tick, cancelLoop]);

  //Toggle running state.
  const toggle = useCallback(() => setIsRunning(prev => !prev), []);

  //Reset the stopwatch.
  const reset = useCallback(() => {
    cancelLoop();

    elapsedRef.current = 0;
    startTimeRef.current = 0;
    lastRenderedRef.current = 0;

    setElapsedMs(0);
    setIsRunning(false);
  }, [cancelLoop]);

  //Get precise time (no render delay).
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

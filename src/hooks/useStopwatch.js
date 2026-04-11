//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 8 April 2026
//Description: This file contains the stopwatch functions for the stopwatch React project.

import { useEffect, useRef, useState, useCallback } from "react";

const DISPLAY_PRECISION_MS = 10;

export function useStopwatch()
{
  //Render state (what React sees) (stored in milliseconds).
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Internal refs (single source of truth).
  const startTimeRef = useRef(0); //Timestamp when current run started/resumed.
  const elapsedRef = useRef(0); //Accumulated elapsed time when paused.
  const frameRef = useRef(null); // current Animation Frame ID.
  const lastRenderedBucketRef = useRef(-1); //-1 = first render always updates.

  //Cancel the animation loop safely.
  const cancelLoop = useCallback(() =>
  {
    if (frameRef.current !== null)
    {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const updateElapsed = useCallback((nextElapsed) =>
  {
    elapsedRef.current = nextElapsed;

    const nextBucket = Math.floor(nextElapsed / DISPLAY_PRECISION_MS);

    //Only update React when display value actually changes.
    //~10ms precision keeps digits smooth but avoids excessive renders.
    if (nextBucket !== lastRenderedBucketRef.current)
    {
      lastRenderedBucketRef.current = nextBucket;
      setElapsedMs(nextElapsed);
    }
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

    const animate = () =>
    {
      const now = performance.now();
      const nextElapsed = now - startTimeRef.current;

      updateElapsed(nextElapsed);
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return cancelLoop;
  }, [isRunning, updateElapsed, cancelLoop]);

  //Cleanup on unmount (strict-mode safe).
  useEffect(() => cancelLoop, [cancelLoop]);

  //Toggle running state.
  const toggle = useCallback(() =>
  {
    setIsRunning((previous) => !previous);
  }, []);

  //Reset the stopwatch.
  const reset = useCallback(() =>
  {
    cancelLoop();

    startTimeRef.current = 0;
    elapsedRef.current = 0;
    lastRenderedBucketRef.current = -1;

    setElapsedMs(0);
    setIsRunning(false);
  }, [cancelLoop]);

  //Get precise time (no render delay).
  const getCurrentTime = useCallback(() =>
  {
    return isRunning
      ? performance.now() - startTimeRef.current
      : elapsedRef.current;
  }, [isRunning]);

  return {
    time: elapsedMs, //time in milliseconds.
    isRunning,
    toggle,
    reset,
    getCurrentTime,
  };
}

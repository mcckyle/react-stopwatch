//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 23 June 2026
//Description: This file contains the stopwatch functions for the stopwatch React project.

import { useEffect, useRef, useState, useCallback } from "react";

const CENTISECOND_MS = 10;

export function useStopwatch()
{
  //Render state (what React sees) (stored in milliseconds).
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Internal timing state (single source of truth).
  const isRunningRef = useRef(false);
  const startTimeRef = useRef(0); //Timestamp when active run began.
  const elapsedRef = useRef(0); //Accumulated elapsed time.
  const frameRef = useRef(null); // requestAnimationFrame ID.
  const lastRenderedBucketRef = useRef(-1); //Render precision tracking.

  //Cancel the animation loop safely.
  const cancelLoop = useCallback(() =>
  {
    if (frameRef.current !== null)
    {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  //Display Update Pipeline.
  const updateElapsed = useCallback((nextElapsed) =>
  {
    elapsedRef.current = nextElapsed;
    const bucket = Math.floor(nextElapsed / CENTISECOND_MS);

    //Render only when visible precision changes.
    if (bucket !== lastRenderedBucketRef.current)
    {
      lastRenderedBucketRef.current = bucket;
      setElapsedMs(nextElapsed);
    }
  }, []);

  //Start / pause lifecycle.
  useEffect(() =>
  {
    if (!isRunning)
    {
      cancelLoop();
      return;
    }

    //Resume from paused position.
    startTimeRef.current = performance.now() - elapsedRef.current;

    //Animation Loop.
    const tick = () =>
    {
      const now = performance.now();
      const nextElapsed = now - startTimeRef.current;

      updateElapsed(nextElapsed);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return cancelLoop;
  }, [isRunning, cancelLoop, updateElapsed]);

  //Cleanup on unmount (strict-mode safe).
  useEffect(() => cancelLoop, [cancelLoop]);

  //Toggle running state.
  const toggle = useCallback(() =>
  {
    setIsRunning(previous =>
    {
      const next = !previous;
      isRunningRef.current = next;
      return next;
    });
  }, []);

  //Reset the stopwatch.
  const reset = useCallback(() =>
  {
    cancelLoop();

    startTimeRef.current = 0;
    elapsedRef.current = 0;
    lastRenderedBucketRef.current = -1;
    isRunningRef.current = false;

    setElapsedMs(0);
    setIsRunning(false);
  }, [cancelLoop]);

  //Get precise time (no render delay).
  const getCurrentTime = useCallback(() =>
  {
    return isRunningRef.current
      ? performance.now() - startTimeRef.current
      : elapsedRef.current;
  }, []);

  return {
    time: elapsedMs, //time in milliseconds.
    isRunning,
    toggle,
    reset,
    getCurrentTime,
  };
}

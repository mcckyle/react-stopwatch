//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 22 April 2026
//Description: This file contains the stopwatch functions for the stopwatch React project.

import { useEffect, useRef, useState, useCallback } from "react";

const DISPLAY_PRECISION_MS = 10;

export function useStopwatch()
{
  //Render state (what React sees) (stored in milliseconds).
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Internal timing state (single source of truth).
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

  //Display Update Pipeline.
  const updateElapsed = useCallback((nextElapsed) =>
  {
    const nextBucket = Math.floor(nextElapsed / DISPLAY_PRECISION_MS);

    //Avoid unnecessary internal writes.
    if (nextElapsed !== elapsedRef.current)
    {
      elapsedRef.current = nextElapsed;
    }

    //Only trigger React updates when
    //visible precision actually changes.
    if (nextBucket !== lastRenderedBucketRef.current)
    {
      lastRenderedBucketRef.current = nextBucket;
      setElapsedMs(nextElapsed);
    }
  }, []);

  //Animation Loop.
  const animate = useCallback(() =>
  {
    const now = performance.now();
    const nextElapsed = now - startTimeRef.current;

    updateElapsed(nextElapsed);
    frameRef.current = requestAnimationFrame(animate);
  }, [updateElapsed]);

  //Start / pause lifecycle.
  useEffect(() => {
    if (!isRunning)
    {
      cancelLoop();
      return;
    }

    //Resume from paused position.
    startTimeRef.current = performance.now() - elapsedRef.current;
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

    lastRenderedBucketRef.current = -1;
    startTimeRef.current = 0;
    elapsedRef.current = 0;

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

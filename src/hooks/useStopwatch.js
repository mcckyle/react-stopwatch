//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 10 November 2026
//Description: This file contains the stopwatch functions for the stopwatch React project.

import { useEffect, useRef, useState, useCallback } from "react";

const CENTISECOND_MS = 10;

export function useStopwatch()
{
  //Render state (what React sees) (stored in milliseconds).
  //const DEMO_TIME_MS = (((12 * 60 * 60) + (34 * 60) + 56) * 1000) + 780;
  //const [elapsedMs, setElapsedMs] = useState(DEMO_TIME_MS);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Keep timing state independent of React's render cycle.
  const isRunningRef = useRef(false);
  const startTimeRef = useRef(0); //Timestamp when active run began.
  const elapsedRef = useRef(0); //Accumulated elapsed time.
  //const elapsedRef = useRef(DEMO_TIME_MS); //Accumulated elapsed time.
  const frameRef = useRef(null); // requestAnimationFrame ID.
  const lastRenderedBucketRef = useRef(0); //Render precision tracking.

  //Cancel any pending animation frames.
  const cancelLoop = useCallback(() =>
  {
    if (frameRef.current !== null)
    {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  //Update React only when the displayed centisecond changes.
  const updateElapsed = useCallback((nextElapsed) =>
  {
    const bucket = Math.floor(nextElapsed / CENTISECOND_MS);

    if (bucket === lastRenderedBucketRef.current)
    {
      return;
    }

    lastRenderedBucketRef.current = bucket;
    setElapsedMs(nextElapsed);
  }, []);

  //Run the display animation only while the stopwatch is active.
  useEffect(() =>
  {
    if (!isRunning)
    {
      cancelLoop();
      return;
    }

    //Animation Loop.
    const tick = () =>
    {
      if (!isRunningRef.current)
      {
        frameRef.current = null;
        return;
      }

      updateElapsed(performance.now() - startTimeRef.current);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return cancelLoop;
  }, [isRunning, cancelLoop, updateElapsed]);

  //Start or pause the stopwatch.
  const toggle = useCallback(() =>
  {
    if (isRunningRef.current)
    {
      const finalElapsed = performance.now() - startTimeRef.current;

      isRunningRef.current = false;
      elapsedRef.current = finalElapsed;
      lastRenderedBucketRef.current = Math.floor(finalElapsed / CENTISECOND_MS);

      cancelLoop();
      setElapsedMs(finalElapsed);
      setIsRunning(false);
      return;
    }

    startTimeRef.current = performance.now() - elapsedRef.current;
    isRunningRef.current = true;
    setIsRunning(true);
  }, [cancelLoop]);

  //Reset elapsed time and stop the animation.
  const reset = useCallback(() =>
  {
    isRunningRef.current = false;
    cancelLoop();

    startTimeRef.current = 0;
    elapsedRef.current = 0;
    lastRenderedBucketRef.current = 0;

    setElapsedMs(0);
    setIsRunning(false);
  }, [cancelLoop]);

  //Read the most accurate available elapsed time.
  const getCurrentTime = useCallback(() =>
  {
    return isRunningRef.current ? performance.now() - startTimeRef.current : elapsedRef.current;
  }, []);

  return {
    time: elapsedMs, //time in milliseconds.
    isRunning,
    toggle,
    reset,
    getCurrentTime,
  };
}

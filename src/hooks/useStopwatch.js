//File name: useStopwatch.js
//Author: Kyle McColgan
//Date: 9 October 2026
//Description: This file contains the stopwatch functions for the stopwatch React project.

import { useEffect, useRef, useState, useCallback } from "react";

const CENTISECOND_MS = 10;

export function useStopwatch()
{
  //Render state (what React sees) (stored in milliseconds).
  //const DEMO_TIME_MS = ((12 * 60 * 60) + (34 * 60) + 56) * 1000;
  //const [elapsedMs, setElapsedMs] = useState(DEMO_TIME_MS);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Timing state remains independent of React render timing.
  const isRunningRef = useRef(false);
  const startTimeRef = useRef(0); //Timestamp when active run began.
  const elapsedRef = useRef(0); //Accumulated elapsed time.
  //const elapsedRef = useRef(DEMO_TIME_MS); //Accumulated elapsed time.
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

  //Update React only when the displayed centisecond changes.
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

  //Animation loop runs only while the stopwatch is active.
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

  //Start and pause without waiting for another animation frame.
  const toggle = useCallback(() =>
  {
    if (isRunningRef.current)
    {
      const finalElapsed = Math.max(0, performance.now() - startTimeRef.current);
      isRunningRef.current = false;
      cancelLoop();

      elapsedRef.current = finalElapsed;
      lastRenderedBucketRef.current = Math.floor(finalElapsed / CENTISECOND_MS);

      setElapsedMs(finalElapsed);
      setIsRunning(false);
      return;
    }

    startTimeRef.current = performance.now() - elapsedRef.current;
    isRunningRef.current = true;
    setIsRunning(true);
  }, [cancelLoop]);

  //Reset timing state and cancel any pending animation frames.
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

  //Read current elapsed time without waiting for a React render.
  const getCurrentTime = useCallback(() =>
  {
    if (!isRunningRef.current)
    {
      return elapsedRef.current;
    }

    return Math.max(0, performance.now() - startTimeRef.current);
  }, []);

  return {
    time: elapsedMs, //time in milliseconds.
    isRunning,
    toggle,
    reset,
    getCurrentTime,
  };
}

// src/hooks/useStopwatch.js
import { useEffect, useState } from "react";

export function useStopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning)
    {
      interval = setInterval(() => {
        setSeconds(prev => (typeof prev === "number" ? prev + 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const reset = () => setSeconds(0);
  const toggle = () => setIsRunning(prev => !prev);

  const format = () => {
    const safeSeconds = isNaN(seconds) ? 0 : seconds;
    const hrs = String(Math.floor(safeSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((safeSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(safeSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return { time: format(),
           seconds,
           isRunning,
           toggle,
           reset
        };
}

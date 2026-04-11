//File name: formatTime.js
//Author: Kyle McColgan
//Date: 8 April 2026
//Description: This file contains a custom formatting helper function built for the stopwatch React project.

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
const MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;

function pad(value, length = 2)
{
    return String(value).padStart(length, "0");
}

export function formatTime(ms, includeCentiseconds = false)
{
    const safeMs = ms > 0 ? Math.floor(ms) : 0;

    //Compute once, then reduce (avoid repeated modulus operations).
    let remaining = safeMs;
    const hours = Math.floor(remaining / MS_PER_HOUR);
    remaining -= hours * MS_PER_HOUR;

    const minutes = Math.floor(remaining / MS_PER_MINUTE);
    remaining -= minutes * MS_PER_MINUTE;

    const seconds = Math.floor(remaining / MS_PER_SECOND);
    remaining -= seconds * MS_PER_SECOND;

    const result = {
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
    };

    if (includeCentiseconds)
    {
        const centiSeconds = Math.floor(remaining / 10);
        result.centiSeconds = pad(centiSeconds);
    }

    return result;
}

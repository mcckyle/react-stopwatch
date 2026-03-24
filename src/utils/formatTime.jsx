//File name: formatTime.js
//Author: Kyle McColgan
//Date: 22 March 2026
//Description: This file contains a custom formatting helper function built for the stopwatch React project.

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
const MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;

function padTimeUnit(value, length = 2)
{
    return String(value).padStart(length, "0");
}

export function formatTime(ms, includeCentiseconds = false)
{
    const safeMs = Math.max(0, Math.floor(ms));

    const hours = Math.floor(safeMs / MS_PER_HOUR);
    const minutes = Math.floor((safeMs % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((safeMs % MS_PER_MINUTE) / MS_PER_SECOND);
    const centiSeconds = Math.floor((safeMs % MS_PER_SECOND) / 10);

    const formattedTime = {
        hours: padTimeUnit(hours),
        minutes: padTimeUnit(minutes),
        seconds: padTimeUnit(seconds),
    };

    if (includeCentiseconds)
    {
        formattedTime.centiSeconds = padTimeUnit(centiSeconds);
    }

    return formattedTime;
}

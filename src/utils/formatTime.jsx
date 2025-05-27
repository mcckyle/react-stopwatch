//File name: formatTime.js
//Author: Kyle McColgan
//Date: 26 May 2025
//Description: This file contains a custom formatting helper function built for the React timer site.

export function formatTime(ms, includeCentiseconds = false)
{
    //const totalCentiSeconds = Math.floor(ms / 10);
    const centiSeconds = Math.floor((ms % 1000) / 10);

    //const totalSeconds = Math.floor(ms / 1000);
    const seconds = Math.floor((ms / 1000) % 60);

    //const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);

    const hours = Math.floor(ms / (1000 * 60 * 60));

    const pad = (num, size = 2) => String(num).padStart(size, "0");

    //return `${pad(minutes)}:${pad(seconds)}.${pad(centiSeconds)}`;

    const formatted = {
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
    };

    // return {
    //     hours: pad(hours),
    //     minutes: pad(minutes),
    //     seconds: pad(seconds),
    //     centiSeconds: pad(centiSeconds),
    // };

    if (includeCentiseconds)
    {
        formatted.centiSeconds = pad(centiSeconds);
    }

    return formatted;
}

//src/utils/formatTime.js

export function formatTime(ms, includeCentiseconds = false)
{
    const totalCentiSeconds = Math.floor(ms / 10);
    const centiSeconds = totalCentiSeconds % 100;
    const totalSeconds = Math.floor(totalCentiSeconds / 100);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

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

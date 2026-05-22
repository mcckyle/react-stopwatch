//File name: lapHelpers.jsx
//Author: Kyle McColgan
//Date: 22 May 2026
//Description: This file contains a lap helper functions built for the stopwatch React project.

const LAP_STORAGE_KEY = "stopwatch-app-laps"; //Key for browser localStorage.

export function loadStoredLaps()
{
    try
    {
        const savedLaps = localStorage.getItem(LAP_STORAGE_KEY);
        const parsedLaps = savedLaps ? JSON.parse(savedLaps) : [];
        return Array.isArray(parsedLaps) ? parsedLaps : [];
    }
    catch
    {
        console.warn("Unable to restore saved laps!");
        return [];
    }
}
export function persistLaps(laps)
{
    try
    {
        localStorage.setItem(LAP_STORAGE_KEY, JSON.stringify(laps));
    }
    catch
    {
        console.warn("Unable to persist laps!");
    }
}

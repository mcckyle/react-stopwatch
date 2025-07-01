//File name: clock.js
//Author: Kyle McColgan
//Date: 30 June 2025
//Description: This file contains a helper function for the Analog clock view.

export const getChicagoParts = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }).formatToParts(new Date());

    const h = +parts.find(p => p.type === "hour").value;
    const m = +parts.find(p => p.type === "minute").value;
    const s = +parts.find(p => p.type === "second").value;
    return { h, m, s };
}

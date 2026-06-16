//File name: setUpTests.js
//Author: Kyle McColgan
//Date: 16 June 2026
//Description: This file contains the Vite configuration for the stopwatch React project.

import '@testing-library/jest-dom';

// Polyfill for matchMedia() in Vitest.
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false, //Defaults to light mode theme.
            media: query,
            onchange: null,
            addListener: vi.fn(), //deprecated, but neccessary for some libraries.
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

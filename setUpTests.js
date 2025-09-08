//src/setupTests.js
import '@testing-library/jest-dom';

// Polyfill for matchMedia() in Jest.
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false, //Defaults to light mode theme.
            media: query,
            onchange: null,
            addListener: jest.fn(), //deprecated, but neccessary for some libraries.
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

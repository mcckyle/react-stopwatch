//File name: useStopwatch.test.jsx
//Author: Kyle McColgan
//Date: 22 April 2026
//Description: This file contains unit tests for the useStopwatch hook.

import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useStopwatch } from "../hooks/useStopwatch";

describe("useStopwatch", () => {
    let currentTime = 0;
    let rafCallbacks;
    let rafId;

    jest.spyOn(performance, "now").mockImplementation(() => currentTime);

    beforeEach(() => {
        currentTime = 0;
        rafCallbacks = new Map();
        rafId = 0;

        jest.spyOn(performance, "now").mockImplementation(() => currentTime);

        global.requestAnimationFrame = jest.fn((callback) =>
        {
            const id = ++rafId;
            rafCallbacks.set(id, callback);
            return id;
        });

        global.cancelAnimationFrame = jest.fn((id) =>
        {
            rafCallbacks.delete(id);
        });
    });

    afterEach(() =>
    {
        jest.restoreAllMocks();
        rafCallbacks.clear();
    });

    function advanceFrame(time)
    {
        currentTime = time;

        const callbacks = [...rafCallbacks.entries()];
        rafCallbacks.clear();

        callbacks.forEach(([id, callback]) =>
        {
            callback(time);
        });
    }

    //Test #1: Initial State.
    test("1. initializes with zero time and stopped state.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        expect(result.current.time).toBe(0);
        expect(result.current.isRunning).toBe(false);
    });

    //Test #2: Start / Toggle.
    test("2. starts running when toggled.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        expect(result.current.isRunning).toBe(true);
        expect(requestAnimationFrame).toHaveBeenCalled();
    });

    //Test #3: Elapsed time updates.
    test("3. updates elapsed time while running.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        act(() =>
        {
            advanceFrame(25);
        });

        expect(result.current.time).toBeGreaterThanOrEqual(25);
    });

    //Test #4: Pauses.
    test("4. pauses and preserves elapsed time.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        act(() =>
        {
            advanceFrame(50);
        });

        const pausedTime = result.current.time;

        act(() =>
        {
            result.current.toggle();
        });

        act(() =>
        {
            advanceFrame(150);
        });

        expect(result.current.isRunning).toBe(false);
        expect(result.current.time).toBe(pausedTime);
    });

    //Test #5: Resumes.
    test("5. resumes from paused elapsed time.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        act(() =>
        {
            advanceFrame(80);
        });

        act(() =>
        {
            result.current.toggle();
        });

        const pausedTime = result.current.time;

        act(() =>
        {
            result.current.toggle();
        });

        act(() =>
        {
            advanceFrame(140);
        });

        expect(result.current.time).toBeGreaterThan(pausedTime);
    });

    //Test #6: Resets.
    test("6. resets time and stops running.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        act(() =>
        {
            advanceFrame(100);
        });

        act(() =>
        {
            result.current.reset();
        });

        expect(result.current.time).toBe(0);
        expect(result.current.isRunning).toBe(false);
    });

    //Test #7: RAF Cleanup.
    test("7. cancels animation frame on reset.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        expect(requestAnimationFrame).toHaveBeenCalled();

        act(() =>
        {
            result.current.reset();
        });

        expect(cancelAnimationFrame).toHaveBeenCalled();
    });

    //Test #8: Unmount Cleanup.
    test("8. cancels animation frame on unmount.", () =>
    {
        const { result, unmount } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        unmount();

        expect(cancelAnimationFrame).toHaveBeenCalled();
    });

    //Test #9: Precise time access.
    test("9. getCurrentTime() returns precise running time.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        currentTime = 135;

        const preciseTime = result.current.getCurrentTime();

        expect(preciseTime).toBeGreaterThanOrEqual(135);
    });

    //Test #10: Display Precision Bucketing.
    test("10. does not update rendered time within the same precision bucket.", () =>
    {
        const { result } = renderHook(() => useStopwatch());

        act(() =>
        {
            result.current.toggle();
        });

        act(() =>
        {
            advanceFrame(11);
        });

        const firstRenderTime = result.current.time;

        act(() =>
        {
            advanceFrame(15);
        });

        expect(result.current.time).toBe(firstRenderTime);
    });
});

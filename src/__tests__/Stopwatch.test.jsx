//File name: Stopwatch.test.jsx
//Author: Kyle McColgan
//Date: 4 February 2026
//Description: This file contains the unit test suite for the Stopwatch component.

import React from "react";
import { render, screen } from "../test/test-utils";
import { fireEvent, act } from "@testing-library/react";
import Stopwatch from "../components/Stopwatch/Stopwatch.jsx";
import * as useStopWatchModule from "../hooks/useStopwatch";
import * as useKeyboardShortcutsModule from "../hooks/useKeyboardShortcuts";

// Mock hooks
jest.mock("../hooks/useStopwatch");
jest.mock("../hooks/useKeyboardShortcuts");

describe("Stopwatch Component", () => {
    const mockToggle = jest.fn();
    const mockReset = jest.fn();
    const mockGetCurrentTime = jest.fn(() => 1);

    beforeEach(() => {
        useStopWatchModule.useStopwatch.mockReturnValue({
            time: 0,
            isRunning: false,
            toggle: mockToggle,
            reset: mockReset,
            getCurrentTime: mockGetCurrentTime,
        });

        useKeyboardShortcutsModule.useKeyboardShortcuts.mockImplementation(() => {});
        jest.clearAllMocks();
    });

    //Test #1
    test("1. Renders title.", () => {
        render(<Stopwatch />);
        expect(screen.getByText("Stopwatch")).toBeInTheDocument();
    });

    //Test #2
    test("2. Renders the StopwatchDisplay component with initial time.", () => {
        render(<Stopwatch />);

        const timer = screen.getByRole("timer");

        expect(timer).toHaveTextContent("00:00:00");
    });

    //Test #3
    test("3. Renders the StopwatchControls component.", () => {
        render(<Stopwatch />);
        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    });

    //Test #4
    test("4. Renders LapList with no laps.", () => {
        render(<Stopwatch />);
        expect(screen.queryByText("00:00:01")).not.toBeInTheDocument();
    });

    //Test #5
    test("5. Records a lap and renders it.", () => {

        useStopWatchModule.useStopwatch.mockReturnValue({
            time: 1000, //One second.
            isRunning: true, //Enable the Lap button.
            toggle: jest.fn(),
            reset: jest.fn(),
            getCurrentTime: jest.fn(() => 1000),
        });

        render(<Stopwatch />);
        const lapButton = screen.getByRole("button", { name: /lap/i});
        fireEvent.click(lapButton);

        const matches = screen.getAllByText(/00:01\.00/);
        expect(matches.length).toBeGreaterThan(0);
    });

    //Test #6
    test("6. Calls toggle when Start/Stop gets clicked.", () => {
        render(<Stopwatch />);
        fireEvent.click(screen.getByRole("button", { name: /start/i}));
        expect(mockToggle).toHaveBeenCalled();
    });

    //Test #7
    test("7. Calls Reset when Reset gets clicked.", () => {
        render(<Stopwatch />);
        fireEvent.click(screen.getByRole("button", { name: /reset/i}));
        expect(mockReset).toHaveBeenCalled();
    });

    //Test #8
    test("8. Opens HelpModal when showHelp gets triggered manually", () => {
        let helpCallback;

        useKeyboardShortcutsModule.useKeyboardShortcuts.mockImplementation(({ onOpenHelp }) => {
            helpCallback = onOpenHelp;
        });

        render(<Stopwatch />);

        act(() => {
            helpCallback(); //Manually trigger onOpenHelp().
        });

        const modal = screen.getByText(/keyboard shortcuts/i);
        expect(modal).toBeInTheDocument();
    });

    //Test #9
    test("9. HelpModal appears when showHelp gets triggered manually.", () => {
        let helpCallback;

        //Capture the onOpenHelp callback from the mock.
        useKeyboardShortcutsModule.useKeyboardShortcuts.mockImplementation(({ onOpenHelp }) => {
            helpCallback = onOpenHelp;
        });

        render(<Stopwatch />);

        //Wrap the state update in 'act' so React will process and flush the render update before assertions.
        act(() => {
            helpCallback();
        });

        //Help modal should appear...
        expect(screen.queryByText(/keyboard shortcuts/i)).not.toBeNull();
    });

    //Test #10
    test("10. HelpModal closes when Close is clicked.", () => {
        let helpCallback;

        //Capture the onOpenHelp callback from the mock.
        useKeyboardShortcutsModule.useKeyboardShortcuts.mockImplementation(({ onOpenHelp }) => {
            helpCallback = onOpenHelp;
        });

        render(<Stopwatch />);

        //Open the HelpModal component manually via the captured callback.
        act(() => {
            helpCallback();
        });

        //Help modal should appear...
        expect(screen.queryByText(/keyboard shortcuts/i)).toBeInTheDocument();

        //Click the close button...
        fireEvent.click(screen.getByRole("button", { name: /close/i }));

        //The HelpModal should no longer appear.
        expect(screen.queryByText(/keyboard shortcuts/i)).not.toBeInTheDocument();
    });
});

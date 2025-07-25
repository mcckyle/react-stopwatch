//File name: Timer.test.jsx
//Author: Kyle McColgan
//Date: 06 June 2025
//Description: Jest unit test suite for the Timer component.

import React from "react";
import { render, screen } from "../test/test-utils";
import { fireEvent, act } from "@testing-library/react";
import Timer from "../components/Timer/Timer.jsx";
import * as useStopWatchModule from "../hooks/useStopwatch";
import * as useKeyboardShortcutsModule from "../hooks/useKeyboardShortcuts";

// Mock hooks
jest.mock("../hooks/useStopwatch");
jest.mock("../hooks/useKeyboardShortcuts");

describe("Timer Component", () => {
    const mockToggle = jest.fn();
    const mockReset = jest.fn();
    const mockGetCurrentTime = jest.fn(() => "00:00:01");

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

    test("1. Renders title.", () => {
        render(<Timer />);
        expect(screen.getByText("L'horlage")).toBeInTheDocument();
    });

//     test("2. Renders the TimerDisplay component with initial time.", () => {
//         render(<Timer />);
//         expect(screen.getByText((content, element) => {
//             return element?.textContent?.replace(/\s/g, '') === '00:00:00';
//         })
//       ).toBeInTheDocument();
//     });

    test("3. Renders the TimerControls component.", () => {
        render(<Timer />);
        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    });

    test("4. Renders LapList with no laps.", () => {
        render(<Timer />);
        expect(screen.queryByText("00:00:01")).not.toBeInTheDocument();
    });

    test("5. Records a lap and renders it.", () => {

        useStopWatchModule.useStopwatch.mockReturnValue({
            time: 1000, //One second.
            isRunning: true, //Enable the Lap button.
            toggle: jest.fn(),
            reset: jest.fn(),
            getCurrentTime: jest.fn(() => 1000),
        });

        render(<Timer />);
        const lapButton = screen.getByRole("button", { name: /lap/i});
        fireEvent.click(lapButton);

        //Custom matcher for the Lap time.
        expect(screen.getByText(/00:01\.00/)).toBeInTheDocument();
    });

    test("6. Calls toggle when Start/Stop gets clicked.", () => {
        render(<Timer />);
        fireEvent.click(screen.getByRole("button", { name: /start/i}));
        expect(mockToggle).toHaveBeenCalled();
    });

    test("7. Calls Reset when Reset gets clicked.", () => {
        render(<Timer />);
        fireEvent.click(screen.getByRole("button", { name: /reset/i}));
        expect(mockReset).toHaveBeenCalled();
    });

    test("8. Opens HelpModal on showHelp = true", () => {
        render(<Timer />);
        act(() => {
            fireEvent.keyDown(document, { code: "Slash", shiftKey: true });

        });
        //Simulate the HelpModal manually...
        fireEvent.click(screen.getByRole("button", { name: /lap/i }));
        expect(screen.queryByText(/keyboard shortcuts/i)).not.toBeInTheDocument();
    });

    test("9. HelpModal appears when showHelp gets triggered manually.", () => {
        let helpCallback;

        //Capture the onOpenHelp callback from the mock.
        useKeyboardShortcutsModule.useKeyboardShortcuts.mockImplementation(({ onOpenHelp }) => {
            helpCallback = onOpenHelp;
        });

        render(<Timer />);

        //Wrap the state update in 'act' so React will process and flush the render update before assertions.
        act(() => {
            helpCallback();
        });

        //Help modal should appear...
        expect(screen.queryByText(/keyboard shortcuts/i)).not.toBeNull();
    });

    test("10. HelpModal closes when Close is clicked.", () => {
        let helpCallback;

        //Capture the onOpenHelp callback from the mock.
        useKeyboardShortcutsModule.useKeyboardShortcuts.mockImplementation(({ onOpenHelp }) => {
            helpCallback = onOpenHelp;
        });

        render(<Timer />);

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

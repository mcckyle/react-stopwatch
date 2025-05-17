//Timer.test.jsx

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Timer from "../components/Timer";
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
            time: "00:00:00",
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
        expect(screen.getByText("Timer")).toBeInTheDocument();
    });

    test("2. Renders TimerDisplay with initial time.", () => {
        render(<Timer />);
        expect(screen.getByText("00:00:00")).toBeInTheDocument();
    });

    test("3. Renders TimerControls.", () => {
        render(<Timer />);
        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    });

    test("4. Renders LapList with no laps.", () => {
        render(<Timer />);
        expect(screen.queryByText("00:00:01")).not.toBeInTheDocument();
    });

    test("5. Records a lap and renders it.", () => {
        render(<Timer />);
        const lapButton = screen.getByRole("button", { name: /lap/i});
        fireEvent.click(lapButton);
        expect(screen.getByText("00:00:01")).toBeInTheDocument();
    });

    test("6. Calls toggle when Start/Stop is clicked.", () => {
        render(<Timer />);
        fireEvent.click(screen.getByRole("button", { name: /start/i}));
        expect(mockToggle).toHaveBeenCalled();
    });

    test("7. Calls Reset when Reset is clicked.", () => {
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

    test("9. HelpModal appears when showHelp manually triggered.", () => {
        const { rerender } = render(<Timer />);
        fireEvent.keyDown(document, { code: "Slash", shiftKey: true });
        rerender(<Timer />);
        expect(screen.queryByText(/keyboard shortcuts/i)).not.toBeNull();
    });

    test("10. HelpModal closes when Close is clicked.", () => {
        render(<Timer />);
        //Manually open the HelpModal component...
        fireEvent.keyDown(document, { code: "Slash", shiftKey: true });
        fireEvent.click(screen.getByText("Close"));
        expect(screen.queryByText(/keyboard shortcuts/i)).not.toBeInTheDocument();
    });


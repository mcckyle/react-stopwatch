//File name: StopwatchControls.test.jsx
//Author: Kyle McColgan
//Date: 16 June 2026
//Description: This file contains the unit test suite for the StopwatchControls component.

import React from "react";
import { beforeAll, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StopwatchControls from "../components/StopwatchControls/StopwatchControls.jsx";

//Mock Mantine and Framer Motion to simplify the animation behavior for testing purposes.
vi.mock("@mantine/core", () => ({
    Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

describe("StopwatchControls Component", () => {
    const mockToggle = vi.fn();
    const mockReset = vi.fn();
    const mockRecordLap = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    //Test #1: Rendering - Renders all the control buttons.
    test("renders the Start, Lap, and Reset buttons", () => {
        render(
            <StopwatchControls
              isRunning={false}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /lap/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    });

    //Test #2: Displays 'Pause' when running.
    test("displays 'Pause' when the timer is running", () => {
        render(
            <StopwatchControls
              isRunning={true}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(screen.queryByRole("button", { name: /start/i })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
    });

    //Test #3: Toggles the stopwatch when Start/Paused is clicked.
    test("calls toggle when Start or Pause button is clicked", () => {
        render(
            <StopwatchControls
              isRunning={false}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /start/i }));
        expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    //Test #4: Calls reset when Reset is clicked.
    test("calls reset when Reset button is clicked", () => {
        render(
            <StopwatchControls
              isRunning={true}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /reset/i }));
        expect(mockReset).toHaveBeenCalledTimes(1);
    });

    //Test #5: Calls recordLap when Lap is clicked.
    test("calls recordLap when Lap button is clicked", () => {
        render(
            <StopwatchControls
              isRunning={true}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /lap/i }));
        expect(mockRecordLap).toHaveBeenCalledTimes(1);
    });

    //Test #6: Disables Lap button when not running.
    test("disables Lap button when isRunning is false", () => {
        render(
            <StopwatchControls
              isRunning={false}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /lap/i }));
        expect(screen.getByRole("button", { name: /lap/i })).toBeDisabled();
    });

    //Test #7: Enables Lap button when running.
    test("enables Lap button when isRunning is true", () => {
        render(
            <StopwatchControls
              isRunning={true}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(screen.getByRole("button", { name: /lap/i })).not.toBeDisabled();
    });

    //Test #8: Snapshot for consistent button layout.
    test("enables Lap button when isRunning is true", () => {
        const { asFragment } = render(
            <StopwatchControls
              isRunning={false}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    //Test #9: Displays 'Start' when the stopwatch is not running.
    test("displays 'Start' when the timer is not running", () => {
        render(
            <StopwatchControls
              isRunning={false}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /pause/i })).not.toBeInTheDocument();
    });

    //Test #10: Regression - Snapshot for layout consistency.
    test("matches snapshot", () => {
        const { asFragment } = render(<StopwatchControls/>);
        expect(asFragment()).toMatchSnapshot();
    });
});

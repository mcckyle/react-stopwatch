//File name: TimerControls.test.jsx
//Author: Kyle McColgan
//Date: 15 October 2025
//Description: This file contains the unit test suite for the TimerControls component.

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimerControls from "../components/TimerControls/TimerControls.jsx";

//Mock Mantine and Framer Motion to simplify the animation behavior for testing purposes.
jest.mock("@mantine/core", () => ({
    Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

jest.mock("motion/react", () => {
    const motion = {
        create:
          (Component) =>
            ({ whileHover, whileTap, transition, ...props }) =>
            <Component {...props}>{props.children}</Component>,
    };

    return { motion };
});

//Mock the ThemeContext.jsx
jest.mock("../context/ThemeContext.jsx", () => ({
    useTheme: jest.fn(),
}));

import { useTheme } from "../context/ThemeContext.jsx";

describe("TimerControls Component", () => {
    const mockToggle = jest.fn();
    const mockReset = jest.fn();
    const mockRecordLap = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useTheme.mockReturnValue({ theme: "light" });
    });

    //Test #1: Rendering - Renders all the control buttons.
    test("renders the Start, Lap, and Reset buttons", () => {
        render(
            <TimerControls
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
            <TimerControls
              isRunning={true}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
    });

    //Test #3: Toggles the timer when Start/Paused is clicked.
    test("calls toggle when Start or Pause button is clicked", () => {
        render(
            <TimerControls
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
            <TimerControls
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
            <TimerControls
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
            <TimerControls
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
            <TimerControls
              isRunning={true}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(screen.getByRole("button", { name: /lap/i })).not.toBeDisabled();
    });

    //Test #8: Applies theme from context.
    test("applies theme class from ThemeContext", () => {
        useTheme.mockReturnValue({ theme: "dark" });
        const { container } = render(
            <TimerControls
              isRunning={false}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(container.firstChild.className).toContain("dark");
    });

    //Test #9: Renders children if provided.
    test("renders children elements if passed", () => {
        render(
            <TimerControls
              isRunning={false}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            >
              <p data-testid="child-element">Extra</p>
            </TimerControls>
        );

        expect(screen.getByTestId("child-element")).toBeInTheDocument();
    });

    //Test #10: Snapshot for consistent button layout.
    test("enables Lap button when isRunning is true", () => {
        const { asFragment } = render(
            <TimerControls
              isRunning={false}
              toggle={mockToggle}
              reset={mockReset}
              recordLap={mockRecordLap}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});

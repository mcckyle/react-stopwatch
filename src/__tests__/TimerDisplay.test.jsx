//File name: TimerDisplay.test.jsx
//Author: Kyle McColgan
//Date: 15 October 2025
//Description: This file contains the unit test suite for the TimerDisplay component.

import React from "react";
import { render, screen } from "../test/test-utils";
import TimerDisplay from "../components/TimerDisplay/TimerDisplay.jsx";
import * as formatTimeModule from "../utils/formatTime";

//Mock the AnimatedDigit component.
jest.mock("../components/AnimatedDigit/AnimatedDigit.jsx", () => ({ value }) => (
    <span data-testid="digit">{value}</span>
));

describe("TimerDisplay Component", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    //Test #1: Sanity - ensures the component renders without crashing adn includes role="timer".
    test("1. renders without crashing", () => {
        render(<TimerDisplay time={0} />);
        expect(screen.getByRole("timer")).toBeInTheDocument();
    });

    //Test #2: Logic correctness - confirms formatTime() is called with the correct prop.
    test("2. calls formatTime with the correct time prop", () => {
        const spy = jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "00",
            minutes: "00",
            seconds: "00",
        });

        render(<TimerDisplay time={1234} />);
        expect(spy).toHaveBeenCalledWith(1234);
    });

    //Test #3: Structure - verifies total digit count = 6 (hhmmss).
    test("3. renders the correct number of AnimatedDigit elements", () => {
        jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "12",
            minutes: "34",
            seconds: "56",
        });

        render(<TimerDisplay time={123456} />);
        const digits = screen.getAllByTestId("digit");
        expect(digits).toHaveLength(6); //2 for hour, + 2 for minutes, + 2 for seconds.
    });

    //Test #4: Content integrity - checks the exact sequence of rendered digits.
    test("4. displays the correct sequence of digits", () => {
        const spy = jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "09",
            minutes: "45",
            seconds: "33",
        });

        render(<TimerDisplay time={98765} />);
        expect(screen.getAllByTestId("digit").map((d) => d.textContent).join("")).toBe("094533");
    });

    //Test #5: Layout - ensures exactly two colons separate the time segments.
    test("5. renders exactly two colon separators", () => {
        render(<TimerDisplay time={1000} />);
        const separators = screen.getAllByText(":");
        expect(separators).toHaveLength(2);
    });

    //Test #6: Accessibility - validates aria-live="polite" for assistive tech compatability.
    test("6. uses aria-live=polite and role=timer for accessibility", () => {
        render(<TimerDisplay time={0} />);
        const timer = screen.getByRole("timer");
        expect(timer).toHaveAttribute("aria-live", "polite");
    });

    //Test #7: Type safety - ensures the digits rendered are numeric values.
    test("7. each AnimatedDigit receives a numeric value", () => {
        jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "01",
            minutes: "02",
            seconds: "03",
        });

        render(<TimerDisplay time={0} />);
        const digits = screen.getAllByTestId("digit");
        digits.forEach((d) => {
            expect(!isNaN(Number(d.textContent))).toBe(true);
        })
    });

    //Test #8: Leading zero handling - confirms consistent digit count event with "00" and "09".
    test("8. maintains consistent digit count even when values have leading zeros", () => {
        const spy = jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "00",
            minutes: "09",
            seconds: "05",
        });

        render(<TimerDisplay time={0} />);
        expect(screen.getAllByTestId("digit")).toHaveLength(6);
    });

    //Test #9: Semantic correctness - checks that time data lives inside a <time> tag.
    test("9. renders digits inside a <time> element with the proper class", () => {
        render(<TimerDisplay time={0} />);
        const timeElement = screen.getByRole("timer");
        expect(timeElement.tagName.toLowerCase()).toBe("time");
        expect(timeElement.className).toContain("time");
    });

    //Test #10: React reactivity - ensures the UI updates correctly when the time prop changes values.
    test("10. correctly updates when the time changes", () => {
        const { rerender } = render(<TimerDisplay time={5000} />);
        const firstRenderDigits = screen.getAllByTestId("digit").map((d) => d.textContent).join("");
        rerender(<TimerDisplay time={10000} />);
        const secondRenderDigits = screen.getAllByTestId("digit").map((d) => d.textContent).join("");

        expect(firstRenderDigits).not.toEqual(secondRenderDigits);
    });
});

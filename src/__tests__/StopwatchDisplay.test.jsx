//File name: StopwatchDisplay.test.jsx
//Author: Kyle McColgan
//Date: 3 March 2026
//Description: This file contains the unit test suite for the StopwatchDisplay component.

import React from "react";
import { render, screen } from "../test/test-utils";
import StopwatchDisplay from "../components/StopwatchDisplay/StopwatchDisplay.jsx";
import * as formatTimeModule from "../utils/formatTime";

//Mock the AnimatedDigit component.
jest.mock("../components/AnimatedDigit/AnimatedDigit.jsx", () => ({ value }) => (
    <span data-testid="digit">{value}</span>
));

describe("StopwatchDisplay Component", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    //Test #1: Sanity - ensures the component renders without crashing adn includes role="timer".
    test("1. renders without crashing", () => {
        render(<StopwatchDisplay time={0} />);
        expect(screen.getByRole("timer")).toBeInTheDocument();
    });

    //Test #2: Logic correctness - confirms formatTime() is called with the correct prop.
    test("2. calls formatTime with the correct time prop", () => {
        const spy = jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "00",
            minutes: "00",
            seconds: "00",
            centiSeconds: "00",
        });

        render(<StopwatchDisplay time={1234} />);
        expect(spy).toHaveBeenCalledWith(1234, true);
    });

    //Test #3: Structure - verifies total digit count = 6 (hhmmss).
    test("3. renders the correct number of digits, including centiseconds", () => {
        jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "12",
            minutes: "34",
            seconds: "56",
            centiSeconds: "78",
        });

        render(<StopwatchDisplay time={123456} />);
        const digits = screen.getAllByTestId("digit");
        expect(digits).toHaveLength(8); //hh mm ss cs
    });

    //Test #4: Content integrity - checks the exact sequence of rendered digits.
    test("4. displays the correct sequence of digits", () => {
        const spy = jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "09",
            minutes: "45",
            seconds: "33",
            centiSeconds: "21",
        });

        render(<StopwatchDisplay time={98765} />);
        expect(screen.getAllByTestId("digit").map((d) => d.textContent).join("")).toBe("09453321");
    });

    //Test #5: Layout - ensures exactly one colon to separate the time segments.
    test("5. renders exactly one colon separator (before hours are rendered)", () => {
        render(<StopwatchDisplay time={1000} />);
        const separators = screen.getAllByText(":");
        expect(separators).toHaveLength(1);
    });

    //Test #6: Accessibility - validates aria-live="polite" for assistive tech compatability.
    test("6. uses aria-live=polite and role=timer for accessibility", () => {
        render(<StopwatchDisplay time={0} />);
        const timer = screen.getByRole("timer");
        expect(timer).toHaveAttribute("aria-live", "polite");
    });

    //Test #7: Type safety - ensures the digits rendered are numeric values.
    test("7. each AnimatedDigit receives a numeric value", () => {
        jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "01",
            minutes: "02",
            seconds: "03",
            centiSeconds: "04",
        });

        render(<StopwatchDisplay time={0} />);
        const digits = screen.getAllByTestId("digit");
        digits.forEach((d) => {
            expect(!isNaN(Number(d.textContent))).toBe(true);
        })
    });

    //Test #8: Leading zero handling - confirms consistent digit count event with "00" and "09".
    test("8. maintains consistent digit count with leading zeros", () => {
        const spy = jest.spyOn(formatTimeModule, "formatTime").mockReturnValue({
            hours: "00",
            minutes: "09",
            seconds: "05",
            centiSeconds: "01",
        });

        render(<StopwatchDisplay time={0} />);
        expect(screen.getAllByTestId("digit")).toHaveLength(6);
    });

    //Test #9: Semantic correctness - checks that time data lives inside a <time> tag.
    test("9. renders digits inside a <time> element with the proper class", () => {
        render(<StopwatchDisplay time={0} />);
        const timeElement = screen.getByRole("timer");
        expect(timeElement.tagName.toLowerCase()).toBe("time");
        expect(timeElement.className).toContain("time");
    });

    //Test #10: React reactivity - ensures the UI updates correctly when the time prop changes values.
    test("10. correctly updates when the time changes", () => {
        const { rerender } = render(<StopwatchDisplay time={5000} />);
        const firstRenderDigits = screen.getAllByTestId("digit").map((d) => d.textContent).join("");
        rerender(<StopwatchDisplay time={10000} />);
        const secondRenderDigits = screen.getAllByTestId("digit").map((d) => d.textContent).join("");

        expect(firstRenderDigits).not.toEqual(secondRenderDigits);
    });
});

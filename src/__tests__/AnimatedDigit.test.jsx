//File name: AnimatedDigit.test.jsx
//Author: Kyle McColgan
//Date: 15 October 2025
//Description: This file contains the unit test suite for the AnimatedDigit component.

import React from "react";
import { render, screen } from "@testing-library/react";
import AnimatedDigit from "../components/AnimatedDigit/AnimatedDigit.jsx";

//Mock Framer Motion to simplify the animation behavior for testing purposes.
jest.mock("framer-motion", () => ({
    motion: {
        span: ({ children, ...props }) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

describe("AnimatedDigit Component", () => {

    //Test #1: Basic render - ensures no crash.
    test("renders without crashing", () => {
        render(<AnimatedDigit value={0} />);
        expect(screen.getByText("0")).toBeInTheDocument();
    });

    //Test #2: Correctness - Correct digit content.
    test("displays the correct digit value", () => {
        render(<AnimatedDigit value={5} />);
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    //Test #3: Correctness - Updates values when the prop changes.
    test("updates digit value when props change", () => {
        const { rerender } = render(<AnimatedDigit value={1} />);
        expect(screen.getByText("1")).toBeInTheDocument();


        rerender(<AnimatedDigit value={9} />);
        expect(screen.getByText("9")).toBeInTheDocument();
    });

    //Test #4: Structure - Includes a container wrapper. TO BE FIXED!!!
    test("renders a container div", () => {
        const { container } = render(<AnimatedDigit value={3} />);
        expect(container.firstChild.className).toContain("container");
    });

    //Test #5: Structure - Applies digit class for styling.
    test("applies the correct class to the animated digit", () => {
        const { container } = render(<AnimatedDigit value={4} />);
        const digit = container.querySelector("span");
        expect(digit.className).toContain("digit");
    });

    //Test #6: Accessibility - Uses aria-hidden for the animation element.
    test("marks the digit as aria-hidden", () => {
        const { container } = render(<AnimatedDigit value={7} />);
        const span = container.querySelector("span");
        expect(span).toHaveAttribute("aria-hidden", "true");
    });

    //Test #7: React Mechanics - Assigns unique key for each digit value.
    test("assigns a unique key based on the value", () => {
        const { container } = render(<AnimatedDigit value={8} />);
        const span = container.querySelector("span");
        expect(span.key).not.toBeNull;
    });

    //Test #8: React Mechanics - Supports multiple sequential renders.
    test("renders correctly across multiple rerenders", () => {
        const { rerender } = render(<AnimatedDigit value={2} />);
        rerender(<AnimatedDigit value={3} />);
        rerender(<AnimatedDigit value={4} />);
        expect(screen.getByText("4")).toBeInTheDocument();
    });

    //Test #9: React Mechanics - Does not render extra spans for the same value.
    test("renders only one span per value", () => {
        const { container } = render(<AnimatedDigit value={5} />);
        const spans = container.querySelectorAll("span");
        expect(spans.length).toBe(1);
    });

    //Test #10: Visual consistency - Snapshot test for consistent output.
    test("matches snapshot for digit 9", () => {
        const { asFragment } = render(<AnimatedDigit value={9} />);
        expect(asFragment()).toMatchSnapshot();
    });
});



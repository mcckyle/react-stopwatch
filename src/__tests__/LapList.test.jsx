//File name: LapList.test.jsx
//Author: Kyle McColgan
//Date: 15 October 2025
//Description: This file contains the unit test suite for the LapList component.

import React from "react";
import { render, screen } from "@testing-library/react";
import LapList from "../components/LapList/LapList.jsx";

//Mock Framer Motion and dependencies to simplify the animation behavior for testing purposes.
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

//Mock the ThemeContext.jsx
jest.mock("../context/ThemeContext.jsx", () => ({
    useTheme: jest.fn(),
}));

jest.mock("../utils/formatTime", () => ({
    formatTime: jest.fn(),
}));

import { useTheme } from "../context/ThemeContext.jsx";
import { formatTime } from "../utils/formatTime";

describe("LapList Component", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        useTheme.mockReturnValue({ theme: "dark" });
        formatTime.mockImplementation((time, includeCenti) => ({
            hours: "00",
            minutes: "01",
            seconds: "23",
            centiSeconds: "45",
        }));
    });

    //Test #1: Rendering - Renders nothing when there are no laps.
    test("returns null when the laps array is empty", () => {
        const { container } = render(<LapList laps={[]} />);
        expect(container.firstChild).toBeNull();
    });

    //Test #2: Rendering - Renders the correct number of laps.
    test("returns one div per lap entry", () => {
        render(<LapList laps={[1000, 800, 400]} />);
        expect(screen.getAllByText(/Lap/i)).toHaveLength(3);
    });

    //Test #3: Context - Applies the theme class from the context.
    test("applies the theme class to the container", () => {
        const { container } = render(<LapList laps={[1000]} />);
        expect(container.firstChild.className).toContain("dark");
    });

    //Test #4: Data Logic - Displays the lap numbers in reverse order.
    test("renders laps in reverse order (Lap 3 first)", () => {
        render(<LapList laps={[1000, 800, 400]} />);
        const labels = screen.getAllByText(/Lap/i).map(element => element.textContent);
        expect(labels).toEqual(["Lap 3", "Lap 2", "Lap 1"]);
    });

    //Test #5: Function Calls - Calls formatTime correctly for each lap and delta.
    test("calls formatTime with correct arguments for laps", () => {
        render(<LapList laps={[1000, 800, 400]} />);
        expect(formatTime).toHaveBeenCalled();
        //Should be called for lap times AND deltas.
        expect(formatTime).toHaveBeenCalledWith(expect.any(Number), true);
    });

    //Test #6: Display - Displays the formatted lap time correctly.
    test("displays the formatted lap time string", () => {
        render(<LapList laps={[1000]} />);
        expect(screen.getByText("01:23.45")).toBeInTheDocument();
    });


    //Test #7: Display - Displays the formatted delta correctly.
    test("displays formatted delta time with '+' prefix", () => {
        render(<LapList laps={[1000]} />);
        expect(screen.getByText("+01:23.45")).toBeInTheDocument();
    });

    //Test #8: Logic - Highlights the fastest lap.
    test("applies fastest class to lap with smallest delta", () => {
        render(<LapList laps={[1000, 900, 800]} />);

        const lapDivs = screen.getAllByText(/Lap/i).map(lap => lap.parentElement);
        const fastestLap = lapDivs.find(div => div.className.includes("fastest"));

        expect(fastestLap).toBeTruthy();
    });

    //Test #9: Logic - Highlights the slowest lap.
    test("applies slowest class to lap with largest delta", () => {
        render(<LapList laps={[1000, 950, 600]} />);

        const lapDivs = screen.getAllByText(/Lap/i).map(lap => lap.parentElement);
        const slowestLap = lapDivs.find(div => div.className.includes("slowest"));

        expect(slowestLap).toBeTruthy();
    });

    //Test #10: Regression - Snapshot for layout consistency.
    test("matches snapshot", () => {
        const { asFragment } = render(<LapList laps={[1000, 800, 400]} />);
        expect(asFragment()).toMatchSnapshot();
    });
});

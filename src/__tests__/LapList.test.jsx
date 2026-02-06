//File name: LapList.test.jsx
//Author: Kyle McColgan
//Date: 4 February 2026
//Description: This file contains the unit test suite for the LapList component.

import React from "react";
import { render, screen, within } from "@testing-library/react";
import LapList from "../components/LapList/LapList.jsx";
import { formatTime } from "../utils/formatTime";

//Mock Framer Motion and dependencies to simplify the animation behavior for testing purposes.
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

//Mock formatTime for predictable output...
jest.mock("../utils/formatTime", () => ({
    formatTime: jest.fn(),
}));

describe("LapList Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
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

    //Test #2: Rendering - Renders the correct number of lap rows.
    test("returns one lap entry per lap", () => {
        render(<LapList laps={[1000, 800, 400]} />);

        //Only select the lap labels, ignoring the header text.
        const lapLabels = screen.getAllByText(/^Lap \d+$/);
        expect(lapLabels).toHaveLength(3);
    });

    //Test #3: Accessibility - Renders an accessible log when laps exist.
    test("renders lap list with role='log' and accessible label when laps exist", () => {
        render(<LapList laps={[1000]} />);

        const log = screen.getByRole("log", { name: /lap history/i });
        expect(log).toBeInTheDocument();
    });

    //Test #4: Data Logic - Laps appear in reverse order (latest first).
    test("renders laps in reverse order with correct numbering", () => {
        render(<LapList laps={[1000, 800, 400]} />);
        const lapLabels = screen.getAllByText(/^Lap \d+$/).map(element => element.textContent);
        expect(lapLabels).toEqual(["Lap 3", "Lap 2", "Lap 1"]);
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

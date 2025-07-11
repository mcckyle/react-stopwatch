//File name: AnalogClock.jsx
//Author: Kyle McColgan
//Date: 11 July 2025
//Description: This file contains the Analog clock component for the React timer site.

import React, { useState, useEffect } from "react";
import { getChicagoParts } from "../../utils/clock";
import styles from './AnalogClock.module.css';

export default function AnalogClock()
{
    const [time, setTime] = useState(getChicagoParts());

    // Tick every second.
    useEffect(() => {
        const id = setInterval(() => setTime(getChicagoParts()), 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        // Hand Angles.
        const { h, m, s } = time;

        const hourDeg = ((h % 12) + m / 60) * 30;
        const minuteDeg = m * 6 + s * 0.1;
        const secondDeg = s * 6;

        const root = document.documentElement;
        root.style.setProperty("--hourDeg", `${hourDeg}deg`);
        root.style.setProperty("--minuteDeg", `${minuteDeg}deg`);
        root.style.setProperty("--secondDeg", `${secondDeg}deg`);

        // Synchronized tick highlighting.
        const now = document.querySelector(`line[data-second="${s}"]`);
        const prev = document.querySelector(`line[data-second="${(s + 59) % 60}"]`);

        now?.classList.add(styles.active);
        prev?.classList.remove(styles.active);

        const timeout = setTimeout(() => now?.classList.remove(styles.active), 450);

        return () => clearTimeout(timeout);
    }, [time]);

    return (
        <div className = {styles.clockContainer}>
            <div className = {styles.clockFace}>
                <svg className={styles.ticks} viewBox="0 0 200 200">
                  <g className={styles.tickRing}>
                    {Array.from({ length: 60 }).map((_, i) => {
                        const angle = (i * 6) * (Math.PI / 180);
                        const x1 = 100 + 85 * Math.cos(angle);
                        const y1 = 100 + 85 * Math.sin(angle);
                        const x2 = 100 + 95 * Math.cos(angle);
                        const y2 = 100 + 95 * Math.sin(angle);

                        return (
                            <line key = {i}
                                  x1={x1} y1={y1} x2={x2} y2={y2}
                                  data-second={i}
                                  className={`${styles.tick} ${((i + 15) % 5 === 0 ? styles.hourTick : '')}`}/>
                        );
                    })}
                  </g>

                    {Array.from({ length: 12 }).map((_, i) => {
                        const ROMAN = [
                            "XII","I","II","III","IV","V",
                            "VI","VII","VIII","IX","X","XI"
                        ];
                        const angle = (i * 30 - 90) * (Math.PI / 180);
                        const x = 100 + 70 * Math.cos(angle);
                        const y = 100 + 70 * Math.sin(angle);

                        return (
                            <text key = {i} x={x} y={y} className={styles.numeral}>
                                {ROMAN[i]}
                            </text>
                        );
                    })}
                </svg>

                <div className={styles.hands}>
                    <div className={styles.handWrapper}>
                        <div className = {styles.hourHand} />
                    </div>
                    <div className={styles.handWrapper}>
                        <div className = {styles.minuteHand} />
                    </div>
                    <div className={styles.handWrapper}>
                        <div className = {styles.secondHand} />
                    </div>
                </div>

                <div className={styles.glassOverlay} />
            </div>
        </div>
    );
};

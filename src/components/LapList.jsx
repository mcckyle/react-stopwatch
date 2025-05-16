// src/components/LapList.jsx

import React from "react";
import styles from "./LapList.module.css";
import { formatTime } from "../utils/formatTime";

const LapList = ({ laps }) => {
    return (
        <div className={styles.lapList}>
            {laps.map((lap, index) => {
                const { hours, minutes, seconds, centiSeconds } = formatTime(lap, true);

                return (
                    <div key={index} className={styles.lap}>
                        <span>Lap {laps.length - index}</span>
                        <span>
                        {hours}:{minutes}:{seconds}.{centiSeconds}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default LapList;

//File name: HelpModal.jsx
//Author: Kyle McColgan
//Date: 06 June 2025
//Description: This file contains the Help modal component for the React timer site.

import React from "react";
import styles from "./HelpModal.module.css";

const HelpModal = ({ onClose }) => {
    return (
        <div className = {styles.overlay} onClick = {onClose}>
            <div className = {styles.modal} onClick = {(e) => e.stopPropagation()}>
                <h2> Keyboard Shortcuts </h2>
                <ul>
                    <li><strong>Space</strong>: Start / Stop</li>
                    <li><strong>L</strong>: Record Lap</li>
                    <li><strong>R</strong>: Reset Timer</li>
                    <li><strong>Shift + ?</strong>: Show Help</li>
                </ul>
                <button onClick = {onClose}>Close</button>
            </div>
        </div>
    );
};

export default HelpModal;

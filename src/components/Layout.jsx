//File name: Layout.jsx
//Author: Kyle McColgan
//Date: 15 June 2025
//Description: This file contains the layout React structuring component for the react-timer.

import React from "react";
import styles from './Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                <h1 className={styles.logo}>L'Horlage</h1>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()}. Crafted in STL by Kyle McColgan.
            </footer>
        </div>
    );
};

export default Layout;

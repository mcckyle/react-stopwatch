//File name: Layout.jsx
//Author: Kyle McColgan
//Date: 16 June 2025
//Description: This file contains the layout React structuring component for the react-timer.

import React from "react";
import styles from './Layout.module.css';
import { Sun, Moon } from "lucide-react";

const Layout = ({ children, dark, toggleTheme }) => {
    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                <h1 className={styles.logo}>L'Horlage</h1>
                <button
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    title="Toggle theme"
                    aria-label="Toggle theme"
                >
                    {dark ? <Sun size={20} color="#facc15" /> : <Moon size={20} color="#38bdf8" />}
                </button>
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

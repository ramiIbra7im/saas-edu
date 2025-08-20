"use client";

import styles from "./styles/loadingScreen.module.css";

export default function LoadingScreen() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>جارٍ التحميل...</p>
        </div>
    );
}

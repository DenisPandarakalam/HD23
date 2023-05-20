import React from "react";
import styles from "./sidebar.module.css";

let SideBarNav = () => {

    return(
        <div className={styles.sidebar}>
            <div className={styles.logo}>
            </div>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>
                    ICON
                </div>
                <div className={styles.icon}>
                    ICON
                </div>
                <div className={styles.icon}>
                    ICON
                </div>
                <div className={styles.icon}>
                    ICON
                </div>
                <div className={styles.icon}>
                    ICON
                </div>
            </div>
        </div>
    );
}

export default SideBarNav;
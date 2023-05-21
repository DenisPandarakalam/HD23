import React from "react";
import styles from "./sidebar.module.css";
let SideBar = () => {
    return(
        <div className="h-full w-min bg-accent text-accent-foreground" >
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
export default SideBar;
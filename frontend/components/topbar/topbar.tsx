
import styles from "./topbar.module.css";
let TopBar = () => {

    return(
        <div className="flex flex-row h-min w-full bg-accent text-accent-foreground">
            <div className={styles.logo}>
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
            <div className={styles.icon}>
                ICON
            </div>
        </div>
    );
}
export default TopBar;
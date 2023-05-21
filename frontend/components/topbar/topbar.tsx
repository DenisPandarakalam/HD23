
import { Input } from "../ui/input";
import styles from "./topbar.module.css";
let TopBar = () => {
    return(
        <div className="flex flex-row h-min w-full bg-accent text-accent-foreground">
            <Input />
        </div>
    );
}
export default TopBar;
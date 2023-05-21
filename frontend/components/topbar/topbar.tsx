
import { Input } from "../ui/input";
import styles from "./topbar.module.css";
let TopBar = () => {
    return(
        <div className="flex flex-row h-min w-full bg-accent py-6 px-6 text-accent-foreground">  
            <Input className="w-96 bg-white text-black border-[#FFDAB9] rounded-full pl-6 focus-visible:ring-0 focus-visible:ring-offset-0 transition-[filter] drop-shadow-none focus:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)]" />
        </div>
    );
}
export default TopBar;
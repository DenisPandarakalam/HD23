import React from "react";
import Image from "next/image";
import styles from "./sidebar.module.css";

import Map from "../../public/map.svg"
import Phone from "../../public/phone.svg"
import Users from "../../public/users-2.svg"

const TABS = [
    {
        label: "Map",
        imgsrc: Map,
        link: "/dashboard"
    },
    {
        label: "Resources",
        imgsrc: Phone,
        
        link: "/dashboard/resources"
    },
    {
        label: "Team",
        imgsrc: Users,
        
        link: "/dashboard/team"
    }
]

// className="my-24 mx-3 rounded-full min-w-min p-3 bg-background font-black uppercase transition drop-shadow-none hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)]"

let SideBar = () => {
    return(
        <div className="h-full w-min bg-transparent text-accent" >
            <div className="h-full w-min text-center">
                <div className="flex-col h-min w-min font-extralight my-6 mx-3 px-3 py-2 border border-[#FFDAB9] border-1 bg-background rounded-full transition drop-shadow-none hover:drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)]">
                    <div className="m-auto min-h-full min-w-full text-[24pt] text-accent-foreground">
                        therAPI
                    </div>
                </div>
                {
                    TABS.map((tab, i) => {
                        return(
                            <a key={i} href={""+tab.link} className="flex-row text-center items-center justify-center">
                                {tab.imgsrc({
                                    // className: styles.icon
                                    className: "mx-auto my-14 w-10 h-10 transition drop-shadow-none hover:drop-shadow-[0_0px_15px_rgba(0,0,0,0.25)] text-xl cursor-pointer",
                                    // width: "18px",
                                    // height: "18px",
                                    
                                })}
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default SideBar;
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
            <div className="h-full w-full flex-row">
                <div className="mt-6 flex flex-row  items-center justify-center mx-3 my-3 px-3 py-3 overflow-hidden border-[#FFDAB9] border-0 bg-accent rounded-full transition drop-shadow-none hover:drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)]">
                    <div className="max-w-min m-0 text-[24pt] text-clip text-accent-foreground">
                        ther
                    </div>
                    <div className="max-w-min m-0 text-[24pt] text-clip text-accent-foreground font-black">
                        API
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
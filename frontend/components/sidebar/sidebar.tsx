import React from "react";
import Image from "next/image";
import styles from "./sidebar.module.css";

const TABS = [
    {
        label: "Map",
        imgsrc: "/map.svg"
    },
    {
        label: "Resources",
        imgsrc: "/map.svg"
    },
    {
        label: "Team",
        imgsrc: "/map.svg"
    }
]

let SideBar = () => {
    return(
        <div className="h-full w-min bg-accent text-accent-foreground" >
            <div className="h-full w-min text-center">
                <div className="h-18 w-18 font-black mt-12 mb-24 mx-12 bg-background rounded-full transition drop-shadow-none hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)]">
                    <div>
                        LOGO
                    </div>
                </div>
                {
                    TABS.map(tab => {
                        return(
                            <div className="my-24 mx-3 rounded-full min-w-min p-3 bg-background font-black uppercase transition drop-shadow-none hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)]">
                                <Image
                                    src={tab.imgsrc}
                                    alt={tab.label}
                                    className="text-"
                                    width={100}
                                    height={24}
                                    priority
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default SideBar;
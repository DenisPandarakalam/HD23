'use client';

import { ScrollArea } from "@radix-ui/react-scroll-area";
import data from "../../map/data_map.json";

export default function Team() {

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="h-full w-full bg-transparent pr-12 overflow-visible items-center text-center transition drop-shadow-none">
          <ScrollArea className="h-min w-[95%] border-accent border-[2px] border-b-0 rounded-tl-[50px] rounded-tr-[50px] overflow-visible  pl-16 pt-12">
            {
                data.map((card) => {

                    return(
                        <div className="z-50 top-12 min-h-24 h-min w-max my-3 px-12 py-6 border-border border-[2px] first-of-type:mt-0 bg-[rgba(240,128,128,0.7)] text-white bg-opacity-60 backdrop-blur-3xl rounded-[50px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)] transition-all">
                            
                            <div className='font-bold text-[24pt] line-clamp-1'>
                                {card.full_name}
                            </div>

                            <div className='font-bold text-[12pt] line-clamp-1'>
                                {card.phone}
                            </div>
                            
                            <div className=' font-light text-[12pt] line-clamp-1'>
                                {card.location.line1}
                            </div>

                            <div className='font-light text-[12pt] line-clamp-1'>
                                {card.location.line2}
                            </div>

                        </div>
                    )
                })
            }
          </ScrollArea>
        </div>
      </div>
    </>
  )
}


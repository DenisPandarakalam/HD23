'use client';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import SideBar from '@/components/sidebar/sidebar'
import TopBar from '@/components/topbar/topbar'
import MapContainer from '../map/MapContainer'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { useState } from 'react'
import Chat from '../chat/page';

export default function Dashboard() {

  const [chatOpen, setChatOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="h-full w-full bg-transparent pr-12 overflow-hidden transition drop-shadow-none hover:drop-shadow-[0_0px_15px_rgba(0,0,0,0.25)]">
          <div className="h-screen w-[95%] rounded-tl-[50px] rounded-tr-[50px] overflow-hidden">
            <MapContainer />
          </div>
        </div>
      </div>
      <div className="fixed right-8 bottom-8 min-w-min max-h-[800px] flex flex-row justify-end rounded-lg overflow-hidden border border-border backdrop-blur-lg bg-white bg-opacity-70 drop-shadow-2xl transition-transform scale-100 hover:scale-105 ">
        <Button
          onClick={
            (e) => {
              setChatOpen(!chatOpen);
              console.log(!chatOpen);
            }
          }
          className='w-[50px] min-h-full h-auto px-0 py-0 z-50'
        >
          {
            !chatOpen ? 
            <ArrowLeftFromLine
              className="text-rose-800 transition-transform scale-110 hover:scale-130 transition-filter drop-shadow-none hover:drop-shadow-[0_0px_15px_rgba(0,0,0,0.25)]"
            /> : 
            <ArrowRightFromLine
              className="text-rose-800 transition-transform scale-110 hover:scale-130 transition-filter drop-shadow-none hover:drop-shadow-[0_0px_15px_rgba(0,0,0,0.25)]"
            />
          }
        </Button>
        <Chat
          className={`${chatOpen ? "w-[550px]" : "w-[0px]"} ${chatOpen ? "opacity-100" : "opacity-0"} place-self-end justify-self-end self-end transition-all z-40`}
        />
      </div>
    </>
  )
}


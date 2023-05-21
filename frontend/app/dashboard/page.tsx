import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import SideBar from '@/components/sidebar/sidebar'
import TopBar from '@/components/topbar/topbar'
import MapContainer from '../map/MapContainer'
import TextareaReactHookForm from '../chat/page'

export default function Dashboard() {
  return (
    <main className="flex h-screen w-screen flex-row bg-accent">
      <SideBar />
      
      <div className="flex h-full w-full flex-col bg-accent">

        <TopBar />
        
        <div className="h-full w-full bg-transparent pb-12 pr-12 overflow-hidden drop-shadow-2xl">
          <div className="h-full w-full rounded-[50px] overflow-hidden">
            <MapContainer />
          </div>
        </div>
      </div>
      <div className="absolute right-24 bottom-24 h-min w-max items-center text-center justify-center rounded-[50px] bg-white drop-shadow-2xl">
        <TextareaReactHookForm />
      </div>
    </main>
  )
}


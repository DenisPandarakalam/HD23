import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import SideBar from '@/components/sidebar/sidebar'
import TopBar from '@/components/topbar/topbar'

export default function Dashboard() {
  return (
    <main className="flex h-screen w-screen flex-row bg-white">
      <SideBar />
      <div className="flex h-full w-full flex-col bg-accent">
        <TopBar />
        <div className="h-full w-full rounded-tl-[50px] bg-white">
          Hello
        </div>
      </div>
    </main>
  )
}


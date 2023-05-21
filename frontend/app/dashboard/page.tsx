import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import SideBar from '@/components/sidebar/sidebar'
import TopBar from '@/components/topbar/topbar'

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <SideBar />
      <div className="z-10">
        Hello
      </div>
    </main>
  )
}


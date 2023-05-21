'use client';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import SideBar from '@/components/sidebar/sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { useState } from 'react'

export default function Dashboard() {

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="h-full w-full bg-transparent pr-12 overflow-hidden transition drop-shadow-none hover:drop-shadow-[0_0px_15px_rgba(0,0,0,0.25)]">
          <div className="h-screen w-[95%] rounded-tl-[50px] rounded-tr-[50px] overflow-hidden">
            Hello
          </div>
        </div>
      </div>
    </>
  )
}


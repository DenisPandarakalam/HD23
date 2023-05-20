import Image from 'next/image'
import SideBarNav from './sidebar'

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <div>
        <SideBarNav />
      </div>
    </main>
  )
}

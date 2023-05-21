import Image from 'next/image'
import MapContainer from './map/MapContainer'
import Chat from './chat/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MapContainer />
      <Chat />
    </main>
  )
}

import SideBar from "@/components/sidebar/sidebar";
import TopBar from "@/components/topbar/topbar";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="hey" lang="en">
      <body className={inter.className}>
        <main className="flex h-full w-full flex-row bg-accent ">
          <SideBar />
          <div className="flex h-full w-full flex-col bg-accent">
            <TopBar />
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

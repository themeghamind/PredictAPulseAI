"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <header style={{ paddingTop: '30px', paddingLeft: '80px' }}>
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/pulse.png"
            alt="Pulse Logo"
            className="dark:invert"
            width={40}
            height={12}
            priority
          />
          <h1 className="text-3xl font-sans font-semibold text-red-700">PredictAPulseAI</h1>
        </a>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 mt-8">
        <div className="animate-pulse relative flex place-items-center mt-[-8rem] before:absolute before:h-[600px] before:w-[680px] before:-translate-x-1/2 before:rounded-full before:content-[''] after:absolute after:-z-20 after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 z-[-1]">
           <Image
              src="/heart.png"
              alt="Heart Pulsing Buffer"
              className="dark:invert"
              width={180}
              height={180}
              priority
           />
        </div>
        <div>
            <h1 className="font-sans mt-8 text-3xl bg-gradient-to-r from-red-400 to-red-800 bg-clip-text text-transparent">
                Loading results...
            </h1>
        </div>
      </main>
    </div>
  )
}
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
          <h1 className="text-3xl font-sans font-semibold text-red-700">InsuraComp</h1>
        </a>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 mt-8">
        <div className="relative flex place-items-center mt-[-8rem] before:absolute before:h-[600px] before:w-[680px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 z-[-1]">
          <h1 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-7xl font-sans font-semibold text-center bg-gradient-to-r from-red-400 to-red-800 bg-clip-text text-transparent leading-tight">
             Choose a policy <br/>
             that&rsquo;s right for <i> you </i> 
          </h1>
        </div>
        <div className="mt-12 text-center">
          <h2 className="font-sans text-red-800 text-lg">
            We help you cut the crap from health insurance policies <br/>
            and choose something that suits your needs - not your employer&rsquo;s <br/>
            or your insurance company&rsquo;s, but your wallet's!
          </h2>
        </div>
        <div className="mt-16">
          <Link href="/questions">
            {/* <button onClick={() => {router.push("/questions")}} className="px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring"> */}
            <button className="px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring">
              Let&rsquo;s go
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

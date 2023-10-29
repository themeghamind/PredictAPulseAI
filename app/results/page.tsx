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
                <div className="relative flex place-items-center mt-[-8rem] before:absolute before:h-[600px] before:w-[680px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 z-[-1]">
                    <h1 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-7xl font-sans font-semibold text-center bg-gradient-to-r from-red-400 to-red-800 bg-clip-text text-transparent leading-tight">
                        Your Results <br/>
                    </h1>
                </div>
                <div>
                    <h2 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-2xl font-sans font-semibold text-center bg-gradient-to-r from-red-400 to-red-800 bg-clip-text text-transparent leading-tight">
                        You have a high risk of heart attacks <br/>
                        and should choose Plan B.
                    </h2>
                    <h2 className="mt-20 relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-l font-sans text-center bg-gray-600 bg-clip-text text-transparent leading-tight">
                        Plan A has a lower monthly premium and a higher deductible compared to Plan B. This means that the patient will pay less each month for their insurance, but will have to pay more out-of-pocket before their insurance coverage kicks in. This could be a good option for someone who is generally healthy and does not anticipate needing frequent medical care. On the other hand, Plan B has a higher monthly premium but a lower deductible. This means that the patient will pay more each month for their insurance, but will have a lower out-of-pocket cost when they do need medical care. This could be a better option for someone who has a higher likelihood of needing medical treatment, such as someone with a high probability of suffering a heart attack. 
                    </h2>
                </div>
            </main>
        </div>
    )
}

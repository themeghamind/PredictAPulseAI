"use client"

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function Questions() {
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
          <h1 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-6xl font-sans font-semibold text-center bg-red-800 bg-clip-text text-transparent leading-tight">
            Health Questionnare
          </h1>
        </div>
        <div>
          <h2 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-4xl font-sans font-semibold text-center bg-red-800 bg-clip-text text-transparent leading-tight">
            Check &rsquo;yes&rsquo; for each question that applies to you.
          </h2>
        </div>
        <div className="mt-10 w-3/6">
          <div className="flex items-center justify-between mb-10">
            <label className="text-xl font-sans text-gray-600">Are you 55 years or older?</label>
            <div className="flex items-center gap-4">
              <input type="checkbox" name="Gender" value="yes" style={{ transform: 'scale(1.3)' }}/>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10 mt-4">
            <label className="text-xl font-sans text-gray-600">Is your age above 60?</label>
            <div className="flex items-center gap-4">
              <input type="checkbox" name="Age" value="yes" style={{ transform: 'scale(1.3)' }}/>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10 mt-4">
            <label className="text-xl font-sans text-gray-600">Is your LDL, or bad cholesterol, above 60?</label>
            <div className="flex items-center gap-4">
              <input type="checkbox" name="LDL" value="yes" style={{ transform: 'scale(1.3)' }}/>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10 mt-4">
            <label className="text-xl font-sans text-gray-600">Do you smoke?</label>
            <div className="flex items-center gap-4">
              <input type="checkbox" name="Smoking" value="yes" style={{ transform: 'scale(1.3)' }}/>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10 mt-4">
            <label className="text-xl font-sans text-gray-600">Is your blood pressure above 130/80?</label>
            <div className="flex items-center gap-4">
              <input type="checkbox" name="BP" value="yes" style={{ transform: 'scale(1.3)' }}/>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10 mt-4">
            <label className="text-xl font-sans text-gray-600 mr-10">Do you currently have or ever had diabetes?</label>
            <div className="flex items-center gap-4">
              <input type="checkbox" name="Diabetes" value="yes" style={{ transform: 'scale(1.3)' }}/>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10 mt-4">
            <label className="text-xl font-sans text-gray-600">Are you currently or have ever been obese?</label>
            <div className="flex items-center gap-4">
              <input type="checkbox" name="Obesity" value="yes" style={{ transform: 'scale(1.3)' }}/>
            </div>
          </div>
        </div>
        <div>
          <Link href="/fileupload">
            {/* <button onClick={() => {router.push("/questions")}} className="px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring"> */}
            <button className="px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring">
              Next
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
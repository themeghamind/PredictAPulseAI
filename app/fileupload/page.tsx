"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from "react"; 
import { FileUploader } from "react-drag-drop-files"; 

const fileTypes = ["PNG", "JPG"]; 

export default function Questions() {
  const [file, setFile] = useState(null); 
  const handleChange = (file: File) => { 
    setFile((file?) => file); 
  };
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
          <h2 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-4xl font-sans font-semibold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent leading-tight">
            Upload two insurance <br/>
            policies to compare
          </h2>
        </div> 
        <div className="mt-20"> 
          <FileUploader  
            handleChange={handleChange}  
            name="file" 
            types={fileTypes}  
          /> 
      </div>
        <div className="mt-10">
          <Link href="/fileupload">
            <button className="px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring">
              Next
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
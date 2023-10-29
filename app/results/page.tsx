"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from 'react';

export default function Home() {
    const router = useRouter()
    const [serverResponse, setServerResponse] = useState('');

    async function postData(url, body) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include other headers if necessary
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          console.log(response.status, response)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }

    // Function to make GET requests
    async function getData(url) {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    useEffect(() => {
        async function fetchData() {
          try {
            // Make POST request to /checkrisk
            await postData('http://predictapulseai.ngrok.app/checkrisk', {
              age_encoded: 1,
              sex_encoded: 0,
              cp_encoded: 1,
              restecg_encoded: 1,
              exng_encoded: 1,
            });
    
            // Make POST request to /tesseract
            await postData('http://predictapulseai.ngrok.app/tesseract', {
              url1: 'https://predictapulse2.ngrok.app/kaiser.png',
              url2: 'https://predictapulse2.ngrok.app/kaiser.png',
            });
    
            // Make GET request to /retrieverecs and store the response
            const data = await getData('http://predictapulseai.ngrok.app/retrieverecs');
            setServerResponse(data);
          } catch (error) {
            console.error('Error fetching data:', error);
            setServerResponse('Failed to fetch data');
          }
        }
    
        fetchData();
    }, []);
    


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
                    {/* Display server response */}
                </div>
                <div>
                    <h2>{typeof serverResponse === 'string' ? serverResponse : JSON.stringify(serverResponse)}</h2>
                </div>
            </main>
        </div>
    )
}

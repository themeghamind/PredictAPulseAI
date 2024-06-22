"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Image from "next/image";

export default function Home() {
    const router = useRouter();

    const [isTranscribingA, setIsTranscribingA] = useState(false);
    const [isTranscribingB, setIsTranscribingB] = useState(false);
    const [planAFile, setPlanAFile] = useState<File | null>(null);
    const [planBFile, setPlanBFile] = useState<File | null>(null);
    const [planAText, setPlanAText] = useState('');
    const [planBText, setPlanBText] = useState('');

    const handlePlanADrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setPlanAFile(file);
        extractTextFromFile(file, setPlanAText, setIsTranscribingA);
    };

    const handlePlanBDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setPlanBFile(file);
        extractTextFromFile(file, setPlanBText, setIsTranscribingB);
    };

    const extractTextFromFile = (
        file: File,
        setText: React.Dispatch<React.SetStateAction<string>>,
        setIsTranscribing: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setIsTranscribing(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const target = e.target;
            if (target && target.result) {
                Tesseract.recognize(
                    target.result as string,
                    'eng',
                    {
                        logger: (m) => console.log(m),
                    }
                ).then(({ data: { text } }) => {
                    setText(text);
                    setIsTranscribing(false);
                }).catch((error) => {
                    setIsTranscribing(false);
                });
            } else {
                setIsTranscribing(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        const plan_details = {
            plan_a_details: planAText,
            plan_b_details: planBText,
        };

        localStorage.setItem("plan_details", JSON.stringify(plan_details));

        router.push('/results');
    };

    return (
        <div>
            <header style={{paddingTop: '30px', paddingLeft: '80px'}}>
                <a
                    href="http://localhost:3000"
                    className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
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
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-4">
                        <div
                            className="drop-zone border-dashed border-2 border-gray-300 rounded-lg p-4"
                            onDrop={handlePlanADrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <h2 className="text-lg font-semibold mb-2">Drop Plan A File Here</h2>
                            {planAFile && <p>{planAFile.name}</p>}
                        </div>
                        <div
                            className="drop-zone border-dashed border-2 border-gray-300 rounded-lg p-4"
                            onDrop={handlePlanBDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <h2 className="text-lg font-semibold mb-2">Drop Plan B File Here</h2>
                            {planBFile && <p>{planBFile.name}</p>}
                        </div>
                    </div>
                    <button
                        onClick={handleUpload}
                        className={`px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring ${isTranscribingA || isTranscribingB ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-800 hover:bg-red-600'}`}
                        disabled={isTranscribingA || isTranscribingB}
                    >
                        Submit
                    </button>
                </div>
            </main>
        </div>
    );
}

"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from "react"; 
import { FileUploader } from "react-drag-drop-files"; 

const fileTypes = ["PNG", "JPG"]; 

export default function Questions() {
    const [files, setFiles] = useState<File[]>([]);

  // State to manage drag active state
    const [dragActive, setDragActive] = useState(false);

    // Ref for the file input
    const inputRef = useRef<HTMLInputElement>(null);
    function handleChange(e: any) {
        e.preventDefault();
        console.log("File has been added");
        if (e.target.files && e.target.files[0]) {
          for (let i = 0; i < e.target.files["length"]; i++) {
            setFiles((prevState: any) => [...prevState, e.target.files[i]]);
          }
        }
    }
    
      function handleSubmitFile(e: any) {
        if (files.length === 0) {
          
        } else {
          // write submit logic here
        }
    }
    
      function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
            setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
          }
        }
    }
    
      function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }
    
      function handleDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }
    
      function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }
    
      function removeFile(fileName: any, idx: any) {
        const newArr = [...files];
        newArr.splice(idx, 1);
        setFiles([]);
        setFiles(newArr);
    }
    
      function openFileExplorer() {
        inputRef.current!.value = "";
        inputRef.current!.click();
    }
    
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
      <main className="flex min-h-auto flex-col items-center justify-center p-12 mt-4 space-y-16">
        <div className="flex place-items-center before:absolute before:h-[200vw] before:w-[680px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 z-[-1]">
          <h2 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-4xl font-sans font-semibold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent leading-tight">
            Upload two insurance <br/>
            policies to compare
          </h2>
        </div> 
        <div className="flex items-center justify-center h-auto">
            <form
                className={`${
                dragActive ? "bg-blue-400" : "bg-blue-100 bg-transparent"
                }  p-4 w-1/8 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
                onDragEnter={handleDragEnter}
                onSubmit={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            ></form>
            <input
                placeholder="fileInput"
                className="hidden"
                ref={inputRef}
                type="file"
                multiple={true}
                onChange={handleChange}
                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            />
            <p>
                Drag & Drop files or{" "}
                <span
                    className="font-bold text-blue-600 cursor-pointer"
                    onClick={openFileExplorer}
                >
                    <u>Select files</u>
                </span>{" "}
                to upload
            </p>
            <div className="flex flex-col items-center p-3">
                {files.map((file: any, idx: any) => (
                    <div key={idx} className="flex flex-row space-x-5">
                    <span>{file.name}</span>
                    <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeFile(file.name, idx)}
                    >
                        remove
                    </span>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-10">
          <Link href="/buffer">
            <button className="px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring">
              Next
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
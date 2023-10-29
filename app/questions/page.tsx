"use client"

import React, {useState} from 'react';
import Image from 'next/image'
import Link from 'next/link'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Questions() {
    const [checkboxValues, setCheckboxValues] = useState({
        gender: false,
        age: false,
        chol: false,
        bp: false,
        chest_pains: false,
        chest_pains_exercise: false,
        ecg: false,
    });

    const handleCheckboxChange = (event: React.MouseEvent<HTMLElement>, newValue: string[]) => {
        let updatedValues = {
            gender: false,
            age: false,
            chol: false,
            bp: false,
            chest_pains: false,
            chest_pains_exercise: false,
            ecg: false,
        };

        newValue.forEach(name => {
            updatedValues[name as keyof typeof updatedValues] = true;
        });

        setCheckboxValues(updatedValues);
        console.log(updatedValues);
    };

    return (
        <div>
            <header style={{paddingTop: '30px', paddingLeft: '80px'}}>
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
                <div
                    className="relative flex place-items-center mt-[-8rem] before:absolute before:h-[600px] before:w-[680px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 z-[-1]">
                    <h1 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-6xl font-sans font-semibold text-center bg-red-800 bg-clip-text text-transparent leading-tight">
                        Health Questionnaire
                    </h1>
                </div>
                <div>
                    <h2 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-4xl font-sans font-semibold text-center bg-red-800 bg-clip-text text-transparent leading-tight">
                        Select each question if it applies to you
                    </h2>
                </div>
                <div className="mt-10 w-3/6 flex flex-col items-center justify-center">
                    <ToggleButtonGroup
                        orientation="vertical"
                        value={Object.keys(checkboxValues).filter(key => {
                            return checkboxValues[key as keyof typeof checkboxValues];
                        })}
                        onChange={handleCheckboxChange}
                        aria-label="questionnaire"
                        sx={{
                            '& .MuiToggleButton-root': {
                                borderRadius: '0.5rem !important',
                            },
                            '& .MuiToggleButton-root:first-of-type': {
                                borderTopLeftRadius: '0.5rem !important',
                                borderTopRightRadius: '0.5rem !important',
                            },
                            '& .MuiToggleButton-root:last-child': {
                                borderBottomLeftRadius: '0.5rem !important',
                                borderBottomRightRadius: '0.5rem !important',
                            },

                        }}
                    >
                        <ToggleButton
                            value="gender"
                            name="gender"
                            aria-label="Are you male?"
                            sx={{
                                borderRadius: '0.5rem',
                                fontSize: '1.25rem',
                                textTransform: 'none',
                                margin: '1.8rem 0',
                                backgroundColor: 'rgba(255, 179, 179, 1)',
                                color: 'rgba(51, 51, 51, 1)',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(204, 51, 0, 1)',
                                    color: 'rgba(255, 255, 255, 1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(183, 46, 0, 1)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 159, 159, 1)',
                                }
                            }}
                        >
                            Are you male?
                        </ToggleButton>
                        <ToggleButton
                            value="age"
                            name="age"
                            aria-label="Are you above 55 years old?"
                            sx={{
                                borderRadius: '0.5rem',
                                fontSize: '1.25rem',
                                textTransform: 'none',
                                margin: '1.8rem 0',
                                backgroundColor: 'rgba(255, 179, 179, 1)',
                                color: 'rgba(51, 51, 51, 1)',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(204, 51, 0, 1)',
                                    color: 'rgba(255, 255, 255, 1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(183, 46, 0, 1)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 159, 159, 1)',
                                }
                            }}
                        >
                            Are you above 55 years old?
                        </ToggleButton>
                        <ToggleButton
                            value="chol"
                            name="chol"
                            aria-label="Do you have high cholesterol (above 200 mg/dL)?"
                            sx={{
                                borderRadius: '0.5rem',
                                fontSize: '1.25rem',
                                textTransform: 'none',
                                margin: '1.8rem 0',
                                backgroundColor: 'rgba(255, 179, 179, 1)',
                                color: 'rgba(51, 51, 51, 1)',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(204, 51, 0, 1)',
                                    color: 'rgba(255, 255, 255, 1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(183, 46, 0, 1)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 159, 159, 1)',
                                }
                            }}
                        >
                            Do you have high cholesterol (above 200 mg/dL)?
                        </ToggleButton>
                        <ToggleButton
                            value="bp"
                            name="bp"
                            aria-label="Do you have high blood pressure (above 130/80 mm Hg)?"
                            sx={{
                                borderRadius: '0.5rem',
                                fontSize: '1.25rem',
                                textTransform: 'none',
                                margin: '1.8rem 0',
                                backgroundColor: 'rgba(255, 179, 179, 1)',
                                color: 'rgba(51, 51, 51, 1)',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(204, 51, 0, 1)',
                                    color: 'rgba(255, 255, 255, 1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(183, 46, 0, 1)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 159, 159, 1)',
                                }
                            }}
                        >
                            Do you have high blood pressure (above 130/80 mm Hg)?
                        </ToggleButton>
                        <ToggleButton
                            value="chest_pains"
                            name="chest_pains"
                            aria-label="Do you experience chest pains?"
                            sx={{
                                borderRadius: '0.5rem',
                                fontSize: '1.25rem',
                                textTransform: 'none',
                                margin: '1.8rem 0',
                                backgroundColor: 'rgba(255, 179, 179, 1)',
                                color: 'rgba(51, 51, 51, 1)',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(204, 51, 0, 1)',
                                    color: 'rgba(255, 255, 255, 1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(183, 46, 0, 1)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 159, 159, 1)',
                                }
                            }}
                        >
                            Do you experience chest pains?
                        </ToggleButton>
                        <ToggleButton
                            value="chest_pains_exercise"
                            name="chest_pains_exercise"
                            aria-label="Do you experience chest pains post-exercise?"
                            sx={{
                                borderRadius: '0.5rem',
                                fontSize: '1.25rem',
                                textTransform: 'none',
                                margin: '1.8rem 0',
                                backgroundColor: 'rgba(255, 179, 179, 1)',
                                color: 'rgba(51, 51, 51, 1)',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(204, 51, 0, 1)',
                                    color: 'rgba(255, 255, 255, 1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(183, 46, 0, 1)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 159, 159, 1)',
                                }
                            }}
                        >
                            Do you experience chest pains post-exercise?
                        </ToggleButton>
                        <ToggleButton
                            value="ecg"
                            name="ecg"
                            aria-label="Have you ever received an abnormal ECG reading?"
                            sx={{
                                borderRadius: '0.5rem',
                                fontSize: '1.25rem',
                                textTransform: 'none',
                                margin: '1.8rem 0',
                                backgroundColor: 'rgba(255, 179, 179, 1)',
                                color: 'rgba(51, 51, 51, 1)',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(204, 51, 0, 1)',
                                    color: 'rgba(255, 255, 255, 1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(183, 46, 0, 1)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 159, 159, 1)',
                                }
                            }}
                        >
                            Have you ever received an abnormal ECG reading?
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div className="mt-5">
                    <Link href="/fileupload">
                        <button
                            className="px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring">
                            Next
                        </button>
                    </Link>
                </div>
            </main>
        </div>

    )
}

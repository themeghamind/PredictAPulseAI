"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function Home() {
    const [status, setStatus] = useState('');
    const [riskStatement, setRiskStatement] = useState('');
    const [planDetails, setPlanDetails] = useState({
        plan_a_details: '',
        plan_b_details: ''
    });
    const [checkboxValues, setCheckboxValues] = useState({
        gender: false,
        age: false,
        chol: false,
        bp: false,
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedCheckboxValues = localStorage.getItem('checkbox_values');
        if (storedCheckboxValues) {
            try {
                setCheckboxValues(JSON.parse(storedCheckboxValues));
            } catch (error) {
                console.error('Error parsing checkboxValues', error);
            }
        }

        const storedPlanDetails = localStorage.getItem('plan_details');
        if (storedPlanDetails) {
            try {
                setPlanDetails(JSON.parse(storedPlanDetails));
            } catch (error) {
                console.error('Error parsing planDetails', error);
            }
        }

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const fetchRiskData = async () => {
            const data = {
                age: checkboxValues.age ? 1 : 0,
                sex: checkboxValues.gender ? 1 : 0,
                cholesterol: checkboxValues.chol ? 1 : 0,
                blood_pressure: checkboxValues.bp ? 1 : 0,
            };

            try {
                const response = await axios.post('http://127.0.0.1:8000/checkrisk', null, {
                    params: data
                });

                if (response.status === 200) {
                    console.log(response);
                    if (response.data.risk_score === '1') {
                        setRiskStatement("You have a high probability of suffering a heart attack in the near future.");
                    } else if (response.data.risk_score === '0') {
                        setRiskStatement("You have a low probability of suffering a heart attack in the near future.");
                    }
                } else {
                    console.error('Failed to send answers');
                }
            } catch (error) {
                console.error('Failed to send answers: ', error);
            }
        };

        fetchRiskData();
    }, [checkboxValues, isLoaded]);

    useEffect(() => {
        const updateRiskAndFetchRecommendations = async () => {
            if (riskStatement) {
                const recommendation_data = {
                    risk: riskStatement,
                    plan_a_details: planDetails.plan_a_details,
                    plan_b_details: planDetails.plan_b_details
                };

                console.log("Retrieving recommendations with", recommendation_data);

                try {
                    const response = await axios.post('http://127.0.0.1:8000/retrieverecs', null, {
                        params: recommendation_data
                    });
                    if (response.status === 200) {
                        setStatus(response.data.status);
                    } else {
                        console.error('Failed to retrieve recommendations');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        updateRiskAndFetchRecommendations();
    }, [riskStatement, planDetails]);

    return (
        <div>
            <header style={{ paddingTop: '30px', paddingLeft: '80px' }}>
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
                <div
                    className="relative flex place-items-center mt-[-8rem] before:absolute before:h-[600px] before:w-[680px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 z-[-1]">
                    <h1 className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-7xl font-sans font-semibold text-center bg-gradient-to-r from-red-400 to-red-800 bg-clip-text text-transparent leading-tight">
                        Your Results <br/>
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center w-full max-w-6xl">
                    {status ? (
                        <><h3
                            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert text-4xl font-sans font-semibold text-center bg-gradient-to-r from-red-400 to-red-800 bg-clip-text text-transparent leading-tight mt-4">
                            {riskStatement}
                        </h3>
                            <div
                                className="relative p-8 bg-white shadow-lg rounded-lg dark:bg-gray-800 text-center space-y-4 mt-8 max-w-4xl">
                                {status.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-lg text-gray-700 dark:text-gray-300">{paragraph}</p>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </main>
        </div>
    );
}

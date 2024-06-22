# PredictAPulseAI

Personalized AI health outcome predictor and insurance selection guide

![PredictAPulseAI](https://github.com/themeghamind/PredictAPulseAI/assets/57309755/0b1b5bf5-fbd0-48f2-b8dc-38d8942e0cb2)

## Inspiration
The American Healthcare system is expensive and complicated. Everyone wants the best, most cost-effective insurance plan, but choosing one can feel like a daunting task. We were motivated to build a product that could deal with large benefits summaries containing opaque language and support our users' unique medical needs, all the while maintaining a high level of user personalization.

## What it does
PredictAPulseAI provides users with a health questionnaire, where the answers serve as input for an ML model for heart attack risk classification. Our ML model was trained using a dataset that has features for causes of heart attacks and predicts future heart attacks. Afterward, users upload summary benefits of insurance policies to PredictAPulseAI, and it combines all of this data to find the most cost-effective insurance policy given your risk for heart attacks.

## How we built it
Frontend: JS, React, Next.js, TypeScript, HTML/CSS, Material UI, Vercel  
Backend: Python, FastAPI, MindsDB.api, Tesseract OCR, OpenAI GPT 3.5  
Database: CockroachDB  
Classification Model: Heart Attack Kaggle Dataset, MindsDB Regression-Based Predictor

## Challenges we ran into
Some of the challenges we ran into were dealing with the limitations of Intel Cloud, specifically its inability to connect to Cockroach DB and port-forward for our custom backend API.

## Accomplishments that we're proud of
Successful implementations of functions. Replaced cookie usage.
Bridged front-end to back-end, API integration, and database implementation.

## What we learned
Insurance comparisons and how it helps users based on their current health conditions. We expanded our knowledge of SQL with CockroachDB, ML prediction models with MindsDB, and Flask web server with our custom-written API endpoint.

## What's next for PredictAPulseAI
This project is not limited to predicting heart attacks and reducing the cost of treatment for our users. Other leading causes of death, such as cancer, can be effectively predicted to do the same pipeline. Most importantly, our project would save lives.  
We plan to adapt our project to an intuitive mobile application to increase accessibility. We also plan to effectively market our idea and utilize sponsorships from insurance companies to gain funding.

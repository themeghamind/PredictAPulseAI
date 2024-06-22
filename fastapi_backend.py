from fastapi import FastAPI, Query, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import requests
import uvicorn
import openai
import os

app = FastAPI()

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskRequest(BaseModel):
    age: int
    sex: int
    cholesterol: int
    blood_pressure: int

@app.post("/checkrisk")
async def check_risk(
        age: int = Query(...),
        sex: int = Query(...),
        cholesterol: int = Query(...),
        blood_pressure: int = Query(...)
):
    cockroachdb_host = os.getenv("COCKROACHDB_HOST")
    cockroachdb_db = os.getenv("COCKROACHDB_DB")
    cockroachdb_username = os.getenv("COCKROACHDB_USERNAME")
    cockroachdb_password = os.getenv("COCKROACHDB_PASSWORD")

    url = 'http://127.0.0.1:47334/api/sql/query'
    create_db_query = '''
    CREATE DATABASE cockroachdb WITH engine = 'cockroachdb', parameters = {
        "host": cockroachdb_host,
        "database": cockroachdb_db,
        "user": cockroachdb_username,
        "password": cockroachdb_password,
        "port": "26257"
    };
    '''
    create_model_query = '''
    CREATE MODEL mindsdb.heart_attack_risk_predictor FROM cockroachdb (
        SELECT * FROM heart_attack_predict
    ) PREDICT risk;
    '''
    select_query = f'''
    SELECT heart_attack FROM mindsdb.heart_attack_predict
    WHERE age={age} AND sex={sex} AND cholesterol={cholesterol} AND blood_pressure={blood_pressure};
    '''

    requests.post(url, json={'query': create_db_query})
    requests.post(url, json={'query': create_model_query})
    risk_score = requests.post(url, json={'query': select_query})

    if risk_score.status_code == 200:
        response_data = risk_score.json()
        risk_value = response_data.get("data", [[None]])[0][0]

        return JSONResponse(content={'risk_score': risk_value})
    else:
        return JSONResponse(content={'error': 'Failed to retrieve risk score'}, status_code=500)

@app.post("/retrieverecs")
async def retrieve_recommendations(
        risk: str = Query(...),
        plan_a_details: str = Query(...),
        plan_b_details: str = Query(...)
):

    prompt = (f"This is some information about a patient: {risk}. They are comparing two health insurance plans, " +
              f"Plan A and Plan B. Here is some info about Plan A: {plan_a_details} Here is some info about Plan B: " +
              f"{plan_b_details}. Considering the terms in both health insurance plans and the patient's risk of a " +
              f"heart attack, which one should the user choose to save money? Respond ONLY with the name of the " +
              f"insurance plan and clear reasons why. Justify your answer given the patient's heart attack risk. " +
              f"Do not summarize your answer.")

    openai.api_key = os.getenv("OPENAI_API_KEY")
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=1000,
        temperature=0
    )

    return JSONResponse(content={'status': response['choices'][0]['text']})

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
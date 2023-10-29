from flask import Flask, request, jsonify
from tesseract import transcribe
import requests
import json

app = Flask(__name__)

@app.route('/checkrisk', methods=['POST'])
def check_risk():
    age = int(request.args.get('age'))
    sex = int(request.args.get('sex'))
    cholesterol = int(request.args.get('cholesterol'))
    smoking = int(request.args.get('smoking'))
    bp = int(request.args.get('bp'))
    diabetes = int(request.args.get('diabetes'))
    obesity = int(request.args.get('obesity'))

    url = 'http://127.0.0.1:47334/api/sql/query'
    resp = requests.post(url, json={'query':
                                        'CREATE DATABASE cockroachdb WITH engine = \'cockroachdb\', parameters = {"host": "plumed-piranha-3682.g95.cockroachlabs.cloud", "database": "defaultdb", "user": "adrian", "password": "WsBlLnu1G6v4Wd_VAKa6dw", "port": "26257"};'})
    resp = requests.post(url, json={'query':
                                        'CREATE MODEL mindsdb.heart_attack_risk_predictor FROM cockroachdb (SELECT * FROM heart_attack_predict) PREDICT risk;'})
    risk_score = requests.post(url, json={'query':
                                        f'SELECT risk FROM mindsdb.heart_attack_risk_predictor WHERE age= {age} AND sex= {sex} AND cholesterol= {cholesterol} AND smoking= {smoking} AND bp= {bp} AND diabetes= {diabetes} AND obesity= {obesity};'})

    if risk_score.status_code == 200:
        response_data = json.loads(risk_score.text)
        risk_value = response_data["data"][0][0] if "data" in response_data else None
        return jsonify({'risk_score': risk_value})
    else:
        return jsonify({'error': 'Failed to retrieve risk score'})

@app.route('/tesseract', methods=['POST'])
def tesseract_reader():
    url1 = request.args.get('url1')
    url2 = request.args.get('url2')

    transcribe(url1)
    transcribe(url2)

    # Open and read the contents of the output.txt file
    with open("output.txt", "r") as file:
        content = file.read()

    return jsonify({"output": content})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6666)
    
CREATE DATABASE cockroachdb_derek4
WITH
    engine = 'cockroachdb',
    parameters = {
        "host": "stoic-ent-10733.6wr.cockroachlabs.cloud",
        "database": "defaultdb",
        "user": "adrian",
        "password": "ml38GgqGI1VfAPZZbJ3cpQ",
        "port": "26257"
    };

CREATE MODEL mindsdb.heart_attack_risk_predictor_derek4
FROM cockroachdb_derek4
  (SELECT * FROM heartattackpredictor)
PREDICT heart_attack_risk;

DESCRIBE mindsdb.heart_attack_risk_predictor_derek4;

SELECT * FROM cockroachdb_derek4.heartattackpredictor;

SELECT heart_attack_risk
FROM mindsdb.heart_attack_risk_predictor_derek4
WHERE age_encoded=0
AND sex_encoded=0
AND cholesterol_encoded=0
AND smoking=0
AND bp_encoded=0
AND diabetes=0
AND obesity=0;
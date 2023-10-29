CREATE DATABASE cockroachdb_derek5
WITH
    engine = 'cockroachdb',
    parameters = {
        "host": "stoic-ent-10733.6wr.cockroachlabs.cloud",
        "database": "defaultdb",
        "user": "adrian",
        "password": "ml38GgqGI1VfAPZZbJ3cpQ",
        "port": "26257"
    };

CREATE MODEL mindsdb.heart_attack_risk_predictor_derek5
FROM cockroachdb_derek5
  (SELECT * FROM heartattackpredictor)
PREDICT heart_attack_risk;

DESCRIBE mindsdb.heart_attack_risk_predictor_derek5;

SELECT * FROM cockroachdb_derek5.heartattackpredictor;

SELECT heart_attack_risk
FROM mindsdb.heart_attack_risk_predictor_derek5
WHERE age_encoded=1
AND sex_encoded=1
AND cp_encoded=1
AND restecg_encoded=1
AND exng_encoded=1;

/*command lines to import dataset into CockroachDB schema*/
CREATE TABLE IF NOT EXISTS heartattackpredictor (age_encoded BOOL, sex_encoded BOOL, cp_encoded BOOL,
                                                 restecg_encoded BOOL, exng_encoded BOOL, heart_attack_risk BOOL);
COPY heartattackpredictor FROM STDIN WITH CSV HEADER;
/*insert dataset from csv*/
/*insert \. to end data insertion*/
SELECT * FROM heartattackpredictor;
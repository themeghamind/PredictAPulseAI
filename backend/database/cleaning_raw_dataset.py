import pandas as pd

data = pd.read_csv("heart_attack_prediction_dataset.csv")

print(data.head())

# filter columns for the selected features
filtered_data = data[["Patient ID", "Age", "Sex", "Cholesterol", "Smoking", "Blood Pressure", "Diabetes", "Obesity",
                      "Heart Attack Risk"]]

print(filtered_data.head())

# one-hot encode the cholesterol column so high cholesterol gets (1) and normal cholesterol gets (0)
filtered_data = filtered_data.assign(
    Cholesterol_encoded=filtered_data['Cholesterol'].apply(lambda x: 1 if x >= 200 else 0))

print(filtered_data[['Cholesterol', 'Cholesterol_encoded']].head(30))

# split the blood pressure column into a systolic column and a diastolic column
filtered_data[['Systolic', 'Diastolic']] = filtered_data['Blood Pressure'].str.split('/', expand=True).astype(int)

print(filtered_data[['Blood Pressure', 'Systolic', 'Diastolic']].head())

# one-hot encode the blood pressure based on the following: if the row has high blood pressure (1),
# otherwise, encode (0)
filtered_data['BP_encoded'] = ((filtered_data['Systolic'] >= 135) | (filtered_data['Diastolic'] >= 85)).astype(int)

print(filtered_data[['Systolic', 'Diastolic', 'BP_encoded']].head(30))

# one-hot encode the sex column so Male gets (1) and Female gets (0)
filtered_data = filtered_data.assign(
    Sex_encoded=filtered_data['Sex'].apply(lambda x: 1 if x == "Male" else 0))

# one-hot encode the age column so age above 70 gets (1) and 70 and under gets (0)
filtered_data = filtered_data.assign(
    Age_encoded=filtered_data['Age'].apply(lambda x: 1 if x >= 70 else 0))

# grab new columns for the export dataframe
filtered_data = filtered_data[
    ["Patient ID", "Age_encoded", "Sex_encoded", "Cholesterol_encoded", "Smoking", "BP_encoded", "Diabetes", "Obesity",
     "Heart Attack Risk"]]

# rename columns so names don't have spaces
filtered_data.rename(columns={'Patient ID': 'Patient_ID'}, inplace=True)
filtered_data.rename(columns={'Heart Attack Risk': 'Heart_Attack_Risk'}, inplace=True)

# shift heart attack risk column to the right most column
column_order = [col for col in filtered_data.columns if col != 'Heart_Attack_Risk'] + ['Heart_Attack_Risk']
filtered_data = filtered_data[column_order]

print(filtered_data.head(30))

# create correlation matrix for feature selection
filtered_data = filtered_data[
    ["Age_encoded", "Sex_encoded", "Cholesterol_encoded", "Smoking", "BP_encoded", "Diabetes", "Obesity",
     "Heart_Attack_Risk"]]
print(filtered_data.corr())

# feature selection
filtered_data = filtered_data[
    ["Age_encoded", "Cholesterol_encoded", "BP_encoded", "Diabetes",
     "Heart_Attack_Risk"]]
print(filtered_data.corr())

# export dataframe to csv
filtered_data.to_csv("cleaned_heart_attack_data.csv", index=False)

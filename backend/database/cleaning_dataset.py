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
filtered_data['BP_encoded'] = ((filtered_data['Systolic'] >= 130) | (filtered_data['Diastolic'] >= 80)).astype(int)

print(filtered_data[['Systolic', 'Diastolic', 'BP_encoded']].head(30))

filtered_data = filtered_data[
    ["Patient ID", "Age", "Sex", "Cholesterol_encoded", "Smoking", "BP_encoded", "Diabetes", "Obesity",
     "Heart Attack Risk"]]

column_order = [col for col in filtered_data.columns if col != 'Heart Attack Risk'] + ['Heart Attack Risk']
filtered_data = filtered_data[column_order]

print(filtered_data.head(30))

filtered_data.to_csv("cleaned_heart_attack_data.csv", index=False)

import pandas as pd

data = pd.read_csv("heart_attack_prediction_dataset.csv")

print(data.head())

# filter columns for the selected features
filtered_data = data[["Patient ID", "Age", "Sex", "Cholesterol", "Smoking", "Blood Pressure", "Diabetes", "Obesity",
                      "Heart Attack Risk"]]

print(filtered_data.head())

# one-hot encode the cholesterol column so high cholesterol gets (1) and normal cholesterol gets (0)
filtered_data = filtered_data.assign(Cholesterol_encoded=filtered_data['Cholesterol'].apply(lambda x: 1 if x >= 200 else 0))

print(filtered_data[['Cholesterol', 'Cholesterol_encoded']].head(20))





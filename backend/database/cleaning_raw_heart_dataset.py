import pandas as pd

data = pd.read_csv("heart.csv")

print(data.head())

# grab columns
filtered_data = data[["age", "sex", "cp", "trtbps", "chol", "fbs", "restecg",
                      "exng", "output"]]

print(filtered_data.head())

# one-hot encode the age column so age between 55-75 gets (0), and other ages get (1)
filtered_data = filtered_data.assign(
    Age_encoded=filtered_data['age'].apply(lambda x: 0 if (x >= 55) & (x <= 75) else 1))

# one-hot encode the sex column
filtered_data = filtered_data.assign(
    Sex_encoded=filtered_data['sex'].apply(lambda x: 1 if x == 0 else 0))

# one-hot encode the chest pain column so chest pain gets (1) and no chest pain gets (0)
filtered_data = filtered_data.assign(
    Cp_encoded=filtered_data['cp'].apply(lambda x: 1 if x > 1 else 0))

# one-hot encode the cholesterol column so high cholesterol gets (1) and normal cholesterol gets (0)
mean_chol = filtered_data['chol'].mean()
filtered_data = filtered_data.assign(
    Cholesterol_encoded=filtered_data['chol'].apply(lambda x: 1 if x >= mean_chol else 0))

print(filtered_data[['chol', 'Cholesterol_encoded']].head(30))


# one-hot encode the blood pressure based on the following: if the row has high blood pressure (1),
# otherwise, encode (0)
mean_trtbps = filtered_data['trtbps'].mean()
filtered_data = filtered_data.assign(
    BP_encoded=filtered_data['trtbps'].apply(lambda x: 1 if x >= mean_trtbps else 0))

# one-hot encode the ecg based on the following: if the row has normal ecg (0),
# otherwise, encode (1)
filtered_data = filtered_data.assign(
    Restecg_encoded=filtered_data['restecg'].apply(lambda x: 1 if x >= 1 else 0))

# one-hot encode the exercise induced chest pain column so chest pain gets (1) and no chest pain gets (0)
filtered_data = filtered_data.assign(
    Exng_encoded=filtered_data['exng'].apply(lambda x: 1 if x == 0 else 0))


# rename target prediction column
filtered_data.rename(columns={'output': 'Heart_Attack_Risk'}, inplace=True)

# grab new columns for the export dataframe
filtered_data = filtered_data[
    ["Age_encoded", "Sex_encoded", "Cholesterol_encoded", "Cp_encoded", "BP_encoded", "fbs", "Restecg_encoded",
     "Exng_encoded", "Heart_Attack_Risk"]]


# shift heart attack risk column to the right most column
column_order = [col for col in filtered_data.columns if col != 'Heart_Attack_Risk'] + ['Heart_Attack_Risk']
filtered_data = filtered_data[column_order]

print(filtered_data.head(30))

# create correlation matrix for feature selection
filtered_data = filtered_data[
    ["Age_encoded", "Sex_encoded", "Cholesterol_encoded", "Cp_encoded", "BP_encoded", "fbs", "Restecg_encoded",
     "Exng_encoded", "Heart_Attack_Risk"]]
print(filtered_data.corr())

# feature selection
filtered_data = filtered_data[
    ["Age_encoded", "Sex_encoded", "Cp_encoded", "Restecg_encoded",
     "Exng_encoded", "Heart_Attack_Risk"]]
print(filtered_data.corr())

# export dataframe to csv
filtered_data.to_csv("cleaned_heart_attack_data.csv", index=False)

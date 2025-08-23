# train_model.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
import joblib
import os

# Load the dataset
csv_path = os.path.join("backend", "model", "career_advisor_dataset.csv")
df = pd.read_csv(csv_path)

# Combine text features into one string
df['combined'] = df['Education'] + " " + df['Skills'] + " " + df['Experience'] + " " + df['Interests']
X = df['combined']
y = df['Career Recommendation']

# Train the model
pipeline = make_pipeline(TfidfVectorizer(), RandomForestClassifier())
pipeline.fit(X, y)

# Save the trained model
model_path = os.path.join("backend", "model", "career_model.pkl")
joblib.dump(pipeline, model_path)

print("✅ Model trained and saved at:", model_path)

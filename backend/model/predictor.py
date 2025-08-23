import joblib
import os

# Load the trained pipeline (includes both vectorizer and model)
model_path = os.path.join(os.path.dirname(__file__), 'career_model.pkl')
model = joblib.load(model_path)

def predict_careers_from_text(resume_text):
    try:
        prediction = model.predict([resume_text])
        return prediction.tolist()
    except Exception as e:
        print(f"Prediction failed: {e}")
        return []

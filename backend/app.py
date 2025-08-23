from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pdfplumber
import traceback
from model.predictor import predict_careers_from_text
from models import db, ResumeRecord
from datetime import datetime

app = Flask(__name__, template_folder='templates')  # Ensure 'templates' folder exists
CORS(app)

# === Database Configuration ===
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///resumes.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# === Create tables if not exist ===
with app.app_context():
    db.create_all()

# === Resume Validation Function ===
def is_valid_resume(text):
    resume_keywords = [
        'education', 'experience', 'skills', 'projects',
        'certifications', 'internship', 'objective',
        'b.tech', 'developer', 'python', 'machine learning',
        'msc', 'bsc', 'career', 'summary'
    ]
    text_lower = text.lower()
    return any(keyword in text_lower for keyword in resume_keywords)

# === Home Route ===
@app.route('/')
def home():
    return render_template('upload.html')

# === Resume Upload API ===
@app.route('/upload', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['resume']
    if not file or not file.filename.lower().endswith('.pdf'):
        return jsonify({'error': 'Invalid file type. Please upload a PDF.'}), 400

    try:
        # Extract text using pdfplumber
        with pdfplumber.open(file) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text

        if not text.strip():
            return jsonify({'error': 'No readable text found in the PDF.'}), 400

        if not is_valid_resume(text):
            return jsonify({'error': 'This file does not appear to be a valid resume.'}), 400

        # Predict careers using model
        predictions = predict_careers_from_text(text)
        predicted_career = predictions[0] if predictions else 'Unknown'
        score = 100 if predicted_career != 'Unknown' else 0

        # Save to database
        record = ResumeRecord(
            filename=file.filename,
            extracted_text=text,
            predicted_career=predicted_career,
            score=score
        )
        db.session.add(record)
        db.session.commit()

        return jsonify({
            'success': True,
            'predicted_career': predicted_career,
            'all_predictions': predictions,
            'score': score
        }), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500

# === View All Records API ===
@app.route('/records', methods=['GET'])
def get_all_records():
    records = ResumeRecord.query.order_by(ResumeRecord.uploaded_at.desc()).all()
    return jsonify([
        {
            'id': r.id,
            'filename': r.filename,
            'predicted_career': r.predicted_career,
            'score': r.score,
            'uploaded_at': r.uploaded_at.strftime('%Y-%m-%d %H:%M:%S')
        } for r in records
    ])

if __name__ == '__main__':
    app.run(debug=True)

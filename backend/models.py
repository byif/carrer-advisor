from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class ResumeRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(120), nullable=False)
    extracted_text = db.Column(db.Text, nullable=False)
    predicted_career = db.Column(db.String(120), nullable=False)
    score = db.Column(db.Integer, nullable=False)  # ✅ This was missing
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

import React, { useState, useEffect } from 'react';

interface CircularProgressProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
}) => {
  const [progress, setProgress] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let start = 0;
    const duration = 1000; // animation duration in ms
    const stepTime = 10;   // ms between steps
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setProgress(score);
        clearInterval(timer);
      } else {
        setProgress(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const offset = circumference - (progress / 100) * circumference;

  const getColor = (value: number) => {
    if (value < 50) return '#ef4444'; // red
    if (value < 75) return '#fbbf24'; // yellow
    return '#22c55e'; // green
  };

  return (
    <svg width={size} height={size}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={getColor(progress)}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="1.5rem"
        fontWeight="bold"
        fill={getColor(progress)}
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
};

const Resume: React.FC = () => {
  const [careers, setCareers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [showScoreBar, setShowScoreBar] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    setInfoMessage('');
    setShowResult(false);
    setCareers([]);
    setScore(null);
    setShowScoreBar(false);

    const fileInput = document.getElementById('resume') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      setInfoMessage('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.predictions && data.predictions.length > 0) {
        setCareers(data.predictions);
        setScore(data.score); // backend should return this score as a number 0-100
        setShowResult(true);
      } else {
        setInfoMessage('No predictions found.');
      }
    } catch (err) {
      setInfoMessage('Backend not running. This is frontend-only for now.');
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-4xl">
        <h1 className="text-5xl font-bold text-center text-blue-800 mb-6">Resume Uploader</h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Upload your resume in PDF format to get personalized career suggestions.
        </p>

        <form onSubmit={handleUpload} className="flex flex-col items-center space-y-6">
          <input
            type="file"
            id="resume"
            accept=".pdf"
            required
            className="border border-gray-300 rounded px-4 py-3 w-full max-w-md"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-800 transition"
          >
            Upload and Predict
          </button>
        </form>

        {infoMessage && (
          <p className="mt-6 text-center text-red-600 font-medium">{infoMessage}</p>
        )}

        {showResult && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
              Suggested Career Paths:
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-lg text-center">
              {careers.map((career, index) => (
                <li key={index}>{career}</li>
              ))}
            </ul>

            {score !== null && !showScoreBar && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowScoreBar(true)}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  You can check your score here
                </button>
              </div>
            )}

            {score !== null && showScoreBar && (
              <div className="mt-8 flex justify-center">
                <CircularProgress score={score} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Resume;

import React, { useRef, useState, useEffect } from "react";

function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [analysisVisible, setAnalysisVisible] = useState(false);
  const [emotion, setEmotion] = useState("Neutral");
  const [focus, setFocus] = useState("Looking at camera");
  const [suspiciousCount, setSuspiciousCount] = useState(0); 

  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setFocus("Possible distraction detected!");
      } else {
        setFocus("Looking at camera");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const startInterview = async () => {
    setAnalysisVisible(false);
    setInterviewStarted(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws");

      wsRef.current.onopen = () => {
        const intervalId = setInterval(() => {
          if (videoRef.current && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
              wsRef.current.send(dataUrl);
            }
          }
        }, 200);
        intervalRef.current = intervalId as unknown as number;
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.emotion) {
          setEmotion(data.emotion);
        }
        if (data.focus_status) {
          setFocus(data.focus_status);
        }
        if (data.suspicious_count !== undefined) {
          setSuspiciousCount(data.suspicious_count);
        }
      };

      wsRef.current.onclose = () => {};
      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setInterviewStarted(false);
      alert("Failed to start the interview. Please check your camera permissions.");
    }
  };

  const stopInterview = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setInterviewStarted(false);
    setAnalysisVisible(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex flex-col flex-grow p-6">
        {!interviewStarted && !analysisVisible && (
          <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Interview Instructions
            </h1>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>Ensure you are in a quiet, well-lit environment.</li>
              <li>Position your face clearly in front of the camera.</li>
              <li>Do not switch tabs or look away for long periods.</li>
              <li>Maintain eye contact with the camera.</li>
              <li>The interview will monitor your focus and emotions.</li>
            </ul>
            <div className="text-center mt-6">
              <button
                onClick={startInterview}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
              >
                Start Your Interview
              </button>
            </div>
          </div>
        )}
        {interviewStarted && !analysisVisible && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-black rounded-xl overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-80 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">Live Analysis</h2>
                <div className="mb-4">
                  <p className="text-lg font-medium">Current Emotion:</p>
                  <p className="text-xl font-semibold text-blue-600">{emotion}</p>
                </div>
                <div>
                  <p className="text-lg font-medium">Focus Status:</p>
                  <p className="text-xl font-semibold text-green-600">{focus}</p>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-medium">Suspicious Activities:</p>
                  <p className="text-xl font-semibold text-red-600">{suspiciousCount}</p>
                </div>
              </div>
              <button
                onClick={stopInterview}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-6 font-semibold"
              >
                Stop Interview
              </button>
            </div>
          </div>
        )}
        {analysisVisible && !interviewStarted && (
          <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Interview Session Ended
            </h1>
            <p className="text-lg text-center mb-6">
              Here’s the summary of your interview performance:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Final Emotion</h2>
                <p className="text-blue-600 text-lg">{emotion}</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Final Focus Status</h2>
                <p className="text-green-600 text-lg">{focus}</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Suspicious Activities</h2>
                <p className="text-red-600 text-lg">{suspiciousCount}</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={startInterview}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
              >
                Start New Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPage;

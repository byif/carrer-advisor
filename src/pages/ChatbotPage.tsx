import React from "react";
import Chatbot from "../components/chatbot"; // Adjust path if needed

const ChatbotPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">AI Career Advisor</h1>
      <Chatbot />
    </div>
  );
};

export default ChatbotPage;

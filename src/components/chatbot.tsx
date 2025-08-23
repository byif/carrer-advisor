import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setError("");

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error.message}`);
      }

      const data = await response.json();
      const botMessage = {
        role: "assistant",
        content: data.candidates[0].content.parts[0].text,
      };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setError("Failed to get a response. Check API key or network.");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-lg mx-auto p-4 border rounded-lg shadow bg-white mt-4 mb-10">
      <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg">
        <h2 className="text-xl font-bold">AI Career Advisor</h2>
      </div>

      {error && <div className="text-red-500 text-center py-2">{error}</div>}

      <div className="h-96 overflow-y-auto border p-2 rounded-lg bg-gray-50 mt-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-2 mt-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <img
                src="/bot.png"
                alt="Bot"
                className="w-8 h-8 rounded-full border shadow"
              />
            )}
            <div className={`max-w-xs p-2 rounded-lg text-sm ${
              msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-lg flex items-center gap-2">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

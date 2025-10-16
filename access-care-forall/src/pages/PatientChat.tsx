import React, { useEffect, useState } from "react";

interface Message {
  _id: string;
  translatedText: string;
  senderRole: string;
  createdAt: string;
}

export default function PatientChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const patientRes = await fetch("http://localhost:5003/api/chat");
    const patientMsgs = await patientRes.json();
    const doctorRes = await fetch("http://localhost:5003/api/doctor-messages");
    const doctorMsgs = await doctorRes.json();

    const all = [...patientMsgs, ...doctorMsgs].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setMessages(all);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1500);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    await fetch("http://localhost:5003/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, senderRole: "patient" }),
    });
    setInput("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Patient Chat</h2>
      <div className="bg-white border rounded-lg p-4 h-96 overflow-auto mb-3 flex flex-col space-y-2">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`max-w-[75%] p-2 rounded-lg ${
              m.senderRole === "patient"
                ? "bg-green-500 text-white self-end"
                : "bg-blue-200 text-black self-start"
            }`}
          >
            {m.translatedText}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

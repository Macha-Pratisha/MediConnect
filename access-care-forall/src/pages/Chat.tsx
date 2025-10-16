import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";

export default function Chat(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5003");
    setSocket(ws);

    ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event: MessageEvent) => {
      const message = event.data.toString();
      setMessages((prev) => [...prev, message]);
    };

    ws.onclose = () => console.log("WebSocket closed");
    ws.onerror = (error) => console.error("WebSocket error:", error);

    return () => ws.close();
  }, []);

  const handleSend = (): void => {
    if (input.trim() && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setInput("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col items-center p-4 font-sans h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chat Room</h2>

      <div className="flex flex-col w-full max-w-2xl h-[400px] bg-white border border-gray-300 rounded-lg p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-green-200 text-gray-800 p-2 rounded-2xl max-w-[70%] mb-2 break-words"
          >
            {msg}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex w-full max-w-2xl mt-4">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

// components/ChatWindow.jsx
import { useState } from "react";

export default function ChatWindow({ chat, onClose }) {
  const [messages, setMessages] = useState([
    { sender: "them", text: `Hello from ${chat.name}!` },
    { sender: "you", text: "Hi there!" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const isDM = chat.type === "dm";
  const isChannel = chat.type === "channel";

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "you", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full border rounded-lg shadow bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-[#f9fafb]">
        <div className="flex items-center gap-3">
          {chat.image && (
            <img src={chat.image} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
          )}
          <div>
            <p className="text-base font-medium">{chat.name}</p>
            <p className="text-xs text-gray-500">{chat.status}</p>
          </div>
        </div>

        {/* Chat Actions */}
        <div className="flex items-center gap-3">
          {isDM && (
            <>
              <button title="Voice Call" className="text-gray-600 hover:text-blue-600 transition">
                📞
              </button>
              <button title="Video Call" className="text-gray-600 hover:text-blue-600 transition">
                🎥
              </button>
            </>
          )}
          {isChannel && (
            <>
              <button title="Start Meeting" className="text-gray-600 hover:text-blue-600 transition">
                🧑‍💻
              </button>
              <button title="Project Discussion" className="text-gray-600 hover:text-blue-600 transition">
                💬
              </button>
            </>
          )}
          <button title="Assign Task" className="text-gray-600 hover:text-blue-600 transition">
            ✅
          </button>
          <button title="More" className="text-gray-600 hover:text-blue-600 transition">
            ⋯
          </button>
          <button
            onClick={onClose}
            className="ml-2 text-sm text-blue-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              msg.sender === "you" ? "bg-blue-100 self-end ml-auto" : "bg-gray-100 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-4 border-t gap-2 bg-white">
        <input
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

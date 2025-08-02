// pages/Messages.jsx
import { useState } from "react";
import MessageList from "../components/MessageList";
import ChatWindow from "../components/ChatWindow";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Left pane: Message List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <MessageList onSelectChat={setSelectedChat} />
      </div>

      {/* Right pane: Chat Window or Placeholder */}
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} onClose={() => setSelectedChat(null)} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

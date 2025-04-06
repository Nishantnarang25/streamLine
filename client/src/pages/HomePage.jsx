import React from "react";
import Navbar from "../components/Navbar";
import { useChat } from "../context/useChat";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const { selectedUser } = useChat();

  return (
    <div className="bg-slate-100">
      <Navbar />

      <div className="flex flex-row h-screen">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center">
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

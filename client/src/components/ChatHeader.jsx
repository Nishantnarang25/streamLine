import React from "react";
import { useChat } from "../context/useChat";
import { authContext } from "../context/authContext";
import { FaUserCircle } from "react-icons/fa";


const ChatHeader = () => {
  
   
  
  const { selectedUser, setSelectedUser } = useChat();
  const { onlineUsers } = authContext();

  const isOnline =
    Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser?._id);

  return (
    <div className="flex items-center justify-between gap-4 bg-white p-1 px-4 py-2 rounded-t-lg shadow-sm">
      {selectedUser ? (
        <>
        <div className="flex justify-start space-x-4">
          <div className="relative rounded-md">
            {selectedUser.profilePic ? (
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
                className="w-14 h-14 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ">
                <FaUserCircle className="text-4xl text-gray-500" />
              </div>
            )}
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black/90">
              {selectedUser.fullName}
            </h2>
            <p
              className={`text-sm ${isOnline ? "text-green-400 font-medium" : "text-black/60"}`}
            >
              {isOnline ? "● Online" : "Offline"}
            </p>
          </div>
          </div>
          
      <button className="text-black mt-2 self-center px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300" onClick={() => setSelectedUser(null)}>
        X
      </button>
        </>
      )
        : (


          <h2 className="text-6xl font-semibold mb-2">No User Selected</h2>
        )}
    </div>
  );
};

export default ChatHeader;

import React, { useEffect, useState } from "react";
import { useChat } from "../context/useChat";
import { authContext } from "../context/authContext";
import logo from "../assets/logobg.png";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const Sidebar = () => {
  const { getUsers, selectedUser, setSelectedUser, users, isUsersUploading } = useChat();
  const { authUser, logout, onlineUsers } = authContext();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const navigate = useNavigate();

   useEffect(() => {
    getUsers();
  }, [getUsers]);

  const toggleOverlay = () => setIsOverlayOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setIsOverlayOpen(false);
  };

  if (isUsersUploading) return <h1 className="text-center text-lg">Loading...</h1>;

  return (
    <div className="w-96 text-black/90 h-screen flex flex-col mr-2 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="w-full flex rounded-md shadow-sm bg-white p-3 px-6 items-center justify-between relative">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-2 shadow-sm border-2 border-[#794AF6]/60">
            <img src={logo} className="h-6" alt="QuickTalk Logo" />
          </div>
          <div className="text-left">
            <p className="text-sm text-black/60 font-medium">Welcome back,</p>
            <h2 className="text-lg font-semibold text-black/90">{authUser?.fullName || "User"}</h2>
          </div>
        </div>

        {authUser && (
          <div className="relative">
            <button
              onClick={toggleOverlay}
              className="w-13  h-13 rounded-full overflow-hidden border-2 border-gray-200 bg-white"
            >
              <div className="relative rounded-md">
                {authUser.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt={authUser.fullName}
                    className="w-14 h-14 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUserCircle className="text-4xl text-gray-500" />
                  </div>
                )}
              </div>
            </button>

            {isOverlayOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-md border border-gray-100 p-4 z-50">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsOverlayOpen(false);
                  }}
                  className="flex items-center w-full py-2 font-medium text-black/60 hover:text-black/70"
                >
                  <FaUserCircle className="mr-3 text-lg" />
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center font-medium w-full py-2 text-black/60 hover:text-black/70"
                >
                  <FaSignOutAlt className="mr-3 text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat List */}
      <div className="space-y-2 p-2">
        <h1 className="text-2xl font-bold p-2 text-black/90">Chats</h1>

        {users.length > 0 ? (
          users
            .sort((a, b) => a.fullName.localeCompare(b.fullName)) // optional sorting
            .map((user) => {
              const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);

              return (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center gap-3 p-3 w-full rounded-md transition-all shadow-sm
                    ${selectedUser?._id === user._id ? "bg-white" : "bg-white hover:bg-white/50"}
                    ${isOnline ? "border-2 border-gradient-to-r from-[#794AF6] to-[#B749FF] bg-gray-200" : ""}
                  `}
                >
                  <div className="relative">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className={`w-12 h-12 rounded-full object-cover border-2 ${isOnline ? "border-[#794AF6]" : "border-gray-600"}`}
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full border-2 ${isOnline ? "border-[#794AF6]" : "border-gray-600"}`}
                      >
                        <FaUserCircle className="text-2xl text-gray-500" />
                      </div>
                    )}

                    {isOnline && (
                      <>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="text-lg font-medium text-black/80">{user.fullName}</span>
                    <span className={`text-sm ${isOnline ? "text-green-400 font-semibold" : "text-gray-400"}`}>
                      {isOnline ? "● Online" : "Offline"}
                    </span>
                  </div>
                </button>
              );
            })
        ) : (
          <p className="text-gray-400 text-sm">No users available</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
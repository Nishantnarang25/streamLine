import React from "react";

const NoChatSelected = () => {
  return (
    <div className="h-[400px] w-full flex items-center justify-center">
    <div className="flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-2xl text-black/80 font-semibold mb-2">
        No Chat Selected
      </h2>
      <p className="text-base text-black/60">
        Select a user from the sidebar to start a conversation.
      </p>
    </div>
  </div>

  
  );
};

export default NoChatSelected;

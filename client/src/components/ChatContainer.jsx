import React, { useEffect, useRef } from "react";
import { useChat } from "../context/useChat";
import { authContext } from "../context/authContext";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { FaUserCircle } from "react-icons/fa";


const ChatContainer = () => {
    const {
        selectedUser,
        messages,
        getMessages,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChat();

    const { authUser } = authContext();
    const bottomRef = useRef(null);

    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
            subscribeToMessages();
            return () => unsubscribeFromMessages();
        }
    }, [selectedUser?._id]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col w-full h-full bg-gray-50 overflow-hidden relative">
            {/* Header remains fixed */}
            <ChatHeader />

            {/* Scrollable message section with bottom padding */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 pb-28">
                {messages?.length ? (
                    messages.map((message) => {
                        const isSent = message.senderId === authUser._id;

                        return (
                            <div
                                key={message._id}
                                className={`flex items-center gap-3 ${isSent ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {!isSent && (
                                    selectedUser?.profilePic ? (
                                        <img
                                            src={selectedUser.profilePic}
                                            className="w-12 h-12 rounded-full"
                                            alt="Sender"
                                        />
                                    ) : (
                                        <FaUserCircle className="w-10 h-10 text-gray-400" />
                                    )
                                )}


                                <div className="flex flex-col items-start pt-4 max-w-full">
                                    {message.image ? (
                                        <img
                                            src={message.image}
                                            alt="Sent media"
                                            className="max-w-xs rounded-md"
                                        />
                                    ) : (
                                        <div
                                            className={`rounded-lg px-5 py-3 text-base shadow-sm max-w-lg ${isSent
                                                ? "bg-gradient-to-br from-[#794AF6] to-[#B749FF] text-white text-right"
                                                : "bg-gray-100 text-black text-left"
                                                }`}
                                        >
                                            <p className="text-lg">{message.text}</p>
                                        </div>
                                    )}
                                    <p
                                        className={`text-sm mt-1 w-full ${isSent ? "text-right text-black/60" : "text-left text-gray-500"}`}
                                    >
                                        {new Date(message.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </p>


                                </div>

                                {isSent && (
                                    <img
                                        src={authUser.profilePic || "/avatar.png"}
                                        className="w-10 h-10 mb-2 rounded-full"
                                        alt="You"
                                    />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex h-full items-center flex-col gap-2 justify-center">
                        <p className="text-black/70 text-xl text-center">No Messages yet.</p>

                        <p className="text-black/60 text-lg text-center">Send a message to start a conversation.</p>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <div className="fixed bottom-0 right-0 w-full max-w-[1510px] bg-white border-2 border-gray-100 z-10 px-4 md:px-8">
                <MessageInput />
            </div>



        </div>
    );
};

export default ChatContainer;

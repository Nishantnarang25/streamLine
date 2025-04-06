import { create } from "zustand";
import axios from "axios";
import { authContext } from "./authContext";

export const useChat = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersUploading: false,
  isMessagesUploading: false,

  getUsers: async () => {
    set({ isUsersUploading: true });
    try {
      const res = await axios.get("http://localhost:5000/api/messages/users", { withCredentials: true });
      console.log("Fetched users:", res.data);
      set({ users: res.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      set({ isUsersUploading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesUploading: true, messages: [] }); // <- clear messages first
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
        withCredentials: true,
      });
  
      if (Array.isArray(res.data)) { //fetching Messages Array
        set({ messages: res.data });

      } else {
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ isMessagesUploading: false });
    }
  },  

  sendMessage: async (messageData) => {
    const selectedUser = get().selectedUser;
    if (!selectedUser) {
      console.error("No user selected for sending a message.");
      return;
    }
  
    try {
      const res = await axios.post(
        `http://localhost:5000/api/messages/send/${selectedUser._id}`,
        messageData,
        { withCredentials: true }
      );
  
      if (res.data && res.data.newMessage) {  // Ensure response has newMessage
        set((prev) => ({
          messages: [...prev.messages, res.data.newMessage],  //Append new message
        }));
        console.log("Updated messages:", get().messages);

      } else {
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  },
  
  subscribeToMessages: () => {
    const socket = authContext.getState().socket; //getting the socket connection from authContext.js
  
    socket.on("newMessage", (newMessage) => { //this event is emitted by server everytime a new message is sent - check messageConroller.js
      const selectedUser = get().selectedUser;
  
      if (
        !selectedUser ||
        (newMessage.senderId !== selectedUser._id &&
         newMessage.receiverId !== selectedUser._id)
      ) {
        return;
      }
  
      set((prev) => ({
        messages: [...prev.messages, newMessage],
      }));
    });

  },
  
  unsubscribeFromMessages: () => {
    const socket = authContext.getState().socket;
    socket.off("newMessage");
  },
  
  setSelectedUser: (selectedUser) => set({ selectedUser })

}));

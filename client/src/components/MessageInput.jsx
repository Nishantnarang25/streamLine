import React, { useState } from "react";
import { FaPaperPlane, FaTimes, FaImage } from "react-icons/fa";
import { useChat } from "../context/useChat";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store original file

  const { sendMessage, selectedUser } = useChat();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageFile(file); // Store file for upload

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Convert to Base64
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSendMessage = async () => {
    if (message.trim() || imagePreview) {
      await sendMessage({ text: message, image: imagePreview });

      setMessage("");
      setImagePreview(null);
      setImageFile(null);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 py-4 min-h-24 w-full rounded-t-lg">

      <label className="cursor-pointer text-gray-500 hover:text-blue-600">
        <FaImage size={25} className="mr-4"/>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>

      <input
        type="text"
        className="flex-1 p-2 border rounded-lg bg-[#f0f0f0] text-black/80 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {imagePreview && (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          <img
            src={imagePreview}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            onClick={removeImage}
            title="Remove Image"
          >
            <FaTimes size={12} />
          </button>
        </div>
      )}

      <button
        className="ml-2 px-4 py-4 rounded-lg text-white bg-gradient-to-br from-[#794AF6] to-[#4F9DFF] hover:opacity-90 transition duration-200"
        onClick={handleSendMessage}
        title="Send Message"
      >
        <FaPaperPlane size={20} />
      </button>
    </div>
  );
};

export default MessageInput;

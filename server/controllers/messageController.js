import User from "../models/User.js";
import Messages from "../models/Messages.js" //Importing message Model
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocket } from "../config/socket.js";
import { io } from "../config/socket.js"

export const UserForChats = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        const loggedInUser = req.user._id;

        // Finding all users except the logged-in user and excluding passwords
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password"); //-password is used to exclude password while retrieving rows

        return res.status(200).json(filteredUsers);

    } catch (error) {
        return res.status(500).json({
            message: "Error getting users for messages - messageController.js",
            error: error.message
        });
    }
};

export const getMessagesFromChats = async (req, res) => {
    try {
      const { id: userToChatId } = req.params; //userToChatId is extracted from the request parameters
      const myId = req.user._id;
  
      console.log("Fetching messages for:", myId, "and", userToChatId); 
  
      const messages = await Messages.find({
        $or: [ //The $or operator is used to find messages that match either of the conditions.
          { senderId: myId, recieverId: userToChatId },
          { senderId: userToChatId, recieverId: myId },
        ],
      }).sort({ createdAt: 1 });
  
      console.log("Messages fetched from DB:", messages);   
      res.status(200).json(messages);

    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadedImage.secure_url;
        }

        const newMessage = new Messages({
            text,
            image: imageUrl,
            senderId,
            recieverId: receiverId
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocket(receiverId) // Get the socket Id of the reciever

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        return res.status(200).json({ message: "Message sent successfully", newMessage });

    } catch (error) {
        return res.status(500).json({
            message: "Error sending messages /send:id",
            error: error.message
        });
    }
};

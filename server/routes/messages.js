import express from "express";
import { UserForChats, getMessagesFromChats, sendMessage } from"../controllers/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/users", protectRoute, UserForChats); //UserForChats is used for getting all users
router.get("/:id", protectRoute,  getMessagesFromChats); //getMessagesFromChats is used to get messages between users
router.post("/send/:id", protectRoute, sendMessage); //sendMessage is used to send messages 

export default router

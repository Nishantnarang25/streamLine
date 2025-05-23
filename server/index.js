import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import messageRouter from "./routes/messages.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser"; //Important!!
import {app, server} from "./config/socket.js" 

dotenv.config();

const PORT = process.env.PORT || 10000;

//this is used to allow cross origin req means allowing res from different domains
const corsOptions = {
  origin: 'http://localhost:5173', // Allow frontend URL
  credentials: true, // Allow cookies to be sent along with the request
};

app.use(express.json());
app.use(cookieParser()); //for parsing cookies (we require this because in authMiddleware.js we are using req.cookies.jwt to check if user is logged in or not)
app.use(cors(corsOptions));  

app.use(express.urlencoded({ extended: true })); // Allows form submissions

connectDB(); //connect to db

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

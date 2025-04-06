//using Server, http and express to create a server

import { Server } from "socket.io"; 
import http from "http"; 
import express from "express"

const app = express(); //creating an express server
const server = http.createServer(app); //creating an http server

//creating a socket.io server
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:5173"] //connecting with the frontend
    }
})


export function getReceiverSocket(userId){
    return userSocketMap[userId]
}


const userSocketMap = {} //creating a map to store socket ids of online users

io.on("connection", (socket)=>{
    
    console.log("Connection is build", socket.id)

    const userId = socket.handshake.query.userId //socket.handshake is used to access the query parameters whenevera new connction is established or get.connectSocket() is called

    if(userId) userSocketMap[userId] =  socket.id //storing the fetched id in userSocketMap

    io.emit("getOnlineUsers", Object.keys(userSocketMap)) //This gets an array of all the userIds (keys) in the userSocketMap, representing the users who are currently online.

    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { io, app, server};
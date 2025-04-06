//The utils.js (or utils folder) contains reusable helper functions that are used throughout your project.

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

export const generateToken = (userId, res) => {

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }); //generating a Token
   
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, // ✅ For localhost, this should be false
        sameSite: "lax", // ✅ Lax works well across different ports on localhost
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });      
      //sending a token to a cookie

    return token;

};

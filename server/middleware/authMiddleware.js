//this middleware is used to check if the user is logged in or not which is called when user updates their profile 
import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Extractig JWT from cookie

        if (!token) {
            return res.status(401).json({ message: "Couldn't get token from cookie - for User" });
        }
   
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //using JWT secret Key to decode the token
        const user = await User.findById(decoded.id); //finding the User using decoded token (const token = jwt.sign({ id: userId },... in  authController.js)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });

    }
};

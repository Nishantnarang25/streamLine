import { generateToken } from "../config/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js"


export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    console.log("The body is sent to signup function in server/authController.js:", req.body);

    if (!email || !fullName || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        if (password.length < 8) {
            return res.status(400).json({ message: "The password must be at least 8 characters long" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // hash password

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
        });

        await newUser.save()// Save the user first

        generateToken(newUser._id, res); // Generate token after saving

        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ message: "Error signing up - inside AuthController", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password); //comparing entered password (password) with hashed password (user.password)
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        generateToken(user._id, res);
        res.status(200).json({ message: "User logged in successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
      const { profilePic, name } = req.body;
      const userId = req.user._id;
  
      // If neither profilePic nor name is provided, return an error
      if (!profilePic && !name) {
        return res.status(400).json({ message: "At least one field (profile pic or full name) is required" });
      }
  
      const updateFields = {};
  
      // Update profilePic if it's provided
      if (profilePic) {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updateFields.profilePic = uploadResponse.secure_url;
      }
  
      // Update fullName if name is provided
      if (name) {
        updateFields.fullName = name; // Ensure you're updating the `fullName` field in the database
      }
  
      // Update the user with the new fields
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
  
      // Log the updated user data
      console.log(updatedUser, "This is the user's info after update");
  
      // Return the updated user data
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("Error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user); //When user sends request to /check, protectRoutes run, it gets the user and stores inside user
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
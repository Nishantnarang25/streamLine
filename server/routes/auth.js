import express from "express";
import { login, signup, logout, updateProfile, checkAuth } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router= express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.put("/updateUser", protectRoute, updateProfile) //protectRoute is a middleware that helps check si user is logged in or not
router.get("/check", protectRoute, checkAuth)

export default router;
//setting up cloudinary connection - used for storing, managing, and optimizing images and videos in web applications.

import { v2 as cloudinary} from "cloudinary";
import {config} from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
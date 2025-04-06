# StreamLine 

StreamLine is a real-time, full-stack chat web application designed to offer fast, secure, and responsive communication. Built with modern technologies, it ensures seamless messaging, user authentication, and a polished UI experience across devices.

---

## Features

- Real-time messaging using WebSockets
- Secure user authentication with JWT
- Password hashing with bcrypt
- Image uploading with Cloudinary
- Responsive and animated UI
- Modular state management

---

## Tech Stack

**Frontend:**
- React
- Axios
- Zustand (for state management)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io (for real-time communication)
- bcrypt & jsonwebtoken (for secure auth)
- Cloudinary (for media handling)

**Others:**
- dotenv (for environment configuration)
- CORS, Cookie-parser

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/StreamLine.git
cd StreamLine

# 2. Setup Backend
cd server
npm install

# Create a .env file inside /server with the following content:
# (replace with your actual credentials)
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 3. Setup Frontend
cd ../client
npm install
npm run dev

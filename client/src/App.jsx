import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import { Loader } from "lucide-react";
import { authContext } from "./context/authContext.js";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = authContext();
  console.log("Printing all online uers", onlineUsers)
  useEffect(() => {
    checkAuth();

  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    ); 
  }
  
  return (
    <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes> 
  );
}

export default App;

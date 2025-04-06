import React, { useState, useEffect } from 'react';
import { authContext } from "../context/authContext.js";
import { Loader } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"


const LoginPage = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const { logIn, isLoggingIn, checkAuth, authUser } = authContext();

  useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Logging in with data:", data);

    await logIn(data);

    await checkAuth();
    navigate("/"); 

  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-sm w-96">

        <div className="flex justify-center mb-2">
          <img src={logo} className='h-16' alt="QuickTalk Logo" />
        </div>
        <h1 className="text-center text-xl font-semibold text-gray-800 mb-4">Login for an Account</h1>

        <p className="text-center text-gray-600 px-3 mb-6">We missed you! Please enter your details.</p>


        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none text-black/90 focus:ring-2 focus:ring-blue-700 bg-white placeholder-gray-500"
            onChange={handleInputChange}
            value={data.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none text-black/90 focus:ring-2 focus:ring-blue-700 bg-white placeholder-gray-500"
            onChange={handleInputChange}
            value={data.password}
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#794AF6] to-[#B749FF] text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <div className="flex flex-row gap-4">
                <Loader className="animate-spin" /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </button>
        </form>


        <p className="text-center text-md text-gray-600 mt-4">
          Don't have an account?
          <a href="/signup" className="text-blue-700 text-md font-medium"> Signup</a>
        </p>
      </div>
    </div>

  );
};

export default LoginPage;

import React, { useState } from 'react';
import { authContext } from "../context/authContext.js";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const SignupPage = () => {

  const navigate = useNavigate();
  const { signUp, isSigningUp } = authContext();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target; //destructing the name and value from the inputs 
    setData({
      ...data,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!data.fullName || !data.email || !data.password) {
      console.log("All fields are required");
      return false;
    }
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)) {
      console.log("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    if (!validateForm()) {
      console.log("Please correct the errors in the form");
      return;
    }
    console.log("Form is being submitted...", data)    
     await signUp(data);
     
     navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded-lg shadow-sm w-96">
      <div className="flex justify-center mb-2">
        <img src={logo} className='h-16' alt="QuickTalk Logo" />
      </div>
      
      <h1 className="text-center text-xl font-semibold text-gray-800 mb-4">Sign Up for an Account</h1>
  
      <p className="text-center text-gray-600 px-3 mb-6">Let’s get all your sets ready so you can start your chat journey.</p>
  
      <form onSubmit={handleSubmit}> 
        <input 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none text-black/90 focus:ring-2 focus:ring-blue-700 bg-white placeholder-gray-500"
          onChange={handleInputChange}
          value={data.fullName}
        />
  
        <input
          type="email" 
          name="email" 
          placeholder="you@example.com" 
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none  text-black/90 focus:ring-2 focus:ring-blue-700 bg-white placeholder-gray-500"
          onChange={handleInputChange}
          value={data.email}
        />
  
        <input
          type="password" 
          name="password" 
          placeholder="Password" 
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none  text-black/90 focus:ring-2 focus:ring-blue-700 bg-white placeholder-gray-500"
          onChange={handleInputChange}
          value={data.password}
        />
  
        {/* Submit Button */}
        <button
          type="submit" // Submit the form via onSubmit
          className="w-full py-3 bg-gradient-to-r from-[#794AF6] to-[#B749FF] text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          disabled={isSigningUp} // Disable button while signing up
        >
          {isSigningUp ? (
            <div className='flex flex-row gap-4'>
              <Loader className="animate-spin" /> Loading...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
  
      <p className="text-center text-md text-gray-600 mt-4">
        Already have an account? 
        <a href="/login"  className="text-blue-700 text-md font-medium"> Login</a>
      </p>
    </div>
  </div>
  
  );
};

export default SignupPage;

import { useState } from "react";
import { authContext } from "../context/authContext.js";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const { authUser, logout } = authContext(); // Access auth state & logout function
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/profile");
    };

   

    return (
        <nav className="w-full flex flex-col gap-2 mb-2">
            <div className="w-full bg-white  p-3 px-8 shadow-sm flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black/90 bg-clip-text bg-gradient-to-r">
                    StreamLine
                </h1>

                <div className="flex items-center gap-4">

                    <p className="text-black/40 font-medium text-pretty">CREATED BY NISHANT</p>
                </div>
            </div>

           
        </nav>
    );
};

export default Navbar;


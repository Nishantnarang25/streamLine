import { create } from "zustand";
import axios from "axios";
import {io} from "socket.io-client"

export const authContext = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,
    socket: null, //used to store socket connection/instance

    checkAuth: async () => {
        try {
            console.log("Checking authentication...");

            const response = await axios.get("https://streamline-vpoj.onrender.com/api/auth/check", {
                withCredentials: true, // this allows sending cookies
            });

            console.log("Checked Auth:", response.data); //Debugging response

            set({ authUser: response.data, isCheckingAuth: false });

            console.log("New User signup", response.data)
            get().connectSocket()


        } catch (error) {
            console.error("Auth check failed:", error.response?.data || error.message);
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    signUp: async (data) => {

        set({ isSigningUp: true });

        try {
            const user = await axios.post("https://streamline-vpoj.onrender.com/api/auth/signup", data, { withCredentials: true });
            set({ authUser: user.data, isSigningUp: false });

            get().connectSocket()


        } catch (error) {
            console.error("Error signing up:", error.response?.data || error.message);
            set({ isSigningUp: false });
        }

    },

    logIn: async (data) => {
        set({ isLoggingIn: true });
        console.log("Trying to login the user AuthContext - ", data);

        try {
            const response = await axios.post(
                "https://streamline-vpoj.onrender.com/api/auth/login",
                data,
                { withCredentials: true } // Allow sending cookies
            );

            console.log("Login response:", response.data); // Debugging line
            set({ authUser: response.data, isLoggingIn: false });

            get().connectSocket()


        } catch (error) {
            console.error("Error logging in:", error.response?.data || error.message);
            set({ isLoggingIn: false });
        }
       
    },

    logout: async () => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
            set({ authUser: null }); //set({ authUser: null });
            get().disconnectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data)=>{
        set({isUpdatingProfile: true});
        try{
            const response = await axios.put("/api/auth/updateUser", data, {withCredentials: true} )
            set({authUser: response.data})
        } catch (error){
            console.log("Error occured in updateProfile in authContext", error.message)
        } finally {
            set({isUpdatingProfile: false})
        }

    },

    connectSocket: async()=>{

        const {authUser} = get(); //getting the current logged in User

        if(!authUser || get().socket?.connected) return ;  //if user isnnot loggedin or socket is already connected simply return

        const socket = io("https://streamline-vpoj.onrender.com", { 
            query:{
                userId: authUser._id //passing the user Id
            }
        });

        socket.connect(); 

        set({socket: socket}) // this stores the socket instance in the stat

        socket.on("getOnlineUsers", (userIds)=>{ //getOnlineUsers event that is emitted by the server. check socket.js line 33  
            set({onlineUsers: userIds})
        })
    },

    disconnectSocket: async()=>{
        if (get().socket?.connected) get().socket.disconnect();
    }

}));

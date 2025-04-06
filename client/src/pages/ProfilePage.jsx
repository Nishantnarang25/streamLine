import { useState, useEffect } from "react";
import { authContext } from "../context/authContext";
import { Camera, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser, isUpdatingProfile, updateProfile } = authContext();
  const [selectedImg, setSelectedImg] = useState(null);

  const [data, setData] = useState({
    name: authUser?.fullName || '',
    profilePic: '',
  });

  useEffect(() => {
    if (authUser) {
      setData({
        name: authUser.fullName || '',
        profilePic: authUser.profilePic || '',
      });
    }
  }, [authUser]); 

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file); // Read the file as a data URL

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to store the fields to be updated
    const updatedData = {
      profilePic: selectedImg || authUser.profilePic, // If the image is not updated, keep the old one
      name: data.name || authUser.fullName, // If name is empty, keep the old name
    };

    console.log("This is being passed to updateProfile", updatedData);

    // Only call updateProfile if there is any updated data
    await updateProfile(updatedData);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
        <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-blue-700 hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 "
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-base-content hover:scale-105
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`
                  }
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder={authUser?.fullName}
                  value={data.name}
                  onChange={handleChange}
                  className="px-4 py-2.5 bg-base-200 rounded-lg w-full border"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  Email
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg w-full border cursor-not-allowed">
                    {authUser?.email}
              
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary px-4 py-2.5 my-8 rounded-lg text-white bg-blue-700 transition-all duration-200"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? "Updating..." : "Update Profile"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

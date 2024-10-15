import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../../utils/AppContext";
import { FaCamera, FaTrash } from "react-icons/fa";
import useShowToasts from "../../../utils/hooks/showToasts";
import { updateProfile, verifyEmail } from "../../../utils/api/apiCalls";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    username: "",
    avatar: "",
    bio: "",
  });
  const [loading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<File | null>(null);

  const avatarPreview = avatar ? URL.createObjectURL(avatar) : profile.avatar;
  const { showToast } = useShowToasts();

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        avatar: user.avatar || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleRemoveAvatar = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      avatar: "REMOVE_AVATAR",
    }));
    setAvatar(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedTypes.includes(file.type)) {
        setAvatar(file);
      } else {
        showToast("Please select a valid image file (jpg, jpeg, png).");
        setAvatar(null);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("bio", profile.bio);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    if (profile.avatar === "REMOVE_AVATAR") {
      formData.append("removeAvatar", "true");
    }

    try {
      const res = await updateProfile(formData);
      if (res.success) {
        navigate("/homePage");
      } else {
        showToast(res.message);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      const res = await verifyEmail(profile.email);
      if (res.success) {
        navigate("/changeEmail", {
          state: { email: user?.email },
        });
      } else {
        showToast(res.message);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex justify-between">
      <div className="px-8 py-10 flex-1 flex items-center justify-center">
        <div className="px-8 py-10 md:shadow-xl bg-gray-700 rounded-lg md:max-w-sm w-full">
          <p className="text-2xl font-bold text-center text-gray-100">
            Update your profile
          </p>
          <div className="mt-10 w-full">
            <div className="flex justify-center">
              {avatarPreview ? (
                <div className="relative">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="rounded-full w-28 h-28 object-cover"
                  />
                  <button
                    onClick={handleRemoveAvatar}
                    className="absolute top-2 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                  >
                    <FaTrash style={{ color: "#cf4e59" }} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="avatar"
                  className="p-12 md:p-16 border border-dashed rounded-full w-fit cursor-pointer hover:border-gray-400 transition duration-300"
                >
                  <FaCamera className="text-gray-500" />
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="username" className="font-semibold text-gray-300">
              Username
            </label>
            <input
              disabled
              type="text"
              name="username"
              placeholder={profile.username}
              className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={profile.username.toUpperCase()}
            />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="name" className="font-semibold text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="email" className="font-semibold text-gray-300">
              Email
            </label>
            <input
              disabled
              type="email"
              name="email"
              className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={profile.email}
            />
            <div onClick={sendEmail}>
              <p className="text-blue-500 text-right hover:underline cursor-pointer">
                Change Email
              </p>
            </div>
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="bio" className="font-semibold text-gray-300">
              Bio
            </label>
            <input
              type="text"
              name="bio"
              placeholder="Enter your bio"
              className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={profile.bio}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="border w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

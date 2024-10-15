import { useState } from "react";
import { FaBars, FaSearch, FaTimes, FaPen } from "react-icons/fa";
import { useAppContext } from "../../../utils/AppContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-gray-100 dark:bg-gray-900 shadow-md w-full z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div
            className="font-mono italic text-2xl text-cyan-500 font-bold cursor-pointer transition hover:text-cyan-400"
            onClick={() => navigate("/")}
          >
            textTides
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div
              className="flex items-center cursor-pointer hover:text-cyan-500 transition text-white"
              onClick={() => navigate("/writeBlog")}
            >
              <FaPen />
              <p className="font-semibold px-2 ">Write</p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-500 outline-none transition w-64"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500 dark:text-gray-400" />
            </div>

            <div
              className="relative pl-5 cursor-pointer"
              onClick={() => setProfileModal(!profileModal)}
            >
              <img
                src={user?.avatar || "/assets/default_User.jpg"}
                alt={user?.username || "Profile"}
                className="w-10 h-10 rounded-full border-2 border-cyan-500 hover:ring-2 hover:ring-cyan-500 transition"
              />
            </div>
          </div>
          <div className="md:hidden flex">
            <div className=" items-center px-5">
              <button
                className="text-gray-600 dark:text-gray-300 focus:outline-none"
                onClick={() => setSearchBar(!searchBar)}
              >
                <FaSearch size={24} />
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={handleToggleMenu}
                className="text-gray-600 dark:text-gray-300 focus:outline-none"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {profileModal && (
          <div className="absolute right-5 top-14 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48">
            <ul className="text-gray-700 dark:text-gray-100">
              <Link to={"/myProfile"}>
                <li className="hover:bg-cyan-500 hover:text-white font-semibold p-3 rounded-t-md transition cursor-pointer">
                  My Profile
                </li>
              </Link>
              <Link to={"/userBlogs"}>
                <li className="hover:bg-cyan-500 hover:text-white font-semibold p-3 transition cursor-pointer">
                  My Posts
                </li>
              </Link>
              <Link to={"/changePassword"}>
                <li className="hover:bg-cyan-500 hover:text-white font-semibold p-3 transition cursor-pointer">
                  Change Password
                </li>
              </Link>
              <li
                onClick={handleSignOut}
                className="hover:bg-red-500 hover:text-white font-semibold p-3 rounded-b-md transition cursor-pointer"
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}

        {isOpen && (
          <div className="md:hidden bg-gray-100 dark:bg-gray-900 px-6 py-4 space-y-4 shadow-lg items-center justify-center flex-col">
            <div
              className="flex items-center cursor-pointer hover:bg-cyan-500 rounded-md px-3 py-2 transition text-white justify-center"
              onClick={() => {
                navigate("/writeBlog");
                setIsOpen(false);
              }}
            >
              <FaPen />
              <p className="font-semibold px-2 ">Write</p>
            </div>
            <div
              onClick={() => {
                navigate("/myProfile");
                setIsOpen(false);
              }}
              className="flex items-center cursor-pointer hover:bg-cyan-500 rounded-md px-3 py-2 transition text-white justify-center"
            >
              My Profile
            </div>
            <div
              onClick={() => {
                navigate("/userBlogs");
                setIsOpen(false);
              }}
              className="flex items-center cursor-pointer hover:bg-cyan-500 rounded-md px-3 py-2 transition text-white justify-center"
            >
              My Posts
            </div>
            <div
              onClick={() => {
                navigate("/changePassword");
                setIsOpen(false);
              }}
              className="flex items-center cursor-pointer hover:bg-cyan-500 rounded-md px-3 py-2 transition text-white  justify-center"
            >
              Change Password
            </div>
            <div
              onClick={handleSignOut}
              className="flex items-center cursor-pointer hover:bg-red-500 rounded-md px-3 py-2 transition text-white  justify-center"
            >
              Sign Out
            </div>
          </div>
        )}
        {searchBar && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-500 outline-none transition w-full"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500 dark:text-gray-400" />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

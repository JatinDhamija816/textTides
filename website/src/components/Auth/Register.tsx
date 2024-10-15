import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerValidate } from "../../../utils/validations/register";
import { register } from "../../../utils/api/apiCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useShowToasts from "../../../utils/hooks/showToasts";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToasts();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validateUser = registerValidate(user);
    if (validateUser.length > 0) {
      showToast(validateUser[0].message);
    } else {
      try {
        const res = await register(user);
        if (res.success) {
          navigate("/profileSetup", {
            state: { username: res.username, name: user.name },
          });
        } else {
          showToast(res.message);
        }
      } catch (error) {
        showToast("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex justify-between">
      <div className="px-8 py-10 flex-1 flex items-center justify-center">
        <div className="px-8 py-10 md:shadow-xl bg-gray-700 rounded-lg md:max-w-sm w-full">
          <p className="text-2xl font-bold text-center text-gray-100">
            Sign up to textTides
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-5">
              <label htmlFor="name" className="font-semibold text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col my-5">
              <label htmlFor="email" className="font-semibold text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col my-5 relative">
              <label htmlFor="password" className="font-semibold text-gray-300">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.password}
                onChange={handleChange}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </div>
            </div>
            <div className="flex flex-col my-5 relative">
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.confirmPassword}
                onChange={handleChange}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-gray-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="border w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Register"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-center pt-5 text-gray-400">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Sign In
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

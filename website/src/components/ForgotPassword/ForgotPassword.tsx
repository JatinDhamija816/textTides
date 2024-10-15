import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { forgotPassword } from "../../../utils/api/apiCalls";
import useShowToasts from "../../../utils/hooks/showToasts";
import { passwordValidate } from "../../../utils/validations/password";

const ForgotPassword = () => {
  const location = useLocation();
  const { identifier } = location.state || {};
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showToast } = useShowToasts();

  const handleSubmit = async () => {
    setLoading(true);

    const passwordError = passwordValidate(password, confirmPassword);
    if (passwordError.length) {
      showToast(passwordError[0].message);
    } else {
      try {
        const res = await forgotPassword(identifier, password, confirmPassword);
        if (res.success) {
          navigate("/login");
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
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <div className="px-8 py-10 flex-1 flex items-center justify-center">
        <div className="px-8 py-10 md:shadow-xl bg-gray-700 rounded-lg md:max-w-sm w-full">
          <p className="font-bold text-2xl text-center text-gray-100 py-5">
            Forgot Password
          </p>

          <div className="flex flex-col my-5 relative">
            <label htmlFor="password" className="font-semibold text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              required
              className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          <div className="flex justify-center mt-10">
            <button
              onClick={handleSubmit}
              className="border w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

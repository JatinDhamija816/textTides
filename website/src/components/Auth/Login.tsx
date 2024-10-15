import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../utils/api/apiCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useShowToasts from "../../../utils/hooks/showToasts";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useShowToasts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(identifier, password);
      if (res.success) {
        navigate("/homePage");
      } else {
        showToast(res.message);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex justify-between">
      <div className="px-8 py-10 flex-1 flex items-center justify-center">
        <div className="px-8 py-10 md:shadow-xl bg-gray-700 rounded-lg md:max-w-sm w-full">
          <p className="font-bold text-2xl text-center text-gray-100 py-5">
            Sign in to textTides
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex-col">
              <div className="flex flex-col my-5">
                <label
                  htmlFor="identifier"
                  className="font-semibold text-gray-300"
                >
                  Email or Username
                </label>
                <input
                  type="text"
                  placeholder="Email or Username"
                  required
                  className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-5 relative">
                <label
                  htmlFor="password"
                  className="font-semibold text-gray-300"
                >
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
                <Link to={"/verifyEmail"}>
                  <p className="text-blue-500 text-right mt-2 hover:underline cursor-pointer">
                    Forgot Password?
                  </p>
                </Link>
              </div>
              <div className="flex justify-center my-5">
                <button
                  type="submit"
                  className="border w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Please wait.." : "Login"}
                </button>
              </div>
            </div>
          </form>
          <div>
            <p className="text-center pt-5 text-gray-400 ">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

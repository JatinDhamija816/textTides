import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-gray-800 px-10">
      <p className="text-3xl font-bold text-center text-gray-100">
        Welcome to TextTides
      </p>
      <p className="text-xl text-center text-gray-400">
        Your space to write, read, and discover amazing stories.
      </p>

      <Link to="/login">
        <button className="bg-blue-600 py-2 rounded-3xl px-5 text-white hover:bg-blue-700 my-5 transition duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;

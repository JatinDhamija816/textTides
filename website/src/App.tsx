import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ProfileSetup from "./components/Auth/ProfileSetup";
import HomePage from "./components/Home/HomePage";
import ProtectedRoute from "../utils/routes/ProtectedRoute";
import PublicRoute from "../utils/routes/PublicRoute";
import { Toaster } from "sonner";
import VerifyEmail from "./components/ForgotPassword/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { AppProvider } from "../utils/AppContext";
import MyProfile from "./components/Profile/MyProfile";
import ChangeEmail from "./components/Profile/ChangeEmail";
import ChangePassword from "./components/Profile/ChangePassword";
import WriteBlog from "./components/Blog/WriteBlog";
import ShowBlogs from "./components/Home/ShowBlogs";
import ReadBlog from "./components/Blog/ReadBlog";
import UserBlogs from "./components/Blog/UserBlogs";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Route>

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/profileSetup" element={<ProfileSetup />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/changeEmail" element={<ChangeEmail />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/writeBlog" element={<WriteBlog />} />
            <Route path="/showBlog" element={<ShowBlogs />} />
            <Route path="/readBlog" element={<ReadBlog />} />
            <Route path="/userBlogs" element={<UserBlogs />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;

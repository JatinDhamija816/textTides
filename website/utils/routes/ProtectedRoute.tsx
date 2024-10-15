import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

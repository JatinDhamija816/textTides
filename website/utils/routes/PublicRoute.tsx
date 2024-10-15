import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  if (accessToken && refreshToken) {
    return <Navigate to="/homePage" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Check if user is logged in

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

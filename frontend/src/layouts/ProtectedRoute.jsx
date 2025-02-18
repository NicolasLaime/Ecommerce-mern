import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]"); // Parseamos el array

  return token && roles.includes("ROLE_ADMIN") ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

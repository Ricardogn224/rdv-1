// ProtectedRoute.jsx
import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || !user.roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
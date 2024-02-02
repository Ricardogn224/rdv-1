import React from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "react-jwt";


const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("jwtToken");

  const user = token ? decodeToken(token) : null

  

  if (!user || !user.roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
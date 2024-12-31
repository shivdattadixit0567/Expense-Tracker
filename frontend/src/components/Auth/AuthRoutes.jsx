import React from "react";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { Navigate } from "react-router-dom";
const AuthRoutes = ({ children }) => {
  const token = getUserFromStorage();
  console.log(token);
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoutes;

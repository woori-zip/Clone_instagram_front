import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../service/ApiService";

const PublicRoute = ({ element: Component, ...rest }) => {
  return isLoggedIn() ? <Navigate to="/" /> : <Component {...rest} />;
};

export default PublicRoute;

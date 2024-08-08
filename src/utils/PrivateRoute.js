import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../service/ApiService";

const PrivateRoute = ({ element: Component, ...rest }) => {
  return isLoggedIn() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/accounts/login" />
  );
};

export default PrivateRoute;

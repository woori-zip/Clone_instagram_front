import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../service/ApiService";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isLoggedIn();
      setAuthenticated(loggedIn);
    };
    checkAuth();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
  }

  return authenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/accounts/login" />
  );
};

export default PrivateRoute;

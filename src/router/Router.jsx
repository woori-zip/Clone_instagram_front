import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../components/Auth/signin";
import SignUp from "../components/Auth/signup";
import PasswordReset from "../components/Auth/passwordreset";
import Home from "../pages/Home";
import PrivateRoute from "../utils/PrivateRoute";
import PublicRoute from "../utils/PublicRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/accounts/login"
          element={<PublicRoute element={SignIn} />}
        />
        <Route
          path="/accounts/emailsignup"
          element={<PublicRoute element={SignUp} />}
        />
        <Route
          path="/accounts/password/reset"
          element={<PublicRoute element={PasswordReset} />}
        />
        <Route path="/" element={<PrivateRoute element={Home} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

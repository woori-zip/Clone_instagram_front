import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../components/Auth/signin";
import SignUp from "../components/Auth/signup";
import PasswordReset from "../components/Auth/passwordreset";
import Home from "../pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accounts/login" element={<SignIn />} />
        <Route path="/accounts/emailsignup" element={<SignUp />} />
        <Route path="/accounts/password/reset" element={<PasswordReset />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

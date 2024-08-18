import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../components/Auth/signin";
import SignUp from "../components/Auth/signup";
import PasswordReset from "../components/Auth/passwordreset";
import Home from "../pages/Home";
import PrivateRoute from "../utils/PrivateRoute";
import PublicRoute from "../utils/PublicRoute";
import MyPage from '../pages/MyPage'
import Timeline from "../components/timeline";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={Home} />} >
          <Route index element={<Timeline />} />
          <Route path=":userId" element={<MyPage />} /> 프로필 페이지
        </Route>

        <Route path="/accounts/login" element={<PublicRoute element={SignIn} />} />
        <Route path="/accounts/emailsignup" element={<PublicRoute element={SignUp} />} />
        <Route path="/accounts/password/reset" element={<PublicRoute element={PasswordReset} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

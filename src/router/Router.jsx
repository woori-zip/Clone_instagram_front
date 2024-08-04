import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import PasswordReset from '../pages/passwordreset'
import Home from '../pages/Home'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/accounts/login' element={<SignIn />} />
        <Route path='/accounts/emailsignup' element={<SignUp />} />
        <Route path='/accounts/password/reset' element={<PasswordReset />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
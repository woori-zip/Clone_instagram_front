import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Router from "./router/Router";
import { isLoggedIn } from "./service/ApiService";
function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLoggedIn(); // 비동기 함수 호출
      if (!loggedIn) {
        navigate("/accounts/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

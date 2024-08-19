import React, { useState } from "react";
import Sidenav from "../components/sidenav";
import Timeline from "../components/timeline";
import styles from "../styles/home.module.css"; // CSS Module import
import SmallSideNav from "../components/smallnav";
import { Route, Routes } from "react-router-dom";
import MyPage from "./MyPage";

function Home() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [postUploadSuccess, setPostUploadSuccess] = useState(false);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handlePostUploadSuccess = (success) => {
    if (success) {
      setPostUploadSuccess(true);
    }
  };

  return (
    <div className={styles.home_container}>
      <SmallSideNav handleButtonClick={handleButtonClick} />
      <Sidenav handleButtonClick={handleButtonClick} handlePostUploadSuccess={handlePostUploadSuccess} />
      <div className={styles.router_container}>
          {/* 중첩된 라우팅 설정 */}
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path=":userId" element={<MyPage onPostUploadSuccess={postUploadSuccess} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;

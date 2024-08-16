import React, { useState } from "react";
import Sidenav from "../components/sidenav";
import Timeline from "../components/timeline";
import styles from "../styles/home.module.css"; // CSS Module import
import Search from "@mui/icons-material/Search";
import SmallSideNav from "../components/smallnav";

function Home() {
  const [activeComponent, setActiveComponent] = useState(null); // 초기에는 아무것도 활성화 안함

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={styles.home_container}>
      <SmallSideNav handleButtonClick={handleButtonClick} />
      <Sidenav handleButtonClick={handleButtonClick} />
      <div className={styles.timeline_container}>
        <Timeline />
      </div>
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import styles from '../styles/home.module.css';
import Sidenav from "../components/sidenav";
import Timeline from "../components/timeline";
import Search from "../components/search";

function Home() {
  const [activeComponent, setActiveComponent] = useState(null); // 초기에는 아무것도 활성화 안함

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__nav}>
        <Sidenav handleButtonClick={ handleButtonClick }/>
      </div>
      <div className={styles.homepage__timeline}>
        <Timeline />
        {activeComponent === "search" && <Search />}
      </div>
    </div>
  );
}

export default Home;
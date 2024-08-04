import React from "react";
import styles from '../styles/home.module.css';
import Sidenav from "../components/sidenav";
import Timeline from "../components/timeline";

function Home() {
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__nav}>
        <Sidenav />
      </div>
      <div className={styles.homepage__timeline}>
        <Timeline />
      </div>
    </div>
  );
}

export default Home;
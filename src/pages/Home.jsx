import React, { useState } from "react";
import Sidenav from "../components/sidenav";
import Timeline from "../components/timeline";


function Home() {
  const [activeComponent, setActiveComponent] = useState(null); // 초기에는 아무것도 활성화 안함

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <div style={{display:'flex', flexDirection:'row'}}>
        <Sidenav handleButtonClick={ handleButtonClick } />
      </div>
      <Timeline />
    </div>
  );  
}

export default Home;
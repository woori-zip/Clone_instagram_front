import React, { useState, useEffect } from "react";
import styles from "../styles/sidenav.module.css";
// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CancelIcon from '@mui/icons-material/Cancel';
import { Input } from '@mui/joy';

function SmallSideNav() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isModalOpen = selectedCategory === "add";

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }

    return () => {
      if (isModalOpen) {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className={styles.smallNavContainer}>
      <div className={styles.upperNav}>
        <div className={styles.smallNavLogoContainer}>
          <a href="/">
            <img
              src="https://i.namu.wiki/i/hgoJIHeQBQm7NHQd2UNeI5D_uxP4vQaXX8c-SMHxiwJPZKM1SG9z_K_TTAps0O4v6AvRDQr03o_i19enOxsPb2wpx_6SKOaQHp4Ds8Ruhh7C8NLcy9qMrghkhzgzlZHNMkdlYLY0uQMQQrut9dDX3g.svg"
              alt="Instagram Logo"
            />
          </a>
        </div>
        <div className={styles.rightContainer}>
          <Input 
            placeholder="검색"
            endDecorator={<CancelIcon style={{fontSize:'1rem'}}/>}
          />
          <FavoriteBorderIcon />  
        </div>
      </div>

      <div className={styles.lowerNav}>
        <div className={styles.smallNavIconContainer}>
          <HomeOutlinedIcon />
          <ExploreOutlinedIcon />
          <SlideshowIcon />
          <AddBoxOutlinedIcon   />
          <SendOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export default SmallSideNav;

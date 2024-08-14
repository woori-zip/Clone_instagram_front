import React, { useState, useEffect } from "react";
import styles from "../styles/sidenav.module.css";
// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// components
import Search from "../components/search";
import UploadModal from "./Modal/uploadModal";
import { signout } from "../service/ApiService"; // 로그아웃 함수 임포트

function Sidenav() {
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

  const handleLogout = () => {
    signout();
  };

  const navItems = [
    { icon: <HomeOutlinedIcon />, label: "홈", category: null },
    { icon: <SearchIcon />, label: "검색", category: "search" },
    { icon: <ExploreOutlinedIcon />, label: "탐색 탭", category: null },
    { icon: <SlideshowIcon />, label: "릴스", category: null },
    { icon: <SendOutlinedIcon />, label: "메시지", category: "alert" },
    { icon: <FavoriteBorderIcon />, label: "알림", category: "alert" },
    { icon: <AddBoxOutlinedIcon />, label: "만들기", category: "add" },
    { icon: <ExitToAppIcon />, label: "로그아웃", onClick: handleLogout },
  ];

  return (
    <div className={styles.navContainer}>
      {/* 사이드 네비게이션 */}
      <div>
        {/* Logo */}
        <a className={styles.logoContainer} href="/">
          <img
            src="https://i.namu.wiki/i/hgoJIHeQBQm7NHQd2UNeI5D_uxP4vQaXX8c-SMHxiwJPZKM1SG9z_K_TTAps0O4v6AvRDQr03o_i19enOxsPb2wpx_6SKOaQHp4Ds8Ruhh7C8NLcy9qMrghkhzgzlZHNMkdlYLY0uQMQQrut9dDX3g.svg"
            alt="Instagram Logo"
          />
          <InstagramIcon />
        </a>

        {/* navItems 출력 */}
        <div className={styles.navItems}>
          {navItems.map((item, index) => (
            <button
              key={index}
              className={styles.navButton}
              onClick={() =>
                item.onClick ? item.onClick() : setSelectedCategory(item.category)
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <button className={styles.navButton}>
          <MenuIcon />
          <span>더 보기</span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;

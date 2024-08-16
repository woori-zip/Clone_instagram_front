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
  const isSearchActive = selectedCategory === "search";

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
    console.log("Logout clicked");
    signout();
  };

  const navItems = [
    { icon: <HomeOutlinedIcon />, label: "홈", category: null },
    { icon: <SearchIcon />, label: "검색", category: "search" },
    { icon: <ExploreOutlinedIcon />, label: "탐색 탭", category: "explore" },
    { icon: <SlideshowIcon />, label: "릴스", category: "shorts" },
    { icon: <SendOutlinedIcon />, label: "메시지", category: "message" },
    { icon: <FavoriteBorderIcon />, label: "알림", category: "alert" },
    { icon: <AddBoxOutlinedIcon />, label: "만들기", category: "add" },
    // 로그아웃 항목은 onClick 이벤트를 직접 처리
    { icon: <ExitToAppIcon />, label: "로그아웃", category: "logout", onClick: handleLogout },
  ];

  const handleItemClick = (item) => {
    if (item.category === "logout") {
      // 로그아웃 항목의 경우, setSelectedCategory를 호출하지 않고 로그아웃만 실행
      item.onClick();
    } else {
      setSelectedCategory(item.category);
    }
  };  

  return (
    <div>
      <div
        className={`${styles.navContainer} ${
          isSearchActive ? styles.navContainerActive : ""
        }`}
      >
        {/* 사이드 네비게이션 */}
        <div>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <a href="/">
              <img
                src="https://i.namu.wiki/i/hgoJIHeQBQm7NHQd2UNeI5D_uxP4vQaXX8c-SMHxiwJPZKM1SG9z_K_TTAps0O4v6AvRDQr03o_i19enOxsPb2wpx_6SKOaQHp4Ds8Ruhh7C8NLcy9qMrghkhzgzlZHNMkdlYLY0uQMQQrut9dDX3g.svg"
                alt="Instagram Logo"
              />
              <InstagramIcon />
            </a>
          </div>


          {/* navItems 출력 */}
          <div className={styles.navItems}>
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`${styles.navButton} ${selectedCategory === item.category ? styles.seletedBtn : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className={`${styles.navItems} ${styles.lastItem}`}>
            <button className={styles.navButton}>
              <MenuIcon />
              <span>더 보기</span>
            </button>
          </div>


        </div>
      </div>

      {selectedCategory === "search" && <Search />}
      {selectedCategory === "add" && <UploadModal onClose={closeModal} />}
      {/* Add Alert component if needed */}
    </div>
  );
}

export default Sidenav;

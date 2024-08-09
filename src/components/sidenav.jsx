import React, { useState, useEffect } from "react";
import styles from "../styles/sidenav.module.css";
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
import Search from "../components/search";
import UploadModal from "./Modal/uploadModal";

// import Alert from "../components/alert"; // <Alert /> 컴포넌트 추가
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

  return (
    <>
      {/* 컴포넌트 출력 */}
      <div>
        {selectedCategory === "search" && <Search />}
        {/* {selectedCategory === "alert" && <Alert />} */}
        {selectedCategory === "add" && <UploadModal onClose={closeModal} />}
      </div>

      {/* 사이드 네비게이션 */}
      <div
        className={`${styles.nav_design} ${
          selectedCategory === "search" ? styles["selected"] : styles["sidenav"]
        }`}
      >
        {/* 인스타그램 로고 */}
        <div className={styles.logo_container}>
          {selectedCategory === "search" ? <InstagramIcon className={styles.icon}/> : (
            <img
              src="https://i.namu.wiki/i/vC4EDlF-2rZRn7tEK6ooc6_Y5rOacL0uwUhUctMlvngdEqca4mc4vlHv8NJ5iloXDsZodFP4451tARC7YCDi0JJdbWvW3Y1bjwQFMULRHi06kYDuxCN0Nbf2O1wnrpuOClrohpI_ZtQGrcbV-xizEw.svg"
              alt="Instagram Logo"
            />
          )}
          
        </div>
        <div className={styles.sidenav_buttons}>
          <button
            className={styles.sidenav_button}
            onClick={() => setSelectedCategory(null)}
          >
            <HomeOutlinedIcon />
            <span>홈</span>
          </button>
          <button
            className={styles.sidenav_button}
            onClick={() => setSelectedCategory("search")}
          >
            <SearchIcon />
            <span>검색</span>
          </button>
          <button
            className={styles.sidenav_button}
            onClick={() => setSelectedCategory(null)}
          >
            <ExploreOutlinedIcon />
            <span>탐색 탭</span>
          </button>
          <button
            className={styles.sidenav_button}
            onClick={() => setSelectedCategory(null)}
          >
            <SlideshowIcon />
            <span>릴스</span>
          </button>
          <button
            className={styles.sidenav_button}
            onClick={() => setSelectedCategory("alert")}
          >
            <SendOutlinedIcon />
            <span>메시지</span>
          </button>
          <button
            className={styles.sidenav_button}
            onClick={() => setSelectedCategory("alert")}
          >
            <FavoriteBorderIcon />
            <span>알림</span>
          </button>
          <button
            className={styles.sidenav_button}
            onClick={() => setSelectedCategory("add")}
          >
            <AddBoxOutlinedIcon />
            <span>만들기</span>
          </button>
          {/* 프로필 여기에 추가 */}
          <button className={styles.sidenav_button} onClick={handleLogout}>
            <ExitToAppIcon />
            <span>로그아웃</span>
          </button>
        </div>
        <div className={styles.sidenav_more}>
          <button className={styles.sidenav_button}>
            <MenuIcon />
            <span>더 보기</span>
          </button>
        </div>
      </div>
    </>
  );
}


export default Sidenav;

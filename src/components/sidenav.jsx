import React, { useState } from "react"
import styles from "../styles/sidenav.module.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from '@mui/icons-material/Instagram';

function Sidenav({handleButtonClick}) {
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  const handleButtonAndCategoryClick = (component, isActive) => {
    handleButtonClick(component);
    setIsCategorySelected(isActive);
  };

  return (
    <div className={`${styles.Sidenav} ${isCategorySelected ? styles['selected'] : ''}`}>
    <div className={styles.sidenav__logo}>
      {!isCategorySelected ? (
        <img
          src="https://i.namu.wiki/i/vC4EDlF-2rZRn7tEK6ooc6_Y5rOacL0uwUhUctMlvngdEqca4mc4vlHv8NJ5iloXDsZodFP4451tARC7YCDi0JJdbWvW3Y1bjwQFMULRHi06kYDuxCN0Nbf2O1wnrpuOClrohpI_ZtQGrcbV-xizEw.svg"
          alt="Instagram Logo"
        />
      ) : null}
      <InstagramIcon className={styles.icon} />
    </div>

      <div className={styles.sidenav__buttons}>
        <button className={styles.sidenav__button} onClick={() => handleButtonAndCategoryClick("home", false)}>
          <HomeOutlinedIcon />
          <span>홈</span>
        </button>

        <button className={styles.sidenav__button} onClick={() => handleButtonAndCategoryClick("search", true)}>
          <SearchIcon />
          <span>검색</span>
        </button>

        <button className={styles.sidenav__button} onClick={() => handleButtonAndCategoryClick("explore", true)}>
          <ExploreOutlinedIcon />
          <span>탐색 탭</span>
        </button>

        <button className={styles.sidenav__button} onClick={() => handleButtonAndCategoryClick("reels", true)}>
          <SlideshowIcon />
          <span>릴스</span>
        </button>

        <button className={styles.sidenav__button} onClick={() => handleButtonAndCategoryClick("notifications", true)}>
          <ChatOutlinedIcon />
          <span>메세지</span>
        </button>

        <button className={styles.sidenav__button} onClick={() => handleButtonAndCategoryClick("create", true)}>
          <FavoriteBorderIcon />
          <span>알림</span>
        </button>

        <button className={styles.sidenav__button} onClick={() => handleButtonAndCategoryClick("more", true)}>
          <AddBoxOutlinedIcon />
          <span>만들기</span>
        </button>
      </div>

      <div className={styles.sidenav__more}>
        <button className={styles.sidenav__button}>
          <MenuIcon />
          <span>더 보기</span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
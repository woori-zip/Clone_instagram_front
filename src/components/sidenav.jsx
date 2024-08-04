import React from "react"
import styles from "../styles/sidenav.module.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuIcon from "@mui/icons-material/Menu";

function Sidenav() {
  return (
    <div className={styles.Sidenav}>
      <img
        className={styles.sidenav__logo}
        src="https://i.namu.wiki/i/vC4EDlF-2rZRn7tEK6ooc6_Y5rOacL0uwUhUctMlvngdEqca4mc4vlHv8NJ5iloXDsZodFP4451tARC7YCDi0JJdbWvW3Y1bjwQFMULRHi06kYDuxCN0Nbf2O1wnrpuOClrohpI_ZtQGrcbV-xizEw.svg"
        alt="Instagram Logo"
      />
      <div className={styles.sidenav__buttons}>
        <button className={styles.sidenav__button}>
            <HomeOutlinedIcon />
            <span>홈</span>
        </button>
        
        <button className={styles.sidenav__button}>
            <SearchIcon />
            <span>검색</span>
        </button>
        
        <button className={styles.sidenav__button}>
            <ExploreOutlinedIcon />
            <span>탐색 탭</span>
        </button>
        
        <button className={styles.sidenav__button}>
            <SlideshowIcon />
            <span>릴스</span>
        </button>
        
        <button className={styles.sidenav__button}>
            <ChatOutlinedIcon />
            <span>메세지</span>
        </button>
        
        <button className={styles.sidenav__button}>
            <FavoriteBorderIcon />
            <span>알림</span>
        </button>
        
        <button className={styles.sidenav__button}>
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
  )
}

export default Sidenav
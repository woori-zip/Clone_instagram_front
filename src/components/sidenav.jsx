import React, { useState } from "react"
import styles from "../styles/sidenav.module.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from '@mui/icons-material/Instagram';
import Search from "../components/search";
// import Alert from "../components/alert"; // <Alert /> 컴포넌트 추가

function Sidenav() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
      <>
      {/* 사이드 네비게이션 */}
        <div className={`${styles.nav_design} ${selectedCategory ? styles['selected'] : styles['sidenav']}`}>
          {/* 인스타그램 로고 */}
          <div className={styles.logo_container}>
            {!selectedCategory ? (
              <img
                src="https://i.namu.wiki/i/vC4EDlF-2rZRn7tEK6ooc6_Y5rOacL0uwUhUctMlvngdEqca4mc4vlHv8NJ5iloXDsZodFP4451tARC7YCDi0JJdbWvW3Y1bjwQFMULRHi06kYDuxCN0Nbf2O1wnrpuOClrohpI_ZtQGrcbV-xizEw.svg"
                alt="Instagram Logo"
              />
            ) : null}
            <InstagramIcon className={styles.icon} />
          </div>

          <div className={styles.sidenav_buttons}>
            <button className={styles.sidenav_button} onClick={() => setSelectedCategory(null)}>
              <HomeOutlinedIcon />
              <span>홈</span>
            </button>
            <button className={styles.sidenav_button} onClick={() => setSelectedCategory("search")}>
              <SearchIcon />
              <span>검색</span>
            </button>
            <button className={styles.sidenav_button} onClick={() => setSelectedCategory(null)}>
              <ExploreOutlinedIcon />
              <span>탐색 탭</span>
            </button>
            <button className={styles.sidenav_button} onClick={() => setSelectedCategory(null)}>
              <SlideshowIcon />
              <span>릴스</span>
            </button>
            <button className={styles.sidenav_button} onClick={() => setSelectedCategory("alert")}>
              <SendOutlinedIcon />
              <span>메시지</span>
            </button>
            <button className={styles.sidenav_button} onClick={() => setSelectedCategory("alert")}>
              <FavoriteBorderIcon />
              <span>알림</span>
            </button>
            <button className={styles.sidenav_button} onClick={() => setSelectedCategory(null)}>
              <AddBoxOutlinedIcon />
              <span>만들기</span>
            </button>
            {/* 프로필 여기에 추가 */}
          </div>

          <div className={styles.sidenav_more}>
            <button className={styles.sidenav_button}>
              <MenuIcon />
              <span>더 보기</span>
            </button>
          </div>
        </div>

      {/* 컴포넌트 출력 */}
      <div>
        {selectedCategory === "search" && <Search />}
        {/* {selectedCategory === "alert" && <Alert />} */}
      </div>
    </>
  );
}

export default Sidenav;

import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/timeline.module.css";
import Post from "../components/post";
import Suggestions from "./suggestion";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import '../styles/common.css'

function Timeline() {
  const [posts] = useState([
    {
      user: "userid",
      postImage:
        "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
      likes: 12,
      timestamp: "3시간",
    },
    {
      user: "userid2",
      postImage:
        "https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg",
      likes: 15,
      timestamp: "3시간",
    },
    {
      user: "userid3",
      postImage:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 22,
      timestamp: "3시간",
    },
  ]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [checkedStories, setCheckedStories] = useState(Array(19).fill(false));
  const storyBlockRef = useRef(null);

  const scroll = (direction) => {
    if (storyBlockRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      storyBlockRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      checkScrollPosition(); // 스크롤 이후에 위치 확인
    }
  };

  const checkScrollPosition = () => {
    if (storyBlockRef.current) {
      setCanScrollLeft(storyBlockRef.current.scrollLeft > 0);
      setCanScrollRight(
        storyBlockRef.current.scrollWidth >
          storyBlockRef.current.scrollLeft + storyBlockRef.current.clientWidth
      );
    }
  };

  const toggleChecked = (index) => {
    setCheckedStories((prev) =>
      prev.map((isChecked, i) => (i === index ? !isChecked : isChecked))
    );
  };

  useEffect(() => {
    checkScrollPosition();
    if (storyBlockRef.current) {
      storyBlockRef.current.addEventListener("scroll", checkScrollPosition);
    }
    return () => {
      if (storyBlockRef.current) {
        storyBlockRef.current.removeEventListener(
          "scroll",
          checkScrollPosition
        );
      }
    };
  }, []);

  return (
    <div className={styles.timeline}>
      <div className={styles.main_content}>
        <div className={styles.section_post}>
          {/* 스토리 */}
          <div className={styles.story}>
            <div className={styles.story_block_container}>
              {canScrollLeft && (
                <button
                  className={`${styles.scroll_button} ${styles.left}`}
                  onClick={() => scroll("left")}
                >
                  <ArrowBackIosNewOutlinedIcon fontSize="small" />
                </button>
                )}
                <div
                  id="story_block"
                  className={styles.story_block}
                  ref={storyBlockRef}
                >
                  {[...Array(19)].map((_, index) => (
                    <div className={styles.story_particular} key={index} onClick={() => toggleChecked(index)}>
                      <div className={`${styles.story_profile} 
                                      ${checkedStories[index] ? styles.checked : styles.unchecked}`}
                      >
                        <img
                          className={styles.status_img}
                          src="https://i.pinimg.com/564x/e9/0c/ec/e90cecf418f63e904ee3c077f5f16e0e.jpg"
                          alt="Story"
                        />
                      </div>
                      <div className={styles.profile_name}>test</div>
                    </div>
                  ))}
                </div>
              {canScrollRight && (
                <button
                  className={`${styles.scroll_button} ${styles.right}`}
                  onClick={() => scroll("right")}
                >
                  <ArrowForwardIosOutlinedIcon fontSize="small" />
                </button>
              )}
            </div>
          </div>
          {/* 스토리 끝 */}
          {posts.map((post, index) => (
            <Post
              key={index}
              user={post.user}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
            />
          ))}
        </div>
      </div>
      <div className={styles.section_suggestion}>
        <Suggestions />
      </div>
    </div>
  );
}

export default Timeline;

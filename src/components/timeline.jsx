import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/timeline.module.css";
import Post from "../components/post";
import Suggestions from "./suggestion";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

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
                <div className={styles.story_particular} key={index}>
                  <div className={styles.image_div}>
                    <img
                      className={styles.status_img}
                      src="https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/081/502/116/81502116_1702974284006_4_600x600.JPG"
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
        <div className={styles.post}>
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

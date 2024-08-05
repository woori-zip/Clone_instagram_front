import React from "react";
import styles from "../styles/post.module.css";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Post(props) {
  return (
    <div className={`${styles.post} ${styles.mt20}`}>
      {/* 프로필 */}
      <div className={styles.profile_container}>
        <div className={styles.profile}>
          <Avatar>{props.user.charAt(0).toUpperCase()}</Avatar>&nbsp;&nbsp;
          {props.user}
          <span className={styles.textMuted}>&nbsp;•&nbsp;{props.timestamp}</span>
        </div>
        <MoreHorizIcon />
      </div>

      {/* 이미지 */}
      <div className={styles.post_image}>
        <img src={props.postImage} alt="" />
      </div>

      {/* items */}
      <div className={styles.icons_container}>
        <div className={styles.icons}>
          <FavoriteBorder className={styles.postIcon} />
          <ChatBubbleOutlineIcon className={styles.postIcon} />
          <TelegramIcon className={styles.postIcon} />
        </div>
        <div className={styles.post_iconSave}>
          <BookmarkBorderIcon className={styles.postIcon} />
        </div>
      </div>
      <span className={styles.post_likes}>좋아요 {props.likes}개</span>
    </div>
  );
}

export default Post;

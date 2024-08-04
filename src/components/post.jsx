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
    <div className={styles.post}>
      <div className={styles.post__header}>
        <div className={styles.post__headerAuthor}>
          <Avatar>{props.user.charAt(0).toUpperCase()}</Avatar>&nbsp;&nbsp;
          {props.user} • <span>{props.timestamp}</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className={styles.post__image}>
        <img src={props.postImage} alt="" />
      </div>
      <div className={styles.post__footer}>
        <div className={styles.post__footerIcons}>
          <div className={styles.post__iconsMain}>
            <FavoriteBorder className={styles.postIcon} />
            <ChatBubbleOutlineIcon className={styles.postIcon} />
            <TelegramIcon className={styles.postIcon} />
          </div>
          <div className={styles.post__iconSave}>
            <BookmarkBorderIcon className={styles.postIcon} />
          </div>
        </div>
        <span className={styles.post__likes}>좋아요 {props.likes}개</span>
      </div>
    </div>
  );
}

export default Post;

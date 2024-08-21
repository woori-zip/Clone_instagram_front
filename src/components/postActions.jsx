import React, { useState, useEffect } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import styles from "../styles/post.module.css";
import axios from "axios";

function PostActions({ postId, userId, isLiked, setIsLiked }) {

  const handlePostLike = async () => {
    try {
      const response = await axios.post('/api/postlike', {
        userId: userId,  // DTO의 일부
        postId: postId,  // DTO의 일부
      });
      console.log(response.data); // 성공 메시지 출력
      setIsLiked(true); // 좋아요 상태를 즉시 반전시킴
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  return (
    <div className={styles.icons_container}>
      <div>
        {isLiked ? (
          <FavoriteIcon className={styles.icon} />
        ) : (
          <FavoriteBorder className={styles.icon} onClick={handlePostLike} />
        )}
        <ChatBubbleOutlineIcon className={styles.icon} />
        <TelegramIcon className={styles.icon} />
      </div>
      <div>
        <BookmarkBorderIcon className={styles.icon} />
      </div>
    </div>
  );
}

export default PostActions;

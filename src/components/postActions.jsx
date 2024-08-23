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
        userId: userId, 
        postId: postId
      });
      console.log(response.data);
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleoCancelLike = async () => {
    try {
      const response = await axios.post('/api/postlike/cancel', {
        userId: userId,
        postId: postId
      });
      console.log(response.data);
      setIsLiked(false); // 좋아요 상태를 false로 설정
    } catch (error) {
      console.error('Error unliking the post:', error);
    }
  };

  return (
    <div className={styles.icons_container}>
      <div>
        {isLiked ? (
          <FavoriteIcon className={styles.icon} onClick={handleoCancelLike}/>
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

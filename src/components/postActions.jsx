import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import styles from "../styles/post.module.css";
import axios from "axios";

function PostActions({ postId, userId, isLiked, setIsLiked, isSaved, setIsSaved }) {

  const handlePostLike = async () => {
    try {
      await axios.post('/api/postlike', {
        userId: userId, 
        postId: postId
      });
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleoCancelLike = async () => {
    try {
      await axios.post('/api/postlike/cancel', {
        userId: userId,
        postId: postId
      });
      setIsLiked(false); // 좋아요 상태를 false로 설정
    } catch (error) {
      console.error('Error unliking the post:', error);
    }
  };

  const handlePostSave = async () => {
    try {
      await axios.post('/api/bookmark',{
        userId: userId,
        postId: postId
      });
      setIsSaved(true);
    } catch (error) {
      console.log('Error saving the post', error);
    }
  }

  const handleCancelSave = async () => {
    try {
      await axios.post('/api/bookmark/cancel', {
        userId: userId,
        postId: postId
      });
      setIsSaved(false); // 좋아요 상태를 false로 설정
    } catch (error) {
      console.error('Error unsaving the post:', error);
    }
  };

  return (
    <div className={styles.icons_container}>
      <div>
        {isLiked ? 
          <FavoriteIcon className={styles.icon} onClick={handleoCancelLike}/>
          : 
          <FavoriteBorder className={styles.icon} onClick={handlePostLike} />
        }
        <ChatBubbleOutlineIcon className={styles.icon} />
        <TelegramIcon className={styles.icon} />
      </div>
      <div>
        {isSaved ? 
          <BookmarkIcon className={styles.icon} onClick={handleCancelSave}/>
        :
          <BookmarkBorderIcon className={styles.icon} onClick={handlePostSave}/>
        }
      </div>
    </div>
  );
}

export default PostActions;

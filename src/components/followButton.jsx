import React, { useState } from "react";
import { call } from "../service/ApiService";
import styles from "../styles/followbutton.module.css";

function FollowButton({ userId, isFollowingInitial = false }) {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // 언팔로우 요청
        await call(`/api/follow/unfollow/${userId}`, "POST");
      } else {
        // 팔로우 요청
        await call(`/api/follow/${userId}`, "POST");
      }
      // 팔로우 상태 업데이트
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error while following/unfollowing:", error);
    }
  };

  return (
    <button
      className={`${styles.follow} ${isFollowing ? styles.following : ""}`}
      onClick={handleFollowToggle}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </button>
  );
}

export default FollowButton;

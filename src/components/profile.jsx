import React from "react";
import { Avatar } from "@mui/material";
import FollowButton from "./followButton";
import styles from "../styles/profile.module.css"; // Profile 컴포넌트 전용 CSS

function Profile({ userId, name, profile, isFollowing }) {
  return (
    <div className={styles.container}>
      <div className={styles.profile_img}>
        <span className={styles.avatar}>
          <Avatar src={profile} style={{ width: "44px", height: "44px" }} />
        </span>
        <div className={styles.user_info}>
          <span className={styles.username}>{userId}</span>
          <span className={styles.about}>{name}</span>
        </div>
      </div>
      <FollowButton userId={userId} isFollowingInitial={isFollowing} />
    </div>
  );
}

export default Profile;

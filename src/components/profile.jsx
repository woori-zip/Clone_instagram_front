import React from "react";
import { Avatar } from "@mui/material";
import styles from "../styles/profile.module.css"; // Profile 컴포넌트 전용 CSS

function Profile({ name, profile }) {
  return (
    <div className={styles.container}>
      <div className={styles.profile_img}>
        <span className={styles.avatar}>
          <Avatar src={profile} />
        </span>
        <div className={styles.user_info}>
          <span className={styles.username}>{name}</span>
          <span className={styles.about}>회원님을 위한 추천</span>
        </div>
      </div>
      <button className={styles.follow}>팔로우</button>
    </div>
  );
}

export default Profile;

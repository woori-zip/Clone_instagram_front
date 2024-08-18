import React from "react";
import { Avatar } from "@mui/material";
import styles from "../styles/profile.module.css"; // Profile 컴포넌트 전용 CSS
import { useNavigate } from "react-router-dom";

function Profile({ userId, name, profile, isLoggedInUser = false }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/${userId}`);
  }

  return (
    <div className={styles.container} onClick={handleProfileClick}>
      <div className={styles.profile_img}>
        <span className={styles.avatar}>
          <Avatar src={profile} style={{ width: "44px", height: "44px" }} />
        </span>
        <div className={styles.user_info}>
          {isLoggedInUser ? (
            <>
              <span className={styles.username}>{userId}</span>
              <span className={styles.about}>{name}</span>
            </>
          ) : (
            <>
              <span className={styles.username}>{name}</span>
              <span className={styles.about}>회원님을 위한 추천</span>
            </>
          )}
        </div>
      </div>
      <button className={styles.follow}>
        {isLoggedInUser ? "전환" : "팔로우"}
      </button>
    </div>
  );
}

export default Profile;

import React from "react";
import { Avatar } from "@mui/material";
import FollowButton from "./followButton";
import styles from "../styles/profile.module.css";
import { useNavigate } from "react-router-dom";

function Profile({ userId, name, profile, isLoggedInUser = false }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    console.log("Parent (Profile) clicked");
    navigate(`/${userId}`);
  }
  
  return (
    <div className={styles.container} onClick={handleProfileClick}>
      <div className={styles.profile_img}>
        <span className={styles.avatar}>
          <Avatar src={profile} style={{ width: "44px", height: "44px" }} />
        </span>
        <div className={styles.user_info}>
          <span className={styles.username}>{userId}</span>
          <span className={styles.about}>{name}</span>
        </div>
      </div>
      <FollowButton userId={userId} isFollowingInitial={true} />

    </div>
  );
}

export default Profile;

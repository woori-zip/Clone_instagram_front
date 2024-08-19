import React from "react";
import { Avatar } from "@mui/material";
import styles from "../styles/profile.module.css"; // Profile 컴포넌트 전용 CSS
import { useNavigate } from "react-router-dom";

function LoggedInProfile({ userId, name, profile }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/${userId}`);
  }

  return (
    <div className={styles.container}  onClick={handleProfileClick}>
      <div className={styles.profile_img}>
        <span className={styles.avatar}>
          <Avatar src={profile} style={{ width: "44px", height: "44px" }} />
        </span>
        <div className={styles.user_info}>
          <span className={styles.username}>{userId}</span>
          <span className={styles.about}>{name}</span>
        </div>
      </div>
      <button className={styles.switch_button}>전환</button>
    </div>
  );
}

export default LoggedInProfile;

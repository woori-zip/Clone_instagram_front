import { Avatar } from "@mui/material";
import React from "react";
import styles from "../styles/suggestion.module.css";
import users from "../users"
import Profile from "./profile";

function Suggestions() {
  return (
    <div className={styles.suggestions}>
      {/* 로그인한 사용자 프로필 여기에 추가 */}
      <div className={styles.suggestions_title}>회원님을 위한 추천</div>
      {users.map((user)=>(
        <Profile 
          key={user.id}
          name={user.name}
          profile={user.profile}
        />
      ))}
    </div>
  );
}

export default Suggestions;

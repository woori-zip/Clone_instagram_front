import React from "react";
import styles from "../styles/suggestion.module.css";
import users from "../users"
import Profile from "./profile";

function Suggestions() {

  // 가상 데이터
  const loggedInUserId = 2;
  const loggedInUser = users.find(user => user.id === loggedInUserId);

  return (
    <div className={styles.suggestions}>
      <Profile name={loggedInUser.name} profile={loggedInUser.profile}/>
      <div className={styles.text_container}>
        <span className={`${styles.textGrey} ${styles.textBold} ${styles.text14}`}>
          회원님을 위한 추천
        </span>
        <span className={`${styles.textBold} ${styles.text12}`}>
          모두 보기
        </span>
      </div>
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

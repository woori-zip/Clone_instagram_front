import React, { useEffect, useState } from "react";
import styles from "../styles/suggestion.module.css";
import users from "../users";
import Profile from "./profile";
import { getUserInfo } from "../service/ApiService"; // 사용자 정보를 가져오는 함수 임포트

function Suggestions() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setLoggedInUser(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.suggestions}>
      <Profile
        userId={loggedInUser.userId}
        name={loggedInUser.name}
        profile={loggedInUser.profileImg}
        isLoggedInUser={true}
      />
      <div className={styles.text_container}>
        <span
          className={`${styles.textGrey} ${styles.textBold} ${styles.text14}`}
        >
          회원님을 위한 추천
        </span>
        <span className={`${styles.textBold} ${styles.text12}`}>모두 보기</span>
      </div>
      {users.map((user) => (
        <Profile key={user.id} name={user.name} profile={user.profile} />
      ))}
    </div>
  );
}

export default Suggestions;

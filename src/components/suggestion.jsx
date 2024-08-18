import React, { useEffect, useState } from "react";
import styles from "../styles/suggestion.module.css";
import Profile from "./profile";
import LoggedInProfile from "./loginProfile"; // 새로운 컴포넌트 import
import { getUserInfo, getSuggestedUsers } from "../service/ApiService";

function Suggestions() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchUserInfoAndSuggestions = async () => {
      try {
        const userInfo = await getUserInfo();
        setLoggedInUser(userInfo);

        const users = await getSuggestedUsers();
        setSuggestedUsers(users); // 서버에서 받은 데이터 그대로 사용
      } catch (error) {
        console.error("Failed to fetch user info or suggested users:", error);
      }
    };

    fetchUserInfoAndSuggestions();
  }, []);

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.suggestions}>
      {/* 로그인 중인 사용자의 프로필 컴포넌트 사용 */}
      <LoggedInProfile
        userId={loggedInUser.userId}
        name={loggedInUser.name}
        profile={loggedInUser.profileImg}
      />
      <div className={styles.text_container}>
        <span
          className={`${styles.textGrey} ${styles.textBold} ${styles.text14}`}
        >
          회원님을 위한 추천
        </span>
        <span className={`${styles.textBold} ${styles.text12}`}>모두 보기</span>
      </div>
      {suggestedUsers.map((user) => (
        <Profile
          key={user.id}
          userId={user.userId}
          name={user.name}
          profile={user.profileImg}
          isFollowing={user.isFollowing} // 팔로잉 상태 전달
        />
      ))}
    </div>
  );
}

export default Suggestions;

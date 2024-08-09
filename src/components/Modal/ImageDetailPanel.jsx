import React from "react";
import { Avatar } from "@mui/material";
import styles from './imagedetailpanel.module.css';

function ImageDetailsPanel({ loggedInUser }) {
  return (
    <div className={styles.detailsPanel}>
      <div className={styles.userInfo}>
        <span className={styles.avatar}>
          <Avatar src={loggedInUser.profile} style={{ width: "28px", height: "28px" }}  />
        </span>
        <p className={styles.userName}>{loggedInUser.userId}</p>
      </div>
      <textarea placeholder="문구를 입력하세요..." className={styles.textArea}></textarea>
      <div className={styles.options}>
        <div>위치 추가</div>
        <div>접근성</div>
        <div>고급 설정</div>
      </div>
    </div>
  );
}

export default ImageDetailsPanel;

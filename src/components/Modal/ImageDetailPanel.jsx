import React from "react";
import styles from './imagedetailpanel.module.css';

function ImageDetailsPanel({ loggedInUser }) {
  return (
    <div className={styles.detailsPanel}>
      <div className={styles.userInfo}>
        <img src={loggedInUser.profile} alt={loggedInUser.name} className={styles.userAvatar} />
        <p className={styles.userName}>{loggedInUser.name}</p>
      </div>
      <textarea placeholder="문구를 입력하세요..." className={styles.textArea}></textarea>
      <div className={styles.options}>
        <div className={styles.optionItem}>위치 추가</div>
        <div className={styles.optionItem}>접근성</div>
        <div className={styles.optionItem}>고급 설정</div>
      </div>
    </div>
  );
}

export default ImageDetailsPanel;

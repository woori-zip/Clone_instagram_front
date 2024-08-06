import React from "react";
import styles from "../../styles/auth.module.css";
import { Link } from "react-router-dom";

function PasswordReset() {
  return (
    <div className={`${styles.container} ${styles.mt20}`}>
      <div className={styles.formContainer}>
        <img
          src="https://i.pinimg.com/564x/bb/96/b1/bb96b1607fda61b48f2d82620403df97.jpg"
          width="100px"
          height="100px"
        />
        <h3>로그인에 문제가 있나요?</h3>
        <p className={styles.textMuted}>
          이메일 주소, 전화번호 또는 사용자 이름을 입력하시면 계정에 다시
          액세스할 수 있는 링크를 보내드립니다.
        </p>
        <input
          className={styles.input}
          type="text"
          placeholder="이메일, 전화번호, 사용자 이름"
        />
        <button className={`${styles.btn} ${styles.bgBlue} ${styles.mb10}`}>
          로그인 링크 보내기
        </button>
        <p>비밀번호를 재설정할 수 없나요?</p>

        <div className={styles.orSeparator}>
          <div className={styles.line}></div>
          <span>또는</span>
          <div className={styles.line}></div>
        </div>
        <Link to="/accounts/emailsignup" className={styles.link}>
          <p>새 계정 만들기</p>
        </Link>
        <Link to="/accounts/login" className={styles.link}>
          <p>로그인으로 돌아가기</p>
        </Link>
      </div>
    </div>
  );
}

export default PasswordReset;

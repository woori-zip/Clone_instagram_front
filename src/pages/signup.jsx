import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/auth.module.css';

function SignUp() {
  return (
    <div className={`${styles.container} ${styles.mt20}`}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Instagram</h1>
        <p className={`${styles.textMuted} ${styles.mb20}`}>친구들의 사진과 동영상을 보려면 가입하세요.</p>
        
        <button className={`${styles.btn} ${styles.bgBlue} ${styles.mb20}`}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
            alt="Facebook logo" 
            style={{ width: '20px', marginRight: '8px' }}
          />
          Facebook으로 로그인
        </button>

        <div className={styles.orSeparator}>
          <div className={styles.line}></div>
          <span>또는</span>
          <div className={styles.line}></div>
        </div>

          <input className={styles.input} type="text" placeholder="휴대폰 번호 또는 이메일 주소" />
          <input className={styles.input} type="text" placeholder="성명" />
          <input className={styles.input} type="text" placeholder="사용자 이름" />
          <input className={styles.input} type="password" placeholder="비밀번호" />
        
        <p className={`${styles.textMuted} ${styles.mb20}`}>
          저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에 업로드했을 수도 있습니다. <a href="/" className={styles.link}>더 알아보기</a>
        </p>
        
        <button className={`${styles.btn} ${styles.bgBlue} ${styles.mb10}`}>가입</button>
      </div>

      <div className={`${styles.container} ${styles.mt20}`}>
        <div className={`${styles.formContainer}`}>
          계정이 있으신가요? <Link to='/accounts/login' className={styles.link}>로그인</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

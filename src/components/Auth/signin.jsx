import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/auth.module.css';

function SignIn() {
  return (
    <div className={`${styles.container} ${styles.mt20}`}>
      <div className={styles.formContainer}>
        <h1 className={`${styles.heading} ${styles.mb20}`}>Instagram</h1>
        
        <input className={styles.input} type="text" placeholder="전화번호, 사용자 이름 또는 이메일" />
        <input className={styles.input} type="password" placeholder="비밀번호" />
        
        <button className={`${styles.btn} ${styles.bgBlue} ${styles.mb10}`}>로그인</button>

        <div className={styles.orSeparator}>
          <div className={styles.line}></div>
          <span>또는</span>
          <div className={styles.line}></div>
        </div>

        <button className={`${styles.btn} ${styles.bgWhite} ${styles.mb20}`}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
            alt="Facebook logo" 
            style={{ width: '20px', marginRight: '8px' }}
          />
          Facebook으로 로그인
        </button>
        <Link to='/accounts/password/reset' className={styles.textMuted}>비밀번호를 잊으셨나요?</Link>
      </div>
      
      <div className={`${styles.container} ${styles.mt20}`}>
        <div className={`${styles.formContainer}`}>
          계정이 없으신가요? <Link to="/accounts/emailsignup" className={styles.link}>가입하기</Link>
        </div>  
      </div>
    </div>
  );
}

export default SignIn;

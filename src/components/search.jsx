import React from "react";
import styles from '../styles/search.module.css'
import { Input } from '@mui/joy';
import CancelIcon from '@mui/icons-material/Cancel';
import users from '../users'
import Profile from "./profile";

function Search() {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${styles.mb2}`}>검색</h2>
      <Input 
        placeholder="검색"
        endDecorator={<CancelIcon style={{fontSize:'1rem'}}/>}
      />
      <div className={styles.dafault}>
        <div className={styles.line}></div>
        <h4 className={styles.title}>최근 검색 항목</h4>
        <div>
          {users.map((user)=>(
            <Profile 
              key={user.id}
              name={user.name}
              profile={user.profile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;

import React, { useState, useEffect, useRef } from "react";
import styles from '../styles/search.module.css';
import { Input } from '@mui/joy';
import CancelIcon from '@mui/icons-material/Cancel';
import Profile from "./profile";

function Search() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
      if (query !== '') { // 빈 쿼리일 때는 요청하지 않음
        fetch(`/api/users/search?query=${query}`)
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.error('Error fetching users:', error));
      }
  }, [query]);


  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${styles.mb2}`}>검색</h2>
      <Input 
        placeholder="검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        endDecorator={
          query.length > 0 ? (
            <CancelIcon style={{fontSize:'1rem'}} onClick={() => setQuery('')}/>
          ) : null
        }
      />
      <div className={styles.default}>
        <div className={styles.line}></div>
        <h4 className={styles.title}>검색 결과</h4>
        <div>
          {users.map((user) => (
            <Profile 
              key={user.id}
              name={user.name}
              profile={user.profileImg}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;

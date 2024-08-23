import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from './postModal.module.css';
import { getUserInfo, getUserInfoById } from '../../service/ApiService';
import PostActions from '../postActions';
import axios from 'axios';

const PostModal = ({ postModal, handleCloseModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스 관리
  const [user, setUser] = useState(null); // 사용자 정보 상태 관리
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [isLiked, setIsLiked] = useState(null); // 초기값을 null로 설정
  const [isSaved, setIsSaved] = useState(null); // 초기값을 null로 설정

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (postModal && postModal.userId) {
        try {
          const userInfo = await getUserInfoById(postModal.userId);
          setUser(userInfo); 
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [postModal]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const loggedInUserInfo = await getUserInfo();
        setLoggedInUser(loggedInUserInfo);
      } catch (error) {
        console.error("Failed to fetch logged-in user data", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (loggedInUser && postModal) {
        try {
          const response = await axios.get('/api/postlike/status', {
            params: { userId: loggedInUser.id, postId: postModal.postId }
          });
          setIsLiked(response.data); // 좋아요 상태 설정
        } catch (error) {
          console.error('Error fetching like status:', error);
        }
      }
    };

    fetchLikeStatus();
  }, [loggedInUser, postModal]);

  useEffect(() => {
    const fetchSaveStatus = async () => {
      if (loggedInUser && postModal) {
        try {
          const response = await axios.get('/api/bookmark/status', {
            params: { userId: loggedInUser.id, postId: postModal.postId }
          });
          setIsSaved(response.data); // 북마크 상태 설정
        } catch (error) {
          console.error('Error fetching save status:', error);
        }
      }
    };

    fetchSaveStatus();
  }, [loggedInUser, postModal]);

  if (!postModal) return null;

  const handleNext = () => {
    if (currentIndex < postModal.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const closeModal = () => {  
    handleCloseModal(); // 모달을 닫기 위해 handleCloseModal 호출
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
  };

  return (
    <div className={styles.modalBackground} onClick={closeModal}>
      <div className={styles.modalBox} onClick={stopPropagation}>
        {/* 이미지 출력 */}
        <div className={styles.sectionImg}>
          <img 
            src={`http://localhost:8080${postModal.images[currentIndex].url}`} 
            alt={postModal.images[currentIndex].alt || '게시물 이미지'} 
          />
          {postModal.images.length > 1 && (
            <>
              {currentIndex > 0 && (
              <button className={`${styles.Btn} ${styles.prevBtn}`} onClick={handlePrev}>
                <NavigateBeforeIcon />
              </button>
              )}
              {currentIndex < postModal.images.length - 1 && (
              <button className={`${styles.Btn} ${styles.nextBtn}`} onClick={handleNext}>
                <NavigateNextIcon />
              </button>
              )}
            </>
          )}
        </div>
        {/* 내용 출력 */}
        <div className={styles.sectionContent}>
          <section className={styles.sectionProfile}>
            <div className={styles.profileImg}>
              {
                user && user.profileImg 
                ? <img src={user.profileImg} alt={`${user.name}의 프로필`} />
                : <img src="https://static.vecteezy.com/system/resources/thumbnails/013/360/247/small/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg" alt="기본 프로필 이미지" className={styles.profileImage} />
              }
            </div>
            {user && user.userId}
          </section>
          <section className={styles.sectionComment}>
            {postModal.content}
          </section>
          {/* PostActions 컴포넌트에 상태와 핸들러 전달 */}
          {loggedInUser && (
            <PostActions postId={postModal.postId} userId={loggedInUser.id} isLiked={isLiked} isSaved={isSaved} setIsLiked={setIsLiked} setIsSaved={setIsSaved}/>
          )}
          <section className={styles.sectionLikes}>
            <p>좋아요 n 개</p>
          </section>
          <section className={styles.sectionDate}>
            <p>{formatDate(postModal.createdAt)}</p>
          </section>

          {postModal.commentFlag === true ? 
            <div className={styles.addComment}>
              <input placeholder='댓글 달기...'></input> 
              <button>게시</button>
            </div>
          : null}

        </div>
      </div>
      <button className={styles.closeBtn} onClick={closeModal}>
        <CloseIcon />
      </button>
    </div>
  );
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) {
      return `${diffHours}시간 전`;
  } else if (diffDays < 7) {
      return `${diffDays}일 전`;
  } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}년 ${month}월 ${day}일`;
  }
}

export default PostModal;

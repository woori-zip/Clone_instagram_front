import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/common.css';
import styles from '../styles/mypage.module.css';
import { getUserInfo, getUserInfoByUserId, getUserPosts, getPostById, getSavedPostByUserId } from '../service/ApiService';  // API 요청 함수 가져오기
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import PostModal from "../components/PostModal/postModal";
import FollowButton from "../components/followButton";

const MyPage = ({ onPostUploadSuccess }) => {
  const { userId } = useParams(); // URL에서 userId를 가져옴
  const [user, setUser] = useState(null); 
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('posts'); // 기본 post
  const [posts, setPosts] = useState([]); // 사용자의 게시물 목록
  const [savedPosts, setSavedPosts] = useState([]); // 사용자가 저장한 게시물 목록
  const [postModal, setPostModal] = useState(null); // 모달 상태 추가

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handlePostClick = async (postId) => {
    const post = await getPostById(postId);
    setPostModal(post);  // postId를 postModal에 넘김
  };

  const handleCloseModal = () => {
    setPostModal(null);  // 모달 닫기
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const loggedInUserInfo = await getUserInfo();
        console.log('로그인 정보', loggedInUserInfo)
        setLoggedInUser(loggedInUserInfo);
      } catch (error) {
        console.error("Failed to fetch logged-in user data", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const fetchUserData = async () => {
    try {
      const userInfo = await getUserInfoByUserId(userId);
      setUser(userInfo);

      // 사용자가 게시한 게시물 가져오기
      const userPosts = await getUserPosts(userInfo.id);
      setPosts(userPosts);

      // 사용자가 저장한 게시물 가져오기
      const savedPosts = await getSavedPostByUserId(userInfo.id);
      console.log("저장한 게시물: ", savedPosts)
      setSavedPosts(savedPosts);
    } catch (error) {
      console.error("특정 사용자 정보 또는 게시물 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (onPostUploadSuccess) {
      fetchUserData(); // 포스트 업로드 후 데이터 다시 불러오기
    }
  }, [onPostUploadSuccess]);

  if (loading) {
    return <div><p>Loading...</p></div>;
  }

  if (!user) {
    return <div><p>사용자 정보를 불러올 수 없습니다.</p></div>;
  }

  return (
    <div>
      <div className={styles.MyPageContainer}>

        {/* 상단부 */}
        <div className={styles.ProfileContainer}>
          {/* 프로필사진 */}
          <div className={styles.ProfileImgContainer}>
            {
              user.profileImg 
              ? <img src={user.profileImg} alt={`${user.name}의 프로필`} className={styles.profileImage} />
              : <img src="https://static.vecteezy.com/system/resources/thumbnails/013/360/247/small/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg" alt="기본 프로필 이미지" className={styles.profileImage} />
            }
          </div>

          {/* 프로필정보 */}
          <section className={styles.First}>
            <div className={styles.FirstContent}>
              <p className={styles.name}>{user.userId}</p>
              {loggedInUser.id === user.id ? 
                <div className={styles.buttonContainer}>
                  <div><a>프로필 편집</a></div>
                  <div><a>보관된 스토리 보기</a></div>
                <SettingsSuggestOutlinedIcon />
                </div>
              :
                <div className={styles.buttonContainer}>
                  <div><FollowButton userId={user.userId}/></div>
                  <div><a>메시지 보내기</a></div>
                </div>
              }
            </div>
          </section>
          
          <section className={styles.Second}>
            <div className={styles.SecondContent}>
              <p>게시물</p>
              <p>팔로워</p>
              <p>팔로잉</p>
            </div>
          </section>

          <section className={styles.Third}>
            <p style={{fontWeight:600}}>{user.name}</p>
            <p>{user.introduce}</p>
          </section>

          {/* 하이라이트 */}
          <div className={styles.HighLightContainer}></div>

          {/* 탭 */}
            <div className={styles.tabContainer}>
            <a
              className={selectedTab === 'posts' ? styles.activeTab : ''}
              onClick={() => handleTabClick('posts')}
            >
              <GridOnIcon />게시물
            </a>
            <a
              className={selectedTab === 'saved' ? styles.activeTab : ''}
              onClick={() => handleTabClick('saved')}
            >
              <BookmarkBorderIcon />저장됨
            </a>

            {loggedInUser.id === user.id ? 
              <a
                className={selectedTab === 'tagged' ? styles.activeTab : ''}
                onClick={() => handleTabClick('tagged')}
              >
                <MapsUgcOutlinedIcon />태그됨
              </a>
            : null 
            }
          </div>
        </div>

        {/* 피드 */}

        {selectedTab === 'posts' && posts.length > 0 && (
          <div className={styles.postsContainer}>
            {posts.slice().reverse().map(post => ( // posts 배열을 복사하여 역순으로 매핑(최신순)
              <div key={post.postId} className={styles.post} onClick={() => handlePostClick(post.postId)}>
                <img src={`http://localhost:8080${post.images[0].url}`} 
                      alt={post.images[0].alt} />
                {post.hasMultipleImages === true ?
                  <div className={styles.stackIcon}>
                    <FilterNoneIcon/>
                  </div>
                : null}
              </div>
            ))}
          </div>
        )}

        {/* PostModal 컴포넌트 */}
        <PostModal postModal={postModal} loggedInUser={loggedInUser} handleCloseModal={handleCloseModal} />

        {/* 저장됨 */}

        {selectedTab === 'saved' && savedPosts.length >0 && (
          <div className={styles.postsContainer}>
            {savedPosts.slice().reverse().map(post => ( // posts 배열을 복사하여 역순으로 매핑(최신순)
              <div key={post.postId} className={styles.post} onClick={() => handlePostClick(post.postId)}>
                <img src={`http://localhost:8080${post.images[0].url}`} 
                      alt={post.images[0].alt} />
                {post.hasMultipleImages === true ?
                  <div className={styles.stackIcon}>
                    <FilterNoneIcon/>
                  </div>
                : null}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyPage;

import React, { useState, useEffect } from "react";
import styles from './modal.module.css';
import { getUserInfo } from "../../service/ApiService";
import ImageUploader from "./ImageUploader";
import ImageDetailsPanel from "./ImageDetailPanel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

function UploadModal({onClose}) {

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setLoggedInUser(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEditor, setshowEditor] = useState(false);

  const removeImage = (index) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    const confirmDelete = window.confirm("게시물을 삭제하시겠어요?");
    if (confirmDelete) {
      onClose(); // 부모 컴포넌트에서 전달된 콜백을 호출하여 모달 닫기
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <p>새 게시물 만들기</p>
        </div>

        {/* 모달창 헤더 부분 */}
        {showEditor ?
          <>
          <button className={styles.headerArrowBtn} onClick={()=>{setshowEditor(false)}}>
            <ArrowBackIcon />
          </button>
          <button className={styles.haaderBlueBtn}>공유하기</button>
          </>
          : 
          <>
          <button className={styles.headerArrowBtn} onClick={closeModal}>
            <ArrowBackIcon />
          </button>
          <button className={styles.haaderBlueBtn} onClick={()=>{setshowEditor(true)}} disabled={selectedImages.length === 0}>
            다음
          </button>
          </>
        }
        
        {/* 컴포넌트 출력부분 */}
        <div className={styles.modalComponent}>
          <ImageUploader
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            showEditor={showEditor}
            removeImage={removeImage}
          />
          
          {showEditor &&
              <ImageDetailsPanel loggedInUser={loggedInUser} />
          }

        </div>
      </div>
      <button className={styles.closeBtn} onClick={closeModal}>
        <CloseIcon />
      </button>
    </div>
  );
}

export default UploadModal;

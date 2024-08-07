import React, { useState } from "react";
import styles from './modal.module.css';
import users from "../../users";
import ImageUploader from "./ImageUploader";
import ImageDetailsPanel from "./ImageDetailPanel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UploadModal() {

  // 가상 데이터
  const loggedInUserId = 2;
  const loggedInUser = users.find(user => user.id === loggedInUserId);

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArray, setShowArray] = useState(false); // 상태를 다시 활성화
  const [showEditor, setshowEditor] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = selectedImages.length + files.length;
  
    // 10장 까지만 첨부할수 있게 
    if (totalImages > 10) {
      const allowedFiles = files.slice(0, 10 - selectedImages.length);
      const newImages = allowedFiles.map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
    } else {
      const newImages = files.map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <p>새 게시물 만들기</p>
        </div>
        {showEditor ?
          <>
          <button className={styles.headerArrowBtn} onClick={()=>{setshowEditor(false)}}>
            <ArrowBackIcon />
          </button>
          <button className={styles.haaderBlueBtn}>공유하기</button>
          </>
          : 
          <button className={styles.haaderBlueBtn} onClick={()=>{setshowEditor(true)}}>
            다음
          </button>
        }
        
        {/* 컴포넌트 출력부분 */}
        <div className={showEditor ? styles.modalComponentExpanded : styles.modalComponent}>
          {selectedImages.length === 0 ?
            <input type="file" accept="image/*" multiple onChange={handleImageChange}/>
            :
            <div className={styles.flexItem}>
              <ImageUploader
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                showEditor={showEditor}
                removeImage={removeImage}
              />
            </div>
          }
          
          {showEditor &&
            <div className={styles.flexItem}>
              <ImageDetailsPanel loggedInUser={loggedInUser} />
            </div>
          }

        </div>
      </div>
    </div>
  );
}

export default UploadModal;

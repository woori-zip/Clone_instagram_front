import React, { useState } from "react";
import styles from './modal.module.css';
import users from "../../users";
import ImageUploader from "./ImageUploader";
import ImageDetailsPanel from "./ImageDetailPanel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

function UploadModal({onClose}) {

  // 가상 데이터
  const loggedInUserId = 2;
  const loggedInUser = users.find(user => user.id === loggedInUserId);

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
        <div className={showEditor ? styles.modalComponentExpanded : styles.modalComponent}>
          {selectedImages.length === 0 ?
            <>
              <label htmlFor="imageUpload" className={styles.iconLabel}>
                <button className={styles.blueBtn} onClick={() => document.getElementById('imageUpload').click()}>
                  컴퓨터에서 선택
                </button>
              </label>
              <input 
                type="file" 
                id="imageUpload"  
                accept="image/*" 
                multiple 
                onChange={handleImageChange} 
                style={{display:'none'}}
              />
            </>
          
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
      <button className={styles.closeBtn} onClick={closeModal}>
        <CloseIcon />
      </button>
    </div>
  );
}

export default UploadModal;

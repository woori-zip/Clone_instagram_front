import React, { useState, useEffect } from "react";
import styles from './modal.module.css';
import { getUserInfo } from "../../service/ApiService";
import ImageUploader from "./ImageUploader";
import ImageDetailsPanel from "./ImageDetailPanel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function UploadModal({ onClose, onSuccess }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [altTexts, setAltTexts] = useState({}); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState("");

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

  const removeImage = (id) => {
    setSelectedImages(prevImages => prevImages.filter(image => image.id !== id));
    setAltTexts(prevTexts => {
      const newTexts = { ...prevTexts };
      delete newTexts[id];
      return newTexts;
    });
  };

  const closeModal = () => {
    const confirmDelete = window.confirm("게시물을 삭제하시겠어요?");
    if (confirmDelete) {
      onClose(); 
    }
  };

  const handleContentChange = (e) => {
    setContent(e); // 상위 컴포넌트의 상태를 업데이트
  };

  const handleSavePost = async () => {
    try {
        const postRequestDTO = {
            userId: loggedInUser?.id || '', 
            content: content,              
            commentFlag: true,             
            showFlag: true                 
        };

        const formData = new FormData();

        // JSON 데이터를 바로 추가
        formData.append('post', JSON.stringify(postRequestDTO)); 

        selectedImages.forEach((image) => {
            formData.append('images', image.file); 
            formData.append('alts', altTexts[image.id] || image.file.name); // alt 텍스트 추가
        });

        // FormData의 모든 데이터를 콘솔에 출력하기
        formData.forEach((value, key) => {
          console.log(key + ": ", value);
        });

        const response = await axios.post('/api/posts', formData);

        if (response.status === 200) {
          alert("게시물이 성공적으로 업로드되었습니다!");
          onSuccess(true); // 성공 여부를 상위 컴포넌트에 전달
          onClose(); // 모달 닫기
        } else {
          alert("게시물 업로드에 실패했습니다.");
          onSuccess(false);
        }
      } catch (error) {
        console.error("게시물 업로드 중 오류가 발생했습니다.", error);
        alert("게시물 업로드 중 오류가 발생했습니다.");
        onSuccess(false);
      }
  };


  return (
    <div className={styles.modal}>
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <p>새 게시물 만들기</p>
        </div>

        {showEditor ? (
          <>
            <button className={styles.headerArrowBtn} onClick={() => setShowEditor(false)}>
              <ArrowBackIcon />
            </button>
            <button className={styles.haaderBlueBtn} onClick={handleSavePost}>공유하기</button>
          </>
        ) : (
          <>
            <button className={styles.headerArrowBtn} onClick={closeModal}>
              <ArrowBackIcon />
            </button>
            <button
              className={styles.haaderBlueBtn}
              onClick={() => setShowEditor(true)}
              disabled={selectedImages.length === 0}
            >
              다음
            </button>
          </>
        )}

        <div className={styles.modalComponent}>
          <ImageUploader
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            showEditor={showEditor}
            removeImage={removeImage}
            altTexts={altTexts} 
          />

          {showEditor && (
            <ImageDetailsPanel 
              loggedInUser={loggedInUser} 
              content={content} 
              onContentChange={handleContentChange} 
            />
          )}
        </div>
      </div>
      <button className={styles.closeBtn} onClick={closeModal}>
        <CloseIcon />
      </button>
    </div>
  );
}

export default UploadModal;

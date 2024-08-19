import React, { useState } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import styles from './imageuploader.module.css';
import ImageStack from "./ImageStack";

function ImageUploader({ selectedImages, setSelectedImages, currentIndex, setCurrentIndex, removeImage, showEditor, onSave, altTexts }) {
  const [showArray, setShowArray] = useState(false);

  // 이미지 파일을 선택할 때 호출되는 핸들러
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 10 - selectedImages.length).map((file, index) => ({
      id: file.name + "_" + Date.now(),
      url: URL.createObjectURL(file),
      file: file,
      alt: altTexts[index] || file.name
    }));
    
    setSelectedImages(prevImages => [...prevImages, ...newImages]);
  };

  // 이미지 슬라이더에서 다음 이미지로 이동
  const nextImage = () => {
    if (currentIndex < selectedImages.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  // 이미지 슬라이더에서 이전 이미지로 이동
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  // 이미지 배열 표시/숨기기
  const toggleImgArray = () => {
    setShowArray(prev => !prev);
  };

  return (
    <div className={styles.imgSlider}>
      {selectedImages.length === 0 ? (
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
            style={{ display: 'none' }}
          />
        </>
      ) : (
        <>
          <div className={styles.imgContainer}>
            <img src={selectedImages[currentIndex].url} alt="Selected" />
          </div>
          {currentIndex > 0 && (
            <button onClick={prevImage} className={`${styles.Btn} ${styles.prevBtn}`}>
              <NavigateBeforeIcon />
            </button>
          )}
          {currentIndex < selectedImages.length - 1 && (
            <button onClick={nextImage} className={`${styles.Btn} ${styles.nextBtn}`}>
              <NavigateNextIcon />
            </button>
          )}
          {!showEditor && (
            <button onClick={toggleImgArray} className={`${styles.Btn} ${styles.stackBtn}`}>
              <FilterNoneIcon />
            </button>
          )}
        </>
      )}

      {showArray && !showEditor && (
        <ImageStack 
          selectedImages={selectedImages} 
          currentIndex={currentIndex} 
          setCurrentIndex={setCurrentIndex} 
          removeImage={removeImage}
        />
      )}
    </div>
  );
}

export default ImageUploader;

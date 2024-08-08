import React, { useState } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import styles from './imageuploader.module.css';
import ImageStack from "./ImageStack";

function ImageUploader({ selectedImages, setSelectedImages, currentIndex, setCurrentIndex, removeImage, showEditor }) {

  const [showArray, setShowArray] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = selectedImages.length + files.length;
  
    if (totalImages > 10) {
      const allowedFiles = files.slice(0, 10 - selectedImages.length);
      const newImages = allowedFiles.map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
    } else {
      const newImages = files.map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const nextImage = () => {
    if (currentIndex < selectedImages.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const toggleImgArray = () => {
    setShowArray(!showArray);
  };

  return (
    <div className={styles.imgSlider}>
      <div className={styles.prevImages}>
        <img src={selectedImages[currentIndex]} alt="Selected"/>
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
        
        {!showEditor &&
          <button className={`${styles.Btn} ${styles.stackBtn}`} onClick={toggleImgArray}>
            <FilterNoneIcon />
          </button>
        }
      </div>
      

      {/* showArray가 true일 때만 이미지 스택 출력 */}
      {showArray && !showEditor && (
        <ImageStack 
          selectedImages={selectedImages} 
          currentIndex={currentIndex} 
          setCurrentIndex={setCurrentIndex} 
          removeImage={removeImage} 
          handleImageChange={handleImageChange}
        />
      )}

    </div>
  );
}

export default ImageUploader;

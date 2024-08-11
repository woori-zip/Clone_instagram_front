import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from './imagestack.module.css';

function ImageStack({ selectedImages, currentIndex, setCurrentIndex, removeImage, handleImageChange }) {

  return (
    <div className={styles.imagePreviewContainer}>
      <div className={styles.imagePreviewSlider}>
        {selectedImages.map((image, index) => (
          <div key={index} className={styles.thumbnailContainer}>
            <img 
              src={image} 
              alt={`Image ${index + 1}`} 
              className={`${styles.thumbnail} ${index === currentIndex ? styles.selectedThumbnail : ""}`} 
              onClick={() => setCurrentIndex(index)}
            />
            <button className={styles.removeButton} onClick={() => removeImage(index)}>X</button>
          </div>
        ))}
        {/* 이미지가 10개 미만일 떄 사진 첨부 input 버튼 출력 */}
        {selectedImages.length < 10 && 
          <div>
            <label htmlFor="imageUpload" className={styles.iconLabel}>
              <AddCircleOutlineIcon />
            </label>
            <input 
              type="file" 
              id="imageUpload"  
              accept="image/*" 
              multiple 
              onChange={handleImageChange} 
              style={{display:'none'}}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default ImageStack;

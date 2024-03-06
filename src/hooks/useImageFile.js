import { useState, useEffect } from "react";

export const useImageFile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const img = new window.Image();
        img.src = e.target.result;
        img.onload = () => {
          setUploadedImage(img);
        };
      } catch (err) {
        console.error("Error loading image:", err);
      }
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }

    return () => {
      reader.abort();
    };
  }, [imageFile]);

  return [uploadedImage, setImageFile];
};

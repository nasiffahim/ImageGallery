import React from "react";
import "./ImageGallery.css";
import { ImageCard } from "./ImageCard";
import update from "immutability-helper";
import { useCallback } from "react";

export const ImageGallery = ({ images, handleImageSelected, setImages }) => {
  const moveImage = useCallback((dragIndex, hoverIndex) => {
    console.log(dragIndex);
    setImages((prevImages) =>
      update(prevImages, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevImages[dragIndex]],
        ],
      })
    );
  }, []);

  const renderImageCard = useCallback((image, index) => {
    return (
      <ImageCard
        key={image.id}
        index={index}
        id={image.id}
        image={image}
        moveImage={moveImage}
        handleImageSelected={handleImageSelected}
      />
    );
  }, []);

  return (
    <div className="image-grid">
      {images.map((image, idx) => renderImageCard(image, idx))}
    </div>
  );
};

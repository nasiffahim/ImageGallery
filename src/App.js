import React, { useMemo, useState, useEffect, useCallback } from "react";
import "./App.css";
import { ImageGallery } from "./component/ImageGallery";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./component/Navbar";

const getImages = () => {
  function importAll(files) {
    return files.keys().map(files);
  }

  const files = importAll(
    require.context("./images", false, /\.(webp|jpe?g)$/)
  );

  return files.map((file, idx) => {
    return {
      id: idx,
      filePath: file,
      selected: false,
    };
  });
};

function App() {
  const [images, setImages] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const initialImages = getImages();
    setImages(initialImages);
  }, []);

  const handleImageSelected = useCallback((id) => {
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === id) {
          return { ...image, selected: !image.selected };
        }
        return image;
      });
    });
  }, []);

  useEffect(() => {
    setSelectedCount(images.filter((image) => image.selected).length);
  }, [images]);

  const deleteImages = () => {
    const newImages = images.filter((image) => !image.selected);
    setImages(newImages);
    setSelectedCount(0);
  };

  return (
    <div className="App">
      <div className="container">
        <Navbar selectedCount={selectedCount} deleteImages={deleteImages} />
        <DndProvider backend={HTML5Backend}>
          <ImageGallery
            images={images}
            handleImageSelected={handleImageSelected}
            setImages={setImages}
          />
        </DndProvider>
      </div>
    </div>
  );
}

export default App;

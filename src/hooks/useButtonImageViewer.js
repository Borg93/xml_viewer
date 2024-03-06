import { useCallback } from "react";

export const useButtonImageViewer = (stageRef, imageFile, initialScale) => {
  const zoom = (scaleFactor) => {
    const stage = stageRef.current.getStage();
    const oldScale = stage.scaleX();
    let pointerPosition = stage.getPointerPosition();

    // If there's no pointer position yet, use the center of the stage
    if (!pointerPosition) {
      pointerPosition = {
        x: stage.width() / 2,
        y: stage.height() / 2,
      };
    }

    const mousePointTo = {
      x: (pointerPosition.x - stage.x()) / oldScale,
      y: (pointerPosition.y - stage.y()) / oldScale,
    };

    const newScale = oldScale * scaleFactor;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointerPosition.x - mousePointTo.x * newScale,
      y: pointerPosition.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
    stage.batchDraw();
  };

  const zoomIn = (evt) => {
    zoom(1.1, evt);
  };

  const zoomOut = (evt) => {
    zoom(0.9, evt);
  };

  const resetZoom = useCallback(() => {
    const stage = stageRef.current.getStage();
    const stageWidth = stage.width();
    const stageHeight = stage.height();
    const imageWidth = imageFile.width;
    const imageHeight = imageFile.height;
    const x = (stageWidth - imageWidth * initialScale) / 2;
    const y = (stageHeight - imageHeight * initialScale) / 2;

    stage.scale({ x: initialScale, y: initialScale });
    stage.position({ x, y });
    stage.batchDraw();
  }, [imageFile, initialScale, stageRef]);

  return {
    zoomIn,
    zoomOut,
    resetZoom,
  };
};

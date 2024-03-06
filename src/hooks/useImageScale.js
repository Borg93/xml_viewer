import { useState, useEffect, useRef, useCallback } from "react";

export const useImageScale = (imageFile) => {
  const stageRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const observerRef = useRef(null);
  const nodeRef = useRef(null);

  const divRef = useCallback((node) => {
    if (node) {
      nodeRef.current = node;
      observerRef.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      });

      observerRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  const [scaleX, setScaleX] = useState(1);

  useEffect(() => {
    if (imageFile && stageRef.current) {
      const stageWidth = dimensions.width;
      const stageHeight = dimensions.height;
      const imageWidth = imageFile.width;
      const imageHeight = imageFile.height;
      const scale = Math.min(
        stageWidth / imageWidth,
        stageHeight / imageHeight
      );

      setScaleX(scale);

      const stage = stageRef.current.getStage();
      const x = (stageWidth - imageWidth * scale) / 2;
      const y = (stageHeight - imageHeight * scale) / 2;

      stage.position({ x, y });
      stage.scale({ x: scale, y: scale });
      stage.batchDraw();
    }
  }, [imageFile, dimensions, setScaleX]);

  return { divRef, stageRef, dimensions, scale: scaleX };
};

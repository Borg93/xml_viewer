import { Box, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Stage, Layer, Image, Line, Rect } from "react-konva";
import { useTextLineData } from "../hooks/useTextLineData";
import { useImageScale } from "../hooks/useImageScale";
import { useButtonImageViewer } from "../hooks/useButtonImageViewer"; // Import the useZoom hook

const ImageViewer = ({
  viewerColor,
  imageFile,
  xmlFile,
  selectedLineId,
  selectedComponent,
  callback,
}) => {
  const textLineData = useTextLineData(xmlFile);
  const { divRef, stageRef, dimensions, scale } = useImageScale(imageFile);
  const { zoomIn, zoomOut, resetZoom } = useButtonImageViewer(
    stageRef,
    imageFile,
    scale
  );

  const handleMaskClick = (id) => {
    callback(id);
  };

  useEffect(() => {
    if (imageFile) {
      resetZoom();
    }
  }, [imageFile, resetZoom]);

  return (
    <VStack gap="0" h="95%" w="100%" align="start">
      <ButtonGroup
        size={"md"}
        // paddingTop={"1rem"}
        paddingBottom={"0.5rem"}
        variant="ghost"
        spacing="2"
        justify="flex-start"
      >
        {imageFile && (
          <>
            <Button
              bg={viewerColor}
              onClick={zoomIn}
              color={"rgba(255, 255, 255, 0.92)"}
              boxShadow="lg"
            >
              +
            </Button>
            <Button
              bg={viewerColor}
              onClick={zoomOut}
              color={"rgba(255, 255, 255, 0.92)"}
              boxShadow="lg"
            >
              -
            </Button>
            <Button
              bg={viewerColor}
              onClick={resetZoom}
              color={"rgba(255, 255, 255, 0.92)"}
              boxShadow="lg"
            >
              Reset
            </Button>
          </>
        )}
      </ButtonGroup>
      {imageFile && (
        <Box
          h="100%"
          w="96%"
          bg={viewerColor}
          ref={divRef}
          p="1rem"
          borderRadius={"0.5rem"}
          boxShadow="lg"
        >
          <Box h="100%" w="100%" bg={"#0e121c"} borderRadius={"0.5rem"}>
            <Stage
              width={dimensions.width}
              height={dimensions.height}
              scaleX={scale}
              scaleY={scale}
              draggable
              ref={stageRef}
            >
              <Layer>
                <Image
                  image={imageFile}
                  width={imageFile.width}
                  height={imageFile.height}
                />
                {textLineData.map((textLine) => (
                  <Line
                    key={textLine.id}
                    points={textLine.points}
                    closed
                    fill={
                      selectedLineId === textLine.id
                        ? "rgba(0, 0, 255, 0.3)"
                        : ""
                    }
                    stroke={selectedLineId === textLine.id ? "blue" : "red"}
                    strokeWidth={2}
                    onClick={() => {
                      if (selectedLineId === textLine.id) {
                        handleMaskClick(null);
                      } else {
                        handleMaskClick(textLine.id);
                      }
                    }}
                  />
                ))}
              </Layer>
            </Stage>
          </Box>
        </Box>
      )}
    </VStack>
  );
};

export default ImageViewer;

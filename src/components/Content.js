import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  VStack,
  ButtonGroup,
  AbsoluteCenter,
} from "@chakra-ui/react";
import DataTable from "./DataTable";
import ImageViewer from "./ImageViewer";
import UploadButton from "./UploadButton";
import { useXmlFile } from "../hooks/useXmlFile";
import { useImageFile } from "../hooks/useImageFile";

const Content = ({ bgColor, appColor, viewerColor, tableColor, textColor }) => {
  const [uploadedXML, handleXmlUpload] = useXmlFile();
  const [uploadedImage, handleImageUpload] = useImageFile();

  const [selectedLineId, setSelectedLineId] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null); // New state to track the source of click

  const callbackHandleLineClickFromImage = (lineId) => {
    setSelectedLineId(lineId);
    setSelectedComponent("image");
  };

  const callbackHandleLineClickFromTable = (lineId) => {
    setSelectedLineId(lineId);
    setSelectedComponent("table");
  };

  return (
    <Box
      position={"relative"}
      h="calc(100vh - 65px)"
      w="100%"
      bg={bgColor}
      p="0rem 3rem 0rem 3rem"
    >
      <VStack align="stretch">
        <AbsoluteCenter axis="horizontal">
          <ButtonGroup
            size="md"
            bg={viewerColor}
            variant="ghost"
            p={"2"}
            borderRadius={"0.5rem"}
            spacing="6"
            boxShadow="lg"
          >
            <UploadButton
              id="image-upload"
              nameButton="Upload Image"
              handleUpload={handleImageUpload}
              accept="image/jpeg, image/png"
            />
            <UploadButton
              id="xml-upload"
              nameButton="Upload XML"
              handleUpload={handleXmlUpload}
              accept=".xml"
            />
          </ButtonGroup>
        </AbsoluteCenter>

        <Box
          bg={appColor}
          p="2rem 0rem 0rem 0rem"
          color="white"
          borderRadius="md"
        >
          <SimpleGrid
            columns={[1, null, 2]}
            gridTemplateColumns={["1fr", "1fr", "65% 35%"]}
            spacing={0}
          >
            <Box
              bg={appColor}
              marginTop="3vh"
              h="80vh"
              borderRadius="0.5rem 0 0 0.5rem"
              paddingBottom={"2rem"}
            >
              <ImageViewer
                viewerColor={viewerColor}
                imageFile={uploadedImage}
                xmlFile={uploadedXML}
                selectedLineId={selectedLineId}
                selectedComponent={selectedComponent}
                callback={callbackHandleLineClickFromImage}
              />
            </Box>
            <Box
              bg={appColor}
              marginTop="3vh"
              h="80vh"
              borderRadius="0 0.5rem 0.5rem 0 "
            >
              <DataTable
                tableColor={tableColor}
                textColor={textColor}
                xmlFile={uploadedXML}
                selectedLineId={selectedLineId}
                selectedComponent={selectedComponent}
                callback={callbackHandleLineClickFromTable}
              />
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default Content;

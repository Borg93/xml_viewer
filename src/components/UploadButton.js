import React from "react";
import { Box, Input, Button } from "@chakra-ui/react";

const UploadButton = ({ id, nameButton, handleUpload, accept }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // console.log(file, handleUpload); // new log statement
      handleUpload(file);
    }
  };

  return (
    <Box>
      <label htmlFor={id}>
        <Button as="span" color={"rgba(255, 255, 255, 0.92)"}>
          {nameButton}
        </Button>
        <Input
          type="file"
          id={id}
          accept={accept}
          onChange={handleChange}
          position="absolute"
          top={0}
          left={0}
          opacity={0}
          zIndex={-1}
          variant="ghost"
          boxShadow="lg"
        />
      </label>
    </Box>
  );
};

export default UploadButton;

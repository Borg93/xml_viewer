import { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";

export const useXmlFile = () => {
  const [xmlFile, setXmlFile] = useState(null);
  const [uploadedXML, setUploadedXML] = useState(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const xmlContent = e.target.result;
        const xmlParser = new XMLParser();
        const parsedXml = xmlParser.parseFromString(xmlContent);
        setUploadedXML(parsedXml);
      } catch (err) {
        console.error("Error parsing XML:", err);
      }
    };

    if (xmlFile) {
      reader.readAsText(xmlFile);
    }

    return () => {
      reader.abort();
    };
  }, [xmlFile]);

  return [uploadedXML, setXmlFile];
};

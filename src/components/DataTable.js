import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useDataTableRefs } from "../hooks/useDataTableRefs";

const DataTable = ({
  tableColor,
  textColor,
  xmlFile,
  selectedLineId,
  selectedComponent,
  callback,
}) => {
  const [initialI, setInitialI] = useState(null);
  const refsTextLines = useDataTableRefs(xmlFile, selectedLineId);

  useEffect(() => {
    if (xmlFile) {
      let firstLineId =
        xmlFile.getElementsByTagName("TextLine")[0].attributes.id;
      setInitialI(firstLineId.split("_")[2]);
    }
  }, [xmlFile]);

  const handleRowClick = (lineId) => {
    callback(lineId);
  };

  let lastI = initialI;

  return (
    <Box
      marginTop={"3.4rem"}
      boxShadow="lg"
      bg={tableColor}
      borderRadius={"0.5rem"}
    >
      {xmlFile && (
        <TableContainer maxHeight="72.5vh" overflowY="auto">
          <Table variant="unstyled">
            <Thead top={0}>
              <Tr>
                <Th color={textColor} fontSize="lg" paddingTop={"2rem"}>
                  Transcribed Text
                </Th>
                <Th color={textColor} fontSize="md" paddingTop={"2rem"}>
                  Score
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {xmlFile
                .getElementsByTagName("TextLine")
                .flatMap((textLine, index) => {
                  const lineId = textLine.attributes.id;
                  const currentI = lineId.split("_")[2];
                  const rows = [];

                  if (lastI !== null && currentI !== lastI) {
                    rows.push(
                      <Tr key={`empty_${index}`}>
                        <Td>&nbsp;</Td>
                        <Td>&nbsp;</Td>
                      </Tr>
                    );
                    lastI = currentI;
                  }

                  rows.push(
                    <Tr
                      key={lineId}
                      onClick={() => {
                        if (selectedLineId === lineId) {
                          handleRowClick(null);
                        } else {
                          handleRowClick(lineId);
                        }
                      }}
                      backgroundColor={
                        selectedLineId === lineId ? "rgba(0, 0, 255, 0.3)" : ""
                      }
                      _hover={{ cursor: "pointer" }}
                      ref={refsTextLines[lineId]}
                    >
                      <Td
                        fontSize="md"
                        color={textColor}
                        fontFamily={
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
                        }
                      >
                        {textLine.getElementsByTagName("Unicode")[0].value}
                      </Td>
                      <Td
                        fontSize="sm"
                        color={textColor}
                        fontFamily={
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
                        }
                      >
                        {
                          textLine.getElementsByTagName("PredScore")[0]
                            .attributes.pred_score
                        }
                      </Td>
                    </Tr>
                  );

                  return rows;
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default DataTable;

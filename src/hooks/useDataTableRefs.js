import React, { useEffect, useMemo } from "react";

export const useDataTableRefs = (xmlFile, selectedLineId) => {
  const refs = useMemo(() => {
    if (!xmlFile) return {};

    return xmlFile.getElementsByTagName("TextLine").reduce((acc, textLine) => {
      acc[textLine.attributes.id] = React.createRef();
      return acc;
    }, {});
  }, [xmlFile]);

  useEffect(() => {
    if (
      selectedLineId &&
      refs[selectedLineId] &&
      refs[selectedLineId].current
    ) {
      refs[selectedLineId].current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedLineId, refs]);

  return refs;
};

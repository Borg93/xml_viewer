export const useTextLineData = (xmlFile) => {
  let textLines = [];
  if (xmlFile) {
    textLines = xmlFile.getElementsByTagName("TextLine");
  }

  const textLineData = [];
  for (let i = 0; i < textLines.length; i++) {
    const textLine = textLines[i];
    const id = textLine.attributes.id;
    const coords = textLine.getElementsByTagName("Coords")[0].attributes.points;

    const points = coords
      .split(" ")
      .map((pair) => pair.split(",").map(Number))
      .flat();

    textLineData.push({ id, points });
  }

  return textLineData;
};

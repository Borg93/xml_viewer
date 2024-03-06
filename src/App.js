import React, { useState } from "react";
// import Navbar from "./components/Nav";
import Content from "./components/Content";
import HomePage from "./components/HomePage";
import { useColorModeValue, Box } from "@chakra-ui/react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // const navColor = useColorModeValue("#e5e7eb", "#0c0f18");

  const contentColors = {
    // bgColor: useColorModeValue("#ffffff", "#131826"),
    // appColor: useColorModeValue("#ffffff", "#131826"),
    // viewerColor: useColorModeValue("#f0f1f4", "#0c0f18"),
    // tableColor: useColorModeValue("#f0f1f4", "#0c0f18"),
    // textColor: useColorModeValue("#1A202C", "rgba(255, 255, 255, 0.92)"),

    bgColor: useColorModeValue("#131826", "#131826"),
    appColor: useColorModeValue("#131826", "#131826"),
    viewerColor: useColorModeValue("#0c0f18", "#0c0f18"),
    tableColor: useColorModeValue("#0c0f18", "#0c0f18"),
    textColor: useColorModeValue(
      "rgba(255, 255, 255, 0.92)",
      "rgba(255, 255, 255, 0.92)"
    ),
  };

  return (
    <Box bgColor={contentColors.bgColor} minH="100vh">
      {/* <Navbar bgColor={navColor} /> */}
      {isModalOpen && (
        <HomePage {...contentColors} closeModal={() => setIsModalOpen(false)} />
      )}
      <Content {...contentColors} />
    </Box>
  );
}

export default App;

import React from "react";
import {
  Box,
  Flex,
  Button,
  useColorMode,
  Link as ChakraLink,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../assets/Riksarkivet.png";

export default function Nav({ bgColor }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={bgColor} px={4} h="64px">
      <Flex h={16} alignItems="center">
        <Image src={logo} alt="Logo" boxSize="50px" objectFit="contain" />
        <Spacer />
        <Flex alignItems="center">
          <ChakraLink as={Link} to="/" mx={2} fontSize="xl" fontWeight="bold">
            Home
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/viewer"
            mx={2}
            fontSize="xl"
            fontWeight="bold"
          >
            Viewer
          </ChakraLink>
        </Flex>
        <Spacer />
        <Button onClick={toggleColorMode}>
          {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Flex>
    </Box>
  );
}

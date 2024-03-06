// // import React from "react";
// // import {
// //   Box,
// //   Heading,
// //   Text,
// //   Center,
// //   UnorderedList,
// //   ListItem,
// //   Link as ChakraLink,
// //   Flex,
// //   Image,
// // } from "@chakra-ui/react";
// // import { Link } from "react-router-dom";

// // import huggingFaceLogo from "../assets/Riksarkivet.png";

// // function HomePage() {
// //   return (
// //     <Center h="50vh" w="100%">
// //       <Box
// //         maxW="4xl"
// //         w="80%"
// //         borderWidth="1px"
// //         borderRadius="lg"
// //         overflow="hidden"
// //         p="20"
// //         boxShadow="lg"
// //       >
// //         <Heading mb={4} fontSize="2xl" noOfLines={1}>
// //           Welcome to Riksarkivet Demo Site
// //         </Heading>
// //         <Flex>
// //           <Text fontSize="lg">
// //             Here you can see projects of the Swedish National Archives DataLabb.
// //           </Text>
// //           <Image
// //             src={huggingFaceLogo}
// //             alt="Hugging Face"
// //             boxSize={20}
// //             ml={10}
// //             mt={-10}
// //             objectFit="contain"
// //           />
// //         </Flex>
// //         <UnorderedList fontSize="lg" mt={4} pl={6}>
// //           <ListItem>
// //             Active Hugging Face page:{" "}
// //             <ChakraLink
// //               href="https://huggingface.co/Riksarkivet"
// //               isExternal
// //               color="teal.500"
// //             >
// //               Riksarkivet - HF
// //             </ChakraLink>
// //           </ListItem>

// //           <ListItem>
// //             If you have used the HTR demo from Hugging Face, you can use the{" "}
// //             <ChakraLink as={Link} to="/viewer" color="teal.500">
// //               Viewer
// //             </ChakraLink>{" "}
// //             to explore results. Note that you need both the Image and the Page
// //             XML from the HTR tool tab.
// //           </ListItem>
// //           <ListItem>
// //             We are actively working on building an API for batch inferences of
// //             Handwritten Text Recognition (HTR).
// //           </ListItem>
// //         </UnorderedList>
// //       </Box>
// //     </Center>
// //   );
// // }

// // export default HomePage;

import React from "react";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        marginTop={4}
        marginLeft={4}
        p={4}
        onClick={onOpen}
        size={"md"}
        bg={"#0c0f18"}
        color={"rgba(255, 255, 255, 0.92)"}
      >
        Info about this app
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={"#131826"} color={"rgba(255, 255, 255, 0.92)"}>
          <ModalHeader
            mt={10}
            fontSize="2xl"
            noOfLines={1}
            color={"rgba(255, 255, 255, 0.92)"}
          >
            Welcome to Riksarkivet Demo Site
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody color={"rgba(255, 255, 255, 0.92)"}>
            <UnorderedList fontSize="lg" mt={4} pl={6}>
              <ListItem>
                Active Hugging Face page:{" "}
                <ChakraLink
                  href="https://huggingface.co/Riksarkivet"
                  isExternal
                  color="teal.500"
                >
                  Riksarkivet - HF
                </ChakraLink>
              </ListItem>

              <ListItem>
                If you have used the HTR demo from Hugging Face, you can use the
                Viewer to explore results. Note that you need both the Image and
                the Page XML from the HTR tool tab.
              </ListItem>
              <ListItem>
                We are actively working on building an API for batch inferences
                of Handwritten Text Recognition (HTR).
              </ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              color={"rgba(255, 255, 255, 0.92)"}
              bg={"#0c0f18"}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HomePage;

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="brand" variant="ghost" size="sm" onClick={onOpen}>
        Sign Up
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="10px" h="400px">
          <ModalCloseButton />
          <ModalBody
            borderRadius="10px"
            bgGradient="linear(to-r, rgb(40, 92, 163), rgb(229, 1, 105))"
            h="400px"
          >
            <Flex alignItems="center" pt="15%" justifyContent="space-between">
              <Image
                src="https://www.creativeplatform.io/img/Creative_logo.png"
                alt="Creative Logo"
                width={200}
                height={200}
              />
              <Box >Register / Sign Up</Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;

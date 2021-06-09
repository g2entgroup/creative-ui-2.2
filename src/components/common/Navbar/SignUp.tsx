import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
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
            <Flex alignItems="center" pt="10%" justifyContent="space-between">
              <Image
                src="https://www.creativeplatform.io/img/Creative_logo.png"
                alt="Creative Logo"
                width={200}
                height={200}
              />
              <Box w="50%">
                <Heading fontSize="1.3rem">Register / Sign Up</Heading>
                <Box />
                {/* name */}
                <FormControl id="first-name" isRequired>
                  <InputGroup>
                    <InputRightElement
                      pointerEvents="none"
                      pt="2rem"
                      children={<AiOutlineUser color="#000" opacity="0.7" />}
                    />
                    <Input
                      mt="1rem"
                      placeholder="Enter Your Name"
                      _placeholder={{ color: "#ccc" }}
                      bgColor="#fff"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputRightElement
                      pointerEvents="none"
                      pt="2rem"
                      children={<AiOutlineUser color="#000" opacity="0.7" />}
                    />
                    <Input
                      mt="1rem"
                      placeholder="Enter Your Name"
                      _placeholder={{ color: "#ccc" }}
                      bgColor="#fff"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputRightElement
                      pointerEvents="none"
                      pt="2rem"
                      children={<AiOutlineUser color="#000" opacity="0.7" />}
                    />
                    <Input
                      mt="1rem"
                      placeholder="Enter Your Name"
                      _placeholder={{ color: "#ccc" }}
                      bgColor="#fff"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputRightElement
                      pointerEvents="none"
                      pt="2rem"
                      children={<AiOutlineUser color="#000" opacity="0.7" />}
                    />
                    <Input
                      mt="1rem"
                      placeholder="Enter Your Name"
                      _placeholder={{ color: "#ccc" }}
                      bgColor="#fff"
                    />
                  </InputGroup>
                </FormControl>

                <Box as="button">Register Now</Box>
                <Box>Already Have An Account? Login Here</Box>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;

import React, { useState } from "react";
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
  Select,
  Input,
  InputGroup,
  InputRightElement,
  Container,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
  

const SignIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Button colorScheme="brand" variant="ghost" size="sm" onClick={onOpen}>
        Sign In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="10px" h="400px">
          <ModalCloseButton />
          <ModalBody
            borderRadius="10px"
            bgGradient="linear(to-r, rgb(40, 92, 163), rgb(229, 1, 105))"
            h="800px"
          >
            <Flex alignItems="center" pt="2%" justifyContent="space-between">
              <Stack spacing={1}>
              <Image
                src="https://www.creativeplatform.io/img/Creative_logo.png"
                alt="Creative Logo"
                width={100}
                height={100}
              />
              <Heading fontSize="2rem">CREATIVE</Heading>
              </Stack>
              <Container>
                <Heading as="h6" size="md">Sign In</Heading>
                {/* name */}
                <Stack spacing={2}>
                <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button>Sign In</Button>
                </Stack>
                <Box>Don't Have An Account?
                  <Link href="#"> Sign Up Here</Link>
                </Box>
              </Container>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;

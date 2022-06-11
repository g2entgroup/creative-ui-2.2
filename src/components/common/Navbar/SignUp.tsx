import React, { Suspense, useState } from "react";
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
  FormHelperText,
  Select,
  Input,
  InputGroup,
  InputRightElement,
  Container,
  Stack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import SignIn, { EthereumAddress } from "./SignIn";
import LogoModal from "./LogoModal";
import { useEthers } from "@usedapp/core";
import { PrivateKey } from "@textile/crypto";
import bcryptjs from "bcryptjs";
import { utils, BigNumber } from "ethers";
import { TextileInstance } from "../../../services/textile/textile";
import { useAuth } from "../../../services/context/auth";

const SignUp = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState<string>();
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { account, library } = useEthers();
  const { signup, createIdentity } = useAuth();

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e: any) => setSecret(e.target.value);

  const createNotification = (identity?: string) => {
    toast({
      title: "Secret Key",
      status: "success",
      description: `SUCCESS! ${username} (${identity}) Your account has been created and you have been signed in!`,
      duration: 9000,
      isClosable: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const identity = await createIdentity(secret);
    
    let newUser = {
      name,
      username,
      email,
      role,
      publicKey: identity.public.toString(),
      identity: identity
    };

    console.log("SIGN_UP: ", newUser)

    await signup(newUser);

    createNotification(identity.public.toString())
    onClose();
    return;
  };

  return (
    <>
      <Suspense>
        <Button colorScheme="#FBC02D" variant="ghost" size="md" onClick={onOpen}>
          Sign Up
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
                  <LogoModal />
                  <Heading
                    fontSize="2rem"
                    color={useColorModeValue("white", "white")}
                  >
                    CREATIVE
                  </Heading>
                </Stack>
                <Container>
                  <Heading
                    as="h6"
                    size="md"
                    color={useColorModeValue("white", "white")}
                  >
                    Register / Sign Up
                  </Heading>
                  {/* name */}
                  <Stack spacing={2}>
                    <FormControl id="name" isRequired>
                      <FormLabel color={useColorModeValue("white", "white")}>
                        Name
                      </FormLabel>
                      <InputGroup>
                        <Input
                          name="name"
                          placeholder="Enter Your Name"
                          color={"white"}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="username" isRequired>
                      <FormLabel color={useColorModeValue("white", "white")}>
                        Username
                      </FormLabel>
                      <InputGroup>
                        <Input
                          name="username"
                          placeholder="Username"
                          color={"white"}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="secret" isRequired>
                      <FormLabel color={useColorModeValue("white", "white")}>
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          pr="4.5rem"
                          name="secret"
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                          color={"white"}
                          onChange={(e) => {
                            setSecret(e.target.value);
                          }}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleClick}
                            color={useColorModeValue("gray.900", "white")}
                          >
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="email" isRequired>
                      <FormLabel color={useColorModeValue("white", "white")}>
                        Email
                      </FormLabel>
                      <InputGroup>
                        <Input
                          name="email"
                          placeholder="Email"
                          color={"white"}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </InputGroup>
                      <FormHelperText color={"white"}>
                        We'll never share your email.
                      </FormHelperText>
                    </FormControl>
                    <FormControl>
                      <FormLabel color={"white"}>Role</FormLabel>
                      <Select
                        color={"white"}
                        placeholder="Select option"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      >
                        <option color={"white"} value="pro">
                          Pro
                        </option>
                        <option color={"white"} value="brand">
                          Brand
                        </option>
                      </Select>
                    </FormControl>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      color={useColorModeValue("gray.900", "white")}
                    >
                      Register Now
                    </Button>
                  </Stack>
                  <Box padding={2} color={"white"}>
                    Already Have An Account?
                    <SignIn onClose={onClose} />
                  </Box>
                </Container>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Suspense>
    </>
  );
};

export default SignUp;

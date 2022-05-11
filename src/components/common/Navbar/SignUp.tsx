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
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import SignIn, { EthereumAddress } from './SignIn';
import Logo from './Logo-100';
import { useEthers } from "@usedapp/core";
import { PrivateKey } from "@textile/crypto";
import { hashSync } from "bcryptjs";
import { utils, BigNumber } from "ethers";
import { TextileInstance } from "src/services/textile/textile";
import { createStandaloneToast } from "@chakra-ui/toast";
import { useUsersContext } from "src/services/context/users";

const check = () => {
  if(localStorage.getItem('closeButtons') == 'true') {
    return true
  } else {
    return false
  }
}

const SignUp = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState<String>();
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { account, library } = useEthers();

  const { signUp } = useUsersContext();

  const handleChange = (e: any) => setSecret(e.target.value);

  const generateMessageForEntropy = (ethereum_address: EthereumAddress, application_name: string, secret: string): string => {
    return (
      '******************************************************************************** \n' +
      'READ THIS MESSAGE CAREFULLY. \n' +
      'DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE \n' +
      'ACCESS TO THIS APPLICATION. \n' +
      'DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT \n' +
      'TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n' +
      '******************************************************************************** \n' +
      'The Ethereum address used by this application is: \n' +
      '\n' +
      ethereum_address.value +
      '\n' +
      '\n' +
      '\n' +
      'By signing this message, you authorize the current application to use the \n' +
      'following app associated with the above address: \n' +
      '\n' +
      application_name +
      '\n' +
      '\n' +
      '\n' +
      'The hash of your non-recoverable, private, non-persisted password or secret \n' +
      'phrase is: \n' +
      '\n' +
      secret +
      '\n' +
      '\n' +
      '\n' +
      '******************************************************************************** \n' +
      'ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE TEXTILE KEYS \n' +
      'ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. \n' +
      'NOTE THIS DOES NOT ALLOW ACCESS TO YOUR WALLET FOR BLOCKCHAIN TX. \n' +
      'AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND \n' +
      'WRITE ACCESS TO THIS APPLICATION. \n' +
      '******************************************************************************** \n'
    );
  }

  const generatePrivateKey = async (): Promise<PrivateKey> => {
    const signer = library.getSigner();
    const salt = "$2a$10$3vx4QH1vSj9.URynBqkbae";
    // avoid sending the raw secret by hashing it first
    const hashSecret = hashSync(secret, salt);
    const message = generateMessageForEntropy(new EthereumAddress(account), 'Creative', hashSecret)
    const signedText = await signer.signMessage(message);
    const hash = utils.keccak256(signedText);
    if (hash === null) {
      throw new Error('No account is provided. Please provide an account to this application.');
    }
    // The following line converts the hash in hex to an array of 32 integers.
      // @ts-ignore
    const array = hash
      // @ts-ignore
      .replace('0x', '')
      // @ts-ignore
      .match(/.{2}/g)
      .map((hexNoPrefix) => BigNumber.from('0x' + hexNoPrefix).toNumber())
    
    if (array.length !== 32) {
      throw new Error('Hash of signature is not the correct size! Something went wrong!');
    }
    const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array))
    console.log(`Your VIP Key: ${identity.toString()}`)
    
    const identityString = identity.toString()
    localStorage.setItem("user-private-identity" , identityString)

    return identity
  }

  const createNotification = () => {
    const dispatchCustomEvent = createStandaloneToast();
    dispatchCustomEvent({ 
      title: "Secret Key",
      status: "success",
      description: `SUCCESS! ${username} (${account}) Your account has been created and you have been signed in!`,
      duration: 9000,
      isClosable: true,
    });
  }

  const handleSubmit = async (e) => { 
    e.preventDefault()

    const privateKey = await generatePrivateKey();

    let newUser = {
      name,
      username,
      email,
      role
    }
    await TextileInstance.setPrivateKey(privateKey);

    await TextileInstance.signUp(privateKey);

    await signUp(newUser);

    createNotification();

    onClose();
  }

  return (
    <>
      <Button colorScheme="#FBC02D" variant="ghost" size="md" onClick={onOpen} >
       Brand Sign Up
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
              <Logo />
              <Heading fontSize="2rem" color={useColorModeValue("white", "white")}>CREATIVE</Heading>
              </Stack>
              <Container>
                <Heading as="h6" size="md" color={useColorModeValue("white", "white")}>Register / Sign Up</Heading>
                {/* name */}
                <Stack spacing={2}>
                <FormControl id="name" isRequired>
                <FormLabel color={useColorModeValue("white", "white")}>Name</FormLabel>
                  <InputGroup>
                    <Input
                      name="name"
                      placeholder="Enter Your Name"
                      color={"white"}
                      onChange={(e)=>{setName(e.target.value)}}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="username" isRequired>
                <FormLabel color={useColorModeValue("white", "white")}>Username</FormLabel>
                  <InputGroup>
                    <Input
                      name="username"
                      placeholder="Username"
                      color={"white"}
                      onChange={(e)=>{setUsername(e.target.value)}}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="secret" isRequired>
                <FormLabel color={useColorModeValue("white", "white")}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      name="secret"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      color={"white"}
                      onChange={(e)=>{setSecret(e.target.value)}}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick} color={useColorModeValue("gray.900", "white")}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="email" isRequired>
                <FormLabel color={useColorModeValue("white", "white")}>Email</FormLabel>
                  <InputGroup>
                    <Input
                      name="email"
                      placeholder="Email"
                      color={"white"}
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </InputGroup>
                  <FormHelperText color={"white"}>We'll never share your email.</FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel color={"white"}>Role</FormLabel>
                    <Select color={"white"} placeholder="Select option" onChange={(e)=>{setRole(e.target.value)}}>
                      <option color={"white"} value="pro">Pro</option>
                      <option color={"white"} value="brand">Brand</option>
                    </Select>
                  </FormControl>
                  <Button type="submit" onClick={handleSubmit} color={useColorModeValue("gray.900", "white")}>Register Now</Button>
                </Stack>
                <Box padding={2} color={"white"}>Already Have An Account?
                  <SignIn onClose={onClose}/>
                </Box>
              </Container>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;

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
import SignIn from './SignIn';
import Logo from './Logo-100';

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
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { 
    e.preventDefault()
    console.log('Sending')
  let data = {
      name,
      email,
      password,
      role
    }
  fetch('/brandContact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')
        setSubmitted(true)
        setName('')
        setEmail('')
        setRole('')
      }
    })
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
                <FormControl id="password" isRequired>
                <FormLabel color={useColorModeValue("white", "white")}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      name="password"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      color={"white"}
                      onChange={(e)=>{setPassword(e.target.value)}}
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
                      <option color={"white"} value="brand">Brand</option>
                    </Select>
                  </FormControl>
                  <Button type="submit" color={useColorModeValue("gray.900", "white")}>Register Now</Button>
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

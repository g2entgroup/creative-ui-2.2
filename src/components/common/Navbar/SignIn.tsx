import React, { useEffect, useState } from "react";
// @ts-ignore
import { PrivateKey } from '@textile/hub'
import { BigNumber, providers, utils } from 'ethers'
import bcryptjs from 'bcryptjs';
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
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { TextileInstance } from "../../../services/textile/textile";
import SignUp from './SignUp';
import LogoModal from './LogoModal';
import { useEthers } from "@usedapp/core";
import { useAuth } from "../../../services/context/auth";
import { UserModel } from "../../../services/textile/types";

type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: providers.ExternalProvider };
class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition;
  constructor(public value?: Type) {}
}
export class EthereumAddress extends StrongType<'ethereum_address', string> {}

const SignIn = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [closeButtons , setCloseButtons] = useState(false)
  const [secret, setSecret] = useState<string>();
  
  const toast = useToast()

  const { login, getIdentity } = useAuth();

  const handleChange = (e: any) => setSecret(e.target.value);

  const handleLogin = async (): Promise<void> => {
    const identity = await getIdentity(secret);
    console.log("LOGIN: ", identity)
    
    await login(identity);

    createNotification(identity.public.toString())
    setCloseButtons(true)
    onClose()

    return;
  }

  const createNotification = (identity?: string) => {
    toast({ 
      title: "Secret Key",
      status: "success",
      description: ` SIGNED IN! Public Key: ${identity} Your app can now generate and reuse this users PrivateKey for creating user Mailboxes, Threads, and Buckets.`,
      duration: 9000,
      isClosable: true,
    });
  }

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <>
      <Button variant="ghost" size="md" onClick={onOpen} >
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
              <LogoModal />
              <Heading fontSize="2rem" color={useColorModeValue("white", "white")}>CREATIVE</Heading>
              </Stack>
              <Container>
              <Stack spacing={6}>
                <Heading as="h6" size="md" color={useColorModeValue("white", "white")}>Sign In</Heading>
                  <FormControl id="login" isRequired>
                  <FormLabel color={useColorModeValue("white", "white")}>Password</FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        color={"white"}
                        placeholder="Password"
                        type={show ? "text" : "password"}
                        
                        onChange={handleChange}
                      />
                      <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick} color={useColorModeValue("gray.900", "white")}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                    </InputGroup>
                    <FormHelperText>enter account password</FormHelperText>
                    <Button onClick={handleLogin} padding={2} color={useColorModeValue("gray.900", "white")}>Login with Metamask</Button>
                  </FormControl>
                </Stack>
              </Container>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;

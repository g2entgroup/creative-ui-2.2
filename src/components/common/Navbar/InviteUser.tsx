import React, { useState } from "react";
// @ts-ignore
import { providers } from 'ethers'
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
  Input,
  InputGroup,
  InputRightElement,
  Container,
  Stack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { TextileInstance } from "../../../services/textile/textile";
import { useEthers } from "@usedapp/core";
import LogoModal from "./LogoModal";

type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: providers.ExternalProvider };
class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition;
  constructor(public value?: Type) {}
}
export class EthereumAddress extends StrongType<'ethereum_address', string> {}

const InviteUser = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [closeButtons , setCloseButtons] = useState(false)
  const [address, setAddress] = useState<string>();

  const toast = useToast();

  const { account, library } = useEthers();

  const handleSubmit = async () => {
    const textileInstance = await TextileInstance.getInstance();

    textileInstance.sendUserInvite(address);

    createNotification();
  }

  const handleChange = async (e) => {
    setAddress(e.target.value);
  }


  const createNotification = () => {
    toast({ 
      title: "Invite Sent!",
      status: "success",
      description: `SUCCESS! Invite has been sent to ${address}. Access to your brand will be granted once the user accepts your invite.`,
      duration: 9000,
      isClosable: true,
    });
  }

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Stack align="center" justify="center">
        <Box>
          <Button colorScheme="#FBC02D" variant="ghost" onClick={onOpen} >
            Invite User
          </Button>
        </Box>
      </Stack>
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
                <Heading as="h6" size="md" color={useColorModeValue("white", "white")}>Invite User</Heading>
                {/* name */}
                  <FormControl id="login" isRequired>
                  <FormLabel color={useColorModeValue("white", "white")}>Address</FormLabel>
                    <InputGroup>
                      <Input
                        name="address"
                        color={"white"}
                        placeholder="Address"
                        onChange={handleChange}
                      />
                      <InputRightElement width="4.5rem">
                    </InputRightElement>
                    </InputGroup>
                    <FormHelperText>enter user address</FormHelperText>
                    <Button onClick={handleSubmit} padding={2} color={useColorModeValue("gray.900", "white")}>Invite User</Button>
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

export default InviteUser;
